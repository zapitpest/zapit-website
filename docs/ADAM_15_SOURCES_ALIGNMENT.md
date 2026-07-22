# Adam's 15+1 Long-Term Sources → Our Warehouse Alignment

**Updated 2026-07-20:** PostHog added as source #16 following Adam's 20 Jul long-term stack question. Endorsed for future product-analytics on Commercial Portal + CRM + technician portal + AI apps. Full architectural note in `docs/POSTHOG_FUTURE_ARCHITECTURE.md`.

---



**Purpose:** row-by-row proof that every data source Adam named in his 18 Jul central-BI vision has a home in our BigQuery warehouse — no source closes off, no rework needed to onboard any of them.

**Trigger:** Adam's 18 Jul email listed 15 sources the dashboard should eventually integrate. This document is our internal check that we're architecturally ready.

**Source doc:** engagement letter v2 + BigQuery Foundation & Data Contract v4 + `sql/001_create_datasets.sql` + `sql/003_reserved_schemas.sql`.

---

## Alignment matrix

| # | Adam's source | Our dataset | Status | Table shell exists? | Notes |
|---|---|---|---|---|---|
| 1 | Website analytics | `zapit_raw_ga4` (raw dataset) + `zapit_staging.stg_events/sessions/leads` | ✅ LIVE | Yes (GA4 auto-created `analytics_543350918` + our stg_ views) | Firing since GTM V3 publish 16 Jul |
| 2 | SEO performance | `zapit_reserved_operational` (proposed table `seo_metrics`) OR derived from #3 | 📋 Reserved | Not yet — MVP derives SEO from Search Console | Clarify with Adam whether SEO = Search Console alone, or wants third-party tools (Ahrefs / SEMrush) added |
| 3 | Search Console | `zapit_raw_search_console` (raw dataset) | 📋 Reserved | Yes (raw dataset created) | Blocked on Adam TXT record — activates Page 6 |
| 4 | Meta Ads | `zapit_reserved_meta_ads` | 📋 Reserved | Dataset created, table shells pending detailed design | Meta Ads spend + attribution + audience data |
| 5 | Google Ads | `zapit_reserved_google_ads` | 📋 Reserved | Dataset created, table shells pending detailed design | Google Ads spend + conversions + campaign perf |
| 6 | WhatConverts | `zapit_reserved_whatconverts` | 🟡 Partial | Yes — `calls` table shell defined in [sql/003_reserved_schemas.sql](../sql/003_reserved_schemas.sql) | Tracking script LIVE; call data ingestion is Phase 2 follow-up work |
| 7 | Microsoft Clarity | `zapit_reserved_clarity` | 🟡 Partial | Yes — `sessions` table shell defined | Tag LIVE + collecting; ingest to BigQuery is future block |
| 8 | Zoom Phone | `zapit_reserved_zoom` | 📋 Reserved | Yes — `calls` + `transcripts` tables defined | Ingest is future block |
| 9 | GoHighLevel | `zapit_reserved_ghl` | 📋 Reserved | Yes — `contacts` + `opportunities` + `pipeline_stages` tables defined | Ingest is future block |
| 10 | Commercial Portal data | `zapit_reserved_operational` | 📋 Reserved | Dataset created; specific table shells pending Adam clarifying portal schema | Custom to Zap It's commercial workflow |
| 11 | Operational KPIs | `zapit_reserved_operational` (proposed `kpi_snapshots`) | 📋 Reserved | Dataset created | Wide-format daily KPI snapshots for exec view |
| 12 | Technician performance | `zapit_reserved_operational` (proposed `technician_daily`) | 📋 Reserved | Dataset created | Per-tech per-day metrics — jobs completed, revenue, quality scores |
| 13 | Proposal pipeline | `zapit_reserved_operational` (proposed `proposals`) | 📋 Reserved | Dataset created | Proposal lifecycle — draft → sent → viewed → accepted/declined |
| 14 | Revenue reporting | `zapit_reserved_operational` (proposed `revenue_daily`) | 📋 Reserved | Dataset created | Daily revenue rollup by service line + source |
| 15 | Future AI insights (platform-agnostic layer) | `zapit_reserved_ai` | 📋 Reserved | Yes — `ai_outputs` + `ai_recommendations` + `ai_learning` tables, all with **`human_approval_status`** NOT NULL field per Adam's mandatory rule | Verified in `sql/003_reserved_schemas.sql`. Renamed from `zapit_reserved_openclaw` on 23-Jul-2026 per Adam's 20-Jul platform-agnostic naming request — works with Hermes, Claude, Codex, and future AI agents. |
| 16 | PostHog (product analytics for internal apps — future) | `zapit_reserved_posthog` | 📋 Reserved (dataset pending provisioning until first internal app is instrumented) | Not yet — schema documented in `docs/POSTHOG_FUTURE_ARCHITECTURE.md` | Adam raised 20 Jul; endorsed for Commercial Portal + CRM + technician portal + AI apps. Same ingest pattern as other reserved sources. |

**Totals:** 16 sources · 16 have a home · 1 LIVE · 2 partial · 13 reserved. **Zero closed off.**

---

## Dataset provisioning summary

We have provisioned in BigQuery (as of 18 Jul):

- **2 raw datasets** — `zapit_raw_ga4`, `zapit_raw_search_console`
- **1 staging** — `zapit_staging` (holds `stg_events`, `stg_sessions`, `stg_leads` — 3 views live)
- **1 reporting** — `zapit_reporting` (will hold `v_daily_kpis`, `v_service_line_daily`, `v_traffic_source_daily`, `v_attention_flags`, `v_anomalies` after `sql/004_ceo_dashboard_views.sql` runs)
- **8 reserved** — `zapit_reserved_{whatconverts, zoom, ghl, meta_ads, google_ads, clarity, ai, operational}` (ai renamed from openclaw on 23-Jul-2026)
- **1 reserved (to be provisioned when needed)** — `zapit_reserved_posthog` (schema documented in `docs/POSTHOG_FUTURE_ARCHITECTURE.md`)

**Total: 12 datasets provisioned + 1 documented for future provisioning**, all in `australia-southeast1`, all created via idempotent script `scripts/bootstrap-bigquery.sh`.

Screenshot evidence: the dataset listing you shared 18 Jul shows all 13 rows (12 provisioned + the GA4 auto-created `analytics_543350918`).

---

## Identity-stitching surface (how these join together)

Every reserved schema has fields that allow join back to `stg_leads` — that's how the dashboard threads data from every source into unified reporting:

| Source | Join key(s) to `stg_leads` |
|---|---|
| WhatConverts calls | `caller_phone_hash` → `user_phone_hash` on `stg_leads` |
| Zoom Phone | `caller_phone_hash` → `user_phone_hash` (same pattern) |
| GHL contacts | `email_hash` → `user_email_hash`, `phone_hash` → `user_phone_hash` |
| Meta Ads | `traffic_source = 'facebook'` + `traffic_medium` + `campaign` |
| Google Ads | `traffic_source = 'google'` + `traffic_medium = 'cpc'` + `campaign` |
| Clarity sessions | `ga_client_id` → `user_pseudo_id` on `stg_leads` |
| AI-layer outputs | `subject_ref` → any of the above (call_id, page_path, opportunity_id) |
| Operational | Custom keys per table (revenue.date, technician.employee_id, etc.) |
| PostHog events (future) | `person_email_hash` → `user_email_hash`, `person_phone_hash` → `user_phone_hash` on `stg_leads` |

**Everyone joins somewhere.** Nothing lives in a silo.

---

## Extension path for the dashboard

Each source lights up via the same pattern:

1. Ingest lands in its reserved dataset (Cloud Function / n8n / direct webhook).
2. New staging view `stg_<source>` unifies + joins to `stg_leads`.
3. New Looker Studio page (or panel on an existing page) reads from the new `stg_` view.
4. Zero changes to existing dashboard pages.

**Adding a new source ≠ redesigning the dashboard.** That's the architectural guarantee we made to Adam.

---

## Clarification items to flag with Adam (non-urgent)

1. **"SEO performance"** (source #2) — is this derived from Search Console alone, or do we plan to ingest a third-party tool (Ahrefs / SEMrush / SISTRIX)? Non-urgent; MVP derives SEO from Search Console alone.
2. **Operational sub-sources** (#10-14) — Zap It's commercial portal, tech tracking, proposal system, revenue reporting live in specific systems. When each block is scoped, we'll need to confirm the source-of-truth system (ServiceM8? Simpro? Custom?) and API/webhook availability. Non-urgent; reserved dataset accommodates any schema.

Both flagged for a future Friday status conversation — not blocking any current work.

---

## Bottom line for Adam

Every one of the 15 sources you named has a home in `zapit-business-intelligence`. The architecture is genuinely designed for the central-BI evolution — not retrofitted afterwards. When you're ready to switch on each new source, it plugs into an existing surface without redesign.

The MVP dashboard's job is to be **page 1 of a book that eventually has 15+ chapters** — same book, same binding, same design system, chapters added over time.
