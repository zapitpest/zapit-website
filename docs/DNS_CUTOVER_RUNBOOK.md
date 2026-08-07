# DNS Cutover Runbook

**Status:** Runbook drafted. Awaiting Cloudflare Pages verified working + Adam scheduling.
**Owner:** Apex during MVP with Adam on the line; Zap It after handover.
**Last updated:** 2026-08-07

---

## What this runbook does

Moves live traffic for `zapitpestmelbourne.com.au` (and `www.zapitpestmelbourne.com.au`) from the current DNS target (temporary Apex Netlify) to the new Cloudflare Pages hosting. Adam should be on the line for this because it is the highest blast-radius change we make in the whole MVP.

Zero downtime expected if executed as described.

---

## Pre-cutover checklist (do this before scheduling the window)

- [ ] `CLOUDFLARE_PAGES_MIGRATION.md` has been executed — Cloudflare Pages project exists and the `pages.dev` preview URL passes all verification checks
- [ ] Feature parity 290-URL redirects have been reviewed and approved by Adam and are live in `public/_redirects`
- [ ] Search Console TXT verification is complete and Search Console is linked to BigQuery
- [ ] The Cloudflare Pages custom domain for `zapitpestmelbourne.com.au` has been added (Step 5 of the migration runbook) — Cloudflare has told you what DNS records to point at it
- [ ] Adam has confirmed the cutover window (recommended: outside business hours, a weekend, or an evening)
- [ ] You have 30 minutes minimum blocked out to execute
- [ ] You have a real-time channel open with Adam (WhatsApp, phone, or email refresh every 5 min)

---

## Freeze window (three days before cutover)

To keep the change simple to reason about, freeze the following for the three days leading up to cutover:

- No new deploys to the Netlify stopgap
- No changes to `public/_redirects`
- No GTM container changes (avoid a race where the cutover happens mid-GTM-preview)
- No GA4 property changes

If a bug fix genuinely needs to ship in that window, deploy to Cloudflare Pages preview first, verify, then to Netlify. Never Netlify-only during the freeze.

---

## Cutover procedure

### Step 1 — Confirm the target DNS records (5 min)

From the Cloudflare Pages project → Custom domains tab → click on `zapitpestmelbourne.com.au`. Cloudflare shows the DNS records to add. Typically:

- **Root domain (`zapitpestmelbourne.com.au`):** CNAME to `zapit-website.pages.dev` (Cloudflare may show a flattened A record instead — either works if Cloudflare manages the DNS)
- **`www.zapitpestmelbourne.com.au`:** CNAME to `zapit-website.pages.dev`

Copy the exact record values Cloudflare shows.

### Step 2 — Take a "before" snapshot (5 min)

Before touching DNS, capture the current state:

1. From your terminal:
   ```
   dig zapitpestmelbourne.com.au +short
   dig www.zapitpestmelbourne.com.au +short
   ```
   Save the output. This is what to revert to if something breaks.
2. Note the current DNS TTL. If it's high (like 3600 seconds = 1 hour), consider lowering it to 60 seconds a few hours BEFORE the cutover so that if you have to roll back, propagation is fast.

### Step 3 — Log the audit entry

Before making any DNS change, record:
- Timestamp
- Change being made (source → target)
- Who authorised it (Adam confirmed on [date])
- Rollback plan reference (this runbook)

Save this to `docs/AUDIT_LOG.md` or your session notes.

### Step 4 — Update the DNS records (10 min)

At the DNS provider (Cloudflare DNS, GoDaddy, Namecheap, or wherever Adam has the domain):

1. Log in as Adam (or with delegated access)
2. Find the `zapitpestmelbourne.com.au` DNS zone
3. Update:
   - Root A/CNAME record → point at Cloudflare Pages target
   - `www` CNAME record → point at Cloudflare Pages target
4. Save
5. **Do not delete the old Netlify records yet** — just replace their targets. If DNS supports two records for the same host, keep the old one temporarily as a fallback.

### Step 5 — Watch propagation (5-30 min)

Cloudflare Pages verifies the domain automatically once DNS resolves to it. Watch:

1. Cloudflare Pages → Custom domains tab → status should flip from "Setting up" → "Active" within 5 to 15 minutes
2. From your terminal, poll:
   ```
   dig zapitpestmelbourne.com.au +short
   ```
   Should show the Cloudflare Pages target within 5-10 minutes if TTL was lowered, or up to an hour otherwise
3. From an incognito browser: `https://zapitpestmelbourne.com.au` should load the site served by Cloudflare Pages

### Step 6 — Verify the cutover (10 min)

Run through the full verification checklist:

- [ ] Home page loads
- [ ] `/contact-us` loads and the form submits successfully (verify a test form_submit_contact fires in GA4 DebugView)
- [ ] Suburb pages load (spot-check 5 random ones from the 231 catalogued)
- [ ] Old blog URLs return 301 (spot-check 5 random ones from the 59 catalogued)
- [ ] Security headers present (browser DevTools → Network → any request → check `X-Frame-Options`, `Referrer-Policy`)
- [ ] GTM tag loads (view page source → search for `GTM-PFGV87RB`)
- [ ] Google Search Console can access the site (re-verify domain if needed)
- [ ] Site works on mobile (test on a real device)
- [ ] SSL certificate is valid and Cloudflare-issued (browser padlock icon)

### Step 7 — Announce internally

Send Adam a short "cutover complete" note:

> Cutover complete. Site is now served from Cloudflare Pages at zapitpestmelbourne.com.au. All checks green: pages load, form submits captured in GA4, redirects working, SSL valid, security headers present. Monitoring for the next 3 days before decommissioning Netlify.

---

## Rollback procedure (if anything breaks)

If ANY of the Step 6 verification checks fails or you see traffic errors:

### Fast rollback (DNS-level, 1-5 min):

1. Go back to the DNS provider
2. Revert the DNS records to the "before" snapshot from Step 2
3. Save
4. Wait 1-5 min for propagation
5. Verify with `dig zapitpestmelbourne.com.au +short` that it points at the old Netlify target again
6. The site is now served by the old Netlify stopgap again

### Investigate the failure

While the DNS rollback protects live traffic, debug the Cloudflare Pages issue at your leisure using the `pages.dev` preview URL. Once fixed, re-attempt Step 4.

---

## Post-cutover monitoring (3 days)

For the 3 days after cutover:

- Check GA4 real-time reports daily — traffic should be normal
- Check BigQuery daily export — data should still land
- Check Search Console for any crawl errors
- Monitor Cloudflare Pages dashboard for build failures or unusual response codes

If all clean at day 3, proceed to decommission the Netlify stopgap.

---

## Decommission the Netlify stopgap (day 3 or later)

1. Log into Apex Netlify
2. Find the `zapit-website` project
3. Pause auto-deploys (in case anything is still connected)
4. Wait another 4 days at "paused" state as a final safety buffer
5. Delete the project

Confirm no billing impact on Apex Netlify. Update `HANDOVER_RUNBOOK.md` to reflect Cloudflare Pages as sole production hosting.

---

## Version history

- **2026-08-07** — Initial runbook drafted. Prep-only; execution waits on Cloudflare Pages migration completion, feature parity redirects approval, and Adam's cutover-window scheduling.
