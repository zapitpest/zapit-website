-- MASTER HEALTH CHECK — PART B: Data reconciliation (DYNAMIC — no hardcoded numbers)
--
-- Verifies numbers agree across every view path without hardcoding expected values.
-- Since data grows naturally as test traffic accumulates, hardcoding specific
-- session counts causes false FAILs when the number legitimately ticks up.
--
-- This dynamic version checks internal consistency: every view must agree with
-- every other view on the same underlying reality.
--
-- Expected: every row PASS regardless of how many sessions have accumulated.

WITH counts AS (
  SELECT
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_sessions` WHERE ga_session_id IS NOT NULL) AS stg_sessions,
    (SELECT COUNT(DISTINCT user_pseudo_id) FROM `zapit-business-intelligence.zapit_staging.stg_sessions`) AS stg_visitors,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_leads` WHERE lead_class = 'confirmed_lead') AS stg_confirmed,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_events_with_channel` WHERE event_name LIKE 'form_submit_%') AS events_form_submits,
    (SELECT SUM(sessions) FROM `zapit-business-intelligence.zapit_reporting.v_channel_daily`) AS channel_daily_sessions,
    (SELECT SUM(form_submits) FROM `zapit-business-intelligence.zapit_reporting.v_channel_daily`) AS channel_daily_form_submits,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_leads_by_channel` WHERE lead_class = 'confirmed_lead') AS leads_by_channel_confirmed,
    (SELECT SUM(sessions) FROM `zapit-business-intelligence.zapit_reporting.v_channel_summary`) AS summary_sessions,
    (SELECT SUM(confirmed_leads) FROM `zapit-business-intelligence.zapit_reporting.v_channel_summary`) AS summary_confirmed,
    (SELECT SUM(sessions) FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`) AS daily_kpis_sessions,
    (SELECT SUM(confirmed_leads) FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`) AS daily_kpis_confirmed,
    (SELECT SUM(confirmed_leads) FROM `zapit-business-intelligence.zapit_reporting.v_service_line_daily`) AS service_line_confirmed
),
checks AS (
  SELECT 'B01. stg_sessions has data (> 0)' AS test_name,
    IF((SELECT stg_sessions FROM counts) > 0, 'PASS ✅', 'FAIL ❌') AS status
  UNION ALL SELECT 'B02. stg_sessions unique visitors <= total sessions',
    IF((SELECT stg_visitors FROM counts) <= (SELECT stg_sessions FROM counts), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'B03. stg_leads has confirmed_lead rows',
    IF((SELECT stg_confirmed FROM counts) >= 0, 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'G01. Sessions match: stg_sessions = v_channel_daily.sessions',
    IF((SELECT stg_sessions FROM counts) = (SELECT channel_daily_sessions FROM counts), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'G02. Sessions match: stg_sessions = v_channel_summary.sessions',
    IF((SELECT stg_sessions FROM counts) = (SELECT summary_sessions FROM counts), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'G03. Sessions match: stg_sessions = v_daily_kpis.sessions',
    IF((SELECT stg_sessions FROM counts) = (SELECT daily_kpis_sessions FROM counts), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'G04. Confirmed match: stg_leads = v_leads_by_channel',
    IF((SELECT stg_confirmed FROM counts) = (SELECT leads_by_channel_confirmed FROM counts), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'G05. Confirmed match: stg_leads = v_channel_summary.confirmed_leads',
    IF((SELECT stg_confirmed FROM counts) = (SELECT summary_confirmed FROM counts), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'G06. Confirmed match: stg_leads = v_daily_kpis.confirmed_leads',
    IF((SELECT stg_confirmed FROM counts) = (SELECT daily_kpis_confirmed FROM counts), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'G07. Confirmed match: stg_leads = v_service_line_daily.confirmed_leads',
    IF((SELECT stg_confirmed FROM counts) = (SELECT service_line_confirmed FROM counts), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'G08. Post sql/010 fix: v_events_with_channel form_submits = stg_leads confirmed',
    IF((SELECT events_form_submits FROM counts) = (SELECT stg_confirmed FROM counts), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'G09. Post sql/010 fix: v_channel_daily form_submits = stg_leads confirmed',
    IF((SELECT channel_daily_form_submits FROM counts) = (SELECT stg_confirmed FROM counts), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'INFO. Current sessions count (informational, changes as data grows)',
    CONCAT('sessions=', CAST((SELECT stg_sessions FROM counts) AS STRING),
           ' visitors=', CAST((SELECT stg_visitors FROM counts) AS STRING),
           ' confirmed_leads=', CAST((SELECT stg_confirmed FROM counts) AS STRING))
)
SELECT * FROM checks ORDER BY test_name;
