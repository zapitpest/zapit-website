import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Check,
  Mail,
  Phone,
  UtensilsCrossed,
  Warehouse,
  ShoppingCart,
  PartyPopper,
  Beer,
  Dumbbell,
  Landmark,
  Zap,
} from 'lucide-react';
import { SITE_CONFIG, HOMEPAGE_FAQS } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateProductSchema, generateFAQSchema } from '@/lib/schema';
import { TREATMENTS, PROPERTY_TYPES } from '@/lib/pricing-data';
import { BLOG_LIST_POSTS } from '@/lib/blog-list';
import FAQAccordion from '@/components/sections/FAQAccordion';
import StatsCounter from '@/components/sections/StatsCounter';
import { HomepagePestServiceTabs, HomepageReviewsBlock } from '@/components/sections/HomepageReviewsAndPestTabs';

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
        const price = pt === 'Double-story' ? t.propertyPricing.doubleStory : t.propertyPricing.singleStory;
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

export const metadata: Metadata = {
  title: `Pest Control Melbourne | ${SITE_CONFIG.name}`,
  description: `Melbourne's trusted pest & termite control. 5000+ emergencies solved, 24/7 same-day service. Safe for pets & people. Call ${SITE_CONFIG.phone} for a free quote.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: `Pest Control Melbourne | ${SITE_CONFIG.name}`,
    description: `Melbourne's trusted pest & termite control. 5000+ emergencies solved, 24/7 same-day service. Safe for pets & people.`,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'en_AU',
    type: 'website',
  },
};

const INDUSTRY_TILES = [
  { title: 'Property Pest Control', href: '/commercial-pest-control', Icon: Building2 },
  { title: 'Warehousing and Storage', href: '/commercial-pest-control#warehousing', Icon: Warehouse },
  { title: 'Restaurants Pest Control', href: '/commercial-pest-control#restaurants', Icon: UtensilsCrossed },
  { title: 'Supermarkets Pest Control', href: '/commercial-pest-control#supermarkets', Icon: ShoppingCart },
  { title: 'Function Venues', href: '/commercial-pest-control#venues', Icon: PartyPopper },
  { title: 'Brewhouses and Distilleries', href: '/commercial-pest-control#brewhouses', Icon: Beer },
  { title: 'Recreational Facilities', href: '/commercial-pest-control#recreational', Icon: Dumbbell },
  { title: 'Government Buildings', href: '/commercial-pest-control#government', Icon: Landmark },
] as const;

const CBD_CHECKS = [
  'CBD Coverage',
  'High-rise Specialists',
  '24/7 Emergency',
  'Heritage Properties',
  'Discreet Service',
  'Commercial Focus',
] as const;

export default function HomePage() {
  const faqSchema = generateFAQSchema(HOMEPAGE_FAQS.map((f) => ({ question: f.question, answer: f.answer })));
  const productSchema = generateProductSchema();
  const schemas = [productSchema, ...(faqSchema ? [faqSchema] : [])];

  // Explicit no-op: StatsCounter is imported per spec but not used (stats are inline).
  void StatsCounter;

  return (
    <>
      <JsonLd data={schemas} />

      {/* 1. Hero */}
      <section className="relative min-h-[min(85vh,720px)] flex items-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/hero/pest-service-melbourne.webp')] bg-cover bg-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-zapit-dark/45" aria-hidden />
        <div className="relative w-full max-w-5xl mx-auto px-4 py-24 md:py-32 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight uppercase">
            <span className="inline-block bg-[#0DC429] px-3 py-1.5 mb-1">ZAP IT PEST &amp; TERMITE CONTROL</span>
            <br />
            <span className="inline-block bg-[#0DC429] px-3 py-1.5">MELBOURNE</span>
          </h1>
          <div className="mt-6 flex justify-center px-2">
            <p className="w-full max-w-3xl text-base md:text-lg text-white/95 bg-zapit-green/60 backdrop-blur-[2px] px-4 py-3 md:px-6 md:py-3 rounded">
              Quick and professional, 5-star pest control Melbourne services in Melbourne.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center justify-center bg-zapit-dark hover:bg-black text-white font-bold px-10 py-4 rounded-lg text-base md:text-lg transition-colors shadow-lg"
            >
              CALL NOW
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Reviews */}
      <section id="reviews" className="py-14 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark text-center">
            How Customers Rate Zap It Pest &amp; Termite Control Services
          </h2>
          <div className="w-20 h-1 bg-zapit-green mx-auto my-4" />
          <HomepageReviewsBlock />
        </div>
      </section>

      {/* 3. Who can benefit */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-12 max-w-4xl mx-auto">
            Who Can Benefit From Our Pest Control Melbourne Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Residential Property Owners',
                sub: 'Pest-Free Home Guaranteed',
                body: "Whether you own a house, townhouse, or unit, we tailor treatments to your property so pests are controlled at the source—without cutting corners on safety for your family and pets.",
                href: '/residential',
                img: '/images/icons/residential.webp',
                alt: 'Residential',
              },
              {
                title: 'Commercial Business Owners',
                sub: 'Customer-Friendly Environment Guaranteed',
                body: "Restaurants, offices, and retail need discreet, compliant pest management that protects your brand. We work around your hours and keep documentation clear for your team.",
                href: '/commercial-pest-control',
                img: '/images/icons/business.webp',
                alt: 'Commercial',
              },
              {
                title: 'Termite Risk Structures',
                sub: 'Healthy-Property Protection Guaranteed',
                body: "Timber-heavy builds and subfloor voids are prime termite risk. We pair inspections with treatment plans so you're not caught out by hidden damage or silent entry points.",
                href: '/termite-control-melbourne',
                img: '/images/icons/termite-risk.webp',
                alt: 'Termite risk icon',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="relative border-l-4 border-zapit-green border-t border-r border-b border-zapit-border/80 rounded-r-xl p-6 pt-7 min-h-[320px] md:min-h-[340px] shadow-sm bg-white"
              >
                <h3 className="text-lg font-bold text-zapit-dark pr-20">{card.title}</h3>
                <p className="text-zapit-green font-semibold text-sm mt-1">{card.sub}</p>
                <p className="text-sm text-zapit-text mt-3 leading-relaxed pr-2">{card.body}</p>
                <Link
                  href={card.href}
                  className="inline-flex mt-5 bg-zapit-green hover:bg-zapit-green-dark text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
                >
                  Learn More
                </Link>
                <div className="absolute bottom-4 right-3 w-20 h-20 flex items-end justify-end pointer-events-none">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    width={80}
                    height={80}
                    className="object-contain w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/pest-solutions"
              className="inline-flex bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Melbourne's Best — tabs */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-10">
            Melbourne&apos;s Best One-In-All Pest Control Services
          </h2>
          <HomepagePestServiceTabs />
        </div>
      </section>

      {/* 5. Industry solutions */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark">
            Tailored Pest Control Melbourne Solutions For Every Industry
          </h2>
          <div className="w-20 h-1 bg-zapit-green mx-auto my-4" />
          <p className="text-center text-zapit-text max-w-3xl mx-auto mb-10 leading-relaxed">
            Our inspection team takes time to assess your site, identify risk areas, and build a program that matches how your
            business actually operates day to day—so treatments stay effective without slowing you down.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRY_TILES.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="flex flex-col items-center text-center p-4 rounded-lg border border-zapit-border/80 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <tile.Icon className="h-8 w-8 text-zapit-green mb-2" strokeWidth={1.75} />
                <span className="text-sm font-semibold text-zapit-dark leading-snug">{tile.title}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/commercial-pest-control"
              className="inline-flex bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Find Your Industry
            </Link>
          </div>
        </div>
      </section>

      {/* 6. All over Melbourne + CBD */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark text-left mb-2">
                All Over Melbourne Pest Control Coverage
              </h2>
              <h3 className="text-lg font-semibold text-zapit-text mb-6">Why Choose Zap It Pest &amp; Termite Control Melbourne Services?</h3>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <div className="rounded-xl bg-zapit-dark text-white p-4 text-center">
                  <p className="text-2xl font-extrabold text-zapit-green">{SITE_CONFIG.stats.emergenciesSolved}</p>
                  <p className="text-xs text-gray-300 mt-1">Emergencies solved</p>
                </div>
                <div className="rounded-xl bg-zapit-dark text-white p-4 text-center">
                  <p className="text-2xl font-extrabold text-white">{SITE_CONFIG.stats.yearsExperience}</p>
                  <p className="text-xs text-gray-300 mt-1">Years experience</p>
                </div>
                <div className="rounded-xl bg-zapit-dark text-white p-4 text-center">
                  <p className="text-2xl font-extrabold text-white">{SITE_CONFIG.stats.firstVisitSuccess}</p>
                  <p className="text-xs text-gray-300 mt-1">First-visit success</p>
                </div>
                <div className="rounded-xl bg-zapit-dark text-white p-4 text-center">
                  <p className="text-2xl font-extrabold text-white">{SITE_CONFIG.stats.availability}</p>
                  <p className="text-xs text-gray-300 mt-1">Support</p>
                </div>
                <div className="col-span-2 rounded-xl bg-zapit-dark text-white p-4 flex items-center gap-3">
                  <Zap className="h-9 w-9 text-zapit-green flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-300">Average Response Time</p>
                    <p className="text-lg font-bold text-zapit-green">{SITE_CONFIG.stats.responseTime}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-zapit-dark mb-3">CBD &amp; Inner City Melbourne - Pest Specialists</h3>
              <p className="text-zapit-text leading-relaxed mb-6">
                High-rise living and heritage facades need discreet access, clear communication, and plans that work with body corporate rules.
                We service apartments, retail, and offices across the CBD and inner ring with the same fast response and licensed technicians.
              </p>
              <ul className="space-y-2 mb-8">
                {CBD_CHECKS.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-zapit-dark text-sm">
                    <Check className="h-5 w-5 text-zapit-green flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={SITE_CONFIG.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-5 py-2.5 rounded-md transition-colors"
                >
                  Get a Free Quote Now
                </Link>
                <Link
                  href="/service-areas"
                  className="inline-flex bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-5 py-2.5 rounded-md transition-colors"
                >
                  Explore Service Areas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. About / founding story */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
              <Image
                src="/images/hero/about-pest-control.png"
                alt="Zap It pest control Melbourne"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark mb-4">
                Zap It Pest &amp; Termite Control Melbourne - Licensed &amp; Quick Controllers
              </h2>
              <p className="text-zapit-text leading-relaxed mb-4">
                Zap It is a leading pest control Melbourne company helping residential and commercial property owners keep spaces
                healthy and pest-free. Adam Balli founded Zap It in 2020, and since then we have delivered fast, professional
                treatments using modern tools and up-to-date products.
              </p>
              <p className="text-zapit-text leading-relaxed mb-6">
                Our team focuses on long-lasting results, clear communication, and safe application—whether you are dealing with
                termites, spiders, ants, or rodents. Book a visit and we will tailor a plan to your property.
              </p>
              <Link href="/about-us" className="inline-flex bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-6 py-3 rounded-md transition-colors">
                Discover Zap It
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pest strategy */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-10">
            Concerned About Pests? Don&apos;t Panic &amp; Follow This Strategy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: '1',
                t: "Stop! Don't Spray Anything",
                p: "Store-bought sprays can scatter pests, mask where they're nesting, and make professional treatment less effective. Leave products on the shelf and avoid disturbing nests or droppings until we can assess the situation properly.",
              },
              {
                n: '2',
                t: 'Contain The Area',
                p: "Close off the space where you've seen activity where safe to do so, keep food sealed, and reduce clutter that gives pests places to hide. This helps limit spread while you wait for a technician to arrive and map the real extent of the issue.",
              },
              {
                n: '3',
                t: 'Let Professionals Handle The Situation',
                p: 'Our licensed team identifies the species, locates entry points, and applies the right treatment for your property type. You get a clear plan, follow-up if needed, and advice to help prevent the problem from returning.',
              },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-zapit-border/90 bg-white p-6 shadow-sm">
                <p className="text-3xl font-extrabold text-zapit-green mb-2">{s.n}</p>
                <h3 className="text-lg font-bold text-zapit-dark mb-3">{s.t}</h3>
                <p className="text-sm text-zapit-text leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Licensed DHHS */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Image
                src="/images/certifications/victoria-state-govt.png"
                alt="Victoria State Government"
                width={200}
                height={80}
                className="h-14 w-auto mb-5"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark mb-4">Fully Insured &amp; Licensed By The Victorian DHHS</h2>
              <p className="text-zapit-text leading-relaxed mb-4">
                Zap It adheres to Australian health standards and follows pest control service protocols. We are licensed by the
                Department of Health and Human Services Victoria (DHHS) to deliver treatments using approved products and methods.
              </p>
              <p className="text-zapit-text leading-relaxed mb-6">
                We treat your home and workplace with care, prioritising clear communication and safe application. Licensed. Safe. Zap It.
              </p>
              <Link
                href={SITE_CONFIG.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-zapit-green hover:bg-zapit-green-dark text-white font-bold px-6 py-3 rounded-md transition-colors"
              >
                BOOK OUR SERVICE TODAY!
              </Link>
            </div>
            <div className="relative aspect-[5/4] w-full rounded-xl overflow-hidden">
              <Image
                src="/images/hero/zapit-social.webp"
                alt="Zap It team"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Our blogs */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-10">Our Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_LIST_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blogs#${post.slug}`}
                className="group border border-zapit-border/90 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-48 w-full">
                  <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-zapit-dark group-hover:text-zapit-green transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-zapit-text line-clamp-3 flex-1">{post.excerpt}</p>
                  <span className="text-zapit-green font-semibold text-sm mt-3">Read More</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Certifications */}
      <section className="py-14 lg:py-16 bg-zapit-light">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-10">Certifications &amp; Compliance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { src: '/images/certifications/aempa-v2.png', alt: 'AEMPA', label: 'AUSTRALIAN ENVIRONMENTAL PEST MANAGERS ASSOCIATION' },
              { src: '/images/certifications/guarantee-200d.png', alt: 'Unrivalled service', label: 'UNRIVALLED SERVICE AND SUPPORT' },
              { src: '/images/certifications/dhhs-cert.jpg', alt: 'HACCP', label: 'HACCP FOOD SAFETY CERTIFICATION' },
              { src: '/images/certifications/victoria-state-govt.png', alt: 'Wildlife', label: 'WILDLIFE LICENCE' },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center text-center">
                <Image src={c.src} alt={c.alt} width={80} height={80} className="h-16 w-auto object-contain mb-3" />
                <p className="text-[10px] md:text-xs font-bold text-zapit-dark uppercase leading-tight">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQs */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-10">Frequently Asked Questions</h2>
          <FAQAccordion faqs={HOMEPAGE_FAQS} />
        </div>
      </section>

      {/* 13. Pricing table */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-10">Our Prices</h2>
          <div className="overflow-x-auto rounded-xl border border-zapit-border bg-white shadow-sm -mx-2 sm:mx-0">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-zapit-dark text-white">
                  <th className="px-4 py-3 font-bold">Service name</th>
                  <th className="px-4 py-3 font-bold">Property type</th>
                  <th className="px-4 py-3 font-bold text-right">Price (AUD) ex. GST</th>
                  <th className="px-4 py-3 font-bold text-right">Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {PRICING_ROWS.map((row, i) => (
                  <tr key={`${row.service}-${row.propertyType}-${i}`} className={i % 2 === 0 ? 'bg-white' : 'bg-zapit-light/50'}>
                    <td className="px-4 py-2.5 text-zapit-dark font-medium border-t border-zapit-border/60">{row.service}</td>
                    <td className="px-4 py-2.5 text-zapit-text border-t border-zapit-border/60">{row.propertyType}</td>
                    <td className="px-4 py-2.5 text-right text-zapit-dark font-semibold border-t border-zapit-border/60">
                      {money.format(row.price)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zapit-text border-t border-zapit-border/60">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 14. CTA bar */}
      <section className="relative bg-zapit-dark text-white overflow-hidden">
        <div className="container mx-auto px-4 py-10 lg:py-14 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div className="relative flex justify-center md:justify-start">
              <div className="relative w-full max-w-sm aspect-[3/4] max-h-[320px]">
                <Image
                  src="/images/cta/pest-worker-cta.webp"
                  alt="Pest control technician"
                  fill
                  className="object-contain object-bottom"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
            </div>
            <div className="relative text-center md:text-left pb-4">
              <div className="absolute -top-4 right-0 md:right-4 md:top-0 w-24 h-24 md:w-28 md:h-28 z-10">
                <Image
                  src="/images/cta/200-guarantee.png"
                  alt="200% guarantee"
                  width={112}
                  height={112}
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide pr-20 md:pr-28 pt-2">
                WE&apos;RE NOT HAPPY UNLESS YOU&apos;RE HAPPY
              </h3>
              <p className="text-gray-200 mt-3 mb-6">Talk to us about pest control for your home or business</p>
              <div className="space-y-3">
                <Link href={SITE_CONFIG.phoneTel} className="flex items-center justify-center md:justify-start gap-2 text-lg font-semibold text-white">
                  <Phone className="h-5 w-5 text-zapit-green" />
                  {SITE_CONFIG.phoneRaw}
                </Link>
                <Link href={`mailto:${SITE_CONFIG.email}`} className="flex items-center justify-center md:justify-start gap-2 text-sm md:text-base text-gray-200 break-all">
                  <Mail className="h-5 w-5 text-zapit-green flex-shrink-0" />
                  {SITE_CONFIG.email}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
