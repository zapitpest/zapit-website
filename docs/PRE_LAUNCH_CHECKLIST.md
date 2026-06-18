# Pre-Launch Checklist — Zap It MVP

**Goal:** From "Adam grants access" to "MVP signed off" in one document. Every step is a checkbox. Cross them off in order. If a step fails, fix and re-verify before moving on — don't skip.

---

## Phase 1 — Foundation

### 1.A — GCP + BigQuery

- [ ] Adam created GCP project `zapit-business-intelligence` and added `sharjeel@meetapex.ai` as **Editor**
- [ ] Adam linked a billing account to the project
- [ ] BigQuery API enabled (verify in GCP console → APIs & Services)
- [ ] Smoke test: `bq query --use_legacy_sql=false 'SELECT 1'` returns `1`
- [ ] Run `bq query --use_legacy_sql=false < sql/001_create_datasets.sql`
- [ ] Verify all 12 datasets exist with region `australia-southeast1` and correct retention
- [ ] Run `bq query --use_legacy_sql=false < sql/003_reserved_schemas.sql`
- [ ] **DON'T run `sql/002_staging_views.sql` yet** — needs a daily GA4 export to exist first (lands ~24h after step 1.C)

### 1.B — GA4

- [ ] Adam created GA4 account + property under his Google account
- [ ] Added `sharjeel@meetapex.ai` as **Editor** at property level
- [ ] Created two data streams: one for staging URL, one for production domain
- [ ] Captured Measurement ID (`G-XXXXXXXXXX`) for each — store in 1Password
- [ ] In GA4 Admin → Property → BigQuery Linking → linked to `zapit-business-intelligence`, dataset `zapit_raw_ga4`, location `australia-southeast1`, **Daily** export ON
- [ ] Confirm first daily export landed (wait ~24h after first traffic, then check `zapit-business-intelligence.zapit_raw_ga4` for tables named `events_YYYYMMDD`)

### 1.C — GTM

- [ ] Adam created GTM account + container under his Google account
- [ ] Added `sharjeel@meetapex.ai` with **Publish** permission
- [ ] Captured container ID (`GTM-XXXXXXX`) — store in 1Password
- [ ] On Netlify staging site → Environment variables → set `NEXT_PUBLIC_GTM_ID = <new container ID>`
- [ ] Trigger a new deploy on Netlify so the env var takes effect
- [ ] Open staging site → DevTools Network → confirm `gtm.js?id=<new ID>` request
- [ ] Open staging site with `?debug=tracking` → confirm `page_view_context` event appears in overlay on navigation
- [ ] Click any phone link → confirm `click_phone` event in overlay
- [ ] Click any email link → confirm `click_email` event in overlay

### 1.D — Search Console

- [ ] Adam added the production domain to Search Console as a Domain property
- [ ] TXT verification record added at registrar
- [ ] `dig TXT zapitpestmelbourne.com.au +short` shows `google-site-verification=...`
- [ ] Adam added `sharjeel@meetapex.ai` as **Delegated Owner**
- [ ] Search Console linked to GA4 property (Admin → Product Links → Search Console)

### 1.E — Meta Pixel

- [ ] Adam added `sharjeel@meetapex.ai` to Meta Business Manager with **Standard access** on the Pixel
- [ ] Pixel ID captured — store in 1Password

### Phase 1 demo gate

- [ ] Screenshare to Adam: live GA4 row in BigQuery (`SELECT * FROM zapit_raw_ga4.events_* LIMIT 10`)
- [ ] Adam written sign-off in email

---

## Phase 2 — Event Configuration

### 2.A — GTM blueprint execution

Open `docs/gtm-blueprint.md` and work through it top-to-bottom.

- [ ] Built-in variables enabled (Page Path, Page URL, Click URL, Click Text, etc.)
- [ ] 9 Data Layer Variables created (`dlv.service_line`, `dlv.page_type`, ...)
- [ ] Simo Ahava SHA-256 GTM template installed from community gallery
- [ ] `dlv.user_email_hash` custom JS variable created
- [ ] `dlv.user_phone_hash` custom JS variable created (with E.164 normalization)
- [ ] 8 triggers created (5 form_submit + 2 click + 1 all_pages)
- [ ] GA4 Configuration tag created with `service_line` + `page_type` fields and Measurement ID
- [ ] 5 GA4 Event tags for form_submit_*
- [ ] 2 GA4 Event tags for click_phone / click_email
- [ ] Meta Pixel base tag created with production Pixel ID
- [ ] Meta Pixel Lead event tag created for all 5 form_submit triggers
- [ ] Meta Pixel Contact event tag created for click_phone + click_email triggers

### 2.B — QA on staging

- [ ] Load staging with `?debug=tracking` — verify overlay shows events in real time
- [ ] GTM Preview mode enabled, connected to staging URL
- [ ] Walk every page → page_view_context fires with correct service_line + page_type
- [ ] Tap every `tel:` link → click_phone fires with `phone_number` param
- [ ] Tap every `mailto:` link → click_email fires with `email_address` param
- [ ] Submit each form (once WhatConverts forms are live) → form_submit_* fires with hashed PII
- [ ] **Verify NO raw email or phone appears in any network request** — only hashes
- [ ] In GA4 DebugView → confirm every event arrives with all parameters populated
- [ ] In Meta Events Manager → confirm Lead and Contact events firing
- [ ] In Meta Pixel Helper extension → no warnings

### 2.C — Mark conversions in GA4

- [ ] In GA4 Admin → Events → mark these as conversion events: `form_submit_quote`, `form_submit_booking`, `form_submit_contact`, `form_submit_callback`, `form_submit_emergency`, `click_phone`, `click_email`

### 2.D — GTM publish

- [ ] Container version named `<date> — MVP launch`
- [ ] Changelog entry added (what tags, variables, triggers)
- [ ] Publish to staging environment first, soak for 24h
- [ ] Phase 2 demo to Adam — walk through DebugView + 24h BigQuery confirmation
- [ ] Adam written sign-off

---

## Phase 3 — Reporting + Handover

### 3.A — Staging views

- [ ] Run `bq query --use_legacy_sql=false < sql/002_staging_views.sql`
- [ ] Verify each view returns rows: `SELECT COUNT(*) FROM zapit-business-intelligence.zapit_staging.stg_events`
- [ ] Verify `stg_leads` has service_line populated on rows

### 3.B — Looker Studio dashboards

Per `docs/looker-wireframes.md`:

- [ ] Conversion Overview dashboard built
- [ ] Service Line Performance dashboard built
- [ ] Source / Medium Attribution dashboard built
- [ ] Each dashboard's data source = the relevant `stg_*` view (not raw GA4)
- [ ] Date range control: default Last 28 days, allow Adam to change
- [ ] Share with Adam as **Owner**, Apex as Viewer

### 3.C — Production cutover

- [ ] Confirm with Adam: DNS cutover scheduled for `<date>` with 3-day prior code/content freeze
- [ ] Freeze starts on agreed date — no merges to `main` except cutover hotfixes
- [ ] On cutover day:
  - [ ] DNS records updated at registrar
  - [ ] Netlify production env vars set: `NEXT_PUBLIC_GTM_ID = <production container ID>`
  - [ ] Production GA4 data stream URL updated
  - [ ] Search Console re-verified on production domain
  - [ ] Smoke test production: load site, fire test event, confirm GA4 DebugView + Meta Pixel Helper

### 3.D — Handover

- [ ] Write final runbook (single doc: where things are, who has access, how to add new tracking)
- [ ] Schedule 45min training call with Adam
- [ ] Walk through each dashboard
- [ ] Walk through how to add a new event (code → GTM → GA4 → dashboard)
- [ ] Send recording + runbook
- [ ] Final acceptance email from Adam
- [ ] Engagement closed

---

## Critical safeguards (applies through every phase)

- **Never commit secrets** — all IDs (`GTM-XXX`, `G-XXX`, Pixel IDs, service account keys) go in Netlify env vars or 1Password, never the repo
- **Never use `git add -A`** — always add specific files to avoid accidentally staging `.env*` files
- **Never push to a non-org repo** — current remote `github.com/zapitpest/zapit-website` is client-owned and approved; verify with `git remote -v` before any new push destination
- **PII never leaves the browser unhashed** — verify in Phase 2 QA by checking network tab on every event
- **Adam ownership rule** — all infrastructure (GCP, GA4, GTM, Pixel) created under Adam's accounts; Apex only takes Editor/Publish access; never Owner
- **Approval-gated AI** — when OpenClaw block ships later, every `zapit_reserved_openclaw.outputs` row starts with `human_approval_status='pending'` and never goes to a customer without Adam's approval

---

## Quick reference

| Asset | Location |
|---|---|
| Architecture baseline | `BigQuery Foundation & Data Contract v4` PDF (Adam-ratified 2026-06-18) |
| Live status tracker | `docs/MVP_STATUS.md` |
| GTM blueprint | `docs/gtm-blueprint.md` |
| Looker wireframes | `docs/looker-wireframes.md` |
| Pre-launch checklist | this doc |
| BigQuery SQL | `sql/001_*` → `sql/003_*` |
| Analytics code | `src/lib/analytics/` + `src/components/layout/{ClickTracker,PageViewTracker,AnalyticsDebugOverlay}.tsx` |
