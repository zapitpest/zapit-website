import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';
import FaqPageAccordion from '@/components/sections/FaqPageAccordion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { FAQ, BreadcrumbItem } from '@/types';
import CommercialHeroSlider from './CommercialHeroSlider';
import GoogleReviewsCarousel from '../residential/GoogleReviewsCarousel';
import CommercialInquiryForm from './CommercialInquiryForm';

const WP = '/images/wp-assets';
const MELBOURNE_MAP =
  'https://www.google.com/maps?q=' + encodeURIComponent('Melbourne, Victoria, Australia') + '&z=10&output=embed';

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Commercial Pest Control', href: '/commercial-pest-control' },
];

const COMMERCIAL_INDUSTRIES = [
  { label: 'Properties', href: '/commercial-pest-control', desc: 'Office buildings & retail' },
  { label: 'Warehousing', href: '/commercial-pest-control/warehousing-and-storage', desc: 'Storage & logistics hubs' },
  { label: 'Restaurants', href: '/commercial-pest-control/restaurants-pest-control', desc: 'Cafés, bars & dining' },
  { label: 'Supermarkets', href: '/commercial-pest-control/pest-control-in-supermarkets', desc: 'Grocery & fresh food' },
  { label: 'Function Venues', href: '/commercial-pest-control/function-venues', desc: 'Events & conferences' },
  { label: 'Brewhouses', href: '/commercial-pest-control/brewhouses-and-distilleries', desc: 'Craft brewing & distilling' },
  { label: 'Recreation', href: '/commercial-pest-control/recreational-facilities-pest-control', desc: 'Gyms, pools & clubs' },
  { label: 'Government', href: '/commercial-pest-control/government-buildings', desc: 'Public sector sites' },
  { label: 'Transport', href: '/commercial-pest-control/transport', desc: 'Depots & fleet yards' },
  { label: 'Food Manufacturing', href: '/commercial-pest-control/food-manufacturing', desc: 'HACCP production lines' },
  { label: 'Aged Care', href: '/commercial-pest-control/aged-care-facilities', desc: 'Residential care homes' },
  { label: 'Hospitals', href: '/commercial-pest-control/hospitals', desc: 'Healthcare & clinics' },
  { label: 'Agriculture', href: '/commercial-pest-control/agriculture', desc: 'Farms & packhouses' },
  { label: 'Education', href: '/commercial-pest-control/educational-facilities', desc: 'Schools & campuses' },
  { label: 'Distribution', href: '/commercial-pest-control/distribution-center', desc: '3PL & DC centres' },
] as const;

const COMMERCIAL_FAQS: FAQ[] = [
  { question: 'Why does my business need commercial pest control?', answer: 'Pests damage stock, trigger health department issues, and hurt your reputation overnight. A structured program reduces those risks and supports compliance in food, health, and public-facing spaces.' },
  { question: 'Can you work outside our busiest trading hours?', answer: 'Yes. We schedule treatments to suit restaurants, retail, and warehouses — including early mornings, evenings, or closed days where possible — so you can keep operating.' },
  { question: 'Are your treatments suitable for food handling areas?', answer: 'We follow appropriate methods and product selection for food businesses and can align with your food safety and HACCP requirements. Tell us your auditor expectations when you book.' },
  { question: 'How often should a commercial site be inspected?', answer: 'It depends on industry and risk — many sites use monthly or quarterly programs; high-risk food production may need more frequent visits. We recommend a schedule after the first assessment.' },
  { question: 'Do you service warehouses, hospitals, and schools?', answer: `Yes. We work across logistics, manufacturing, healthcare, education, and government. Call ${SITE_CONFIG.phone} to discuss your site and compliance needs.` },
  { question: 'What documentation do you provide?', answer: 'You receive clear visit reports, treatment records, and recommendations after every visit — ready for food safety audits, WHS compliance, or internal governance.' },
];

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'Commercial Pest Control Melbourne | Zap It Pest & Termite Control' },
    description: 'Protect your business with structured, compliant pest management. Restaurants, warehouses, hospitals, schools and more across Melbourne.',
    openGraph: {
      title: 'Commercial Pest Control Melbourne | Zap It',
      description: 'Reliable, compliant commercial pest control across Melbourne.',
      url: `${SITE_CONFIG.url}/commercial-pest-control`,
    },
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

      {/* ===== 1. HERO IMAGE SLIDER ===== */}
      <CommercialHeroSlider />

      {/* ===== 2. TRUSTED COMMERCIAL PEST MANAGEMENT ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#0d402e] px-5 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-3 text-[24px] font-bold leading-tight text-white sm:text-[28px]">
              Trusted commercial pest management
            </h2>
            <p className="mb-5 text-[15px] leading-[1.7] text-[#f8f5f2]/90 sm:text-[16px]">
              We protect businesses across Melbourne with structured, compliant pest programs tailored to your industry.
              From restaurants and warehouses to hospitals and schools — fully insured, DHHS licensed, and HACCP-aware.
            </p>
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/group-373.svg" alt="Child safe, Pet safe, Eco friendly" className="h-[76px] w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/group-374.svg" alt="Insured, DHHS Licenced, Accredited" className="h-[76px] w-auto" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 3. GOOGLE REVIEWS ===== */}
      <ScrollReveal direction="up" delay={100}>
        <GoogleReviewsCarousel />
      </ScrollReveal>

      {/* ===== 4. 3-STEP PROCESS — unique horizontal timeline ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-center text-[22px] font-bold text-[#131a1c] sm:text-[26px]">How we protect your business</h2>
            <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#1cdc38]" />
            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-[#1cdc38]/30 sm:block" />
              <div className="space-y-6">
                {([
                  { n: '01', title: 'Risk & Site Assessment', desc: 'We map activity areas, entry points, and compliance needs — nothing is missed.', color: '#3fa535' },
                  { n: '02', title: 'Tailored Treatment Plan', desc: 'Treatments fit your industry — HACCP-aware for food sites, discreet for offices.', color: '#1cdc38' },
                  { n: '03', title: 'Documentation & Follow-up', desc: 'Clear records for audits plus scheduled reviews to keep your site protected.', color: '#0d402e' },
                ] as const).map((step) => (
                  <div key={step.n} className="flex items-start gap-4 sm:gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[16px] font-bold text-white shadow-md" style={{ background: step.color }}>
                      {step.n}
                    </div>
                    <div className="rounded-2xl border border-[#e5e5e5] bg-white px-5 py-4 shadow-sm">
                      <h3 className="mb-1 text-[16px] font-bold text-[#131a1c]">{step.title}</h3>
                      <p className="text-[13px] leading-[1.6] text-[#414042]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 5. INDUSTRY SOLUTIONS GRID ===== */}
      <ScrollReveal direction="up">
        <section id="industries" className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-center text-[22px] font-bold text-[#131a1c] sm:text-[26px]">Industry solutions</h2>
            <p className="mx-auto mb-8 max-w-md text-center text-[14px] text-[#414042]">
              Tailored pest management for every sector across Melbourne.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {COMMERCIAL_INDUSTRIES.map((ind) => (
                <Link
                  key={ind.label}
                  href={ind.href}
                  className="group rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2] px-4 py-4 transition-all hover:border-[#3fa535] hover:shadow-md"
                >
                  <p className="text-[14px] font-bold text-[#131a1c] group-hover:text-[#3fa535] sm:text-[15px]">{ind.label}</p>
                  <p className="mt-0.5 text-[11px] text-[#414042]/70 sm:text-[12px]">{ind.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 6. COMMERCIAL WORKER IMAGE + WHY IT MATTERS ===== */}
      <ScrollReveal direction="left">
        <section className="bg-[#131a1c]">
          <div className="relative aspect-[375/300] w-full overflow-hidden sm:aspect-[16/7]">
            <Image
              src={`${WP}/2025-07-imgi_23_—Pngtree—pest-control-worker-in-protective_15020351-2-1-1024x1024.webp`}
              alt="Professional pest control technician in protective gear"
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131a1c] to-transparent" />
          </div>
          <div className="px-5 pb-10 pt-2 sm:px-6 sm:pb-12">
            <div className="mx-auto max-w-xl">
              <h2 className="mb-4 text-[22px] font-bold text-white sm:text-[26px]">
                Why commercial pest control matters
              </h2>
              <p className="mb-3 text-[14px] leading-[1.7] text-white/75 sm:text-[15px]">
                One visible pest in a restaurant, store, or clinic can mean lost revenue, failed audits, and lasting damage to trust.
              </p>
              <p className="mb-3 text-[14px] leading-[1.7] text-white/75 sm:text-[15px]">
                Proactive pest management is about prevention, recorded visits, and clear communication so you can run your business with confidence.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {(['Stock Protection', 'Audit Compliance', 'Staff Safety', 'Brand Reputation'] as const).map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-[#3fa535]/20 bg-[#3fa535]/5 px-3 py-2.5">
                    <svg className="h-4 w-4 shrink-0 text-[#3fa535]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    <span className="text-[12px] font-semibold text-white sm:text-[13px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 7. CUSTOMISED ONLINE REPORTING CARD ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-4 py-8 sm:px-5 sm:py-10">
          <div className="mx-auto max-w-lg overflow-hidden rounded-[20px] bg-[#F8F5F2] shadow-sm sm:max-w-xl">
            <div className="px-5 pt-6 sm:px-8 sm:pt-8">
              <h2 className="mb-1 text-center text-[22px] font-bold leading-[29px] text-[#131a1c]">
                Customised online reporting<br />at your finger tips
              </h2>
              <p className="mt-2 text-center text-[13px] text-[#414042]/70">Track all pest control activities, reports, and schedules in one dashboard.</p>
            </div>
            <div className="flex items-center justify-center px-5 pb-6 pt-4 sm:px-8 sm:pb-8">
              <div className="relative w-full max-w-[320px] overflow-hidden rounded-2xl bg-[#d5d5e0] p-4 shadow-inner">
                <Image
                  src="/images/commercial/online-reporting.png"
                  alt="Customised online reporting dashboard"
                  width={320}
                  height={220}
                  className="h-auto w-full rounded-xl object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 8. COMMERCIAL STATS BAR ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#0d402e] px-5 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-xl">
            <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              {([
                { val: '15+', label: 'Years Experience' },
                { val: '5,000+', label: 'Jobs Completed' },
                { val: '99%', label: 'First-Visit Success' },
                { val: '24/7', label: 'Emergency Response' },
              ] as const).map((s) => (
                <div key={s.label}>
                  <p className="text-[28px] font-black text-[#1cdc38] sm:text-[32px]">{s.val}</p>
                  <p className="text-[12px] font-medium text-white/70 sm:text-[13px]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 9. SAME DAY SERVICE CTA ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#131a1c] py-8 sm:py-10">
          <a href={SITE_CONFIG.phoneTel} className="mx-auto block max-w-[360px] px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/group-350.svg" alt="Same day service available. Call now!" className="h-auto w-full" />
          </a>
        </section>
      </ScrollReveal>

      {/* ===== 10. DARK SECTION — PROTECTING YOUR BUSINESS ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#131a1c] px-5 py-10 sm:px-6 sm:py-12">
          <p className="mx-auto max-w-md text-center text-[18px] italic leading-[1.5] text-[#1cdc38] sm:text-[20px]">
            Your business reputation and compliance are at the heart of everything we do, supported by industry-leading processes and technology.
          </p>
        </section>
      </ScrollReveal>

      {/* ===== 10b. Commercial kitchen hero image ===== */}
      <ScrollReveal direction="up">
        <section className="relative w-full overflow-hidden">
          <div className="relative aspect-[375/440] w-full sm:aspect-[16/10]">
            <Image
              src="/images/commercial/commercial-hero.png"
              alt="Professional kitchen pest control - Tailored business protection"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 10c. Staff safety text ===== */}
      <ScrollReveal direction="fade" delay={100}>
        <section className="bg-[#131a1c] px-5 py-10 sm:px-6 sm:py-12">
          <p className="mx-auto max-w-md text-center text-[18px] italic leading-[1.5] text-[#1cdc38] sm:text-[20px]">
            We take every measure to keep your staff, customers, and premises safe with discreet, professional treatments that don&apos;t disrupt your operations.
          </p>
        </section>
      </ScrollReveal>

      {/* ===== 11. COMMERCIAL INQUIRY FORM ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-4 py-6 sm:px-5 sm:py-8">
          <CommercialInquiryForm />
        </section>
      </ScrollReveal>

      {/* ===== 12. MELBOURNE MAP ===== */}
      <section className="bg-[#131a1c] px-0 pb-2 sm:px-4">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden sm:rounded-2xl">
          <div className="relative aspect-[4/3] w-full min-h-[240px] bg-[#1a4f38] sm:aspect-[16/9] sm:min-h-[300px]">
            <iframe
              title="Zap It Melbourne commercial service area map"
              src={MELBOURNE_MAP}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <div className="h-[min(72%,18rem)] w-[min(72%,18rem)] rounded-full border-[5px] border-[#1cdc38] shadow-[0_0_0_2px_rgba(28,220,56,0.3)] sm:h-[min(65%,20rem)] sm:w-[min(65%,20rem)]" />
              <div className="absolute right-[14%] top-[18%] flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                <CheckCircle2 className="h-7 w-7 text-[#1cdc38]" strokeWidth={2.25} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 12b. COVERAGE TEXT ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#0d402e] px-5 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-3 text-[24px] font-bold leading-[28px] text-white sm:text-[28px]">
              Servicing all of Melbourne
            </h2>
            <p className="text-[16px] font-medium leading-[22px] text-white/80 sm:text-[17px]">
              From the CBD to outer suburbs, our commercial pest control team services businesses across Melbourne&apos;s entire metropolitan area.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 13. CERTIFICATIONS ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[24px]">
              Insured, licensed, accredited and legally compliant
            </h2>
            <p className="mb-6 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
              Your trust in us is backed by our industry memberships, accreditations, licences and professional insurance.
              We maintain our professional currency by staying at the forefront of advances in technology, regulatory
              compliance and industry standards.
            </p>
            <ul className="mb-8 space-y-4 text-[14px] text-[#414042] sm:text-[15px]">
              <li><p className="font-bold text-[#131a1c]">The Australian Environmental Pest Managers Association</p><p>Membership number: XXXXXX</p></li>
              <li><p className="font-bold text-[#131a1c]">HACCP Food Safety Certificate</p><p>Certificate number: XXXXXX</p></li>
              <li><p className="font-bold text-[#131a1c]">VIC Government Wildlife Licence</p><p>Licence number: XXXXXX</p></li>
            </ul>
            <div className="flex flex-col items-center gap-6 border-t border-[#e5e5e5] pt-8">
              <div className="flex items-center justify-center gap-8">
                <figure className="flex flex-col items-center text-center">
                  <Image src={`${WP}/2025-04-WhatsApp-Image-2025-04-25-at-23.36.21_3d87ac70-300x300.jpg`} alt="Wildlife Licensed" width={120} height={100} className="h-20 w-auto object-contain sm:h-24" />
                  <figcaption className="mt-2 text-[12px] font-medium text-[#414042]">Wildlife Licenced</figcaption>
                </figure>
                <figure className="flex flex-col items-center text-center">
                  <Image src={`${WP}/2024-07-aempa-v2-1-1-e1745687916424-173x300.png`} alt="HACCP Food Safety Certification" width={120} height={100} className="h-20 w-auto object-contain sm:h-24" />
                  <figcaption className="mt-2 text-[12px] font-medium text-[#414042]">HACCP Food Safety<br />Certification</figcaption>
                </figure>
              </div>
              <figure className="flex flex-col items-center text-center">
                <Image src={`${WP}/2024-07-aempa-v2-1-e1745687358594-768x321.png`} alt="AEPMA" width={160} height={80} className="h-16 w-auto object-contain sm:h-20" />
                <figcaption className="mt-2 text-[12px] font-medium text-[#414042]">Australian Environmental<br />Pest Managers Association</figcaption>
              </figure>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 14. FAQ ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
              Frequently asked questions
            </h2>
            <div className="mb-6 h-[3px] w-[60px] bg-[#1cdc38]" />
            <div className="border-t border-[#e5e5e5]">
              <FaqPageAccordion faqs={COMMERCIAL_FAQS} defaultOpenIndex={0} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <PageInfoFooterBlock />
    </>
  );
}
