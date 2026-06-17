import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
    title: { absolute: 'Commercial Pest Control Melbourne | Zapit Pest & Termite Control' },
    description: 'Protect your business with structured, compliant pest management. Restaurants, warehouses, hospitals, schools and more across Melbourne.',
    openGraph: { title: 'Commercial Pest Control Melbourne | Zapit', description: 'Reliable, compliant commercial pest control across Melbourne.', url: `${SITE_CONFIG.url}/commercial-pest-control` },
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

      {/* SEO H1 — sr-only because the visual headline is baked into the hero image */}
      <h1 className="sr-only">Commercial Pest Control Melbourne — Zapit Pest &amp; Termite Control</h1>

      {/* ===== 1. HERO IMAGE — mobile full-bleed; desktop = framed card pattern (matches residential) ===== */}
      <section className="w-full bg-[#2B2B2B] py-2 sm:py-3 lg:py-10">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[680px] lg:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/commercial/commercial-kitchen-hero.png"
            alt="Commercial kitchen pest control — protecting Melbourne businesses"
            className="h-auto w-full lg:rounded-3xl lg:shadow-2xl"
            loading="eager"
          />
        </div>
      </section>

      {/* ===== 2. PROTECTING WHAT MATTERS — heading + description + CTA + green checklist ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#2B2B2B] px-5 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10">
          <div className="mx-auto max-w-[600px]">
            <h2 className="mb-4 font-bold leading-[29px] text-[#f8f5f2]" style={{ fontSize: '24px' }}>
              Protecting what matters<br />to your business
            </h2>

            {/* Description per Figma: Graphik Regular 14/20 in a clean flowing block (no inline CTAs).
                FloatingCTA already provides global Call + Menu, so we don't duplicate them here. */}
            <div className="space-y-3 text-[#f8f5f2]/90" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400 }}>
              <p>
                We partner with commercial operators in regulated environments who cannot afford
                pest risk. Our relationship-led approach delivers ongoing pest management through
                structured protection systems, including scheduled servicing, monitoring, inspections
                and compliance reporting.
              </p>
              <p>
                Our strength is discipline. Clear plans, consistent communication and a clean,
                professional process make us reliable and easy to work with across complex sites —
                including{' '}
                <Link
                  href="/commercial-pest-control/restaurants-pest-control"
                  className="underline underline-offset-2 hover:text-white"
                >
                  restaurants
                </Link>
                ,{' '}
                <Link
                  href="/commercial-pest-control/warehousing-and-storage"
                  className="underline underline-offset-2 hover:text-white"
                >
                  warehousing and storage
                </Link>
                , offices and food manufacturing facilities.
              </p>
              <p>
                Call to arrange a site inspection and proposal, or speak with us to organise a
                tailored pest management plan.
              </p>
            </div>

            {/* Green checklist card */}
            <div className="mx-auto mt-8 max-w-[280px] rounded-2xl bg-[#1cdc38] px-5 py-5">
              <div className="space-y-3">
                {['Tailored solutions', 'Targeted', 'Effective', 'Accredited', 'Insured', 'Licensed', 'Online compliance certificates'].map((item) => (
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

      {/* ===== 3. ZAYDAN PHOTO — desktop = framed card; mobile = full-bleed ===== */}
      <section className="w-full bg-[#2B2B2B] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[560px] lg:px-6">
          <Image src="/images/commercial/zaydan-photo.png" alt="Zaydan - Commercial Consultant at Zapit" width={1074} height={1200} className="h-auto w-full lg:rounded-3xl lg:shadow-2xl" sizes="(min-width: 1024px) 560px, 100vw" />
        </div>
      </section>

      {/* ===== 4. ZAYDAN BIO — Figma layout: Name Bold + role + Zapit, then bio, full-width CTA ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#2B2B2B] px-5 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10">
          <div className="mx-auto max-w-[600px]">
            {/* Name/role removed — already baked into the image above */}
            <div className="space-y-4 text-[#f8f5f2]/90" style={{ fontSize: '15px', lineHeight: '22px', fontWeight: 400 }}>
              <p>
                Hi, I&apos;m Zaydan, partner and business owner of Zapit. I manage our commercial
                clients, focusing on consistent customer service and long-term pest risk management.
              </p>
              <p>
                I have experience across hospitality, warehousing, storage, corporate environments
                and real estate. I have specialist knowledge of regulatory compliance faced by
                businesses.
              </p>
              <p>
                I have designed an all digital experience for our commercial clients providing you
                access to realtime data and compliance documentation. Our digital platform makes it
                so much easier for to meet your auditing obligations.
              </p>
              <p>
                Get in touch to discuss how I can help protect your business from the risks
                associated with pest activity.
              </p>
            </div>

            {/* Full-width Go to case study button per Figma */}
            <a
              href="#case-study"
              className="mt-10 flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-[16px] font-bold text-[#131a1c] transition-opacity hover:opacity-90"
            >
              Go to case study
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 5. TESTIMONIAL 1 — I found Zapit (client-supplied image, text baked in) ===== */}
      <section className="w-full bg-[#2B2B2B] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[640px] lg:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/commercial/i-found-zapit.png"
            alt='I found Zapit to be easy to work with and I trust them to stay on top of any potential issues — Jack, Trade supplier, Reservoir'
            width={804}
            height={488}
            className="h-auto w-full lg:rounded-3xl lg:shadow-2xl"
          />
        </div>
      </section>

      {/* ===== 6. CALL NOW TO ORGANISE ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#2B2B2B] px-5 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/commercial/zapit-logo-icon.svg" alt="" className="mb-5 h-[70px] w-auto" aria-hidden />
            <p
              className="italic text-[#1cdc38]"
              style={{ fontSize: '24px', lineHeight: '1.35', fontWeight: 400 }}
            >
              Call now to organise your tailored<br />pest management plan.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 7. TESTIMONIAL 2 — I trust Zapit (client-supplied image) ===== */}
      <section className="w-full bg-[#2B2B2B] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[520px] lg:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/commercial/i-trust-zapit.png"
            alt='I trust Zapit to make sure my cafe is free from pests and fully compliant — Michael, Cafe, Kew'
            width={498}
            height={327}
            className="h-auto w-full lg:rounded-3xl lg:shadow-2xl"
          />
        </div>
      </section>

      {/* ===== 8. 24/7 SAME DAY SERVICE ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#2B2B2B] px-5 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/group-350.svg" alt="" aria-hidden className="mb-4 h-[120px] w-auto sm:h-[140px]" />
            <p
              className="italic text-[#1cdc38]"
              style={{ fontSize: '24px', lineHeight: '1.35', fontWeight: 400 }}
            >
              24/7 same day service<br />available. Call now!
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 9. TESTIMONIAL 3 — Keeping the office pest free (client-supplied image) ===== */}
      <section className="w-full bg-[#2B2B2B] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[560px] lg:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/commercial/keeping-the-office-pest.png"
            alt='Keeping the office pest free is something I don&apos;t want to think twice about — Helen, Architect, Collingwood'
            width={631}
            height={422}
            className="h-auto w-full lg:rounded-3xl lg:shadow-2xl"
          />
        </div>
      </section>

      {/* ===== 10. CASE STUDY — Helen, Architect practice ===== */}
      <ScrollReveal direction="up">
        <section id="case-study" className="bg-[#2B2B2B] px-5 py-12 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[600px] text-[#f8f5f2]">
            <h2 className="mb-5 text-[28px] font-bold leading-tight sm:text-[32px]">Case study</h2>

            <p className="mb-5 text-[15px] leading-[1.7] sm:text-[16px]">
              <strong className="font-bold">Client:</strong> Helen, Architect practice
            </p>

            <h3 className="mb-2 text-[17px] font-bold sm:text-[18px]">Problem</h3>
            <p className="mb-5 text-[15px] leading-[1.7] text-[#f8f5f2]/85 sm:text-[16px]">
              Helen noticed rodent activity in her office due to neighbouring cafes and restaurants
              not properly disposing of organic food waste.
            </p>
            <p className="mb-6 text-[15px] leading-[1.7] text-[#f8f5f2]/85 sm:text-[16px]">
              Helen was obviously concerned in keeping a clean and hygienic workplace for staff and
              clients. And wanted to put measures in place to immediately eradicate current rodent
              activity and mitigate future infestations.
            </p>

            <h3 className="mb-2 text-[17px] font-bold sm:text-[18px]">Process</h3>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-[#f8f5f2]/85 sm:text-[16px]">
              <li>Helen engaged us to conduct a site inspection and we gave her an initial verbal assessment on the spot.</li>
              <li>We then created a tailored proposal to remove current infestations and future mitigation measures.</li>
              <li>On approval of contract, we immediately installed bait stations and live traps to quickly remove rodent activity.</li>
              <li>We then put in place an always-on rodent protection plan to mitigate any further potential rodent infestations.</li>
            </ul>

            <h3 className="mb-2 text-[17px] font-bold sm:text-[18px]">Solution</h3>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-[#f8f5f2]/85 sm:text-[16px]">
              <li>Installation of bait stations</li>
              <li>Weekly monitoring of stations until rodents have been removed</li>
              <li>Ongoing rodent protection plan was installed mitigating further infestations</li>
              <li>Monthly monitoring of stations</li>
              <li>Monthly reporting.</li>
            </ul>

            <h3 className="mb-2 text-[17px] font-bold sm:text-[18px]">Outcome</h3>
            <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-[#f8f5f2]/85 sm:text-[16px]">
              <li><strong className="font-bold">First 7 days:</strong> Helen and her staff did not see any rodents and a reduction in fouling caused by rodent activity</li>
              <li><strong className="font-bold">2 weeks:</strong> All signs of rodent activity had completely stopped.</li>
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 11. INSURED, LICENSED, ACCREDITED ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-[22px] font-semibold leading-tight text-[#131a1c] sm:text-[26px]">
              Insured, licensed, accredited and legally compliant
            </h2>
            <p className="mb-4 text-[15px] leading-[1.7] text-[#414042] sm:text-[16px]">
              Your health and safety is at the heart of everything we do. Your trust in us is backed
              by our industry memberships, accreditations, licences and professional insurance.
            </p>
            <p className="mb-6 text-[15px] leading-[1.7] text-[#414042] sm:text-[16px]">
              We&apos;re committed to providing the safest and best possible pest control solutions.
              We maintain our professional currency by staying at the forefront of advances in
              technology, regulatory compliance and industry standards.
            </p>

            <ul className="mb-8 list-disc space-y-3 pl-5 text-[15px] text-[#414042] sm:text-[16px]">
              <li className="font-semibold text-[#131a1c]">The Australian Environmental Pest Managers Association</li>
              <li className="font-semibold text-[#131a1c]">HACCP Food Safety Certificate</li>
              <li className="font-semibold text-[#131a1c]">VIC Government Wildlife Licence</li>
            </ul>

            <div className="flex flex-col items-center gap-6 border-t border-[#e5e5e5] pt-8">
              <div className="flex items-center justify-center gap-8">
                <figure className="flex flex-col items-center text-center">
                  <Image
                    src="/images/commercial/cert-wildlife.png"
                    alt="Wildlife Licensed"
                    width={120}
                    height={100}
                    className="h-20 w-auto object-contain sm:h-24"
                  />
                  <figcaption className="mt-2 text-[14px] font-semibold text-[#414042]">
                    Wildlife Licenced
                  </figcaption>
                </figure>
                <figure className="flex flex-col items-center text-center">
                  <Image
                    src="/images/commercial/cert-haccp.png"
                    alt="HACCP Food Safety Certification"
                    width={120}
                    height={100}
                    className="h-20 w-auto object-contain sm:h-24"
                  />
                  <figcaption className="mt-2 text-[14px] font-semibold text-[#414042]">
                    HACCP Food Safety<br />Certification
                  </figcaption>
                </figure>
              </div>
              <figure className="flex flex-col items-center text-center">
                <Image
                  src="/images/commercial/cert-aepma.png"
                  alt="Australian Environmental Pest Managers Association"
                  width={160}
                  height={80}
                  className="h-16 w-auto object-contain sm:h-20"
                />
                <figcaption className="mt-2 text-[14px] font-semibold text-[#414042]">
                  Australian Environmental<br />Pest Managers Association
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
