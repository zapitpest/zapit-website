import Link from 'next/link';
import {
  Phone,
  ChevronRight,
  Shield,
  MapPin,
  Clock,
  Star,
  Home,
  Building2,
  Bug,
  Rat,
  Cog,
  Leaf,
  CheckCircle2,
  Award,
  BadgeCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import {
  MELBOURNE_SERVICE_REGIONS,
  pestControlSuburbPath,
} from '@/lib/melbourne-service-areas';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateFAQSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import StatsCounter from '@/components/sections/StatsCounter';
import FAQAccordion from '@/components/sections/FAQAccordion';

type Props = {
  suburb: string;
  region: string;
  slug: string;
};

const PEST_SOLUTIONS = [
  { name: 'Ants', href: '/ant-pest-control-melbourne', icon: Bug },
  { name: 'Rodents', href: '/rodent-control-melbourne', icon: Rat },
  { name: 'Spiders', href: '/spider-control-melbourne', icon: Bug },
  { name: 'Termites', href: '/termite-control-melbourne', icon: Cog },
  { name: 'Cockroaches', href: '/cockroach-control-melbourne', icon: Bug },
  { name: 'Bed Bugs', href: '/bed-bug-control-melbourne', icon: Bug },
  { name: 'Possums', href: '/possum-removal-melbourne', icon: Leaf },
  { name: 'Bees & Wasps', href: '/bee-removal-melbourne', icon: Bug },
  { name: 'Fleas', href: '/flea-control-melbourne', icon: Bug },
  { name: 'Mosquitoes', href: '/mosquito-control-melbourne', icon: Bug },
  { name: 'Flies', href: '/fly-control-melbourne', icon: Bug },
] as const;

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
  'Commercial Pest Programs',
] as const;

// Specific licence/membership claims removed per client item 4 — restore once confirmed.
const COMPLIANCE = [
  {
    icon: BadgeCheck,
    title: 'Licensed Technicians',
    desc: 'Trained Melbourne team applying treatments responsibly.',
  },
  {
    icon: Award,
    title: 'Food-safety aware',
    desc: 'Careful service for restaurants, cafés and food-handling businesses.',
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    desc: 'Public liability cover on every job we attend.',
  },
  {
    icon: Sparkles,
    title: 'Pet & Family Safe',
    desc: 'Approved products and responsible application methods.',
  },
] as const;

function buildFaqs(suburb: string) {
  return [
    {
      question: `How quickly can you get to ${suburb}?`,
      answer: `For most ${suburb} addresses we can offer same-day or next-day appointments. Call ${SITE_CONFIG.phone} and our team will confirm the earliest slot for your street.`,
    },
    {
      question: `Are your treatments safe for ${suburb} families and pets?`,
      answer: `Yes. We use approved products applied by licensed technicians, with clear re-entry advice for every treatment we carry out in ${suburb}.`,
    },
    {
      question: `Do you cover commercial properties in ${suburb}?`,
      answer: `We do. Cafés, offices, warehouses, retail and food-handling sites across ${suburb} can book recurring programs with reports suitable for audits.`,
    },
    {
      question: `What pests are most common in ${suburb}?`,
      answer: `${suburb} homes typically see ants, spiders and cockroaches year-round, with rodents in cooler months and termite activity in warmer months. A free inspection identifies your specific risks.`,
    },
  ];
}

export default function SuburbLandingPage({ suburb, region, slug }: Props) {
  const regionObj = MELBOURNE_SERVICE_REGIONS.find((r) => r.name === region);
  const nearbySuburbs = (regionObj?.suburbs ?? [])
    .filter((name) => name !== suburb)
    .slice(0, 12);

  const faqs = buildFaqs(suburb);
  const pageUrl = `${SITE_CONFIG.url}/${slug}`;

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', href: SITE_CONFIG.url },
    { name: 'Service Areas', href: `${SITE_CONFIG.url}/service-areas` },
    { name: `Pest Control ${suburb}`, href: pageUrl },
  ]);
  const localBusiness = generateLocalBusinessSchema(suburb);
  const faqSchema = generateFAQSchema(faqs);
  const schemas = [localBusiness, breadcrumb, faqSchema].filter(
    (s): s is NonNullable<typeof s> => s !== null,
  );

  return (
    <>
      <JsonLd data={schemas} />

      {/* HERO */}
      <section className="bg-gradient-to-b from-zapit-green-dark via-zapit-green-dark to-zapit-dark text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zapit-green-light">Pest Control {suburb}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm mb-5">
            <MapPin className="h-4 w-4 text-zapit-green-light" />
            <span>Servicing {suburb}, {region} Melbourne</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            Pest Control {suburb}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-8 leading-relaxed">
            Professional pest &amp; termite control for homes and businesses in {suburb}, Melbourne.
            Same-day service, licensed technicians, and treatments designed around how pests behave
            in the {region} region.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-light text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
            >
              <Phone className="h-5 w-5" />
              Call {SITE_CONFIG.phone}
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors border border-white/20"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-zapit-green-light" /> {SITE_CONFIG.rating.value}★ ({SITE_CONFIG.rating.count} reviews)</span>
            <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4 text-zapit-green-light" /> Licensed &amp; insured</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-zapit-green-light" /> Same-day available</span>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-10 bg-zapit-green text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: MapPin, label: `${suburb} coverage`, value: 'Local Team' },
              { icon: Clock, label: 'Response time', value: 'Same Day' },
              { icon: Shield, label: 'Licensed & insured', value: 'Licensed' },
              { icon: Star, label: 'Google rated', value: `${SITE_CONFIG.rating.value}★` },
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

      {/* RESIDENTIAL / COMMERCIAL PATHWAYS */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-zapit-green tracking-wider uppercase mb-2">
              {suburb} Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zapit-dark mb-4">
              Pest control for every {suburb} property
            </h2>
            <p className="text-zapit-text leading-relaxed">
              Whether you&apos;re protecting a family home or running a business, our {suburb}
              technicians deliver targeted, approved treatments that solve the problem and
              keep it solved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/"
              className="group bg-zapit-light border border-zapit-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="h-14 w-14 rounded-xl bg-zapit-green/10 flex items-center justify-center mb-5">
                <Home className="h-7 w-7 text-zapit-green" />
              </div>
              <h3 className="text-2xl font-bold text-zapit-dark mb-3">
                Residential pest control in {suburb}
              </h3>
              <p className="text-zapit-text mb-5 leading-relaxed">
                Family-safe treatments for ants, spiders, rodents, cockroaches and termites. Free
                inspection, transparent pricing, and a service warranty on every job.
              </p>
              <span className="inline-flex items-center gap-2 text-zapit-green font-semibold group-hover:gap-3 transition-all">
                Explore residential
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/commercial-pest-control"
              className="group bg-zapit-dark text-white rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="h-14 w-14 rounded-xl bg-zapit-green/20 flex items-center justify-center mb-5">
                <Building2 className="h-7 w-7 text-zapit-green-light" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Commercial pest control in {suburb}
              </h3>
              <p className="text-white/80 mb-5 leading-relaxed">
                food-safety aware programs for cafés, restaurants, warehouses, retail and food
                handling sites. Audit-ready reporting and recurring service plans.
              </p>
              <span className="inline-flex items-center gap-2 text-zapit-green-light font-semibold group-hover:gap-3 transition-all">
                Explore commercial
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHO BENEFITS */}
      <section className="py-16 lg:py-20 bg-zapit-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zapit-dark mb-4">
              Who we help in {suburb}
            </h2>
            <p className="text-zapit-text max-w-2xl mx-auto">
              From new builds to heritage homes, food businesses to industrial sites — we tailor
              our approach to every property type in {suburb}.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Home,
                title: `${suburb} Homeowners`,
                desc: `Family-safe pest control with free inspections and clear advice on protecting your ${suburb} home year-round.`,
              },
              {
                icon: Building2,
                title: `${suburb} Businesses`,
                desc: `Discreet, after-hours commercial servicing with detailed reports — perfect for cafés, offices and food businesses in ${suburb}.`,
              },
              {
                icon: Cog,
                title: `${suburb} Termite-Risk Properties`,
                desc: `${suburb} properties near bushland, gardens or older timber are termite-prone. We provide inspections, barriers and ongoing monitoring.`,
              },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-zapit-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-zapit-green/10 flex items-center justify-center mb-4">
                  <card.icon className="h-6 w-6 text-zapit-green" />
                </div>
                <h3 className="font-bold text-zapit-dark text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-zapit-text leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PEST SOLUTIONS GRID */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold text-zapit-green tracking-wider uppercase mb-2">
                Pest solutions
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-zapit-dark">
                Every pest, covered in {suburb}
              </h2>
            </div>
            <Link
              href="/pest-solutions"
              className="inline-flex items-center gap-2 text-zapit-green font-semibold hover:gap-3 transition-all"
            >
              View all pest solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PEST_SOLUTIONS.map((pest) => (
              <Link
                key={pest.name}
                href={pest.href}
                className="group flex items-center gap-3 p-4 bg-zapit-light border border-zapit-border rounded-xl hover:border-zapit-green hover:bg-white transition-all"
              >
                <pest.icon className="h-5 w-5 text-zapit-green shrink-0" />
                <span className="text-zapit-text font-medium group-hover:text-zapit-dark">
                  {pest.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRUST + SERVICES */}
      <section className="py-16 lg:py-20 bg-zapit-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold text-zapit-green tracking-wider uppercase mb-2">
                Why {suburb} trusts us
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-zapit-dark mb-5">
                Local technicians who know {suburb}
              </h2>
              <p className="text-zapit-text leading-relaxed mb-4">
                {suburb} is part of Melbourne&apos;s {region} region and faces seasonal pest
                pressures — from summer ant trails and spider activity through to cooler-month
                rodent intrusions. Our technicians live and work across {region} Melbourne, so
                they know the local pest patterns and the property styles unique to {suburb}.
              </p>
              <p className="text-zapit-text leading-relaxed mb-6">
                Every treatment is backed by a service warranty. If a pest issue returns inside
                the warranty window, we return at no extra charge.
              </p>
              <ul className="space-y-3">
                {[
                  'Licensed pest control technicians',
                  'Family and pet-safe application methods',
                  'Detailed written reports on every job',
                  'Service warranty included as standard',
                  `Same-day service for most ${suburb} addresses`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-zapit-green shrink-0 mt-0.5" />
                    <span className="text-zapit-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-zapit-border rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-zapit-dark mb-5">
                Pest Control Services in {suburb}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 p-3 bg-zapit-light rounded-lg"
                  >
                    <Shield className="h-4 w-4 text-zapit-green shrink-0" />
                    <span className="text-sm text-zapit-text font-medium">{service}</span>
                  </div>
                ))}
              </div>
              <Link
                href={SITE_CONFIG.phoneTel}
                className="mt-6 inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-bold px-6 py-3 rounded-full transition-colors w-full justify-center"
              >
                <Phone className="h-4 w-4" />
                Get a quote for {suburb}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-STEP PROCESS */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-zapit-green tracking-wider uppercase mb-2">
              Our 3-step process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zapit-dark">
              How we treat pests in {suburb}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Inspect & diagnose',
                desc: `We thoroughly inspect your ${suburb} property to identify pest species, entry points and nesting areas.`,
              },
              {
                step: '02',
                title: 'Treat & eliminate',
                desc: 'Licensed technicians apply targeted, approved treatments to eliminate the infestation at its source.',
              },
              {
                step: '03',
                title: 'Prevent & monitor',
                desc: `We set up preventive barriers and provide a detailed report with ongoing monitoring advice for your ${suburb} property.`,
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-zapit-light border border-zapit-border rounded-2xl p-6 text-center">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-zapit-green text-white flex items-center justify-center font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-zapit-dark text-lg mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-zapit-text leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="py-16 lg:py-20 bg-zapit-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-zapit-green-light tracking-wider uppercase mb-2">
              Licensed & compliant
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Standards you can trust in {suburb}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPLIANCE.map((c) => (
              <div key={c.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <c.icon className="h-8 w-8 text-zapit-green-light mb-3" />
                <h3 className="font-bold mb-2">{c.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS COUNTER */}
      <section className="py-16 lg:py-20 bg-zapit-light">
        <div className="container mx-auto px-4">
          <StatsCounter />
        </div>
      </section>

      {/* NEARBY SUBURBS */}
      {nearbySuburbs.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-zapit-green tracking-wider uppercase mb-2">
                Service areas
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-zapit-dark mb-3">
                Pest control near {suburb}
              </h2>
              <p className="text-zapit-text">
                We also serve other suburbs in Melbourne&apos;s {region} region.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
              {nearbySuburbs.map((name) => (
                <Link
                  key={name}
                  href={pestControlSuburbPath(name)}
                  className="flex items-center gap-2 px-4 py-3 bg-zapit-light hover:bg-zapit-green hover:text-white border border-zapit-border rounded-lg text-sm font-medium text-zapit-text transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{name}</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-2 text-zapit-green font-semibold hover:gap-3 transition-all"
              >
                View all service areas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-zapit-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-zapit-green tracking-wider uppercase mb-2">
              Frequently asked
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zapit-dark">
              Pest control {suburb} — your questions
            </h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-zapit-green text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need pest control in {suburb}?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Same-day service available across {suburb} and surrounding {region} Melbourne suburbs.
            Call now or request a quote — our team will be in touch within minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-2 bg-white text-zapit-green-dark font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Phone className="h-5 w-5" />
              {SITE_CONFIG.phone}
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors border border-white/30"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-sm text-white/80 mt-6">
            {SITE_CONFIG.operatingHours} · After-hours emergency calls accepted
          </p>
        </div>
      </section>
    </>
  );
}
