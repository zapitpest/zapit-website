'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const SLIDES = [
  { src: '/images/residential/hero-cottage.png', alt: 'Protecting your family and home' },
  { src: '/images/residential/hero-house.png', alt: 'Melbourne pest control specialists' },
  { src: '/images/residential/hero-highrise.png', alt: 'High-rise pest control' },
  { src: '/images/residential/hero-family.png', alt: 'Family home pest protection' },
] as const;

const TRUST = ['Child safe', 'Pet safe', 'Eco friendly', 'Insured', 'DHHS Licensed', 'Accredited'] as const;

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
    <section className="relative flex min-h-[520px] flex-col justify-end overflow-hidden bg-[#0d402e] pb-10 pt-24 text-white sm:min-h-[560px] sm:pb-14 lg:min-h-[600px]">
      {SLIDES.map((slide, i) => (
        <div key={slide.src} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-30' : 'opacity-0'}`}>
          <Image src={slide.src} alt={slide.alt} fill priority={i === 0} className="object-cover object-center" sizes="100vw" />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-[#0d402e]/95 via-[#0d402e]/80 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-6">
        <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#3fa535] sm:text-[13px]">
          PEST PROTECTION YOU CAN TRUST
        </p>
        <h1 className="mb-2 max-w-lg text-[30px] font-bold leading-[1.1] sm:text-[40px] md:text-[48px]">
          Protecting your<br />family and home
        </h1>
        <h2 className="mb-5 max-w-lg text-[26px] font-bold leading-[1.1] text-[#3fa535] sm:text-[34px] md:text-[42px]">
          from pest damage<br />and harm
        </h2>
        <p className="mb-6 max-w-md text-[15px] leading-[1.7] text-white/80 sm:text-[16px]">
          Families like yours have trusted us to protect their homes since 2020. Child-safe, pet-safe and eco-friendly pest protection — from termites to rodents and everything in between.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={SITE_CONFIG.phoneTel}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#3fa535] px-7 py-3 text-[15px] font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            Call Now — {SITE_CONFIG.phone}
          </a>
          <Link href="/residential" className="inline-flex min-h-[48px] items-center rounded-full border-2 border-white/30 px-7 py-3 text-[15px] font-bold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10">
            View all treatments
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-white/70 sm:text-[14px]">
          {TRUST.map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#1cdc38]" strokeWidth={2.5} />
              {t}
            </span>
          ))}
        </div>

        <p className="mt-3 text-[12px] text-white/40">Mon-Sun 6am-6pm · After-hours emergency calls accepted</p>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`} className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-[#1cdc38]' : 'w-2 bg-white/40'}`} />
        ))}
      </div>
    </section>
  );
}
