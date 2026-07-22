# Search Console TXT Record — One-Pager for Adam

**Purpose:** zero-friction path for verifying `zapitpestmelbourne.com.au` in Google Search Console when you're ready. Activates Page 6 of the Looker Studio dashboard + unlocks organic search performance data in BigQuery.

**Time on your side:** ~5 minutes total (~2 min in Google Search Console + ~2 min at your registrar + ~1 min back to confirm).

**Not urgent** — doesn't block dashboard build or DNS cutover. Just leaves Page 6 empty until done.

---

## Why we need it

Search Console tells you which Google search queries drive traffic to your site — indispensable for the SEO half of your central-BI vision. Once verified:

- **Immediate:** query-level search performance data starts flowing (impressions, clicks, CTR, average position).
- **Within ~48h:** BigQuery Search Console linkage can be set up → data joins into the dashboard.
- **Ongoing:** page 6 of the dashboard shows top queries + CTR + position — feeds into Q3 "which marketing channels are performing best" on the CEO Page 1 too.

---

## Step-by-step — what you do

### Step 1 — Add the domain in Google Search Console

1. Go to `https://search.google.com/search-console/welcome`
2. Log in with the Google account that already owns your GA4 property (Zap It Google account — same one for the GA4 property `Zap It Production`, since Search Console links cleanly to that GA4 property)
3. Click **Add property**
4. Choose **Domain** (left column, not URL prefix)
5. Enter: `zapitpestmelbourne.com.au`
6. Click **Continue**
7. Google shows you a TXT record to add — it looks like `google-site-verification=<long random string>`. **Copy the entire value.**

### Step 2 — Add the TXT record at your domain registrar

Depends on where you bought `zapitpestmelbourne.com.au` — likely Crazy Domains, GoDaddy, Namecheap, or similar.

**Generic steps (adapt to your registrar):**

1. Log into your registrar dashboard
2. Find `zapitpestmelbourne.com.au` in your domain list → **Manage** or **DNS Settings**
3. Look for **DNS records** or **Zone editor**
4. Add a new record:
   - **Type:** TXT
   - **Name / Host:** `@` (means "root domain") — some registrars want you to leave this blank instead
   - **Value / Content:** paste the `google-site-verification=...` string from Step 1
   - **TTL:** default (usually 3600 or "Automatic")
5. Save

### Step 3 — Verify in Search Console

1. Return to the Search Console tab (still open from Step 1)
2. Click **Verify** on the domain-add screen
3. If DNS has propagated: instant ✅ green success.
4. If not yet propagated: wait 5-30 minutes, click Verify again. TXT records usually propagate quickly but can take up to 24h in worst cases.

### Step 4 — Tell me it's done

Send me a quick "Done" or a screenshot of the green-verified Search Console dashboard. I'll then:
1. Link Search Console → BigQuery (auto-exports search data daily)
2. Add the Search Console data source to the Looker Studio dashboard
3. Page 6 activates with real data — usually within 24-48h of the link.

---

## Common gotchas (and how to handle)

| Issue | Cause | Fix |
|---|---|---|
| "TXT record not found" after clicking Verify | DNS propagation lag | Wait 30 min, retry. If still failing after 24h, message me — I'll help debug |
| Multiple TXT records at root domain conflict | Some registrars only allow one root TXT | Add the Search Console record as an *additional* record, not a replacement — most registrars support multiple root TXTs |
| Registrar shows "Value must not contain equals sign" | Some registrars have strict input | Wrap the value in double quotes: `"google-site-verification=..."` |
| Search Console asks for "URL prefix" verification instead | You clicked the wrong option | Delete and restart, choose **Domain** verification (left column) — it's more powerful |
| Property already exists under a different Google account | Someone else verified it in the past | If Adam is the owner, sign in with that account. If unknown, contact me — we can add you as an additional owner |

---

## What activates once verified

Once Search Console is live for ~24-48h and I've linked it to BigQuery:

1. **New BigQuery dataset:** `zapit_raw_search_console` starts populating with daily Search Console exports (dataset shell already provisioned)
2. **New Looker Studio page:** Page 6 of the dashboard activates with:
   - Top search queries by clicks
   - Top search queries by impressions
   - Click-through rate trends
   - Average position over time
   - Queries by device (mobile vs desktop)
   - Country + region breakdown

Zero additional work needed from you post-verification.

---

## Summary

- **Your effort:** ~5 minutes
- **When:** whenever convenient — non-urgent
- **What it unlocks:** SEO performance data in the dashboard + long-term central-BI vision alignment
- **My effort after:** ~30 minutes to link + activate Page 6

**Just message me when the TXT is verified in Search Console and I'll take it from there.**
