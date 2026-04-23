'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, Minus, Plus, Star, BadgeCheck } from 'lucide-react';
import { SITE_CONFIG, HOMEPAGE_FAQS } from '@/lib/constants';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Zap+It+Pest+%26+Termite+Control+Melbourne+Reviews';

const WP = '/images/wp-assets';

const REVIEWS: {
  name: string;
  initial: string;
  initialBg: string;
  timeAgo: string;
  text: string;
}[] = [
  {
    name: 'Margo Kelly',
    initial: 'M',
    initialBg: 'bg-[#1a73e8]',
    timeAgo: '2 months ago',
    text: 'Fantastic pest control service in Melbourne. We contacted them for our commercial pest control and were impressed with how quickly they identified and treated the problem. They assisted us with rodent control and the improvement was noticeable straight away. Professional, friendly, and extremely effective.',
  },
  {
    name: 'Jemi Audi',
    initial: 'J',
    initialBg: 'bg-[#0f9d58]',
    timeAgo: '3 months ago',
    text: "Amazing job honestly I've never had pest control that can get rid of all type of bugs, insects and or booklice like this company. Thorough, professional, and the difference was clear from the first visit.",
  },
  {
    name: 'Tammy Fox',
    initial: 'T',
    initialBg: 'bg-[#5f6368]',
    timeAgo: '1 month ago',
    text: 'Excellent experience with Zap It Pest Control. Professional, reliable, and easy to deal with. The technician was friendly, on time, and explained the treatment in plain language. We would book again in a heartbeat.',
  },
];

const PEST_TABS = [
  {
    id: 'bedbugs',
    label: 'Bed Bug Control',
    title: 'Bed Bug Pest Control Melbourne',
    copy:
      "Bed bugs can turn a peaceful night's sleep into a nightmare. Don't let itchy welts and restless nights take a toll on your health. Our professional bed bug control services guarantee 100% elimination of bed bugs and their eggs in a single session. Enjoy a bed bug–free home within just 24 hours.",
    href: '/bed-bug-control-melbourne',
  },
  {
    id: 'possum',
    label: 'Possum Control',
    title: 'Possum Control Melbourne',
    copy:
      'Possums may look harmless, but when they invade your roof or ceiling, they can cause serious damage and sleepless nights. Their constant scratching, droppings, and chewing on electrical wires can lead to costly repairs and even fire hazards. Protect your home and family with professional possum control in Melbourne. Our licensed experts use industry-best methods to safely remove possums and prevent them from returning. Hire the most trusted pest control team in Melbourne and enjoy a peaceful, possum-free home.',
    href: '/possum-removal-melbourne',
  },
  {
    id: 'ants',
    label: 'Ants Elimination',
    title: 'Ant Control',
    copy:
      "Did you know that the ant you spotted in your kitchen is not the only one? There's a chain of ants marching behind, forming a superhighway through your kitchen. Don't let these small insects ruin your food and cooking space because your health comes first. Let us eliminate the queen and clear your space of these uninvited guests.",
    href: '/ant-pest-control-melbourne',
  },
  {
    id: 'birds',
    label: 'Birds Protection',
    title: 'Bird Control',
    copy:
      "Who likes bird droppings when they're actually destroying your property? Obviously, no one wants birds leaving waste on their furniture and home, as it's acidic and can damage roofs, doors, windows, and awnings, and is difficult to remove for untrained hands. That's why you should buy our bird pest control services and let experts use physical deterrents to protect your property.",
    href: '/birds-control-melbourne',
  },
  {
    id: 'fleas',
    label: 'Flea & Tick Prevention',
    title: 'Flea and Tick Solutions',
    copy:
      "Fleas and ticks pose a serious threat to the health of your pets and family, as they can cause significant health issues. Protect your home from the inside out with our pet-safe solution. Don't let ticks transmit Lyme disease—book an inspection today and keep your loved ones safe.",
    href: '/flea-control-melbourne',
  },
  {
    id: 'flying',
    label: 'Flying Insects Control',
    title: 'Flying Insect Controls',
    copy:
      'The most dangerous thing about flying insects like flies and mosquitoes is their ability to move from garbage to your food, putting your health at risk even while you eat a healthy meal. Mosquitoes can transmit dengue fever and Ross River virus, which can be fatal. Hire the best pest controllers in Melbourne and enjoy a pest-free life.',
    href: '/fly-control-melbourne',
  },
] as const;

const TAB_IMAGE = `${WP}/2025-10-imgi_22_Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp`;

export function HomepageReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === 'left' ? -w : w, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="lg:w-[220px] flex-shrink-0 text-center lg:text-left">
          <p className="text-lg font-extrabold text-[#2B2B2B] tracking-wide">EXCELLENT</p>
          <div className="flex justify-center lg:justify-start gap-0.5 my-2">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star key={s} className="h-6 w-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm text-[#636363]">
            Based on <strong className="text-[#2B2B2B]">{SITE_CONFIG.rating.count} reviews</strong>
          </p>
          <div className="mt-3 flex justify-center lg:justify-start">
            <Image src="/images/logo/google-g.png" alt="Google" width={100} height={32} className="h-8 w-auto" />
          </div>
        </div>

        <div className="relative flex-1 min-w-0">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 h-10 w-10 rounded-full border border-gray-200 bg-white shadow-md items-center justify-center text-[#2B2B2B] hover:bg-[#F7F7F7] hidden md:flex"
            aria-label="Scroll reviews left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 h-10 w-10 rounded-full border border-gray-200 bg-white shadow-md items-center justify-center text-[#2B2B2B] hover:bg-[#F7F7F7] hidden md:flex"
            aria-label="Scroll reviews right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-0 md:px-10 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {REVIEWS.map((rev) => (
              <ReviewCard key={rev.name} rev={rev} />
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center min-h-[48px] bg-[#0DC429] text-white text-base font-semibold uppercase tracking-wide px-10 py-3 rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] hover:opacity-95"
        >
          REVIEWS
        </a>
      </div>
    </div>
  );
}

function ReviewCard({ rev }: { rev: (typeof REVIEWS)[number] }) {
  return (
    <div className="ti-review-card min-w-[min(100%,300px)] md:min-w-0 flex-shrink-0 snap-center flex flex-col h-full">
      <div className="flex items-start gap-3 mb-2">
        <div
          className={`h-10 w-10 rounded-full ${rev.initialBg} flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}
          aria-hidden
        >
          {rev.initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="ti-review-author">{rev.name}</span>
            <Image src="/images/logo/google-g.png" alt="" width={14} height={14} className="h-3.5 w-3.5" />
          </div>
          <p className="ti-review-meta">{rev.timeAgo}</p>
          <div className="ti-review-stars mt-1 !flex !items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star key={s} className="h-[18px] w-[18px] fill-amber-400 text-amber-400" />
            ))}
            <BadgeCheck className="h-4 w-4 text-blue-500 flex-shrink-0 ml-0.5" aria-label="Verified" />
          </div>
        </div>
      </div>
      <p className="ti-review-text flex-1">&ldquo;{rev.text}&rdquo;</p>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-[#0DC429] hover:underline mt-3"
      >
        Read more
      </a>
    </div>
  );
}

export function HomepagePestServiceTabs() {
  const [active, setActive] = useState(0);
  const [sectionEl, setSectionEl] = useState<HTMLDivElement | null>(null);
  const tab = PEST_TABS[active];

  const onTab = (idx: number) => {
    setActive(idx);
    if (typeof window !== 'undefined' && window.innerWidth < 900 && sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={setSectionEl} className="max-w-[1200px] mx-auto bg-[#f9fafb] rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center p-6 md:p-8">
        <div>
          <h3 className="text-[22px] font-bold text-black mb-4">{tab.title}</h3>
          <p className="text-[16px] leading-[1.6] text-[#636363] mb-6">{tab.copy}</p>
          <Link
            href={tab.href}
            className="zapit-learn-more-btn"
          >
            Learn More
          </Link>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.2)]">
          <Image src={TAB_IMAGE} alt={tab.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>

      <div className="flex w-full border-t border-gray-200">
        {PEST_TABS.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onTab(idx)}
            className={`flex-1 py-3 px-1 text-xs sm:text-sm font-semibold text-center transition-colors border-r last:border-r-0 border-gray-200 ${
              active === idx
                ? 'bg-[#0DC429] text-white'
                : 'bg-white text-[#0DC429] hover:bg-[#0DC429]/10'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function HomepageFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {HOMEPAGE_FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="border-b border-gray-200 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex items-center w-full text-left py-5 gap-3 bg-transparent"
              aria-expanded={isOpen}
            >
              <span className="text-[#252c33] flex-shrink-0 w-5 flex items-center justify-center">
                {isOpen ? <Minus className="h-4 w-4" strokeWidth={2.5} /> : <Plus className="h-4 w-4" strokeWidth={2.5} />}
              </span>
              <span className="text-[17px] font-semibold text-[#252c33]">{faq.question}</span>
            </button>
            {isOpen && (
              <div className="ml-8 mb-5 border border-gray-200 rounded-lg p-5 bg-white">
                <p className="text-[16px] leading-[1.7] text-[#636363]">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const CTA_LINES = [
  '200% Money Back Guarantee',
  'Industry Leaders in Pest Control',
  'Local, Licensed and Insured',
  'Latest Technologies and Techniques',
  'FREE Quote',
] as const;

export function HomepageCtaChecklist() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= CTA_LINES.length) return;
    const t = window.setTimeout(() => setVisible((v) => v + 1), 320);
    return () => window.clearTimeout(t);
  }, [visible]);

  return (
    <ul className="space-y-1 text-white text-[18px] font-medium mt-6" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>
      {CTA_LINES.map((line, i) => (
        <li
          key={line}
          className={`flex items-center gap-3 min-h-[52px] transition-all duration-500 ${
            i < visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
          }`}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
            <Check className="h-4 w-4 text-[#0DC429]" strokeWidth={2.5} />
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

type RegionId = 'inner' | 'north' | 'southeast' | 'east' | 'west';

const MELBOURNE_REGIONS: {
  id: RegionId;
  label: string;
  heading: string;
  description: string;
  features: string[];
}[] = [
  {
    id: 'inner',
    label: 'Melbourne Inner',
    heading: 'CBD & Inner City Melbourne - Pest Specialists',
    description:
      "It doesn't matter if you are living in a high-rise or a suburb; cockroaches and other pests know the best way to your space. That's why you need our effective and affordable pest control solutions in Melbourne to save your high-rise and heritage properties.",
    features: [
      'CBD Coverage',
      'High-rise Specialists',
      '24/7 Emergency',
      'Heritage Properties',
      'Discreet Service',
      'Commercial Focus',
    ],
  },
  {
    id: 'north',
    label: 'Melbourne North',
    heading: 'Melbourne North',
    description:
      'From Brunswick to Preston, Melbourne North suburbs need targeted pest management for both residential and industrial zones.',
    features: [
      'Brunswick Coverage',
      'Residential Services',
      'Industrial Areas',
      'Family-safe Treatments',
      'Neighborhood Focus',
      'Quick Response',
    ],
  },
  {
    id: 'southeast',
    label: 'Melbourne South East',
    heading: 'Melbourne South East',
    description:
      'High-end suburbs in Melbourne South East including St Kilda and Brighton, require premium pest control services tailored for luxury homes.',
    features: [
      'Premium Suburbs',
      'Coastal Management',
      'Luxury Homes',
      'Discreet Approach',
      'Quality Focus',
      'Property Protection',
    ],
  },
  {
    id: 'east',
    label: 'Melbourne East',
    heading: 'Melbourne East',
    description:
      'In Melbourne East, places like Richmond and Glen Waverley have everything from heritage homes to modern builds—and each one needs pest control that fits just right.',
    features: [
      'Diverse Properties',
      'Family Homes',
      'Apartment Services',
      'Suburban Areas',
      'Flexible Solutions',
      'Local Expertise',
    ],
  },
  {
    id: 'west',
    label: 'Melbourne West',
    heading: 'Melbourne West',
    description:
      'Communities across Melbourne West, including Footscray and Altona, require reliable and comprehensive pest management for both new and older homes.',
    features: [
      'Growing Suburbs',
      'New Developments',
      'Community Focus',
      'All Property Types',
      'Comprehensive Service',
      'Local Knowledge',
    ],
  },
];

export function HomepageMelbourneCoverage() {
  const [region, setRegion] = useState<RegionId>('inner');
  const data = MELBOURNE_REGIONS.find((r) => r.id === region) ?? MELBOURNE_REGIONS[0];
  const stats = SITE_CONFIG.stats;

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
      <div className="bg-[#252C33] text-white rounded-xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
        <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">
          Why Choose Zap It Pest &amp; Termite Control Melbourne Services?
        </h3>
        <p className="mt-3 text-sm md:text-base text-white/85 leading-relaxed">
          Melbourne&apos;s most experienced pest control experts with licenses and certifications are available to provide
          emergency pest control services across Melbourne within hours of the call.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-[#0DC429]">{stats.emergenciesSolved}</p>
            <p className="text-xs md:text-sm text-white/80 mt-1">Pest Emergencies Solved</p>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-[#0DC429]">{stats.yearsExperience}</p>
            <p className="text-xs md:text-sm text-white/80 mt-1">Years of Experience in Protecting Homes</p>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-[#0DC429]">{stats.firstVisitSuccess}</p>
            <p className="text-xs md:text-sm text-white/80 mt-1">First Visit Success Rate</p>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-[#0DC429]">{stats.availability}</p>
            <p className="text-xs md:text-sm text-white/80 mt-1">Emergency Response Team</p>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-[#0DC429]/15 border border-[#0DC429]/20 px-4 py-4 text-center">
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm mb-1">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0DC429] text-white text-lg">⚡</span>
            <span>Average Response Time</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-[#0DC429] italic">{stats.responseTime}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 md:p-8 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {MELBOURNE_REGIONS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRegion(r.id)}
              className={`px-2.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md border-2 transition-colors ${
                region === r.id
                  ? 'bg-[#0DC429] text-white border-[#0DC429]'
                  : 'bg-white text-zapit-heading-dark border-zapit-body-text/30 hover:border-[#0DC429]/50'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <h4 className="text-lg md:text-xl font-bold text-zapit-heading-dark">{data.heading}</h4>
        <p className="mt-2 text-zapit-body-text text-[15px] md:text-[17px] leading-relaxed">{data.description}</p>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-zapit-heading-dark">
          {data.features.map((f) => (
            <li key={f} className="flex items-center gap-2 before:content-['✓'] before:text-[#0DC429] before:font-bold">
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
          <a
            href={SITE_CONFIG.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center bg-[#0DC429] hover:bg-[#0aab22] text-white text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded-lg shadow-sm text-center"
          >
            Get a Free Quote Now
          </a>
          <Link
            href="/service-areas"
            className="inline-flex min-h-[48px] items-center justify-center bg-[#0DC429] hover:bg-[#0aab22] text-white text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded-lg shadow-sm text-center"
          >
            Explore Service Areas
          </Link>
        </div>
      </div>
    </div>
  );
}

const PRICING_DATA = [
  { service: 'Clothes & Carpet Moth Treatment', type: 'All', price: '$385', duration: '90' },
  { service: 'German Cockroach Treatment', type: 'All', price: '$249.99', duration: '60' },
  { service: 'Bed Bugs', type: 'All', price: '$450', duration: '60' },
  { service: 'Ant Treatment', type: 'All', price: '$239', duration: '45' },
  { service: 'Specialised Ant Elimination', type: 'All', price: '$450', duration: '60' },
  { service: 'Silverfish Treatment', type: 'All', price: '$299.99', duration: '40' },
  { service: 'Mosquitos, Flies Treatment', type: 'All', price: '$385', duration: '60' },
  { service: 'Fleas Treatment', type: 'All', price: '$385', duration: '45' },
  { service: 'Termite Inspections', type: 'All', price: '$399', duration: '120' },
  { service: 'Mice & Rat Treatment', type: 'All', price: '$200', duration: '40' },
  { service: 'Cobweb Removal (Extra Service)', type: 'Single-story', price: '$125', duration: '30' },
  { service: '', type: 'Double-story', price: '$250', duration: '60' },
  { service: 'General Inspection', type: 'All', price: '$100', duration: '30' },
  { service: 'Rodent Removal', type: 'All', price: '$380', duration: '30' },
  { service: 'Initial Business Setup', type: 'All', price: '$129', duration: '60' },
  { service: 'Wasp Control', type: 'All', price: '$250', duration: '60' },
  { service: 'Possum Treatment', type: 'Single-story', price: '$450', duration: '30' },
  { service: '', type: 'Double-story', price: '$630', duration: '60' },
  { service: 'Bird Control', type: 'Single-story', price: '$450', duration: '30' },
  { service: '', type: 'Double-story', price: '$650', duration: '60' },
  { service: 'Bird Nest Removal', type: 'Single-story', price: '$450', duration: '30' },
  { service: '', type: 'Double-story', price: '$650', duration: '60' },
  { service: 'Spider & General Pest Treatment', type: 'Single-story', price: '$290', duration: '60' },
  { service: '', type: 'Double-story', price: '$335', duration: '60' },
  { service: '', type: 'Other', price: '$275', duration: '60' },
] as const;

export function HomepagePricing() {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0DC429] text-white">
              <th className="px-4 py-3 text-sm font-semibold">Service Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-center">Property Type</th>
              <th className="px-4 py-3 text-sm font-semibold text-center">Price (AUD) without GST</th>
              <th className="px-4 py-3 text-sm font-semibold text-center">Duration (Minutes)</th>
            </tr>
          </thead>
          <tbody>
            {PRICING_DATA.map((row, i) => (
              <tr
                key={`${row.service || 'sub'}-${row.type}-${i}`}
                className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#0DC429]/5 transition-colors`}
              >
                <td className="px-4 py-3 text-sm text-[#252c33] font-medium">{row.service}</td>
                <td className="px-4 py-3 text-sm text-[#636363] text-center">{row.type}</td>
                <td className="px-4 py-3 text-sm text-[#252c33] font-semibold text-center">{row.price}</td>
                <td className="px-4 py-3 text-sm text-[#636363] text-center">{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-[#252c33]">
        <p><strong>Note:</strong> Prices shown are base rates (before discounts &amp; GST).</p>
        <p><strong>Discounts:</strong> 2 services → 22.5% off | 3+ services → 27.5% off</p>
        <p><strong>GST:</strong> Add 10% when selecting &quot;Inc GST&quot;.</p>
      </div>
    </div>
  );
}

export function HomepagePestCards() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const cards = [
    {
      title: 'Residential Property Owners',
      sub: 'Pest-Free Home Guaranteed',
      more: (
        <p>
          Pests pose a serious threat to your property and wellbeing. Our licensed experts use eco-friendly or DHHS approved
          solutions to eliminate dangerous pests quickly and safely. Book today and enjoy same-day service to protect your
          home and family.
        </p>
      ),
      href: '/residential',
      img: `${WP}/2025-06-icons8-residential-64.webp`,
      alt: 'Residential Pest Control',
    },
    {
      title: 'Commercial Business Owners',
      sub: 'Customer-Friendly Environment Guaranteed',
      more: (
        <p>
          Imagine what one viral customer post capturing a cockroach in your restaurant can do? It can cost you the business
          reputation that you&apos;ve built over the years. We are here to rescue you by providing complete pest control
          melbourne services, from{' '}
          <Link href="/fly-control-melbourne" className="text-[#0DC429] underline font-medium">
            Eliminating flies
          </Link>{' '}
          to{' '}
          <Link href="/wasp-removal-melbourne" className="text-[#0DC429] underline font-medium">
            wasps
          </Link>
          . Book a free business inspection today!
        </p>
      ),
      href: '/commercial-pest-control',
      img: `${WP}/2025-06-icons8-business-building-64.webp`,
      alt: 'Commercial Pest Control',
    },
    {
      title: 'Termite Risk Structures',
      sub: 'Healthy-Property Protection Guaranteed',
      more: (
        <p>
          Termites are the silent killers, slowly eating up the wood of your home or business, either in the walls, flooring,
          or kitchen. Don&apos;t let termites damage your property. We offer DHHS approved termite control solutions in
          Melbourne at affordable prices. Call now and save your property.
        </p>
      ),
      href: '/termite-control-melbourne',
      img: `${WP}/2025-06-icons8-animal-64-1.webp`,
      alt: 'Termite Pest Control',
    },
  ] as const;

  useEffect(() => {
    if (!isTouch) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('.pest-card')) setActiveIdx(0);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [isTouch]);

  const onCardClick = (idx: number) => {
    if (!isTouch) return;
    setActiveIdx((prev) => (prev === idx ? 0 : idx));
  };

  return (
    <div className="pest-cards max-w-[1200px] mx-auto px-0 sm:px-0">
      <h2 className="our-services-heading">Who Can Benefit From Our Pest Control Melbourne Services?</h2>
      {cards.map((c, idx) => (
        <div
          key={c.title}
          className={`pest-card${idx === activeIdx ? ' active' : ''}${idx === 2 ? ' pest-card-highlight' : ''}`}
          onMouseEnter={() => !isTouch && setActiveIdx(idx)}
          onFocus={() => !isTouch && setActiveIdx(idx)}
          onClick={() => onCardClick(idx)}
          role="group"
        >
          <div className="pest-card-content">
            <div className="pest-card-title">
              <h3 className="!text-black !text-[22px]">{c.title}</h3>
            </div>
            <div className="pest-card-subtext">{c.sub}</div>
            <div className="pest-card-more">{c.more}</div>
            <Link href={c.href} className="pest-card-btn" onClick={(e) => e.stopPropagation()}>
              Learn More
            </Link>
          </div>
          <div className="pest-card-img">
            <Image src={c.img} alt={c.alt} width={80} height={80} className="rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
