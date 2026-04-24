import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Star, Truck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';
import PriceCalculator from '@/components/sections/PriceCalculator';
import FaqPageAccordion from '@/components/sections/FaqPageAccordion';
import type { FAQ, BreadcrumbItem } from '@/types';

const HERO_BG =
  'https://zapitpestmelbourne.com.au/wp-content/uploads/2025/09/imgi_73_WhatsApp-Image-2025-09-17-at-3.05.27-PM.jpg';
const WP = '/images/wp-assets';
const MELBOURNE_MAP =
  'https://www.google.com/maps?q=' + encodeURIComponent('Melbourne, Victoria, Australia') + '&z=10&output=embed';

const TRUST_ITEMS = [
  'Child safe',
  'Pet safe',
  'Eco friendly',
  'Accredited',
  'Insured',
  'DHHS Licensed',
  'Online compliance certificates',
] as const;

// Full pest price list matching Figma ss2
const PEST_PRICE_LIST = [
  {
    n: 1,
    name: 'General Inspection',
    price: '$100',
    open: true,
    duration: '30 minutes',
    propertyType: 'All residential homes',
    inclusions: 'Visual inspection of interior and exterior of property.',
    detail: `A general inspection is designed to quickly assess areas of concern in your home. To confirm or deny pest activity, type of pest and assess extent of infestation.\n\nA verbal and written assessment is provided with recommended course of action. The price of the assessment is deducted from treatment or preventative action taken on the same day of inspection.`,
  },
  {
    n: 2,
    name: 'Ant treatment',
    price: '$239',
    open: false,
    duration: '45 minutes',
    propertyType: 'All residential homes',
    inclusions: '• Targeted surface spraying to entry points and active areas\n• Ant gel bait applied where activity is visible\n• Treatment focused on kitchens, bathrooms, and exterior edges',
    detail: `What to expect after treatment:\n• Activity may increase 1–3 weeks as ants spread the product to colony\n• Gradual reduction in activity as the treatment takes effect\n\nImportant notes and limitations:\n• Designed for light infestations only\n• Does not target deep nestings or multiple colonies\n• No warranty applies to this service\n\nThis service is effective in treating light or intermittent ant activity only. Suitable for when ant activity is detected early and before a large ant colony is established.`,
  },
  { n: 3, name: 'Ant elimination', price: '$450', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Deep nest elimination for established colonies.', detail: 'An elimination of deep-rooted multi colonies, all homes. $2500+ $450' },
  { n: 4, name: 'Bird control', price: '$450', open: false, duration: '30–60 minutes', propertyType: 'Single-story / Double-story', inclusions: 'Physical deterrents and removal solutions.', detail: 'Safe removal and deterrent installation for pest birds including pigeons.' },
  { n: 5, name: 'Bird nest removal', price: 'from $450', open: false, duration: '30–60 minutes', propertyType: 'Single-story / Double-story', inclusions: 'Safe nest removal and entry point sealing.', detail: 'Removal of active and inactive bird nests with preventative sealing.' },
  { n: 6, name: 'Bed Bugs', price: '$450', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Full bed bug and egg elimination.', detail: 'Complete bed bug treatment including eggs and harbourage areas.' },
  { n: 7, name: 'Clothes & carpet moth', price: '$385', open: false, duration: '90 minutes', propertyType: 'All', inclusions: 'Treatment of all moth-affected textile areas.', detail: 'Targeted treatment for clothes and carpet moth infestations.' },
  { n: 8, name: 'Cobweb removal', price: 'from $125', open: false, duration: '30–60 minutes', propertyType: 'Single-story / Double-story', inclusions: 'Full exterior and interior cobweb removal.', detail: 'Comprehensive cobweb removal as an extra service alongside pest treatment.' },
  { n: 9, name: 'Fleas', price: '$385', open: false, duration: '45 minutes', propertyType: 'All', inclusions: 'Pet-safe flea treatment breaking the lifecycle.', detail: 'Targeted flea treatment designed for homes with pets.' },
  { n: 10, name: 'German Cockroach treatment', price: '$249.99', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Gel baits and targeted sprays for German cockroaches.', detail: 'Highly effective treatment for German cockroach infestations in kitchens and bathrooms.' },
  { n: 11, name: 'Mice & Rat treatment', price: '$200', open: false, duration: '40 minutes', propertyType: 'All', inclusions: 'Bait stations, entry point sealing, monitoring.', detail: 'Targeted rodent treatment using secure bait stations and entry point sealing.' },
  { n: 12, name: 'Spider & General Pest', price: 'from $275', open: false, duration: '60 minutes', propertyType: 'Single / Double / Other', inclusions: 'Full perimeter and interior spray treatment.', detail: 'Spider and general pest treatment for all common Melbourne pests.' },
  { n: 13, name: 'Termite Inspections', price: '$399', open: false, duration: '2 hours', propertyType: 'All residential homes', inclusions: 'Visual and technical inspection of exterior and interior.', detail: 'A thorough termite inspection using moisture detection, noise detection, and keyhole camera.' },
  { n: 14, name: 'Wasp Control', price: '$250', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Safe nest removal and treatment.', detail: 'Professional wasp nest removal and treatment to protect your family.' },
  { n: 15, name: 'Possum treatment', price: 'from $450', open: false, duration: '30–60 minutes', propertyType: 'Single / Double-story', inclusions: 'Licensed humane possum removal and entry sealing.', detail: 'Humane, licensed possum removal from roof voids with entry-point proofing.' },
  { n: 16, name: 'Silverfish treatment', price: '$299.99', open: false, duration: '40 minutes', propertyType: 'All', inclusions: 'Treatment of silverfish harbourage areas.', detail: 'Targeted treatment to eliminate silverfish from bookshelves, wardrobes, and bathrooms.' },
] as const;

const RESIDENTIAL_FAQS: FAQ[] = [
  {
    question: 'How much does home pest control cost in Melbourne?',
    answer: `Home pest control typically ranges from $150–$450 depending on property size, pest type, and severity. We give clear pricing before we start. Call ${SITE_CONFIG.phone} for a tailored quote.`,
  },
  {
    question: 'Is residential pest control safe for children and pets?',
    answer: 'Yes. We use family- and pet-aware products and application methods, and we let you know if you need to avoid specific rooms for a short period while treatments dry.',
  },
  {
    question: 'How fast can you visit my home?',
    answer: 'We offer same-day service across Melbourne in many cases, aiming to be on site within about two hours for urgent call-outs.',
  },
  {
    question: 'What pests do you treat in homes?',
    answer: 'We treat ants, spiders, cockroaches, rodents, termites, mosquitoes, bees, wasps, bed bugs, fleas, silverfish, possums, and more.',
  },
  {
    question: 'Do I need to prepare before a residential visit?',
    answer: 'Light preparation helps — clear food-prep surfaces, move items away from skirting boards, and note any pest hotspots you have seen. We will send a checklist with your booking.',
  },
];

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Residential Pest Control', href: '/residential' },
];

function CheckMark() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3fa535]" aria-hidden>
      <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="currentColor">
        <path d="M10.3 2.3a1 1 0 00-1.4 0L4.5 6.7 3.1 5.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l5-5a1 1 0 000-1.4z" />
      </svg>
    </span>
  );
}

// Clean prohibition termite icon — white circle, dark bug silhouette, red diagonal slash
function TermiteStopIcon() {
  return (
    <svg viewBox="0 0 96 96" className="h-[88px] w-[88px] shrink-0" fill="none" aria-hidden>
      {/* White fill inside circle */}
      <circle cx="48" cy="48" r="43" fill="white" />
      {/* Red border */}
      <circle cx="48" cy="48" r="43" stroke="#dc2626" strokeWidth="5" />
      {/* Antennae */}
      <line x1="44" y1="20" x2="36" y2="12" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="52" y1="20" x2="60" y2="12" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Head */}
      <circle cx="48" cy="25" r="6" fill="#1f2937" />
      {/* Thorax */}
      <ellipse cx="48" cy="40" rx="8" ry="9" fill="#1f2937"/>
      {/* Abdomen */}
      <ellipse cx="48" cy="60" rx="11" ry="14" fill="#1f2937"/>
      {/* Left legs */}
      <line x1="40" y1="35" x2="27" y2="30" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
      <line x1="40" y1="40" x2="26" y2="40" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
      <line x1="40" y1="46" x2="27" y2="51" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
      {/* Right legs */}
      <line x1="56" y1="35" x2="69" y2="30" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
      <line x1="56" y1="40" x2="70" y2="40" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
      <line x1="56" y1="46" x2="69" y2="51" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
      {/* Red prohibition diagonal slash — drawn last so it overlaps the bug */}
      <line x1="13" y1="80" x2="83" y2="16" stroke="#dc2626" strokeWidth="8" strokeLinecap="round"/>
    </svg>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'Residential Pest Control Melbourne | Zap It Pest & Termite Control' },
    description: `Protect your Melbourne home with Zap It. DHHS approved, child & pet safe, same-day pest control. Termite inspections from $399. Call ${SITE_CONFIG.phone}.`,
    openGraph: {
      title: 'Residential Pest Control Melbourne | Zap It',
      description: `DHHS approved, same-day residential pest control across Melbourne. Call ${SITE_CONFIG.phone}.`,
      url: `${SITE_CONFIG.url}/residential`,
    },
    alternates: { canonical: '/residential' },
  };
}

export default function ResidentialPage() {
  const schemas = [
    generateServiceSchema('Residential Pest Control Services Melbourne', 'Professional home pest control in Melbourne. Safe, DHHS approved treatments.'),
    generateLocalBusinessSchema('Melbourne'),
    generateBreadcrumbSchema(BREADCRUMBS),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-[min(100vh,660px)] flex-col justify-end overflow-hidden pb-10 pt-[115px] text-white sm:min-h-[540px] sm:pb-12 sm:pt-[125px]">
        <Image src={HERO_BG} alt="" fill priority className="object-cover object-center -z-20" sizes="100vw" />
        <div className="absolute inset-0 bg-[#0d402e]/72 -z-10" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6">
          <p className="mb-2 text-sm italic text-white/80">{SITE_CONFIG.tagline}</p>
          <h1
            className="max-w-3xl text-[26px] font-extrabold leading-[1.15] sm:text-[34px] md:text-[42px]"
            style={{ textWrap: 'balance' } as CSSProperties}
          >
            <span className="inline bg-[#3fa535] [box-decoration-break:clone] px-2 text-white">
              Zap It — Melbourne&apos;s Best Home Pest Control Services
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-[1.6] text-white/90 sm:text-[15px]">
            DHHS approved home pest control solutions for same-day removal of ants, wasps, termites, rodents &amp; more.
            Guaranteed pest elimination for residential properties.
          </p>
          <ul className="mt-5 space-y-2">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white sm:text-[15px]">
                <CheckMark />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
            <div className="flex gap-0.5">
              {[0,1,2,3,4].map((s) => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-sm font-bold text-white">{SITE_CONFIG.rating.count}+ 5-Star Google Reviews</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={SITE_CONFIG.phoneTel}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#3fa535] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-[#0d402e] sm:text-base"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Call {SITE_CONFIG.phone}
            </a>
            <a
              href={SITE_CONFIG.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-white/15 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/25 sm:text-base"
            >
              Book an Inspection
            </a>
          </div>
        </div>
      </section>

      {/* ===================== GO TO PRICE LIST BUTTON ===================== */}
      <div className="bg-[#131a1c] px-4 py-4 text-center">
        <a
          href="#pest-price-list"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#2b2b2b] px-6 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-[#3fa535]"
        >
          Go to pest solutions and price list ↓
        </a>
      </div>

      {/* ===================== TERMITE SPECIALISTS ===================== */}
      <section className="bg-[#0d402e] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center rounded-full bg-[#1cdc38] px-4 py-1.5 text-sm font-semibold text-white">
            We&apos;re termite specialists
          </div>
          <div className="flex items-start gap-5">
            <TermiteStopIcon />
            <h2 className="text-[24px] font-extrabold leading-tight text-white sm:text-[30px] md:text-[36px]">
              We stop termites dead in their tracks
            </h2>
          </div>
        </div>
      </section>

      {/* ===================== TERMITE INSPECTION DETAILS ===================== */}
      <section className="bg-white px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-4 text-[20px] font-bold text-[#131a1c] sm:text-[22px]">
            Termite inspection <span className="text-[#3fa535]">$399</span>
          </h3>
          <dl className="mb-6 space-y-2 text-sm text-[#414042] sm:text-[15px]">
            <div className="flex gap-2">
              <dt className="font-semibold text-[#131a1c] shrink-0">Duration:</dt>
              <dd>2 hours</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-[#131a1c] shrink-0">Property type:</dt>
              <dd>All residential homes</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-semibold text-[#131a1c]">Inclusions:</dt>
              <dd className="ml-2">Visual and technical inspection of exterior and interior of property, including gardens</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-semibold text-[#131a1c]">Tools used:</dt>
              <dd className="ml-2">Moisture detection, Noise detection, Keyhole camera</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-semibold text-[#131a1c]">Verbal and written report:</dt>
              <dd className="ml-2">Findings and recommendations documented.</dd>
            </div>
          </dl>
          <p className="mb-4 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
            We conduct a detailed inspection in and around your home including in roof cavities and under the house. We use
            the latest technology to detect and diagnose extent of any termite activity.
          </p>
          <p className="mb-6 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
            A verbal and written assessment is provided with recommended course of action. The price of inspection is
            deducted from further treatment or preventative action.
          </p>

          {/* Important warning */}
          <div className="flex items-start gap-3 rounded-xl border-2 border-amber-400 bg-amber-50 p-4 sm:p-5">
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" aria-hidden />
            <div>
              <p className="mb-1 text-[15px] font-bold text-[#131a1c]">Important!</p>
              <p className="text-[14px] leading-[1.6] text-[#414042] sm:text-[15px]">
                Do not disturb termites if you see or suspect termite activity. They move to other areas if you disturb them!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PRICE CALCULATOR ===================== */}
      <PriceCalculator />

      {/* ===================== SAME DAY SERVICE CTA ===================== */}
      <section className="bg-[#0d402e] px-4 py-8 text-center sm:px-6 sm:py-10">
        <Truck className="mx-auto mb-3 h-10 w-10 text-[#1cdc38] sm:h-12 sm:w-12" strokeWidth={1.5} aria-hidden />
        <a href={SITE_CONFIG.phoneTel} className="text-lg font-bold italic text-[#1cdc38] sm:text-xl">
          Same day service available. Call now!
        </a>
      </section>

      {/* ===================== GOOGLE REVIEW CARD ===================== */}
      <section className="bg-[#0d402e] px-4 pb-8 sm:px-6 sm:pb-10">
        <div className="mx-auto max-w-md">
          <div className="rounded-xl bg-[#1a4f38] p-5 shadow-md">
            <div className="mb-3 flex gap-0.5">
              {[0,1,2,3,4].map((s) => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="mb-3 text-[15px] italic leading-[1.6] text-white/95">
              &ldquo;Zapit were great to deal with and I felt confident they took my cats safety seriously&rdquo;
            </p>
            <p className="text-sm font-semibold text-[#1cdc38]">Jenny, Hawthorn resident</p>
          </div>
        </div>
      </section>

      {/* ===================== THE MORE YOU PROTECT ===================== */}
      <section className="bg-[#1cdc38] px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-[24px] font-extrabold leading-tight text-[#0d402e] sm:text-[28px] md:text-[32px]">
            The more you protect,<br />the more you save
          </h2>
          <div className="mt-4 inline-flex items-center gap-3 rounded-xl bg-white/30 px-5 py-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0d402e] text-xl font-extrabold text-white">
              20%
            </span>
            <p className="text-left text-sm font-medium text-[#0d402e] sm:text-[15px]">
              Save 20% on the total cost of the job when you purchase two or more treatments that we service on the same day.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== PEST SOLUTIONS AND PRICE LIST ===================== */}
      <section id="pest-price-list" className="bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px] md:text-[30px]">
            Pest solutions and price list
          </h2>
          <div className="mb-6 h-[3px] w-[60px] bg-[#7DD958]" />
          <div className="space-y-2">
            {PEST_PRICE_LIST.map((item) => (
              <details key={item.n} className="group rounded-xl border border-[#e5e5e5] bg-white shadow-sm" open={item.open}>
                <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 sm:px-5">
                  {/* Number circle */}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3fa535] text-sm font-bold text-white">
                    {item.n}
                  </span>
                  <span className="flex-1 text-[15px] font-semibold text-[#131a1c] group-open:text-[#3fa535] sm:text-base">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-[15px] font-bold text-[#3fa535] sm:text-base">{item.price}</span>
                  {/* Closed → outlined + | Open → filled green × */}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#3fa535] font-bold text-base leading-none transition-colors group-open:bg-[#3fa535]">
                    <span className="text-[#3fa535] group-open:hidden">+</span>
                    <span className="hidden text-white group-open:inline">×</span>
                  </span>
                </summary>
                <div className="border-t border-[#e5e5e5] px-4 pb-5 pt-4 sm:px-5">
                  <dl className="mb-4 space-y-2 text-[13px] text-[#414042] sm:text-sm">
                    <div className="flex gap-2">
                      <dt className="font-semibold text-[#131a1c] shrink-0">Duration:</dt>
                      <dd>{item.duration}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold text-[#131a1c] shrink-0">Property type:</dt>
                      <dd>{item.propertyType}</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="font-semibold text-[#131a1c]">Inclusions:</dt>
                      <dd className="whitespace-pre-line ml-2">{item.inclusions}</dd>
                    </div>
                  </dl>
                  <p className="whitespace-pre-line text-[13px] leading-[1.7] text-[#414042] sm:text-sm">{item.detail}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROTECTION YOU CAN TRUST (dark green) ===================== */}
      <section className="bg-[#0d402e] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-[15px] leading-[1.7] text-white/90 sm:text-base">
            Your health and safety are at the heart of everything we do, supported by industry-leading technology.
          </p>

          {/* Green badge: Protection you can trust */}
          <div>
            <div className="mb-2 inline-block rounded-lg bg-[#1cdc38] px-4 py-2">
              <span className="text-[15px] font-bold text-white sm:text-base">Protection you can trust</span>
            </div>
            <p className="text-[14px] leading-[1.7] text-white/80 sm:text-[15px]">
              We have served over {SITE_CONFIG.stats.emergenciesSolved} customers in Melbourne, delivering reliable, DHHS-approved pest management with full documentation.
            </p>
          </div>

          <p className="text-[15px] leading-[1.7] text-white/90 sm:text-base">
            We know pets can get into all sorts of mischief, which is why we take every measure to keep your much loved pets safe and sound!
          </p>

          {/* Green badge: We treat your home */}
          <div>
            <div className="mb-2 inline-block rounded-lg bg-[#1cdc38] px-4 py-2">
              <span className="text-[15px] font-bold text-white sm:text-base">We treat your home as if it were ours</span>
            </div>
            <p className="text-[14px] leading-[1.7] text-white/80 sm:text-[15px]">
              Your satisfaction is our biggest priority. We use careful methods, clear communication, and follow-up support after every visit.
            </p>
          </div>

          <p className="text-[15px] leading-[1.7] text-white/90 sm:text-base">
            Whether you live in a one bedroom flat, high-rise apartment, semi-detached townhouse or large family home, we have you covered.
          </p>

          {/* Green badge: High rise specialists */}
          <div>
            <div className="mb-2 inline-block rounded-lg bg-[#1cdc38] px-4 py-2">
              <span className="text-[15px] font-bold text-white sm:text-base">We&apos;re high rise specialists</span>
            </div>
            <p className="text-[14px] leading-[1.7] text-white/80 sm:text-[15px]">
              We service Melbourne&apos;s central, north-west, northern and north-eastern suburbs.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== MELBOURNE MAP ===================== */}
      <section className="bg-[#0d402e] px-0 pb-10 sm:px-4 sm:pb-12">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden sm:rounded-2xl">
          <div className="relative aspect-[4/3] w-full min-h-[240px] bg-[#1a4f38] sm:aspect-[16/9] sm:min-h-[300px]">
            <iframe
              title="Zap It Melbourne service area map"
              src={MELBOURNE_MAP}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <div className="h-[min(72%,18rem)] w-[min(72%,18rem)] rounded-full border-[5px] border-[#1cdc38] shadow-[0_0_0_2px_rgba(28,220,56,0.3)] sm:h-[min(65%,20rem)] sm:w-[min(65%,20rem)]" />
              <div className="absolute right-[14%] top-[18%] flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                <CheckCircle2 className="h-7 w-7 text-[#3fa535]" strokeWidth={2.25} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== INSURED, LICENSED, ACCREDITED ===================== */}
      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-[20px] font-bold leading-tight text-[#131a1c] sm:text-[22px]">
            Insured, licensed, accredited and legally compliant
          </h2>
          <div className="mb-6 h-[3px] w-[60px] bg-[#7DD958]" />
          <p className="mb-6 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
            Your health and safety is at the front of everything we do. You must trust us to be backed by industry memberships, accreditations and licensing for pest control in Victoria. We strive to provide the safest and most reliable pest control solutions. We set ourselves at the forefront of advanced technology, rigorous regulatory compliance and industry-level DHHS standards.
          </p>
          <ul className="mb-8 space-y-3 text-[14px] text-[#414042] sm:text-[15px]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3fa535]" />
              <span><strong className="text-[#131a1c]">The Australian Environmental Pest Managers Association</strong> — Certificate number XXX-XXX</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3fa535]" />
              <span><strong className="text-[#131a1c]">HACCP Food Safety Certificate</strong> — Certificate number XXX-XXX</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3fa535]" />
              <span><strong className="text-[#131a1c]">VIC Government Wildlife Licence</strong> — Licence number XXX-XXX</span>
            </li>
          </ul>
          <div className="grid grid-cols-3 gap-4 border-t border-[#e5e5e5] pt-8">
            <figure className="flex flex-col items-center text-center">
              <Image
                src={`${WP}/2025-04-WhatsApp-Image-2025-04-25-at-23.36.21_3d87ac70-300x300.jpg`}
                alt="Wildlife Licensed"
                width={100}
                height={80}
                className="h-14 w-auto object-contain sm:h-20"
              />
              <figcaption className="mt-2 text-[11px] font-medium text-[#414042] sm:text-xs">Wildlife Licensed</figcaption>
            </figure>
            <figure className="flex flex-col items-center text-center">
              <Image
                src={`${WP}/2024-07-aempa-v2-1-1-e1745687916424-173x300.png`}
                alt="HACCP Food Safety Certification"
                width={100}
                height={80}
                className="h-14 w-auto object-contain sm:h-20"
              />
              <figcaption className="mt-2 text-[11px] font-medium text-[#414042] sm:text-xs">HACCP Food Safety</figcaption>
            </figure>
            <figure className="flex flex-col items-center text-center">
              <Image
                src={`${WP}/2024-07-aempa-v2-1-e1745687358594-768x321.png`}
                alt="Australian Environmental Pest Managers Association"
                width={100}
                height={80}
                className="h-14 w-auto object-contain sm:h-20"
              />
              <figcaption className="mt-2 text-[11px] font-medium text-[#414042] sm:text-xs">Australian Environmental Pest Managers Association</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
            Frequently asked questions
          </h2>
          <div className="mb-6 h-[3px] w-[60px] bg-[#7DD958]" />
          <div className="border-t border-[#d9d9d9]">
            <FaqPageAccordion faqs={RESIDENTIAL_FAQS} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* ===================== PAGE INFO FOOTER ===================== */}
      <PageInfoFooterBlock />
    </>
  );
}
