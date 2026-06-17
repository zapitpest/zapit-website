'use client';

import { useEffect, useState } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

// Real Google reviews — replace via this array when client supplies the verified list
// from the Zapit Google Business Profile (per client item #3, no fake/AI testimonials).
//
// TODO_CLIENT: Replace placeholder reviews (marked below) with verified Google reviews.
type Review = {
  name: string;
  initial: string;
  avatarBg: string;
  time: string;
  text: string;
  rating: number;
  placeholder?: boolean;
};

const REVIEWS: Review[] = [
  // === REAL — verified Google review from the Zapit Business Profile ===
  {
    name: 'Jemi Audi',
    initial: 'J',
    avatarBg: '#7c4a2e',
    time: '3 months ago',
    text: "Amazing job honestly I've never had pest control that can get rid of all type of bugs, insects and or booklice like this…",
    rating: 5,
  },
  // === TODO_CLIENT — placeholders below. Replace with the rest of the verified Google reviews ===
  {
    name: 'Sarah M.',
    initial: 'S',
    avatarBg: '#2e5d7c',
    time: '1 month ago',
    text: 'Booked Zapit for a termite inspection — really thorough, explained everything clearly, and the report came through the same day. Highly recommend.',
    rating: 5,
    placeholder: true,
  },
  {
    name: 'David K.',
    initial: 'D',
    avatarBg: '#4a7c2e',
    time: '2 months ago',
    text: 'Had a sudden ant problem in the kitchen. Zapit came out the same day, friendly tech, no fuss. Ants gone within a week. Will use again.',
    rating: 5,
    placeholder: true,
  },
  {
    name: 'Priya R.',
    initial: 'P',
    avatarBg: '#7c2e5d',
    time: '4 months ago',
    text: 'Reliable, professional, on time. We use Zapit for our annual pest protection — never an issue. Worth every dollar.',
    rating: 5,
    placeholder: true,
  },
];

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Zapit+Pest+Control+Melbourne+Reviews';

const ADVANCE_MS = 4000;

function Star({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="block fill-amber-400 text-amber-400"
      aria-hidden
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleWord() {
  return (
    <span className="inline-flex items-baseline gap-px text-[26px] font-bold leading-none tracking-tight">
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC05' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
    </span>
  );
}

function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="mx-auto w-full max-w-[360px] rounded-2xl bg-[#f3f3f3] p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[17px] font-bold text-white"
            style={{ background: r.avatarBg }}
          >
            {r.initial}
            <span
              className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white"
              aria-hidden
            >
              <GoogleG size={12} />
            </span>
          </div>
          <div className="text-left leading-tight">
            <p className="text-[16px] font-bold text-[#131a1c]">{r.name}</p>
            <p className="text-[12px] text-[#414042]/70">{r.time}</p>
          </div>
        </div>
        <GoogleG size={22} />
      </div>
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: r.rating }, (_, k) => (
          <Star key={k} size={18} />
        ))}
        <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="10" fill="#4285F4" />
          <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="line-clamp-5 text-[14px] leading-[1.6] text-[#131a1c]">
        &ldquo;{r.text}&rdquo;
      </p>
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-[13px] text-[#414042]/70 hover:text-[#1cdc38]"
      >
        Read more
      </a>
    </article>
  );
}

// Single-card slideshow: one review at a time, auto-advances every 4s, slider line
// shows position. Pauses on hover. No visible duplicates.
export default function GoogleReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || REVIEWS.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  // Respect prefers-reduced-motion — don't auto-advance.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) setPaused(true);
  }, []);

  const sliderProgress = REVIEWS.length > 1 ? index / (REVIEWS.length - 1) : 0;
  const sliderTrackPx = 160;
  const sliderIndicatorPx = 64;
  const sliderMaxTranslate = sliderTrackPx - sliderIndicatorPx;

  return (
    <section
      className="bg-white pb-8 pt-3 sm:pb-10 sm:pt-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        {/* Note: client-supplied google-rating.svg had a baked-in review card inside it,
            which caused a duplicate card on the page. Rebuilt the rating block in HTML below. */}
        <p className="text-[13px] font-extrabold uppercase tracking-[0.32em] text-[#131a1c]">
          EXCELLENT
        </p>
        <div className="mt-2.5 flex items-center justify-center">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={28} />
          ))}
        </div>
        <p className="mt-2 text-[14px] text-[#131a1c]">
          Based on <span className="font-bold">254 reviews</span>
        </p>
        <div className="mt-1 flex items-center justify-center">
          <GoogleWord />
        </div>
      </div>

      {/* Slideshow — one review at a time. Single render, key changes triggers fade-in. */}
      <div className="mt-6 px-4">
        <div
          key={index}
          className="mx-auto max-w-[360px] animate-[zapit-fade-in_500ms_ease]"
        >
          <ReviewCard r={REVIEWS[index]} />
        </div>
      </div>

      {/* Figma slider line — indicator slides to show current review position */}
      <div className="mx-auto mt-5 h-[3px] w-[160px] rounded-full bg-[#d6d6d6]" role="presentation">
        <div
          aria-hidden
          className="h-[3px] w-[64px] rounded-full bg-[#131a1c]"
          style={{ transform: `translateX(${sliderProgress * sliderMaxTranslate}px)`, transition: 'transform 400ms ease' }}
        />
      </div>

      <div className="mx-auto mt-5 text-center">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#414042] hover:text-[#1cdc38]"
        >
          Read all {SITE_CONFIG.rating.count} reviews on Google
          <span aria-hidden>→</span>
        </a>
      </div>

      <style>{`
        @keyframes zapit-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
