import { SITE_CONFIG } from '@/lib/constants';

export default function CommercialHeroSlider() {
  return (
    <section className="w-full bg-[#0d402e]">
      <div className="w-full px-3 py-2 sm:px-4 sm:py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/commercial/commercial-kitchen-hero.png"
          alt="Tailored solutions to protect your business - Commercial kitchen pest control"
          className="h-auto w-full"
          loading="eager"
        />
      </div>

      <div className="px-5 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-3 flex flex-wrap gap-3">
            <a href={SITE_CONFIG.phoneTel} className="group inline-flex min-h-[48px] items-center gap-2 whitespace-nowrap rounded-full bg-[#64FF01] px-7 py-3 text-[15px] font-bold text-[#0d402e] shadow-lg transition-transform hover:scale-105 animate-subtle-glow">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call Now — {SITE_CONFIG.phone}
            </a>
            <a href="#industries" className="inline-flex min-h-[48px] items-center rounded-full border border-white/30 px-7 py-3 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10">
              View industries
            </a>
          </div>

          <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {['Fully insured', 'Licensed', 'Food-safety aware', 'Accredited', 'Family Friendly'].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-[12px] font-medium text-white/90 sm:text-[13px]">
                <svg className="h-4 w-4 shrink-0 text-[#64FF01]" fill="none" viewBox="0 0 24 24">
                  <rect width="16" height="16" x="4" y="4" rx="4" fill="currentColor" />
                  <path d="M8 12l3 3 5-5" stroke="#0d402e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {badge}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-white/50 sm:text-[12px]">Same-day service available · After-hours emergency calls accepted</p>
        </div>
      </div>
    </section>
  );
}
