-- MASTER HEALTH CHECK — PART C: UDF classifier + data freshness
--
-- Verifies the channel_group UDF returns each of Adam's 9 canonical channels
-- correctly, plus a data-freshness sanity check.
--
-- Expected: every row PASS.

WITH udf AS (
  SELECT
    `zapit-business-intelligence.zapit_staging.channel_group`('google_business', NULL, NULL) AS gbp,
    `zapit-business-intelligence.zapit_staging.channel_group`('google', 'organic', NULL) AS organic_search,
    `zapit-business-intelligence.zapit_staging.channel_group`('google', 'cpc', NULL) AS google_ads,
    `zapit-business-intelligence.zapit_staging.channel_group`('facebook', 'cpc', NULL) AS meta_ads,
    `zapit-business-intelligence.zapit_staging.channel_group`('facebook', 'social', NULL) AS organic_social,
    `zapit-business-intelligence.zapit_staging.channel_group`('(direct)', '(none)', NULL) AS direct,
    `zapit-business-intelligence.zapit_staging.channel_group`('someblog.com', 'referral', 'someblog.com') AS referral,
    `zapit-business-intelligence.zapit_staging.channel_group`('newsletter', 'email', NULL) AS email_sms,
    `zapit-business-intelligence.zapit_staging.channel_group`(NULL, NULL, 'chat.openai.com') AS ai_referral
),
freshness AS (
  SELECT TIMESTAMP_DIFF(CURRENT_TIMESTAMP(), MAX(event_timestamp), DAY) AS days_since_latest
  FROM `zapit-business-intelligence.zapit_staging.stg_events`
),
checks AS (
  SELECT 'H01. UDF → Google Business Profile / Local SEO' AS test_name,
    IF((SELECT gbp FROM udf) = 'Google Business Profile / Local SEO', 'PASS ✅', 'FAIL ❌') AS status
  UNION ALL SELECT 'H02. UDF → Organic Search',
    IF((SELECT organic_search FROM udf) = 'Organic Search', 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'H03. UDF → Google Ads',
    IF((SELECT google_ads FROM udf) = 'Google Ads', 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'H04. UDF → Meta Ads',
    IF((SELECT meta_ads FROM udf) = 'Meta Ads', 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'H05. UDF → Organic Social',
    IF((SELECT organic_social FROM udf) = 'Organic Social', 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'H06. UDF → Direct',
    IF((SELECT direct FROM udf) = 'Direct', 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'H07. UDF → Referral',
    IF((SELECT referral FROM udf) = 'Referral', 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'H08. UDF → Email / SMS',
    IF((SELECT email_sms FROM udf) = 'Email / SMS', 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'H09. UDF → Identifiable AI Referrals',
    IF((SELECT ai_referral FROM udf) = 'Identifiable AI Referrals', 'PASS ✅', 'FAIL ❌')
  UNION ALL SELECT 'I01. Data freshness — latest event within last 60 days',
    IF((SELECT days_since_latest FROM freshness) <= 60, 'PASS ✅', 'INFO ⚠️ stale — expected pre-cutover')
)
SELECT * FROM checks ORDER BY test_name;
