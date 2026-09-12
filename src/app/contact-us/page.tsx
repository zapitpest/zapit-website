import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { OG_DEFAULT_IMAGES, TWITTER_DEFAULT_IMAGES } from '@/lib/seo-defaults';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';

import ContactForm from '@/components/sections/ContactForm';
import ScrollReveal from '@/components/ui/ScrollReveal';

const DISPLAY_PHONE = SITE_CONFIG.phone;
const BUSINESS_LINE = 'Zap It Pest & Termite Control';
const ADDRESS_LINE = '80 Porter Rd, Heidelberg Heights , VIC 3081';

const OPERATING_HOURS = [
  'Monday, 8am to 5pm',
  'Tuesday, 8am to 5pm',
  'Wednesday, 8am to 5pm',
  'Thursday, 8am to 5pm',
  'Friday, 8am to 5pm',
  'Saturday, 8am to 12pm',
  'Sunday, Closed',
] as const;

export function generateMetadata(): Metadata {
  // Use shortName in title to match the site-wide template — was 52 chars
  // with full brand, which pushed close to Google's SERP truncation edge.
  // Prior title was 31 chars — under Google's 40 lower bound. Extended with
  // the Melbourne keyword tail; still comfortably under the 60-char cap.
  const title = 'Contact Zap It Pest Control Melbourne | Call Today';
  const description = `Contact ${BUSINESS_LINE}. Call ${DISPLAY_PHONE} or email ${SITE_CONFIG.emailWork}. Same-day service available.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: '/contact-us' },
    openGraph: { title, description, url: '/contact-us', images: [...OG_DEFAULT_IMAGES] },
    twitter: { card: 'summary_large_image', title, description, images: [...TWITTER_DEFAULT_IMAGES] },
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

      {/* ===== 1. CONTACT — Contact us frame: three columns across the 1280 canvas.
             Details at x=52 (375 wide), Our promise + hours at x=459 (349), enquiry form
             at x=856 (354). The build stacked all three in a 300-500px centred column, so
             the desktop page was the phone page with empty space either side. Mobile keeps
             the same stack, in the same order. ===== */}
      <div className="w-full bg-[#2B2B2B]">
        <div className="mx-auto max-w-[1280px] px-5 pb-8 pt-8 sm:px-6 sm:pt-10 lg:grid lg:grid-cols-[375px_349px_minmax(0,1fr)] lg:items-start lg:gap-x-12 lg:px-[52px] lg:py-14">

          {/* Column 1 — who and where */}
          <div>
            <h1 className="text-[26px] font-bold text-[#f8f5f2] sm:text-[30px] lg:text-[34px]">Contact us</h1>
            <div
              className="mt-6 max-w-[400px] lg:mt-7 lg:max-w-none"
              style={{ fontSize: '20px', lineHeight: '28px', color: '#E5E5E5' }}
            >
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
            </div>
          </div>

          {/* Column 2 — promise and hours. The design pairs these; the build had hours
              hanging off the address block and no promise on this page at all. Copy is
              the same wording already approved in the footer. */}
          <div className="mt-10 max-w-[400px] text-[#f8f5f2] lg:mt-[68px] lg:max-w-none">
            <h2 className="text-[20px] font-bold">Our promise</h2>
            <p className="mt-3 text-[16px] leading-[1.7] text-[#f8f5f2]/85">
              When you protect your home and property from pests with us, your peace of mind is
              our priority. We&apos;re fully insured, and we treat your home with the same care as
              our own, using high quality, long lasting solutions you can rely on.
            </p>
            <h2 className="mt-8 text-[20px] font-bold">Operating Hours</h2>
            <ul className="mt-3 space-y-1 text-[16px] leading-[1.7] text-[#f8f5f2]/85">
              {OPERATING_HOURS.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Column 3 — enquiry form */}
          <div className="mt-10 lg:mt-[68px]">
            <ScrollReveal direction="up">
              <h2 className="text-center text-[22px] font-bold text-[#f8f5f2] sm:text-[24px] lg:text-left lg:text-[20px]">
                Enquiry form
              </h2>
              <div className="mx-auto mt-4 max-w-lg rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-sm sm:p-6 lg:mx-0 lg:max-w-none">
                <ContactForm displayPhone={DISPLAY_PHONE} phoneTel={SITE_CONFIG.phoneTel} />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      {/* ===== 3. SAME DAY SERVICE ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#2B2B2B] px-5 pb-10 sm:px-6 sm:pb-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/group-350.svg" alt="Same day service available. Call now!" className="h-[160px] w-auto" />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 5. MAP ===== */}
      <section className="bg-[#2B2B2B] px-5 pb-10 sm:px-6 sm:pb-14">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-md lg:max-w-[1176px]">
          <iframe
            title="Zap It Pest Control Melbourne Location"
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
