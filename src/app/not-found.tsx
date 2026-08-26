import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Home, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

// Branded 404. Replaces the unbranded Next default. Post-cutover this page
// will receive traffic from ~300 legacy WordPress URLs that aren't yet in
// public/_redirects, so it needs a clear path back to a booking action.
export const metadata: Metadata = {
  title: 'Page not found',
  description: `The page you're looking for has moved or no longer exists. Reach ${SITE_CONFIG.shortName} on ${SITE_CONFIG.phone}.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-[#0d402e] to-[#0d402e]/95 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-2xl px-5 text-center sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#64FF01]">Error 404</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          This page has moved or no longer exists
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/80 sm:text-base">
          The URL you followed didn&apos;t match a page on our site. Here&apos;s the fastest way
          to get back on track — call our team, jump to the homepage, or find your suburb.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SITE_CONFIG.phoneTel}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#64FF01] px-6 py-3.5 text-[15px] font-bold text-[#0d402e] transition-transform hover:scale-105 sm:w-auto"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Call now — {SITE_CONFIG.phone}
          </a>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            <Home className="h-4 w-4" aria-hidden />
            Go to homepage
          </Link>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#64FF01]">Try these</p>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { label: 'Residential pest control', href: '/' },
              { label: 'Commercial pest control', href: '/commercial-pest-control' },
              { label: 'Service areas across Melbourne', href: '/service-areas' },
              { label: 'Contact the team', href: '/contact-us' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-[#64FF01]" aria-hidden />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-[13px] text-white/60">
          {SITE_CONFIG.operatingHours}
        </p>
      </div>
    </section>
  );
}
