-- SEO reporting views for Looker Studio Page 6 (SEO Performance).
--
-- Source: Google Search Console → BigQuery daily export (configured 12 Aug 2026).
-- Raw dataset: zapit-business-intelligence.searchconsole_raw_search_console
-- Raw tables: searchdata_url_impression, searchdata_site_impression
--
-- Views built (all in zapit_reporting dataset):
--   v_seo_daily_trend    — one row per day; site-level impressions/clicks/CTR/position
--   v_seo_top_pages      — one row per page_url; last-30-day roll-up with category
--   v_seo_top_queries    — one row per query; last-30-day roll-up with brand/non-brand split
--
-- Feeds Looker Studio dashboard page 6 (see docs/LOOKER_PAGE_6_SEO_BUILD_SPEC.md
-- when written). Idempotent — safe to rerun.

-- =============================================================================
-- 1. Daily trend (site-wide totals per day)
-- =============================================================================
CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_seo_daily_trend` AS
WITH export_bounds AS (
  SELECT MIN(data_date) AS export_start_date
  FROM `zapit-business-intelligence.searchconsole_raw_search_console.searchdata_site_impression`
),
daily AS (
  SELECT
    data_date,
    SUM(impressions)                                                   AS impressions,
    SUM(clicks)                                                        AS clicks,
    SAFE_DIVIDE(SUM(clicks), SUM(impressions))                         AS ctr,
    SAFE_DIVIDE(SUM(sum_top_position), SUM(impressions)) + 1           AS avg_position
  FROM `zapit-business-intelligence.searchconsole_raw_search_console.searchdata_site_impression`
  GROUP BY data_date
),
pages_per_day AS (
  SELECT data_date, COUNT(DISTINCT url) AS pages_impressed
  FROM `zapit-business-intelligence.searchconsole_raw_search_console.searchdata_url_impression`
  GROUP BY data_date
),
queries_per_day AS (
  SELECT data_date, COUNT(DISTINCT query) AS queries_impressed
  FROM `zapit-business-intelligence.searchconsole_raw_search_console.searchdata_url_impression`
  WHERE query IS NOT NULL
  GROUP BY data_date
)
SELECT
  d.data_date,
  d.impressions,
  d.clicks,
  d.ctr,
  d.avg_position,
  COALESCE(p.pages_impressed, 0)                                          AS pages_impressed,
  COALESCE(q.queries_impressed, 0)                                        AS queries_impressed,
  (SELECT export_start_date FROM export_bounds)                           AS export_start_date,
  DATE_DIFF(d.data_date, (SELECT export_start_date FROM export_bounds), DAY) AS days_since_export_start,
  d.data_date = (SELECT export_start_date FROM export_bounds)             AS is_export_start_day
FROM daily d
LEFT JOIN pages_per_day  p USING (data_date)
LEFT JOIN queries_per_day q USING (data_date);

-- =============================================================================
-- 2. Top pages (last 30 days, one row per URL, page category label)
-- =============================================================================
CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_seo_top_pages` AS
WITH rolled AS (
  SELECT
    url                                                                AS page_url,
    SUM(impressions)                                                   AS impressions,
    SUM(clicks)                                                        AS clicks,
    SAFE_DIVIDE(SUM(clicks), SUM(impressions))                         AS ctr,
    SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1               AS avg_position
  FROM `zapit-business-intelligence.searchconsole_raw_search_console.searchdata_url_impression`
  WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
  GROUP BY url
)
SELECT
  page_url,
  CASE
    WHEN REGEXP_CONTAINS(page_url, r'/pest-control-[a-z0-9-]+/?$') THEN 'Suburb'
    WHEN REGEXP_CONTAINS(page_url, r'/(termite|ant|cockroach|rodent|spider|bee|wasp|possum|bird)') THEN 'Pest Solution'
    WHEN REGEXP_CONTAINS(page_url, r'/(commercial|business|hospitality|healthcare|childcare)') THEN 'Commercial'
    WHEN REGEXP_CONTAINS(page_url, r'/blog/')                                                   THEN 'Blog'
    WHEN page_url IN ('https://zapitpestmelbourne.com.au/', 'https://zapitpestmelbourne.com.au')  THEN 'Homepage'
    WHEN REGEXP_CONTAINS(page_url, r'/(about|contact|thank-you|pricing)')                       THEN 'Static'
    ELSE 'Other'
  END                                                                  AS page_category,
  impressions,
  clicks,
  ctr,
  avg_position
FROM rolled;

-- =============================================================================
-- 3. Top queries (last 30 days, one row per query, brand vs non-brand split)
-- =============================================================================
CREATE OR REPLACE VIEW `zapit-business-intelligence.zapit_reporting.v_seo_top_queries` AS
WITH rolled AS (
  SELECT
    query,
    SUM(impressions)                                                   AS impressions,
    SUM(clicks)                                                        AS clicks,
    SAFE_DIVIDE(SUM(clicks), SUM(impressions))                         AS ctr,
    SAFE_DIVIDE(SUM(sum_position), SUM(impressions)) + 1               AS avg_position
  FROM `zapit-business-intelligence.searchconsole_raw_search_console.searchdata_url_impression`
  WHERE data_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
    AND query IS NOT NULL
  GROUP BY query
)
SELECT
  query,
  CASE
    WHEN REGEXP_CONTAINS(LOWER(query), r'zap ?it|zapit')                                                                  THEN 'brand'
    WHEN REGEXP_CONTAINS(LOWER(query), r'termite|termites')                                                               THEN 'termite'
    WHEN REGEXP_CONTAINS(LOWER(query), r'ant|ants|cockroach|roach|spider|rodent|rat|mouse|mice|bee|wasp|possum|bird')     THEN 'pest'
    WHEN REGEXP_CONTAINS(LOWER(query), r'commercial|business|restaurant|childcare|hospital')                              THEN 'commercial'
    WHEN REGEXP_CONTAINS(LOWER(query), r'melbourne|richmond|fitzroy|carlton|st ?kilda|brunswick|prahran')                 THEN 'geo'
    ELSE 'generic'
  END                                                                  AS query_category,
  impressions,
  clicks,
  ctr,
  avg_position
FROM rolled;
