'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

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

  // WCAG 2.1.2 / 2.4.3 — Esc closes the modal + Tab is trapped inside it.
  // Also restores focus to the menu-opener button on close so keyboard flow
  // continues from where it left off.
  useEffect(() => {
    if (!menuOpen) return;

    // Send initial focus into the dialog on open.
    const first = menuRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !menuRef.current) return;

      const focusables = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && active === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

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
            ref={menuButtonRef}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="floating-menu-dialog"
            className="absolute rounded-full transition-transform hover:scale-[1.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#64FF01]"
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
          {/* Menu overlay — Figma menu.svg spec: 354×420, rx=20, bg #F8F5F2, Graphik Semibold
              20px / 40lh, color #414042, chevrons + X in #828282 stroke-width 3, 50px row height.
              role/aria-modal + focus trap wired in the parent effect (WCAG 2.4.3, 2.1.2). */}
          <div
            ref={menuRef}
            id="floating-menu-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="floating-menu-heading"
            className="fixed bottom-28 left-1/2 z-[1060] w-[calc(100%-32px)] max-w-[354px] -translate-x-1/2 rounded-[20px] bg-[#F8F5F2] px-[22px] py-[22px] shadow-2xl"
          >
            <h2 id="floating-menu-heading" className="sr-only">Site menu</h2>
            {/* Close X — bigger, matches chevron weight + colour */}
            <div className="mb-[16px] flex justify-end">
              <button
                onClick={close}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#828282] hover:text-[#414042] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d402e]"
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
