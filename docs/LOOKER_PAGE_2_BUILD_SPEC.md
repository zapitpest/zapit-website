# Looker Studio Page 2 Build Spec — Marketing Performance

Page 2 of the Zap It CEO Dashboard. Focus: which channels are bringing traffic, which are converting, how they trend over time, and where the identifiable AI referral traffic is coming from.

**Directive alignment:**
- Adam D1 (23 Jul) — Page 1 stays executive-focused, Page 2 holds the channel detail
- Adam D2 (23 Jul) — every widget classifies via the 9-channel taxonomy
- Adam Condition 2 (17 Jul) — dimension-based GROUP BY, no hardcoded rows
- Adam Condition 3 (17 Jul) — confirmed leads and intent signals are separated

## Data sources for this page

All three views live in `zapit-business-intelligence.zapit_reporting`. Add each as a BigQuery data source in the report (Resource → Manage added data sources) and rename inside the report for clarity.

| BigQuery view | Rename inside report to | Powers |
|---|---|---|
| `v_channel_daily` | Channel Daily | KPI strip, bar charts, trend chart |
| `v_channel_conversion_detail` | Channel Conversion Detail | Confirmed vs intent panel, service-line breakdown |
| `v_sessions_with_channel` | Sessions With Channel | AI referrals panel |

If existing Page 1 data sources are already connected, the Sessions With Channel view is new — add it.

## Page-level settings

- Theme: **Simple Classic** (matches Page 1)
- Canvas: 1200 × 900 default (Looker Studio Report layout)
- Report title: keep existing "Zap It — Marketing & Conversion Dashboard"
- Page name: "Page 2 — Marketing Performance"
- Global date range: inherit from Page 1's date range control (Report-level control, not page-level)

## Widget-by-widget build order

Build in this order. Send Adam a screenshot after widgets 4, 6, and 8 so he can course-correct without a big-bang surprise.

### Widget 1 — Page header

- **Type:** Text
- **Position:** Top of page, full width, ~40 px height
- **Title text:** `Marketing Performance`
- **Subtitle text:** `Which channels drive traffic, leads, and quality`
- **Typography:** Roboto, title 24 px semi-bold, subtitle 13 px regular in mid-grey `#414042`
- **Background:** transparent, no border

### Widget 2 — Sub-navigation strip (optional)

- **Type:** Text or page-link buttons
- **Position:** Below header, left-aligned
- **Content:** Small breadcrumb text linking back to Page 1: `← Executive Summary`
- Keeps executive readers oriented across pages

### Widget 3 — Channel KPI strip (4 scorecards side by side)

- **Type:** 4 Scorecards, horizontal row
- **Data source:** Channel Daily (`v_channel_daily`)
- **Card 1 — Total Sessions**
  - Metric: SUM(`sessions`)
  - Comparison: Previous period, show absolute delta
- **Card 2 — Confirmed Leads**
  - Metric: SUM(`form_submits`)
  - Comparison: Previous period
- **Card 3 — Top Channel by Sessions**
  - Metric: MAX(`channel_group`) grouped by sessions descending, top 1
  - Show as: text (channel name), no comparison
  - This is a dimension-based selection — Looker Studio does this via a table with row limit 1
- **Card 4 — Best Converting Channel**
  - Metric: MAX(`confirmed_conversion_rate`) with minimum-session filter of ≥5 sessions (to avoid tiny-sample noise)
  - Show as: text (channel name) + rate as subtitle
- **Style:** identical to Page 1 KPI cards — white background, `#E5E7EB` 1 px border, 8 px radius, 8 px inner padding, 24 px number, 12 px label

### Widget 4 — Sessions by Channel (horizontal bar chart)

- **Type:** Horizontal bar chart
- **Data source:** Channel Daily
- **Dimension:** `channel_group`
- **Metric:** SUM(`sessions`)
- **Sort:** by metric descending
- **Colour:** brand green `#1cdc38` for all bars (single-metric chart, no need for per-channel palette here)
- **Axis:** show data labels at end of each bar for exact counts
- **Empty-state caption below chart:** *"Populates with real customer visits after DNS cutover. Currently showing test traffic."*

**→ Send Adam screenshot #1 after this widget.**

### Widget 5 — Confirmed Leads by Channel (horizontal bar chart)

- **Type:** Horizontal bar chart
- **Data source:** Channel Daily
- **Dimension:** `channel_group`
- **Metric:** SUM(`form_submits`)
- **Sort:** by metric descending
- **Colour:** brand green `#1cdc38`
- **Data labels:** on
- **Below chart:** small note *"Confirmed leads only (form submissions). Phone and email clicks live on Page 3."*

### Widget 6 — Conversion Rate by Channel (sorted table)

- **Type:** Table
- **Data source:** Channel Daily
- **Columns:**
  1. `channel_group` — dimension
  2. SUM(`sessions`) — metric
  3. SUM(`form_submits`) — metric
  4. SUM(`form_submits`) / SUM(`sessions`) as `Conversion Rate` — calculated metric, formatted as percent with 1 decimal
- **Sort:** Conversion Rate descending
- **Filter:** rows with `sessions >= 3` (hide noise)
- **Row banding:** on, subtle
- **Header style:** grey background `#F5F5F5`, bold text

**→ Send Adam screenshot #2 after this widget.**

### Widget 7 — Channel Trend Over Time (stacked area chart)

- **Type:** Stacked area chart
- **Data source:** Channel Daily
- **Dimension X:** `report_date`
- **Dimension breakdown:** `channel_group`
- **Metric:** SUM(`sessions`)
- **Colour palette:** use Looker Studio's Categorical palette (default) — 9 distinct colours mapping to Adam's 9 channels. Keep brand green `#1cdc38` reserved for one specific channel (recommend Organic Search since that's the strategic focus) so it stands out.
- **Legend:** bottom, wrap 3 columns
- **Note below chart:** *"Trend baseline builds over 4+ weeks. Sparse for first weeks post cutover."*

### Widget 8 — Identifiable AI Referrals Panel

- **Type:** Table + scorecard combo, in a 2-column layout
- **Left (scorecard):** SUM(sessions) filtered by `channel_group = 'Identifiable AI Referrals'`
  - Label: "AI Referral Sessions (last 7 days)"
- **Right (table):** columns
  1. `page_referrer_host` — dimension
  2. COUNT(DISTINCT `user_pseudo_id`) — unique visitors
  3. SUM(`form_submits`) — confirmed leads
- **Filter on both:** `channel_group = 'Identifiable AI Referrals'`
- **Sort table by:** unique visitors descending
- **Empty-state caption:** *"AI referrals populate when someone lands from ChatGPT, Perplexity, Claude, Gemini, Copilot, or similar. Zero to trickle expected initially."*

**→ Send Adam screenshot #3 after this widget.**

### Widget 9 — Revenue-attribution placeholder (empty-state)

- **Type:** Empty text card, styled as an inactive panel
- **Content:** *"Revenue by channel (activates when CRM ingest ships)"*
- **Subtitle:** *"Data path ready: contacts → leads → opportunities → outcomes → revenue tables in `zapit_reserved_crm`. Any CRM (custom Lovable/Supabase or GoHighLevel) will populate this widget automatically once ingest is scheduled."*
- **Style:** greyed-out background `#FAFAFA`, dashed border `1px dashed #D1D5DB`, mid-grey text `#6B7280`
- **Why it exists:** Adam's D3 directive is honoured visually — CEO sees the revenue attribution slot is ready and waiting, not forgotten.

## Post-build QA checklist (before sending Adam)

1. Numbers reconcile: Page 2 KPI card "Confirmed Leads" total matches Page 1 KPI "Confirmed Leads" for the same date range.
2. Every widget uses `channel_group` (dimension-based) — zero hardcoded channel names in the chart config.
3. Bar charts sort correctly (descending by metric).
4. Colour palette is consistent — brand green either reserved for one strategic channel OR used for single-metric bars only, not mixed.
5. Empty-state captions present on widgets 4, 7, 8, 9 — no widget looks broken when data is sparse.
6. Date range control on Page 1 correctly filters Page 2 widgets (report-level control).
7. Page 2 does not accidentally include Page 1 widgets, and vice versa.
8. `npm run build` (this repo) still passes — nothing broken code-side by the SQL changes.

## Reference

- Page 1 spec: `docs/LOOKER_DASHBOARD_MOCKUP_v2_BUILD_SPEC.md`
- Adam Conditions 1-4: [[project-zapit-adam-23jul-directives]] + 17 Jul sign-off email
- Underlying SQL: `sql/006_channel_group_udf.sql` + `sql/007_channel_analytics_views.sql`

## Version history

- **2026-07-27** — Initial spec. Every widget architecturally aligned with Adam's 6 directives + 4 sign-off conditions before build starts.
