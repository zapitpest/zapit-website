'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

const SLIDES = [
  {
    src: '/images/commercial/commercial-hero.png',
    alt: 'Tailored business pest protection - Kitchen and restaurant pest control',
  },
  {
    src: '/images/hero/pest-treatment-melbourne.webp',
    alt: 'Professional commercial pest management Melbourne',
  },
  {
    src: '/images/hero/pest-service-melbourne.webp',
    alt: 'Commercial pest service across Melbourne businesses',
  },
] as const;

export default function CommercialHeroSlider() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 5000);
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0d402e] via-[#0d402e]/50 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end px-5 pb-6 sm:px-6 sm:pb-10">
          <div className="max-w-lg">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#3fa535] sm:text-[13px]">
              COMMERCIAL PEST MANAGEMENT
            </p>
            <div className="mb-2 inline-block">
              <span className="bg-[#3fa535] px-2 py-0.5 text-[26px] font-extrabold leading-[1.15] text-white sm:text-[34px] lg:text-[40px]">
                Tailored business
              </span>
            </div>
            <h1 className="mb-4 text-[26px] font-extrabold leading-[1.1] text-white sm:text-[34px] lg:text-[40px]">
              pest protection<br />you can rely on
            </h1>

            {/* Trust badges */}
            <div className="mb-5 flex flex-col gap-2">
              {['Fully insured', 'DHHS Licensed', 'Eco friendly', 'HACCP Aware'].map((badge) => (
                <span key={badge} className="flex items-center gap-2 text-[14px] font-medium italic text-white/90 sm:text-[15px]">
                  <svg className="h-5 w-5 shrink-0 text-[#3fa535]" fill="none" viewBox="0 0 24 24">
                    <rect width="18" height="18" x="3" y="3" rx="4" fill="currentColor" />
                    <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <a href={SITE_CONFIG.phoneTel} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#3fa535] px-7 py-3 text-[15px] font-bold text-white shadow-lg transition-transform hover:scale-105">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                Call Now — {SITE_CONFIG.phone}
              </a>
              <Link href="#industries" className="inline-flex min-h-[48px] items-center rounded-full border border-white/30 px-7 py-3 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10">
                View industries
              </Link>
            </div>
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
