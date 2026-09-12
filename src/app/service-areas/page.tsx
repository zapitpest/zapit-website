import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { ANCHORS, AREA_SUMMARY, suburbsByAnchor } from '@/lib/service-area';
import { ServiceAreaMap } from '@/components/sections/ServiceAreaMap';
import { OG_DEFAULT_IMAGES, TWITTER_DEFAULT_IMAGES } from '@/lib/seo-defaults';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Service Areas', href: '/service-areas' },
];

// One description, three places. Previously the metadata claimed eastern suburbs
// and the visible subtitle did not, and neither matched where the work is.
const DESCRIPTION =
  `Same day pest control across Melbourne's northern, north-eastern and inner suburbs. ` +
  `Bases in Heidelberg Heights, Reservoir and Coburg. Call ${SITE_CONFIG.phone}.`;

export const metadata: Metadata = {
  title: "Pest Control Service Areas in Melbourne's North & Inner",
  description: DESCRIPTION,
  alternates: { canonical: '/service-areas' },
  // SERP + social title/description kept in lock-step. Previous split used
  // SITE_CONFIG.name (full 38-char brand) in og:title and a 62-char og:description
  // that ranked worse than the meta description would in a social preview.
  openGraph: {
    title: `Pest Control Service Areas in Melbourne | ${SITE_CONFIG.shortName}`,
    description: DESCRIPTION,
    url: '/service-areas',
    images: [...OG_DEFAULT_IMAGES],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Pest Control Service Areas in Melbourne | ${SITE_CONFIG.shortName}`,
    description: DESCRIPTION,
    images: [...TWITTER_DEFAULT_IMAGES],
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={[generateLocalBusinessSchema('Melbourne'), generateBreadcrumbSchema(breadcrumbItems)]} />

      <div className="font-sans text-[#414042]">
        {/* ===== HEADER, MAP AND ABOUT — both Figma frames put the About us copy beside the
             map at desktop (left column 549 for the map, right column 373 for the copy) and
             directly under it on mobile. The build had it stranded below the suburb list,
             so desktop showed a 768px map alone with the page half empty. ===== */}
        <div className="w-full bg-[#f8f5f2]">
        <div className="px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:mx-auto lg:grid lg:max-w-[1036px] lg:grid-cols-[549px_373px] lg:gap-x-[114px] lg:pb-14 lg:pt-12">

          {/* Left column — heading, summary, map. Content is centred inside this column,
              which is how the design sets it. */}
          <div className="lg:min-w-0">
            <div className="mx-auto max-w-3xl text-center lg:max-w-none">
              <h1 className="text-[26px] font-bold leading-tight text-[#414042] sm:text-[30px] lg:text-[36px]">Service areas</h1>
              <p className="mx-auto mt-4 max-w-2xl text-[18px] italic leading-snug text-[#414042] sm:text-[22px] lg:text-[20px]">
                {AREA_SUMMARY}
              </p>
            </div>
            {/* Fixed, non-interactive map. See ServiceAreaMap for why this is not a Google embed. */}
            <div className="mx-auto mt-6 w-full max-w-3xl lg:mt-8 lg:max-w-none">
              <ServiceAreaMap />
            </div>
          </div>

          {/* Right column — About us */}
          <div className="mx-auto mt-10 max-w-3xl lg:mx-0 lg:mt-0 lg:max-w-none">
                <h2 className="text-[20px] font-bold leading-snug text-[#414042] sm:text-[24px]">About us</h2>
                <p className="mt-3 text-[15px] leading-[1.65] text-[#414042] sm:text-[16px]">
                  Built on trust, with an uncompromising commitment to customer satisfaction and professional standards.
                </p>
    
                <h3 className="mt-8 text-[20px] font-bold leading-snug text-[#414042] sm:text-[24px]">
                  Committed to protecting what&apos;s important to you
                </h3>
                <div className="mt-4 space-y-4 text-[15px] leading-[1.65] text-[#414042] sm:text-[16px]">
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

        </div>
        </div>


        {/* ===== SUBURBS WE SERVICE =====
             Rendered from src/lib/service-area.ts, which is the only place a suburb is
             named. Grouped by the base that covers it, because that is the real answer
             to "how fast can you get here".

             A suburb without its own page is listed as plain text, not a link. That is
             deliberate: every existing suburb page is one template with the name swapped,
             and adding more of those is what gets a site treated as doorway pages. The
             name still appears in the copy here, which is what a visitor searching for
             their suburb actually needs. Pages get added one at a time, as real local
             content gets written — see PAGE_BACKLOG.

             This page is also the target of 269 legacy redirects, so it must never 404. ===== */}
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-[52px]">
          <div className="mx-auto max-w-3xl lg:max-w-[1280px]">
            <h2 className="text-[22px] font-bold leading-snug text-[#414042] sm:text-[26px] lg:text-[30px]">
              Suburbs we service
            </h2>
            <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.6] text-[#414042] sm:text-[16px]">
              Same day residential and commercial pest control across these suburbs. If yours is
              here, we cover it. Not sure? Call {SITE_CONFIG.phone} and we will tell you straight.
            </p>

            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {ANCHORS.map((anchor) => {
                const suburbs = suburbsByAnchor(anchor.id);
                if (suburbs.length === 0) return null;
                return (
                  <div key={anchor.id}>
                    <h3 className="text-[16px] font-bold leading-tight text-[#0d402e]">
                      {anchor.id === 'city' ? 'From the city' : `From ${anchor.name}`}
                    </h3>
                    <p className="mt-1 text-[13px] leading-snug text-[#6b7280]">{anchor.detail}</p>
                    <ul className="mt-3 border-t border-[#e5e7eb]">
                      {suburbs.map((s) =>
                        s.hasPage ? (
                          <li key={s.slug} className="border-b border-[#e5e7eb]">
                            <Link
                              href={`/${s.slug}/`}
                              className="block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ) : (
                          <li
                            key={s.slug}
                            className="border-b border-[#e5e7eb] py-2 text-[15px] text-[#414042]"
                          >
                            {s.name}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* Same day CTA */}
        <section className="bg-[#2B2B2B] px-4 py-10 text-center sm:px-6 sm:py-12" aria-label="Same day service">
          <div className="mx-auto flex max-w-md flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/group-350.svg"
              alt="Same day service available. Call now!"
              className="h-[160px] w-auto"
            />
          </div>
        </section>
      </div>
    </>
  );
}
