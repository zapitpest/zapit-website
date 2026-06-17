import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, ChevronRight, Check, Shield, CheckCircle2, ArrowRight, Clock, Star } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { isServiceSlug, SERVICE_PAGES, SERVICE_SLUGS } from '@/lib/service-pages';
import { SUBURB_SLUGS, getSuburbBySlug, isSuburbSlug } from '@/lib/suburb-data';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import StatsCounter from '@/components/sections/StatsCounter';
import SuburbLandingPage from '@/components/sections/SuburbLandingPage';

type Props = { params: Promise<{ serviceSlug: string }> };

const SUBURB_DYNAMIC_SLUGS = SUBURB_SLUGS.filter((s) => s.startsWith('pest-control-'));

export function generateStaticParams() {
  return [
    ...SERVICE_SLUGS.map((serviceSlug) => ({ serviceSlug })),
    ...SUBURB_DYNAMIC_SLUGS.map((serviceSlug) => ({ serviceSlug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;

  if (isSuburbSlug(serviceSlug)) {
    const data = getSuburbBySlug(serviceSlug);
    if (!data) return {};
    const title = `Pest Control ${data.name} | ${SITE_CONFIG.name}`;
    const description = `Professional pest control in ${data.name}, Melbourne. Same-day service, licensed technicians, safe for pets & people. Call ${SITE_CONFIG.phone} for fast pest removal in ${data.name}.`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `/${serviceSlug}` },
      openGraph: { title, description, url: `${SITE_CONFIG.url}/${serviceSlug}` },
    };
  }

  if (!isServiceSlug(serviceSlug)) {
    return {};
  }
  const page = SERVICE_PAGES[serviceSlug];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${serviceSlug}`,
    },
    openGraph: {
      title: `${page.metaTitle} | ${SITE_CONFIG.name}`,
      description: page.metaDescription,
      url: `/${serviceSlug}`,
    },
  };
}

const PEST_ICON_MAP: Record<string, string> = {
  'ant-pest-control-melbourne': '/images/icons/insects/ant.svg',
  'bed-bug-control-melbourne': '/images/icons/insects/bedbug.svg',
  'bee-removal-melbourne': '/images/icons/insects/tick.svg',
  'clothes-moths-treatment-melbourne': '/images/icons/insects/mosquito.svg',
  'cockroach-control-melbourne': '/images/icons/insects/cockroach.svg',
  'flea-control-melbourne': '/images/icons/insects/bedbug.svg',
  'fly-control-melbourne': '/images/icons/insects/mosquito.svg',
  'mosquito-control-melbourne': '/images/icons/insects/mosquito.svg',
  'possum-removal-melbourne': '/images/icons/insects/mouse-rat.svg',
  'rodent-control-melbourne': '/images/icons/insects/mouse-rat.svg',
  'silverfish-control-melbourne': '/images/icons/insects/centipede.svg',
  'spider-control-melbourne': '/images/icons/insects/spider.svg',
  'termite-control-melbourne': '/images/icons/insects/termite.svg',
  'treatment-for-wood-borers-in-melbourne': '/images/icons/insects/termite.svg',
  'wasp-removal-melbourne': '/images/icons/insects/tick.svg',
};

export default async function ServicePage({ params }: Props) {
  const { serviceSlug } = await params;

  if (isSuburbSlug(serviceSlug)) {
    const data = getSuburbBySlug(serviceSlug);
    if (!data) notFound();
    return <SuburbLandingPage suburb={data.name} region={data.region} slug={serviceSlug} />;
  }

  if (!isServiceSlug(serviceSlug)) {
    notFound();
  }
  const page = SERVICE_PAGES[serviceSlug];
  const icon = PEST_ICON_MAP[serviceSlug];

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Pest Solutions', href: '/pest-solutions' },
    { name: page.h1, href: `/${serviceSlug}` },
  ];

  const jsonLd = [
    generateServiceSchema(page.title, page.metaDescription),
    generateLocalBusinessSchema('Melbourne'),
    generateBreadcrumbSchema(breadcrumbItems),
  ];

  const relatedServices = Object.values(SERVICE_PAGES)
    .filter((s) => s.slug !== serviceSlug)
    .slice(0, 4);

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#0d402e] text-white">
        <div className="absolute inset-0">
          <Image src="/images/residential/hero-house.png" alt="" fill className="object-cover object-center opacity-15" sizes="100vw" />
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

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                {icon && (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <img src={icon} alt="" className="h-8 w-8" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                )}
                <span className="rounded-full bg-[#64FF01]/15 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-[#64FF01]">Melbourne Service</span>
              </div>
              <h1 className="mb-4 max-w-xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{page.h1}</h1>
              <p className="max-w-xl text-[16px] leading-relaxed text-white/80">{page.metaDescription}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={SITE_CONFIG.phoneTel} className="inline-flex items-center gap-2 rounded-full bg-[#64FF01] px-6 py-3.5 text-[15px] font-bold text-[#0d402e] transition-transform hover:scale-105">
                  <Phone className="h-4 w-4" />Call {SITE_CONFIG.phone}
                </a>
              </div>
            </div>

            {/* Quick info card */}
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:w-[340px]">
              <h3 className="mb-4 text-lg font-bold text-[#64FF01]">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[14px]">
                  <Clock className="h-5 w-5 shrink-0 text-[#64FF01]" />
                  <span className="text-white/80">Same-day response available</span>
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <Shield className="h-5 w-5 shrink-0 text-[#64FF01]" />
                  <span className="text-white/80">licensed technicians</span>
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <Star className="h-5 w-5 shrink-0 text-[#64FF01]" />
                  <span className="text-white/80">Highly rated on Google</span>
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#64FF01]" />
                  <span className="text-white/80">Family-friendly treatments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-b border-[#e5e5e5] bg-[#f8f5f2] py-3.5">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 text-[13px] font-semibold text-[#0d402e]">
          {['Accredited', 'Fully Insured', 'Licensed', 'Family Friendly', 'Same-Day'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#3fa535]" strokeWidth={2.5} />{t}
            </span>
          ))}
        </div>
      </section>

      {/* ===== CONTENT + FEATURES ===== */}
      <section className="bg-white py-14 md:py-18 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
            {/* Main content */}
            <div className="lg:col-span-3">
              <h2 className="mb-6 text-2xl font-bold text-[#131a1c] md:text-3xl">About {page.title.replace(' Melbourne', '')}</h2>
              <div className="mb-8 space-y-4 text-[16px] leading-[1.8] text-[#414042]">
                {page.content.split('\n\n').map((para, i) => {
                  // Bold marker at start (e.g. "**German cockroaches**") becomes a sub-heading
                  const headingMatch = para.match(/^\*\*(.+?)\*\*$/);
                  if (headingMatch) {
                    return (
                      <h3 key={i} className="mt-2 text-[18px] font-bold text-[#131a1c] md:text-[20px]">
                        {headingMatch[1]}
                      </h3>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>

              <div className="overflow-hidden rounded-2xl">
                <Image src="/images/residential/melbourne-fleet.png" alt={`Zapit ${page.title} service`} width={700} height={400} className="h-auto w-full" />
              </div>
            </div>

            {/* Features sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2] p-6">
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

                <div className="mt-6 rounded-xl bg-[#0d402e] p-5 text-center">
                  <p className="mb-3 text-[14px] font-bold text-white">Need urgent help?</p>
                  <a href={SITE_CONFIG.phoneTel} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#64FF01] px-5 py-3 text-[14px] font-bold text-[#0d402e]">
                    <Phone className="h-4 w-4" />Call {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS STEPS ===== */}
      <section className="bg-[#0d402e] py-14 text-white lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block rounded-full bg-[#64FF01]/15 px-4 py-1 text-[12px] font-bold uppercase tracking-wider text-[#64FF01]">Our Process</span>
            <h2 className="text-2xl font-bold md:text-3xl">How We Handle {page.title.replace(' Melbourne', '')}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { step: '1', title: 'Inspect & Identify', desc: `We conduct a thorough inspection of your property, identify the ${page.title.replace(' Melbourne', '').toLowerCase()} species and map out activity hotspots.` },
              { step: '2', title: 'Treat & Eliminate', desc: 'Using approved treatments, we target the infestation at its source—not just the visible signs.' },
              { step: '3', title: 'Protect & Prevent', desc: 'Follow-up inspections and prevention strategies ensure pests don\'t return. We provide clear aftercare guidance.' },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#64FF01] text-lg font-black text-[#0d402e]">{item.step}</div>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-[#131a1c] py-14 text-white lg:py-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">Why Choose {SITE_CONFIG.shortName}?</h2>
          <p className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-[15px] text-gray-300">
            Melbourne&apos;s licensed pest team with fast response, transparent communication, and treatments built around your property.
          </p>
          <StatsCounter />
        </div>
      </section>

      {/* ===== IMAGE BREAK — capped on desktop so baked-in green overlay isn't cropped/stretched ===== */}
      <section className="bg-[#0d402e] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[560px] lg:px-6">
          <Image src="/images/residential/townhouse.png" alt="We treat your home as if it were ours" width={650} height={702} className="h-auto w-full overflow-hidden rounded-3xl shadow-xl" sizes="(min-width: 1024px) 560px, 100vw" />
        </div>
      </section>

      {/* ===== RELATED SERVICES ===== */}
      <section className="bg-[#f8f5f2] py-14 lg:py-18">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#131a1c] md:text-3xl">Other Pest Solutions</h2>
            <p className="mt-2 text-[15px] text-[#636363]">We handle a wide range of pests across Melbourne</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {relatedServices.map((s) => {
              const sIcon = PEST_ICON_MAP[s.slug];
              return (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="group flex flex-col items-center rounded-2xl border border-[#e5e5e5] bg-white p-5 text-center transition-all hover:-translate-y-1 hover:border-[#3fa535] hover:shadow-md"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d402e]/5">
                    {sIcon ? (
                      <img src={sIcon} alt="" className="h-6 w-6" style={{ filter: 'invert(30%) sepia(80%) saturate(500%) hue-rotate(80deg) brightness(90%)' }} />
                    ) : (
                      <Shield className="h-6 w-6 text-[#3fa535]" />
                    )}
                  </div>
                  <span className="text-[13px] font-bold text-[#131a1c] transition-colors group-hover:text-[#3fa535]">{s.title.replace(' Melbourne', '')}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href="/pest-solutions" className="inline-flex items-center gap-2 text-[15px] font-bold text-[#3fa535] transition-colors hover:text-[#0d402e]">
              View All Pest Solutions <ArrowRight className="h-4 w-4" />
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
