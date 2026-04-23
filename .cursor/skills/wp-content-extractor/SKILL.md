---
name: wp-content-extractor
description: Extracts all content from WordPress REST API (pages, posts, media, SEO data) and imports into Supabase. Use when extracting WordPress content, migrating data, or importing pages/posts/images from the live site.
---

# WordPress Content Extractor

## API Base
`https://zapitpestmelbourne.com.au/wp-json/wp/v2`

## Endpoints
- Pages: `/pages?per_page=100&page={n}&_fields=id,slug,title,content,excerpt,link,yoast_head_json`
- Posts: `/posts?per_page=100&page={n}&_fields=id,slug,title,content,excerpt,link,featured_media,yoast_head_json`
- Media: `/media?per_page=100&page={n}&_fields=id,source_url,alt_text,title,media_details`

## Page Counts
- Pages: 363 (37 pages of results)
- Posts: 68 (7 pages)
- Media: 892 (90 pages)

## Extraction Workflow

1. **Fetch all pages** — paginate through `/pages?per_page=100&page=1..37`
2. **Categorize by slug pattern:**
   - `pest-control-*` → `suburbs` table
   - `commercial-*` → `services` table (type=commercial)
   - `termite-*`, `ant-*`, `cockroach-*`, etc. → `services` table (type=pest)
   - Blog posts → `blog_posts` table
   - Everything else → `pages` table
3. **Extract from each page:**
   - Clean text content (strip Elementor HTML)
   - Yoast meta title + description from `yoast_head_json`
   - Image URLs from content HTML
   - FAQ sections (if present in content)
4. **Download key images** to `public/images/`
5. **Import to Supabase** via batch inserts

## Content Cleaning
Strip Elementor markup: remove `data-elementor-*` attributes, widget wrappers, inline CSS.
Keep: headings, paragraphs, lists, images, links.

## SEO Data (from Yoast)
Each page's `yoast_head_json` field contains:
- `title` — meta title
- `description` — meta description
- `og_image[0].url` — featured image
- `robots` — indexing directives
