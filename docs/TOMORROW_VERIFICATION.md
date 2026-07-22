# Tomorrow (17-18 Jul 2026) — Verification & Phase 3 Kickoff Runbook

**Purpose:** step-by-step for verifying the analytics stack is healthy after the 24-48h propagation window, then kicking off Phase 3.

**Timing:** first BQ export is expected between **late evening 2026-07-17 (AEST)** and **morning 2026-07-18 (AEST)**, depending on when GA4's overnight batch runs. If nothing has landed by end of day 2026-07-18, escalate.

**Rule:** do each step in order. If any step fails, STOP and message me — don't force-fix.

---

## Step 0 — Seed the empty events (do this TODAY, 1 min)

Five custom events haven't fired yet (`click_email`, `form_submit_quote`, `form_submit_booking`, `form_submit_callback`, `form_submit_emergency`). We need them to appear in the BigQuery export so Section 9 and 10 of the dashboard render non-empty.

**How:**
1. Open in browser: `https://zapitpestmelbourne.netlify.app/debug/analytics?debug=tracking`
2. You'll see a hidden QA tester page with buttons for every event shape.
3. Click each button once — should be 8 total buttons.
4. In the debug overlay (bottom of page) you'll see each event fire. Confirm.
5. Close browser.

That's it. All 8 events now seeded into the daily export → dashboard will render properly on day one.

---

## Step 1 — Verify BigQuery daily export landed (tomorrow morning)

**Where:** `https://console.cloud.google.com/bigquery` (log in as sharjeel@meetapex.ai — you have Editor role on the project).

**What to check:**
1. Select project `zapit-business-intelligence` from the project switcher.
2. In the left panel, look for a **new dataset** that appeared overnight. It'll be named `analytics_<9-digit-property-id>` — for example `analytics_367891234`. This is created by GA4 automatically, not by us.
3. Expand that dataset. You should see:
   - `events_YYYYMMDD` — the daily export table for the previous day.
   - `events_intraday_YYYYMMDD` — the live table updating throughout today.
4. Click `events_YYYYMMDD`. Preview shows one row per event.

**If not landed:** wait another 12h. GA4 documents up to 72h for the first export in some accounts. If still nothing after 72h from link creation (2026-07-16 evening), open the BigQuery Links page in GA4 Admin and check status — it should still say "Link Created" (not "Error").

**Copy this down:** the exact dataset name (e.g. `analytics_367891234`) — I need it for Step 4.

---

## Step 2 — Verify Meta Pixel receiving events

**Where:** `https://business.facebook.com/events_manager2/` (log in as Adam, or Adam grants you Pixel access).

**What to check:**
1. Select the "Zap It Pest Control Melbourne" pixel (ID `1088414402938841`).
2. **Overview tab:** should show non-zero PageView events in the last 24h.
3. **Test events tab:** enter `https://zapitpestmelbourne.netlify.app` as the test URL. Load the URL in another tab. Within ~30 sec you should see:
   - `PageView` — from `tag.meta.pixel_base`
   - `Lead` — only if you submit a form during the test
   - `Contact` — only if you click a phone/email link during the test
4. Click through a few pages + a phone link + submit the contact form. Confirm all three events appear.

**Expected screenshot to save:** the "Test events" panel showing `PageView`, `Lead`, `Contact` firing with the correct event parameters.

**If failing:** most common cause is Pixel base tag not firing before Lead/Contact. Check GTM Preview mode — `tag.meta.pixel_base` should fire on All Pages, and Lead/Contact should have "Fire before this tag: tag.meta.pixel_base" configured (tag sequencing).

---

## Step 3 — Verify Microsoft Clarity dashboard

**Where:** `https://clarity.microsoft.com/projects/view/xl7ljoavrz/dashboard`

**What to check:**
1. Log in with the Microsoft account Adam used to create the Clarity project.
2. Dashboard should show non-zero sessions in the last 24h.
3. Left nav → **Recordings** — should list at least a handful of session recordings from real visitors + your own testing.
4. Left nav → **Heatmaps** — pick the home page. If enough sessions have landed, you'll see click/scroll/area heatmaps.

**If failing:** Clarity typically shows the "ALMOST THERE!" banner if it hasn't received any hits. Load the staging site in a fresh incognito browser and refresh a few times — sessions should appear within ~5 min.

---

## Step 4 — Fix the SQL dataset-name mismatch (~5 min)

**This is the one real gotcha I flagged in the mockup §7.1.** Do it before Step 5.

1. Take the dataset name you copied in Step 1 (e.g. `analytics_367891234`).
2. Open `sql/002_staging_views.sql` in the repo.
3. Find line 51:
   ```sql
   FROM `zapit-business-intelligence.zapit_raw_ga4.events_*`;
   ```
4. Replace `zapit_raw_ga4` with your actual dataset name:
   ```sql
   FROM `zapit-business-intelligence.analytics_367891234.events_*`;
   ```
5. Save. Commit with message: `sql: point stg_events at actual GA4 export dataset`.

**Why we didn't hardcode this upfront:** GA4 auto-generates the property-ID suffix at first export creation. We couldn't know it in advance.

---

## Step 5 — Run `sql/002_staging_views.sql` (~2 min)

**Where:** the BigQuery Console query editor (same URL as Step 1).

**How:**
1. Open the SQL Workspace: BigQuery Console → SQL Workspace (blue "+" or `Compose new query`).
2. Copy-paste the entire updated `sql/002_staging_views.sql` file contents (all three CREATE VIEW statements) into the editor.
3. Click **Run**. Should complete in ~5 seconds.
4. Left panel → expand `zapit-business-intelligence` → `zapit_staging` → should see three new views: `stg_events`, `stg_sessions`, `stg_leads`.
5. Smoke-test each:
   ```sql
   SELECT COUNT(*) AS row_count FROM `zapit-business-intelligence.zapit_staging.stg_events`;
   SELECT COUNT(*) AS row_count FROM `zapit-business-intelligence.zapit_staging.stg_sessions`;
   SELECT COUNT(*) AS row_count FROM `zapit-business-intelligence.zapit_staging.stg_leads`;
   ```
   All three should return non-zero counts (won't be huge on day 1, but not zero).
6. Preview a sample row:
   ```sql
   SELECT * FROM `zapit-business-intelligence.zapit_staging.stg_leads` LIMIT 10;
   ```
   Confirm `service_line`, `page_type`, `form_type`, `click_target` columns are populating (not all NULL).

**If a view fails to create:** most likely reason is line 51 dataset name still wrong. Double-check Step 4.

**Alternative: `bq` CLI from your terminal.**
```bash
cd /Users/muhammadsharjeel/Documents/Apex/Zap/zapit-website
bq query --use_legacy_sql=false --location=australia-southeast1 < sql/002_staging_views.sql
bq query --use_legacy_sql=false --location=australia-southeast1 \
  'SELECT COUNT(*) FROM `zapit-business-intelligence.zapit_staging.stg_events`'
```

Either method works — Console is easier for a one-off run.

---

## Step 6 — Send the Looker mockup to Adam for pre-approval

**Where:** normal Slack/email channel.

**What to send:** attach or paste-link `docs/LOOKER_DASHBOARD_MOCKUP_v1.md`. Suggested message:

> Hi Adam — quick pre-build check-in.
>
> The full analytics stack is live end-to-end (GTM V3, GA4, Meta Pixel, Clarity, WhatConverts) and the first BigQuery daily export has now landed [attach a screenshot of the analytics_XXX dataset if convenient]. I've drafted the executive dashboard mockup based on your Message 3 direction — the 13 sections you asked for (visitors, sources, device split, service page perf, form submits, phone conversions, conversion rates, top landing pages, search performance (Phase 3 add), Commercial vs Residential, Termite vs General, monthly trends, leads by source), all in one polished dashboard.
>
> Attached is the mockup with wireframes for every section, the design system (typography, palette, card treatment), and the exact data source mapping. Before I start the build, can you confirm this matches what you had in mind? Any section you'd add, remove, or re-order?
>
> Once you sign off, build is ~4-5h and I'll walk you through it on a screenshare before ownership handover.

**Do not start the actual build until Adam replies.** This is the pre-approval gate he explicitly requested.

---

## Step 7 — Update MVP_STATUS

After Steps 1-5 complete, update `docs/MVP_STATUS.md`:
- Mark row 3.1 (Run `sql/002_staging_views.sql`) as ✅ done with date.
- Add change log entry describing Step 4 SQL fix + Step 5 view creation.
- Update Phase 3 completion % (should tick up ~10-15%).
- Commit + push.

---

## Step 8 — What to do while waiting for Adam's dashboard sign-off

Non-blocking things I can pick up in parallel:
- Draft the handover runbook skeleton (`docs/HANDOVER_RUNBOOK.md`).
- Prep the WhatConverts form-wiring code change (1h — needs to happen before DNS cutover regardless).
- Draft the Search Console TXT-record instruction email for Adam.
- Draft this week's Friday status (17 Jul is Fri — 6-field format).

Don't start the dashboard build itself until Adam signs off.

---

## Cheat sheet — what needs Adam vs what I can do alone

| Task | Needs Adam? | Blocking? |
|---|---|---|
| Steps 0-5 (seed events, verify, run SQL) | No | No |
| Step 2 Meta Events Manager verification | Yes (grant Pixel view access to my meetapex.ai account) OR he confirms from his end | Soft — can verify from his end via screenshot |
| Step 3 Clarity dashboard verification | Yes (grant view access) OR he confirms from his end | Soft — same |
| Step 6 mockup pre-approval | Yes | HARD — build waits |
| Search Console TXT record | Yes | Soft — Section 13 stays empty otherwise |
| Password rotation on info@ | Yes | Not blocking, hygiene |
| WhatConverts phone number allocation | Yes (needs decision on Melbourne 03 forwarding) | Soft — phone data section stays sparse |
| Feature Parity 231 suburb + 59 blog URLs | Yes | HARD before DNS cutover, not before dashboard |
| Hosting migration target (Cloudflare Pages vs Adam's Netlify) | Yes | HARD before DNS cutover, not before dashboard |
| DNS cutover schedule | Yes | HARD before Phase 3 close, not before dashboard |

---

## Summary — what "success tomorrow" looks like

By EOD 2026-07-18 we should have:
- ✅ BigQuery `analytics_XXX` dataset populated with day-1 events.
- ✅ SQL 002 dataset name fixed + views live in `zapit_staging`.
- ✅ Three staging views returning non-zero rows.
- ✅ Meta Pixel + Clarity both confirmed collecting.
- ✅ Mockup sent to Adam for sign-off.
- ✅ MVP_STATUS updated with Phase 3 kickoff.

Then: wait for Adam's mockup sign-off → build the dashboard → screenshare walk-through → ownership handover.
