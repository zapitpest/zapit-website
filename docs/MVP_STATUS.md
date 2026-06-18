# Zap It MVP — Live Implementation Status

**Single source of truth.** Updated at the end of every working session. Every step has a state and a blocker (if any). Start here before doing any new work.

**Scope:** 40–45 hrs (includes ~5 hr transparent buffer). Architectural baseline = BigQuery Foundation & Data Contract v4 (locked 2026-06-18).

**Legend:** ✅ Done · 🟡 In progress · ⏳ Blocked (note blocker) · ⬜ Pending

---

## Phase 0 — Pre-Work (no Adam dependency)

| # | Step | State | Notes |
|---|---|---|---|
| 0.1 | dataLayer schema + types | ✅ | `src/lib/analytics/types.ts` |
| 0.2 | dataLayer helpers (`trackFormSubmit`, `trackClickPhone`, `trackClickEmail`) | ✅ | `src/lib/analytics/dataLayer.ts` |
| 0.3 | Service-line + page-type detection from pathname | ✅ | `src/lib/analytics/service-line.ts` |
| 0.4 | Global `ClickTracker` for tel:/mailto: anchors | ✅ | `src/components/layout/ClickTracker.tsx`, mounted in `RootLayout` |
| 0.5 | GTM ID env-driven via `NEXT_PUBLIC_GTM_ID` | ✅ | `src/lib/constants.ts` (hardcoded value retained as fallback — must verify before launch) |
| 0.6 | BigQuery SQL — datasets | ✅ | `sql/001_create_datasets.sql` |
| 0.7 | BigQuery SQL — staging views | ✅ | `sql/002_staging_views.sql` |
| 0.8 | BigQuery SQL — reserved schemas | ✅ | `sql/003_reserved_schemas.sql` |
| 0.9 | GTM blueprint document | ✅ | `docs/gtm-blueprint.md` |
| 0.10 | TypeScript + production build verified | ✅ | `npx tsc --noEmit` clean · `next build` 120 pages, zero errors |
| 0.11 | 301 redirect inventory (old WordPress → new Netlify) | ⬜ | Safe to start; needs old sitemap |
| 0.12 | Looker Studio dashboard wireframes | ✅ | `docs/looker-wireframes.md` — 3 dashboards drafted |
| 0.14 | `.env.local.example` documents `NEXT_PUBLIC_GTM_ID` | ✅ | Updated |
| 0.15 | `PageViewTracker` — auto-push service_line + page_type on every route change | ✅ | `src/components/layout/PageViewTracker.tsx` |
| 0.16 | `AnalyticsDebugOverlay` — `?debug=tracking` shows live event log | ✅ | `src/components/layout/AnalyticsDebugOverlay.tsx` |
| 0.13 | Decide: keep analytics in website repo OR new `Apex-AI-Clients/zapit-analytics` | ⏳ | **Blocker:** Awaiting Sharjeel confirmation. Recommendation: keep in website repo for MVP |

---

## Phase 1 — Foundation (~12–15 hrs)

| # | Step | State | Blocker |
|---|---|---|---|
| 1.1 | Create GCP project `zapit-business-intelligence` | ⏳ | Adam must create on his Google account, then add `sharjeel@meetapex.ai` as Editor |
| 1.2 | Link billing to GCP project | ⏳ | Adam |
| 1.3 | Enable BigQuery API + smoke test (`SELECT 1`) | ⏳ | After 1.1 + 1.2 |
| 1.4 | Run `sql/001_create_datasets.sql` (12 datasets) | ⬜ | After 1.3 |
| 1.5 | Create GA4 property under Adam's Google account | ⏳ | Adam grants account-level Editor first |
| 1.6 | Link GA4 → BigQuery export (daily, `australia-southeast1`) | ⬜ | After 1.4 + 1.5 |
| 1.7 | Create new GTM container under Adam's GTM account | ⏳ | Adam grants Publish |
| 1.8 | Add `NEXT_PUBLIC_GTM_ID` (new container ID) to Netlify env vars (staging) | ⬜ | After 1.7 + Netlify access |
| 1.9 | Verify Search Console domain (TXT record) | ⏳ | Adam delegates Owner; DNS access decision |
| 1.10 | End-to-end smoke test: load staging → confirm `gtm.js` fires → confirm GA4 DebugView event lands → confirm BigQuery row 24h later | ⬜ | After 1.6 + 1.8 |

**Phase 1 demo gate:** Screenshare of one real GA4 row in BigQuery. Adam sign-off, then move to Phase 2.

---

## Phase 2 — Event Configuration (~12–15 hrs)

| # | Step | State | Blocker |
|---|---|---|---|
| 2.1 | Wire `form_submit_*` into real submission flow (replacing stubs) | ⬜ | WhatConverts forms must replace current stubs first (Adam-led integration) |
| 2.2 | Build 8 GTM triggers per `docs/gtm-blueprint.md` | ⬜ | After 1.7 |
| 2.3 | Build 8 GA4 event tags | ⬜ | After 2.2 |
| 2.4 | Install Simo Ahava SHA-256 GTM template + build `dlv.user_email_hash` / `dlv.user_phone_hash` variables | ⬜ | After 1.7 |
| 2.5 | Install Meta Pixel base + Lead/Contact event tags | ⏳ | Adam grants Pixel access |
| 2.6 | QA pass — walk every conversion path on staging, check GA4 DebugView + Meta Pixel Helper | ⬜ | After 2.3–2.5 |
| 2.7 | Mark conversion events in GA4 admin | ⬜ | After 2.6 |

**Phase 2 demo gate:** Walk-through of every event in DebugView + 24h BigQuery confirmation. Adam sign-off.

---

## Phase 3 — Reporting + Handover (~10–12 hrs)

| # | Step | State | Blocker |
|---|---|---|---|
| 3.1 | Run `sql/002_staging_views.sql` (after first GA4 export lands) | ⬜ | After Phase 1 produces ≥1 daily export |
| 3.2 | Run `sql/003_reserved_schemas.sql` | ⬜ | After 1.4 |
| 3.3 | Build Looker Studio dashboards (Conversion Overview · Service Line Performance · Source/Medium Attribution) | ⬜ | After 3.1 |
| 3.4 | Transfer dashboard ownership to Adam | ⬜ | After 3.3 |
| 3.5 | Production cutover — swap GTM/GA4 IDs from staging to prod | ⬜ | After Adam confirms DNS timeline + 3-day freeze |
| 3.6 | Re-verify Search Console on prod domain | ⬜ | After 3.5 |
| 3.7 | Write handover runbook | ⬜ | Drafts as we go |
| 3.8 | Training call with Adam (~45 min) | ⬜ | After 3.7 |
| 3.9 | Final acceptance + closeout email | ⬜ | After 3.8 |

---

## Open Confirmations Needed

| From | What | Asked | Received |
|---|---|---|---|
| Adam | Staging URL of rebuilt Netlify site | 2026-06-17 | ⏳ |
| Adam | Production domain (confirmed `zapitpestmelbourne.com.au`) | 2026-06-17 | ✅ 2026-06-17 |
| Adam | DNS cutover timeline | 2026-06-17 | ⏳ |
| Adam | Create GCP project + add Editor | 2026-06-18 (next email) | ⏳ |
| Adam | Create GA4 property + grant Editor | 2026-06-18 (next email) | ⏳ |
| Adam | Create new GTM container + grant Publish | 2026-06-18 (next email) | ⏳ |
| Adam | Meta Business Manager Pixel access | 2026-06-18 (next email) | ⏳ |
| Amandi | Portal-balance / 6hr top-up allocation | 2026-06-17 | ⏳ |
| Sharjeel | Repo decision (website repo vs new analytics repo in Apex-AI-Clients) | 2026-06-18 | ⏳ |

---

## Hours Burned (estimate)

| Bucket | Used | Budget |
|---|---|---|
| Pre-work (Phase 0 — analytics code, SQL, GTM doc, build verify) | ~3 hr | — (rolls into Phase 1) |
| Phase 1 Foundation | 0 | ~12–15 |
| Phase 2 Event Config | 0 | ~12–15 |
| Phase 3 Reporting + Handover | 0 | ~10–12 |
| Buffer | 0 | ~5 |
| **Total used** | **~3 hr** | **40–45** |

---

## Update protocol

1. End of every working session: update state column + blocker column above
2. Add a row to the change log below
3. Commit with message `docs: MVP_STATUS update — <date>`
4. Update memory file `project_zapit_mvp_implementation_state.md` if any decision changed

## Change log

- **2026-06-18** — Phase 0 complete (analytics module, SQL files, GTM blueprint, Looker wireframes, env.example updated, build verified). Build green. Waiting on Adam reply for Phase 1 unblock. Repo decision open (recommendation: keep in website repo for MVP).
- **2026-06-18 (cont.)** — Added `PageViewTracker` (auto-context on route change) + `AnalyticsDebugOverlay` (`?debug=tracking` event log). Phase 2 QA accelerated. Build still green.
