'use client';

import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  {
    id: 'house',
    bg: 'https://zapitpestmelbourne.com.au/wp-content/uploads/2025/09/imgi_73_WhatsApp-Image-2025-09-17-at-3.05.27-PM.jpg',
    icon: 'check',
  },
  {
    id: 'highrise',
    bg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    icon: 'shield',
  },
  {
    id: 'family',
    bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    icon: 'check',
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none">
      <circle cx="20" cy="20" r="18" fill="#1cdc38" />
      <path d="M12 20l5 5 11-11" stroke="#0d402e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none">
      <circle cx="20" cy="20" r="18" fill="#1cdc38" />
      <path d="M20 10c-4 2-8 3-8 3v8c0 5 4 8 8 10 4-2 8-5 8-10v-8s-4-1-8-3z" fill="#0d402e" />
      <path d="M20 14c-3 1.5-5 2-5 2v5.5c0 3.5 2.5 5.5 5 7 2.5-1.5 5-3.5 5-7V16s-2-.5-5-2z" fill="#1cdc38" />
      <rect x="18.5" y="17" width="3" height="6" rx="0.5" fill="#0d402e" />
      <circle cx="20" cy="26" r="1.5" fill="#0d402e" />
    </svg>
  );
}

export default function ResidentialHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#f8f5f2]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero slideshow"
    >
      <div className="relative mx-auto w-full max-w-[500px] px-3 pt-4 pb-6 sm:max-w-[600px] sm:px-6 sm:pt-6 sm:pb-8 md:max-w-[700px]">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[3/4] md:aspect-[4/5]">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === current ? 1 : 0 }}
              aria-hidden={i !== current}
            >
              <img
                src={slide.bg}
                alt=""
                className="h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}

          {/* Green frame overlay */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {/* Top-left corner bracket */}
            <div className="absolute left-[8%] top-[5%] h-[55%] w-[70%]">
              <div className="absolute left-0 top-0 h-full w-[4px] rounded-full bg-[#1cdc38]" />
              <div className="absolute left-0 top-0 h-[4px] w-[40%] rounded-full bg-[#1cdc38]" />
              <div className="absolute bottom-0 left-0 h-[4px] w-full rounded-full bg-[#1cdc38]" />
            </div>
            {/* Right side bracket */}
            <div className="absolute right-[8%] top-[15%] h-[65%] w-[4px] rounded-full bg-[#1cdc38]" />
            <div className="absolute right-[8%] top-[15%] h-[4px] w-[15%] rounded-full bg-[#1cdc38]" style={{ transform: 'translateX(-100%)' }} />
            <div className="absolute bottom-[20%] right-[8%] h-[4px] w-[25%] rounded-full bg-[#1cdc38]" style={{ transform: 'translateX(-0%)' }} />
          </div>

          {/* Green text overlay */}
          <div className="absolute bottom-[18%] left-[6%] right-[25%] sm:bottom-[20%]">
            <div className="inline">
              <span className="inline bg-[#1cdc38] [box-decoration-break:clone] px-2 py-1 text-[22px] font-bold leading-[1.5] text-[#131a1c] sm:text-[28px] md:text-[32px]">
                Protecting your family and home from pest damage and harm
              </span>
            </div>
          </div>

          {/* Icon badge — bottom right area */}
          <div className="absolute bottom-[25%] right-[8%] h-[48px] w-[48px] sm:h-[56px] sm:w-[56px]">
            {SLIDES[current].icon === 'check' ? <CheckIcon /> : <ShieldIcon />}
          </div>

          {/* Google rating badge */}
          <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-md backdrop-blur-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-[11px] font-black text-white">5</span>
              <span className="text-[13px] font-semibold text-[#414042] sm:text-sm">Google rating&nbsp;&nbsp;(212)</span>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="mt-4 flex justify-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-[#1cdc38]' : 'w-2 bg-[#e5e5e5]'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
