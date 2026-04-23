'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, NAV_LINKS, type NavLink } from '@/lib/constants';
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Home,
  Building2,
  Bug,
  MapPin,
  HelpCircle,
} from 'lucide-react';

const MAIN_NAV_LINKS = NAV_LINKS.filter((item) => item.label !== 'Contact Us');
const CONTACT_LINK = NAV_LINKS.find((item) => item.label === 'Contact Us')!;

const navIconClass = 'h-4 w-4 shrink-0 text-zapit-green';

function NavItemIcon({ item }: { item: NavLink }) {
  switch (item.label) {
    case 'Residential':
      return <Home className={navIconClass} aria-hidden />;
    case 'Commercial':
      return <Building2 className={navIconClass} aria-hidden />;
    case 'Termites':
    case 'Pest Solutions':
      return <Bug className={navIconClass} aria-hidden />;
    case 'Service Areas':
      return <MapPin className={navIconClass} aria-hidden />;
    case 'FAQs':
      return <HelpCircle className={navIconClass} aria-hidden />;
    default:
      return null;
  }
}

function CommercialDropdown({ item }: { item: NavLink }) {
  if (!item.childGroups?.length) return null;
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="flex items-center gap-1.5 text-sm font-medium text-zapit-dark hover:text-zapit-green transition-colors py-2"
      >
        <NavItemIcon item={item} />
        {item.label}
        <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" aria-hidden />
      </Link>
      <div className="absolute left-0 top-full z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 min-w-[280px] rounded-lg bg-white shadow-lg border border-zapit-border py-3 px-2">
        {item.childGroups.map((group) => (
          <div key={group.title} className="mb-3 last:mb-0">
            <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zapit-green">
              {group.title}
            </p>
            <ul>
              {group.items.map((child) => (
                <li key={child.href + child.label}>
                  <Link
                    href={child.href}
                    className="block px-3 py-2 text-sm text-zapit-text hover:bg-zapit-light hover:text-zapit-green transition-colors rounded-md"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PestSolutionsMega({ item }: { item: NavLink }) {
  if (!item.children?.length) return null;
  const mid = Math.ceil(item.children.length / 2);
  const col1 = item.children.slice(0, mid);
  const col2 = item.children.slice(mid);
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="flex items-center gap-1.5 text-sm font-medium text-zapit-dark hover:text-zapit-green transition-colors py-2"
      >
        <NavItemIcon item={item} />
        {item.label}
        <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" aria-hidden />
      </Link>
      <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 w-max max-w-[min(100vw-2rem,640px)] rounded-lg bg-white shadow-lg border border-zapit-border p-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-0">
          <ul>
            {col1.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block py-1.5 text-sm text-zapit-text hover:text-zapit-green transition-colors whitespace-nowrap"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            {col2.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block py-1.5 text-sm text-zapit-text hover:text-zapit-green transition-colors whitespace-nowrap"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SimpleNavLink({ item }: { item: NavLink }) {
  return (
    <Link
      href={item.href}
      className="flex items-center gap-1.5 text-sm font-medium text-zapit-dark hover:text-zapit-green transition-colors py-2"
    >
      <NavItemIcon item={item} />
      {item.label}
    </Link>
  );
}

function DesktopNavItem({ item }: { item: NavLink }) {
  if (item.label === 'Commercial' && item.childGroups) {
    return <CommercialDropdown key={item.href} item={item} />;
  }
  if (item.label === 'Pest Solutions' && item.children) {
    return <PestSolutionsMega key={item.href} item={item} />;
  }
  return <SimpleNavLink item={item} />;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  return (
    <header>
      {/* 1. Top bar */}
      <div className="bg-[#252525] text-white text-xs sm:text-sm py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1" aria-label="5 star Google reviews">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400" aria-hidden>
                  ★
                </span>
              ))}
            </div>
            <span className="text-white/95">
              {SITE_CONFIG.rating.count}+ 5-Star Google Reviews
            </span>
            <Link href="#reviews" className="text-zapit-green font-medium hover:underline">
              View Testimonials
            </Link>
          </div>
          <Link
            href={SITE_CONFIG.phoneTel}
            className="flex items-center gap-1.5 hover:text-zapit-green transition-colors font-medium"
          >
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
            CALL US NOW – {SITE_CONFIG.phoneRaw}
          </Link>
        </div>
      </div>

      {/* 2. Sticky main nav (white) */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-[70px] gap-3">
          <Link href="/" className="flex-shrink-0">
            <Image
              src={SITE_CONFIG.logo}
              alt={SITE_CONFIG.shortName}
              width={120}
              height={58}
              priority
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-center flex-1 gap-4 xl:gap-5 min-w-0">
            {MAIN_NAV_LINKS.map((item) => (
              <DesktopNavItem key={item.href + item.label} item={item} />
            ))}
          </nav>

          <div className="hidden lg:block flex-shrink-0">
            <Link
              href={CONTACT_LINK.href}
              className="inline-flex items-center justify-center bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <Link
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-1 bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors"
            >
              <Phone className="h-3 w-3 shrink-0" aria-hidden />
              Call Now
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 text-zapit-dark"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Green sub-bar (not sticky) */}
      <div className="bg-zapit-green text-white text-center text-xs sm:text-sm font-medium py-2 px-3">
        <p>
          Book Same-Day Pest Control in Melbourne -{' '}
          <a href={SITE_CONFIG.phoneTel} className="font-bold underline decoration-white/80 hover:decoration-white">
            CALL NOW!
          </a>
        </p>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-zapit-border shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {MAIN_NAV_LINKS.map((item) => {
              if (item.label === 'Commercial' && item.childGroups) {
                return (
                  <div key={item.href} className="border-b border-zapit-border/60 pb-2 mb-1">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobile(expandedMobile === `commercial` ? null : 'commercial')
                      }
                      className="flex items-center justify-between w-full text-left text-sm font-medium text-zapit-dark py-2.5 px-2 rounded-lg hover:bg-zapit-light transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <NavItemIcon item={item} />
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expandedMobile === 'commercial' ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expandedMobile === 'commercial' &&
                      item.childGroups.map((group) => (
                        <div key={group.title} className="ml-2 mt-1 mb-2">
                          <p className="text-xs font-semibold text-zapit-green px-2 py-1">{group.title}</p>
                          <ul className="ml-2 border-l-2 border-zapit-green/20 pl-2">
                            {group.items.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block text-sm text-zapit-text py-1.5 hover:text-zapit-green"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                );
              }
              if (item.label === 'Pest Solutions' && item.children) {
                return (
                  <div key={item.href} className="border-b border-zapit-border/60 pb-2 mb-1">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobile(expandedMobile === 'pest' ? null : 'pest')
                      }
                      className="flex items-center justify-between w-full text-left text-sm font-medium text-zapit-dark py-2.5 px-2 rounded-lg hover:bg-zapit-light transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <NavItemIcon item={item} />
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expandedMobile === 'pest' ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expandedMobile === 'pest' && (
                      <div className="ml-2 mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0 pl-1 border-l-2 border-zapit-green/20">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm text-zapit-text py-1.5 hover:text-zapit-green pl-2"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-zapit-dark py-2.5 px-2 rounded-lg hover:bg-zapit-light transition-colors"
                >
                  <NavItemIcon item={item} />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={CONTACT_LINK.href}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold text-sm px-4 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
