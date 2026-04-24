import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Star, CheckCircle2 } from 'lucide-react';
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

// Full pest price list — icons, names, prices matching Figma ss2
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
    detail: `Target pests: Common household ants\n\nWhat to expect after treatment:\n• Activity may increase 1–3 weeks as ants spread the product to colony\n• Gradual reduction in activity as the treatment takes effect\n\nImportant notes and exclusions:\n• Designed for light infestations only\n• Does not target deep nesting or multiple colonies\n• No warranty applies to this service\n\nThis service is effective in treating light or intermittent ant activity only. Suitable for when ant activity is detected early and before a large ant colony is established.\n\nIt is not effective for treating deep nested multiple ant colonies which may require more extensive treatment.\n\nAn elimination of deep-rooted multi colonies, all homes. $2000+ $450`,
  },
  { n: 3, pestType: 'ant', name: 'Ant elimination', price: '$450', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Deep nest elimination for established colonies.', detail: 'An elimination of deep-rooted multi ant colonies in all homes.' },
  { n: 4, pestType: 'bird', name: 'Bird control', price: 'from $450', open: false, duration: '30–60 minutes', propertyType: 'Single / Double-story', inclusions: 'Physical deterrents and removal solutions.', detail: 'Safe removal and deterrent installation for pest birds including pigeons.' },
  { n: 5, pestType: 'nest', name: 'Bird nest removal', price: 'from $450', open: false, duration: '30–60 minutes', propertyType: 'Single / Double-story', inclusions: 'Safe nest removal and entry point sealing.', detail: 'Removal of active and inactive bird nests with preventative sealing.' },
  { n: 6, pestType: 'bedbug', name: 'Bed Bugs', price: '$450', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Full bed bug and egg elimination.', detail: 'Complete bed bug treatment including eggs and harbourage areas.' },
  { n: 7, pestType: 'moth', name: 'Clothes & carpet moth', price: '$385', open: false, duration: '90 minutes', propertyType: 'All', inclusions: 'Treatment of all moth-affected textile areas.', detail: 'Targeted treatment for clothes and carpet moth infestations.' },
  { n: 8, pestType: 'cobweb', name: 'Cobweb removal', price: 'from $125', open: false, duration: '30–60 minutes', propertyType: 'Single / Double-story', inclusions: 'Full exterior and interior cobweb removal.', detail: 'Comprehensive cobweb removal as an extra service alongside pest treatment.' },
  { n: 8.5, pestType: 'spider', name: 'Spider treatment', price: 'from $290', open: false, duration: '45–60 minutes', propertyType: 'All residential homes', inclusions: 'Full exterior and interior spider treatment. Web removal and targeted spray.', detail: 'Targeted spider treatment for common house spiders, redbacks, white-tails and funnel webs. Residual spray applied to all entry points, eaves, and harbourage areas.' },
  { n: 9, pestType: 'flea', name: 'Fleas', price: '$385', open: false, duration: '45 minutes', propertyType: 'All', inclusions: 'Pet-safe flea treatment breaking the lifecycle.', detail: 'Targeted flea treatment designed for homes with pets.' },
  { n: 10, pestType: 'cockroach', name: 'German Cockroach', price: '$250', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Gel baits and targeted sprays for German cockroaches.', detail: 'Highly effective treatment for German cockroach infestations in kitchens and bathrooms.' },
  { n: 11, pestType: 'mouse', name: 'Mice & rat treatment', price: '$200', open: false, duration: '40 minutes', propertyType: 'All', inclusions: 'Bait stations, entry point sealing, monitoring.', detail: 'Targeted rodent treatment using secure bait stations and entry point sealing.' },
  { n: 12, pestType: 'mouse', name: 'Mice & rat removal', price: '$280', open: false, duration: '30–45 minutes', propertyType: 'All', inclusions: 'Physical removal of rodents and dead rodent clearance.', detail: 'Safe removal and disposal of mice and rats from your property.' },
  { n: 13, pestType: 'mosquito', name: 'Mosquitos and flies', price: '$385', open: false, duration: '60 minutes', propertyType: 'All', inclusions: 'Breeding site treatment, residual spray application.', detail: 'Targeted mosquito and fly treatment to reduce populations around your home.' },
  { n: 14, pestType: 'possum', name: 'Possum removal', price: 'from $450', open: false, duration: '30–60 minutes', propertyType: 'Single / Double-story', inclusions: 'Licensed humane possum removal and entry sealing.', detail: 'Humane, licensed possum removal from roof voids with entry-point proofing.' },
  { n: 15, pestType: 'silverfish', name: 'Silverfish', price: '$299', open: false, duration: '40 minutes', propertyType: 'All', inclusions: 'Treatment of silverfish harbourage areas.', detail: 'Targeted treatment to eliminate silverfish from bookshelves, wardrobes, and bathrooms.' },
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

function CheckMark() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1cdc38]" aria-hidden>
      <svg className="h-3 w-3 text-[#414042]" viewBox="0 0 12 12" fill="currentColor">
        <path d="M10.3 2.3a1 1 0 00-1.4 0L4.5 6.7 3.1 5.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l5-5a1 1 0 000-1.4z" />
      </svg>
    </span>
  );
}

// ── Pest illustration icons matching Figma circular badge style ──────────────
type PestType =
  | 'magnify' | 'ant' | 'bird' | 'nest' | 'bedbug' | 'moth' | 'cobweb'
  | 'flea' | 'cockroach' | 'mouse' | 'mosquito' | 'possum' | 'silverfish'
  | 'termite' | 'wasp' | 'spider';

const G = '#38B44A'; // Figma green for outlined pest icons

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
      <line x1="5" y1="8" x2="2" y2="5" stroke={G} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="6.5" y1="7" x2="5" y2="3.5" stroke={G} strokeWidth="1.2" strokeLinecap="round"/>
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
  spider: (<></>) as React.ReactNode, // uses Figma spider.svg image directly
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
            <span className="inline bg-[#1cdc38] [box-decoration-break:clone] px-2 text-[#414042]">
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
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#1cdc38] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#414042] shadow-lg transition-colors hover:bg-[#0d402e] hover:text-white sm:text-base"
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
      <div className="bg-[#f8f5f2] px-4 py-4 text-center">
        <a
          href="#pest-price-list"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#f8f5f2] px-6 py-2.5 text-[15px] font-semibold tracking-tight text-[#414042] ring-1 ring-[#c8c8c8] transition-colors hover:bg-[#1cdc38] hover:text-white hover:ring-[#1cdc38]"
        >
          Go to pest solutions and price list ↓
        </a>
      </div>

      {/* ===================== TERMITE — ONE UNIFIED BRIGHT GREEN SECTION ===================== */}
      {/* NOT edge-to-edge per Figma: outer bg is off-white, inner rounded green card */}
      <section className="bg-[#f8f5f2] px-3 py-3 sm:px-4">
        <div className="rounded-2xl bg-[#1cdc38] px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-3xl">
            {/* "We're termite specialists" — italic label */}
            <p className="mb-5 text-center text-[16px] font-medium italic text-[#f8f5f2]">
              We&apos;re termite specialists
            </p>

            {/* Icon + heading row */}
            <div className="mb-6 flex items-start gap-4">
              <TermiteStopIcon />
              <h2 className="text-[22px] font-bold leading-tight text-[#414042] sm:text-[28px] md:text-[32px]">
                We stop termites dead in their tracks
              </h2>
            </div>

            {/* Termite inspection $399 details */}
            <h3 className="mb-4 text-[18px] font-bold text-[#414042] sm:text-[20px]">
              Termite inspection{' '}
              <span className="text-[#414042]">$399</span>
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
                <dd className="italic ml-0">Visual and technical inspection of exterior and interior of property, including gardens</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="font-bold italic">Tools used:</dt>
                <dd className="italic ml-0">Moisture detection, Noise detection, keyhole camera</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="font-bold italic">Verbal and written report:</dt>
                <dd className="italic ml-0">Findings and recommendations documented.</dd>
              </div>
            </dl>

            <p className="mb-3 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
              We conduct a detailed inspection in and around your home including in roof cavities and under the house.
              We use the latest technology to detect and diagnose extent of any termite activity.
            </p>
            <p className="mb-8 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
              A verbal and written assessment is provided with recommended course of action. The price of inspection
              is deducted from further treatment or preventative action.
            </p>

            {/* Important! — uses Figma important.svg (white circle + vivid green !) */}
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/important.svg" alt="" aria-hidden className="h-[58px] w-[58px] shrink-0" />
              <div>
                <p className="mb-1 text-[18px] font-black italic text-[#f8f5f2]">Important!</p>
                <p className="text-[14px] font-black italic leading-[1.5] text-[#f8f5f2] sm:text-[15px]">
                  Do not disturb termites if you see or suspect termite activity. They move to other areas if you disturb them!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PRICE CALCULATOR ===================== */}
      <PriceCalculator />

      {/* ===================== SAME DAY SERVICE CTA — uses Figma Group 350.svg ===================== */}
      <section className="bg-[#0d402e] py-8 sm:py-10">
        <a href={SITE_CONFIG.phoneTel} className="mx-auto block max-w-[360px] px-4" aria-label="Same day service available. Call now!">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/icons/group-350.svg" alt="Same day service available. Call now!" className="h-auto w-full" />
        </a>
      </section>

      {/* ===================== GOOGLE REVIEW CARD ===================== */}
      <section className="bg-[#0d402e] px-4 pb-8 sm:px-6 sm:pb-10">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl bg-[#f8f5f2] p-5 shadow-md">
            {/* Lime green staircase bars — Figma accent */}
            <div className="mb-3 space-y-[3px]">
              <div className="h-[3px] w-1/3 rounded-full bg-[#64ff01]" />
              <div className="h-[3px] w-1/2 rounded-full bg-[#64ff01]" />
            </div>
            <div className="mb-3 flex gap-0.5">
              {[0,1,2,3,4].map((s) => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="mb-3 text-[14px] leading-[1.6] text-[#414042]">
              &ldquo;Zapit were great to deal with and I felt confidant they took my cats safety seriously&rdquo;
            </p>
            <p className="text-sm font-semibold text-[#1cdc38]">Jenny, Hawthorn resident</p>
          </div>
        </div>
      </section>

      {/* ===================== THE MORE YOU PROTECT ===================== */}
      {/* NOT edge-to-edge per Figma */}
      <section className="bg-white px-3 py-3 sm:px-4">
        <div className="rounded-2xl bg-[#1cdc38] px-5 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-5 text-[24px] font-bold leading-tight text-[#414042] sm:text-[28px] md:text-[32px]">
              The more you protect,<br />the more you save
            </h2>
            {/* save20.svg — Figma off-white ellipse badge with "Save 20%" text + descriptor */}
            <div className="flex items-start gap-4 rounded-2xl bg-white px-4 py-4 text-left shadow-sm sm:px-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/save20.svg" alt="Save 20%" className="h-[75px] w-[75px] shrink-0" />
              <p className="mt-1 text-[14px] leading-[1.6] text-[#414042] sm:text-[15px]">
                Save 20% on the total cost of the job when you purchase two or more treatments that we service on the same day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PEST SOLUTIONS AND PRICE LIST ===================== */}
      <section id="pest-price-list" className="bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-[24px] font-bold leading-tight text-[#414042] sm:text-[26px] md:text-[28px]">
            Pest solutions and price list
          </h2>
          <div className="space-y-2">
            {PEST_PRICE_LIST.map((item) => (
              <details key={item.n} className="group rounded-xl border border-[#e5e5e5] bg-white shadow-sm" open={item.open}>
                <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 sm:px-5">
                  {/* Pest illustration icon — outlined circle per Figma */}
                  <PestIcon type={item.pestType} />
                  <span className="flex-1 text-[15px] font-bold text-[#414042] group-open:text-[#38B44A] sm:text-base">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-[15px] font-bold text-[#414042] sm:text-base">{item.price}</span>
                  {/* Closed → grey + | Open → dark × per Figma */}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center font-bold text-lg leading-none">
                    <span className="text-[#AFAAA4] group-open:hidden">+</span>
                    <span className="hidden text-[#414042] group-open:inline">×</span>
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
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Intro — vivid green italic text per Figma */}
          <p className="text-center text-[18px] italic leading-[1.6] text-[#1cdc38] sm:text-[20px]">
            Your health and safety are at the heart of everything we do, supported by industry-leading technology.
          </p>

          {/* Protection you can trust */}
          <div>
            <div className="mb-2 space-y-[3px]">
              <div className="h-[4px] w-[30%] rounded-full bg-[#64ff01]" />
              <div className="h-[4px] w-[45%] rounded-full bg-[#64ff01]" />
              <div className="h-[4px] w-[60%] rounded-full bg-[#64ff01]" />
            </div>
            <p className="text-[22px] font-normal leading-[1.2] text-[#f8f5f2] sm:text-[23px]">
              Protection you can trust<br />
              <span className="text-[18px] font-normal text-[#f8f5f2]/80">We have serviced over 20,000 homes in Melbourne</span>
            </p>
            <p className="mt-3 text-center text-[18px] italic leading-[1.6] text-[#1cdc38] sm:text-[20px]">
              We know pets can get into all sorts of mischief which is why we take every measure to keep your much loved pets safe and sound.
            </p>
          </div>

          {/* We treat your home as if it were ours */}
          <div>
            <div className="mb-2 space-y-[3px]">
              <div className="h-[4px] w-[30%] rounded-full bg-[#64ff01]" />
              <div className="h-[4px] w-[50%] rounded-full bg-[#64ff01]" />
              <div className="h-[4px] w-[65%] rounded-full bg-[#64ff01]" />
            </div>
            <p className="text-[22px] font-normal leading-[1.2] text-[#f8f5f2] sm:text-[23px]">
              We treat your home as if it were ours<br />
              <span className="text-[18px] font-normal text-[#f8f5f2]/80">Your satisfaction is our highest priority</span>
            </p>
            <p className="mt-3 text-center text-[18px] italic leading-[1.6] text-[#1cdc38] sm:text-[20px]">
              Whether you live in a one-bedroom flat, high-rise apartment, semi-detached townhouse or large family home, we have you covered.
            </p>
          </div>

          {/* We're high rise specialists */}
          <div>
            <div className="mb-2 space-y-[3px]">
              <div className="h-[4px] w-[35%] rounded-full bg-[#64ff01]" />
              <div className="h-[4px] w-[55%] rounded-full bg-[#64ff01]" />
              <div className="h-[4px] w-[72%] rounded-full bg-[#64ff01]" />
            </div>
            <p className="text-[22px] font-normal leading-[1.2] text-[#f8f5f2] sm:text-[23px]">
              We&apos;re high rise specialists<br />
              <span className="text-[18px] font-normal text-[#f8f5f2]/80">We have quickly become specialists in high rise pest protection</span>
            </p>
            <p className="mt-3 text-center text-[18px] italic leading-[1.6] text-[#1cdc38] sm:text-[20px]">
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
                <CheckCircle2 className="h-7 w-7 text-[#1cdc38]" strokeWidth={2.25} />
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
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1cdc38]" />
              <span><strong className="text-[#131a1c]">The Australian Environmental Pest Managers Association</strong> — Certificate number XXX-XXX</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1cdc38]" />
              <span><strong className="text-[#131a1c]">HACCP Food Safety Certificate</strong> — Certificate number XXX-XXX</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1cdc38]" />
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
