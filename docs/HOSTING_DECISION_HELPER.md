# Hosting Platform Decision — Cloudflare Pages vs Zap-It-owned Netlify

**Purpose:** short comparison to help Adam decide the permanent hosting platform for `zapitpestmelbourne.com.au` after DNS cutover.

**Audience:** Adam. Non-technical framing intentional — the technical migration details are already in [docs/HOSTING_PORTABILITY.md](HOSTING_PORTABILITY.md).

**Timing:** decide before DNS cutover. Not urgent — dashboard build proceeds regardless.

---

## Executive summary — one paragraph

Both platforms serve the site identically to end users (same Netlify-format redirects, same static build, same performance). The choice is about **ownership**, **long-term cost**, and **who administers what**. **Cloudflare Pages is my recommendation for Zap It's long-term needs** — it's free forever at your scale, Zap-It-owned from day one, includes native CDN + DDoS protection + edge caching for free, and matches your stated preference for open standards and minimal vendor lock-in. Zap-It-owned Netlify is fine too, but has monthly bandwidth limits and a paid-tier upsell path that Cloudflare doesn't.

---

## Side-by-side comparison

| Dimension | Cloudflare Pages | Zap-It-owned Netlify |
|---|---|---|
| **Cost at Zap It's traffic level** | Free (permanent, unlimited requests + bandwidth) | Free tier: 100 GB/mo bandwidth + 300 build min/mo. Beyond that = paid tier ($19/user/mo starter) |
| **Ownership** | Under Adam's Cloudflare account | Under Adam's Netlify account |
| **DNS integration** | Native — if you also move DNS to Cloudflare, everything managed in one place | Separate — DNS lives at registrar, Netlify points to it |
| **CDN + DDoS protection** | Built-in, worldwide edge, free | Netlify has CDN too, but simpler; no free DDoS mitigation |
| **Redirects (58 currently live)** | Zero change — same `_redirects` file works as-is | Zero change — same `_redirects` file works as-is |
| **Security headers (6 currently live)** | Small format tweak (netlify.toml → `_headers` file, ~10 min work) | Zero change — `netlify.toml` works directly |
| **Analytics integration (GTM, GA4)** | Zero change — pure static, all trackers server-agnostic | Zero change |
| **SSL / HTTPS** | Free, auto-renewing, no config | Free, auto-renewing, no config |
| **Deploy from GitHub** | Native (same as Netlify) | Native — you already have this on the current Netlify |
| **Preview deploys per PR** | Yes, free | Yes, but counts against free-tier build minutes |
| **Vendor lock-in** | Minimal (Cloudflare is open standards) | Minimal (Netlify is open standards) |
| **Migration effort from current setup** | ~30 min | ~15 min (already on Netlify, just move ownership) |
| **Long-term platform risk** | Cloudflare has strong stability + free tier consistency | Netlify has been pivoting toward paid pricing tiers over the years |

## Concrete cost projection

Assuming Zap It's traffic grows to ~10,000 unique visitors/month (rough estimate for a Melbourne pest control site):

| Platform | Monthly cost | 12-month cost |
|---|---|---|
| Cloudflare Pages | $0 | $0 |
| Zap-It-owned Netlify (Free tier) | $0 while under 100 GB/mo bandwidth | $0 IF traffic stays low |
| Zap-It-owned Netlify (Starter paid tier if bandwidth exceeded) | $19/user/mo | $228/year |

Cloudflare's ceiling is essentially never reached for a site of your scale.

---

## Why I recommend Cloudflare Pages

Three main reasons:

1. **Matches your stated architectural preferences.** You told me on 18 Jul: "*Please continue favouring: Open standards · APIs · Webhooks · JSON · BigQuery as the system of record · Minimal vendor lock-in.*" Cloudflare Pages sits closer to this ethos than Netlify's proprietary features (Netlify Functions, Netlify Forms, Netlify Analytics — you don't need any of these, but they represent lock-in you'd bypass anyway).

2. **Zero-cost permanence.** Cloudflare's free tier for Pages has been unchanged since 2021 and covers unlimited requests/bandwidth for static sites. Netlify's free tier bandwidth is metered — as traffic grows or you add ad campaigns driving spikes, you eventually hit the paid tier. Cloudflare doesn't have that ceiling.

3. **Consolidation opportunity.** If you also move DNS to Cloudflare (which is free and takes ~10 minutes), you get single-pane-of-glass management for DNS + hosting + SSL + firewall + edge caching. Reduces vendor count from 2 (registrar + Netlify) to 1 (Cloudflare) for the whole public-web layer. Cleaner ops.

## When Zap-It-owned Netlify would be the right call instead

Only if:
- You already have a Netlify Pro/Team plan you're paying for (avoids duplicate spend)
- You want to use Netlify Forms or Netlify Functions later (you don't currently — WhatConverts handles forms, we're not using serverless functions)
- You strongly prefer the Netlify dashboard UI (personal preference)

Otherwise, Cloudflare is objectively better for Zap It's needs.

---

## Effort to execute either option

Both are ~30-45 minutes of my time + minimal on your side.

### If you choose Cloudflare Pages
- ~10 min your side: create Cloudflare account (if not already), connect your Cloudflare account to the GitHub repo
- ~30 min my side: set up the Pages project, migrate redirects (works as-is) + security headers (format tweak), verify build pipeline, run 24-test regression suite against the new URL, prep DNS switch
- Then: DNS cutover on your scheduled date (5-10 minutes of coordinated switching)

### If you choose Zap-It-owned Netlify
- ~10 min your side: create Netlify account (if not already), connect it to the GitHub repo, transfer domain ownership from the current sharjeel-personal Netlify project
- ~15 min my side: transfer ownership + verify build + regression suite
- Then: DNS cutover on your scheduled date

---

## Recommendation summary

**Cloudflare Pages.** Free forever, better long-term architectural fit, consolidates DNS + hosting, matches your open-standards ethos. But if you have strong existing familiarity with Netlify or already run a paid Netlify plan, that's a valid alternative — the site behaves identically either way.

**Whichever you pick — just let me know, and I'll execute the migration in the same session as DNS cutover.**
