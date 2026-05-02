import type { Metadata } from 'next';
import Image from 'next/image';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import ScrollReveal from '@/components/ui/ScrollReveal';

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

      {/* ===== 1. HERO — About us title + subtitle ===== */}
      <section className="bg-[#0d402e] px-5 pb-6 pt-8 sm:px-6 sm:pb-8 sm:pt-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-[26px] font-bold text-[#f8f5f2] sm:text-[30px]">About us</h1>
          <p className="text-[16px] leading-[1.6] text-[#f8f5f2]/85 sm:text-[17px]">
            Built on trust, with an uncompromising commitment to customer satisfaction and professional standards.
          </p>
        </div>
      </section>

      {/* ===== 2. GREEN TRUST PILLS — white tick bg, black tick, black text ===== */}
      <section className="bg-[#0d402e] px-5 pb-8 sm:px-6 sm:pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto max-w-[300px] rounded-2xl bg-[#1cdc38] px-5 py-5">
            <div className="space-y-3">
              {TRUST_PILLS.map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="11" fill="white" />
                    <path d="M7 12l3 3 7-7" stroke="#131a1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[16px] font-bold text-[#131a1c]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. COMMITTED TO PROTECTING — large bold centered heading ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#0d402e] px-5 pb-10 sm:px-6 sm:pb-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-[26px] font-extrabold leading-tight text-[#f8f5f2] sm:text-[30px]">
              Committed to protecting what&apos;s important to you
            </h2>
            <div className="space-y-5 text-[16px] leading-[1.8] text-[#f8f5f2]/85 sm:text-[17px]">
              <p>
                Your health and safety are at the heart of everything we do, supported by industry-leading pest protection technology and customer care.
              </p>
              <p>
                We understand the different risks all types of pests pose to people, pets and property. Whether you live in a flat with a much-loved pet, have a family of five, or run a business, we tailor the best pest protection solution to suit your needs.
              </p>
              <p>
                We treat your home and business with the same care as our own. Our service extends beyond the initial treatment by providing you practical guidance to help prevent future infestations.
              </p>
              <p>We&apos;re here for you now and into the future.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 4. FOUNDER IMAGE ===== */}
      <section className="w-full">
        <div className="relative">
          <Image
            src="/images/about/founder-adam.png"
            alt="Founder, Adam Balli"
            width={1200}
            height={900}
            className="h-auto w-full"
            priority
          />
          <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4 text-[16px] font-medium text-white sm:text-[18px]">
            Founder, Adam Balli
          </p>
        </div>
      </section>

      {/* ===== 5. OUR STORY — larger, bolder text ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#2B2B2B] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-[24px] font-bold italic text-[#f8f5f2] sm:text-[28px]">Our story</h2>
            <div className="space-y-5 text-[17px] font-medium leading-[1.8] text-[#f8f5f2]/90 sm:text-[18px]">
              <p>
                Founded in 2020 by Adam Balli, the business began by servicing Melbourne&apos;s northern suburbs with a strong commitment to customer care and professional service.
              </p>
              <p>
                Within a short period, Adam earned a reputation for delivering effective, eco-friendly, and long-lasting results, reflected in a 5-star Google rating.
              </p>
              <p>
                Building on this success, the business has expanded across Melbourne&apos;s eastern, northern, western, and inner suburbs. Our experienced and dedicated team of licensed professionals continues to deliver the same high level of care the Zapit was founded on.
              </p>
              <p>
                To date, we have supported over 5,000 residential customers and more than 500 commercial clients, consistently delivering reliable and effective pest control solutions.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 6. CERTIFICATIONS ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-3 text-[24px] font-bold text-[#131a1c] sm:text-[28px]">
              Insured, licensed, accredited and legally compliant
            </h2>
            <p className="mb-3 text-[15px] leading-[1.7] text-[#414042] sm:text-[16px]">
              Your health and safety is at the heart of everything we do. Your trust in us is backed by our industry memberships, accreditations, licences and professional insurance.
            </p>
            <p className="mb-6 text-[15px] leading-[1.7] text-[#414042] sm:text-[16px]">
              We&apos;re committed to provide the safest and best possible pest control solutions. We maintain our professional currency by staying at the forefront of advances in technology, regulatory compliance and industry standards.
            </p>

            <ul className="mb-8 space-y-4">
              <li>
                <p className="text-[16px] font-bold text-[#131a1c]">The Australian Environmental Pest Managers Association</p>
                <p className="text-[14px] text-[#414042]">Membership number: XXXXXX</p>
              </li>
              <li>
                <p className="text-[16px] font-bold text-[#131a1c]">HACCP Food Safety Certificate</p>
                <p className="text-[14px] text-[#414042]">Certificate number: XXXXXX</p>
              </li>
              <li>
                <p className="text-[16px] font-bold text-[#131a1c]">VIC Government Wildlife Licence</p>
                <p className="text-[14px] text-[#414042]">Licence number: XXXXXX</p>
              </li>
            </ul>

            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center justify-center gap-8">
                <figure className="flex flex-col items-center text-center">
                  <Image src="/images/commercial/cert-wildlife.png" alt="Wildlife Licensed" width={120} height={100} className="h-20 w-auto object-contain sm:h-24" />
                  <figcaption className="mt-2 text-[14px] font-semibold text-[#414042]">Wildlife Licenced</figcaption>
                </figure>
                <figure className="flex flex-col items-center text-center">
                  <Image src="/images/commercial/cert-haccp.png" alt="HACCP Food Safety Certification" width={120} height={100} className="h-20 w-auto object-contain sm:h-24" />
                  <figcaption className="mt-2 text-[14px] font-semibold text-[#414042]">HACCP Food Safety<br />Certification</figcaption>
                </figure>
              </div>
              <figure className="flex flex-col items-center text-center">
                <Image src="/images/commercial/cert-aepma.png" alt="AEPMA" width={160} height={80} className="h-16 w-auto object-contain sm:h-20" />
                <figcaption className="mt-2 text-[14px] font-semibold text-[#414042]">Australian Environmental<br />Pest Managers Association</figcaption>
              </figure>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
