import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { OG_DEFAULT_IMAGES, TWITTER_DEFAULT_IMAGES } from '@/lib/seo-defaults';
import SuburbLandingPage from '@/components/sections/SuburbLandingPage';

const SUBURB = 'Coburg';
const REGION = 'North';
const SLUG = 'coburg';

export const metadata: Metadata = {
  title: { absolute: `Pest Control ${SUBURB} | Same-Day Service | ${SITE_CONFIG.shortName}` },
  description: `Same-day pest control in ${SUBURB}, Melbourne. Licensed technicians, treatments safe for pets & people. Call ${SITE_CONFIG.phone} to book.`,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    // Use shortName so social preview title matches SERP title exactly.
    title: `Pest Control ${SUBURB} | Same-Day Service | ${SITE_CONFIG.shortName}`,
    description: `Same-day pest control in ${SUBURB}, Melbourne. Licensed technicians, treatments safe for pets & people. Call ${SITE_CONFIG.phone} to book.`,
    url: `${SITE_CONFIG.url}/${SLUG}`,
    images: [...OG_DEFAULT_IMAGES],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Pest Control ${SUBURB} | Same-Day Service | ${SITE_CONFIG.shortName}`,
    description: `Same-day pest control in ${SUBURB}, Melbourne. Licensed technicians, treatments safe for pets & people. Call ${SITE_CONFIG.phone} to book.`,
    images: [...TWITTER_DEFAULT_IMAGES],
  },
};

export default function CoburgPage() {
  return <SuburbLandingPage suburb={SUBURB} region={REGION} slug={SLUG} />;
}
