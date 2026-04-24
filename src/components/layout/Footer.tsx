import Link from 'next/link';
import { SITE_CONFIG, FOOTER_LINKS } from '@/lib/constants';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

const MAPS_EMBED_SRC =
  'https://maps.google.com/maps?q=80+Porter+Rd,+Heidelberg+Heights+VIC+3081,+Australia&t=m&z=15&output=embed&iwloc=near';

function SocialIconInstagram(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function SocialIconFacebook(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SocialIconTiktok(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43v-7.44a8.16 8.16 0 005.58 2.17V11a4.85 4.85 0 01-3.77-1.72v4.48" />
    </svg>
  );
}

const WORKING_HOURS = [
  'Tuesday: Open 24 hours',
  'Wednesday: Open 24 hours',
  'Thursday: Open 24 hours',
  'Friday: Open 24 hours',
  'Saturday: Open 24 hours',
  'Sunday: Open 24 hours',
  'Monday : Open 24 hours',
] as const;

export default function Footer() {
  return (
    <>
      <footer className="bg-[#131a1c] font-sans text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 md:px-8 lg:px-[50px] lg:py-[60px]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-8">
            <div>
              <h3 className="mb-4 text-[20px] font-semibold italic text-[#3fa535]">Our Company</h3>
              <p className="mb-6 text-[14px] leading-relaxed text-white/85">
                We&apos;re dedicated to your peace of mind. With expert solutions and customized service, we keep your space
                pest-free. Join us in saying goodbye to pests today.
              </p>
              <h4 className="mb-3 text-[18px] font-semibold italic text-[#3fa535]">Working Hours:</h4>
              <ul className="space-y-1 text-[13px] text-white/85">
                {WORKING_HOURS.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <ul className="mt-5 flex items-center gap-3" aria-label="Social media">
                <li>
                  <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80" aria-label="Instagram">
                    <SocialIconInstagram className="h-[18px] w-[18px]" />
                  </a>
                </li>
                <li>
                  <a href={SITE_CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80" aria-label="TikTok">
                    <SocialIconTiktok className="h-[18px] w-[18px]" />
                  </a>
                </li>
                <li>
                  <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80" aria-label="Facebook">
                    <SocialIconFacebook className="h-[18px] w-[18px]" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-[20px] font-semibold italic text-[#3fa535]">Useful Links</h3>
              <ul className="space-y-2">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-[14px] text-white transition-colors hover:text-[#3fa535]"
                    >
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#3fa535]" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-[20px] font-semibold italic text-[#3fa535]">Get in touch</h3>
              <ul className="mb-5 space-y-3 text-[14px] text-white/90">
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#3fa535]" aria-hidden />
                  <a href={SITE_CONFIG.phoneTel} className="hover:text-[#3fa535]">{SITE_CONFIG.phone}</a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#3fa535]" aria-hidden />
                  <a href={`mailto:${SITE_CONFIG.email}`} className="break-all hover:text-[#3fa535]">{SITE_CONFIG.email}</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#3fa535]" aria-hidden />
                  <span>{SITE_CONFIG.address.full}</span>
                </li>
              </ul>
            </div>

            <div className="min-w-0 md:col-span-2 lg:col-span-1 lg:w-[200px]">
              <iframe
                title="Zap It Pest & Termite Control Melbourne on Google Maps"
                src={MAPS_EMBED_SRC}
                className="h-[200px] w-full rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-[15px] text-center sm:flex-row sm:items-center sm:px-6 sm:text-left">
            <p className="text-[13px] text-white/80">
              Copyright &copy; 2024 {SITE_CONFIG.name} | Designed by Apex AI
            </p>
            <Link
              href="/privacy-policy"
              className="text-[13px] text-white/80 transition-colors hover:text-[#3fa535]"
            >
              Privacy Policies
            </Link>
          </div>
        </div>
      </footer>

    </>
  );
}
