import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Truck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';

const MAP_EMBED =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('80 Porter Rd, Heidelberg Heights VIC 3081, Australia') +
  '&output=embed';

const DISPLAY_PHONE = '(03) 9126 0555';
const BUSINESS_LINE = 'Zap It Pest & Termite Control';
const ADDRESS_LINE = '80 Porter Rd, Heidelberg Heights, VIC 3081';
const ABN = 'ABN 61 682 004 655';

const OPERATING_HOURS = [
  'Monday, 8am – 5pm',
  'Tuesday, 8am – 5pm',
  'Wednesday, 8am – 5pm',
  'Thursday, 8am – 5pm',
  'Friday, 8am – 5pm',
  'Saturday, 8am – 12pm',
  'Sunday, Closed',
] as const;

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'Contact Us | Zap It Pest Control Melbourne' },
    description: `Contact ${BUSINESS_LINE}. ${DISPLAY_PHONE} · ${SITE_CONFIG.emailWork} · ${ADDRESS_LINE}. Pest protection you can trust. 24 hour response time guarantee. Same day service available — call now.`,
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

      <div className="font-sans text-[#414042]">
        {/* Header */}
        <section className="bg-white" aria-labelledby="contact-heading">
          <div className="mx-auto max-w-3xl px-4 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8">
            <h1 id="contact-heading" className="mb-6 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
              Contact us
            </h1>

            <div className="space-y-3 text-sm leading-[1.6] text-[#414042] sm:text-base">
              <p className="text-base font-bold text-[#131a1c] sm:text-[17px]">{BUSINESS_LINE}</p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#3fa535]" aria-hidden />
                <span>{ADDRESS_LINE}</span>
              </p>
              <p>{ABN}</p>
              <p className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0 text-[#3fa535]" aria-hidden />
                <a href={SITE_CONFIG.phoneTel} className="font-medium text-[#131a1c] transition-colors hover:text-[#3fa535]">
                  {DISPLAY_PHONE}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#3fa535]" aria-hidden />
                <a
                  href={`mailto:${SITE_CONFIG.emailWork}`}
                  className="break-all text-[#3fa535] underline decoration-[#3fa535]/30 underline-offset-2 transition-colors hover:text-[#0d402e]"
                >
                  {SITE_CONFIG.emailWork}
                </a>
              </p>
            </div>

            {/* Operating hours */}
            <div className="mt-8 border-t border-[#e5e5e5] pt-8">
              <div className="mb-3 flex items-center gap-2 text-base font-bold text-[#131a1c]">
                <Clock className="h-5 w-5 text-[#3fa535]" aria-hidden />
                Operating Hours
              </div>
              <ul className="list-none space-y-1.5 text-sm text-[#414042] sm:text-base">
                {OPERATING_HOURS.map((row) => (
                  <li key={row} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3fa535]" aria-hidden />
                    {row}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Same Day CTA */}
        <section className="bg-white py-5 text-center sm:py-7" aria-label="Same day service">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4">
            <Truck className="h-12 w-12 text-[#1cdc38] sm:h-14 sm:w-14" strokeWidth={1.25} aria-hidden />
            <a href={SITE_CONFIG.phoneTel} className="text-lg font-bold italic leading-snug text-[#1cdc38] sm:text-xl">
              Same day service available. Call now!
            </a>
          </div>
        </section>

        {/* Residential enquiry card */}
        <section className="bg-white px-4 pb-8 pt-2 sm:px-6 sm:pb-10" aria-labelledby="residential-cta">
          <div className="mx-auto max-w-lg">
            <div className="rounded-[20px] border border-[#e5e5e5] bg-[#f8f5f2] p-6 shadow-sm sm:p-8">
              <h2 id="residential-cta" className="mb-2 text-center text-lg font-bold text-[#131a1c] sm:text-xl">
                Residential enquiry form
              </h2>
              <p className="mb-6 text-center text-sm leading-[1.6] text-[#414042] sm:text-base">
                Call us for a fast, friendly response — we&apos;re here to help.
              </p>
              <a
                href={SITE_CONFIG.phoneTel}
                className="flex w-full flex-col items-center justify-center gap-1 rounded-full bg-[#3fa535] px-5 py-4 text-center text-base font-bold text-white transition-colors hover:bg-[#0d402e] sm:flex-row sm:gap-3 sm:py-5 sm:text-lg"
              >
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" strokeWidth={2.5} aria-hidden />
                  <span>Call now</span>
                </span>
                <span className="text-[1.1em] font-bold tracking-tight">{DISPLAY_PHONE}</span>
              </a>
              <div className="mt-6 flex items-start justify-center gap-3 border-t border-[#e5e5e5] pt-6 text-left">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3fa535] text-sm font-bold text-white" aria-hidden>
                  ✓
                </span>
                <p className="text-sm font-medium text-[#414042] sm:text-base">24 hour response time guarantee</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="bg-white px-4 pb-10 sm:px-6 sm:pb-12">
          <div className="mx-auto max-w-5xl">
            <div className="relative aspect-[4/3] w-full min-h-[240px] overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2] sm:aspect-[16/9] sm:min-h-[280px]">
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

      <PageInfoFooterBlock />
    </>
  );
}
