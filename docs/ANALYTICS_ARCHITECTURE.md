# Analytics Architecture — End-to-End Data Flow

**Purpose:** one consolidated reference for the full analytics stack: how a visitor's action becomes a row in BigQuery becomes a chart in the executive dashboard. Read this to understand the whole picture without hunting through 5 separate docs.

**Companion docs (deep-dives on specific layers):**
- `docs/gtm-blueprint.md` — GTM container internals (variables, triggers, tag configs)
- `sql/README.md` + individual SQL files — warehouse structure
- `docs/LOOKER_DASHBOARD_MOCKUP_v2_BUILD_SPEC.md` — dashboard blueprint
- `docs/ADAM_15_SOURCES_ALIGNMENT.md` — future data source map (16 sources)

---

## The full pipeline in one diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  1. WEBSITE (Next.js static export)                                          │
│                                                                              │
│  User loads a page (or clicks a form/phone/email link)                       │
│         │                                                                    │
│         ▼                                                                    │
│  src/components/layout/PageViewTracker.tsx                                   │
│  src/components/layout/ClickTracker.tsx                                      │
│  src/components/sections/ContactForm.tsx                                     │
│         │                                                                    │
│         ▼                                                                    │
│  src/lib/analytics/dataLayer.ts helpers:                                     │
│    trackFormSubmit() · trackClickPhone() · trackClickEmail() ·               │
│    trackBookIntent() · submitLeadToWhatConverts()                            │
│         │                                                                    │
│         ▼                                                                    │
│  window.dataLayer.push({ event, service_line, page_type, ... })              │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  2. GOOGLE TAG MANAGER (container GTM-PFGV87RB, version 3 live)              │
│                                                                              │
│  ┌─── 9 built-in variables enabled                                           │
│  ├─── 9 user-defined Data Layer Variables (dlv.service_line, dlv.form_type,  │
│  │    dlv.click_target, dlv.user_email, dlv.user_phone, ...)                 │
│  ├─── 2 Custom JS variables (SHA-256 hashing at browser edge):               │
│  │    dlv.user_email_hash · dlv.user_phone_hash                              │
│  │                                                                            │
│  ├─── 9 event triggers (page_view_context + 5 form_submit + 2 click +        │
│  │    book_intent dormant)                                                   │
│  │                                                                            │
│  └─── 14 tags firing based on triggers ──────────────────────────────┐       │
└──────────────────────────────────────────────────────────────────────┼───────┘
                                                                       │
              ┌────────────────┬──────────────────┬────────────────────┼───────┐
              ▼                ▼                  ▼                    ▼       │
       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    ┌─────────────┐   │
       │  Google     │  │    Meta     │  │  Microsoft  │    │  WhatConv.  │   │
       │  Analytics 4│  │    Pixel    │  │   Clarity   │    │   script    │   │
       │             │  │             │  │             │    │             │   │
       │  8 events + │  │  PageView + │  │  Session    │    │  Session    │   │
       │  7 custom   │  │  Lead +     │  │  recordings │    │  attribution│   │
       │  dimensions │  │  Contact    │  │  + heatmaps │    │  + calls    │   │
       │             │  │  (advanced  │  │             │    │  (future)   │   │
       │             │  │  matching   │  │             │    │             │   │
       │             │  │  via hashed │  │             │    │             │   │
       │             │  │  PII)       │  │             │    │             │   │
       └──────┬──────┘  └─────────────┘  └─────────────┘    └──────┬──────┘   │
              │                                                    │           │
              │ daily export (batched overnight)                   │ future    │
              ▼                                                    ▼ ingest    │
┌─────────────────────────────────────────────────────────────────────────────┐│
│  3. BIGQUERY WAREHOUSE (project zapit-business-intelligence,                ││
│                        region australia-southeast1)                          ││
│                                                                              ││
│  Raw layer:                                                                  ││
│  ┌── analytics_543350918.events_YYYYMMDD (GA4-created, daily)                ││
│  ├── analytics_543350918.events_intraday_YYYYMMDD (real-time, transient)    ││
│  ├── analytics_543350918.pseudonymous_users_YYYYMMDD                        ││
│  └── zapit_raw_search_console (reserved for Search Console linkage)         ││
│                                                                              ││
│  Staging layer (unified typed views):                                        ││
│  ┌── zapit_staging.stg_events (flattened event params + attribution)         ││
│  ├── zapit_staging.stg_sessions (grouped by ga_session_id)                  ││
│  └── zapit_staging.stg_leads (form_submit + click + book_intent events,     ││
│      with lead_class field separating intent_signal vs confirmed_lead)      ││
│                                                                              ││
│  Reporting layer (CEO dashboard substrate):                                  ││
│  ┌── zapit_reporting.v_daily_kpis                                            ││
│  ├── zapit_reporting.v_service_line_daily                                    ││
│  ├── zapit_reporting.v_traffic_source_daily                                  ││
│  ├── zapit_reporting.v_attention_flags (Q5 rule-based flags)                 ││
│  └── zapit_reporting.v_anomalies (Q6 ±2σ WoW deviation flags)                ││
│                                                                              ││
│  Reserved for future sources (empty shells ready for ingest):                ││
│  ├── zapit_reserved_whatconverts.calls                                       ││
│  ├── zapit_reserved_zoom.calls + .transcripts                                ││
│  ├── zapit_reserved_ghl.contacts + .opportunities + .pipeline_stages         ││
│  ├── zapit_reserved_meta_ads (Meta Ads spend + attribution)                  ││
│  ├── zapit_reserved_google_ads (Google Ads spend + conversions)              ││
│  ├── zapit_reserved_clarity.sessions                                         ││
│  ├── zapit_reserved_ai.ai_outputs + .ai_recommendations + .ai_learning      ││
│  │   (all with human_approval_status field — platform-agnostic AI layer)    ││
│  ├── zapit_reserved_operational (multiple tables — technicians, proposals,   ││
│  │                                revenue, portal, KPIs)                     ││
│  └── zapit_reserved_posthog (documented, provisioned on first internal app)  ││
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  4. LOOKER STUDIO (executive dashboard, 6 pages)                             │
│                                                                              │
│  Page 1 — Executive Summary (CEO Dashboard) — morning check                  │
│  Page 2 — Acquisition (where visitors come from)                             │
│  Page 3 — Behaviour (device, landing pages, service page performance)        │
│  Page 4 — Conversion Detail (intent signals vs confirmed leads separated)    │
│  Page 5 — Segments (Commercial vs Residential, Termite vs General, monthly)  │
│  Page 6 — Search Console (activates on TXT record verification)              │
│                                                                              │
│  Data sources: 3 staging views + 5 reporting views (BigQuery direct connect) │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Layer-by-layer detail

### Layer 1 — Website (dataLayer origination)

Every user action that matters becomes a `window.dataLayer.push()` call. The helpers in `src/lib/analytics/dataLayer.ts` are the only entry points — no component pushes directly to dataLayer.

**Helpers:**
- `trackFormSubmit({ formType, email, phone })` — fires `form_submit_<type>` event
- `trackClickPhone(phone)` — fires `click_phone`
- `trackClickEmail(email)` — fires `click_email`
- `trackBookIntent(url)` — fires `book_intent` (dormant post-Square-removal)
- `submitLeadToWhatConverts(lead)` — client-side POST to WhatConverts Lead API (env-var gated)

**Context auto-detected from URL path:**
- `service_line` — residential / commercial / termite / emergency / generic (via `src/lib/analytics/service-line.ts`)
- `page_type` — home / service / location / info / contact / other

**Global listeners:**
- `src/components/layout/PageViewTracker.tsx` — fires `page_view_context` on every route change (App Router pushState) so context is available on every page
- `src/components/layout/ClickTracker.tsx` — captures every `tel:` and `mailto:` link click at the document level via event delegation

### Layer 2 — Google Tag Manager (container `GTM-PFGV87RB`)

Full container structure documented in `docs/gtm-blueprint.md`. Summary:

**14 tags in V3 (published 16 Jul 2026):**
- `tag.ga4.config` (Google Tag) — sends page_view with service_line + page_type dimensions
- 5 GA4 event tags for form_submit_{contact, quote, booking, callback, emergency}
- 2 GA4 event tags for click_phone + click_email
- `tag.ga4.book_intent` (dormant since Adam removed Square scope)
- `tag.meta.pixel_base` (fires PageView on All Pages, setup tag for pixel_lead + pixel_contact)
- `tag.meta.pixel_lead` (Meta Lead event on all 5 form_submit triggers, with hashed em + ph)
- `tag.meta.pixel_contact` (Meta Contact event on phone/email clicks)
- `tag.clarity.script` (Microsoft Clarity)
- `tag.whatconverts.script` (WhatConverts session attribution)

**Tag sequencing:** `tag.meta.pixel_base` fires as a setup tag before `pixel_lead` and `pixel_contact` — prevents race conditions where `fbq` isn't initialised yet.

**PII hashing:** two Custom JS variables (`dlv.user_email_hash`, `dlv.user_phone_hash`) hash raw email/phone with SHA-256 at the browser edge. Every tag that references PII references the hash, never the raw value.

### Layer 3 — GA4 → BigQuery daily export

Configured 16 Jul 2026 via a short credential session on Adam's account (Owner role needed for `setIamPolicy`). Settings:
- Project: `zapit-business-intelligence`
- Data location: Sydney (`australia-southeast1` — matches our warehouse region for free cross-dataset joins)
- Event data: Daily export ON
- User data: Daily export ON (needed for Enhanced Conversions PII matching)
- Streaming: OFF (not needed for MVP, would cost extra)
- Ad identifiers: OFF (no mobile app)
- All events included, no events excluded

**Result:** every day GA4 writes `events_YYYYMMDD` + `events_intraday_YYYYMMDD` (transient) + `pseudonymous_users_YYYYMMDD` to `analytics_543350918` dataset. Standard GA4 export schema — nested `event_params`, `traffic_source`, `device`, `geo`.

### Layer 4 — BigQuery staging + reporting layer

**Staging views** (`sql/002_staging_views.sql`) flatten GA4's nested schema into typed columns:

**`stg_events`** — one row per event, all custom event params extracted from the nested `event_params` REPEATED field. Columns: `event_date`, `event_timestamp`, `event_name`, `user_pseudo_id`, `ga_session_id`, `service_line`, `page_type`, `page_path`, `form_type`, `click_target`, `user_email_hash`, `user_phone_hash`, `traffic_source`, `traffic_medium`, `traffic_campaign`, `device_category`, `country`, `region`, `city`.

**`stg_sessions`** — one row per GA4 session, grouped by `user_pseudo_id + ga_session_id`. Includes `session_start`, `session_end`, `page_view_count`, `form_submit_count`, `contact_click_count`, plus session-level attribution.

**`stg_leads`** — one row per conversion event (form_submit_* OR click_phone/email OR book_intent OR call_connect_inbound). Adds two derived fields:
- `lead_channel` — 'form' | 'click' | 'booking_intent' | 'confirmed_call'
- `lead_class` — 'confirmed_lead' | 'intent_signal' (per Adam's Condition 3 — separates completed conversions from intent signals so the top-line Leads KPI never inflates by counting phone clicks)

**Reporting views** (`sql/004_ceo_dashboard_views.sql`) power the CEO Dashboard on Page 1:

- `v_daily_kpis` — wide-format daily metrics + baseline windows for the top-of-page KPIs
- `v_service_line_daily` — service-line WoW breakdown (Adam's Q4)
- `v_traffic_source_daily` — top sources by day (Adam's Q2)
- `v_attention_flags` — 4 rule-based flags (sessions dropped >40%, service line silent, source stalled, CR collapsed) — powers the "Needs Attention" panel
- `v_anomalies` — ±2σ WoW deviations on sessions/leads/CR — powers the "Anomalies" panel

Empty result on healthy day = green-check state (desirable, not error).

### Layer 5 — Looker Studio dashboard

6 pages, each reading from staging or reporting views via BigQuery direct connector. Full page-by-page build spec in `docs/LOOKER_DASHBOARD_MOCKUP_v2_BUILD_SPEC.md`. Adam's 4 sign-off conditions are architecturally enforced:

- **Condition 1 — booking future-proofed** — Page 4 has empty-state booking panel that activates when `stg_leads.lead_channel = 'booking_intent'` gets non-zero rows
- **Condition 2 — dynamic conversion types** — every conversion widget uses dimension-based GROUP BY (form_type, click_target, service_line), not hardcoded row lists. New event types auto-appear.
- **Condition 3 — intent vs confirmed** — `lead_class` field on `stg_leads` classified in SQL, not in dashboard filters. Confirmed Leads KPI ONLY counts `confirmed_lead` rows.
- **Condition 4 — Page 1 morning-check only** — Executive Summary page contains only the top-line KPIs + daily trend + top sources + Needs Attention + Anomalies + service-line WoW strip. Detail lives on Pages 2-6.

Refresh cadence: daily (BigQuery direct connector caches for ~12h; date-range compare enabled globally so every KPI shows WoW delta).

---

## Identity stitching — how future sources join together

Every reserved dataset schema has fields that allow joining back to `stg_leads` — the reason cross-source reporting is possible without rework:

| Source | Join key(s) to `stg_leads` |
|---|---|
| WhatConverts calls | `caller_phone_hash` → `user_phone_hash` |
| Zoom Phone | `caller_phone_hash` → `user_phone_hash` |
| GoHighLevel contacts | `email_hash` → `user_email_hash`, `phone_hash` → `user_phone_hash` |
| Meta Ads | `traffic_source='facebook'` + `traffic_medium` + `campaign` |
| Google Ads | `traffic_source='google'` + `traffic_medium='cpc'` + `campaign` |
| Clarity sessions | `ga_client_id` → `user_pseudo_id` |
| AI-layer outputs | `subject_ref` → any of the above (call_id, page_path, opportunity_id) |
| Operational | Custom keys per table (`revenue.date`, `technician.employee_id`, etc.) |
| PostHog (future) | `person_email_hash` → `user_email_hash`, `person_phone_hash` → `user_phone_hash` |

All PII-based joins use SHA-256 hashed values throughout — never raw email/phone. Consistent hash algorithm (lowercase + trim for email; E.164 normalisation for phone) ensures matches across sources.

---

## What flows to which reporting surface

| Question | Answered by | Reads from |
|---|---|---|
| Website traffic + acquisition | Page 1 + Page 2 of dashboard | `stg_sessions`, `v_traffic_source_daily` |
| Lead volume + quality | Page 1 (KPI) + Page 4 (detail) | `stg_leads` (filtered `lead_class = 'confirmed_lead'`) |
| Intent signals (phone/email clicks) | Page 4 right panel | `stg_leads` (filtered `lead_class = 'intent_signal'`) |
| Service-line performance | Page 3 + Page 5 | `stg_sessions` + `stg_leads` grouped by `service_line` |
| Attribution — where did leads come from? | Page 2 leads-by-source | `stg_leads` grouped by `traffic_source` + `traffic_medium` |
| Anomaly detection | Page 1 "Needs Attention" + "Anomalies" panels | `v_attention_flags` + `v_anomalies` |
| Search Console performance | Page 6 (activates on TXT verification) | `zapit_raw_search_console` (once linked) |
| Meta Pixel events (Ads Manager reporting) | Meta Business Manager UI (not our dashboard) | Meta Pixel client-side reports |
| Session recordings + heatmaps | Microsoft Clarity UI (not our dashboard) | Clarity dashboard directly |
| WhatConverts calls + attribution | WhatConverts UI + future `stg_calls` view in dashboard | WhatConverts UI now; BigQuery ingest when block ships |

---

## Change management — where to make what change

| Change | Layer | File(s) |
|---|---|---|
| Add a new event type | Website + GTM + BQ | `src/lib/analytics/types.ts` + `dataLayer.ts` + `gtm-blueprint.md` + `stg_events` view + reports |
| Add a new custom dimension | GTM + GA4 + BQ | GTM DLV + GA4 Admin custom dimensions + `stg_events` extraction |
| Add a new page section requiring analytics | Website | Component file + call the appropriate helper from `src/lib/analytics/` |
| Change the WhatConverts token | Env var only | `NEXT_PUBLIC_WHATCONVERTS_TOKEN` in Netlify — no code change |
| Add a new BigQuery reserved dataset | SQL | New `sql/00N_...` file, run in BQ Console |
| Change what's on Page 1 of the dashboard | Looker Studio UI | Edit widgets in the report directly |
| Add a new dashboard page | Looker Studio UI | Add new page + connect data source, no code change |

Every change should be logged in `docs/MVP_STATUS.md` change log with date + description.

---

## Version history

| Date | Change |
|---|---|
| 2026-07-20 | Doc authored — consolidated stitched analytics architecture |
