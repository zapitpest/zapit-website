'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, NAV_LINKS, type NavLink } from '@/lib/constants';
import { Phone, Menu, X, ChevronDown, Star } from 'lucide-react';

function DesktopNavDropdown({ item }: { item: NavLink }) {
  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="flex items-center gap-1 text-sm font-medium text-zapit-dark hover:text-zapit-green transition-colors py-2"
      >
        {item.label}
        <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
      </Link>
      {item.children && (
        <div className="absolute left-0 top-full z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 min-w-[220px] rounded-lg bg-white shadow-lg border border-zapit-border py-2">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm text-zapit-text hover:bg-zapit-light hover:text-zapit-green transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  return (
    <>
      {/* Top bar */}
      <div className="bg-zapit-dark text-white text-xs py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <Link href="#reviews" className="flex items-center gap-1 hover:text-zapit-green transition-colors">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </span>
            <span>{SITE_CONFIG.rating.count}+ 5-Star Google Reviews</span>
          </Link>
          <Link href={SITE_CONFIG.phoneTel} className="flex items-center gap-1 hover:text-zapit-green transition-colors font-medium">
            <Phone className="h-3 w-3" />
            CALL US NOW – {SITE_CONFIG.phoneRaw}
          </Link>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-[70px]">
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

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <DesktopNavDropdown key={item.href} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-zapit-dark hover:text-zapit-green transition-colors py-2"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-1.5 bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold text-xs px-3 py-2 rounded-full transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              Call Now
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-zapit-dark"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Green sub-bar - matching WordPress */}
        <div className="bg-zapit-green text-white text-center text-sm font-medium py-2">
          <Link href={SITE_CONFIG.phoneTel} className="hover:underline">
            Book Same-Day Pest Control in Melbourne - <strong>CALL NOW!</strong>
          </Link>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-zapit-border shadow-lg max-h-[80vh] overflow-y-auto">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((item) =>
                item.children ? (
                  <div key={item.href}>
                    <button
                      onClick={() => setExpandedMobile(expandedMobile === item.href ? null : item.href)}
                      className="flex items-center justify-between w-full text-left text-sm font-medium text-zapit-dark py-2.5 px-2 rounded-lg hover:bg-zapit-light transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedMobile === item.href ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedMobile === item.href && (
                      <div className="ml-4 border-l-2 border-zapit-green/20 pl-3 py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm text-zapit-text py-2 hover:text-zapit-green transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-zapit-dark py-2.5 px-2 rounded-lg hover:bg-zapit-light transition-colors"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
