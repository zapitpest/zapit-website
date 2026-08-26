import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { OG_DEFAULT_IMAGES, TWITTER_DEFAULT_IMAGES } from '@/lib/seo-defaults';
import SuburbLandingPage from '@/components/sections/SuburbLandingPage';

const SUBURB = 'Reservoir';
const REGION = 'North';
const SLUG = 'reservoir';

// SERP + social title/description kept identical. shortName in OG title
// mirrors the site-wide template — previously used full brand and mismatched.
const TITLE = `Pest Control ${SUBURB} | Same-Day | ${SITE_CONFIG.shortName}`;
const DESCRIPTION = `Same-day pest control in ${SUBURB}, Melbourne. Licensed technicians, treatments safe for pets & people. Call ${SITE_CONFIG.phone} to book.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_CONFIG.url}/${SLUG}`,
    images: [...OG_DEFAULT_IMAGES],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [...TWITTER_DEFAULT_IMAGES],
  },
};

export default function ReservoirPage() {
  return <SuburbLandingPage suburb={SUBURB} region={REGION} slug={SLUG} />;
}
