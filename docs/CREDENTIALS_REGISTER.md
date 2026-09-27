# Credentials & IDs Register

**Written:** 27 September 2026 · **Owner:** Sharjeel Saleem (Apex AI)
**Purpose:** Single register of every account, ID, and reference the Zap It analytics stack depends on. No secrets, no passwords — only public IDs and pointers so anyone taking over the stack knows exactly what to log into and where things live.

**Secrets rule:** actual passwords, API tokens, and credit-card-linked billing info live in the client's password manager (info@ Google Workspace vault). This document only names accounts and their public identifiers.

═══════════════════════════════════════════════════

## 1 · Domain + hosting

| Asset | Value | Owner login | Notes |
|-------|-------|-------------|-------|
| Domain | `zapitpestmelbourne.com.au` | GoDaddy account (Zap It) | Registrar only — DNS is on Cloudflare |
| Cloudflare account | `Zapitpestcontroluser` | info@zapitpestmelbourne.com.au | Client-owned Cloudflare account holds domain + Pages projects |
| Cloudflare account ID | `0cd1d2b0d67f371d282224d00b1b68ac` | — | Reference for API calls |
| Nameservers | `destiny.ns.cloudflare.com`, `moura.ns.cloudflare.com` | — | Configured at GoDaddy |
| Cloudflare Pages project | `zapit-website` | Zapitpestcontroluser account | Auto-deploys from GitHub `main` |
| SSL cert | Google Trust Services (auto-renew via CF) | — | Valid till 8 Dec 2026, then auto-renews |

═══════════════════════════════════════════════════

## 2 · Source code + deploy

| Asset | Value | Owner login |
|-------|-------|-------------|
| GitHub organisation | `zapitpest` | Client GitHub org |
| GitHub repo | `zapitpest/zapit-website` | — |
| Deploy trigger | Cloudflare Pages watches `main` branch — every merge deploys in ~30-45s | — |
| Preview branches | Every non-`main` branch gets `<branch>.zapit-website-6q7.pages.dev` preview URL | — |

═══════════════════════════════════════════════════

## 3 · Google Analytics + Tag Manager

| Asset | Value | Owner login |
|-------|-------|-------------|
| GA4 property (production) | `G-YRVHNE66GH` — "Zap It Production" | info@zapitpestmelbourne.com.au |
| GA4 property name | Zap It Production | — |
| GA4 web stream ID | `Zap It Staging` (stream label — the property is production) | — |
| GTM live container | `GTM-PFGV87RB` — "Zap It Production" | info@zapitpestmelbourne.com.au |
| GTM legacy container 1 | `GTM-W85HKKNT` (June 2024 — Wix era, retained pending Ads migration) | Not on any live page |
| GTM legacy container 2 | `GTM-WBZC2BHL` (Feb 2025 — mid-2025 rebuild, retained pending Ads migration) | Not on any live page |
| GTM legacy container 3 | `GTM-T2GN7VH8` (empty shell, 0 tags) | Not on any live page |

═══════════════════════════════════════════════════

## 4 · Google Search Console

| Asset | Value | Owner login |
|-------|-------|-------------|
| Property | `zapitpestmelbourne.com.au` (domain property) | info@zapitpestmelbourne.com.au |
| Property URL | `https://search.google.com/search-console?resource_id=sc-domain:zapitpestmelbourne.com.au` | — |
| BQ export | Configured → dataset `searchconsole_raw_search_console` in `zapit-business-intelligence` project | Data landing daily since 12 Aug 2026 |

═══════════════════════════════════════════════════

## 5 · Google Cloud Platform + BigQuery

| Asset | Value | Owner login |
|-------|-------|-------------|
| GCP project ID | `zapit-business-intelligence` | info@zapitpestmelbourne.com.au (Owner) |
| GCP project number | `1074611396691` | — |
| GCP region | `australia-southeast1` (data residency lock) | — |
| Billing account name | `My Billing Account` (default Google name — never renamed) | Client-owned |
| Billing account ID | `017638-61BBE3-AD11C5` | — |
| Current billing state | A$0.00 spend — entirely within Google Cloud free tier | — |
| BQ datasets | 15 total in project — see `docs/call-prep/bq-iam-matrix.md` §3 for full inventory | — |
| Reporting views | `zapit_reporting.v_seo_top_pages`, `v_seo_top_queries`, `v_seo_daily_trend`, plus 11 Looker-source views | Created 27 Sep 2026 |

═══════════════════════════════════════════════════

## 6 · Looker Studio dashboard

| Asset | Value | Owner login |
|-------|-------|-------------|
| Dashboard URL | `https://datastudio.google.com/u/0/reporting/a1f7390a-2551-405c-93f0-288853567ac7` | info@ (currently Editor, ownership transfer pending) |
| Report title | Zap It — Marketing & Conversion Dashboard | — |
| Pages | 6 — Executive Summary, Marketing Performance, Conversion Detail, Service Line Performance, Needs Attention, SEO Performance | — |
| Data sources | 14 total — 11 original + 3 new SEO views (27 Sep 2026) | All BigQuery Embedded type |

═══════════════════════════════════════════════════

## 7 · Meta (Facebook / Instagram) advertising stack

| Asset | Value | Owner login |
|-------|-------|-------------|
| Meta Business Portfolio | Zap It Pest Control Melbourne | Adam's Meta Business Manager |
| Meta Pixel ID | `1088414402938841` | Adam / Business Portfolio |
| Domain verification | ✅ Live — TXT record `facebook-domain-verification=cvyskan1ri68sqxy0rtoj7vbq7vfcq` at apex | Added 17 Sep 2026 |
| Business asset access | `sharjeel@meetapex.ai` Full Access (to be reduced 17 Oct) | — |

═══════════════════════════════════════════════════

## 8 · Google Ads (pending confirmation)

| Asset | Value | Notes |
|-------|-------|-------|
| Conversion ID (older) | `AW-11416284378` | Present in legacy GTM-W85HKKNT |
| Conversion ID (newer) | `AW-16873849542` | Present in legacy GTM-WBZC2BHL |
| Ads MCC or account ID | ⏳ **PENDING** — Zaydan to confirm | Blocks Ads migration verification |

═══════════════════════════════════════════════════

## 9 · Call tracking (WhatConverts)

| Asset | Value | Owner login |
|-------|-------|-------------|
| WhatConverts account name | Zap It Pest Control | Zaydan Osmanagic |
| WhatConverts master account ID | `17166` | — |
| Plan tier | Free (Plus upgrade decision pending) | — |
| Live in GTM | `tag.whatconverts.script` in PFGV87RB — number swap active | — |

═══════════════════════════════════════════════════

## 10 · Email delivery (Formspree — contact form)

| Asset | Value | Owner login |
|-------|-------|-------------|
| Formspree endpoint | `https://formspree.io/f/xgaewwob` | Zap It Formspree account (info@ login) |
| Delivery target | `info@zapitpestmelbourne.com.au` | — |
| Client-side POST | Yes — endpoint is public by design (Formshield + reCAPTCHA guard spam) | — |

═══════════════════════════════════════════════════

## 11 · Google Workspace + email authentication

| Asset | Value | Owner login |
|-------|-------|-------------|
| Workspace primary domain | `zapitpestmelbourne.com.au` | Zaydan (Workspace admin) |
| Primary shared mailbox | `info@zapitpestmelbourne.com.au` | Owns every third-party account |
| SPF | `v=spf1 include:_spf.google.com ~all` | Live at apex |
| DMARC | `v=DMARC1; p=none; rua=mailto:info@zapitpestmelbourne.com.au` | Live at `_dmarc` subdomain |
| DKIM | Live at `google._domainkey` (added 17 Sep 2026, verified on 3 resolvers) | — |

═══════════════════════════════════════════════════

## 12 · Behavioural analytics (Microsoft Clarity)

| Asset | Value | Owner login |
|-------|-------|-------------|
| Clarity project ID (current) | `ylqidayv98` — "Zap It Pest Control Melbourne" | info@zapitpestmelbourne.com.au (Admin) |
| Dashboard URL | `https://clarity.microsoft.com/projects/view/ylqidayv98/dashboard` | — |
| Clarity project ID (retired) | `xl7ljoavrz` | Stuck behind Apex OAuth policy — no longer in GTM tag |

═══════════════════════════════════════════════════

## 13 · Supabase (staging / operational)

| Asset | Value | Notes |
|-------|-------|-------|
| Supabase project | (as documented in engagement records) | Access via Zap It login |

═══════════════════════════════════════════════════

## Update rule

Every change to any account or ID gets a row edit here plus a commit line. This document is version-controlled — the git history is the audit trail. When the 30-day support window closes on 17 October 2026, this is the single reference the client (or any future agency) opens to see the whole picture.
