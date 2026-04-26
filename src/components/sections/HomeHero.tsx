'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

const SLIDES = [
  {
    src: '/images/residential/hero-cottage.png',
    alt: 'Protecting your family and home from pest damage and harm - Cottage',
  },
  {
    src: '/images/residential/hero-family.png',
    alt: 'Protecting your family and home from pest damage and harm - Family',
  },
  {
    src: '/images/residential/hero-house.png',
    alt: 'Protecting your family and home from pest damage and harm - House',
  },
  {
    src: '/images/residential/hero-highrise.png',
    alt: 'Protecting your family and home from pest damage and harm - High-rise',
  },
] as const;

const TRUST_BADGES = [
  'Child safe', 'Pet safe', 'Eco friendly', 'Insured', 'DHHS Licensed', 'Accredited',
] as const;

export default function HomeHero() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden bg-[#0d402e]">
      <div className="relative aspect-[375/520] w-full sm:aspect-[16/10] md:aspect-[16/9]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.src} alt={slide.alt} className="absolute inset-0 h-full w-full object-cover object-center" loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}

        {/* Subtle bottom gradient only — images have their own text, don't obscure them */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-[45%] bg-gradient-to-t from-[#0d402e]/90 via-[#0d402e]/40 to-transparent" />

        {/* Content — compact bar at the very bottom, below the image's baked-in text */}
        <div className="absolute inset-x-0 bottom-0 z-30 px-5 pb-5 sm:px-6 sm:pb-8">
          <div className="max-w-lg">
            <div className="mb-4 flex flex-wrap gap-3">
              <a href={SITE_CONFIG.phoneTel} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#3fa535] px-7 py-3 text-[15px] font-bold text-white shadow-lg transition-transform hover:scale-105">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                Call Now — {SITE_CONFIG.phone}
              </a>
              <Link href="/residential" className="inline-flex min-h-[48px] items-center rounded-full border border-white/30 px-7 py-3 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10">
                View all treatments
              </Link>
            </div>

            <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1.5">
              {TRUST_BADGES.map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-[12px] font-medium text-white/90 sm:text-[13px]">
                  <svg className="h-4 w-4 shrink-0 text-[#3fa535]" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>

            <p className="text-[11px] text-white/50 sm:text-[12px]">Mon-Sun 6am-6pm · After-hours emergency calls accepted</p>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-2 left-1/2 z-40 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Show slide ${i + 1}`} className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-[#1cdc38]' : 'w-2 bg-white/50'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
