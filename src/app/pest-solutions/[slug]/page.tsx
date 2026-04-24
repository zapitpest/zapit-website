import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, ChevronRight, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import StatsCounter from '@/components/sections/StatsCounter';

const PEST_SOLUTION_SLUGS = [
  'seasonal-pest-control',
  'organic-pest-control',
  'garden-pest-control',
] as const;

type PestSolutionSlug = (typeof PEST_SOLUTION_SLUGS)[number];

type PestSolutionPage = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroDescription: string;
  paragraphs: string[];
  features: [string, string, string, string, string];
};

const PEST_SOLUTION_PAGES: Record<PestSolutionSlug, PestSolutionPage> = {
  'seasonal-pest-control': {
    title: 'Seasonal Pest Control',
    metaTitle: 'Seasonal Pest Control Melbourne | Year-Round Protection | Zap It',
    metaDescription:
      'Target pests by Melbourne season: cockroaches in summer, rodents in winter, ants in spring, spiders in autumn. Licensed treatments and scheduling with Zap It.',
    h1: 'Seasonal Pest Control in Melbourne',
    heroDescription:
      'Pest pressure changes with the weather. We time inspections and treatments so your home stays protected through every Melbourne season.',
    paragraphs: [
      'Melbourne’s seasons do not just change what you wear outdoors—they change which pests are most likely to move in. In summer, warmth and moisture often bring cockroaches and flies into kitchens and roof voids. Winter sends rodents looking for shelter and easy food. Spring wakes ant colonies, and autumn can push spiders and other critters toward the drier, warmer edges of your property.',
      'That is why a one-off spray in isolation rarely matches what your home actually needs across the year. Our seasonal approach looks at your suburb, your building type, and what is active right now, then lines up treatment and monitoring so problems are caught before they turn into an infestation.',
      'We can book recurring visits on a schedule that suits you—whether that is a seasonal check before peak pest months or a plan that aligns with your lease or business calendar. You get clear advice on what to expect each season and practical tips to reduce food, water, and entry points that attract pests between visits.',
    ],
    features: [
      'Seasonal risk assessment tailored to your Melbourne address and property type',
      'Summer focus on heat-loving pests such as cockroaches and outdoor breeding sites',
      'Winter strategies for rodent proofing, baiting, and entry-point reduction',
      'Spring and autumn treatment windows timed for ants, spiders, and seasonal surges',
      'Flexible booking so treatments align with your schedule and our local pest calendar',
    ],
  },
  'organic-pest-control': {
    title: 'Organic Pest Control',
    metaTitle: 'Organic & Low-Toxic Pest Control Melbourne | Child & Pet Safe | Zap It',
    metaDescription:
      'Eco-friendly pest control for Melbourne homes: natural and low-toxic options, IPM, and treatments suited to families, pets, and sensitive spaces. Call Zap It.',
    h1: 'Organic & Eco-Friendly Pest Control',
    heroDescription:
      'When you want effective results without harsh chemicals, we use careful product choice, integrated pest management, and methods suited to kids, pets, and sensitive environments.',
    paragraphs: [
      'Many Melbourne families and businesses ask for pest control that feels right for the people and animals who use the space every day. Our organic-leaning service focuses on the least-toxic options that still get results: targeted gel and bait applications, physical barriers, and habitat changes that make your property less inviting to pests in the first place.',
      'We follow an integrated pest management (IPM) mindset—inspect first, identify the species, then choose the minimum intervention that solves the problem. That might mean exclusion work, moisture advice, and selective natural or low-odour treatments rather than broad indoor fogging, especially in nurseries, kitchens, and areas where children play on the floor.',
      'We will always be honest about what “organic” or “natural” can and cannot do for serious infestations, and we will step up the plan safely when needed, with clear communication so you know what is being used, where, and why. The goal is peace of mind: a home that feels clean and protected, with methods matched to your comfort level.',
    ],
    features: [
      'Preference for low-toxic, targeted treatments and IPM over blanket chemical use',
      'Child- and pet-aware application methods and product selection where appropriate',
      'Natural and mechanical options—sealing, traps, and environmental changes—when they fit',
      'Clear labelling of what we use and clear re-entry or ventilation advice',
      'Scalable plans for homes, schools, and workplaces with stricter environmental needs',
    ],
  },
  'garden-pest-control': {
    title: 'Garden Pest Control',
    metaTitle: 'Garden Pest Control Melbourne | Lawns, Vege Patches & Outdoor Living | Zap It',
    metaDescription:
      'Protect Melbourne gardens, lawns, and outdoor living areas from pests. Targeted outdoor treatments for plant health, entertainment spaces, and boundaries.',
    h1: 'Garden & Outdoor Pest Control',
    heroDescription:
      'From vege beds to entertaining decks, we help keep your outdoor spaces enjoyable by managing the pests that damage plants, lawns, and your peace of mind.',
    paragraphs: [
      'Your garden is an extension of your home: barbecues, kids’ play, pets, and weekend gardening all happen outside. Pests in the soil, on foliage, or along fences can wreck plants, annoy guests, and sometimes find a path indoors. We treat outdoor areas with an eye for both plant health and the way you use the space—minimising impact on the bits you actually live in.',
      'We deal with a wide range of garden issues common around Melbourne, from chewing insects and crawling pests in mulch and lawn edges to wasps, ants, and other visitors that set up near paths, sheds, and entertaining zones. The plan is always informed by what is growing, what is stored outside, and where water and shade create hiding spots.',
      'Whether you need a one-off rescue for a hot spot or seasonal visits to keep pressure down before parties or harvest time, we will map the property with you, set realistic expectations, and use approaches that support healthy plants, usable lawns, and outdoor areas you are proud to show off.',
    ],
    features: [
      'Outdoor-focused inspections: borders, beds, lawn edges, decks, and utility areas',
      'Protection for ornamentals, edible gardens, and turf where treatments allow',
      'Strategies for entertaining areas, paths, and pet zones with minimal disruption',
      'Advice on mulching, drainage, and clutter reduction to limit pest habitat',
      'Coordinated plans if outdoor pests are also breaching the home or shed',
    ],
  },
};

function isPestSolutionSlug(slug: string): slug is PestSolutionSlug {
  return (PEST_SOLUTION_SLUGS as readonly string[]).includes(slug);
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PEST_SOLUTION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isPestSolutionSlug(slug)) {
    return {};
  }
  const page = PEST_SOLUTION_PAGES[slug];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/pest-solutions/${slug}`,
    },
    openGraph: {
      title: `${page.metaTitle} | ${SITE_CONFIG.name}`,
      description: page.metaDescription,
      url: `${SITE_CONFIG.url}/pest-solutions/${slug}`,
    },
  };
}

export default async function PestSolutionSubPage({ params }: Props) {
  const { slug } = await params;
  if (!isPestSolutionSlug(slug)) {
    notFound();
  }
  const page = PEST_SOLUTION_PAGES[slug];

  const path = `/pest-solutions/${slug}`;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Pest Solutions', href: '/pest-solutions' },
    { name: page.h1, href: path },
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
          <p className="mt-4 text-lg text-white/80 max-w-3xl leading-relaxed">{page.heroDescription}</p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6 text-lg text-zapit-text leading-relaxed mb-10">
            {page.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
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
