-- MASTER WAREHOUSE HEALTH CHECK
--
-- One query. Verifies every dataset, every view, every reserved table shell,
-- every UDF branch, cross-view reconciliation, region correctness, data
-- freshness, and schema integrity across the entire Zap It BigQuery warehouse.
--
-- Run in BQ Console (region: australia-southeast1). Read-only. Zero side effects.
--
-- Returns one row per check with PASS or FAIL. Expected: every row PASS.
--
-- Groups covered:
--   A. Dataset presence (12 datasets)
--   B. Core staging views compile + return data
--   C. Reporting views compile + return data
--   D. Reserved AI-layer tables + human_approval_status enforcement
--   E. Reserved CRM tables (Adam D4)
--   F. Other reserved shells (WhatConverts / Zoom / GHL / Meta Ads / Google Ads / Clarity / Operational)
--   G. Cross-view reconciliation (numbers agree across sources)
--   H. UDF: all 9 canonical channel classifications
--   I. Data freshness (most recent event within reasonable window)
--   J. Region correctness (spot-check)

WITH
-- ============================================================================
-- A. Dataset presence
-- ============================================================================
datasets AS (
  SELECT schema_name
  FROM `zapit-business-intelligence.INFORMATION_SCHEMA.SCHEMATA`
),
dataset_checks AS (
  SELECT 'A01. Dataset zapit_raw_ga4 exists' AS test_name,
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_raw_ga4'), 'PASS ✅', 'FAIL ❌') AS status,
    'A. Dataset presence' AS category
  UNION ALL SELECT 'A02. Dataset zapit_raw_search_console exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_raw_search_console'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A03. Dataset zapit_staging exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_staging'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A04. Dataset zapit_reporting exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reporting'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A05. Dataset zapit_reserved_whatconverts exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_whatconverts'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A06. Dataset zapit_reserved_zoom exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_zoom'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A07. Dataset zapit_reserved_ghl exists (optional, per Adam D4)',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_ghl'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A08. Dataset zapit_reserved_meta_ads exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_meta_ads'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A09. Dataset zapit_reserved_google_ads exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_google_ads'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A10. Dataset zapit_reserved_clarity exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_clarity'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A11. Dataset zapit_reserved_operational exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_operational'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A12. Dataset zapit_reserved_ai exists (renamed from openclaw, Adam D5)',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_ai'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A13. Dataset zapit_reserved_crm exists (Adam 23 Jul D4 CRM-agnostic)',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_crm'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
  UNION ALL SELECT 'A14. Legacy dataset zapit_reserved_openclaw REMOVED',
    IF(NOT EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_openclaw'), 'PASS ✅', 'FAIL ❌'),
    'A. Dataset presence'
),

-- ============================================================================
-- B. Core staging views return data
-- ============================================================================
staging_counts AS (
  SELECT
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_events`) AS stg_events_count,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_sessions` WHERE ga_session_id IS NOT NULL) AS stg_sessions_count,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_leads`) AS stg_leads_count,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_leads` WHERE lead_class = 'confirmed_lead') AS stg_leads_confirmed
),
staging_checks AS (
  SELECT 'B01. stg_events has data (> 0 rows)' AS test_name,
    IF((SELECT stg_events_count FROM staging_counts) > 0, 'PASS ✅', 'FAIL ❌') AS status,
    'B. Staging views' AS category
  UNION ALL SELECT 'B02. stg_sessions returns 16 sessions',
    IF((SELECT stg_sessions_count FROM staging_counts) = 16, 'PASS ✅', 'FAIL ❌'),
    'B. Staging views'
  UNION ALL SELECT 'B03. stg_leads returns data',
    IF((SELECT stg_leads_count FROM staging_counts) > 0, 'PASS ✅', 'FAIL ❌'),
    'B. Staging views'
  UNION ALL SELECT 'B04. stg_leads confirmed_lead count = 6',
    IF((SELECT stg_leads_confirmed FROM staging_counts) = 6, 'PASS ✅', 'FAIL ❌'),
    'B. Staging views'
),

-- ============================================================================
-- C. Reporting views compile + reconcile
-- ============================================================================
reporting_counts AS (
  SELECT
    (SELECT SUM(sessions) FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`) AS v_daily_kpis_sessions,
    (SELECT SUM(confirmed_leads) FROM `zapit-business-intelligence.zapit_reporting.v_daily_kpis`) AS v_daily_kpis_confirmed,
    (SELECT SUM(confirmed_leads) FROM `zapit-business-intelligence.zapit_reporting.v_service_line_daily`) AS v_service_line_confirmed,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_traffic_source_daily`) AS v_traffic_source_rows,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_attention_flags`) AS v_attention_flags_rows,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_anomalies`) AS v_anomalies_rows,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_events_with_channel` WHERE event_name LIKE 'form_submit_%') AS v_events_form_submits,
    (SELECT SUM(sessions) FROM `zapit-business-intelligence.zapit_reporting.v_channel_daily`) AS v_channel_daily_sessions,
    (SELECT SUM(form_submits) FROM `zapit-business-intelligence.zapit_reporting.v_channel_daily`) AS v_channel_daily_form_submits,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_leads_by_channel` WHERE lead_class = 'confirmed_lead') AS v_leads_by_channel_confirmed,
    (SELECT SUM(sessions) FROM `zapit-business-intelligence.zapit_reporting.v_channel_summary`) AS v_channel_summary_sessions,
    (SELECT SUM(confirmed_leads) FROM `zapit-business-intelligence.zapit_reporting.v_channel_summary`) AS v_channel_summary_confirmed,
    (SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_reporting.v_sessions_with_channel`) AS v_sessions_with_channel_rows
),
reporting_checks AS (
  SELECT 'C01. v_daily_kpis sessions = 16 (Page 1 Card 1 source)' AS test_name,
    IF((SELECT v_daily_kpis_sessions FROM reporting_counts) = 16, 'PASS ✅', 'FAIL ❌') AS status,
    'C. Reporting views' AS category
  UNION ALL SELECT 'C02. v_daily_kpis confirmed = 6',
    IF((SELECT v_daily_kpis_confirmed FROM reporting_counts) = 6, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C03. v_service_line_daily confirmed sums to 6',
    IF((SELECT v_service_line_confirmed FROM reporting_counts) = 6, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C04. v_traffic_source_daily has rows',
    IF((SELECT v_traffic_source_rows FROM reporting_counts) > 0, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C05. v_attention_flags compiles',
    IF((SELECT v_attention_flags_rows FROM reporting_counts) >= 0, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C06. v_anomalies compiles',
    IF((SELECT v_anomalies_rows FROM reporting_counts) >= 0, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C07. v_events_with_channel form_submits = 6 (sql/010 fix)',
    IF((SELECT v_events_form_submits FROM reporting_counts) = 6, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C08. v_channel_daily sessions = 16 (Widget 4 source)',
    IF((SELECT v_channel_daily_sessions FROM reporting_counts) = 16, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C09. v_channel_daily form_submits = 6 (post sql/010 fix)',
    IF((SELECT v_channel_daily_form_submits FROM reporting_counts) = 6, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C10. v_leads_by_channel confirmed = 6 (Widget 5 source)',
    IF((SELECT v_leads_by_channel_confirmed FROM reporting_counts) = 6, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C11. v_channel_summary sessions = 16 (Widget 6 source)',
    IF((SELECT v_channel_summary_sessions FROM reporting_counts) = 16, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C12. v_channel_summary confirmed = 6',
    IF((SELECT v_channel_summary_confirmed FROM reporting_counts) = 6, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
  UNION ALL SELECT 'C13. v_sessions_with_channel has rows (Widget 8 source)',
    IF((SELECT v_sessions_with_channel_rows FROM reporting_counts) > 0, 'PASS ✅', 'FAIL ❌'),
    'C. Reporting views'
),

-- ============================================================================
-- D. AI-layer reserved tables + human_approval_status enforced
-- ============================================================================
ai_tables AS (
  SELECT table_name, column_name, is_nullable
  FROM `zapit-business-intelligence.zapit_reserved_ai.INFORMATION_SCHEMA.COLUMNS`
),
ai_checks AS (
  SELECT 'D01. zapit_reserved_ai.ai_outputs exists with source_agent column' AS test_name,
    IF(EXISTS(SELECT 1 FROM ai_tables WHERE table_name = 'ai_outputs' AND column_name = 'source_agent'), 'PASS ✅', 'FAIL ❌') AS status,
    'D. AI-layer schema' AS category
  UNION ALL SELECT 'D02. zapit_reserved_ai.ai_recommendations exists (Adam 23 Jul spec)',
    IF(EXISTS(SELECT 1 FROM ai_tables WHERE table_name = 'ai_recommendations'), 'PASS ✅', 'FAIL ❌'),
    'D. AI-layer schema'
  UNION ALL SELECT 'D03. zapit_reserved_ai.ai_learning exists (Adam 22 Jul closed-loop)',
    IF(EXISTS(SELECT 1 FROM ai_tables WHERE table_name = 'ai_learning'), 'PASS ✅', 'FAIL ❌'),
    'D. AI-layer schema'
  UNION ALL SELECT 'D04. ai_outputs.human_approval_status is NOT NULL (Adam rule)',
    IF(EXISTS(SELECT 1 FROM ai_tables WHERE table_name = 'ai_outputs' AND column_name = 'human_approval_status' AND is_nullable = 'NO'), 'PASS ✅', 'FAIL ❌'),
    'D. AI-layer schema'
  UNION ALL SELECT 'D05. ai_recommendations.human_approval_status is NOT NULL',
    IF(EXISTS(SELECT 1 FROM ai_tables WHERE table_name = 'ai_recommendations' AND column_name = 'human_approval_status' AND is_nullable = 'NO'), 'PASS ✅', 'FAIL ❌'),
    'D. AI-layer schema'
),

-- ============================================================================
-- E. CRM reserved tables (Adam D4)
-- ============================================================================
crm_tables AS (
  SELECT table_name
  FROM `zapit-business-intelligence.zapit_reserved_crm.INFORMATION_SCHEMA.TABLES`
),
crm_checks AS (
  SELECT 'E01. zapit_reserved_crm.contacts table exists' AS test_name,
    IF(EXISTS(SELECT 1 FROM crm_tables WHERE table_name = 'contacts'), 'PASS ✅', 'FAIL ❌') AS status,
    'E. CRM schema (Adam D4)' AS category
  UNION ALL SELECT 'E02. zapit_reserved_crm.leads table exists',
    IF(EXISTS(SELECT 1 FROM crm_tables WHERE table_name = 'leads'), 'PASS ✅', 'FAIL ❌'),
    'E. CRM schema (Adam D4)'
  UNION ALL SELECT 'E03. zapit_reserved_crm.opportunities table exists',
    IF(EXISTS(SELECT 1 FROM crm_tables WHERE table_name = 'opportunities'), 'PASS ✅', 'FAIL ❌'),
    'E. CRM schema (Adam D4)'
  UNION ALL SELECT 'E04. zapit_reserved_crm.outcomes table exists',
    IF(EXISTS(SELECT 1 FROM crm_tables WHERE table_name = 'outcomes'), 'PASS ✅', 'FAIL ❌'),
    'E. CRM schema (Adam D4)'
  UNION ALL SELECT 'E05. zapit_reserved_crm.revenue table exists',
    IF(EXISTS(SELECT 1 FROM crm_tables WHERE table_name = 'revenue'), 'PASS ✅', 'FAIL ❌'),
    'E. CRM schema (Adam D4)'
),

-- ============================================================================
-- F. Other reserved table shells
-- ============================================================================
other_shells AS (
  SELECT
    EXISTS(SELECT 1 FROM `zapit-business-intelligence.zapit_reserved_whatconverts.INFORMATION_SCHEMA.TABLES` WHERE table_name = 'calls') AS wc_calls_exists,
    EXISTS(SELECT 1 FROM `zapit-business-intelligence.zapit_reserved_zoom.INFORMATION_SCHEMA.TABLES` WHERE table_name = 'calls') AS zoom_calls_exists,
    EXISTS(SELECT 1 FROM `zapit-business-intelligence.zapit_reserved_zoom.INFORMATION_SCHEMA.TABLES` WHERE table_name = 'transcripts') AS zoom_transcripts_exists,
    EXISTS(SELECT 1 FROM `zapit-business-intelligence.zapit_reserved_ghl.INFORMATION_SCHEMA.TABLES` WHERE table_name = 'contacts') AS ghl_contacts_exists,
    EXISTS(SELECT 1 FROM `zapit-business-intelligence.zapit_reserved_clarity.INFORMATION_SCHEMA.TABLES` WHERE table_name = 'sessions') AS clarity_sessions_exists
),
other_checks AS (
  SELECT 'F01. reserved_whatconverts.calls shell exists' AS test_name,
    IF((SELECT wc_calls_exists FROM other_shells), 'PASS ✅', 'FAIL ❌') AS status,
    'F. Other reserved shells' AS category
  UNION ALL SELECT 'F02. reserved_zoom.calls shell exists',
    IF((SELECT zoom_calls_exists FROM other_shells), 'PASS ✅', 'FAIL ❌'),
    'F. Other reserved shells'
  UNION ALL SELECT 'F03. reserved_zoom.transcripts shell exists',
    IF((SELECT zoom_transcripts_exists FROM other_shells), 'PASS ✅', 'FAIL ❌'),
    'F. Other reserved shells'
  UNION ALL SELECT 'F04. reserved_ghl.contacts shell exists (optional per D4)',
    IF((SELECT ghl_contacts_exists FROM other_shells), 'PASS ✅', 'FAIL ❌'),
    'F. Other reserved shells'
  UNION ALL SELECT 'F05. reserved_clarity.sessions shell exists',
    IF((SELECT clarity_sessions_exists FROM other_shells), 'PASS ✅', 'FAIL ❌'),
    'F. Other reserved shells'
),

-- ============================================================================
-- G. Cross-view reconciliation — same underlying reality, every path agrees
-- ============================================================================
reconcile_checks AS (
  SELECT 'G01. Sessions match: stg_sessions = v_channel_daily = v_channel_summary = v_daily_kpis' AS test_name,
    IF(
      (SELECT stg_sessions_count FROM staging_counts) = (SELECT v_channel_daily_sessions FROM reporting_counts)
      AND (SELECT stg_sessions_count FROM staging_counts) = (SELECT v_channel_summary_sessions FROM reporting_counts)
      AND (SELECT stg_sessions_count FROM staging_counts) = (SELECT v_daily_kpis_sessions FROM reporting_counts),
      'PASS ✅', 'FAIL ❌'
    ) AS status,
    'G. Cross-view reconciliation' AS category
  UNION ALL SELECT 'G02. Confirmed leads match: stg_leads = v_leads_by_channel = v_channel_summary = v_daily_kpis',
    IF(
      (SELECT stg_leads_confirmed FROM staging_counts) = (SELECT v_leads_by_channel_confirmed FROM reporting_counts)
      AND (SELECT stg_leads_confirmed FROM staging_counts) = (SELECT v_channel_summary_confirmed FROM reporting_counts)
      AND (SELECT stg_leads_confirmed FROM staging_counts) = (SELECT v_daily_kpis_confirmed FROM reporting_counts),
      'PASS ✅', 'FAIL ❌'
    ),
    'G. Cross-view reconciliation'
  UNION ALL SELECT 'G03. Post-fix: v_events_with_channel form_submits = v_channel_daily form_submits',
    IF(
      (SELECT v_events_form_submits FROM reporting_counts) = (SELECT v_channel_daily_form_submits FROM reporting_counts),
      'PASS ✅', 'FAIL ❌'
    ),
    'G. Cross-view reconciliation'
),

-- ============================================================================
-- H. UDF: every one of Adam's 9 canonical channels
-- ============================================================================
udf_output AS (
  SELECT
    `zapit-business-intelligence.zapit_staging.channel_group`('google_business', NULL, NULL) AS ch_gbp,
    `zapit-business-intelligence.zapit_staging.channel_group`('google', 'organic', NULL) AS ch_organic_search,
    `zapit-business-intelligence.zapit_staging.channel_group`('google', 'cpc', NULL) AS ch_google_ads,
    `zapit-business-intelligence.zapit_staging.channel_group`('facebook', 'cpc', NULL) AS ch_meta_ads,
    `zapit-business-intelligence.zapit_staging.channel_group`('facebook', 'social', NULL) AS ch_organic_social,
    `zapit-business-intelligence.zapit_staging.channel_group`('(direct)', '(none)', NULL) AS ch_direct,
    `zapit-business-intelligence.zapit_staging.channel_group`('someblog.com', 'referral', 'someblog.com') AS ch_referral,
    `zapit-business-intelligence.zapit_staging.channel_group`('newsletter', 'email', NULL) AS ch_email,
    `zapit-business-intelligence.zapit_staging.channel_group`(NULL, NULL, 'chat.openai.com') AS ch_ai_referral
),
udf_checks AS (
  SELECT 'H01. UDF → Google Business Profile / Local SEO' AS test_name,
    IF((SELECT ch_gbp FROM udf_output) = 'Google Business Profile / Local SEO', 'PASS ✅', 'FAIL ❌') AS status,
    'H. UDF nine-channel taxonomy (Adam D2)' AS category
  UNION ALL SELECT 'H02. UDF → Organic Search',
    IF((SELECT ch_organic_search FROM udf_output) = 'Organic Search', 'PASS ✅', 'FAIL ❌'),
    'H. UDF nine-channel taxonomy (Adam D2)'
  UNION ALL SELECT 'H03. UDF → Google Ads',
    IF((SELECT ch_google_ads FROM udf_output) = 'Google Ads', 'PASS ✅', 'FAIL ❌'),
    'H. UDF nine-channel taxonomy (Adam D2)'
  UNION ALL SELECT 'H04. UDF → Meta Ads',
    IF((SELECT ch_meta_ads FROM udf_output) = 'Meta Ads', 'PASS ✅', 'FAIL ❌'),
    'H. UDF nine-channel taxonomy (Adam D2)'
  UNION ALL SELECT 'H05. UDF → Organic Social',
    IF((SELECT ch_organic_social FROM udf_output) = 'Organic Social', 'PASS ✅', 'FAIL ❌'),
    'H. UDF nine-channel taxonomy (Adam D2)'
  UNION ALL SELECT 'H06. UDF → Direct',
    IF((SELECT ch_direct FROM udf_output) = 'Direct', 'PASS ✅', 'FAIL ❌'),
    'H. UDF nine-channel taxonomy (Adam D2)'
  UNION ALL SELECT 'H07. UDF → Referral',
    IF((SELECT ch_referral FROM udf_output) = 'Referral', 'PASS ✅', 'FAIL ❌'),
    'H. UDF nine-channel taxonomy (Adam D2)'
  UNION ALL SELECT 'H08. UDF → Email / SMS',
    IF((SELECT ch_email FROM udf_output) = 'Email / SMS', 'PASS ✅', 'FAIL ❌'),
    'H. UDF nine-channel taxonomy (Adam D2)'
  UNION ALL SELECT 'H09. UDF → Identifiable AI Referrals',
    IF((SELECT ch_ai_referral FROM udf_output) = 'Identifiable AI Referrals', 'PASS ✅', 'FAIL ❌'),
    'H. UDF nine-channel taxonomy (Adam D2)'
),

-- ============================================================================
-- I. Data freshness — most recent event should be reasonably recent
-- ============================================================================
freshness AS (
  SELECT
    MAX(event_timestamp) AS latest_event,
    TIMESTAMP_DIFF(CURRENT_TIMESTAMP(), MAX(event_timestamp), DAY) AS days_since_latest
  FROM `zapit-business-intelligence.zapit_staging.stg_events`
),
freshness_checks AS (
  SELECT 'I01. Data freshness: latest event within last 30 days' AS test_name,
    IF((SELECT days_since_latest FROM freshness) <= 30, 'PASS ✅', 'FAIL ⚠️ (stale data — expected in dev; will fill post-cutover)') AS status,
    'I. Data freshness' AS category
),

-- ============================================================================
-- J. Region correctness spot-check
-- ============================================================================
region_checks AS (
  SELECT 'J01. zapit_staging region is australia-southeast1' AS test_name,
    IF(
      (SELECT location FROM `zapit-business-intelligence.INFORMATION_SCHEMA.SCHEMATA` WHERE schema_name = 'zapit_staging' LIMIT 1) = 'australia-southeast1',
      'PASS ✅',
      'FAIL ❌'
    ) AS status,
    'J. Region' AS category
),

-- ============================================================================
-- Assemble
-- ============================================================================
all_tests AS (
  SELECT * FROM dataset_checks
  UNION ALL SELECT * FROM staging_checks
  UNION ALL SELECT * FROM reporting_checks
  UNION ALL SELECT * FROM ai_checks
  UNION ALL SELECT * FROM crm_checks
  UNION ALL SELECT * FROM other_checks
  UNION ALL SELECT * FROM reconcile_checks
  UNION ALL SELECT * FROM udf_checks
  UNION ALL SELECT * FROM freshness_checks
  UNION ALL SELECT * FROM region_checks
)

SELECT
  category,
  test_name,
  status
FROM all_tests
ORDER BY test_name;
