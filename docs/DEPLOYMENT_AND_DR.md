# Deployment & Disaster Recovery Runbook

**What this covers:** how to deploy the site, how to roll back if something breaks, and step-by-step recovery for the common ways things go wrong. Every step below has been used or verified against the actual setup — nothing theoretical.

**Who this is for:** Adam and anyone at Zap It who might need to fix something urgently. Also useful for any developer or AI agent operating the stack later.

---

## 1. Deployment pipeline

### 1.1 How the site deploys

```
git push origin main
        │
        ▼
GitHub webhook fires
        │
        ▼
Netlify pulls latest commit
        │
        ▼
netlify.toml → runs `npm install` then `npm run build`
        │
        ▼
Next.js builds static site to out/ directory
        │
        ▼
Netlify publishes out/ to CDN (~30 sec end-to-end)
        │
        ▼
Live at https://zapitpestmelbourne.netlify.app (staging URL)
        │
        ▼
(post-cutover) Live at https://zapitpestmelbourne.com.au
```

### 1.2 Build configuration

Defined in `netlify.toml` at repo root:
- Build command: `npm run build`
- Publish directory: `out/`
- Node version: pinned to LTS
- Environment variables: set in Netlify dashboard → Site Settings → Environment

### 1.3 Environment variables (must be set in Netlify)

| Variable | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Canonical site URL |
| `NEXT_PUBLIC_GTM_ID` | ✅ | GTM container ID (currently `GTM-PFGV87RB`) |
| `NEXT_PUBLIC_WHATCONVERTS_TOKEN` | ⏳ (when token arrives) | Activates WhatConverts lead capture |
| `NEXT_PUBLIC_WHATCONVERTS_PROFILE_ID` | ⏳ (when set) | WhatConverts profile ID (`171358`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Supabase project URL if used |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase anon key if used |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Supabase service key — server-side only |

Trigger a redeploy after changing any env var (Netlify → Deploys → "Trigger deploy" → Deploy site).

### 1.4 Manual deploy trigger

If auto-deploy fails or a manual deploy is needed:

```bash
# From a machine with Netlify CLI installed + authenticated:
npm install
npm run build
npx netlify-cli deploy --prod --dir=out
```

Or from Netlify dashboard: Deploys → "Trigger deploy" → Deploy site.

### 1.5 Deploy verification (post-deploy checks)

After every deploy, run these smoke checks:

```bash
# HTTP 200 on home + key pages
curl -I https://zapitpestmelbourne.netlify.app/
curl -I https://zapitpestmelbourne.netlify.app/contact-us/
curl -I https://zapitpestmelbourne.netlify.app/coburg/

# Redirects still working (should return 301 with correct destination)
curl -I https://zapitpestmelbourne.netlify.app/pest-solutions/termite-control-melbourne/

# GTM container serving
curl -s https://zapitpestmelbourne.netlify.app/ | grep -o 'GTM-[A-Z0-9]*' | head -1
# Expected: GTM-PFGV87RB
```

Then in a browser (incognito), open DevTools Network tab + reload the site. Confirm these fire:
- `gtm.js` (200)
- `www.google-analytics.com/g/collect` or `stats.g.doubleclick.net/g/collect` (200)
- `www.facebook.com/tr` (Meta Pixel — 200)
- `www.clarity.ms/tag/xl7ljoavrz` (200)
- WhatConverts profile script (200)

---

## 2. Rollback

### 2.1 Instant rollback (Netlify — 1-click, ~5 sec)

1. Netlify dashboard → Site → Deploys tab
2. Find the last known-good deploy in the list
3. Click "Publish deploy" (or "Publish deploy" from the dropdown menu on that deploy)
4. Confirm — the previous deploy becomes live in seconds

**When to use:** the latest deploy broke something visible and you need to restore immediately. Zero-downtime rollback.

### 2.2 Git rollback (for correcting the actual source)

```bash
# Find the last known-good commit
git log --oneline

# Revert the bad commit (creates a new commit that undoes it)
git revert <bad-commit-sha>

# Push — triggers a fresh deploy
git push origin main
```

**When to use:** you've already used 2.1 to buy time, but you also want the git history to reflect the fix so the next deploy from `main` doesn't reintroduce the problem.

**Never `git reset --hard` + force-push to main.** Rewrites history for everyone, breaks other clones, and can lose work.

---

## 3. Disaster recovery scenarios

### 3.1 Site is down (Netlify returns error or 5xx)

**Symptoms:** users see error page, curl returns 5xx or connection error.

**Steps:**
1. Netlify dashboard → check overall Netlify status page (netlifystatus.com)
2. If Netlify is up but our site is down → Deploys tab → check latest deploy status
3. If latest deploy failed → click into it, read the build log for the error
4. Roll back to last successful deploy via §2.1
5. Fix the underlying issue locally + push a corrected commit

### 3.2 Netlify account issue or credit exhaustion

**Symptoms:** deploys blocked, dashboard shows "team credits exhausted" or a billing issue.

**Context:** the site currently runs on a temporary personal Netlify account. This is deliberate stopgap hosting while we wait for Adam to pick the permanent home (Cloudflare Pages or a Zap-It-owned Netlify — comparison in `docs/HOSTING_DECISION_HELPER.md`).

**Steps if it happens right now:**
1. First check Netlify's own status page (`netlifystatus.com`) — sometimes it's their side.
2. If our account is out of credits: the site keeps serving the last successful deploy (Netlify doesn't take down deployed sites when credits run out — it only blocks new builds). So no immediate customer impact.
3. To restore deploy capability quickly: spin up a fresh Netlify account (~5 min) or a Cloudflare Pages project (~15 min) — both work with our existing `_redirects` file and `netlify.toml` config with minimal edits. Migration steps in `docs/HOSTING_PORTABILITY.md`.
4. Long-term: schedule the permanent hosting migration Adam has queued.

### 3.3 DNS pointing to wrong host

**Symptoms:** `zapitpestmelbourne.com.au` doesn't resolve to our site, or resolves to the old WordPress site.

**Steps:**
1. Verify the DNS records at the registrar: A record should point to Netlify's load balancer, or the CNAME should point to our Netlify site (`zapitpestmelbourne.netlify.app`).
2. If DNS was recently changed and reverted accidentally: restore the correct record at the registrar.
3. Propagation takes up to 48h globally (usually much faster). Check with `dig zapitpestmelbourne.com.au` from multiple locations.
4. Coordinate with Adam via Slack for any registrar-level changes.

### 3.4 GTM container broken / analytics stops firing

**Symptoms:** GA4 DebugView shows no events despite site traffic, or Meta Pixel shows no PageViews.

**Steps:**
1. Verify GTM is loading: view page source, search for `GTM-PFGV87RB`. Should appear 3 times in the HTML.
2. Open GTM Preview Mode: `tagmanager.google.com` → container → Preview → point at staging URL.
3. Perform an action (page load, click phone link, submit form).
4. In Preview, check which tags fired / didn't fire. Look for errors in the Errors tab.
5. If a tag is misconfigured: fix in GTM, create a new version, publish.
6. If we need to roll back GTM: Container → Versions → find last known-good version → "Publish".

**Common causes:**
- Someone accidentally paused a tag in GTM
- A trigger's filter changed (e.g. `page_path contains /coburg` where it should be `equals /coburg`)
- A variable returning `undefined` breaking downstream tag firing

### 3.5 GA4 → BigQuery export stops

**Symptoms:** no new tables appear in `analytics_543350918` dataset for >24h.

**Steps:**
1. GA4 Admin → BigQuery Links → check status of the link. Should say "Link Created" (not "Error", not "Broken").
2. If broken: check whether the GCP project has BigQuery API enabled + billing linked.
3. If billing was accidentally unlinked: Adam needs to re-link his billing account at the GCP project level.
4. Google typically catches up on missed exports within 3 days of the underlying issue being fixed.

### 3.6 BigQuery bill spike

**Symptoms:** unexpected charge from Google Cloud, or BQ Console shows large recent scans.

**Steps:**
1. BigQuery Console → Job history → sort by "Bytes processed" descending
2. Identify the job(s) that scanned large amounts (>100GB unusual for our scale, >1TB requires investigation)
3. Common causes:
   - Someone ran an unfiltered `events_*` wildcard scan (should always have a date filter)
   - Looker Studio dashboard set to an overly wide date range on an expensive view
   - Scheduled query firing more often than expected
4. Fix: add date filters to the offending queries, add `TABLE_SUFFIX` filters to wildcard scans, reduce Looker Studio default date ranges.
5. Preventative: set a project-level query size limit (Console → IAM → Custom Quotas) — recommended limit: 1TB/day for a small business.

### 3.7 Credential compromise

**Symptoms:** someone reports suspicious activity in GTM, GA4, WhatConverts, Meta Business Manager, or Google Cloud.

**Steps:**
1. **Immediately** rotate the affected credential at its source (change password, revoke API tokens, invalidate sessions).
2. Enable 2FA if not already on.
3. Review audit logs to understand the scope of the compromise.
4. Message Sharjeel + Adam with a summary within 1 hour of discovery.
5. If a client credential was compromised: notify Adam within 1 hour + help him rotate + document in `docs/MVP_STATUS.md`.

**Preventative:**
- Never commit secrets to git (see `docs/PROJECT_RULES.md` R1)
- Rotate `info@zapitpestmelbourne.com.au` password after any credential session (standard hygiene — Apex will remind Adam whenever a credential session happens)
- Use environment variables for all client-side + server-side secrets, never hardcode

### 3.8 Accidental deletion of BigQuery datasets or tables

**Symptoms:** a dataset or table that should exist is missing.

**Steps:**
1. BigQuery has undelete capability within 7 days. BQ Console → the parent dataset (if still exists) → "Show deleted tables" → restore.
2. If beyond 7 days: check Google Cloud Storage for any exported backup files (we don't currently export automated backups — recommend adding this as a future improvement).
3. Worst case: re-run the SQL scripts in order to recreate empty views:
   ```bash
   bq query --use_legacy_sql=false --location=australia-southeast1 < sql/001_create_datasets.sql
   bq query --use_legacy_sql=false --location=australia-southeast1 < sql/002_staging_views.sql
   bq query --use_legacy_sql=false --location=australia-southeast1 < sql/003_reserved_schemas.sql
   bq query --use_legacy_sql=false --location=australia-southeast1 < sql/004_ceo_dashboard_views.sql
   ```
4. Raw GA4 export data (`analytics_543350918`) is created automatically by Google — if deleted, GA4 recreates on next daily run (but historical data before deletion is lost).

**Preventative future improvement:** enable scheduled BigQuery exports to Google Cloud Storage as a nightly backup. ~15 min setup, protects against accidental deletion permanently. Recommended as a Phase 4 hardening item.

### 3.9 GitHub repository issue

**Symptoms:** git push blocked, or repo shows suspicious activity.

**Steps:**
1. Check GitHub status page (githubstatus.com)
2. If Zap It's GitHub account is compromised: change password + revoke all OAuth tokens + rotate SSH keys
3. If the repo itself needs restoration: GitHub keeps activity history + branch backups. In extreme cases, `git clone` from any local machine that has the repo restores everything except the most recent uncommitted work.

### 3.10 Third-party service outage (GTM / GA4 / Meta / Clarity / WhatConverts)

**Symptoms:** one specific service isn't collecting data despite site working.

**Steps:**
1. Check the service's status page (status.google.com, developers.facebook.com/status, etc.)
2. If they're down: nothing to do — data collection resumes when they're back. The site itself works fine.
3. If they're up but not receiving our data: check GTM Preview Mode to see if the tag fires; check DevTools Network tab to see if the beacon reaches them.
4. GA4 and BigQuery export are independent — even if Meta Pixel breaks, GA4 events + BQ export continue.

---

## 4. Credential recovery

If someone loses access to a critical account:

### GTM (Google Tag Manager)
- Access via `tagmanager.google.com`
- Owner: Zap It Google account (`info@zapitpestmelbourne.com.au`)
- Editors: `sharjeel@meetapex.ai` (Container Administrator, Publish role)
- Recovery: if the Zap It Google account is locked out, Google's account recovery process. Sharjeel retains publish access.

### GA4
- Access via `analytics.google.com`
- Property: "Zap It Production" (`G-YRVHNE66GH`)
- Recovery: same as GTM — via the Zap It Google account.

### Google Cloud (BigQuery project `zapit-business-intelligence`)
- Access via `console.cloud.google.com`
- Owner: Zap It Google account
- Editor: `sharjeel@meetapex.ai`
- Recovery: same Google account recovery. Sharjeel has Editor role so can read + write data even if Owner locked out.

### Netlify
- Access via `netlify.com/login`
- Currently on `Sharjeel-Saleem-06's team` (temporary stopgap)
- Recovery: migrate to Zap-It-owned Netlify or Cloudflare Pages as planned in `docs/HOSTING_DECISION_HELPER.md`.

### WhatConverts
- Access via `app.whatconverts.com`
- Owner: Zap It (Master Account)
- Recovery: password reset via email verification.

### Microsoft Clarity
- Access via `clarity.microsoft.com`
- Owner: Zap It Microsoft account
- Recovery: Microsoft account recovery.

### Meta Business Manager
- Access via `business.facebook.com`
- Owner: Adam (Zap It)
- Recovery: Meta Business Manager recovery flow.

### GitHub repo
- Access via `github.com/zapitpest/zapit-website`
- Owner: `zapitpest` (Zaydan's personal GitHub, owned by Zap It)
- Collaborator: `sharjeel@meetapex.ai`
- Recovery: GitHub account recovery.

---

## 5. Backup strategy

### 5.1 Code

- Every commit is in git (github.com/zapitpest/zapit-website)
- Every developer clone is a full backup
- Netlify keeps the last 10 successful deploys forever (roll back at any time)

### 5.2 Data

- Raw GA4 export goes to BigQuery daily — permanent, 3-year retention set on all datasets (per data contract v4)
- No user-uploaded data on the site (no forms save to a database currently; WhatConverts holds lead data)
- WhatConverts retains lead data per their retention policy (checkable in their dashboard)

### 5.3 Configuration

- GTM: keep versioned (every publish creates a version, roll back via GTM UI)
- GA4: configuration is stored by Google, no manual backup needed
- BigQuery views: source-of-truth in `sql/` folder in the repo (recreatable from scratch)
- Netlify: config in `netlify.toml` (in git) + environment variables (screenshot for backup — never commit values)

### 5.4 Recommended future improvement

- Nightly BigQuery export to Google Cloud Storage as JSONL for the last 90 days of raw + staged data. Protects against accidental deletion permanently. Setup effort: ~15 min. Adam sign-off needed before setup because it slightly increases GCS storage cost.

---

## 6. Emergency contacts

**Primary technical contact (Apex, post-launch 30-day support included):**
- Sharjeel — `sharjeel@meetapex.ai`
- Response window: same business day for critical issues

**Adam (Zap It) — for anything requiring client-side account access:**
- Email + Slack (existing channel)

**GCP / Google Ads billing:**
- Adam's Google Cloud billing account

**Domain registrar:**
- Wherever `zapitpestmelbourne.com.au` is registered (Adam has details)

---

## 7. Runbook version history

| Date | Change |
|---|---|
| 20 Jul 2026 | First draft — deploy pipeline + DR scenarios + credential recovery + backup strategy |
| 23 Jul 2026 | Polished tone on Section 3.2 (hosting stopgap), Section 3.7 (credential preventative), opening summary. Facts unchanged; language less corporate. |
