import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { MELBOURNE_SERVICE_REGIONS, pestControlSuburbPath } from '@/lib/melbourne-service-areas';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Pest Control Service Areas in Melbourne',
  description: `View Melbourne regions and suburbs covered by ${SITE_CONFIG.shortName}. Licensed technicians across inner city, north, south east, east, and western areas.`,
  alternates: {
    canonical: '/service-areas',
  },
  openGraph: {
    title: `Pest Control Service Areas in Melbourne | ${SITE_CONFIG.name}`,
    description: `Melbourne-wide pest and termite control. Browse suburbs by region.`,
    url: '/service-areas',
  },
};

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Service Areas', href: '/service-areas' },
];

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd
        data={[
          generateLocalBusinessSchema('Melbourne'),
          generateBreadcrumbSchema(breadcrumbItems),
        ]}
      />

      <section className="bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
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
          <h1 className="text-3xl md:text-4xl font-bold max-w-3xl">Pest control service areas in Melbourne</h1>
          <p className="mt-4 text-gray-200 max-w-2xl leading-relaxed">
            We service homes and businesses across {SITE_CONFIG.operatingHours.toLowerCase()}. Find your suburb by region
            below—each link opens a dedicated local service page.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          {MELBOURNE_SERVICE_REGIONS.map((region) => (
            <div key={region.id}>
              <h2 className="text-2xl font-bold text-zapit-dark border-b-2 border-zapit-green/40 pb-2 mb-4">
                {region.name}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {region.suburbs.map((suburb) => {
                  const href = pestControlSuburbPath(suburb);
                  return (
                    <li key={suburb}>
                      <Link
                        href={href}
                        className="text-zapit-text hover:text-zapit-green font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        Pest control {suburb}
                        <ChevronRight className="h-3 w-3 opacity-70" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
