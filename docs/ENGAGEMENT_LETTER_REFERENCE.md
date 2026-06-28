# Engagement Letter — Key Reference Terms

**Source document:** `Apex AI - Engagement Letter - Website Tracking and Analytics-Revised-MVP-v2 (1).pdf`
**Revision:** v2 — MVP-first, June 2026
**Supersedes:** Original 70-hour engagement letter

This is a quick-reference summary of the binding engagement letter terms. The PDF is the authoritative source — this doc exists so we don't have to re-open the PDF every time we need to check scope/hours.

---

## TOTAL CAP — 40-45 hours

- **MVP Base:** 35-40 hrs (firm scope)
- **Contingency Buffer:** 5 hrs (pre-approved for compression items; rolls forward if unused, never billed)
- **Hard cap:** 45 hrs. Anything beyond requires a written change order.

---

## MVP BASE SCOPE (35-40 hrs)

In-scope deliverables (each MUST land):

| # | Item | Notes |
|---|---|---|
| 1 | GA4 event tracking setup | Property under client ownership |
| 2 | Google Tag Manager configuration | Container under client ownership |
| 3 | Google Search Console setup | Verification + sitemap + alerts |
| 4 | GA4 → BigQuery export | Daily, region australia-southeast1 |
| 5 | Call tracking (WhatConverts recommended) | Tier confirmed after first month of real call data |
| 6 | Meta Pixel installation + verification | Included because Adam is planning Meta ads — retrospective data can't be backfilled |
| 7 | Core conversion events | Phone calls, form submissions, quote requests, booking/contact clicks |
| 8 | Looker Studio top-line dashboard | **Single** dashboard (multi-dashboard = follow-up block) |
| 9 | Service-line tagging | Commercial, residential, termite, emergency (4 core tags) |

---

## DEFERRED (NOT in MVP — explicitly excluded)

- Microsoft Clarity (heatmaps / session recordings) — follow-up block
- Full UTM taxonomy across every channel — follow-up block
- Multi-dashboard Looker Studio setup — follow-up block
- Custom alerts and anomaly detection — follow-up block
- Full BigQuery transformation layer — folds into OpenClaw block
- Tagging remaining pest service lines beyond 4 core tags — follow-up block

---

## ITEMS NOT INCLUDED (explicit exclusions)

- Paid advertising spend / ad creative
- Content writing
- SEO link-building outreach
- CRM integration / lead routing
- Hardware
- AI optimisation / transcription / summarisation / AI-driven content (OpenClaw block)
- Anything in Deferred list

---

## PARALLEL-START APPROVAL

Adam has approved these foundation items to commence in parallel with the letter being finalised:
- GA4 property setup
- GTM container configuration
- Search Console verification
- BigQuery foundation
- Meta Pixel installation

**All hours from parallel-start date count against the 40-45 hr block from day one.** No separate pre-engagement budget.

---

## DELIVERABLES AT COMPLETION

Zap It receives at handover:
- GA4 property configured + live under Zap It's Google account
- GTM container configured + live
- Search Console verified + sitemap submitted + alerts configured
- Meta Pixel installed + verified
- GA4 → BigQuery export configured + streaming
- Core conversion events live, each tagged with service-line parameter
- Call tracking provider account configured + integrated
- Looker Studio top-line dashboard (daily refresh, filtered by date/source/service-line)
- AI-readiness data layer (consistent naming convention, BigQuery export, documented data contract)
- Weekly status updates throughout build
- Owner walkthrough call + written handover doc

---

## TIMELINE

- Build duration: **~2-3 weeks active build**
- Kickoff date: TBD
- Engagement clock pauses for client-side dependency delays (no penalty either side)

## REPORTING CADENCE

Weekly status email to Adam, 5 fields:
1. Hours consumed vs budget
2. Work completed that week
3. Blockers / outstanding dependencies
4. Planned work for following week
5. (Adam approved on 2026-06-19)

Milestone sign-offs requested at end of each major build phase (written, email acceptable).

---

## OWNERSHIP

- Zap It owns 100% of: GA4 property, GTM container, Search Console, Meta Pixel, Looker Studio dashboard, BigQuery dataset, call tracking provider account, configuration + documentation
- Apex AI has admin/collaborator access during build only — transfers on handover
- Apex AI retains no rights to resell/reuse/withhold

---

## SCOPE GUARDRAILS

- **Hard cap:** 45 hours. Beyond = written change order.
- **Buffer (5 hrs):** Pre-approved for compression items (naming, attribution edge cases, WhatConverts AU verification, BigQuery permissions). No change order needed for buffer use.
- **Undiscovered complexity:** Raise immediately + quote adjustment via change order before continuing.
- **Pause/cancellation:** Work to that point billable in line with hours consumed. All workflows + credentials + docs handed over.

---

## ASSUMPTIONS

- Client supplies access items within 5 business days of kickoff (delays pause clock)
- Browser support: current iOS Safari, Android Chrome, desktop Chrome + Edge (others best-effort)
- Data accuracy guaranteed at handover only — post-handover external changes (platform APIs, ad blockers, browser privacy) outside our responsibility
- Review windows: 3 business days for milestone sign-offs
- Pass-through costs (WhatConverts subscription etc.) sit on client's accounts — NOT in hour estimate
- **Post-launch support: 30 calendar days bug-fixing + minor adjustments INCLUDED at no extra cost**

---

## SIGN-OFF STATE

- Apex AI signatory: TBD
- Adam signatory: Adam [surname TBD], Owner Zap It Pest & Termite Control Melbourne
- Status: Unsigned (parallel-start active under verbal/written approval)
- The signed letter retrospectively formalises hours already worked under parallel-start

---

## QUICK GUARDRAILS FOR EVERY SESSION

Before starting any session-level work, check:
- [ ] Is this item in MVP Base scope? (If deferred or not-included → change order)
- [ ] Are we under 45 total hours? (If approaching → flag Adam before continuing)
- [ ] Is the buffer being touched? (If yes → still in scope, no change order needed)
- [ ] If undiscovered complexity → STOP, quote change order, get written approval

---

## CROSS-REFERENCES

- Live tracker: `docs/MVP_STATUS.md`
- Weekly status template: `docs/weekly-status/2026-06-27-week-1.md`
- GTM blueprint: `docs/gtm-blueprint.md`
- Looker wireframes: `docs/looker-wireframes.md`
- Feature Parity audit: `docs/FEATURE_PARITY_AUDIT.md`
