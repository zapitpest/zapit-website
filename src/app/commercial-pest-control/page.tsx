import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { OG_DEFAULT_IMAGES, TWITTER_DEFAULT_IMAGES } from '@/lib/seo-defaults';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { ALL_INDUSTRIES } from './[slug]/page';
import type { BreadcrumbItem } from '@/types';

// Commercial_01 nodes 25257:345-348. Owner-approved copy, transcribed from the design
// rather than written here, because it describes how a commercial account is actually run.
const STRATEGY_STEPS = [
  {
    title: 'Assessment and risk analysis',
    body: 'Conduct a detailed inspection of the built environment, assessing risk and identifying past or present pest activity.',
  },
  {
    title: 'Develop tailored pest protection plan',
    body: 'Develop a pest protection plan tailored to suit your specific requirements and risk mitigation.',
  },
  {
    title: 'Implement pest protection plan',
    body: 'Implement the pest protection plan as per proposal.',
  },
  {
    title: 'Monitoring and reporting',
    body: 'Conduct scheduled monitoring and reporting.',
  },
];

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Commercial Pest Control', href: '/commercial-pest-control' },
];

export function generateMetadata(): Metadata {
  // Keep SERP + social title identical so both surfaces show the same headline.
  // Prior split had og:title "... | Zap It" while <title> was "... | Zap It Pest Control".
  const title = 'Commercial Pest Control Melbourne | Zap It Pest Control';
  const description = 'Protect your business with structured, compliant pest management. Restaurants, warehouses, hospitals, schools and more across Melbourne.';
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, url: `${SITE_CONFIG.url}/commercial-pest-control`, images: [...OG_DEFAULT_IMAGES] },
    twitter: { card: 'summary_large_image', title, description, images: [...TWITTER_DEFAULT_IMAGES] },
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

      {/* ===== DESKTOP HERO SHELL: two columns in a 1280 container above lg. On a 1920x1080 screen the
             old stack put a portrait photo on the first screen and cut the H1 in half at the fold. ===== */}
      <div className="w-full bg-[#2B2B2B]">
      <div className="lg:mx-auto lg:grid lg:max-w-[1280px] lg:grid-cols-[minmax(0,1fr)_600px] lg:items-center lg:gap-12 lg:px-[52px] lg:py-16">
      {/* ===== 1. HERO IMAGE, mobile full-bleed, desktop right column ===== */}
      <section className="w-full bg-[#2B2B2B] py-2 sm:py-3 lg:order-2 lg:py-0">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-none lg:px-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/commercial/commercial-kitchen-hero.png"
            alt="Commercial kitchen pest control protecting Melbourne businesses"
            className="h-auto w-full lg:rounded-3xl lg:shadow-2xl"
            loading="eager"
          />
        </div>
      </section>

      {/* ===== 2. PROTECTING WHAT MATTERS — visible H1 replaces prior sr-only H1
             per PR #3 pattern (residential): the Figma-approved brand copy becomes
             the visible top-level heading, keyword coverage in title + meta + schema. ===== */}
      <ScrollReveal direction="up" className="lg:order-1 lg:min-w-0">
        <section className="bg-[#2B2B2B] px-5 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-0 lg:py-0">
          <div className="mx-auto max-w-[600px] lg:mx-0 lg:max-w-none">
            <h1 className="mb-4 text-[24px] font-bold leading-[29px] text-[#f8f5f2] lg:text-[44px] lg:leading-[1.1]">
              Protecting what matters<br />to your business
            </h1>

            {/* Description per Figma: Graphik Regular 14/20 in a clean flowing block (no inline CTAs).
                FloatingCTA already provides global Call + Menu, so we don't duplicate them here. */}
            <div className="space-y-3 text-[14px] leading-[20px] text-[#f8f5f2]/90 lg:max-w-[62ch] lg:text-[16px] lg:leading-[1.6]">
              <p>
                We partner with commercial operators in regulated environments who cannot afford
                pest risk. Our relationship-led approach delivers ongoing pest management through
                structured protection systems, including scheduled servicing, monitoring, inspections
                and compliance reporting.
              </p>
              <p>
                Our strength is discipline. Clear plans, consistent communication and a clean,
                professional process make us reliable and easy to work with across complex sites,
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
            <div className="mx-auto mt-8 max-w-[280px] rounded-2xl bg-[#1cdc38] px-5 py-5 lg:mx-0 lg:max-w-none">
              <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-3 lg:space-y-0">
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
      </div>
      </div>

      {/* ===== 2a. OUR PEST CONTROL STRATEGY — Commercial_01 y=1039. Four columns of
             230px separated by vertical rules. This section is in the approved design and
             was never built, so the page never explained what the programme actually is. ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-12 sm:px-6 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-[600px] lg:max-w-[1176px]">
            <h2 className="mb-8 text-center text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px] lg:mb-12 lg:text-[32px]">
              Our pest control strategy to protect your business
            </h2>
            <ol className="grid gap-8 lg:grid-cols-4 lg:gap-x-[76px] lg:gap-y-0">
              {STRATEGY_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className={`lg:pl-8 ${i > 0 ? 'lg:border-l lg:border-[#131a1c]/15' : ''}`}
                >
                  <h3 className="mb-2 text-[17px] font-bold leading-snug text-[#131a1c] sm:text-[18px]">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-[#131a1c]/75 sm:text-[16px]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 2b. INDUSTRIES WE SERVE — target of the hero's "#industries" button.
           Previously that button pointed at an id that did not exist on the page, and
           12 of the 14 industry pages had no link from the hub at all. ===== */}
      <ScrollReveal direction="up">
        <section id="industries" className="scroll-mt-24 bg-[#f8f5f2] px-5 py-12 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-xl lg:max-w-[1116px]">
            <h2 className="mb-2 text-center text-[22px] font-bold text-[#131a1c] sm:text-[26px] lg:text-[32px]">
              Industries we serve
            </h2>
            <p className="mb-7 text-center text-[15px] leading-[1.6] text-[#131a1c]/75">
              Every site has its own compliance load and its own pest pressure. Pick yours to see
              how we run the program.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3">
              {ALL_INDUSTRIES.map((ind) => (
                <Link
                  key={ind.slug}
                  href={ind.href}
                  className="flex items-center justify-center rounded-xl border border-[#e5e5e5] bg-white px-4 py-3.5 text-center text-[13px] font-semibold text-[#131a1c] transition-all hover:border-[#3fa535] hover:shadow-md sm:text-[14px] lg:min-h-[92px] lg:px-6 lg:text-[16px]"
                >
                  {ind.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 3+4. OWNER INTRO — Commercial_01 y=1399 puts the portrait (337 wide) beside
             the bio (711 wide). The build stacked them in a 600px column, which is the mobile
             arrangement left running on desktop. Mobile order is unchanged. ===== */}
      <div className="w-full bg-[#2B2B2B] lg:mx-auto lg:grid lg:max-w-[1176px] lg:grid-cols-[337px_minmax(0,1fr)] lg:items-center lg:gap-[60px] lg:px-[52px] lg:py-16">
      <section className="w-full bg-[#2B2B2B] py-4 sm:py-6 lg:py-0">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-none lg:px-0">
          <Image src="/images/commercial/zaydan-photo.webp" alt="Oz, Commercial Manager at Zap It" width={1200} height={1800} className="h-auto w-full lg:rounded-3xl lg:shadow-2xl" sizes="(min-width: 1024px) 560px, 100vw" />
        </div>
      </section>

      {/* ===== 4. ZAYDAN BIO — Figma layout: Name Bold + role + Zap It, then bio, full-width CTA ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#2B2B2B] px-5 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-0 lg:py-0">
          <div className="mx-auto max-w-[600px] lg:mx-0 lg:max-w-none">
            {/* Name and role are real markup now. The previous portrait had them baked
                into the pixels (and shipped the placeholder "Zaydan Surname" to
                production). Surname deliberately omitted until the spelling is
                confirmed — Osmanacic and Osmanagic both appear in our own records. */}
            <div className="mb-5">
              <p className="text-[22px] font-bold leading-[28px] text-[#f8f5f2]">Oz</p>
              <p className="text-[16px] leading-[22px] text-[#f8f5f2]/85">Commercial Manager</p>
              <p className="text-[16px] leading-[22px] text-[#f8f5f2]/85">Zap It</p>
            </div>
            <div className="space-y-4 text-[#f8f5f2]/90" style={{ fontSize: '15px', lineHeight: '22px', fontWeight: 400 }}>
              <p>
                I look after our commercial clients, focusing on consistent service and
                long term pest risk management.
              </p>
              <p>
                I have experience across hospitality, warehousing, storage, corporate environments
                and real estate. I have specialist knowledge of regulatory compliance faced by
                businesses.
              </p>
              <p>
                I have designed an all digital experience for our commercial clients providing you
                access to realtime data and compliance documentation. Our digital platform makes it
                so much easier for you to meet your auditing obligations.
              </p>
              <p>
                Get in touch to discuss how I can help protect your business from the risks
                associated with pest activity.
              </p>
            </div>

            {/* Full-width Go to case study button per Figma */}
            <a
              href="#case-study"
              className="mt-10 flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-[16px] font-bold text-[#131a1c] transition-opacity hover:opacity-90 lg:w-auto lg:self-start lg:px-12"
            >
              Go to case study
            </a>
          </div>
        </section>
      </ScrollReveal>
      </div>

      {/* ===== 5. TESTIMONIAL 1 — I found Zap It (client-supplied image, text baked in) ===== */}
      <section className="w-full bg-[#2B2B2B] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[640px] lg:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/commercial/i-found-zapit.png"
            alt='I found Zap It to be easy to work with and I trust them to stay on top of any potential issues. Jack, Trade supplier, Reservoir'
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

      {/* ===== 7. TESTIMONIAL 2 — I trust Zap It (client-supplied image) ===== */}
      <section className="w-full bg-[#2B2B2B] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[520px] lg:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/commercial/i-trust-zapit.png"
            alt='I trust Zap It to make sure my cafe is free from pests and fully compliant. Michael, Cafe, Kew'
            width={498}
            height={327}
            className="h-auto w-full lg:rounded-3xl lg:shadow-2xl"
          />
        </div>
      </section>

      {/* ===== 8. SAME DAY SERVICE ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#2B2B2B] px-5 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* The artwork already carries the words "Same day service available. Call now!"
                as outlined paths, so the paragraph that used to sit under it printed the same
                sentence twice. Alt text carries the message instead, matching how the home and
                contact pages use this asset. */}
            <img src="/images/icons/group-350.svg" alt="Same day service available. Call now!" className="h-auto w-full max-w-[420px]" />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 9. TESTIMONIAL 3 — Keeping the office pest free (client-supplied image) ===== */}
      <section className="w-full bg-[#2B2B2B] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[560px] lg:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/commercial/keeping-the-office-pest.png"
            alt='Keeping the office pest free is something I don&apos;t want to think twice about. Helen, Architect, Collingwood'
            width={631}
            height={422}
            className="h-auto w-full lg:rounded-3xl lg:shadow-2xl"
          />
        </div>
      </section>

      {/* ===== 10. CASE STUDY — Helen, Architect practice ===== */}
      <ScrollReveal direction="up">
        <section id="case-study" className="bg-[#2B2B2B] px-5 py-12 sm:px-6 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-[600px] text-[#f8f5f2] lg:max-w-[840px]">
            <h2 className="mb-5 text-[28px] font-bold leading-tight sm:text-[32px] lg:mb-8 lg:text-[36px]">Case study</h2>

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
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-3xl lg:grid lg:max-w-[1176px] lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-16">
          <div className="lg:min-w-0">
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

            <ul className="mb-8 list-disc space-y-3 pl-5 text-[15px] text-[#414042] sm:text-[16px] lg:mb-0">
              <li className="font-semibold text-[#131a1c]">The Australian Environmental Pest Managers Association</li>
              <li className="font-semibold text-[#131a1c]">HACCP Food Safety Certificate</li>
              <li className="font-semibold text-[#131a1c]">VIC Government Wildlife Licence</li>
            </ul>

          </div>
            <div className="flex flex-col items-center gap-6 border-t border-[#e5e5e5] pt-8 lg:border-t-0 lg:pt-0">
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
