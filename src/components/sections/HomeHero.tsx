'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

const WP = '/images/wp-assets';

const SLIDES = [
  {
    src: '/images/residential/hero-cottage.png',
    alt: 'Protecting your family and home from pest damage',
  },
  {
    src: `${WP}/2025-10-imgi_22_Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp`,
    alt: 'Zap It technicians treating a Melbourne home',
  },
  {
    src: '/images/residential/hero-family.png',
    alt: 'Family home pest protection Melbourne',
  },
  {
    src: '/images/residential/melbourne-fleet.png',
    alt: 'Zap It pest control fleet covering Melbourne',
  },
] as const;

const TRUST_BADGES = [
  'Child safe',
  'Pet safe',
  'Eco friendly',
  'Insured',
  'DHHS Licensed',
  'Accredited',
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
      {/* Full-width image slider */}
      <div className="relative aspect-[375/520] w-full sm:aspect-[16/10] md:aspect-[16/9]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Dark gradient from bottom for text readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0d402e] via-[#0d402e]/50 to-transparent" />

        {/* Green checkmark accent — right side */}
        <div className="absolute right-6 top-1/2 z-30 -translate-y-1/2 sm:right-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#3fa535]/40 bg-[#0d402e]/70 shadow-xl backdrop-blur-sm sm:h-16 sm:w-16">
            <svg className="h-7 w-7 text-[#3fa535] sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end px-5 pb-6 sm:px-6 sm:pb-10">
          <div className="max-w-lg">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#3fa535] sm:text-[13px]">
              PEST PROTECTION YOU CAN TRUST
            </p>
            <h1 className="mb-1 text-[28px] font-extrabold leading-[1.08] text-white sm:text-[36px] lg:text-[44px]">
              Protecting your<br />family and home
            </h1>
            <p className="mb-4 text-[22px] font-extrabold leading-[1.1] text-[#3fa535] sm:text-[28px] lg:text-[34px]">
              from pest damage<br />and harm
            </p>
            <p className="mb-5 max-w-[420px] text-[14px] leading-[1.65] text-white/80 sm:text-[15px]">
              Families like yours have trusted us to protect their homes since 2020. Child-safe, pet-safe and eco-friendly pest protection — from termites to rodents and everything in between.
            </p>

            {/* CTA buttons */}
            <div className="mb-5 flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.phoneTel}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#3fa535] px-7 py-3 text-[15px] font-bold text-white shadow-lg transition-transform hover:scale-105"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                Call Now — {SITE_CONFIG.phone}
              </a>
              <Link
                href="/residential"
                className="inline-flex min-h-[48px] items-center rounded-full border border-white/30 px-7 py-3 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                View all treatments
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {TRUST_BADGES.map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-[12px] font-medium text-white/80 sm:text-[13px]">
                  <svg className="h-4 w-4 shrink-0 text-[#3fa535]" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>

            <p className="text-[11px] text-white/40 sm:text-[12px]">Mon-Sun 6am-6pm · After-hours emergency calls accepted</p>
          </div>
        </div>

        {/* Slide indicators — centered bottom */}
        <div className="absolute bottom-2 left-1/2 z-40 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-[#1cdc38]' : 'w-2 bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
