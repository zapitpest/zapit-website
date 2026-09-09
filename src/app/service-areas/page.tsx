import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { OG_DEFAULT_IMAGES, TWITTER_DEFAULT_IMAGES } from '@/lib/seo-defaults';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';

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
  // SERP + social title/description kept in lock-step. Previous split used
  // SITE_CONFIG.name (full 38-char brand) in og:title and a 62-char og:description
  // that ranked worse than the meta description would in a social preview.
  openGraph: {
    title: `Pest Control Service Areas in Melbourne | ${SITE_CONFIG.shortName}`,
    description: `${SITE_CONFIG.shortName} services Melbourne's central, northern, north-west, north-eastern, and eastern suburbs. Same day service available. Call ${SITE_CONFIG.phone}.`,
    url: '/service-areas',
    images: [...OG_DEFAULT_IMAGES],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Pest Control Service Areas in Melbourne | ${SITE_CONFIG.shortName}`,
    description: `${SITE_CONFIG.shortName} services Melbourne's central, northern, north-west, north-eastern, and eastern suburbs. Same day service available. Call ${SITE_CONFIG.phone}.`,
    images: [...TWITTER_DEFAULT_IMAGES],
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={[generateLocalBusinessSchema('Melbourne'), generateBreadcrumbSchema(breadcrumbItems)]} />

      <div className="font-sans text-[#414042]">
        {/* Header */}
        <section className="bg-[#f8f5f2] px-4 pb-4 pt-6 sm:px-6 sm:pt-8 lg:pt-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[26px] font-bold leading-tight text-[#414042] sm:text-[30px] lg:text-[36px]">Service areas</h1>
            <p className="mx-auto mt-4 max-w-2xl text-[18px] italic leading-snug text-[#414042] sm:text-[22px]">
              We service Melbourne&apos;s central, north-west, northern and north-eastern suburbs.
            </p>
          </div>
        </section>

        {/* Map — capped to match the text-section width below for visual consistency on desktop */}
        <section className="relative bg-[#f8f5f2] px-0 pb-10 sm:px-4 sm:pb-14">
          <div className="relative mx-auto w-full max-w-3xl overflow-hidden sm:rounded-2xl lg:shadow-xl">
            <div className="relative aspect-[4/3] w-full min-h-[220px] bg-[#e5e5e5] sm:aspect-[16/9] sm:min-h-[280px] lg:aspect-[16/10]">
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

        {/* ===== SUBURBS WE SERVICE. This page is the target of 269 legacy redirects and until
             10 Sept 2026 it linked to none of the suburb pages, so their only inbound link was
             the sitemap. Every href below is a live page. ===== */}
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-[52px]">
          <div className="mx-auto max-w-3xl lg:max-w-[1280px]">
            <h2 className="text-[22px] font-bold leading-snug text-[#414042] sm:text-[26px] lg:text-[30px]">
              Suburbs we service
            </h2>
            <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.6] text-[#414042] sm:text-[16px]">
              Same day residential and commercial pest control across these Melbourne suburbs.
              Choose yours for local pricing, common pests and what to expect.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
                <li><Link href="/pest-control-altona/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Altona</Link></li>
                <li><Link href="/pest-control-bacchus-marsh/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Bacchus Marsh</Link></li>
                <li><Link href="/pest-control-balwyn/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Balwyn</Link></li>
                <li><Link href="/pest-control-berwick/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Berwick</Link></li>
                <li><Link href="/pest-control-blackburn/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Blackburn</Link></li>
                <li><Link href="/pest-control-box-hill/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Box Hill</Link></li>
                <li><Link href="/pest-control-broadmeadows/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Broadmeadows</Link></li>
                <li><Link href="/pest-control-brunswick/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Brunswick</Link></li>
                <li><Link href="/pest-control-brunswick-west/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Brunswick West</Link></li>
                <li><Link href="/pest-control-bundoora/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Bundoora</Link></li>
                <li><Link href="/pest-control-burwood/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Burwood</Link></li>
                <li><Link href="/pest-control-camberwell/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Camberwell</Link></li>
                <li><Link href="/pest-control-campbellfield/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Campbellfield</Link></li>
                <li><Link href="/pest-control-carlton/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Carlton</Link></li>
                <li><Link href="/pest-control-caroline-springs/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Caroline Springs</Link></li>
                <li><Link href="/pest-control-chadstone/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Chadstone</Link></li>
                <li><Link href="/pest-control-clayton/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Clayton</Link></li>
                <li><Link href="/coburg/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Coburg</Link></li>
                <li><Link href="/pest-control-collingwood/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Collingwood</Link></li>
                <li><Link href="/pest-control-craigieburn/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Craigieburn</Link></li>
                <li><Link href="/pest-control-cranbourne/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Cranbourne</Link></li>
                <li><Link href="/pest-control-croydon/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Croydon</Link></li>
                <li><Link href="/pest-control-dandenong/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Dandenong</Link></li>
                <li><Link href="/pest-control-deer-park/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Deer Park</Link></li>
                <li><Link href="/pest-control-docklands/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Docklands</Link></li>
                <li><Link href="/pest-control-doncaster/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Doncaster</Link></li>
                <li><Link href="/pest-control-east-melbourne/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">East Melbourne</Link></li>
                <li><Link href="/pest-control-epping/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Epping</Link></li>
                <li><Link href="/pest-control-fawkner/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Fawkner</Link></li>
                <li><Link href="/pest-control-fitzroy/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Fitzroy</Link></li>
                <li><Link href="/pest-control-footscray/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Footscray</Link></li>
                <li><Link href="/pest-control-frankston/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Frankston</Link></li>
                <li><Link href="/pest-control-glen-waverley/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Glen Waverley</Link></li>
                <li><Link href="/pest-control-glenroy/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Glenroy</Link></li>
                <li><Link href="/pest-control-hawthorn/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Hawthorn</Link></li>
                <li><Link href="/pest-control-hoppers-crossing/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Hoppers Crossing</Link></li>
                <li><Link href="/pest-control-kensington/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Kensington</Link></li>
                <li><Link href="/pest-control-kew/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Kew</Link></li>
                <li><Link href="/pest-control-keysborough/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Keysborough</Link></li>
                <li><Link href="/pest-control-lilydale/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Lilydale</Link></li>
                <li><Link href="/pest-control-melton/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Melton</Link></li>
                <li><Link href="/pest-control-mill-park/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Mill Park</Link></li>
                <li><Link href="/pest-control-mitcham/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Mitcham</Link></li>
                <li><Link href="/pest-control-mooroolbark/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Mooroolbark</Link></li>
                <li><Link href="/pest-control-mount-waverley/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Mount Waverley</Link></li>
                <li><Link href="/pest-control-mulgrave/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Mulgrave</Link></li>
                <li><Link href="/pest-control-narre-warren/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Narre Warren</Link></li>
                <li><Link href="/pest-control-newport/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Newport</Link></li>
                <li><Link href="/pest-control-noble-park/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Noble Park</Link></li>
                <li><Link href="/pest-control-north-melbourne/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">North Melbourne</Link></li>
                <li><Link href="/pest-control-oakleigh/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Oakleigh</Link></li>
                <li><Link href="/pest-control-parkville/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Parkville</Link></li>
                <li><Link href="/pest-control-pascoe-vale/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Pascoe Vale</Link></li>
                <li><Link href="/pest-control-point-cook/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Point Cook</Link></li>
                <li><Link href="/pest-control-prahran/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Prahran</Link></li>
                <li><Link href="/pest-control-preston/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Preston</Link></li>
                <li><Link href="/reservoir/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Reservoir</Link></li>
                <li><Link href="/pest-control-richmond/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Richmond</Link></li>
                <li><Link href="/pest-control-ringwood/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Ringwood</Link></li>
                <li><Link href="/pest-control-rowville/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Rowville</Link></li>
                <li><Link href="/pest-control-seddon/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Seddon</Link></li>
                <li><Link href="/pest-control-somerton/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Somerton</Link></li>
                <li><Link href="/pest-control-south-yarra/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">South Yarra</Link></li>
                <li><Link href="/pest-control-southbank/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Southbank</Link></li>
                <li><Link href="/pest-control-springvale/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Springvale</Link></li>
                <li><Link href="/pest-control-st-kilda/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">St Kilda</Link></li>
                <li><Link href="/pest-control-sunshine/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Sunshine</Link></li>
                <li><Link href="/pest-control-surrey-hills/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Surrey Hills</Link></li>
                <li><Link href="/pest-control-tarneit/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Tarneit</Link></li>
                <li><Link href="/pest-control-templestowe/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Templestowe</Link></li>
                <li><Link href="/pest-control-thomastown/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Thomastown</Link></li>
                <li><Link href="/pest-control-werribee/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Werribee</Link></li>
                <li><Link href="/pest-control-west-melbourne/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">West Melbourne</Link></li>
                <li><Link href="/pest-control-williamstown/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Williamstown</Link></li>
                <li><Link href="/pest-control-yarraville/" className="inline-block py-2 text-[15px] text-[#414042] underline-offset-2 hover:text-[#3fa535] hover:underline">Yarraville</Link></li>
            </ul>
          </div>
        </section>

        <section className="bg-[#f8f5f2] px-4 py-6 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-3xl">
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
