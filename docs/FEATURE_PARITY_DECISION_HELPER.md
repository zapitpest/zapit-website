# Feature Parity Decision Helper — Suburbs + Blog URLs

**Purpose:** compress ~300 individual decisions into 2 macro-decisions so Adam can unblock redirects in a 5-minute review instead of URL-by-URL.

**Timing:** needed before DNS cutover. Not urgent for the dashboard build.

**Companion docs:**
- Full URL-by-URL audit: [`docs/FEATURE_PARITY_AUDIT.md`](FEATURE_PARITY_AUDIT.md)
- Raw blog list: [`docs/audit-data/blog-urls-needing-decision.txt`](audit-data/blog-urls-needing-decision.txt)
- Live redirect rules: [`public/_redirects`](../public/_redirects)

**Doc revision — 2026-08-07:** Corrected two inaccuracies from the earlier draft. No dynamic suburb route exists in the codebase (only `/coburg/` and `/reservoir/` are hardcoded suburb pages). Blog raw file contains 66 URLs, not 59 as previously stated. Updated below.

---

## Situation

The old WordPress site had ~426 indexed URLs. The rebuilt Next.js site currently has ~120 static URLs. 58 clean 301 redirects were shipped in June and are live and curl-verified.

**Still needing decisions before DNS cutover:**

- **306 old suburb URLs** — old WordPress had `/pest-control-{suburb}/` for 308 suburbs. New site has dedicated pages only for Coburg + Reservoir (2 already redirected). The remaining **306 suburb URLs are currently 404-ing.**
- **66 old blog/content URLs** — the new site has no blog. Each is currently 404-ing.

**Two possible fates per URL:**

- **301 redirect** — permanent redirect to a related page on the new site. Preserves SEO equity, keeps external backlinks working.
- **410 Gone** — explicit "this page no longer exists". Right choice if the content was low-value or duplicate.

Building new pages for all 372 URLs is out of scope for MVP.

---

## Macro-decision 1 — 306 suburb URLs

**The pattern:** every old URL is `/pest-control-{suburb}/`. The rebuilt site has:

- `/service-areas/` — a single listing page covering all 77 suburbs Zap It services (75 curated across 5 regions + Coburg + Reservoir)
- `/coburg/` and `/reservoir/` — dedicated dedicated pages for two flagship suburbs
- **No other individual suburb pages exist.** No dynamic route serves `/pest-control-{suburb}/` on the new site.

### Recommended: Option A — one catch-all redirect (5 min execution)

Add a single Netlify redirect rule:

```
/pest-control-*    /service-areas    301
```

This catches all 306 remaining `/pest-control-{suburb}/` URLs and 301s them to the `/service-areas/` listing page. Existing specific rules for `/pest-control-coburg` and `/pest-control-reservoir` continue to take precedence (order matters in Netlify redirects file — specific rules go above catch-alls).

**SEO impact:** SEO equity mostly preserved via the 301. Individual suburb rankings won't survive (there's no individual page to rank), but the aggregate `/service-areas/` page inherits the link juice.

**Execution effort:** 5 minutes.

### Option B — Regional deep-links (30 min execution)

Add region-aware redirects so old URLs land closer to their content:

```
/pest-control-carlton        /service-areas#inner-city      301
/pest-control-fitzroy        /service-areas#inner-city      301
[... 75 curated suburbs each mapped to their region anchor]
/pest-control-*              /service-areas                 301
```

**SEO impact:** slightly better — visitors land on the region section already scrolled to their area.

**Execution effort:** 30 minutes ours (once you approve).

### Option C — Build individual pages for the 75 curated suburbs

Requires building a `[suburb]` dynamic route or 75 static pages. Preserves individual suburb rankings.

**Execution effort:** 4-6 hours. **Outside current MVP scope** — would need buffer usage sign-off or a change order.

**Recommendation:** **Option A** for the fastest safe unblock. Option B is a small polish upgrade if you want the deep-link behaviour. Option C is future work.

---

## Macro-decision 2 — 66 blog URLs

The blog URLs cluster into 11 topic groups. Instead of deciding 66 URLs individually, decide 11 groups.

| Group | # URLs | Recommended action | Alternative | Notes |
|---|---|---|---|---|
| Termites | 19 | 301 → `/termite-control-melbourne` | Serve as blog posts | Termite is your highest-value service line. Redirecting preserves backlink equity |
| Rodents / rats / mice | 10 | 301 → `/rodent-control-melbourne` | Serve as blog posts | Same reasoning |
| Wasps | 7 | 301 → `/wasp-removal-melbourne` | 410 Gone if not priority | Depends whether you want to rank for wasp queries |
| Flies | 7 | 301 → `/fly-control-melbourne` | 410 Gone | Same |
| Possums | 6 | 301 → `/possum-removal-melbourne` | 410 Gone | Same |
| Mosquitoes | 3 | 301 → `/mosquito-control-melbourne` | 410 Gone | Same |
| Fleas | 2 | 301 → `/flea-control-melbourne` | 410 Gone | Same |
| Spiders | 1 | 301 → `/spider-control-melbourne` | 410 Gone | Same |
| Ants | 1 | 301 → `/ant-pest-control-melbourne` | 410 Gone | Same |
| Silverfish | 1 | 301 → `/silverfish-control-melbourne` | 410 Gone | Same |
| General pest content | 9 | 301 → `/pest-solutions` | 410 Gone if low-quality | Depends whether you plan a future blog |

**Total: 66 URLs across 11 groups.** Grand total for the redirect map: 306 suburbs + 66 blogs = **372 old URLs handled**.

---

## The meta-question — do you plan a blog on the new site?

**If YES:** for the highest-value groups (Termites, Rodents), we should migrate 10-15 top-performing articles to their same URLs on the new site. Preserves SEO ranking + gives you content to rank on. The rest of each group 301s to the service page.

**Effort if YES:** 4-6 hours for the 10-15 migrations. Would need buffer usage sign-off or change order.

**If NO:** we 301 everything to the closest service page (per the table above). Fastest, cleanest, preserves most SEO equity in aggregate.

**Effort if NO:** ~1 hour to add all 11 group redirects plus catch-all. Inside current MVP scope.

---

## Decision template — copy-paste back to reply

Fastest path: paste this in an email with your ticks.

```
Macro-decision 1 (suburbs):
[X] Option A — single catch-all /pest-control-* → /service-areas (recommended)
[ ] Option B — regional deep-links for 75 curated suburbs
[ ] Option C — build individual suburb pages (outside MVP scope)

Macro-decision 2 (blog groups):
Blog on new site in next 6-12 months?
[ ] Yes — migrate top 10-15 articles + 301 the rest (needs buffer sign-off)
[ ] No — 301 everything to nearest service page (recommended if no blog planned)

Groups I want to 410 Gone instead of redirect (comma-separated, or "none"):
_______________

Anything else: _______________
```

**Once you send this back, redirect execution is ~1 hour on our side and gets shipped before DNS cutover. No further sign-off needed.**

---

## What happens after Adam approves

1. Add the approved redirect block to `public/_redirects` — one commit
2. Local `next build` verification
3. Push to `origin/main` — auto-deploys via Netlify (and later Cloudflare Pages)
4. curl-verify 5-10 sample URLs from each macro-decision to confirm the redirects fire correctly
5. Note the completed redirect count in `MVP_STATUS.md` change log

Estimated total from Adam-approval to live: **~1 hour**.

---

## Why this matters

Every day the 372 URLs return 404, search engines slowly drop them. Cumulative SEO equity lost from 372 URLs over 6 months = potentially 2-6 months of organic-lead delay after cutover. Getting the redirects in early = lead pipeline does not dip during the DNS transition.

Also — the old URLs will appear as 404 errors in Search Console once the domain is verified there. Not a critical alarm, but tidier to have them all 301'd first than to handle the noise later.

---

## Version history

- **2026-06-27** — Initial draft with suburb + blog decision framework
- **2026-08-07** — Corrected inaccuracies: no dynamic suburb route exists in codebase (306 suburbs need catch-all redirect, not 231); blog raw file contains 66 URLs (not 59). Clarified Option C is outside MVP scope. Restructured recommendations for clarity.
