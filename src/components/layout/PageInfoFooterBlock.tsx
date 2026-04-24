import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { Phone, Mail, MapPin } from 'lucide-react';

function SocialIconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SocialIconTiktok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43v-7.44a8.16 8.16 0 005.58 2.17V11a4.85 4.85 0 01-3.77-1.72v4.48" />
    </svg>
  );
}

function SocialIconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const DISPLAY_PHONE = '(03) 9126 0555';
const ABN = 'ABN 61 682 004 655';
const BUSINESS = 'Zap It Pest & Termite Control';
const ADDRESS = '80 Porter Rd, Heidelberg Heights, VIC 3081';

const OPERATING_HOURS = [
  'Monday, 8am – 5pm',
  'Tuesday, 8am – 5pm',
  'Wednesday, 8am – 5pm',
  'Thursday, 8am – 5pm',
  'Friday, 8am – 5pm',
  'Saturday, 8am – 12pm',
  'Sunday, Closed',
] as const;

const OUR_PROMISE =
  "When you protect your home and property from pests with us, your peace of mind is assured. Our services are eco-friendly, child safe, pet safe and we're fully insured and DHHS Licensed. We treat your home with the same care as you do, using high-quality long-lasting solutions you can rely on.";

const SITEMAP_LINKS: { label: string; href: string }[] = [
  { label: 'Residential', href: '/residential' },
  { label: 'Commercial', href: '/commercial-pest-control' },
  { label: 'About us', href: '/about-us' },
  { label: 'Service area', href: '/service-areas' },
  { label: 'Price list', href: '/pricing' },
  { label: 'FAQs', href: '/frequently-asked-questions' },
  { label: 'Contact us', href: '/contact-us' },
];

export default function PageInfoFooterBlock() {
  return (
    <section
      className="border-t border-white/10 bg-[#2b2b2b] font-sans text-white"
      aria-label="Contact and company information"
    >
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-12 md:max-w-4xl">
        {/* Business info */}
        <div className="space-y-3 text-[15px] leading-relaxed sm:text-base">
          <p className="text-lg font-bold text-white sm:text-xl">{BUSINESS}</p>
          <p className="flex items-start gap-2 text-white/90">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-zapit-green" aria-hidden />
            {ADDRESS}
          </p>
          <p className="text-white/90">{ABN}</p>
          <p className="flex items-center gap-2 text-white/90">
            <Phone className="h-5 w-5 shrink-0 text-zapit-green" aria-hidden />
            <a href={SITE_CONFIG.phoneTel} className="font-medium text-white transition-colors hover:text-zapit-green">
              {DISPLAY_PHONE}
            </a>
          </p>
          <p className="flex items-start gap-2 text-white/90">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-zapit-green" aria-hidden />
            <a
              href={`mailto:${SITE_CONFIG.emailWork}`}
              className="break-all text-white underline decoration-white/40 underline-offset-2 transition-colors hover:text-zapit-green hover:decoration-zapit-green"
            >
              {SITE_CONFIG.emailWork}
            </a>
          </p>
        </div>

        {/* Our promise */}
        <div>
          <h2 className="mb-2 text-base font-bold text-white sm:text-lg">Our promise</h2>
          <p className="text-[15px] leading-[1.6] text-white/90 sm:text-base">{OUR_PROMISE}</p>
        </div>

        {/* Operating hours */}
        <div>
          <h2 className="mb-3 text-base font-bold text-white sm:text-lg">Operating Hours</h2>
          <ul className="list-none space-y-1.5 text-[15px] text-white/90 sm:text-base">
            {OPERATING_HOURS.map((row) => (
              <li key={row} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zapit-green" aria-hidden />
                {row}
              </li>
            ))}
          </ul>
        </div>

        {/* Sitemap */}
        <div>
          <h2 className="mb-3 text-base font-bold text-white sm:text-lg">Sitemap</h2>
          <ul className="flex list-none flex-col gap-2">
            {SITEMAP_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] text-white/90 underline decoration-white/30 underline-offset-2 transition-colors hover:text-zapit-green hover:decoration-zapit-green sm:text-base"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 border-t border-white/10 pt-4" aria-label="Social media">
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 transition-opacity hover:opacity-80"
            aria-label="Instagram"
          >
            <SocialIconInstagram className="h-6 w-6" />
          </a>
          <a
            href={SITE_CONFIG.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 transition-opacity hover:opacity-80"
            aria-label="TikTok"
          >
            <SocialIconTiktok className="h-6 w-6" />
          </a>
          <a
            href={SITE_CONFIG.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 transition-opacity hover:opacity-80"
            aria-label="Facebook"
          >
            <SocialIconFacebook className="h-6 w-6" />
          </a>
        </div>

        {/* Legal */}
        <div className="space-y-2 border-t border-white/10 pt-6 text-sm text-white/70">
          <p>&copy; Zap It Pest &amp; Termite Control of Melbourne</p>
          <p>Managed by Delivix</p>
          <Link
            href="/privacy-policy"
            className="inline-block text-white/90 underline decoration-white/30 underline-offset-2 transition-colors hover:text-zapit-green"
          >
            Privacy Policies
          </Link>
        </div>
      </div>
    </section>
  );
}
