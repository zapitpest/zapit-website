'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

const WP = '/images/wp-assets';

const SLIDES = [
  { src: `${WP}/2025-10-imgi_22_Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp`, alt: 'Zap It technician treating a Melbourne home' },
  { src: `${WP}/2025-06-Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp`, alt: 'Professional pest control service Melbourne' },
  { src: '/images/residential/melbourne-fleet.png', alt: 'Zap It pest control fleet' },
  { src: `${WP}/2025-09-imgi_73_WhatsApp-Image-2025-09-17-at-3.05.27-PM.jpg`, alt: 'Melbourne home protection' },
] as const;

const TRUST_PILLS = ['Child-Safe', 'Insured', 'Eco-Friendly', 'AEPMA Accredited'] as const;

export default function HomeHero() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative overflow-hidden bg-[#131a1c]">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#0d402e]/50 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-[#3fa535]/10 blur-[80px]" />

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-5 pb-12 pt-8 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pb-16 lg:pt-14">
        {/* LEFT — text */}
        <div className="order-2 lg:order-1">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.15em] text-[#3fa535] sm:text-[13px]">
            PEST PROTECTION YOU CAN TRUST
          </p>
          <h1 className="mb-1 text-[32px] font-extrabold leading-[1.06] tracking-tight text-white sm:text-[42px] lg:text-[50px]">
            Protecting your<br />family and home
          </h1>
          <p className="mb-5 text-[28px] font-extrabold leading-[1.06] tracking-tight text-[#3fa535] sm:text-[36px] lg:text-[44px]">
            from pest damage<br />and harm
          </p>
          <p className="mb-6 max-w-[440px] text-[15px] leading-[1.7] text-white/70 sm:text-[16px]">
            Families like yours have trusted us to protect their homes since 2020. Child-safe, pet-safe and eco-friendly pest protection — from termites to rodents and everything in between.
          </p>

          <div className="mb-5 flex flex-wrap gap-3">
            <a
              href={SITE_CONFIG.phoneTel}
              className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#3fa535] px-7 py-3 text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(63,165,53,0.3)] transition-transform hover:scale-105"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call Now — {SITE_CONFIG.phone}
            </a>
            <Link href="/residential" className="inline-flex min-h-[50px] items-center rounded-full border border-white/20 px-7 py-3 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/5">
              View all treatments
            </Link>
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {TRUST_PILLS.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-white/75 sm:text-[13px]">
                <svg className="h-3 w-3 text-[#3fa535]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {t}
              </span>
            ))}
          </div>

          <p className="text-[12px] text-white/30 sm:text-[13px]">Mon-Sun 6am-6pm · After-hours emergency calls accepted</p>
        </div>

        {/* RIGHT — image with green halo glow */}
        <div className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2 lg:mx-0 lg:max-w-none">
          {/* Green halo glow behind image */}
          <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[#3fa535]/15 blur-2xl sm:-inset-6" />

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-[#3fa535]/25 shadow-[0_0_40px_rgba(63,165,53,0.15)] sm:aspect-[16/11]">
            {SLIDES.map((slide, i) => (
              <div key={slide.src} className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? 'opacity-100' : 'opacity-0'}`}>
                <Image src={slide.src} alt={slide.alt} fill priority={i === 0} className="object-cover object-center" sizes="(min-width: 1024px) 55vw, 100vw" />
              </div>
            ))}

            {/* Gradient overlay at bottom for indicators */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Google rating badge */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm sm:bottom-4 sm:left-4">
              <span className="text-[14px] font-bold text-[#131a1c]">5</span>
              <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="text-[12px] font-medium text-[#636363]">Google rating ({SITE_CONFIG.rating.count})</span>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-3 right-3 z-20 flex gap-1.5 sm:bottom-4 sm:right-4">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`} className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-[#3fa535]' : 'w-2 bg-white/50'}`} />
              ))}
            </div>
          </div>

          {/* Green check circle accent */}
          <div className="absolute -bottom-2 -right-2 z-20 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#131a1c] bg-[#3fa535] shadow-lg sm:h-14 sm:w-14">
            <svg className="h-6 w-6 text-white sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>
      </div>
    </section>
  );
}
