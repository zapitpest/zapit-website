'use client';

import { useEffect, useRef } from 'react';

const REVIEWS = [
  {
    name: 'Jemi Audi',
    time: '3 months ago',
    text: "Amazing job honestly I've never had pest control that can get rid of all type of bugs, insects and or booklice like this...",
    rating: 5,
  },
  {
    name: 'Sarah M.',
    time: '2 months ago',
    text: "Very professional service. They were on time, thorough, and explained everything. Highly recommend for any pest issues.",
    rating: 5,
  },
  {
    name: 'David Chen',
    time: '1 month ago',
    text: "Best pest control in Melbourne. They handled our termite problem quickly and efficiently. Great communication throughout.",
    rating: 5,
  },
  {
    name: 'Emily R.',
    time: '3 weeks ago',
    text: "Zapit were amazing! Fast response, fair pricing and the technician was so knowledgeable. Our ant problem is completely gone.",
    rating: 5,
  },
  {
    name: 'Michael T.',
    time: '2 weeks ago',
    text: "Excellent service from start to finish. They treated our home for spiders and cockroaches. Haven't seen any since!",
    rating: 5,
  },
] as const;

function Stars({ count, center = false }: { count: number; center?: boolean }) {
  return (
    <div className={`flex gap-0.5 ${center ? 'justify-center' : ''}`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function GoogleReviewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    let speed = 0.5;

    function step() {
      if (!el) return;
      el.scrollLeft += speed;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);

    const pause = () => { speed = 0; };
    const resume = () => { speed = 0.5; };
    el.addEventListener('pointerenter', pause);
    el.addEventListener('pointerleave', resume);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', pause);
      el.removeEventListener('pointerleave', resume);
    };
  }, []);

  return (
    <section className="bg-white px-0 py-8 sm:py-10">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="mb-1 text-[13px] font-bold uppercase tracking-widest text-[#414042]">EXCELLENT</p>
        <Stars count={5} center />
        <p className="mt-1 text-[12px] text-[#414042]">Based on {254} reviews</p>
        <div className="mt-1 flex items-center justify-center gap-1">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-[13px] font-medium text-[#414042]">Google</span>
        </div>
      </div>

      <div ref={scrollRef} className="mt-6 flex gap-4 overflow-x-auto px-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {[...REVIEWS, ...REVIEWS].map((r, i) => (
          <div key={i} className="w-[280px] shrink-0 rounded-xl border border-[#e5e5e5] bg-white p-4 shadow-sm sm:w-[300px]">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#414042] text-sm font-bold text-white">
                {r.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-[14px] font-semibold text-[#131a1c]">{r.name}</p>
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <p className="text-[11px] text-[#414042]/70">{r.time}</p>
              </div>
            </div>
            <Stars count={r.rating} />
            <p className="mt-2 text-[13px] leading-[1.6] text-[#414042]">{r.text}</p>
            <p className="mt-2 text-[12px] font-medium text-[#1cdc38]">Read more</p>
          </div>
        ))}
      </div>
    </section>
  );
}
