import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle2, Shield, Clock, Leaf, Award } from 'lucide-react';
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
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';
import HomeHero from '@/components/sections/HomeHero';

const WP = '/images/wp-assets';

const PEST_ICONS = [
  { name: 'Rodents', icon: '/images/icons/insects/mouse-rat.svg', href: '/rodent-control-melbourne' },
  { name: 'Cockroaches', icon: '/images/icons/insects/cockroach.svg', href: '/cockroach-pest-control-melbourne' },
  { name: 'Ants', icon: '/images/icons/insects/ant.svg', href: '/ant-pest-control-melbourne' },
  { name: 'Spiders', icon: '/images/icons/insects/spider.svg', href: '/spider-pest-control-melbourne' },
  { name: 'Wasps & Bees', icon: '/images/icons/insects/tick.svg', href: '/wasp-removal-melbourne' },
  { name: 'Termites', icon: '/images/icons/insects/termite.svg', href: '/termite-control-melbourne' },
  { name: 'Fleas', icon: '/images/icons/insects/bedbug.svg', href: '/flea-control-melbourne' },
  { name: 'Silverfish', icon: '/images/icons/insects/mosquito.svg', href: '/silverfish-control-melbourne' },
] as const;

const STATS = [
  { value: '15+', label: 'YEARS EXPERIENCE' },
  { value: '5,000+', label: 'HOMES PROTECTED' },
  { value: '4.9★', label: 'GOOGLE RATING' },
  { value: '<2h', label: 'RESPONSE TIME' },
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

const WHY_CHOOSE = [
  { icon: 'shield', title: '200% Money-Back Guarantee', body: 'If pests return within the warranty period, we come back free. Still not happy? Full refund — no questions asked.' },
  { icon: 'clock', title: 'Same-Day Emergency Response', body: 'Call before 2pm and we\'ll be at your door today. After-hours emergency service also available 7 days.' },
  { icon: 'leaf', title: 'Eco-Friendly & Pet Safe', body: 'All treatments are DHHS-approved, child-safe and pet-safe. We use the latest low-toxicity formulations.' },
  { icon: 'award', title: 'Licensed & Fully Insured', body: 'Every technician is government-licensed, police-checked and covered by $20M public liability insurance.' },
] as const;

const CERT_ITEMS = [
  'DHS Licensed',
  'HACCP Certified',
  'Wildlife Licence',
  'Fully Insured',
  'AEPMA Member',
  'DHHS Licensed',
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

function WhyIcon({ type }: { type: string }) {
  const cls = 'h-6 w-6 text-[#3fa535]';
  switch (type) {
    case 'shield': return <Shield className={cls} strokeWidth={2} />;
    case 'clock': return <Clock className={cls} strokeWidth={2} />;
    case 'leaf': return <Leaf className={cls} strokeWidth={2} />;
    case 'award': return <Award className={cls} strokeWidth={2} />;
    default: return null;
  }
}

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
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/50 sm:text-[12px]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 3. PESTS WE TREAT — dark icon grid ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#0d402e] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[24px] font-bold text-white sm:text-[30px]">Pests We Treat</h2>
            <p className="mx-auto mb-8 max-w-md text-center text-[14px] leading-[1.7] text-white/70 sm:text-[15px]">
              From common household pests to complex termite infestations, we handle it all with safe, effective solutions.
            </p>
            <div className="grid grid-cols-4 gap-3 sm:gap-5 md:grid-cols-8">
              {PEST_ICONS.map((p) => (
                <Link key={p.name} href={p.href} className="group flex flex-col items-center gap-2 rounded-2xl bg-white/5 px-2 py-4 text-center transition-colors hover:bg-white/10">
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

      {/* ===== 4. GOOGLE REVIEWS — auto-scroll carousel ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <HomepageReviews />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 5. CERTIFICATIONS BAR ===== */}
      <ScrollReveal direction="fade">
        <section className="border-y border-[#e5e5e5] bg-[#f8f5f2] py-4 sm:py-5">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 sm:gap-x-10">
            {CERT_ITEMS.map((c) => (
              <span key={c} className="flex items-center gap-1.5 text-[12px] font-medium text-[#414042] sm:text-[13px]">
                <CheckCircle2 className="h-4 w-4 text-[#3fa535]" strokeWidth={2.5} />
                {c}
              </span>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 6. ALL PEST TYPES — Figma cards ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <p className="mb-1 text-center text-[12px] font-bold uppercase tracking-wider text-[#3fa535] sm:text-left">ALL PEST TYPES</p>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-[24px] font-bold text-[#131a1c] sm:text-[30px]">We treat all household pests</h2>
              <Link href="/pest-solutions" className="hidden items-center gap-2 rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#414042] shadow-sm transition-colors hover:border-[#3fa535] sm:inline-flex">
                Go to pest solutions and price list &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
              {PEST_ICONS.map((p) => (
                <Link key={p.name} href={p.href} className="group flex items-center gap-3 rounded-xl border border-[#e5e5e5] bg-white p-4 shadow-sm transition-all hover:border-[#3fa535] hover:shadow-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f8f5f2]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt="" className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#131a1c] sm:text-[15px]">{p.name}</p>
                    <p className="text-[12px] font-medium text-[#3fa535] group-hover:underline">View treatment &rarr;</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link href="/pest-solutions" className="inline-flex items-center gap-2 rounded-lg border border-[#e5e5e5] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#414042] shadow-sm">
                Go to pest solutions and price list &rarr;
              </Link>
            </div>
          </div>
        </section>
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
                <div className="mb-6 flex flex-wrap gap-2">
                  {SUBURBS.map((s) => (
                    <span key={s} className="rounded-full border border-[#e5e5e5] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#414042] shadow-sm sm:text-[13px]">{s}</span>
                  ))}
                  <span className="flex items-center text-[13px] text-[#414042]">& surrounding areas</span>
                </div>
                <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-6 py-3 text-[14px] font-bold text-white transition-transform hover:scale-105">
                  <Phone className="h-4 w-4" />Check your suburb — call us
                </a>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-[#0d402e] p-6 shadow-lg sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                    <Image src="/images/icons/service-provider-icon.svg" alt="" width={32} height={32} />
                  </div>
                  <h3 className="mb-2 text-[20px] font-bold text-white">Northern &amp; Eastern Melbourne</h3>
                  <p className="mb-4 text-[13px] leading-relaxed text-white/70">
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
                  <Phone className="h-4 w-4" />Call to Book
                </a>
              </div>
              <div className="space-y-5">
                {HOW_IT_WORKS.map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#0d402e] text-[14px] font-bold text-[#0d402e]">{step.n}</div>
                    <div>
                      <h3 className="text-[17px] font-bold text-[#131a1c]">{step.title}</h3>
                      <p className="mt-1 text-[14px] leading-[1.6] text-[#414042]">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 9. WHY CHOOSE ZAP IT — 4 value props with image ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
                <Image src={`${WP}/2025-10-imgi_22_Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp`} alt="Zap It technician treating a Melbourne home" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div>
                <p className="mb-1 text-[12px] font-bold uppercase tracking-wider text-[#3fa535]">WHY CHOOSE US</p>
                <h2 className="mb-6 text-[24px] font-bold leading-tight text-[#131a1c] sm:text-[30px]">
                  Melbourne&apos;s most trusted pest control
                </h2>
                <div className="space-y-5">
                  {WHY_CHOOSE.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3fa535]/10">
                        <WhyIcon type={item.icon} />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-[#131a1c]">{item.title}</h3>
                        <p className="mt-1 text-[13px] leading-[1.6] text-[#414042]">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 10. SAME-DAY SERVICE — dark CTA with image ===== */}
      <ScrollReveal direction="left">
        <section className="bg-[#0d402e] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
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
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
                <Image src="/images/residential/melbourne-fleet.png" alt="Zap It pest control fleet serving Melbourne" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 11. VIDEO SECTION ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#131a1c] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px] text-center">
            <p className="mb-1 text-[12px] font-bold uppercase tracking-wider text-[#3fa535]">SEE US IN ACTION</p>
            <h2 className="mb-2 text-[24px] font-bold text-white sm:text-[30px]">Watch how we protect Melbourne homes</h2>
            <p className="mx-auto mb-8 max-w-lg text-[14px] leading-[1.7] text-white/70 sm:text-[15px]">
              A short video showing our team at work — the professional, respectful way we care for your home.
            </p>
            <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-[#3fa535]/30">
              <div className="relative flex aspect-video items-center justify-center bg-black/30">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110">
                  <svg className="ml-1 h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <p className="absolute bottom-4 text-[13px] italic text-white/40">New branded video — coming soon</p>
              </div>
            </div>
            <a href={SITE_CONFIG.phoneTel} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-7 py-3 text-[15px] font-bold text-white transition-transform hover:scale-105">
              <Phone className="h-4 w-4" />Call Now — {SITE_CONFIG.phone}
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 12. SERVING MELBOURNE — suburb pills ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-[900px] text-center">
            <h2 className="mb-2 text-[22px] font-bold text-[#131a1c] sm:text-[26px]">Serving Melbourne&apos;s north and east</h2>
            <p className="mb-6 text-[14px] text-[#414042]">Same-day and next-day availability. Mon-Sun 6am-8pm. After-hours emergencies accepted.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUBURBS.map((s) => (
                <span key={s} className="rounded-full border border-[#e5e5e5] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#414042] shadow-sm sm:text-[13px]">{s}</span>
              ))}
            </div>
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
              Call us directly. We&apos;ll sort out what you need and find a time that suits you. Mon-Sun 6am–8pm.
            </p>
            <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-8 py-3.5 text-[16px] font-bold text-white shadow-lg transition-transform hover:scale-105">
              <Phone className="h-5 w-5" />Call Now — {SITE_CONFIG.phone}
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

      {/* ===== 15. PRICE CALCULATOR ===== */}
      <ScrollReveal direction="fade">
        <PriceCalculator />
      </ScrollReveal>

      {/* ===== 16. FAQ ===== */}
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

      {/* ===== PAGE INFO FOOTER ===== */}
      <PageInfoFooterBlock />
    </>
  );
}
