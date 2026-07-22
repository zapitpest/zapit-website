# Looker Studio Dashboard — v2 Build Spec (Adam-signed-off)

**Status:** SIGNED OFF by Adam via email 17 July 2026 with four shaping conditions incorporated below.
**Supersedes:** `docs/LOOKER_DASHBOARD_MOCKUP_v1.md` (v1 was the pre-approval mockup; v2 is the buildable blueprint)
**Build starts:** as soon as first BigQuery daily GA4 export lands (~17-18 Jul, 24-48h from BQ link creation)
**Estimated build effort:** ~5-6 hours (was 4-5h in v1; +1-1.5h for the four conditions below)

---

## Adam's four conditions (must-haves)

### Condition 1 — Booking section future-proofed
"*Even though we don't currently have an online booking system, please keep the booking section in the dashboard structure. We may introduce online bookings again in the future.*"

**Build implementation:**
- Dedicated "Bookings" panel on Page 4 (Conversion Detail).
- Empty-state design: single card, subtle grey tone, copy: *"No bookings tracked yet. This section activates automatically when an online booking system is reintroduced."*
- Data source: `stg_leads` filtered on `event_name = 'book_intent'` — will remain empty until Square (or replacement) is re-added, at which point rows appear automatically.
- `book_intent` GTM tag stays dormant-but-wired in GTM V3 (already the case) — zero rework needed the day online booking returns.

### Condition 2 — Dynamic conversion types (no hard-coding)
"*If we add new conversion events later (for example Commercial Enquiry, Booking, Quote Request, Callback, Emergency, or other forms), they should be able to appear in the reporting without needing the dashboard redesigned.*"

**Build implementation:**
- Every conversion breakdown uses **dimension-based grouping**, never fixed-value filters.
- Concretely:
  - Form submissions table → GROUP BY `form_type` (from `stg_leads`). New form types auto-appear as new rows.
  - Click types table → GROUP BY `click_target`. New click targets auto-appear.
  - Service line performance → GROUP BY `service_line`. New service lines auto-appear.
  - Lead channel breakdown → GROUP BY `lead_channel`. New channels auto-appear.
- **Nowhere in the Looker report** do we hardcode: "contact / quote / callback / emergency / booking" — those become row labels rendered from data, not chart-config values.
- Adding a new conversion event in future = GTM-side event configuration only. Zero dashboard changes required.
- Same pattern for pages/traffic sources/devices — Looker charts render from dimension values, no static allowlist.

### Condition 3 — Intent signals vs confirmed leads
"*Please continue to clearly separate: Website interactions (such as phone clicks or email clicks), and Actual tracked conversions (such as confirmed WhatConverts phone calls or completed enquiry forms). I'd like us to always be able to distinguish user intent from confirmed leads.*"

**Build implementation:**

Introduce a **computed field** at the staging-view level to classify every event into one of two families:

```sql
-- Add to stg_leads view
CASE
  WHEN event_name LIKE 'form_submit_%' THEN 'confirmed_lead'
  WHEN event_name = 'call_connect_inbound' THEN 'confirmed_lead'  -- once WC ingested
  WHEN event_name IN ('click_phone', 'click_email', 'book_intent') THEN 'intent_signal'
  ELSE 'other'
END AS lead_class
```

Dashboard layout consequences:
- **Executive Summary (Page 1) "Leads" KPI** = COUNT of `lead_class = 'confirmed_lead'` only. Never mixes in click_phone/click_email.
- **Conversion Detail (Page 4)** has two clearly-labelled panels:
  - **"Confirmed leads"** — completed form submissions (broken down by `form_type`) + confirmed WhatConverts calls (once ingest lands, joined by `call_id`/`ga_session_id`).
  - **"Website interactions (intent signals)"** — phone clicks, email clicks, book intents. Explicitly captioned: *"Interest signals — not confirmed conversions."*
- Every KPI card + trend line makes it visually explicit which family it's counting. Consistent iconography and colour to signal the distinction.

Why this matters: prevents inflated conversion rates (double-counting a phone click as a "lead" when it's actually just intent). Adam gets a truthful funnel: sessions → intent signals → confirmed leads.

### Condition 4 — Executive summary first, detail on subsequent pages
"*The executive summary on the first page should remain focused on the key business metrics I'd want to check every morning, with the remaining pages providing the detailed breakdowns.*"

**Build implementation:** restructure v1 single-page mockup into a **6-page Looker Studio report**:

| Page | Purpose | Contents |
|---|---|---|
| **1 — Executive Summary** | Morning-check dashboard | Header + date-range picker · 4 KPI cards (Sessions, Visitors, Confirmed Leads, Conv Rate) · Daily traffic + confirmed-leads dual-axis chart · Top 3 lead sources mini-table · Nothing else |
| **2 — Acquisition** | Where visitors come from | Traffic source donut · Leads by source bar · Source × medium cross-tab |
| **3 — Behaviour** | What visitors do on-site | Device split (sessions vs confirmed leads, side-by-side) · Top landing pages · Service page performance (dynamic GROUP BY service_line) |
| **4 — Conversion Detail** | Intent vs confirmed + form breakdown | Confirmed leads panel (form submissions dynamic by form_type; WhatConverts calls placeholder) · Website interactions panel (phone/email clicks + book_intent placeholder — Adam's condition 1 empty state) · Conversion rate over time (multi-line by service_line) |
| **5 — Segments** | Business-cut analysis | Commercial vs Residential 100%-stacked · Termite vs General 100%-stacked · Monthly trend (fills over time) |
| **6 — Search Console** | Phase 3 activation | Placeholder page until TXT record lands + Search Console data source connected. Empty-state design consistent with booking panel |

Navigation: Looker Studio's native page navigation (top bar). Adam bookmarks Page 1 for daily use; drills into other pages as needed.

---

## Data source requirements (before build)

### Staging views — one update needed

`stg_leads` needs a `lead_class` computed field per Condition 3 above. Update to `sql/002_staging_views.sql`:

```sql
-- Inside stg_leads CREATE OR REPLACE VIEW, add before the closing WHERE:
CASE
  WHEN event_name LIKE 'form_submit_%' THEN 'confirmed_lead'
  WHEN event_name = 'call_connect_inbound' THEN 'confirmed_lead'
  WHEN event_name IN ('click_phone', 'click_email', 'book_intent') THEN 'intent_signal'
  ELSE 'other'
END AS lead_class,
```

Do this at the same time as the dataset-name fix (`zapit_raw_ga4` → `analytics_<propertyId>`) — one commit, one SQL rerun.

### Custom fields inside Looker Studio (report-level)

Kept minimal — most classification happens at the staging-view level so future data sources (WhatConverts, GHL) inherit the same semantics automatically.

- `is_confirmed_lead` = `lead_class = "confirmed_lead"` (boolean, for KPI card filtering)
- `is_intent_signal` = `lead_class = "intent_signal"` (boolean, symmetrical)

That's it. Everything else uses raw dimensions.

---

## Design system (unchanged from v1)

- **Type:** Inter · H1 24pt · H2 16pt · Body 12pt · Numbers 20pt tabular figures
- **Palette:** Neutral charcoal `#1F2937` on off-white `#F9FAFB`. Brand accent Zap It yellow/black on KPI values only. Muted grey grid lines. Positive deltas `#059669`, negative deltas `#DC2626`
- **Cards:** 1px border `#E5E7EB`, 8px radius, 24px padding. No drop shadows. Consistent 16px gutter
- **Charts:** Dual-axis only where genuinely needed. No 3D, donut over pie. Legends inline, right-aligned
- **Density:** ≤3 KPI cards per row · ≤4 sections per screen height on desktop
- **Background:** White (per Adam's original preference confirmed in the last message)

---

## Build sequence (post-sign-off)

1. **[TOMORROW]** Verify first BigQuery daily export landed in `analytics_<propertyId>` dataset (per `docs/TOMORROW_VERIFICATION.md` Step 1)
2. **[TOMORROW]** Apply the two SQL updates to `sql/002_staging_views.sql`:
   - Fix dataset name (`zapit_raw_ga4` → `analytics_<propertyId>`)
   - Add `lead_class` computed field per Condition 3
3. **[TOMORROW]** Run updated `002_staging_views.sql` in BigQuery Console → smoke-test all three views return non-zero rows + `lead_class` populates correctly
4. **[BUILD DAY 1]** Create Looker Studio report — set up 3 BigQuery data sources (stg_events, stg_sessions, stg_leads); build Page 1 (Executive Summary) end-to-end; send Adam a screenshot for interim check-in
5. **[BUILD DAY 1]** Build Pages 2 & 3 (Acquisition + Behaviour); another screenshot check-in
6. **[BUILD DAY 2]** Build Page 4 (Conversion Detail — intent vs confirmed panels + booking empty state); screenshot check-in
7. **[BUILD DAY 2]** Build Pages 5 & 6 (Segments + Search Console placeholder); screenshot check-in
8. **[BUILD DAY 2]** Polish pass — brand accents, spacing, consistent typography, empty-state copy
9. **[BUILD DAY 2]** Book 20-min screenshare walk-through with Adam
10. **[BUILD DAY 2]** Ownership handover — Adam becomes Owner, Apex becomes Editor. Update MVP_STATUS row 3.4 to ✅

Per-page check-ins prevent big-bang surprises at handover.

---

## What's still NOT in this dashboard (deferred per engagement letter v2)

- WhatConverts call-content join (calls with recording metadata) — waits for WC ingest block. Booking panel + confirmed-leads panel structure ALREADY hosts this cleanly when it lands.
- GHL deal-stage progression — waits for GHL block.
- Revenue attribution — no ad-spend ingest.
- Multi-report split (e.g. separate paid-media report) — deferred.
- Custom alerts / anomaly detection — deferred.
- AI-generated commentary (platform-agnostic AI layer) — deferred.

Every deferred item has a reserved dataset already provisioned in `zapit-business-intelligence` — dashboard extends without rework when each block ships.

---

## Sign-off provenance

- Mockup v1 sent to Adam: 17 July 2026 via PDF (attachment separate to Friday status)
- Adam sign-off received: 17 July 2026 same day
- Sign-off text saved verbatim in `docs/adam-messages/` (recommended: capture email/message thread verbatim for audit trail)
- v2 build spec (this doc) authored: 17 July 2026

Any post-build change beyond these four conditions goes through change-order per engagement letter §Scope.

---

## v2.1 Amendment — Adam directional reinforcement (18 July 2026)

**Trigger:** Adam's follow-up email 18 Jul reinforced the long-term vision + expanded Page 1 into a "CEO dashboard" — additive to v2, no reversal of any prior decision.

**Additions to Page 1 (Executive Summary → CEO Dashboard):**

The v2 Page 1 answered Q1-Q4 implicitly. Adam explicitly named six questions Page 1 should answer:

| Question | v2 answered? | v2.1 addition |
|---|---|---|
| Q1 · How many leads came in today? | ✅ Confirmed Leads KPI card | — |
| Q2 · Where did they come from? | ✅ Top 3 lead sources mini-table | — |
| Q3 · Which marketing channels are performing best? | ✅ Traffic + confirmed-leads dual-axis chart | — |
| Q4 · Which service lines are growing? | Partial — was on Page 3 | **Add** service-line WoW mini-strip on Page 1 |
| Q5 · What needs my attention today? | Not covered | **New "Needs attention" panel** (rule-based, no AI-layer dependency) |
| Q6 · Any unusual trends or anomalies? | Not covered | **New "Anomalies" panel** (statistical WoW delta flags) |

Both new panels use plain BigQuery scheduled queries + Looker Studio conditional formatting — no AI dependency for MVP. Once the AI layer lands (Hermes/Claude/Codex/future agents writing into `zapit_reserved_ai`), the same panels get upgraded from rule-based to AI-driven; layout stays identical so nothing visible breaks.

### Q5 — "Needs attention today" panel design

Small (~40% width) card on Page 1 below the KPI strip. Shows top 3 flags from a rule-based check across the last 24-48h:

- Conversion rate on a top page dropped >30% vs 4-week baseline
- A service line's leads dropped to zero in last 24h when it usually has ≥1
- A traffic source that had ≥5 leads/week stopped delivering for 3+ days
- Session count dropped >40% vs prior day (sudden traffic loss)

Each flag renders as a one-line item with a small icon (yellow triangle) + the affected dimension + the delta. Empty state (no flags): "All monitored metrics within normal range." (Green check.) — desirable state, not a bug.

### Q6 — "Anomalies (unusual trends)" panel design

Adjacent to Q5 panel (~60% width). Shows any metric where WoW change exceeds ±2 standard deviations from the trailing 4-week rolling window. Currently applies to:

- Total confirmed leads
- Conversion rate
- Sessions
- Leads per service line

Each anomaly renders as: metric name · current value · WoW % change · sparkline of last 7 days. Empty state: "No anomalies in the last 7 days." (Green check.)

### Extended Page 1 layout (v2.1)

```
Row 1  — [Header + date-range picker] full width
Row 2  — [Sessions KPI] [Visitors KPI] [Confirmed Leads KPI] [Conv Rate KPI] · 4 cards
Row 3  — [Daily traffic + confirmed leads dual-axis chart] full width
Row 4  — [Needs attention 40%] [Anomalies 60%] · side-by-side (NEW v2.1)
Row 5  — [Top 3 lead sources mini-table 50%] [Service-line WoW mini-strip 50%] · side-by-side
```

Still fits within "morning check" density — 5 rows, all glance-readable. Adam's rule "nothing else on Page 1" is preserved by resisting the urge to add more.

---

## Multi-source expansion pattern (Adam's central-BI ask)

Adam's long-term vision: this Looker Studio report becomes the central BI dashboard — every future data source (WhatConverts, Zoom, GHL, ads, operational, AI layer) lands as a new tab/panel in this same report, never a separate dashboard.

**Rule to preserve during build:** each dashboard section reads from a `stg_*` view, never directly from a raw ingest table. When a new source arrives:

1. Ingest lands in its reserved dataset (e.g. `zapit_reserved_whatconverts.calls`).
2. A new staging view (e.g. `stg_calls`) unifies + joins the ingest with `stg_leads` on user_pseudo_id or hashed phone/email.
3. A new Looker Studio page (or panel on Page 4) reads from `stg_calls`. Adding this page = ~30 min, not a rebuild.

Documented paths for each future source:

| Source | Ingest lands in | New staging view | Where it surfaces in dashboard |
|---|---|---|---|
| WhatConverts calls | `zapit_reserved_whatconverts.calls` | `stg_calls` | Page 4 "Confirmed calls" panel + joins into Page 1 CEO leads KPI |
| Zoom Phone | `zapit_reserved_zoom.calls` + `.transcripts` | `stg_zoom_calls` | New page 7 "Phone quality" |
| GoHighLevel | `zapit_reserved_ghl.contacts` + `.opportunities` | `stg_deals` | New page 8 "Sales pipeline" |
| Meta Ads | `zapit_reserved_meta_ads.spend` | `stg_meta_ads` | New page 9 "Paid media performance" (Meta + Google unified) |
| Google Ads | `zapit_reserved_google_ads.spend` | (same `stg_paid_media`) | Same as above |
| Microsoft Clarity | `zapit_reserved_clarity.sessions` | `stg_clarity` | Page 3 Behaviour extended with UX signals |
| Operational KPIs | `zapit_reserved_operational.*` | `stg_operations` | New page 10 "Operations" (technicians, proposals, revenue) |
| AI-layer insights | `zapit_reserved_ai.ai_outputs` + `.ai_recommendations` | `stg_insights` | Q5/Q6 panels on Page 1 upgrade from rule-based to AI-driven |
| Search Console | `zapit_raw_search_console.*` | `stg_search` | Page 6 activates |

**Nothing in the MVP dashboard closes off any of these paths.** Every schema is designed to receive new sources without migration.

---

## AI-layer human-approval gate integration path (platform-agnostic)

When the AI layer ships (Hermes / Claude / Codex / future agents), outputs surface in the dashboard through a specific approval workflow:

1. Any AI agent analyses BigQuery data (calls, sessions, page content, etc.)
2. Writes recommendation rows to `zapit_reserved_ai.ai_recommendations` with `human_approval_status = 'pending'` and `source_agent` set to whichever agent produced it
3. A dedicated Looker Studio page ("AI Recommendations") lists pending rows with:
   - Recommendation summary + payload
   - Approve / Reject buttons (external actions triggered via a scheduled Cloud Function reading dashboard-tracked state, OR via a simple Google Apps Script webhook — cheap, no AI-side change needed)
4. On approval → `human_approval_status = 'approved'` → downstream automations (SEO change, content update, campaign tweak) execute
5. Measured outcomes get logged to `zapit_reserved_ai.ai_learning` for closed-loop feedback

The tables already exist as reserved shells (verified `sql/003_reserved_schemas.sql`). The gate is architecturally enforced — no AI-generated action can execute without an approval row-state change, regardless of which agent produced it.

---

## Amendment sign-off

- v2.1 amendment authored: 18 July 2026 (same day as Adam's reinforcement email)
- No re-sign-off from Adam required — this is additive to v2, all four original conditions preserved
- Amendment IS the response to Adam's 18 Jul direction — implementation follows immediately during Phase 3 build
