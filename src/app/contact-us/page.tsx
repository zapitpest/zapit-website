import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';

import ContactForm from '@/components/sections/ContactForm';
import ScrollReveal from '@/components/ui/ScrollReveal';

const DISPLAY_PHONE = '(03) 9126 0555';
const BUSINESS_LINE = 'Zapit Pest & Termite Control';
const ADDRESS_LINE = '80 Porter Rd, Heidelberg Heights , VIC 3081';

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
    title: { absolute: 'Contact Us | Zapit Pest Control Melbourne' },
    description: `Contact ${BUSINESS_LINE}. ${DISPLAY_PHONE} · ${SITE_CONFIG.emailWork} · ${ADDRESS_LINE}. Pest protection you can trust. Same day service available — call now.`,
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

      {/* ===== 1. HEADING ===== */}
      <section className="bg-[#2B2B2B] px-5 pb-2 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[26px] font-bold text-[#f8f5f2] sm:text-[30px]">Contact us</h1>
        </div>
      </section>

      {/* ===== 2. CONTACT DETAILS — Figma spec: Graphik 20px / 28lh / #E5E5E5.
          Headers (business name + "Operating Hours") are bold; details below stay regular. ===== */}
      <section className="bg-[#2B2B2B] px-5 py-8 sm:px-6 sm:py-10">
        <div
          className="mx-auto max-w-[300px] sm:max-w-[400px]"
          style={{ fontSize: '20px', lineHeight: '28px', color: '#E5E5E5' }}
        >
          {/* Business name — bold */}
          <p style={{ fontWeight: 700 }}>{BUSINESS_LINE}</p>
          <p className="mt-3" style={{ fontWeight: 400 }}>{ADDRESS_LINE}</p>
          <p className="mt-3" style={{ fontWeight: 400 }}>ABN 61 682 004 655</p>
          <p className="mt-3" style={{ fontWeight: 400 }}>
            <a href={SITE_CONFIG.phoneTel} className="hover:text-[#1cdc38]">
              {DISPLAY_PHONE}
            </a>
          </p>
          <p className="mt-3" style={{ fontWeight: 400 }}>
            <a
              href={`mailto:${SITE_CONFIG.emailWork}`}
              className="underline underline-offset-2 hover:text-[#1cdc38]"
            >
              {SITE_CONFIG.emailWork}
            </a>
          </p>

          {/* Operating Hours — header bold, list regular */}
          <p className="mt-7" style={{ fontWeight: 700 }}>Operating Hours</p>
          <ul className="mt-2 space-y-2" style={{ fontWeight: 400 }}>
            {OPERATING_HOURS.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 3. SAME DAY SERVICE ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#2B2B2B] px-5 pb-10 sm:px-6 sm:pb-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/group-350.svg" alt="Same day service available. Call now!" className="h-[160px] w-auto" />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 4. RESIDENTIAL ENQUIRY FORM ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#2B2B2B] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-lg">
            <h2 className="mb-1 text-center text-[22px] font-bold text-[#f8f5f2] sm:text-[24px]">Residential enquiry form</h2>
            <div className="mt-4 rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-sm sm:p-6">
              <ContactForm displayPhone={DISPLAY_PHONE} phoneTel={SITE_CONFIG.phoneTel} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 5. MAP ===== */}
      <section className="bg-[#2B2B2B] px-5 pb-10 sm:px-6 sm:pb-14">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-md">
          <iframe
            title="Zapit Pest Control Melbourne Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5!2d144.99!3d-37.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z80+Porter+Rd+Heidelberg+Heights+VIC+3081!5e0!3m2!1sen!2sau!4v1"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </section>
    </>
  );
}
