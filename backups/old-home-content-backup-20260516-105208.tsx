import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG, HOMEPAGE_FAQS } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateProductSchema, generateFAQSchema } from '@/lib/schema';
import {
  HomepageFAQ,
  HomepagePestServiceTabs,
  HomepageReviews,
} from '@/components/sections/HomepageReviewsAndPestTabs';
import PriceCalculator from '@/components/sections/PriceCalculator';
import ScrollReveal from '@/components/ui/ScrollReveal';
import InquiryForm from '@/components/sections/InquiryForm';
import MoneyBackGuarantee from '@/components/sections/MoneyBackGuarantee';

import HomeHero from '@/components/sections/HomeHero';

const WP = '/images/wp-assets';

const MELBOURNE_MAP =
  'https://www.google.com/maps?q=' + encodeURIComponent('Melbourne, Victoria, Australia') + '&z=10&output=embed';

// Alphabetical (brief item 18)
const SERVICE_CARDS = [
  { name: 'Ants', icon: '/images/icons/insects/ant.svg', href: '/ant-pest-control-melbourne', desc: 'Targeted ant treatments that get to the source of the colony, not just the visible trail.' },
  { name: 'Cockroaches', icon: '/images/icons/insects/cockroach.svg', href: '/cockroach-control-melbourne', desc: 'Commercial-grade cockroach control for kitchens, bathrooms and hard-to-reach hiding spots.' },
  { name: 'End of Lease', icon: '/images/icons/insects/bedbug.svg', href: null, desc: 'Comprehensive pest treatments to meet rental inspection requirements and property manager checklists.' },
  { name: 'Mosquitoes', icon: '/images/icons/insects/mosquito.svg', href: null, desc: 'Yard and garden mosquito control treatments to reduce breeding sites and biting activity.' },
  { name: 'Rodents', icon: '/images/icons/insects/mouse-rat.svg', href: '/rodent-control-melbourne', desc: 'Fast, discreet removal of mice and rats with baiting, trapping and proofing to keep them out.' },
  { name: 'Spiders', icon: '/images/icons/insects/spider.svg', href: '/spider-control-melbourne', desc: 'Interior and exterior spider treatments including webs, entry points and harbourage areas.' },
  { name: 'Termites', icon: '/images/icons/insects/termite.svg', href: '/termite-control-melbourne', desc: 'Thorough termite inspections and liquid or bait treatments to protect your property from structural damage.' },
  { name: 'Wasps', icon: '/images/icons/insects/tick.svg', href: '/wasp-removal-melbourne', desc: 'Safe removal of wasp nests and bee relocations, with protective treatments around nesting areas.' },
] as const;

const STATS = [
  { value: '5,000+', label: 'HOMES PROTECTED' },
  { value: '500+', label: 'COMMERCIAL CLIENTS' },
  { value: 'Licensed', label: 'TECHNICIANS' },
  { value: 'Same Day', label: 'SERVICE AVAILABLE' },
] as const;

const SUBURBS = [
  'Heidelberg', 'Bundoora', 'Reservoir', 'Preston', 'Eltham',
  'Greensborough', 'Mill Park', 'Thomastown', 'Epping',
  'Doncaster', 'Macleod', 'Coburg', 'Northcote', 'Watsonia', 'Lalor',
] as const;

const HOW_IT_WORKS = [
  { n: '01', title: 'Call us', body: 'Speak directly with our team. We\'ll ask a few quick questions and confirm what you need.' },
  { n: '02', title: 'We come to you', body: 'A licensed technician arrives on time, explains the treatment, and gets to work.' },
  { n: '03', title: 'Problem solved', body: 'We follow up to make sure the treatment worked. If not, we come back — no charge.' },
] as const;


// Specific licence/membership/accreditation badges removed per client item 4.
// Restore once client confirms exact wording, numbers and currency of each claim.
const CERT_ITEMS = [
  { title: 'Licensed Technicians', sub: 'Trained Melbourne team' },
  { title: 'Fully Insured', sub: 'Public liability cover' },
  { title: 'Same-Day Service', sub: 'When availability allows' },
  { title: 'Pet & Family Safe', sub: 'Responsible application' },
] as const;


const GUARANTEE_POINTS = [
  { title: 'Free Re-Treatment', body: 'If pests return within the warranty period, we come back at no extra cost to re-treat your property.' },
  { title: 'Satisfaction Commitment', body: 'If you\'re not satisfied after re-treatment, we\'ll work with you to make it right. Your satisfaction matters to us.' },
  { title: 'Transparent Pricing', body: 'No hidden fees, no surprise charges. You get a detailed quote upfront before any work begins.' },
  { title: 'Written Warranty', body: 'Every treatment comes with a written warranty certificate for your records and peace of mind.' },
] as const;

export const metadata: Metadata = {
  title: 'Pest Control Melbourne | Zapit Pest Control Services',
  description: `Zapit delivers fast, licensed pest & termite control across Melbourne. approved, protecting homes & businesses from pests. Call ${SITE_CONFIG.phone}.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pest Control Melbourne | Zapit Pest Control Services',
    description: `Zapit delivers fast, licensed pest & termite control across Melbourne. Call ${SITE_CONFIG.phone}.`,
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

      {/* ===== 1. HERO — image slider with overlay ===== */}
      <HomeHero />

      {/* ===== 2. STATS BAR ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#131a1c] py-6">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 px-5 sm:grid-cols-4 sm:px-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[24px] font-bold text-[#1cdc38] sm:text-[30px]">{s.value}</p>
                <p className="mt-1 text-[13px] font-semibold uppercase tracking-wider text-white/50 sm:text-[14px]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 3. RESIDENTIAL / COMMERCIAL PATHWAYS ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Residential */}
              <div className="flex flex-col rounded-2xl bg-[#0d402e] p-6 sm:p-8">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#64FF01]">RESIDENTIAL</p>
                <h2 className="mb-3 text-[20px] font-bold leading-tight text-white sm:text-[22px]">
                  Protecting your family and home
                </h2>
                <p className="mb-5 flex-1 text-[14px] leading-relaxed text-white/70 sm:text-[15px]">
                  Safe, thorough pest treatments for houses and apartments. Termite inspections. Ongoing protection plans.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={SITE_CONFIG.phoneTel} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#64FF01] px-5 py-2.5 text-[14px] font-bold text-[#0d402e] transition-transform hover:scale-105">
                    <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Call Now
                  </a>
                </div>
              </div>
              {/* Commercial */}
              <div className="flex flex-col rounded-2xl bg-[#131a1c] p-6 sm:p-8">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#1cdc38]">COMMERCIAL</p>
                <h2 className="mb-3 text-[20px] font-bold leading-tight text-white sm:text-[22px]">
                  Protecting your business as if it were our business
                </h2>
                <p className="mb-5 flex-1 text-[14px] leading-relaxed text-white/70 sm:text-[15px]">
                  Structured, compliant pest management for restaurants, warehouses, offices and regulated environments across Melbourne.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={SITE_CONFIG.phoneTel} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#1cdc38] px-5 py-2.5 text-[14px] font-bold text-[#131a1c] transition-transform hover:scale-105">
                    <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 4. SERVICES WE OFFER ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <p className="mb-1 text-center text-[12px] font-bold uppercase tracking-wider text-[#3fa535]">OUR SERVICES</p>
            <h2 className="mb-8 text-center text-[24px] font-bold text-[#131a1c] sm:text-[30px]">Pest treatments for every situation</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 sm:gap-5">
              {SERVICE_CARDS.map((s) => (
                <div key={s.name} className="flex flex-col rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2] p-5">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d402e]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt="" className="h-7 w-7" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden />
                  </div>
                  <h3 className="mb-1.5 text-[16px] font-bold text-[#131a1c]">{s.name}</h3>
                  <p className="mb-4 flex-1 text-[14px] leading-relaxed text-[#414042]">{s.desc}</p>
                  <a href={SITE_CONFIG.phoneTel} className="text-[13px] font-semibold text-[#3fa535] hover:underline">Call us &rarr;</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 4. GOOGLE REVIEWS — auto-scroll carousel ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <HomepageReviews />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 5. CERTIFICATIONS BAR — Figma style with subtitles ===== */}
      <ScrollReveal direction="fade">
        <section className="border-y border-[#e5e5e5] bg-white py-5 sm:py-6">
          <div className="mx-auto flex max-w-[1200px] overflow-x-auto px-5 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-center gap-6 sm:gap-8 lg:mx-auto">
              {CERT_ITEMS.map((c) => (
                <div key={c.title} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#3fa535]" strokeWidth={2.5} />
                  <div>
                    <p className="text-[14px] font-semibold text-[#131a1c] sm:text-[15px]">{c.title}</p>
                    <p className="text-[11px] text-[#636363] sm:text-[12px]">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 6. PRICE CALCULATOR — surfaced higher for instant-quote intent ===== */}
      <ScrollReveal direction="fade">
        <PriceCalculator />
      </ScrollReveal>

      {/* ===== 7. WHERE WE WORK — suburb pills + map ===== */}
      <ScrollReveal direction="left">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="mb-1 text-[12px] font-bold uppercase tracking-wider text-[#3fa535]">WHERE WE WORK</p>
                <h2 className="mb-3 text-[24px] font-bold leading-tight text-[#131a1c] sm:text-[30px]">
                  We protect homes across Melbourne&apos;s north and east
                </h2>
                <p className="mb-5 text-[15px] leading-[1.7] text-[#414042]">
                  If you live in the northern or eastern suburbs, chances are we&apos;ve protected a home near yours. Call us and we&apos;ll confirm whether we service your area.
                </p>
                <p className="mb-6 text-[15px] leading-[1.7] text-[#414042]">
                  We service Melbourne&apos;s northern, north-eastern, and eastern suburbs and surrounding areas. Call us to confirm we cover your street.
                </p>
                <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-6 py-3 text-[14px] font-bold text-white transition-transform hover:scale-105">
                  <Phone className="h-4 w-4" />Check your suburb — call us
                </a>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-[#0d402e] p-6 shadow-lg sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                    <Image src="/images/icons/service-provider-icon.svg" alt="" width={32} height={32} />
                  </div>
                  <h3 className="mb-2 text-[22px] font-bold text-white">Northern &amp; Eastern Melbourne</h3>
                  <p className="mb-4 text-[15px] leading-relaxed text-white/70">
                    Airport / Tullamarine &rarr; Doncaster / Templestowe<br />
                    Brunswick &rarr; Eltham / Diamond Creek
                  </p>
                  <Link href="/service-areas" className="inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-5 py-2.5 text-[13px] font-bold text-white transition-transform hover:scale-105">
                    Our coverage area
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 8. HOW IT WORKS — 3-step ===== */}
      <ScrollReveal direction="right">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="mb-1 text-[12px] font-bold uppercase tracking-wider text-[#3fa535]">HOW IT WORKS</p>
                <h2 className="mb-3 text-[24px] font-bold leading-tight text-[#131a1c] sm:text-[30px]">Easy from start to finish</h2>
                <p className="mb-6 max-w-md text-[15px] leading-[1.7] text-[#414042]">
                  No lengthy forms. No waiting around. Just straightforward, professional pest control that gets the job done.
                </p>
                <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-6 py-3 text-[14px] font-bold text-white transition-transform hover:scale-105">
                  <Phone className="h-4 w-4" />Call Now for Same-Day Service
                </a>
              </div>
              <div className="space-y-5">
                {HOW_IT_WORKS.map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#0d402e] text-[14px] font-bold text-[#0d402e]">{step.n}</div>
                    <div>
                      <h3 className="text-[18px] font-bold text-[#131a1c]">{step.title}</h3>
                      <p className="mt-1 text-[15px] leading-[1.6] text-[#414042]">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>


      {/* ===== 10. OUR 200% GUARANTEE — premium section ===== */}
      <ScrollReveal direction="up">
        <section className="relative overflow-hidden bg-[#131a1c] px-5 py-10 sm:px-6 sm:py-16">
          <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-[#0d402e]/40 blur-[100px]" />
          <div className="relative z-10 mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="mb-1 text-[12px] font-bold uppercase tracking-wider text-[#3fa535]">OUR PROMISE</p>
                <h2 className="mb-3 text-[26px] font-bold leading-tight text-white sm:text-[32px]">
                  We stand behind every treatment
                </h2>
                <p className="mb-6 text-[15px] leading-[1.7] text-white/70">
                  We&apos;re not done until you&apos;re satisfied. If pests return within the warranty period, we come back at no charge. Our written warranty means our commitment is on paper, not just words.
                </p>
                <div className="space-y-4">
                  {GUARANTEE_POINTS.map((g) => (
                    <div key={g.title} className="flex gap-3">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3fa535]">
                        <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-white">{g.title}</h3>
                        <p className="text-[14px] leading-[1.6] text-white/60">{g.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a href={SITE_CONFIG.phoneTel} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-7 py-3 text-[15px] font-bold text-white shadow-lg transition-transform hover:scale-105">
                  <Phone className="h-4 w-4" />Get Protected Today
                </a>
              </div>
              <div className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none">
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
                  <Image src="/images/residential/highrise-specialist.png" alt="Licensed pest control professional" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 80vw" />
                </div>
                <div className="absolute -bottom-4 -right-4 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#3fa535] shadow-2xl sm:h-[110px] sm:w-[110px]">
                  <svg className="h-12 w-12 text-white sm:h-14 sm:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 11. SAME-DAY SERVICE — dark green CTA with image ===== */}
      <ScrollReveal direction="left">
        <section className="bg-[#0d402e] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div>
                <h2 className="mb-4 text-[24px] font-bold leading-tight text-white sm:text-[30px]">
                  Same-Day Pest Control Service
                </h2>
                <p className="mb-4 text-[16px] leading-[1.7] text-white/80">
                  When pests invade, you need fast action. Our licensed technicians arrive the same day, equipped with the latest technology and approved treatments to eliminate pests and prevent future infestations.
                </p>
                <ul className="mb-6 space-y-2 text-[15px] text-white/70">
                  {['Same-day emergency response', 'approved, licensed treatments', 'Family-friendly approach', 'Comprehensive follow-up inspections'].map((t) => (
                    <li key={t} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1cdc38]" strokeWidth={2.5} />{t}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a href={SITE_CONFIG.phoneTel} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#1cdc38] px-8 py-3 text-[15px] font-bold text-[#131a1c] transition-transform hover:scale-105">
                    <Phone className="h-4 w-4 shrink-0" />Call Now
                  </a>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <Image src="/images/residential/family-trust.png" alt="Protection you can trust — Zapit pest control for Melbourne homes" width={600} height={700} className="h-auto w-full object-contain" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 11b. PET SAFETY TEXT ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#0d402e] px-5 py-10 sm:px-6 sm:py-12">
          <p className="mx-auto max-w-md text-center text-[20px] italic leading-[1.5] text-[#1cdc38] sm:text-[24px]">
            We know pets are part of the family, which is why we take care with our product choices and application methods in every home we treat.
          </p>
        </section>
      </ScrollReveal>

      {/* ===== 11c. CAT-GIRL IMAGE ===== */}
      <section className="w-full bg-[#0d402e]">
        <Image src="/images/residential/cat-girl.png" alt="Zapit were great to deal with and I felt confident they took my cats safety seriously - Jenny, Hawthorn resident" width={750} height={750} className="h-auto w-full" />
      </section>

      {/* ===== 11d. HOME TRUST TEXT ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#0d402e] px-5 py-10 sm:px-6 sm:py-12">
          <p className="mx-auto max-w-md text-center text-[20px] italic leading-[1.5] text-[#1cdc38] sm:text-[24px]">
            We treat your home and business with the same care as our own. Your satisfaction is our highest priority.
          </p>
        </section>
      </ScrollReveal>

      {/* ===== 11e. TOWNHOUSE IMAGE ===== */}
      <section className="w-full bg-[#0d402e]">
        <Image src="/images/residential/townhouse.png" alt="We treat your home as if it were ours - Your satisfaction is our highest priority" width={750} height={500} className="h-auto w-full" />
      </section>

      {/* TODO: Re-add real video when client supplies URL or MP4 */}

      {/* ===== 12. SERVING MELBOURNE — compact text ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#f8f5f2] px-5 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-[700px] text-center">
            <p className="text-[16px] font-medium text-[#414042]">
              Servicing homes and businesses across Melbourne&apos;s northern, north-eastern, and eastern suburbs — same-day service available.{' '}
              <a href={SITE_CONFIG.phoneTel} className="font-bold text-[#3fa535] hover:underline">Call to check your area.</a>
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 13. READY TO PROTECT CTA ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-[600px] text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#3fa535]/10">
              <CheckCircle2 className="h-6 w-6 text-[#3fa535]" strokeWidth={2.5} />
            </div>
            <h2 className="mb-3 text-[26px] font-bold text-[#131a1c] sm:text-[32px]">Ready to protect your home?</h2>
            <p className="mb-6 text-[15px] leading-[1.7] text-[#414042]">
              Call us directly. We&apos;ll sort out what you need and find a time that suits you. Mon–Fri 8am–5pm, Sat 8am–12pm.
            </p>
            <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#3fa535] px-8 py-3.5 text-[16px] font-bold text-white shadow-lg transition-transform hover:scale-105">
              <Phone className="h-5 w-5 shrink-0" />Call Now — {SITE_CONFIG.phone}
          </a>
        </div>
        </section>
      </ScrollReveal>

      {/* ===== 14. COMPLETE PEST CONTROL TABS ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[24px] font-bold text-[#131a1c] sm:text-[30px]">
              Complete Pest Control Solutions
            </h2>
            <div className="mx-auto mb-8 h-[3px] w-14 bg-[#1cdc38]" />
            <HomepagePestServiceTabs />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 15. INQUIRY FORM (ported from /residential) ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-4 py-10 sm:px-5 sm:py-14">
          <InquiryForm />
          <div className="mt-6">
            <MoneyBackGuarantee />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 16. MELBOURNE SERVICE-AREA MAP (ported from /residential) ===== */}
      <section className="bg-[#131a1c] px-0 pb-2 sm:px-4">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden sm:rounded-2xl">
          <div className="relative aspect-[4/3] w-full min-h-[240px] bg-[#1a4f38] sm:aspect-[16/9] sm:min-h-[300px]">
            <iframe
              title="Zapit Melbourne service area map"
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

      {/* ===== 16b. WE'VE GOT MELBOURNE COVERED ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#0d402e] px-5 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-3 text-[26px] font-bold leading-[30px] text-white sm:text-[30px] sm:leading-[34px]">
              We&apos;ve got Melbourne covered
            </h2>
            <p className="mb-6 text-[17px] font-medium leading-[24px] text-white/80 sm:text-[18px] sm:leading-[26px]">
              We service all suburbs in Melbourne, no matter if you&apos;re in an inner city apartment or a bush block in Warrandyte, we&apos;ve got you protected.
            </p>
          </div>
          <div className="mx-auto overflow-hidden rounded-2xl sm:max-w-xl">
            <Image
              src="/images/residential/melbourne-fleet.png"
              alt="Zapit Pest Control fleet of vehicles covering all Melbourne suburbs"
              width={480}
              height={320}
              className="w-full object-cover"
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 17. PROTECTION YOU CAN TRUST (generic — claims removed per client item 4) ===== */}
      {/* Specific accreditations/memberships/licence numbers will be restored once client confirms wording. */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-[24px] font-bold leading-tight text-[#131a1c] sm:text-[28px]">
              Protection you can trust
            </h2>
            <p className="mb-4 text-[15px] leading-[1.7] text-[#414042] sm:text-[16px]">
              Your health and safety is at the heart of everything we do. Every job is carried out by
              trained technicians using safe application methods and approved products.
            </p>
            <p className="text-[15px] leading-[1.7] text-[#414042] sm:text-[16px]">
              We treat your home and business with the same care we would our own — straightforward
              service, clear advice and protection you can rely on.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 18. FAQ ===== */}
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

    </>
  );
}
