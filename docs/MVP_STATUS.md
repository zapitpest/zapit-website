# Zap It MVP — Live Implementation Status

**Single source of truth.** Updated at the end of every working session. Every step has a state and a blocker (if any). Start here before doing any new work.

**Scope:** Revised 2026-06-28 to **35–40 hrs total** (was 40-45) following review of existing site state. Architectural baseline = BigQuery Foundation & Data Contract v4 (locked 2026-06-18).

**Legend:** ✅ Done · 🟡 In progress · ⏳ Blocked (note blocker) · ⬜ Pending

---

## 📊 Overall Completion Snapshot (as of 2026-06-27 — HONEST AUDIT)

| Metric | Value |
|---|---|
| **Hours used** | **~13 / 35** (37% of budget — revised downward after self-audit) |
| **Hours remaining** | **~22 / 35** |
| **Phase 1 — actual operational deliverables** | ~70% (GCP + 12 BigQuery datasets + 8 reserved tables + Netlify auto-deploy all live; GA4 + GTM + Search Console pending Adam) |
| **Phase 2 — actual operational deliverables** | ~15% (code substrate live but no actual GA4/Meta/GTM tags firing yet — those are configured AFTER Adam unblocks GA4/GTM) |
| **Phase 3 — actual operational deliverables** | ~25% (Feature Parity audit + 56 redirects shipped; dashboards/training/cutover pending) |
| **Honest overall MVP operational completion** | **~35%** (warehouse foundation now live; analytics not yet flowing end-to-end — that's Phase 2 work post-Adam-unblock) |
| **Foundation work done that enables fast next phase** | ~55% (heavy lifting on GCP setup, audits, redirects, automation scripts, security hardening — sets up rapid Phase 2 execution once unblocked) |
| **Production quality on what IS shipped** | ✅ Lint clean, TypeScript clean, build green, 56 redirects + 6 security headers all curl-verified live |
| **Hosting portability** | ✅ Zero Netlify lock-in in code (see `docs/HOSTING_PORTABILITY.md`) |
| **Single critical blocker** | Adam's decision on GA4/GTM Option A vs B (~20 hr of remaining MVP work cascades from this) |

**Honest read for the client:** if asked "is the analytics live?" the answer is NO. Data is not yet flowing. What IS live: deployment pipeline, redirects, security, structured data, code that's ready to emit events the moment GTM/GA4 exist. Approximately 30% of the actual MVP value (operational analytics) is delivered; another 25-30% is groundwork ready to land quickly post-unblock.

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
| 0.11 | 301 redirect inventory (old WordPress → new Netlify) | ✅ 100% Done 2026-06-27 | 426 old URLs catalogued, 56 redirects shipped + verified live via curl, 59 blog URLs catalogued in `docs/audit-data/blog-urls-needing-decision.txt` for Adam |
| 0.12 | Looker Studio dashboard wireframes | ✅ | `docs/looker-wireframes.md` — 3 dashboards drafted |
| 0.14 | `.env.local.example` documents `NEXT_PUBLIC_GTM_ID` | ✅ | Updated |
| 0.15 | `PageViewTracker` — auto-push service_line + page_type on every route change | ✅ | `src/components/layout/PageViewTracker.tsx` |
| 0.16 | `AnalyticsDebugOverlay` — `?debug=tracking` shows live event log | ✅ | `src/components/layout/AnalyticsDebugOverlay.tsx` |
| 0.17 | Analytics barrel export | ✅ | `src/lib/analytics/index.ts` |
| 0.18 | `/debug/analytics` QA tester page (noindex, gated by `?debug=tracking`) | ✅ | Fires every event shape manually — critical Phase 2 QA tool |
| 0.13 | Decide: keep analytics in website repo OR new `Apex-AI-Clients/zapit-analytics` | ⏳ | **Blocker:** Awaiting Sharjeel confirmation. Recommendation: keep in website repo for MVP |

---

## Phase 1 — Foundation (~12–15 hrs)

| # | Step | State | Blocker |
|---|---|---|---|
| 1.1 | Create GCP project `zapit-business-intelligence` | ✅ Done 2026-06-25 | Under organisation `zapitpestmelbourne.com.au`. Created via Adam's session at his explicit written request. |
| 1.2 | Link billing to GCP project | ✅ Done 2026-06-25 | Linked to Adam's existing billing account ("Paid account") |
| 1.3 | Enable BigQuery API + smoke test (`SELECT 1`) | ✅ Done 2026-06-25 | API enabled, page confirmed status = Enabled |
| 1.3a | Apply DRS policy fix at org level (allowlist Apex + Zap It Customer IDs) | ✅ Done 2026-06-25 | Both IDs added with `is:` prefix to `iam.allowedPolicyMemberDomains` |
| 1.3b | Add `sharjeel@meetapex.ai` as Editor on the project | ✅ Done 2026-06-25 | Verified end-to-end from own Apex login |
| 1.4 | Run `sql/001_create_datasets.sql` (12 datasets) | ✅ 100% Done 2026-06-27 | All 12 datasets live in `australia-southeast1`. Verified via `bq ls`. |
| 1.4a | Run `sql/003_reserved_schemas.sql` (8 reserved table shells) | ✅ 100% Done 2026-06-27 | All 8 reserved tables created: whatconverts.calls, zoom.calls, zoom.transcripts, ghl.contacts, ghl.opportunities, ghl.pipeline_stages, openclaw.outputs, clarity.sessions |
| 1.4b | BigQuery bootstrap automation script | ✅ 100% Done 2026-06-27 | `scripts/bootstrap-bigquery.sh` executed successfully end-to-end after fix for `--location` flag and DEFAULT-clause syntax issue |
| 1.4c | gcloud CLI installed locally + authenticated as sharjeel@meetapex.ai | ✅ 100% Done 2026-06-27 | gcloud 574.0.0, bq 2.1.33, authenticated, project set |
| 1.5 | Create GA4 account "Zap It Pest Control" + property "Zap It Production" under own login + invite Adam as Administrator | ⏳ Waiting Adam | Existing accounts ("Melbourne Pest & Gutter Experts" + "Pest Control") admin-locked by external party. Awaiting Adam's choice between Option A (fresh, recommended) vs Option B (chase old admin). |
| 1.6 | Link GA4 → BigQuery export (daily, `australia-southeast1`) | ⬜ | After 1.5 |
| 1.7 | Create new GTM container under own login + invite Adam as Administrator | ⏳ Waiting Adam | Same admin-lock issue as GA4; awaiting Adam's Option A vs B choice |
| 1.8 | Update Netlify env var `NEXT_PUBLIC_GTM_ID` to new container ID + verify auto-deploy | ⬜ | After 1.7 |
| 1.8a | Netlify auto-deploy from GitHub | ✅ Done + verified 2026-06-23 | Smoke test push (`4151af7`) auto-deployed in 31s. Build pipeline confirmed end-to-end. |
| 1.9 | Verify Search Console domain (TXT record) | ⏳ | Awaiting our trigger (we send TXT value, Adam adds at registrar) |
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
| Adam | Create GCP project + add Editor | 2026-06-18 (next email) | 🟡 In progress — Domain-Restricted Sharing org policy hit; Adam fixing (Option 1: allowlist `meetapex.ai`) 2026-06-19. Sharjeel-side GCP console access verified 2026-06-19 (Work profile, no projects yet — expected until Adam completes IAM add). |
| Adam | Create GA4 property + grant Editor | 2026-06-18 (next email) | ⏳ |
| Adam | Create new GTM container + grant Publish | 2026-06-18 (next email) | ⏳ |
| Adam | Meta Business Manager Pixel access | 2026-06-18 (next email) | ⏳ |
| Amandi | Portal-balance / 6hr top-up allocation | 2026-06-17 | ✅ Resolved 2026-06-19 — Adam handling top-up directly: *"I'll also organise the additional hours allocation so there is enough available for Phase 1 to proceed without interruption."* No Amandi action needed. |
| Sharjeel | Repo decision (website repo vs new analytics repo in Apex-AI-Clients) | 2026-06-18 | ⏳ |

---

## Hours Burned (estimate)

| Bucket | Used | Budget | Notes |
|---|---|---|---|
| Phase 1 Foundation | ~9.5 hr | ~12–15 | Pre-work foundation (3), Netlify auto-deploy (0.5), GCP IAM Stage A (1.5), bootstrap script (0.5), gcloud install (0.25), `_redirects` implementation + curl verification (1.5), production code quality audit + lint refactor (0.75), security headers audit + implementation + verification (0.75), build/sanity tests (0.25), status & comm overhead (0.5) |
| Phase 2 Event Config | 0 | ~12–15 | Starts after GA4/GTM created in Stage B |
| Phase 3 Reporting + Handover | ~3.5 hr | ~10–12 | Feature Parity audit v1 (2) + audit pass v2 with curl-verified data + blog URL classification (1) + portability documentation (0.25) + scope completion analysis (0.25) |
| Buffer (transparent, separate) | 0 | ~5 | Rolls forward if unused |
| **Total used** | **~13 hr** | **35 + 5 buffer** | Remaining: ~22 hr against 35-hr core MVP scope. Hours revised downward 2026-06-27 after honest self-audit — earlier counts double-charged some doc iteration that should not be billed at full rate. |

---

## Update protocol

1. End of every working session: update state column + blocker column above
2. Add a row to the change log below
3. Commit with message `docs: MVP_STATUS update — <date>`
4. Update memory file `project_zapit_mvp_implementation_state.md` if any decision changed

## Change log

- **2026-06-18** — Phase 0 complete (analytics module, SQL files, GTM blueprint, Looker wireframes, env.example updated, build verified). Build green. Waiting on Adam reply for Phase 1 unblock. Repo decision open (recommendation: keep in website repo for MVP).
- **2026-06-18 (cont.)** — Added `PageViewTracker` (auto-context on route change) + `AnalyticsDebugOverlay` (`?debug=tracking` event log). Phase 2 QA accelerated. Build still green.
- **2026-06-18 (commit `7f6ff27`)** — Pushed Phase 0 work to `origin/main`. 16 files, 1168 insertions. Added `docs/PRE_LAUNCH_CHECKLIST.md` — single-page runbook for Phases 1–3. **Phase 0 is fully complete and pushed.** All further work gated on Adam's access grants.
- **2026-06-19** — Adam confirmed (a) hours top-up being organised on his side, no Amandi action needed, (b) Friday weekly status format approved with 5 required fields: hours consumed, hours remaining, work completed, blockers, planned work next week. Domain-Restricted Sharing org policy blocked initial IAM add — Adam allowlisting `meetapex.ai` (Option 1). Also asked for long-term architecture recommendation for Zoom + GHL + BigQuery + OpenClaw — replied with BigQuery-as-central-bus + n8n thin ingest layer pattern (no MVP impact).
- **2026-06-23** — Netlify auto-deploy wired up. Site converted from Netlify Drop (last drag-drop deploy May 28) to Git-driven auto-deploy. Build config: `npm run build` / publish dir `out` / env var `NEXT_PUBLIC_GTM_ID` (empty, falls back to existing container). Latest commit serving at https://zapitpestmelbourne.netlify.app. Verified static export rendering, GTM script present, `/debug/analytics/` page accessible.
- **2026-06-23 (cont.)** — Workspace Customer ID received from Apex admin. Adam approved full MVP hours top-up + Feature Parity & Cutover Readiness audit + endorsed BigQuery-as-central-bus architecture. Adam separately asked for a SMALL OUT-OF-SCOPE setup: enable Google Calendar API + Tasks API + Desktop OAuth credentials for his OpenClaw Telegram Production Bot. To track as a separate portal line item (NOT MVP hours). Will execute MVP GCP setup + bot setup in one login session once Adam confirms project structure (recommended: separate GCP project `zapit-production-bot`) + secure delivery channel for OAuth JSON.
- **2026-06-25** — STAGE A COMPLETE. Adam shared `info@zapitpestmelbourne.com.au` credentials with explicit written consent. Single focused incognito session: DRS policy fix applied at org level (both customer IDs allowlisted), `zapit-business-intelligence` GCP project created, billing linked, BigQuery API enabled, `sharjeel@meetapex.ai` added as Editor. Verified from own login. Existing GA4 accounts + GTM container found admin-locked by external party — deferred to Stage B (fresh accounts under our login + invite Adam as admin). Signed out cleanly, audit log saved to 1Password. Confirmation email sent to Adam requesting password rotation + decision on GA4/GTM Option A vs B.
- **2026-06-27** — STAGE B EXECUTION (no-Adam-dependency work). Shipped: `scripts/bootstrap-bigquery.sh` (idempotent infrastructure-as-code automation for BigQuery setup), `docs/FEATURE_PARITY_AUDIT.md` (cutover gate document with 430-URL old-site inventory + gap analysis + draft redirect map), `docs/weekly-status/2026-06-27-week-1.md` (first Friday status in agreed 5-field format), and 50+ new high-confidence 301 redirects in `public/_redirects` (pest-solutions path restructure, commercial slug migrations, intentional-removal redirects). All verified end-to-end: TypeScript clean, build green (120 pages), Netlify auto-deploy completed in 31s, curl-tested 5 redirects returning HTTP 301 with correct location headers, sanity-verified targets return 200, existing redirects unaffected.
- **2026-06-27 (audit pass v2)** — DEEP SYSTEMATIC AUDIT of all 426 old WordPress URLs. Installed gcloud CLI locally (v574.0.0 + bq 2.1.33 ready for `./scripts/bootstrap-bigquery.sh` after `gcloud auth login`). Systematic curl-tested ALL 20 pest-solutions URLs, ALL 18 commercial URLs, ALL 81 other URLs against the live staging. Findings: 56 total redirects now in production (50 from initial pass + 6 quick wins added: 3 Melbourne regional pages, /pestcontrol-syndal typo, /commercial-termite-control, /rodent-control-richmond). All 6 new redirects verified live via curl. 59 individual blog/content URLs still 404 — exported with thematic grouping to `docs/audit-data/blog-urls-needing-decision.txt` for Adam's review. FEATURE_PARITY_AUDIT updated to v2 with real measured status codes (not estimates). Hours used: ~12.5 / 35 (remaining: ~22.5).
- **2026-06-27 (production audit pass)** — SENIOR ENGINEERING PRODUCTION AUDIT. Ran TypeScript strict check (clean), ESLint on full analytics module (initially 2 errors flagged), bundle size analysis (113MB static export, 64MB images, 23 JS chunks, largest 220KB — within reasonable bounds for 120-page site), production HTML structured-data audit (10 Schema.org types live: AggregateRating, BreadcrumbList, City, ContactPoint, GeoCoordinates, ListItem, LocalBusiness, OpeningHoursSpecification, Organization, PostalAddress), sitemap.xml verified (HTTP 200, 116 URLs), robots.txt verified. Fixed 2 lint errors in `AnalyticsDebugOverlay` + `AnalyticsTester` by refactoring `setState-in-effect` pattern to `useSyncExternalStore` (React-canonical pattern for deriving state from external sources like `window.location`). Catalogued pre-existing technical debt in other (non-MVP-scope) components: 5 other setState-in-effect issues + ~10 `<img>` warnings + several unused vars in Header/FAQ — all pre-existed this engagement, NOT MVP scope to fix. After fix: all my-authored code is lint-clean, TypeScript-clean, build green. Hours used: ~14 / 35 (remaining: ~21). Overall MVP completion estimate: ~45% by deliverable, running at ~40% of hour budget — efficient per-hour pace.
- **2026-06-27 (security hardening pass)** — PRODUCTION SECURITY HARDENING. Audited HTTP response headers on the live staging URL. HSTS already configured by Netlify default, but 5 standard security headers were missing. Added them via `netlify.toml`: X-Frame-Options DENY (clickjacking protection), X-Content-Type-Options nosniff (MIME-sniffing protection), Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy restricting camera/microphone/geolocation/payment/usb by default, X-DNS-Prefetch-Control on. All 6 headers verified live in production via curl after auto-deploy. Brings site to A-grade on standard security header benchmarks. CSP intentionally deferred until Phase 2 GTM container lands (needs careful third-party allowlist for GTM/GA4/Meta). Other production verifications run: no secrets committed in git history, zero console.log statements in analytics code, Brotli compression enabled, static assets cached 1-year immutable.
- **2026-06-27 (portability + honest re-audit)** — HOSTING PORTABILITY AUDIT confirmed zero Netlify lock-in in code: zero Netlify-specific imports in `src/`, zero host-specific env vars, zero Netlify packages in `package.json` dependencies. Only Netlify-specific files are `netlify.toml` + `public/_redirects` (both are simple declarative files; `_redirects` format is also supported natively by Cloudflare Pages). Documented full migration paths to Cloudflare Pages, Vercel, generic CDN, and self-hosted nginx in `docs/HOSTING_PORTABILITY.md`. Also performed honest re-audit of MVP completion: revised "overall completion" downward from 45% (mixed groundwork + delivery) to ~30% (operational MVP value — answer to "is analytics flowing?" is no, not yet). Foundation work that enables fast Phase 2 execution sits at ~55%. Hours re-audited honestly to ~13/35 (revised down from 14.75) — earlier counts had some doc-iteration time that should not bill at full senior-engineer rate.
- **2026-06-27 (BigQuery bootstrap live)** — gcloud auth completed, bootstrap script ran end-to-end. Two small fixes shipped along the way: `--location=australia-southeast1` flag added to `bq` commands (default was `US` which conflicted with our SQL region setting), and `DEFAULT` clauses removed from `sql/003_reserved_schemas.sql` (BigQuery parser rejected them in this project config — semantic intent preserved in column comments for future ingest workers). End result: all 12 datasets and all 8 reserved table shells now live in BigQuery under `zapit-business-intelligence`, region `australia-southeast1`. Verified via `bq ls`. Overall MVP completion estimate moves from ~30% to ~35% (warehouse foundation is now real, not pending).
- **2026-06-28 (Adam reply received)** — Adam confirmed **Option A** for GA4/GTM (fresh setup, not chasing previous admin) with one ownership-model nuance: he wants the new GA4 + GTM created **directly under Zap It Google account** (not under our Apex account with him invited later). Same Owner-from-day-one pattern we used for GCP/BigQuery. He approved the Feature Parity audit approach, confirmed continuing Phase 2 immediately once GA4/GTM in place, confirmed Friday reporting cadence works, reviewed staging site and happy with progress. Two outstanding admin items: (1) Apex portal at 0 hours remaining — top-up needed for Phase 2 to proceed continuously; (2) MVP scope estimate revised from 40-45 hr to **35-40 hr** total because some manual work was already on the site when picked up. Remaining work against revised scope: 22-27 hr.
- **2026-06-28 (staging refinements + session runbook)** — Acted on Adam's "we'll continue refining staging" comment with three foundational SEO refinements: standardised page titles across `/contact-us`, `/frequently-asked-questions`, and `/termite-control-melbourne` for brand consistency (`|` separator + "& Termite" in all titles) and trimmed termite title from 118 chars to ~58 chars to avoid Google SERP truncation. All verified live via curl after auto-deploy. Wrote `docs/CREDENTIAL_SESSION_GA4_GTM.md` — a focused 30-45 min runbook for the upcoming GA4/GTM credential session under Zap-It-owned ownership model, so the session can execute cleanly when Adam shares the 2FA window. Reply email to Adam sent confirming: ownership model agreed, Slack-coordinated 2FA window for the session, full Phase 2 plan, outstanding items (Telegram bot + audit decisions + password rotation) flagged with no urgency, humble hours top-up request with revised 35-40 hr scope. Hours used to date: 13 (11 logged, 2 pending log until top-up lands).
- **2026-06-29 (10-hour top-up landed)** — Adam topped up 10 hours into the portal. After logging the 2-hour catch-up entry covering BigQuery bootstrap execution + title refinements + runbook drafting + Adam reply coordination, portal balance available for new work = ~8 hr. This runway covers: GA4/GTM credential session (~0.75 hr) + initial Phase 2 GTM configuration (~6-7 hr). Next top-up needed before completing Phase 2 + Phase 3 (~12-15 hr more). Telegram bot answers still pending from Adam — independent of MVP, no blocker. Ready to proceed with GA4/GTM credential session as soon as Adam shares 2FA window on Slack.
- **2026-06-29 (Stage B credential session COMPLETE)** — Executed full GA4 + GTM creation session under Adam's `info@zapitpestmelbourne.com.au` credentials (with explicit written consent + timestamped audit log + signed out cleanly). Created **GA4** account "Zap It Pest Control" + property "Zap It Production" + web stream "Zap It Staging" → captured Measurement ID `G-YRVHNE66GH`. Time zone: Melbourne. Currency: AUD. Refused the "Use existing Google tag" inheritance prompt (would have routed to admin-locked Pest Control / G-HWGT4MMCQH). Created **GTM** account "Zap It Pest Control" (account ID `6363173799`) + container "Zap It Production" → captured Container ID `GTM-PFGV87RB`. Added `sharjeel@meetapex.ai` with: GA4 Editor at account level + GTM Account Administrator + GTM Container Publish (full permission, includes Approve/Edit/Read). Both verifications captured in user-detail screenshots. Note: Version 1 was published as empty container during the session by accident — cosmetic noise only, will be superseded by Version 2 once Phase 2 GTM configuration lands. Sharjeel-side verification via invitation emails (22:10 GA4, 22:15 GTM) confirms cross-login access. Old admin-locked GA4 + GTM containers (GTM-WBZC2BHL, Melbourne Pest & Gutter Experts, Pest Control account) all left untouched. Ownership model exactly per Adam's request: Zap It owns from day one, Apex has implementation access only.
