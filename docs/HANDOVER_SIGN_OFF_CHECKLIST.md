# Handover Sign-Off Checklist — 14 September 2026 Call

**Purpose:** line-by-line acceptance list for the handover call. Every commitment from the engagement letter, every Adam directive, and every post-cutover close-out item is here with a state. Sign off row by row, not from memory.

**Engagement letter reference:** `docs/ENGAGEMENT_LETTER_REFERENCE.md` (v2 MVP-first, 40–45 hr cap).
**Call:** Monday 14 September 2026, 10:00 AM Pakistan / 3:00 PM Melbourne.
**Portal hours logged:** 45 / 45 (at cap — see `docs/PORTAL_HOURS_FINAL.md`).

**Legend:** ✅ Delivered · 🟢 Delivered (goodwill, over-cap, not billed) · ⏳ Waiting on client · ⚠️ Deferred to future block (agreed) · ❌ Not delivered

---

## 1 · Engagement Letter — 9 MVP Base Deliverables

| # | Item | State | Where it lives |
|---|---|---|---|
| 1 | **GA4 event tracking setup** | ✅ | Property `G-YRVHNE66GH`, owner `info@zapitpestmelbourne.com.au`, Sharjeel Editor. 4 event types firing live: `form_submit_contact`, `click_phone`, `click_email`, `book_intent` |
| 2 | **Google Tag Manager configuration** | ✅ | Container `GTM-PFGV87RB` "Zap It Production", owner `info@`, Sharjeel Publish. 10 tags + 5 triggers, republished 10 Sep as "Sep 10 — remove dead form conversion tags" |
| 3 | **Google Search Console setup** | ✅ | Property `zapitpestmelbourne.com.au`, verified. Both TXT + meta verification tokens live on production. Sitemap submitted. BigQuery Search Console dataset receiving daily export (19,830+ URL impressions verified) |
| 4 | **GA4 → BigQuery export** | ✅ | Project `zapit-business-intelligence`, dataset `searchconsole_raw_search_console`, region `australia-southeast1`. Daily deliveries confirmed |
| 5 | **Call tracking (WhatConverts)** | ✅ | Master account "Zap It Pest Control" (ID 17166), owner Zaydan Osmanagic, script live in GTM. Free tier — plan-tier upgrade decision sits with client after real call volume |
| 6 | **Meta Pixel installation + verification** | 🟢 install / ⏳ domain-verification meta-tag | Pixel `1088414402938841` live via GTM (`tag.meta.pixel_base` on all pages, `tag.meta.pixel_lead` on form submit, `tag.meta.pixel_contact` on click_email/click_phone). **Domain verification meta-tag pending** — Adam/Zaydan to add domain in Business Manager and share the content value |
| 7 | **Core conversion events** | ✅ | `form_submit_contact` (ContactForm.tsx), `click_phone` + `click_email` (ClickTracker.tsx tel:/mailto:), `book_intent` (Square booking URL click). Awaited Formspree delivery with error-fallback UI added 9 Sep (commit `82b6309`) |
| 8 | **Looker Studio top-line dashboard** | ✅ | 6-page report (Executive Summary + Marketing Performance + Conversion Detail + Service Lines + Needs Attention + SEO Performance). URL: `datastudio.google.com/u/0/reporting/a1f7390a-2551-405c-93f0-288853567ac7`. Shared with `info@` as Editor. Ownership transfer via "Make a copy" step on the call (Google Workspace blocks cross-domain owner transfer) |
| 9 | **Service-line tagging** | ✅ | Commercial + Residential + Termite + Emergency tags live via `src/lib/analytics/service-line.ts`, flowing to GA4 `service_line` custom dimension and BigQuery `stg_leads.service_line` |

**All 9 MVP base items delivered.** Item 6 has one client-side sub-step outstanding.

---

## 2 · Website — Post-Cutover Content + Compliance Fixes (all live)

| # | Item | State |
|---|---|---|
| 10 | GST-inclusive pricing across all 3 price tables (Consumer Law fix) | ✅ Live |
| 11 | 10% same-day discount removed everywhere (banner + calculator + SVG + text) | ✅ Live |
| 12 | Brand: "Zapit" → "Zap It" corrected (60+ instances) | ✅ Live |
| 13 | Email address: `wo@` → `sales@` corrected | ✅ Live |
| 14 | Phone number now carries area code (03 9126 0555) | ✅ Live |
| 15 | 3 fabricated customer reviews removed; 8 verified Google reviews via Places API | ✅ Live |
| 16 | "5000+ residential / 500+ commercial" false claims removed (actual 550+ / 70+) | ✅ Live |
| 17 | "Over 20,000 homes" claim removed from alt text | ✅ Live |
| 18 | "Managed by Delivix" third-party agency credit removed from all 115 pages | ✅ Live |
| 19 | Termite species corrected (Coptotermes + Schedorhinotermes, replacing US-only Formosan/Conehead) | ✅ Live |
| 20 | Fake "Victorian pest control authority" claim removed | ✅ Live |
| 21 | False "free inspection" and blanket "service warranty" removed from 75 suburb pages | ✅ Live |
| 22 | 4 template bugs fixed on 75 suburb pages ("our Frankstontechnicians", "Need Spider Control Melbourne in Melbourne?", "hospital & health facility facility", lowercase sentence starts) | ✅ Live |
| 23 | Termite inspection published at $440 inc GST (closes 4-figure conflict on record) | ✅ Live |
| 24 | Figma desktop layout above 1024px (Zapit_desktop_03) — 1280 shell, 449px sticky rail, 3 reviews across, 4-column footer, 2-col About + Commercial heroes | ✅ Live |
| 25 | `/service-areas/` links to all 75 suburb pages (previously 0 outbound links) | ✅ Live |
| 26 | 16 additional Wayback-indexed legacy redirects added (`/pest-control-melbourne/`, `/thank-you/`, etc.) | ✅ Live |
| 27 | `/debug/analytics/` removed from production build + 301 redirected | ✅ Live |
| 28 | HomepagePricing dead code deleted (carried ex-GST header + false discounts) | ✅ Live |
| 29 | About photo replaced with new brand photo + uniform logo | ✅ Live |

---

## 3 · Hosting + DNS + Security

| # | Item | State |
|---|---|---|
| 30 | Cloudflare Pages migration (project `zapit-website`) | ✅ Live |
| 31 | DNS cutover to CF nameservers (destiny + moura) — 9 Sep 2026 | ✅ Live |
| 32 | Custom domain `zapitpestmelbourne.com.au` on CF Pages | ✅ Live |
| 33 | Custom domain `www.zapitpestmelbourne.com.au` on CF Pages | ✅ Live |
| 34 | SSL cert (Google Trust Services WE1, ECDSA P-256, TLS 1.2/1.3 only) auto-renewed by CF | ✅ Live |
| 35 | HSTS `max-age=31536000; includeSubDomains` (no `preload` per pre-cutover audit) | ✅ Live |
| 36 | Security headers: X-Frame DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy locked, X-DNS-Prefetch-Control on | ✅ Live |
| 37 | SPF corrected to include `_spf.google.com` directly (removed GoDaddy indirection) | ✅ Live |
| 38 | DMARC published at `p=none` with rua → `info@zapitpestmelbourne.com.au` | ✅ Live |
| 39 | DKIM record in Google Workspace | ⏳ Awaiting Zaydan Workspace admin |
| 40 | 4 pre-cutover Netlify hostnames swept and dead (zapitpest / zapitpestmelbourne / zapit-retired / zapittt — all 404) | ✅ Verified 404 |

---

## 4 · Handover Cleanup + Documentation

| # | Item | State |
|---|---|---|
| 41 | Netlify pre-cutover site deleted from Zap It team | ✅ |
| 42 | GTM cleanup — 4 dead form_submit triggers + 4 GA4 tags removed + `tag.meta.pixel_lead` trimmed | ✅ Published |
| 43 | Assets ownership audit (BigQuery, Search Console, Meta Business, WhatConverts, Formspree) — 11 of 12 on Zap It logins, Clarity pending confirmation | 🟡 11/12 |
| 44 | `docs/HANDOVER_RUNBOOK.md` — post-cutover "READ FIRST" section + all sections current | ✅ |
| 45 | `docs/MVP_STATUS.md` — 10 Sep MVP-complete snapshot + full commit chain | ✅ |
| 46 | `docs/PORTAL_HOURS_FINAL.md` — 45 / 45 hours breakdown | ✅ This checklist |
| 47 | `docs/30_DAY_SUPPORT_WINDOW.md` — scope + SLA | ✅ This checklist |
| 48 | `docs/HANDOVER_SIGN_OFF_CHECKLIST.md` — this document | ✅ |
| 49 | Credential rotation plan (GitHub, WhatConverts, Supabase) — coordination window | ⏳ To agree on call |
| 50 | 3 legacy GTM containers (GTM-W85HKKNT, GTM-T2GN7VH8, GTM-WBZC2BHL) — JSON exports sent to Zaydan for review | ⏳ To decide delete/keep on call |

---

## 5 · Explicitly Deferred (out of MVP, agreed with Adam/Zaydan)

| # | Item | Reason |
|---|---|---|
| D1 | WhatConverts Plus plan upgrade + form-submission tracking | Client billing decision, revisit ~8 October per Zaydan |
| D2 | Desktop Phase 2 (deeper polish beyond Zapit_desktop_03 implementation) | Preliminary quote held for 1 October revisit once desktop-share data lands |
| D3 | Dashboard Pages 2-6 numbers review (real-traffic pass) | Booked ~22 September (2 weeks post-cutover) |
| D4 | GoHighLevel CRM ingest | Future block |
| D5 | Zoom Phone call recordings + transcripts | Future block |
| D6 | AI-generated insights (Hermes / Claude / coding-agents) | Future block, foundation already in `zapit_reserved_ai` schema |
| D7 | PostHog product analytics for internal apps | Future block |
| D8 | `family-trust.webp` replacement | Stood down 12 Sept per Zaydan — the "20,000 homes" claim was in alt text only, not the artwork |
| D9 | Rebuild of 19 termite blog posts that now redirect to `/termite-control-melbourne/` | Content debt, source text recovered via Wayback |

---

## 6 · Waiting-on-Client (for full handover close)

| # | Item | Who | What we do when it lands |
|---|---|---|---|
| C1 | DKIM record generated in Workspace admin | Zaydan (Adam if needed) | Add `google._domainkey` TXT to CF DNS (~2 min) |
| C2 | Meta Pixel domain-verification meta-tag content value | Adam / Zaydan (Business Manager) | Add `<meta name="facebook-domain-verification">` to `src/app/layout.tsx` + push (~2 min) |
| C3 | Microsoft Clarity ownership confirmation | Zaydan | Add Sharjeel view-only for support window if desired |
| C4 | Decision on 3 legacy GTM containers | Zaydan | Delete containers on call if agreed (~5 min) |
| C5 | Formspree domain allowlist decision | Zaydan | Set allowlist to production domain (~2 min) |

---

## 7 · Sign-off block

**To be filled on the call:**

- [ ] All items in sections 1–4 marked ✅ or 🟢 reviewed and accepted
- [ ] Items in section 5 acknowledged as deferred, not delivered under MVP scope
- [ ] Items in section 6 assigned back to Apex as quick-turnaround once client input received
- [ ] 30-day support window start date agreed: **_____________**
- [ ] 30-day support window end date auto-calculated: **_____________**
- [ ] Credential rotation window scheduled: **_____________**
- [ ] Any dispute items flagged in writing before end of call

**Apex sign-off:** Muhammad Sharjeel Saleem — `sharjeel@meetapex.ai`
**Zap It sign-off:** Zaydan Osmanagic — `info@zapitpestmelbourne.com.au`

---

## Version history

- **2026-09-13** — Created for the 14 Sep handover call.
