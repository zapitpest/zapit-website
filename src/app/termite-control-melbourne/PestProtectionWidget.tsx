'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const PESTS = [
  {
    label: 'Ants',
    icon: '/images/icons/insects/ant.svg',
    description:
      'Ants are social insects that can quickly form large colonies. While most are a nuisance, some species can cause structural damage or deliver painful bites. We target the entire colony to ensure they don\'t come back.',
    cta: 'Ants marching in? We\'ll send them packing.',
    didYouKnow:
      'A queen ant can live for years and produce millions of offspring. That\'s why targeting the queen is key to eliminating a colony.',
  },
  {
    label: 'Cockroaches',
    icon: '/images/icons/insects/cockroach.svg',
    description:
      'Cockroaches spread bacteria, trigger allergies, and are notoriously difficult to eliminate. They thrive in various environments and reproduce quickly, making professional intervention essential for effective control.',
    cta: 'Don\'t let roaches take over your home.',
    didYouKnow:
      'A cockroach can live for a week without its head. It only dies because it cannot drink water.',
  },
  {
    label: 'Bed Bugs',
    icon: '/images/icons/insects/bedbug.svg',
    description:
      'Bed bugs are parasitic insects that feed on blood. They are expert hiders, making them difficult to find and treat. Our comprehensive treatments target bed bugs at all life stages.',
    cta: 'Sleep tight and don\'t let the bed bugs bite.',
    didYouKnow: 'Bed bugs can ingest seven times their own body weight in blood.',
  },
  {
    label: 'Mice & Rats',
    icon: '/images/icons/insects/mouse-rat.svg',
    description:
      'Rodents can damage property, contaminate food, and transmit diseases. Our control methods include exclusion to prevent them from entering, and trapping and removal for existing infestations.',
    cta: 'Protect your property from rodent damage.',
    didYouKnow: 'Rats\' teeth grow continuously throughout their lives, which is why they constantly gnaw on things to wear them down.',
  },
  {
    label: 'Termites',
    icon: '/images/icons/insects/termite.svg',
    description:
      'Termites cause billions of dollars in structural damage annually. They silently eat away at wood, and infestations can go unnoticed for years. Regular inspections are crucial for early detection.',
    cta: 'Stop termites before they eat you out of house and home.',
    didYouKnow:
      'Globally, the total weight of all termites is more than the total weight of all humans.',
  },
  {
    label: 'Spiders',
    icon: '/images/icons/insects/spider.svg',
    description:
      'While most spiders are harmless, some can deliver venomous bites. We provide treatments to control spider populations around your home.',
    cta: 'Keep your home free of creepy crawlers.',
    didYouKnow: 'Not all spiders spin webs to catch prey.',
  },
  {
    label: 'Wood Borers',
    icon: '/images/icons/insects/tick.svg',
    description:
      'Woodborers are timber destroyers that can silently hollow out wooden items from the inside, risking the structural integrity of your building.',
    cta: 'Hearing knocking sounds? Let our experts save your wooden items.',
    didYouKnow: 'Woodborers can live inside the timber for up to 5 years.',
  },
  {
    label: 'Mosquitoes',
    icon: '/images/icons/insects/mosquito.svg',
    description:
      'Mosquitoes are serious disease transmitters that can risk your and your pets or children\'s lives with one bite.',
    cta: 'Buzzing in your ear? Let us silence them for life.',
    didYouKnow:
      'Female mosquitoes bite humans and animals; they need the protein from blood to produce their eggs.',
  },
  {
    label: 'Bees',
    icon: '/images/icons/insects/centipede.svg',
    description:
      'Bees are not just beneficial for your health due to honey production; they are dangerous for your existence as well. One honey bee sting can send you to the hospital.',
    cta: 'Bees around your place? Let our experts relocate them peacefully.',
    didYouKnow: 'A single honey bee colony can expand to over 50,000 in the peak season.',
  },
  {
    label: 'Silverfish',
    icon: '/images/icons/insects/tick.svg',
    description:
      'Silverfish don\'t just buzz or sting; they can chew through your books, wallpaper, clothes, and pantry.',
    cta: 'Tired of paper or clothes holes? Let us eradicate them.',
    didYouKnow: 'Silverfishes can live up to 8 years and survive for weeks without food and water.',
  },
] as const;

export default function PestProtectionWidget() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pest = PESTS[active];

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.min(280, el.clientWidth * 0.6);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }, []);

  return (
    <section className="bg-[#f8f5f2] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-[1200px]">
        <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-center text-[20px] font-bold leading-tight text-[#131a1c] sm:text-[24px] md:text-[28px]">
            Zap It Protects You From All Rodents, All Termites &amp; All Pests
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-[60px] bg-[#1cdc38]" />

          {/* Scrollable pest icons */}
          <div className="relative mt-8">
            <button
              type="button"
              onClick={() => scrollByDir(-1)}
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#131a1c] shadow-md transition-colors hover:bg-[#f8f5f2] sm:-left-3"
              aria-label="Scroll pests left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => scrollByDir(1)}
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#131a1c] shadow-md transition-colors hover:bg-[#f8f5f2] sm:-right-3"
              aria-label="Scroll pests right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div
              ref={scrollRef}
              className="mx-10 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin] sm:mx-12 [&::-webkit-scrollbar]:h-1.5"
            >
              {PESTS.map((p, idx) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`flex min-w-[88px] shrink-0 flex-col items-center gap-2 rounded-xl border-2 p-3 transition-colors sm:min-w-[100px] ${
                    active === idx
                      ? 'border-[#1cdc38] bg-[#f8fff8]'
                      : 'border-[#e5e5e5] bg-[#fafafa] hover:border-[#1cdc38]/50'
                  }`}
                >
                  <span className="flex h-14 w-14 items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt="" className="h-14 w-14 object-contain" />
                  </span>
                  <span className="text-center text-[11px] font-semibold leading-tight text-[#414042] sm:text-[12px]">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description + learn more */}
          <div className="mt-6 text-center sm:text-left">
            <p className="text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">{pest.description}</p>
            <Link
              href="/contact-us"
              className="mt-2 inline-block text-[15px] font-semibold text-[#1cdc38] hover:underline"
            >
              Learn more
            </Link>
          </div>

          {/* CTA + Did you know cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <div className="flex flex-col justify-center rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2] p-6">
              <p className="text-[15px] font-semibold leading-snug text-[#131a1c] sm:text-[16px]">{pest.cta}</p>
              <a
                href={SITE_CONFIG.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[48px] w-fit items-center justify-center rounded-lg bg-[#1cdc38] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0d402e]"
              >
                View Plans
              </a>
            </div>
            <div className="rounded-2xl bg-[#eaf7ec] p-6">
              <h3 className="text-lg font-bold text-[#1cdc38] sm:text-xl">Did you know?</h3>
              <p className="mt-3 text-[14px] leading-[1.7] italic text-[#414042] sm:text-[15px]">{pest.didYouKnow}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
