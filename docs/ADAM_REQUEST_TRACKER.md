# Adam Request Tracker

Single-page cross-reference of every explicit ask, decision, condition, or directive from Adam across the Zap It engagement. Grouped by date. Every row has a status and a pointer to where it is honoured in code, docs, or the dashboard.

**Rule:** before sending any client-facing update, cross-check every row here. If a row is not addressed in the update, either address it or explicitly note why not.

**Last full verification:** 2026-08-01 (Adam approved Pages 4-6 + long-term vision set + credentials shared for WhatConverts, Search Console; Cloudflare Pages confirmed) (after Adam's second-round format feedback landed)

---

## June 2026

| Date | Adam ask / directive | Status | Where honoured |
|---|---|---|---|
| 17 Jun | Provide staging URL of rebuilt site | ⏳ | Awaiting — non-critical while on preview builds |
| 17 Jun | Confirm production domain `zapitpestmelbourne.com.au` | ✅ | Confirmed same day |
| 17 Jun | DNS cutover timeline | ⏳ | Pending Adam scheduling |
| 18 Jun | Create GCP project + grant Editor access | ✅ 25 Jun | `zapit-business-intelligence` live, DRS policy fix applied |
| 18 Jun | Create GA4 property + grant Editor | ✅ 29 Jun | Measurement ID `G-YRVHNE66GH` |
| 18 Jun | Create GTM container + grant Publish | ✅ 29 Jun | Container ID `GTM-PFGV87RB` |
| 18 Jun | Long-term architecture recommendation (Zoom + GHL + BQ + OpenClaw) | ✅ | Replied same day with BQ-as-central-bus + n8n thin ingest pattern |
| 19 Jun | Hours top-up handled by Adam | ✅ | Confirmed |
| 19 Jun | Friday weekly status format approved | ✅ | Adopted; superseded 07 Jul by 6-field format, then 23 Jul by new template |

---

## Early July 2026 (Adam's 07 Jul three-message reply)

| Date | Adam ask / directive | Status | Where honoured |
|---|---|---|---|
| 07 Jul | WhatConverts confirmed as backend | ✅ | Tracking script live 16 Jul via GTM V3 |
| 07 Jul | Square Option A — track outbound click as book_intent | ✅ | `book_intent` tag + trigger + DLV live |
| 07 Jul | Meta Pixel — YES, pending Pixel ID | ✅ | Pixel ID `1088414402938841` live from 16 Jul |
| 07 Jul | Clarity — YES, buffer-absorbed (Adam approved) | ✅ | Project ID `xl7ljoavrz` live from 16 Jul; ~0.5h of 5h buffer used |
| 07 Jul | Google Ads — planned, share IDs at launch | ⏳ | Await ad campaign launch |
| 07 Jul | LinkedIn / TikTok / Bing — out of scope | ✅ | Not built |
| 07 Jul | Feature parity 231 suburbs + 59 blogs — Adam to work through | ⏳ | Sheet being drafted for Adam's review |
| 07 Jul | New weekly status format (6-field) | ✅ | Adopted; further evolved 23 Jul |
| 07 Jul | Square booking system removed from website | ✅ | `book_intent` tag dormant; scope reversed same day |
| 07 Jul | Book Now button decision — Option B (Get a Quote) | ✅ 08 Jul | Live change deployed commit `02f41bc` |
| 07 Jul | Looker Studio confirmed for dashboard | ✅ | Page 1 built |
| 07 Jul | Dashboard direction — polished executive-level | ✅ | Page 1 delivered with executive polish (white cards, `#E5E7EB` borders, brand green accents, no chart junk) |
| 07 Jul | Long-term vision — single central BI dashboard, all sources, OpenClaw insights, human-approval gate | ✅ | Warehouse + reserved schemas + human_approval_status NOT NULL enforced |

---

## Mid-July 2026

| Date | Adam ask / directive | Status | Where honoured |
|---|---|---|---|
| 17 Jul | Condition 1 — booking future-proofed | ✅ | `book_intent` tag dormant + reserved schema ready |
| 17 Jul | Condition 2 — dynamic conversion types, no hard-coding | ✅ | Dimension-based GROUP BY on all Page 1 widgets |
| 17 Jul | Condition 3 — intent signals vs confirmed leads separated | ✅ | `lead_class` field at staging-view level; Confirmed KPI filter |
| 17 Jul | Condition 4 — Page 1 = morning-check only | ✅ | 6-page structure; Page 1 restricted to executive summary |
| 18 Jul | 6 CEO morning-check questions each need a widget home on Page 1 | ✅ | Q1 Confirmed Leads KPI, Q2+Q3 Top Lead Sources, Q4 Service Line chart, Q5 Attention panel, Q6 Anomalies panel |
| 18 Jul | Structured status format — 6 fields | ✅ | Adopted for 18 Jul update; superseded 23 Jul by full template |
| 20 Jul | PostHog for product analytics on internal apps — future block | ✅ | `docs/POSTHOG_FUTURE_ARCHITECTURE.md` written; reserved schema documented; identity-stitching mapped |
| 20 Jul | AI-friendly codebase (AGENTS.md) | ✅ | AGENTS.md fully rewritten with 19 rules + task table + prompt patterns |
| 20 Jul | Platform-agnostic AI naming (openclaw → generic) | ✅ 23 Jul | Renamed `zapit_reserved_openclaw` → `zapit_reserved_ai`; `source_agent` column added |
| 20 Jul | Measure Results step in AI workflow | ✅ 23 Jul | `ai_learning` table with `outcome_verdict` + `delta_absolute` + `delta_percent` |
| 20 Jul | 5 handover docs before final acceptance | ✅ | README + PROJECT_RULES + ANALYTICS_ARCHITECTURE + DEPLOYMENT_AND_DR + AGENTS.md all shipped |
| 22 Jul | Closed-loop learning table | ✅ 23 Jul | `ai_learning` table matches spec |
| 22 Jul | Meta Business Manager access to sharjeel@meetapex.ai | ✅ | Analyst access granted 22 Jul on Pixel 1088414402938841 |

---

## Adam 23 Jul 2026 — Email 1 (Page 1 approved + 5 directives + parallel work)

| # | Adam ask / directive | Status | Where honoured |
|---|---|---|---|
| 1 | Page 1 CEO Dashboard APPROVED — proceed with Pages 2-6 | ✅ | **ALL 6 PAGES BUILT (31 Jul).** Weekly status update sent to Adam with Pages 4/5/6 screenshots attached. Awaiting his approval on Pages 2-6 to proceed with activation sprint. |
| 2 | D1: Page 1 stays executive-focused morning overview | ✅ | Design already enforced; documented in `PROJECT_RULES.md` |
| 3 | D2: 9-channel lead attribution taxonomy (GBP, Organic, Google Ads, Meta Ads, Organic Social, Direct, Referral, Email/SMS, identifiable AI referrals) | ✅ EXECUTED 27 Jul | UDF `zapit_staging.channel_group` deployed to BQ from `sql/006_channel_group_udf.sql`. Channel-aware reporting views (`v_events_with_channel`, `v_sessions_with_channel`, `v_channel_daily`, `v_channel_conversion_detail`) deployed from `sql/007_channel_analytics_views.sql`. Ready for Pages 2 and 3 to consume. |
| 4 | D3: Prepare for long-term revenue attribution (source → qualified leads → customers → closed revenue → ACV → close rate) | ✅ EXECUTED 27 Jul | Generic CRM schema deployed to BQ from `sql/005_reserved_crm_schema.sql`. Full chain supported via contacts / leads / opportunities / outcomes / revenue tables in `zapit_reserved_crm` dataset. |
| 5 | D4: Do NOT hardcode GoHighLevel — keep warehouse CRM-agnostic; use generic concepts | ✅ EXECUTED 27 Jul | `PROJECT_RULES.md` §CRM-agnostic; `ADAM_15_SOURCES_ALIGNMENT.md` row 9 rewritten; new dataset `zapit_reserved_crm` live in BQ with 5 vendor-neutral tables. |
| 6 | D5: New AI stack naming — Hermes (orchestration), Claude (reasoning + analysis), coding agents (implementation) | ✅ | `PROJECT_RULES.md` §AI stack naming; `ADAM_15_SOURCES_ALIGNMENT.md` row 15 |
| 7 | Proceed with as much in parallel as possible: Pages 2-6, WhatConverts, Search Console, hosting, redirects, DNS, handover, Google Ads + Meta conversion tracking prep | 🟡 | Pages 2-6 build starting · WhatConverts code shipped 20 Jul (env-var gated) · Search Console + hosting + DNS + Meta pixel invite all in the "Need from Adam" section of 23 Jul reply · Feature parity docs ready (`FEATURE_PARITY_DECISION_HELPER.md`) · Google Ads + Meta conversion tracking prep documented in `docs/PAID_CONVERSION_TRACKING_PREP.md` · Handover docs polished 23 Jul |
| 8 | Send ONE clear checklist showing exact action, where to do it, what is needed, what stays blocked | ✅ | Included in 23 Jul reply email as "What We Need From You" section with 6 items |

---

## Adam 23 Jul 2026 — Email 2 (Communication format)

| # | Adam ask / directive | Status | Where honoured |
|---|---|---|---|
| 1 | All future updates in strict 8-section template (Overall status → Completed 3-bucket split → Currently being worked on → What can continue without me → What need from me → Decisions required → Next milestone → What this means for Adam) | ✅ | `docs/CLIENT_COMMUNICATION_TEMPLATE.md` created; 23 Jul reply follows it verbatim |
| 2 | Shorter, simpler emails going forward | ✅ | Acknowledged explicitly in reply |
| 3 | Every "need from me" item includes six fields: exact action, where, access/value/decision, time, what's blocked, whether Apex can do it with access | ✅ | All 6 items in 23 Jul reply follow the six-field pattern |
| 4 | Every decision has: recommended option + why + cost/risk + delay impact | ✅ | Both decisions in 23 Jul reply follow the four-field pattern |
| 5 | Include MVP % complete + live vs building vs blocked vs future-phase | ✅ | 23 Jul reply Overall Status opens with 82% + reconciliation math against 18 Jul 80% |
| 6 | Plain-English summary titled "What this means for Adam" | ✅ | Section 8 of 23 Jul reply |

---

## Adam 27 Jul 2026 — Feedback on the new update format (5 refinements)

Adam's reply acknowledged the 23 Jul reply as a "big improvement" and asked for five more refinements to the template. All apply to every future update going forward.

| # | Adam feedback | Status | Where honoured |
|---|---|---|---|
| 1 | Add a simple visual roadmap to every update (all 8 phases with emoji status markers) | ✅ | `docs/CLIENT_COMMUNICATION_TEMPLATE.md` §1 Roadmap |
| 2 | Split future updates into MVP / Phase 2 / Future roadmap tiers | ✅ | `docs/CLIENT_COMMUNICATION_TEMPLATE.md` §1 roadmap now has 3 tiers |
| 3 | Add "Current Risks" section, even if empty | ✅ | `docs/CLIENT_COMMUNICATION_TEMPLATE.md` §8 |
| 4 | Include project hours (this period / total to date / remaining for MVP) | ✅ | `docs/CLIENT_COMMUNICATION_TEMPLATE.md` §9 |
| 5 | Finish with a "Top Priorities" ordered list | ✅ | `docs/CLIENT_COMMUNICATION_TEMPLATE.md` §12 |

**Standing rule:** every substantive future update reads through the 12-section template. No section skipped even when empty (§8 Risks and §12 Priorities always have content, at minimum "None." for risks).

---

## Adam 29 Jul 2026 — New integration project brief (SEPARATE engagement)

**Portal reference:** https://zap-ops-central.lovable.app/auth

Adam sent a substantial new brief on 29 July requesting an audit + 3-tier quote for integrating Square (residential bookings), Lovable/Supabase portal (commercial CRM + reports), and Xero (accounting). Separate engagement from the current MVP. No development until Adam approves the quote.

| # | Adam ask / directive | Status | Where honoured |
|---|---|---|---|
| 1 | Do NOT start development — audit + quote first | ✅ | Reply email committed to no-dev-until-approved |
| 2 | Deliver full 3-tier quote (Minimum / Recommended / Complete) across 5 parts | 🟡 | 2-3 business days committed; ETA Sunday 2 Aug 2026 |
| 3 | Audit existing Lovable portal before quoting | 🟡 | Waiting on admin access to zap-ops-central.lovable.app |
| 4 | Recommend Option A vs B vs C for Square integration | 🟡 | Requires audit first |
| 5 | Cover residential + commercial workflows end to end | 🟡 | To be quoted after audit |
| 6 | Prevent double entry across Square, Lovable, Xero | 🟡 | Design constraint noted |
| 7 | Match customers safely across all 3 systems | 🟡 | Identity-stitching approach to be documented in quote |
| 8 | Keep Square as residential scheduler unless strong reason to replace | ✅ | Noted as constraint |
| 9 | Keep Lovable as commercial operating system | ✅ | Noted as constraint |
| 10 | Xero as accounting source of truth | ✅ | Noted as constraint |
| 11 | CRM-agnostic (no GoHighLevel) — reinforcement of 23 Jul D4 | ✅ | Already honoured; `zapit_reserved_crm` schema is generic |
| 12 | Design so operational data can later feed BigQuery reporting | 🟡 | Architectural touchpoint to preserve in quote |
| 13 | Include duplicate protection, retry, failed-sync visibility | 🟡 | To be scoped in Part 2 + 5 of quote |
| 14 | Support cancellations, refunds, discounts, changed prices | 🟡 | To be scoped |
| 15 | Log every integration action + failure | 🟡 | To be scoped |
| 16 | Test env with test invoices only before production | 🟡 | Part 5 of quote |
| 17 | Plain answer: is project technically possible + is it good value? | 🟡 | To answer in quote |

**Access needed from Adam:**
1. Admin/collaborator access to zap-ops-central.lovable.app for sharjeel@meetapex.ai
2. Read-only Xero access (or walkthrough)
3. Confirmation of any current Square connection

**Reply email sent 29 Jul 2026.** Ball in Adam's court to grant access.

## Standing hygiene / low-priority items

| Item | Status | Notes |
|---|---|---|
| Rotate `info@zapitpestmelbourne.com.au` password | ⏳ | Reminded twice; not blocking |
| WhatConverts phone number allocation + form-tracking config + Google Ads connect + team invites | ⏳ | Non-blocking; batch into a follow-up session with Adam |
| GA4 remaining 5 key events auto-appear as they fire | 🟡 | 3 marked (book_intent, click_phone, form_submit_contact); other 5 fire when their forms are submitted for the first time |
| Melbourne 03 landline for NAP consistency | ⏳ | Included as optional in 23 Jul reply — Adam's call |

---

## Verification rules

1. Every substantive client update must first pass a cross-check against every row in this file.
2. Any row moved to ✅ must include a pointer (file path, dataset name, commit hash, or dashboard reference).
3. If a row is retired or superseded, mark it `SUPERSEDED` with a pointer to what replaced it. Never delete history — Adam's meticulous, and audit trails matter.
4. New Adam requests get added the moment they arrive.

## Version history

- **2026-07-23** — Initial creation. Consolidates every Adam ask from June onwards into a single tracker. Anchor point after Adam's 23 Jul reply establishing the new comms format.
