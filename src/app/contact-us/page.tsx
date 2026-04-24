import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';

const MAP_EMBED =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('80 Porter Rd, Heidelberg Heights VIC 3081, Australia') +
  '&output=embed';

const DISPLAY_PHONE = '(03) 9126 0555';
const BUSINESS_LINE = 'Zap It Pest & Termite Control';
const ADDRESS_LINE = '80 Porter Rd, Heidelberg Heights, VIC 3081';
const ABN = 'ABN 61 682 004 655';
const TAGLINE = 'Pest protection you can trust';

const HOURS: { day: string; hours: string }[] = [
  { day: 'Monday', hours: '8am - 5pm' },
  { day: 'Tuesday', hours: '8am - 5pm' },
  { day: 'Wednesday', hours: '8am - 5pm' },
  { day: 'Thursday', hours: '8am - 5pm' },
  { day: 'Friday', hours: '8am - 5pm' },
  { day: 'Saturday', hours: '8am - 12pm' },
  { day: 'Sunday', hours: 'Closed' },
];

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'Contact Us | Zap It Pest Control Melbourne' },
    description: `Contact ${BUSINESS_LINE}. ${DISPLAY_PHONE} · ${SITE_CONFIG.emailWork} · ${ADDRESS_LINE}. ${TAGLINE}. 24 hour response time guarantee. Same day service available — call now.`,
    alternates: { canonical: '/contact-us' },
    openGraph: { url: '/contact-us' },
  };
}

export default function ContactUsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Contact Us', href: '/contact-us' },
  ]);
  const localBusiness = generateLocalBusinessSchema('Melbourne');

  return (
    <>
      <JsonLd data={[localBusiness, breadcrumbSchema]} />

      <div className="font-sans text-zapit-text">
        <section
          className="bg-zapit-dark text-white"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-3xl px-4 pt-6 pb-10 sm:pt-8 sm:pb-12 md:px-6">
            <p className="mb-6 text-center text-sm text-white/60 sm:text-left">
              <Link href="/" className="hover:text-zapit-green transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/90">Contact us</span>
            </p>

            <p className="mb-2 text-center text-sm font-medium text-white/75 sm:text-left">
              {TAGLINE}
            </p>
            <h1
              id="contact-heading"
              className="mb-8 text-center text-3xl font-bold leading-tight text-white sm:text-4xl md:text-left"
            >
              Contact us
            </h1>

            <div className="space-y-4 text-sm leading-relaxed text-white/85 sm:text-base">
              <p className="text-base font-semibold text-white sm:text-lg">
                {BUSINESS_LINE}
              </p>
              <p className="flex items-start gap-2 text-white/90">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-zapit-green"
                  aria-hidden
                />
                <span>{ADDRESS_LINE}</span>
              </p>
              <p>
                <span className="text-white/80">{ABN}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0 text-zapit-green" aria-hidden />
                <a
                  href={SITE_CONFIG.phoneTel}
                  className="font-medium text-white hover:text-zapit-green transition-colors"
                >
                  {DISPLAY_PHONE}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-zapit-green" aria-hidden />
                <a
                  href={`mailto:${SITE_CONFIG.emailWork}`}
                  className="break-all text-white underline decoration-white/30 underline-offset-2 hover:text-zapit-green hover:decoration-zapit-green"
                >
                  {SITE_CONFIG.emailWork}
                </a>
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="mb-3 flex items-center gap-2 text-base font-bold text-white">
                <Clock className="h-5 w-5 text-zapit-green" aria-hidden />
                Operating hours
              </div>
              <ul className="space-y-2 text-sm text-white/85 sm:text-base">
                {HOURS.map((row) => (
                  <li
                    key={row.day}
                    className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-white/5 py-1.5 last:border-0"
                  >
                    <span className="text-white/90">{row.day}</span>
                    <span className="text-right text-white/80">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="bg-zapit-dark py-8 text-center"
          aria-label="Same day service"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zapit-green/15 ring-1 ring-zapit-green/30"
              aria-hidden
            >
              <Phone className="h-9 w-9 text-zapit-green" strokeWidth={2} />
            </div>
            <p className="text-xl font-semibold italic leading-snug text-zapit-green sm:text-2xl md:text-3xl">
              Same day service available. Call now!
            </p>
          </div>
        </section>

        <section
          className="bg-zapit-section-bg px-4 py-10 sm:px-6 md:py-14"
          aria-labelledby="enquiry-cta"
        >
          <div className="mx-auto max-w-lg">
            <div className="rounded-2xl border border-zapit-border bg-white p-6 shadow-sm sm:p-8 md:p-10">
              <h2
                id="enquiry-cta"
                className="mb-6 text-center text-lg font-bold text-zapit-dark sm:text-xl"
              >
                Residential enquiry form
              </h2>
              <p className="mb-6 text-center text-sm text-zapit-text/90">
                Get in touch instantly — we respond within 24 hours. Call us for the fastest
                service.
              </p>
              <a
                href={SITE_CONFIG.phoneTel}
                className="flex w-full flex-col items-center justify-center gap-1 rounded-full bg-zapit-green px-5 py-4 text-center text-base font-bold text-white shadow-md transition-colors hover:bg-zapit-green-dark sm:flex-row sm:gap-3 sm:py-5 sm:text-lg"
              >
                <span className="inline-flex items-center gap-2">
                  <Phone
                    className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span>Call now</span>
                </span>
                <span className="text-[1.1em] font-bold tracking-tight">
                  {DISPLAY_PHONE}
                </span>
              </a>

              <div className="mt-8 flex items-start justify-center gap-3 border-t border-zapit-border pt-8 text-left">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zapit-green text-white text-sm font-bold"
                  aria-hidden
                >
                  ✓
                </span>
                <p className="text-sm font-medium text-zapit-text sm:text-base">
                  24 hour response time guarantee
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zapit-section-bg pb-10 pt-0 sm:pb-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-3 text-lg font-bold text-zapit-dark sm:text-xl">
              Find us on the map
            </h2>
            <div className="relative aspect-[4/3] w-full min-h-[240px] overflow-hidden rounded-2xl border border-zapit-border bg-zapit-border shadow-sm sm:aspect-[16/9] sm:min-h-[280px]">
              <iframe
                title="Zap It Pest & Termite Control — 80 Porter Rd, Heidelberg Heights"
                src={MAP_EMBED}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
