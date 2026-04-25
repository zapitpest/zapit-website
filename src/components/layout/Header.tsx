'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG, NAV_LINKS, type NavLink } from '@/lib/constants';

const MAIN_NAV_LINKS = NAV_LINKS.filter((item) => item.label !== 'Contact Us');
const CONTACT_LINK = NAV_LINKS.find((item) => item.label === 'Contact Us')!;
const NAV_LOGO = '/images/zapit-logo.svg';
const iconFill = '#3fa535';

function ResidentialIcon() { return <svg className="h-5 w-5 shrink-0" fill={iconFill} viewBox="0 0 24 24" aria-hidden><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>; }
function CommercialIcon() { return <svg className="h-5 w-5 shrink-0" fill={iconFill} viewBox="0 0 24 24" aria-hidden><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>; }
function TermiteIcon() { return <img src="/images/icons/malware-virus-icon.svg" alt="" className="h-6 w-6 shrink-0" style={{ filter: 'invert(38%) sepia(93%) saturate(400%) hue-rotate(80deg) brightness(95%)' }} aria-hidden />; }
function PestSolutionsIcon() { return <svg className="h-5 w-5 shrink-0" fill={iconFill} viewBox="0 0 24 24" aria-hidden><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg>; }
function ServiceAreasIcon() { return <img src="/images/icons/service-provider-icon.svg" alt="" className="h-6 w-6 shrink-0" style={{ filter: 'invert(38%) sepia(93%) saturate(400%) hue-rotate(80deg) brightness(95%)' }} aria-hidden />; }
function FaqsIcon() { return <svg className="h-5 w-5 shrink-0" fill={iconFill} viewBox="0 0 24 24" aria-hidden><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>; }
function ContactIcon() { return <svg className="h-5 w-5 shrink-0" fill={iconFill} viewBox="0 0 24 24" aria-hidden><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>; }

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
      <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
      <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </div>
  );
}

function CommercialDropdown({ item }: { item: NavLink }) {
  if (!item.childGroups?.length) return null;
  return (
    <li className="group relative">
      <Link href={item.href} className="flex items-center gap-3 px-3 py-[18px] text-[15px] font-medium text-[#414042] transition-colors hover:text-[#3fa535]">
        <NavItemIcon label={item.label} />{item.label}<span className="ml-1 text-[10px] text-[#3fa535]">▼</span>
      </Link>
      <div className="invisible absolute left-1/2 top-full z-[1000] flex w-[480px] -translate-x-1/2 gap-6 rounded-lg border border-[#e5e5e5] bg-white p-5 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {item.childGroups.map((g) => (
          <div key={g.title} className="flex-1">
            <h4 className="mb-2 border-b border-[#e5e5e5] pb-2 text-base font-bold text-[#131a1c]"><Link href={g.items[0]?.href ?? item.href} className="hover:text-[#3fa535]">{g.title}</Link></h4>
            <ul>{g.items.slice(g.title === 'Properties' ? 1 : 0).map((c) => <li key={c.href+c.label}><Link href={c.href} className="block py-2 text-[15px] text-[#414042] hover:text-[#3fa535]">{c.label}</Link></li>)}</ul>
          </div>
        ))}
      </div>
    </li>
  );
}

function PestSolutionsMega({ item }: { item: NavLink }) {
  if (!item.children?.length) return null;
  const mid = Math.ceil(item.children.length / 2);
  return (
    <li className="group relative">
      <Link href={item.href} className="flex items-center gap-3 px-3 py-[18px] text-[15px] font-medium text-[#414042] transition-colors hover:text-[#3fa535]">
        <NavItemIcon label={item.label} />{item.label}<span className="ml-1 text-[10px] text-[#3fa535]">▼</span>
      </Link>
      <div className="invisible absolute left-1/2 top-full z-[1000] flex w-[480px] -translate-x-1/2 gap-6 rounded-lg border border-[#e5e5e5] bg-white p-5 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <ul className="flex-1">{item.children.slice(0, mid).map((c) => <li key={c.href}><Link href={c.href} className="block py-2 text-[15px] text-[#414042] hover:bg-[#f8f5f2] hover:text-[#3fa535]">{c.label}</Link></li>)}</ul>
        <ul className="flex-1">{item.children.slice(mid).map((c) => <li key={c.href}><Link href={c.href} className="block py-2 text-[15px] text-[#414042] hover:bg-[#f8f5f2] hover:text-[#3fa535]">{c.label}</Link></li>)}</ul>
      </div>
    </li>
  );
}

function SimpleNavLink({ item }: { item: NavLink }) {
  return <li><Link href={item.href} className="flex items-center gap-3 px-3 py-[18px] text-[15px] font-medium text-[#414042] transition-colors hover:text-[#3fa535]"><NavItemIcon label={item.label} />{item.label}</Link></li>;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isCommercial = pathname.startsWith('/commercial');
  const isResidential = !isCommercial;

  const closeMobile = useCallback(() => { setMobileOpen(false); setExpandedMobile(null); document.body.classList.remove('overflow-hidden'); }, []);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(([e]) => setIsSticky(!e.isIntersecting), { threshold: 0 });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileOpen]);

  const tabCls = (active: boolean, size: 'lg' | 'sm') => {
    const py = size === 'lg' ? 'py-3.5' : 'py-2.5';
    const text = size === 'lg' ? 'text-[16px]' : 'text-[14px]';
    return `flex-1 rounded-2xl ${py} text-center ${text} font-bold transition-colors ${
      active ? 'bg-[#f8f5f2] text-[#0d402e] shadow-md' : 'border border-[#f8f5f2]/35 text-[#f8f5f2]/45'
    }`;
  };

  return (
    <header className="font-sans">
      {/* Sentinel for IntersectionObserver */}
      <div ref={sentinelRef} className="h-0 w-0" aria-hidden />

      {/* ===== STATIC GREEN HEADER ===== */}
      <div className="relative z-20 bg-[#0d402e]">
        <div className="mx-auto max-w-[1280px] px-5 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-6">
          {/* Logo + Phone + Hamburger */}
          <div className="flex items-center justify-between">
            <Link href="/" className="shrink-0" aria-label="Zap It home">
              <img src={NAV_LOGO} alt="Zap It Pest Control" className="h-[56px] w-auto brightness-0 invert sm:h-[64px] lg:h-[70px]" />
            </Link>
            <div className="flex items-center gap-3">
              <a href={SITE_CONFIG.phoneTel} className="text-[24px] font-bold tracking-wide text-white hover:text-[#64FF01] sm:text-[28px] lg:text-[34px]">
                9126 0555
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl border border-[#f8f5f2]/35 hover:border-[#f8f5f2]/60 lg:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          </div>
          <p className="mt-1.5 text-[15px] text-white/60 sm:text-[16px]">Pest protection you can trust</p>

          {/* Tabs — fully inside the green area */}
          <div className="mt-4 flex gap-2.5 lg:hidden">
            <Link href="/residential" className={tabCls(isResidential, 'lg')}>Residential</Link>
            <Link href="/commercial-pest-control" className={tabCls(isCommercial, 'lg')}>Commercial</Link>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP NAV ===== */}
      <nav className="relative z-30 hidden border-b border-[#e5e5e5] bg-white lg:block">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5">
          <ul className="flex list-none items-center" aria-label="Primary">
            {MAIN_NAV_LINKS.map((item) => {
              if (item.label === 'Commercial' && item.childGroups) return <CommercialDropdown key={item.href} item={item} />;
              if (item.label === 'Pest Solutions' && item.children) return <PestSolutionsMega key={item.href} item={item} />;
              return <SimpleNavLink key={item.href} item={item} />;
            })}
          </ul>
          <Link href={CONTACT_LINK.href} className="rounded-md bg-[#3fa535] px-6 py-3 text-base font-bold text-white hover:bg-[#0d402e]">Contact Us</Link>
        </div>
      </nav>

      {/* ===== MOBILE STICKY HEADER ===== */}
      <div className={`fixed left-0 top-0 z-[1100] w-full bg-[#0d402e] pb-3 shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-transform duration-200 lg:hidden ${isSticky ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto max-w-[1280px] px-4 pt-2.5 sm:px-5">
          {/* Row 1 */}
          <div className="flex items-center justify-between">
            <Link href="/" className="shrink-0" aria-label="Zap It home">
              <img src={NAV_LOGO} alt="Zap It Pest Control" className="h-[34px] w-auto brightness-0 invert" />
            </Link>
            <div className="flex items-center gap-2.5">
              <a href={SITE_CONFIG.phoneTel} className="text-[17px] font-bold text-white hover:text-[#64FF01]">9126 0555</a>
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
          {/* Row 2 — compact tabs fully inside */}
          <div className="mt-2 flex gap-2">
            <Link href="/residential" className={tabCls(isResidential, 'sm')}>Residential</Link>
            <Link href="/commercial-pest-control" className={tabCls(isCommercial, 'sm')}>Commercial</Link>
          </div>
        </div>
      </div>

      {/* ===== MOBILE MENU — compact dropdown panel ===== */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-[1150] bg-black/30 lg:hidden" onClick={closeMobile} aria-hidden />
          <div className="fixed left-0 right-0 top-0 z-[1200] max-h-[85vh] overflow-y-auto rounded-b-2xl bg-white shadow-2xl lg:hidden animate-slide-down">
            {/* Header row */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e5e5e5] bg-white px-5 py-3">
              <Link href="/" onClick={closeMobile} className="shrink-0"><img src={NAV_LOGO} alt="Zap It" className="h-[32px] w-auto" /></Link>
              <button onClick={closeMobile} className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f8f5f2]" aria-label="Close menu">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#414042" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            {/* Nav items */}
            <ul className="list-none py-1">
              {MAIN_NAV_LINKS.map((item) => {
                const hasDropdown = (item.label === 'Commercial' && item.childGroups) || (item.label === 'Pest Solutions' && item.children);
                if (hasDropdown) {
                  const key = item.label === 'Commercial' ? 'commercial' : 'pest';
                  const isExpanded = expandedMobile === key;
                  return (
                    <li key={item.href} className="border-b border-[#f0f0f0]">
                      <button type="button" onClick={() => setExpandedMobile(isExpanded ? null : key)} className="flex w-full items-center justify-between px-5 py-3.5 text-left text-[15px] font-medium text-[#414042]" aria-expanded={isExpanded}>
                        <span className="flex items-center gap-3"><NavItemIcon label={item.label} />{item.label}</span>
                        <span className={`text-xs text-[#3fa535] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      {isExpanded && item.label === 'Commercial' && item.childGroups && (
                        <div className="bg-[#f8f9fa] py-1">
                          {item.childGroups.map((g) => (<div key={g.title}><h4 className="px-10 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#636363]">{g.title}</h4><ul>{g.items.map((c) => <li key={c.href}><Link href={c.href} onClick={closeMobile} className="block px-10 py-2.5 text-[14px] text-[#414042] hover:text-[#3fa535]">{c.label}</Link></li>)}</ul></div>))}
                        </div>
                      )}
                      {isExpanded && item.label === 'Pest Solutions' && item.children && (
                        <div className="bg-[#f8f9fa] py-1"><ul>{item.children.map((c) => <li key={c.href}><Link href={c.href} onClick={closeMobile} className="block px-10 py-2.5 text-[14px] text-[#414042] hover:text-[#3fa535]">{c.label}</Link></li>)}</ul></div>
                      )}
                    </li>
                  );
                }
                return (
                  <li key={item.href} className="border-b border-[#f0f0f0]">
                    <Link href={item.href} onClick={closeMobile} className="flex items-center gap-3 px-5 py-3.5 text-[15px] font-medium text-[#414042] hover:text-[#3fa535]"><NavItemIcon label={item.label} />{item.label}</Link>
                  </li>
                );
              })}
              <li>
                <Link href={CONTACT_LINK.href} onClick={closeMobile} className="flex items-center gap-3 px-5 py-3.5 text-[15px] font-medium text-[#414042] hover:text-[#3fa535]"><NavItemIcon label="Contact Us" />Contact Us</Link>
              </li>
            </ul>
            {/* CTA at bottom */}
            <div className="border-t border-[#e5e5e5] px-5 py-4">
              <a href={SITE_CONFIG.phoneTel} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3fa535] py-3 text-[15px] font-bold text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                Call Now — {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </>
      )}

      {/* ===== DESKTOP STICKY HEADER ===== */}
      <div className={`fixed left-0 top-0 z-[1100] hidden w-full border-b border-[#e5e5e5] bg-white shadow-lg transition-transform duration-150 lg:block ${isSticky ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-2.5">
          <Link href="/" className="shrink-0"><img src={NAV_LOGO} alt="Zap It Pest Control" className="h-[36px] w-auto" /></Link>
          <ul className="flex list-none items-center">
            {MAIN_NAV_LINKS.map((item) => {
              if (item.label === 'Commercial' && item.childGroups) return <CommercialDropdown key={item.href+'-s'} item={item} />;
              if (item.label === 'Pest Solutions' && item.children) return <PestSolutionsMega key={item.href+'-s'} item={item} />;
              return <SimpleNavLink key={item.href+'-s'} item={item} />;
            })}
          </ul>
          <Link href={CONTACT_LINK.href} className="rounded-md bg-[#3fa535] px-6 py-3 text-base font-bold text-white hover:bg-[#0d402e]">Contact Us</Link>
        </div>
      </div>
    </header>
  );
}
