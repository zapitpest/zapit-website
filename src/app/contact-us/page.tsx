import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, Clock, Calendar } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';

const MAP_EMBED =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('80 Porter Rd, Heidelberg Heights VIC 3081, Australia') +
  '&output=embed';

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'Contact Us | Zap It Pest Control Melbourne' },
    description: `Call 24/7 ${SITE_CONFIG.name} on ${SITE_CONFIG.phone} for fast pest and termite control. Email ${SITE_CONFIG.email}, visit us at ${SITE_CONFIG.address.full}, or book online — open ${SITE_CONFIG.operatingHours.toLowerCase()}.`,
    alternates: { canonical: '/contact-us' },
    openGraph: { url: '/contact-us' },
  };
}

export default function ContactUsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Contact Us', href: '/contact-us' },
  ]);
  const localBusiness = generateLocalBusinessSchema('Melbourne');
  return (
    <>
      <JsonLd data={[localBusiness, breadcrumbSchema]} />

      <section className="relative bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <p className="text-sm text-gray-300 mb-2">
            <Link href="/" className="hover:text-zapit-green transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Contact Us</span>
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            Contact {SITE_CONFIG.name}
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Reach us by phone, email, or book an appointment online. We are here 24/7.
          </p>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-zapit-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <a
            href={SITE_CONFIG.phoneTel}
            className="block w-full text-center bg-white rounded-2xl border-2 border-zapit-green p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow mb-8"
          >
            <p className="text-sm font-semibold text-zapit-text uppercase tracking-wide mb-2">Call us now</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-zapit-green break-words">
              {SITE_CONFIG.phone}
            </p>
            <p className="text-sm text-zapit-text mt-2">The only number you need for pest &amp; termite help</p>
          </a>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-zapit-border">
              <div className="flex items-center gap-2 text-zapit-dark font-bold mb-3">
                <Mail className="h-5 w-5 text-zapit-green" />
                Email
              </div>
              <ul className="space-y-2 text-zapit-text">
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.emailWork}`}
                    className="text-zapit-green font-medium hover:underline"
                  >
                    {SITE_CONFIG.emailWork}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-zapit-green font-medium hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-zapit-border">
              <div className="flex items-center gap-2 text-zapit-dark font-bold mb-3">
                <MapPin className="h-5 w-5 text-zapit-green" />
                Address
              </div>
              <p className="text-zapit-text leading-relaxed">{SITE_CONFIG.address.full}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-zapit-border md:col-span-2">
              <div className="flex items-center gap-2 text-zapit-dark font-bold mb-2">
                <Clock className="h-5 w-5 text-zapit-green" />
                Operating hours
              </div>
              <p className="text-zapit-text text-lg font-medium">{SITE_CONFIG.operatingHours}</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href={SITE_CONFIG.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg w-full sm:w-auto"
            >
              <Calendar className="h-5 w-5" />
              Book with Square
            </Link>
            <p className="text-xs text-zapit-text mt-2">Secure online booking via {SITE_CONFIG.booking.provider}</p>
          </div>
        </div>
      </section>

      <section className="py-0 bg-zapit-light pb-10 lg:pb-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-lg font-bold text-zapit-dark mb-3">Find us on the map</h2>
          <div className="relative w-full aspect-[16/9] min-h-[280px] rounded-2xl overflow-hidden border border-zapit-border bg-zapit-border shadow">
            <iframe
              title="Zap It Pest & Termite Control — Heidelberg Heights"
              src={MAP_EMBED}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
