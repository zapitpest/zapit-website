import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_CONFIG } from '@/lib/constants';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';
import GoogleReviewsCarousel from '../../residential/GoogleReviewsCarousel';

type CommercialIndustryPage = {
  h1: string;
  heroDescription: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  features: readonly string[];
};

const COMMERCIAL_INDUSTRY_SLUGS = [
  'warehousing-and-storage',
  'restaurants-pest-control',
  'pest-control-in-supermarkets',
  'function-venues',
  'brewhouses-and-distilleries',
  'recreational-facilities-pest-control',
  'government-buildings',
  'transport',
  'food-manufacturing',
  'aged-care-facilities',
  'hospitals',
  'agriculture',
  'educational-facilities',
  'distribution-center',
] as const;

type CommercialIndustrySlug = (typeof COMMERCIAL_INDUSTRY_SLUGS)[number];

const COMMERCIAL_INDUSTRY_PAGES: Record<CommercialIndustrySlug, CommercialIndustryPage> = {
  'warehousing-and-storage': {
    h1: 'Pest control for warehousing & storage in Melbourne',
    heroDescription: 'Keep racking, loading docks, and high-bay areas clear of pests that damage stock and slow operations.',
    title: 'Warehousing & storage',
    metaTitle: 'Commercial pest control for warehouses & storage | Melbourne',
    metaDescription: 'Pest control for Melbourne warehouses, 3PL, and storage facilities.',
    content: 'Warehouses and storage sites give pests long runs along walls, warm pockets near machinery, and plenty of food from spillage, packaging, and staff break areas. A single problem can lead to chewed product, failed retailer audits, and contamination that spreads before anyone notices. We treat these spaces with logistics in mind: we map high-traffic rodent lines, voids, and loading dock entry points, then set up a program that works with your shifts and your WH&S rules — without slowing pick paths or creating slip hazards.',
    features: ['Rodent programs tailored to racking, docks, and compactor areas', 'Fly and stored-product insect control in dispatch and Q zones', 'Discreet treatments scheduled around your peak dispatch windows', 'Documentation to support WHS, food-industry, and client audits', 'Recommendations to seal voids, doors, and cable penetrations'],
  },
  'restaurants-pest-control': {
    h1: 'Restaurant pest control in Melbourne',
    heroDescription: 'Confident, compliant support for front-of-house, kitchens, and back dock.',
    title: 'Restaurant',
    metaTitle: 'Restaurant pest control Melbourne | Cafés & dining',
    metaDescription: 'Melbourne restaurant and café pest control.',
    content: 'Dining rooms, bars, and busy kitchens are under constant pressure from cockroaches, flies, and rodents that follow grease, waste, and delivery traffic. A sighting in front of guests affects reviews, local reputation, and health inspections overnight. We work the way you run service: we listen to your menu flow and waste routines, time visits to reduce disruption, and focus on harbourage, drains, and entry points.',
    features: ['Cockroach, fly, and ant control focused on kitchen and prep zones', 'Rodent control around cool rooms, storage, and delivery doors', 'HACCP-aware processes and product selection', 'After-hours and pre-service windows', 'Clear reporting for every visit'],
  },
  'pest-control-in-supermarkets': {
    h1: 'Pest control for supermarkets in Melbourne',
    heroDescription: 'From bakery and deli to produce and back dock — treatments that support chain standards.',
    title: 'Supermarket',
    metaTitle: 'Supermarket pest control Melbourne | Grocery & retail',
    metaDescription: 'Pest control for Melbourne supermarkets and grocery retail.',
    content: 'Supermarkets juggle public-facing aisles, high-turnover perishables, and constant deliveries — so pests have food, warmth, and hiding places from shelf bases to mezzanines. You need a partner who can plan around peak trading, work without alarming shoppers, and keep clear communication with store management.',
    features: ['Bird and fly management for entries and fresh sections', 'Rodent programs that respect cold chain layout', 'Service timing aligned to store hours', 'Structured documentation for group compliance', 'Site-specific risk review after seasonal changes'],
  },
  'function-venues': {
    h1: 'Pest control for function & event venues in Melbourne',
    heroDescription: 'Weddings, conferences, and live events need immaculate venues.',
    title: 'Function venue',
    metaTitle: 'Function venue pest control Melbourne | Event spaces',
    metaDescription: 'Pest control for Melbourne function centres and event venues.',
    content: 'Event venues see irregular peaks, late finishes, and multiple catering setups. That mix attracts flies, cockroaches, and rodents to kitchens, sculleries, and waste areas — right when you\'re hosting milestone moments for clients. We structure programs around your calendar.',
    features: ['Flexible timing around bump-in and bump-out', 'Kitchen, bar, and scullery programs', 'Discreet service conduct for high-end events', 'Flying insect and rodent control', 'Simple written summaries after visits'],
  },
  'brewhouses-and-distilleries': {
    h1: 'Pest control for brewhouses & distilleries in Melbourne',
    heroDescription: 'Keep grain, fermentation, and packaging areas protected.',
    title: 'Brewhouse & distillery',
    metaTitle: 'Brewery & distillery pest control Melbourne',
    metaDescription: 'Commercial pest control for Melbourne craft breweries and distilleries.',
    content: 'Brewing and distilling bring together grain, moisture, and warmth — ideal for stored-product insects and rodent interest around silos, mills, and packaging lines. We work with your production flow, identifying ingress and recommending monitoring.',
    features: ['Stored-product insect and rodent control', 'Drain and loading bay inspection', 'Taproom and cellar door support', 'Coordination with cleaning routines', 'Scalable from pilot plant to high-volume'],
  },
  'recreational-facilities-pest-control': {
    h1: 'Pest control for recreational facilities in Melbourne',
    heroDescription: 'Pools, courts, canteens, and change rooms.',
    title: 'Recreational facility',
    metaTitle: 'Recreational facility pest control Melbourne',
    metaDescription: 'Pest control for Melbourne gyms, sports clubs, and recreational facilities.',
    content: 'Gyms, stadiums, and community facilities combine food service, moisture, and large roof spaces — perfect for ants, cockroaches, and spiders. We target harbourage, lighting, and waste flows to keep your facility safe.',
    features: ['Ant, cockroach, and spider control', 'Member-sensitive timing', 'Canteen and changeroom focus', 'Exterior and lighting advice', 'Support for community and private operators'],
  },
  'government-buildings': {
    h1: 'Pest control for government buildings in Melbourne',
    heroDescription: 'Reliable, documented service for public-sector sites.',
    title: 'Government building',
    metaTitle: 'Government building pest control Melbourne',
    metaDescription: 'Pest control for Melbourne government offices and public buildings.',
    content: 'Public-sector buildings serve thousands of people under strict rules. We work with access passes, after-hours clearances, and clear method statements. Treatments are chosen with workplace safety and mixed-use space in mind.',
    features: ['Access control coordination', 'General pest and rodent programs', 'Respect for shared spaces', 'Clear visit reporting', 'Integration with maintenance schedules'],
  },
  transport: {
    h1: 'Pest control for transport & logistics in Melbourne',
    heroDescription: 'Yards, workshops, and offices need protection from rodents and birds.',
    title: 'Transport & logistics',
    metaTitle: 'Transport & logistics pest control Melbourne',
    metaDescription: 'Pest control for Melbourne transport and freight operations.',
    content: 'Transport operations attract pests with food packaging, voids in trailers, and long runs along fence lines. Issues show up as gnawing in wiring, stock damage, or droppings in drivers\' facilities. We look at the whole site.',
    features: ['Rodent and bird control for depots and yards', 'Workshop-adjacent programs', 'Out-of-hours and weekend options', 'HACCP-linked freight support', 'Practical proofing advice'],
  },
  'food-manufacturing': {
    h1: 'Pest control for food manufacturing in Melbourne',
    heroDescription: 'GMP- and HACCP-aligned support for production lines.',
    title: 'Food manufacturing',
    metaTitle: 'Food manufacturing pest control Melbourne | HACCP',
    metaDescription: 'Commercial pest control for Melbourne food manufacturers.',
    content: 'Food manufacturing is where pest control directly meets shelf life and audit outcomes. You need systematic monitoring, trend analysis, and targeted response. We walk your line from raw intake through to dispatch.',
    features: ['IPM approach with monitoring and trend review', 'Support for HACCP, GMP, and third-party standards', 'Flying insect, rodent, and stored-product programs', 'Pre-audit and seasonal reviews', 'Coordination with hygiene and engineering'],
  },
  'aged-care-facilities': {
    h1: 'Pest control for aged care facilities in Melbourne',
    heroDescription: 'Dignity, safety, and calm environments.',
    title: 'Aged care',
    metaTitle: 'Aged care facility pest control Melbourne',
    metaDescription: 'Pest control for Melbourne aged care and residential care facilities.',
    content: 'Aged care homes balance hospitality, medical oversight, and 24/7 living. We treat every visit with patience: clear scheduling with lifestyle teams, careful product choices, and communication that doesn\'t add stress.',
    features: ['Discreet service delivery', 'Ant, fly, and cockroach control', 'Bed bug response planning', 'Rodent and bird management', 'Product and timing options discussed'],
  },
  hospitals: {
    h1: 'Pest control for hospitals & health facilities in Melbourne',
    heroDescription: 'Infection control, sensitive areas, and round-the-clock operations.',
    title: 'Hospital & health facility',
    metaTitle: 'Hospital & healthcare pest control Melbourne',
    metaDescription: 'Pest control for Melbourne hospitals and healthcare facilities.',
    content: 'Healthcare sites are high-consequence: pests in catering, voids, or ground-floor access can\'t wait. We work with your infection prevention and facilities teams, sticking to agreed products and access routes.',
    features: ['Governed service delivery', 'Catering and back dock coverage', 'Ant, cockroach, fly, and rodent control', 'Rapid response pathways', 'Clear documentation for multi-shift teams'],
  },
  agriculture: {
    h1: 'Agriculture & rural commercial pest control in Melbourne',
    heroDescription: 'Sheds, packhouses, cool rooms, and staff amenities.',
    title: 'Agriculture & packhouse',
    metaTitle: 'Agriculture & packhouse pest control Melbourne',
    metaDescription: 'Pest control for Melbourne-region agriculture.',
    content: 'Agricultural sites deal with open doors, seasonality, and fast-moving product — ideal for rodents, birds, and stored-product insects. We focus on intake tables, voids, insulation, and waste.',
    features: ['Rodent, bird, and insect programs', 'Cool room and high-care areas', 'Seasonal reviews before peak harvest', 'WHS-aware site behaviour', 'Practical proofing advice'],
  },
  'educational-facilities': {
    h1: 'Pest control for schools & educational facilities in Melbourne',
    heroDescription: 'Canteens, classrooms, ovals, and staff areas.',
    title: 'School & educational facility',
    metaTitle: 'School & education facility pest control Melbourne',
    metaDescription: 'Pest control for Melbourne schools and education campuses.',
    content: 'Schools and campuses are mini cities: kitchens, woodland edges, storage sheds, and thousands of people. A proactive program beats reactive panic every time. We plan around term time and event calendars.',
    features: ['Ant, wasp, rodent, and spider control', 'Schedule alignment with school holidays', 'Canteen and storage priority review', 'Respect for child safety and access rules', 'Ongoing support for public and private operators'],
  },
  'distribution-center': {
    h1: 'Pest control for distribution centres in Melbourne',
    heroDescription: 'High-velocity pick, pack, and ship operations.',
    title: 'Distribution centre',
    metaTitle: 'Distribution centre pest control Melbourne | 3PL & DC',
    metaDescription: 'Pest control for Melbourne distribution centres and 3PL.',
    content: 'Distribution centres are built for speed, which pests exploit: long sight lines along racking, dark voids, and debris from damaged freight. We work from perimeter to mezzanine understanding where MHE traffic creates gaps.',
    features: ['Rodent and insect control for racking and docks', 'Out-of-hours and weekend service', 'Reporting for retail and grocery customers', 'Bird and fly pressure management', 'Joint review of proofing and doors'],
  },
};

function isCommercialIndustrySlug(slug: string): slug is CommercialIndustrySlug {
  return (COMMERCIAL_INDUSTRY_SLUGS as readonly string[]).includes(slug);
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COMMERCIAL_INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isCommercialIndustrySlug(slug)) return {};
  const page = COMMERCIAL_INDUSTRY_PAGES[slug];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/commercial-pest-control/${slug}` },
    openGraph: { title: `${page.metaTitle} | ${SITE_CONFIG.name}`, description: page.metaDescription, url: `/commercial-pest-control/${slug}` },
  };
}

function titleCase(title: string): string {
  return title.split(' ').map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');
}

const ALL_INDUSTRIES = COMMERCIAL_INDUSTRY_SLUGS.map((slug) => ({
  slug,
  label: COMMERCIAL_INDUSTRY_PAGES[slug].title,
  href: `/commercial-pest-control/${slug}`,
}));

export default async function CommercialIndustryPage({ params }: Props) {
  const { slug } = await params;
  if (!isCommercialIndustrySlug(slug)) notFound();
  const page = COMMERCIAL_INDUSTRY_PAGES[slug];
  const pageName = titleCase(page.title);

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Commercial', href: '/commercial-pest-control' },
    { name: pageName, href: `/commercial-pest-control/${slug}` },
  ];

  const jsonLd = [
    generateServiceSchema(page.h1, page.metaDescription),
    generateLocalBusinessSchema('Melbourne'),
    generateBreadcrumbSchema(breadcrumbItems),
  ];

  const otherIndustries = ALL_INDUSTRIES.filter((i) => i.slug !== slug).slice(0, 6);

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ===== HERO ===== */}
      <section className="relative w-full overflow-hidden bg-[#131a1c]">
        <div className="absolute inset-0">
          <Image src="/images/commercial/commercial-hero.png" alt="" fill className="object-cover object-center opacity-20" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#131a1c] via-[#131a1c]/60 to-transparent" />
        <div className="relative z-10 px-5 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8">
          <nav className="mb-6 text-[12px] text-white/50 sm:text-[13px]" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumbItems.map((item, i) => (
                <li key={item.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-[#3fa535]">/</span>}
                  {i < breadcrumbItems.length - 1 ? (
                    <Link href={item.href} className="transition-colors hover:text-white">{item.name}</Link>
                  ) : (
                    <span className="font-medium text-white">{item.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mb-4 max-w-lg text-[28px] font-bold leading-[1.1] text-white sm:text-[36px] lg:text-[44px]">{page.h1}</h1>
          <p className="max-w-md text-[16px] leading-[1.5] text-white/70 sm:text-[17px]">{page.heroDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={SITE_CONFIG.phoneTel} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#3fa535] px-7 py-3 text-[15px] font-bold text-white shadow-lg transition-transform hover:scale-105">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Call {SITE_CONFIG.phone}
            </a>
            <Link href="/contact-us" className="inline-flex min-h-[48px] items-center rounded-full border border-white/20 px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/5">
              Get a quote
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-[15px] leading-[1.8] text-[#414042] sm:text-[16px]">{page.content}</p>
            <h2 className="mb-5 text-[20px] font-bold text-[#131a1c] sm:text-[22px]">What we deliver</h2>
            <ul className="space-y-3">
              {page.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3fa535]">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-[14px] leading-[1.6] text-[#414042] sm:text-[15px]">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== GOOGLE REVIEWS ===== */}
      <ScrollReveal direction="up" delay={100}>
        <GoogleReviewsCarousel />
      </ScrollReveal>

      {/* ===== STATS ===== */}
      <ScrollReveal direction="fade">
        <section className="bg-[#0d402e] px-5 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-6 text-center text-[20px] font-bold text-white sm:text-[24px]">Why choose {SITE_CONFIG.shortName}?</h2>
            <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              {([
                { val: '15+', label: 'Years Experience' },
                { val: '5,000+', label: 'Jobs Completed' },
                { val: '99%', label: 'First-Visit Success' },
                { val: '24/7', label: 'Emergency Response' },
              ] as const).map((s) => (
                <div key={s.label}>
                  <p className="text-[28px] font-black text-[#1cdc38] sm:text-[32px]">{s.val}</p>
                  <p className="text-[12px] font-medium text-white/70 sm:text-[13px]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== CTA ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-3 text-[22px] font-bold text-[#131a1c] sm:text-[26px]">Book {pageName} pest control today</h2>
            <p className="mb-6 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
              Call {SITE_CONFIG.phone} for urgent advice, or book online for a time that suits you.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href={SITE_CONFIG.phoneTel} className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#3fa535] px-7 py-3 text-[15px] font-bold text-white shadow-lg transition-transform hover:scale-105 sm:w-auto">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                Call {SITE_CONFIG.phone}
              </a>
              <a href={SITE_CONFIG.booking.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border-2 border-[#3fa535] px-7 py-3 text-[15px] font-bold text-[#3fa535] transition-colors hover:bg-[#3fa535] hover:text-white sm:w-auto">
                Book online
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== OTHER INDUSTRIES ===== */}
      <ScrollReveal direction="up" delay={100}>
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-6 text-center text-[20px] font-bold text-[#131a1c] sm:text-[22px]">Other industries we serve</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {otherIndustries.map((ind) => (
                <Link
                  key={ind.slug}
                  href={ind.href}
                  className="rounded-xl border border-[#e5e5e5] bg-[#f8f5f2] px-4 py-3.5 text-center text-[13px] font-semibold text-[#131a1c] transition-all hover:border-[#3fa535] hover:shadow-md sm:text-[14px]"
                >
                  {titleCase(ind.label)}
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/commercial-pest-control" className="text-[14px] font-semibold text-[#3fa535] underline underline-offset-2 transition-colors hover:text-[#0d402e]">
                View all industries →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <PageInfoFooterBlock />
    </>
  );
}
