import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Star, CheckCircle2 } from 'lucide-react';
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

const TRUST_BADGES = [
  'Child safe',
  'Pet safe',
  'Eco friendly',
  'Insured',
  'DHHS Licensed',
  'Accredited',
] as const;

const PEST_CARDS = [
  { name: 'Ants', href: '/pest-solutions/ant-pest-control', icon: '🐜' },
  { name: 'Cockroaches', href: '/pest-solutions/cockroach-control', icon: '🪳' },
  { name: 'Spiders', href: '/pest-solutions/spider-control', icon: '🕷️' },
  { name: 'Rodents', href: '/pest-solutions/rodent-control', icon: '🐀' },
  { name: 'Termites', href: '/termite-control-melbourne', icon: '🪲' },
  { name: 'Bed Bugs', href: '/pest-solutions/bed-bug-extermination', icon: '🛏️' },
  { name: 'Wasps', href: '/pest-solutions/wasp-nest-removal', icon: '🐝' },
  { name: 'Fleas', href: '/pest-solutions/flea-control', icon: '🦟' },
  { name: 'Possums', href: '/pest-solutions/possum-removal', icon: '🐿️' },
  { name: 'Flies', href: '/pest-solutions/fly-control', icon: '🪰' },
  { name: 'Birds', href: '/pest-solutions/bird-control-solutions', icon: '🐦' },
  { name: 'Silverfish', href: '/pest-solutions/silverfish-control', icon: '🐛' },
] as const;

const STRATEGY_STEPS = [
  { n: 1, title: 'Inspect & Diagnose', body: 'Our certified technicians inspect entry points and infestation levels using advanced detection technology. We provide a thorough assessment of the situation.' },
  { n: 2, title: 'Treat & Eliminate', body: 'Following a tailored treatment plan, we use DHHS approved, eco-friendly solutions to eliminate pests safely. Your family and pets remain protected throughout.' },
  { n: 3, title: 'Prevent & Monitor', body: 'We seal entry points, educate you on prevention, and schedule follow-up visits to ensure long-term, pest-free living.' },
] as const;

const BLOG_CARDS = [
  {
    href: '/blogs#how-to-prepare-your-home-for-a-pest-control-visit',
    image: `${WP}/2026-01-How-to-Prepare-Your-Home-for-a-Pest-Control-Visit-img-300x200.jpg`,
    title: 'How to Prepare Your Home for a Pest Control Visit?',
    excerpt: 'Preparing your home before a pest control visit improves treatment effectiveness and helps ensure your family stays safe.',
  },
  {
    href: '/blogs#what-happens-during-a-professional-pest-inspection',
    image: `${WP}/2026-01-What-Happens-During-a-Professional-Pest-Inspection-img-300x200.jpg`,
    title: 'What Happens During a Professional Pest Inspection?',
    excerpt: 'A professional pest inspection is a detailed process that helps identify existing infestations and the right treatment path.',
  },
  {
    href: '/blogs#pest-control-checklist-for-new-homeowners-in-melbourne',
    image: `${WP}/2025-12-Pest-Control-300x168.jpg`,
    title: 'Pest Control Checklist for New Homeowners',
    excerpt: 'Moving into a new home? Here is everything you need to know about protecting it from pests from day one.',
  },
] as const;

export const metadata: Metadata = {
  title: 'Pest Control Melbourne | Zap It Pest Control Services',
  description: `Zap It delivers fast, licensed pest & termite control across Melbourne, safe for pets & people, protecting homes & businesses from pests. Call ${SITE_CONFIG.phone}.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pest Control Melbourne | Zap It Pest Control Services',
    description: `Zap It delivers fast, licensed pest & termite control across Melbourne. Call ${SITE_CONFIG.phone}.`,
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
      <section className="relative flex min-h-[min(100vh,600px)] flex-col justify-end overflow-hidden pb-8 pt-[100px] text-white sm:min-h-[520px] sm:pb-12">
        <Image src={HERO_BG} alt="" fill priority className="object-cover object-center -z-20" sizes="100vw" />
        <div className="absolute inset-0 bg-[#131a1c]/75 -z-10" aria-hidden />

        <div className="relative mx-auto w-full max-w-3xl px-5 sm:px-6">
          <h1
            className="text-[26px] font-extrabold leading-[1.15] sm:text-[34px] md:text-[42px]"
            style={{ textWrap: 'balance' } as CSSProperties}
          >
            Protecting Melbourne homes &amp; families from pests
          </h1>

          <p className="mt-4 max-w-lg text-[15px] leading-[1.6] text-white/85 sm:text-[16px]">
            Same-day, DHHS approved pest control. Safe for your family, pets, and the environment.
          </p>

          {/* Trust badges in a 2-col grid */}
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2">
            {TRUST_BADGES.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[14px] text-white sm:text-[15px]">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1cdc38]" strokeWidth={2.5} />
                {item}
              </div>
            ))}
          </div>

          {/* Google rating pill */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <div className="flex gap-0.5">
              {[0,1,2,3,4].map((s) => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-[13px] font-bold text-white">{SITE_CONFIG.rating.count}+ 5-Star Reviews</span>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={SITE_CONFIG.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-[#1cdc38] px-7 py-3 text-[15px] font-bold text-[#131a1c] shadow-lg transition-transform hover:scale-105"
            >
              Book an Inspection
            </a>
            <Link
              href="/residential"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/30 px-7 py-3 text-[15px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Residential Services
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== TRUST STATEMENT — italic lime on charcoal ===================== */}
      <ScrollReveal direction="fade">
      <section className="bg-[#131a1c] px-5 py-8 sm:px-6 sm:py-10">
        <p className="mx-auto max-w-md text-center text-[18px] italic leading-[1.5] text-[#1cdc38] sm:text-[20px]">
          Your health and safety are at the heart of everything we do, supported by industry-leading technology.
        </p>
      </section>
      </ScrollReveal>

      {/* ===================== PEST SOLUTIONS GRID ===================== */}
      <ScrollReveal direction="up">
      <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
            We treat all household pests
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[50px] bg-[#1cdc38]" />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {PEST_CARDS.map((pest) => (
              <Link
                key={pest.name}
                href={pest.href}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4"
              >
                <span className="text-[28px] sm:text-[32px]">{pest.icon}</span>
                <span className="text-[12px] font-bold text-[#414042] sm:text-[13px]">{pest.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/pest-solutions"
              className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#1cdc38] px-6 py-2.5 text-[14px] font-bold text-[#131a1c] transition-transform hover:scale-105"
            >
              View All Pest Solutions
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== ABOUT / WHY ZAP IT ===================== */}
      <ScrollReveal direction="up">
      <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <h2 className="text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
                Melbourne&apos;s most trusted pest controllers
              </h2>
              <div className="mt-3 h-[3px] w-[50px] bg-[#1cdc38]" />
              <p className="mt-4 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
                Zap It Pest &amp; Termite Control is dedicated to providing DHHS approved, safe pest elimination
                solutions using advanced track and hunt technologies. Our certified technicians are always
                on the go to provide same-day services across all Melbourne suburbs.
              </p>
              <div className="mt-6">
                <Link
                  href="/about-us"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border-2 border-[#1cdc38] px-6 py-2.5 text-[14px] font-bold text-[#0d402e] transition-colors hover:bg-[#1cdc38] hover:text-[#131a1c]"
                >
                  About Us
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={`${WP}/elementor-thumbs-ZAP-IT-SOCIALIETTA-508022-r7s5ckhcmh43u3l9w3juc3wy7mr5k12y7bz7xs4tbk.webp`}
                alt="Zap It pest control technician Melbourne"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== 3-STEP STRATEGY ===================== */}
      <ScrollReveal direction="up">
      <section className="bg-[#0d402e] px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-tight text-white sm:text-[26px]">
            Our 3-step proven strategy
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[50px] bg-[#1cdc38]" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {STRATEGY_STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1cdc38] text-[18px] font-bold text-[#131a1c]">
                  {s.n}
                </div>
                <h3 className="mb-2 text-[16px] font-bold text-white">{s.title}</h3>
                <p className="text-[13px] leading-[1.6] text-white/75">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== SAME-DAY SERVICE IMAGE + TEXT ===================== */}
      <ScrollReveal direction="left">
      <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={`${WP}/2025-10-imgi_22_Our-expert-local-pest-controllers-providing-pest-treatment-at-a-Melbourne-home.webp`}
                alt="Same-day home pest control"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div>
              <h2 className="text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
                Same-day pest control services
              </h2>
              <div className="mt-3 h-[3px] w-[50px] bg-[#1cdc38]" />
              <p className="mt-4 text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">
                We&apos;re just one call away. Our team treats your home like their own, using safe elimination methods.
                We don&apos;t just provide solutions — we educate you on prevention to stop pests from ever returning.
              </p>
              <div className="mt-6">
                <a
                  href={SITE_CONFIG.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-[#1cdc38] px-6 py-2.5 text-[14px] font-bold text-[#131a1c] transition-transform hover:scale-105"
                >
                  Book an Inspection
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== ITALIC TRUST LINE ===================== */}
      <ScrollReveal direction="fade">
      <section className="bg-[#131a1c] px-5 py-8 sm:px-6 sm:py-10">
        <p className="mx-auto max-w-md text-center text-[18px] italic leading-[1.5] text-[#1cdc38] sm:text-[20px]">
          We know pets can get into all sorts of mischief which is why we take every measure to keep your much loved pets safe and sound.
        </p>
      </section>
      </ScrollReveal>

      {/* ===================== COMPLETE PEST CONTROL TABS ===================== */}
      <ScrollReveal direction="up">
      <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
            Complete residential pest control
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[50px] bg-[#1cdc38]" />
          <HomepagePestServiceTabs />
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== WHY CHOOSE US / COVERAGE ===================== */}
      <ScrollReveal direction="up">
      <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
            Why choose Zap It?
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[50px] bg-[#1cdc38]" />
          <HomepageMelbourneCoverage />
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== GOOGLE REVIEWS ===================== */}
      <ScrollReveal direction="fade">
      <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
            What our customers say
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[50px] bg-[#1cdc38]" />
          <HomepageReviews />
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== PRICING CALCULATOR ===================== */}
      <ScrollReveal direction="up">
        <PriceCalculator />
      </ScrollReveal>

      {/* ===================== ITALIC TRUST LINE ===================== */}
      <ScrollReveal direction="fade">
      <section className="bg-[#131a1c] px-5 py-8 sm:px-6 sm:py-10">
        <p className="mx-auto max-w-md text-center text-[18px] italic leading-[1.5] text-[#1cdc38] sm:text-[20px]">
          Whether you live in a one-bedroom flat, high-rise apartment, semi-detached townhouse or large family home, we have you covered.
        </p>
      </section>
      </ScrollReveal>

      {/* ===================== PEST LIBRARY / BLOGS ===================== */}
      <ScrollReveal direction="up">
      <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
            Pest library
          </h2>
          <div className="mx-auto mb-8 h-[3px] w-[50px] bg-[#1cdc38]" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {BLOG_CARDS.map((b) => (
              <Link
                key={b.title}
                href={b.href}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-[180px] w-full">
                  <Image src={b.image} alt="" fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-2 text-[15px] font-bold leading-[1.3] text-[#131a1c] transition-colors group-hover:text-[#1cdc38]">
                    {b.title}
                  </h3>
                  <p className="mb-3 flex-1 text-[13px] leading-[1.6] text-[#414042] line-clamp-3">
                    {b.excerpt}
                  </p>
                  <span className="inline-flex w-fit items-center rounded-full bg-[#1cdc38] px-4 py-1.5 text-[12px] font-bold text-[#131a1c]">
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
      <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-[22px] font-bold leading-tight text-[#131a1c] sm:text-[26px]">
            Frequently asked questions
          </h2>
          <div className="mx-auto mb-6 h-[3px] w-[50px] bg-[#1cdc38]" />
          <HomepageFAQ />
        </div>
      </section>
      </ScrollReveal>

      {/* ===================== GUARANTEE CTA — charcoal ===================== */}
      <section className="bg-[#131a1c] text-white">
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-6 sm:py-12">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-0">
            <div className="mx-auto w-full max-w-[240px] shrink-0 self-end sm:max-w-[280px] md:mx-0">
              <Image
                src={`${WP}/2025-07-imgi_23_—Pngtree—pest-control-worker-in-protective_15020351-2-1-768x768.webp`}
                alt="Pest control worker"
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
                className="mb-4 h-auto w-20 sm:w-24"
              />
              <p className="text-[18px] font-bold text-white sm:text-[20px]">
                We&apos;re not happy unless you&apos;re happy
              </p>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/75 sm:text-[15px]">
                Talk to us about pest control for your home or business
              </p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a href={SITE_CONFIG.phoneTel} className="inline-flex min-h-[44px] items-center gap-3 hover:underline">
                    <Phone className="h-5 w-5 shrink-0 text-[#1cdc38]" aria-hidden />
                    <span className="text-[15px] text-white/90">{SITE_CONFIG.phoneRaw}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="inline-flex min-h-[44px] items-start gap-3 break-all hover:underline">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#1cdc38]" aria-hidden />
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
