'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG } from '@/lib/constants';

// Menu order matches the client-supplied menu.svg design (Residential → Commercial →
// Service areas → FAQs → Contact us → About us).
const MENU_ITEMS = [
  { label: 'Residential', href: '/' },
  { label: 'Commercial', href: '/commercial-pest-control' },
  { label: 'Service areas', href: '/service-areas' },
  { label: 'FAQs', href: '/frequently-asked-questions' },
  { label: 'Contact us', href: '/contact-us' },
  { label: 'About us', href: '/about-us' },
] as const;

export default function FloatingCTA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* Floating bar — client-supplied callnow.svg used as the visual; two transparent
          click overlays split the interaction (pill → tel:, circle → menu). */}
      <div className="fixed bottom-6 left-1/2 z-[1100] -translate-x-1/2">
        <div className="relative" style={{ width: 'min(270px, 86vw)', aspectRatio: '287 / 86' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/icons/callnow.svg"
            alt=""
            aria-hidden
            className="h-full w-full"
          />
          {/* Pill click area — Call now (left ~70%) */}
          <a
            href={SITE_CONFIG.phoneTel}
            aria-label={`Call now ${SITE_CONFIG.phone}`}
            className="absolute rounded-full transition-transform hover:scale-[1.03]"
            style={{
              left: `${(20 / 287) * 100}%`,
              top: `${(21 / 86) * 100}%`,
              width: `${(189 / 287) * 100}%`,
              height: `${(44 / 86) * 100}%`,
            }}
          />
          {/* Menu click area — circle (right ~16%) */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="absolute rounded-full transition-transform hover:scale-[1.05]"
            style={{
              left: `${(221 / 287) * 100}%`,
              top: `${(20 / 86) * 100}%`,
              width: `${(46 / 287) * 100}%`,
              height: `${(46 / 86) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Full-screen menu overlay — matches client-supplied menu.svg design */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[1050] bg-black/40 backdrop-blur-sm" onClick={close} aria-hidden />
          {/* Menu overlay — exact spec from client menu.svg (354×420, rx=20, bg #F8F5F2):
              X at top-right (~y=30-48), then 28px gap, then dividers every ~50px wrapping 6 items.
              Each item is 50px tall with chevron right + #828282 divider below. */}
          {/* Menu overlay — exact Figma menu.svg spec: Graphik Semibold 20px / 40lh,
              color #414042, chevrons + X in #828282 stroke-width 3, 50px row height */}
          <div className="fixed bottom-28 left-1/2 z-[1060] w-[calc(100%-32px)] max-w-[354px] -translate-x-1/2 rounded-[20px] bg-[#F8F5F2] px-[22px] py-[22px] shadow-2xl">
            {/* Close X — bigger, matches chevron weight + colour */}
            <div className="mb-[16px] flex justify-end">
              <button
                onClick={close}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center text-[#828282] hover:text-[#414042]"
              >
                <svg className="h-[34px] w-[34px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>

            {/* Top divider above first item */}
            <div className="border-t border-[#828282]" />

            {/* Menu items — 50px row, semibold 20px text, bigger chevrons */}
            <nav>
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="flex h-[50px] items-center justify-between border-b border-[#828282] transition-colors hover:opacity-80"
                >
                  <span
                    className="text-[#414042]"
                    style={{ fontSize: '20px', lineHeight: '40px', fontWeight: 600 }}
                  >
                    {item.label}
                  </span>
                  <svg className="h-[22px] w-[22px] text-[#828282]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
