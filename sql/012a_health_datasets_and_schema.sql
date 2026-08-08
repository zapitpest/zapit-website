-- MASTER HEALTH CHECK — PART A: Dataset presence + schema integrity
--
-- Fast metadata-only checks. Run in BQ Console (region: australia-southeast1).
-- Verifies every dataset exists, AI + CRM reserved tables are present, and
-- human_approval_status is enforced.
--
-- Expected: every row PASS.

WITH datasets AS (
  SELECT schema_name FROM `zapit-business-intelligence.INFORMATION_SCHEMA.SCHEMATA`
),
ai_cols AS (
  SELECT table_name, column_name, is_nullable
  FROM `zapit-business-intelligence.zapit_reserved_ai.INFORMATION_SCHEMA.COLUMNS`
),
crm_tables AS (
  SELECT table_name FROM `zapit-business-intelligence.zapit_reserved_crm.INFORMATION_SCHEMA.TABLES`
),
wc_tables AS (
  SELECT table_name FROM `zapit-business-intelligence.zapit_reserved_whatconverts.INFORMATION_SCHEMA.TABLES`
),
zoom_tables AS (
  SELECT table_name FROM `zapit-business-intelligence.zapit_reserved_zoom.INFORMATION_SCHEMA.TABLES`
),
ghl_tables AS (
  SELECT table_name FROM `zapit-business-intelligence.zapit_reserved_ghl.INFORMATION_SCHEMA.TABLES`
),
clarity_tables AS (
  SELECT table_name FROM `zapit-business-intelligence.zapit_reserved_clarity.INFORMATION_SCHEMA.TABLES`
),
region AS (
  SELECT location FROM `zapit-business-intelligence.INFORMATION_SCHEMA.SCHEMATA` WHERE schema_name = 'zapit_staging'
),
checks AS (
  SELECT 'A01. zapit_raw_ga4 exists' AS test_name,
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_raw_ga4'), 'PASS ✅', 'FAIL ❌') AS status
  UNION ALL SELECT 'A02. zapit_raw_search_console exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_raw_search_console'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A03. zapit_staging exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_staging'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A04. zapit_reporting exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reporting'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A05. zapit_reserved_whatconverts exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_whatconverts'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A06. zapit_reserved_zoom exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_zoom'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A07. zapit_reserved_ghl exists (optional, Adam D4)',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_ghl'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A08. zapit_reserved_meta_ads exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_meta_ads'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A09. zapit_reserved_google_ads exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_google_ads'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A10. zapit_reserved_clarity exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_clarity'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A11. zapit_reserved_operational exists',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_operational'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A12. zapit_reserved_ai exists (Adam D5 platform-agnostic)',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_ai'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A13. zapit_reserved_crm exists (Adam 23 Jul D4 CRM-agnostic)',
    IF(EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_crm'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'A14. legacy zapit_reserved_openclaw REMOVED',
    IF(NOT EXISTS(SELECT 1 FROM datasets WHERE schema_name = 'zapit_reserved_openclaw'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'D01. ai_outputs table exists with source_agent column',
    IF(EXISTS(SELECT 1 FROM ai_cols WHERE table_name = 'ai_outputs' AND column_name = 'source_agent'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'D02. ai_recommendations table exists',
    IF(EXISTS(SELECT 1 FROM ai_cols WHERE table_name = 'ai_recommendations'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'D03. ai_learning table exists (closed-loop learning per Adam 22 Jul)',
    IF(EXISTS(SELECT 1 FROM ai_cols WHERE table_name = 'ai_learning'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'D04. ai_outputs.human_approval_status is NOT NULL',
    IF(EXISTS(SELECT 1 FROM ai_cols WHERE table_name = 'ai_outputs' AND column_name = 'human_approval_status' AND is_nullable = 'NO'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'D05. ai_recommendations.human_approval_status is NOT NULL',
    IF(EXISTS(SELECT 1 FROM ai_cols WHERE table_name = 'ai_recommendations' AND column_name = 'human_approval_status' AND is_nullable = 'NO'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'E01. zapit_reserved_crm.contacts exists',
    IF(EXISTS(SELECT 1 FROM crm_tables WHERE table_name = 'contacts'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'E02. zapit_reserved_crm.leads exists',
    IF(EXISTS(SELECT 1 FROM crm_tables WHERE table_name = 'leads'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'E03. zapit_reserved_crm.opportunities exists',
    IF(EXISTS(SELECT 1 FROM crm_tables WHERE table_name = 'opportunities'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'E04. zapit_reserved_crm.outcomes exists',
    IF(EXISTS(SELECT 1 FROM crm_tables WHERE table_name = 'outcomes'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'E05. zapit_reserved_crm.revenue exists',
    IF(EXISTS(SELECT 1 FROM crm_tables WHERE table_name = 'revenue'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'F01. reserved_whatconverts.calls exists',
    IF(EXISTS(SELECT 1 FROM wc_tables WHERE table_name = 'calls'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'F02. reserved_zoom.calls exists',
    IF(EXISTS(SELECT 1 FROM zoom_tables WHERE table_name = 'calls'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'F03. reserved_zoom.transcripts exists',
    IF(EXISTS(SELECT 1 FROM zoom_tables WHERE table_name = 'transcripts'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'F04. reserved_ghl.contacts exists',
    IF(EXISTS(SELECT 1 FROM ghl_tables WHERE table_name = 'contacts'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'F05. reserved_clarity.sessions exists',
    IF(EXISTS(SELECT 1 FROM clarity_tables WHERE table_name = 'sessions'), 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'J01. zapit_staging region is australia-southeast1',
    IF((SELECT location FROM region) = 'australia-southeast1', 'PASS ✅', 'FAIL ❌')
)
SELECT * FROM checks ORDER BY test_name;
