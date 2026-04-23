import type { Metadata } from 'next';
import Link from 'next/link';
import { TREATMENTS, PROPERTY_TYPES } from '@/lib/pricing-data';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateProductSchema } from '@/lib/schema';
import PriceCalculatorPreview from '@/components/sections/PriceCalculatorPreview';

const money = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

type PricingRow = {
  service: string;
  propertyType: string;
  price: number;
  duration: number;
};

function buildPricingTableRows(): PricingRow[] {
  const rows: PricingRow[] = [];
  for (const t of TREATMENTS) {
    if (t.requiresPropertyType && t.propertyPricing) {
      for (const pt of PROPERTY_TYPES) {
        const price =
          pt === 'Double-story' ? t.propertyPricing.doubleStory : t.propertyPricing.singleStory;
        rows.push({ service: t.name, propertyType: pt, price, duration: t.duration });
      }
    } else {
      rows.push({
        service: t.name,
        propertyType: 'All properties',
        price: t.basePrice,
        duration: t.duration,
      });
    }
  }
  return rows;
}

const PRICING_ROWS = buildPricingTableRows();

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'pricing | Zap It Pest Control Melbourne' },
    description: `View ${SITE_CONFIG.shortName} base rates for residential pest and termite treatments in Melbourne. Prices in AUD (ex. GST) with service duration. Book online or call ${SITE_CONFIG.phone}.`,
    alternates: { canonical: '/pricing' },
    openGraph: { url: '/pricing' },
  };
}

export default function PricingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
  ]);
  const productSchema = generateProductSchema();

  return (
    <>
      <JsonLd data={[productSchema, breadcrumbSchema]} />

      <section className="relative bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <p className="text-sm text-gray-300 mb-2">
            <Link href="/" className="hover:text-zapit-green transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Pricing</span>
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">Our Pest Control Prices</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Transparent base rates for our treatments. For your personalised total, use the calculator
            below or call {SITE_CONFIG.phone}.
          </p>
        </div>
      </section>

      <section className="py-10 lg:py-16 bg-zapit-light">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="overflow-x-auto rounded-2xl border border-zapit-border bg-white shadow-sm -mx-4 sm:mx-0">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-zapit-dark text-white">
                  <th scope="col" className="px-4 py-3 font-bold">
                    Service name
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold">
                    Property type
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold text-right">
                    Price (AUD) ex. GST
                  </th>
                  <th scope="col" className="px-4 py-3 font-bold text-right">
                    Duration (min)
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICING_ROWS.map((row, i) => (
                  <tr
                    key={`${row.service}-${row.propertyType}-${i}`}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-zapit-light/50'}
                  >
                    <td className="px-4 py-2.5 text-zapit-dark font-medium border-t border-zapit-border/60">
                      {row.service}
                    </td>
                    <td className="px-4 py-2.5 text-zapit-text border-t border-zapit-border/60">
                      {row.propertyType}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zapit-dark font-semibold border-t border-zapit-border/60">
                      {money.format(row.price)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zapit-text border-t border-zapit-border/60">
                      {row.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 space-y-1 text-sm text-zapit-text">
            <p>Prices shown are base rates (before discounts &amp; GST).</p>
            <p>
              <strong>Discounts:</strong> 2 services → 22.5% off | 3+ services → 27.5% off
            </p>
            <p>
              <strong>GST:</strong> Add 10%
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-white border-t border-zapit-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-2">
            Estimate your total
          </h2>
          <p className="text-center text-zapit-text mb-8 text-sm md:text-base">
            Add the treatments you need, apply multi-service discounts, then book or enquire.
          </p>
          <PriceCalculatorPreview />
        </div>
      </section>
    </>
  );
}
