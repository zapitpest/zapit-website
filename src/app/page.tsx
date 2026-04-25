import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG, HOMEPAGE_FAQS } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateProductSchema, generateFAQSchema } from '@/lib/schema';
import {
  HomepageFAQ,
  HomepageMelbourneCoverage,
  HomepagePestServiceTabs,
  HomepageReviews,
} from '@/components/sections/HomepageReviewsAndPestTabs';
import PriceCalculator from '@/components/sections/PriceCalculator';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';

const WP = '/images/wp-assets';

const PEST_ICONS = [
  { name: 'Cockroaches', icon: '/images/icons/insects/cockroach.svg' },
  { name: 'Ants', icon: '/images/icons/insects/ant.svg' },
  { name: 'Spiders', icon: '/images/icons/insects/spider.svg' },
  { name: 'Termites', icon: '/images/icons/insects/termite.svg' },
  { name: 'Bed Bugs', icon: '/images/icons/insects/bedbug.svg' },
  { name: 'Rats & Mice', icon: '/images/icons/insects/mouse-rat.svg' },
  { name: 'Mosquitoes', icon: '/images/icons/insects/mosquito.svg' },
  { name: 'Ticks', icon: '/images/icons/insects/tick.svg' },
] as const;

const STRATEGY_STEPS = [
  { n: 1, title: 'Inspect & Diagnose', body: 'Our licensed technicians conduct a detailed inspection of your property, identifying entry points, infestation levels, and species present to create a targeted treatment plan.' },
  { n: 2, title: 'Treat & Eliminate', body: 'Using DHHS-approved, eco-friendly solutions, we treat all affected areas to eliminate pests safely — protecting your family, pets, and property throughout the process.' },
  { n: 3, title: 'Prevent & Monitor', body: 'We seal entry points, set up preventive barriers, and schedule follow-up visits to ensure long-term protection. You also receive a compliance certificate for your records.' },
] as const;

const STATS = [
  { value: '15+', label: 'Years Experience' },
  { value: '5,000+', label: 'Homes Protected' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '<2h', label: 'Response Time' },
] as const;

const BLOG_CARDS = [
  { href: '/blogs#how-to-prepare-your-home-for-a-pest-control-visit', image: `${WP}/2026-01-How-to-Prepare-Your-Home-for-a-Pest-Control-Visit-img-300x200.jpg`, title: 'How to Prepare Your Home for a Pest Control Visit', excerpt: 'Preparing your home before a pest control visit improves treatment effectiveness and keeps your family safe.' },
  { href: '/blogs#what-happens-during-a-professional-pest-inspection', image: `${WP}/2026-01-What-Happens-During-a-Professional-Pest-Inspection-img-300x200.jpg`, title: 'What Happens During a Professional Pest Inspection?', excerpt: 'A professional pest inspection identifies existing infestations, risk areas, and the right treatment path.' },
  { href: '/blogs#pest-control-checklist-for-new-homeowners-in-melbourne', image: `${WP}/2025-12-Pest-Control-300x168.jpg`, title: 'Pest Control Checklist for New Homeowners', excerpt: 'Moving into a new home? Here is everything you need to know about protecting it from pests from day one.' },
] as const;

export const metadata: Metadata = {
  title: 'Pest Control Melbourne | Zap It Pest Control Services',
  description: `Zap It delivers fast, licensed pest & termite control across Melbourne, safe for pets & people, protecting homes & businesses from pests. Call ${SITE_CONFIG.phone}.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pest Control Melbourne | Zap It Pest Control Services',
    description: `Zap It delivers fast, licensed pest & termite control across Melbourne. Call ${SITE_CONFIG.phone}.`,
    url: SITE_CONFIG.url, siteName: SITE_CONFIG.name, locale: 'en_AU', type: 'website',
  },
};

export default function HomePage() {
  const faqSchema = generateFAQSchema(HOMEPAGE_FAQS.map((f) => ({ question: f.question, answer: f.answer })));
  const productSchema = generateProductSchema();
  const schemas = [productSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <JsonLd data={schemas} />

      {/* ===== 1. HERO — full-bleed image with dark green overlay ===== */}
      <section className="relative flex min-h-[480px] flex-col justify-end overflow-hidden bg-[#0d402e] pb-10 pt-24 text-white sm:min-h-[520px] sm:pb-14">
        <Image src={`${WP}/2025-09-imgi_73_WhatsApp-Image-2025-09-17-at-3.05.27-PM.jpg`} alt="" fill priority className="-z-10 object-cover object-center opacity-30" sizes="100vw" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-6">
          <h1 className="mb-4 max-w-lg text-[28px] font-bold leading-[1.15] sm:text-[36px] md:text-[44px]">
            Pest protection you can trust
          </h1>
          <p className="mb-6 max-w-md text-[15px] leading-[1.7] text-white/80 sm:text-[16px]">
            Melbourne&apos;s most trusted residential and commercial pest control service. Same-day service, eco-friendly solutions, fully licensed and insured.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={SITE_CONFIG.booking.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center rounded-full bg-[#1cdc38] px-7 py-3 text-[15px] font-bold text-[#131a1c] shadow-lg transition-transform hover:scale-105"
            >
              Book an Inspection
            </a>
            <Link href="/residential" className="inline-flex min-h-[48px] items-center rounded-full border-2 border-white/30 px-7 py-3 text-[15px] font-bold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10">
              Residential Services
            </Link>
          </div>

          {/* Trust badges row */}
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-white/70 sm:text-[14px]">
            {['Child safe', 'Pet safe', 'Eco friendly', 'Insured', 'DHHS Licensed', 'Accredited'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#1cdc38]" strokeWidth={2.5} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. STATS BAR ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#131a1c] py-5">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 px-5 sm:grid-cols-4 sm:px-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[22px] font-bold text-[#1cdc38] sm:text-[28px]">{s.value}</p>
                <p className="text-[12px] font-medium uppercase tracking-wide text-white/50 sm:text-[13px]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 3. PESTS WE TREAT — icon grid (like residential insects) ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#0d402e] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[24px] font-bold text-white sm:text-[30px]">Pests We Treat</h2>
            <p className="mx-auto mb-8 max-w-md text-center text-[14px] leading-[1.7] text-white/70 sm:text-[15px]">
              From common household pests to complex termite infestations, we handle it all with safe, effective solutions.
            </p>
            <div className="grid grid-cols-4 gap-3 sm:gap-5 md:grid-cols-8">
              {PEST_ICONS.map((p) => (
                <Link key={p.name} href="/pest-solutions" className="group flex flex-col items-center gap-2 rounded-2xl bg-white/5 px-2 py-4 text-center transition-colors hover:bg-white/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 sm:h-14 sm:w-14">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt={p.name} className="h-7 w-7 sm:h-8 sm:w-8" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <span className="text-[11px] font-medium leading-tight text-white/70 group-hover:text-white sm:text-[12px]">{p.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 4. WE TREAT ALL HOUSEHOLD PESTS — matching residential section ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#0d402e] px-5 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-3 text-[24px] font-bold leading-tight text-white sm:text-[28px]">
              We treat all household pests
            </h2>
            <p className="mb-5 text-[15px] leading-[1.7] text-[#f8f5f2]/80 sm:text-[16px]">
              When you protect your home and family from pests with us, your peace of mind is assured.
              Our services are eco-friendly, child safe, pet safe and we&apos;re fully insured and DHHS Licensed.
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

      {/* ===== 5. GOOGLE REVIEWS ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[24px] font-bold text-[#131a1c] sm:text-[30px]">
              What Our Customers Say
            </h2>
            <div className="mx-auto mb-6 h-[3px] w-14 bg-[#1cdc38]" />
            <HomepageReviews />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 6. 3-STEP STRATEGY ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[24px] font-bold text-[#131a1c] sm:text-[30px]">
              Our 3-Step Proven Strategy
            </h2>
            <div className="mx-auto mb-8 h-[3px] w-14 bg-[#1cdc38]" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {STRATEGY_STEPS.map((s) => (
                <div key={s.n} className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1cdc38] text-lg font-bold text-[#131a1c]">{s.n}</div>
                  <h3 className="mb-2 text-[18px] font-bold text-[#131a1c]">{s.title}</h3>
                  <p className="text-[14px] leading-[1.7] text-[#414042]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 7. COMPLETE PEST CONTROL TABS ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[24px] font-bold text-[#131a1c] sm:text-[30px]">
              Complete Pest Control Solutions
            </h2>
            <div className="mx-auto mb-8 h-[3px] w-14 bg-[#1cdc38]" />
            <HomepagePestServiceTabs />
            <div className="mt-8 text-center">
              <Link href="/pest-solutions" className="inline-flex min-h-[48px] items-center rounded-full bg-[#1cdc38] px-8 py-3 text-sm font-bold text-[#131a1c] transition-transform hover:scale-105">
                Explore All Services
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 8. SAME-DAY SERVICE CTA ===== */}
      <ScrollReveal direction="left">
        <section className="bg-[#0d402e] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
                <Image src={`${WP}/2025-10-imgi_22_Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp`} alt="Zap It pest controller treating a Melbourne home" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div>
                <h2 className="mb-4 text-[24px] font-bold leading-tight text-white sm:text-[30px]">
                  Same-Day Pest Control Service
                </h2>
                <p className="mb-4 text-[15px] leading-[1.7] text-white/80">
                  When pests invade, you need fast action. Our licensed technicians arrive the same day, equipped with the latest technology and eco-friendly treatments to eliminate pests and prevent future infestations.
                </p>
                <ul className="mb-6 space-y-2 text-[14px] text-white/70">
                  {['Same-day emergency response', 'Eco-friendly, DHHS-approved treatments', 'Child and pet safe solutions', 'Comprehensive follow-up inspections'].map((t) => (
                    <li key={t} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1cdc38]" strokeWidth={2.5} />{t}</li>
                  ))}
                </ul>
                <a href={SITE_CONFIG.booking.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center rounded-full bg-[#1cdc38] px-8 py-3 text-[15px] font-bold text-[#131a1c] transition-transform hover:scale-105">
                  Book an Inspection Today
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 9. WHY CHOOSE US / MELBOURNE COVERAGE ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[24px] font-bold text-[#131a1c] sm:text-[30px]">
              Why Choose Zap It?
            </h2>
            <div className="mx-auto mb-8 h-[3px] w-14 bg-[#1cdc38]" />
            <HomepageMelbourneCoverage />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 10. PRICE CALCULATOR ===== */}
      <ScrollReveal direction="fade">
        <PriceCalculator />
      </ScrollReveal>

      {/* ===== 11. PEST LIBRARY / BLOG ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[24px] font-bold text-[#131a1c] sm:text-[30px]">Pest Library</h2>
            <div className="mx-auto mb-8 h-[3px] w-14 bg-[#1cdc38]" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {BLOG_CARDS.map((b) => (
                <Link key={b.title} href={b.href} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-[200px] w-full">
                    <Image src={b.image} alt="" fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-[16px] font-bold leading-snug text-[#131a1c] group-hover:text-[#1cdc38]">{b.title}</h3>
                    <p className="mb-4 flex-1 text-[13px] leading-[1.6] text-[#414042] line-clamp-3">{b.excerpt}</p>
                    <span className="inline-flex w-fit rounded-full bg-[#1cdc38] px-5 py-2 text-sm font-bold text-[#131a1c]">Read More</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 12. FAQ ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[24px] font-bold text-[#131a1c] sm:text-[30px]">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mb-6 h-[3px] w-14 bg-[#1cdc38]" />
            <HomepageFAQ />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 13. CONTACT / 200% GUARANTEE STRIP ===== */}
      <section className="bg-[#131a1c]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-14">
          <div className="relative mx-auto aspect-square w-full max-w-[340px] overflow-hidden rounded-2xl lg:mx-0">
            <Image src={`${WP}/2025-07-imgi_23_—Pngtree—pest-control-worker-in-protective_15020351-2-1-768x768.webp`} alt="Licensed pest control professional" fill className="object-cover" sizes="340px" />
            <div className="absolute bottom-4 right-4 h-[80px] w-[80px]">
              <Image src="/images/certifications/guarantee-200d.png" alt="200% Guarantee" width={80} height={80} className="drop-shadow-lg" />
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-[24px] font-bold leading-tight text-white sm:text-[30px]">
              Melbourne&apos;s Most Trusted Pest Control
            </h2>
            <p className="mb-6 text-[15px] leading-[1.7] text-white/70">
              With over 15 years of experience, we&apos;ve built our reputation on results. Every treatment comes with our 200% satisfaction guarantee — if pests return, so do we, free of charge.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1cdc38] px-6 py-3.5 text-[15px] font-bold text-[#131a1c] transition-transform hover:scale-105">
                <Phone className="h-4 w-4" />{SITE_CONFIG.phone}
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/5">
                <Mail className="h-4 w-4" />{SITE_CONFIG.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAGE INFO FOOTER ===== */}
      <PageInfoFooterBlock />
    </>
  );
}
