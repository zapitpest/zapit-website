# BigQuery Setup — Zap It MVP

Source-of-truth SQL for the `zapit-business-intelligence` GCP project. Run in
order, top-down. Idempotent — each script uses `CREATE IF NOT EXISTS` so reruns
are safe.

## Order

1. `001_create_datasets.sql` — All 12 datasets (MVP active + RESERVED shells)
2. `002_staging_views.sql` — `stg_events`, `stg_sessions`, `stg_leads` views on
   top of the raw GA4 export
3. `003_reserved_schemas.sql` — Empty table shells for future ingest blocks
   (WhatConverts, GHL, Zoom, OpenClaw). Not populated in MVP — design only.

## Prerequisites

- GCP project `zapit-business-intelligence` exists (Adam creates)
- Billing enabled on the project
- BigQuery API enabled
- Running user has `BigQuery Admin` or equivalent on the project
- GA4 → BigQuery export is linked and has produced at least one daily table
  (`zapit_raw_ga4.events_YYYYMMDD`) before running `002_staging_views.sql`

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
