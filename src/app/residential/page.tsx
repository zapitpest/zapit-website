import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';
import PriceCalculator from '@/components/sections/PriceCalculator';
import FaqPageAccordion from '@/components/sections/FaqPageAccordion';
import type { FAQ, BreadcrumbItem } from '@/types';
import HeroSlider from './HeroSlider';
import GoogleReviewsCarousel from './GoogleReviewsCarousel';

const WP = '/images/wp-assets';
const MELBOURNE_MAP =
  'https://www.google.com/maps?q=' + encodeURIComponent('Melbourne, Victoria, Australia') + '&z=10&output=embed';

const TRUST_ITEMS = [
  { label: 'Child safe', col: 1 },
  { label: 'Pet safe', col: 1 },
  { label: 'Eco friendly', col: 1 },
  { label: 'Insured', col: 2 },
  { label: 'DHHS licensed', col: 2 },
  { label: 'Accredited', col: 2 },
] as const;

type PestType =
  | 'magnify' | 'ant' | 'bird' | 'nest' | 'bedbug' | 'moth' | 'cobweb'
  | 'flea' | 'cockroach' | 'mouse' | 'mosquito' | 'possum' | 'silverfish'
  | 'termite' | 'wasp' | 'spider';

const PEST_PRICE_LIST: ReadonlyArray<{
  n: number; name: string; price: string; open: boolean;
  pestType: PestType;
  duration: string; propertyType: string; inclusions: string; detail: string;
}> = [
  {
    n: 1, pestType: 'magnify',
    name: 'General Inspection', price: '$100', open: true,
    duration: '30 minutes', propertyType: 'All residential homes',
    inclusions: 'Visual inspection of interior and exterior of property.',
    detail: `A general inspection is designed to quickly assess areas of concern in your home. To confirm or deny pest activity, type of pest and assess extent of infestation.\n\nA verbal and written assessment is provided with recommended course of action. The price of the assessment is deducted from treatment or preventative action taken on the same day of inspection.`,
  },
  {
    n: 2, pestType: 'ant',
    name: 'Ant treatment', price: '$239', open: false,
    duration: '45 minutes', propertyType: 'All residential homes',
    inclusions: '• Targeted surface spraying to entry points and active areas\n• Ant gel bait applied where activity is visible\n• Treatment focused on kitchens, bathrooms, and exterior edges',
    detail: `Target pests: Common household ants\n\nWhat to expect after treatment:\n• Activity may increase 1–3 weeks as ants spread the product to colony\n• Gradual reduction in activity as the treatment takes effect\n\nImportant notes and exclusions:\n• Designed for light infestations only\n• Does not target deep nesting or multiple colonies\n• No warranty applies to this service\n\nThis service is effective in treating light or intermittent ant activity only. Suitable for when ant activity is detected early and before a large ant colony is established.\n\nIt is not effective for treating deep nested multiple ant colonies which may require more extensive treatment.\n\nAn elimination of deep-rooted multi colonies, all homes. 60min $450`,
  },
  { n: 3, pestType: 'ant', name: 'Ant elimination', price: '$450', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Deep nest elimination for established colonies.', detail: 'An elimination of deep-rooted multi ant colonies in all homes.' },
  { n: 4, pestType: 'bird', name: 'Bird control from', price: '$450', open: false, duration: '30–60 minutes', propertyType: 'Single / Double-story', inclusions: 'Physical deterrents and removal solutions.', detail: 'Safe removal and deterrent installation for pest birds including pigeons.' },
  { n: 5, pestType: 'nest', name: 'Bird nest removal from', price: '$450', open: false, duration: '30–60 minutes', propertyType: 'Single / Double-story', inclusions: 'Safe nest removal and entry point sealing.', detail: 'Removal of active and inactive bird nests with preventative sealing.' },
  { n: 6, pestType: 'bedbug', name: 'Bed Bugs', price: '$450', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Full bed bug and egg elimination.', detail: 'Complete bed bug treatment including eggs and harbourage areas.' },
  { n: 7, pestType: 'moth', name: 'Clothes & carpet moth', price: '$385', open: false, duration: '90 minutes', propertyType: 'All', inclusions: 'Treatment of all moth-affected textile areas.', detail: 'Targeted treatment for clothes and carpet moth infestations.' },
  { n: 8, pestType: 'cobweb', name: 'Cobweb removal from', price: '$125', open: false, duration: '30–60 minutes', propertyType: 'Single / Double-story', inclusions: 'Full exterior and interior cobweb removal.', detail: 'Comprehensive cobweb removal as an extra service alongside pest treatment.' },
  { n: 9, pestType: 'flea', name: 'Fleas', price: '$385', open: false, duration: '45 minutes', propertyType: 'All', inclusions: 'Pet-safe flea treatment breaking the lifecycle.', detail: 'Targeted flea treatment designed for homes with pets.' },
  { n: 10, pestType: 'cockroach', name: 'German Cockroach', price: '$250', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Gel baits and targeted sprays for German cockroaches.', detail: 'Highly effective treatment for German cockroach infestations in kitchens and bathrooms.' },
  { n: 11, pestType: 'mouse', name: 'Mice & rat treatment', price: '$200', open: false, duration: '40 minutes', propertyType: 'All', inclusions: 'Bait stations, entry point sealing, monitoring.', detail: 'Targeted rodent treatment using secure bait stations and entry point sealing.' },
  { n: 12, pestType: 'mouse', name: 'Mice & rat removal', price: '$280', open: false, duration: '30–45 minutes', propertyType: 'All', inclusions: 'Physical removal of rodents and dead rodent clearance.', detail: 'Safe removal and disposal of mice and rats from your property.' },
  { n: 13, pestType: 'mosquito', name: 'Mosquitos and flies', price: '$385', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Breeding site treatment, residual spray application.', detail: 'Targeted mosquito and fly treatment to reduce populations around your home.' },
  { n: 14, pestType: 'possum', name: 'Possum removal from', price: '$450', open: false, duration: '30–60 minutes', propertyType: 'Single / Double-story', inclusions: 'Licensed humane possum removal and entry sealing.', detail: 'Humane, licensed possum removal from roof voids with entry-point proofing.' },
  { n: 15, pestType: 'silverfish', name: 'Silverfish treatment', price: '$299', open: false, duration: '40 minutes', propertyType: 'All', inclusions: 'Treatment of silverfish harbourage areas.', detail: 'Targeted treatment to eliminate silverfish from bookshelves, wardrobes, and bathrooms.' },
  { n: 16, pestType: 'termite', name: 'Termite inspections', price: '$349', open: false, duration: '2 hours', propertyType: 'All residential homes', inclusions: 'Visual and technical inspection of exterior and interior of property.', detail: 'A thorough termite inspection using moisture detection, noise detection, and keyhole camera.' },
  { n: 17, pestType: 'wasp', name: 'Wasp control', price: '$250', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Safe nest removal and treatment.', detail: 'Professional wasp nest removal and treatment to protect your family.' },
];

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

const G = '#38B44A';

const PEST_PATHS: Record<PestType, React.ReactNode> = {
  magnify: (
    <>
      <circle cx="10" cy="10" r="6" stroke={G} strokeWidth="2.2" fill="none"/>
      <line x1="14.8" y1="14.8" x2="21" y2="21" stroke={G} strokeWidth="2.5" strokeLinecap="round"/>
    </>
  ),
  ant: (
    <>
      <circle cx="12" cy="4.5" r="2.5" fill={G}/>
      <ellipse cx="12" cy="10.5" rx="2" ry="3" fill={G}/>
      <ellipse cx="12" cy="18" rx="3" ry="4" fill={G}/>
      <line x1="10" y1="8.5" x2="6" y2="6.5" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="10" y1="11" x2="5" y2="11" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="10" y1="13" x2="6" y2="15" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="14" y1="8.5" x2="18" y2="6.5" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="14" y1="11" x2="19" y2="11" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="14" y1="13" x2="18" y2="15" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
    </>
  ),
  bird: (
    <>
      <path d="M4 14 Q7 7 14 8 Q17 8 19 6 Q16 12 14 10 Q11 14 11 20 Q8 20 4 14Z" fill={G}/>
      <circle cx="17" cy="7.5" r="1.5" fill={G}/>
    </>
  ),
  nest: (
    <>
      <path d="M4 17 Q8 10 12 10 Q16 10 20 17" stroke={G} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M6 17 Q9 13 12 13 Q15 13 18 17" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="10" cy="10" rx="2" ry="1.5" fill={G}/>
      <ellipse cx="14" cy="10" rx="2" ry="1.5" fill={G}/>
    </>
  ),
  bedbug: (
    <>
      <ellipse cx="12" cy="12" rx="6" ry="4.5" fill={G}/>
      <circle cx="12" cy="8" r="2" fill={G}/>
      <line x1="6" y1="10" x2="2.5" y2="7.5" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="6" y1="12" x2="2" y2="12" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="6" y1="14" x2="2.5" y2="16.5" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="18" y1="10" x2="21.5" y2="7.5" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="18" y1="12" x2="22" y2="12" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="18" y1="14" x2="21.5" y2="16.5" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
    </>
  ),
  moth: (
    <>
      <path d="M12 12 C8 8 3 8 4 12 C5 15 9 14 12 12Z" fill={G}/>
      <path d="M12 12 C16 8 21 8 20 12 C19 15 15 14 12 12Z" fill={G}/>
      <path d="M12 12 C9 15 5 18 7 20 C9 21 11 17 12 12Z" fill={G}/>
      <path d="M12 12 C15 15 19 18 17 20 C15 21 13 17 12 12Z" fill={G}/>
      <ellipse cx="12" cy="12" rx="1.5" ry="5" fill={G}/>
    </>
  ),
  cobweb: (
    <>
      <line x1="12" y1="2" x2="12" y2="22" stroke={G} strokeWidth="1.2"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke={G} strokeWidth="1.2"/>
      <line x1="4.5" y1="4.5" x2="19.5" y2="19.5" stroke={G} strokeWidth="1.2"/>
      <line x1="19.5" y1="4.5" x2="4.5" y2="19.5" stroke={G} strokeWidth="1.2"/>
      <circle cx="12" cy="12" r="4.5" stroke={G} strokeWidth="1.2" fill="none"/>
      <circle cx="12" cy="12" r="8.5" stroke={G} strokeWidth="1.2" fill="none"/>
    </>
  ),
  flea: (
    <>
      <circle cx="13.5" cy="9.5" r="4" fill={G}/>
      <circle cx="10.5" cy="6" r="2.5" fill={G}/>
      <line x1="9.5" y1="13" x2="5" y2="18" stroke={G} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="13" y1="13.5" x2="10" y2="20" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="16" y1="12" x2="20" y2="15" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
    </>
  ),
  cockroach: (
    <>
      <ellipse cx="12" cy="13" rx="5" ry="7" fill={G}/>
      <ellipse cx="12" cy="7" rx="4" ry="3" fill={G}/>
      <line x1="7" y1="10" x2="2" y2="8" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="7" y1="13" x2="2" y2="13" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="7" y1="16" x2="2" y2="18" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="17" y1="10" x2="22" y2="8" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="17" y1="13" x2="22" y2="13" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="17" y1="16" x2="22" y2="18" stroke={G} strokeWidth="1.4" strokeLinecap="round"/>
    </>
  ),
  mouse: (
    <>
      <circle cx="12" cy="14" r="6.5" fill={G}/>
      <circle cx="7" cy="9" r="3" fill={G}/>
      <circle cx="17" cy="9" r="3" fill={G}/>
      <circle cx="7.5" cy="9" r="1.5" fill="white"/>
      <circle cx="16.5" cy="9" r="1.5" fill="white"/>
      <circle cx="10.5" cy="13" r="0.9" fill="white"/>
      <circle cx="13.5" cy="13" r="0.9" fill="white"/>
      <path d="M12 20 C15 22 19.5 21 22 17" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </>
  ),
  mosquito: (
    <>
      <ellipse cx="12" cy="14" rx="2" ry="5" fill={G}/>
      <circle cx="12" cy="7.5" r="2.5" fill={G}/>
      <line x1="12" y1="7.5" x2="12" y2="2" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 11 C8 7.5 3.5 9 5 12" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M12 11 C16 7.5 20.5 9 19 12" stroke={G} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <line x1="8" y1="16" x2="4" y2="19" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="18.5" x2="10" y2="22" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="16" y1="16" x2="20" y2="19" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
    </>
  ),
  possum: (
    <>
      <circle cx="12" cy="14" r="6" fill={G}/>
      <circle cx="12" cy="8.5" r="4" fill={G}/>
      <path d="M8 6 C6 2.5 3 3.5 4.5 6.5" fill={G}/>
      <path d="M16 6 C18 2.5 21 3.5 19.5 6.5" fill={G}/>
      <circle cx="10" cy="8" r="1" fill="white"/>
      <circle cx="14" cy="8" r="1" fill="white"/>
      <ellipse cx="12" cy="10" rx="1.5" ry="0.8" fill="white"/>
    </>
  ),
  silverfish: (
    <>
      <ellipse cx="13" cy="12" rx="8" ry="3" fill={G} transform="rotate(-15 13 12)"/>
      <line x1="5" y1="9" x2="1.5" y2="7" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="6" y1="12" x2="1.5" y2="13" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="7" y1="15" x2="2.5" y2="17" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="17" y1="9" x2="21" y2="7" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="18" y1="12" x2="22.5" y2="12" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="19" y1="15" x2="22" y2="17" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
    </>
  ),
  termite: (
    <>
      <circle cx="12" cy="5" r="3" fill={G}/>
      <line x1="10" y1="3.5" x2="7" y2="1" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="3.5" x2="17" y2="1" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="12" cy="12" rx="4" ry="5" fill={G}/>
      <ellipse cx="12" cy="20" rx="4.5" ry="3.5" fill={G}/>
      <line x1="8" y1="10" x2="3.5" y2="8" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="12" x2="3" y2="12" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="15" x2="3.5" y2="17" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="10" x2="20.5" y2="8" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="12" x2="21" y2="12" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="15" x2="20.5" y2="17" stroke={G} strokeWidth="1.5" strokeLinecap="round"/>
    </>
  ),
  wasp: (
    <>
      <ellipse cx="12" cy="15" rx="4" ry="5.5" fill={G}/>
      <rect x="8.5" y="13" width="7" height="1.5" rx="0.5" fill="white"/>
      <rect x="8.5" y="16" width="7" height="1.5" rx="0.5" fill="white"/>
      <circle cx="12" cy="7.5" r="3" fill={G}/>
      <path d="M12 11 C7.5 7 3 9 5 12" fill={G}/>
      <path d="M12 11 C16.5 7 21 9 19 12" fill={G}/>
      <line x1="10" y1="6" x2="7" y2="2.5" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="14" y1="6" x2="17" y2="2.5" stroke={G} strokeWidth="1.3" strokeLinecap="round"/>
    </>
  ),
  spider: (<></>) as React.ReactNode,
} as Record<PestType, React.ReactNode>;

function PestIcon({ type }: { type: PestType }) {
  if (type === 'spider') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/icons/spider.svg" alt="" aria-hidden className="h-9 w-9 shrink-0" />
    );
  }
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#38B44A] bg-transparent">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        {PEST_PATHS[type]}
      </svg>
    </span>
  );
}

function CheckMark() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1cdc38]" aria-hidden>
      <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="currentColor">
        <path d="M10.3 2.3a1 1 0 00-1.4 0L4.5 6.7 3.1 5.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l5-5a1 1 0 000-1.4z" />
      </svg>
    </span>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'Residential Pest Control Melbourne | Zap It Pest & Termite Control' },
    description: `Protect your Melbourne home with Zap It. DHHS approved, child & pet safe, same-day pest control. Termite inspections from $349. Call ${SITE_CONFIG.phone}.`,
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

      {/* ===================== 1. HERO IMAGE SLIDER ===================== */}
      <HeroSlider />

      {/* ===================== 2. WE TREAT ALL HOUSEHOLD PESTS ===================== */}
      <section className="bg-white px-5 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-3 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
            We treat all household pests
          </h2>
          <p className="mb-5 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
            When you protect your home and family from pests with us, your piece of mind is assured.
            Our services are eco-friendly, child safe, pet safe and we&apos;re fully insured and DHHS
            Licensed. We treat your home with same care as your own family, delivering long-lasting solutions.
          </p>

          {/* Call Now + Chat buttons */}
          <div className="mb-6 flex items-center gap-3">
            <a
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-2 rounded-full bg-[#f8f5f2] px-5 py-2.5 text-[14px] font-semibold text-[#414042] shadow-sm ring-1 ring-[#e5e5e5] transition-colors hover:bg-[#1cdc38] hover:text-white hover:ring-[#1cdc38]"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Call now
            </a>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1cdc38] text-white shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>

          {/* Trust badges — 2 columns like Figma */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <CheckMark />
                <span className="text-[14px] font-medium italic text-[#414042]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 3. GOOGLE REVIEWS CAROUSEL ===================== */}
      <GoogleReviewsCarousel />

      {/* ===================== 4. CAT GIRL TESTIMONIAL IMAGE ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[375/440] w-full sm:aspect-[16/9]">
          <Image
            src="/images/residential/cat-girl.png"
            alt="Happy cat owner - Zapit takes pet safety seriously"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Testimonial overlay — bottom left */}
          <div className="absolute bottom-6 left-4 right-4 z-10 sm:left-6 sm:right-auto sm:max-w-[400px]">
            <div className="bg-[#1cdc38] px-4 py-3 sm:px-5 sm:py-4">
              <p className="text-[16px] font-medium leading-[1.4] text-[#131a1c] sm:text-[18px]">
                &ldquo;Zapit were great to deal with and I felt confidant they took my cats safety seriously&rdquo;
              </p>
              <p className="mt-1 text-[13px] font-medium text-[#131a1c]/80 sm:text-[14px]">Jenny, Hawthorn resident</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 5. SAVE 20% CONTAINER ===================== */}
      <section className="bg-white px-3 py-6 sm:px-4 sm:py-8">
        <div className="mx-auto max-w-[354px] rounded-[20px] bg-[#1cdc38] px-5 py-6 sm:max-w-md sm:px-6 sm:py-8">
          <h2 className="mb-4 text-center text-[24px] font-bold leading-[1.2] text-[#414042]">
            The more you protect,<br />the more you save
          </h2>
          <div className="flex items-start gap-4">
            {/* Save 20% badge — circular */}
            <div className="flex h-[75px] w-[78px] shrink-0 flex-col items-center justify-center rounded-full bg-[#f8f5f2]">
              <span className="text-[25px] font-black leading-none tracking-[-0.05em] text-[#414042]">Save</span>
              <span className="text-[25px] font-black leading-none tracking-[-0.05em] text-[#414042]">20%</span>
            </div>
            <p className="text-[14px] leading-[1.3] text-[#414042]">
              Save 20% on the total cost of the job when you purchase two or more treatments that we service on the same day.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== 6. PEST SOLUTIONS AND PRICE LIST ===================== */}
      <section id="pest-price-list" className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-[22px] font-bold leading-tight text-[#414042] sm:text-[26px]">
            Pest solutions and price list
          </h2>
          <div className="space-y-2">
            {PEST_PRICE_LIST.map((item) => (
              <details key={item.n} className="group rounded-xl border border-[#e5e5e5] bg-white shadow-sm" open={item.open}>
                <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 sm:px-5">
                  <PestIcon type={item.pestType} />
                  <span className="flex-1 text-[15px] font-bold text-[#414042] group-open:text-[#38B44A] sm:text-base">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-[15px] font-bold text-[#1cdc38] sm:text-base">{item.price}</span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center font-bold text-lg leading-none">
                    <span className="text-[#AFAAA4] group-open:hidden">+</span>
                    <span className="hidden text-[#414042] group-open:inline">&minus;</span>
                  </span>
                </summary>
                <div className="border-t border-[#e5e5e5] px-4 pb-5 pt-4 sm:px-5">
                  <dl className="mb-4 space-y-2 text-[13px] text-[#414042] sm:text-sm">
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-[#131a1c]">Duration:</dt>
                      <dd>{item.duration}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-[#131a1c]">Property type:</dt>
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

      {/* ===================== 7. PRICE CALCULATOR ===================== */}
      <PriceCalculator />

      {/* ===================== 8. SAME DAY SERVICE CTA ===================== */}
      <section className="bg-[#0d402e] py-8 sm:py-10">
        <a href={SITE_CONFIG.phoneTel} className="mx-auto block max-w-[360px] px-4" aria-label="Same day service available. Call now!">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/icons/group-350.svg" alt="Same day service available. Call now!" className="h-auto w-full" />
        </a>
      </section>

      {/* ===================== 9. DARK SECTIONS — HEALTH/SAFETY/TRUST WITH IMAGES ===================== */}

      {/* 9a. Health & Safety intro */}
      <section className="bg-[#131a1c] px-5 py-10 sm:px-6 sm:py-12">
        <p className="mx-auto max-w-md text-center text-[18px] italic leading-[1.5] text-[#1cdc38] sm:text-[20px]">
          Your health and safety are at the heart of everything we do, supported by industry-leading technology.
        </p>
      </section>

      {/* 9b. Family trust image — "Protection you can trust" */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[375/440] w-full sm:aspect-[16/10]">
          <Image
            src="/images/residential/family-trust.png"
            alt="Protection you can trust - family protected by Zap It"
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute bottom-6 left-4 z-10 sm:left-6">
            <div className="space-y-[3px] mb-2">
              <div className="h-[3px] w-[50px] rounded-full bg-[#1cdc38]" />
              <div className="h-[3px] w-[80px] rounded-full bg-[#1cdc38]" />
            </div>
            <p className="text-[26px] font-bold leading-[1.15] text-[#131a1c] sm:text-[30px]">
              <span className="inline bg-[#1cdc38] [box-decoration-break:clone] px-2 py-0.5">
                Protection<br />you can trust
              </span>
            </p>
            <p className="mt-2 max-w-[280px] bg-[#1cdc38] px-2 py-1 text-[14px] font-medium text-[#131a1c] sm:text-[15px]">
              We have serviced over 20,000 homes in Melbourne
            </p>
          </div>
        </div>
      </section>

      {/* 9c. Pet safety text */}
      <section className="bg-[#131a1c] px-5 py-10 sm:px-6 sm:py-12">
        <p className="mx-auto max-w-md text-center text-[18px] italic leading-[1.5] text-[#1cdc38] sm:text-[20px]">
          We know pets can get into all sorts of mischief which is why we take every measure to keep your much loved pets safe and sound.
        </p>
      </section>

      {/* 9d. Townhouse image — "We treat your home as if it were ours" */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[375/350] w-full sm:aspect-[16/9]">
          <Image
            src="/images/residential/townhouse.png"
            alt="We treat your home as if it were ours"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute left-4 top-6 z-10 sm:left-6 sm:top-8">
            <p className="text-[24px] font-bold leading-[1.15] text-[#131a1c] sm:text-[28px]">
              <span className="inline bg-[#1cdc38] [box-decoration-break:clone] px-2 py-0.5">
                We treat your home<br />as if it were ours
              </span>
            </p>
            <p className="mt-2 max-w-[280px] bg-[#1cdc38] px-2 py-1 text-[13px] font-medium text-[#131a1c] sm:text-[14px]">
              Your satisfaction is our highest priority
            </p>
          </div>
        </div>
      </section>

      {/* 9e. Coverage text */}
      <section className="bg-[#131a1c] px-5 py-10 sm:px-6 sm:py-12">
        <p className="mx-auto max-w-md text-center text-[18px] italic leading-[1.5] text-[#1cdc38] sm:text-[20px]">
          Whether you live in a one-bedroom flat, high-rise apartment, semi-detached townhouse or large family home, we have you covered.
        </p>
      </section>

      {/* 9f. High rise specialist image */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[375/350] w-full sm:aspect-[16/9]">
          <Image
            src="/images/residential/highrise-specialist.png"
            alt="We're high rise specialists in Melbourne"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute bottom-6 left-4 z-10 sm:left-6">
            <p className="text-[24px] font-bold leading-[1.15] text-[#131a1c] sm:text-[28px]">
              <span className="inline bg-[#1cdc38] [box-decoration-break:clone] px-2 py-0.5">
                We&apos;re high rise<br />specialists
              </span>
            </p>
            <p className="mt-2 max-w-[320px] bg-[#1cdc38] px-2 py-1 text-[13px] font-medium text-[#131a1c] sm:text-[14px]">
              We have quickly become a specialists in high rise living pest protection
            </p>
          </div>
        </div>
      </section>

      {/* 9g. Service area text */}
      <section className="bg-[#131a1c] px-5 py-10 sm:px-6 sm:py-12">
        <p className="mx-auto max-w-md text-center text-[18px] italic leading-[1.5] text-[#1cdc38] sm:text-[20px]">
          We service Melbourne&apos;s central, north-west, northern and north-eastern suburbs.
        </p>
      </section>

      {/* ===================== 10. MELBOURNE MAP ===================== */}
      <section className="bg-[#131a1c] px-0 pb-2 sm:px-4">
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
                <CheckCircle2 className="h-7 w-7 text-[#1cdc38]" strokeWidth={2.25} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 11. INSURED, LICENSED, ACCREDITED ===================== */}
      <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[24px]">
            Insured, licensed, accredited and legally compliant
          </h2>
          <p className="mb-4 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
            Your health and safety is at the heart of everything we do. Your trust in us is backed by
            our industry memberships, accreditations, licences and professional insurance.
          </p>
          <p className="mb-6 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
            We&apos;re committed to provide the safest and best possible pest control solutions. We
            maintain our professional currency by staying at the forefront of advances in technology,
            regulatory compliance and industry standards.
          </p>

          <ul className="mb-8 space-y-4 text-[14px] text-[#414042] sm:text-[15px]">
            <li>
              <p className="font-bold text-[#131a1c]">The Australian Environmental Pest Managers Association</p>
              <p>Membership number: XXXXXX</p>
            </li>
            <li>
              <p className="font-bold text-[#131a1c]">HACCP Food Safety Certificate</p>
              <p>Certificate number: XXXXXX</p>
            </li>
            <li>
              <p className="font-bold text-[#131a1c]">VIC Government Wildlife Licence</p>
              <p>Licence number: XXXXXX</p>
            </li>
          </ul>

          {/* Certification logos — 2 on top, 1 centered below */}
          <div className="flex flex-col items-center gap-6 border-t border-[#e5e5e5] pt-8">
            <div className="flex items-center justify-center gap-8">
              <figure className="flex flex-col items-center text-center">
                <Image
                  src={`${WP}/2025-04-WhatsApp-Image-2025-04-25-at-23.36.21_3d87ac70-300x300.jpg`}
                  alt="Wildlife Licensed"
                  width={120}
                  height={100}
                  className="h-20 w-auto object-contain sm:h-24"
                />
                <figcaption className="mt-2 text-[12px] font-medium text-[#414042]">Wildlife Licenced</figcaption>
              </figure>
              <figure className="flex flex-col items-center text-center">
                <Image
                  src={`${WP}/2024-07-aempa-v2-1-1-e1745687916424-173x300.png`}
                  alt="HACCP Food Safety Certification"
                  width={120}
                  height={100}
                  className="h-20 w-auto object-contain sm:h-24"
                />
                <figcaption className="mt-2 text-[12px] font-medium text-[#414042]">HACCP Food Safety<br />Certification</figcaption>
              </figure>
            </div>
            <figure className="flex flex-col items-center text-center">
              <Image
                src={`${WP}/2024-07-aempa-v2-1-e1745687358594-768x321.png`}
                alt="Australian Environmental Pest Managers Association"
                width={160}
                height={80}
                className="h-16 w-auto object-contain sm:h-20"
              />
              <figcaption className="mt-2 text-[12px] font-medium text-[#414042]">Australian Environmental<br />Pest Managers Association</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ===================== 12. FAQ ===================== */}
      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
            Frequently asked questions
          </h2>
          <div className="mb-6 h-[3px] w-[60px] bg-[#1cdc38]" />
          <div className="border-t border-[#e5e5e5]">
            <FaqPageAccordion faqs={RESIDENTIAL_FAQS} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* ===================== PAGE INFO FOOTER ===================== */}
      <PageInfoFooterBlock />
    </>
  );
}
