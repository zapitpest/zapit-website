import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Search, Syringe, Activity, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import type { FAQ, BreadcrumbItem } from '@/types';
import FAQAccordion from '@/components/sections/FAQAccordion';
import StatsCounter from '@/components/sections/StatsCounter';

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Residential Pest Control', href: '/residential' },
];

const SERVICE_NAME = 'Residential Pest Control Services Melbourne';
const SERVICE_DESCRIPTION =
  'Professional home pest control in Melbourne. Safe ant, spider, termite, rodent, and cockroach treatment with licensed technicians and same-day options.';

const RESIDENTIAL_PESTS = [
  { title: 'Mosquito', href: '/mosquito-control-melbourne', label: 'Breeding control & treatment' },
  { title: 'Rodents', href: '/rodent-control-melbourne', label: 'Mice, rats & entry sealing' },
  { title: 'Cockroach', href: '/cockroach-control-melbourne', label: 'German & American roaches' },
  { title: 'Bee', href: '/bee-removal-melbourne', label: 'Safe removal & relocation' },
  { title: 'Termite', href: '/termite-control-melbourne', label: 'Inspections & barriers' },
] as const;

const STRATEGY_STEPS = [
  {
    title: 'Inspect & Diagnose',
    description: 'We identify the pest, nesting sites, and how they enter your home so treatment targets the real source.',
  },
  {
    title: 'Treat & Eliminate',
    description: 'Licensed technicians apply the right method—baits, targeted sprays, or physical removal—minimising risk to your family and pets.',
  },
  {
    title: 'Prevent & Monitor',
    description: 'We seal gaps where needed, give practical prevention tips, and can schedule follow-ups so pests do not return.',
  },
] as const;

const PROPERTY_TYPES = [
  { title: 'Apartments & units', description: 'High-rises, apartments, and shared complexes across Melbourne and the CBD.' },
  { title: 'Farmhouses & acreage', description: 'Rural and semi-rural homes where rodents, spiders, and termites are common.' },
  { title: 'Bungalows & family homes', description: 'Single-storey and suburban houses with full perimeter and roof void coverage.' },
] as const;

const RESIDENTIAL_FAQS: FAQ[] = [
  {
    question: 'How much does home pest control cost in Melbourne?',
    answer: `Home pest control typically ranges from $150–$400 depending on property size, pest type, and severity. We give clear pricing before we start. Call ${SITE_CONFIG.phone} for a tailored quote.`,
  },
  {
    question: 'Is residential pest control safe for children and pets?',
    answer: 'Yes. We use family- and pet-aware products and application methods, and we tell you if you need to leave rooms for a short period while treatments dry.',
  },
  {
    question: 'How fast can you visit my home?',
    answer: 'We offer same-day service across Melbourne in many cases, with our team aiming to be on site within about two hours for urgent call-outs.',
  },
  {
    question: 'What pests do you treat in homes?',
    answer: 'We treat ants, spiders, cockroaches, rodents, termites, mosquitoes, bees, wasps, bed bugs, fleas, and more—if it is a common Melbourne household pest, we can help.',
  },
  {
    question: 'Do I need to prepare before a residential visit?',
    answer: 'We will let you know any simple steps when you book—such as moving pet bowls or clearing a cupboard. Nothing complicated; we work around your routine.',
  },
];

export function generateMetadata(): Metadata {
  return {
    title: {
      absolute: 'Residential Pest Control Services in Melbourne | Zap It',
    },
    description:
      "Protect your Melbourne home with Zap It's professional pest control services. We remove ants, spiders, and termites safely. Book an inspection now.",
    openGraph: {
      title: 'Residential Pest Control Services in Melbourne | Zap It',
      description:
        "Protect your Melbourne home with Zap It's professional pest control services. We remove ants, spiders, and termites safely. Book an inspection now.",
      url: `${SITE_CONFIG.url}/residential`,
    },
    alternates: { canonical: '/residential' },
  };
}

export default function ResidentialPage() {
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Zap It - Melbourne&apos;s Best Home Pest Control Services
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Licensed, insured, and available when you need us—keep ants, spiders, termites, and rodents out of your
              home for good.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={SITE_CONFIG.phoneTel}
                className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
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
                Book an inspection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark mb-4">Melbourne&apos;s #1 Domestic Pest Controllers</h2>
          <p className="text-zapit-text leading-relaxed">
            From inner suburbs to the outer growth corridors, our team has solved thousands of household pest problems.
            We combine experience with the right products and clear communication, so you always know what we are doing
            and why.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-zapit-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-4">
            Complete Residential Pest Control For Your Safety
          </h2>
          <p className="text-center text-zapit-text mb-12 max-w-2xl mx-auto">
            Targeted services for the pests that bother Melbourne homes most. Tap through to see how we can help.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {RESIDENTIAL_PESTS.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group bg-white rounded-xl p-6 border border-zapit-border shadow-sm hover:shadow-md hover:border-zapit-green/40 transition-all"
              >
                <h3 className="text-lg font-bold text-zapit-dark group-hover:text-zapit-green transition-colors mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-zapit-text">{p.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark mb-4">Same-Day Home Pest Control Services</h2>
              <p className="text-zapit-text leading-relaxed mb-4">
                Pests will not wait—and neither do we. When you spot rodents, a wasp nest, or a sudden ant trail, you can
                call {SITE_CONFIG.phone} and book same-day help across Melbourne, subject to availability.
              </p>
              <p className="text-zapit-text leading-relaxed mb-6">
                Our {SITE_CONFIG.stats.responseTime} target means you are not left dealing with the problem alone for
                days. Emergency response is a core part of how we support residential customers.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={SITE_CONFIG.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Book online
                </Link>
                <Link
                  href={SITE_CONFIG.phoneTel}
                  className="inline-flex items-center gap-2 border-2 border-zapit-green text-zapit-green hover:bg-zapit-green hover:text-white font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Call now
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero/about-pest-control.png"
                alt="Residential pest control in Melbourne"
                width={500}
                height={400}
                className="rounded-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-zapit-green/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-12">Our 3-Step Proven Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {STRATEGY_STEPS.map((step, i) => {
              const Icon = [Search, Syringe, Activity][i]!;
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

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-12">Residential Properties We Protect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PROPERTY_TYPES.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-zapit-border p-8 bg-zapit-light/80 hover:border-zapit-green/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-zapit-dark mb-2">{p.title}</h3>
                <p className="text-sm text-zapit-text leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-zapit-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Why Choose Zap It</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
            Melbourne homeowners trust us for clear pricing, fast response, and treatments that are built around your
            family and pets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12 text-sm text-gray-300">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-zapit-green flex-shrink-0" />
                <span>Licensed by Victorian authorities &amp; fully insured</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-zapit-green flex-shrink-0" />
                <span>{SITE_CONFIG.operatingHours.toLowerCase()} availability</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-zapit-green flex-shrink-0" />
                <span>Pet- and child-aware application methods</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-zapit-green flex-shrink-0" />
                <span>Transparent quotes before we treat</span>
              </li>
            </ul>
          </div>
          <StatsCounter />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-4">Frequently asked questions</h2>
          <p className="text-center text-zapit-text mb-12 max-w-2xl mx-auto">
            Straight answers on cost, safety, and how we work in homes.
          </p>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={RESIDENTIAL_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
