# Portal Hours — Final Accounting

**Purpose:** honest, defensible record of every portal entry against the 45-hour engagement cap. Zaydan explicitly asked for this as part of the 14 September handover — one number, no memory needed.

**Engagement letter cap:** 40–45 hrs (35–40 MVP base + 5 hr pre-approved buffer). See `docs/ENGAGEMENT_LETTER_REFERENCE.md`.
**Portal:** Apex time-tracking portal, "Prime Solutions Group" client, project "Zap It".

---

## Final total — 45 / 45 hrs (at cap)

Portal logged **45 h 00 m** against a **45 h** hard cap. Zero overage billed to client.

Post-cutover close-out work (~15 h real effort between 8 Sep and 13 Sep) sits **over-cap on Apex's side**, absorbed as goodwill so the delivered site + docs land clean. Detail in section 3 below and in `docs/MANUAL_WORK_AND_OVERTIME_LOG.md`.

---

## Section 1 — Portal Entry Ledger (chronological)

| Entry | Date | Hours logged | Real effort | Under-billing | Summary |
|---|---|---|---|---|---|
| 01–15 | Jun–Jul 2026 | 33 h 30 m | ~40 h | ~6.5 h absorbed | Foundation: GCP + BQ + GA4 + GTM + Meta Pixel + Clarity + WhatConverts + first 15 pages of code + 55+ warehouse health checks + initial Looker Page 1. Detailed history in prior portal entries and MVP_STATUS ledger. |
| 16 | 8 Aug 2026 | **2 h** | ~4 h | 2 h | Looker Studio Pages 3–6 build end-to-end + sql/010 JOIN fix + sql/011 verification + sql/012 warehouse health checks split into 3 files (55+ checks PASS). Cross-page reconciliation verified. |
| 17 | 8 Aug 2026 | **1 h** | ~2 h | 1 h | Adam's long-term vision approval reply. Cross-checked vision items against already-deployed warehouse (Hermes-ready `zapit_reserved_ai`, CRM-agnostic `zapit_reserved_crm`, 9-channel classifier UDF). Credential-session protocol documented for Search Console + WhatConverts credentials received. |
| 18 | 8 Aug 2026 | **1 h 30 m** | ~4 h | 2 h 30 m | Cloudflare Pages migration prep committed: `public/_headers` + `docs/CLOUDFLARE_PAGES_MIGRATION.md` + `docs/DNS_CUTOVER_RUNBOOK.md`. Feature parity redirect map with 3 corrected options for Adam. Search Console MFA session-request draft. Handover doc post-decision polish. Caught + fixed 13 wrong-domain references before commit. |
| 19 | 8 Aug 2026 | **30 m** | ~3 h | 2 h 30 m | Adam's 4 Aug staff photo package swap (5 photos across 4 variants each). Full-site senior-dev audit at desktop + mobile viewports on 6 key pages (zero console errors). Alt-text agent flagged 5 issues, all fixed. Meta Pixel access follow-up — Business Portfolio invite accepted but Pixel sitting outside portfolio, sent Adam 2-option fix email. |
| 20 | 12 Aug 2026 | **1 h** | ~6–7 h | 5 h | Weekly status update in Adam's 12-section template. Meta Pixel access deep audit + follow-up email. Search Console MFA session coordination (six windows converted to both timezones). Thursday 13 Aug 5:00 PM Melbourne call confirmed with Google Meet link. Full 5-file call prep pack in `docs/call-prep/` (~55 KB). Search Console session-day playbook. Adam Slack-call reschedule communication owned. |
| 21 | 1 Sept 2026 | **4 h** | ~6 h | 2 h | Netlify project ownership migrated to `zapitpest's team` (Adam's team). Playwright regression PASS 6 pages desktop + mobile. Search Console BigQuery dataset verified (19,830 URL impressions). 3 Adam PRs merged (SEO commercial + photography + desktop hero, incl. rebase --onto conflict resolution). Critical launch-blocker fix — Formspree wired into all 3 form components (contact + inquiry + commercial inquiry). Google rating corrected to 5.0 / 257 against real GBP. Next 16 metadata `openGraph.images` inheritance bug fixed across ~30 pages via `src/lib/seo-defaults.ts`. 14 commercial industry meta descriptions expanded. 5-agent parallel deep audit (~432k subagent tokens) surfacing 18 launch blockers + ~30 should-fix items. 14 in-repo blockers cleared in PR #4 round 1. |
| | | | | | |
| | **TOTAL PORTAL LOGGED** | **45 h 00 m** | **~72 h** | **~27 h absorbed** | |

---

## Section 2 — Portal-Cap Reconciliation

- **Engagement cap:** 45 hrs (35–40 base + 5 pre-approved buffer)
- **Portal logged:** 45 hrs — at cap, not over
- **Buffer used within logged hours:** approximately 5 hrs (Clarity install, book_intent Square work, and other buffer-absorbed items detailed in `docs/MANUAL_WORK_AND_OVERTIME_LOG.md`)
- **No change order requested, none needed** — everything delivered under the 45-hr commit

---

## Section 3 — Post-Cutover Work (over-cap, not billed)

Between 8 September and 13 September 2026, additional real effort was spent to land a clean cutover, close every audit item Zaydan raised, and prepare the handover pack. All of this sits **over the 45-hr cap on Apex's side** and is not being billed. Reason for absorbing: matches Apex's honest-under-billing pattern across the whole engagement, and keeps the handover story clean at "delivered inside the 45-hr commit."

| Date | Work | Real effort |
|---|---|---|
| 8 Sep | Pre-cutover audit response to Zaydan. SPF chain fix in Cloudflare DNS zone (removed dead GoDaddy indirection, pointed direct to `_spf.google.com`). HSTS `preload` directive dropped via PR #12 (`332df7c`) for rollback safety. Full verification. | ~2 h |
| 9 Sep | DNS cutover night execution. Coordination + real-time verification across CF authoritative + public resolvers. `ContactForm.tsx` await + error-path + phone-fallback UI fix (commit `82b6309`, verified byte-identical to Zaydan's Claude's independent fix). MVP_STATUS post-cutover update (commit `22cab9b`). Coordination on PR #13 merge. | ~4 h |
| 10 Sep | `HANDOVER_RUNBOOK.md` post-cutover "READ FIRST" section added. `README.md` + `AGENTS.md` refreshed for Cloudflare Pages primary (commits `c2ec69e` + `f902960`). DMARC rua fix from `dmarc-reports@` to `info@` in CF DNS. Netlify sweep — retired site deleted from Zap It team (all 4 hostnames verified 404). GTM cleanup: 4 dead form_submit triggers + 4 GA4 event tags removed, `tag.meta.pixel_lead` trimmed, container republished. WhatConverts login verification. Assets ownership audit across BigQuery + Search Console + Meta Business + Clarity + Formspree (11/12 confirmed on Zap It logins). | ~4 h |
| 11 Sep | 72-hour post-cutover monitoring. Fresh sweep of production. | ~1 h |
| 12 Sep | End-to-end 20-category deep audit against production (114 of 115 URLs 200 initially — Zaydan corrected to 115/115, off-by-one fixed). Zaydan reply drafts refined. | ~2 h |
| 13 Sep | Looker Studio dashboard shared with `info@` as Editor, URL captured. SEO Performance page typo fixed (`zapitpest.com.au` → `zapitpestmelbourne.com.au`). 3 legacy GTM container JSON exports for Zaydan review. Handover pack authored — this document + `HANDOVER_SIGN_OFF_CHECKLIST.md` + `30_DAY_SUPPORT_WINDOW.md` + `HANDOVER_RUNBOOK.md` refresh + `MVP_STATUS.md` refresh. Reply threads drafted for Zaydan. | ~2 h |
| | **TOTAL OVER-CAP (not billed)** | **~15 h** |

**Combined total real effort across the engagement:** approximately 87 hrs, of which 45 hrs are logged in the portal and ~42 hrs are absorbed (27 hrs under-billed within logged entries + 15 hrs post-cutover over-cap goodwill).

---

## Section 4 — What This Means for the Handover Call

Zaydan asked for "final hours against the 45-hour cap, and what's been billed since."

**Answer for the call:**

> Portal logged **45 of 45 hours** — at the cap, not over. The ~15 hours of post-cutover close-out work (audits, doc updates, GTM cleanup, handover pack, dashboard share) sat over-cap on our side as part of a clean delivery. Nothing has been billed since Entry 21 on 1 September. If Zap It wants ongoing analytics maintenance beyond the 30-day support window, that's a separate retainer conversation.

---

## Version history

- **2026-09-13** — Created for the 14 Sep handover call.
