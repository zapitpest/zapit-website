'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';

const ALL_LINKS = NAV_LINKS;

export default function FloatingCTA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = useCallback(() => setMenuOpen(false), []);

  if (!visible) return null;

  return (
    <>
      {/* Floating bar — centered at bottom */}
      <div className="fixed bottom-6 left-1/2 z-[1100] flex -translate-x-1/2 items-center gap-3">
        {/* Call now pill */}
        <a
          href={SITE_CONFIG.phoneTel}
          className="flex items-center gap-2 rounded-full bg-[#64FF01] px-6 py-3 shadow-[0_0_15px_5px_rgba(100,255,1,0.25)] transition-transform hover:scale-105"
        >
          {/* Phone icon with signal arcs */}
          <svg className="h-6 w-6" viewBox="0 0 32 32" fill="#414042">
            <path d="M18.66 17.78c-1.44-2.83-3.76-5.14-6.59-6.59l-2.2 2.2c-.27.27-.67.36-1.02.24-1.12-.37-2.33-.57-3.57-.57-.55 0-1-.45-1-1V8c0-.55.45-1 1-1 9.39 0 17 7.61 17 17 0 .55-.45 1-1 1h-3.5c-.55 0-1-.45-1-1 0-1.25-.2-2.45-.57-3.57-.11-.35-.03-.74.25-1.02l2.2-2.2z" transform="rotate(180, 16, 16)" />
          </svg>
          <span className="text-[16px] font-bold text-[#414042]">Call now</span>
        </a>

        {/* Menu circle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#64FF01] shadow-[0_0_15px_5px_rgba(100,255,1,0.25)] transition-transform hover:scale-105"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#414042" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#414042" strokeWidth="2" strokeLinecap="round">
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
        <div className="fixed inset-0 z-[1050] bg-[#0d402e]/95 backdrop-blur-sm">
          <div className="flex h-full flex-col overflow-y-auto px-6 pb-24 pt-16">
            <button onClick={close} className="absolute right-5 top-5 text-white" aria-label="Close">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <nav className="mx-auto w-full max-w-sm">
              <ul className="space-y-1">
                {ALL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block rounded-lg px-4 py-3.5 text-[18px] font-medium text-white transition-colors hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-white/20 pt-6">
                <a
                  href={SITE_CONFIG.phoneTel}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#64FF01] px-6 py-3.5 text-[16px] font-bold text-[#414042] transition-transform hover:scale-105"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#414042">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  Call {SITE_CONFIG.phoneRaw}
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
