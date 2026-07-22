# Project Rules & Guardrails

**Purpose:** consolidated rules for anyone — human developer, AI coding agent, or Zap It internal team — making changes to this repo or the surrounding analytics infrastructure. Non-negotiable safety rules first, then style + convention.

**Companion doc:** `AGENTS.md` (repo root) has AI-editor-specific patterns and prompt guidance. This doc is the general project rulebook; AGENTS.md is the AI-flavoured version.

---

## Non-negotiable rules (breaking any of these can cause client harm)

### R1. Never commit secrets

- No API tokens, credentials, `.env` files, or private keys in git — ever.
- `.env.local` is gitignored. Keep it that way.
- Use `NEXT_PUBLIC_*` env vars for client-side config; document them (without real values) in `.env.local.example`.
- If a secret accidentally lands in git history, treat it as compromised — rotate the credential immediately, then rewrite git history.
- **Never use `git add -A` or `git add .`.** Always add specific files by name.

### R2. Never send unhashed PII to a third party

All email + phone data is SHA-256 hashed at the browser edge (inline Custom JS variables in GTM V3) before any tag fires. This is a privacy + portability + Meta-Advanced-Matching guarantee. If a proposed change would break this invariant — send raw email or phone to any external service — the change is wrong. Redesign it to hash first.

Verify by inspecting GTM Preview Mode: dataLayer variables `dlv.user_email_hash` and `dlv.user_phone_hash` should always be 64-char hex strings before any tag fires.

### R3. Never change the analytics event contract without cross-file coordination

The dataLayer schema in `src/lib/analytics/types.ts` matches:
- GTM container variables + tags (`docs/gtm-blueprint.md`)
- BigQuery staging views (`sql/002_staging_views.sql`)
- Looker Studio dashboard widgets

Renaming a field or changing an event's shape in one place without updating the others breaks downstream reporting silently. If you need to change an event, update all four together in a single change + note it in `docs/MVP_STATUS.md`.

### R4. Never edit existing SQL scripts destructively

Every SQL file in `sql/` is numbered (`001_...`, `002_...`, `003_...`, `004_...`). New SQL goes in a new numbered file. Never modify an existing script in a way that would break re-runs. All scripts use `CREATE OR REPLACE VIEW` / `CREATE TABLE IF NOT EXISTS` for idempotency.

Never write destructive SQL (`DROP TABLE`, unqualified `DELETE`, `TRUNCATE`) without explicit user approval AND a backup consideration.

### R5. Never touch the redirects file without curl-verification

`public/_redirects` has 58 production redirects, each curl-verified live. A bad rule sends real customer traffic to a 404. Any change requires:
1. Test locally with `npx netlify dev` if possible
2. After Netlify deploys, `curl -I https://zapitpestmelbourne.netlify.app/<path>` and confirm HTTP 301 with correct destination
3. Update `docs/FEATURE_PARITY_AUDIT.md` if adding a new redirect category

### R6. Never bypass the AI-layer human-approval gate

Every row in `zapit_reserved_ai.ai_outputs`, `zapit_reserved_ai.ai_recommendations`, and any future AI-generated table has a `human_approval_status` NOT NULL field. Anything an AI agent writes to these tables gets `human_approval_status = 'pending'` by default. No AI-generated change ships until a human (Adam or an authorised approver) marks it `'approved'`. Applies to every AI agent, current or future — Hermes, Claude, Codex, or whatever comes next. This is Adam's hard rule. Don't work around it even if it seems convenient.

### R7. Client credential sessions require explicit written consent + audit log

If you need to log into a client's account (info@zapitpestmelbourne.com.au, Adam's Google account, etc.) to complete a task:
1. Get explicit written consent from the client first
2. Log the session start time + purpose in `docs/MVP_STATUS.md` change log
3. Perform ONLY the specific task consented to — no exploration
4. Sign out cleanly immediately after
5. Send a proactive heads-up message to the client confirming what was done
6. Remind the client to rotate their password (standard hygiene after any credential session)

Any deviation is a trust breach. Don't take shortcuts here.

---

## Changes that require explicit user approval before shipping

These need a human eye + explicit sign-off:

| Change type | Why | Who approves |
|---|---|---|
| **Copy on production pages** (suburb names, service descriptions, phone numbers, addresses, prices, guarantees) | Contractual promises to customers | Adam (or someone with Zap It authority) |
| **GTM tags, GA4 events, or BigQuery schema** | Analytics contract — silent breakage risk | Sharjeel (Apex) or authorised technical lead |
| **`public/_redirects`** | Real traffic routing | Sharjeel + curl verification post-deploy |
| **`netlify.toml` security headers** | Security posture change | Sharjeel |
| **`sql/*.sql` new files** | Warehouse structure change | Sharjeel + BigQuery admin review |
| **New reserved BigQuery datasets** | Data architecture change | Sharjeel + Adam if it affects future source planning |
| **`AGENTS.md` or `PROJECT_RULES.md` conventions** | Changes rules for future contributors | Sharjeel + Adam |
| **Any dependency addition or upgrade** | Supply-chain + build-break risk | Sharjeel review of package + license + install size |
| **Anything in the AI-layer approval workflow** | Human-approval gate integrity | Adam explicitly |

---

## Testing requirements before deployment

Every non-trivial change goes through this gate:

### Local

```bash
# 1. Type-check (must pass with zero errors)
npx tsc --noEmit

# 2. Lint (must pass without warnings on your code)
npm run lint

# 3. Production build (must complete without errors)
npm run build
```

If any of the above fails, the change is not ready. Don't push.

### Visual (for UI changes)

- Run `npm run dev` locally
- Click through the affected pages in the browser
- Verify the change looks correct at desktop + mobile viewport sizes
- Check the browser DevTools console for any new errors or warnings

### Analytics (for tracking changes)

- Open GTM Preview Mode (`tagmanager.google.com` → your container → Preview)
- Point Preview at the staging URL: `https://zapitpestmelbourne.netlify.app`
- Perform the action you changed
- Confirm the expected tag fires with the correct parameters
- Check GA4 DebugView (`analytics.google.com` → Admin → DebugView) — event should land within ~10 seconds with all custom dimensions populated

### Post-deploy (after Netlify auto-deploy completes, ~30-60 sec)

- Curl-verify affected URLs return HTTP 200 (or expected 301 for redirects)
- Load the page in incognito, check DevTools Network for successful loads of: `gtm.js`, GA4 `collect`, `fbevents.js`, Clarity, WhatConverts
- If it's a form change: submit a real test form + verify the lead appears in WhatConverts dashboard (once the token is configured)

---

## Critical architecture decisions (do not reverse without explicit discussion)

These decisions were made deliberately to protect the long-term platform. Reversing any of them creates significant technical debt.

### Static export mode (`output: 'export'` in `next.config.ts`)

The site builds to a static `out/` directory with no server runtime. This means:
- No API routes at runtime (client-side fetch to third parties instead)
- Any host that serves static files works (Netlify, Cloudflare Pages, Vercel, self-hosted nginx, S3+CloudFront, etc.)
- Zero server-side attack surface
- Free-tier hosting is genuinely viable at Zap It's scale

Switching to SSR or dynamic routes would break the deploy pipeline and lose the portability guarantee documented in `docs/HOSTING_PORTABILITY.md`.

### SHA-256 PII hashing at the browser edge

All email + phone are hashed in the browser via GTM Custom JS variables BEFORE any tag fires. This is why:
- Meta Pixel Advanced Matching works out of the box
- GDPR/AU privacy compliance risk is minimised
- We can port to any analytics platform later without changing the PII surface

Never send unhashed PII to any external service. See R2.

### BigQuery as the single source of truth

All analytics data — from GA4, WhatConverts, Meta Pixel, Clarity, future Zoom/GHL/PostHog — lands in BigQuery. Reporting reads from BigQuery. No vendor's dashboard is treated as the source of truth. This means:
- Zero lock-in to any specific analytics vendor
- Cross-source joins are always possible via the identity-stitching layer (`user_pseudo_id`, hashed email + phone)
- Historical data is preserved even if a vendor is switched or shut down

### Reserved dataset pattern for future sources

Each future data source has a reserved BigQuery dataset already provisioned (WhatConverts, Zoom, GHL, Meta Ads, Google Ads, Clarity, AI-layer, Operational + PostHog planned). Onboarding a new source means populating its reserved shell — never restructuring existing datasets.

See `docs/ADAM_15_SOURCES_ALIGNMENT.md` for the full map.

### Human-approval gate on all AI-generated actions

Every row in `zapit_reserved_ai.ai_outputs`, `zapit_reserved_ai.ai_recommendations`, and any future AI table has a `human_approval_status` field. Nothing implements without approval. Same rule applies to any AI agent — Hermes, Claude, Codex, future — the `source_agent` column tells you which agent produced it, but the approval requirement is the same regardless.

See R6.

### Client owns everything from day one

Under engagement letter v2, Zap It owns 100% of the codebase, GTM container, GA4 property, BigQuery project, and all configurations from the day they were created. Apex has collaborator access during MVP delivery, transferring cleanly at handover. No feature or configuration is "gated" behind Apex.

---

## Style + convention rules

### R8. Match existing patterns before inventing new ones

Before writing a new component, form, page, view, or SQL query — look for a similar one already in the codebase and copy its structure. Consistency matters more than personal preference.

### R9. TypeScript strict mode is non-negotiable

- No `any`, no `@ts-ignore`, no `!` non-null assertion without a justifying comment
- Every function has typed parameters + typed return (inference is OK if it's obvious)
- Every state variable has an explicit type if the initial value is ambiguous

### R10. Comment only WHY, never WHAT

Well-named identifiers explain the WHAT. Comments should surface non-obvious constraints, workarounds for specific bugs, or intent that a future reader wouldn't know just from reading the code. If removing a comment wouldn't confuse anyone, don't write it.

### R11. Brand colours come from `src/lib/constants.ts`

Common values: brand green `#1cdc38`, dark ink `#131a1c`, mid grey `#414042`, light border `#c8c8c8`. Never hardcode hex values in components — import from constants.

### R12. Tailwind utility classes over custom CSS

No CSS files added to the project. Extend the Tailwind config if you need a new token. Never use inline `style={}` unless a Tailwind class genuinely can't express what's needed.

---

## What to do when something goes wrong

### Site is down

1. Check Netlify dashboard → Deploys → is the latest deploy successful?
2. If not, revert to the previous good deploy from the Deploys tab (1-click rollback)
3. If the site's up but broken: check the browser console for errors + Netlify build log for warnings
4. Message Sharjeel with the details

### Analytics stopped firing

1. Load the site in incognito with DevTools Network open
2. Check `gtm.js` loads (200)
3. Open GTM Preview Mode + confirm tags are firing
4. Check GA4 DebugView for events landing
5. If nothing lands, check GTM container ID is correct (env var + fallback in `src/lib/constants.ts`)
6. Message Sharjeel with which layer broke (page load / GTM / GA4 / BQ)

### BigQuery bill went up unexpectedly

1. Open BQ Console → BigQuery → Job history
2. Look for jobs that scanned large amounts of data (>1TB scans should be rare)
3. Common causes: unfiltered `events_*` wildcard scan (should always have a date filter), someone querying raw GA4 export without date filter, Looker Studio dashboard with too-wide date range on expensive query
4. Message Sharjeel — we may need to add scan limits or scheduled query optimisation

### Someone accidentally committed a secret

1. Do NOT just `git rm` the file — history still has it
2. Rotate the credential immediately at the source (WhatConverts, Meta, Google Cloud, etc.)
3. Message Sharjeel to help rewrite git history + force-push the cleanup

### Redirect started sending traffic to a 404

1. Roll back the last deploy on Netlify immediately (1-click)
2. Curl-verify the affected URL is back to correct behaviour
3. Investigate what changed in `public/_redirects` and fix locally before redeploying

---

## Version history

| Date | Change |
|---|---|
| 20 Jul 2026 | First draft — consolidates rules from AGENTS.md + engagement letter + MVP_STATUS |
| 23 Jul 2026 | Updated R6 + critical architecture decisions after openclaw → ai dataset rename. Softened corporate phrasing in the AI approval rule. |
