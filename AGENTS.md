<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI-Editor Conventions for This Repo

> Rules and conventions for AI-assisted editing sessions (Claude Code, Cursor, Copilot, and future AI agents). Follow these to keep the codebase clean and safe.

## Stack summary

- **Framework:** Next.js 16 (App Router, static export via `output: 'export'`)
- **Language:** TypeScript strict mode (`"strict": true`)
- **Styling:** Tailwind CSS v4 + brand tokens in `src/lib/constants.ts`
- **Icons:** `lucide-react`
- **Analytics:** custom module `src/lib/analytics/` — helpers: `trackFormSubmit`, `trackClickPhone`, `trackClickEmail`, `trackBookIntent`, `submitLeadToWhatConverts`
- **Deployment:** Netlify (`npm run build` → publish `out/`)
- **Package manager:** npm
- **Static export** means no runtime server code. No API routes, no server actions in production. Client-side fetch to third parties (WhatConverts) is the pattern.

## Repo layout (top-level)

- `src/app/` — Next.js pages (App Router)
- `src/components/layout/` — Header, Footer, ClickTracker, PageViewTracker, AnalyticsDebugOverlay
- `src/components/sections/` — page-level composed sections (ContactForm, SuburbLandingPage, etc.)
- `src/components/ui/` — small primitives
- `src/lib/analytics/` — dataLayer helpers, types, service-line detection, WhatConverts helper
- `src/lib/constants.ts` — SITE_CONFIG, brand tokens, external URLs
- `public/_redirects` — Netlify 301 redirect rules (58 live, curl-verified)
- `sql/` — BigQuery warehouse SQL (numbered execution order)
- `docs/` — architectural + operational docs
- `netlify.toml` — build config + security headers

## Rules for AI edits

### Correctness

1. **Preserve the analytics contract.** The GTM dataLayer schema in `src/lib/analytics/types.ts` matches the BigQuery data contract (`docs/gtm-blueprint.md`). Changing a field name or event shape breaks downstream reporting silently. If genuinely needed, update the type + the GTM blueprint doc + note it in `docs/MVP_STATUS.md` together.
2. **Static export means no server code at runtime.** Don't propose `route.ts` API handlers, server actions, or `getServerSideProps` — none of those run in production.
3. **TypeScript strict.** No `any`, no `@ts-ignore`, no `!` non-null assertion without justification. Types are the safety net against AI-introduced errors.
4. **Idempotent SQL.** Every SQL file uses `CREATE OR REPLACE VIEW` / `CREATE TABLE IF NOT EXISTS`. Never write destructive SQL (DROP, unqualified DELETE) without explicit user approval.

### Style

5. **Match existing patterns before inventing new ones.** If a similar component exists (e.g. `ContactForm.tsx` for the form pattern, `SuburbLandingPage.tsx` for the page pattern), copy its shape rather than diverging.
6. **Tailwind utility classes over custom CSS.** No CSS files added; extend Tailwind config if you need a new token.
7. **Brand colours come from `src/lib/constants.ts`.** Common: brand green `#1cdc38`, dark ink `#131a1c`, mid grey `#414042`, light border `#c8c8c8`. Don't hardcode hex values in components — use the palette.
8. **Minimal comments.** Comment only WHY (non-obvious constraints), never WHAT (well-named identifiers explain that).

### Safety

9. **Never commit secrets.** No API tokens, no credentials, no `.env` files in git. Use `NEXT_PUBLIC_*` env vars for client-side config; document them in `.env.local.example` without real values.
10. **Never use `git add -A` or `git add .`.** Always add specific files by name — prevents accidentally committing secrets or generated artefacts.
11. **Don't edit existing `sql/` scripts destructively.** New SQL goes in a new numbered file (`005_...`, etc.), not by modifying existing files.
12. **Analytics events cannot break silently.** If an event's schema changes, the code MUST still emit a valid dataLayer push (empty params if data missing) so tracking is never blackholed.

### Client-facing changes (need explicit user approval before shipping)

13. **Copy on production pages** — suburb names, service descriptions, phone numbers, addresses, prices, guarantees. These are contractual promises to the client's customers.
14. **GTM tags, GA4 events, or BigQuery schema** — these ARE the analytics contract. Silent breakage risk is high.
15. **The redirects file (`public/_redirects`)** — each rule was curl-verified live; a bad rule sends real traffic to a 404.

### Verification (run after edits)

16. `npx tsc --noEmit` — should pass with zero errors.
17. `npm run build` — should complete without errors (~30-60 sec).
18. For UI changes — describe the change in plain English + show the diff before pushing.
19. For redirect changes — curl the affected URLs after Netlify deploys to confirm HTTP 301 with correct destination.

## Common tasks — where to start

| Task | Start file / dir |
|---|---|
| Change copy on a page | `src/app/<route>/page.tsx` or `src/components/sections/<name>.tsx` |
| Add a new service page | Follow existing pattern in `src/app/<service-name>/page.tsx` |
| Add a new form field | Modify the form component in `src/components/sections/` + update `trackFormSubmit` if analytics-relevant |
| Add a new redirect | `public/_redirects` (Netlify format) — curl-verify after deploy |
| Change site-wide config | `src/lib/constants.ts` |
| Add a new GA4 event | Update `src/lib/analytics/types.ts` + `dataLayer.ts` + `docs/gtm-blueprint.md` |
| Change security headers | `netlify.toml` |
| Add a new BigQuery view | New file `sql/00N_<name>.sql` — run in BQ Console after review |

## Prompt patterns that work well

- **"Match the existing pattern in [file]"** — anchor the AI to a known-good example
- **"Don't change [X, Y, Z]"** — protect specific fields (analytics events, redirects, brand tokens)
- **"Add [feature]. Update types, dataLayer helper, and the GTM blueprint doc together"** — force cross-file consistency
- **"Show me the diff before writing"** — review-first workflow
- **"After the change, run `npx tsc --noEmit` and `npm run build`"** — verification baked in

## What NOT to have the AI do

- Config changes to third-party accounts (GTM, GA4, WhatConverts, Meta Business Manager, Clarity, Netlify, GCP) — these are UI clicks in external tools, not codebase edits. AI can help draft the plan; execution should be human-supervised.
- Production database schema changes — always review + explicit approval.
- DNS or hosting migrations — high blast radius, needs a human on the line.
- Anything that would send unhashed client PII to a third party — we hash at the browser edge; breaking that invariant is wrong.

## Reference documentation

Read first in any new session:
- `docs/MVP_STATUS.md` — single source of truth for current state
- `docs/HANDOVER_RUNBOOK.md` — operational runbook
- `docs/gtm-blueprint.md` — GTM container blueprint
- `docs/ADAM_15_SOURCES_ALIGNMENT.md` — 16-source future architecture map
- `sql/` README — SQL file execution order
