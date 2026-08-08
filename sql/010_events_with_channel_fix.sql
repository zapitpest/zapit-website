-- Fix for the JOIN duplication bug in v_events_with_channel from sql/007.
--
-- Root cause: the original view JOINed stg_events with raw analytics_*.events_*
-- to pull page_referrer_url out of raw event_params. The wildcard events_* matches
-- both finalised daily tables (events_YYYYMMDD) and intraday tables
-- (events_intraday_YYYYMMDD) when both exist for the same day. That causes rows
-- to duplicate, and v_channel_daily.form_submits then over-counts.
--
-- Fix: pull page_referrer_url from event_params directly on stg_events via a
-- subquery/UNNEST pattern using raw only when necessary, and dedupe the join
-- to guarantee one row per (event_timestamp, user_pseudo_id, event_name).
--
-- Idempotent: CREATE OR REPLACE. Safe to run multiple times.

CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_events_with_channel` AS
WITH raw_dedup AS (
  -- Dedupe raw events to eliminate the intraday-vs-daily double-match.
  -- One row per (event_timestamp, user_pseudo_id, event_name).
  SELECT
    event_timestamp,
    user_pseudo_id,
    event_name,
    ANY_VALUE(
      (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_referrer')
    ) AS page_referrer_url
  FROM `zapit-business-intelligence.analytics_543350918.events_*`
  GROUP BY event_timestamp, user_pseudo_id, event_name
),
events AS (
  SELECT
    e.*,
    raw.page_referrer_url
  FROM `zapit-business-intelligence.zapit_staging.stg_events` e
  LEFT JOIN raw_dedup raw
    ON e.event_timestamp = TIMESTAMP_MICROS(raw.event_timestamp)
   AND e.user_pseudo_id = raw.user_pseudo_id
   AND e.event_name = raw.event_name
)
SELECT
  events.*,
  REGEXP_EXTRACT(page_referrer_url, r'^https?://([^/]+)') AS page_referrer_host,
  `zapit-business-intelligence.zapit_staging.channel_group`(
    traffic_source,
    traffic_medium,
    REGEXP_EXTRACT(page_referrer_url, r'^https?://([^/]+)')
  ) AS channel_group
FROM events;

-- ============================================================================
-- Smoke test — total form_submit_% events should now equal stg_leads count (6)
-- ============================================================================
-- SELECT COUNT(*) AS event_count
-- FROM `zapit-business-intelligence.zapit_reporting.v_events_with_channel`
-- WHERE event_name LIKE 'form_submit_%';
--
-- Expected: 6 (matches stg_leads count and Page 1 Card 3).
