import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, ChevronRight, Check, CheckCircle2, Sun, Leaf, Flower2, Clock, Shield, Star } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import StatsCounter from '@/components/sections/StatsCounter';

export const PEST_SOLUTION_SLUGS = [
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
  heroImage: string;
  icon: typeof Sun;
  paragraphs: string[];
  features: [string, string, string, string, string];
};

const PEST_SOLUTION_PAGES: Record<PestSolutionSlug, PestSolutionPage> = {
  'seasonal-pest-control': {
    title: 'Seasonal Pest Control',
    metaTitle: 'Seasonal Pest Control Melbourne | Year-Round Protection | Zapit',
    metaDescription:
      'Target pests by Melbourne season: cockroaches in summer, rodents in winter, ants in spring, spiders in autumn. Licensed treatments and scheduling with Zapit.',
    h1: 'Seasonal Pest Control in Melbourne',
    heroDescription:
      'Pest pressure changes with the weather. We time inspections and treatments so your home stays protected through every Melbourne season.',
    heroImage: '/images/residential/hero-cottage.png',
    icon: Sun,
    paragraphs: [
      'Melbourne\u2019s seasons do not just change what you wear outdoors\u2014they change which pests are most likely to move in. In summer, warmth and moisture often bring cockroaches and flies into kitchens and roof voids. Winter sends rodents looking for shelter and easy food. Spring wakes ant colonies, and autumn can push spiders and other critters toward the drier, warmer edges of your property.',
      'That is why a one-off spray in isolation rarely matches what your home actually needs across the year. Our seasonal approach looks at your suburb, your building type, and what is active right now, then lines up treatment and monitoring so problems are caught before they turn into an infestation.',
      'We can book recurring visits on a schedule that suits you\u2014whether that is a seasonal check before peak pest months or a plan that aligns with your lease or business calendar. You get clear advice on what to expect each season and practical tips to reduce food, water, and entry points that attract pests between visits.',
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
    metaTitle: 'Organic & Low-Toxic Pest Control Melbourne | Zapit',
    metaDescription:
      'Low-toxic pest control for Melbourne homes: natural options, IPM, and responsible treatments suited to families and sensitive spaces. Call Zapit.',
    h1: 'Organic & Low-Toxic Pest Control',
    heroDescription:
      'When you want effective results without harsh chemicals, we use careful product choice, integrated pest management, and methods suited to kids, pets, and sensitive environments.',
    heroImage: '/images/residential/hero-family.png',
    icon: Leaf,
    paragraphs: [
      'Many Melbourne families and businesses ask for pest control that feels right for the people and animals who use the space every day. Our organic-leaning service focuses on the least-toxic options that still get results: targeted gel and bait applications, physical barriers, and habitat changes that make your property less inviting to pests in the first place.',
      'We follow an integrated pest management (IPM) mindset\u2014inspect first, identify the species, then choose the minimum intervention that solves the problem. That might mean exclusion work, moisture advice, and selective natural or low-odour treatments rather than broad indoor fogging, especially in nurseries, kitchens, and areas where children play on the floor.',
      'We will always be honest about what \u201corganic\u201d or \u201cnatural\u201d can and cannot do for serious infestations, and we will step up the plan safely when needed, with clear communication so you know what is being used, where, and why. The goal is peace of mind: a home that feels clean and protected, with methods matched to your comfort level.',
    ],
    features: [
      'Preference for low-toxic, targeted treatments and IPM over blanket chemical use',
      'Child- and pet-aware application methods and product selection where appropriate',
      'Natural and mechanical options\u2014sealing, traps, and environmental changes\u2014when they fit',
      'Clear labelling of what we use and clear re-entry or ventilation advice',
      'Scalable plans for homes, schools, and workplaces with stricter environmental needs',
    ],
  },
  'garden-pest-control': {
    title: 'Garden Pest Control',
    metaTitle: 'Garden Pest Control Melbourne | Lawns, Vege Patches & Outdoor Living | Zapit',
    metaDescription:
      'Protect Melbourne gardens, lawns, and outdoor living areas from pests. Targeted outdoor treatments for plant health, entertainment spaces, and boundaries.',
    h1: 'Garden & Outdoor Pest Control',
    heroDescription:
      'From vege beds to entertaining decks, we help keep your outdoor spaces enjoyable by managing the pests that damage plants, lawns, and your peace of mind.',
    heroImage: '/images/residential/townhouse.png',
    icon: Flower2,
    paragraphs: [
      'Your garden is an extension of your home: barbecues, kids\u2019 play, pets, and weekend gardening all happen outside. Pests in the soil, on foliage, or along fences can wreck plants, annoy guests, and sometimes find a path indoors. We treat outdoor areas with an eye for both plant health and the way you use the space\u2014minimising impact on the bits you actually live in.',
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

const SIBLING_LINKS: { slug: PestSolutionSlug; title: string }[] = [
  { slug: 'seasonal-pest-control', title: 'Seasonal Pest Control' },
  { slug: 'organic-pest-control', title: 'Organic Pest Control' },
  { slug: 'garden-pest-control', title: 'Garden Pest Control' },
];

export default async function PestSolutionSubPage({ params }: Props) {
  const { slug } = await params;
  if (!isPestSolutionSlug(slug)) {
    notFound();
  }
  const page = PEST_SOLUTION_PAGES[slug];
  const Icon = page.icon;

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

  const siblings = SIBLING_LINKS.filter((s) => s.slug !== slug);

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#0d402e] text-white">
        <div className="absolute inset-0">
          <Image src={page.heroImage} alt="" fill className="object-cover object-center opacity-20" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d402e] via-[#0d402e]/90 to-[#0d402e]/70" />
        <div className="relative mx-auto max-w-[1200px] px-5 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:pb-20">
          <nav className="mb-6 text-sm text-gray-300" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbItems.map((item, i) => (
                <li key={item.href} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#64FF01]" aria-hidden />}
                  {i < breadcrumbItems.length - 1 ? (
                    <Link href={item.href} className="transition-colors hover:text-white">{item.name}</Link>
                  ) : (
                    <span className="font-medium text-white">{item.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#64FF01]/15">
              <Icon className="h-7 w-7 text-[#64FF01]" />
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-[#64FF01]">Specialised Program</span>
          </div>
          <h1 className="mb-4 max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{page.h1}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/80">{page.heroDescription}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 rounded-full bg-[#64FF01] px-6 py-3.5 text-[15px] font-bold text-[#0d402e] transition-transform hover:scale-105">
              <Phone className="h-4 w-4" />Call {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-b border-[#e5e5e5] bg-[#f8f5f2] py-3.5">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 text-[13px] font-semibold text-[#0d402e]">
          {['Licensed', 'Family Friendly', 'Accredited', 'Fully Insured', 'Same-Day Available'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#3fa535]" strokeWidth={2.5} />{t}
            </span>
          ))}
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="bg-white py-14 md:py-18 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-3">
              <div className="space-y-6 text-[16px] leading-[1.8] text-[#414042]">
                {page.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-10 overflow-hidden rounded-2xl">
                <Image src="/images/residential/cat-girl.png" alt={`${page.title} Melbourne`} width={700} height={500} className="h-auto w-full" />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                {/* Features card */}
                <div className="rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2] p-6">
                  <h3 className="mb-5 text-xl font-bold text-[#131a1c]">What We Deliver</h3>
                  <ul className="space-y-4">
                    {page.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3fa535]">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-[14px] leading-relaxed text-[#414042]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick info */}
                <div className="rounded-2xl bg-[#0d402e] p-6 text-white">
                  <h3 className="mb-4 text-lg font-bold text-[#64FF01]">Quick Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[14px]">
                      <Clock className="h-5 w-5 shrink-0 text-[#64FF01]" />
                      <span className="text-white/80">Same-day response available</span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px]">
                      <Shield className="h-5 w-5 shrink-0 text-[#64FF01]" />
                      <span className="text-white/80">Licensed technicians</span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px]">
                      <Star className="h-5 w-5 shrink-0 text-[#64FF01]" />
                      <span className="text-white/80">Highly rated on Google</span>
                    </div>
                  </div>
                  <a href={SITE_CONFIG.phoneTel} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#64FF01] px-5 py-3 text-[14px] font-bold text-[#0d402e]">
                    <Phone className="h-4 w-4" />Call {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-[#131a1c] py-14 text-white lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">Why Choose {SITE_CONFIG.shortName}?</h2>
          <StatsCounter />
        </div>
      </section>

      {/* ===== SIBLING PROGRAMS ===== */}
      <section className="bg-[#f8f5f2] py-14 lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-[#131a1c] md:text-3xl">Other Specialised Programs</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {siblings.map((s) => {
              const SibIcon = PEST_SOLUTION_PAGES[s.slug].icon;
              return (
                <Link
                  key={s.slug}
                  href={`/pest-solutions/${s.slug}`}
                  className="group flex items-center gap-5 rounded-2xl border border-[#e5e5e5] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#3fa535] hover:shadow-md"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0d402e] to-[#1a5c3f]">
                    <SibIcon className="h-7 w-7 text-[#64FF01]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#131a1c] transition-colors group-hover:text-[#3fa535]">{s.title}</h3>
                    <p className="mt-1 text-[14px] text-[#636363]">{PEST_SOLUTION_PAGES[s.slug].metaDescription.slice(0, 80)}...</p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 shrink-0 text-[#3fa535] opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href="/pest-solutions" className="inline-flex items-center gap-2 text-[15px] font-bold text-[#3fa535] transition-colors hover:text-[#0d402e]">
              View All Pest Solutions <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[#0d402e] py-14 text-white lg:py-16">
        <div className="mx-auto max-w-[800px] px-5 text-center sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Need {page.title} in Melbourne?</h2>
          <p className="mb-8 text-[15px] text-white/80">
            Call {SITE_CONFIG.phone} for urgent advice or to arrange a visit. {SITE_CONFIG.operatingHours}.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={SITE_CONFIG.phoneTel} className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#64FF01] px-8 py-4 text-[16px] font-bold text-[#0d402e] shadow-lg transition-transform hover:scale-105 sm:w-auto">
              <Phone className="h-5 w-5 shrink-0" />Call Now — {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
