-- Generic CRM warehouse schema — vendor-neutral by design.
-- Honours Adam's 23 Jul 2026 directive: do NOT hardcode GoHighLevel.
-- Whichever CRM Adam picks (custom Lovable/Supabase, GoHighLevel, HubSpot, other),
-- data lands in this generic shape. Vendor is a field, not the schema.
--
-- Long-term revenue attribution chain lives here:
--   source → contacts → leads → opportunities → outcomes → revenue
--
-- Identity stitching back to stg_leads via email_hash + phone_hash.
--
-- Reporting reads from this generic layer only. Never write a widget that
-- references a specific vendor's raw table.

-- ============================================================================
-- Dataset: zapit_reserved_crm
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_crm`
OPTIONS (
  location = 'australia-southeast1',
  description = 'Reserved — generic CRM ingest layer. Vendor-neutral (Lovable/Supabase custom OR GoHighLevel OR other). Populated when CRM ingest is scheduled.'
);

-- ============================================================================
-- contacts — every human known to the business
-- ============================================================================

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_crm.contacts` (
  contact_id         STRING NOT NULL,
  created_at         TIMESTAMP NOT NULL,
  updated_at         TIMESTAMP,
  crm_vendor         STRING,           -- 'lovable_supabase' | 'gohighlevel' | 'hubspot' | ...
  crm_native_id      STRING,           -- vendor's native ID for this contact
  email_hash         STRING,           -- SHA-256 of lowercase+trim email — joins to stg_leads.user_email_hash
  phone_hash         STRING,           -- SHA-256 of E.164 phone — joins to stg_leads.user_phone_hash
  first_name         STRING,
  last_name          STRING,
  full_name          STRING,           -- convenience field for display; can differ from first+last if vendor provides
  contact_type       STRING,           -- 'prospect' | 'customer' | 'past_customer' | 'lost'
  original_source    STRING,           -- first-touch traffic source (from stg_leads if known)
  tags               ARRAY<STRING>,
  custom_fields      JSON,             -- vendor-specific extras without schema drift
  ingested_at        TIMESTAMP
)
OPTIONS (description = 'Generic CRM contacts. Vendor-neutral schema. Populated when CRM ingest ships.');

-- ============================================================================
-- leads — enquiry-stage records (pre-qualified interest)
-- ============================================================================

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_crm.leads` (
  lead_id            STRING NOT NULL,
  contact_id         STRING,           -- joins to contacts
  created_at         TIMESTAMP NOT NULL,
  updated_at         TIMESTAMP,
  crm_vendor         STRING,
  crm_native_id      STRING,
  lead_source        STRING,           -- one of the 9-channel taxonomy values
  lead_status        STRING,           -- 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted'
  qualification_notes STRING,
  service_line       STRING,           -- 'residential' | 'commercial' | 'termite' | 'emergency' | 'generic'
  estimated_value    NUMERIC,
  ingested_at        TIMESTAMP
)
OPTIONS (description = 'Generic CRM leads (enquiry-stage). Vendor-neutral.');

-- ============================================================================
-- opportunities — sales-stage records (post-qualification)
-- ============================================================================

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_crm.opportunities` (
  opportunity_id     STRING NOT NULL,
  contact_id         STRING,
  lead_id            STRING,           -- upstream lead if the opportunity came from one
  created_at         TIMESTAMP NOT NULL,
  updated_at         TIMESTAMP,
  crm_vendor         STRING,
  crm_native_id      STRING,
  pipeline           STRING,           -- 'residential_sales' | 'commercial_sales' | 'termite_sales' | ...
  stage              STRING,           -- vendor-agnostic stage label
  stage_position     INT64,            -- ordinal within the pipeline (0-N)
  status             STRING,           -- 'open' | 'won' | 'lost' | 'abandoned'
  amount             NUMERIC,          -- expected deal value
  probability        FLOAT64,          -- 0.0 to 1.0
  expected_close     DATE,
  closed_at          TIMESTAMP,
  service_line       STRING,
  ingested_at        TIMESTAMP
)
OPTIONS (description = 'Generic CRM opportunities (sales-stage). Vendor-neutral. Feeds pipeline reporting.');

-- ============================================================================
-- outcomes — what actually happened (won / lost / churned) with reason
-- ============================================================================

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_crm.outcomes` (
  outcome_id         STRING NOT NULL,
  opportunity_id     STRING NOT NULL,
  contact_id         STRING,
  recorded_at        TIMESTAMP NOT NULL,
  outcome_type       STRING,           -- 'won' | 'lost' | 'churned' | 'reopened'
  outcome_reason     STRING,           -- vendor free-text or picklist
  competitor         STRING,           -- if lost to competitor
  ingested_at        TIMESTAMP
)
OPTIONS (description = 'Generic CRM outcomes. Enables win/loss analysis + close-rate reporting.');

-- ============================================================================
-- revenue — actual cash-in per contact/opportunity
-- ============================================================================

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_crm.revenue` (
  revenue_id         STRING NOT NULL,
  opportunity_id     STRING,           -- opportunity that generated the revenue (nullable for recurring bookings)
  contact_id         STRING NOT NULL,
  transaction_date   DATE NOT NULL,
  amount_ex_gst      NUMERIC NOT NULL,
  amount_inc_gst     NUMERIC,
  currency           STRING,           -- 'AUD' default
  transaction_type   STRING,           -- 'initial' | 'recurring' | 'callback' | 'refund'
  service_line       STRING,
  invoice_reference  STRING,
  ingested_at        TIMESTAMP
)
OPTIONS (description = 'Generic CRM revenue transactions. Closes the source-to-revenue attribution chain.');

-- ============================================================================
-- Notes
-- ============================================================================
-- 1. When ingest is scheduled, populate crm_vendor with the chosen vendor's name.
-- 2. crm_native_id preserves the vendor's original ID so reverse-lookups work.
-- 3. email_hash + phone_hash are the join keys back to stg_leads.
--    Vendors should hash these before insert (lowercase+trim email → SHA-256; E.164 phone → SHA-256).
-- 4. custom_fields JSON absorbs vendor-specific extras without schema migrations.
-- 5. The existing zapit_reserved_ghl dataset is retained as an OPTIONAL vendor-specific staging layer.
--    If GHL is used, raw GHL data can land there and be normalised into this generic schema.
--    Reporting NEVER reads directly from zapit_reserved_ghl — always from this generic layer.
