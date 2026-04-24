import type { Metadata } from 'next';
import Image from 'next/image';
import { Truck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';

const WP = '/images/wp-assets';

const HERO_IMAGE = `${WP}/2025-06-Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp`;

const TRUST_PILLS = [
  'Child safe',
  'Pet safe',
  'Eco friendly',
  'Accredited',
  'Insured',
  'DHHS Licensed',
  'Online compliance certificates',
] as const;

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Zap It Pest & Termite Control Melbourne: built on trust, with an uncompromising commitment to customer satisfaction, professional standards, and safe pest protection across Melbourne.',
  alternates: { canonical: '/about-us' },
  openGraph: {
    url: '/about-us',
    title: 'About Us',
    description:
      'Learn about Zap It — Melbourne pest control built on trust, child- and pet-safe methods, and trade-qualified professionals.',
  },
};

export default function AboutUsPage() {
  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about-us' },
    ]),
    generateLocalBusinessSchema('Melbourne'),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="font-sans text-white">
        {/* Hero */}
        <section className="bg-[#0d402e]">
          <div className="mx-auto max-w-6xl px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-5">
            <h1 className="mb-3 text-[22px] font-bold leading-tight text-[#f8f5f2] sm:text-[26px]">About us</h1>
            <p className="max-w-3xl text-base leading-[1.6] text-[#f8f5f2]">
              Built on trust, with an uncompromising commitment to customer satisfaction and professional standards.
            </p>
          </div>
        </section>

        {/* Trust pills */}
        <section className="bg-[#0d402e] px-4 pb-8 sm:px-6 sm:pb-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {TRUST_PILLS.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1cdc38] px-3 py-2 text-sm font-medium text-white sm:px-4 sm:py-2.5 sm:text-[15px]"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Committed section */}
        <section className="bg-[#0d402e] px-4 pb-10 sm:px-6 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 max-w-2xl text-[18px] font-bold leading-snug text-[#f8f5f2] sm:text-[20px]">
              Committed to protecting what&apos;s important to you
            </h2>
            <div className="max-w-none space-y-4 text-sm leading-[1.6] text-[#f8f5f2] sm:text-[15px]">
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

        {/* Technician image */}
        <section className="bg-[#0d402e]">
          <div className="relative mx-auto w-full max-w-6xl px-0 sm:px-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden max-sm:min-h-[220px] sm:aspect-[16/9] sm:rounded-2xl">
              <Image
                src={HERO_IMAGE}
                alt="Zap It technician providing professional pest treatment at a Melbourne home"
                fill
                className="object-cover"
                sizes="(max-width: 1152px) 100vw, 1152px"
                priority
              />
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-left text-sm text-white/95 sm:px-6 sm:py-4 sm:text-base">
                Founder, Adam Balli
              </p>
            </div>
          </div>
        </section>

        {/* Same day CTA */}
        <section className="bg-[#0d402e] px-4 py-8 text-center sm:px-6 sm:py-10" aria-label="Same day service">
          <div className="mx-auto max-w-3xl">
            <Truck className="mx-auto mb-3 h-10 w-10 text-[#1cdc38] sm:h-12 sm:w-12" strokeWidth={1.5} aria-hidden />
            <a href={SITE_CONFIG.phoneTel} className="text-lg font-bold italic leading-tight text-[#1cdc38] sm:text-xl">
              Same day service available. Call now!
            </a>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-[#2b2b2b] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-5 text-[18px] font-bold leading-snug text-[#f8f5f2] sm:text-[20px]">Our story</h2>
            <div className="space-y-4 text-sm leading-[1.65] text-[#f8f5f2]/95 sm:text-[15px]">
              <p>
                Founded in 2020 by Adam Balli, the business started with a single van and a strong commitment to honest,
                reliable pest control in Melbourne&apos;s northern suburbs and beyond.
              </p>
              <p>
                Within a short period, Adam invested in trade-qualified technicians, advanced tools, and environmentally
                conscious methods to deliver the same level of care and accountability to every customer — from everyday
                residential treatments to complex commercial programs.
              </p>
              <p>
                Today, Zap It protects more than 5,000 residential customers and more than 500 commercial sites across
                Melbourne, with the same personal approach Adam started with.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Insured, licensed, accredited */}
      <section className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-[18px] font-bold leading-snug text-[#414042] sm:mb-5 sm:text-[20px]">
            Insured, licensed, accredited and legally compliant
          </h2>
          <div className="mb-6 space-y-4 text-sm leading-[1.65] text-[#414042] sm:text-base">
            <p>
              {SITE_CONFIG.name} operates with appropriate insurance and meets the licensing and record-keeping
              expectations for professional pest management in Victoria. Our memberships and training follow national
              best practice so you can trust that work on your property is safe and lawful.
            </p>
          </div>

          <ul className="mb-8 list-none space-y-3 text-sm text-[#414042] sm:text-base">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3fa535] text-xs text-white" aria-hidden>✓</span>
              <span><strong className="text-[#131a1c]">The Australian Environmental Pest Managers Association</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3fa535] text-xs text-white" aria-hidden>✓</span>
              <span><strong className="text-[#131a1c]">HACCP Food Safety Certificate</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3fa535] text-xs text-white" aria-hidden>✓</span>
              <span><strong className="text-[#131a1c]">VIC Government Wildlife Licence</strong></span>
            </li>
          </ul>

          <div className="grid grid-cols-2 gap-6 border-t border-[#e5e5e5] pt-8 sm:grid-cols-4 sm:gap-4 sm:pt-10">
            <figure className="flex flex-col items-center text-center">
              <Image
                src={`${WP}/2025-04-WhatsApp-Image-2025-04-25-at-23.36.21_3d87ac70-300x300.jpg`}
                alt="Wildlife Licensed"
                width={120}
                height={80}
                className="h-16 w-auto object-contain sm:h-20"
              />
              <figcaption className="mt-2 text-xs font-medium text-[#414042] sm:text-sm">Wildlife Licensed</figcaption>
            </figure>
            <figure className="flex flex-col items-center text-center">
              <Image
                src={`${WP}/2024-07-aempa-v2-1-1-e1745687916424-173x300.png`}
                alt="HACCP Food Safety Certification"
                width={140}
                height={80}
                className="h-16 w-auto object-contain sm:h-20"
              />
              <figcaption className="mt-2 text-xs font-medium text-[#414042] sm:text-sm">HACCP Food Safety</figcaption>
            </figure>
            <figure className="flex flex-col items-center text-center">
              <Image
                src={`${WP}/2024-07-aempa-v2-1-e1745687358594-768x321.png`}
                alt="Australian Environmental Pest Managers Association"
                width={120}
                height={80}
                className="h-16 w-auto object-contain sm:h-20"
              />
              <figcaption className="mt-2 text-xs font-medium text-[#414042] sm:text-sm">Australian Environmental Pest Managers Association</figcaption>
            </figure>
            <figure className="flex flex-col items-center text-center">
              <Image
                src={`${WP}/2024-07-200dguarantee-e1745687539942-300x300.png`}
                alt="Pest Managers Association"
                width={120}
                height={80}
                className="h-16 w-auto object-contain sm:h-20"
              />
              <figcaption className="mt-2 text-xs font-medium text-[#414042] sm:text-sm">Pest Managers Association</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <PageInfoFooterBlock />
    </>
  );
}
