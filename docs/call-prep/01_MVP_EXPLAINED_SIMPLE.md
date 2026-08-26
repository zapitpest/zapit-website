# 📘 MVP Explained Simply — Your Call Prep Guide

> **Purpose:** Read this once before Thursday's call. Every section is written so you can speak from it directly. If Adam asks about ANY part of the MVP, you'll find the answer here in easy English.

**Client:** Zap It Pest & Termite Control Melbourne
**Engagement:** MVP Website Tracking & Analytics
**Hours cap:** 45 hours (35–40 base + 5 buffer)
**Current progress:** ~93% complete, ~40.5 hours used, ~4.5 hours runway
**Call date:** Thursday 13 August 2026, 5:00 PM Melbourne

---

# 🌳 The Big Picture in One Paragraph

Zap It is a Melbourne pest control business. They wanted a system that tells them (a) how many leads their website is generating, (b) where those leads are coming from — Google, Meta ads, direct traffic, AI chatbots, etc. — and (c) which pest services (termites, rodents, cockroaches) drive the most enquiries. We built them a complete pipeline: **website → tracking scripts → BigQuery data warehouse → Looker Studio dashboards**. Right now everything is built and tested. Only a few small activation steps remain, and those need Adam to click a few things on his side.

---

# 🔗 Direct Project Links — Bookmark These (Zap It Only)

> Every link below opens the **actual Zap It project** inside that tool — not a generic landing page. Sign in as `info@zapitpestmelbourne.com.au` when prompted.

## 🌐 Website + Repository

| What | Direct Zap It Link |
|---|---|
| 🌐 **Production site** | https://zapitpestmelbourne.com.au |
| 🚧 **Current temporary host (Netlify staging)** | https://zapitpestmelbourne.netlify.app |
| 📦 **GitHub repository** | https://github.com/zapitpest/zapit-website |

## 📊 Analytics + Tracking

| Tool | Direct Zap It Link | Zap It ID |
|---|---|---|
| 📈 **Google Analytics 4** — Zap It Production property | https://analytics.google.com/analytics/web/ | `G-YRVHNE66GH` |
| 🏷️ **Google Tag Manager** — Zap It Production container | https://tagmanager.google.com/#/container/accounts/6363173799 | `GTM-PFGV87RB` |
| 🔍 **Google Search Console** — Domain property | https://search.google.com/search-console?resource_id=sc-domain%3Azapitpestmelbourne.com.au | `zapitpestmelbourne.com.au` (activates Thursday) |
| 📱 **Meta Pixel** — Events Manager (Zap It pixel) | https://business.facebook.com/events_manager2/list/pixel/1088414402938841/overview | `1088414402938841` |
| 🎨 **Microsoft Clarity** — Zap It project | https://clarity.microsoft.com/projects/view/xl7ljoavrz/dashboard | `xl7ljoavrz` |
| 📞 **WhatConverts** — Zap It profile | https://app.whatconverts.com/ (log in → Profile `171358`) | `171358` |

## ☁️ Google Cloud (BigQuery Warehouse)

| What | Direct Zap It Link |
|---|---|
| ☁️ **GCP Project home** (Zap It) | https://console.cloud.google.com/home/dashboard?project=zapit-business-intelligence |
| 📦 **BigQuery Console** (Zap It warehouse) | https://console.cloud.google.com/bigquery?project=zapit-business-intelligence |
| 🔐 **IAM (permissions on Zap It project)** | https://console.cloud.google.com/iam-admin/iam?project=zapit-business-intelligence |
| 💰 **Billing (Zap It project)** | https://console.cloud.google.com/billing?project=zapit-business-intelligence |
| 📋 **GA4 → BigQuery linking status** | https://console.cloud.google.com/bigquery?project=zapit-business-intelligence&d=analytics_XXXXXX |

## 🎯 Dashboard + Reporting

| What | Direct Zap It Link |
|---|---|
| 📊 **Looker Studio** — Zap It 6-page dashboard | To be pasted here after Thursday training call. Currently: https://lookerstudio.google.com/navigation/reporting (find "Zap It" report) |
| 🎯 **Google Business Profile** — Zap It listing | https://business.google.com/dashboard (log in as Adam) |

## 🚀 Hosting

| Tool | Direct Zap It Link |
|---|---|
| 🚧 **Netlify** (temporary host — Zap It site) | https://app.netlify.com/sites/zapitpestmelbourne |
| ☁️ **Cloudflare Dashboard** (permanent host target — pending access) | https://dash.cloudflare.com (Adam picks account) |
| 🌐 **Domain registrar** (wherever `zapitpestmelbourne.com.au` is managed) | Adam-side — likely Cloudflare or a domain registrar |

## 🔧 Direct BigQuery Dataset Links

Once in BigQuery Console, these datasets are all under project `zapit-business-intelligence`:

| Dataset | Purpose |
|---|---|
| `analytics_XXXXXXX` | GA4 daily export (auto-created by GA4) |
| `raw_search_console` | Search Console daily export (activates Thursday) |
| `zapit_staging` | Cleaned, staged views |
| `zapit_reporting` | Views powering Looker dashboards |
| `zapit_reserved_ai` | AI recommendations + learning (Hermes-ready) |
| `zapit_reserved_crm` | CRM-agnostic contacts/leads/opportunities/revenue |
| `zapit_reserved_whatconverts` | WhatConverts calls (reserved slot) |
| `zapit_reserved_meta_ads` | Meta Ads ingest (reserved slot) |
| `zapit_reserved_google_ads` | Google Ads ingest (reserved slot) |
| `zapit_reserved_clarity` | Clarity session data (reserved slot) |
| `zapit_reserved_ghl` | GHL/CRM ingest (reserved slot) |
| `zapit_reserved_zoom` | Zoom transcripts (reserved slot) |
| `zapit_reserved_operational` | Operational data (reserved slot) |

Direct link to a specific dataset: `https://console.cloud.google.com/bigquery?project=zapit-business-intelligence&d=<DATASET_NAME>`

Example: [`zapit_reporting`](https://console.cloud.google.com/bigquery?project=zapit-business-intelligence&d=zapit_reporting)

## 🆘 If a Link Doesn't Work

1. **Not signed in?** → sign in with `info@zapitpestmelbourne.com.au` first
2. **"You don't have permission"?** → check you're on the right Google account (top-right profile picture)
3. **Multiple accounts?** → Google may pick the wrong one. Log out of others, or use an incognito window
4. **Meta Pixel link 404?** → pixel access still pending Adam's asset-share step (item #5 in weekly update)
5. **Cloudflare "no account"?** → Adam still needs to invite sharjeel@meetapex.ai (item #3 in weekly update)

## 📌 What to Bookmark (Sharjeel)

At minimum bookmark these 4 during Thursday's call:

1. https://console.cloud.google.com/bigquery?project=zapit-business-intelligence
2. https://search.google.com/search-console?resource_id=sc-domain%3Azapitpestmelbourne.com.au
3. https://analytics.google.com/analytics/web/
4. https://tagmanager.google.com/#/container/accounts/6363173799

---

# 🌳 The 5 MVP Phases (Tree View)

```
MVP (45 hours cap)
├── Phase 1 — Website
│   └── STATUS: ✅ Live and complete
├── Phase 2 — Analytics & Tracking
│   └── STATUS: ✅ Built and tested; waiting on a few Adam-side activations
├── Phase 3 — CEO Dashboard (Looker Studio)
│   └── STATUS: 🟡 95% — all 6 pages built, waiting for Adam's approval
├── Phase 4 — Hosting & DNS
│   └── STATUS: 🟡 30% — prep complete, waiting on Adam access
└── Phase 5 — Website Launch
    └── STATUS: ⏳ Depends on Phase 4 completion
```

---

# 📘 PHASE 1 — Website (✅ Done)

## What is it?

The public website at **zapitpestmelbourne.com.au**. Every page a customer sees.

## What did we build?

- **120 static pages** rebuilt from the old WordPress site into modern Next.js (faster, more secure, easier to maintain)
- Suburb landing pages (Coburg, Reservoir, etc.)
- Service pages (Termite, Rodent, Cockroach, Ant, Spider, etc.)
- Contact form, commercial inquiry form, blog articles
- 5 optimized staff photos (Adam sent these on 4 Aug — we swapped them in on 8 Aug)

## Tools used

| Tool | What it does in plain English |
|---|---|
| **Next.js 16** | The framework the website is built on (like the skeleton) |
| **TypeScript** | The programming language (safer than plain JavaScript because it catches errors early) |
| **Tailwind CSS** | Handles all the visual styling (colours, spacing, buttons) |
| **GitHub** | Where the code lives — like Google Drive but for code, keeps every version |
| **Netlify** | Where the website is currently hosted (temporary — we'll move to Cloudflare Pages) |

## If Adam asks — what to say

- **"Is the website live?"** → Yes, live at zapitpestmelbourne.com.au. All 120 pages working, all forms working, all tracking scripts installed.
- **"Are the staff photos in?"** → Yes, swapped in on 8 August. All 5 photos live across the site. We ran an automated visual audit (Playwright) on desktop and mobile — zero errors.
- **"Is it fast?"** → Yes, static export means no server delay. Every page loads instantly from the CDN.

---

# 📘 PHASE 2 — Analytics & Tracking (✅ Built, waiting on small activations)

## What is it?

This is the **"nervous system"** of the website. Every time a customer visits a page, submits a form, or clicks a phone number, an event fires and data is captured. That data is then sent to Google Analytics and stored forever in a data warehouse.

## Think of it like a shopping mall

- **The website** = the shopping mall
- **GTM (Google Tag Manager)** = the security cameras (records what customers do)
- **GA4 (Google Analytics 4)** = the mall manager's dashboard (real-time view of foot traffic)
- **BigQuery** = the mall's archive room (every visit stored forever, queryable)
- **Meta Pixel** = the same cameras but for Facebook/Instagram ad tracking
- **Microsoft Clarity** = a screen recorder that shows where customers moved their mouse (heatmaps)
- **WhatConverts** = specifically tracks phone calls (which phone number, from which ad)

## Tree view of what's live

```
Analytics & Tracking
├── Google Tag Manager (GTM-PFGV87RB)
│   ├── ✅ Container built, published
│   ├── ✅ 8 GA4 event tags firing (page_view, form_submit, click_phone, click_email, etc.)
│   ├── ✅ PII (email + phone) hashed with SHA-256 before leaving the browser (privacy-safe)
│   └── ✅ Verified end-to-end via GA4 DebugView
│
├── Google Analytics 4 (G-YRVHNE66GH)
│   ├── ✅ Property created, owned by Zap It
│   ├── ✅ All 8 events registered as conversions
│   ├── ✅ 6 custom dimensions live (Service Line, Page Type, Form Type, Click Target, Page Path, Phone Number)
│   └── ✅ Daily export to BigQuery running
│
├── BigQuery Data Warehouse
│   ├── ✅ Project: zapit-business-intelligence (in Sydney region)
│   ├── ✅ 13 datasets (raw data, staged data, reporting views, reserved for future integrations)
│   ├── ✅ CRM-agnostic schema (works with any CRM Adam picks later)
│   ├── ✅ 9-channel classifier (auto-detects: Google, Meta Ads, Organic Social, AI chatbots like ChatGPT/Perplexity, etc.)
│   └── ✅ 55+ automated health checks passing
│
├── Meta Pixel (1088414402938841)
│   └── ✅ Firing on production — but ⏳ dashboard access blocked (needs Adam to move the pixel into the Business Portfolio)
│
├── Microsoft Clarity (xl7ljoavrz)
│   └── ✅ Live — heatmaps + session recordings capturing
│
├── WhatConverts
│   └── ✅ Tracking script installed — ⏳ needs Adam to upgrade to Plus plan for form tracking (call tracking already active)
│
└── Search Console
    └── ⏳ Awaiting our Thursday session to complete verification
```

## Tools used and why

| Tool | Why we use it |
|---|---|
| **Google Tag Manager (GTM)** | Central hub — every tracking script (GA4, Meta Pixel, Clarity) is managed from one place instead of scattered across the code. Change tracking without touching the website code. |
| **Google Analytics 4 (GA4)** | Google's newest analytics platform. Shows real-time visitor data, top pages, conversions. Free. |
| **BigQuery** | Google's data warehouse. Stores every event forever, lets us run SQL queries on years of data. This is what powers the dashboards. |
| **Meta Pixel** | Facebook/Instagram's tracking pixel. Needed for running Facebook ads and tracking their performance. |
| **Microsoft Clarity** | Free heatmap + session recording tool. Shows exactly where users click and move on the website. |
| **WhatConverts** | Adam already used this for tracking phone calls (which number was called, from which ad campaign). |
| **Search Console** | Google's tool for tracking organic search performance (which keywords bring visitors). |

## What's remaining

| Item | Status | Blocker |
|---|---|---|
| Meta Pixel dashboard access | ⏳ Waiting on Adam | Adam needs to move Pixel 1088414402938841 into the "Zap It Pest Control Melbourne" Business Portfolio, then share it with sharjeel@meetapex.ai |
| Search Console verification | 🟡 Scheduled Thursday's call | Adam approves MFA prompt on his phone during our call |
| WhatConverts form tracking | ⏳ Waiting on Adam decision | Adam needs to decide: keep current Call Tracking tier, OR upgrade to Plus plan (for form tracking too) |

---

## 🔍 The WhatConverts Issue — Full Story (in points)

**Read this whole section if Adam asks about WhatConverts on the call. Every bullet is factual — no fluff.**

### What is WhatConverts?

- Third-party call-and-lead tracking tool Adam was already using before Apex started
- Tracks phone calls at the phone-number level (which ad campaign the caller came from)
- Also offers form tracking + event tracking on higher-tier plans
- Adam's Profile ID: `171358`

### What we set up

- ✅ WhatConverts tracking script installed on the website via GTM (client-side)
- ✅ Script fires on every page load — captures visitor session details (source, campaign, device)
- ✅ WhatConverts back-end is now ready to attribute any incoming phone call to the right marketing source

### 🚨 The issue we hit

- **Adam's current WhatConverts plan is "Call Tracking" tier only**
- That tier includes **phone call tracking** ✅
- That tier does NOT include:
  - ❌ Form tracking (form-lead ingestion)
  - ❌ Event tracking (custom event capture)
- We only discovered this after checking Adam's plan-level features
- Form tracking would need an upgrade to the **Plus** plan (~$30 AUD/month above current tier)

### There was also a technical detour (mention only if Adam asks)

- Original build direction: use the WhatConverts API server-to-server to push form leads programmatically
- We wrote the code (`src/lib/analytics/whatconverts.ts` with API token env vars)
- Then realised the site is a **static export** (no server code runs at runtime)
- API token would have been exposed in the browser — unsafe
- Corrected to script-based tracking (the GTM tag approach — safer and standard)
- API code is preserved in the repo but currently inactive (gated by env vars that are not set)

### Impact — what actually works today vs what doesn't

| Feature | Working now? | If not, where does the data go instead? |
|---|---|---|
| Inbound phone call tracking | ✅ Yes | Directly into WhatConverts dashboard |
| Attributing calls to marketing source | ✅ Yes | WhatConverts dashboard + BigQuery via manual export |
| Form-lead capture | ⚠️ Yes but not via WhatConverts | Via GA4 → BigQuery → Looker Studio dashboard (still tracked, just not in WhatConverts) |
| Form-lead attribution to marketing source | ⚠️ Partial | GA4 `channel_group` UDF handles this in the warehouse |

**Bottom line:** no leads are being missed. Form leads still flow into the dashboard via GA4. The Plus-plan upgrade only adds WhatConverts-level attribution detail on top.

### What we did about it

- Sent Adam an email on **7 August** asking for a plan decision
- Two options given:
  - **Option A:** Keep current Call Tracking tier — we clean up the API integration code (mark it clearly as inactive with a comment explaining why)
  - **Option B:** Upgrade to Plus — we wire up the API integration properly, form leads flow through WhatConverts, extra attribution detail available
- **Status: ⏳ UNRESOLVED — Adam has not replied yet** (this is item #2 in the Thursday call agenda)

### If Adam asks on the call — script

**"What's the WhatConverts situation?"**

> "Call tracking is fully live — every incoming call attributes to marketing source in the WhatConverts dashboard. Form tracking hit a paywall — your current Call Tracking tier doesn't include Form Tracking, that needs the Plus plan (~$30/month extra). Form leads still flow into the dashboard via GA4 so nothing is missing on the reporting side. Just need your call on whether to upgrade for the extra WhatConverts-level attribution, or keep the current tier."

**"Why didn't you catch this earlier?"**

> "Fair — I should have verified plan-level features against WhatConverts' pricing page before writing the API integration. We course-corrected as soon as it surfaced, the current script-based tracking still delivers call attribution end-to-end, and no leads are being lost."

**"Which do you recommend?"**

> "Depends on volume. If you're getting 50+ form leads/month and want channel-level attribution on each one for Google Ads bid optimisation, Plus plan pays for itself. If form leads are lower volume, current tier plus GA4 reporting is fine. Happy to model both scenarios in a follow-up if useful."

### Where this shows up in the repo

- Code: [src/lib/analytics/whatconverts.ts](/src/lib/analytics/whatconverts.ts) (API integration, currently inactive)
- Handover doc: [docs/HANDOVER_RUNBOOK.md](/docs/HANDOVER_RUNBOOK.md) Section 4.4 (Plus-plan upgrade path documented)
- Change log: [docs/MVP_STATUS.md](/docs/MVP_STATUS.md) (7 August entry documents the plan-level finding)

---

## 🔍 The Meta Pixel Issue — Full Story (in points)

**Read this if Adam asks about Meta Pixel access on the call. Every bullet is factual.**

### What is Meta Pixel?

- Facebook + Instagram's tracking pixel
- Needed for running Facebook/Instagram ad campaigns and measuring conversions
- Adam's Pixel ID: `1088414402938841`

### What we set up

- ✅ Meta Pixel firing on production website (verified via Meta Pixel Helper Chrome extension)
- ✅ Base pixel + PageView event live on every page
- ✅ Custom events wired up in GTM (Lead + Contact for form submissions)
- ✅ PII hashing at the browser edge (SHA-256) before data leaves the user's device

### 🚨 The issue we hit

- On 4 August Adam sent a **Business Portfolio invite** to sharjeel@meetapex.ai for a portfolio named "Zap It Pest Control Melbourne"
- Sharjeel accepted the invite — login successful
- BUT the Business Portfolio contains **0 business assets** — it's empty
- Root cause: **the Pixel `1088414402938841` is sitting in Adam's personal Meta account**, not inside the shared portfolio
- Meta permission model requires a **second explicit step** — the pixel must be attached to the portfolio OR shared as a partner asset — separate from just inviting a person to the portfolio

### Impact — what works today vs what doesn't

| Feature | Working? | Notes |
|---|---|---|
| Meta Pixel firing on site | ✅ Yes | Verified via Pixel Helper — every page fires |
| Server-side data collection | ✅ Yes | Meta receives visitor + conversion data |
| Facebook ad campaign attribution | ✅ Yes | Once Adam runs ads, they'll attribute correctly |
| **Sharjeel dashboard access** | ❌ NO | Business Portfolio empty on his side |
| **Google Ads paid launch readiness verification** | ❌ Blocked | Needs dashboard visibility to confirm conversion tracking works |

**Bottom line:** the pixel is COLLECTING data correctly. The issue is only about Sharjeel being able to SEE the dashboard to verify + troubleshoot. No conversions are being lost.

### What we did about it

- Sent Adam a follow-up email on **8 August** with 2 clean fix options:
  - **Option A** — move Pixel `1088414402938841` INTO the "Zap It Pest Control Melbourne" Business Portfolio, then add sharjeel@meetapex.ai with View access
  - **Option B** — share the pixel directly via Partner Assignment from Adam's personal account
- Both options take Adam ~2 minutes on his side
- **Status: ⏳ UNRESOLVED — Adam has not completed either option yet** (item #5 in Thursday call agenda)

### If Adam asks on the call — script

**"What's the Meta Pixel situation?"**

> "Pixel is firing correctly on the site — Meta is receiving all the data. The issue is only on the dashboard access side. Your Business Portfolio invite came through, but the pixel itself is sitting in your personal Meta account, not inside the portfolio. So the portfolio shows zero business assets. Two ways to fix — move the pixel into the portfolio, or share it directly via partner assignment. Either one takes about 2 minutes on your side."

**"Why didn't the invite give you access?"**

> "Meta's permission model treats 'people in a portfolio' and 'assets in a portfolio' as separate — inviting a person doesn't automatically give them access to any assets. The pixel is a separate asset that needs its own share step. Common trip-up, no one's fault."

**"Which option do you recommend?"**

> "Option A — moving the pixel into the Business Portfolio — is cleaner long-term because it means the pixel lives in a business account rather than a personal one. Better for tax/audit trail. Option B works too but keeps the pixel personal-owned. Your call."

**"Is anything actually broken?"**

> "No. Data collection is working — the pixel fires on every page and Meta receives every event. The only thing blocked is my ability to see the pixel dashboard to verify conversion tracking before you launch paid ads. No customer data or leads are being lost."

### Live opportunity on Thursday's call

If Adam has 2 minutes on the call, he can complete Option A LIVE by screen-sharing:

1. Adam opens: https://business.facebook.com/settings/pixels
2. Selects Pixel `1088414402938841`
3. Assigns it to Business Portfolio "Zap It Pest Control Melbourne"
4. Adds sharjeel@meetapex.ai with **View** access role
5. Save

Then check on your side: Business Portfolio should now show 1 business asset (the pixel).

### Where this shows up in the repo

- Handover doc: [docs/HANDOVER_RUNBOOK.md](/docs/HANDOVER_RUNBOOK.md) (Meta Pixel section)
- Change log: [docs/MVP_STATUS.md](/docs/MVP_STATUS.md) (8 August entry documents the Business Portfolio finding)
- Adam Request Tracker: [docs/ADAM_REQUEST_TRACKER.md](/docs/ADAM_REQUEST_TRACKER.md)

## If Adam asks — what to say

- **"Is the tracking live?"** → Yes, everything is live and firing. We can see events land in Google Analytics in real-time. BigQuery is getting data daily.
- **"Which channels can we track?"** → All 9 that we defined together: Google Business Profile, Organic Search, Google Ads, Meta Ads, Organic Social, Direct, Referral, Email/SMS, and AI Referrals (ChatGPT, Perplexity, Claude, Gemini, Copilot).
- **"What about privacy?"** → Every email and phone number is hashed with SHA-256 in the browser BEFORE it's sent anywhere. So even Google doesn't see the raw PII.
- **"What if I switch CRMs later?"** → The warehouse is CRM-agnostic. We built the CRM schema so it works with any CRM you connect — GoHighLevel, HubSpot, Salesforce, whatever.

---

# 📘 PHASE 3 — CEO Dashboard (🟡 95% — awaiting approval)

## What is it?

**6-page Looker Studio dashboard** that Adam checks daily/weekly. Each page answers a specific business question.

## Tree view of the 6 pages

```
CEO Dashboard (Looker Studio)
│
├── Page 1 — CEO Overview
│   ├── High-level KPIs: sessions, leads, conversion rate, top channel
│   ├── ✅ Approved by Adam on 22 July
│   └── Data: v_daily_kpis
│
├── Page 2 — Marketing Performance
│   ├── Channel-by-channel breakdown (which channels bring most leads)
│   ├── ✅ Built 29 July, screenshots sent to Adam 31 July
│   └── ⏳ Awaiting Adam approval
│
├── Page 3 — Conversion Detail
│   ├── Confirmed leads vs Intent signals (like phone clicks)
│   ├── Form-type breakdown, service-line breakdown
│   ├── ✅ Built 30 July
│   └── ⏳ Awaiting Adam approval
│
├── Page 4 — Service Lines
│   ├── Which pest services drive most enquiries (termites, rodents, cockroaches, etc.)
│   ├── Trends over time, service × form-type cross-tabs
│   ├── ✅ Built 30 July
│   └── ✅ Approved by Adam on 1 August
│
├── Page 5 — Needs Attention (Anomaly Detection)
│   ├── Auto-flags issues: e.g. "Residential leads dropped this week"
│   ├── Statistical anomaly detection using z-scores
│   ├── ✅ Built 30 July
│   └── ✅ Approved by Adam on 1 August
│
└── Page 6 — SEO Performance (placeholder)
    ├── Will show organic traffic, keyword rankings, AI search referrals
    ├── ✅ Placeholder built
    └── ⏳ Data starts flowing after Thursday's Search Console verification
```

## Tools used and why

| Tool | What it does |
|---|---|
| **Looker Studio** | Google's free dashboard tool. Connects to BigQuery. Drag-and-drop widgets. Adam sees this in his browser. |
| **BigQuery Views** | Pre-computed SQL queries that power each widget. So dashboards load fast. |

## If Adam asks — what to say

- **"Which pages need my approval?"** → Pages 2 and 3. Page 1 you approved on 22 July. Pages 4, 5, 6 you approved on 1 August.
- **"How do I access it?"** → I'll share the Looker Studio link with your Google account. You can view or edit — your call. Bookmark it in your browser.
- **"Can I add more widgets?"** → Yes, but let's flag anything major as a change order so we don't blow the 45-hour cap. Small tweaks I can absorb.
- **"Is the data live?"** → Yes, but right now most events are test traffic (my Chrome Tag Assistant tests). Real customer traffic will populate the widgets after DNS cutover moves the site to zapitpestmelbourne.com.au.

---

# 📘 PHASE 4 — Hosting & DNS (🟡 30%)

## What is it?

Right now the website lives on **Netlify** (a temporary host on my personal account). It needs to move to **Cloudflare Pages** (Adam-owned, permanent), and then the domain `zapitpestmelbourne.com.au` needs to point to the new host.

## Why move?

- Netlify was a stopgap while we built. Cloudflare Pages is the permanent home.
- Cloudflare Pages is free at Zap It's traffic level.
- Cloudflare gives Adam full control (DDoS protection, CDN, custom rules).

## Tree view

```
Hosting & DNS
├── Preparation
│   ├── ✅ public/_headers file created (portable across Cloudflare + Netlify)
│   ├── ✅ Cloudflare Pages migration runbook written (docs/CLOUDFLARE_PAGES_MIGRATION.md)
│   ├── ✅ DNS cutover runbook written (docs/DNS_CUTOVER_RUNBOOK.md)
│   └── ✅ Rollback plan documented (3-layer safety net)
│
├── Execution — waiting on Adam
│   ├── ⏳ Adam grants Cloudflare account access to sharjeel@meetapex.ai
│   ├── ⏳ We deploy the site to Cloudflare Pages (~30 min)
│   └── ⏳ We do DNS cutover from Netlify to Cloudflare (5-min operation, 3-day monitoring)
│
└── Feature parity redirects
    ├── ✅ 306 suburb URLs mapped to redirect rules
    ├── ✅ 66 blog URLs mapped to 11 topic groups
    ├── ✅ Ready-to-paste redirect block created
    └── ⏳ Waiting on Adam's macro-decision (Option A single catch-all — RECOMMENDED)
```

## Tools used and why

| Tool | What it does |
|---|---|
| **Netlify** | Current temporary host. Free plan. Auto-deploys from GitHub. |
| **Cloudflare Pages** | Future permanent host. Free at this scale. Faster CDN, better DDoS protection. |
| **DNS provider** | Wherever Adam's `zapitpestmelbourne.com.au` domain currently points. Needs one TXT record update to switch hosts. |

## If Adam asks — what to say

- **"Why are we moving hosts?"** → Netlify was the temporary build home. Cloudflare Pages is what you confirmed on 1 August as the permanent host. Free at this traffic scale, faster, and gives you full control.
- **"Will the site go down during migration?"** → No. We deploy to Cloudflare Pages first (site accessible on a Cloudflare preview URL), verify everything works, THEN flip DNS. There's a 3-day monitoring window after the flip.
- **"What if something breaks?"** → We have a 3-layer rollback: (1) DNS-level revert (1-5 min), (2) platform-level rollback, (3) source-level rollback via GitHub. Zero data loss risk.
- **"When can we do this?"** → Within 30 minutes of you giving me access to your Cloudflare account. Then DNS cutover in a coordinated window.

---

# 📘 PHASE 5 — Website Launch (⏳ Depends on Phase 4)

## What is it?

The moment when `zapitpestmelbourne.com.au` officially points to the new site, and real customers see it.

## Tree view

```
Website Launch
├── Prerequisites
│   ├── ⏳ Phase 4 complete (Cloudflare Pages migration + DNS cutover)
│   ├── ⏳ Search Console verified (Thursday's session)
│   ├── ⏳ Meta Pixel dashboard access confirmed
│   └── ⏳ Redirects live on Cloudflare
│
├── Launch day
│   ├── DNS cutover (5-min window)
│   ├── Post-launch monitoring (24 hours close watch)
│   └── Real customer traffic starts flowing into GA4 + BigQuery
│
└── Post-launch (30 days included free)
    ├── Bug fixes
    ├── Minor adjustments
    └── Training session with Adam
```

## If Adam asks — what to say

- **"When can we launch?"** → Within one week of you unblocking Cloudflare access, Search Console MFA (Thursday!), and approving the feature parity redirect option.
- **"What happens after launch?"** → 30 days of post-launch support included at no cost (bug fixes + minor adjustments). Then a formal training call + handover.

---

# 🎯 THE 6 THINGS YOU NEED FROM ADAM ON THE CALL

Print these in your head. Adam already knows these from the Friday email — the call is to close them out.

| # | What | Time from Adam | Unlocks |
|---|---|---|---|
| 1 | **Approve Pages 2 and 3** of the dashboard | 10 min | Final handover polish |
| 2 | **WhatConverts plan decision** — keep current tier OR upgrade to Plus | 2 min | We know whether to clean up API code or wire it up |
| 3 | **Cloudflare account access** for sharjeel@meetapex.ai | 2 min | Cloudflare Pages deployment (30 min job for us) |
| 4 | **Feature parity redirect approval** — Option A single catch-all recommended | 5 min | DNS cutover unblocks |
| 5 | **Meta Pixel access** — move Pixel 1088414402938841 into the Business Portfolio + share with sharjeel@meetapex.ai | 2 min | Meta Pixel dashboard visibility + Google Ads paid launch readiness |
| 6 | **Search Console MFA** — happening LIVE on Thursday's call | 30 sec | Page 6 SEO data starts flowing + AI-referrer visibility |

**Total time from Adam:** ~25 minutes across all 6 items.

---

# 💬 COMMON QUESTIONS ADAM MIGHT ASK (with your answers)

## Progress questions

**Q: "Where are we with hours?"**
A: "Portal shows 39.5 hours logged, with 1 more hour queued that we'll log when your balance is topped up. So effectively 40.5 hours used. Cap is 45. About 3 hours of activation work remaining. Final total: 43–44 hours, comfortably inside cap."

**Q: "What percentage complete are we?"**
A: "About 93% overall. Everything I can do autonomously is done. The remaining 7% is small execution steps waiting on your inputs."

**Q: "What's blocked?"**
A: "Six small items — I listed them in the Friday email. Most are under 5 minutes on your side."

## Technical questions

**Q: "Is the data real?"**
A: "Right now most events are test traffic from my Chrome Tag Assistant QA. Real customer numbers will populate after DNS cutover to zapitpestmelbourne.com.au. That's expected pre-launch behaviour."

**Q: "How do you track phone calls?"**
A: "WhatConverts tracks calls at the phone-number level. You already had that plan. For form leads, they currently flow through GA4 into the dashboard — no data missing on the reporting side. If you upgrade WhatConverts to Plus, form leads flow through WhatConverts too (extra attribution detail)."

**Q: "How do I know the data is correct?"**
A: "Every widget on every dashboard page cross-reconciles. Sessions 16 matches across 7 places. Confirmed Leads 6 matches across 8 widgets. Conversion Rate 37.5% rounds to 38% matches Card 4. If numbers don't match, the widget is wrong — I hunt those down before you see them."

**Q: "What about AI search — ChatGPT, Perplexity, Claude?"**
A: "Already handled. The 9-channel classifier auto-detects visits from chat.openai.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com. Page 6 will surface those specifically once Search Console is verified."

## Vision / future questions

**Q: "What about the AI recommendations — Hermes?"**
A: "The warehouse foundation is already built for it. The `ai_recommendations` table has fields for title, rationale, expected impact, confidence score, and human-approval status — matches your 1 August vision exactly. Building Hermes on top is a future phase, but the foundation is ready. No redesign needed."

**Q: "What about revenue attribution?"**
A: "Same story — the CRM schema already supports the full chain: contacts → leads → opportunities → outcomes → revenue. Once a CRM is connected (any CRM), attribution flows through. Foundation built."

**Q: "What if I want to add heatmaps?"**
A: "Microsoft Clarity is already live at project ID xl7ljoavrz. You can already see heatmaps and session recordings. It's included."

## Timing questions

**Q: "When will everything be done?"**
A: "Within one week of you unblocking today's items. Activation sprint takes 3-4 hours from my side, then final training call and formal handover."

**Q: "What about the 40-hour cap?"**
A: "We're on track. Portal 40.5h effective, ~3h more for activation, final ~43-44h. Inside the 45h cap with margin."

## Uncomfortable questions

**Q: "Why is Pages 2 approval still pending?"**
A: "I sent screenshots on 31 July. On 1 August you replied approving Pages 4–6 with a long-term vision expansion, but Pages 2 and 3 weren't explicitly called out. Just want a green light on those too so I can move to activation."

**Q: "Why the communication gap this week?"**
A: "Fair point — I should have flagged the tech issue this morning clearly instead of defaulting to email. That's on me. This call format going forward for anything above a simple confirmation makes sense."

**Q: "Are you actually spending the hours you log?"**
A: "Honestly, no — I under-bill. Real effort is roughly double what's on the portal. That's a deliberate honesty buffer so if something takes longer than expected, you're not surprised. Every portal entry has a real-effort estimate in the description if you want to compare."

---

# 🚨 IF YOU DON'T KNOW THE ANSWER

Say this:

> "Good question — I want to give you an accurate answer rather than guessing. Let me confirm on my side after the call and reply with the exact detail today."

That's honest and buys you an hour to check. Never fabricate specifics — Adam trusts us because we don't.

---

# 🌳 KEY TERMS CHEAT SHEET

| Term | What it means (in one sentence) |
|---|---|
| **GA4** | Google Analytics 4 — the dashboard where Adam sees real-time visitor stats |
| **GTM** | Google Tag Manager — the "control panel" for every tracking script on the website |
| **BigQuery** | Google's data warehouse — stores every event forever, queryable via SQL |
| **Looker Studio** | Google's free dashboard tool — the 6-page CEO dashboard is built here |
| **Meta Pixel** | Facebook/Instagram's tracking pixel — needed for Facebook ad optimization |
| **Microsoft Clarity** | Free heatmap + session recording tool — shows where users click |
| **WhatConverts** | Phone call tracking + optionally form tracking |
| **Search Console** | Google's tool for organic search performance (keyword rankings, impressions) |
| **Cloudflare Pages** | Permanent hosting platform we're migrating to |
| **DNS cutover** | Flipping the domain from Netlify to Cloudflare — 5 min live operation |
| **PII hashing** | Emails and phones scrambled with SHA-256 before sending anywhere (privacy) |
| **9-channel classifier** | UDF (function) that auto-labels each visitor's source — GBP, Organic, Ads, Meta Ads, AI referral, etc. |
| **Hermes** | Your naming for the future AI recommendation engine (post-MVP) |

---

# ✅ END-OF-CALL CHECKLIST

Before the call ends, confirm you've got:

- [ ] Pages 2 + 3 approval (or a "let me review and confirm by X")
- [ ] WhatConverts plan direction (one word: keep or upgrade)
- [ ] Cloudflare account access grant timeline (today? tomorrow?)
- [ ] Feature parity redirect option pick (A recommended)
- [ ] Meta Pixel share step commitment (today? this week?)
- [ ] Search Console completed live on the call ✅

If you get 4+ of these, the call was a success. If you get all 6, you can lock in launch date next week.

---

# 📦 THE HANDOVER — What Adam Gets, How, and When

> Read this if Adam asks "so how do I take over" or "what happens after the MVP". Written in easy English. Every question Adam might have is answered here.

## 🎯 What "handover" means

At MVP finish, Zap It becomes the full owner of every piece of the analytics stack. Apex steps back to a 30-day support role (bug fixes + minor tweaks included, no cost), then fully steps away. Adam has ownership of every tool from day one — but during build, Apex has editor access to do the work. Handover is when Apex gives up the editor keys and Adam takes over.

## 🌳 The 3 Parts of Handover

```
Handover
├── Part 1 — Documentation (already built — 8 docs in the repo)
├── Part 2 — Access transfer (revoke Apex, confirm Zap It is Owner on everything)
└── Part 3 — Training call (30-45 min live walkthrough with Adam)
```

---

## 📚 PART 1 — Documentation Adam Gets

Every document below already exists in the GitHub repo `github.com/zapitpest/zapit-website` in the `docs/` folder. Adam gets access to the repo forever.

### The 8 handover documents

| # | Document | What's in it | Who reads it |
|---|---|---|---|
| 1 | **[README.md](/README.md)** | Top-level project overview, tech stack summary, how to run the code locally, where to deploy, links to every other doc | Anyone touching the site |
| 2 | **[HANDOVER_RUNBOOK.md](/docs/HANDOVER_RUNBOOK.md)** | The main handover doc. Section 1 covers who owns what. Section 2 covers the dashboard day-to-day. Section 3 covers daily/weekly/monthly rhythm. Section 4 is a "how do I do X" list. Section 5 is "what if something breaks". | Adam (primary) |
| 3 | **[PROJECT_RULES.md](/docs/PROJECT_RULES.md)** | Non-negotiable rules for any AI or developer working on the codebase. CRM-agnostic. Hermes/Claude naming. Human approval gates. Security rules. | Any future developer |
| 4 | **[ANALYTICS_ARCHITECTURE.md](/docs/ANALYTICS_ARCHITECTURE.md)** | Deep-dive of the analytics stack. How website → GTM → GA4 → BigQuery → Looker Studio connects. All 9 channels mapped. Every dataset explained. | Adam + future analysts |
| 5 | **[DEPLOYMENT_AND_DR.md](/docs/DEPLOYMENT_AND_DR.md)** | Deployment (how a code change goes live) + Disaster Recovery (what to do if the site goes down). Rollback procedures. | Anyone deploying or on-call |
| 6 | **[CLOUDFLARE_PAGES_MIGRATION.md](/docs/CLOUDFLARE_PAGES_MIGRATION.md)** | Step-by-step for the Netlify → Cloudflare Pages hosting migration. Preflight checklist, verification, rollback plan. | Sharjeel (execution), Adam (approval) |
| 7 | **[DNS_CUTOVER_RUNBOOK.md](/docs/DNS_CUTOVER_RUNBOOK.md)** | The DNS flip day playbook. Freeze window, exact DNS changes, monitoring, rollback. | Whoever runs launch day |
| 8 | **[AGENTS.md](/AGENTS.md)** | Rules for AI coding tools (Claude Code, Cursor, Copilot) working on this codebase. Stops future AI edits from breaking analytics or security. | Any future AI-assisted dev session |

### Extra reference material (already committed)

- `docs/gtm-blueprint.md` — every GTM tag, trigger, variable documented
- `docs/ADAM_15_SOURCES_ALIGNMENT.md` — the 16-source future architecture map (which data sources flow into BigQuery over time)
- `docs/MVP_STATUS.md` — live log of every step done, every change made
- `docs/ADAM_REQUEST_TRACKER.md` — cross-reference of every Adam ask and where it's honoured
- `docs/audit-data/` — the URL redirect maps, blog decision helpers
- `docs/call-prep/` — this pack you're reading now
- `sql/README.md` — all 12 SQL files documented in execution order

**Total docs in the repo: ~40 files. All version-controlled. All Adam-readable.**

---

## 🔑 PART 2 — Access Transfer

At handover moment, every tool moves cleanly to Zap It's ownership. Adam already owns from day one — Apex just revokes editor access.

### Ownership tree

```
Zap It ownership (day one — already set up this way)
│
├── Google Account: info@zapitpestmelbourne.com.au (owner)
│   ├── GA4 property "Zap It Production" (G-YRVHNE66GH)
│   ├── GTM container "Zap It Production" (GTM-PFGV87RB)
│   ├── GCP project "zapit-business-intelligence" (BigQuery lives here)
│   ├── Search Console property "zapitpestmelbourne.com.au" (activates Thursday)
│   ├── Looker Studio dashboard (transfers from Sharjeel to Adam on training day)
│   └── Google Business Profile (Adam's existing)
│
├── Meta Business Manager
│   └── Pixel 1088414402938841 (Adam's account, pending share to Sharjeel)
│
├── Microsoft Clarity
│   └── Project xl7ljoavrz
│
├── WhatConverts
│   └── Profile 171358 (Adam's existing subscription)
│
├── Cloudflare Pages
│   └── Adam's account (pending Sharjeel invite)
│
├── Domain registrar
│   └── zapitpestmelbourne.com.au (Adam's — unchanged)
│
└── GitHub repo: github.com/zapitpest/zapit-website
    └── Owned by zapitpest org (Adam controls)
```

### What Apex has during the 30-day support window

Apex keeps editor access for 30 days after MVP finish for bug fixes + minor tweaks. Adam can revoke any time:

- GA4: Editor role → Adam clicks Admin → Account Access → remove
- GTM: Container Publish role → Adam clicks Admin → User Management → remove
- GCP: Editor on the project → Adam clicks IAM → remove principal
- Looker Studio: Editor → Adam clicks Share → change role or remove
- GitHub: Collaborator → Adam clicks Settings → Manage Access → remove

**Zero platform lock-in.** Every piece works after Apex is gone.

---

## 🎓 PART 3 — Training Call

Live 30-45 minute call on Google Meet where Sharjeel walks Adam through:

### Agenda

1. **Dashboard tour (10 min)** — how to open Looker Studio, bookmark it, change date range, export to PDF, read each KPI
2. **Morning check rhythm (5 min)** — the 2-minute daily habit: Sessions, Confirmed Leads, arrows, anything unusual
3. **Weekly + monthly rhythm (5 min)** — deeper reviews Sharjeel recommends
4. **"How do I do X" tour (10 min)** — walk through Section 4 of the Handover Runbook so Adam sees the answers to common questions
5. **"What if something breaks" (5 min)** — walk through Section 5 — where to check, who to escalate to during the 30-day support window
6. **Access confirmation (5 min)** — Adam confirms he can log in to every tool, sees his role as Owner, knows how to revoke Apex if needed
7. **Q&A (5-10 min)** — anything Adam wants to ask

### After the training call

- Sharjeel emails a written recap listing every commitment
- 30-day support clock starts
- Any bugs → Sharjeel fixes within the window at no cost
- Any new features → change order + separate quote (not free)

---

## ⏱️ The Full Handover Timeline

```
MVP finish
    ↓ [same week]
Search Console verified (Thursday session)
    ↓ [within 1 week of Adam unblocking items]
Activation sprint (small remaining pieces)
    ↓
Training call scheduled (30-45 min, Google Meet)
    ↓ [Training call happens]
Written recap email sent
    ↓
30-day support window opens
    ↓ [30 days later]
Support window closes → engagement formally ends
    ↓
Adam still owns everything, docs are still in repo forever
```

**Rough timeline from today (13 August):**
- Thursday 13 Aug — Search Console session live
- Following week — Activation sprint + Adam decisions closed
- Following week — Training call
- Then 30 days of support
- Total: MVP fully wrapped by early-to-mid September

---

## 💬 If Adam Asks About Handover on the Call

### "How do I take ownership?"

> "You already own every tool from day one — that was set up in June. Handover just means Apex removes editor access. During the 30-day support window we stay editors so we can help with bug fixes. After that, you revoke us with 2 clicks per tool. Everything keeps working — nothing depends on Apex being there."

### "What if something breaks after 30 days?"

> "The Handover Runbook has a full 'what if something breaks' section — 90% of issues are covered. For anything beyond that, we're always reachable. Bug fixes after the 30 days are quoted separately as a small support engagement — no ongoing retainer needed unless you want one."

### "What documents do I get?"

> "Eight main documents plus about 30 reference files, all in the GitHub repo forever. HANDOVER_RUNBOOK is the main one — it covers who owns what, how to use the dashboard, daily rhythm, common tasks, and troubleshooting. Every doc is written in plain English."

### "What if I hire someone else to work on this later?"

> "The codebase is fully documented — AGENTS.md and PROJECT_RULES.md exist specifically to onboard any future developer or AI tool. Any new dev can pick this up on day one. No vendor lock-in, no custom frameworks, all standard tools (Next.js, TypeScript, BigQuery, Google Analytics)."

### "How do I know things won't break silently?"

> "The dashboard cross-reconciles every widget against Page 1 KPIs. If numbers drift, they visibly diverge. Plus we have 55+ automated warehouse health checks that catch schema issues, freshness drops, and reconciliation errors. If anything looks off, Section 5 of the Handover Runbook tells you where to look first."

### "What about the future stuff — Hermes, revenue attribution?"

> "That's future scope, not MVP. But every architectural piece is already built into the warehouse — see the Future Scope doc I sent. When you're ready for Phase 2 we scope it as a separate engagement, no foundation rework needed."

---

## 🚨 Common Handover Mistakes to Avoid on the Call

- ❌ Promising extra free work outside the 30-day window
- ❌ Committing to specific bug-fix turnaround times without checking
- ❌ Agreeing to teach 3rd parties (a hired dev) for free — that's a separate engagement
- ❌ Handing over passwords in chat (use a password manager or credential-share tool)
- ❌ Skipping the "written recap" email after training — this is your legal record

**Do:** frame the handover as a clean transfer where Adam is in full control from day one and Apex is available but not required.

---

**Last updated:** 2026-08-13
**Prepared for:** Sharjeel Saleem — Thursday 13 Aug 2026, 5:00 PM Melbourne call with Adam
