# Zap It — MVP Marketing & Conversion Dashboard (Looker Studio)

**Status:** Mockup v1 — for Adam's pre-approval before build starts.
**Author:** Sharjeel · Apex AI
**Date:** 16 July 2026
**Supersedes:** `docs/looker-wireframes.md` (three-dashboard draft — see "Why one dashboard, not three" below)

---

## 1. Executive summary (for Adam)

One executive dashboard. **13 sections** matching your Message 3 direction — visitors, sources, device split, service page performance, form submits, phone conversions, conversion rates, top landing pages, search performance (Phase 3 add), Commercial vs Residential, Termite vs General, monthly trends, leads by source.

Design language: polished, executive, not a stock GA4/analytics report. Big top-line KPIs, clean typography, calm colour palette (Zap It brand accents against neutral background), consistent card treatment, minimal chart-junk. Every chart answers exactly one question.

Data source: BigQuery `zapit-business-intelligence.zapit_staging.stg_*` views (`stg_events`, `stg_sessions`, `stg_leads`) on top of the GA4 daily export.

Refresh cadence: daily (matches GA4 → BigQuery daily export). Real-time preview available via GA4 intraday table if we later decide to add a "today so far" strip.

---

## 2. Why one dashboard, not three

Engagement letter v2 (MVP scope, item 8) allocates **one top-line Looker Studio dashboard**. The earlier `looker-wireframes.md` draft split into 3 (Conversion / Service Line / Attribution) — that was Phase 0 speculation before the engagement letter locked scope.

Consolidating to one polished dashboard with 13 sections keeps us inside MVP scope AND matches Adam's Message 3 direction. If Adam later wants dashboards 2 and 3 they become follow-up blocks (deferred per engagement letter §Deferred Items — "multi-dashboard Looker").

---

## 3. Layout — full wireframe

Executive-polish rule: never more than 3 cards horizontally at any row, never more than 4 sections visible in one screen height. Reading order is top-to-bottom, left-to-right. Sections group into 4 "chapters".

### Chapter A — What happened this period (overview)

**Section 1 — Header + date range picker**
```
┌───────────────────────────────────────────────────────────────────────────┐
│  [Zap It Logo]  Marketing & Conversion Dashboard        [Last 7 days ▾]   │
│                                                          [Compare: on ▾]  │
│  Last data refresh: 2026-07-17 · Data source: GA4 → BigQuery              │
└───────────────────────────────────────────────────────────────────────────┘
```
- Default range: **Last 7 days** for the first two weeks (we won't have 28d of history yet). Auto-widen to Last 28 days once 30 days of data has landed.
- Compare-to-previous toggle on by default — every KPI shows WoW ▲/▼.

**Section 2 — Executive KPI strip (5 scorecards)**
```
┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│  Sessions │ │  Visitors │ │   Leads   │ │  Conv.    │ │  Avg.     │
│           │ │  (unique) │ │  (total)  │ │  Rate     │ │  Session  │
│   1,247   │ │    968    │ │    52     │ │   4.2%    │ │   1m 52s  │
│  ▲ 12.4%  │ │  ▲ 9.1%   │ │  ▲ 18.2%  │ │  ▲ 0.4pp  │ │  ▼ 3.1%   │
└───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘
```
- KPIs: Sessions, Users, Total Leads (form + phone + email), Conversion Rate (leads ÷ sessions), Avg. Session Duration.
- Colour: brand accent for ▲ positive, muted red for ▼ negative, no traffic-light bars.

**Section 3 — Traffic + Conversions daily (combined chart)**
```
┌───────────────────────────────────────────────────────────────────────────┐
│  Daily traffic + conversions                                               │
│  ──────  Sessions (line, left axis)                                        │
│  ▪▪▪▪▪▪  Leads (bars, right axis)                                          │
│                                                                            │
│  [Dual-axis chart: 7 days, sessions line overlaid on leads bars]           │
└───────────────────────────────────────────────────────────────────────────┘
```
- Single glance answers: "Is traffic growing? Are leads keeping up?"
- Uses `stg_sessions` + `stg_leads` grouped by event_date.

### Chapter B — Where visitors come from (acquisition)

**Section 4 — Traffic sources (donut + table)**
```
┌───────────────────────────────────────┐  ┌──────────────────────────────┐
│  Traffic source mix                    │  │  Source / Medium breakdown   │
│                                        │  │  google / organic    41%     │
│         ● Organic 41%                  │  │  (direct) / (none)   26%     │
│         ● Direct 26%                   │  │  google / cpc        14%     │
│         ● Paid 14%                     │  │  facebook / referral  9%     │
│         ● Referral 9%                  │  │  bing / organic       5%     │
│         ● Social 10%                   │  │  facebook / cpc       5%     │
└───────────────────────────────────────┘  └──────────────────────────────┘
```
- Data: `stg_sessions.traffic_source` + `traffic_medium`.
- Donut aggregates the medium (organic/cpc/referral/direct/social/email).

**Section 5 — Leads by source (bar chart)**
```
┌───────────────────────────────────────────────────────────────────────────┐
│  Leads by source                                                           │
│  google / organic       ████████████████  18                               │
│  google / cpc           ██████████        12                               │
│  (direct) / (none)      ████████          9                                │
│  facebook / referral    ████              5                                │
│  bing / organic         ██                3                                │
└───────────────────────────────────────────────────────────────────────────┘
```
- Only converting sessions counted. Tells Adam where his budget is actually working.

### Chapter C — What visitors do on-site (behaviour)

**Section 6 — Device split (donut, side-by-side sessions vs leads)**
```
┌───────────────────────────────────────┐  ┌──────────────────────────────┐
│  Device — sessions                    │  │  Device — leads              │
│         ● Mobile 68%                  │  │         ● Mobile 74%         │
│         ● Desktop 27%                 │  │         ● Desktop 22%        │
│         ● Tablet 5%                   │  │         ● Tablet 4%          │
└───────────────────────────────────────┘  └──────────────────────────────┘
```
- Side-by-side surfaces the "mobile users convert more" insight without a computed field.

**Section 7 — Top landing pages (table)**
```
┌───────────────────────────────────────────────────────────────────────────┐
│  Top landing pages                                                         │
│  ───────────────────────────────────────────────────────────────────────  │
│  Page                        Sessions   Leads   Conv. Rate                │
│  /                             312        14      4.5%                    │
│  /coburg                       184         9      4.9%                    │
│  /reservoir                    142         6      4.2%                    │
│  /termite-control-melbourne     97         5      5.2%                    │
│  /contact-us                    83        12     14.5%                    │
│  /commercial-pest-control       61         3      4.9%                    │
└───────────────────────────────────────────────────────────────────────────┘
```
- Sorted by leads desc. Top 10 visible, sortable columns.

**Section 8 — Service page performance (horizontal bar)**
```
┌───────────────────────────────────────────────────────────────────────────┐
│  Service page performance (sessions · leads · conv. rate)                  │
│  Residential   sessions ████████ 384 · leads ████ 22 · CR 5.7%             │
│  Commercial    sessions ████ 189 ·   leads ██ 11 · CR 5.8%                 │
│  Termite       sessions ███ 142 ·    leads ██ 9  · CR 6.3%                 │
│  Emergency     sessions ██ 78 ·      leads █ 6   · CR 7.7%                 │
│  Generic       sessions ████ 454 ·   leads ██ 4  · CR 0.9%                 │
└───────────────────────────────────────────────────────────────────────────┘
```
- Data: `stg_leads.service_line` + `stg_sessions.service_line` (from GA4 custom dimension `Service Line`).
- Answers: "Which service line converts, and where should I spend?"

### Chapter D — Conversion detail (leads)

**Section 9 — Form submits (table)**
```
┌───────────────────────────────────────────────────────────────────────────┐
│  Form submissions by type                                                  │
│  ───────────────────────────────────────────────────────────────────────  │
│  Form type       Count   % of total   Trend (7d sparkline)                │
│  contact          28       53.8%       ▁▂▃▂▄▃▅                           │
│  quote            14       26.9%       ▁▂▁▃▂▃▄                           │
│  callback          6       11.5%       ▁▁▂▁▃▁▂                           │
│  emergency         3        5.8%       ▁▁▁▂▁▁▂                           │
│  booking           1        1.9%       ▁▁▁▁▁▁▁                           │
└───────────────────────────────────────────────────────────────────────────┘
```
- Data: `stg_leads` filtered `lead_channel = 'form'`, grouped by `form_type`.

**Section 10 — Phone conversions (KPI + trend)**
```
┌───────────────────────────────────────────────────────────────────────────┐
│  Phone conversions                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                                    │
│  │ Phone    │ │ Email    │ │ Total    │                                    │
│  │ clicks   │ │ clicks   │ │ contact  │                                    │
│  │   89     │ │   14     │ │  clicks  │  Trend (7d):                       │
│  │ ▲ 22%    │ │ ▲ 8%     │ │   103    │  ▁▂▃▄▃▅▄                           │
│  └──────────┘ └──────────┘ └──────────┘                                    │
│                                                                            │
│  Note: WhatConverts call-tracking data joins here once phone-tracking      │
│  is live (post-Melbourne 03 number allocation + AU verification).          │
└───────────────────────────────────────────────────────────────────────────┘
```
- Data: `stg_leads.lead_channel = 'click'`, filtered by `click_target`.

**Section 11 — Conversion rate over time (line chart)**
```
┌───────────────────────────────────────────────────────────────────────────┐
│  Conversion rate — daily                                                   │
│  ──────  Overall CR                                                        │
│  ─ ─ ─   Residential CR                                                    │
│  · · ·   Commercial CR                                                     │
│                                                                            │
│  [Multi-line chart, 28-day window once available]                          │
└───────────────────────────────────────────────────────────────────────────┘
```

### Chapter E — Segment cuts (Adam-requested comparisons)

**Section 12 — Commercial vs Residential + Termite vs General (2 side-by-side comparisons)**
```
┌───────────────────────────────────────┐  ┌──────────────────────────────┐
│  Commercial vs Residential            │  │  Termite vs General          │
│                                        │  │                              │
│  Residential   ██████████████  70%     │  │  General       ████████  60% │
│  Commercial    ██████          30%     │  │  Termite       █████     40% │
│                                        │  │                              │
│  (of qualified leads, last 28d)        │  │  (of qualified leads, 28d)   │
└───────────────────────────────────────┘  └──────────────────────────────┘
```
- Two 100%-stacked bars answering Adam's exact Message 3 asks.

**Section 13 — Monthly trends + Search performance placeholder**
```
┌───────────────────────────────────────────────────────────────────────────┐
│  Monthly trend                                                             │
│  ──────  Sessions (left axis)                                              │
│  ▪▪▪▪▪▪  Leads (right axis)                                                │
│                                                                            │
│  [12-month rolling chart — starts sparse, fills as data accumulates]       │
│                                                                            │
│  ─── Search Console (Phase 3 add — pending TXT verification) ───────────  │
│  Top queries · Impressions · Clicks · CTR · Avg position                   │
│  [Table appears here once Search Console is verified + linked.]            │
└───────────────────────────────────────────────────────────────────────────┘
```
- Monthly view is the "long game" cell — will look sparse for the first 4-6 weeks. That's honest — we'll caption it "Data accumulating since 2026-07-17."
- Search Console block is Phase 3 add-on, gated on Adam adding the TXT record at registrar.

---

## 4. Design system (executive polish)

- **Type:** Inter (Looker Studio built-in). H1 24pt · H2 16pt · Body 12pt. Numbers 20pt tabular figures.
- **Palette:** Neutral charcoal `#1F2937` on soft off-white `#F9FAFB`. Brand accent Zap It yellow/black on KPI values only. Muted grey grid lines. Positive deltas `#059669`, negative deltas `#DC2626` — small, never full-bar fills.
- **Cards:** 1px border `#E5E7EB`, 8px radius, 24px padding. No drop shadows. Consistent 16px gutter.
- **Charts:** Dual-axis only where genuinely needed (Section 3, Section 13). No 3D, no pie chart alternatives (donut only). Legends inline, right-aligned.
- **Density:** never more than 3 KPI cards per row · never more than 4 sections per screen height on desktop.

---

## 5. Data source mapping

Every section maps to one staging view. No dashboard-side transformations beyond simple GROUP BY / date filters.

| Section | Primary view | Fields used |
|---|---|---|
| 2 KPI strip | `stg_sessions` + `stg_leads` | user_pseudo_id, ga_session_id, event_count |
| 3 Daily traffic + conv | `stg_sessions` + `stg_leads` | event_date, count |
| 4 Source donut | `stg_sessions` | traffic_source, traffic_medium |
| 5 Leads by source | `stg_leads` | traffic_source, traffic_medium |
| 6 Device split | `stg_sessions` + `stg_leads` | device_category |
| 7 Top landing pages | `stg_sessions` + `stg_leads` | page_path (first) |
| 8 Service page perf | `stg_sessions` + `stg_leads` | service_line |
| 9 Form submits | `stg_leads` | form_type, lead_channel='form' |
| 10 Phone conversions | `stg_leads` | click_target, lead_channel='click' |
| 11 Conv. rate trend | `stg_sessions` + `stg_leads` | event_date, service_line |
| 12 Segment cuts | `stg_leads` | service_line |
| 13 Monthly + Search | `stg_leads` + Search Console connector | event_date + Search Console fields |

---

## 6. Build sequence (Phase 3, after BigQuery data lands)

1. Confirm first daily GA4 export has landed (24-48h from BQ link creation on 2026-07-16 → **expected 2026-07-17 late evening / 2026-07-18 morning AEST**).
2. Fix the SQL dataset-name discrepancy (see §7 below).
3. Run `sql/002_staging_views.sql` and smoke-test each view returns rows (`SELECT COUNT(*) FROM stg_events` etc.).
4. Send this mockup to Adam for sign-off. **Do not build the actual dashboard until he approves.**
5. Post-approval: create the Looker Studio report, connect 3 BigQuery data sources (one per staging view), build sections top-to-bottom.
6. Preview with Adam via screenshare before ownership handover.
7. Transfer ownership to Adam's Google account; leave Apex as Editor.

---

## 7. Deep-audit findings (things I need from you / issues to close before build)

These are the honest gaps I found doing the audit. Nothing catastrophic — all fixable inside the current Phase 3 budget.

### 7.1 [CRITICAL — fix before running SQL] Dataset-name mismatch

Current `sql/002_staging_views.sql` line 51 reads:
```sql
FROM `zapit-business-intelligence.zapit_raw_ga4.events_*`;
```

GA4's daily export doesn't create a dataset called `zapit_raw_ga4` — it auto-creates a dataset named `analytics_<propertyId>` (e.g. `analytics_367891234`), and Google **does not allow renaming BigQuery datasets**.

**Fix (tomorrow, ~5 min):** once the first export lands, grab the actual dataset name from the BigQuery console, then update the SQL to point at it. Two ways:
- (a) Change the FROM to `analytics_<propertyId>.events_*` directly (simplest).
- (b) Create an authorised view `zapit_raw_ga4.events` that selects from `analytics_<propertyId>.events_*` (preserves original naming — cosmetic only, tiny extra step).

Recommended: **(a)** for MVP simplicity. Fix documented in `TOMORROW_VERIFICATION.md` step 4.

### 7.2 [User-side] `stg_events` needs 24-48h of data before it's meaningful

The staging views are just SQL definitions until GA4 has actually exported at least one day of events. On day-1 the tables will exist but be nearly empty. Dashboard sections will render as "No data" until at least a day of events accumulates. This is expected — I'll caption the dashboard "Data accumulating since 2026-07-17" so Adam doesn't misread empty charts as a build problem.

### 7.3 [User-side] Some events haven't fired yet, so their sections start empty

Five of eight custom events haven't been triggered yet (`click_email`, `form_submit_quote`, `form_submit_booking`, `form_submit_callback`, `form_submit_emergency`). Once we fire them via the `/debug/analytics` QA tester page or once real users trigger them, they'll appear in Section 9 (Form submits) and Section 10 (Phone conversions).

**Action for you:** in the next 2 days, visit `https://zapitpestmelbourne.netlify.app/debug/analytics?debug=tracking` and click each event button once to seed the data. Takes 1 minute. This makes the dashboard demo-ready for Adam instead of sparse.

### 7.4 [Adam-side, not urgent] Search Console TXT record

Section 13's Search Console block stays empty until Adam adds the TXT record at his registrar. Non-blocking — the rest of the dashboard works without it. I'll flag in the next Friday status. Estimated ~5 min for Adam once we send him the TXT value.

### 7.5 [Adam-side, not urgent] Password rotation on `info@zapitpestmelbourne.com.au`

Third reminder now standing — this is standard hygiene after any credential-session. Not blocking any Phase 3 work; just needs to happen before handover.

### 7.6 [User-side, small] ContactForm doesn't submit form data yet

`ContactForm.tsx` fires the `form_submit_contact` GA4 event correctly but doesn't yet submit the form fields anywhere (no WhatConverts POST, no email, no CRM). Leads are being **counted** but not **stored**. That's a ~1h follow-up code change to wire either the WhatConverts embedded form OR direct WhatConverts API call. Batch with WhatConverts phone-tracking setup as a dedicated follow-up session.

### 7.7 [Confirmed non-issue] `book_intent` tag dormant

The `tag.ga4.book_intent` tag still lives in GTM V3 but never fires (no Square links on site since 16 Jul). Dashboard shows nothing for it — Section 9/10 filter it out by design. Left in place in case Adam re-adds a booking system later.

### 7.8 [Nothing misleading in Adam's messages] — audit clear

I re-read every Adam message (Message 1/2/3 on 07 Jul + Book Now Option B confirmation 08 Jul + 3-item delivery). All directives are consistent, all decisions unambiguous. Nothing I need to question or push back on.

---

## 8. What's NOT in this MVP dashboard (deferred, per engagement letter v2)

- Cohort analysis (retention, repeat-visit funnels) — future block.
- WhatConverts call-content data (call recordings, source tagging) — waits for WhatConverts ingest block.
- CRM deal-stage progression (GHL pipeline) — waits for GHL block.
- Revenue attribution — no ad-spend or deal-value ingest in MVP.
- Custom alerts / anomaly detection — deferred per engagement letter.
- Multi-dashboard split (Conversion / Attribution / Service Line separate reports) — deferred; can be added as follow-up blocks after MVP.
- AI-generated commentary — waits for OpenClaw block.

---

## 9. Next step (waiting for Adam)

**Send this mockup to Adam.** Ask: "Does this match your vision for the executive dashboard? Any section you'd add, remove, or re-order before I start the build?"

Once he signs off (or requests tweaks), Phase 3 build begins the moment the SQL dataset-name fix (§7.1) is in and the staging views return rows. Estimated build effort **~4-5h** end to end (~1h data-source setup, ~2h section build, ~1h polish + branding, ~30min screenshare walk-through with Adam, ~30min ownership handover).
