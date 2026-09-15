# BigQuery IAM Screen-Share Matrix — 15 Sep Handover Call

**Call:** Tuesday 15 September 2026, 9:00 PM Melbourne / 4:00 PM Karachi  
**Purpose:** Live walkthrough with Zaydan of who has what access to the `zapit-business-intelligence` warehouse, so ownership is documented at sign-off.

Fill this in tomorrow morning (14 Sep evening PKT) before the call. Screenshots of each Cloud Console screen live in `docs/call-prep/screenshots/` (create the folder if needed).

---

## 1 · Cloud Project Ownership — VERIFIED 15 Sep 2026

**Project ID:** `zapit-business-intelligence`
**Project Number:** `1074611396691`
**Organization:** No organization (personal Google account setup)

### Project-level IAM (from IAM & Admin → IAM) — 4 principals only

| Principal | Role(s) | Type | Notes |
|-----------|---------|------|-------|
| `info@zapitpestmelbourne.com.au` | Owner | User (Zap It) | Client-side owner — Zap It retains outright ownership ✅ |
| `sharjeel@meetapex.ai` | Editor | User (Apex, Sharjeel Saleem) | Apex implementation access — Editor only, NOT Owner. Reduces to Data Viewer on Day 30 per Section 6 |
| `firebase-measurement@system.gserviceaccount.com` | BigQuery User + Logs Writer | System Service Account (Google-managed) | Auto-created by Google for GA4 → BigQuery daily export. Cannot be modified or deleted; entirely managed by Google. |
| `search-console-data-export@system.gserviceaccount.com` | BigQuery Data Editor + BigQuery Job User | System Service Account (Google-managed) | Auto-created by Google for Search Console → BigQuery bulk export. Cannot be modified or deleted; entirely managed by Google. |

**Screenshot:** `docs/call-prep/screenshots/gcp-iam-project.png` (captured 15 Sep 2026)

**Findings:**
- ✅ Zero leftover human accounts from previous developers
- ✅ Zero custom service accounts (no dead pipelines to worry about)
- ✅ Ownership hierarchy is clean: Owner (client) → Editor (Apex) → Google system SAs for exports only
- 🟡 "Excess permissions" security insights (Owner 13505/13605, Editor 11832/12010) are Google's least-privilege recommendation — cosmetic, not a vulnerability. Small team using Owner/Editor is normal Google Cloud pattern.

---

## 2 · Billing Account — VERIFIED 15 Sep 2026 · ✅ CLEAN

**Billing Account Name:** `My Billing Account` (Google's default auto-generated name — never renamed by owner)
**Billing Account ID:** `017638-61BBE3-AD11C5`
**Currency:** AUD (Australian Dollars) — confirms Australian-registered account
**Ownership:** Client-side (NOT Apex) ✅
**Sharjeel's role on billing:** Billing Account User (linker access only — cannot see other members, cannot manage)

### 💰 Current Spend — Zero

| Period | Amount |
|--------|--------|
| 1-14 September 2026 | **A$0.00** |
| 18-31 August 2026 | **A$0.00** |
| Full month projection (Sept 2026) | Not enough historical data to project (has been $0) |

**BigQuery costs sit entirely within Google Cloud's free tier** (10 GB storage + 1 TB queries/month). Zero absorbed cost.

### ✅ Ownership evidence

When `sharjeel@meetapex.ai` opens Billing → Account Management for the linked billing account, Google Cloud returns:

> "For billing account 'My Billing Account', you have limited access to view billing data for the project listed below."
> "You do not have permission to view the permissions of the selected resource."

**This proves Sharjeel is NOT a Billing Account Administrator.** The account was created and is owned by a Zap It principal (almost certainly `info@zapitpestmelbourne.com.au` — the same Owner listed in Section 1 project IAM). Sharjeel was later added with the minimum "Billing Account User" role — just enough to attach the `zapit-business-intelligence` project to the account during Stage B setup on 29 June 2026 — but nothing more.

### Billing IAM (from Sharjeel's view)

| Principal | Role | Notes |
|-----------|------|-------|
| `sharjeel@meetapex.ai` | Billing Account User | Linker access — can attach projects, cannot view other members, cannot manage. Client-controlled, ready to revoke on Day 30. |
| _(other members not visible to Sharjeel)_ | Presumed Billing Account Administrator | Almost certainly `info@zapitpestmelbourne.com.au` — the Section 1 Owner. Zaydan/Adam to confirm on call. |

**Current month spend:** A$0.00 (free tier, nothing charged)
**Monthly average (last 3 months):** A$0.00 (free tier)
**Budget alert threshold:** unknown (Sharjeel has no access to Budgets & alerts)
**Alert recipients:** unknown (Sharjeel has no access)

### Sign-off implication — clean

- ✅ Apex has never owned or paid for the billing account
- ✅ Zero absorbed cost, zero invoice retroactively
- ✅ Client already owns billing — no migration needed
- ✅ Access-drop on Day 30 is a one-click removal of `sharjeel@meetapex.ai` from the billing account members list, executed by Zaydan/Adam from their end
- 🟡 Nice-to-have: on the call, Zaydan or Adam can rename "My Billing Account" to "Zap It Pest Control" for future clarity, and share a screenshot of Members + Budgets so we have the full picture recorded (2 min task)

**Screenshot:** `docs/call-prep/screenshots/gcp-billing.png` + `docs/call-prep/screenshots/gcp-budget.png`

---

## 3 · BigQuery Dataset Matrix — VERIFIED 15 Sep 2026

**Actual count: 15 datasets** (earlier estimate 12 was off — corrected here).
**All datasets:** `BigQuery` type, `Default` storage, `australia-southeast1` region.

### Complete inventory (15 datasets)

| # | Dataset | Type | Purpose | Notes |
|---|---------|------|---------|-------|
| 1 | `analytics_543350918` | 🤖 Auto-created | GA4 → BQ daily export mirror | Numeric ID `543350918` is the GA4 property ID. Created + written to by Google system SA `firebase-measurement@system.gserviceaccount.com`. Not manually managed. |
| 2 | `searchconsole_raw_search_console` | 🤖 Auto-created | Search Console → BQ bulk export | Created + written to by Google system SA `search-console-data-export@system.gserviceaccount.com`. Not manually managed. |
| 3 | `zapit_raw_ga4` | Manual raw layer | Custom raw-GA4 transforms | For queries that need raw GA4 events outside of Google's auto-export. |
| 4 | `zapit_raw_search_console` | Manual raw layer | Custom raw-SC transforms | For queries that need raw SC data outside Google's bulk export. |
| 5 | `zapit_reporting` | ⭐ Reporting layer | Views that Looker Studio reads from | The dashboard's data plane. Contains `v_channel_summary`, `v_events_with_channel`, `v_leads_by_channel`, `v_channel_conversion_detail`, `v_anomalies`, `channel_group` function, etc. |
| 6 | `zapit_reserved_ai` | 🔮 Reserved (empty) | For Hermes / OpenClaw AI recommendations layer | Per Adam's OpenClaw vision — see `docs/ADAM_15_SOURCES_ALIGNMENT.md`. Empty until activated. |
| 7 | `zapit_reserved_clarity` | 🔮 Reserved (empty) | For Microsoft Clarity session data | Empty until Clarity → BQ pipeline built. |
| 8 | `zapit_reserved_crm` | 🔮 Reserved (partly filled) | For CRM data | Contains `contacts`, `ai_recommendations`, `ai_learning` table stubs (from prior test data). |
| 9 | `zapit_reserved_ghl` | 🔮 Reserved (empty) | For GoHighLevel CRM ingest | Empty — deferred to future block per engagement letter. |
| 10 | `zapit_reserved_google_ads` | 🔮 Reserved (empty) | For Google Ads spend + conversion data | Empty until Google Ads → BQ transfer configured. |
| 11 | `zapit_reserved_meta_ads` | 🔮 Reserved (empty) | For Meta Ads spend + conversion data | Empty until Meta Ads → BQ pipeline built. |
| 12 | `zapit_reserved_operational` | 🔮 Reserved (empty) | For operational data | Empty. |
| 13 | `zapit_reserved_whatconverts` | 🔮 Reserved (empty) | For WhatConverts call/form leads | Empty — WhatConverts → BQ webhook pipeline is post-MVP work (see engagement letter). |
| 14 | `zapit_reserved_zoom` | 🔮 Reserved (empty) | For Zoom Phone recordings + transcripts | Empty — deferred to future block. |
| 15 | `zapit_staging` | Staging | Transform / staging layer | Intermediate tables between raw and reporting. |

**Structure notes:**
- 2 datasets auto-created by Google (`analytics_*` + `searchconsole_*`) — cannot rename or restructure
- 4 active data-carrying datasets (`zapit_raw_ga4`, `zapit_raw_search_console`, `zapit_staging`, `zapit_reporting`) — this is the MVP data pipeline
- 9 `zapit_reserved_*` empty placeholders — Adam's OpenClaw vision, ready to receive data when each source is activated
- All 15 in `australia-southeast1` for data residency
- Zero external tables — everything is BigQuery-native

**Overall dataset list screenshot:** `docs/call-prep/screenshots/bq-dataset-list.png` (captured 15 Sep 2026)

### Dataset-level IAM

**Working assumption (to spot-verify):** dataset-level permissions **inherit from project IAM** — meaning no dataset-specific ACLs beyond what Section 1 already shows (info@ Owner, sharjeel@ Editor, 2 Google system SAs). This is the default state when a project's principals are assigned at project level.

**Spot-verification plan:** Click into one active dataset (`zapit_reporting`) → Sharing → Permissions. If the list matches project IAM exactly, we conclude the pattern holds for all 15 datasets. If any dataset shows extra principals, we investigate that dataset specifically.

_(Spot-check pending — see next step.)_

---

## 4 · Service Accounts

Any service accounts wired into the warehouse pipelines (Search Console bulk export, WhatConverts webhook receiver, Looker Studio connector, etc.).

| Service Account | Purpose | Roles held |
|-----------------|---------|------------|
| _(fill in — e.g. `whatconverts-webhook@...iam.gserviceaccount.com`)_ | | |
| _(fill in — Search Console bulk export SA)_ | | |
| _(others)_ | | |

**Screenshot:** `docs/call-prep/screenshots/gcp-service-accounts.png`

---

## 5 · Looker Studio Connections

Source of truth for what powers the 6-page Looker dashboard.

| Data source name | Type | Underlying BQ dataset/view | Owner | Editors |
|------------------|------|----------------------------|-------|---------|
| _(fill in — main GA4 source)_ | BigQuery | | | |
| _(fill in — leads source)_ | BigQuery | | | |
| _(others)_ | | | | |

**Dashboard URL:** `datastudio.google.com/u/0/reporting/a1f7390a-2551-405c-93f0-288853567ac7`

---

## 6 · Access-Change Proposal For Zaydan

If Zaydan wants Apex access dropped for the 30-day support window, this is the honest minimum to still deliver support:

| Layer | Full access | Support-window minimum | Remove entirely after 30 days |
|-------|-------------|------------------------|------------------------------|
| Cloud Project IAM | Editor / BigQuery Admin | BigQuery Data Viewer + BigQuery Job User | ✅ remove `sharjeel@meetapex.ai` on day 31 |
| Billing | Billing Account Viewer | (already view-only — no change) | ✅ remove on day 31 |
| Datasets | Data Editor on all | Data Viewer on all | ✅ remove on day 31 |
| Looker Studio | Editor | Viewer | ✅ remove on day 31 |

**Zaydan's call to make on the walkthrough — this is a proposal, not a commitment.**

---

## 7 · Talking Points For The Walkthrough

1. **Ownership is clean** — every dataset sits under `info@zapitpestmelbourne.com.au` as owner; `sharjeel@meetapex.ai` is Editor for implementation, not Owner.
2. **Billing is on Zap It** — Apex is not the payer.
3. **No shared credentials** — every principal is a named user account, no `service@` shared logins.
4. **Region locked to `australia-southeast1`** — data residency stays in-country.
5. **Reserved OpenClaw dataset** — `zapit_reserved_ai` sits empty, ready for the Hermes / recommendations layer when Adam wants to activate it. Zero cost until data lands.
6. **30-day support access drop plan** — walk through Section 6 above, get Zaydan to sign-off on the target end-state.

---

## 8 · Post-Call TODO

- [ ] File this matrix (filled in) in `docs/call-prep/bq-iam-matrix-FILLED.md`
- [ ] Screenshot pack committed to `docs/call-prep/screenshots/` (don't commit if any expose real service account keys — check first)
- [ ] Access-change decisions from the call recorded in `docs/HANDOVER_SIGN_OFF_CHECKLIST.md`
- [ ] Follow-up calendar reminder set for Day-30 to execute the access drop
