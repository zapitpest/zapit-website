# BigQuery IAM Screen-Share Matrix — 15 Sep Handover Call

**Call:** Tuesday 15 September 2026, 9:00 PM Melbourne / 4:00 PM Karachi  
**Purpose:** Live walkthrough with Zaydan of who has what access to the `zapit-business-intelligence` warehouse, so ownership is documented at sign-off.

Fill this in tomorrow morning (14 Sep evening PKT) before the call. Screenshots of each Cloud Console screen live in `docs/call-prep/screenshots/` (create the folder if needed).

---

## 1 · Cloud Project Ownership

**Project ID:** `zapit-business-intelligence`  
**Project Number:** _(fill in — Cloud Console top-right)_  
**Organization / no-org:** _(fill in — likely "No organization")_

### Project-level IAM (from IAM & Admin → IAM)

| Principal | Role(s) | Type | Notes |
|-----------|---------|------|-------|
| _(fill in — Owner)_ | Owner | User | Original creator |
| `sharjeel@meetapex.ai` | _(fill in — Editor / BigQuery Admin)_ | User | Apex implementation access |
| `info@zapitpestmelbourne.com.au` | _(fill in)_ | User | Client-side owner login |
| _(others)_ | | | |

**Screenshot:** `docs/call-prep/screenshots/gcp-iam-project.png`

---

## 2 · Billing Account

**Billing Account ID:** _(fill in — Billing → Account management)_  
**Billing Account Name:** _(fill in)_  
**Payment method:** _(fill in — card ending in XXXX, no need to expose full)_

### Billing IAM

| Principal | Role | Notes |
|-----------|------|-------|
| _(fill in — Billing Account Admin)_ | Billing Account Administrator | Primary billing owner |
| _(others)_ | | |

**Current month spend:** $_(fill in)_ AUD  
**Monthly average (last 3 months):** $_(fill in)_ AUD  
**Budget alert threshold:** _(fill in — likely $100/month based on prior config)_  
**Alert recipients:** _(fill in emails)_

**Screenshot:** `docs/call-prep/screenshots/gcp-billing.png` + `docs/call-prep/screenshots/gcp-budget.png`

---

## 3 · BigQuery Dataset Matrix

Walk through each dataset in `bq://zapit-business-intelligence.*` and record who has what.

**How to check per dataset:**
1. Open BigQuery Console → dataset → Sharing → Permissions
2. Note principals + roles
3. Screenshot each one to `docs/call-prep/screenshots/bq-<dataset>.png`

| # | Dataset | Purpose | Location | Principals (role) |
|---|---------|---------|----------|-------------------|
| 1 | `zapit_analytics_ga4` | GA4 export mirror | `australia-southeast1` | _(fill in)_ |
| 2 | `zapit_search_console` | SC bulk export | `australia-southeast1` | _(fill in)_ |
| 3 | `zapit_leads` | WhatConverts + form leads | `australia-southeast1` | _(fill in)_ |
| 4 | `zapit_marketing` | Ad platform data (future) | `australia-southeast1` | _(fill in)_ |
| 5 | `zapit_ops` | Operational aggregates | `australia-southeast1` | _(fill in)_ |
| 6 | `zapit_web` | Web analytics aggregates | `australia-southeast1` | _(fill in)_ |
| 7 | `zapit_reserved_ai` | Reserved for Hermes / OpenClaw layer | `australia-southeast1` | _(fill in)_ |
| 8 | `zapit_business_metrics` | Executive-level KPIs | `australia-southeast1` | _(fill in)_ |
| 9 | _(fill in)_ | | | |
| 10 | _(fill in)_ | | | |
| 11 | _(fill in)_ | | | |
| 12 | _(fill in)_ | | | |

> **Note:** Dataset list per project state is 12. Confirm exact names from BQ Console left-nav.

**Overall dataset screenshot:** `docs/call-prep/screenshots/bq-dataset-list.png`

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
