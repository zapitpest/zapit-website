import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, CheckCircle2, Shield, ChevronRight, Star, AlertTriangle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';

import { HomepageMelbourneCoverage, HomepageReviews } from '@/components/sections/HomepageReviewsAndPestTabs';
import StatsCounter from '@/components/sections/StatsCounter';
import TermiteTypeTabsClient from './TermiteTypeTabsClient';
import TermiteFAQClient from './TermiteFAQClient';

const WP = '/images/wp-assets';

export const metadata: Metadata = {
  title: 'Termite Control Melbourne | Top-Rated Termite Treatment & Inspections',
  description:
    'Zapit Pest & Termite Control Melbourne — certified, licensed & insured termite specialists. Same-day inspections, liquid & bait treatments, approved. Call 9126 0555.',
  alternates: { canonical: '/termite-control-melbourne' },
  openGraph: { url: '/termite-control-melbourne' },
};

const TERMITE_TYPES = [
  {
    id: 'dampwood',
    label: 'Dampwood Termite Control',
    heading: 'Dampwood Termite Control',
    copy: 'Dampwood termites thrive in humid and moist conditions and are commonly found in bathrooms, poorly ventilated storerooms, scrap wood placed in the backyard, around pipe leakages, etc. They are always in search of dry timber, and upon finding it, call the whole colony inside that wooden item. Book our pest control for termite services and get the whole colony eliminated.',
    img: `${WP}/termite-dampwood-closeup.webp`,
  },
  {
    id: 'subterranean',
    label: 'Subterranean Termite Extermination',
    heading: 'Subterranean Termite Extermination',
    copy: 'As the name suggests, these destructive termites live underground and damage the foundations of homes or buildings. They usually set up mud tubes around the walls to source food for their nests and eat up the wooden structure of your home from the base. Subterranean termites risk the structural integrity of any building and cost lots of dollars in repair.',
    img: `${WP}/termite-dampwood-closeup.webp`,
  },
  {
    id: 'drywood',
    label: 'Drywood Termite Removal',
    heading: 'Drywood Termite Removal',
    copy: 'Drywood termites usually live inside the hardwood furniture and the structure of timber items. They can live inside the wood for their whole life without ever touching the ground for food and water. The picture frame or dining table that seems fine to you may be hollowed out from the inside. We use fumigation to kill them on the spot.',
    img: `${WP}/termite-dampwood-closeup.webp`,
  },
  {
    id: 'formosan',
    label: 'Formosan Termite Elimination',
    heading: 'Formosan Termite Elimination',
    copy: 'These are the most destructive types of termites that can chew through the concrete cracks in the walls and set up colonies inside the walls of your restaurant, warehouse, function venues, etc. Formosan termites multiply speedily and won\'t stop until they\'ve consumed every piece of wood in your neighbourhood. Book our termite control services now before they cause irreversible damage.',
    img: `${WP}/termite-dampwood-closeup.webp`,
  },
  {
    id: 'conehead',
    label: 'Conehead Termite Elimination',
    heading: 'Conehead Termite Elimination',
    copy: 'They are known as conehead termites because they build cone-shaped nests and spread faster than all types of termites. Conehead termites are most aggressive and known for their flights from one place to another and abilities to set up new colonies very quickly. They attack not only a single wooden item but also every timber-made thing available at your place.',
    img: `${WP}/termite-dampwood-closeup.webp`,
  },
] as const;

const TERMITE_FAQS = [
  { question: 'How much does termite control cost in Melbourne?', answer: 'There\'s no fixed control for any pest control solutions like rodent control or ant control, and the same is the case with termites. However, you can get a custom quote to know exactly how much you have to pay and save yourself from paying thousands of dollars in damage repair.' },
  { question: 'Do termites fly?', answer: 'Yes, termites can fly during their swarming season. Flying termites (also called alates or swarmers) are reproductive termites that leave their colony to start new ones. If you spot flying termites near your home, contact Zapit immediately for an inspection.' },
  { question: 'How to get rid of termites?', answer: 'Getting rid of termites requires professional treatment. Our licensed technicians use a combination of liquid barriers, bait systems, and targeted treatments to fully eliminate termite colonies. DIY methods are rarely effective and can cause termites to scatter, worsening the infestation.' },
  { question: 'What do termites eat?', answer: 'Termites primarily eat cellulose-based materials like wood, paper, cardboard, and plant fibres. In homes, they target structural timber, flooring, furniture, and any wooden fixtures. Some species also feed on living trees and shrubs in your garden.' },
  { question: 'How do I tell if I have termites?', answer: 'Common signs include hollow-sounding timber when tapped, sawdust-like droppings (frass), mud tubes on walls or foundations, blistering paint or bubbling wood surfaces, and discarded wings near windows. If you notice any of these, call Zapit for a same-day inspection.' },
] as const;

const WARNING_SIGNS = [
  'Hollow-sounding timber when tapped',
  'Sawdust-like droppings (frass) near wood',
  'Mud tubes along walls or foundations',
  'Blistering or bubbling paint on surfaces',
  'Discarded wings near windows or doors',
  'Tight-fitting doors or hard-to-open windows',
];

export default function TermiteControlMelbournePage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Termite Control Melbourne', href: '/termite-control-melbourne' },
  ]);

  return (
    <>
      <JsonLd data={[generateLocalBusinessSchema('Melbourne'), breadcrumb]} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#0d402e] text-white">
        <div className="absolute inset-0">
          <Image src="/images/residential/hero-house.png" alt="" fill priority className="object-cover object-center opacity-15" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d402e] via-[#0d402e]/90 to-[#0d402e]/70" />
        <div className="relative mx-auto max-w-[1200px] px-5 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:pb-20">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#64FF01]">Termite Control Melbourne</span>
          </nav>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <img src="/images/icons/insects/termite.svg" alt="" className="h-8 w-8" style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
                <span className="rounded-full bg-[#64FF01]/15 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-[#64FF01]">Top-Rated Service</span>
              </div>
              <h1 className="mb-4 max-w-xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Termite Control Melbourne
              </h1>
              <p className="max-w-xl text-[16px] leading-relaxed text-white/80">
                Termites are silent property destroyers, eating timber from within. Don&apos;t wait — our certified termite specialists deliver same-day inspections, liquid &amp; bait treatments to protect your property.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#64FF01] px-6 py-3.5 text-[15px] font-bold text-[#0d402e] transition-transform hover:scale-105">
                  <Phone className="h-4 w-4 shrink-0" />Call Now — {SITE_CONFIG.phone}
                </a>
              </div>
            </div>

            <div className="w-full overflow-hidden rounded-2xl shadow-2xl lg:max-w-[420px]">
              <Image src={`${WP}/termite-spray-person.webp`} alt="Termite treatment professional" width={600} height={450} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-b border-[#e5e5e5] bg-[#f8f5f2] py-3.5">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 text-[13px] font-semibold text-[#0d402e]">
          {['Licensed', 'Same-Day Inspections', 'Liquid & Bait Treatments', 'Fully Insured', 'Accredited'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#3fa535]" strokeWidth={2.5} />{t}
            </span>
          ))}
        </div>
      </section>

      {/* ===== WARNING SIGNS ===== */}
      <section className="bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-red-600">
                <AlertTriangle className="h-3.5 w-3.5" />Warning Signs
              </span>
              <h2 className="mb-4 text-2xl font-bold text-[#131a1c] md:text-3xl">Common Signs of Termite Infestation</h2>
              <p className="mb-6 text-[15px] leading-relaxed text-[#636363]">
                Termites are smaller in size and usually hard to spot even when they are eating up your favourite sofa from inside. Look for these warning signs:
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {WARNING_SIGNS.map((sign) => (
                  <div key={sign} className="flex items-start gap-3 rounded-xl border border-[#e5e5e5] bg-[#f8f5f2] p-3.5">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <span className="text-[13px] font-medium text-[#414042]">{sign}</span>
                  </div>
                ))}
              </div>
              <a href={SITE_CONFIG.phoneTel} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0d402e] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#3fa535]">
                <Phone className="h-4 w-4 shrink-0" />Call Now
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image src={`${WP}/termite-ant-closeup.webp`} alt="Termite close-up on wood" width={600} height={450} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3-STEP PROCESS ===== */}
      <section className="bg-[#0d402e] py-14 text-white lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#64FF01]/15 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#64FF01]">Our Process</span>
            <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">Our 3-Step Termite Rescue Strategy</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { n: '1', title: 'Inspect & Diagnose', body: 'Found termite droppings? Heard the hollowing sound upon tapping the floorboard? Our professional termite pest controllers start by inspecting the infested timber items and measuring infestation levels for effective removal.' },
              { n: '2', title: 'Treat & Eliminate', body: 'After inspection and identification, we separate infested items and contain them. Our skilled, licensed team applies appropriate termite control solutions — liquid barriers and bait systems — to exterminate all insects.' },
              { n: '3', title: 'Prevent & Monitor', body: 'For long-term prevention, we seal entry points and eliminate causes like moisture. We share tips to stop future infestations and schedule follow-up visits to ensure your property stays termite-free.' },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#64FF01] text-xl font-black text-[#0d402e]">{s.n}</div>
                <h3 className="mb-3 text-xl font-bold">{s.title}</h3>
                <p className="text-[14px] leading-relaxed text-white/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TREATMENT METHODS ===== */}
      <section className="bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="overflow-hidden rounded-2xl shadow-lg order-2 lg:order-1">
              <Image src={`${WP}/termite-treatment-green.webp`} alt="Professional termite treatment" width={600} height={450} className="h-auto w-full" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="mb-3 inline-block rounded-full bg-[#0d402e]/10 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0d402e]">Treatment Methods</span>
              <h2 className="mb-4 text-2xl font-bold text-[#131a1c] md:text-3xl">Safe &amp; Effective Termite Treatments</h2>
              <p className="mb-6 text-[15px] leading-relaxed text-[#636363]">
                We use two proven termite treatment methods tailored to your property type and infestation level.
              </p>
              <div className="space-y-4">
                <div className="rounded-xl border border-[#e5e5e5] bg-[#f8f5f2] p-5">
                  <h3 className="mb-2 text-[16px] font-bold text-[#131a1c]">Liquid Barrier Treatment</h3>
                  <p className="text-[14px] leading-relaxed text-[#636363]">Creates an impermeable barrier using high-quality liquid chemicals that seep into soil and form a protective shield. Best for government buildings, offices, and commercial properties.</p>
                </div>
                <div className="rounded-xl border border-[#e5e5e5] bg-[#f8f5f2] p-5">
                  <h3 className="mb-2 text-[16px] font-bold text-[#131a1c]">Bait System Treatment</h3>
                  <p className="text-[14px] leading-relaxed text-[#636363]">Strategic bait stations that attract and eliminate entire colonies. Low-impact approach suited to a range of residential properties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TERMITE TYPES TABS ===== */}
      <section className="bg-[#f8f5f2] py-14 lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#0d402e]/10 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0d402e]">Types of Termites</span>
            <h2 className="text-2xl font-bold text-[#131a1c] md:text-3xl lg:text-4xl">We Cover All Types of Termites</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] text-[#636363]">Safeguard your property and investment with treatments tailored to the specific termite species.</p>
          </div>
          <TermiteTypeTabsClient types={TERMITE_TYPES} />
        </div>
      </section>

      {/* ===== DAMAGE PREVENTION — image with text below ===== */}
      <section className="relative">
        <div className="relative aspect-[375/200] w-full sm:aspect-[16/6]">
          <Image src={`${WP}/termite-wood-damage.webp`} alt="Termite wood damage" fill className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d402e]/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:pb-8">
            <div className="mx-auto max-w-[1200px]">
              <h2 className="text-2xl font-bold text-white md:text-3xl">Don&apos;t Let Termites Destroy Your Property</h2>
              <p className="mt-2 max-w-xl text-[15px] text-white/80">Early detection saves thousands in repair costs. Call us today for a professional assessment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-[#131a1c] py-14 text-white lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">Why Melbourne Trusts Zapit</h2>
          <StatsCounter />
        </div>
      </section>

      {/* ===== CERTIFIED & LICENSED ===== */}
      <section className="bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="mb-3 inline-block rounded-full bg-[#0d402e]/10 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0d402e]">Credentials</span>
              <h2 className="mb-4 text-2xl font-bold text-[#131a1c] md:text-3xl">Certified, Licensed &amp; Insured</h2>
              <p className="mb-6 text-[15px] leading-relaxed text-[#636363]">
                Our team is certified by the Victorian state pest control authority and fully insured for residential and commercial termite control across Melbourne.
              </p>
              <div className="space-y-3">
                {[
                  'certified termite control experts',
                  'Updated with Australian termite control standards',
                  'approved methods — responsible products',
                  'Accredited solutions for homes and businesses',
                  'Full insurance coverage for all services',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3fa535]">
                      <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[14px] text-[#414042]">{item}</span>
                  </div>
                ))}
              </div>
              <a href={SITE_CONFIG.phoneTel} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3fa535] px-6 py-3 text-[14px] font-bold text-white transition-transform hover:scale-105">
                <Phone className="h-4 w-4 shrink-0" />Call for a Free Quote
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image src="/images/residential/melbourne-fleet.png" alt="Zapit licensed pest control fleet" width={600} height={450} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="bg-[#f8f5f2] py-14 lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#0d402e]/10 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0d402e]">Reviews</span>
            <h2 className="text-2xl font-bold text-[#131a1c] md:text-3xl">What Our Customers Say</h2>
          </div>
          <HomepageReviews />
        </div>
      </section>

      {/* ===== MELBOURNE COVERAGE ===== */}
      <section className="bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#0d402e]/10 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0d402e]">Coverage</span>
            <h2 className="text-2xl font-bold text-[#131a1c] md:text-3xl">Across Melbourne Termite Control</h2>
          </div>
          <HomepageMelbourneCoverage />
        </div>
      </section>

      {/* ===== FAQS ===== */}
      <section className="bg-[#f8f5f2] py-14 lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#0d402e]/10 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#0d402e]">FAQs</span>
            <h2 className="text-2xl font-bold text-[#131a1c] md:text-3xl">Frequently Asked Questions</h2>
          </div>
          <TermiteFAQClient faqs={TERMITE_FAQS} />
        </div>
      </section>

      {/* ===== GUARANTEE CTA ===== */}
      <section className="bg-[#0d402e] py-14 text-white lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="overflow-hidden rounded-2xl">
              <Image src="/images/residential/highrise-specialist.png" alt="Zapit pest control technician" width={600} height={600} className="h-auto w-full" />
            </div>
            <div>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#64FF01]/15">
                <Shield className="h-8 w-8 text-[#64FF01]" />
              </div>
              <h2 className="mb-3 text-2xl font-bold md:text-3xl">We&apos;re Not Happy Unless You&apos;re Happy</h2>
              <p className="mb-2 text-[20px] font-bold text-[#64FF01]">Satisfaction Commitment</p>
              <p className="mb-6 text-[15px] leading-relaxed text-white/80">
                Talk to us about pest control for your home or business. We stand behind every treatment with our industry-leading guarantee.
              </p>
              <div className="space-y-3">
                <a href={SITE_CONFIG.phoneTel} className="flex items-center gap-3 text-[15px] text-white/90 transition-colors hover:text-[#64FF01]">
                  <Phone className="h-5 w-5 shrink-0 text-[#64FF01]" />{SITE_CONFIG.phoneRaw}
                </a>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 text-[15px] text-white/90 transition-colors hover:text-[#64FF01]">
                  <Star className="h-5 w-5 shrink-0 text-[#64FF01]" />{SITE_CONFIG.email}
                </a>
              </div>
              <a href={SITE_CONFIG.phoneTel} className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#64FF01] px-8 py-4 text-[16px] font-bold text-[#0d402e] transition-transform hover:scale-105">
                <Phone className="h-5 w-5 shrink-0" />Call Now — {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
