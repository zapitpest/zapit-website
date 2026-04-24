import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Warehouse, UtensilsCrossed, ShoppingCart, Cake, Beer, Box, Building2, Mail, Phone } from 'lucide-react';
import { SITE_CONFIG, HOMEPAGE_FAQS } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateProductSchema, generateFAQSchema } from '@/lib/schema';
import {
  HomepageFAQ,
  HomepageMelbourneCoverage,
  HomepagePestCards,
  HomepagePestServiceTabs,
  HomepagePricing,
  HomepageReviews,
} from '@/components/sections/HomepageReviewsAndPestTabs';

const HERO_BG =
  'https://zapitpestmelbourne.com.au/wp-content/uploads/2025/09/imgi_73_WhatsApp-Image-2025-09-17-at-3.05.27-PM.jpg';

const WP = '/images/wp-assets';

const INDUSTRY_TILES: { title: string; href: string; Icon: LucideIcon }[] = [
  { title: 'Property Pest Control', href: '/commercial/property-pest-control', Icon: Home },
  { title: 'Warehousing and Storage', href: '/commercial-pest-control/warehousing-and-storage', Icon: Warehouse },
  { title: 'Restaurants Pest Control', href: '/commercial-pest-control/restaurants-pest-control', Icon: UtensilsCrossed },
  { title: 'Supermarkets Pest Control', href: '/commercial-pest-control/pest-control-in-supermarkets', Icon: ShoppingCart },
  { title: 'Function Vanues', href: '/commercial/function-venues', Icon: Cake },
  { title: 'Brewhouses and Distilleries', href: '/commercial/brewhouses-and-distilleries', Icon: Beer },
  { title: 'Recreational Facilities', href: '/commercial-pest-control/recreational-facilities-pest-control', Icon: Box },
  { title: 'Government Buildings', href: '/commercial/government-buildings', Icon: Building2 },
];

const BLOG_CARDS: {
  href: string;
  image: string;
  title: string;
  excerpt: string;
  w: number;
  h: number;
}[] = [
  {
    href: '/blogs#how-to-prepare-your-home-for-a-pest-control-visit',
    image: `${WP}/2026-01-How-to-Prepare-Your-Home-for-a-Pest-Control-Visit-img-300x200.jpg`,
    title: 'How to Prepare Your Home for a Pest Control Visit?',
    excerpt: 'Preparing your home before a pest control visit improves...',
    w: 300,
    h: 200,
  },
  {
    href: '/blogs#what-happens-during-a-professional-pest-inspection',
    image: `${WP}/2026-01-What-Happens-During-a-Professional-Pest-Inspection-img-300x200.jpg`,
    title: 'What Happens During a Professional Pest Inspection?',
    excerpt: 'A professional pest inspection is a detailed process...',
    w: 300,
    h: 200,
  },
  {
    href: '/blogs#pest-control-checklist-for-new-homeowners-in-melbourne',
    image: `${WP}/2025-12-Pest-Control-300x168.jpg`,
    title: 'Pest Control Checklist for New Homeowners in Melbourne',
    excerpt: 'Moving into a new home is an exciting milestone, yet...',
    w: 300,
    h: 168,
  },
];

const STRATEGY_STEPS = [
  {
    n: '1',
    title: "Stop! Don't Spray Anything",
    body: "If you've just spotted an ant or cockroach on your kitchen shelf or in the bathroom, don't immediately use the pest repellent spray you bought from the supermarket. Doing so can cause them to relocate and multiply. Instead, call professional pest controllers to secure the area.",
  },
  {
    n: '2',
    title: 'Contain The Area',
    body: 'Remove any food items placed near the areas where pests are entering your home. Wipe the floors and shelves, as ants follow scent trails. Be sure to keep your children and pets away from these areas to avoid infestations. Send pictures of the pests to our experts for species identification.',
  },
  {
    n: '3',
    title: 'Let Professionals Handle The Situation',
    body: "Now that your initial preparations are complete, it's time to let the pest control experts at Zap It take over. Our team will arrive at your property and inspect the affected areas. After that, they will use the safest treatment method eliminate every pest in your space.",
  },
] as const;

function GreenDivider({ className = 'w-[9%] min-w-[80px] mx-auto' }: { className?: string }) {
  return <div className={`h-0.5 bg-[#7DD958] ${className}`} role="presentation" aria-hidden />;
}

const btnZapit =
  'inline-flex min-h-[48px] items-center justify-center bg-zapit-green text-white text-base font-semibold uppercase tracking-wide px-10 py-3 rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] hover:bg-zapit-green-dark';
const btnBlack =
  'inline-flex min-h-[48px] items-center justify-center bg-black text-white text-base font-semibold uppercase tracking-wide px-10 py-3 rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] hover:bg-neutral-900';

export const metadata: Metadata = {
  title: 'Pest Control Melbourne | Zap It Pest Control Services',
  description: `Zap It delivers fast, licensed pest & termite control across Melbourne, safe for pets & people, protecting homes & businesses from pests. Call ${SITE_CONFIG.phone}.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pest Control Melbourne | Zap It Pest Control Services',
    description: `Zap It delivers fast, licensed pest & termite control across Melbourne, safe for pets & people, protecting homes & businesses from pests. Call ${SITE_CONFIG.phone}.`,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'en_AU',
    type: 'website',
  },
};

export default function HomePage() {
  const faqSchema = generateFAQSchema(HOMEPAGE_FAQS.map((f) => ({ question: f.question, answer: f.answer })));
  const productSchema = generateProductSchema();
  const schemas = [productSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <JsonLd data={schemas} />

      <section className="relative min-h-[450px] flex flex-col items-center text-white pt-[115px] pb-12 overflow-hidden">
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          className="object-cover object-bottom -z-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20 -z-10" aria-hidden />
        <div className="relative w-full max-w-[1200px] mx-auto px-3 sm:px-4 text-center z-0">
          <h1
            className="text-3xl sm:text-[42px] md:text-[51px] font-semibold leading-[1.2] text-white drop-shadow-sm px-1"
            style={{ textWrap: 'balance' } as CSSProperties}
          >
            <span className="inline bg-zapit-green [box-decoration-break:clone] px-2.5 text-white">
              ZAP IT PEST &amp; TERMITE CONTROL MELBOURNE
            </span>
          </h1>
          <p className="mt-5 inline-block text-left sm:text-center text-[18px] leading-[25px] text-white bg-[#3fa5354D] px-4 py-3 max-w-3xl">
            Quick and professional, 5-star pest control Melbourne services in Melbourne.
          </p>
          <div className="mt-8">
            <Link href={SITE_CONFIG.phoneTel} className={btnBlack}>
              Call Now{' '}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white text-zapit-dark-bg">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <h2 className="text-center text-[32px] md:text-[38px] font-semibold text-zapit-heading-dark max-w-4xl mx-auto">
            How Customers Rate Zap It Pest &amp; Termite Control Services
          </h2>
          <GreenDivider className="w-[9%] min-w-[80px] mx-auto mt-4" />
          <div className="mt-8">
            <HomepageReviews />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4 text-center">
          <HomepagePestCards />
          <div className="mt-10">
            <Link href="/pest-solutions" className={btnZapit}>
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <h2 className="text-center text-[32px] md:text-[38px] font-semibold text-zapit-heading-dark">
            Melbourne&apos;s Best One-In-All Pest Control Services
          </h2>
          <GreenDivider className="w-[9%] min-w-[80px] mx-auto mt-4" />
          <div className="mt-8">
            <HomepagePestServiceTabs />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <h2 className="text-center text-[32px] md:text-[38px] font-semibold text-zapit-heading-dark">
            Tailored Solutions For Every Industry
          </h2>
          <GreenDivider className="w-[9%] min-w-[80px] mx-auto mt-4" />
          <p className="text-center text-[18px] leading-[25px] text-zapit-body-text max-w-3xl mx-auto mt-6">
            Our inspection team takes time and figures out the issues you are actually facing, like termite or bee attacks,
            and so on. We will use the right treatment method to remove the insects from your place.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRY_TILES.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="flex flex-col items-center justify-center text-center min-h-[120px] rounded-xl border border-gray-200/80 bg-white p-4 shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-colors hover:bg-zapit-green-hover hover:border-zapit-green/30"
              >
                <tile.Icon className="h-8 w-8 text-zapit-green mb-2" strokeWidth={1.75} />
                <span className="text-sm font-semibold text-zapit-heading-dark leading-snug">{tile.title}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/commercial-pest-control" className={btnZapit}>
              Find Your Industry
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-zapit-section-bg">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <h2 className="text-center text-[32px] md:text-[38px] font-semibold text-zapit-heading-dark">
            All Over Melbourne Pest Control Coverage
          </h2>
          <GreenDivider className="w-[9%] min-w-[80px] mx-auto mt-4" />
          <div className="mt-10">
            <HomepageMelbourneCoverage />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <h2 className="text-[28px] md:text-[36px] font-semibold text-zapit-heading-dark leading-tight">
                Zap It Pest &amp; Termite Control Melbourne - Licensed &amp; Quick Controllers
              </h2>
              <GreenDivider className="w-[15%] min-w-[72px] mt-4 ml-0 mr-auto" />
              <p className="mt-5 text-[18px] leading-[25px] text-zapit-body-text">
                Zap It is the leading pest control Melbourne company, helping residential and commercial property owners
                maintain a pest-free, healthy environment. Adam Balli founded Zap It in 2020, and since that day, we have
                been providing fast, chemical-free pest control solutions using modern tools and advanced technology.
              </p>
              <p className="mt-4 text-[18px] leading-[25px] text-zapit-body-text">
                Our effective, eco-friendly, and long-lasting pest removal results have made us the leading pest controllers
                in Melbourne. We&apos;re ready to protect your environment and provide a pest-free home or commercial space.
                Book our same-day service and receive personalised care and solutions for termites, spiders, ants, rodents,
                mosquitoes, and more.
              </p>
              <div className="mt-8">
                <Link href="/about-us" className={btnZapit}>
                  Discover Zap It
                </Link>
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.2)]">
              <Image
                src={`${WP}/2025-06-ZAP-IT-SOCIALIETTA-508127.webp`}
                alt="Zap It Pest Control team"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-zapit-section-bg">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <h2 className="text-center text-[32px] md:text-[38px] font-semibold text-zapit-heading-dark">
            Concerned About Pests? Don&apos;t Panic &amp; Follow This Strategy
          </h2>
          <GreenDivider className="w-[9%] min-w-[80px] mx-auto mt-4" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STRATEGY_STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[32px] md:text-[36px] font-bold text-zapit-green leading-none flex-shrink-0">
                    {s.n}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-zapit-heading-dark mt-1">{s.title}</h3>
                </div>
                <p className="mt-3 text-zapit-body-text text-[16px] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-[32px] md:text-[38px] font-semibold text-zapit-heading-dark">
                Fully Insured &amp; Licensed By The Victorian DHHS
              </h2>
              <GreenDivider className="w-[15%] min-w-[72px] mt-4" />
              <div className="mt-4">
                <Image
                  src={`${WP}/2025-04-WhatsApp-Image-2025-04-27-at-20.43.22_e51c5930-Photoroom-e1745768720629.png`}
                  alt="Victoria State Government Logo"
                  width={477}
                  height={280}
                  className="w-full max-w-[194px] h-auto"
                />
              </div>
              <p className="mt-5 text-[18px] leading-[25px] text-zapit-body-text">
                Zap It adheres to Australian health standards and complies with pest control service protocols. As a
                top-rated pest control Melbourne service We are licensed by the Department of Health and Human Services
                Victoria (DHHS) to provide quality services using authorised pest control products. We treat your home and
                workplace as our own, using high-quality, eco-friendly products to deliver long-lasting solutions. Choose
                Licensed. Choose Safe. Choose Zap It.
              </p>
              <div className="mt-6">
                <Link
                  href={SITE_CONFIG.booking.url}
                  className={btnZapit}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BOOK OUR SERVICE TODAY!{' '}
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                <Image
                  src={`${WP}/elementor-thumbs-ZAP-IT-SOCIALIETTA-508022-r7s5ckhcmh43u3l9w3juc3wy7mr5k12y7bz7xs4tbk.webp`}
                  alt="Zap It pest control team on site"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <h2 className="text-center text-[32px] md:text-[38px] font-semibold text-zapit-heading-dark">Our Blogs</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_CARDS.map((b) => (
              <Link
                key={b.title}
                href={b.href}
                className="group flex flex-col rounded-xl overflow-hidden bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:bg-zapit-green-hover transition-colors"
              >
                <div className={`relative w-full ${b.h === 168 ? 'h-[200px]' : 'h-[200px]'}`}>
                  <Image
                    src={b.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-[30px] bg-[#eeeeee]">
                  <h3 className="text-[21px] font-normal text-zapit-heading-dark group-hover:text-zapit-green transition-colors leading-snug">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[18px] leading-[25px] text-zapit-body-text flex-1 line-clamp-3">{b.excerpt}</p>
                  <span className="mt-4 inline-flex w-fit items-center justify-center min-h-10 bg-zapit-green text-white text-sm font-semibold px-5 rounded-lg shadow-sm uppercase tracking-wide">
                    Read More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-zapit-section-bg">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <h2 className="text-center text-[32px] md:text-[38px] font-semibold text-zapit-heading-dark">Certifications &amp; Compliance</h2>
          <GreenDivider className="w-[9%] min-w-[80px] mx-auto mt-4" />
          <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-12 text-center">
            {[
              {
                w: 280,
                h: 120,
                src: `${WP}/2024-07-aempa-v2-1-e1745687358594-768x321.png`,
                label: 'AUSTRALIAN ENVIRONMENTAL PEST MANAGERS ASSOCIATION',
              },
              {
                w: 150,
                h: 150,
                src: `${WP}/2024-07-200dguarantee-e1745687539942-300x300.png`,
                label: 'UNRIVALLED SERVICE AND SUPPORT',
              },
              {
                w: 173,
                h: 300,
                src: `${WP}/2024-07-aempa-v2-1-1-e1745687916424-173x300.png`,
                label: 'HACCP FOOD SAFETY CERTIFICATION',
              },
              {
                w: 300,
                h: 300,
                src: `${WP}/2025-04-WhatsApp-Image-2025-04-25-at-23.36.21_3d87ac70-300x300.jpg`,
                label: 'WILDIFE LICENCE',
              },
            ].map((c) => (
              <div key={c.label} className="flex max-w-[240px] flex-col items-center">
                <div className="relative h-28 w-full">
                  <Image src={c.src} alt="" fill className="object-contain" sizes="200px" />
                </div>
                <p className="mt-3 text-xs font-medium text-black leading-tight max-w-[220px]">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <h2 className="text-center text-[32px] md:text-[38px] font-semibold text-zapit-heading-dark">Frequently Asked Questions</h2>
          <GreenDivider className="w-[45%] min-w-[120px] max-w-md mx-auto mt-4" />
          <div className="mt-4">
            <HomepageFAQ />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-zapit-section-bg">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <h2 className="text-center text-[32px] md:text-[38px] font-semibold text-zapit-heading-dark">Our Prices</h2>
          <GreenDivider className="w-[9%] min-w-[80px] mx-auto mt-4" />
          <div className="mt-10">
            <HomepagePricing />
          </div>
        </div>
      </section>

      <section className="relative text-white overflow-hidden" style={{ background: '#131a1c' }}>
        <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
          <div className="flex flex-col md:flex-row md:items-end gap-0">
            <div className="relative w-full max-w-[350px] mx-auto md:mx-0 flex-shrink-0 self-end">
              <Image
                src={`${WP}/2025-07-imgi_23_—Pngtree—pest-control-worker-in-protective_15020351-2-1-768x768.webp`}
                alt="Pest control worker in protective equipment"
                width={768}
                height={768}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="flex-1 min-w-0 py-12 md:py-16 md:pl-8">
              <Image
                src={`${WP}/2024-07-200-colour.png`}
                alt="200% Guarantee Badge"
                width={160}
                height={166}
                className="w-28 sm:w-32 h-auto mb-5"
              />
              <p
                className="text-lg sm:text-xl font-bold tracking-wide text-white/95"
                style={{ fontFamily: "'Graphik', Arial, Helvetica, sans-serif" }}
              >
                WE&apos;RE NOT HAPPY UNLESS YOU&apos;RE HAPPY
              </p>
              <p
                className="mt-3 text-[18px] md:text-[20px] leading-[1.6] text-white/90"
                style={{ fontFamily: "'Graphik', Arial, Helvetica, sans-serif" }}
              >
                Talk to us about pest control for your home or business
              </p>
              <ul className="mt-5 space-y-3 text-white/95 text-[18px]">
                <li>
                  <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-3 hover:underline">
                    <Phone className="h-5 w-5 text-[#3fa535] flex-shrink-0" aria-hidden />
                    {SITE_CONFIG.phoneRaw}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="inline-flex items-center gap-3 hover:underline break-all">
                    <Mail className="h-5 w-5 text-[#3fa535] flex-shrink-0" aria-hidden />
                    {SITE_CONFIG.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
