---
name: seo-schema-generator
description: Generates correct JSON-LD schema markup for all Zapit page types. Use when building schema, adding structured data, fixing schema issues, or implementing FAQ/LocalBusiness/Article schema.
---

# SEO Schema Generator

## Schema per Page Type

### Homepage (5 types)
```json
[
  { "@type": "WebSite", "url": "https://zapitpestmelbourne.com.au", "name": "Zap It Pest Control Melbourne", "potentialAction": { "@type": "SearchAction" } },
  { "@type": "Organization", "name": "Zap It Pest Control Melbourne", "url": "...", "logo": "...", "sameAs": ["instagram", "facebook", "tiktok"] },
  { "@type": "LocalBusiness", "name": "...", "telephone": "03 9126 0555", "address": { "streetAddress": "80 Porter Rd", "addressLocality": "Heidelberg Heights", "addressRegion": "VIC", "postalCode": "3081" } },
  { "@type": "Product", "name": "Pest Control Services", "aggregateRating": { "ratingValue": "5", "reviewCount": "224", "bestRating": "5" } },
  { "@type": "FAQPage", "mainEntity": [...] }
]
```

### Suburb Pages
- LocalBusiness (with suburb-specific `areaServed`)
- FAQPage (from `faq_json` column in Supabase)
- BreadcrumbList

### Service Pages
- Service schema with `provider` pointing to Organization
- FAQPage (from `faq_json`)
- BreadcrumbList

### Blog Posts
- Article with `headline`, `author`, `datePublished`, `dateModified`, `image`
- BreadcrumbList

## Implementation
All generators live in `lib/schema.ts`:
```typescript
export function generateLocalBusinessSchema(suburb?: string) { ... }
export function generateFAQSchema(faqs: FAQ[]) { ... }
export function generateArticleSchema(post: BlogPost) { ... }
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) { ... }
```

## Validation
- Test at https://search.google.com/test/rich-results
- No duplicate @type on same page
- Phone MUST be `03 9126 0555`
- Rating MUST be 5/224 (not old 4.9/221)
