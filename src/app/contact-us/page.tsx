import type { Metadata } from 'next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';
import ContactForm from '@/components/sections/ContactForm';

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
        {/* Header — business info + operating hours */}
        <section className="bg-white" aria-labelledby="contact-heading">
          <div className="mx-auto max-w-3xl px-4 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8">
            <h1 id="contact-heading" className="mb-5 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
              Contact us
            </h1>

            <div className="space-y-2.5 text-sm leading-[1.6] text-[#414042] sm:text-base">
              <p className="text-base font-bold text-[#131a1c] sm:text-[17px]">{BUSINESS_LINE}</p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1cdc38]" aria-hidden />
                <span>{ADDRESS_LINE}</span>
              </p>
              <p>{ABN}</p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#1cdc38]" aria-hidden />
                <a href={SITE_CONFIG.phoneTel} className="font-medium text-[#131a1c] transition-colors hover:text-[#1cdc38]">
                  {DISPLAY_PHONE}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#1cdc38]" aria-hidden />
                <a
                  href={`mailto:${SITE_CONFIG.emailWork}`}
                  className="break-all text-[#1cdc38] underline decoration-[#1cdc38]/30 underline-offset-2 transition-colors hover:text-[#0d402e]"
                >
                  {SITE_CONFIG.emailWork}
                </a>
              </p>
            </div>

            {/* Operating hours */}
            <div className="mt-6 border-t border-[#e5e5e5] pt-6">
              <p className="mb-3 text-sm font-bold text-[#131a1c] sm:text-base">Operating Hours</p>
              <ul className="list-none space-y-1 text-sm text-[#414042] sm:text-[15px]">
                {OPERATING_HOURS.map((row) => (
                  <li key={row}>{row}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Same Day CTA — uses group-350.svg bus graphic */}
        <section className="bg-white pb-4 pt-2 text-center sm:pb-6" aria-label="Same day service">
          <div className="mx-auto max-w-md px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/group-350.svg"
              alt="Same day service available. Call now!"
              className="mx-auto w-full max-w-[320px] sm:max-w-[360px]"
            />
          </div>
        </section>

        {/* Residential enquiry form */}
        <section className="bg-white px-4 pb-10 pt-2 sm:px-6 sm:pb-12" aria-labelledby="residential-form-heading">
          <div className="mx-auto max-w-lg">
            <div className="rounded-[20px] border border-[#e5e5e5] bg-[#f8f5f2] p-6 shadow-sm sm:p-8">
              <h2 id="residential-form-heading" className="mb-5 text-[17px] font-bold text-[#131a1c] sm:text-[19px]">
                Residential enquiry form
              </h2>

              <ContactForm displayPhone={DISPLAY_PHONE} phoneTel={SITE_CONFIG.phoneTel} />
            </div>
          </div>
        </section>
      </div>

      <PageInfoFooterBlock />
    </>
  );
}
