-- 9-channel attribution classifier — honours Adam's 23 Jul 2026 D2 directive.
--
-- Takes (source, medium, referrer_host) and returns one of the 9 canonical channels:
--
--   1. Google Business Profile / Local SEO
--   2. Organic Search
--   3. Google Ads
--   4. Meta Ads
--   5. Organic Social
--   6. Direct
--   7. Referral
--   8. Email / SMS
--   9. Identifiable AI Referrals
--   (fallback bucket: "Other" — should be near zero in production)
--
-- Used by:
--   - Looker Studio Pages 2 and 3 (Marketing Performance + Conversion Detail)
--   - Any future channel-attribution reporting
--
-- Rebuild-safe: CREATE OR REPLACE. Idempotent.

CREATE OR REPLACE FUNCTION `zapit-business-intelligence.zapit_staging.channel_group`(
  src STRING,
  med STRING,
  referrer_host STRING
)
RETURNS STRING
AS ((
  CASE
    -- 3. Google Ads — paid search / paid display / paid Youtube via Google Ads
    WHEN LOWER(IFNULL(med, '')) IN ('cpc', 'ppc', 'paid', 'paidsearch') AND LOWER(IFNULL(src, '')) LIKE '%google%'
      THEN 'Google Ads'

    -- 4. Meta Ads — paid Facebook / Instagram
    WHEN LOWER(IFNULL(med, '')) IN ('cpc', 'ppc', 'paid', 'paid_social')
         AND (LOWER(IFNULL(src, '')) LIKE '%facebook%' OR LOWER(IFNULL(src, '')) LIKE '%instagram%' OR LOWER(IFNULL(src, '')) LIKE '%meta%')
      THEN 'Meta Ads'

    -- 9. Identifiable AI Referrals — match on known AI referrer hosts
    WHEN LOWER(IFNULL(referrer_host, '')) IN (
           'chat.openai.com', 'chatgpt.com', 'openai.com',
           'perplexity.ai', 'www.perplexity.ai',
           'claude.ai', 'anthropic.com',
           'gemini.google.com', 'bard.google.com',
           'copilot.microsoft.com', 'you.com',
           'phind.com', 'poe.com'
         )
         OR LOWER(IFNULL(src, '')) IN ('chatgpt', 'perplexity', 'claude', 'gemini', 'copilot', 'ai_referral')
      THEN 'Identifiable AI Referrals'

    -- 1. Google Business Profile / Local SEO
    WHEN LOWER(IFNULL(src, '')) IN ('google_business', 'gbp', 'google_maps', 'gmb', 'business.google.com')
         OR LOWER(IFNULL(med, '')) IN ('gbp', 'organic_local', 'local_seo')
         OR LOWER(IFNULL(referrer_host, '')) IN ('www.google.com/maps', 'maps.google.com', 'business.google.com')
      THEN 'Google Business Profile / Local SEO'

    -- 2. Organic Search — search engines with medium=organic
    WHEN LOWER(IFNULL(med, '')) = 'organic'
      THEN 'Organic Search'

    -- 5. Organic Social — social networks with organic medium (not paid)
    WHEN LOWER(IFNULL(med, '')) IN ('social', 'social-network', 'organic_social', 'sm', 'social-media')
         OR LOWER(IFNULL(src, '')) IN ('facebook', 'instagram', 'linkedin', 'twitter', 'x.com', 'tiktok', 'youtube', 'pinterest', 'threads')
      THEN 'Organic Social'

    -- 8. Email / SMS
    WHEN LOWER(IFNULL(med, '')) IN ('email', 'sms', 'newsletter', 'mms')
         OR LOWER(IFNULL(src, '')) IN ('email', 'sms', 'newsletter', 'mailchimp', 'klaviyo', 'twilio')
      THEN 'Email / SMS'

    -- 6. Direct — direct traffic
    WHEN LOWER(IFNULL(src, '')) IN ('(direct)', 'direct', '') AND LOWER(IFNULL(med, '')) IN ('(none)', 'none', '')
      THEN 'Direct'

    -- 7. Referral — anything else with a referrer
    WHEN LOWER(IFNULL(med, '')) = 'referral' OR LENGTH(IFNULL(referrer_host, '')) > 0
      THEN 'Referral'

    ELSE 'Other'
  END
));

-- ============================================================================
-- Smoke tests (run manually in BQ Console, not part of automated deploy)
-- ============================================================================
-- SELECT `zapit-business-intelligence.zapit_staging.channel_group`('google', 'cpc', NULL);
--   → 'Google Ads'
-- SELECT `zapit-business-intelligence.zapit_staging.channel_group`('google', 'organic', NULL);
--   → 'Organic Search'
-- SELECT `zapit-business-intelligence.zapit_staging.channel_group`(NULL, NULL, 'chat.openai.com');
--   → 'Identifiable AI Referrals'
-- SELECT `zapit-business-intelligence.zapit_staging.channel_group`('facebook', 'social', NULL);
--   → 'Organic Social'
-- SELECT `zapit-business-intelligence.zapit_staging.channel_group`('facebook', 'cpc', NULL);
--   → 'Meta Ads'
-- SELECT `zapit-business-intelligence.zapit_staging.channel_group`('(direct)', '(none)', NULL);
--   → 'Direct'
