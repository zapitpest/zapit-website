-- Reserved table shells — schema designed in v4, not populated in MVP.
-- These exist so future ingest blocks slot in without renaming or migration.
-- Every shell includes the identity fields needed to JOIN against stg_leads.
-- Every AI output schema includes human_approval_status per Adam's mandatory rule.

-- ============================================================================
-- zapit_reserved_whatconverts — call/form/chat unified tracking
-- ============================================================================

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_whatconverts.calls` (
  call_id           STRING NOT NULL,
  received_at       TIMESTAMP NOT NULL,
  duration_seconds  INT64,
  caller_phone_hash STRING,            -- SHA-256 of E.164 phone
  tracking_number   STRING,            -- which Zap It line was called
  source            STRING,            -- 'google', 'direct', 'referral', ...
  medium            STRING,
  campaign          STRING,
  landing_page      STRING,
  ga_client_id      STRING,            -- GA4 user_pseudo_id stitch
  recording_url     STRING,
  status            STRING,            -- 'connected', 'missed', 'voicemail'
  service_line      STRING,            -- 'residential' | 'commercial' | 'termite' | 'emergency' | 'generic'
  ingested_at       TIMESTAMP  -- ingest workers set to CURRENT_TIMESTAMP() at insert time
)
OPTIONS (description = 'Reserved — WhatConverts inbound call records. Populated when WhatConverts→BigQuery block ships.');

-- ============================================================================
-- zapit_reserved_zoom — phone call recordings + transcripts
-- ============================================================================

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_zoom.calls` (
  zoom_call_id      STRING NOT NULL,
  call_started_at   TIMESTAMP NOT NULL,
  duration_seconds  INT64,
  caller_phone_hash STRING,
  callee_extension  STRING,            -- which Zap It Zoom number/queue
  direction         STRING,            -- 'inbound' | 'outbound'
  recording_url     STRING,
  transcript_url    STRING,
  has_transcript    BOOL,  -- ingest workers set explicitly (default FALSE conceptually)
  ingested_at       TIMESTAMP  -- ingest workers set to CURRENT_TIMESTAMP() at insert time
)
OPTIONS (description = 'Reserved — Zoom Phone call records. Populated when Zoom block ships.');

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_zoom.transcripts` (
  zoom_call_id      STRING NOT NULL,
  segment_index     INT64 NOT NULL,
  speaker           STRING,
  speaker_role      STRING,            -- 'agent' | 'caller' | 'unknown'
  text              STRING,
  start_seconds     FLOAT64,
  end_seconds       FLOAT64,
  ingested_at       TIMESTAMP  -- ingest workers set to CURRENT_TIMESTAMP() at insert time
)
OPTIONS (description = 'Reserved — Zoom transcript segments keyed to zoom_call_id.');

-- ============================================================================
-- zapit_reserved_ghl — GoHighLevel CRM
-- ============================================================================

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_ghl.contacts` (
  ghl_contact_id    STRING NOT NULL,
  created_at        TIMESTAMP NOT NULL,
  updated_at        TIMESTAMP,
  email_hash        STRING,
  phone_hash        STRING,
  source            STRING,
  tags              ARRAY<STRING>,
  custom_fields     JSON,
  ingested_at       TIMESTAMP  -- ingest workers set to CURRENT_TIMESTAMP() at insert time
)
OPTIONS (description = 'Reserved — GHL contacts. Populated when GHL block ships.');

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_ghl.opportunities` (
  ghl_opportunity_id STRING NOT NULL,
  ghl_contact_id     STRING,
  pipeline_id        STRING,
  stage              STRING,
  status             STRING,           -- 'open' | 'won' | 'lost' | 'abandoned'
  monetary_value     NUMERIC,
  created_at         TIMESTAMP,
  updated_at         TIMESTAMP,
  closed_at          TIMESTAMP,
  service_line       STRING,
  ingested_at        TIMESTAMP  -- ingest workers set to CURRENT_TIMESTAMP() at insert time
)
OPTIONS (description = 'Reserved — GHL opportunities (sales pipeline records).');

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_ghl.pipeline_stages` (
  pipeline_id   STRING NOT NULL,
  stage_id      STRING NOT NULL,
  stage_name    STRING,
  stage_order   INT64,
  ingested_at   TIMESTAMP  -- ingest workers set to CURRENT_TIMESTAMP() at insert time
)
OPTIONS (description = 'Reserved — GHL pipeline stage definitions for join.');

-- ============================================================================
-- zapit_reserved_openclaw — AI analysis outputs. Approval-gated.
-- ============================================================================

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_openclaw.outputs` (
  output_id              STRING NOT NULL,
  generated_at           TIMESTAMP NOT NULL,
  reserved_source_type   STRING NOT NULL,    -- 'call_transcript' | 'session_replay' | 'page_content' | 'seo_data' | ...
  reserved_output_type   STRING NOT NULL,    -- 'report' | 'proposal' | 'call_analysis' | 'recommendation' | 'seo_audit'
  subject_ref            STRING,             -- pointer to the source row (e.g. zoom_call_id, page_path, opportunity_id)
  service_line           STRING,
  payload                JSON,               -- raw analysis output
  summary                STRING,             -- human-readable headline
  -- Adam's mandatory rule: human approval before anything customer-facing ships.
  human_approval_status  STRING NOT NULL,  -- 'pending' | 'approved' | 'rejected' | 'edited' (ingest sets to 'pending' on insert)
  approved_by            STRING,
  approved_at            TIMESTAMP,
  notes                  STRING,
  ingested_at            TIMESTAMP  -- ingest workers set to CURRENT_TIMESTAMP() at insert time
)
OPTIONS (description = 'Reserved — OpenClaw AI outputs. Every row carries human_approval_status — nothing customer-facing ships without approval.');

-- ============================================================================
-- zapit_reserved_clarity — Microsoft Clarity session metadata
-- ============================================================================

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_clarity.sessions` (
  clarity_session_id  STRING NOT NULL,
  recorded_at         TIMESTAMP NOT NULL,
  duration_seconds    INT64,
  ga_client_id        STRING,           -- stitch to GA4 user_pseudo_id
  device_category     STRING,
  rage_clicks         INT64,
  dead_clicks         INT64,
  excessive_scroll    BOOL,
  url_first           STRING,
  url_last            STRING,
  ingested_at         TIMESTAMP  -- ingest workers set to CURRENT_TIMESTAMP() at insert time
)
OPTIONS (description = 'Reserved — Microsoft Clarity session metadata for UX analysis.');
