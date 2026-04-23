import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, HOMEPAGE_FAQS } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateProductSchema, generateFAQSchema } from '@/lib/schema';
import { Phone, Shield, Star, Zap, ChevronRight, Mail } from 'lucide-react';
import FAQAccordion from '@/components/sections/FAQAccordion';
import StatsCounter from '@/components/sections/StatsCounter';
import PriceCalculatorPreview from '@/components/sections/PriceCalculatorPreview';
import { BLOG_LIST_POSTS } from '@/lib/blog-list';

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

const PEST_SERVICES = [
  {
    title: 'Bed Bug Pest Control Melbourne',
    description: "Bed bugs can turn a peaceful night's sleep into a nightmare. Don't let itchy welts and restless nights take a toll on your health. Our professional bed bug control services guarantee 100% elimination.",
    href: '/bed-bug-control-melbourne',
  },
  {
    title: 'Possum Control Melbourne',
    description: 'Possums may look harmless, but when they invade your roof or ceiling, they can cause serious damage and sleepless nights. Their constant scratching, droppings, and chewing on electrical wires can lead to costly repairs.',
    href: '/possum-removal-melbourne',
  },
  {
    title: 'Ant Control',
    description: "Did you know that the ant you spotted in your kitchen is not the only one? There's a chain of ants marching behind, forming a superhighway through your kitchen. Don't let these small insects ruin your food or peace.",
    href: '/ant-pest-control-melbourne',
  },
  {
    title: 'Bird Control',
    description: "Who likes bird droppings when they're actually destroying your property? It's acidic and can damage roofs, doors, windows, and outdoor furniture. Protect your property with our professional bird control.",
    href: '/birds-control-melbourne',
  },
  {
    title: 'Flea and Tick Solutions',
    description: "Fleas and ticks pose a serious threat to the health of your pets and family, as they can cause significant health issues. Protect your home from the inside out with our pet-safe solution.",
    href: '/flea-control-melbourne',
  },
  {
    title: 'Flying Insect Controls',
    description: 'The most dangerous thing about flying insects like flies and mosquitoes is their ability to move from garbage to your food, putting your health at risk. Mosquitoes can cause dangerous diseases.',
    href: '/fly-control-melbourne',
  },
];

const INDUSTRY_SOLUTIONS = [
  { title: 'Property Pest Control', href: '/commercial-pest-control' },
  { title: 'Warehousing and Storage', href: '/commercial-pest-control#warehousing' },
  { title: 'Restaurants Pest Control', href: '/commercial-pest-control#restaurants' },
  { title: 'Supermarkets Pest Control', href: '/commercial-pest-control#supermarkets' },
  { title: 'Function Venues', href: '/commercial-pest-control#venues' },
  { title: 'Brewhouses and Distilleries', href: '/commercial-pest-control#brewhouses' },
  { title: 'Recreational Facilities', href: '/commercial-pest-control#recreational' },
  { title: 'Government Buildings', href: '/commercial-pest-control#government' },
];

const BENEFIT_CARDS = [
  { icon: 'residential', title: 'Residential Property Owners', href: '/residential' },
  { icon: 'commercial', title: 'Commercial Business Owners', href: '/commercial-pest-control' },
  { icon: 'termite', title: 'Termite Risk Structures', href: '/termite-control-melbourne' },
];

export default function HomePage() {
  const faqSchema = generateFAQSchema(
    HOMEPAGE_FAQS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const productSchema = generateProductSchema();

  const schemas = [productSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero/pest-treatment-melbourne.webp')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              ZAP IT PEST &amp; TERMITE CONTROL MELBOURNE
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Quick and professional, 5-star pest control Melbourne services in Melbourne.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={SITE_CONFIG.phoneTel}
                className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
              >
                <Phone className="h-5 w-5" />
                CALL NOW!
              </Link>
              <Link
                href={SITE_CONFIG.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors border border-white/20"
              >
                Book Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Banner */}
      <section id="reviews" className="bg-zapit-green text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-300 text-yellow-300" />
              ))}
            </div>
            <h2 className="text-lg font-bold">
              How Customers Rate Zap It Pest &amp; Termite Control Services
            </h2>
          </div>
          <p className="text-sm mt-1 opacity-90">{SITE_CONFIG.rating.count}+ verified 5-star Google reviews</p>
        </div>
      </section>

      {/* Who Can Benefit */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-12">
            Who Can Benefit From Our Pest Control Melbourne Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {BENEFIT_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex flex-col items-center text-center p-8 rounded-2xl border border-zapit-border hover:border-zapit-green hover:shadow-lg transition-all"
              >
                <div className="h-16 w-16 rounded-full bg-zapit-green/10 flex items-center justify-center mb-4 group-hover:bg-zapit-green/20 transition-colors">
                  <Image
                    src={`/images/icons/${card.icon === 'residential' ? 'residential' : card.icon === 'commercial' ? 'business' : 'termite-risk'}.webp`}
                    alt={card.title}
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="font-bold text-zapit-dark group-hover:text-zapit-green transition-colors">
                  {card.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pest Control Services */}
      <section className="py-16 lg:py-20 bg-zapit-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-4">
            Melbourne&apos;s Best One-In-All Pest Control Services
          </h2>
          <p className="text-center text-zapit-text mb-12 max-w-2xl mx-auto">
            From residential homes to commercial spaces, we handle every pest problem with professional solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PEST_SERVICES.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-zapit-border"
              >
                <h3 className="text-lg font-bold text-zapit-dark mb-3">{service.title}</h3>
                <p className="text-sm text-zapit-text leading-relaxed mb-4">{service.description}</p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-zapit-green hover:text-zapit-green-dark transition-colors"
                >
                  Learn More <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/pest-solutions"
              className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-12">
            Tailored Pest Control Melbourne Solutions For Every Industry
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {INDUSTRY_SOLUTIONS.map((industry) => (
              <Link
                key={industry.title}
                href={industry.href}
                className="group p-6 rounded-xl bg-zapit-light hover:bg-zapit-green text-center transition-all"
              >
                <h4 className="text-sm font-semibold text-zapit-dark group-hover:text-white transition-colors">
                  {industry.title}
                </h4>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/commercial-pest-control"
              className="inline-flex items-center gap-2 border-2 border-zapit-green text-zapit-green hover:bg-zapit-green hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Find Your Industry
            </Link>
          </div>
        </div>
      </section>

      {/* Melbourne Coverage + Stats */}
      <section className="py-16 lg:py-20 bg-zapit-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            All Over Melbourne Pest Control Coverage
          </h2>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h3 className="text-xl font-semibold text-zapit-green mb-3">
              Why Choose Zap It Pest &amp; Termite Control Melbourne Services?
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Melbourne&apos;s most experienced pest control experts with licenses and certifications are available
              to provide emergency pest control services across Melbourne within hours of the call.
            </p>
          </div>
          <StatsCounter />
        </div>
      </section>

      {/* CBD Specialists */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-zapit-dark mb-4">
                CBD &amp; Inner City Melbourne - Pest Specialists
              </h3>
              <p className="text-zapit-text leading-relaxed mb-6">
                It doesn&apos;t matter if you are living in a high-rise or a suburb; cockroaches and other pests
                know the best way to your space. That&apos;s why you need our effective and affordable pest
                control solutions in Melbourne.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={SITE_CONFIG.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Get a Free Quote Now
                </Link>
                <Link
                  href="/service-areas"
                  className="inline-flex items-center gap-2 border-2 border-zapit-green text-zapit-green hover:bg-zapit-green hover:text-white font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  Explore Service Areas
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero/about-pest-control.png"
                alt="Pest control professional in Melbourne"
                width={500}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pest Strategy Section */}
      <section className="py-16 lg:py-20 bg-zapit-green/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-12">
            Concerned About Pests? Don&apos;t Panic &amp; Follow This Strategy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: "Stop! Don't Spray Anything", icon: Shield },
              { step: '02', title: 'Contain The Area', icon: Zap },
              { step: '03', title: 'Let Professionals Handle The Situation', icon: Phone },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="h-16 w-16 rounded-full bg-zapit-green text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-zapit-dark text-lg">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Founding Story */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark mb-4">
                {SITE_CONFIG.name} - Licensed &amp; Quick Controllers
              </h2>
              <p className="text-zapit-text leading-relaxed mb-4">
                Zap It is the leading pest control Melbourne company, helping residential and commercial
                property owners maintain a pest-free, healthy environment. Adam Balli founded Zap It in
                2020, and since that day, we have been providing fast, chemical-free pest control solutions
                using modern tools and advanced technology.
              </p>
              <p className="text-zapit-text leading-relaxed mb-6">
                Our effective, eco-friendly, and long-lasting pest removal results have made us the leading
                pest controllers in Melbourne. We&apos;re ready to protect your environment and provide a
                pest-free home or commercial space. Book our same-day service and receive personalised care
                and solutions for termites, spiders, ants, rodents, mosquitoes, and more.
              </p>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Discover Zap It
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/images/hero/zapit-social.webp"
                alt="Zap It Pest Control team"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Licensed Section */}
      <section className="py-16 lg:py-20 bg-zapit-green/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark mb-4">
                Fully Insured &amp; Licensed By The Victorian DHHS
              </h2>
              <p className="text-zapit-text leading-relaxed mb-4">
                Zap It adheres to Australian health standards and complies with pest control service
                protocols. As a top-rated pest control Melbourne service, we are licensed by the Department
                of Health and Human Services Victoria (DHHS) to provide quality services using authorised
                pest control products.
              </p>
              <p className="text-zapit-text leading-relaxed mb-6">
                We treat your home and workplace as our own, using high-quality, eco-friendly products to
                deliver long-lasting solutions. Choose Licensed. Choose Safe. Choose Zap It.
              </p>
              <Link
                href={SITE_CONFIG.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                BOOK OUR SERVICE TODAY!
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <Image src="/images/certifications/aempa.png" alt="AEMPA Certified" width={80} height={80} className="h-16 w-auto" />
              <Image src="/images/certifications/guarantee.png" alt="200 Day Guarantee" width={80} height={80} className="h-16 w-auto" />
              <Image src="/images/certifications/200-colour.png" alt="200 Day Guarantee Color" width={80} height={80} className="h-16 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-zapit-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-8">
            Certifications &amp; Compliance
          </h2>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <Image src="/images/certifications/aempa.png" alt="AEMPA Member" width={100} height={100} className="h-20 w-auto" />
            <Image src="/images/certifications/dhhs-cert.jpg" alt="DHHS Licensed" width={100} height={100} className="h-20 w-auto rounded" />
            <Image src="/images/certifications/aempa-v2.png" alt="AEMPA Certification" width={100} height={100} className="h-20 w-auto" />
          </div>
        </div>
      </section>

      {/* Our Blogs */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-12">
            Our Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {BLOG_LIST_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blogs#${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-zapit-border"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-zapit-dark mb-2 group-hover:text-zapit-green transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-zapit-text line-clamp-2">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-zapit-green mt-3">
                    Read More <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-20 bg-zapit-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={HOMEPAGE_FAQS} />
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 lg:py-20 bg-zapit-light">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-zapit-dark mb-12">
            Our Prices
          </h2>
          <PriceCalculatorPreview />
        </div>
      </section>

      {/* Green CTA Bar */}
      <section className="py-12 bg-zapit-green text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src="/images/certifications/guarantee.png"
              alt="200% Guarantee"
              width={60}
              height={60}
              className="h-14 w-auto brightness-0 invert"
            />
            <h2 className="text-2xl md:text-3xl font-bold">
              WE&apos;RE NOT HAPPY UNLESS YOU&apos;RE HAPPY
            </h2>
          </div>
          <p className="text-lg mb-6 opacity-90">
            Talk to us about pest control for your home or business
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-2 bg-white text-zapit-green font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {SITE_CONFIG.phoneRaw}
            </Link>
            <Link
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full text-lg transition-colors"
            >
              <Mail className="h-5 w-5" />
              {SITE_CONFIG.email}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
