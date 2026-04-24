'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, NAV_LINKS, type NavLink } from '@/lib/constants';

const MAIN_NAV_LINKS = NAV_LINKS.filter((item) => item.label !== 'Contact Us');
const CONTACT_LINK = NAV_LINKS.find((item) => item.label === 'Contact Us')!;

const NAV_LOGO = '/images/logo/zapit-logo-dark.jpeg';
const iconFill = '#3fa535';

function PhoneSvg({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill={iconFill}>
      <path d="m30.035 22.594c-.053-.044-6.049-4.31-7.668-4.049-.781.138-1.227.671-2.122 1.737-.144.172-.491.583-.759.876a12.458 12.458 0 0 1 -1.651-.672 13.7 13.7 0 0 1 -6.321-6.321 12.458 12.458 0 0 1 -.672-1.651c.294-.269.706-.616.882-.764 1.061-.89 1.593-1.337 1.731-2.119.283-1.619-4.005-7.613-4.049-7.667a2.289 2.289 0 0 0 -1.706-.964c-1.738 0-6.7 6.436-6.7 7.521 0 .063.091 6.467 7.988 14.5 8.024 7.888 14.428 7.979 14.491 7.979 1.084 0 7.521-4.962 7.521-6.7a2.291 2.291 0 0 0 -.965-1.706z" />
    </svg>
  );
}

function ResidentialIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill={iconFill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function CommercialIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill={iconFill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    </svg>
  );
}

function TermiteIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill={iconFill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden>
      <path d="M10 2a2 2 0 0 0-2 2v2H6v2h2v2H6v2h2.27A6 6 0 0 0 12 22a6 6 0 0 0 3.73-10H18v-2h-2V8h2V6h-2V4a2 2 0 0 0-2-2h-4Zm1 4V4h2v2h-2Zm-1 4v-2h4v2h-4Zm.5 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    </svg>
  );
}

function PestSolutionsIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill={iconFill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z" />
    </svg>
  );
}

function ServiceAreasIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill={iconFill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function FaqsIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill={iconFill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill={iconFill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function NavItemIcon({ label }: { label: string }) {
  switch (label) {
    case 'Residential': return <ResidentialIcon />;
    case 'Commercial': return <CommercialIcon />;
    case 'Termites': return <TermiteIcon />;
    case 'Pest Solutions': return <PestSolutionsIcon />;
    case 'Service Areas': return <ServiceAreasIcon />;
    case 'FAQs': return <FaqsIcon />;
    case 'Contact Us': return <ContactIcon />;
    default: return null;
  }
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center gap-[5px]">
      <span className={`block h-0.5 w-[22px] bg-[#252525] transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`block h-0.5 w-[22px] bg-[#252525] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
      <span className={`block h-0.5 w-[22px] bg-[#252525] transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </div>
  );
}

function CommercialDropdown({ item }: { item: NavLink }) {
  if (!item.childGroups?.length) return null;
  return (
    <li className="group relative">
      <Link
        href={item.href}
        className="flex items-center gap-3 px-[12px] py-[18px] text-[15px] font-medium text-[#333] transition-colors hover:text-[#3fa535] group-hover:text-[#3fa535]"
      >
        <NavItemIcon label={item.label} />
        {item.label}
        <span className="ml-1 text-[10px] text-[#3fa535]">▼</span>
      </Link>
      <div className="invisible absolute left-1/2 top-full z-[1000] flex w-[480px] -translate-x-1/2 gap-[25px] rounded-lg border border-[#e5e5e5] bg-white p-5 opacity-0 shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {item.childGroups.map((group) => (
          <div key={group.title} className="flex-1">
            <h4 className="mb-2 border-b border-[#e5e5e5] pb-2 text-[16px] font-bold text-[#252525]">
              <Link href={group.items[0]?.href ?? item.href} className="hover:text-[#3fa535]">{group.title}</Link>
            </h4>
            <ul>
              {group.items.slice(group.title === 'Properties' ? 1 : 0).map((child) => (
                <li key={child.href + child.label}>
                  <Link href={child.href} className="block py-2 text-[15px] text-[#333] transition-colors hover:text-[#3fa535]">
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </li>
  );
}

function PestSolutionsMega({ item }: { item: NavLink }) {
  if (!item.children?.length) return null;
  const mid = Math.ceil(item.children.length / 2);
  const col1 = item.children.slice(0, mid);
  const col2 = item.children.slice(mid);
  return (
    <li className="group relative">
      <Link
        href={item.href}
        className="flex items-center gap-3 px-[12px] py-[18px] text-[15px] font-medium text-[#333] transition-colors hover:text-[#3fa535] group-hover:text-[#3fa535]"
      >
        <NavItemIcon label={item.label} />
        {item.label}
        <span className="ml-1 text-[10px] text-[#3fa535]">▼</span>
      </Link>
      <div className="invisible absolute left-1/2 top-full z-[1000] flex w-[480px] -translate-x-1/2 gap-[25px] rounded-lg border border-[#e5e5e5] bg-white p-5 opacity-0 shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <ul className="flex-1">
          {col1.map((child) => (
            <li key={child.href}>
              <Link href={child.href} className="block py-2 text-[15px] text-[#333] transition-colors hover:bg-[#f8f9fa] hover:text-[#3fa535]">
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex-1">
          {col2.map((child) => (
            <li key={child.href}>
              <Link href={child.href} className="block py-2 text-[15px] text-[#333] transition-colors hover:bg-[#f8f9fa] hover:text-[#3fa535]">
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function SimpleNavLink({ item }: { item: NavLink }) {
  return (
    <li>
      <Link
        href={item.href}
        className="flex items-center gap-3 px-[12px] py-[18px] text-[15px] font-medium text-[#333] transition-colors hover:text-[#3fa535]"
      >
        <NavItemIcon label={item.label} />
        {item.label}
      </Link>
    </li>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setExpandedMobile(null);
    document.body.classList.remove('overflow-hidden');
  }, []);

  useEffect(() => {
    if (!bannerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileOpen]);

  return (
    <header className="font-sans">
      {/* ===== TOP BAR ===== */}
      <div className="bg-[#1a1a1a] text-[14px] text-[#f0f0f0]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-2 px-4 py-2 sm:flex-row sm:justify-between sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <span>⭐⭐⭐⭐⭐ {SITE_CONFIG.rating.count}+ 5-Star Google Reviews</span>
            <a
              href="https://www.google.com/search?q=Zap+It+Pest+%26+Termite+Control+Melbourne+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-medium text-[#3fa535] hover:underline sm:inline"
            >
              View Testimonials
            </a>
          </div>
          <a
            href={SITE_CONFIG.phoneTel}
            className="flex items-center gap-1.5 font-bold text-[#f0f0f0] hover:text-[#3fa535]"
          >
            <PhoneSvg className="h-4 w-4" />
            CALL US NOW – {SITE_CONFIG.phoneRaw}
          </a>
        </div>
      </div>

      {/* ===== MAIN NAV ===== */}
      <nav className="relative z-[1000] border-t border-[#e5e5e5] bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-[15px] sm:px-5">
          <Link href="/" className="shrink-0" aria-label="Zap It home">
            <Image
              src={NAV_LOGO}
              alt="Zap It Pest Control"
              width={160}
              height={40}
              priority
              className="h-[40px] sm:h-[46px] lg:h-[52px] w-auto [mix-blend-mode:multiply]"
            />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden list-none items-center justify-center lg:flex" aria-label="Primary">
            {MAIN_NAV_LINKS.map((item) => {
              if (item.label === 'Commercial' && item.childGroups)
                return <CommercialDropdown key={item.href} item={item} />;
              if (item.label === 'Pest Solutions' && item.children)
                return <PestSolutionsMega key={item.href} item={item} />;
              return <SimpleNavLink key={item.href} item={item} />;
            })}
          </ul>

          <Link
            href={CONTACT_LINK.href}
            className="hidden rounded-[6px] bg-[#3fa535] px-6 py-3 text-[16px] font-bold text-white transition-colors hover:bg-[#0d402e] lg:inline-flex"
          >
            Contact Us
          </Link>

          {/* Mobile controls */}
          <div className="flex items-center gap-[10px] lg:hidden">
            <a
              href={SITE_CONFIG.phoneTel}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#3fa535] bg-[#3fa535] px-3.5 text-[12px] font-bold text-white transition-colors hover:bg-[#0d402e] sm:px-4"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span className="uppercase tracking-[0.5px]">Call Now</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex min-h-[44px] items-center gap-2 rounded-full border border-[#e5e5e5] bg-[#f8f9fa] px-3.5 text-[12px] font-medium text-[#252525] transition-colors hover:bg-[#e9e9e9] sm:px-4"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
              <span className="uppercase tracking-[0.5px]">MENU</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ===== GREEN INFO BANNER ===== */}
      <div ref={bannerRef} className="bg-[#3fa535] py-2 text-center text-[14px] font-normal text-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-5">
          Book Same-Day Pest Control in Melbourne –{' '}
          <a href={SITE_CONFIG.phoneTel} className="font-semibold text-white hover:underline">
            CALL NOW!
          </a>
        </div>
      </div>

      {/* ===== MOBILE STICKY NAV ===== */}
      <div
        className={`fixed left-0 top-0 z-[1000] w-full border-b border-[#e5e5e5] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform duration-150 lg:hidden ${
          isSticky ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-2.5 sm:px-5">
          <Link href="/" className="shrink-0" aria-label="Zap It home">
            <Image
              src={NAV_LOGO}
              alt="Zap It Pest Control"
              width={160}
              height={40}
              className="h-[36px] w-auto [mix-blend-mode:multiply]"
            />
          </Link>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href={SITE_CONFIG.phoneTel}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#3fa535] bg-[#3fa535] px-3.5 text-[12px] font-bold text-white hover:bg-[#0d402e] sm:px-4"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span className="uppercase tracking-[0.5px]">Call Now</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex min-h-[44px] items-center gap-2 rounded-full border border-[#e5e5e5] bg-[#f8f9fa] px-3.5 text-[12px] font-medium text-[#252525] hover:bg-[#e9e9e9] sm:px-4"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
              <span className="uppercase tracking-[0.5px]">MENU</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 z-[998] overflow-y-auto overscroll-contain bg-white lg:hidden"
          style={{ top: isSticky ? '65px' : '120px', maxHeight: isSticky ? 'calc(100vh - 65px)' : 'calc(100vh - 120px)', paddingBottom: '24px' }}
        >
          <ul className="list-none border-t border-[#e5e5e5]">
            {MAIN_NAV_LINKS.map((item) => {
              const hasDropdown =
                (item.label === 'Commercial' && item.childGroups) ||
                (item.label === 'Pest Solutions' && item.children);

              if (hasDropdown) {
                const key = item.label === 'Commercial' ? 'commercial' : 'pest';
                const isExpanded = expandedMobile === key;
                return (
                  <li key={item.href} className="border-b border-[#e5e5e5]">
                    <button
                      type="button"
                      onClick={() => setExpandedMobile(isExpanded ? null : key)}
                      className="flex w-full items-center justify-between px-5 py-[15px] text-left text-[16px] font-medium text-[#333]"
                      aria-expanded={isExpanded}
                    >
                      <span className="flex items-center gap-3">
                        <NavItemIcon label={item.label} />
                        {item.label}
                      </span>
                      <span className={`text-[12px] text-[#3fa535] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isExpanded && item.label === 'Commercial' && item.childGroups && (
                      <div className="bg-[#f8f9fa] py-2">
                        {item.childGroups.map((group) => (
                          <div key={group.title}>
                            <h4 className="px-[52px] py-2 text-[14px] font-bold uppercase text-[#888]">{group.title}</h4>
                            <ul>
                              {group.items.map((child) => (
                                <li key={child.href} className="border-b border-[#e5e5e5]">
                                  <Link href={child.href} onClick={closeMobile} className="block px-[52px] py-[15px] text-[16px] text-[#333] hover:text-[#3fa535]">
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    {isExpanded && item.label === 'Pest Solutions' && item.children && (
                      <div className="bg-[#f8f9fa] py-2">
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.href} className="border-b border-[#e5e5e5]">
                              <Link href={child.href} onClick={closeMobile} className="block px-[52px] py-[15px] text-[16px] text-[#333] hover:text-[#3fa535]">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href} className="border-b border-[#e5e5e5]">
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className="flex items-center gap-3 px-5 py-[15px] text-[16px] font-medium text-[#333] hover:text-[#3fa535]"
                  >
                    <NavItemIcon label={item.label} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {/* Mobile-only Contact Us */}
            <li className="border-b border-[#e5e5e5]">
              <Link
                href={CONTACT_LINK.href}
                onClick={closeMobile}
                className="flex items-center gap-3 px-5 py-[15px] text-[16px] font-medium text-[#333] hover:text-[#3fa535]"
              >
                <NavItemIcon label="Contact Us" />
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* ===== DESKTOP STICKY HEADER ===== */}
      <div
        className={`fixed left-0 top-0 z-[1000] hidden w-full border-b border-[#e5e5e5] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform duration-150 lg:block ${
          isSticky ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-2.5">
          <Link href="/" className="shrink-0" aria-label="Zap It home">
            <Image
              src={NAV_LOGO}
              alt="Zap It Pest Control"
              width={160}
              height={40}
              className="h-[36px] w-auto [mix-blend-mode:multiply]"
            />
          </Link>
          <ul className="flex list-none items-center">
            {MAIN_NAV_LINKS.map((item) => {
              if (item.label === 'Commercial' && item.childGroups)
                return <CommercialDropdown key={item.href + '-sticky'} item={item} />;
              if (item.label === 'Pest Solutions' && item.children)
                return <PestSolutionsMega key={item.href + '-sticky'} item={item} />;
              return <SimpleNavLink key={item.href + '-sticky'} item={item} />;
            })}
          </ul>
          <Link
            href={CONTACT_LINK.href}
            className="rounded-[6px] bg-[#3fa535] px-6 py-3 text-[16px] font-bold text-white hover:bg-[#0d402e]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
