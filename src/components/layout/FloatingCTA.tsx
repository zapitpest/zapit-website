'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';

const ALL_LINKS = NAV_LINKS;

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
      {/* Floating bar */}
      <div className="fixed bottom-6 left-1/2 z-[1100] flex -translate-x-1/2 items-center gap-2.5">
        <a
          href={SITE_CONFIG.phoneTel}
          className="animate-subtle-glow flex items-center gap-2 rounded-full bg-[#64FF01] px-5 py-3 shadow-[0_4px_20px_rgba(100,255,1,0.3)] transition-transform hover:scale-105"
        >
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="#0d402e">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="whitespace-nowrap text-[15px] font-bold text-[#0d402e]">Call now</span>
        </a>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#64FF01] shadow-[0_4px_20px_rgba(100,255,1,0.3)] transition-transform hover:scale-105"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#0d402e" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#0d402e" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="3" />
              <line x1="7" y1="9" x2="17" y2="9" />
              <line x1="7" y1="13" x2="17" y2="13" />
              <line x1="7" y1="17" x2="17" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[1050] bg-black/40 backdrop-blur-sm" onClick={close} aria-hidden />
          <div className="fixed bottom-20 left-1/2 z-[1060] w-[calc(100%-40px)] max-w-[360px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl">
            <nav className="max-h-[60vh] overflow-y-auto">
              <ul className="divide-y divide-[#f0f0f0]">
                {ALL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex items-center gap-3 px-5 py-3.5 text-[15px] font-medium text-[#414042] transition-colors hover:bg-[#f8f5f2] hover:text-[#3fa535]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-[#e5e5e5] p-4">
              <a
                href={SITE_CONFIG.phoneTel}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3fa535] py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#0d402e]"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                Call {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
