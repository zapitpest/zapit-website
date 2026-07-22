-- ============================================================================
-- CEO Dashboard views — powers Page 1 "Needs attention" (Q5) + "Anomalies" (Q6)
-- panels per Adam's 18 Jul direction (LOOKER_DASHBOARD_MOCKUP_v2_BUILD_SPEC v2.1).
--
-- Design: rule-based only (no AI-layer dependency for MVP). Every rule is a
-- deterministic SQL expression comparing current window vs baseline. Once the
-- AI layer ships (zapit_reserved_ai), its output rows join alongside these —
-- layout stays the same; the source of insights upgrades from rule-based to
-- AI-driven. Platform-agnostic: works with Hermes/Claude/Codex/future agents.
--
-- Run AFTER 002_staging_views.sql. Idempotent — CREATE OR REPLACE VIEW.
-- ============================================================================


-- ============================================================================
-- v_daily_kpis — one row per day, wide format ready for Looker Studio KPI cards
-- and Q6 anomaly comparison. Base window is 28 days; expand later as needed.
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_daily_kpis` AS
WITH sessions_daily AS (
  SELECT
    DATE(session_start) AS metric_date,
    COUNT(DISTINCT CONCAT(user_pseudo_id, CAST(ga_session_id AS STRING))) AS sessions,
    COUNT(DISTINCT user_pseudo_id) AS visitors
  FROM `zapit-business-intelligence.zapit_staging.stg_sessions`
  GROUP BY metric_date
),
leads_daily AS (
  SELECT
    DATE(lead_timestamp) AS metric_date,
    COUNTIF(lead_class = 'confirmed_lead') AS confirmed_leads,
    COUNTIF(lead_class = 'intent_signal')  AS intent_signals
  FROM `zapit-business-intelligence.zapit_staging.stg_leads`
  GROUP BY metric_date
)
SELECT
  s.metric_date,
  s.sessions,
  s.visitors,
  COALESCE(l.confirmed_leads, 0) AS confirmed_leads,
  COALESCE(l.intent_signals, 0)  AS intent_signals,
  SAFE_DIVIDE(COALESCE(l.confirmed_leads, 0), s.sessions) * 100 AS conversion_rate_pct
FROM sessions_daily s
LEFT JOIN leads_daily l USING (metric_date)
WHERE s.metric_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY);


-- ============================================================================
-- v_service_line_daily — one row per (day, service_line). Feeds Q4 mini-strip
-- + Q5 "service line dropped to zero" attention rule.
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_service_line_daily` AS
SELECT
  DATE(lead_timestamp) AS metric_date,
  COALESCE(service_line, 'unspecified') AS service_line,
  COUNTIF(lead_class = 'confirmed_lead') AS confirmed_leads,
  COUNTIF(lead_class = 'intent_signal')  AS intent_signals
FROM `zapit-business-intelligence.zapit_staging.stg_leads`
WHERE DATE(lead_timestamp) >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
GROUP BY metric_date, service_line;


-- ============================================================================
-- v_traffic_source_daily — powers Q5 "source stopped delivering" rule + Q2
-- top-sources mini-table on Page 1.
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_traffic_source_daily` AS
SELECT
  DATE(lead_timestamp) AS metric_date,
  COALESCE(traffic_source, '(direct)')  AS traffic_source,
  COALESCE(traffic_medium, '(none)')    AS traffic_medium,
  COUNTIF(lead_class = 'confirmed_lead') AS confirmed_leads,
  COUNTIF(lead_class = 'intent_signal')  AS intent_signals
FROM `zapit-business-intelligence.zapit_staging.stg_leads`
WHERE DATE(lead_timestamp) >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
GROUP BY metric_date, traffic_source, traffic_medium;


-- ============================================================================
-- v_attention_flags — Q5 panel. Returns 0..N flag rows, each describing one
-- currently-active concern. Empty result = healthy state (green check).
--
-- Every rule compares a recent window against a longer baseline. Each row is
-- self-describing so the dashboard renders it directly — no Looker-side logic.
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_attention_flags` AS

-- Rule 1: total sessions dropped >40% vs prior day
WITH sessions_yesterday AS (
  SELECT
    (SELECT sessions FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`
      WHERE metric_date = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)) AS y_sessions,
    (SELECT sessions FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`
      WHERE metric_date = DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY)) AS d2_sessions
),
rule_traffic_drop AS (
  SELECT
    'traffic_drop' AS flag_type,
    'Sessions dropped sharply vs prior day' AS flag_headline,
    CONCAT(
      'Yesterday: ', CAST(y_sessions AS STRING),
      ' · day before: ', CAST(d2_sessions AS STRING),
      ' (', CAST(ROUND(SAFE_DIVIDE(y_sessions - d2_sessions, d2_sessions) * 100, 1) AS STRING), '%)'
    ) AS flag_detail,
    'sessions' AS affected_dimension,
    3 AS severity  -- 1 low, 3 high
  FROM sessions_yesterday
  WHERE y_sessions IS NOT NULL
    AND d2_sessions IS NOT NULL
    AND d2_sessions > 0
    AND SAFE_DIVIDE(y_sessions - d2_sessions, d2_sessions) <= -0.40
),

-- Rule 2: a service line with historical activity dropped to zero leads yesterday
service_line_baseline AS (
  SELECT
    service_line,
    AVG(confirmed_leads) AS avg_leads_28d
  FROM `zapit-business-intelligence.zapit_reporting.v_service_line_daily`
  WHERE metric_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 29 DAY)
                        AND DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY)
  GROUP BY service_line
),
service_line_yesterday AS (
  SELECT service_line, confirmed_leads
  FROM `zapit-business-intelligence.zapit_reporting.v_service_line_daily`
  WHERE metric_date = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)
),
rule_service_line_zero AS (
  SELECT
    'service_line_silent' AS flag_type,
    CONCAT(sb.service_line, ' produced no leads yesterday') AS flag_headline,
    CONCAT(
      '28-day average: ', CAST(ROUND(sb.avg_leads_28d, 1) AS STRING),
      ' leads/day · yesterday: 0'
    ) AS flag_detail,
    sb.service_line AS affected_dimension,
    2 AS severity
  FROM service_line_baseline sb
  LEFT JOIN service_line_yesterday sy USING (service_line)
  WHERE sb.avg_leads_28d >= 1.0
    AND COALESCE(sy.confirmed_leads, 0) = 0
),

-- Rule 3: a traffic source that was delivering leads stopped for 3+ days
source_last_lead AS (
  SELECT
    traffic_source,
    traffic_medium,
    MAX(metric_date) AS last_lead_date,
    SUM(confirmed_leads) AS total_leads_90d
  FROM `zapit-business-intelligence.zapit_reporting.v_traffic_source_daily`
  WHERE confirmed_leads > 0
  GROUP BY traffic_source, traffic_medium
),
rule_source_stopped AS (
  SELECT
    'source_stopped' AS flag_type,
    CONCAT(traffic_source, ' / ', traffic_medium, ' stopped delivering leads') AS flag_headline,
    CONCAT(
      'Last confirmed lead: ',
      CAST(last_lead_date AS STRING),
      ' · 90-day total: ', CAST(total_leads_90d AS STRING)
    ) AS flag_detail,
    CONCAT(traffic_source, ' / ', traffic_medium) AS affected_dimension,
    1 AS severity
  FROM source_last_lead
  WHERE total_leads_90d >= 5
    AND DATE_DIFF(CURRENT_DATE(), last_lead_date, DAY) >= 3
),

-- Rule 4: conversion rate collapsed (>50% below 28-day average)
cr_baseline AS (
  SELECT AVG(conversion_rate_pct) AS avg_cr_28d
  FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`
  WHERE metric_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 29 DAY)
                        AND DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY)
),
cr_yesterday AS (
  SELECT conversion_rate_pct AS cr_yday
  FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`
  WHERE metric_date = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)
),
rule_cr_collapse AS (
  SELECT
    'conversion_rate_collapse' AS flag_type,
    'Conversion rate collapsed vs 28-day average' AS flag_headline,
    CONCAT(
      '28-day avg: ', CAST(ROUND(b.avg_cr_28d, 2) AS STRING), '%',
      ' · yesterday: ', CAST(ROUND(y.cr_yday, 2) AS STRING), '%'
    ) AS flag_detail,
    'conversion_rate' AS affected_dimension,
    3 AS severity
  FROM cr_baseline b, cr_yesterday y
  WHERE b.avg_cr_28d > 0.5
    AND y.cr_yday IS NOT NULL
    AND SAFE_DIVIDE(y.cr_yday, b.avg_cr_28d) < 0.5
)

SELECT * FROM rule_traffic_drop
UNION ALL SELECT * FROM rule_service_line_zero
UNION ALL SELECT * FROM rule_source_stopped
UNION ALL SELECT * FROM rule_cr_collapse
ORDER BY severity DESC, flag_type;


-- ============================================================================
-- v_anomalies — Q6 panel. Metrics whose WoW change exceeds ±2σ of the trailing
-- 4-week rolling window. Currently 4 metrics; extends cleanly to more.
-- Empty result = normal state (green check).
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_anomalies` AS
WITH base AS (
  SELECT
    metric_date,
    sessions,
    confirmed_leads,
    conversion_rate_pct
  FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`
  WHERE metric_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 35 DAY)
),
current_week AS (
  SELECT
    SUM(sessions)        AS w_sessions,
    SUM(confirmed_leads) AS w_confirmed_leads,
    AVG(conversion_rate_pct) AS w_cr
  FROM base
  WHERE metric_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)
),
baseline_stats AS (
  -- 4-week rolling window ending 8 days ago (excludes current week)
  SELECT
    AVG(sessions)             AS avg_sessions,
    STDDEV(sessions)          AS sd_sessions,
    AVG(confirmed_leads)      AS avg_leads,
    STDDEV(confirmed_leads)   AS sd_leads,
    AVG(conversion_rate_pct)  AS avg_cr,
    STDDEV(conversion_rate_pct) AS sd_cr
  FROM base
  WHERE metric_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 35 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 8 DAY)
),
anomaly_sessions AS (
  SELECT
    'sessions' AS metric,
    cw.w_sessions AS current_value,
    bs.avg_sessions * 7 AS baseline_expected,  -- week-scaled
    SAFE_DIVIDE(cw.w_sessions - (bs.avg_sessions * 7), (bs.sd_sessions * 7)) AS z_score
  FROM current_week cw, baseline_stats bs
  WHERE bs.sd_sessions > 0
),
anomaly_leads AS (
  SELECT
    'confirmed_leads' AS metric,
    cw.w_confirmed_leads AS current_value,
    bs.avg_leads * 7 AS baseline_expected,
    SAFE_DIVIDE(cw.w_confirmed_leads - (bs.avg_leads * 7), (bs.sd_leads * 7)) AS z_score
  FROM current_week cw, baseline_stats bs
  WHERE bs.sd_leads > 0
),
anomaly_cr AS (
  SELECT
    'conversion_rate_pct' AS metric,
    cw.w_cr AS current_value,
    bs.avg_cr AS baseline_expected,
    SAFE_DIVIDE(cw.w_cr - bs.avg_cr, bs.sd_cr) AS z_score
  FROM current_week cw, baseline_stats bs
  WHERE bs.sd_cr > 0
),
all_anomalies AS (
  SELECT * FROM anomaly_sessions
  UNION ALL SELECT * FROM anomaly_leads
  UNION ALL SELECT * FROM anomaly_cr
)
SELECT
  metric,
  current_value,
  baseline_expected,
  ROUND(z_score, 2) AS z_score,
  CASE WHEN z_score > 0 THEN 'above' ELSE 'below' END AS direction,
  ROUND(SAFE_DIVIDE(current_value - baseline_expected, baseline_expected) * 100, 1) AS pct_change
FROM all_anomalies
WHERE ABS(z_score) >= 2.0
ORDER BY ABS(z_score) DESC;
