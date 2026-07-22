# Zap It Analytics — Handover Runbook

**Who this is for:** Adam and anyone else at Zap It who needs to run the analytics stack after Apex hands over.

**What it covers:** how to use the dashboard day-to-day, the common things you'll want to do yourself, and what to do when something looks wrong.

**How to use it:** section 3 covers the daily rhythm. Section 4 is the "how do I do X" list. Section 5 is the "what if something breaks" list. Everything else is reference material.

---

## Section 1 — Who owns what

Everything below sits under your Zap It Google account (`info@zapitpestmelbourne.com.au`). Apex has editor-level access to help during the handover period, but you're the owner of everything from day one.

**Under your Zap It Google account:**
- GA4 property "Zap It Production" — Measurement ID `G-YRVHNE66GH`
- GTM container "Zap It Production" — Container ID `GTM-PFGV87RB`
- GCP project `zapit-business-intelligence` (this is where BigQuery lives)
- Google Search Console property `zapitpestmelbourne.com.au` (activates once you add the TXT record)
- Microsoft Clarity project — Project ID `xl7ljoavrz`
- Meta Business Manager pixel — Pixel ID `1088414402938841`
- WhatConverts account — Profile ID `171358`
- Domain registrar for `zapitpestmelbourne.com.au`

**Under Sharjeel's account (`sharjeel@meetapex.ai`) — kept for the 30-day support window:**
- GA4: Editor role
- GTM: Container Publish role
- GCP: Editor on `zapit-business-intelligence`
- Looker Studio: Editor (you become Owner when Page 1 is walked-through and handed over)
- GitHub `zapitpest/zapit-website` repo: Collaborator

You can revoke any of Apex's access any time after the 30-day support window — nothing depends on us being there.

---

## Section 2 — The dashboard (Looker Studio)

**The dashboard is the main thing you'll use.** It sits in Looker Studio (also branded as Data Studio) and reads from BigQuery.

**Direct URL:** to be added once we walk through Page 1 together and transfer ownership to your Google account.

**Best way to use it:**
- Bookmark Page 1 in your browser
- Refresh happens automatically every 12 hours — the dashboard reads live data from BigQuery
- Data is a day behind (BigQuery's export runs overnight). So on Wednesday morning you're looking at Tuesday's numbers.

### Pages inside the dashboard

- **Page 1 — CEO Dashboard** (built). The morning-check page. Everything below Section 3 references this.
- **Pages 2-6** (planned, not built yet). Will cover Acquisition, Behaviour, Conversion Detail, Segments, and Search Console once we build them. Ping Sharjeel when ready.

### What each KPI on Page 1 means

- **Sessions** — how many browsing sessions on the site in the selected date range. One person can have multiple sessions if they came back on different days.
- **Visitors** — how many *unique* people came to the site. Always lower than Sessions.
- **Confirmed Leads** — how many people submitted a form on the site. This is the number to trust. Phone-number clicks and email-link clicks are tracked separately (as "intent signals") because someone tapping a phone number isn't the same as them actually calling and converting.
- **Conversion Rate** — Confirmed Leads ÷ Sessions × 100.

Each KPI shows a small arrow (▲ green up / ▼ red down) comparing this week vs last week.

### How to change the date range

- Top-right of Page 1 there's a date-range control. Click it.
- Pick a preset (Last 7 days / Last 28 days / Last quarter) or set custom dates.
- The whole page updates automatically.

### How to export the dashboard as PDF

- Top-right of the report → **Share** dropdown → **Download report** → **PDF**.
- Optionally tick "Include entire report" to get all pages in one PDF.

---

## Section 3 — Daily / weekly / monthly rhythm

Suggested rhythm — take what's useful, ignore what's not.

**Note on pages:** Page 1 (CEO Dashboard) is the only page live right now. Weekly and monthly steps below reference Pages 2-6 — those get added once we build them (planned post Page 1 sign-off). Until then, most of what you need for weekly/monthly review is still on Page 1 (the Daily Traffic chart, Top Lead Sources, and Service Line Performance widgets).

### Morning check (2 min, every business day)

1. Open Page 1 (bookmark it).
2. Look at the 4 KPI cards:
   - **Sessions** — is traffic normal for this day of the week?
   - **Visitors** — how many unique people?
   - **Confirmed Leads** — how many form submissions yesterday? Phone/email clicks are counted separately.
   - **Conversion Rate** — green ▲ good, red ▼ investigate.
3. Glance at the "Needs Attention" panel. If it has items, click into Pages 2-4 (once built) to investigate.
4. If nothing needs attention, close the tab.

### Weekly review (10 min, Monday morning)

1. Scan the 7-day daily traffic + leads chart on Page 1. Trend up, flat, or down?
2. Which sources drove leads last week? Any source that stopped delivering?
3. Which service lines converted best?
4. If you're planning marketing spend, match your best-converting channels to where you spend the money.

### Monthly review (30 min, first Monday of the month)

1. Commercial vs Residential — any shift?
2. Termite vs General — which is trending?
3. Monthly trend — is the site growing month over month?
4. Anything unusual? Note it, or ping Sharjeel to dig in.

### Ad-hoc use

- Launching a marketing campaign? Filter by traffic source to isolate its performance.
- Changing something on the site? Look at top landing pages first to see which pages drive leads before you touch them.
- Lead-quality issue? Compare intent signals (clicks) vs confirmed leads (form submits). High intent + low conversions = something's wrong with the form or CTA.

---

## Section 4 — How to do common tasks

Practical steps for the things you'll most often want to do yourself.

### 4.1 Add someone to the dashboard, GTM, GA4, or WhatConverts

Any team member can be added by you — you're the owner of every account.

**Dashboard (Looker Studio):**
1. Open the report.
2. Top-right, click **Share**.
3. Type their email address.
4. Choose access level:
   - **Viewer** — can look at the dashboard, can't change anything.
   - **Editor** — can change widgets. Recommend for Apex/dev help only.
5. Click **Send**.

**GA4:**
1. Go to `analytics.google.com` → click the gear icon (bottom-left).
2. Under Property, click **Property Access Management**.
3. Top-right, click the blue **+** → Add users.
4. Type their email, choose **Viewer** (read-only) or **Analyst** (can build reports).
5. Click **Add**.

**GTM:**
1. Go to `tagmanager.google.com` → open the "Zap It Production" container.
2. Top-right → Admin.
3. **User Management** → click the blue **+**.
4. Type their email, choose permission level (**Read** = read-only, **Edit** = can modify tags but not publish, **Publish** = full).
5. Click **Invite**.

**WhatConverts:**
1. Log in at `app.whatconverts.com`.
2. **Settings** → **Users** → **Add User**.
3. Type email, choose role, click Send.

**Meta Business Manager:**
1. Go to `business.facebook.com/settings/people`.
2. Click **Add**.
3. Type email, choose Analyst (view-only) or Advertiser (can edit campaigns).
4. Click Send request.

### 4.2 Add a new tracking event to the site

This one is best handled by a developer or via Claude Code — it needs a code change plus a matching GTM tag. Here's the flow so you know what happens:

1. **Code side** — a new event helper gets added to `src/lib/analytics/dataLayer.ts` and called from the component that fires it.
2. **GTM side** — a new trigger and tag get built in the GTM container.
3. **GA4 side** — if there's a new custom dimension, it gets registered in GA4 Admin.
4. **BigQuery side** — the staging views auto-pick up new event params (they use dimension-based SELECT).

If you want to try it yourself with Claude Code or Cursor, the pattern is documented in `AGENTS.md` at the repo root. Otherwise, ping Sharjeel — this kind of change usually takes about an hour end-to-end.

### 4.3 Deploy a website change

Every push to the `main` branch on GitHub auto-deploys to Netlify. So:

1. Make the change (either yourself if you're using Claude Code / Cursor, or ask a developer).
2. Commit and push to `main` on GitHub.
3. Netlify picks it up automatically and deploys in about 30 seconds.
4. Verify the change is live by opening the site in an incognito window.

**Rollback if something breaks:**
1. Netlify dashboard → Deploys tab.
2. Find the last known-good deploy in the list.
3. Click the three-dot menu on that deploy → **Publish deploy**.
4. Live site reverts within seconds. No data loss.

### 4.4 Change the Meta Pixel ID, Clarity ID, WhatConverts token, or GTM Container ID

These live in two different places depending on what you're changing.

**Meta Pixel ID or Clarity Project ID** (both live in GTM as Custom HTML tags):

1. Go to `tagmanager.google.com` → open the "Zap It Production" container.
2. Left sidebar → **Tags**.
3. For Meta Pixel: click `tag.meta.pixel_base` → find the `fbq('init', '1088414402938841')` line → change the ID → Save.
4. For Clarity: click `tag.clarity.script` → find the project ID (`xl7ljoavrz`) in the script → change it → Save.
5. Top-right → **Submit** to publish a new container version. Add a version name like "Updated Meta Pixel ID".
6. Live in about 30 seconds.

**WhatConverts token or GTM Container ID** (both are Netlify env vars):

1. Netlify dashboard → your site → **Site settings** → **Environment variables**.
2. Find the variable to change:
   - `NEXT_PUBLIC_GTM_ID` for the GTM container ID
   - `NEXT_PUBLIC_WHATCONVERTS_TOKEN` for the WhatConverts API token
   - `NEXT_PUBLIC_WHATCONVERTS_PROFILE_ID` for the WhatConverts profile ID
3. Click Edit → change the value → Save.
4. Trigger a redeploy: **Deploys** tab → **Trigger deploy** → **Deploy site**.
5. Live in about 30 seconds.

### 4.5 Check whether GA4 is receiving events (from the site)

The quickest sanity check when you suspect analytics has stopped.

**Option A — GTM Preview mode (most reliable):**

1. Go to `tagmanager.google.com` → open the "Zap It Production" container.
2. Top-right → click **Preview**.
3. Enter the live URL (`https://zapitpestmelbourne.com.au` or the staging URL) → **Connect**.
4. A new browser tab opens with the site + a debug pane showing tags firing.
5. Click around — click a phone link, submit the contact form. Watch the debug pane list each tag as it fires.

**Option B — GA4 DebugView (shows events landing at GA4's end):**

1. Install the "Google Analytics Debugger" Chrome extension (free, from the Chrome Web Store).
2. Click the extension icon to turn debug mode ON (icon goes blue).
3. Open the live site.
4. In another tab, go to `analytics.google.com` → open "Zap It Production" → **Admin** → **DebugView**.
5. Click around the site. Events should appear in DebugView within about 10 seconds.

If either option shows tags firing but the dashboard doesn't reflect them, the pipeline is working — data lags a day. Wait 24 hours and check again. If nothing fires in either option, see Section 5.2.

### 4.6 Roll back GTM to a previous version

If a bad tag change slipped through:

1. Go to `tagmanager.google.com` → open the "Zap It Production" container.
2. Left sidebar → **Versions**.
3. Find the last known-good version.
4. Click the three-dot menu → **Publish**.
5. Old version becomes live in ~30 seconds.

The current published version was V3 (as of 16 Jul 2026). Every publish creates a new version — you can always go back.

### 4.7 Run a quick SQL query on BigQuery

Optional — for when you want to look at the raw data yourself.

1. Go to `console.cloud.google.com/bigquery?project=zapit-business-intelligence`.
2. Click **Compose new query** (the blue **+**).
3. Try this to see confirmed leads by day:
   ```sql
   SELECT DATE(lead_timestamp) AS day, COUNT(*) AS confirmed_leads
   FROM `zapit-business-intelligence.zapit_staging.stg_leads`
   WHERE lead_class = 'confirmed_lead'
   GROUP BY day
   ORDER BY day DESC
   LIMIT 30;
   ```
4. Click **Run**.

More sample queries live in `docs/ANALYTICS_ARCHITECTURE.md`.

---

## Section 5 — Troubleshooting

Practical fixes for common issues.

### 5.1 The dashboard isn't updating

1. Top-right of the report — check the "Last refreshed" timestamp. If it's from within the last 24 hours, the dashboard is fine. Data lags a day because BigQuery's export runs overnight.
2. If it says >2 days old: check `console.cloud.google.com/bigquery?project=zapit-business-intelligence` → open the `analytics_543350918` dataset → confirm you see a table for yesterday's date (like `events_20260722`).
3. If the export table is missing: open GA4 → Admin → BigQuery Links → check the link status is "Link Created" (not "Error").
4. Still stuck? Ping Sharjeel.

### 5.2 A form submission isn't showing in the dashboard

1. Open GTM Preview mode (`tagmanager.google.com` → Zap It Production → **Preview** button top-right).
2. Enter the live URL, click Connect.
3. Submit the test form. Preview shows which tags fired.
4. If the `tag.ga4.form_submit_contact` tag fired → check GA4 DebugView within ~10 seconds for the `form_submit_contact` event.
5. If the tag didn't fire → the trigger isn't matching. Compare against `docs/gtm-blueprint.md` to see what should be firing.
6. If it fired in GA4 but not in the dashboard → wait 24 hours for the BigQuery export to run, then check again.

### 5.3 The site is down or showing an error

1. First check Netlify's own status: `netlifystatus.com`.
2. If Netlify is up, go to your Netlify dashboard → Deploys tab.
3. Latest deploy failed? Roll back to the previous good deploy (three-dot menu → **Publish deploy**).
4. Site comes back online in seconds. Then investigate what broke locally before pushing again.
5. If Netlify itself is down: nothing to do — wait for their status page to update.

### 5.4 An old GTM tag change broke analytics

1. Go to GTM → Versions.
2. Find the last version that was working (usually the one before the current live version).
3. Click its three-dot menu → **Publish**.
4. Within 30 seconds the old container is live again. Analytics resumes as before.

### 5.5 BigQuery bill went up unexpectedly

1. Go to `console.cloud.google.com/bigquery` → **Job history**.
2. Sort by "Bytes processed" descending.
3. Common culprit: someone (or a scheduled query) ran an unfiltered scan on `events_*` — this can process terabytes.
4. Fix by adding a date filter, or set a project-wide daily query limit at **IAM & Admin** → **Quotas**.
5. Recommended safety limit for our scale: 1 TB per day.
6. If unsure, ping Sharjeel — this is worth catching early.

---

## Section 6 — What's live vs what's still coming

### Live right now (as of MVP handover)

**Website tracking (GTM V3, container `GTM-PFGV87RB`):**
- 14 tags including Meta Pixel, Clarity, WhatConverts, GA4 event tracking.
- Email and phone number are hashed with SHA-256 in the browser before anything goes to Meta or GA4. Raw PII never leaves your visitors' browsers.

**GA4 (property `G-YRVHNE66GH`):**
- 7 custom dimensions (Service Line, Page Type, Page Path, Form Type, Click Target, Phone Number, Destination URL).
- 8 custom events wired up (5 form-submit types + phone click + email click + book_intent).

**Meta Pixel, Microsoft Clarity, WhatConverts:**
- All firing on every page.
- Meta Pixel is using Advanced Matching via the hashed email/phone.
- Clarity is collecting heatmaps and session recordings.
- WhatConverts script is installed (phone-tracking number allocation is on your side — see Section 6 future items).

**BigQuery warehouse (`zapit-business-intelligence`, region australia-southeast1):**
- 12 datasets total (raw + staging + reporting + reserved shells for future sources).
- GA4 → BigQuery daily export active.
- Staging views compute intent-vs-confirmed lead classification in SQL — the top-line lead count never inflates from phone clicks.

**Reporting:**
- Looker Studio Page 1 (CEO Dashboard) built and live.
- Ownership transfers to your Google account after the walk-through.

### Coming later (planned but not live yet)

Each of these gets a matching page or panel added to the dashboard when it lands. No dashboard rebuild needed — the pattern is: new data source → new BigQuery staging view → new Looker Studio page.

- **Dashboard Pages 2-6** — Acquisition, Behaviour, Conversion Detail, Segments, Search Console. Build starts after your Page 1 approval.
- **WhatConverts phone tracking** — needs your OK on a Melbourne 03 forwarding number. Once set up + Australian carrier verification (24-48h), all phone leads get source attribution.
- **WhatConverts form ingest** — code is deployed and waiting on your WhatConverts API token (an env var flip in Netlify + redeploy = live).
- **Search Console** — activates when you add the TXT record at your domain registrar. Then the Search Console page in the dashboard shows queries + impressions + clicks + CTR.
- **GoHighLevel CRM ingest** — future block. Adds a "Sales Pipeline" page with deals, close rates, and revenue by source.
- **Zoom Phone call recordings + transcripts** — future block.
- **AI-generated insights** — future block. When it ships, the "Needs Attention" and "Anomalies" panels on Page 1 stop being simple SQL rules and start being AI-suggested. **Every AI-generated change requires your explicit approval before anything goes live** — that's built into how the data flows, not something we can accidentally bypass.
- **PostHog product analytics** — future block, for when you're ready to instrument the internal apps (Commercial Portal, CRM, technician portal).

### The AI approval workflow (in plain English)

Before any AI-generated change goes live — whether it's a content edit, an SEO recommendation, or a campaign tweak — you get a notification with the proposed change. You either approve it or reject it. Nothing ships without your explicit yes. This applies to every AI system we ever plug in, not just one specific vendor.

---

## Section 7 — When to call us + when you don't need to

**Apex (Sharjeel — `sharjeel@meetapex.ai`) — 30-day support included in the engagement letter:**

- Response same business day for critical issues (site down, analytics not firing).
- Response within 3 business days for questions or non-critical requests.
- Slack thread or email — either works.

### Reach out when

- Analytics stops firing (no events landing in GA4 or BigQuery).
- The dashboard shows a weird blank state or error you can't explain.
- A form submits but the lead doesn't reach WhatConverts.
- Meta Pixel, Clarity, or WhatConverts dashboards show no data for more than a day despite normal site traffic.
- You want to add a new event, form, or tracking dimension — we'll plan it with you so it fits the existing setup cleanly.
- You want to interpret a dashboard number and want a second opinion.

### You probably don't need us for

- Small copy edits or new content pages — Claude Code / Cursor can handle these against this codebase (see `AGENTS.md` for AI-editing conventions).
- Bookmarking or filtering the dashboard, changing your own view preferences.
- Adding new users to any of the accounts (see Section 4.1).
- Adding new marketing campaigns and tracking them with UTM parameters.

### After the 30-day support window

- Future blocks (WhatConverts phone tracking, GoHighLevel, Zoom, PostHog, AI layer) are separate engagements. Priced when scheduled.
- Ad-hoc help is billable at Apex's standard senior-engineering rate.
- The stack doesn't need ongoing maintenance — you can leave it running.

---

## Section 8 — Where to find more detail

All technical docs live under `docs/` in the GitHub repo (`github.com/zapitpest/zapit-website`).

**If you want to understand the project as a whole:**
- `docs/MVP_STATUS.md` — running log of everything built, in the order it was built.
- `README.md` (repo root) — architecture overview and setup.

**If you or a developer needs to make a change:**
- `AGENTS.md` (repo root) — rules for AI-assisted editing (Claude Code, Cursor).
- `docs/PROJECT_RULES.md` — guardrails for developers (what needs approval, what doesn't).
- `docs/ANALYTICS_ARCHITECTURE.md` — how data flows from the site through to BigQuery and the dashboard.

**If you need to deploy or recover from something breaking:**
- `docs/DEPLOYMENT_AND_DR.md` — deployment pipeline + disaster recovery scenarios.
- `docs/HOSTING_PORTABILITY.md` — migration paths if you ever change hosting provider.

**If you're planning a future block:**
- `docs/ADAM_15_SOURCES_ALIGNMENT.md` — the full map of every future data source and where it lands in BigQuery.
- `docs/POSTHOG_FUTURE_ARCHITECTURE.md` — architectural note for PostHog when you're ready to instrument internal apps.
- `docs/WHATCONVERTS_WIRING_PLAN.md` — the pre-built plan for WhatConverts form-tracking activation.

**Setup helpers for Adam:**
- `docs/SEARCH_CONSOLE_TXT_SETUP.md` — 5-minute walkthrough for adding the TXT record.
- `docs/HOSTING_DECISION_HELPER.md` — Cloudflare Pages vs Zap-It-owned Netlify comparison.
- `docs/FEATURE_PARITY_DECISION_HELPER.md` — the 290 old-URL redirect decisions boiled down to 5 questions.

**Transparency + billing:**
- `docs/MANUAL_WORK_AND_OVERTIME_LOG.md` — ledger of every absorbed or buffer-billed hour, so nothing about billing is a surprise.
- `docs/ENGAGEMENT_LETTER_REFERENCE.md` — in-repo copy of the v2 engagement letter for quick reference.

---

## Section 9 — Version history

| Date | Change |
|---|---|
| 18 Jul 2026 | First draft |
| 20 Jul 2026 | Sections 3, 6, 7, 8 filled out |
| 23 Jul 2026 | Sections 2, 4, 5 fully populated with practical steps · Section 6 rewritten in plain English · Section 1 refined for clarity |
| To be added at walk-through | Direct Looker Studio URL added once ownership transfers |

---

*This document is a living reference. If anything is unclear or missing at the walk-through, flag it and we'll fix it.*
