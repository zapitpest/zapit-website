# Manual Work, Absorbed Hours & Overtime Tracker

**Purpose:** running, defensible record of every piece of work that:
- Was done **manually** (not billable at full rate, but real effort — for future automation reference)
- Was **absorbed as goodwill** (real effort, not billed to Adam — for transparency + trust)
- Was **buffer-absorbed** (in-scope but taps the 5h pre-approved contingency — needs proactive flagging)
- Went **overtime** on a scoped item (why it took longer than estimated)
- Is **out-of-scope** creep that we agreed to anyway (small favours — trackable, not free)

**Why:** if Adam ever asks "why is this at 30 hours already?" or "can you also do X?" — this file has the row-by-row answer. Not a defensive posture, an honest ledger.

**Rule:** every entry must have (date, category, item, hours, decision, why). Update within 24h of the work happening.

---

## Ledger

### 2026-06-27 — Absorbed goodwill: honest downward hours re-audit
| Field | Value |
|---|---|
| Category | Absorbed goodwill |
| Item | Portal hours count revised down from 14.75h to 13h |
| Real effort | ~1.75h |
| Portal hours | -1.75h (removed) |
| Decision | Absorb — some early doc-iteration overhead shouldn't bill at senior-engineer rate |
| Why | Client integrity — we want the ledger to reflect real senior-eng delivery, not padded totals |
| Where documented | MVP_STATUS.md change log `2026-06-27 (portability + honest re-audit)` |

### 2026-07-07 — Absorbed goodwill: book_intent Square tracking
| Field | Value |
|---|---|
| Category | Absorbed goodwill |
| Item | GTM `tag.ga4.book_intent` + `trg.book_intent` + `dlv.destination_url` + custom dimension + code substrate in `types.ts`/`dataLayer.ts`/`ClickTracker.tsx` |
| Real effort | ~0.75h |
| Portal hours | 0 (not logged, not billed) |
| Decision | Absorb — built in good faith under Adam's Message 1 Option A confirmation. Same day Adam reversed scope (Message 2 removed Square from website). Tag remains dormant in GTM V3, delivers zero user value |
| Why | We committed to the work on his written direction. Reversal was his call. Absorbing signals we don't nickel-and-dime scope pivots |
| Where documented | MVP_STATUS.md change log `2026-07-07 (Adam 3-message reply landed — SCOPE UPDATE)` |

### 2026-07-XX — Buffer-absorbed: Microsoft Clarity install
| Field | Value |
|---|---|
| Category | Buffer-absorbed (transparent) |
| Item | `tag.clarity.script` in GTM V3 |
| Real effort | ~0.5h |
| Portal hours | Billed within Entry 5 (16 Jul 2026) — but explicitly against the 5h contingency buffer, not fresh scope |
| Decision | Buffer-absorb — engagement letter v2 §Deferred Items explicitly deferred Clarity. Adam's YES on 07 Jul added it back. Adam approved buffer-absorption in same message |
| Why | Real work delivered inside originally-scoped hours envelope. Adam explicitly signed off on the buffer taps this way |
| Buffer remaining | ~4.5h of 5h pre-approved |
| Where documented | Engagement letter v2 §Buffer rules; MVP_STATUS.md hours ledger |

### 2026-07-16 — Manual work (client-side, not billable): GA4 → BigQuery link via credential session
| Field | Value |
|---|---|
| Category | Manual work — client environment |
| Item | Signed into Adam's `info@zapitpestmelbourne.com.au` briefly to complete GA4 → BigQuery link (Editor role wasn't sufficient; needs `setIamPolicy` which only Owner has) |
| Real effort | ~30 min (of the 1h Entry 7) |
| Portal hours | Billed in Entry 7 (1h total) — the link completion IS a scoped item (engagement letter item 4). Method (credential session vs Adam-runs-himself) is delivery choice, not extra work |
| Decision | Bill normally — the deliverable is in scope; credential session avoided a multi-day delay |
| Why | This is delivery method, not scope creep. Credential session protocol followed (audit log, minimal scope, sign-out clean, proactive Adam heads-up) |
| Automation note (for future) | If Adam grants BigQuery Admin + Service Usage Admin + Project IAM Admin roles at project start, no future credential session is needed for this class of task |
| Where documented | MVP_STATUS.md change log `2026-07-16 (Credential session — GA4 → BigQuery link completed via info@ login)` |

### 2026-07-16 — Manual, deferred to future automation: `sql/002_staging_views.sql` dataset-name fix
| Field | Value |
|---|---|
| Category | Manual work — one-time |
| Item | GA4 creates dataset `analytics_<propertyId>` at first export. SQL currently references `zapit_raw_ga4`. Needs manual line-edit + rerun once name is visible |
| Real effort | ~5 min |
| Portal hours | Will bill within Phase 3 build entry — trivial |
| Decision | Bill normally within Phase 3 |
| Why | Google doesn't allow renaming BQ datasets or fixing this in advance. One-time cost |
| Automation note (for future) | For future clients, use a parameterised SQL template or dbt profile that resolves the dataset name from an env var |
| Where documented | `sql/002_staging_views.sql` TODO comment; `docs/TOMORROW_VERIFICATION.md` Step 4 |

### 2026-07-16 — In-scope, no overtime: Looker mockup v1 + audit + HTML demo + demo process + overtime tracker
| Field | Value |
|---|---|
| Category | Phase 3 kickoff prep — in scope |
| Item | Five deliverables: `LOOKER_DASHBOARD_MOCKUP_v1.md` + `LOOKER_MOCKUP_AUDIT.md` + `LOOKER_MOCKUP_DEMO.html` + `DEMO_PROCESS_ADAM.md` + `MANUAL_WORK_AND_OVERTIME_LOG.md` + `TOMORROW_VERIFICATION.md` + SQL TODO |
| Real effort | ~1.5-2h (bundled into future Phase 3 build entry — not logged separately) |
| Portal hours | Will bundle with the dashboard build entry once Adam signs off + build happens (est. 4-5h build + 1.5-2h prep = ~6-7h total for engagement letter item 8) |
| Decision | Bill normally — pre-approval gate was explicitly requested by Adam. Prep artefacts are the deliverable for that gate |
| Why | Adam's Message 3 (07 Jul) explicitly asked for a mockup for sign-off before build. Prep IS the deliverable, not overhead |

---

### 2026-07-23 — In-scope: platform-agnostic AI naming rename (openclaw → ai)
| Field | Value |
|---|---|
| Category | In-scope architectural refinement |
| Item | Renamed `zapit_reserved_openclaw` → `zapit_reserved_ai` across SQL + 8 forward-looking docs. Added two new reserved table shells (`ai_recommendations` + `ai_learning`) per Adam's 20 Jul + 22 Jul specs. Added `source_agent` column to `ai_outputs` for model-agnostic tracking (Hermes/Claude/Codex/future) |
| Real effort | ~30 min |
| Portal hours | Will bundle with the next portal entry — small refactor, doesn't warrant standalone entry |
| Decision | Bill normally within existing scope — Adam requested this in writing on 20 Jul, and 22 Jul closed-loop learning ask formalised the `ai_learning` table need |
| Why | Adam moved away from OpenClaw as his AI platform. Platform-agnostic naming keeps the architecture flexible across Hermes/Claude/Codex/future agents. Zero risk (dataset was empty shell) |
| Buffer impact | Zero |
| Where documented | MVP_STATUS.md change log `2026-07-23` |

### 2026-07-17 — In-scope revision: v2 build spec incorporating Adam's 4 sign-off conditions
| Field | Value |
|---|---|
| Category | In-scope revision (Phase 3 build prep) |
| Item | `docs/LOOKER_DASHBOARD_MOCKUP_v2_BUILD_SPEC.md` — buildable blueprint with 4 conditions from Adam's sign-off (booking empty state · dynamic dimensions · intent-vs-confirmed separation · 6-page structure) |
| Real effort | ~30 min drafting + ~1-1.5h added to build (5-6h vs original 4-5h) |
| Portal hours | Will bundle with the dashboard build entry when actual build happens |
| Decision | Bill normally — this IS the dashboard build per engagement letter item 8, just with cleaner architecture. Adam's four conditions all IMPROVE the product |
| Why | Adam gave conditional sign-off — the conditions ARE the scope. Not scope creep, refinement of the scoped deliverable. Original 4-5h estimate was for a static single-page dashboard; v2's 5-6h is for a dynamic multi-page dashboard that scales without redesign |
| Buffer impact | Zero — this stays inside the original dashboard-build allocation |
| Where documented | `docs/LOOKER_DASHBOARD_MOCKUP_v2_BUILD_SPEC.md`; MVP_STATUS.md change log 2026-07-17 |

## Categories legend

| Category | Meaning | Bill? |
|---|---|---|
| **Absorbed goodwill** | Real effort we don't bill because it protects the client relationship (scope reversal, honest re-audit, small favours) | NO — logged for transparency |
| **Buffer-absorbed** | Real effort inside the 5h pre-approved contingency envelope (engagement letter v2 §Buffer) | YES — but tagged against buffer, not fresh scope |
| **Manual work — one-time** | Real effort that could be automated for future clients but wasn't worth it for this MVP | YES — normal bill within scope |
| **Manual work — client environment** | Real effort in the client's own systems (GCP, GA4 admin, WhatConverts, etc.) that we can't automate away | YES — normal bill within scope |
| **Overtime — in-scope** | Scoped item that took materially longer than estimated. Flag if >20% over | YES — bill; if >20% over, flag in Friday status |
| **Overtime — out-of-scope** | New ask outside engagement letter that requires change order | Change order per engagement letter §Scope |

---

## Running totals

| Metric | Value |
|---|---|
| Absorbed goodwill (total, cumulative) | ~2.5h (1.75h re-audit + 0.75h book_intent) |
| Buffer used (of 5h) | ~0.5h (Clarity install) |
| Buffer remaining | ~4.5h |
| Overtime — in-scope | 0h |
| Overtime — out-of-scope (needs change order) | 0h |
| Manual client-env work embedded in normal bill | ~30 min in Entry 7 |

---

## Defensible answers we can give Adam if asked

**Q: "Why is Portal at ~24h when we're not fully done yet?"**
A: Every logged entry maps directly to an engagement letter scope item — see MVP_STATUS.md hours ledger + this log for the row-by-row breakdown. Forecast total 33-36h, still under your 35h soft target and well within the 45h engagement letter cap.

**Q: "Can you also add [new thing]?"**
A: Two paths.
- If small (~30 min-1h) and MVP-aligned: absorb via remaining buffer (~4.5h available) — no change order, we'll flag it in this log for transparency.
- If larger or introduces new scope surface (new data source, new integration): change order per engagement letter §Scope. Written estimate + your approval before we start.

**Q: "You logged 1h for the BQ link — feels expensive?"**
A: The 1h Entry 7 was a compound task: (a) marking 3 GA4 key events (~10 min), (b) hitting the permission block on my Editor role and diagnosing (~10 min), (c) executing the link via credential session on your account with full audit-log protocol including proactive heads-up email to you (~30 min), (d) sign-out + reconciliation (~10 min). All in-scope work under engagement letter item 4. No padding.

**Q: "Why did the Square tracking work happen if it wasn't in scope?"**
A: You confirmed Option A (track Square outbound clicks) in Message 1 on 07 Jul. We built it in good faith on that written direction (~0.75h). Same day, Message 2 reversed the scope. We absorbed the 0.75h as goodwill — you'll see it flagged as "Absorbed" in every hours report. That's how we handle direction reversals: your call, our cost.

**Q: "Did you do anything I didn't approve?"**
A: No. Every scope decision is traceable to a written Adam message or engagement letter item. See MVP_STATUS.md `Open Confirmations` table + this log for the row-by-row provenance.

---

## Update protocol

- Every session that includes any of the six categories: add a row here BEFORE the working session ends.
- Include the "Where documented" field so cross-references stay tight.
- Update the "Running totals" table at the bottom every time a row is added.
- If any category ticks over an alert threshold — buffer >80% used (>4h), overtime in-scope >20% on any item, out-of-scope work approved — flag proactively in the next Friday status.
