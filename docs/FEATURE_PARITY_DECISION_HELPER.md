# Feature Parity Decision Helper — 231 Suburbs + 59 Blog URLs

**Purpose:** compress 290 individual decisions into ~5 macro-decisions so Adam can unblock Phase 3 redirects in one 10-minute review instead of URL-by-URL.

**Timing:** needed before DNS cutover. Not urgent — doesn't block dashboard build.

**Companion doc:** [docs/FEATURE_PARITY_AUDIT.md](FEATURE_PARITY_AUDIT.md) has the full URL-by-URL audit; [docs/audit-data/blog-urls-needing-decision.txt](audit-data/blog-urls-needing-decision.txt) has the raw blog list.

---

## Summary of the situation

The old WordPress site had 426 URLs. The rebuilt Next.js site was audited for feature parity and 56 clean 301 redirects were shipped in June (verified live). What's left:

- **231 suburb URLs** — old WordPress had a `/pest-control-{suburb}/` page for every Melbourne suburb. Many overlap with the rebuild's clean architecture; some don't.
- **59 blog/content URLs** — old WordPress had ~59 individual blog articles. The rebuild doesn't have a blog yet.

Each URL is currently returning HTTP 404. Search engines will de-index these over 3-6 months. For any URL that had SEO value or accumulated backlinks, that's lost equity.

**Three possible fates per URL:**
- **Redirect (301)** — permanent redirect to a related page on the new site. Preserves SEO equity, keeps external backlinks working.
- **Serve** — build a new page at the same URL. Highest SEO value but most work.
- **410 Gone** — explicit "this page no longer exists". Fastest de-indexing. Right choice if the content was low-value or duplicate.

---

## Macro-decision 1 — Suburb URLs (231 pages)

**The pattern:** every old URL is `/pest-control-{suburb}/`. The rebuild has:
- 2 dedicated suburb pages: `/coburg/`, `/reservoir/`
- Dynamic route: `/pest-control-{suburb}/` served by SuburbLandingPage.tsx for all other suburbs

**Adam's macro-decision (pick one):**

### Option A ⭐ RECOMMENDED — Auto-serve everything via dynamic route

Every old `/pest-control-{suburb}/` URL is already being served by the dynamic route in the rebuild. **No decisions needed** — the site already answers.

**Action from you:** confirm this is the intended behaviour (which it is per your original brief).

**Effort:** 0 hours. Already done.

**SEO impact:** neutral-to-positive — same URL, same-or-better content, keeps all suburbs indexed.

### Option B — Trim the suburb list

If some Melbourne suburbs are NOT services Zap It wants to appear for (e.g. distant regional areas), we can 410 those and only serve suburbs in your target service area.

**Action from you:** send me a list of suburbs to remove (or a rule like "only within 50 km of Melbourne CBD").

**Effort:** 30 minutes ours (once list defined).

**When this matters:** if your team can't actually service some suburbs and doesn't want SEO leads from them.

---

## Macro-decision 2 — Blog URLs (59 pages, grouped by topic)

The blog URLs cluster into 12 topic groups. Instead of deciding 59 URLs, decide 12 groups.

**Table for review — one decision per group:**

| Group | # URLs | Recommended action | Alternative | Notes |
|---|---|---|---|---|
| Termites | 19 | 301 → `/termite-control-melbourne` | Serve as blog posts if you want SEO content | Termite is your highest-value service line. Redirecting preserves backlink equity |
| Rodents / rats / mice | 10 | 301 → `/rodent-control-melbourne` | Serve as blog posts | Same reasoning |
| Wasps | 7 | 301 → `/wasp-removal-melbourne` | 410 Gone if not a priority service | Depends whether you want to rank for wasp queries |
| Flies | 7 | 301 → `/fly-control-melbourne` | 410 Gone | Same |
| Possums | 6 | 301 → `/possum-removal-melbourne` | 410 Gone | Same |
| Mosquitoes | 3 | 301 → `/mosquito-control-melbourne` | 410 Gone | Same |
| Fleas | 2 | 301 → `/flea-control-melbourne` | 410 Gone | Same |
| Spiders | 1 | 301 → `/spider-control-melbourne` | 410 Gone | Same |
| Ants | 1 | 301 → `/ant-pest-control-melbourne` | 410 Gone | Same |
| Silverfish | 1 | 301 → `/silverfish-control-melbourne` | 410 Gone | Same |
| General pest content | 9 | 301 → `/pest-solutions` OR `/` | 410 Gone if content was low-quality | Depends whether you plan a future blog |
| Future blog planned? | — | If YES → serve these as blog posts (long-term SEO win); if NO → 301 to nearest service page | | Meta-decision that shapes 3-5 above |

---

## The one big meta-question for Adam

**Do you plan to have a blog on the new site in the next 6-12 months?**

- **If YES:** the recommended action for many groups above shifts from "301 redirect" to "serve as blog post at same URL" — preserves SEO + gives you content to rank on. We'd migrate the highest-value old content and redirect the rest.
- **If NO:** we 301 everything to the closest service page. Fastest, cheapest, still preserves most SEO equity.

Both paths are inside the current MVP scope; the difference is ~1 hour of my time (redirects) vs ~4-6 hours (blog migration for maybe 10-15 best articles). Redirect path stays within engagement letter cap; blog migration would need buffer + your sign-off.

---

## Decision template — copy/paste back to me

Fastest path for you: reply with just this filled in.

```
Macro-decision 1 (suburbs):
[X] Option A — auto-serve all via dynamic route (recommended)
[ ] Option B — trim list. Suburbs to remove: _______________

Macro-decision 2 (blog groups):
Blog on new site in next 6-12 months?
[ ] Yes — migrate best 10-15 articles + 301 the rest
[ ] No — 301 everything to nearest service page (recommended if no blog planned)

Groups I want to 410 Gone entirely (comma-separated group names, e.g. "Wasps, Fleas, Silverfish"):
_______________

Anything else you want handled differently: _______________
```

**Once you send this back, redirect execution is ~1 hour on my side and gets shipped before DNS cutover.**

---

## Why this matters

Every day these URLs return 404, search engines slowly drop them. Cumulative SEO equity lost from 290 URLs over 6 months = potentially 2-6 months of organic-lead delay after cutover. Getting the redirects in early = lead pipeline doesn't dip during the transition.

Also — the old URLs will show up in Google Search Console as 404 errors once you verify the domain. Not a critical alarm bell but easier to have them all 301'd first than to handle the noise later.
