# Cloudflare Pages Migration Runbook

**Status:** Prep complete. Awaiting Adam Cloudflare account access before execution.
**Owner:** Apex during MVP; Zap It after handover.
**Last updated:** 2026-08-07

---

## What this runbook does

Moves the Zap It website from the temporary Apex Netlify hosting to permanent Cloudflare Pages hosting under Zap It's own Cloudflare account. Zero downtime expected. Full rollback plan included.

Adam confirmed Cloudflare Pages as the hosting choice on 1 August 2026.

---

## Why Cloudflare Pages

- Same static export contract as Netlify (both read `_headers` and `_redirects` files natively)
- Free tier fits Zap It's traffic profile with generous headroom
- Fastest CDN across Australia
- Zero code changes required to migrate
- Meets the same data security posture as our current stopgap

---

## Pre-flight checklist

Before executing this migration, confirm:

- [ ] Adam has a Cloudflare account (or will create one at cloudflare.com)
- [ ] Adam has added `sharjeel@meetapex.ai` as a Team Member with **Super Administrator** or **Pages** role on the Cloudflare account
- [ ] The Zap It GitHub repo (`github.com/zapitpest/zapit-website`) is accessible for Cloudflare Pages to connect to
- [ ] All environment variables from Netlify are documented (see env vars section below)
- [ ] The current Netlify stopgap is still live and serving traffic (DO NOT delete it until Cloudflare Pages is verified working)

---

## Environment variables to migrate

Copy these from the current Netlify project into the new Cloudflare Pages project.

| Variable | Purpose | Value source |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | GTM container ID for GA4, Meta Pixel, Clarity tags | `GTM-PFGV87RB` |
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for SEO tags + canonical links | `https://zapitpestmelbourne.com.au` (or preview URL during test phase) |

**Not needed post the 5 Aug 2026 WhatConverts decision:**

- `NEXT_PUBLIC_WHATCONVERTS_TOKEN` — not used (form tracking is on the paid tier)
- `NEXT_PUBLIC_WHATCONVERTS_PROFILE_ID` — not used

---

## Build configuration

| Setting | Value |
|---|---|
| Framework preset | None (or "Next.js (Static HTML Export)" if listed) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | (leave blank — repo root) |
| Node.js version | `20` (set as environment variable `NODE_VERSION=20`) |

The site is a Next.js static export (`output: 'export'` in `next.config.ts`), which produces the `out/` directory at build time. No server-side runtime is required.

---

## Step-by-step execution

### Step 1 — Create the Cloudflare Pages project

1. Log into `dash.cloudflare.com` with the Zap It Cloudflare account
2. Left sidebar → **Workers & Pages**
3. Click **Create application** → **Pages** → **Connect to Git**
4. Authorise Cloudflare to access `github.com/zapitpest`
5. Select the `zapit-website` repository
6. Click **Begin setup**

### Step 2 — Configure the build

1. Project name: `zapit-website` (or `zapit-website-production` if you want to distinguish from preview builds)
2. Production branch: `main`
3. Framework preset: leave as "None" — we set build settings manually
4. Build command: `npm run build`
5. Build output directory: `out`
6. Root directory (Advanced): leave blank
7. Environment variables:
   - Add `NEXT_PUBLIC_GTM_ID` = `GTM-PFGV87RB`
   - Add `NEXT_PUBLIC_SITE_URL` = `https://zapitpestmelbourne.com.au`
   - Add `NODE_VERSION` = `20`
   - Add `NEXT_TELEMETRY_DISABLED` = `1` (matches current Netlify config, prevents Next.js phoning home)
8. Click **Save and Deploy**

### Step 3 — Wait for the first build

Build takes ~2 to 3 minutes. If it fails:
- Check the build log for the error message
- Common issues: Node version mismatch (should be 20), missing env var, stale `package-lock.json`
- Rollback: this is a fresh Cloudflare project — no impact on the current live Netlify site

### Step 4 — Verify the preview URL works

Cloudflare Pages gives you a URL like `zapit-website.pages.dev`. Test it end to end:

1. Open the preview URL in an incognito window
2. Every page should load — homepage, `/contact-us`, `/coburg/`, `/reservoir/`, `/pest-control/`, service pages
3. Confirm GTM fires — open browser DevTools → Console → look for `dataLayer` push events
4. Confirm the tracking script for WhatConverts loads (network tab → look for the `171358.js` load)
5. Test the contact form submission:
   - Fill in name/email/phone
   - Submit
   - GA4 DebugView should show the `form_submit_contact` event within seconds
6. Verify redirects: `https://zapit-website.pages.dev/pest-control-albert-park/` should 301 to the mapped target
7. Verify security headers: browser DevTools → Network → click any request → Headers tab → confirm `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` present

If any check fails, do not proceed to DNS cutover. Debug on the preview URL first.

### Step 5 — Add the custom domain (do NOT switch DNS yet)

1. In the Cloudflare Pages project → **Custom domains** tab
2. Click **Set up a custom domain**
3. Enter `zapitpestmelbourne.com.au` (the target production domain, matching `SITE_CONFIG.url` in `src/lib/constants.ts`)
4. Cloudflare will guide you through DNS setup — see `DNS_CUTOVER_RUNBOOK.md` for the actual cutover procedure

**Note:** at this stage the domain is added but not live. DNS cutover happens in a separate scheduled window per the DNS runbook.

### Step 6 — Confirm both platforms in parallel

For the transition period, both the Apex Netlify preview and Cloudflare Pages preview should be serving identical content. Do a spot-check side by side:
- Same pages
- Same headers
- Same redirects
- Same tracking

Cloudflare Pages is now ready for DNS cutover. Proceed to `DNS_CUTOVER_RUNBOOK.md` for the actual go-live procedure.

---

## Files in the repo that make this work

- `public/_headers` — security headers, portable format read by both Cloudflare Pages and Netlify
- `public/_redirects` — 301 redirect rules, portable format read by both platforms
- `next.config.ts` — `output: 'export'` produces static build to `out/`
- `package.json` — `npm run build` script produces the output
- `netlify.toml` — retained as reference during the transition period (can be deleted after Netlify stopgap is decommissioned)

---

## Rollback plan

If Cloudflare Pages has any issue post-cutover:

1. **DNS-level rollback (fastest):** revert the DNS records to point back at the Netlify stopgap. Cloudflare TTL is typically 60 to 300 seconds, so rollback takes 1 to 5 minutes.
2. **Cloudflare Pages rollback (per-deploy):** Cloudflare Pages keeps every deployment; you can promote any prior deployment as production. Deploys → click a prior deployment → **Promote to production**.
3. **GitHub rollback (source-level):** if a code change caused the issue, revert the commit on `main`. Cloudflare Pages auto-rebuilds and redeploys within ~2 min.

---

## Post-cutover cleanup

Once Cloudflare Pages has been serving production for 3 days with zero issues:

1. Decommission the Apex Netlify stopgap — free up credit
2. Delete unused environment variables from the Netlify project
3. Update `HANDOVER_RUNBOOK.md` to reflect Cloudflare Pages as the current hosting
4. Optionally delete `netlify.toml` from the repo (keep `_headers` and `_redirects` which work on both)

---

## Cost forecast

- Cloudflare Pages free tier: 500 builds per month, unlimited requests, unlimited bandwidth for the Zap It traffic profile
- Expected monthly cost: **$0**
- Netlify stopgap cost while dual-running: ~$5-10 per week until decommission

---

## Sources

- [Cloudflare Pages `_headers` file syntax](https://developers.cloudflare.com/pages/configuration/headers/)
- [Cloudflare Pages framework guides — Next.js static export](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- Adam's 1 August 2026 email confirming Cloudflare Pages as hosting choice

---

## Version history

- **2026-08-07** — Initial runbook created. Prep complete for the migration execution once Adam grants Cloudflare account access.
