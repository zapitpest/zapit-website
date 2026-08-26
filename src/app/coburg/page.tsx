import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import SuburbLandingPage from '@/components/sections/SuburbLandingPage';

const SUBURB = 'Coburg';
const REGION = 'North';
const SLUG = 'coburg';

export const metadata: Metadata = {
  title: { absolute: `Pest Control ${SUBURB} | Same-Day Service | ${SITE_CONFIG.shortName}` },
  description: `Same-day pest control in ${SUBURB}, Melbourne. Licensed technicians, treatments safe for pets & people. Call ${SITE_CONFIG.phone} to book.`,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: `Pest Control ${SUBURB} | ${SITE_CONFIG.name}`,
    description: `Professional pest control in ${SUBURB}, Melbourne. Same-day service available — licensed, insured technicians.`,
    url: `${SITE_CONFIG.url}/${SLUG}`,
  },
};

export default function CoburgPage() {
  return <SuburbLandingPage suburb={SUBURB} region={REGION} slug={SLUG} />;
}
