'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG, NAV_LINKS, type NavLink } from '@/lib/constants';

const MAIN_NAV_LINKS = NAV_LINKS.filter((item) => item.label !== 'Contact Us');
const CONTACT_LINK = NAV_LINKS.find((item) => item.label === 'Contact Us')!;

const NAV_LOGO = '/images/zapit-logo.svg';
const iconFill = '#3fa535';

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
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/icons/malware-virus-icon.svg" alt="" className="h-6 w-6 shrink-0" style={{ filter: 'invert(38%) sepia(93%) saturate(400%) hue-rotate(80deg) brightness(95%)' }} aria-hidden />
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
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/icons/service-provider-icon.svg" alt="" className="h-6 w-6 shrink-0" style={{ filter: 'invert(38%) sepia(93%) saturate(400%) hue-rotate(80deg) brightness(95%)' }} aria-hidden />
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
      <span className={`block h-0.5 w-[22px] bg-white transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`block h-0.5 w-[22px] bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
      <span className={`block h-0.5 w-[22px] bg-white transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </div>
  );
}

function CommercialDropdown({ item }: { item: NavLink }) {
  if (!item.childGroups?.length) return null;
  return (
    <li className="group relative">
      <Link
        href={item.href}
        className="flex items-center gap-3 px-[12px] py-[18px] text-[15px] font-medium text-[#414042] transition-colors hover:text-[#3fa535] group-hover:text-[#3fa535]"
      >
        <NavItemIcon label={item.label} />
        {item.label}
        <span className="ml-1 text-[10px] text-[#3fa535]">▼</span>
      </Link>
      <div className="invisible absolute left-1/2 top-full z-[1000] flex w-[480px] -translate-x-1/2 gap-[25px] rounded-lg border border-[#e5e5e5] bg-white p-5 opacity-0 shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {item.childGroups.map((group) => (
          <div key={group.title} className="flex-1">
            <h4 className="mb-2 border-b border-[#e5e5e5] pb-2 text-[16px] font-bold text-[#131a1c]">
              <Link href={group.items[0]?.href ?? item.href} className="hover:text-[#3fa535]">{group.title}</Link>
            </h4>
            <ul>
              {group.items.slice(group.title === 'Properties' ? 1 : 0).map((child) => (
                <li key={child.href + child.label}>
                  <Link href={child.href} className="block py-2 text-[15px] text-[#414042] transition-colors hover:text-[#3fa535]">
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
        className="flex items-center gap-3 px-[12px] py-[18px] text-[15px] font-medium text-[#414042] transition-colors hover:text-[#3fa535] group-hover:text-[#3fa535]"
      >
        <NavItemIcon label={item.label} />
        {item.label}
        <span className="ml-1 text-[10px] text-[#3fa535]">▼</span>
      </Link>
      <div className="invisible absolute left-1/2 top-full z-[1000] flex w-[480px] -translate-x-1/2 gap-[25px] rounded-lg border border-[#e5e5e5] bg-white p-5 opacity-0 shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <ul className="flex-1">
          {col1.map((child) => (
            <li key={child.href}>
              <Link href={child.href} className="block py-2 text-[15px] text-[#414042] transition-colors hover:bg-[#f8f5f2] hover:text-[#3fa535]">
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex-1">
          {col2.map((child) => (
            <li key={child.href}>
              <Link href={child.href} className="block py-2 text-[15px] text-[#414042] transition-colors hover:bg-[#f8f5f2] hover:text-[#3fa535]">
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
        className="flex items-center gap-3 px-[12px] py-[18px] text-[15px] font-medium text-[#414042] transition-colors hover:text-[#3fa535]"
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
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isCommercial = pathname.startsWith('/commercial');
  const isResidential = !isCommercial;

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setExpandedMobile(null);
    document.body.classList.remove('overflow-hidden');
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(headerRef.current);
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
      {/* ===== MAIN HEADER — dark green ===== */}
      <div ref={headerRef} className="relative z-10 bg-[#0d402e]">
        <div className="mx-auto max-w-[1280px] px-5 pt-5 sm:px-6 sm:pt-6">
          {/* Row 1: Logo + Phone + Hamburger */}
          <div className="flex items-center justify-between">
            <Link href="/" className="shrink-0" aria-label="Zap It home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={NAV_LOGO}
                alt="Zap It Pest Control"
                className="h-[56px] w-auto brightness-0 invert sm:h-[64px] lg:h-[70px]"
              />
            </Link>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.phoneTel}
                className="text-[26px] font-bold tracking-wide text-white transition-colors hover:text-[#64FF01] sm:text-[30px] lg:text-[36px]"
              >
                9126 0555
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-[#f8f5f2]/35 transition-colors hover:border-[#f8f5f2]/60 lg:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          </div>

          {/* Tagline */}
          <p className="mt-2 text-[16px] text-white/70 sm:text-[17px]">
            Pest protection you can trust
          </p>

          {/* Tab row — fully inside green header with padding below */}
          <div className="mt-4 flex items-center gap-2.5 pb-5 lg:hidden">
            <Link
              href="/residential"
              className={`flex-1 rounded-2xl py-3.5 text-center text-[16px] font-bold transition-colors sm:py-4 ${
                isResidential
                  ? 'bg-[#f8f5f2] text-[#0d402e] shadow-md'
                  : 'border border-[#f8f5f2]/35 text-[#f8f5f2]/50 hover:border-[#f8f5f2]/60 hover:text-[#f8f5f2]/70'
              }`}
            >
              Residential
            </Link>
            <Link
              href="/commercial-pest-control"
              className={`flex-1 rounded-2xl py-3.5 text-center text-[16px] font-bold transition-colors sm:py-4 ${
                isCommercial
                  ? 'bg-[#f8f5f2] text-[#0d402e] shadow-md'
                  : 'border border-[#f8f5f2]/35 text-[#f8f5f2]/50 hover:border-[#f8f5f2]/60 hover:text-[#f8f5f2]/70'
              }`}
            >
              Commercial
            </Link>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP NAV BAR — white bg, below green header ===== */}
      <nav className="relative z-[1000] hidden border-b border-[#e5e5e5] bg-white lg:block">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5">
          <ul className="flex list-none items-center" aria-label="Primary">
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
            className="rounded-[6px] bg-[#3fa535] px-6 py-3 text-[16px] font-bold text-white transition-colors hover:bg-[#0d402e]"
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {/* ===== MOBILE STICKY NAV ===== */}
      <div
        className={`fixed left-0 top-0 z-[1000] w-full bg-[#0d402e] shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-transform duration-200 lg:hidden ${
          isSticky ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-5">
          {/* Row 1: Logo + phone + hamburger */}
          <div className="mb-2.5 flex items-center justify-between">
            <Link href="/" className="shrink-0" aria-label="Zap It home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={NAV_LOGO}
                alt="Zap It Pest Control"
                className="h-[34px] w-auto brightness-0 invert"
              />
            </Link>
            <div className="flex items-center gap-2.5">
              <a href={SITE_CONFIG.phoneTel} className="text-[18px] font-bold text-white hover:text-[#64FF01]">
                9126 0555
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg border border-[#f8f5f2]/35"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          </div>
          {/* Row 2: Tabs */}
          <div className="flex items-center gap-2">
            <Link
              href="/residential"
              className={`flex-1 rounded-xl py-2.5 text-center text-[14px] font-bold transition-colors ${
                isResidential ? 'bg-[#f8f5f2] text-[#0d402e] shadow-sm' : 'border border-[#f8f5f2]/35 text-[#f8f5f2]/50'
              }`}
            >
              Residential
            </Link>
            <Link
              href="/commercial-pest-control"
              className={`flex-1 rounded-xl py-2.5 text-center text-[14px] font-bold transition-colors ${
                isCommercial ? 'bg-[#f8f5f2] text-[#0d402e] shadow-sm' : 'border border-[#f8f5f2]/35 text-[#f8f5f2]/50'
              }`}
            >
              Commercial
            </Link>
          </div>
        </div>
      </div>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-x-0 z-[998] overflow-y-auto overscroll-contain bg-white lg:hidden"
          style={{ top: isSticky ? '110px' : '0', maxHeight: isSticky ? 'calc(100vh - 110px)' : '100vh', paddingBottom: '24px' }}
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
                      className="flex w-full items-center justify-between px-5 py-[15px] text-left text-[16px] font-medium text-[#414042]"
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
                            <h4 className="px-[52px] py-2 text-[14px] font-bold uppercase text-[#414042]">{group.title}</h4>
                            <ul>
                              {group.items.map((child) => (
                                <li key={child.href} className="border-b border-[#e5e5e5]">
                                  <Link href={child.href} onClick={closeMobile} className="block px-[52px] py-[15px] text-[16px] text-[#414042] hover:text-[#3fa535]">
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
                              <Link href={child.href} onClick={closeMobile} className="block px-[52px] py-[15px] text-[16px] text-[#414042] hover:text-[#3fa535]">
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
                    className="flex items-center gap-3 px-5 py-[15px] text-[16px] font-medium text-[#414042] hover:text-[#3fa535]"
                  >
                    <NavItemIcon label={item.label} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="border-b border-[#e5e5e5]">
              <Link
                href={CONTACT_LINK.href}
                onClick={closeMobile}
                className="flex items-center gap-3 px-5 py-[15px] text-[16px] font-medium text-[#414042] hover:text-[#3fa535]"
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={NAV_LOGO}
              alt="Zap It Pest Control"
              className="h-[36px] w-auto"
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
