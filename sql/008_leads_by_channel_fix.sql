-- Fix for the channel-attribution bug in confirmed-leads reporting.
--
-- The v_events_with_channel view (sql/007) joins stg_events with the raw GA4
-- events_* wildcard table. That wildcard matches both finalised daily tables
-- and the current-day intraday table, and the JOIN can duplicate rows,
-- inflating v_channel_daily.form_submits (shows 10 when reality is 6).
--
-- Fix: build a lean view directly on stg_leads (the source of truth for
-- confirmed-lead counting, matching Page 1 Card 3's method). Apply the
-- 9-channel classifier UDF inline so Widget 5 on Page 2 Marketing Performance
-- can use channel_group as its dimension, honouring Adam's 23 Jul D2 directive.
--
-- Note: page_referrer_host is not carried through stg_leads today, so the
-- Identifiable AI Referrals bucket will remain empty for leads until the
-- source pipeline is extended. Sessions (Widget 4) still detects AI referrals
-- correctly because v_sessions_with_channel projects page_referrer_host.

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_leads_by_channel` AS
SELECT
  l.lead_timestamp,
  l.user_pseudo_id,
  l.ga_session_id,
  l.lead_event,
  l.lead_channel,
  l.lead_class,
  l.service_line,
  l.page_type,
  l.page_path,
  l.form_type,
  l.click_target,
  l.user_email_hash,
  l.user_phone_hash,
  l.traffic_source,
  l.traffic_medium,
  l.traffic_campaign,
  l.device_category,
  l.city,
  `zapit-business-intelligence.zapit_staging.channel_group`(
    l.traffic_source,
    l.traffic_medium,
    NULL
  ) AS channel_group
FROM `zapit-business-intelligence.zapit_staging.stg_leads` l;

-- ============================================================================
-- Smoke tests (run manually in BQ Console)
-- ============================================================================
-- 1. Total confirmed leads by channel_group should sum to Page 1 Card 3 total (6 in test data):
-- SELECT channel_group, COUNT(*) AS confirmed_leads
-- FROM `zapit-business-intelligence.zapit_reporting.v_leads_by_channel`
-- WHERE lead_class = 'confirmed_lead'
-- GROUP BY channel_group
-- ORDER BY confirmed_leads DESC;
--
-- 2. Verify no over-count: total confirmed leads = 6:
-- SELECT COUNT(*) AS total_confirmed_leads
-- FROM `zapit-business-intelligence.zapit_reporting.v_leads_by_channel`
-- WHERE lead_class = 'confirmed_lead';
