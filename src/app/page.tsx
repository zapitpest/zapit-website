import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Star } from 'lucide-react';
import { SITE_CONFIG, HOMEPAGE_FAQS } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateProductSchema, generateFAQSchema } from '@/lib/schema';
import {
  HomepageFAQ,
  HomepageMelbourneCoverage,
  HomepagePestServiceTabs,
  HomepageReviews,
} from '@/components/sections/HomepageReviewsAndPestTabs';
import PriceCalculator from '@/components/sections/PriceCalculator';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';

const HERO_BG =
  'https://zapitpestmelbourne.com.au/wp-content/uploads/2025/09/imgi_73_WhatsApp-Image-2025-09-17-at-3.05.27-PM.jpg';

const WP = '/images/wp-assets';

const TRUST_ITEMS = [
  'Child safe',
  'Pet safe',
  'Eco friendly',
  'Accredited',
  'Insured',
  'DHHS Licensed',
  'Online compliance certificates',
] as const;

const BLOG_CARDS = [
  {
    href: '/blogs#how-to-prepare-your-home-for-a-pest-control-visit',
    image: `${WP}/2026-01-How-to-Prepare-Your-Home-for-a-Pest-Control-Visit-img-300x200.jpg`,
    title: 'How to Prepare Your Home for a Pest Control Visit?',
    excerpt: 'Preparing your home before a pest control visit improves treatment effectiveness and helps ensure your family stays safe throughout the process.',
  },
  {
    href: '/blogs#what-happens-during-a-professional-pest-inspection',
    image: `${WP}/2026-01-What-Happens-During-a-Professional-Pest-Inspection-img-300x200.jpg`,
    title: 'What Happens During a Professional Pest Inspection?',
    excerpt: 'A professional pest inspection is a detailed process that helps identify existing infestations, risk areas, and the right treatment path.',
  },
  {
    href: '/blogs#pest-control-checklist-for-new-homeowners-in-melbourne',
    image: `${WP}/2025-12-Pest-Control-300x168.jpg`,
    title: 'Pest Control Checklist for New Homeowners in Melbourne',
    excerpt: 'Moving into a new home is an exciting milestone — here is everything you need to know about protecting it from pests from day one.',
  },
] as const;

const STRATEGY_STEPS = [
  {
    n: 1,
    title: 'Inspect & Diagnose',
    body: 'Once you have pointed out the presence of spiders, fleas, wasps, etc. in your house, give us a call, and our professional pest controllers will start the removal process by first inspecting the entry points and infestation levels. We will complete the inspection and diagnose the damage done for further treatment.',
  },
  {
    n: 2,
    title: 'Treat & Eliminate',
    body: "Now, it is time to contain the damaged areas or sources giving a way out to pests in your apartment or villa. Without wasting a minute anymore, and following a treatment plan, our skilled, licensed, and insured team will start using DHHS approved and health-friendly pest control solutions to exterminate all insects.",
  },
  {
    n: 3,
    title: 'Prevent & Monitor',
    body: "Once the elimination is done, we'll not just pack up and run to the next customer. Instead, we'll make sure to seal the entry points to stop future infiltrations. Also, educate you about home maintenance tips to stop giving an invitation to pests, set follow-up visits, and ensure long-term peace.",
  },
] as const;

const PROPERTY_TYPES = [
  {
    id: 'apartments',
    label: 'Apartments',
    sub: 'Pest-Free Living Guaranteed',
    detail:
      'Chances of pests like ants, flies, spiders, etc. spreading are high in multi-unit spaces. These insects have more opportunities to reach up and down through leaky sewage pipes, backyard scrap items. Upon spotting droppings, night-time scratching, and tiny insect trails between walls, Book an inspection and keep your family safe.',
    img: `${WP}/2025-06-icons8-residential-64.webp`,
  },
  {
    id: 'farmhouses',
    label: 'Farmhouses',
    sub: 'Healthy Pest Control Guaranteed',
    detail:
      'Farmhouses with open fields and storage areas are prime targets for rodents, wasps, and termites. Our licensed technicians deliver thorough inspections and DHHS-approved treatments that protect both your living space and your crops or livestock.',
    img: `${WP}/2025-06-icons8-business-building-64.webp`,
  },
  {
    id: 'bungalows',
    label: 'Bungalows',
    sub: 'DHHS Approved Treatment Guaranteed',
    detail:
      "Bungalows, with their single-level layout and direct ground contact, are especially vulnerable to termites, ants, and rodents entering through subfloors and wall cavities. Don't let these pests go unnoticed — our same-day inspections and targeted treatments keep your bungalow safe and pest-free.",
    img: `${WP}/2025-06-icons8-animal-64-1.webp`,
  },
] as const;

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

      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-[min(100vh,640px)] flex-col justify-end overflow-hidden pb-10 pt-[120px] text-white sm:min-h-[520px] sm:pb-12 sm:pt-[130px]">
        <Image src={HERO_BG} alt="" fill priority className="object-cover object-center -z-20" sizes="100vw" />
        <div className="absolute inset-0 bg-[#0d402e]/70 -z-10" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6">
          <h1
            className="max-w-3xl text-[28px] font-extrabold leading-[1.15] sm:text-[36px] md:text-[44px]"
            style={{ textWrap: 'balance' } as CSSProperties}
          >
            <span className="inline bg-[#3fa535] [box-decoration-break:clone] px-2 text-white">
              Zap It — Melbourne&apos;s Best Home Pest Control Services
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-[14px] leading-[1.6] text-white/90 sm:text-[15px]">
            DHHS approved home pest control solutions for same-day removal of ants, wasps, termites, rodents &amp; more.
            Guaranteed pest elimination for residential properties. Protect your home today!
          </p>

          {/* Trust checkmarks */}
          <ul className="mt-5 space-y-2">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white sm:text-[15px]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3fa535]" aria-hidden>
                  <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M10.3 2.3a1 1 0 00-1.4 0L4.5 6.7 3.1 5.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l5-5a1 1 0 000-1.4z" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Google rating */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
            <div className="flex gap-0.5">
              {[0,1,2,3,4].map((s) => (
                <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white">{SITE_CONFIG.rating.count}+ 5-Star Google Reviews</span>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={SITE_CONFIG.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#3fa535] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-[#0d402e] sm:text-base"
            >
              Book an Inspection Now
            </a>
            <a
              href="/residential"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-black/60 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80 sm:text-base"
            >
              Residential Services
            </a>
          </div>
        </div>
      </section>

      {/* ===================== DOMESTIC PEST CONTROLLERS ===================== */}
      <ScrollReveal direction="up">
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <h2 className="text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[34px]">
                Melbourne&apos;s #1 Domestic Pest Controllers
              </h2>
              <div className="mt-3 h-[3px] w-[60px] bg-[#7DD958]" />
              <p className="mt-5 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px] md:text-base">
                <Link href="/about-us" className="font-semibold text-[#3fa535]">Zap It</Link>{' '}
                Pest &amp; Termite Control Melbourne is the most trusted and same-day result delivering residential pest
                control expert company in Melbourne. We are dedicated towards providing DHHS approved and safe insect-killing
                solutions for your health using our advanced track and hunt technologies. Our certified technicians are always
                on the go to provide safe, same-day services.
              </p>
              <div className="mt-8">
                <Link
                  href="/about-us"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#3fa535] px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0d402e]"
                >
                  Know More About Us
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={`${WP}/elementor-thumbs-ZAP-IT-SOCIALIETTA-508022-r7s5ckhcmh43u3l9w3juc3wy7mr5k12y7bz7xs4tbk.webp`}
                alt="Zap It pest control technician Melbourne"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== COMPLETE PEST CONTROL ===================== */}
      <ScrollReveal direction="up" delay={100}>
      <section className="bg-[#f2f6f2] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[34px]">
            Complete Residential Pest Control For Your Safety
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#7DD958]" />
          <HomepagePestServiceTabs />
          <div className="mt-8 text-center">
            <Link
              href="/pest-solutions"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#3fa535] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0d402e]"
            >
              Discover Our Services
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== SAME-DAY SERVICE ===================== */}
      <ScrollReveal direction="left">
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={`${WP}/2025-10-imgi_22_Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp`}
                alt="Same-day home pest control services Melbourne"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[32px]">
                Same-Day Home Pest Control Services
              </h2>
              <div className="mt-3 h-[3px] w-[60px] bg-[#7DD958]" />
              <p className="mt-5 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px] md:text-base">
                Zap It Pest &amp; Termite Control Melbourne is just one call away from you, whenever you need to get the pests
                kicked out of your residential spaces. Our team of certified and expert pest control technicians treats your
                home like their own and uses safe pest elimination methods. We not only provide you with a solution but also
                education to prevent the fatal insects from ever disturbing your peace again.
              </p>
              <div className="mt-8">
                <a
                  href={SITE_CONFIG.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#3fa535] px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0d402e]"
                >
                  Book an Inspection Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== 3-STEP STRATEGY ===================== */}
      <ScrollReveal direction="up">
      <section className="bg-[#f2f6f2] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[34px]">
            Our 3-Step Proven Strategy For Home Pest Control Services
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#7DD958]" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {STRATEGY_STEPS.map((s) => (
              <div key={s.n} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#3fa535] text-lg font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mb-2 text-[18px] font-bold leading-tight text-[#131a1c]">{s.title}</h3>
                <p className="text-[14px] leading-[1.7] text-[#414042]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== RESIDENTIAL PROPERTIES ===================== */}
      <ScrollReveal direction="right">
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[34px]">
            Residential Properties We Protect From Pests
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#7DD958]" />
          <div className="space-y-3">
            {PROPERTY_TYPES.map((p) => (
              <details key={p.id} className="group rounded-xl border border-gray-200 bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-4 min-w-0">
                    <Image src={p.img} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-lg object-contain" />
                    <div className="min-w-0">
                      <p className="text-[16px] font-bold text-[#131a1c] sm:text-[18px]">{p.label}</p>
                      <p className="text-[13px] text-[#3fa535] font-medium sm:text-sm">{p.sub}</p>
                    </div>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#3fa535] text-[#3fa535] font-bold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6">
                  <p className="text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">{p.detail}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== WHY CHOOSE US / COVERAGE ===================== */}
      <ScrollReveal direction="up">
      <section className="bg-[#f2f6f2] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[34px]">
            Why Choose Zap It Residential Pest Control Services?
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#7DD958]" />
          <HomepageMelbourneCoverage />
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== REVIEWS ===================== */}
      <ScrollReveal direction="fade">
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[34px]">
            How Customers Rate Zap It Pest Control Services
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#7DD958]" />
          <HomepageReviews />
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== PEST LIBRARY / BLOGS ===================== */}
      <ScrollReveal direction="up" delay={100}>
      <section className="bg-[#f2f6f2] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[34px]">
            Pest Library
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[60px] bg-[#7DD958]" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {BLOG_CARDS.map((b) => (
              <Link
                key={b.title}
                href={b.href}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-[200px] w-full">
                  <Image src={b.image} alt="" fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <div className="flex flex-1 flex-col bg-[#eeeeee] p-5">
                  <h3 className="mb-2 text-[16px] font-semibold leading-[1.3] text-[#131a1c] transition-colors group-hover:text-[#3fa535] sm:text-[17px]">
                    {b.title}
                  </h3>
                  <p className="mb-4 flex-1 text-[13px] leading-[1.6] text-[#414042] line-clamp-3 sm:text-[14px]">
                    {b.excerpt}
                  </p>
                  <span className="inline-flex min-h-[40px] w-fit items-center justify-center rounded-lg bg-[#3fa535] px-5 text-sm font-bold uppercase tracking-wide text-white">
                    Read More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== FAQ ===================== */}
      <ScrollReveal direction="up">
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-[1.2] text-[#131a1c] sm:text-[28px] md:text-[34px]">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mb-6 h-[3px] w-[120px] bg-[#7DD958]" />
          <HomepageFAQ />
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== PRICING ===================== */}
      <ScrollReveal direction="fade">
      <PriceCalculator />
      </ScrollReveal>

      {/* ===================== WE'RE NOT HAPPY ===================== */}
      <section className="bg-[#131a1c] text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-6 sm:py-10 md:py-14">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-0">
            <div className="mx-auto w-full max-w-[260px] shrink-0 self-end sm:max-w-[300px] md:mx-0 md:max-w-[320px]">
              <Image
                src={`${WP}/2025-07-imgi_23_—Pngtree—pest-control-worker-in-protective_15020351-2-1-768x768.webp`}
                alt="Pest control worker in protective equipment"
                width={768}
                height={768}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1 pb-2 md:pl-8">
              <Image
                src={`${WP}/2024-07-200-colour.png`}
                alt="200% Guarantee Badge"
                width={160}
                height={166}
                className="mb-4 h-auto w-20 sm:w-28"
              />
              <p className="text-[16px] font-bold uppercase tracking-wide text-white sm:text-lg md:text-xl">
                We&apos;re Not Happy Unless You&apos;re Happy
              </p>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/80 sm:text-[15px]">
                Talk to us about pest control for your home or business
              </p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a href={SITE_CONFIG.phoneTel} className="inline-flex min-h-[44px] items-center gap-3 hover:underline">
                    <Phone className="h-5 w-5 shrink-0 text-[#3fa535]" aria-hidden />
                    <span className="text-[15px] text-white/90">{SITE_CONFIG.phoneRaw}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="inline-flex min-h-[44px] items-start gap-3 break-all hover:underline">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#3fa535]" aria-hidden />
                    <span className="text-[15px] text-white/90">{SITE_CONFIG.email}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PAGE INFO FOOTER ===================== */}
      <PageInfoFooterBlock />
    </>
  );
}
