import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { SERVICE_SLUGS } from '@/lib/service-pages';
import { SUBURB_SLUGS } from '@/lib/suburb-data';
import { COMMERCIAL_INDUSTRY_SLUGS } from './commercial-pest-control/[slug]/page';
import { PEST_SOLUTION_SLUGS } from './pest-solutions/[slug]/page';

export const dynamic = 'force-static';

// Sitemap pulls slugs from the same canonical sources the [slug] templates use,
// so adding/removing a service/industry/suburb auto-updates the sitemap. Hidden
// SEO pages stay indexable per client direction (no main-nav link, kept in sitemap).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/commercial-pest-control`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/frequently-asked-questions`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/service-areas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    // Hidden-from-nav but kept for SEO:
    { url: `${baseUrl}/termite-control-melbourne`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/pest-solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/coburg`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/reservoir`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // /[serviceSlug] — covers per-pest service pages (ant-pest-control-melbourne, ...) and
  // per-suburb suburb-formatted slugs (pest-control-werribee, ...).
  const serviceAndSuburbPages: MetadataRoute.Sitemap = [
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...SUBURB_SLUGS.filter((s) => s.startsWith('pest-control-')).map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  const commercialPages: MetadataRoute.Sitemap = COMMERCIAL_INDUSTRY_SLUGS.map((slug) => ({
    url: `${baseUrl}/commercial-pest-control/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const pestSolutionSubPages: MetadataRoute.Sitemap = PEST_SOLUTION_SLUGS.map((slug) => ({
    url: `${baseUrl}/pest-solutions/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...serviceAndSuburbPages, ...commercialPages, ...pestSolutionSubPages];
}
