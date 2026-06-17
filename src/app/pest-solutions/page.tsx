import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Phone, Shield, Bug, Leaf, Sun, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import StatsCounter from '@/components/sections/StatsCounter';

export const metadata: Metadata = {
  title: { absolute: `Pest Control Solutions in Melbourne | ${SITE_CONFIG.name}` },
  description: `Complete pest control solutions for Melbourne homes and businesses. From ants and termites to rodents and possums — Zapit handles it all. Call ${SITE_CONFIG.phone}.`,
  alternates: { canonical: '/pest-solutions' },
};

const PEST_ICON_MAP: Record<string, string> = {
  'ant-pest-control-melbourne': '/images/icons/insects/ant.svg',
  'bed-bug-control-melbourne': '/images/icons/insects/bedbug.svg',
  'bee-removal-melbourne': '/images/icons/insects/tick.svg',
  'clothes-moths-treatment-melbourne': '/images/icons/insects/mosquito.svg',
  'cockroach-control-melbourne': '/images/icons/insects/cockroach.svg',
  'flea-control-melbourne': '/images/icons/insects/bedbug.svg',
  'fly-control-melbourne': '/images/icons/insects/mosquito.svg',
  'mosquito-control-melbourne': '/images/icons/insects/mosquito.svg',
  'possum-removal-melbourne': '/images/icons/insects/mouse-rat.svg',
  'rodent-control-melbourne': '/images/icons/insects/mouse-rat.svg',
  'silverfish-control-melbourne': '/images/icons/insects/centipede.svg',
  'spider-control-melbourne': '/images/icons/insects/spider.svg',
  'termite-control-melbourne': '/images/icons/insects/termite.svg',
  'treatment-for-wood-borers-in-melbourne': '/images/icons/insects/termite.svg',
  'wasp-removal-melbourne': '/images/icons/insects/tick.svg',
};

const SPECIALISED = [
  { href: '/pest-solutions/seasonal-pest-control', title: 'Seasonal Pest Control', desc: 'Year-round protection tailored to Melbourne\'s seasonal pest patterns.', Icon: Sun },
  { href: '/pest-solutions/organic-pest-control', title: 'Organic Pest Control', desc: 'Low-toxic and natural treatment options using responsible methods.', Icon: Leaf },
  { href: '/pest-solutions/garden-pest-control', title: 'Garden Pest Control', desc: 'Protect your outdoor spaces, lawns, and entertainment areas from pests.', Icon: Bug },
] as const;

export default function PestSolutionsPage() {
  const services = Object.values(SERVICE_PAGES);
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', href: SITE_CONFIG.url },
    { name: 'Pest Solutions', href: `${SITE_CONFIG.url}/pest-solutions` },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumb]} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#0d402e] text-white">
        <div className="absolute inset-0">
          <Image src="/images/residential/hero-house.png" alt="" fill className="object-cover object-center opacity-20" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d402e]/95 via-[#0d402e]/80 to-[#0d402e]/60" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#64FF01]">Pest Solutions</span>
          </nav>
          <h1 className="mb-4 max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Complete Pest Control Solutions for Melbourne
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-white/80 md:text-xl">
            From common household pests to commercial infestations — our licensed, approved technicians deliver targeted treatments that protect your property.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 rounded-full bg-[#64FF01] px-6 py-3 text-[15px] font-bold text-[#0d402e] transition-transform hover:scale-105">
              <Phone className="h-4 w-4" />Call Now — {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="border-b border-[#e5e5e5] bg-[#f8f5f2] py-4">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 text-[13px] font-semibold text-[#0d402e] sm:text-[14px]">
          {['Licensed', 'Family Friendly', 'Same-Day Service', 'Accredited', 'Fully Insured'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#3fa535]" strokeWidth={2.5} />{t}
            </span>
          ))}
        </div>
      </section>

      {/* ===== GENERAL PEST INSPECTION (client item 6 — draft copy supplied) ===== */}
      <section className="bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2] px-6 py-8 sm:px-10 sm:py-10">
            <p className="text-[12px] font-bold uppercase tracking-wider text-[#3fa535]">Not sure what you have?</p>
            <h2 className="mt-2 text-[24px] font-bold leading-tight text-[#131a1c] sm:text-[28px]">
              General Pest Inspection
            </h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-[#414042] sm:text-[16px]">
              Not sure what pest problem you have? A general pest inspection helps identify the
              issue, check common problem areas around the home, and recommend the right treatment.
              Zapit will inspect the visible areas, look for signs of pest activity, and advise the
              most suitable next step.
            </p>
            <div className="mt-5 rounded-xl bg-white px-5 py-4 sm:px-6 sm:py-5">
              <p className="text-[13px] font-bold text-[#131a1c] sm:text-[14px]">Before we arrive</p>
              <p className="mt-1 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
                Please make sure we can access the main areas of concern and let us know where
                you have seen pest activity.
              </p>
            </div>
            <a
              href={SITE_CONFIG.phoneTel}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-6 py-3 text-[14px] font-bold text-white transition-transform hover:scale-105"
            >
              Book a general pest inspection — {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ===== PEST GRID ===== */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#0d402e]/10 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0d402e]">Our Services</span>
            <h2 className="text-2xl font-bold text-[#131a1c] md:text-3xl lg:text-4xl">Choose Your Pest</h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] text-[#636363]">
              Click any pest below to learn about our targeted treatment approach, pricing, and what to expect.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {services.map((service) => {
              const icon = PEST_ICON_MAP[service.slug];
              return (
                <Link
                  key={service.slug}
                  href={`/${service.slug}`}
                  className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#3fa535] hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#3fa535]/0 to-[#3fa535]/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d402e]/5 transition-colors group-hover:bg-[#0d402e]/10">
                    {icon ? (
                      <img src={icon} alt="" className="h-8 w-8" style={{ filter: 'invert(30%) sepia(80%) saturate(500%) hue-rotate(80deg) brightness(90%)' }} />
                    ) : (
                      <Shield className="h-8 w-8 text-[#3fa535]" />
                    )}
                  </div>
                  <h3 className="relative text-[14px] font-bold leading-snug text-[#131a1c] transition-colors group-hover:text-[#3fa535] sm:text-[15px]">
                    {service.title.replace(' Melbourne', '')}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PROCESS STEPS ===== */}
      <section className="bg-[#0d402e] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#64FF01]/15 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#64FF01]">How It Works</span>
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">Our 4-Step Treatment Process</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: 'Inspect', desc: 'Thorough property inspection to identify pest species, entry points, and severity of infestation.' },
              { step: '02', title: 'Plan', desc: 'Custom treatment plan tailored to your property type, family, and pest pressure—no generic spray-and-go.' },
              { step: '03', title: 'Treat', desc: 'Licensed technicians apply approved treatments using the latest technology and targeted methods.' },
              { step: '04', title: 'Protect', desc: 'Follow-up inspections and prevention advice to keep pests from returning season after season.' },
            ].map((item) => (
              <div key={item.step} className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10">
                <span className="mb-3 inline-block text-3xl font-black text-[#64FF01]/30">{item.step}</span>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST IMAGE — capped width so the mobile-baked green overlay reads cleanly on desktop ===== */}
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-[640px] px-5 sm:px-6 lg:max-w-[560px]">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <Image src="/images/residential/family-trust.png" alt="Protection you can trust — Zapit Pest Control Melbourne" width={712} height={1002} className="h-auto w-full" sizes="(min-width: 1024px) 560px, (min-width: 640px) 560px, 100vw" />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-[#131a1c] py-14 text-white lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">Trusted Across Melbourne</h2>
          <StatsCounter />
        </div>
      </section>

      {/* ===== COMMON PESTS IN MELBOURNE ===== */}
      <section className="bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image src="/images/residential/cat-girl.png" alt="Zapit pest control technician treating a Melbourne home" width={600} height={500} className="h-auto w-full" />
            </div>
            <div>
              <span className="mb-3 inline-block rounded-full bg-[#0d402e]/10 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0d402e]">Professional Standards</span>
              <h2 className="mb-4 text-2xl font-bold text-[#131a1c] md:text-3xl">Licensed &amp; Responsible Treatments</h2>
              <p className="mb-6 text-[15px] leading-relaxed text-[#636363]">
                Your family&apos;s safety is our top priority. Our licensed technicians use approved products and responsible application methods — without compromising on effectiveness.
              </p>
              <div className="space-y-3">
                {['Low-toxic, targeted treatments', 'licensed technicians', 'No unnecessary chemical residue', 'IPM-based approach', 'Clear re-entry guidance provided'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#3fa535]" strokeWidth={2.5} />
                    <span className="text-[14px] font-medium text-[#414042]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPECIALISED SERVICES ===== */}
      <section className="bg-[#f8f5f2] py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#0d402e]/10 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0d402e]">Specialised Programs</span>
            <h2 className="text-2xl font-bold text-[#131a1c] md:text-3xl lg:text-4xl">Targeted Solutions for Every Need</h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] text-[#636363]">
              Beyond individual pest treatments, we offer specialised programs for ongoing protection.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SPECIALISED.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#3fa535] hover:shadow-lg"
              >
                <div className="bg-gradient-to-br from-[#0d402e] to-[#1a5c3f] p-6">
                  <item.Icon className="h-10 w-10 text-[#64FF01]" strokeWidth={1.5} />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-[#131a1c] transition-colors group-hover:text-[#3fa535]">{item.title}</h3>
                  <p className="mb-4 text-[14px] leading-relaxed text-[#636363]">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ZAP IT ===== */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full bg-[#0d402e]/10 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0d402e]">Why Zapit</span>
              <h2 className="mb-6 text-2xl font-bold text-[#131a1c] md:text-3xl">Melbourne&apos;s Trusted Pest Protection</h2>
              <div className="space-y-4">
                {[
                  { title: 'Licensed & Insured', desc: 'Fully licensed, compliant technicians with comprehensive insurance coverage.' },
                  { title: 'Responsible Methods', desc: 'approved treatments using integrated pest management and low-toxic options.' },
                  { title: 'Same-Day Response', desc: 'Emergency pest situations handled the same day — fast response across all Melbourne suburbs.' },
                  { title: 'Transparent Pricing', desc: 'Upfront quotes with no hidden fees. Know exactly what you\'re paying before we start.' },
                  { title: 'Follow-Up Guarantee', desc: 'Comprehensive follow-up inspections and prevention plans for lasting protection.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3fa535]">
                      <CheckCircle2 className="h-4 w-4 text-white" strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#131a1c]">{item.title}</h3>
                      <p className="text-[14px] text-[#636363]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image src="/images/residential/highrise-specialist.png" alt="Zapit pest control specialists" width={600} height={700} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="bg-[#0d402e] py-14 text-white lg:py-16">
        <div className="mx-auto max-w-[800px] px-5 text-center sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Ready to Protect Your Property?</h2>
          <p className="mb-8 text-[15px] text-white/80">
            Call us for urgent advice or to arrange a visit. {SITE_CONFIG.operatingHours}.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={SITE_CONFIG.phoneTel} className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#64FF01] px-8 py-4 text-[16px] font-bold text-[#0d402e] transition-transform hover:scale-105 sm:w-auto">
              <Phone className="h-5 w-5 shrink-0" />Call Now — {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
