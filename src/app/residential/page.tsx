import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';
import PriceCalculator from '@/components/sections/PriceCalculator';
import FaqPageAccordion from '@/components/sections/FaqPageAccordion';
import ResidentialHeroSlider from './ResidentialHeroSlider';
import GoogleReviewsCarousel from './GoogleReviewsCarousel';
import type { FAQ, BreadcrumbItem } from '@/types';

const WP = '/images/wp-assets';
const MELBOURNE_MAP =
  'https://www.google.com/maps?q=' + encodeURIComponent('Melbourne, Victoria, Australia') + '&z=10&output=embed';

const TRUST_BADGES = [
  { label: 'Child safe', color: '#1cdc38' },
  { label: 'Pet safe', color: '#1cdc38' },
  { label: 'Eco friendly', color: '#1cdc38' },
  { label: 'Insured', color: '#1cdc38' },
  { label: 'DHHS licensed', color: '#1cdc38' },
  { label: 'Accredited', color: '#1cdc38' },
] as const;

const PEST_PRICE_LIST: ReadonlyArray<{
  n: number; name: string; price: string; open: boolean;
  pestType: PestType;
  duration: string; propertyType: string; inclusions: string; detail: string;
}> = [
  {
    n: 1, pestType: 'magnify',
    name: 'General Inspection', price: '$100', open: true,
    duration: '30 minutes', propertyType: 'All residential homes',
    inclusions: 'Visual inspection of exterior and interior of property.\nVerbal and written report: Findings and recommendations',
    detail: `A general inspection is designed to quickly assess areas of concern in your home. To confirm or deny pest activity, type of pest and access extent of infestation.\n\nA verbal and written assessment is provided with recommended course of action. The price of the assessment is deducted from treatment or preventative action taken on the same day of inspection.`,
  },
  {
    n: 2, pestType: 'ant',
    name: 'Ant treatment', price: '$239', open: false,
    duration: '45 minutes', propertyType: 'All residential homes',
    inclusions: '• Targeted surface spraying to entry points and active areas\n• Ant gel bait applied where activity is visible\n• Treatment focused on kitchens, bathrooms, and external edges',
    detail: `Target pests: Common household ants\n\nWhat to expect after treatment:\n• Ant movement may increase for 1–3 weeks as ants spread the product to colony\n• Gradual reduction in activity as the treatment takes effect\n\nImportant notes and exclusions:\n• Designed for light infestations only\n• Does not target deep nesting or multiple colonies\n• No warranty applies to this service\n\nThis service is affective in treating light or intermittent ant activity only. Suitable for when ant activity is detected early and before a large ant colony is established.\n\nIt is not affective for treating deep nested multiple ant colonies which require more extensive treatment.\n\nAnt elimination of deep nested multi colonies, all homes, 60min $450`,
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

type PestType =
  | 'magnify' | 'ant' | 'bird' | 'nest' | 'bedbug' | 'moth' | 'cobweb'
  | 'flea' | 'cockroach' | 'mouse' | 'mosquito' | 'possum' | 'silverfish'
  | 'termite' | 'wasp' | 'spider';

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
      <line x1="10.5" y1="3" x2="7.5" y2="0.5" stroke={G} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="13.5" y1="3" x2="16.5" y2="0.5" stroke={G} strokeWidth="1.2" strokeLinecap="round"/>
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
      <line x1="10" y1="5" x2="7" y2="1.5" stroke={G} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="14" y1="5" x2="17" y2="1.5" stroke={G} strokeWidth="1.2" strokeLinecap="round"/>
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

function GreenCheck() {
  return (
    <svg className="h-5 w-5 shrink-0 text-[#1cdc38]" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function GreenBars() {
  return (
    <div className="mb-3 space-y-[3px]">
      <div className="h-[4px] w-[30%] rounded-full bg-[#1cdc38]" />
      <div className="h-[4px] w-[45%] rounded-full bg-[#1cdc38]" />
      <div className="h-[4px] w-[60%] rounded-full bg-[#1cdc38]" />
    </div>
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

      {/* ═══════════════ 1. HERO SLIDER — 3 swapping images ═══════════════ */}
      <ResidentialHeroSlider />

      {/* ═══════════════ 2. WE TREAT ALL HOUSEHOLD PESTS + BADGES ═══════════════ */}
      <section className="bg-white px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="mb-4 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
            We treat all household pests
          </h1>
          <p className="mb-6 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
            When you protect your home and family from pests with us, your piece of mind is assured.
            Our services are eco-friendly, child safe, pet safe and we&apos;re fully insured and DHHS
            Licensed. We treat your home with same care as your own — using industry-leading solutions.
          </p>

          <a
            href={SITE_CONFIG.phoneTel}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#1cdc38] px-6 py-3 text-[15px] font-bold text-[#131a1c] shadow-sm transition-colors hover:bg-[#17c132]"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            Call now
          </a>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <GreenCheck />
                <span className="text-[14px] font-medium text-[#414042]">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. GOOGLE REVIEWS AUTO-SCROLL ═══════════════ */}
      <GoogleReviewsCarousel />

      {/* ═══════════════ 4. TESTIMONIAL — Girl with cat ═══════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[4/5] w-full sm:aspect-[3/2] md:aspect-[16/9]">
          <img
            src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80"
            alt="Woman holding a cat"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:bottom-auto sm:left-4 sm:top-1/2 sm:-translate-y-1/2 sm:max-w-[380px] sm:p-0">
            <div className="rounded-xl bg-[#1cdc38] px-5 py-4">
              <p className="text-[16px] leading-[1.5] text-[#131a1c] sm:text-[18px]">
                &ldquo;Zapit were great to deal with and I felt confident they took my cats safety seriously&rdquo;
              </p>
              <p className="mt-2 text-[14px] font-semibold text-[#414042]">Jenny, Hawthorn resident</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. SAVE 20% SECTION ═══════════════ */}
      <section className="bg-[#f8f5f2] px-3 py-6 sm:px-4 sm:py-8">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl bg-[#1cdc38] px-5 py-6 sm:px-6 sm:py-8">
            <div className="flex items-start gap-4">
              <div className="flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-full bg-[#f8f5f2]">
                <span className="text-center text-[20px] font-black leading-tight tracking-tighter text-[#414042]">
                  Save<br />20%
                </span>
              </div>
              <div>
                <h2 className="mb-2 text-[22px] font-bold leading-tight text-[#414042] sm:text-[24px]">
                  The more you protect, the more you save
                </h2>
                <p className="text-[14px] leading-[1.5] text-[#414042]">
                  Save 20% on the total cost of the job when you purchase two or more treatments that we service on the same day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 6. PEST SOLUTIONS AND PRICE LIST ═══════════════ */}
      <section id="pest-price-list" className="bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
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
                  <span className="shrink-0 text-[15px] font-bold text-[#414042] sm:text-base">{item.price}</span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center text-lg font-bold leading-none">
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

      {/* ═══════════════ 7. PRICE CALCULATOR ═══════════════ */}
      <PriceCalculator />

      {/* ═══════════════ 8. DARK SECTIONS — alternating image/text blocks ═══════════════ */}
      <section className="bg-[#0d402e]">
        <div className="mx-auto max-w-3xl">
          {/* Intro text */}
          <div className="px-5 py-10 sm:px-6 sm:py-14">
            <p className="text-center text-[18px] italic leading-[1.6] text-[#1cdc38] sm:text-[20px]">
              Your health and safety are at the heart of everything we do, supported by industry-leading technology.
            </p>
          </div>

          {/* Protection you can trust — family image */}
          <div className="relative w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Family in front of their home"
              className="h-auto w-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
              <GreenBars />
              <h3 className="text-[22px] font-bold leading-[1.2] text-[#f8f5f2] sm:text-[26px]">
                <span className="inline bg-[#1cdc38] [box-decoration-break:clone] px-2 py-0.5 text-[#131a1c]">
                  Protection you can trust
                </span>
              </h3>
              <p className="mt-1 text-[15px] text-white/90">
                We have serviced over 20,000 homes in Melbourne
              </p>
            </div>
          </div>

          {/* Pets text */}
          <div className="px-5 py-10 sm:px-6 sm:py-12">
            <p className="text-center text-[18px] italic leading-[1.6] text-[#1cdc38] sm:text-[20px]">
              We know pets can get into all sorts of mischief which is why we take every measure to keep your much loved pets safe and sound.
            </p>
          </div>

          {/* We treat your home — townhouse image */}
          <div className="relative w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=80"
              alt="Modern townhouses"
              className="h-auto w-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
              <GreenBars />
              <h3 className="text-[22px] font-bold leading-[1.2] text-[#f8f5f2] sm:text-[26px]">
                <span className="inline bg-[#1cdc38] [box-decoration-break:clone] px-2 py-0.5 text-[#131a1c]">
                  We treat your home as if it were ours
                </span>
              </h3>
              <p className="mt-1 text-[15px] text-white/90">
                Your satisfaction is our highest priority
              </p>
            </div>
          </div>

          {/* Home types text */}
          <div className="px-5 py-10 sm:px-6 sm:py-12">
            <p className="text-center text-[18px] italic leading-[1.6] text-[#1cdc38] sm:text-[20px]">
              Whether you live in a one-bedroom flat, high-rise apartment, semi-detached townhouse or large family home, we have you covered.
            </p>
          </div>

          {/* High rise specialists — building image */}
          <div className="relative w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
              alt="High rise apartment building with greenery"
              className="h-auto w-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
              <GreenBars />
              <h3 className="text-[22px] font-bold leading-[1.2] text-[#f8f5f2] sm:text-[26px]">
                <span className="inline bg-[#1cdc38] [box-decoration-break:clone] px-2 py-0.5 text-[#131a1c]">
                  We&apos;re high rise specialists
                </span>
              </h3>
              <p className="mt-1 text-[15px] text-white/90">
                We have quickly become a specialists in high rise living pest protection
              </p>
            </div>
          </div>

          {/* Service areas text */}
          <div className="px-5 py-10 sm:px-6 sm:py-12">
            <p className="text-center text-[18px] italic leading-[1.6] text-[#1cdc38] sm:text-[20px]">
              We service Melbourne&apos;s central, north-west, northern and north-eastern suburbs.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 9. MELBOURNE MAP ═══════════════ */}
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
                <CheckCircle2 className="h-7 w-7 text-[#1cdc38]" strokeWidth={2.25} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 10. INSURED, LICENSED, ACCREDITED ═══════════════ */}
      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-[20px] font-bold leading-tight text-[#131a1c] sm:text-[22px]">
            Insured, licensed, accredited and legally compliant
          </h2>
          <p className="mb-6 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
            Your health and safety is at the heart of everything we do. Your trust in us is backed by our industry memberships, accreditations, licences and professional insurance.
          </p>
          <p className="mb-6 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
            We&apos;re committed to provide the safest and best possible pest control solutions. We maintain our professional currency by staying at the forefront of advances in technology, regulatory compliance and industry standards.
          </p>
          <ul className="mb-8 space-y-4 text-[14px] text-[#414042] sm:text-[15px]">
            <li>
              <strong className="text-[#131a1c]">The Australian Environmental Pest Managers Association</strong>
              <br />Membership number: XXXXXX
            </li>
            <li>
              <strong className="text-[#131a1c]">HACCP Food Safety Certificate</strong>
              <br />Certificate number: XXXXXX
            </li>
            <li>
              <strong className="text-[#131a1c]">VIC Government Wildlife Licence</strong>
              <br />Licence number: XXXXXX
            </li>
          </ul>
          <div className="grid grid-cols-2 gap-6 border-t border-[#e5e5e5] pt-8 sm:grid-cols-3">
            <figure className="flex flex-col items-center text-center">
              <Image
                src={`${WP}/2025-04-WhatsApp-Image-2025-04-25-at-23.36.21_3d87ac70-300x300.jpg`}
                alt="Wildlife Licensed"
                width={120}
                height={100}
                className="h-20 w-auto object-contain"
              />
              <figcaption className="mt-3 text-[12px] font-medium text-[#414042]">Wildlife Licenced</figcaption>
            </figure>
            <figure className="flex flex-col items-center text-center">
              <Image
                src={`${WP}/2024-07-aempa-v2-1-1-e1745687916424-173x300.png`}
                alt="HACCP Food Safety Certification"
                width={120}
                height={100}
                className="h-20 w-auto object-contain"
              />
              <figcaption className="mt-3 text-[12px] font-medium text-[#414042]">HACCP Food Safety Certification</figcaption>
            </figure>
            <figure className="col-span-2 flex flex-col items-center text-center sm:col-span-1">
              <Image
                src={`${WP}/2024-07-aempa-v2-1-e1745687358594-768x321.png`}
                alt="Australian Environmental Pest Managers Association"
                width={120}
                height={100}
                className="h-20 w-auto object-contain"
              />
              <figcaption className="mt-3 text-[12px] font-medium text-[#414042]">Australian Environmental Pest Managers Association</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ═══════════════ 11. TERMITE SPECIALISTS (green card) ═══════════════ */}
      <section className="bg-[#f8f5f2] px-3 py-3 sm:px-4">
        <div className="rounded-2xl bg-[#1cdc38] px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <p className="mb-5 text-center text-[16px] font-medium italic text-[#f8f5f2]">
              We&apos;re termite specialists
            </p>
            <div className="mb-6 flex items-start gap-4">
              <svg viewBox="0 0 96 96" className="h-[88px] w-[88px] shrink-0" fill="none" aria-hidden>
                <circle cx="48" cy="48" r="43" fill="white" />
                <circle cx="48" cy="48" r="43" stroke="#dc2626" strokeWidth="5" />
                <line x1="44" y1="20" x2="36" y2="12" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="52" y1="20" x2="60" y2="12" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="48" cy="25" r="6" fill="#1f2937" />
                <ellipse cx="48" cy="40" rx="8" ry="9" fill="#1f2937"/>
                <ellipse cx="48" cy="60" rx="11" ry="14" fill="#1f2937"/>
                <line x1="40" y1="35" x2="27" y2="30" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
                <line x1="40" y1="40" x2="26" y2="40" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
                <line x1="40" y1="46" x2="27" y2="51" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
                <line x1="56" y1="35" x2="69" y2="30" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
                <line x1="56" y1="40" x2="70" y2="40" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
                <line x1="56" y1="46" x2="69" y2="51" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
                <line x1="13" y1="80" x2="83" y2="16" stroke="#dc2626" strokeWidth="8" strokeLinecap="round"/>
              </svg>
              <h2 className="text-[22px] font-bold leading-tight text-[#414042] sm:text-[28px]">
                We stop termites dead in their tracks
              </h2>
            </div>
            <h3 className="mb-4 text-[18px] font-bold text-[#414042]">
              Termite inspection $399
            </h3>
            <dl className="mb-5 space-y-2 text-[13px] text-[#414042] sm:text-sm">
              <div className="flex gap-2">
                <dt className="shrink-0 font-bold italic">Duration:</dt>
                <dd className="italic">2 hours</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 font-bold italic">Property type:</dt>
                <dd className="italic">All residential homes</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="font-bold italic">Inclusions:</dt>
                <dd className="italic">Visual and technical inspection of exterior and interior of property, including gardens</dd>
              </div>
            </dl>
            <p className="mb-3 text-[14px] leading-[1.7] text-[#414042]">
              We conduct a detailed inspection in and around your home including in roof cavities and under the house.
              We use the latest technology to detect and diagnose extent of any termite activity.
            </p>
            <p className="mb-8 text-[14px] leading-[1.7] text-[#414042]">
              A verbal and written assessment is provided with recommended course of action. The price of inspection
              is deducted from further treatment or preventative action.
            </p>
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/important.svg" alt="" aria-hidden className="h-[58px] w-[58px] shrink-0" />
              <div>
                <p className="mb-1 text-[18px] font-black italic text-[#f8f5f2]">Important!</p>
                <p className="text-[14px] font-black italic leading-[1.5] text-[#f8f5f2]">
                  Do not disturb termites if you see or suspect termite activity. They move to other areas if you disturb them!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 12. SAME DAY SERVICE CTA ═══════════════ */}
      <section className="bg-[#0d402e] py-8 sm:py-10">
        <a href={SITE_CONFIG.phoneTel} className="mx-auto block max-w-[360px] px-4" aria-label="Same day service available. Call now!">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/icons/group-350.svg" alt="Same day service available. Call now!" className="h-auto w-full" />
        </a>
      </section>

      {/* ═══════════════ 13. FAQ ═══════════════ */}
      <section className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
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

      {/* ═══════════════ 14. PAGE INFO FOOTER ═══════════════ */}
      <PageInfoFooterBlock />
    </>
  );
}
