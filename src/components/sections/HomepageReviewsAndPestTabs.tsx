'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, BadgeCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const REVIEWS = [
  {
    name: 'Ummah',
    time: '1 month ago',
    initial: 'U',
    color: 'bg-emerald-600',
    text: "Professional, punctual, and thorough—Zap It handled our pest issues without fuss. The technician explained everything clearly and we're finally pest-free.",
  },
  {
    name: 'Margo Kelly',
    time: '3 months ago',
    initial: 'M',
    color: 'bg-purple-600',
    text: 'Fantastic pest control service in Melbourne. We contacted them for our commercial pest control and were impressed with how quickly they identified and treated the problem.',
  },
  {
    name: 'Jemi Audi',
    time: '3 months ago',
    initial: 'J',
    color: 'bg-blue-600',
    text: "Amazing job honestly I've never had pest control that can get rid of all type of bugs, insects and or booklice like this company (Zap it) highly recommended",
  },
] as const;

const PEST_TABS = [
  {
    label: 'Bed Bug Control',
    title: 'Bed Bug Pest Control Melbourne',
    copy: "Bed bugs can turn a peaceful night's sleep into a nightmare. Don't let itchy welts and restless nights take a toll on your health. Our professional bed bug control services are designed to eliminate infestations at the source, using thorough inspections and targeted treatments so you can rest easy again.",
    href: '/bed-bug-control-melbourne',
  },
  {
    label: 'Possum Control',
    title: 'Possum Control Melbourne',
    copy: 'Possums may look harmless, but when they invade your roof or ceiling, they can cause serious damage and sleepless nights. Their scratching, droppings, and chewing on electrical wires can lead to costly repairs. We provide humane removal and proofing to keep them out for good.',
    href: '/possum-removal-melbourne',
  },
  {
    label: 'Ants Elimination',
    title: 'Ants Elimination Melbourne',
    copy: "The ant you spotted in your kitchen is rarely alone—there's often a trail leading back to a nest. We locate entry points, treat the colony, and help stop ants from returning to your food and benches with tailored, effective solutions.",
    href: '/ant-pest-control-melbourne',
  },
  {
    label: 'Birds Protection',
    title: 'Birds Protection & Control',
    copy: "Bird droppings are acidic and can damage roofs, paint, and outdoor areas—not to mention the noise and mess. We provide professional bird control and deterrents to protect your property while complying with local wildlife requirements.",
    href: '/birds-control-melbourne',
  },
  {
    label: 'Flea & Tick Prevention',
    title: 'Flea & Tick Prevention',
    copy: "Fleas and ticks put pets and people at risk. Our treatments target life stages in the home and advise on what to do next so your family and animals stay comfortable and protected.",
    href: '/flea-control-melbourne',
  },
  {
    label: 'Flying Insects Control',
    title: 'Flying Insects Control',
    copy: "Flies and mosquitoes move from waste to food and can spread disease. We reduce breeding sites and apply targeted control so your indoor and outdoor spaces stay safer and more comfortable.",
    href: '/fly-control-melbourne',
  },
] as const;

function ReviewCard({ rev }: { rev: (typeof REVIEWS)[number] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 text-left shadow-sm min-w-[min(100%,280px)] md:min-w-0 flex-shrink-0 snap-center">
      <div className="flex items-start gap-2 mb-2">
        <div
          className={`h-10 w-10 rounded-full ${rev.color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}
        >
          {rev.initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-semibold text-zapit-dark text-sm">{rev.name}</span>
            <Image src="/images/logo/google-g.png" alt="" width={14} height={14} className="h-3.5 w-3.5" />
          </div>
          <p className="text-xs text-gray-500">{rev.time}</p>
          <div className="flex items-center gap-1 mt-0.5">
            {[...Array(5)].map((_, s) => (
              <Star key={s} className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
            ))}
            <BadgeCheck className="h-4 w-4 text-blue-500 flex-shrink-0" aria-label="Verified" />
          </div>
        </div>
      </div>
      <p className="text-sm text-zapit-text leading-relaxed">{rev.text}</p>
      <span className="text-sm text-zapit-green font-medium mt-2 inline-block cursor-pointer hover:underline">Read more</span>
    </div>
  );
}

export function HomepageReviewsBlock() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === 'left' ? -w : w, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-stretch max-w-6xl mx-auto">
      <div className="lg:w-[220px] flex-shrink-0 text-center lg:text-left">
        <p className="text-lg font-extrabold text-zapit-dark tracking-wide">EXCELLENT</p>
        <div className="flex justify-center lg:justify-start gap-0.5 my-2">
          {[...Array(5)].map((_, s) => (
            <Star key={s} className="h-6 w-6 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-sm text-zapit-text">Based on {SITE_CONFIG.rating.count} reviews</p>
        <div className="mt-3 flex justify-center lg:justify-start">
          <Image src="/images/logo/google-g.png" alt="Google" width={100} height={32} className="h-8 w-auto" />
        </div>
      </div>

      <div className="relative flex-1 min-w-0">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 md:-translate-x-2 z-10 h-10 w-10 rounded-full border border-zapit-border bg-white shadow flex items-center justify-center text-zapit-dark hover:bg-zapit-light"
          aria-label="Scroll reviews left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 md:translate-x-2 z-10 h-10 w-10 rounded-full border border-zapit-border bg-white shadow flex items-center justify-center text-zapit-dark hover:bg-zapit-light"
          aria-label="Scroll reviews right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-10 pb-1 -mx-1 scrollbar-hide [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((rev) => (
            <ReviewCard key={rev.name} rev={rev} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomepagePestServiceTabs() {
  const [active, setActive] = useState(0);
  const tab = PEST_TABS[active];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto mb-10">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-zapit-dark mb-4">{tab.title}</h3>
          <p className="text-zapit-text leading-relaxed mb-6">{tab.copy}</p>
          <Link
            href={tab.href}
            className="inline-flex items-center justify-center bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Learn More
          </Link>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src="/images/hero/pest-service-melbourne.webp"
            alt={tab.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={false}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
        {PEST_TABS.map((t, idx) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setActive(idx)}
            className={`px-3 py-2.5 text-sm font-semibold rounded border transition-colors ${
              active === idx
                ? 'bg-zapit-green text-white border-zapit-green'
                : 'bg-white text-zapit-green border-zapit-green hover:bg-zapit-green/10'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
