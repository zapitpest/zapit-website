import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ChevronRight, Shield, MapPin, Clock, Star } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import StatsCounter from '@/components/sections/StatsCounter';

const SUBURB = 'Reservoir';
const REGION = 'North';

export const metadata: Metadata = {
  title: { absolute: `Zap It Pest Control ${SUBURB} | ${SITE_CONFIG.name}` },
  description: `Professional pest control in ${SUBURB}, Melbourne. Same-day service, licensed technicians, safe for pets & people. Call ${SITE_CONFIG.phone} for fast pest removal in ${SUBURB}.`,
  alternates: { canonical: `/${SUBURB.toLowerCase()}` },
  openGraph: {
    title: `Zap It Pest Control ${SUBURB} | ${SITE_CONFIG.name}`,
    description: `Professional pest control in ${SUBURB}, Melbourne. Same-day 24/7 service.`,
    url: `${SITE_CONFIG.url}/${SUBURB.toLowerCase()}`,
  },
};

const SERVICES = [
  'General Pest Treatment',
  'Termite Inspections & Barriers',
  'Spider & Web Removal',
  'Rodent Control & Prevention',
  'Cockroach Treatment',
  'Ant & Flea Control',
  'Bee & Wasp Removal',
  'Mosquito Treatment',
  'Possum Removal',
  'Bed Bug Treatment',
] as const;

export default function ReservoirPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', href: SITE_CONFIG.url },
    { name: 'Service Areas', href: `${SITE_CONFIG.url}/service-areas` },
    { name: `Pest Control ${SUBURB}`, href: `${SITE_CONFIG.url}/${SUBURB.toLowerCase()}` },
  ]);
  const localBusiness = generateLocalBusinessSchema(SUBURB);

  return (
    <>
      <JsonLd data={[localBusiness, breadcrumb]} />

      <section className="bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zapit-green">{SUBURB}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Zap It Pest Control {SUBURB}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
            Professional pest &amp; termite control for homes and businesses in {SUBURB},
            Melbourne. Same-day service available 24/7 — licensed, insured, and safe for
            your family and pets.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call {SITE_CONFIG.phone}
            </Link>
            <Link
              href={SITE_CONFIG.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors border border-white/20"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-zapit-green text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: MapPin, label: `${SUBURB} coverage`, value: 'Local Team' },
              { icon: Clock, label: 'Response time', value: '< 2 Hours' },
              { icon: Shield, label: 'Licensed & insured', value: 'DHHS' },
              { icon: Star, label: 'Google rating', value: `${SITE_CONFIG.rating.value} Stars` },
            ].map((item) => (
              <div key={item.label}>
                <item.icon className="h-8 w-8 mx-auto mb-2 opacity-90" />
                <p className="font-bold text-lg">{item.value}</p>
                <p className="text-sm opacity-80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark mb-4">
            Why {SUBURB} Residents Trust Zap It Pest Control
          </h2>
          <p className="text-zapit-text leading-relaxed mb-8 max-w-3xl">
            {SUBURB} is part of Melbourne&apos;s {REGION} region and faces unique pest
            challenges throughout the year. Our licensed technicians understand local pest
            patterns and deliver treatments tailored to {SUBURB} homes and businesses.
          </p>
          <h3 className="text-xl font-bold text-zapit-dark mb-6">
            Pest Control Services in {SUBURB}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {SERVICES.map((service) => (
              <div key={service} className="flex items-center gap-3 p-4 bg-zapit-light rounded-lg border border-zapit-border">
                <Shield className="h-5 w-5 text-zapit-green shrink-0" />
                <span className="text-zapit-text font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-zapit-light">
        <div className="container mx-auto px-4">
          <StatsCounter />
        </div>
      </section>

      <section className="py-12 bg-zapit-green text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Pest Control in {SUBURB}?
          </h2>
          <p className="text-lg mb-6 opacity-90">Same-day service available. Call now or book online.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-2 bg-white text-zapit-green font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {SITE_CONFIG.phone}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
