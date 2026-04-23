import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, ChevronRight, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { isServiceSlug, SERVICE_PAGES, SERVICE_SLUGS } from '@/lib/service-pages';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import StatsCounter from '@/components/sections/StatsCounter';

type Props = { params: Promise<{ serviceSlug: string }> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  if (!isServiceSlug(serviceSlug)) {
    return {};
  }
  const page = SERVICE_PAGES[serviceSlug];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${serviceSlug}`,
    },
    openGraph: {
      title: `${page.metaTitle} | ${SITE_CONFIG.name}`,
      description: page.metaDescription,
      url: `/${serviceSlug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { serviceSlug } = await params;
  if (!isServiceSlug(serviceSlug)) {
    notFound();
  }
  const page = SERVICE_PAGES[serviceSlug];

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Pest Solutions', href: '/pest-solutions' },
    { name: page.h1, href: `/${serviceSlug}` },
  ];

  const jsonLd = [
    generateServiceSchema(page.title, page.metaDescription),
    generateLocalBusinessSchema('Melbourne'),
    generateBreadcrumbSchema(breadcrumbItems),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="relative bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white">
        <div className="absolute inset-0 bg-[url('/images/hero/pest-treatment-melbourne.webp')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4 py-10 md:py-14">
          <nav className="text-sm text-gray-300 mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbItems.map((item, i) => (
                <li key={item.href} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="h-4 w-4 text-zapit-green flex-shrink-0" aria-hidden />}
                  {i < breadcrumbItems.length - 1 ? (
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{item.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl">{page.h1}</h1>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-zapit-text leading-relaxed mb-10">{page.content}</p>
          <h2 className="text-2xl font-bold text-zapit-dark mb-6">What we deliver</h2>
          <ul className="space-y-3">
            {page.features.map((f) => (
              <li key={f} className="flex gap-3 items-start text-zapit-text">
                <Check className="h-5 w-5 text-zapit-green flex-shrink-0 mt-0.5" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-zapit-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Why choose {SITE_CONFIG.shortName}?</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Melbourne&apos;s licensed pest team with fast response, transparent communication, and treatments built around
            your property—not generic one-spray plans.
          </p>
          <StatsCounter />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-zapit-light">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-zapit-dark mb-4">Book {page.title} today</h2>
          <p className="text-zapit-text mb-8 leading-relaxed">
            Call {SITE_CONFIG.phone} for urgent advice, or book online for a time that suits you. {SITE_CONFIG.operatingHours}{' '}
            for emergencies and enquiries.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <Link
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center justify-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg w-full sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              Call {SITE_CONFIG.phone}
            </Link>
            <Link
              href={SITE_CONFIG.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-zapit-green text-zapit-green hover:bg-zapit-green hover:text-white font-semibold px-8 py-4 rounded-full transition-colors w-full sm:w-auto"
            >
              Book online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
