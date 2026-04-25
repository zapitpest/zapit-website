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

const COMPLIANCE_BADGES = [
  { title: 'DHHS Licensed', sub: 'Victorian licence' },
  { title: 'HACCP Certified', sub: 'Food safety plans' },
  { title: 'Wildlife Licence', sub: 'VIC Government' },
  { title: 'Fully Insured', sub: 'Professional indemnity' },
  { title: 'AEPMA Member', sub: 'Australian Environmental' },
] as const;

const INDUSTRIES = [
  { label: 'Food & Hospitality', desc: 'HACCP compliant', href: '/commercial-pest-control/restaurants-pest-control', icon: 'M3 3h18v18H3V3zm3 3v3h3V6H6zm6 0v3h3V6h-3zm-6 6v3h3v-3H6zm6 0v3h3v-3h-3z' },
  { label: 'Offices & Body Corporate', desc: 'Minimal disruption', href: '/commercial-pest-control', icon: 'M3 21V3h6v6h6V3h6v18H3zm3-3h3v-3H6v3zm0-6h3V9H6v3zm6 6h3v-3h-3v3zm6 0h3v-3h-3v3zm0-6h3V9h-3v3z' },
  { label: 'Warehouses & Storage', desc: 'Large site programs', href: '/commercial-pest-control/warehousing-and-storage', icon: 'M2 20V8l10-5 10 5v12H2zm3-2h14V9.5L12 5.7 5 9.5V18z' },
  { label: 'Aged Care & Health', desc: 'Sensitive environments', href: '/commercial-pest-control/aged-care-facilities', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
  { label: 'Educational Facilities', desc: 'Child-safe products', href: '/commercial-pest-control/educational-facilities', icon: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z' },
  { label: 'Industrial Sites', desc: 'After-hours available', href: '/commercial-pest-control/food-manufacturing', icon: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z' },
  { label: 'Retail', desc: 'Discreet service', href: '/commercial-pest-control/pest-control-in-supermarkets', icon: 'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z' },
  { label: 'Government', desc: 'Compliance documentation', href: '/commercial-pest-control/government-buildings', icon: 'M12 2L2 7v1h20V7L12 2zM4 10v7h3v-7H4zm5 0v7h3v-7H9zm5 0v7h3v-7h-3zm5 0v7h3v-7h-3zM2 19v2h20v-2H2z' },
] as const;

const APPROACH_CARDS = [
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Ongoing service plans', desc: 'Scheduled visits year-round. We keep pests out before they become a problem.' },
  { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', title: 'Rodent monitoring systems', desc: 'Digital bait stations mapped to your site. Full documentation for audits.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Documentation & reporting', desc: 'Digital service report after every visit. Everything your auditor needs.' },
  { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'Preventative maintenance', desc: 'We identify entry points and risk areas — not just treat what\'s visible.' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Minimal disruption', desc: 'Early mornings, after-hours, weekends. We work around your business.' },
  { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', title: 'Compliance support', desc: 'We know what auditors expect. We make sure your site meets it every time.' },
] as const;

const BUSINESS_REVIEWS = [
  { stars: 5, text: 'ZAPIT manages our entire facility. Monthly visits, quarterly reports, bait station maps. Auditors are happy. So are we.', name: 'David L.', role: 'Facility Manager · Melbourne CBD' },
  { stars: 5, text: "We've had the same technician for five years. He knows our site better than we do. That consistency is invaluable.", name: 'Angela M.', role: 'Facilities Manager · Bundoora Warehouse' },
  { stars: 5, text: 'The digital reports make our record-keeping simple. Everything is there when the building inspector visits.', name: 'Michael R.', role: 'Body Corporate Manager · Prahran' },
] as const;

const COMMERCIAL_FAQS: FAQ[] = [
  { question: 'Do you offer ongoing service plans?', answer: 'Yes. Most commercial clients are on monthly or quarterly programs. We tailor the frequency to your risk level, industry, and site size.' },
  { question: 'What industries do you work with?', answer: 'Food service, warehousing, healthcare, education, government, retail, agriculture, transport, and more. If pests can affect your operations, we can help.' },
  { question: 'Can you work outside business hours?', answer: 'Absolutely. We offer early morning, evening, weekend, and after-hours visits to minimize disruption to your business.' },
  { question: 'Do you provide compliance documentation?', answer: 'Yes. Every visit generates a digital report covering treatments, findings, and recommendations — ready for HACCP, WHS, or any third-party audit.' },
  { question: "What's your response time for urgent situations?", answer: `Under 2 hours for emergency commercial callouts within Melbourne metro. Call ${SITE_CONFIG.phone} any time.` },
  { question: 'How is commercial management different to residential?', answer: 'Commercial programs are ongoing, documented, and compliance-driven. We focus on prevention, monitoring, and audit-ready records — not just one-off treatments.' },
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

      {/* ===== 1. HERO ===== */}
      <CommercialHeroSlider />

      {/* ===== 2. GOOGLE REVIEWS ===== */}
      <ScrollReveal direction="up" delay={100}>
        <GoogleReviewsCarousel />
      </ScrollReveal>

      {/* ===== 3. COMPLIANCE BADGES BAR ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#0d402e] px-4 py-4 sm:px-6 sm:py-5">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 sm:gap-6">
            {COMPLIANCE_BADGES.map((b) => (
              <div key={b.title} className="flex items-center gap-2 text-white">
                <svg className="h-4 w-4 shrink-0 text-[#1cdc38]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <div>
                  <p className="text-[12px] font-bold leading-tight sm:text-[13px]">{b.title}</p>
                  <p className="text-[10px] text-white/50 sm:text-[11px]">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 4. OUR COMMERCIAL APPROACH — text + image ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#3fa535]">OUR COMMERCIAL APPROACH</p>
            <h2 className="mb-4 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[28px]">
              Protecting your business as if it were our business
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_1fr] sm:items-center">
              <div>
                <p className="mb-3 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
                  We know that for your business, pest control is about more than removing pests. It&apos;s about protecting your reputation, maintaining compliance, and keeping your staff and customers safe.
                </p>
                <p className="mb-5 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
                  We build a structured pest management plan around your business — and we&apos;re there consistently, not just when there&apos;s a problem.
                </p>
                <a href={SITE_CONFIG.booking.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-6 py-3 text-[14px] font-bold text-white shadow-md transition-transform hover:scale-105">
                  Book an appointment →
                </a>
              </div>
              <div className="overflow-hidden rounded-2xl bg-[#0d402e]">
                <Image src="/images/hero/pest-treatment-melbourne.webp" alt="Commercial pest control professional" width={500} height={350} className="h-auto w-full object-cover opacity-80" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 5. INDUSTRIES WE PROTECT ===== */}
      <ScrollReveal direction="up">
        <section id="industries" className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#3fa535]">INDUSTRIES WE PROTECT</p>
            <h2 className="mb-2 text-[22px] font-bold text-[#131a1c] sm:text-[28px]">
              We understand compliance-sensitive environments
            </h2>
            <p className="mb-8 max-w-lg text-[14px] text-[#414042]">
              From food-grade facilities to large warehouses. We know what auditors expect and we make sure your site meets it.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {INDUSTRIES.map((ind) => (
                <Link key={ind.label} href={ind.href} className="group flex flex-col items-center gap-2 rounded-2xl border border-[#e5e5e5] bg-white px-3 py-5 text-center transition-all hover:border-[#3fa535] hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8f5f2] transition-colors group-hover:bg-[#3fa535]/10">
                    <svg className="h-5 w-5 text-[#414042] group-hover:text-[#3fa535]" fill="currentColor" viewBox="0 0 24 24"><path d={ind.icon} /></svg>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#131a1c] group-hover:text-[#3fa535] sm:text-[13px]">{ind.label}</p>
                    <p className="text-[10px] text-[#3fa535] sm:text-[11px]">{ind.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 6. STRUCTURED APPROACH ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#3fa535]">OUR COMMERCIAL SERVICES</p>
            <h2 className="mb-2 text-[22px] font-bold text-[#131a1c] sm:text-[28px]">
              A structured approach to pest management
            </h2>
            <p className="mb-8 max-w-lg text-[14px] text-[#414042]">
              Not a spray and walk away. A proper program built around your site and your compliance requirements.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {APPROACH_CARDS.map((card) => (
                <div key={card.title} className="rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2] px-5 py-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                    <svg className="h-5 w-5 text-[#3fa535]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={card.icon} /></svg>
                  </div>
                  <h3 className="mb-1 text-[14px] font-bold text-[#131a1c]">{card.title}</h3>
                  <p className="text-[12px] leading-[1.6] text-[#414042]">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 7. CUSTOMISED ONLINE REPORTING — two-column like Figma ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#131a1c] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#3fa535]">DIGITAL REPORTING</p>
              <h2 className="mb-4 text-[22px] font-bold text-white sm:text-[28px]">
                Customised online reporting at your finger tips
              </h2>
              <p className="mb-3 text-[14px] leading-[1.7] text-white/70 sm:text-[15px]">
                Every service visit generates a full digital report. Download compliance certificates, track activity, and share records with your auditor — all in one place.
              </p>
              <p className="mb-5 text-[14px] leading-[1.7] text-white/70 sm:text-[15px]">
                Your reporting dashboard is always up to date. No chasing paperwork. No gaps in your audit trail.
              </p>
              <a href="/contact-us" className="inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-6 py-3 text-[14px] font-bold text-white shadow-md transition-transform hover:scale-105">
                Ask us how it works
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl bg-[#0d402e] p-6 shadow-2xl">
              <Image
                src="/images/commercial/online-reporting.png"
                alt="Customised online pest control reporting dashboard"
                width={500}
                height={400}
                className="h-auto w-full rounded-xl object-contain"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 8. COMMERCIAL STATS ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#f8f5f2] px-5 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-xl">
            <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              {([
                { val: '500+', label: 'Commercial properties protected' },
                { val: '5+ yr', label: 'Client partnerships' },
                { val: '<2hr', label: 'Avg. emergency response' },
                { val: '100%', label: 'Digital compliance reporting' },
              ] as const).map((s) => (
                <div key={s.label}>
                  <p className="text-[28px] font-black text-[#3fa535] sm:text-[32px]">{s.val}</p>
                  <p className="text-[11px] font-medium text-[#414042] sm:text-[12px]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 9. BUSINESS TESTIMONIALS ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center text-[22px] font-bold text-[#131a1c] sm:text-[26px]">What businesses say about us</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {BUSINESS_REVIEWS.map((r) => (
                <div key={r.name} className="rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2] px-5 py-5">
                  <div className="mb-2 flex gap-0.5">
                    {Array.from({ length: r.stars }, (_, i) => (
                      <svg key={i} className="h-4 w-4 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <p className="mb-3 text-[13px] italic leading-[1.6] text-[#414042]">&ldquo;{r.text}&rdquo;</p>
                  <p className="text-[13px] font-bold text-[#131a1c]">{r.name}</p>
                  <p className="text-[11px] text-[#414042]/60">{r.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 10. COMMERCIAL INQUIRY FORM ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-4 py-6 sm:px-5 sm:py-8">
          <CommercialInquiryForm />
        </section>
      </ScrollReveal>

      {/* ===== 11. MELBOURNE MAP ===== */}
      <section className="bg-[#131a1c] px-0 pb-2 sm:px-4">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden sm:rounded-2xl">
          <div className="relative aspect-[4/3] w-full min-h-[240px] bg-[#1a4f38] sm:aspect-[16/9] sm:min-h-[300px]">
            <iframe title="Zap It Melbourne commercial service area" src={MELBOURNE_MAP} className="absolute inset-0 h-full w-full border-0" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <div className="h-[min(72%,18rem)] w-[min(72%,18rem)] rounded-full border-[5px] border-[#1cdc38] shadow-[0_0_0_2px_rgba(28,220,56,0.3)] sm:h-[min(65%,20rem)] sm:w-[min(65%,20rem)]" />
              <div className="absolute right-[14%] top-[18%] flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                <CheckCircle2 className="h-7 w-7 text-[#1cdc38]" strokeWidth={2.25} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11b. COVERAGE ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#0d402e] px-5 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-3 text-[24px] font-bold text-white sm:text-[28px]">Servicing all of Melbourne</h2>
            <p className="text-[16px] font-medium text-white/80 sm:text-[17px]">
              From the CBD to outer suburbs, our commercial pest control team covers Melbourne&apos;s entire metropolitan area.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 12. CERTIFICATIONS ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-[22px] font-bold text-[#131a1c] sm:text-[24px]">
              Insured, licensed, accredited and legally compliant
            </h2>
            <p className="mb-6 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
              Your trust in us is backed by our industry memberships, accreditations, licences and professional insurance.
            </p>
            <div className="flex flex-col items-center gap-6 border-t border-[#e5e5e5] pt-8">
              <div className="flex items-center justify-center gap-8">
                <figure className="flex flex-col items-center text-center">
                  <Image src={`${WP}/2025-04-WhatsApp-Image-2025-04-25-at-23.36.21_3d87ac70-300x300.jpg`} alt="Wildlife Licensed" width={120} height={100} className="h-20 w-auto object-contain sm:h-24" />
                  <figcaption className="mt-2 text-[12px] font-medium text-[#414042]">Wildlife Licenced</figcaption>
                </figure>
                <figure className="flex flex-col items-center text-center">
                  <Image src={`${WP}/2024-07-aempa-v2-1-1-e1745687916424-173x300.png`} alt="HACCP" width={120} height={100} className="h-20 w-auto object-contain sm:h-24" />
                  <figcaption className="mt-2 text-[12px] font-medium text-[#414042]">HACCP Food Safety</figcaption>
                </figure>
              </div>
              <figure className="flex flex-col items-center text-center">
                <Image src={`${WP}/2024-07-aempa-v2-1-e1745687358594-768x321.png`} alt="AEPMA" width={160} height={80} className="h-16 w-auto object-contain sm:h-20" />
                <figcaption className="mt-2 text-[12px] font-medium text-[#414042]">Australian Environmental Pest Managers Association</figcaption>
              </figure>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 13. FAQ ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-center text-[12px] font-bold uppercase tracking-[0.15em] text-[#3fa535]">COMMON QUESTIONS</p>
            <h2 className="mb-2 text-center text-[22px] font-bold text-[#131a1c] sm:text-[26px]">What businesses ask us</h2>
            <div className="mx-auto mb-6 h-[3px] w-[60px] bg-[#1cdc38]" />
            <div className="border-t border-[#e5e5e5]">
              <FaqPageAccordion faqs={COMMERCIAL_FAQS} defaultOpenIndex={0} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 14. READY TO TALK CTA ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#0d402e] px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-md text-center">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#1cdc38]">READY TO TALK?</p>
            <h2 className="mb-4 text-[24px] font-bold text-white sm:text-[30px]">
              Ready to discuss your pest management plan?
            </h2>
            <p className="mb-6 text-[14px] leading-[1.6] text-white/70 sm:text-[15px]">
              Call us now. We&apos;ll have a quick conversation, understand your business, and let you know how we can help. No scripts. No pressure.
            </p>
            <p className="mb-5 text-[28px] font-black text-[#1cdc38] sm:text-[34px]">{SITE_CONFIG.phone}</p>
            <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-8 py-4 text-[16px] font-bold text-white shadow-lg transition-transform hover:scale-105">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call Now
            </a>
          </div>
        </section>
      </ScrollReveal>

      <PageInfoFooterBlock />
    </>
  );
}
