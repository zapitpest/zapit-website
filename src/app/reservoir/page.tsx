import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import SuburbLandingPage from '@/components/sections/SuburbLandingPage';

const SUBURB = 'Reservoir';
const REGION = 'North';
const SLUG = 'reservoir';

export const metadata: Metadata = {
  title: { absolute: `Pest Control ${SUBURB} | Same-Day | ${SITE_CONFIG.shortName}` },
  description: `Same-day pest control in ${SUBURB}, Melbourne. Licensed technicians, treatments safe for pets & people. Call ${SITE_CONFIG.phone} to book.`,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: `Pest Control ${SUBURB} | ${SITE_CONFIG.name}`,
    description: `Professional pest control in ${SUBURB}, Melbourne. Same-day service available — licensed, insured technicians.`,
    url: `${SITE_CONFIG.url}/${SLUG}`,
  },
};

export default function ReservoirPage() {
  return <SuburbLandingPage suburb={SUBURB} region={REGION} slug={SLUG} />;
}
