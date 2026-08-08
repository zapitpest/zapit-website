-- Comprehensive verification smoke tests for the Zap It BigQuery warehouse.
--
-- Run in BQ Console (region: australia-southeast1) as a single query.
-- Every row returns one metric with a PASS or FAIL flag.
-- If any row shows FAIL, the corresponding widget on Page 1 or Page 2 needs attention.
--
-- Expected result: all 15 rows return PASS.
--
-- This is a READ-ONLY diagnostic. Safe to run anytime, no side effects.

WITH
-- ============================================================================
-- Base counts from staging views
-- ============================================================================
base AS (
  SELECT
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_sessions`
      WHERE ga_session_id IS NOT NULL) AS stg_sessions_count,

    (SELECT COUNT(DISTINCT user_pseudo_id) FROM `zapit-business-intelligence.zapit_staging.stg_sessions`) AS stg_sessions_unique_visitors,

    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_leads`
      WHERE lead_class = 'confirmed_lead') AS stg_leads_confirmed_count,

    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_leads`
      WHERE event_name LIKE 'form_submit_%') AS stg_leads_form_submit_events,

    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_leads`) AS stg_leads_all_events,

    -- After sql/010 fix
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_events_with_channel`
      WHERE event_name LIKE 'form_submit_%') AS v_events_with_channel_form_submits,

    -- After sql/010 fix, v_channel_daily.form_submits should now be correct
    (SELECT SUM(sessions) FROM `zapit-business-intelligence.zapit_reporting.v_channel_daily`) AS v_channel_daily_total_sessions,

    (SELECT SUM(form_submits) FROM `zapit-business-intelligence.zapit_reporting.v_channel_daily`) AS v_channel_daily_total_form_submits,

    -- v_leads_by_channel (sql/008 fix) - should match stg_leads confirmed_lead count
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_leads_by_channel`
      WHERE lead_class = 'confirmed_lead') AS v_leads_by_channel_confirmed,

    -- v_channel_summary (sql/009 rollup)
    (SELECT SUM(sessions) FROM `zapit-business-intelligence.zapit_reporting.v_channel_summary`) AS v_channel_summary_total_sessions,

    (SELECT SUM(confirmed_leads) FROM `zapit-business-intelligence.zapit_reporting.v_channel_summary`) AS v_channel_summary_total_confirmed,

    -- Sessions With Channel view
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_sessions_with_channel`) AS v_sessions_with_channel_count,

    -- Reporting views used by Page 1
    (SELECT SUM(sessions) FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`) AS v_daily_kpis_total_sessions,

    (SELECT SUM(confirmed_leads) FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`) AS v_daily_kpis_total_confirmed,

    (SELECT SUM(confirmed_leads) FROM `zapit-business-intelligence.zapit_reporting.v_service_line_daily`) AS v_service_line_daily_total_confirmed
),

-- ============================================================================
-- UDF sanity check — channel_group returns Adam's 9 canonical values
-- ============================================================================
udf_checks AS (
  SELECT
    `zapit-business-intelligence.zapit_staging.channel_group`('google', 'cpc', NULL) AS udf_google_ads,
    `zapit-business-intelligence.zapit_staging.channel_group`('google', 'organic', NULL) AS udf_organic_search,
    `zapit-business-intelligence.zapit_staging.channel_group`(NULL, NULL, 'chat.openai.com') AS udf_ai_referral,
    `zapit-business-intelligence.zapit_staging.channel_group`('facebook', 'social', NULL) AS udf_organic_social,
    `zapit-business-intelligence.zapit_staging.channel_group`('facebook', 'cpc', NULL) AS udf_meta_ads,
    `zapit-business-intelligence.zapit_staging.channel_group`('(direct)', '(none)', NULL) AS udf_direct
),

-- ============================================================================
-- Assemble test results
-- ============================================================================
tests AS (
  SELECT '01. stg_sessions total sessions' AS test_name,
         CAST(stg_sessions_count AS STRING) AS actual,
         '16 (matches Page 1 Sessions KPI)' AS expected,
         IF(stg_sessions_count = 16, 'PASS ✅', 'FAIL ❌') AS status FROM base
  UNION ALL
  SELECT '02. stg_sessions unique visitors',
         CAST(stg_sessions_unique_visitors AS STRING),
         '12 (matches Page 1 Visitors KPI)',
         IF(stg_sessions_unique_visitors = 12, 'PASS ✅', 'FAIL ❌') FROM base
  UNION ALL
  SELECT '03. stg_leads confirmed_lead count',
         CAST(stg_leads_confirmed_count AS STRING),
         '6 (matches Page 1 Confirmed Leads KPI + Widget 5)',
         IF(stg_leads_confirmed_count = 6, 'PASS ✅', 'FAIL ❌') FROM base
  UNION ALL
  SELECT '04. stg_leads form_submit_% events',
         CAST(stg_leads_form_submit_events AS STRING),
         '6 (matches stg_leads confirmed_lead — all form submits are confirmed_lead)',
         IF(stg_leads_form_submit_events = 6, 'PASS ✅', 'FAIL ❌') FROM base
  UNION ALL
  SELECT '05. v_events_with_channel form_submit_% events (post sql/010 fix)',
         CAST(v_events_with_channel_form_submits AS STRING),
         '6 (must match stg_leads — proves JOIN dedup worked)',
         IF(v_events_with_channel_form_submits = 6, 'PASS ✅', 'FAIL ❌') FROM base
  UNION ALL
  SELECT '06. v_channel_daily total sessions (Widget 4 + Widget 7 source)',
         CAST(v_channel_daily_total_sessions AS STRING),
         '16 (must match Page 1 Sessions KPI)',
         IF(v_channel_daily_total_sessions = 16, 'PASS ✅', 'FAIL ❌') FROM base
  UNION ALL
  SELECT '07. v_channel_daily total form_submits (post sql/010 fix)',
         CAST(v_channel_daily_total_form_submits AS STRING),
         '6 (must match stg_leads confirmed_lead — proves fix cascaded)',
         IF(v_channel_daily_total_form_submits = 6, 'PASS ✅', 'FAIL ❌') FROM base
  UNION ALL
  SELECT '08. v_leads_by_channel confirmed leads (Widget 5 source)',
         CAST(v_leads_by_channel_confirmed AS STRING),
         '6 (must match Card 3 — proves sql/008 correct)',
         IF(v_leads_by_channel_confirmed = 6, 'PASS ✅', 'FAIL ❌') FROM base
  UNION ALL
  SELECT '09. v_channel_summary total sessions (Widget 6 source)',
         CAST(v_channel_summary_total_sessions AS STRING),
         '16 (must match Sessions KPI)',
         IF(v_channel_summary_total_sessions = 16, 'PASS ✅', 'FAIL ❌') FROM base
  UNION ALL
  SELECT '10. v_channel_summary total confirmed_leads',
         CAST(v_channel_summary_total_confirmed AS STRING),
         '6 (must match Confirmed Leads KPI)',
         IF(v_channel_summary_total_confirmed = 6, 'PASS ✅', 'FAIL ❌') FROM base
  UNION ALL
  SELECT '11. UDF: (google, cpc, NULL) → Google Ads',
         udf_google_ads,
         'Google Ads',
         IF(udf_google_ads = 'Google Ads', 'PASS ✅', 'FAIL ❌') FROM udf_checks
  UNION ALL
  SELECT '12. UDF: (google, organic, NULL) → Organic Search',
         udf_organic_search,
         'Organic Search',
         IF(udf_organic_search = 'Organic Search', 'PASS ✅', 'FAIL ❌') FROM udf_checks
  UNION ALL
  SELECT '13. UDF: (NULL, NULL, chat.openai.com) → Identifiable AI Referrals',
         udf_ai_referral,
         'Identifiable AI Referrals',
         IF(udf_ai_referral = 'Identifiable AI Referrals', 'PASS ✅', 'FAIL ❌') FROM udf_checks
  UNION ALL
  SELECT '14. UDF: (facebook, cpc, NULL) → Meta Ads',
         udf_meta_ads,
         'Meta Ads',
         IF(udf_meta_ads = 'Meta Ads', 'PASS ✅', 'FAIL ❌') FROM udf_checks
  UNION ALL
  SELECT '15. UDF: ((direct), (none), NULL) → Direct',
         udf_direct,
         'Direct',
         IF(udf_direct = 'Direct', 'PASS ✅', 'FAIL ❌') FROM udf_checks
)

SELECT * FROM tests ORDER BY test_name;
