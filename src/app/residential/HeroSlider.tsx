'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const SLIDES = [
  {
    src: '/images/residential/hero-house.png',
    alt: 'Melbourne house protected by Zap It pest control',
    icon: 'check',
  },
  {
    src: '/images/residential/hero-highrise.png',
    alt: 'High-rise apartment pest protection Melbourne',
    icon: 'shield',
  },
  {
    src: '/images/residential/hero-family.png',
    alt: 'Family home pest protection Melbourne',
    icon: 'check',
  },
] as const;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#0d402e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#0d402e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" stroke="#0d402e" strokeWidth="2" />
    </svg>
  );
}

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden bg-[#131a1c]">
      <div className="relative aspect-[375/480] w-full sm:aspect-[16/10] md:aspect-[16/9]">
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

        {/* Green rounded border overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 py-8 sm:px-12 sm:py-12">
          <div className="relative h-[70%] w-[85%] max-w-[500px] rounded-3xl border-[3px] border-[#1cdc38] sm:h-[75%] sm:w-[70%]" />
        </div>

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 z-30 px-5 pb-16 sm:px-8 sm:pb-20">
          <h1 className="max-w-[320px] sm:max-w-[440px]">
            <span className="inline bg-[#1cdc38] [box-decoration-break:clone] px-2 py-1 text-[28px] font-bold leading-[1.35] text-[#131a1c] sm:text-[36px] md:text-[44px]">
              Protecting your family and home from pest damage and harm
            </span>
          </h1>
        </div>

        {/* Icon badge — top right inside green border */}
        <div className="absolute right-8 top-[18%] z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg sm:right-[15%] sm:top-[15%] sm:h-14 sm:w-14">
          {SLIDES[active].icon === 'check' ? <CheckIcon /> : <ShieldIcon />}
        </div>

        {/* Google rating pill */}
        <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-[11px] font-bold text-white">5</span>
            <span className="text-[13px] font-semibold text-[#414042] sm:text-sm">Google rating&nbsp; (212)</span>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 right-6 z-30 flex gap-1.5 sm:right-8">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-[#1cdc38]' : 'w-2 bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
