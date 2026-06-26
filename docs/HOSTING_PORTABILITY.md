# Hosting Portability Guide

**Status:** The rebuilt site is fully portable. It is currently hosted on Netlify for the MVP build phase, with planned migration to a Zap-It-owned Netlify account before DNS cutover (per the engagement plan). However, the codebase has zero hosting-vendor lock-in and can be migrated to any static hosting provider with minimal effort if priorities ever change.

This document records exactly what is portable, what is Netlify-specific, and how to migrate to alternative hosts.

---

## What the audit found (2026-06-27)

We ran the following checks across the codebase:

| Check | Result |
|---|---|
| Netlify-specific imports in `src/` | ✅ ZERO |
| Netlify-specific env vars in source code (`NETLIFY`, `CONTEXT`, etc.) | ✅ ZERO |
| Netlify packages in `package.json` dependencies | ✅ ZERO |
| `next.config.ts` uses portable Next.js APIs only | ✅ Yes — `output: 'export'` is standard Next.js |
| Static export builds anywhere | ✅ Yes — `npm run build` produces a self-contained `out/` directory |

**The only Netlify-specific files in the entire repository:**

1. `netlify.toml` — Netlify build config + plugin reference + security headers
2. `public/_redirects` — Netlify-format redirects file

Both are simple, well-documented files. Migration is straightforward.

---

## How to migrate the site to a different host

### Option A — Cloudflare Pages (easiest migration)

Cloudflare Pages natively supports the **same `_redirects` format** as Netlify. This is the lowest-friction migration path.

Steps:

1. In Cloudflare dashboard → Pages → Create project → connect to the GitHub repo
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: leave default
3. Environment variables:
   - `NEXT_PUBLIC_GTM_ID` — same value as on Netlify
4. The existing `public/_redirects` file works as-is. **No changes needed.**
5. For security headers: rename `netlify.toml` headers section into a `public/_headers` file using the [Cloudflare Pages `_headers` format](https://developers.cloudflare.com/pages/configuration/headers/) — also compatible with the Netlify format.
6. Point DNS to Cloudflare instead of Netlify.

Expected migration effort: 30 minutes.

### Option B — Vercel

Vercel doesn't support Netlify's `_redirects` format. Redirects need to be converted to Vercel's `vercel.json`.

Steps:

1. Create `vercel.json` at repo root with `rewrites` and `headers` arrays. Sample conversion script is below.
2. Build settings:
   - Framework: Next.js
   - Build command: `next build`
   - Output directory: `out`
3. Set `NEXT_PUBLIC_GTM_ID` env var.
4. Vercel handles the `output: 'export'` static export automatically.

Conversion of a single Netlify redirect:

```
# Netlify _redirects format:
/pest-solutions/termite-control-melbourne    /termite-control-melbourne    301

# Vercel vercel.json equivalent:
{
  "redirects": [
    {
      "source": "/pest-solutions/termite-control-melbourne",
      "destination": "/termite-control-melbourne",
      "permanent": true
    }
  ]
}
```

Expected migration effort: 2-3 hours (conversion script can automate most of the 56 redirects).

### Option C — Generic static host (AWS S3 + CloudFront, Azure Static Web Apps, Firebase Hosting, etc.)

The static export in `out/` can be uploaded to any storage bucket and served by any CDN.

Steps:

1. Run `npm run build` locally — produces `out/` directory
2. Upload `out/` contents to your storage host (S3 bucket, Azure blob, Firebase Hosting, etc.)
3. Configure redirects at the CDN layer:
   - **CloudFront**: CloudFront Functions or Lambda@Edge for the redirect rules
   - **Azure**: `staticwebapp.config.json` with `routes` array
   - **Firebase**: `firebase.json` with `redirects` array
4. Configure security headers at the CDN layer
5. Point DNS to the new host

Expected migration effort: 4-6 hours including testing.

### Option D — Self-hosted (nginx, Apache, Caddy)

Static files served via any web server.

Steps:

1. Run `npm run build` — produces `out/`
2. Configure your web server to serve `out/` as the document root
3. Translate redirect rules to your web server's syntax (sample nginx below)

```nginx
# nginx — single redirect example
location = /pest-solutions/termite-control-melbourne {
    return 301 /termite-control-melbourne;
}
```

Expected migration effort: 6-8 hours depending on existing infrastructure.

---

## Why we picked Netlify for the build phase

- Free for the build/iteration phase (no cost during MVP development)
- GitHub auto-deploy out of the box — no CI/CD setup needed
- `_redirects` and `netlify.toml` are simple, declarative, no platform lock-in beyond two files
- Plays well with Next.js static export
- Easy to migrate AWAY from later (this document is proof)

---

## Why this matters for the MVP

Zaydan asked specifically about avoiding vendor lock-in in the architecture discussion (see `docs/MVP_STATUS.md` change log, 2026-06-19). The same principle applies to hosting:

- **Code:** lives in Zaydan's own GitHub repository — 100% portable
- **Build:** standard Next.js static export — portable to any static host
- **Redirects:** declarative files, easy to convert
- **Analytics data:** lives in Zaydan's own BigQuery — 100% portable
- **GA4 + GTM:** under Zaydan's Google account ownership — portable across hosting changes

Hosting is the easiest layer to swap. The site is built such that switching hosts is a 30-minute task (Cloudflare Pages path) up to a full day's work (self-hosted nginx). No code rewrites required.

---

## Sample _headers file (for Cloudflare Pages compatibility)

If migrating to Cloudflare Pages, drop this `_headers` file in `public/` to replace the `netlify.toml` `[[headers]]` block:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  X-DNS-Prefetch-Control: on
```

Note: HSTS is set automatically by Cloudflare for HTTPS sites — same as Netlify.

---

## TL;DR

| Layer | Portable? | Effort to swap |
|---|---|---|
| Code (Next.js app) | ✅ Yes | Zero |
| Build process (`npm run build`) | ✅ Yes | Zero |
| Static output (`out/`) | ✅ Yes | Zero |
| `_redirects` file | ✅ Yes (same format on Cloudflare Pages) | Zero for Cloudflare; minor conversion for Vercel/CDN |
| Security headers | ✅ Yes (declarative, easy to translate) | ~30 min |
| Auto-deploy from GitHub | ✅ Yes (any modern host supports this) | Per-host config |
| Domain DNS | ✅ Yes (Zap-It-owned at registrar) | Just point DNS at new host |

Bottom line: the rebuilt site has no meaningful hosting lock-in. The only thing tying it to Netlify is two small declarative config files.
