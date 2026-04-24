import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Phone, Truck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';

const MELBOURNE_MAP_EMBED =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('Melbourne, Victoria, Australia') +
  '&z=10&output=embed';

const SUBURB_REGIONS: { title: string; suburbs: string[] }[] = [
  {
    title: 'Northern',
    suburbs: [
      'Coburg',
      'Brunswick',
      'Reservoir',
      'Preston',
      'Thornbury',
      'Northcote',
      'Heidelberg',
      'Bundoora',
      'Macleod',
      'Watsonia',
      'Mill Park',
      'Thomastown',
      'Epping',
      'Lalor',
      'Greensborough',
      'Eltham',
      'Doncaster',
    ],
  },
  {
    title: 'Eastern',
    suburbs: [
      'Blackburn',
      'Box Hill',
      'Mitcham',
      'Ringwood',
      'Nunawading',
      'Vermont',
      'Forest Hill',
      'Surrey Hills',
      'Mont Albert',
      'Templestowe',
      'Croydon',
      'Knox',
    ],
  },
  {
    title: 'Central',
    suburbs: ['Melbourne CBD', 'Carlton', 'Fitzroy', 'Collingwood', 'Richmond'],
  },
];

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Service Areas', href: '/service-areas' },
];

export const metadata: Metadata = {
  title: 'Pest Control Service Areas in Melbourne',
  description: `${SITE_CONFIG.shortName} services Melbourne’s central, northern, north-west, north-eastern, and eastern suburbs. Same day service available. Call ${SITE_CONFIG.phone}.`,
  alternates: {
    canonical: '/service-areas',
  },
  openGraph: {
    title: `Service Areas | ${SITE_CONFIG.name}`,
    description: `See where we work across Melbourne. ${SITE_CONFIG.tagline}`,
    url: '/service-areas',
  },
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd
        data={[generateLocalBusinessSchema('Melbourne'), generateBreadcrumbSchema(breadcrumbItems)]}
      />

      <div className="font-sans text-zapit-text">
        {/* Intro: tagline + title band + subtitle (mobile-first) */}
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 pt-6 pb-4 text-center sm:pt-8">
            <p className="text-[15px] leading-snug text-zapit-text/70 sm:text-base">{SITE_CONFIG.tagline}</p>
          </div>
          <div className="bg-zapit-section-bg/80 border-y border-zapit-border/60">
            <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
              <h1 className="text-left text-3xl font-bold tracking-tight text-zapit-dark sm:text-4xl">Service areas</h1>
            </div>
          </div>
          <p className="mx-auto max-w-2xl px-4 py-5 text-center text-[16px] italic leading-relaxed text-zapit-text/85 sm:py-6 sm:text-[17px]">
            We service Melbourne&apos;s central, north-west, northern and north-eastern suburbs.
          </p>
        </section>

        {/* Map + service-area highlight + floating Call now */}
        <section className="relative bg-white px-0 pb-8 sm:pb-10">
          <div className="relative mx-auto w-full max-w-5xl overflow-hidden sm:px-4">
            <div className="relative aspect-[4/3] w-full min-h-[220px] bg-zapit-border sm:aspect-[16/9] sm:min-h-[280px] sm:rounded-2xl sm:border sm:border-zapit-border sm:shadow-sm">
              <iframe
                title="Melbourne service area map"
                src={MELBOURNE_MAP_EMBED}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden
              >
                <div className="relative h-[min(72%,18rem)] w-[min(72%,18rem)] rounded-full border-[5px] border-zapit-green shadow-[0_0_0_1px_rgba(63,165,53,0.2)] sm:h-[min(65%,20rem)] sm:w-[min(65%,20rem)] sm:border-[6px]" />
                <div className="absolute right-[12%] top-[16%] flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md sm:right-[14%] sm:top-[18%] sm:h-10 sm:w-10">
                  <CheckCircle2 className="h-6 w-6 text-zapit-green sm:h-7 sm:w-7" strokeWidth={2.25} />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex translate-y-1/2 justify-center px-4 sm:translate-y-[40%]">
              <div className="pointer-events-auto">
                <Link
                  href={SITE_CONFIG.phoneTel}
                  className="inline-flex items-center gap-2 rounded-full bg-zapit-green px-6 py-3.5 text-base font-bold text-zapit-green-dark shadow-lg transition-colors hover:bg-zapit-green-dark hover:text-white sm:px-7 sm:py-4 sm:text-lg"
                  aria-label={`Call now on ${SITE_CONFIG.phone}`}
                >
                  <Phone className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
                  Call now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Suburb chips + CTA */}
        <section className="bg-white px-4 pb-12 pt-16 sm:pb-16 sm:pt-20">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="text-center text-2xl font-bold text-zapit-dark sm:text-3xl">Suburbs we serve</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-zapit-text/90 sm:text-base">
              Browse the suburbs below. If yours isn&apos;t listed, call us—coverage can vary by job type and
              availability.
            </p>

            <div className="mt-10 space-y-10">
              {SUBURB_REGIONS.map((region) => (
                <div key={region.title}>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zapit-green-dark sm:text-base">
                    {region.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {region.suburbs.map((name) => (
                      <span
                        key={name}
                        className="inline-flex rounded-full border border-zapit-border bg-zapit-light/60 px-3.5 py-2 text-sm font-medium text-zapit-dark sm:px-4"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href={SITE_CONFIG.phoneTel}
                className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-zapit-green px-6 py-4 text-center text-base font-bold text-white shadow-md transition-colors hover:bg-zapit-green-dark sm:text-lg"
              >
                Check your suburb — call us
              </Link>
            </div>
          </div>
        </section>

        {/* About us */}
        <section className="bg-zapit-light px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-zapit-dark sm:text-3xl">About us</h2>
            <p className="mt-4 text-[17px] font-medium leading-relaxed text-zapit-dark sm:text-lg">
              Built on trust, with an uncompromising commitment to customer satisfaction and professional standards.
            </p>
            <h3 className="mt-8 text-xl font-bold text-zapit-dark sm:text-2xl">
              Committed to protecting what&apos;s important to you
            </h3>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.7] text-zapit-text sm:text-[17px]">
              <p>
                Your health and safety come first. We combine industry-leading pest protection with a genuine focus on
                how you live and work—so you get effective results without unnecessary worry.
              </p>
              <p>
                We understand that every home and business faces different risks. Whether you share your space with
                children, pets, staff, or customers, we tailor our approach to what matters on your property.
              </p>
              <p>
                We treat your home or site with the same care we&apos;d want for our own. Our work doesn&apos;t end at
                the first treatment—we look at how pests got in, what keeps them out, and what you can do between
                visits.
              </p>
              <p>
                You&apos;ll get honest advice, practical guidance, and solutions designed for lasting protection—not a
                quick fix that unravels next season.
              </p>
              <p className="font-medium text-zapit-dark">We&apos;re here for you, now and into the future.</p>
            </div>
          </div>
        </section>

        {/* Same day callout */}
        <section className="bg-zapit-dark px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center" aria-hidden>
              <Truck className="h-12 w-12 text-zapit-green sm:h-14 sm:w-14" strokeWidth={1.5} />
            </div>
            <p className="text-2xl font-bold italic leading-tight text-zapit-green sm:text-3xl md:text-4xl">
              <Link
                href={SITE_CONFIG.phoneTel}
                className="underline decoration-zapit-green/50 underline-offset-4 transition-colors hover:decoration-zapit-green"
              >
                Same day service available. Call now!
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
