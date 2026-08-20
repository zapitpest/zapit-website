import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

const ASSURANCES = ['Child safe', 'Pet safe', 'Eco friendly'] as const;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#3fa535" />
      <path
        d="M7 12.4l3.2 3.2L17 8.8"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RatingStar() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-amber-400" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/**
 * Homepage hero, rebuilt from Zapit_desktop_03 / Zapit_Mobile_04.
 *
 * The previous version rendered a single image and nothing else — the headline,
 * the assurance list and the Google badge were baked into the pixels of
 * hero-cottage.webp, so they could not be edited and no search engine or AI
 * assistant could read them. The only heading on the page was an sr-only h1.
 * All of that copy is real markup here.
 *
 * Mobile keeps the photo first, then the panel. At lg: the design's two-column
 * split takes over — panel left (561 units), photo right (810).
 */
export default function HomeHero() {
  return (
    <section className="w-full bg-zapit-green-dark">
      <div className="mx-auto w-full max-w-[1200px] lg:grid lg:grid-cols-[minmax(0,561fr)_minmax(0,810fr)] lg:items-center lg:gap-10 lg:px-8 lg:py-12">
        {/* Photo — first on mobile, right-hand column on desktop */}
        <div className="order-1 px-3 pt-2 sm:px-4 sm:pt-3 lg:order-2 lg:p-0">
          <picture>
            <source media="(min-width: 1024px)" srcSet="/images/residential/hero-desktop.webp" />
            <img
              src="/images/residential/hero-cottage.webp"
              alt="A Melbourne weatherboard home protected by Zapit pest control"
              className="mx-auto h-auto w-full max-w-[560px] lg:max-w-none lg:rounded-3xl lg:shadow-2xl"
              loading="eager"
            />
          </picture>
        </div>

        {/* Panel — below the photo on mobile, left-hand column on desktop */}
        <div className="order-2 px-5 pb-9 pt-7 sm:px-6 lg:order-1 lg:p-0">
          <h1 className="max-w-[479px] text-[26px] font-normal leading-[1.22] text-[#f8f5f2] sm:text-[28px] lg:text-[32px]">
            Protecting your family and home from pest damage and harm
          </h1>

          <ul className="mt-6 space-y-3">
            {ASSURANCES.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[16px] text-[#f8f5f2] lg:text-[18px]">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>

          {/* Rating comes from SITE_CONFIG so it can never contradict the
              LocalBusiness schema rendered on the same page. */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md">
            <RatingStar />
            <span className="text-[14px] font-medium text-zapit-dark">
              Google rating ({SITE_CONFIG.rating.count})
            </span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={SITE_CONFIG.phoneTel}
              className="inline-flex min-h-[48px] items-center rounded-full bg-zapit-green px-7 py-3 text-[15px] font-bold text-white transition-transform hover:scale-105"
            >
              Call {SITE_CONFIG.phone}
            </a>
            <Link
              href="/pest-solutions"
              className="inline-flex min-h-[48px] items-center rounded-full border border-white/40 px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Pest solutions &amp; price list
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
