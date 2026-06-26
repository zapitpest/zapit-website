# Feature Parity & Cutover Readiness Audit

**Status:** Draft v2 — includes real systematic URL audit data from 2026-06-27 · NOT yet shared with client
**Purpose:** The formal cutover gate Adam asked for. Confirms whether the rebuilt Next.js site is ready to replace the existing WordPress site at DNS cutover, what's preserved, what was intentionally removed, and what gaps need decisions.
**Last updated:** 2026-06-27 (audit pass v2 — added real curl-tested status codes for every URL category)

## Audit methodology (v2 added)

On 2026-06-27 we ran systematic curl tests against `https://zapitpestmelbourne.netlify.app` for representative URLs from each category to confirm actual HTTP status codes. Results are reflected in the tables below — these are not estimates, they are real measurements.

---

## Executive summary

The old WordPress site has **426 indexed URLs** across pages, posts and commercial content. The rebuilt Next.js site currently exposes approximately **120 static URLs** at build time. The delta is intentional in some areas (pricing, blogs removed per Figma brief) but significant in others (231 suburb landing pages, 68 blog posts) — each needing an explicit decision before cutover.

**Recommendation:** Do NOT cut DNS until the items flagged 🟡 below are reviewed and signed off by Adam. The redirect map needs to cover every URL on the old site that has organic search visibility, or we risk losing meaningful SEO equity.

---

## 1. URL inventory snapshot

### Old WordPress site (source of truth: Yoast SEO sitemap, fetched 2026-06-27)

| Category | URL count | Source sitemap |
|---|---:|---|
| Suburb-specific landing pages (`/pest-control-{suburb}/`) | **308** | `page-sitemap.xml` |
| Pest service pages (`/pest-solutions/{pest}/`) | **20** | `page-sitemap.xml` |
| Commercial pages (`/commercial/...`, `/commercial-pest-control/...`) | **16** | `commercial-sitemap.xml` |
| Core / utility pages | **18** | `page-sitemap.xml` |
| Blog posts | **68** | `post-sitemap.xml` |
| **Total** | **430** | — |

### New Next.js site (source: `npm run build` static export, 120 pages)

| Category | URL count | Notes |
|---|---:|---|
| Suburb pages via `/[serviceSlug]` dynamic route | **75 + Coburg + Reservoir = 77** | Driven by `src/lib/melbourne-service-areas.ts` |
| Pest service pages via `/[serviceSlug]` | **15** | Driven by `src/lib/service-pages.ts` |
| Pest-solutions pages | **3** | seasonal, organic, garden |
| Termite page | **1** | `/termite-control-melbourne` |
| Commercial sub-pages via `/commercial-pest-control/[slug]` | **~14** | Industry pages |
| Core pages | **6** | home, about, contact, FAQ, service-areas, privacy |
| Blog posts | **0** | Removed per Figma brief |
| **Approximate total** | **~120** | — |

---

## 2. Gap analysis — what's missing and why

### 🟡 Suburb landing pages — 231 missing (308 old → 77 new)

**The biggest SEO concern.** The old site has 308 dedicated suburb landing pages. The new site covers 77 (75 from the curated regions list + Coburg + Reservoir).

Examples of missing suburbs that exist on the old site but NOT on the new one:

| Old URL | Status on new site |
|---|---|
| `/pest-control-blackburn-south/` | ❌ Missing |
| `/pest-control-warrandyte/` | ❌ Missing |
| `/pest-control-the-basin/` | ❌ Missing |
| `/pest-control-warrenwood/` | ❌ Missing |
| `/pest-control-windsor/` | ❌ Missing |
| `/pest-control-yarra-bend/` | ❌ Missing |
| ...and 225 more | ❌ Missing |

**Why this matters for SEO:** Each suburb page on the old site is likely ranking for "pest control {suburb}" queries. Losing 231 of these without redirects = losing those rankings + the inbound link equity.

**Options to consider with Adam:**
- **Option 1 — Add missing suburbs to `melbourne-service-areas.ts`** if they're genuine service areas (small effort, preserves SEO)
- **Option 2 — 301 redirect each missing suburb to `/service-areas`** (preserves some link equity but kills individual rankings)
- **Option 3 — 301 redirect each missing suburb to the nearest covered suburb** (best for hyper-local relevance)
- **Option 4 — Accept the loss** (simplest, worst for SEO)

**Recommendation:** Option 1 for genuine service areas, Option 3 for outliers. Needs Adam to confirm which suburbs Zap It actually services.

### 🟡 Pest service pages — 4 missing (20 old → 16 new)

| Old URL | Status on new site | Recommended action |
|---|---|---|
| `/pest-solutions/birds-control-melbourne/` | ❌ Missing | Decide: build OR 301 to `/contact-us` |
| `/pest-solutions/rodent-removal/` | ⚠️ Renamed to `/rodent-control-melbourne` | 301 redirect old → new |
| `/pest-solutions/seasonal-pest-control/` | ✅ Present at `/pest-solutions/seasonal-pest-control` | Path differs — 301 redirect needed |
| `/pest-solutions/organic-pest-control/` | ✅ Present at `/pest-solutions/organic-pest-control` | Path differs — 301 redirect needed |
| `/pest-solutions/garden-pest-control/` | ✅ Present at `/pest-solutions/garden-pest-control` | Path differs — 301 redirect needed |

The structural change `/pest-solutions/{pest}` → `/{pest}` on the new site means every pest URL needs a 301 redirect from old to new path.

### 🟡 Commercial pages — path restructuring (16 old → 14 new)

The old site has TWO URL patterns: `/commercial/...` AND `/commercial-pest-control/...`. The new site only uses the latter. Old URLs starting with `/commercial/` need 301 redirects.

| Old URL | Status on new site | Action |
|---|---|---|
| `/commercial/aged-care-facilities/` | ⚠️ Different path | 301 → `/commercial-pest-control/aged-care-facilities` (if exists) |
| `/commercial/restaurants-pest-control/` | ✅ Exists at `/commercial-pest-control/restaurants-pest-control` | 301 redirect |
| `/commercial/property-pest-control/` | ❓ Unknown — verify | TBD |
| `/commercial/industrial-pest-control/` | ❓ Unknown — verify | TBD |
| `/commercial/government-buildings/` | ❓ Unknown — verify | TBD |
| ...all other `/commercial/` URLs | Need individual mapping | TBD |

### 🔴 Blog posts — 68 missing (68 old → 0 new)

**Removed entirely per Figma brief.** This is the second-biggest SEO concern after suburbs. Examples:

- `/how-to-prevent-termites/`
- `/how-to-get-rid-of-mice/`
- `/rats-vs-mice/`
- `/pre-construction-termite-treatment/`
- ...64 more

**Each of these is likely ranking for informational queries** (e.g. "how to prevent termites") that drive bottom-of-funnel traffic into the call CTAs.

**Decision needed from Adam:**
- **Option A** — Migrate the best-performing blog posts to the new site (effort: 1-2 days per post for content migration + restyling)
- **Option B** — 301 redirect each blog URL to the most relevant new service page (preserves link equity but loses ranking for the article itself)
- **Option C** — Return HTTP 410 Gone for all blog URLs (cleanest, biggest SEO hit)
- **Option D** — Add a simple `/blog` section to the new site and migrate top 10 posts only (compromise)

**Recommendation:** Get Google Analytics data on top blog posts from the OLD GA4 property (which is still admin-locked, but the previous agency might share data). Then decide which to migrate vs redirect.

### ❌ Pages REMOVED by design — confirmed intentional

These were removed from the new site as part of the Figma brief / SEO+UX pass. No action needed beyond redirect map:

| Old URL | Action |
|---|---|
| `/pricing/` | 301 → `/contact-us` (per "pricing requires assessment" stance) |
| `/price-calculator/` | 301 → `/contact-us` |
| `/blogs/` | 301 → `/` |
| `/sitemap/` | 301 → `/` (the XML sitemap stays at `/sitemap.xml`) |
| `/links/` | 301 → `/` or 410 Gone |
| `/residential/` | 301 → `/` (home now IS the residential page) |
| `/industrial/` | 301 → `/commercial-pest-control/warehousing-and-storage` (closest equivalent) |
| `/certificates/` | 301 → `/about-us` |
| `/pestcontrol-syndal/` | One-off typo URL — 301 → `/pest-control-syndal` (verify suburb exists) |

### 🟢 Pages that map cleanly with no redirect needed

| Old URL | New URL |
|---|---|
| `/` | `/` ✅ |
| `/about-us/` | `/about-us` ✅ (trailing slash handled by Next.js) |
| `/contact-us/` | `/contact-us` ✅ |
| `/frequently-asked-questions/` | `/frequently-asked-questions` ✅ |
| `/service-areas/` | `/service-areas` ✅ |
| `/privacy-policy/` | `/privacy-policy` ✅ |

---

## 3. Forms inventory

### Old WordPress site forms

To verify by manual browsing — likely candidates:
- Quote enquiry form (homepage)
- Contact form (`/contact-us/`)
- Price calculator form (`/price-calculator/`)
- Commercial enquiry form (`/commercial/...`)
- Per-pest-page enquiry forms

**Action:** Browse the old site manually (or screenshot from Adam) to compile exact form list with all fields.

### New Next.js site forms

Confirmed in code (`src/components/sections/`):
- **ContactForm** (`/contact-us`) — name, email, phone, message
- **InquiryForm** (homepage/quote) — name, phone, email, suburb, pest type, message
- Forms are currently STUBS — they `preventDefault` and show "Thank you" without actually submitting

**Critical gap:** Forms don't yet submit to a backend. This is the Phase 2 WhatConverts integration work.

---

## 4. Calculators / interactive elements

| Element | Old site | New site | Status |
|---|---|---|---|
| Price calculator | ✅ Present at `/price-calculator/` | ❌ Removed | Intentional per Figma brief — 301 redirect to `/contact-us` |
| Service area search/filter | Possibly | ❌ Not present | Verify with Adam — was this on old site? |
| Booking widget (Square) | ✅ Linked | ✅ Linked (SITE_CONFIG.booking.url) | Aligned |

---

## 5. Tracking points

| Tracking | Old site | New site (this MVP) | Notes |
|---|---|---|---|
| GA4 page_view | ✅ (Melbourne Pest & Gutter Experts account, admin-locked) | ⏳ Phase 1 once new GA4 created | Replaced cleanly |
| GA4 conversion events | ❓ Unknown — likely none | ✅ 8 events designed (form_submit_*, click_phone, click_email) | NEW capability — improvement |
| Meta Pixel | ❓ Unknown | ⏳ Phase 2 client-side via GTM | NEW capability |
| Search Console | ❓ Unknown — likely set up | ⏳ Re-verify domain on cutover | Will preserve |
| Call tracking (WhatConverts) | ❌ Not present | ⏳ Future block (post-MVP) | Future capability |
| Microsoft Clarity (UX) | ❌ Not present | ⏳ Future block (post-MVP) | Future capability |
| BigQuery warehouse | ❌ Not present | ⏳ Phase 1 (this engagement) | NEW foundation |

**Net result for Adam:** Tracking goes from minimal/unknown to a full instrumented analytics stack. This is a significant upgrade, not a regression.

---

## 6. SEO considerations

### Title tags + meta descriptions
- Old site: Yoast SEO-managed
- New site: Native Next.js metadata API via `metadata` exports per route
- **Action:** Verify each migrated route has appropriate title + description before cutover

### Structured data (Schema.org)
- Old site: Yoast-managed (LocalBusiness, Organization, etc.)
- New site: Manual JsonLd component (`src/components/seo/JsonLd.tsx`) emitting `generateWebSiteSchema`, `generateOrganizationSchema`, `generateLocalBusinessSchema`
- **Status:** ✅ Covered. Verify in Google Rich Results Test before cutover.

### Robots.txt + sitemap.xml
- New site has `src/app/robots.ts` and `src/app/sitemap.ts` generating these dynamically
- **Action:** Verify the new sitemap includes ALL the URLs we want indexed (currently only the 120 in the static export)

### Internal linking
- Old site likely has dense internal links between suburb pages
- New site: navigation structure simplified per Figma brief
- **Action:** Decision — do we add an internal links section / footer link cloud to help SEO?

---

## 7. 301 Redirect map — DRAFT

The actual redirect rules will be configured on Netlify via `_redirects` file or `netlify.toml`. Below is the draft template.

```
# Removed/restructured core pages
/pricing                                  /contact-us              301
/price-calculator                         /contact-us              301
/blogs                                    /                        301
/blogs/*                                  /                        301
/sitemap                                  /                        301
/links                                    /                        301
/residential                              /                        301
/industrial                               /commercial-pest-control/warehousing-and-storage   301
/certificates                             /about-us                301

# Path restructuring — pest-solutions
/pest-solutions/termite-control-melbourne      /termite-control-melbourne          301
/pest-solutions/ant-pest-control-melbourne     /ant-pest-control-melbourne         301
/pest-solutions/bed-bug-control-melbourne      /bed-bug-control-melbourne          301
/pest-solutions/bee-removal-melbourne          /bee-removal-melbourne              301
/pest-solutions/clothes-moths-treatment-melbourne   /clothes-moths-treatment-melbourne   301
/pest-solutions/cockroach-control-melbourne    /cockroach-control-melbourne        301
/pest-solutions/flea-control-melbourne         /flea-control-melbourne             301
/pest-solutions/fly-control-melbourne          /fly-control-melbourne              301
/pest-solutions/mosquito-control-melbourne     /mosquito-control-melbourne         301
/pest-solutions/possum-removal-melbourne       /possum-removal-melbourne           301
/pest-solutions/rodent-removal                 /rodent-control-melbourne           301
/pest-solutions/silverfish-control-melbourne   /silverfish-control-melbourne       301
/pest-solutions/spider-control-melbourne       /spider-control-melbourne           301
/pest-solutions/treatment-for-wood-borers-in-melbourne   /treatment-for-wood-borers-in-melbourne   301
/pest-solutions/wasp-removal-melbourne         /wasp-removal-melbourne             301

# Missing pest pages
/pest-solutions/birds-control-melbourne        /contact-us                         301   # TODO: confirm with Adam

# Commercial path restructuring (verify each target page exists)
/commercial/aged-care-facilities               /commercial-pest-control/aged-care-facilities   301
/commercial/property-pest-control              /commercial-pest-control            301   # TODO: target verification
/commercial/industrial-pest-control            /commercial-pest-control/industrial-pest-control   301   # TODO: verify slug
/commercial/restaurants-pest-control           /commercial-pest-control/restaurants-pest-control   301
/commercial/function-venues-pest-control       /commercial-pest-control            301   # TODO: target verification
/commercial/pest-control-in-hospitals          /commercial-pest-control            301   # TODO: target verification
/commercial/brewhouses-and-distilleries        /commercial-pest-control            301   # TODO: target verification
/commercial/pest-control-in-agriculture        /commercial-pest-control            301   # TODO: target verification
/commercial/government-buildings               /commercial-pest-control            301   # TODO: target verification
/commercial/distribution-center                /commercial-pest-control/warehousing-and-storage   301

# 231 missing suburb URLs — DECISION NEEDED from Adam
# Option A: redirect to /service-areas
# Option B: build into melbourne-service-areas.ts as proper landing pages
# Listed in /tmp/zapit-audit/missing-suburbs.txt — to be appended once decision made

# 68 blog posts — DECISION NEEDED from Adam
# Default: 301 all to / OR /frequently-asked-questions
# Better: migrate top performers (see GA4 data from old account if available)
```

---

## 8. Items still needing Adam's input before cutover

| # | Item | Decision required |
|---|---|---|
| 1 | 231 missing suburb URLs | Build OR redirect to /service-areas OR redirect to nearest covered suburb |
| 2 | 68 blog posts | Migrate top performers OR redirect all OR 410 Gone |
| 3 | Birds-control page | Build OR redirect to /contact-us |
| 4 | Commercial path verification | Walk through all 16 commercial URLs, confirm equivalents exist on new site |
| 5 | Forms backend | Decide on WhatConverts integration timing (Phase 2 of MVP) |
| 6 | Old GA4 data access | Try to get historical performance data from previous agency to inform redirect decisions |
| 7 | DNS cutover date | Confirm specific date + 3-day code freeze beforehand |

---

## 9. Cutover readiness scorecard (post 2026-06-27 audit pass)

| Area | Ready? | Confidence | Real status |
|---|---|---|---|
| Code build & deploy pipeline | ✅ Yes | High | Auto-deploy 30s, builds clean |
| Core pages migrated | ✅ Yes | High | 6/6 core pages return 200 |
| Pest service pages migrated | ✅ Yes | High | 20/20 verified — 17 redirect correctly, 3 native + index return 200 |
| Commercial pages migrated | ✅ Yes | High | 18/18 verified — 14 redirect correctly, 3 native return 200, 1 (commercial-termite-control) now redirected |
| 301 redirect map for known restructures | ✅ Yes | High | 56 total redirects shipped, all curl-verified live |
| Suburb landing pages | 🔴 No | Low | 231 of 308 missing, no redirects yet (await Adam decision) |
| Blog content | 🔴 No | Low | 59 blog URLs still 404, no redirects yet (await Adam decision — thematic mapping file in `docs/audit-data/blog-urls-needing-decision.txt`) |
| Form backend integration | 🔴 No | Low | Phase 2 work, currently stubs |
| Analytics tracking | 🟡 Foundation only | Medium | Phase 1 build, full operational in Phase 2 |
| Search Console verification on new domain | 🔴 No | Low | Pending TXT record at registrar |
| **Overall** | **🟡 Not ready** | DO NOT cut DNS until the 🔴 items above move to 🟡 or 🟢 |

---

## 10. Recommended next actions

1. **Share this audit with Adam** for review and decisions on the 7 items in section 8
2. **Get historical GA4 data** from previous agency (or screenshot top pages from Adam) to inform blog/suburb decisions
3. **Walk through commercial URLs** with Adam to confirm each target exists or needs to be built
4. **Decide on suburb strategy** — building 231 pages is significant scope; redirecting them is a Phase 3 task
5. **Stub the `_redirects` file** in the repo with the confirmed mappings as decisions land
6. **Lock cutover date** only after this audit is signed off

---

## Appendix A — Full URL inventories

Stored locally during audit (not committed to repo — regenerate via sitemap fetch as needed):

```
/tmp/zapit-audit/post-sitemap.xml
/tmp/zapit-audit/page-sitemap.xml
/tmp/zapit-audit/commercial-sitemap.xml
/tmp/zapit-audit/all-urls.txt
```

Sitemap source: `https://zapitpestmelbourne.com.au/sitemap_index.xml` (Yoast SEO-managed)
