# 30-Day Post-Handover Support Window

**Purpose:** exact scope of what Apex covers after the 14 September 2026 handover call, for how long, and how to reach us. Plain English so there is no dispute about whether something is in or out.

**Start date:** agreed on the 14 Sep handover call.
**End date:** start date + 30 calendar days (agreed on call).
**Cost:** included in the delivered MVP engagement — no separate invoice for anything in the IN-SCOPE list.

---

## IN SCOPE (Apex covers, no charge, within 30 days)

Anything from this list can be raised via WhatsApp or email during the window and Apex will action per the SLA below.

### Site + hosting
- **Production site down** (`zapitpestmelbourne.com.au` returns 5xx or does not resolve) — Apex investigates and either fixes or gives a written rollback recommendation
- **DNS or SSL breakage** — including cert renewal that fails, DMARC/SPF regression, nameserver-side issues
- **Cloudflare Pages deploy failing** — investigate build errors, roll back to previous deploy
- **Regression on shipped work** — anything that was working at handover and stops working (broken link, missing image, 404 on a page that was 200, form fails to submit, price displays wrong)

### Analytics + reporting
- **GA4 not receiving events** — investigate GTM, dataLayer, site instrumentation
- **BigQuery daily export not delivering** — investigate export config, GCP IAM, region issues
- **Looker Studio dashboard broken** — data source connection issues, blank widgets, refresh failures
- **GTM container publish accidentally breaks tracking** — rollback to last-known-good version, diagnose

### Post-launch cleanup we already committed to
- **DKIM TXT record in CF DNS** — once Zaydan generates the record in Google Workspace admin (~2 min our side)
- **Meta Pixel domain-verification meta-tag** — once Adam/Zaydan shares the `content` value from Business Manager (~2 min our side)
- **`family-trust.webp` replacement image** — if it lands during the window we drop it in `public/images/residential/` (~2 min)
- **3 legacy GTM container deletion** — after Zaydan reviews the JSON exports and confirms (~5 min our side)
- **Formspree domain allowlist** — set the allowlist to production domain (~2 min)
- **Credential rotation session** — GitHub / WhatConverts / Supabase, coordinated 30-min window with Zaydan

### Documentation
- Answer questions on any doc in `docs/` — what does X mean, where is Y, how do we do Z
- Small doc corrections (typos, outdated dates, ownership changes) — pushed as they come up

### Advice
- **Written second opinion** on new work being scoped by another vendor or an internal Zap It engineer, if requested
- Recommendation on any change that could break the analytics contract before it ships

---

## OUT OF SCOPE (chargeable as new work, quoted separately)

Anything on this list is a new engagement — request goes to Sharjeel, we scope, quote, and only start after written approval. Not billed against the 30-day window.

### New feature development
- New pages, new sections on existing pages, new services in the calculator, new form fields
- New GA4 events, new custom dimensions, new tracking beyond what shipped
- Any new integration (email marketing, SMS, chat widget, booking flow, review platform)
- Meta / Google Ads campaign setup, tag build for a paid campaign, conversion optimisation work

### Redesigns + significant restyling
- Colour scheme changes, typography changes, layout redesigns
- Any page rebuild (as opposed to a bug fix on a shipped layout)
- Desktop Phase 2 or any polish batch beyond the shipped Zapit_desktop_03

### Content
- Rewriting existing copy on any page
- Rebuilding the 19 termite blog posts (Wayback content recovered but not rebuilt — content debt, out of MVP)
- New blog posts, new suburb pages, new industry pages
- Image sourcing, image retouching, photography

### Analytics deep-work outside the shipped scope
- Building any of the reserved future sources (WhatConverts calls join, Zoom Phone, GoHighLevel, PostHog, Meta Ads, Google Ads spend, Clarity heatmap ingest)
- Building the AI-layer (Hermes / Claude / coding-agents recommendations UI)
- Revenue attribution chain (leads → qualified → closed → revenue)
- Dashboard rebuild beyond the six pages delivered

### Separate engagements already scoped
- The 29 July Square + Lovable + Xero integration work — separate engagement, not covered
- WhatConverts Plus plan upgrade + integration — deferred, revisit ~8 October (client decision)

### Third-party account admin
- Managing Adam's Meta Business, GoDaddy, Cloudflare, or Google Workspace account billing
- Managing user access lists on those accounts (Zap It IT decision)
- Anything that requires an owner-level action on a Zap It account (Apex is Editor/Support only)

---

## Response SLA

**Standard channel:** WhatsApp thread with Sharjeel + email `sharjeel@meetapex.ai`.

| Severity | What it means | Response target |
|---|---|---|
| **P0 — Site down** | Production `zapitpestmelbourne.com.au` returns 5xx or does not resolve, no form submissions landing at all | Same-day acknowledgement, work begins immediately on receipt during Karachi business hours |
| **P1 — Tracking broken** | GA4 not receiving events / dashboard blank / BQ export stopped | Next business day acknowledgement, fix targeted within 2 business days |
| **P2 — Regression / typo / doc question** | Non-urgent fix, quality issue | Acknowledge within 2 business days, plan a batch fix or answer inline |
| **P3 — Advice / second opinion** | Not blocking anything, questions on how something works | Answer within 3 business days |

**Karachi business hours:** roughly 10:00 – 22:00 PKT = 15:00 – 03:00 Melbourne. Outside these hours we still see WhatsApp notifications but response time is next-morning Karachi.

---

## Escalation path

1. **First:** WhatsApp thread that includes Sharjeel
2. **If no response within SLA:** email `sharjeel@meetapex.ai` with subject prefix `[ZAP-IT-URGENT]` for P0/P1
3. **If still no response after 24h on a P0:** contact Apex at `hello@meetapex.ai` (backup channel)

Apex commits to at least one acknowledgement inside the SLA even if the fix itself takes longer.

---

## What happens after 30 days

- **Any new request** goes through the standard scope + quote flow (email `sharjeel@meetapex.ai`, we respond with an estimate before starting)
- **Access revocation** — Zap It can revoke Apex support-level roles across GA4, GTM, BigQuery, Search Console, Meta Business, GitHub the moment the window closes. Nothing depends on Apex being there
- **Docs stay** — everything in `docs/` including this file, `HANDOVER_RUNBOOK.md`, `HANDOVER_SIGN_OFF_CHECKLIST.md`, `MVP_STATUS.md`, `PORTAL_HOURS_FINAL.md` remains in the repo permanently
- **Optional ongoing retainer** — if Zap It wants a monthly retainer for analytics maintenance / recommendations / new-feature work, Apex can quote — separate conversation

---

## Sign-off

- **Start date agreed on call:** ______________
- **End date auto-calculated (start + 30 days):** ______________
- **Apex sign-off:** Muhammad Sharjeel Saleem — `sharjeel@meetapex.ai`
- **Zap It sign-off:** Zaydan Osmanagic — `info@zapitpestmelbourne.com.au`

---

## Version history

- **2026-09-13** — Created for the 14 Sep handover call.
