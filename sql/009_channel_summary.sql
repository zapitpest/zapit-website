-- Channel summary view for Looker Studio Page 2 Widget 6 (Conversion Rate by
-- Channel table).
--
-- Combines two accurate sources into a single per-channel row:
--   Sessions: from v_channel_daily.sessions (accurate — sessions counting
--     is not affected by the JOIN duplication bug in v_events_with_channel
--     because GROUP BY at session-grain dedupes automatically)
--   Confirmed leads: from v_leads_by_channel (sql/008 fix — reads directly
--     from stg_leads which is the source of truth Page 1 Card 3 uses)
--   Conversion rate: computed at aggregate level (SUM(leads) / SUM(sessions))
--     rather than averaged across daily rates. Averaging daily rates gives
--     mathematically meaningless numbers.
--
-- Result totals reconcile exactly against Page 1 KPI cards.

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_channel_summary` AS
WITH sessions_agg AS (
  SELECT
    channel_group,
    SUM(sessions) AS sessions
  FROM `zapit-business-intelligence.zapit_reporting.v_channel_daily`
  GROUP BY channel_group
),
leads_agg AS (
  SELECT
    channel_group,
    COUNTIF(lead_class = 'confirmed_lead') AS confirmed_leads
  FROM `zapit-business-intelligence.zapit_reporting.v_leads_by_channel`
  GROUP BY channel_group
)
SELECT
  COALESCE(s.channel_group, l.channel_group) AS channel_group,
  IFNULL(s.sessions, 0) AS sessions,
  IFNULL(l.confirmed_leads, 0) AS confirmed_leads,
  SAFE_DIVIDE(IFNULL(l.confirmed_leads, 0), NULLIF(s.sessions, 0)) AS conversion_rate
FROM sessions_agg s
FULL OUTER JOIN leads_agg l USING (channel_group);

-- ============================================================================
-- Smoke tests (run manually in BQ Console)
-- ============================================================================
-- 1. Grand totals should match Page 1 KPI cards (Sessions 16, Confirmed Leads 6):
-- SELECT
--   SUM(sessions) AS total_sessions,
--   SUM(confirmed_leads) AS total_confirmed_leads,
--   SAFE_DIVIDE(SUM(confirmed_leads), SUM(sessions)) AS overall_conversion_rate
-- FROM `zapit-business-intelligence.zapit_reporting.v_channel_summary`;
--
-- 2. Row-by-row breakdown by channel:
-- SELECT * FROM `zapit-business-intelligence.zapit_reporting.v_channel_summary`
-- ORDER BY sessions DESC;
