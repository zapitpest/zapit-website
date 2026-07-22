# Looker Studio — Build Session Checklist

**Purpose:** step-by-step tactical checklist for the actual Looker Studio build session, once BigQuery data has landed and staging views are live.

**Prerequisites** (do these first — see `docs/TOMORROW_VERIFICATION.md`):
- ✅ `analytics_<propertyId>` dataset visible in BigQuery under `zapit-business-intelligence`
- ✅ `sql/002_staging_views.sql` updated with actual dataset name + re-run
- ✅ Three views (`stg_events`, `stg_sessions`, `stg_leads`) return non-zero rows
- ✅ `lead_class` field populates correctly in `stg_leads` (should show `confirmed_lead` and `intent_signal` values, not all NULL)

**Estimated total time:** 5-6 hours for a clean end-to-end build.

---

## Step 0 — Setup (15 min)

1. Open `https://lookerstudio.google.com` — log in as **sharjeel@meetapex.ai**.
2. Click "+ Create" → "Report".
3. When prompted, add BigQuery as the data source. Pick project `zapit-business-intelligence` → dataset `zapit_staging`.
4. Add **three data sources** (Looker Studio requires one per view):
   - Data source 1: `stg_events` — rename in Looker to "Events"
   - Data source 2: `stg_sessions` — rename to "Sessions"
   - Data source 3: `stg_leads` — rename to "Leads"
5. Name the report: **"Zap It — Marketing & Conversion Dashboard"**.
6. Set default date range: **Last 7 days** (temporary — bump to Last 28 days once we have 30d of history).
7. Enable **Date range compare** with "Previous period" (default on all pages).
8. Confirm each data source's fields are populating correctly by clicking through the schema — especially `lead_class` on the Leads source. Should show STRING type with values `confirmed_lead` / `intent_signal` / `other`.

---

## Step 1 — Page 1: Executive Summary — CEO Dashboard (90 min, +30min from v1 for Q5+Q6)

**Page name:** `1 · Executive Summary`

Per Adam's 18 Jul reinforcement — this page is the "CEO dashboard" answering 6 specific questions he'd ask every morning. Q1-Q4 via KPIs + charts; Q5 via `v_attention_flags` view; Q6 via `v_anomalies` view.

### Pre-req: create the reporting views first

Before opening Looker Studio, run [sql/004_ceo_dashboard_views.sql](../sql/004_ceo_dashboard_views.sql) in BigQuery Console. This creates 5 views in `zapit_reporting`:
- `v_daily_kpis` — daily wide-format metrics for KPIs + anomaly baseline
- `v_service_line_daily` — per service line per day
- `v_traffic_source_daily` — per source per day
- `v_attention_flags` — Q5 rule-based flags (empty when healthy)
- `v_anomalies` — Q6 ±2σ WoW deltas (empty when normal)

Smoke-test the flags view returns clean structure (even with 0 rows on day 1):
```sql
SELECT * FROM `zapit-business-intelligence.zapit_reporting.v_attention_flags`;
SELECT * FROM `zapit-business-intelligence.zapit_reporting.v_anomalies`;
```

### Widgets

Add a 4th "Reporting Views" data source in Looker Studio → BigQuery → `zapit-business-intelligence` → `zapit_reporting`. Add each view as its own connection so filters stay clean.

| # | Widget | Data source | Config | Answers Adam's Q |
|---|---|---|---|---|
| 1 | Header text block | — | H1 "Marketing & Conversion Dashboard" + subtitle "CEO dashboard — daily check-in" | — |
| 2 | Date range control | — | Default: Last 7 days; Compare: Previous period | — |
| 3 | KPI card — Sessions | Sessions | Metric: `RECORD_COUNT` · Comparison delta on | — |
| 4 | KPI card — Visitors | Sessions | Metric: `COUNT DISTINCT user_pseudo_id` · Comparison delta on | — |
| 5 | KPI card — **Confirmed Leads** | Leads | Metric: `RECORD_COUNT` · **Filter: `lead_class = 'confirmed_lead'`** · Comparison delta on | **Q1** |
| 6 | KPI card — Conversion Rate | Blended | Custom metric: `SUM(confirmed_leads) / SUM(sessions) * 100` · Displayed as % | — |
| 7 | Time series chart — Daily traffic + confirmed leads | Sessions + Leads | Dual axis. Left: Sessions/day. Right: Confirmed Leads/day (filter `lead_class = 'confirmed_lead'`). Legend below | **Q3** |
| 8 | **Needs attention panel** (NEW v2.1) | `v_attention_flags` view | Table, no header row. Columns: severity dot (conditional format from `severity` col — red for 3, amber for 2, blue for 1) + `flag_headline` + `flag_detail` micro-copy underneath. Empty state text: **"All monitored metrics within normal range."** with a green check icon | **Q5** |
| 9 | **Anomalies panel** (NEW v2.1) | `v_anomalies` view | Table. Columns: `metric` · `current_value` · `pct_change`% (green if pos, red if neg) · `z_score` (2 dp) · direction icon ▲/▼. Empty state text: **"No anomalies detected in the last 7 days."** with a green check | **Q6** |
| 10 | Top 3 lead sources | Leads | Table, 3 rows max. Dim: `traffic_source / traffic_medium`. Metric: Confirmed leads count. Sort desc. Filter `lead_class = 'confirmed_lead'` | **Q2** |
| 11 | **Service-line WoW mini-strip** (NEW v2.1) | `v_service_line_daily` view | 5 small KPI cards side-by-side (residential / commercial / termite / emergency / generic). Each shows this-week count + WoW delta. Dynamic — service lines render from data, no hardcoded rows | **Q4** |

### Extended Page 1 layout (v2.1)

```
Row 1  — [Header + date-range]  full width
Row 2  — [Sessions] [Visitors] [Confirmed Leads] [Conv Rate]  4 KPI cards
Row 3  — [Daily traffic + confirmed leads chart]  full width
Row 4  — [Needs attention 40%] [Anomalies 60%]  side-by-side  ← NEW
Row 5  — [Top 3 lead sources 50%] [Service-line WoW mini-strip 50%]  ← NEW mini-strip
```

### Executive Summary rules (v2.1)
- **No other widgets on this page.** 5 rows total, all glance-readable, no scroll to see everything.
- Every conversion metric uses **`lead_class = 'confirmed_lead'`** — never mixes in intent signals.
- All KPI cards show WoW delta (positive green, negative red, small ▲/▼ glyphs).
- Attention + Anomaly panels render empty-state (green check) when nothing to flag — desirable state, not a bug.
- Whitespace matters. Don't overcrowd.

### Screenshot check-in
Once Page 1 is done, take a screenshot and send Adam: *"Page 1 (CEO dashboard) done — this is what you'll open every morning. Answers Q1-Q6 you called out. Q5 and Q6 use rule-based BigQuery views today; upgradeable to AI-driven insights later (platform-agnostic — Hermes/Claude/Codex/future agents) without layout change. Building acquisition next."*

---

## Step 2 — Page 2: Acquisition (45 min)

**Page name:** `2 · Acquisition`

### Widgets

| # | Widget | Data source | Config |
|---|---|---|---|
| 1 | Header + date range control | — | Repeat pattern from Page 1 |
| 2 | Traffic source donut | Sessions | Dimension: `traffic_medium`. Metric: Sessions. Show percentages |
| 3 | Leads by source table | Leads | Dimension: `traffic_source / traffic_medium`. Metric: Confirmed leads count. Filter `lead_class = 'confirmed_lead'`. Sort desc |
| 4 | Source × medium cross-tab | Sessions | Row dim: `traffic_source`. Col dim: `traffic_medium`. Metric: Sessions |
| 5 | Campaign performance (if any campaigns) | Sessions | Table. Dim: `traffic_campaign`. Metric: Sessions + Confirmed leads. Rows with campaign != null only |

### Screenshot check-in
Send to Adam.

---

## Step 3 — Page 3: Behaviour (45 min)

**Page name:** `3 · Behaviour`

### Widgets

| # | Widget | Data source | Config |
|---|---|---|---|
| 1 | Header + date range control | — | — |
| 2 | Device — sessions donut | Sessions | Dim: `device_category`. Metric: Sessions |
| 3 | Device — confirmed leads donut | Leads | Dim: `device_category`. Metric: Confirmed leads count. Filter `lead_class = 'confirmed_lead'` |
| 4 | Top landing pages table | Sessions + Leads | Blended. Dim: `page_path`. Metrics: Sessions · Confirmed leads · Conversion rate. Sort by confirmed leads desc. Top 10 |
| 5 | Service page performance | Sessions + Leads | **Dimension-based GROUP BY `service_line`** (Adam's Condition 2 — no hardcoded rows). Metrics: Sessions · Confirmed leads · CR |

### Screenshot check-in
Send to Adam. Highlight that Section 5 uses dynamic GROUP BY per his Condition 2.

---

## Step 4 — Page 4: Conversion Detail (90 min — the most complex page)

**Page name:** `4 · Conversion Detail`

This is where Adam's Conditions 1, 2, and 3 all show up. Take extra care.

### Layout (two-panel structure)

**Left column: CONFIRMED LEADS** (bordered, header labelled "Confirmed leads — actual conversions")

| # | Widget | Data source | Config |
|---|---|---|---|
| 1 | Header block | — | "Confirmed leads — actual conversions" + micro-copy: "Completed forms + confirmed WhatConverts calls" |
| 2 | KPI: Total confirmed leads | Leads | Filter `lead_class = 'confirmed_lead'` |
| 3 | Form submissions dynamic table | Leads | **GROUP BY `form_type`** (Condition 2 — dynamic). Metric: count. Filter `lead_class = 'confirmed_lead' AND lead_channel = 'form'`. Rows appear as data arrives — no hardcoded row list |
| 4 | Confirmed WhatConverts calls (placeholder card) | — | Empty-state card: "WhatConverts confirmed calls appear here once phone-tracking is live" |

**Right column: WEBSITE INTERACTIONS (intent signals)** (bordered, header labelled "Website interactions — intent signals")

| # | Widget | Data source | Config |
|---|---|---|---|
| 5 | Header block | — | "Website interactions — intent signals" + micro-copy: "Interest signals — not confirmed conversions" |
| 6 | KPI: Total intent signals | Leads | Filter `lead_class = 'intent_signal'` |
| 7 | Click types dynamic table | Leads | **GROUP BY `click_target`** (Condition 2). Metric: count. Filter `lead_class = 'intent_signal' AND lead_channel = 'click'` |
| 8 | Bookings panel (empty state — Condition 1) | Leads | Filter `lead_channel = 'booking_intent'`. Empty-state text: **"No bookings tracked yet — activates automatically when online booking is reintroduced."** Grey card, no border emphasis |

**Full-width below:**

| # | Widget | Data source | Config |
|---|---|---|---|
| 9 | Conversion rate over time — daily | Sessions + Leads | Multi-line. Overall CR + CR per service_line. GROUP BY service_line dynamic |

### Rules for this page
- Two panels visually distinct via border colour or subtle background.
- Confirmed leads panel: brand accent border (Zap It yellow).
- Intent signals panel: muted grey border.
- Every card explicitly captions the family it counts.

### Screenshot check-in
Big one. Send to Adam. Highlight: "Page 4 has your Conditions 1 + 2 + 3 all implemented. Booking empty state present. Form types dynamic. Intent vs Confirmed separated."

---

## Step 5 — Page 5: Segments (30 min)

**Page name:** `5 · Segments`

### Widgets

| # | Widget | Data source | Config |
|---|---|---|---|
| 1 | Header + date range | — | — |
| 2 | Commercial vs Residential | Leads | 100%-stacked bar. Dim: `service_line`. Filter to residential + commercial values via IN clause OR derived field. Metric: confirmed leads |
| 3 | Termite vs General | Leads | 100%-stacked bar. Derived dim `is_termite = (service_line = 'termite')`. Two bars: General + Termite |
| 4 | Monthly trend | Sessions + Leads | Dual-axis bar (leads) + line (sessions), Year-Month granularity |

### Screenshot check-in
Send to Adam.

---

## Step 6 — Page 6: Search Console (10 min — placeholder)

**Page name:** `6 · Search Console`

Placeholder page until TXT record lands.

### Widgets

| # | Widget | Config |
|---|---|---|
| 1 | Full-page empty state card | Copy: "Search Console — top queries. Activates once the domain TXT record is added at the registrar and Search Console is connected as a data source. Columns: Query · Impressions · Clicks · CTR · Avg position." |

Once TXT lands, add Google Search Console as a 4th data source and replace the placeholder with the top-queries table.

---

## Step 7 — Polish pass (30 min)

Run this checklist across all 6 pages:

- [ ] Consistent typography (Inter throughout, tabular figures on all numbers)
- [ ] Consistent card treatment (1px border `#E5E7EB`, 8px radius, 24px padding)
- [ ] Zap It brand yellow accent used sparingly (KPI values + header logo only)
- [ ] All positive deltas `#059669`, all negative `#DC2626`
- [ ] No stray widgets, no misaligned rows
- [ ] Every chart has a legible legend
- [ ] Every empty state has thoughtful copy (not "No data")
- [ ] Page navigation bar readable, page names correct
- [ ] Report title: "Zap It — Marketing & Conversion Dashboard"

---

## Step 8 — Walk-through + handover (30 min)

1. Book 20-min screenshare with Adam via Slack.
2. Live walk-through top-to-bottom (all 6 pages, ~2 min per page).
3. Demonstrate filter interactions — change date range, show WoW deltas update.
4. Explicitly point out where Conditions 1-4 are implemented so he can verify.
5. Ownership handover: Report menu → Share → Manage access → transfer ownership to Adam's Google account. Apex retains Editor.
6. Post-walk-through: update `docs/MVP_STATUS.md` row 3.4 to ✅ + change log entry.

---

## Recovery plan if a widget fails to render

Common issues on day 1:
- **KPI card shows "No data"** → most likely the date range excludes when events were fired. Change to "Last 30 days" temporarily to sanity-check.
- **`lead_class` field not found** → SQL wasn't re-run after the update. Re-run `sql/002_staging_views.sql`.
- **Custom metric formula error** → Looker Studio's blend requires exact field-name matching. Check spelling.
- **Donut segments not summing to 100%** → filter may exclude NULLs. Add "include NULLs" to the dimension or filter explicitly.

---

## Post-build sanity queries (run against BQ before walk-through)

Note: `stg_leads` aliases the source `event_name` to `lead_event` — always reference `lead_event` when querying `stg_leads` (or `stg_events` still exposes `event_name`).

```sql
-- Confirmed leads by day (should match Page 1 KPI)
-- NOTE: use DATE(lead_timestamp) since stg_leads doesn't project event_date
SELECT DATE(lead_timestamp) AS lead_date, COUNT(*) AS confirmed_leads
FROM `zapit-business-intelligence.zapit_staging.stg_leads`
WHERE lead_class = 'confirmed_lead'
GROUP BY lead_date ORDER BY lead_date DESC LIMIT 7;

-- Intent signals by day (should match Page 4 right panel)
SELECT DATE(lead_timestamp) AS lead_date, COUNT(*) AS intent_signals
FROM `zapit-business-intelligence.zapit_staging.stg_leads`
WHERE lead_class = 'intent_signal'
GROUP BY lead_date ORDER BY lead_date DESC LIMIT 7;

-- Form types breakdown (should match Page 4 confirmed-leads table)
SELECT form_type, COUNT(*) AS count
FROM `zapit-business-intelligence.zapit_staging.stg_leads`
WHERE lead_class = 'confirmed_lead' AND lead_channel = 'form'
GROUP BY form_type ORDER BY count DESC;
```

If these three queries match the dashboard values, we're clean.
