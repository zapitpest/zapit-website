# Zap It Pest & Termite Control — Website + Analytics Platform

Website + analytics platform for [Zap It Pest & Termite Control Melbourne](https://zapitpestmelbourne.com.au). The site handles marketing, SEO, lead capture. The analytics pipeline captures every visitor and lead, flows it into BigQuery, and surfaces it through a Looker Studio dashboard. Designed so future sources (CRM, ad platforms, AI insights) plug into the same warehouse without a rebuild.

---

## What this repo is

- **Marketing website** — Next.js 16 (App Router) static site with SEO-focused pages, service pages, dynamic suburb landing pages, contact form, and 58 curl-verified 301 redirects preserving old-WordPress SEO equity.
- **Analytics tracking** — GTM V3 container (14 tags) firing events into GA4, Meta Pixel (with Advanced Matching via SHA-256 hashed PII), Microsoft Clarity, and WhatConverts. Every email and phone number is SHA-256 hashed in the browser before anything leaves the visitor's device.
- **Data warehouse** — GA4 → BigQuery daily export into `zapit-business-intelligence` (region `australia-southeast1`), with 3 staging views + 5 CEO reporting views live, and 8 reserved dataset shells for future sources (WhatConverts, Zoom, GoHighLevel, Meta Ads, Google Ads, Clarity, AI-layer, Operational).
- **Reporting** — Looker Studio dashboard. Page 1 (CEO Dashboard) is built and live. Pages 2-6 (Acquisition, Behaviour, Conversion Detail, Segments, Search Console) are planned for build after Adam's sign-off.

---

## Tech stack

- **Framework:** Next.js 16 (App Router, static export via `output: 'export'`)
- **Language:** TypeScript strict mode
- **Styling:** Tailwind CSS v4 + brand tokens in `src/lib/constants.ts`
- **UI primitives:** `@base-ui/react`, `shadcn/ui` (only where needed)
- **Icons:** `lucide-react`
- **Analytics:** custom module in `src/lib/analytics/` with dataLayer helpers
- **Deployment:** Netlify (site is currently hosted on a temporary personal Netlify account. Permanent host — Cloudflare Pages or Zap-It-owned Netlify — is a pre-cutover decision; see `docs/HOSTING_DECISION_HELPER.md`)
- **Data warehouse:** Google BigQuery (project `zapit-business-intelligence`, region `australia-southeast1`)
- **Package manager:** npm

---

## Quick start (local development)

```bash
# 1. Clone the repo
git clone https://github.com/zapitpest/zapit-website.git
cd zapit-website

# 2. Install dependencies
npm install

# 3. Copy the env template and populate it
cp .env.local.example .env.local
# Edit .env.local with your values — see the "Environment variables" section below

# 4. Run the dev server
npm run dev

# 5. Open http://localhost:3000
```

Everything renders locally. GTM will attempt to load with the container ID you set (or fall back to the hardcoded default in `src/lib/constants.ts`). Analytics events fire but land in the staging GA4 stream, not production.

---

## Environment variables

All variables are documented in `.env.local.example`. Required for full functionality:

| Variable | Purpose | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO tags | Set to `https://zapitpestmelbourne.com.au` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | Zap It GTM account → Admin → Container ID (currently `GTM-PFGV87RB`) |
| `NEXT_PUBLIC_WHATCONVERTS_TOKEN` | WhatConverts Web Tracking API token | whatconverts.com → Settings → Tracking → API Access → generate write-only token |
| `NEXT_PUBLIC_WHATCONVERTS_PROFILE_ID` | WhatConverts profile ID | Numeric ID in the WhatConverts dashboard URL (currently `171358`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (if using Supabase for backend features) | Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) | Supabase project settings — treat as secret |

**Never commit `.env.local` to git.** It's already in `.gitignore`.

---

## Build + deploy

```bash
# Type-check (should return zero errors)
npx tsc --noEmit

# Lint (should pass without warnings on your code)
npm run lint

# Production build (static export into out/ directory)
npm run build
```

**Deployment:** every push to `main` triggers a Netlify auto-deploy in ~30 seconds. Build config lives in `netlify.toml`.

**Rollback:** Netlify dashboard → Deploys tab → find a previous good deploy → "Publish deploy". Instant rollback.

---

## Project structure

```
zapit-website/
├─ src/
│  ├─ app/                       # Next.js pages (App Router)
│  │  ├─ layout.tsx              # RootLayout — mounts ClickTracker + PageViewTracker + GTM
│  │  ├─ page.tsx                # Home page
│  │  ├─ [suburb]/               # Dynamic suburb landing pages
│  │  ├─ coburg/                 # Dedicated suburb pages (Coburg + Reservoir)
│  │  ├─ reservoir/
│  │  ├─ contact-us/
│  │  ├─ debug/analytics/        # QA tester page (?debug=tracking) — noindex
│  │  └─ …                        # Other routes (service pages, FAQ, about, etc.)
│  ├─ components/
│  │  ├─ layout/                 # Header, Footer, ClickTracker, PageViewTracker, AnalyticsDebugOverlay
│  │  ├─ sections/               # Page-level composed sections (ContactForm, SuburbLandingPage, etc.)
│  │  └─ ui/                     # Small primitives (buttons, cards, form inputs)
│  └─ lib/
│     ├─ analytics/              # dataLayer helpers, types, service-line detection, WhatConverts helper
│     ├─ constants.ts            # SITE_CONFIG, brand tokens, external URLs
│     └─ …
├─ public/
│  ├─ _redirects                 # Netlify 301 redirect rules (58 curl-verified)
│  └─ images/…
├─ sql/                           # BigQuery warehouse SQL (numbered execution order)
├─ scripts/
│  └─ bootstrap-bigquery.sh      # Idempotent BigQuery infrastructure setup
├─ docs/                          # All architectural + operational docs (see below)
├─ netlify.toml                  # Build config + security headers
├─ next.config.ts
├─ tsconfig.json
├─ AGENTS.md                     # AI-editor conventions (Claude Code, Cursor, Copilot, and future agents)
├─ CLAUDE.md                     # Alias to AGENTS.md
└─ package.json
```

---

## Documentation

Everything lives in `docs/`. **Read in this order** for a new team member or new AI editor:

**Start here:**
- `docs/MVP_STATUS.md` — single source of truth for what's built, in progress, and blocked
- `AGENTS.md` (root) — AI-editor conventions + edit rules

**Architecture + data:**
- `docs/ANALYTICS_ARCHITECTURE.md` — end-to-end analytics data flow (GTM → GA4 → BigQuery → Looker Studio)
- `docs/gtm-blueprint.md` — GTM container structure (variables, triggers, tags, custom dimensions)
- `docs/ADAM_15_SOURCES_ALIGNMENT.md` — 16-source future architecture map
- `docs/LOOKER_DASHBOARD_MOCKUP_v2_BUILD_SPEC.md` — dashboard blueprint (Adam-signed-off with 4 conditions)
- `sql/` — every warehouse view + reserved schema, fully commented

**Operational:**
- `docs/HANDOVER_RUNBOOK.md` — day-to-day operating runbook for the full stack
- `docs/PROJECT_RULES.md` — guardrails: what needs approval before shipping, testing requirements, critical decisions
- `docs/DEPLOYMENT_AND_DR.md` — deployment pipeline + disaster recovery runbooks
- `docs/HOSTING_PORTABILITY.md` — migration paths (Cloudflare Pages / Vercel / self-hosted)
- `docs/FEATURE_PARITY_AUDIT.md` — old-URL redirect coverage

**Future roadmap:**
- `docs/POSTHOG_FUTURE_ARCHITECTURE.md` — product-analytics layer for internal apps
- `docs/WHATCONVERTS_WIRING_PLAN.md` — WhatConverts form-wiring implementation (env-var driven, ready to activate)

**Reference:**
- `docs/ENGAGEMENT_LETTER_REFERENCE.md` — engagement letter v2 summary
- `docs/MANUAL_WORK_AND_OVERTIME_LOG.md` — hours + billing transparency ledger
- `docs/weekly-status/` — Friday status archive

---

## Analytics event contract

The dataLayer schema in `src/lib/analytics/types.ts` matches the BigQuery data contract. Changing an event's shape breaks downstream reporting silently — always coordinate the code + GTM blueprint doc + BigQuery view together.

**Events currently emitted:**

| Event | Trigger | Custom parameters |
|---|---|---|
| `page_view_context` | Every page view (via PageViewTracker) | service_line, page_type, page_path |
| `form_submit_contact` | ContactForm submit | service_line, page_type, page_path, form_type, user_email_hash, user_phone_hash |
| `form_submit_quote` / `_booking` / `_callback` / `_emergency` | Respective form submits (dead code until forms are mounted) | Same shape |
| `click_phone` | Any `tel:` link click | service_line, page_type, page_path, click_target, phone_number |
| `click_email` | Any `mailto:` link click | service_line, page_type, page_path, click_target, email_address |
| `book_intent` | Would fire on any `book.squareup.com` outbound click. Currently dormant because there are no Square links on the site — Adam removed the booking flow. Tag stays in place ready to activate if booking returns. | service_line, page_type, page_path, click_target, destination_url |

All PII is SHA-256 hashed at the browser edge (via inline Custom JS variables in GTM) before any tag fires. Raw email/phone never leaves the browser.

---

## Testing before deploying a change

```bash
# 1. Type-check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Production build
npm run build

# 4. Visual eyeball in dev
npm run dev
# → open http://localhost:3000 → click through affected pages

# 5. After Netlify deploys (30-60 sec after push to main)
# → curl the affected URL
curl -I https://zapitpestmelbourne.netlify.app/<path>
# → open in incognito, check DevTools Network for GTM/GA4/Pixel/Clarity/WhatConverts requests
```

For analytics changes:
1. Open Preview Mode in GTM (`tagmanager.google.com` → your container → Preview)
2. Point Preview at the staging URL
3. Perform the action you changed
4. Confirm the tag fires with correct parameters

---

## Getting help

**Apex AI (post-launch 30-day support included):**
- Sharjeel — `sharjeel@meetapex.ai`

**When to reach out:** analytics stops firing, dashboard shows unexpected state, form isn't reaching WhatConverts, or you want to plan a non-trivial change.

**When you probably don't need us:** small copy edits, adding new pages that follow existing patterns, adding users to third-party tools, changing your own dashboard filter preferences. AI-assisted editing (Claude Code, Cursor) can handle these confidently against this codebase — see `AGENTS.md`.

---

## License + ownership

Built by [Apex AI](https://meetapex.ai) for [Zap It Pest & Termite Control Melbourne](https://zapitpestmelbourne.com.au). Zap It owns 100% of the codebase, data, and configurations from day one per engagement letter v2. Apex retains collaborator access during MVP delivery; access transfers on final handover.
