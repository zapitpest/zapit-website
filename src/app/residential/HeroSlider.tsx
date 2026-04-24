'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const SLIDES = [
  {
    src: '/images/residential/hero-house.png',
    alt: 'Protecting your family and home from pest damage and harm - Melbourne house',
  },
  {
    src: '/images/residential/hero-highrise.png',
    alt: 'Protecting your family and home from pest damage and harm - High-rise apartment',
  },
  {
    src: '/images/residential/hero-family.png',
    alt: 'Protecting your family and home from pest damage and harm - Family home',
  },
] as const;

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

        {/* Slide indicators */}
        <div className="absolute bottom-4 right-4 z-30 flex gap-1.5 sm:bottom-6 sm:right-6">
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
