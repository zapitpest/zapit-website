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
  avatar: string;
  text: string;
}[] = [
  {
    name: 'Matthew Partridge',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocIlGdu43KPIyivb8y8bWMehf8xDKI3KOSuAdQQvMTcWRMRViA=w40-h40-c-rp-mo-br100',
    text: 'Very quick and efficient service. They were courteous and respectful in our home. Report was emailed within minutes of completing the inspection',
  },
  {
    name: 'Ummah',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocLMhmLn3Omr8TpM5tmRUQOHA2QRpnZgrrA2GhTO2m2iBhS8Pw=w40-h40-c-rp-mo-br100',
    text: 'Best Pest control in Melbourne, did our cafe on Burgundy street. Keep up the good work!',
  },
  {
    name: 'Margo Kelly',
    avatar:
      'https://lh3.googleusercontent.com/a/ACg8ocLTUjvoOey5MRRvwTVx9FyN-cwPCq--uAop-uNz6NgbCnxpew=w40-h40-c-rp-mo-ba3-br100',
    text: 'Fantastic pest control service in Melbourne. We contacted them for our commercial pest control and were impressed with how quickly they identified and treated the problem. They assisted us with rodent control and the improvement was noticeable straight away. Professional, friendly, and extremely effective.',
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

function ReviewCard({ rev }: { rev: (typeof REVIEWS)[number] }) {
  return (
    <div className="ti-review-card min-w-[min(100%,300px)] md:min-w-0 flex-shrink-0 snap-center">
      <div className="flex items-start gap-3 mb-2">
        <Image
          src={rev.avatar}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="ti-review-author">{rev.name}</span>
            <Image src="/images/logo/google-g.png" alt="" width={14} height={14} className="h-3.5 w-3.5" />
          </div>
          <div className="ti-review-stars mt-0.5 !flex !items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star key={s} className="h-[18px] w-[18px] fill-amber-400 text-amber-400" />
            ))}
            <BadgeCheck className="h-4 w-4 text-blue-500 flex-shrink-0 ml-0.5" aria-label="Verified" />
          </div>
        </div>
      </div>
      <p className="ti-review-text">&ldquo;{rev.text}&rdquo;</p>
    </div>
  );
}

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
    <div ref={setSectionEl} className="zapit-tabs-section max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center mb-10">
        <div>
          <h3 className="text-[22px] font-bold text-black mb-4">{tab.title}</h3>
          <p className="text-[18px] leading-[25px] text-[#636363] mb-6">{tab.copy}</p>
          <Link
            href={tab.href}
            className="inline-flex items-center justify-center min-h-[48px] bg-[#0DC429] hover:bg-[#0aab22] text-white text-base font-semibold uppercase tracking-wide px-10 py-3 rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)]"
          >
            LEARN MORE
          </Link>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.2)]">
          <Image src={TAB_IMAGE} alt={tab.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
        {PEST_TABS.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onTab(idx)}
            className={`px-3 py-2.5 text-sm font-semibold rounded-md border-2 transition-colors ${
              active === idx
                ? 'bg-[#0DC429] text-white border-[#0DC429]'
                : 'bg-white text-[#0DC429] border-[#0DC429] hover:bg-[#0DC42936]'
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
    <div className="w-full max-w-3xl mx-auto space-y-0">
      {HOMEPAGE_FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="border-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex items-center justify-between w-full text-left py-4 gap-3 bg-transparent border-0"
              aria-expanded={isOpen}
            >
              <span className="text-[18px] font-semibold text-[#252c33] pr-2">{faq.question}</span>
              <span className="text-[#0DC429] flex-shrink-0">
                {isOpen ? <Minus className="h-5 w-5" strokeWidth={2} /> : <Plus className="h-5 w-5" strokeWidth={2} />}
              </span>
            </button>
            {isOpen && (
              <p className="text-[18px] leading-[25px] text-[#636363] pb-4 pr-2">{faq.answer}</p>
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
    <div className="pest-cards max-w-[1200px] mx-auto px-3 sm:px-4">
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
