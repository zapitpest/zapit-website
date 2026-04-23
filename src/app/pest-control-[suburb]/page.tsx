import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, ChevronRight, Shield, MapPin, Clock, Star } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { ALL_SUBURBS, SUBURB_SLUGS, getSuburbBySlug } from '@/lib/suburb-data';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import StatsCounter from '@/components/sections/StatsCounter';

type Props = { params: Promise<{ suburb: string }> };

export function generateStaticParams() {
  return SUBURB_SLUGS.filter((s) => s.startsWith('pest-control-')).map((slug) => ({
    suburb: slug.replace('pest-control-', ''),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params;
  const fullSlug = `pest-control-${suburb}`;
  const data = getSuburbBySlug(fullSlug);
  if (!data) return {};

  const title = `Pest Control ${data.name} | ${SITE_CONFIG.name}`;
  const description = `Professional pest control in ${data.name}, Melbourne. Same-day service, licensed technicians, safe for pets & people. Call ${SITE_CONFIG.phone} for fast pest removal in ${data.name}.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/${fullSlug}` },
    openGraph: { title, description, url: `${SITE_CONFIG.url}/${fullSlug}` },
  };
}

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

export default async function SuburbPage({ params }: Props) {
  const { suburb } = await params;
  const fullSlug = `pest-control-${suburb}`;
  const data = getSuburbBySlug(fullSlug);
  if (!data) notFound();

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', href: SITE_CONFIG.url },
    { name: 'Service Areas', href: `${SITE_CONFIG.url}/service-areas` },
    { name: `Pest Control ${data.name}`, href: `${SITE_CONFIG.url}/${fullSlug}` },
  ]);
  const localBusiness = generateLocalBusinessSchema(data.name);

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
            <span className="text-zapit-green">Pest Control {data.name}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Pest Control {data.name}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
            Professional pest &amp; termite control for homes and businesses in {data.name},
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
              { icon: MapPin, label: `${data.name} coverage`, value: 'Local Team' },
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
            Why {data.name} Residents Trust Zap It Pest Control
          </h2>
          <p className="text-zapit-text leading-relaxed mb-8 max-w-3xl">
            {data.name} is part of Melbourne&apos;s {data.region} region and faces unique pest
            challenges throughout the year. From seasonal ant invasions and spider infestations
            to year-round termite threats, our licensed technicians understand the local pest
            patterns and deliver treatments tailored to {data.name} homes and businesses.
          </p>

          <h3 className="text-xl font-bold text-zapit-dark mb-6">
            Pest Control Services in {data.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {SERVICES.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 p-4 bg-zapit-light rounded-lg border border-zapit-border"
              >
                <Shield className="h-5 w-5 text-zapit-green shrink-0" />
                <span className="text-zapit-text font-medium">{service}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-zapit-dark mb-4">
            Our 3-Step Process for {data.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mb-12">
            {[
              {
                step: '01',
                title: 'Inspect & Diagnose',
                desc: `We thoroughly inspect your ${data.name} property to identify pest species, entry points, and nesting areas.`,
              },
              {
                step: '02',
                title: 'Treat & Eliminate',
                desc: 'Our licensed technicians apply targeted, eco-friendly treatments safe for your family and pets.',
              },
              {
                step: '03',
                title: 'Prevent & Monitor',
                desc: `We set up preventive barriers and provide a detailed report with ongoing monitoring advice for your ${data.name} property.`,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="h-14 w-14 rounded-full bg-zapit-green text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  {item.step}
                </div>
                <h4 className="font-bold text-zapit-dark mb-2">{item.title}</h4>
                <p className="text-sm text-zapit-text">{item.desc}</p>
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
            Need Pest Control in {data.name}?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Same-day service available. Call now or book online.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-2 bg-white text-zapit-green font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {SITE_CONFIG.phone}
            </Link>
            <Link
              href={SITE_CONFIG.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full text-lg transition-colors"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-zapit-dark mb-6">
            About Pest Control in {data.name}
          </h2>
          <p className="text-zapit-text leading-relaxed mb-4">
            As one of Melbourne&apos;s most trusted pest control providers, Zap It has been
            serving {data.name} and surrounding {data.region} suburbs since 2020. Our team of
            fully licensed and insured technicians are available 24 hours a day, 7 days a week
            to handle any pest emergency.
          </p>
          <p className="text-zapit-text leading-relaxed mb-8">
            Whether you&apos;re dealing with termites threatening your home&apos;s structure,
            rodents in your roof, or a sudden ant infestation in your kitchen, we have the
            expertise and eco-friendly products to resolve the issue quickly and safely. All
            our treatments come with a warranty, and we offer competitive pricing with
            multi-service discounts.
          </p>
          <p className="text-zapit-text leading-relaxed">
            We also provide pest control services for other suburbs near {data.name} in the{' '}
            {data.region} region.{' '}
            <Link href="/service-areas" className="text-zapit-green font-semibold hover:underline">
              View all service areas →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
