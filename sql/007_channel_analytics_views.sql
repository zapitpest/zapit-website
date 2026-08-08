-- Channel-aware reporting views powering Looker Studio Pages 2 (Marketing
-- Performance) and 3 (Conversion Detail).
--
-- Honours Adam's 23 Jul 2026 D2 directive: every session and every lead is
-- classified into one of the 9 canonical channels via the UDF from
-- sql/006_channel_group_udf.sql.
--
-- Adds a page_referrer projection into stg_events since GA4's built-in
-- traffic_source only exposes source/medium/campaign, not the referring host.
-- The UDF uses referrer host to identify AI referrals (chat.openai.com,
-- perplexity.ai, claude.ai, etc.) which GA4 categorises as "referral" without
-- distinguishing.
--
-- Rebuild-safe: CREATE OR REPLACE. Idempotent.

-- ============================================================================
-- v_events_with_channel — stg_events enriched with page_referrer + channel_group
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_events_with_channel` AS
WITH events AS (
  SELECT
    e.*,
    -- Pull page_referrer out of the raw event_params (not exposed by stg_events).
    -- This is document.referrer captured by GA4 on the client.
    (
      SELECT value.string_value
      FROM UNNEST(raw.event_params)
      WHERE key = 'page_referrer'
    ) AS page_referrer_url
  FROM `zapit-business-intelligence.zapit_staging.stg_events` e
  JOIN `zapit-business-intelligence.analytics_543350918.events_*` raw
    ON e.event_timestamp = TIMESTAMP_MICROS(raw.event_timestamp)
   AND e.user_pseudo_id = raw.user_pseudo_id
)
SELECT
  events.*,
  -- Extract the host from the full referrer URL.
  REGEXP_EXTRACT(page_referrer_url, r'^https?://([^/]+)') AS page_referrer_host,
  -- Apply Adam's 9-channel classifier.
  `zapit-business-intelligence.zapit_staging.channel_group`(
    traffic_source,
    traffic_medium,
    REGEXP_EXTRACT(page_referrer_url, r'^https?://([^/]+)')
  ) AS channel_group
FROM events;

-- ============================================================================
-- v_sessions_with_channel — one row per session, tagged with channel_group
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_sessions_with_channel` AS
SELECT
  user_pseudo_id,
  ga_session_id,
  MIN(event_timestamp) AS session_start,
  MAX(event_timestamp) AS session_end,
  COUNT(*) AS event_count,
  COUNTIF(event_name = 'page_view') AS page_view_count,
  COUNTIF(event_name LIKE 'form_submit_%') AS form_submit_count,
  COUNTIF(event_name IN ('click_phone', 'click_email')) AS contact_click_count,
  ANY_VALUE(traffic_source) AS traffic_source,
  ANY_VALUE(traffic_medium) AS traffic_medium,
  ANY_VALUE(traffic_campaign) AS traffic_campaign,
  ANY_VALUE(page_referrer_host) AS page_referrer_host,
  ANY_VALUE(channel_group) AS channel_group,
  ANY_VALUE(device_category) AS device_category,
  ANY_VALUE(city) AS city
FROM `zapit-business-intelligence.zapit_reporting.v_events_with_channel`
WHERE ga_session_id IS NOT NULL
GROUP BY user_pseudo_id, ga_session_id;

-- ============================================================================
-- v_channel_daily — daily rollup by channel_group. Powers Page 2 Marketing
-- Performance widgets.
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_channel_daily` AS
SELECT
  DATE(session_start, 'Australia/Melbourne') AS report_date,
  channel_group,
  COUNT(DISTINCT user_pseudo_id) AS unique_visitors,
  COUNT(*) AS sessions,
  SUM(form_submit_count) AS form_submits,
  SUM(contact_click_count) AS contact_clicks,
  SAFE_DIVIDE(SUM(form_submit_count), COUNT(*)) AS confirmed_conversion_rate
FROM `zapit-business-intelligence.zapit_reporting.v_sessions_with_channel`
GROUP BY report_date, channel_group;

-- ============================================================================
-- v_channel_conversion_detail — per-channel confirmed vs intent breakdown.
-- Powers Page 3 Conversion Detail.
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_channel_conversion_detail` AS
SELECT
  DATE(session_start, 'Australia/Melbourne') AS report_date,
  s.channel_group,
  l.lead_class,
  l.form_type,
  l.service_line,
  COUNT(*) AS lead_count
FROM `zapit-business-intelligence.zapit_reporting.v_sessions_with_channel` s
JOIN `zapit-business-intelligence.zapit_staging.stg_leads` l
  ON s.user_pseudo_id = l.user_pseudo_id
 AND s.ga_session_id = l.ga_session_id
GROUP BY report_date, s.channel_group, l.lead_class, l.form_type, l.service_line;

-- ============================================================================
-- Smoke tests (run manually in BQ Console)
-- ============================================================================
-- SELECT channel_group, SUM(sessions) AS total_sessions, SUM(form_submits) AS total_forms
-- FROM `zapit-business-intelligence.zapit_reporting.v_channel_daily`
-- GROUP BY channel_group
-- ORDER BY total_sessions DESC;
