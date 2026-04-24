import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';

const MELBOURNE_MAP_EMBED =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('Melbourne, Victoria, Australia') +
  '&z=10&output=embed';

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Service Areas', href: '/service-areas' },
];

export const metadata: Metadata = {
  title: 'Pest Control Service Areas in Melbourne',
  description: `${SITE_CONFIG.shortName} services Melbourne's central, northern, north-west, north-eastern, and eastern suburbs. Same day service available. Call ${SITE_CONFIG.phone}.`,
  alternates: { canonical: '/service-areas' },
  openGraph: {
    title: `Service Areas | ${SITE_CONFIG.name}`,
    description: `See where we work across Melbourne. ${SITE_CONFIG.tagline}`,
    url: '/service-areas',
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={[generateLocalBusinessSchema('Melbourne'), generateBreadcrumbSchema(breadcrumbItems)]} />

      <div className="font-sans text-[#414042]">
        {/* Header */}
        <section className="bg-[#f8f5f2] px-4 pb-4 pt-6 sm:px-6 sm:pt-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-left text-[22px] font-bold leading-tight text-[#414042] sm:text-[26px]">Service areas</h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg italic leading-snug text-[#414042] sm:text-xl">
              We service Melbourne&apos;s central, north-west, northern and north-eastern suburbs.
            </p>
          </div>
        </section>

        {/* Map */}
        <section className="relative bg-[#f8f5f2] px-0 pb-10 sm:px-4 sm:pb-14">
          <div className="relative mx-auto w-full max-w-5xl overflow-hidden sm:rounded-2xl">
            <div className="relative aspect-[4/3] w-full min-h-[220px] bg-[#e5e5e5] sm:aspect-[16/9] sm:min-h-[280px]">
              <iframe
                title="Melbourne service area map"
                src={MELBOURNE_MAP_EMBED}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                <div className="relative h-[min(72%,18rem)] w-[min(72%,18rem)] rounded-full border-[5px] border-[#3fa535] shadow-[0_0_0_1px_rgba(63,165,53,0.25)] sm:h-[min(65%,20rem)] sm:w-[min(65%,20rem)] sm:border-[6px]" />
                <div className="absolute right-[12%] top-[16%] flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md sm:right-[14%] sm:top-[18%] sm:h-10 sm:w-10">
                  <CheckCircle2 className="h-6 w-6 text-[#3fa535] sm:h-7 sm:w-7" strokeWidth={2.25} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About / Committed */}
        <section className="bg-[#f8f5f2] px-4 py-6 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-[18px] font-bold leading-snug text-[#414042] sm:text-[20px]">About us</h2>
            <p className="mt-3 text-sm leading-[1.65] text-[#414042] sm:text-base">
              Built on trust, with an uncompromising commitment to customer satisfaction and professional standards.
            </p>

            <h3 className="mt-8 text-[18px] font-bold leading-snug text-[#414042] sm:text-[20px]">
              Committed to protecting what&apos;s important to you
            </h3>
            <div className="mt-4 space-y-4 text-sm leading-[1.65] text-[#414042] sm:text-[15px]">
              <p>
                Your health and safety are at the heart of everything we do, supported by industry-leading pest protection
                technology and customer care.
              </p>
              <p>
                We understand the different risks all types of pests pose to people, pets and property. Whether you live in a flat with a much-loved
                pet, have a family of five, or run a business, we tailor the best pest protection solution to suit your needs.
              </p>
              <p>
                We treat your home and business with the same care as our own. Our service extends beyond the initial treatment by providing you
                practical guidance to help prevent future infestations.
              </p>
              <p>We&apos;re here for you now and into the future.</p>
            </div>
          </div>
        </section>

        {/* Same day CTA */}
        <section className="bg-[#f8f5f2] px-4 pb-10 pt-2 text-center sm:px-6 sm:pb-12" aria-label="Same day service">
          <div className="mx-auto max-w-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/group-350.svg"
              alt="Same day service available. Call now!"
              className="mx-auto w-full max-w-[320px] sm:max-w-[360px]"
            />
          </div>
        </section>
      </div>

      <PageInfoFooterBlock />
    </>
  );
}
