# Looker Studio Dashboard Wireframes

> **SUPERSEDED 2026-07-16.** Engagement letter v2 locks MVP to **one** executive dashboard with 13 sections (per Adam's Message 3 direction). The current mockup is at [`LOOKER_DASHBOARD_MOCKUP_v1.md`](./LOOKER_DASHBOARD_MOCKUP_v1.md) — send that to Adam for pre-approval before build. The three-dashboard split below is deferred (falls under engagement letter §Deferred Items — "multi-dashboard Looker"). Kept here for future reference only.

Three dashboards for MVP. All query `zapit-business-intelligence.zapit_staging` views. Designed for Adam to read without explanation — every chart answers one question.

---

## Dashboard 1 — Conversion Overview

**Question it answers:** "How is the site converting this week vs. last week?"

```
┌────────────────────────────────────────────────────────────────────────┐
│  Conversion Overview                          [Date range: Last 28d ▾] │
├────────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │ Sessions │  │ Form     │  │ Phone    │  │ Conv.    │                │
│  │   1,247  │  │ submits  │  │ clicks   │  │ rate     │                │
│  │  ▲ 12%   │  │    34    │  │   89     │  │  9.8%    │                │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘                │
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Daily conversions (line chart)                                 │   │
│  │  • Form submits (green)                                         │   │
│  │  • Phone clicks (blue)                                          │   │
│  │  • Email clicks (orange)                                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐   │
│  │ Top converting pages (table) │  │ Conversions by hour (heatmap)│   │
│  │ page_path · conv · rate      │  │ Mon–Sun × 0–23h              │   │
│  └──────────────────────────────┘  └──────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

**Data source:** `stg_leads` joined to `stg_sessions`.

---

## Dashboard 2 — Service Line Performance

**Question it answers:** "Which service line is driving the most leads — and which page on that line is doing the work?"

```
┌────────────────────────────────────────────────────────────────────────┐
│  Service Line Performance                     [Date range: Last 28d ▾] │
├────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Leads by service line (stacked bar — last 28d)                 │   │
│  │  residential ████████████████████  42                           │   │
│  │  commercial  ██████████            21                           │   │
│  │  termite     ████████              17                           │   │
│  │  emergency   ████                  8                            │   │
│  │  generic     ██                    5                            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ┌─────────────────────────────────┐  ┌──────────────────────────────┐│
│  │ Conversion rate by service line │  │ Top page per service line   ││
│  │ (donut)                         │  │ (table: service · page · #) ││
│  └─────────────────────────────────┘  └──────────────────────────────┘│
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Lead channel mix by service line (100% stacked bar)             │   │
│  │  residential | form 60% | phone 35% | email 5%                   │   │
│  │  commercial  | form 30% | phone 65% | email 5%                   │   │
│  │  termite     | form 50% | phone 45% | email 5%                   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

**Data source:** `stg_leads` filtered by `service_line` and `lead_channel`.

**Why this matters:** When Adam decides where to spend his marketing budget, this tells him which segment is converting and where.

---

## Dashboard 3 — Source / Medium Attribution

**Question it answers:** "Where are converting visitors coming from?"

```
┌────────────────────────────────────────────────────────────────────────┐
│  Source / Medium Attribution                  [Date range: Last 28d ▾] │
├────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Leads by source/medium (bar — last 28d)                        │   │
│  │  google / organic       ████████████  28                        │   │
│  │  google / cpc           ████████      18                        │   │
│  │  (direct) / (none)      ██████        14                        │   │
│  │  facebook / referral    ████          9                         │   │
│  │  bing / organic         ██            5                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ┌─────────────────────────────────┐  ┌──────────────────────────────┐│
│  │ Conv. rate by source            │  │ Top campaigns                ││
│  │ (table: source · sessions · CR) │  │ (table: campaign · conv · CR)││
│  └─────────────────────────────────┘  └──────────────────────────────┘│
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Device breakdown for conversions (donut)                       │   │
│  │  mobile 64% · desktop 30% · tablet 6%                           │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

**Data source:** `stg_leads` with traffic_source / traffic_medium / traffic_campaign / device_category columns.

---

## Build sequence (Phase 3)

1. Confirm `stg_*` views are returning rows (at least 7 days of GA4 export landed)
2. In Looker Studio: create a new data source per dashboard, connect to BigQuery, select the relevant `stg_*` view
3. Build each dashboard top-down from the wireframes above
4. Share with Adam as Editor; set Apex as Viewer (handover model)
5. Walk Adam through each dashboard during the training call

## What's deliberately NOT in MVP

- No deep cohort analysis (future block)
- No call data (waits for WhatConverts ingest block)
- No CRM deal-stage progression (waits for GHL block)
- No revenue attribution (no spend ingest yet)
- No AI-generated commentary (waits for OpenClaw)
