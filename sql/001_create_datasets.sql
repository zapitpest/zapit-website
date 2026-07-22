-- BigQuery Foundation & Data Contract v4 — dataset bootstrap.
-- Region: australia-southeast1. Retention: 3 yrs raw, 3 yrs staging, ongoing reporting.
-- Idempotent. Safe to rerun.

-- ============================================================================
-- MVP ACTIVE DATASETS
-- ============================================================================

-- Raw GA4 export lands here daily (via GA4 → BigQuery link).
CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_raw_ga4`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,  -- 3 years
    description = 'Raw GA4 daily export. Source of truth for web events. Do not modify.'
  );

-- Cleaned, joined staging views built on top of raw.
CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_staging`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,
    description = 'Staging layer — cleaned and joined views over raw sources. Read-only for reporting.'
  );

-- Looker Studio dashboards query this layer.
CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_reporting`
  OPTIONS (
    location = 'australia-southeast1',
    description = 'Reporting layer — denormalized tables and views consumed by Looker Studio.'
  );

-- Search Console daily export.
CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_raw_search_console`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,
    description = 'Raw Search Console daily export. SEO performance source for staging + future AI layer.'
  );

-- ============================================================================
-- RESERVED — designed in v4, not populated until each block is commissioned.
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_whatconverts`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,
    description = 'Reserved — WhatConverts call/form/chat ingest. Schema defined, not populated.'
  );

CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_zoom`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,
    description = 'Reserved — Zoom Phone calls, recordings, transcripts. Schema defined, not populated.'
  );

CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_ghl`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,
    description = 'Reserved — GoHighLevel contacts, opportunities, pipeline stages. Schema defined, not populated.'
  );

CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_clarity`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,
    description = 'Reserved — Microsoft Clarity UX session data. Schema defined, not populated.'
  );

-- Renamed from zapit_reserved_openclaw on 23-Jul-2026 per Adam's 20-Jul request
-- for platform-agnostic AI naming (works with Hermes/Claude/Codex/future agents).
CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_ai`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,
    description = 'Reserved — AI analysis outputs, recommendations, and closed-loop learning (platform-agnostic). Approval-gated per Adam''s mandatory rule.'
  );

CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_operational`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,
    description = 'Reserved — Operational data sources (ServiceM8, scheduling, technician reports). Schema TBD.'
  );

CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_meta_ads`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,
    description = 'Reserved — Meta Ads spend/performance ingest (paired with Meta Pixel events).'
  );

CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_google_ads`
  OPTIONS (
    location = 'australia-southeast1',
    default_table_expiration_days = 1095,
    description = 'Reserved — Google Ads spend/performance ingest.'
  );
