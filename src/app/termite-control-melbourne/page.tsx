import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Phone, Star } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';
import { HomepageMelbourneCoverage, HomepageReviews } from '@/components/sections/HomepageReviewsAndPestTabs';
import TermiteTypeTabsClient from './TermiteTypeTabsClient';
import TermiteFAQClient from './TermiteFAQClient';
import PestProtectionWidget from './PestProtectionWidget';

const WP = '/images/wp-assets';
const HERO_BG =
  'https://zapitpestmelbourne.com.au/wp-content/uploads/2025/09/imgi_73_WhatsApp-Image-2025-09-17-at-3.05.27-PM.jpg';

export const metadata: Metadata = {
  title: 'Termite Control Melbourne | Top-Rated Termite Treatment & Inspections',
  description:
    'Zap It Pest & Termite Control Melbourne — certified, licensed & insured termite specialists. Same-day inspections, liquid & bait treatments, DHHS approved. Call 03 9126 0555.',
  alternates: { canonical: '/termite-control-melbourne' },
  openGraph: { url: '/termite-control-melbourne' },
};

/* ─── Data ─────────────────────────────────────── */

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

const INDUSTRIES = [
  { icon: '/images/icons/service-provider-icon.svg', label: 'Property Pest Control' },
  { icon: '/images/icons/malware-virus-icon.svg', label: 'Warehousing and Storage' },
  { icon: '/images/icons/service-provider-icon.svg', label: 'Restaurants Pest Control' },
  { icon: '/images/icons/malware-virus-icon.svg', label: 'Supermarkets Pest Control' },
  { icon: '/images/icons/service-provider-icon.svg', label: 'Function Venues' },
  { icon: '/images/icons/malware-virus-icon.svg', label: 'Brewhouses and Distilleries' },
  { icon: '/images/icons/service-provider-icon.svg', label: 'Recreational Facilities' },
  { icon: '/images/icons/malware-virus-icon.svg', label: 'Government Buildings' },
] as const;

const RESCUE_STEPS = [
  {
    n: 1,
    title: 'Inspect & Diagnose',
    body: 'Found termite droppings? Heard the hollowing sound upon tapping the floorboard? Give us a call, and our professional termite pest controllers will start the removal process by first inspecting the infested timber items and measuring infestation levels. We\'ll complete the inspection and diagnose the damage done for effective termite removal.',
  },
  {
    n: 2,
    title: 'Treat & Eliminate',
    body: 'After inspection and the identification of damaged timber items, we\'ll separate the infested items and contain them so as not to give termites a way out. Without wasting time, our skilled, licensed, and insured team will start applying appropriate termite control solutions to exterminate all insects inside the timber.',
  },
  {
    n: 3,
    title: 'Prevent & Monitor',
    body: 'To ensure long-term prevention from termites and keep wooden items free from further infestations, we make sure to seal the entry points or eliminate the causes, like the abundance of moisture or humidity, to discourage termite infestations. Zap It Pest & Termite Control Melbourne also shares tips to stop termite infestations and schedules follow-up visits.',
  },
] as const;

const TERMITE_FAQS = [
  {
    question: 'How much does termite control cost in Melbourne?',
    answer: 'There\'s no fixed control for any pest control solutions like rodent control or ant control, and the same is the case with termites. However, you can get a custom quote to know exactly how much you have to pay and save yourself from paying thousands of dollars in damage repair.',
  },
  {
    question: 'Do termites fly?',
    answer: 'Yes, termites can fly during their swarming season. Flying termites (also called alates or swarmers) are reproductive termites that leave their colony to start new ones. If you spot flying termites near your home, contact Zap It immediately for an inspection.',
  },
  {
    question: 'How to get rid of termites?',
    answer: 'Getting rid of termites requires professional treatment. Our licensed technicians use a combination of liquid barriers, bait systems, and targeted treatments to fully eliminate termite colonies. DIY methods are rarely effective and can cause termites to scatter, worsening the infestation.',
  },
  {
    question: 'What do termites eat?',
    answer: 'Termites primarily eat cellulose-based materials like wood, paper, cardboard, and plant fibres. In homes, they target structural timber, flooring, furniture, and any wooden fixtures. Some species also feed on living trees and shrubs in your garden.',
  },
  {
    question: 'How do I tell if I have termites?',
    answer: 'Common signs include hollow-sounding timber when tapped, sawdust-like droppings (frass), mud tubes on walls or foundations, blistering paint or bubbling wood surfaces, and discarded wings near windows. If you notice any of these, call Zap It for a same-day inspection.',
  },
] as const;

export default function TermiteControlMelbournePage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Termite Control Melbourne', href: '/termite-control-melbourne' },
  ]);

  return (
    <>
      <JsonLd data={[generateLocalBusinessSchema('Melbourne'), breadcrumb]} />

      <div className="font-sans text-[#414042]">

        {/* ── HERO ── */}
        <section className="relative flex min-h-[min(92vh,600px)] flex-col justify-end overflow-hidden pb-10 pt-[120px] text-white sm:min-h-[500px] sm:pb-12 sm:pt-[130px]">
          <Image src={HERO_BG} alt="" fill priority className="-z-20 object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 -z-10 bg-[#0d402e]/75" aria-hidden />
          <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6">
            <h1
              className="max-w-2xl text-[28px] font-extrabold leading-[1.15] sm:text-[36px] md:text-[44px]"
              style={{ textWrap: 'balance' } as CSSProperties}
            >
              <span className="inline bg-[#1cdc38] [box-decoration-break:clone] px-2 text-[#131a1c]">
                Termite Control Melbourne — Top-Rated Service
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-[14px] leading-[1.6] text-white/90 sm:text-[15px]">
              Termites are silent property destroyers, eating timber from within. Don&apos;t wait — our termite control
              services help reduce costly damage. Contact{' '}
              <span className="font-semibold text-[#1cdc38]">Zap It Pest &amp; Termite Control Melbourne</span> today!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.phoneTel}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#1cdc38] px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#131a1c] shadow-lg transition-colors hover:bg-[#0d402e] hover:text-white sm:text-base"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* ── ALL OVER MELBOURNE ── */}
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="min-w-0">
                <h2 className="text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px]">
                  All Over Melbourne Termite Control Services
                </h2>
                <div className="mt-3 h-[3px] w-[60px] bg-[#1cdc38]" />
                <div className="mt-5 space-y-3 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
                  <p>
                    Whether you run a food manufacturing plant, a furniture store, an educational facility, or simply enjoy
                    hosting parties in your backyard, termite attacks on timber items are a major concern across Melbourne&apos;s
                    northern and western suburbs. This is especially true during early spring and summer in Victoria, when
                    termite infestations and new colonies spread rapidly.
                  </p>
                  <p>
                    Leaving no choice for homeowners to go for complete pest control services in general and termite removal in
                    specific to save the integrity of the property and business reputation, Zap It Pest &amp; Termite Control
                    Melbourne is offering local, comprehensive termite pest control in Melbourne to eliminate pests.
                  </p>
                  <p>
                    We follow the Integrated Pest Management (IPM) approach to assess the root cause of problems in handling
                    infestations and determine when to use chemicals/poison, if necessary, to restore peace at your place. Call
                    us for instant rodent extermination.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href={SITE_CONFIG.booking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#1cdc38] px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#131a1c] transition-colors hover:bg-[#0d402e] hover:text-white"
                  >
                    Book a Free Consultation
                  </a>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={`${WP}/termite-spray-person.webp`}
                  alt="Pest control professional in safety suit with spray"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── COMMON SIGNS ── */}
        <section className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg order-2 lg:order-1">
                <Image
                  src={`${WP}/termite-ant-closeup.webp`}
                  alt="Termite close-up on wood"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="min-w-0 order-1 lg:order-2">
                <h2 className="text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px]">
                  Common Signs Of Termite Infestations To Stop Further Damage
                </h2>
                <div className="mt-3 h-[3px] w-[60px] bg-[#1cdc38]" />
                <div className="mt-5 space-y-3 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
                  <p>
                    Termites are smaller in size and usually hard to spot even when they are eating up your favourite sofa from
                    inside. Because they don&apos;t produce any sound while making infestations or setting up new colonies.
                  </p>
                  <p>
                    But worry not, you can find them by looking for some common signs like sawdust near the windowsills, hollow
                    sounds when tapping the floorboards, and mud tubes around the walls or foundations of your home.
                  </p>
                </div>
                <div className="mt-7">
                  <a
                    href={SITE_CONFIG.booking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#1cdc38] px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#131a1c] transition-colors hover:bg-[#0d402e] hover:text-white"
                  >
                    Book Inspection Today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TO SAVE DAMAGE ── */}
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="min-w-0">
                <h2 className="text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px]">
                  Termite Control Melbourne To Save Damage
                </h2>
                <div className="mt-3 h-[3px] w-[60px] bg-[#1cdc38]" />
                <div className="mt-5 space-y-3 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
                  <p>
                    Zap It Pest &amp; Termite Control Melbourne&apos;s expert technicians thoroughly inspect residential and
                    commercial properties to identify any signs of termite activity. Our inspections cover both the interior and
                    exterior, including the foundation, walls, doors, cabinets, and roof.
                  </p>
                  <p>
                    Zap It&apos;s rodent control services include every step required for effective rat and mouse management. We
                    begin with a detailed inspection of the premises — whether it&apos;s a hospital, food manufacturing plant,
                    or other facility. Our experienced pest controllers carefully identify and mark rodent nesting points, as
                    well as their entry and exit routes.
                  </p>
                  <p>
                    To ensure the complete removal of termites from your place and reduce termite damage repair costs. Our
                    DHHS-certified termite exterminators use a wide range of tools, techniques, and methodologies to identify
                    the signs of termite colonies.
                  </p>
                </div>
                <div className="mt-7">
                  <a
                    href={SITE_CONFIG.phoneTel}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#1cdc38] px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#131a1c] transition-colors hover:bg-[#0d402e] hover:text-white"
                  >
                    Book Same-Day Inspection
                  </a>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={`${WP}/termite-wood-damage.webp`}
                  alt="Close-up of termite wood damage"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── SAFE TREATMENT ── */}
        <section className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg order-2 lg:order-1">
                <Image
                  src={`${WP}/termite-treatment-green.webp`}
                  alt="Professional termite treatment application"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="min-w-0 order-1 lg:order-2">
                <h2 className="text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px]">
                  Safe Termite Treatment In Melbourne
                </h2>
                <div className="mt-3 h-[3px] w-[60px] bg-[#1cdc38]" />
                <div className="mt-5 space-y-3 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
                  <p>
                    Zap It Pest &amp; Termite Control Melbourne mainly uses two termite treatment methods known as liquid and
                    bait. The liquid control method creates an impermeable barrier in your buildings as it involves high-quality
                    liquid chemicals. It seeps into the soil and forms a protective shield. This technique is best for treating
                    government buildings, offices, etc.
                  </p>
                  <p>
                    Our termite control experts use advanced methods to identify and eliminate termites effectively. With
                    customised solutions tailored to your property, we help you get rid of termites and protect your home or
                    business from future infestations.
                  </p>
                </div>
                <div className="mt-7">
                  <a
                    href={SITE_CONFIG.booking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#1cdc38] px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#131a1c] transition-colors hover:bg-[#0d402e] hover:text-white"
                  >
                    Book Our Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TERMITE TYPES TABS ── */}
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[32px]">
              We Cover All Types Of Termites &amp; Safeguard Your Property &amp; Investment
            </h2>
            <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#1cdc38]" />
            <TermiteTypeTabsClient types={TERMITE_TYPES} />
          </div>
        </section>

        {/* ── CERTIFIED ── */}
        <section className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="min-w-0">
                <div className="mb-4 flex items-center gap-3">
                  {/* Victoria Government logo placeholder */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a3a6e]">
                    <span className="text-xs font-bold text-white leading-tight text-center">VIC</span>
                  </div>
                  <span className="text-sm font-semibold text-[#414042]">Victoria State Government</span>
                </div>
                <h2 className="text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px]">
                  Certified, Licensed &amp; Insured Termite Control Experts
                </h2>
                <div className="mt-3 h-[3px] w-[60px] bg-[#1cdc38]" />
                <p className="mt-5 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
                  Our team is certified by the Victorian Department of Health and Human Sciences (DHHS) and insured for
                  residential and commercial termite control services across Melbourne. Zap It Pest &amp; Termite Control
                  Melbourne stays updated with current Australian termite control standards and only uses accredited solutions.
                  We focus on promoting environmentally friendly termite control methods to ensure the safety of your pets or
                  children. Choose Licensed, Choose Safe, Choose Zap It.
                </p>
                <div className="mt-7">
                  <a
                    href={SITE_CONFIG.booking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#1cdc38] px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#131a1c] transition-colors hover:bg-[#0d402e] hover:text-white"
                  >
                    Get a Free Quote
                  </a>
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={`${WP}/elementor-thumbs-ZAP-IT-SOCIALIETTA-508022-r7s5ckhcmh43u3l9w3juc3wy7mr5k12y7bz7xs4tbk.webp`}
                  alt="Licensed Zap It termite control expert Melbourne"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[32px]">
              Dedicated &amp; Proven Termite Control Solutions For Every Industry
            </h2>
            <div className="mx-auto mb-4 h-[3px] w-[60px] bg-[#1cdc38]" />
            <p className="mx-auto mb-10 max-w-3xl text-center text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
              It is not possible to use fumigation, baiting, and similar termite control methods for hospitals, homes,
              restaurants, and brewhouses. Because every type, whether it is dampwood, drywood, subterranean, etc., and
              property needs different methods for effective extermination. That&apos;s what Zap It Pest &amp; Termite Control
              Melbourne is an expert at doing by using customised solutions for every industry.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-5">
              {INDUSTRIES.map((ind) => (
                <div
                  key={ind.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2] p-5 text-center transition-shadow hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ind.icon}
                    alt={ind.label}
                    className="h-12 w-12 [filter:invert(52%)_sepia(98%)_saturate(400%)_hue-rotate(80deg)_brightness(100%)]"
                    aria-hidden
                  />
                  <p className="text-[13px] font-semibold leading-tight text-[#414042] sm:text-[14px]">{ind.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={SITE_CONFIG.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#1cdc38] px-8 py-3 text-sm font-bold uppercase tracking-wide text-[#131a1c] transition-colors hover:bg-[#0d402e] hover:text-white"
              >
                Find Your Industry
              </a>
            </div>
          </div>
        </section>

        <PestProtectionWidget />

        {/* ── ACROSS MELBOURNE ── */}
        <section className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[32px]">
              Across Melbourne Termite Control Services
            </h2>
            <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#1cdc38]" />
            <HomepageMelbourneCoverage />
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[32px]">
              How Customers Rate Zap It Pest Control Services
            </h2>
            <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#1cdc38]" />
            <HomepageReviews />
          </div>
        </section>

        {/* ── 3-STEP RESCUE ── */}
        <section className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[32px]">
              Our 3-Step Proven Termite Rescue Strategy
            </h2>
            <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#1cdc38]" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
              {RESCUE_STEPS.map((s) => (
                <div key={s.n} className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1cdc38] text-lg font-bold text-[#131a1c]">
                    {s.n}
                  </div>
                  <h3 className="mb-2 text-[17px] font-bold leading-tight text-[#131a1c]">{s.title}</h3>
                  <p className="text-[14px] leading-[1.7] text-[#414042]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQS ── */}
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[32px]">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mb-8 h-[3px] w-[120px] bg-[#1cdc38]" />
            <TermiteFAQClient faqs={TERMITE_FAQS} />
          </div>
        </section>

        {/* ── WE'RE NOT HAPPY ── */}
        <section className="bg-[#131a1c] text-white">
          <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-6 sm:py-10 md:py-14">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-0">
              <div className="mx-auto w-full max-w-[260px] shrink-0 self-end sm:max-w-[300px] md:mx-0 md:max-w-[320px]">
                <Image
                  src={`${WP}/2025-07-imgi_23_—Pngtree—pest-control-worker-in-protective_15020351-2-1-768x768.webp`}
                  alt="Pest control worker in protective equipment"
                  width={768}
                  height={768}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1 pb-2 md:pl-8">
                <Image
                  src={`${WP}/2024-07-200-colour.png`}
                  alt="200% Guarantee Badge"
                  width={160}
                  height={166}
                  className="mb-4 h-auto w-20 sm:w-28"
                />
                <p className="text-[16px] font-bold uppercase tracking-wide text-white sm:text-lg md:text-xl">
                  We&apos;re Not Happy Unless You&apos;re Happy
                </p>
                <p className="mt-2 text-[14px] leading-[1.6] text-white/80 sm:text-[15px]">
                  Talk to us about pest control for your home or business
                </p>
                <ul className="mt-5 space-y-3">
                  <li>
                    <a href={SITE_CONFIG.phoneTel} className="inline-flex min-h-[44px] items-center gap-3 hover:underline">
                      <Phone className="h-5 w-5 shrink-0 text-[#1cdc38]" aria-hidden />
                      <span className="text-[15px] text-white/90">{SITE_CONFIG.phoneRaw}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="inline-flex min-h-[44px] items-start gap-3 break-all hover:underline"
                    >
                      <Star className="mt-0.5 h-5 w-5 shrink-0 text-[#1cdc38]" aria-hidden />
                      <span className="text-[15px] text-white/90">{SITE_CONFIG.email}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>

      <PageInfoFooterBlock />
    </>
  );
}
