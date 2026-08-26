import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /debug/ is a QA route gated by ?debug=tracking. The page is `noindex`
      // already; disallow here means crawlers don't even fetch it during a
      // routine scan, so it stays a private tool.
      disallow: ['/api/', '/admin/', '/debug/'],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
