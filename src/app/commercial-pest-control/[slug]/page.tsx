import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, ChevronRight, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import StatsCounter from '@/components/sections/StatsCounter';

type CommercialIndustryPage = {
  h1: string;
  /** One line under the hero heading */
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
    heroDescription:
      'Keep racking, loading docks, and high-bay areas clear of pests that damage stock and slow operations.',
    title: 'Warehousing & storage',
    metaTitle: 'Commercial pest control for warehouses & storage | Melbourne',
    metaDescription:
      'Pest control for Melbourne warehouses, 3PL, and storage facilities. Rodent, insect, and bird management aligned with WHS, documentation for audits, and out-of-hours service.',
    content:
      'Warehouses and storage sites give pests long runs along walls, warm pockets near machinery, and plenty of food from spillage, packaging, and staff break areas. A single problem can lead to chewed product, failed retailer audits, and contamination that spreads before anyone notices. We treat these spaces with logistics in mind: we map high-traffic rodent lines, voids, and loading dock entry points, then set up a program that works with your shifts and your WH&S rules—without slowing pick paths or creating slip hazards. Whether you run ambient racking, cold storage, or mixed operations, you get clear communication, practical access plans, and records you can hand to a third-party audit when you need to.',
    features: [
      'Rodent programs tailored to racking, docks, and compactor areas',
      'Fly and stored-product insect control in dispatch and Q zones',
      'Discreet treatments scheduled around your peak dispatch windows',
      'Documentation to support WHS, food-industry, and client audits',
      'Recommendations to seal voids, doors, and cable penetrations on an ongoing basis',
    ],
  },
  'restaurants-pest-control': {
    h1: 'Restaurant pest control in Melbourne',
    heroDescription:
      'Confident, compliant support for front-of-house, kitchens, and back dock—so service stays smooth.',
    title: 'Restaurant',
    metaTitle: 'Restaurant pest control Melbourne | Cafés & dining',
    metaDescription:
      'Melbourne restaurant and café pest control: cockroach, rodent, and ant programs built around HACCP, after-hours service, and discreet site visits that protect your reputation.',
    content:
      'Dining rooms, bars, and busy kitchens are under constant pressure from cockroaches, flies, and rodents that follow grease, waste, and delivery traffic. A sighting in front of guests is never “just a small issue”—it affects reviews, local reputation, and health inspections overnight. We work the way you run service: we listen to your menu flow and waste routines, time visits to reduce disruption, and place emphasis on harbourage, drains, and entry points so treatments aren’t just a surface spray. Our advice is direct and easy to act on, so your team can keep the place feeling professional for customers while staying aligned with your food-safety expectations.',
    features: [
      'Cockroach, fly, and ant control focused on kitchen and prep zones',
      'Rodent control around cool rooms, storage, and delivery doors',
      'HACCP-aware processes and product selection; we speak your auditor’s language',
      'After-hours and pre-service windows where it suits your rosters',
      'Clear reporting so you know what we did, why, and what to watch next',
    ],
  },
  'pest-control-in-supermarkets': {
    h1: 'Pest control for supermarkets in Melbourne',
    heroDescription:
      'From bakery and deli to produce and back dock—treatments that support chain standards and high foot traffic.',
    title: 'Supermarket',
    metaTitle: 'Supermarket pest control Melbourne | Grocery & retail',
    metaDescription:
      'Pest control for Melbourne supermarkets and grocery retail. Integrated programs for birds, rodents, and flying insects, with scheduling around trading hours and documentation for head office.',
    content:
      'Supermarkets juggle public-facing aisles, high-turnover perishables, and constant deliveries—so pests have food, warmth, and hiding places everywhere from shelf bases to mezzanines. You need a partner who can plan around peak trading, work without alarming shoppers, and keep a straight line of communication to store management and head office expectations. We focus on the real drivers: door seals, produce handling, waste flows, and roof voids, then back it with monitoring that makes trends visible before they turn into a floor issue. The result is a calmer, more predictable program than ad-hoc callouts—one your team can rely on when volumes spike.',
    features: [
      'Bird and fly management for entries, fresh sections, and waste areas',
      'Rodent programs that respect cold chain and storage layout',
      'Service timing aligned to store hours and handover notes for duty managers',
      'Structured documentation suitable for group compliance teams',
      'Site-specific risk review after seasonal produce or range changes',
    ],
  },
  'function-venues': {
    h1: 'Pest control for function & event venues in Melbourne',
    heroDescription:
      'Weddings, conferences, and live events need venues that look immaculate—our programs stay discreet.',
    title: 'function venue',
    metaTitle: 'Function venue pest control Melbourne | Event spaces',
    metaDescription:
      'Pest control for Melbourne function centres, event venues, and ballrooms. Discreet treatments, flexible out-of-hours visits, and focus on food service, back-of-house, and loading access.',
    content:
      'Event venues see irregular peaks, late finishes, and multiple catering setups in one week. That mix attracts flies, cockroaches, and rodents to kitchens, sculleries, and waste compactor areas—right when you’re hosting milestone moments for clients. We structure programs around your calendar where possible, keep branding and guest experience in mind, and pay attention to places guests never see: dock doors, voids, false ceilings, and store rooms that fill between events. You get a personable team that turns up on time, explains options plainly, and helps your ops crew stay one step ahead of the next big booking.',
    features: [
      'Flexible timing around bump-in, bump-out, and venue changeovers',
      'Kitchen, bar, and scullery programs aligned with your caterer routines',
      'Discreet service vehicles and on-site conduct suitable for high-end events',
      'Flying insect and rodent control for loading, waste, and external entertaining areas',
      'Simple written summaries after visits so your team can hand over shifts cleanly',
    ],
  },
  'brewhouses-and-distilleries': {
    h1: 'Pest control for brewhouses & distilleries in Melbourne',
    heroDescription:
      'Keep grain, fermentation, and packaging areas protected without compromising product quality or your taproom atmosphere.',
    title: 'brewhouse & distillery',
    metaTitle: 'Brewery & distillery pest control Melbourne',
    metaDescription:
      'Commercial pest control for Melbourne craft breweries, distilleries, and production facilities. Insect and rodent management for grain, production, and hospitality areas with site-sensitive programs.',
    content:
      'Brewing and distilling bring together grain, moisture, and warmth—an ideal mix for stored-product insects and rodent interest around silos, mills, and packaging lines. You also have public taprooms and tours where presentation matters, so the answer isn’t a one-size “spray everything” approach. We work with your production flow: identifying ingress around roller doors, grain handling, and drains, and recommending monitoring where it helps you spot a trend before it reaches a batch. Whether you are small-batch or at scale, you get a professional eye on risk, product handling that respects your process, and advice your team can actually use on the floor.',
    features: [
      'Stored-product insect and rodent control for grain, milling, and packaging',
      'Drain, pit, and loading bay inspection common in wet production areas',
      'Taproom, cellar door, and outdoor seating support without alarming visitors',
      'Coordination with your cleaning and maintenance routines',
      'Scalable program from pilot plant through to high-volume production',
    ],
  },
  'recreational-facilities-pest-control': {
    h1: 'Pest control for recreational facilities in Melbourne',
    heroDescription:
      'Pools, courts, canteens, and change rooms—pests don’t get a day off; neither does our support.',
    title: 'recreational facility',
    metaTitle: 'Recreational facility pest control Melbourne | Gyms, pools, clubs',
    metaDescription:
      'Pest control for Melbourne gyms, sports clubs, and recreational facilities. Ant, spider, cockroach, and flying insect control with scheduling around opening hours and member experience.',
    content:
      'Gyms, stadiums, and community facilities combine food service, moisture, and large roof spaces—perfect for ants, cockroaches, and spiders in plant rooms, canteens, and pool surrounds. Members notice straight away, and staff are pulled between cleaning rounds and public safety. We help by targeting harbourage, lighting that attracts night insects, and waste flows from kiosk through to external bins, then we schedule treatments to limit disruption to your timetable. The tone stays friendly and practical: you’ll know what we found, what we did, and what the facility can do day-to-day to stay ahead.',
    features: [
      'Ant, cockroach, and spider control for high-traffic wet and dry areas',
      'Member-sensitive timing for peak gym and class periods',
      'Canteen, kiosk, and changeroom focus where food and moisture meet',
      'Exterior and lighting advice to reduce flying insects around entries',
      'Support for both community clubs and private operators',
    ],
  },
  'government-buildings': {
    h1: 'Pest control for government buildings in Melbourne',
    heroDescription:
      'Reliable, documented service for public-sector sites, offices, and depots with clear process and safety.',
    title: 'government building',
    metaTitle: 'Government building pest control Melbourne | Public sector',
    metaDescription:
      'Pest control for Melbourne government offices, service centres, and public buildings. WHS-minded programs, access coordination, and reporting suitable for public-sector accountability.',
    content:
      'Public-sector buildings serve thousands of people and strict operational rules. Pests in common areas, plant rooms, or loading facilities can impact staff comfort, public confidence, and maintenance budgets at once. We work with you on access passes, after-hours clearances, and clear method statements so nothing is vague on the day. Treatments are chosen with workplace safety, visitor traffic, and mixed-use space in mind—reception, counters, public corridors, and back-of-house are all part of the same plan. You get a steady partner who shows up, communicates, and helps you build a defensible, low-drama program over the long term.',
    features: [
      'Coordination for access control, after-hours, and site induction requirements',
      'General pest, rodent, and ant programs across multi-level sites',
      'Respect for shared spaces, public counters, and high-footfall timings',
      'Clear visit reporting for facilities and building managers',
      'Integration with your preferred maintenance and cleaning schedules',
    ],
  },
  'transport': {
    h1: 'Pest control for transport & logistics in Melbourne',
    heroDescription:
      'Yards, workshops, and offices need protection from rodents and birds that follow freight, waste, and vehicles.',
    title: 'transport & logistics',
    metaTitle: 'Transport & logistics pest control Melbourne | Depots, yards',
    metaDescription:
      'Pest control for Melbourne transport, freight, and logistics: depots, workshops, and offices. Rodent, bird, and general pest control with out-of-hours options and WHS documentation.',
    content:
      'Transport operations pull pests in with food packaging from freight, voids in trailers and sheds, and long runs along fence lines and outbuildings. Issues often show up first as gnawing in wiring, stock damage, or droppings in drivers’ facilities—not places you can ignore from a WHS or downtime perspective. We look at the whole site: perimeter, pallet storage, waste compounds, and staff amenities, and we align treatments with your shift patterns and wash-down cycles. The aim is a reliable rhythm—fewer emergency callouts, clearer ownership of trouble spots, and a team you can call without playing phone tag.',
    features: [
      'Rodent and bird control for depots, yards, and trans-shipment areas',
      'Truck and workshop-adjacent programs where grease and food debris collect',
      'Out-of-hours and weekend options when that’s when the site is calmer',
      'Support for HACCP-linked freight where clients expect clear records',
      'Practical proofing and harbourage advice for compounds and outbuildings',
    ],
  },
  'food-manufacturing': {
    h1: 'Pest control for food manufacturing in Melbourne',
    heroDescription:
      'GMP- and HACCP-aligned support for production lines, dry goods, and high-care zones.',
    title: 'food manufacturing',
    metaTitle: 'Food manufacturing pest control Melbourne | HACCP',
    metaDescription:
      'Commercial pest control for Melbourne food manufacturers. Integrated pest management for production, storage, and loading areas with HACCP-aware methods and strong documentation.',
    content:
      'Food manufacturing is where pest control directly meets shelf life, customer complaints, and audit outcomes. You need a program that is systematic: monitoring, trend analysis, and targeted response—not a spray-first habit that ignores the why behind the catch. We walk your line from raw intake through to dispatch, work with your QA and engineering contacts, and keep language operational so production leaders aren’t wading through jargon. Whether you pack dry ingredients, handle chilled product, or run high-care rooms, the goal is the same: protect the brand, keep the paperwork honest, and make sure everyone knows the next step when a threshold moves.',
    features: [
      'IPM approach with monitoring, trend review, and documented responses',
      'Support for HACCP, GMP, and third-party food safety standards',
      'Flying insect, rodent, and stored-product pest programs for line and storage',
      'Pre-audit and seasonal reviews when new ingredients or pack formats arrive',
      'Close coordination with hygiene, engineering, and maintenance',
    ],
  },
  'aged-care-facilities': {
    h1: 'Pest control for aged care facilities in Melbourne',
    heroDescription:
      'Dignity, safety, and calm environments—sensitive service for residents, staff, and visitors.',
    title: 'aged care',
    metaTitle: 'Aged care facility pest control Melbourne | Residential care',
    metaDescription:
      'Pest control for Melbourne aged care and residential care facilities. Discreet ant, bed bug, cockroach, and rodent control with product selection and timing suited to vulnerable residents.',
    content:
      'Aged care homes balance hospitality, medical oversight, and 24/7 living—pests in dining rooms, resident wings, or waste rooms are distressing and operationally complex. We treat every visit with the patience it deserves: clear scheduling with lifestyle teams, product choices that account for frailty and medical equipment, and communication that doesn’t add stress to families or staff. From ants at sweet spill points to the occasional bed bug or rodent report near gardens and loading zones, you get a responsive partner who takes ownership and explains next steps in plain language your clinical and facility leads can act on fast.',
    features: [
      'Discreet service delivery that respects residents and family visits',
      'Ant, fly, and cockroach control for dining, servery, and back-of-house',
      'Bed bug response planning for multi-room and soft-furnishings context',
      'Rodent and bird management around ground-floor entries and gardens',
      'Product and timing options discussed with your clinical and WHS context',
    ],
  },
  hospitals: {
    h1: 'Pest control for hospitals & health facilities in Melbourne',
    heroDescription:
      'Infection control, sensitive areas, and round-the-clock operations—we align with your protocols.',
    title: 'hospital & health facility',
    metaTitle: 'Hospital & healthcare pest control Melbourne | Clinical sites',
    metaDescription:
      'Pest control for Melbourne hospitals, clinics, and healthcare facilities. Careful, protocol-aware programs for public areas, catering, and plant rooms with clear governance and response.',
    content:
      'Healthcare sites are high-consequence: pests in catering, voids, or ground-floor access can’t be “handled quietly tomorrow.” They also run continuously, with vulnerable people and strict operational rules. We work with your infection prevention, facilities, and contractor governance expectations—sticking to agreed products, PPE, and access routes, and responding with urgency when something breaches threshold. The relationship is open: if we need a change of plan, we say so early; if your site has seasonal pressure points, we build them into the program before they spike. You get reliable coverage without drama—exactly what busy clinical teams are asking for today.',
    features: [
      'Governed service delivery aligned to clinical and facilities requirements',
      'Catering, back dock, and waste compound coverage',
      'Ant, cockroach, fly, and rodent control with careful area planning',
      'Rapid response pathways for time-critical reports',
      'Clear documentation and handover for multi-shift teams',
    ],
  },
  agriculture: {
    h1: 'Agriculture & rural commercial pest control in Melbourne & surrounds',
    heroDescription:
      'Sheds, packhouses, cold rooms, and staff amenities where stored product and seasonal pressure meet.',
    title: 'agriculture & packhouse',
    metaTitle: 'Agriculture & packhouse pest control Melbourne | Farm commercial',
    metaDescription:
      'Pest control for Melbourne-region agriculture: packhouses, cool rooms, sheds, and commercial farm buildings. Insect, rodent, and bird control aligned with product integrity and work safety.',
    content:
      'Agricultural and peri-urban commercial sites deal with open doors, seasonality, and fast-moving product—ideal conditions for rodents, birds, and stored-product insects. You’re protecting yield, market access, and the safety of people working long hours, so treatments need to be practical in boots-on-the-ground terms. We focus on the interfaces: intake tables, voids, insulation, and waste, and we time visits to work with your harvest and packing peaks where we can. Whether you are packing for retail export or local markets, the conversation stays about outcomes: fewer lost pallets, calmer pack lines, and a team that picks up the phone when something unusual appears.',
    features: [
      'Rodent, bird, and stored-product insect programs for packhouses and sheds',
      'Cool room and high-care adjacent areas planned with your workflows',
      'Seasonal reviews before peak harvest and storage periods',
      'WHS and machinery-aware site behaviour in active work areas',
      'Practical advice on proofing, doors, and waste separation',
    ],
  },
  'educational-facilities': {
    h1: 'Pest control for schools & educational facilities in Melbourne',
    heroDescription:
      'Canteens, classrooms, ovals, and staff areas—kept in good order with child-safe, schedule-friendly service.',
    title: 'school & educational facility',
    metaTitle: 'School & education facility pest control Melbourne',
    metaDescription:
      'Pest control for Melbourne schools, TAFE, and education campuses. Ant, wasp, rodent, and spider control with term-safe approaches and visits timed around term dates and school hours.',
    content:
      'Schools and campuses are mini cities: kitchens, woodlands edges, storage sheds, and thousands of people moving through daily. Pests don’t need much—crumbs, bins, and quiet roof spaces will do—so a proactive program beats reactive panic every time. We plan around term time, after-care, and event calendars where possible, and we talk through product choices with your leadership and facilities teams in plain view of duty of care. From wasp hot spots in spring to ants along canteen lines and rodents near waste compounds, you get a steady partner who’s easy to work with and clear about what success looks like on your grounds.',
    features: [
      'Ant, wasp, rodent, and spider control across buildings and ovals perimeters',
      'Schedule alignment with school holidays and busy exam periods when needed',
      'Canteen, hall, and storage areas as priority harbourage review points',
      'Respect for child safety, access rules, and visitor protocols',
      'Ongoing support for public and private education operators',
    ],
  },
  'distribution-center': {
    h1: 'Pest control for distribution centres in Melbourne',
    heroDescription:
      'High-velocity pick, pack, and ship operations deserve pest control that matches your KPIs and chain standards.',
    title: 'distribution centre',
    metaTitle: 'Distribution centre pest control Melbourne | 3PL & DC',
    metaDescription:
      'Pest control for Melbourne distribution centres and 3PL: rodent, insect, and bird control for racking, docks, and mezzanines, with out-of-hours service and client-ready reporting.',
    content:
      'Distribution centres are built for speed, which is exactly what rodents and some insects use—long sight lines along racking, dark voids, and a steady trail of organic debris from damaged freight. A single client audit finding can flow straight back to your contract, so the program has to be visible and defensible. We work from perimeter to mezzanine: understanding where MHE traffic creates gaps, how doors seal at shift change, and where monitoring gives you a trend before it becomes a line stop. The partnership feel matters too—you’re not a ticket number. You get a team that’s professional on the comms, flexible on time windows, and focused on the outcomes your DC manager is measured on.',
    features: [
      'Rodent and insect control tailored to racking, staging, and dock zones',
      'Out-of-hours and weekend service when automation or volume demands it',
      'Reporting you can share with retail, grocery, and pharma customers',
      'Bird and fly pressure managed around canopies and external cages',
      'Joint review of proofing, doors, and vendor access after seasonal peaks',
    ],
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
  if (!isCommercialIndustrySlug(slug)) {
    return {};
  }
  const page = COMMERCIAL_INDUSTRY_PAGES[slug];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/commercial-pest-control/${slug}`,
    },
    openGraph: {
      title: `${page.metaTitle} | ${SITE_CONFIG.name}`,
      description: page.metaDescription,
      url: `/commercial-pest-control/${slug}`,
    },
  };
}

function titleCaseForCta(title: string): string {
  return title
    .split(' ')
    .map((word) => (word.length ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

export default async function CommercialIndustryPage({ params }: Props) {
  const { slug } = await params;
  if (!isCommercialIndustrySlug(slug)) {
    notFound();
  }
  const page = COMMERCIAL_INDUSTRY_PAGES[slug];
  const pageName = titleCaseForCta(page.title);

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
          <p className="mt-4 text-lg text-gray-200 max-w-3xl leading-relaxed">{page.heroDescription}</p>
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
          <h2 className="text-2xl font-bold text-zapit-dark mb-4">Book {pageName} pest control today</h2>
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
