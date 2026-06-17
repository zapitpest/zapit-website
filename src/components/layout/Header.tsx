'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG, NAV_LINKS, type NavLink } from '@/lib/constants';

const MAIN_NAV_LINKS = NAV_LINKS.filter((item) => item.label !== 'Contact Us');
const NAV_LOGO = '/images/zapit-logo.svg';
function NavItemIcon(_: { label: string }) { return null; }

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
            <ul>{g.items.slice(g.title === 'Commercial Properties' ? 1 : 0).map((c) => <li key={c.href+c.label}><Link href={c.href} className="block py-2 text-[15px] text-[#414042] hover:text-[#3fa535]">{c.label}</Link></li>)}</ul>
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

function CommercialDropdownDark({ item }: { item: NavLink }) {
  if (!item.childGroups?.length) return null;
  return (
    <li className="group relative">
      <Link href={item.href} className="flex items-center gap-2 px-3 py-[14px] text-[14px] font-medium text-white/80 transition-colors hover:text-[#64FF01]">
        {item.label}<span className="ml-0.5 text-[9px] text-[#64FF01]">▼</span>
      </Link>
      <div className="invisible absolute left-1/2 top-full z-[1000] flex w-[480px] -translate-x-1/2 gap-6 rounded-lg border border-[#e5e5e5] bg-white p-5 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {item.childGroups.map((g) => (
          <div key={g.title} className="flex-1">
            <h4 className="mb-2 border-b border-[#e5e5e5] pb-2 text-base font-bold text-[#131a1c]"><Link href={g.items[0]?.href ?? item.href} className="hover:text-[#3fa535]">{g.title}</Link></h4>
            <ul>{g.items.slice(g.title === 'Commercial Properties' ? 1 : 0).map((c) => <li key={c.href+c.label}><Link href={c.href} className="block py-2 text-[15px] text-[#414042] hover:text-[#3fa535]">{c.label}</Link></li>)}</ul>
          </div>
        ))}
      </div>
    </li>
  );
}

function PestSolutionsMegaDark({ item }: { item: NavLink }) {
  if (!item.children?.length) return null;
  const mid = Math.ceil(item.children.length / 2);
  return (
    <li className="group relative">
      <Link href={item.href} className="flex items-center gap-2 px-3 py-[14px] text-[14px] font-medium text-white/80 transition-colors hover:text-[#64FF01]">
        {item.label}<span className="ml-0.5 text-[9px] text-[#64FF01]">▼</span>
      </Link>
      <div className="invisible absolute left-1/2 top-full z-[1000] flex w-[480px] -translate-x-1/2 gap-6 rounded-lg border border-[#e5e5e5] bg-white p-5 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <ul className="flex-1">{item.children.slice(0, mid).map((c) => <li key={c.href}><Link href={c.href} className="block py-2 text-[15px] text-[#414042] hover:bg-[#f8f5f2] hover:text-[#3fa535]">{c.label}</Link></li>)}</ul>
        <ul className="flex-1">{item.children.slice(mid).map((c) => <li key={c.href}><Link href={c.href} className="block py-2 text-[15px] text-[#414042] hover:bg-[#f8f5f2] hover:text-[#3fa535]">{c.label}</Link></li>)}</ul>
      </div>
    </li>
  );
}

function SimpleNavLinkDark({ item }: { item: NavLink }) {
  return <li><Link href={item.href} className="flex items-center gap-2 px-3 py-[14px] text-[14px] font-medium text-white/80 transition-colors hover:text-[#64FF01]">{item.label}</Link></li>;
}

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isCommercial = pathname.startsWith('/commercial');
  // Home now serves as the residential page (brief item 5: no separate /residential)
  const isResidential = pathname === '/';

  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(([e]) => setIsSticky(!e.isIntersecting), { threshold: 0 });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, []);

  // Tabs reduced in size + weight per client refactor brief #1 (less bold, smaller).
  const tabCls = (active: boolean, size: 'lg' | 'sm') => {
    const py = size === 'lg' ? 'py-2.5' : 'py-2';
    const text = size === 'lg' ? 'text-[14px]' : 'text-[12px]';
    return `flex-1 rounded-2xl ${py} text-center ${text} font-semibold transition-colors ${
      active ? 'bg-[#f8f5f2] text-[#0d402e] shadow-sm' : 'border border-[#f8f5f2]/35 text-[#f8f5f2]/45'
    }`;
  };

  return (
    <header className="font-sans">
      {/* ===== STATIC DARK GREEN HEADER ===== */}
      <div className="relative z-20 bg-[#0d402e]">

        {/* ----- MOBILE / TABLET LAYOUT (stacked): logo + tagline + tabs ----- */}
        <div className="mx-auto max-w-[1280px] px-5 pt-5 pb-3 sm:px-6 sm:pt-6 sm:pb-4 lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="shrink-0" aria-label="Zapit home">
              <img src={NAV_LOGO} alt="Zapit Pest Control" className="h-[64px] w-auto brightness-0 invert sm:h-[72px]" />
            </Link>
            <a
              href={SITE_CONFIG.phoneTel}
              className="-my-2 inline-flex items-center whitespace-nowrap py-2 font-semibold tracking-normal text-white hover:text-[#64FF01]"
              style={{ fontSize: '16px', lineHeight: '28px', fontWeight: 600 }}
            >
              9126 0555
            </a>
          </div>
          {/* Figma spec: Graphik Light 300, 15px / 28lh */}
          <p className="text-white/85" style={{ fontSize: '15px', lineHeight: '28px', fontWeight: 300 }}>
            Pest protection you can trust
          </p>
          <div className="mt-4 flex gap-2.5">
            <Link href="/" className={tabCls(isResidential, 'lg')}>Residential</Link>
            <Link href="/commercial-pest-control" className={tabCls(isCommercial, 'lg')}>Commercial</Link>
          </div>
        </div>

        {/* ----- DESKTOP LAYOUT (single row): logo + nav + phone ----- */}
        <div className="hidden lg:block">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-4">
            <Link href="/" className="shrink-0" aria-label="Zapit home">
              <img src={NAV_LOGO} alt="Zapit Pest Control" className="h-[64px] w-auto brightness-0 invert xl:h-[72px]" />
            </Link>
            <ul className="flex list-none items-center" aria-label="Primary">
              {MAIN_NAV_LINKS.map((item) => {
                if (item.label === 'Commercial' && item.childGroups) return <CommercialDropdownDark key={item.href} item={item} />;
                if (item.label === 'Pest Solutions' && item.children) return <PestSolutionsMegaDark key={item.href} item={item} />;
                return <SimpleNavLinkDark key={item.href} item={item} />;
              })}
            </ul>
            <a href={SITE_CONFIG.phoneTel} className="whitespace-nowrap text-[16px] font-semibold text-white hover:text-[#64FF01]">
              {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Sentinel — sticky header appears only after static header scrolls out.
          bg-[#0d402e] prevents a 1px white seam between header and the next section. */}
      <div ref={sentinelRef} className="h-px w-full bg-[#0d402e]" aria-hidden />

      {/* ===== MOBILE STICKY HEADER (dark green) ===== */}
      <div className={`fixed left-0 top-0 z-[1100] w-full bg-[#0d402e] pb-3 shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-transform duration-200 lg:hidden ${isSticky ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto max-w-[1280px] px-4 pt-2.5 sm:px-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="shrink-0" aria-label="Zapit home">
              <img src={NAV_LOGO} alt="Zapit Pest Control" className="h-[44px] w-auto brightness-0 invert" />
            </Link>
            <div className="flex items-center gap-2.5">
              {/* Brief item 6: burger removed from sticky header — FloatingCTA provides menu+call */}
              <a href={SITE_CONFIG.phoneTel} className="-my-2 inline-flex items-center whitespace-nowrap py-2 text-[15px] font-semibold leading-[24px] text-white hover:text-[#64FF01]">9126 0555</a>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <Link href="/" className={tabCls(isResidential, 'sm')}>Residential</Link>
            <Link href="/commercial-pest-control" className={tabCls(isCommercial, 'sm')}>Commercial</Link>
          </div>
        </div>
      </div>

      {/* Brief item 6: mobile menu overlay removed — FloatingCTA's menu now serves as the single menu access point */}

      {/* ===== DESKTOP STICKY HEADER (dark green) ===== */}
      <div className={`fixed left-0 top-0 z-[1100] hidden w-full bg-[#0d402e] shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-transform duration-150 lg:block ${isSticky ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-2.5">
          <Link href="/" className="shrink-0"><img src={NAV_LOGO} alt="Zapit Pest Control" className="h-[48px] w-auto brightness-0 invert" /></Link>
          <ul className="flex list-none items-center">
            {MAIN_NAV_LINKS.map((item) => {
              if (item.label === 'Commercial' && item.childGroups) return <CommercialDropdownDark key={item.href+'-s'} item={item} />;
              if (item.label === 'Pest Solutions' && item.children) return <PestSolutionsMegaDark key={item.href+'-s'} item={item} />;
              return <SimpleNavLinkDark key={item.href+'-s'} item={item} />;
            })}
          </ul>
          {/* Sticky header keeps phone link only — FloatingCTA provides the global Call Now. */}
          <a href={SITE_CONFIG.phoneTel} className="text-[14px] font-semibold text-white/80 hover:text-white">{SITE_CONFIG.phone}</a>
        </div>
      </div>
    </header>
  );
}
