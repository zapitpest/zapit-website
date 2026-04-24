import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema';

const HERO_IMAGE =
  '/images/wp-assets/2025-06-Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp';

const TRUST_BADGES = [
  'Child safe',
  'Pet safe',
  'Eco friendly',
  'Gov accredited',
  'Insured',
  'DHHS Licensed',
  'Online compliance certificates',
] as const;

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Zap It Pest & Termite Control Melbourne: built on trust, with an uncompromising commitment to customer satisfaction, professional standards, and safe pest protection across Melbourne.',
  alternates: { canonical: '/about-us' },
  openGraph: {
    url: '/about-us',
    title: 'About Us',
    description:
      'Learn about Zap It — Melbourne pest control built on trust, child- and pet-safe methods, and trade-qualified professionals.',
  },
};

export default function AboutUsPage() {
  const jsonLd = [
    generateBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about-us' },
    ]),
    generateLocalBusinessSchema('Melbourne'),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="font-sans text-white">
        {/* Hero + in-page bar (Figma: logo + phone on dark) */}
        <header className="bg-zapit-dark">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link href="/" className="shrink-0" aria-label="Zap It home">
              <Image
                src={SITE_CONFIG.logoWhite}
                alt="Zap It Pest & Termite Control"
                width={120}
                height={58}
                className="h-10 w-auto sm:h-11"
                priority
              />
            </Link>
            <a
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white transition-colors hover:text-[#3fa535] sm:text-base"
            >
              <Phone className="h-4 w-4 text-[#3fa535] sm:h-5 sm:w-5" aria-hidden />
              {SITE_CONFIG.phone}
            </a>
          </div>
        </header>

        <section className="bg-zapit-dark px-4 pb-10 pt-2 sm:px-6 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm text-white/85 sm:text-base">{SITE_CONFIG.tagline}</p>
            <h1 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">About us</h1>
            <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
              Built on trust, with an uncompromising commitment to customer satisfaction and professional standards.
            </p>
          </div>
        </section>

        {/* Trust badges */}
        <section className="bg-zapit-dark px-4 pb-10 sm:px-6 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl bg-[#3fa535] px-4 py-5 sm:px-6 sm:py-6">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5">
                {TRUST_BADGES.map((label) => (
                  <li key={label} className="flex items-start gap-3 text-sm font-medium text-white sm:text-base">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Committed + CTA */}
        <section className="bg-zapit-dark px-4 pb-10 sm:px-6 sm:pb-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">
                Committed to protecting what&apos;s important to you
              </h2>
              <a
                href={SITE_CONFIG.phoneTel}
                className="inline-flex w-full max-w-min shrink-0 items-center justify-center gap-2 rounded-full bg-[#3fa535] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-zapit-green-dark sm:w-auto"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call Now
              </a>
            </div>

            <div className="max-w-none space-y-4 text-base leading-relaxed text-white/90 sm:text-lg">
              <p>
                Your health and safety are at the heart of everything we do, supported by industry-leading pest protection
                technology and customer care.
              </p>
              <p>
                We understand that every home and business is different — a compact apartment, a growing family, a
                high-traffic workplace — and that each comes with its own set of concerns. We take the time to listen, assess
                what matters to you, and apply treatments that are appropriate for the people, pets, and environment involved.
              </p>
              <p>
                We work alongside families, pet owners, and business operators every day, and we treat every property with
                the same care and respect we would want for our own. That means clear communication, careful application,
                and follow-up you can count on.
              </p>
              <p>
                Our relationship with you does not end when the first service is done. We help you stay protected with
                practical advice, scheduled visits where needed, and a team you can call when something changes.{' '}
                <span className="text-white">We&apos;re here for you, now and into the future.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Image: pest control in action */}
        <section className="bg-zapit-dark">
          <div className="relative w-full max-w-6xl mx-auto px-0 sm:px-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden sm:rounded-2xl sm:aspect-[16/9] max-sm:min-h-[220px]">
              <Image
                src={HERO_IMAGE}
                alt="Zap It technician providing professional pest treatment at a Melbourne home"
                fill
                className="object-cover"
                sizes="(max-width: 1152px) 100vw, 1152px"
                priority
              />
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-left text-sm text-white/95 sm:px-6 sm:py-4 sm:text-base">
                Founder, Adam Balli
              </p>
            </div>
          </div>
        </section>

        {/* Our story */}
        <section className="bg-zapit-dark px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Our story</h2>
            <div className="space-y-4 text-base leading-relaxed text-white/90 sm:text-lg">
              <p>
                Zap It was founded in 2020 by Adam Balli, starting out with a single van and a clear focus on doing right by
                customers across Melbourne. From those early days in the northern suburbs, the business has grown to a team
                of 30+ trade-qualified professionals serving homes and businesses across the wider metropolitan area and
                beyond.
              </p>
              <p>
                Adam built the company on personal accountability: turning up when promised, explaining options honestly,
                and only recommending what the situation truly needs. That approach still guides how we train our technicians
                and how we work with you on site.
              </p>
              <p>
                Within a short time, our reputation for dependable service and five-star support saw demand grow well beyond
                our first routes. We now employ licensed pest managers with real trade experience, and we invest in the tools
                and methods needed to protect Melbourne properties — from pre-purchase termite work to after-hours
                call-outs.
              </p>
              <p>
                Our story is still being written: every new suburb we serve, and every returning customer, reinforces our
                belief that long-term success comes from trust — not from quick fixes.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Insured, licensed, accredited — light section */}
      <section className="bg-zapit-light px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-5 text-2xl font-bold text-zapit-text sm:mb-6 sm:text-3xl">
            Insured, licensed, accredited and legally compliant
          </h2>
          <div className="mb-6 space-y-4 text-zapit-text leading-relaxed sm:text-base">
            <p>
              {SITE_CONFIG.name} carries appropriate insurance and operates under the licensing and record-keeping
              expectations that apply to professional pest management in Victoria. We maintain memberships and training
              that reflect national best practice, so you can be confident the work on your property is done safely and
              lawfully.
            </p>
            <p>
              We hold relevant wildlife and general pest authorisations where required, use approved products in line with
              label directions, and document treatments so you have a clear record for your home, tenancy, or food-safety
              program.
            </p>
          </div>

          <ul className="mb-8 list-none space-y-2 text-sm text-zapit-text sm:text-base">
            <li>
              <strong className="text-zapit-dark">Australian Environmental Pest Managers Association (AEMPA / AEPMA)</strong>
              — aligned with industry environmental and best-practice standards.
            </li>
            <li>
              <strong className="text-zapit-dark">HACCP food safety &amp; commercial hygiene</strong> — we support businesses
              that need verifiable, audit-friendly pest control documentation.
            </li>
            <li>
              <strong className="text-zapit-dark">Victorian Government wildlife compliance</strong> — where possums and
              protected species are involved, we work within licensed wildlife frameworks.
            </li>
            <li>
              <strong className="text-zapit-dark">DHHS licensing &amp; public health expectations</strong> — our treatments
              are delivered in line with Victorian public health and pest-management licensing requirements.
            </li>
            <li>
              <strong className="text-zapit-dark">General liability &amp; online compliance records</strong> — certificates
              and treatment notes can be provided to landlords, site managers, and auditors on request.
            </li>
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-zapit-border pt-8 sm:gap-10 sm:pt-10">
            <Image
              src="/images/certifications/aempa.png"
              alt="Australian Environmental Pest Managers Association"
              width={120}
              height={80}
              className="h-14 w-auto object-contain sm:h-16"
            />
            <Image
              src="/images/wp-assets/2024-07-aempa-v2-1-1-e1745687916424.png"
              alt="Australian environmental pest management certification mark"
              width={140}
              height={80}
              className="h-14 w-auto object-contain sm:h-16"
            />
            <Image
              src="/images/certifications/victoria-state-govt.png"
              alt="Victoria state government and wildlife licensing"
              width={100}
              height={80}
              className="h-14 w-auto object-contain sm:h-16"
            />
            <Image
              src="/images/certifications/dhhs-cert.jpg"
              alt="DHHS licensed pest control"
              width={100}
              height={80}
              className="h-14 w-auto rounded object-contain sm:h-16"
            />
            <Image
              src="/images/certifications/200-colour.png"
              alt="200 day guarantee and quality commitment"
              width={100}
              height={80}
              className="h-14 w-auto object-contain sm:h-16"
            />
          </div>
        </div>
      </section>

      {/* Pre-footer CTA (green button; site global Footer follows) */}
      <section className="bg-zapit-dark px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm text-white/80">Questions? We&apos;re here to help — day or night.</p>
          <p className="mb-6 text-lg font-semibold text-white sm:text-xl">{SITE_CONFIG.operatingHours}</p>
          <a
            href={SITE_CONFIG.phoneTel}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3fa535] px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-zapit-green-dark"
          >
            <Phone className="h-5 w-5" aria-hidden />
            Call Now
          </a>
        </div>
      </section>
    </>
  );
}
