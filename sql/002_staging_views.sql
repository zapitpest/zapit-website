-- Staging views on top of raw GA4 export.
-- Run after at least one daily GA4 export has landed in zapit_raw_ga4.
-- Naming follows v4 data contract: stg_{entity}.

-- ============================================================================
-- stg_events — flattened event stream, one row per event, typed columns
-- pulled out of the GA4 event_params/user_properties nested fields.
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_staging.stg_events` AS
SELECT
  event_date,
  TIMESTAMP_MICROS(event_timestamp) AS event_timestamp,
  event_name,
  user_pseudo_id,
  -- Session identifier from GA4 — ga_session_id is in event_params.
  (
    SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id'
  ) AS ga_session_id,
  -- Service line tag pushed from website dataLayer.
  (
    SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'service_line'
  ) AS service_line,
  (
    SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_type'
  ) AS page_type,
  (
    SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_path'
  ) AS page_path,
  (
    SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'form_type'
  ) AS form_type,
  (
    SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'click_target'
  ) AS click_target,
  -- Hashed PII — raw never leaves the browser; GTM hashes before send.
  (
    SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'user_email_hash'
  ) AS user_email_hash,
  (
    SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'user_phone_hash'
  ) AS user_phone_hash,
  -- Source / attribution.
  traffic_source.source AS traffic_source,
  traffic_source.medium AS traffic_medium,
  traffic_source.name AS traffic_campaign,
  device.category AS device_category,
  geo.country AS country,
  geo.region AS region,
  geo.city AS city
-- GA4's daily export lives in `analytics_543350918` (auto-created 17 Jul 2026,
-- named from the GA4 property ID). Wildcard `events_*` matches both the finalized
-- daily tables (`events_YYYYMMDD`) and the current-day intraday table
-- (`events_intraday_YYYYMMDD`) — GA4 supersedes intraday with the daily once
-- the day closes, so no duplicate risk.
-- Note: `traffic_source` here is user-first-touch attribution (stable GA4
-- schema). For session-level last-click attribution we can switch to
-- `session_traffic_source_last_click` in a v2 pass — not needed for MVP.
FROM `zapit-business-intelligence.analytics_543350918.events_*`;

-- ============================================================================
-- stg_sessions — one row per GA4 session.
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_staging.stg_sessions` AS
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
  ANY_VALUE(device_category) AS device_category,
  ANY_VALUE(city) AS city
FROM `zapit-business-intelligence.zapit_staging.stg_events`
WHERE ga_session_id IS NOT NULL
GROUP BY user_pseudo_id, ga_session_id;

-- ============================================================================
-- stg_leads — one row per conversion event (form submit OR contact click).
-- This is the join surface for future WhatConverts/GHL/Zoom blocks: each row
-- has user_pseudo_id + hashes for downstream identity stitching.
-- ============================================================================

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_staging.stg_leads` AS
SELECT
  event_timestamp AS lead_timestamp,
  user_pseudo_id,
  ga_session_id,
  event_name AS lead_event,
  CASE
    WHEN event_name LIKE 'form_submit_%' THEN 'form'
    WHEN event_name IN ('click_phone', 'click_email') THEN 'click'
    WHEN event_name = 'book_intent' THEN 'booking_intent'
    WHEN event_name = 'call_connect_inbound' THEN 'confirmed_call'
    ELSE 'other'
  END AS lead_channel,
  -- lead_class classifies every event into two families per Adam's Condition 3
  -- (17 Jul 2026 sign-off): distinguishes user INTENT from CONFIRMED conversions.
  -- Executive Summary "Leads" KPI uses lead_class = 'confirmed_lead' only,
  -- so click_phone / click_email never inflate the top-line conversion number.
  CASE
    WHEN event_name LIKE 'form_submit_%' THEN 'confirmed_lead'
    WHEN event_name = 'call_connect_inbound' THEN 'confirmed_lead'
    WHEN event_name IN ('click_phone', 'click_email', 'book_intent') THEN 'intent_signal'
    ELSE 'other'
  END AS lead_class,
  service_line,
  page_type,
  page_path,
  form_type,
  click_target,
  user_email_hash,
  user_phone_hash,
  traffic_source,
  traffic_medium,
  traffic_campaign,
  device_category,
  city
FROM `zapit-business-intelligence.zapit_staging.stg_events`
WHERE event_name LIKE 'form_submit_%'
   OR event_name IN ('click_phone', 'click_email', 'call_connect_inbound', 'book_intent');
