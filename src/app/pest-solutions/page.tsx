import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Shield } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: { absolute: `Pest Control Solutions in Melbourne | ${SITE_CONFIG.name}` },
  description: `Complete pest control solutions for Melbourne homes and businesses. From ants and termites to rodents and possums — Zap It handles it all. Call ${SITE_CONFIG.phone}.`,
  alternates: { canonical: '/pest-solutions' },
};

export default function PestSolutionsPage() {
  const services = Object.values(SERVICE_PAGES);
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', href: SITE_CONFIG.url },
    { name: 'Pest Solutions', href: `${SITE_CONFIG.url}/pest-solutions` },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumb]} />

      <section className="bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zapit-green">Pest Solutions</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Pest Control Solutions in Melbourne
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl">
            From common household pests to commercial infestations, Zap It provides
            comprehensive pest control solutions across Melbourne. Click any pest below
            to learn more about our treatment approach.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="group p-6 bg-white rounded-xl border border-zapit-border hover:border-zapit-green hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-zapit-green shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-bold text-zapit-dark group-hover:text-zapit-green transition-colors mb-2">
                      {service.title}
                    </h2>
                    <p className="text-sm text-zapit-text line-clamp-3">
                      {service.metaDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-zapit-green mt-3">
                      Learn More <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
