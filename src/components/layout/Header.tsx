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
  Star,
} from 'lucide-react';

const MAIN_NAV_LINKS = NAV_LINKS.filter((item) => item.label !== 'Contact Us');
const CONTACT_LINK = NAV_LINKS.find((item) => item.label === 'Contact Us')!;

const navIconClass = 'h-4 w-4 shrink-0 text-zapit-green';

const NAV_LOGO = '/images/logo/zapit-logo-nav.png';

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
    <div className="group relative">
      <Link
        href={item.href}
        className="flex items-center gap-1.5 text-sm font-medium text-zapit-heading-dark hover:text-zapit-green transition-colors py-2"
      >
        <NavItemIcon item={item} />
        {item.label}
        <ChevronDown
          className="h-3 w-3 transition-transform group-hover:rotate-180"
          aria-hidden
        />
      </Link>
      <div
        className="invisible absolute left-0 top-full z-50 min-w-[280px] rounded-lg border border-zapit-border bg-white py-3 px-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100"
        role="region"
        aria-label={`${item.label} submenu`}
      >
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
                    className="block rounded-md px-3 py-2 text-sm text-zapit-text transition-colors hover:bg-zapit-light hover:text-zapit-green"
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
    <div className="group relative">
      <Link
        href={item.href}
        className="flex items-center gap-1.5 text-sm font-medium text-zapit-heading-dark hover:text-zapit-green transition-colors py-2"
      >
        <NavItemIcon item={item} />
        {item.label}
        <ChevronDown
          className="h-3 w-3 transition-transform group-hover:rotate-180"
          aria-hidden
        />
      </Link>
      <div
        className="invisible absolute left-1/2 top-full z-50 w-max max-w-[min(100vw-2rem,640px)] -translate-x-1/2 rounded-lg border border-zapit-border bg-white p-4 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100"
        role="region"
        aria-label={`${item.label} mega menu`}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-0">
          <ul>
            {col1.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block whitespace-nowrap py-1.5 text-sm text-zapit-text transition-colors hover:text-zapit-green"
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
                  className="block whitespace-nowrap py-1.5 text-sm text-zapit-text transition-colors hover:text-zapit-green"
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
      className="flex items-center gap-1.5 text-sm font-medium text-zapit-heading-dark hover:text-zapit-green transition-colors py-2"
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
    <header className="font-sans">
      {/* Top Bar */}
      <div className="bg-zapit-heading-dark text-xs text-white sm:text-sm">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Google rating">
            <div className="flex items-center gap-0.5" role="img" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400 sm:h-4 sm:w-4"
                  strokeWidth={0}
                  aria-hidden
                />
              ))}
            </div>
            <span className="text-white/95">
              Rated {SITE_CONFIG.rating.value} | {SITE_CONFIG.rating.count} reviews
            </span>
          </div>
          <a
            href={SITE_CONFIG.phoneTel}
            className="inline-flex items-center gap-1.5 font-medium text-zapit-green transition-colors hover:text-white"
            aria-label={`Call ${SITE_CONFIG.phone}`}
          >
            <Phone className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
            {SITE_CONFIG.phone}
          </a>
        </div>
      </div>

      {/* Sticky Nav Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" className="shrink-0" aria-label={`${SITE_CONFIG.shortName} home`}>
            <Image
              src={NAV_LOGO}
              alt={SITE_CONFIG.shortName}
              width={200}
              height={50}
              priority
              className="h-[50px] w-auto"
            />
          </Link>

          <nav
            className="hidden min-w-0 items-center justify-center gap-3 lg:flex lg:gap-4 xl:gap-5"
            aria-label="Primary"
          >
            {MAIN_NAV_LINKS.map((item) => (
              <DesktopNavItem key={item.href + item.label} item={item} />
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Link
              href={CONTACT_LINK.href}
              className="inline-flex items-center justify-center rounded-lg bg-zapit-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zapit-green-dark"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-1 rounded-lg bg-zapit-green px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-zapit-green-dark sm:px-3 sm:text-xs"
              aria-label={`Call ${SITE_CONFIG.phone}`}
            >
              <Phone className="h-3 w-3 shrink-0" aria-hidden />
              Call
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 text-zapit-heading-dark"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Green CTA Sub-bar */}
      <div className="bg-zapit-green text-center text-xs font-medium text-white sm:text-sm">
        <div className="mx-auto max-w-[1400px] px-4 py-2 sm:px-6">
          <p>
            Book Same-Day Pest Control &mdash; CALL NOW!{' '}
            <a
              href={SITE_CONFIG.phoneTel}
              className="whitespace-nowrap font-bold underline decoration-white/80 underline-offset-2 hover:decoration-white"
            >
              {SITE_CONFIG.phone}
            </a>
          </p>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-b border-zapit-border bg-white shadow-lg lg:hidden">
          <nav
            className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-4"
            aria-label="Primary mobile"
          >
            {MAIN_NAV_LINKS.map((item) => {
              if (item.label === 'Commercial' && item.childGroups) {
                return (
                  <div key={item.href} className="mb-1 border-b border-zapit-border/60 pb-2">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobile(expandedMobile === 'commercial' ? null : 'commercial')
                      }
                      className="flex w-full items-center justify-between rounded-lg py-2.5 pl-2 pr-2 text-left text-sm font-medium text-zapit-heading-dark transition-colors hover:bg-zapit-light"
                      aria-expanded={expandedMobile === 'commercial'}
                    >
                      <span className="flex items-center gap-2">
                        <NavItemIcon item={item} />
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expandedMobile === 'commercial' ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    </button>
                    {expandedMobile === 'commercial' &&
                      item.childGroups.map((group) => (
                        <div key={group.title} className="mb-2 ml-2 mt-1">
                          <p className="px-2 py-1 text-xs font-semibold text-zapit-green">
                            {group.title}
                          </p>
                          <ul className="ml-2 border-l-2 border-zapit-green/20 pl-2">
                            {group.items.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-1.5 text-sm text-zapit-text hover:text-zapit-green"
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
                  <div key={item.href} className="mb-1 border-b border-zapit-border/60 pb-2">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobile(expandedMobile === 'pest' ? null : 'pest')
                      }
                      className="flex w-full items-center justify-between rounded-lg py-2.5 pl-2 pr-2 text-left text-sm font-medium text-zapit-heading-dark transition-colors hover:bg-zapit-light"
                      aria-expanded={expandedMobile === 'pest'}
                    >
                      <span className="flex items-center gap-2">
                        <NavItemIcon item={item} />
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expandedMobile === 'pest' ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    </button>
                    {expandedMobile === 'pest' && (
                      <div className="ml-2 mt-1 grid grid-cols-1 gap-y-0 border-l-2 border-zapit-green/20 pl-1 sm:grid-cols-2 sm:gap-x-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1.5 pl-2 text-sm text-zapit-text hover:text-zapit-green"
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
                  className="flex items-center gap-2 rounded-lg py-2.5 pl-2 pr-2 text-sm font-medium text-zapit-heading-dark transition-colors hover:bg-zapit-light"
                >
                  <NavItemIcon item={item} />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={CONTACT_LINK.href}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-zapit-green px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zapit-green-dark"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
