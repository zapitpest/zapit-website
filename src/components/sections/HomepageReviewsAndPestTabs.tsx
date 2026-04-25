'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Minus, Plus, Star } from 'lucide-react';
import { SITE_CONFIG, HOMEPAGE_FAQS } from '@/lib/constants';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Zap+It+Pest+%26+Termite+Control+Melbourne+Reviews';

const WP = '/images/wp-assets';

const REVIEWS: {
  name: string;
  initial: string;
  initialBg: string;
  suburb: string;
  timeAgo: string;
  text: string;
}[] = [
  {
    name: 'Jane S.',
    initial: 'J',
    initialBg: 'bg-[#1a73e8]',
    suburb: 'Heidelberg',
    timeAgo: '2 weeks ago',
    text: 'Sorted the problem fast. No mess, no fuss. Would call them again without hesitation.',
  },
  {
    name: 'Marcus T.',
    initial: 'M',
    initialBg: 'bg-[#0f9d58]',
    suburb: 'Bundoora',
    timeAgo: '1 month ago',
    text: 'Professional team. On time, explained everything clearly. Pests are gone and haven\'t come back.',
  },
  {
    name: 'Margo Kelly',
    initial: 'M',
    initialBg: 'bg-[#e8711a]',
    suburb: 'Preston',
    timeAgo: '2 months ago',
    text: 'Fantastic pest control service. They assisted us with rodent control and the improvement was noticeable straight away. Professional and extremely effective.',
  },
  {
    name: 'Jemi Audi',
    initial: 'J',
    initialBg: 'bg-[#5f6368]',
    suburb: 'Reservoir',
    timeAgo: '3 months ago',
    text: "Amazing job honestly. Thorough, professional, and the difference was clear from the first visit.",
  },
  {
    name: 'Tammy Fox',
    initial: 'T',
    initialBg: 'bg-[#9c27b0]',
    suburb: 'Eltham',
    timeAgo: '1 month ago',
    text: 'Excellent experience. The technician was friendly, on time, and explained the treatment in plain language.',
  },
];

const PEST_TABS = [
  {
    id: 'bedbugs',
    label: 'Bed Bug Control',
    title: 'Bed Bug Pest Control Melbourne',
    copy:
      "Bed bugs can disrupt your sleep and comfort. Our professional bed bug control services provide thorough elimination of bed bugs and their eggs in a single session. Enjoy a peaceful, bed bug–free home within just 24 hours.",
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
      'Flying insects like flies and mosquitoes are more than just a nuisance — they can carry bacteria between surfaces and affect your family\'s wellbeing. Our effective fly and mosquito control solutions help you enjoy your home and outdoor spaces in comfort and peace of mind.',
    href: '/fly-control-melbourne',
  },
] as const;

const TAB_IMAGE = `${WP}/2025-10-imgi_22_Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp`;

export function HomepageReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 2) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 290, behavior: 'smooth' });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Figma-style horizontal strip: rating left, reviews scrolling right */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Left — rating badge */}
        <div className="shrink-0 flex flex-col items-center sm:items-start gap-1 sm:min-w-[160px]">
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-extrabold text-[#131a1c] leading-none">4.9</span>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <p className="text-[13px] font-bold uppercase tracking-wide text-[#131a1c]">EXCELLENT</p>
          <p className="flex items-center gap-1.5 text-[12px] text-[#636363]">
            <Image src="/images/logo/google-g.png" alt="Google" width={16} height={16} className="h-4 w-4" />
            {SITE_CONFIG.rating.count}+ Google Reviews
          </p>
        </div>

        {/* Right — auto-scrolling review cards */}
        <div className="relative flex-1 min-w-0 overflow-hidden">
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {REVIEWS.map((rev) => (
              <div key={rev.name} className="min-w-[260px] w-[280px] flex-shrink-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex gap-0.5 mb-2">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[13px] leading-[1.6] text-[#414042] line-clamp-3 mb-3">&ldquo;{rev.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-bold text-[#131a1c]">{rev.name}</p>
                    <p className="text-[11px] text-[#636363]">{rev.suburb}</p>
                  </div>
                  <p className="text-[11px] text-[#636363]">{rev.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomepagePestServiceTabs() {
  const [active, setActive] = useState(0);
  const tab = PEST_TABS[active];

  return (
    <div className="max-w-[1200px] mx-auto bg-[#f9fafb] rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-8 items-start p-4 sm:p-6 md:p-8">
        <div className="flex flex-col">
          <h3 className="mb-2 text-[17px] font-bold text-[#131a1c] md:text-[20px] leading-[1.2]">{tab.title}</h3>
          <p className="mb-4 text-[13px] leading-[1.6] text-[#414042] sm:text-[14px] md:text-[15px] line-clamp-5 sm:line-clamp-none">{tab.copy}</p>
          <div>
            <Link href={tab.href} className="zapit-learn-more-btn">
              Learn More
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full min-w-0 max-w-full overflow-hidden rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.15)]">
          <Image src={TAB_IMAGE} alt={tab.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>

      <div className="flex w-full border-t border-gray-200 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PEST_TABS.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(idx)}
            className={`flex min-h-[44px] shrink-0 items-center justify-center border-r border-gray-200 px-3 py-2 text-center text-[11px] font-semibold transition-colors last:border-r-0 sm:px-4 sm:text-[12px] ${
              active === idx
                ? 'bg-[#3fa535] text-white'
                : 'bg-white text-[#3fa535] hover:bg-[#3fa535]/10'
            }`}
            style={{ width: `${100 / PEST_TABS.length}%`, minWidth: '90px' }}
          >
            <span className="block leading-tight">{t.label}</span>
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
              className="flex min-h-[44px] w-full items-center gap-3 bg-transparent py-4 text-left sm:py-5"
              aria-expanded={isOpen}
            >
              <span className="text-[#252c33] flex-shrink-0 w-5 flex items-center justify-center">
                {isOpen ? <Minus className="h-4 w-4" strokeWidth={2.5} /> : <Plus className="h-4 w-4" strokeWidth={2.5} />}
              </span>
              <span className="text-[16px] font-semibold leading-[1.2] text-[#252c33] sm:text-[17px]">
                {faq.question}
              </span>
            </button>
            {isOpen && (
              <div className="ml-4 mb-5 rounded-lg border border-gray-200 bg-white p-4 sm:ml-8 sm:p-5">
                <p className="text-[14px] leading-[1.6] text-[#636363] sm:text-[15px] md:text-[16px]">{faq.answer}</p>
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
    <ul className="space-y-1 text-white text-[18px] font-medium mt-6" style={{ fontFamily: "'Graphik', Arial, Helvetica, sans-serif" }}>
      {CTA_LINES.map((line, i) => (
        <li
          key={line}
          className={`flex items-center gap-3 min-h-[52px] transition-all duration-500 ${
            i < visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
          }`}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
            <Check className="h-4 w-4 text-[#3fa535]" strokeWidth={2.5} />
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
            <p className="text-2xl md:text-3xl font-bold text-[#3fa535]">{stats.emergenciesSolved}</p>
            <p className="text-xs md:text-sm text-white/80 mt-1">Pest Emergencies Solved</p>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-[#3fa535]">{stats.yearsExperience}</p>
            <p className="text-xs md:text-sm text-white/80 mt-1">Years of Experience in Protecting Homes</p>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-[#3fa535]">{stats.firstVisitSuccess}</p>
            <p className="text-xs md:text-sm text-white/80 mt-1">First Visit Success Rate</p>
          </div>
          <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-[#3fa535]">{stats.availability}</p>
            <p className="text-xs md:text-sm text-white/80 mt-1">Emergency Response Team</p>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-[#3fa535]/15 border border-[#3fa535]/20 px-4 py-4 text-center">
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm mb-1">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#3fa535] text-white text-lg">⚡</span>
            <span>Average Response Time</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-[#3fa535] italic">{stats.responseTime}</p>
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
                  ? 'bg-[#3fa535] text-white border-[#3fa535]'
                  : 'bg-white text-zapit-heading-dark border-zapit-body-text/30 hover:border-[#3fa535]/50'
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
            <li key={f} className="flex items-center gap-2 before:content-['✓'] before:text-[#3fa535] before:font-bold">
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
          <a
            href={SITE_CONFIG.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center bg-[#3fa535] hover:bg-[#0d402e] text-white text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded-lg shadow-sm text-center"
          >
            Get a Free Quote Now
          </a>
          <Link
            href="/service-areas"
            className="inline-flex min-h-[48px] items-center justify-center bg-[#3fa535] hover:bg-[#0d402e] text-white text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded-lg shadow-sm text-center"
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
            <tr className="bg-[#3fa535] text-white">
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
                className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#3fa535]/5 transition-colors`}
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
          <Link href="/fly-control-melbourne" className="text-[#3fa535] underline font-medium">
            Eliminating flies
          </Link>{' '}
          to{' '}
          <Link href="/wasp-removal-melbourne" className="text-[#3fa535] underline font-medium">
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
              <h3 className="!text-[18px] !text-black !font-bold md:!text-[22px]">{c.title}</h3>
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
