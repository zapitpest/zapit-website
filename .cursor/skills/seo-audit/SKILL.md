---
name: seo-audit
description: Audits SEO implementation against the Zap It workbook requirements. Checks meta tags, schema, internal links, redirects, images, and indexing. Use when verifying SEO, checking meta titles, validating schema, or running quality checks on pages.
---

# SEO Audit Skill

## What This Checks

Run this audit after building or modifying any page template.

### 1. Meta Tags Audit
For each page, verify:
- `title` is unique, 50-60 chars, format: `[Name] | Zap It Pest & Termite Control Melbourne`
- `description` is unique, 140-155 chars, contains target keyword
- Description uses `SITE_CONFIG.phone` — never hardcoded phone string
- No duplicate titles across pages (53 pages had wrong suburb names)
- No duplicate descriptions (22 pages had copy-paste "Aspendale" text)
- NO contact form references anywhere — client removed it

### 2. Schema Audit
Check each page type has correct JSON-LD:
- **Homepage:** WebSite + Organization + LocalBusiness(03 9126 0555) + Product/AggregateRating(5/224) + FAQPage
- **Suburb pages:** LocalBusiness + FAQPage
- **Service pages:** Service + FAQPage
- **Blog posts:** Article schema
- **No duplicates** — never two of same @type on one page
- Phone in schema must be `03 9126 0555` (not 1800 808 149)

### 3. Internal Links Audit
- 25 internal links required (from SEO workbook)
- Check anchor text matches workbook specifications
- Verify no broken internal links (href returns 200)

### 4. Redirect Audit
- 20 redirects in `next.config.ts`
- 7 explicit old→new URL mappings
- Verify all return 301, not 404

### 5. Image Audit
- All images < 100KB after optimization
- All images have descriptive alt text (9 were missing)
- Using next/image with WebP

### 6. Indexing Audit
- No `noindex` on published pages
- XML sitemap includes all published URLs
- `robots.ts` allows all crawlers

## How to Run
```
Checklist for each page template:
- [ ] generateMetadata returns unique title + description
- [ ] JSON-LD schema rendered correctly
- [ ] All images use next/image with alt
- [ ] Internal links use <Link> with descriptive text
- [ ] No hardcoded phone/email/address
- [ ] Page renders correctly at 375px mobile width
```
