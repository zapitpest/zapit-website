import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ClipboardList, Shield, FileCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import type { FAQ, BreadcrumbItem } from '@/types';
import FAQAccordion from '@/components/sections/FAQAccordion';
import StatsCounter from '@/components/sections/StatsCounter';

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Commercial Pest Control', href: '/commercial-pest-control' },
];

const SERVICE_NAME = 'Commercial Pest Control & Management Melbourne';
const SERVICE_DESCRIPTION =
  'Protect your brand, customers, and staff with structured pest management for retail, hospitality, warehousing, healthcare, and public-sector sites across Melbourne.';

const COMMERCIAL_INDUSTRIES = [
  { id: 'properties', label: 'Properties' },
  { id: 'warehousing', label: 'Warehousing' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'supermarkets', label: 'Supermarkets' },
  { id: 'venues', label: 'Function Venues' },
  { id: 'brewhouses', label: 'Brewhouses' },
  { id: 'recreational', label: 'Recreational' },
  { id: 'government', label: 'Government Buildings' },
  { id: 'transport', label: 'Transport' },
  { id: 'food-manufacturing', label: 'Food Manufacturing' },
  { id: 'aged-care', label: 'Aged Care' },
  { id: 'hospitals', label: 'Hospitals' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'education', label: 'Education' },
  { id: 'distribution', label: 'Distribution' },
] as const;

const PROCESS_STEPS = [
  {
    title: 'Risk & site assessment',
    description: 'We map activity areas, entry points, and compliance needs so nothing important is missed.',
    icon: ClipboardList,
  },
  {
    title: 'Tailored treatment plan',
    description: 'Treatments fit your industry—HACCP-aware for food sites, discreet for retail and offices.',
    icon: Shield,
  },
  {
    title: 'Documentation & follow-up',
    description: 'Clear records for audits and scheduled reviews to keep your site protected long term.',
    icon: FileCheck,
  },
] as const;

const COMMERCIAL_FAQS: FAQ[] = [
  {
    question: 'Why does my business need commercial pest control?',
    answer:
      'Pests damage stock, trigger health department issues, and hurt your reputation overnight. A structured program reduces those risks and supports compliance in food, health, and public-facing spaces.',
  },
  {
    question: 'Can you work outside our busiest trading hours?',
    answer:
      'Yes. We schedule treatments to suit restaurants, retail, and warehouses—including early mornings, evenings, or closed days where possible—so you can keep operating.',
  },
  {
    question: 'Are your treatments suitable for food handling areas?',
    answer:
      'We follow appropriate methods and product selection for food businesses and can align with your food safety and HACCP requirements. Tell us your auditor expectations when you book.',
  },
  {
    question: 'How often should a commercial site be inspected?',
    answer:
      'It depends on industry and risk—many sites use monthly or quarterly programs; high-risk food production may need more frequent visits. We recommend a schedule after the first assessment.',
  },
  {
    question: 'Do you service warehouses, hospitals, and schools?',
    answer: `Yes. We work across logistics, manufacturing, healthcare, education, and government. Call ${SITE_CONFIG.phone} to discuss your site and compliance needs.`,
  },
];

export function generateMetadata(): Metadata {
  return {
    title: {
      absolute: 'Commercial Pest Control & Management Melbourne | Zap It',
    },
    description:
      'Stop risking the health of your customers, protect your business reputation with our commercial pest control services in Melbourne.',
    openGraph: {
      title: 'Commercial Pest Control & Management Melbourne | Zap It',
      description:
        'Stop risking the health of your customers, protect your business reputation with our commercial pest control services in Melbourne.',
      url: `${SITE_CONFIG.url}/commercial-pest-control`,
    },
    alternates: { canonical: '/commercial-pest-control' },
  };
}

export default function CommercialPestControlPage() {
  const schemas = [
    generateServiceSchema(SERVICE_NAME, SERVICE_DESCRIPTION),
    generateLocalBusinessSchema('Melbourne'),
    generateBreadcrumbSchema(BREADCRUMBS),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      <section className="relative bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero/pest-treatment-melbourne.webp')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">Commercial Pest Control Melbourne</h1>
            <p className="text-lg md:text-xl text-zapit-green font-semibold mb-2">Protect your business reputation</p>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              From retail and offices to food production and healthcare—Zap It delivers licensed pest management that
              keeps customers, staff, and auditors confident.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={SITE_CONFIG.phoneTel}
                className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
              >
                <Phone className="h-5 w-5" />
                {SITE_CONFIG.phone}
              </Link>
              <Link
                href={SITE_CONFIG.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors border border-white/20"
              >
                Enquire or book
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-zapit-light" aria-label="Industries we serve">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-4">Industry solutions</h2>
          <p className="text-center text-zapit-text mb-12 max-w-2xl mx-auto">
            Sectors we support across Melbourne. Deep links use the URL hash (for example, #restaurants) for your team.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-6xl mx-auto">
            {COMMERCIAL_INDUSTRIES.map((row) => (
              <div
                key={row.id}
                id={row.id}
                className="scroll-mt-24 rounded-xl border border-zapit-border bg-white px-4 py-4 text-center text-sm font-semibold text-zapit-dark"
              >
                {row.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark mb-6 text-center">Why Commercial Pest Control Matters</h2>
          <p className="text-zapit-text leading-relaxed mb-4">
            One visible pest in a restaurant, store, or clinic can mean lost revenue, failed audits, and lasting damage
            to trust. In warehousing and food manufacturing, infestations threaten stock, machinery, and compliance
            with health and safety rules.
          </p>
          <p className="text-zapit-text leading-relaxed mb-4">
            Proactive pest management is not only about treatment—it is about prevention, recorded visits, and clear
            communication so you can run your business with confidence. Zap It works with site managers in Melbourne
            to build a program that fits your risk profile, not a one-size-fits-all spray.
          </p>
          <p className="text-zapit-text leading-relaxed">
            Whether you operate a small retail strip, a large DC, or a public building, we scale our approach to your
            hours, access rules, and industry expectations—without cutting corners on safety or results.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-zapit-green/5" id="process">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-12">Our Commercial Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center bg-white rounded-2xl p-8 border border-zapit-border">
                  <div className="h-14 w-14 rounded-full bg-zapit-green text-white flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-zapit-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-zapit-text leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-zapit-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Trusted numbers</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
            The same team that supports Melbourne homes brings commercial-grade response times and experience to
            businesses across the city.
          </p>
          <StatsCounter />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-4">Frequently asked questions</h2>
          <p className="text-center text-zapit-text mb-12 max-w-2xl mx-auto">Commercial and compliance-focused answers.</p>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={COMMERCIAL_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
