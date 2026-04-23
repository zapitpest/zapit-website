import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { Phone, MapPin, Users, Award, Leaf, Shield, Star } from 'lucide-react';
import StatsCounter from '@/components/sections/StatsCounter';

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'About Us - Zap It Pest Control Melbourne' },
    description:
      'We offer expert pest control services. We deal in all types of pest solutions like termite inspections, wasp, rodents, possums, and more across Melbourne.',
    alternates: { canonical: '/about-us' },
    openGraph: { url: '/about-us' },
  };
}

const TEAM = [
  {
    title: 'Field technicians',
    description:
      'Fully licensed, insured, and experienced technicians carry out every treatment to Victorian DHHS standards with safe, effective methods.',
  },
  {
    title: 'Pest & termite specialists',
    description:
      'From termite inspections to complex multi-pest issues, our specialists design treatments that target the source—not just the symptoms.',
  },
  {
    title: 'Support & scheduling',
    description:
      'Our team answers your calls around the clock and helps you book the right service for your home or business.',
  },
];

export default function AboutUsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="relative bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero/pest-treatment-melbourne.webp')] bg-cover bg-center opacity-15" />
        <div className="relative container mx-auto px-4 py-12 lg:py-20">
          <p className="text-sm text-gray-300 mb-2">
            <Link href="/" className="hover:text-zapit-green transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">About Us</span>
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-4xl">
            About Zap It Pest &amp; Termite Control Melbourne
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
            {SITE_CONFIG.name} is the leading pest control Melbourne company, helping residential and
            commercial property owners maintain a pest-free, healthy environment.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-zapit-dark mb-4">Our story</h2>
          <p className="text-zapit-text leading-relaxed mb-4">
            Adam Balli founded <strong className="text-zapit-dark">Zap It</strong> in 2020, building a
            team focused on fast response, honest advice, and treatments that work the first time. Today
            we are among Melbourne&apos;s most trusted names for both emergency call-outs and
            long-term protection against termites, rodents, wasps, possums, and general pests.
          </p>
          <p className="text-zapit-text leading-relaxed">
            Whether you need a one-off treatment or a tailored plan for your business, we take the
            time to understand your property, explain your options, and deliver eco-conscious solutions
            that keep your family, pets, and customers safe.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-zapit-light">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark mb-4">
            Why property owners choose Zap It
          </h2>
          <p className="text-zapit-text leading-relaxed">
            {SITE_CONFIG.name} is the leading pest control Melbourne company, helping residential and
            commercial property owners maintain a pest-free, healthy environment.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-zapit-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Our track record</h2>
          <StatsCounter />
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark text-center mb-10">
            Certifications &amp; approach
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="rounded-2xl border border-zapit-border p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-zapit-green/10 text-zapit-green flex items-center justify-center mx-auto mb-3">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-zapit-dark mb-2">AEMPA</h3>
              <p className="text-sm text-zapit-text">
                Member of the Australian Environmental Pest Managers Association, aligned with
                industry best practice.
              </p>
            </div>
            <div className="rounded-2xl border border-zapit-border p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-zapit-green/10 text-zapit-green flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-zapit-dark mb-2">DHHS licensed</h3>
              <p className="text-sm text-zapit-text">
                Work performed under the licensing and safety expectations set by the Victorian
                Department of Health and Human Services.
              </p>
            </div>
            <div className="rounded-2xl border border-zapit-border p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-zapit-green/10 text-zapit-green flex items-center justify-center mx-auto mb-3">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-zapit-dark mb-2">Eco-friendly options</h3>
              <p className="text-sm text-zapit-text">
                We prioritise targeted, lower-impact treatments and clear communication so you know
                what is used on your property.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Image
              src="/images/certifications/aempa.png"
              alt="AEMPA"
              width={100}
              height={100}
              className="h-20 w-auto"
            />
            <Image
              src="/images/certifications/dhhs-cert.jpg"
              alt="DHHS licensed"
              width={100}
              height={100}
              className="h-20 w-auto rounded"
            />
            <Image
              src="/images/certifications/aempa-v2.png"
              alt="AEMPA certification"
              width={100}
              height={100}
              className="h-20 w-auto"
            />
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-zapit-light">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark text-center mb-10">
            Meet the team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-zapit-border"
              >
                <div className="h-12 w-12 rounded-full bg-zapit-green text-white flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zapit-dark mb-2">{member.title}</h3>
                <p className="text-sm text-zapit-text leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-zapit-dark mb-4">Service areas</h2>
          <p className="text-zapit-text leading-relaxed mb-6">
            We service homes and businesses across greater Melbourne and surrounding suburbs—CBD,
            inner city, the northern, eastern, western, and south-eastern corridors, and many
            regional townships. From single-storey houses to high-rises and warehouses, we have the
            coverage and experience to get there fast.
          </p>
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            <MapPin className="h-4 w-4" />
            View all service areas
          </Link>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-zapit-green text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-300 text-yellow-300" />
            ))}
          </div>
          <p className="text-sm opacity-90 mb-2">{SITE_CONFIG.rating.value} stars · {SITE_CONFIG.rating.count}+ Google reviews</p>
          <h2 className="text-2xl font-bold mb-4">Need pest help today?</h2>
          <p className="text-white/90 mb-6">
            {SITE_CONFIG.operatingHours}. Fast response, licensed technicians, and clear pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center justify-center gap-2 bg-zapit-dark hover:bg-zapit-dark/90 text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              <Phone className="h-5 w-5" />
              {SITE_CONFIG.phone}
            </a>
            <Link
              href={SITE_CONFIG.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-zapit-dark font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Book online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
