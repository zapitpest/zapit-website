# 🎯 Zap It Pest Control — Complete Website & Analytics Overview

> **Purpose:** Single reference document covering everything built for Zap It Pest Control Melbourne. Written for Adam and anyone taking over the platform in future.

**Prepared by:** Sharjeel Saleem · Apex AI
**Last updated:** 2026-08-13
**Production domain:** [zapitpestmelbourne.com.au](https://zapitpestmelbourne.com.au)
**GitHub repo:** [github.com/zapitpest/zapit-website](https://github.com/zapitpest/zapit-website)

---

# 🌳 What's Been Built (At a Glance)

```
Zap It Platform
│
├── 🌐 Website (Live)
│   ├── 120 static pages — Next.js 16 + TypeScript + Tailwind CSS
│   ├── 75 suburbs covered, service pages, blog, contact forms
│   ├── Staff photos + brand imagery integrated
│   └── Fast static export — <1s page load globally via CDN
│
├── 📊 Analytics & Tracking (Live)
│   ├── Google Tag Manager (central control panel)
│   ├── Google Analytics 4 (real-time visitor stats)
│   ├── BigQuery Data Warehouse (13 datasets, Sydney region)
│   ├── Meta Pixel (Facebook/Instagram ad tracking)
│   ├── Microsoft Clarity (heatmaps + session recordings)
│   ├── WhatConverts (phone call tracking)
│   └── Google Search Console → BigQuery bulk export (activated 13 Aug 2026)
│
├── 🎯 Dashboards (6 Pages — 4 Approved, 2 Pending)
│   ├── Page 1 — CEO Overview ✅ Approved 22 Jul
│   ├── Page 2 — Marketing Performance ⏳ Pending approval
│   ├── Page 3 — Conversion Detail ⏳ Pending approval
│   ├── Page 4 — Service Lines ✅ Approved 1 Aug
│   ├── Page 5 — Needs Attention ✅ Approved 1 Aug
│   └── Page 6 — SEO Performance 🟡 Activating with Search Console data (48h)
│
└── 📚 Documentation (Complete)
    ├── Handover Runbook — day-to-day operation
    ├── Analytics Architecture — how data flows
    ├── Deployment & Disaster Recovery
    ├── Project Rules — non-negotiable dev rules
    ├── Cloudflare Pages Migration runbook
    ├── DNS Cutover runbook
    ├── AGENTS.md — rules for AI-coding tools
    └── GTM Blueprint — every tag documented
```

---

# 🔧 Tech Stack

| Layer | Tech | Why |
|---|---|---|
| **Framework** | Next.js 16 (App Router, static export) | Fastest static delivery, zero server cost |
| **Language** | TypeScript strict mode | Type safety, catches errors early |
| **Styling** | Tailwind CSS v4 + brand tokens | Consistent design, no CSS bloat |
| **Analytics** | Custom module (`src/lib/analytics/`) | GTM dataLayer + PII hashing at browser edge |
| **Warehouse** | Google BigQuery (australia-southeast1) | Scales infinitely, SQL-queryable |
| **Dashboards** | Google Looker Studio | Free, easy for Adam to use, connects to BigQuery |
| **Hosting (current)** | Netlify (temporary) | Free CDN + auto-deploy from GitHub |
| **Hosting (permanent)** | Cloudflare Pages (migration prepped) | Faster CDN, DDoS protection, free at scale |
| **Repo** | GitHub `zapitpest/zapit-website` | Zap It owned |

---

# 🔑 Live IDs & Credentials

| Tool | ID | Owner |
|---|---|---|
| **GA4 Property** | `G-YRVHNE66GH` | info@zapitpestmelbourne.com.au |
| **GTM Container** | `GTM-PFGV87RB` | info@zapitpestmelbourne.com.au |
| **GTM Account** | `6363173799` | info@zapitpestmelbourne.com.au |
| **GCP Project** | `zapit-business-intelligence` | info@zapitpestmelbourne.com.au (Owner) + sharjeel@meetapex.ai (Editor) |
| **BigQuery Region** | `australia-southeast1` (Sydney) | Locked in |
| **Meta Pixel** | `1088414402938841` | info@zapitpestmelbourne.com.au (via Business Portfolio) |
| **Microsoft Clarity** | `xl7ljoavrz` | info@zapitpestmelbourne.com.au |
| **WhatConverts Profile** | `171358` | info@zapitpestmelbourne.com.au |
| **Search Console Property** | `https://zapitpestmelbourne.com.au/` (verified) | info@zapitpestmelbourne.com.au |
| **BigQuery Search Console dataset** | `searchconsole_raw_search_console` | Active since 13 Aug 2026 |

---

# 🔗 Direct Project Links (Bookmark These)

## Analytics + Tracking

| Tool | Direct Zap It Link |
|---|---|
| Google Analytics 4 | https://analytics.google.com/analytics/web/ |
| Google Tag Manager | https://tagmanager.google.com/#/container/accounts/6363173799 |
| Search Console | https://search.google.com/search-console?resource_id=sc-domain%3Azapitpestmelbourne.com.au |
| Meta Pixel Events Manager | https://business.facebook.com/events_manager2/list/pixel/1088414402938841/overview |
| Microsoft Clarity | https://clarity.microsoft.com/projects/view/xl7ljoavrz/dashboard |
| WhatConverts | https://app.whatconverts.com/ |

## Google Cloud

| Purpose | Direct Zap It Link |
|---|---|
| GCP Project home | https://console.cloud.google.com/home/dashboard?project=zapit-business-intelligence |
| BigQuery Console | https://console.cloud.google.com/bigquery?project=zapit-business-intelligence |
| GCP IAM | https://console.cloud.google.com/iam-admin/iam?project=zapit-business-intelligence |
| Billing | https://console.cloud.google.com/billing?project=zapit-business-intelligence |

## Hosting + Code

| Purpose | Direct Zap It Link |
|---|---|
| GitHub Repository | https://github.com/zapitpest/zapit-website |
| Netlify (temporary host) | https://app.netlify.com |
| Cloudflare Dashboard | https://dash.cloudflare.com |
| Production Site | https://zapitpestmelbourne.com.au |

---

# 📊 BigQuery Warehouse Structure

**Project:** `zapit-business-intelligence` · **Region:** `australia-southeast1`

## 13 Datasets Deployed

| Dataset | Purpose | Status |
|---|---|---|
| `analytics_XXXXXXX` | GA4 daily export (auto-created) | ✅ Live |
| `searchconsole_raw_search_console` | Search Console daily export | ✅ Live (data lands 24-48h from 13 Aug) |
| `zapit_staging` | Cleaned, staged views | ✅ Live |
| `zapit_reporting` | Views powering Looker dashboards | ✅ Live |
| `zapit_reserved_ai` | AI recommendations + learning (Hermes-ready) | ✅ Live |
| `zapit_reserved_crm` | CRM-agnostic contacts/leads/opportunities/revenue | ✅ Live |
| `zapit_reserved_whatconverts` | WhatConverts calls (reserved) | ✅ Schema live |
| `zapit_reserved_meta_ads` | Meta Ads ingest (reserved) | ✅ Schema live |
| `zapit_reserved_google_ads` | Google Ads ingest (reserved) | ✅ Schema live |
| `zapit_reserved_clarity` | Clarity session data (reserved) | ✅ Schema live |
| `zapit_reserved_ghl` | GHL/CRM ingest (reserved) | ✅ Schema live |
| `zapit_reserved_zoom` | Zoom transcripts (reserved) | ✅ Schema live |
| `zapit_reserved_operational` | Operational data (reserved) | ✅ Schema live |

## Key Design Decisions

- **CRM-agnostic:** the `zapit_reserved_crm` schema works with any CRM you connect (HubSpot, GoHighLevel, Jobber, ServiceM8, etc.)
- **AI-ready:** `zapit_reserved_ai` tables enforce `human_approval_status NOT NULL` at the database layer — nothing goes live without your approval
- **9-channel classifier UDF:** auto-detects Google Business Profile, Organic Search, Google Ads, Meta Ads, Organic Social, Direct, Referral, Email/SMS, and AI Referrals (ChatGPT, Perplexity, Claude, Gemini, Copilot)
- **PII hashing at the browser edge:** emails and phone numbers are SHA-256 hashed BEFORE leaving the user's device

---

# 🎯 The 6 Dashboard Pages

## Page 1 — CEO Dashboard (✅ Approved 22 Jul)

**Morning-check page.** High-level KPIs Adam checks daily.

- Sessions, Visitors, Confirmed Leads, Conversion Rate
- Top Lead Sources (which channels are working)
- Service Line Performance (which pest services drive enquiries)
- Attention flags (auto-detect anomalies)

## Page 2 — Marketing Performance (⏳ Pending Approval)

**Which channels bring the most leads.**

- Sessions by Channel
- Confirmed Leads by Channel
- Channel Performance Table (conversion rates per channel)
- Channel Trend Over Time
- AI Referrer detection panel
- Revenue Attribution placeholder (activates when CRM connects)

## Page 3 — Conversion Detail (⏳ Pending Approval)

**Deeper look at every lead.**

- Confirmed vs Intent breakdown
- Form Type breakdown (Contact, Quote, Booking, Callback, Emergency)
- Service Line breakdown (Termite, Rodent, Cockroach, etc.)

## Page 4 — Service Lines (✅ Approved 1 Aug)

**Which pest services drive most business.**

- Confirmed Leads by Service Line
- Service Line trends over time
- Service Line × Form Type cross-tab

## Page 5 — Needs Attention (✅ Approved 1 Aug)

**Auto-flags issues Adam should look at.**

- Attention Flags table (e.g. "residential leads silent for 7 days")
- Statistical anomalies with z-scores

## Page 6 — SEO Performance (🟡 Activating)

**Organic search performance.** Data populates within 48h of Search Console setup on 13 Aug 2026.

- Impressions, clicks, ranking positions, CTR
- AI Referrer traffic breakdown

---

# 🎨 Design System

| Element | Value |
|---|---|
| Brand green | `#1cdc38` |
| Dark ink | `#131a1c` |
| Mid grey | `#414042` |
| Light border | `#c8c8c8` |
| Icons | `lucide-react` |
| Typography | Tailwind default |

All brand colours live in `src/lib/constants.ts` — never hardcoded.

---

# 🚀 Deployment Flow

## Current (Temporary)

```
Developer commits code to GitHub
        ↓
Netlify auto-deploys within ~30 seconds
        ↓
Live at zapitpestmelbourne.netlify.app
```

## Post-Migration (Permanent)

```
Developer commits code to GitHub
        ↓
Cloudflare Pages auto-deploys within ~30 seconds
        ↓
Live at zapitpestmelbourne.com.au (after DNS cutover)
```

---

# 🔐 Security Features

- 6 security headers on every response (X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, HSTS, X-DNS-Prefetch-Control)
- SHA-256 PII hashing at the browser edge (emails and phone numbers hashed BEFORE leaving the device)
- No secrets in codebase (all API tokens live in environment variables)
- HTTPS enforced everywhere
- DDoS protection via CDN

---

# 📈 Redirects & SEO

- **56 verified live redirects** (from old WordPress URLs to new site)
- **306 old suburb URLs** need decision (Option A single catch-all recommended vs Option B regional deep-links)
- **66 old blog URLs** need decision (migrate content or redirect to topic pages)
- **116-URL sitemap.xml** submitted to Search Console
- **10+ Schema.org types** live (LocalBusiness, Organization, ContactPoint, etc.)

---

# ✅ What's Live Today (2026-08-13)

- Website: 120 pages, all live
- Analytics: GTM + GA4 + BigQuery firing end-to-end
- Meta Pixel: dashboard access confirmed
- Microsoft Clarity: capturing heatmaps + session recordings
- WhatConverts: call tracking script installed
- Search Console: verified + BigQuery export active
- 6 dashboard pages: all built, 4 approved
- 30+ documentation files in repo

## Waiting on Adam

1. Pages 2 & 3 approval
2. WhatConverts plan decision (keep current tier or upgrade to Plus)
3. Feature parity redirect direction (Option A or B)
4. Cloudflare Pages vs Netlify hosting decision

---

# 📚 Where to Find More Detail

If you want to go deeper on any specific area, these docs cover it:

| Topic | File |
|---|---|
| Day-to-day operation | [docs/HANDOVER_RUNBOOK.md](/docs/HANDOVER_RUNBOOK.md) |
| Analytics stack deep dive | [docs/ANALYTICS_ARCHITECTURE.md](/docs/ANALYTICS_ARCHITECTURE.md) |
| Deployment + disaster recovery | [docs/DEPLOYMENT_AND_DR.md](/docs/DEPLOYMENT_AND_DR.md) |
| Dev rules for future work | [docs/PROJECT_RULES.md](/docs/PROJECT_RULES.md) |
| Cloudflare Pages migration | [docs/CLOUDFLARE_PAGES_MIGRATION.md](/docs/CLOUDFLARE_PAGES_MIGRATION.md) |
| DNS cutover playbook | [docs/DNS_CUTOVER_RUNBOOK.md](/docs/DNS_CUTOVER_RUNBOOK.md) |
| Every GTM tag documented | [docs/gtm-blueprint.md](/docs/gtm-blueprint.md) |
| Live MVP status | [docs/MVP_STATUS.md](/docs/MVP_STATUS.md) |
| Rules for AI coding tools | [AGENTS.md](/AGENTS.md) |

---

# 👥 Ownership

**Zap It owns everything from day one.**

- All accounts under `info@zapitpestmelbourne.com.au`
- Apex has editor/collaborator access during the 30-day support window
- Access can be revoked with 2 clicks per tool after support window ends
- Zero platform lock-in on code (Next.js, TypeScript, Postgres, BigQuery)

---

# 🎯 What's Next

1. **This week:** Hosting migration to Adam's Netlify or Cloudflare Pages
2. **This week:** Feature parity redirects (Option A recommended)
3. **This week:** DNS cutover to zapitpestmelbourne.com.au
4. **Next week:** Training call — 30-45 min live walkthrough
5. **30 days after training:** Support window closes, MVP fully wrapped

**Post-MVP roadmap** (Adam's 1 Aug vision):

1. CRM connection
2. Square + Lovable + Xero integration (separate project)
3. Customer identity stitching layer
4. Hermes AI recommendations
5. Revenue attribution dashboard evolution
6. Comprehensive SEO + AI-referrer platform

---

**End of overview.**

For questions or drill-down on any section, all supporting documentation lives in the `docs/` folder of the GitHub repo. Contact Sharjeel at sharjeel@meetapex.ai during the support window.
