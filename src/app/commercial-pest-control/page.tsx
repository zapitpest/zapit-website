import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';

import ScrollReveal from '@/components/ui/ScrollReveal';
import type { BreadcrumbItem } from '@/types';

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Commercial Pest Control', href: '/commercial-pest-control' },
];

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'Commercial Pest Control Melbourne | Zap It Pest & Termite Control' },
    description: 'Protect your business with structured, compliant pest management. Restaurants, warehouses, hospitals, schools and more across Melbourne.',
    openGraph: { title: 'Commercial Pest Control Melbourne | Zap It', description: 'Reliable, compliant commercial pest control across Melbourne.', url: `${SITE_CONFIG.url}/commercial-pest-control` },
    alternates: { canonical: '/commercial-pest-control' },
  };
}

export default function CommercialPestControlPage() {
  const schemas = [
    generateServiceSchema('Commercial Pest Control Melbourne', 'Protect your brand, staff and customers with structured pest management across Melbourne.'),
    generateLocalBusinessSchema('Melbourne'),
    generateBreadcrumbSchema(BREADCRUMBS),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <h1 className="sr-only">Commercial Pest Control Melbourne — Zap It Pest &amp; Termite Control</h1>

      {/* ===== 1. HERO — just the image ===== */}
      <section className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/commercial/commercial-kitchen-hero.png"
          alt="Tailored solutions to protect your business - Commercial kitchen pest control"
          className="h-auto w-full"
          loading="eager"
        />
      </section>

      {/* ===== 2. PROTECTING WHAT MATTERS ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#2B2B2B] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-5 text-[24px] font-bold leading-tight text-[#f8f5f2] sm:text-[30px]">
              Protecting what matters<br />to your business
            </h2>
            <p className="mb-4 text-[16px] leading-[1.8] text-[#f8f5f2]/85 sm:text-[17px]">
              We partner with commercial operators in regulated environments who cannot afford pest risk. Our relationship-led approach delivers ongoing pest management through structured protection systems, including scheduled servicing, monitoring, inspections and compliance reporting.
            </p>
            <p className="mb-4 text-[16px] leading-[1.8] text-[#f8f5f2]/85 sm:text-[17px]">
              Our strength is discipline. Clear plans, consistent communication and a clean, professional process make us reliable and easy to work with across complex sites.
            </p>
            <p className="mb-8 text-[16px] leading-[1.8] text-[#f8f5f2]/85 sm:text-[17px]">
              Call to arrange a site inspection and proposal, or speak with us to organise a tailored pest management plan.
            </p>

            {/* Green checklist card — narrow & centered */}
            <div className="mx-auto max-w-[280px] rounded-2xl bg-[#1cdc38] px-5 py-5">
              <div className="space-y-3">
                {['Tailored solutions', 'Targeted', 'Effective', 'Accredited', 'Insured', 'DHHS Licensed', 'Online compliance certificates'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/commercial/check-icon.svg" alt="" className="h-7 w-7 shrink-0" aria-hidden />
                    <span className="text-[16px] font-semibold text-[#131a1c]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 3. ZAYDAN PHOTO (full-width) ===== */}
      <section className="w-full">
        <Image src="/images/commercial/zaydan-photo.png" alt="Zaydan - Commercial Consultant at Zapit" width={1074} height={1200} className="h-auto w-full" />
      </section>

      {/* ===== 4. ZAYDAN BIO TEXT ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#2B2B2B] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-[24px] font-bold text-[#f8f5f2] sm:text-[28px]">Zaydan Surname</h2>
            <p className="mt-1 text-[17px] text-[#f8f5f2]/70 sm:text-[19px]">Commercial Consultant<br />Zapit</p>
            <div className="mt-5 space-y-4 text-[16px] leading-[1.8] text-[#f8f5f2]/85 sm:text-[17px]">
              <p>Hi, I&apos;m Zaydan, partner and business owner of Zapit. I manage our commercial clients, focusing on consistent customer service and long-term pest risk management.</p>
              <p>I have experience across hospitality, warehousing, storage, corporate environments and real estate. I have specialist knowledge of regulatory compliance faced by businesses.</p>
              <p>I have designed an all digital experience for our commercial clients providing you access to realtime data and compliance documentation. Our digital platform makes it so much easier for to meet your auditing obligations.</p>
              <p>Get in touch to discuss how I can help protect your business from the risks associated with pest activity.</p>
            </div>
            <div className="mt-8 text-center">
              <a href="#case-study" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[16px] font-bold text-[#131a1c] transition-opacity hover:opacity-90">
                Go to case study
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 5. TESTIMONIAL — Jack (warehouse) ===== */}
      <section className="w-full">
        <Image src="/images/commercial/testimonial-jack.png" alt="I found Zapit to be easy to work with — Jack, Trade supplier, Reservoir" width={834} height={900} className="h-auto w-full" />
      </section>

      {/* ===== 6. LOGO ICON + CTA TEXT ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#2B2B2B] px-5 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/commercial/zapit-logo-icon.svg" alt="" className="mb-5 h-[70px] w-auto" aria-hidden />
            <p className="text-[24px] italic leading-[1.4] text-[#1cdc38] sm:text-[28px]">
              Call now to organise your tailored pest management plan.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 7. TESTIMONIAL — Ahmed (cafe) ===== */}
      <section className="w-full">
        <Image src="/images/commercial/testimonial-ahmed.png" alt="I trust Zapit to make sure my cafe is free from pests — Ahmed, Cafe, Kew" width={650} height={700} className="h-auto w-full" />
      </section>

      {/* ===== 8. 24/7 BANNER — truck icon with text ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#2B2B2B] px-5 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/group-350.svg" alt="Same day service available. Call now!" className="h-[160px] w-auto" />
            <p className="mt-4 text-[20px] font-bold text-[#1cdc38] sm:text-[24px]">24/7 same day service available. Call now!</p>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 9. TESTIMONIAL — Helen (architect) ===== */}
      <section className="w-full">
        <Image src="/images/commercial/testimonial-helen.png" alt="Keeping the office pest free is something I don't want to think twice about — Helen, Architect Collingwood" width={650} height={700} className="h-auto w-full" />
      </section>

      {/* ===== 10. CASE STUDY ===== */}
      <ScrollReveal direction="up">
        <section id="case-study" className="bg-[#2B2B2B] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl text-[#f8f5f2]">
            <h2 className="mb-5 text-[28px] font-bold sm:text-[34px]">Case study</h2>
            <p className="mb-5 text-[17px]"><strong>Client:</strong> Helen, Architect practice</p>

            <h3 className="mb-2 text-[19px] font-bold">Problem</h3>
            <p className="mb-5 text-[16px] leading-[1.8] text-[#f8f5f2]/85 sm:text-[17px]">Helen noticed rodent activity in her office due to neighbouring cafes and restaurants not properly disposing of organic food waste. Helen was obviously concerned in keeping a clean and hygienic workplace for staff and clients. And wanted to put measures in place to immediately eradicate current rodent activity and mitigate future infestations.</p>

            <h3 className="mb-2 text-[19px] font-bold">Process</h3>
            <ul className="mb-5 list-disc space-y-2 pl-5 text-[16px] leading-[1.8] text-[#f8f5f2]/85 sm:text-[17px]">
              <li>Helen engaged us to conduct a site inspection and we gave her an initial verbal assessment on the spot.</li>
              <li>We then created a tailored proposal to remove current infestations and future mitigation measures.</li>
              <li>On approval of contract, we immediately installed bait stations and live traps to quickly remove rodent activity.</li>
              <li>We then put in place an always-on rodent protection plan to mitigate any further potential rodent infestations.</li>
            </ul>

            <h3 className="mb-2 text-[19px] font-bold">Solution</h3>
            <ul className="mb-5 list-disc space-y-2 pl-5 text-[16px] leading-[1.8] text-[#f8f5f2]/85 sm:text-[17px]">
              <li>Installation of bait stations</li>
              <li>Weekly monitoring of stations until rodents have been removed</li>
              <li>Ongoing rodent protection plan was installed mitigating further infestations</li>
              <li>Monthly monitoring of stations</li>
              <li>Monthly reporting.</li>
            </ul>

            <h3 className="mb-2 text-[19px] font-bold">Outcome</h3>
            <ul className="list-disc space-y-2 pl-5 text-[16px] leading-[1.8] text-[#f8f5f2]/85 sm:text-[17px]">
              <li><strong>First 7 days:</strong> Helen and her staff did not see any rodents and a reduction in fouling caused by rodent activity</li>
              <li><strong>2 weeks:</strong> All signs of rodent activity had completely stopped.</li>
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 11. CERTIFICATIONS — Figma layout ===== */}
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
