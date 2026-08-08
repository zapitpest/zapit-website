# BigQuery Setup — Zap It MVP

Source-of-truth SQL for the `zapit-business-intelligence` GCP project. Run in
order, top-down. Idempotent — each script uses `CREATE IF NOT EXISTS` so reruns
are safe.

## Order

1. `001_create_datasets.sql` — All 12 datasets (MVP active + RESERVED shells)
2. `002_staging_views.sql` — `stg_events`, `stg_sessions`, `stg_leads` views on
   top of the raw GA4 export
3. `003_reserved_schemas.sql` — Empty table shells for future ingest blocks
   (WhatConverts, GHL, Zoom, AI layer). Not populated in MVP — design only.
4. `004_ceo_dashboard_views.sql` — Reporting views for the Looker Studio dashboard
   (`v_daily_kpis`, `v_service_line_daily`, `v_traffic_source_daily`,
   `v_attention_flags`, `v_anomalies`).
5. `005_reserved_crm_schema.sql` — Generic CRM warehouse schema per Adam's
   23 Jul 2026 D4 directive. Vendor-neutral (contacts / leads / opportunities /
   outcomes / revenue). Populated when CRM ingest is scheduled, whichever CRM
   Adam picks.
6. `006_channel_group_udf.sql` — 9-channel attribution classifier per Adam's
   23 Jul 2026 D2 directive. UDF `channel_group(source, medium, referrer_host)`
   returns one of Adam's 9 canonical channels. Used by Pages 2 and 3 of the
   Looker Studio report.
7. `007_channel_analytics_views.sql` — session-level channel-aware views.
   NOTE: the `v_events_with_channel` join to raw `events_*` can duplicate rows;
   `v_channel_daily.form_submits` therefore over-counts. Sessions counts are
   accurate (Widget 4 on Page 2). For lead counts use file 008 below instead.
8. `008_leads_by_channel_fix.sql` — accurate confirmed-leads per channel_group.
   Reads directly from `stg_leads` (matches Page 1 Card 3's counting method).
   Used by Widget 5 on Page 2 Marketing Performance.
9. `009_channel_summary.sql` — one row per channel_group combining accurate
   sessions (from `v_channel_daily`) and accurate confirmed leads (from
   `v_leads_by_channel`), plus a correctly-computed conversion rate.
   Used by Widget 6 on Page 2 Marketing Performance (Conversion Rate by Channel table).
10. `010_events_with_channel_fix.sql` — fixes the JOIN duplication bug in file 7's
    `v_events_with_channel` view. Deduplicates raw `events_*` at (event_timestamp,
    user_pseudo_id, event_name) grain before joining. After running this file, the
    `form_submits` column on `v_channel_daily` is correct and safe to use directly
    for Pages 3-6 without the workaround views. Run this before building Page 3.
11. `011_verification_smoke_tests.sql` — 15-check smoke test (superseded by 012).
12. `012_master_warehouse_health_check.sql` — original monolithic master check
    (60 tests in one query). Too complex for BQ query planner. Superseded by
    the split files below.
13. `012a_health_datasets_and_schema.sql` — Part A of master check. Dataset
    presence + schema integrity + AI-layer NOT NULL + CRM tables + region.
    ~30 metadata checks. Fast.
14. `012b_health_data_reconciliation.sql` — Part B. Sessions=16 and Confirmed=6
    reconciled across every view path (staging, reporting, Page 1/2 sources).
    ~15 checks.
15. `012c_health_udf_and_freshness.sql` — Part C. UDF returns each of Adam's 9
    canonical channels correctly + data freshness. ~10 checks.
    Run 012a → 012b → 012c in sequence to cover the full warehouse integrity check.
7. `007_channel_analytics_views.sql` — Channel-aware reporting views for
   Pages 2 and 3. Creates `v_events_with_channel`, `v_sessions_with_channel`,
   `v_channel_daily` (Page 2 rollup), and `v_channel_conversion_detail`
   (Page 3 confirmed vs intent breakdown). Depends on UDF from file 006.

## Prerequisites

- GCP project `zapit-business-intelligence` exists (Adam creates)
- Billing enabled on the project
- BigQuery API enabled
- Running user has `BigQuery Admin` or equivalent on the project
- GA4 → BigQuery export is linked and has produced at least one daily table
  (`zapit_raw_ga4.events_YYYYMMDD`) before running `002_staging_views.sql`

## ⚠️ Before running anything — set the query region

Every dataset lives in `australia-southeast1`. BQ Console defaults new sessions
to US region and will throw:

> `Query error: Location specified in query australia-southeast1 is not consistent with current execution region US`

**Fix (one-off per session):** In BQ Console click **More ▸ Query settings ▸
Additional settings ▸ Processing location ▸ Region ▸ `australia-southeast1` ▸
SAVE**. Setting sticks for the whole session.

If running via `bq` CLI instead, the location is set on each dataset already
and the CLI honours it automatically — no flag needed.

## How to run

```bash
# Authenticate with the delivery account that has Editor on the project
gcloud auth login
gcloud config set project zapit-business-intelligence

# Run each script
bq query --use_legacy_sql=false < sql/001_create_datasets.sql
bq query --use_legacy_sql=false < sql/002_staging_views.sql
bq query --use_legacy_sql=false < sql/003_reserved_schemas.sql
```

## Conventions

- Region: `australia-southeast1` (set on every dataset)
- Retention: raw 3 yrs, staging 3 yrs, reporting ongoing — per v4 data contract
- Naming: `{noun}_{verb}_{qualifier}` snake_case
- All RESERVED schemas include a `human_approval_status` column so the
  approval-gated workflow is built into the data model from day one
