import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

const TRUST_BADGES = [
  'Child safe', 'Pet safe', 'Eco friendly', 'Insured', 'DHHS Licensed', 'Accredited',
] as const;

export default function HomeHero() {
  return (
    <section className="w-full bg-[#0d402e]">
      <div className="w-full px-3 py-2 sm:px-4 sm:py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/residential/hero-cottage.png"
          alt="Protecting your family and home from pest damage and harm - 5 star Google rating"
          className="h-auto w-full"
          loading="eager"
        />
      </div>

      <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-3 flex flex-wrap gap-3">
            <a href={SITE_CONFIG.phoneTel} className="animate-subtle-glow inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-full bg-[#64FF01] px-7 py-3 text-[15px] font-bold text-[#0d402e] shadow-lg transition-transform hover:scale-105">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call Now — {SITE_CONFIG.phone}
            </a>
            <Link href="/residential" className="inline-flex min-h-[48px] items-center rounded-full border border-white/30 px-7 py-3 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10">
              View all treatments
            </Link>
          </div>

          <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {TRUST_BADGES.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-[14px] font-medium text-white/90 sm:text-[15px]">
                <svg className="h-4 w-4 shrink-0 text-[#3fa535]" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {badge}
              </span>
            ))}
          </div>

          <p className="text-[13px] text-white/50 sm:text-[14px]">Mon-Sun 6am-6pm · After-hours emergency calls accepted</p>
        </div>
      </div>
    </section>
  );
}
