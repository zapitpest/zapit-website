import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateServiceSchema } from '@/lib/schema';

import ScrollReveal from '@/components/ui/ScrollReveal';
import type { BreadcrumbItem } from '@/types';
import HeroSlider from '@/components/sections/HeroSlider';
import GoogleReviewsCarousel from '@/components/sections/GoogleReviewsCarousel';
import PriceCalculator from '@/components/sections/PriceCalculator';

const WP = '/images/wp-assets';
const MELBOURNE_MAP =
  'https://www.google.com/maps?q=' + encodeURIComponent('Melbourne, Victoria, Australia') + '&z=10&output=embed';

// Pest icons supplied by client live at /images/pest-icons/<slug>.svg (28x28 per spec).
type PestPriceItem = {
  n: number;
  name: string;
  price: string;
  open: boolean;
  iconSlug: string;
  duration: string;
  propertyType: string;
  inclusions: string;
  verbalReport: string;
  detail: string;
};

const PEST_PRICE_LIST: ReadonlyArray<PestPriceItem> = [
  {
    n: 1, iconSlug: 'general-inspection',
    name: 'General inspection', price: '$100', open: true,
    duration: '30 minutes', propertyType: 'All residential homes',
    inclusions: 'Visual inspection of exterior and interior of property',
    verbalReport: 'Findings and recommendations documented',
    detail: `A general inspection is designed to quickly assess areas of concern in your home. To confirm or deny pest activity, type of pest and access extent of infestation.\n\nA verbal and written assessment is provided with recommended course of action. The price of the assessment is deducted from treatment or preventative action taken on the same day of inspection.`,
  },
  {
    n: 2, iconSlug: 'ant-treatment',
    name: 'Ant treatment', price: '$239', open: true,
    duration: '45 minutes', propertyType: 'All residential homes',
    inclusions: '• Targeted surface spraying to entry points and active areas\n• Ant gel bait applied where activity is visible\n• Treatment focused on kitchens, bathrooms, and exterior edges',
    verbalReport: 'Treatment summary and follow-up recommendations provided on completion',
    detail: `Target pests: Common household ants\n\nWhat to expect after treatment:\n• Activity may increase 1–3 weeks as ants spread the product to colony\n• Gradual reduction in activity as the treatment takes effect\n\nImportant notes and exclusions:\n• Designed for light infestations only\n• Does not target deep nesting or multiple colonies\n• No warranty applies to this service\n\nThis service is effective in treating light or intermittent ant activity only. Suitable for when ant activity is detected early and before a large ant colony is established.\n\nIt is not effective for treating deep nested multiple ant colonies which may require more extensive treatment.\n\nAn elimination of deep-rooted multi colonies, all homes. 60min $450`,
  },
  { n: 3, iconSlug: 'ant-elimination', name: 'Ant elimination', price: '$450', open: false, duration: '60 minutes', propertyType: 'All residential homes', inclusions: 'Deep nest elimination for established colonies.', verbalReport: 'Treatment summary and follow-up recommendations provided on completion', detail: 'An elimination of deep-rooted multi ant colonies in all homes.' },
  { n: 4, iconSlug: 'bed-bugs', name: 'Bed Bugs', price: '$450', open: false, duration: '60 minutes', propertyType: 'All residential homes', inclusions: 'Full bed bug and egg elimination.', verbalReport: 'Treatment summary and follow-up recommendations provided on completion', detail: 'Complete bed bug treatment including eggs and harbourage areas.' },
  { n: 5, iconSlug: 'clothes-carpet-moth', name: 'Clothes & carpet moth', price: '$385', open: false, duration: '90 minutes', propertyType: 'All residential homes', inclusions: 'Treatment of all moth-affected textile areas.', verbalReport: 'Treatment summary and follow-up recommendations provided on completion', detail: 'Targeted treatment for clothes and carpet moth infestations.' },
  { n: 6, iconSlug: 'fleas', name: 'Fleas', price: '$385', open: false, duration: '45 minutes', propertyType: 'All residential homes', inclusions: 'Pet-safe flea treatment breaking the lifecycle.', verbalReport: 'Treatment summary and follow-up recommendations provided on completion', detail: 'Targeted flea treatment designed for homes with pets.' },
  { n: 7, iconSlug: 'german-cockroach', name: 'German Cockroach', price: '$250', open: false, duration: '60 minutes', propertyType: 'All residential homes', inclusions: 'Gel baits and targeted sprays for German cockroaches.', verbalReport: 'Treatment summary and follow-up recommendations provided on completion', detail: 'Highly effective treatment for German cockroach infestations in kitchens and bathrooms.' },
  { n: 8, iconSlug: 'mice-rat-treatment', name: 'Mice & rat treatment', price: '$200', open: false, duration: '40 minutes', propertyType: 'All residential homes', inclusions: 'Bait stations, entry point sealing, monitoring.', verbalReport: 'Treatment summary and follow-up recommendations provided on completion', detail: 'Targeted rodent treatment using secure bait stations and entry point sealing.' },
  { n: 9, iconSlug: 'mice-rat-removal', name: 'Mice & rat removal', price: '$280', open: false, duration: '30–45 minutes', propertyType: 'All residential homes', inclusions: 'Physical removal of rodents and dead rodent clearance.', verbalReport: 'Removal summary and prevention recommendations provided on completion', detail: 'Safe removal and disposal of mice and rats from your property.' },
  { n: 10, iconSlug: 'mosquitos-flies', name: 'Mosquitos and flies', price: '$385', open: false, duration: '60 minutes', propertyType: 'All residential homes', inclusions: 'Breeding site treatment, residual spray application.', verbalReport: 'Treatment summary and follow-up recommendations provided on completion', detail: 'Targeted mosquito and fly treatment to reduce populations around your home.' },
  { n: 11, iconSlug: 'possum-removal', name: 'Possum removal', price: '$450', open: false, duration: '30–60 minutes', propertyType: 'Single / Double-story homes', inclusions: 'Licensed humane possum removal and entry sealing.', verbalReport: 'Removal summary and entry-point proofing recommendations provided on completion', detail: 'Humane, licensed possum removal from roof voids with entry-point proofing.' },
  { n: 12, iconSlug: 'silverfish', name: 'Silverfish treatment', price: '$299', open: false, duration: '40 minutes', propertyType: 'All residential homes', inclusions: 'Treatment of silverfish harbourage areas.', verbalReport: 'Treatment summary and follow-up recommendations provided on completion', detail: 'Targeted treatment to eliminate silverfish from bookshelves, wardrobes, and bathrooms.' },
  { n: 13, iconSlug: 'termite-inspections', name: 'Termite inspections', price: '$349', open: false, duration: '2 hours', propertyType: 'All residential homes', inclusions: 'Visual and technical inspection of exterior and interior of property.', verbalReport: 'Findings and recommendations documented', detail: 'A thorough termite inspection using moisture detection, noise detection, and keyhole camera.' },
  { n: 14, iconSlug: 'wasp-control', name: 'Wasp control', price: '$250', open: false, duration: '60 minutes', propertyType: 'All residential homes', inclusions: 'Safe nest removal and treatment.', verbalReport: 'Treatment summary and follow-up recommendations provided on completion', detail: 'Professional wasp nest removal and treatment to protect your family.' },
];

// Residential FAQs removed from this page per refactor brief #7.
// Full FAQ set lives at /frequently-asked-questions.

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
];

// Pest icon helper — renders the client-supplied per-pest SVG at the Figma spec size.
function PestIcon({ slug, label }: { slug: string; label: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/pest-icons/${slug}.svg`}
      alt={`${label} icon`}
      aria-hidden
      className="h-[28px] w-[28px] shrink-0"
    />
  );
}

export const metadata: Metadata = {
  title: { absolute: `Pest Control Melbourne | ${SITE_CONFIG.name}` },
  description: `Protect your Melbourne home with Zapit. Child & pet safe, same-day residential pest control. Termite inspections from $349. Call ${SITE_CONFIG.phone}.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: `Pest Control Melbourne | ${SITE_CONFIG.name}`,
    description: `Pest protection you can trust. Call ${SITE_CONFIG.phone}.`,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'en_AU',
    type: 'website',
  },
};

export default function HomePage() {
  const schemas = [
    generateServiceSchema('Residential Pest Control Services Melbourne', 'Professional home pest control in Melbourne. Safe, approved treatments.'),
    generateLocalBusinessSchema('Melbourne'),
    generateBreadcrumbSchema(BREADCRUMBS),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      {/* ===== 1. HERO IMAGE SLIDER (images already contain text/border/badge) ===== */}
      <HeroSlider />
      <h1 className="sr-only">Residential Pest Control Services Melbourne — Zapit</h1>

      {/* ===== 2. WE TREAT ALL HOUSEHOLD PESTS — dark green bg, left aligned per Figma ===== */}
      {/* Typography: H 20px Bold / line-height 29px. Body 14px Regular / line-height 18px. */}
      {/* Inline Call now + chat buttons removed — FloatingCTA already provides both globally. */}
      {/* DHHS claim removed per client item 4 (no unverified accreditation language). */}
      <ScrollReveal direction="up">
        <section className="bg-[#0d402e] px-5 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-[600px]">
            <h2 className="mb-3 text-[20px] font-bold leading-[29px] text-white">
              We treat all household pests
            </h2>
            <p className="mb-6 text-[14px] font-normal leading-[18px] text-[#f8f5f2]/90">
              When you protect your home and family from pests with us, your peace of mind is assured.
              Our services are eco-friendly, child safe and pet safe. We treat your home with the same
              care as you do, using high-quality, long-lasting solutions you can rely on.
            </p>

            {/* Trust badges — sized to match Figma proportions */}
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/group-373.svg" alt="Child safe, Pet safe, Eco friendly" className="h-[80px] w-auto sm:h-[88px] lg:h-[96px]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/group-374.svg" alt="Insured, Licensed, Local team" className="h-[80px] w-auto sm:h-[88px] lg:h-[96px]" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 3. GOOGLE REVIEWS CAROUSEL — white bg ===== */}
      <ScrollReveal direction="up" delay={100}>
        <GoogleReviewsCarousel />
      </ScrollReveal>

      {/* ===== 4. GO TO PEST PRICE LIST BUTTON — dark green bg per Figma ===== */}
      {/* Typography: Graphik Semibold 16px / line-height 25px / letter-spacing -2%. Arrow removed per refactor brief. */}
      <ScrollReveal direction="fade">
        <div className="bg-[#0d402e] px-4 py-6 text-center">
          <a
            href="#pest-price-list"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#f8f5f2] px-7 py-2.5 text-[16px] font-semibold leading-[25px] text-[#131a1c] transition-colors hover:bg-[#1cdc38] hover:text-white"
            style={{ letterSpacing: '-0.32px' }}
          >
            Go to pest solutions and price list
          </a>
        </div>
      </ScrollReveal>

      {/* ===== 5. TERMITE SECTION — bright green card on dark green wrapper (continuous bg) ===== */}
      <ScrollReveal direction="up">
      <section className="bg-[#0d402e] px-3 py-3 sm:px-4">
        <div className="rounded-2xl bg-[#1cdc38] px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <p className="mb-5 text-center text-[16px] font-medium italic text-[#f8f5f2]">
              We&apos;re termite specialists
            </p>
            <div className="mb-6 flex items-start gap-4">
              {/* Client-supplied SVG — Figma Termite icon */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/residential/termite-specialist.svg" alt="" aria-hidden className="h-[88px] w-[88px] shrink-0" />
              <h2 className="text-[22px] font-bold leading-tight text-[#414042] sm:text-[28px] md:text-[32px]">
                We stop termites dead in their tracks
              </h2>
            </div>
            <h3 className="mb-4 text-[18px] font-bold text-[#414042] sm:text-[20px]">
              Termite inspection <span className="font-normal text-[#414042]">$399</span>
            </h3>
            <dl className="mb-5 space-y-2 text-[14px] text-[#414042] sm:text-[15px]">
              <div className="flex gap-2"><dt className="shrink-0 font-bold italic">Duration:</dt><dd className="italic">2 hours</dd></div>
              <div className="flex gap-2"><dt className="shrink-0 font-bold italic">Property type:</dt><dd className="italic">All residential homes</dd></div>
              <div className="flex flex-col gap-0.5"><dt className="font-bold italic">Inclusions:</dt><dd className="italic ml-0">Visual and technical inspection of exterior and interior of property, including gardens</dd></div>
              <div className="flex flex-col gap-0.5"><dt className="font-bold italic">Tools used:</dt><dd className="italic ml-0">Moisture detection, Noise detection, keyhole camera</dd></div>
              <div className="flex flex-col gap-0.5"><dt className="font-bold italic">Verbal and written report:</dt><dd className="italic ml-0">Findings and recommendations documented.</dd></div>
            </dl>
            <p className="mb-3 text-[15px] leading-[1.7] text-[#414042] sm:text-[16px]">
              We conduct a detailed inspection in and around your home including in roof cavities and under the house.
              We use the latest technology to detect and diagnose extent of any termite activity.
              {/* Small bug icon inline at the end of the paragraph per Figma */}
              {' '}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/residential/termite-activity.svg" alt="" aria-hidden className="inline-block h-[20px] w-auto -translate-y-[1px] align-middle" />
            </p>
            <p className="mb-8 text-[15px] leading-[1.7] text-[#414042] sm:text-[16px]">
              A verbal and written assessment is provided with recommended course of action. The price of inspection
              is deducted from further treatment or preventative action.
            </p>
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/icons/important.svg" alt="" aria-hidden className="h-[58px] w-[58px] shrink-0" />
              <div>
                <p className="mb-1 text-[18px] font-black italic text-white">Important!</p>
                <p className="text-[14px] font-medium italic leading-[1.5] text-[#131a1c] sm:text-[15px]">
                  Do not disturb termites if you see or suspect termite activity. They move to other areas if you disturb them!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ===== 6. PRICE CALCULATOR — functional, real PEST_PRICE_LIST data + 10% same-day discount ===== */}
      <ScrollReveal direction="up" delay={100}>
        <PriceCalculator />
      </ScrollReveal>

      {/* ===== 7. SAME DAY SERVICE CTA ===== */}
      <ScrollReveal direction="fade">
      <section className="bg-[#0d402e] py-8 sm:py-10 lg:py-8">
        <a href={SITE_CONFIG.phoneTel} className="mx-auto block max-w-[520px] px-4 lg:max-w-[460px]" aria-label="Same day service available. Call now!">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/icons/group-350.svg" alt="Same day service available. Call now!" className="h-auto w-full" />
        </a>
      </section>
      </ScrollReveal>

      {/* ===== 8. CAT GIRL TESTIMONIAL IMAGE ===== */}
      {/* Brief #6: overlay text removed — image already has the testimonial text baked in.
          Mobile keeps full-bleed (Figma); desktop caps + frames the natural-aspect image
          so the testimonial overlay reads at a comfortable size and the cat isn't cropped. */}
      <ScrollReveal direction="right">
        <section className="w-full bg-[#0d402e] py-4 sm:py-6 lg:py-12">
          <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[520px] lg:px-6">
            <Image
              src="/images/residential/cat-girl.png"
              alt="Zapit were great to deal with and I felt confident they took my cat's safety seriously — Jenny, Hawthorn resident"
              width={750}
              height={880}
              className="h-auto w-full lg:rounded-3xl lg:shadow-2xl"
              sizes="(min-width: 1024px) 520px, 100vw"
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 9. THE MORE YOU PROTECT / SAVE 10% — client-supplied SVG asset ===== */}
      <ScrollReveal direction="up">
        <section className="bg-white px-4 py-6 sm:px-5 sm:py-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/residential/save-10-card.svg"
            alt="The more you protect, the more you save. Save 10% on the total cost of the job when you purchase two or more treatments that we service on the same day."
            width={354}
            height={185}
            className="mx-auto block h-auto w-full max-w-[354px]"
          />
        </section>
      </ScrollReveal>

      {/* ===== 10. PEST SOLUTIONS AND PRICE LIST — Figma Pest Solutions.svg pattern ===== */}
      {/* White background. Single container, no per-item boxes. Pest icon = client-supplied
          per-pest SVG at 28x28. Detail rows use Graphik Semibold Italic 12px for the green
          field labels/values; description Regular 14px justified. First two items open. */}
      <ScrollReveal direction="up">
        <section id="pest-price-list" className="bg-white px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-[400px]">
            <h2 className="text-center text-[24px] font-bold leading-[24px] text-[#131a1c]">
              Pest solutions and price list
            </h2>
            <div className="mt-5 border-t" style={{ borderColor: 'rgba(130,130,130,0.42)' }} />

            {PEST_PRICE_LIST.map((item) => (
              <details
                key={item.n}
                className="group border-b"
                style={{ borderColor: 'rgba(130,130,130,0.42)' }}
                open={item.open}
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 py-3.5">
                  <PestIcon slug={item.iconSlug} label={item.name} />
                  <span className="flex-1 text-[16px] font-bold leading-[20px] text-[#131a1c]">
                    {item.name}{' '}
                    <span className="font-normal text-[#38B44A]">{item.price}</span>
                  </span>
                  <span
                    className="flex shrink-0 items-center justify-center leading-none text-[#AFAAA4]"
                    style={{ width: '24px', height: '12.5px', fontSize: '28px', fontWeight: 700 }}
                    aria-hidden
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&minus;</span>
                  </span>
                </summary>
                <div className="pb-5 pl-[44px] pr-2 pt-1">
                  <dl className="mb-3 space-y-1">
                    <div className="flex flex-wrap gap-1.5">
                      <dt className="text-[12px] font-semibold italic leading-[20px] text-[#38B44A]">Duration:</dt>
                      <dd className="text-[12px] font-semibold italic leading-[20px] text-[#414042]">{item.duration}</dd>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <dt className="text-[12px] font-semibold italic leading-[20px] text-[#38B44A]">Property type:</dt>
                      <dd className="text-[12px] font-semibold italic leading-[20px] text-[#414042]">{item.propertyType}</dd>
                    </div>
                    <div>
                      <dt className="text-[12px] font-semibold italic leading-[20px] text-[#38B44A]">Inclusions:</dt>
                      <dd className="whitespace-pre-line text-[14px] font-normal leading-[20px] text-[#414042]">{item.inclusions}</dd>
                    </div>
                    <div>
                      <dt className="text-[12px] font-semibold italic leading-[20px] text-[#38B44A]">Verbal and written report:</dt>
                      <dd className="text-[14px] font-normal leading-[20px] text-[#414042]">{item.verbalReport}</dd>
                    </div>
                  </dl>
                  <p className="whitespace-pre-line text-justify text-[14px] font-normal leading-[20px] text-[#414042]">
                    {item.detail}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== 11. DARK GREEN BLOCK — TRUST IMAGES + ITALIC PARAGRAPHS ===== */}
      {/* Brief #10: Section 11a 'Your health and safety...' removed.
          Brief #11: Italic paragraphs normalised to Regular Italic 20px / line-height 29px / center.
          Brief #12: Background unified to #0d402e (matches same-day-service block) for visual consistency. */}

      {/* 11b. Family trust image — text is already in the image.
          Mobile = full-bleed Figma; desktop = framed card with proper breathing room. */}
      <section className="w-full bg-[#0d402e] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[520px] lg:px-6">
          <Image src="/images/residential/family-trust.png" alt="Protection you can trust — We have serviced over 20,000 homes in Melbourne" width={712} height={1002} className="h-auto w-full lg:rounded-3xl lg:shadow-2xl" sizes="(min-width: 1024px) 520px, 100vw" />
        </div>
      </section>

      {/* 11c. Pet safety text */}
      <ScrollReveal direction="fade" delay={100}>
        <section className="bg-[#0d402e] px-5 py-8 sm:px-6 sm:py-10 lg:py-6">
          <p className="mx-auto max-w-md text-center text-[20px] font-normal italic leading-[29px] text-[#1cdc38]">
            We know pets can get into all sorts of mischief which is why we take every measure to keep your much loved pets safe and sound.
          </p>
        </section>
      </ScrollReveal>

      {/* 11d. Townhouse image — text is already in the image */}
      <section className="w-full bg-[#0d402e] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[520px] lg:px-6">
          <Image src="/images/residential/townhouse.png" alt="We treat your home as if it were ours — Your satisfaction is our highest priority" width={650} height={702} className="h-auto w-full lg:rounded-3xl lg:shadow-2xl" sizes="(min-width: 1024px) 520px, 100vw" />
        </div>
      </section>

      {/* 11e. Coverage text */}
      <ScrollReveal direction="fade" delay={100}>
        <section className="bg-[#0d402e] px-5 py-8 sm:px-6 sm:py-10 lg:py-6">
          <p className="mx-auto max-w-md text-center text-[20px] font-normal italic leading-[29px] text-[#1cdc38]">
            Whether you live in a one-bedroom flat, high-rise apartment, semi-detached townhouse or large family home, we have you covered.
          </p>
        </section>
      </ScrollReveal>

      {/* 11f. High rise specialist image — text is already in the image */}
      <section className="w-full bg-[#0d402e] py-4 sm:py-6 lg:py-12">
        <div className="mx-auto w-full max-w-[640px] px-3 sm:px-4 lg:max-w-[520px] lg:px-6">
          <Image src="/images/residential/highrise-specialist.png" alt="We're high rise specialists — We have quickly become specialists in high rise living pest protection" width={648} height={878} className="h-auto w-full lg:rounded-3xl lg:shadow-2xl" sizes="(min-width: 1024px) 520px, 100vw" />
        </div>
      </section>

      {/* 11g. Service area text */}
      <ScrollReveal direction="fade" delay={100}>
        <section className="bg-[#0d402e] px-5 py-8 sm:px-6 sm:py-10 lg:py-6">
          <p className="mx-auto max-w-md text-center text-[20px] font-normal italic leading-[29px] text-[#1cdc38]">
            We service Melbourne&apos;s central, north-west, northern and north-eastern suburbs.
          </p>
        </section>
      </ScrollReveal>

      {/* ===== 12. MELBOURNE MAP ===== */}
      <section className="bg-[#0d402e] px-0 pb-2 sm:px-4">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden sm:rounded-2xl">
          <div className="relative aspect-[4/3] w-full min-h-[240px] bg-[#1a4f38] sm:aspect-[16/9] sm:min-h-[300px]">
            <iframe
              title="Zapit Melbourne service area map"
              src={MELBOURNE_MAP}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <div className="h-[min(72%,18rem)] w-[min(72%,18rem)] rounded-full border-[5px] border-[#1cdc38] shadow-[0_0_0_2px_rgba(28,220,56,0.3)] sm:h-[min(65%,20rem)] sm:w-[min(65%,20rem)]" />
              <div className="absolute right-[14%] top-[18%] flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                <CheckCircle2 className="h-7 w-7 text-[#1cdc38]" strokeWidth={2.25} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "We've got Melbourne covered" + FAQ sections removed per refactor brief #7.
          Flow now: Map → Licensed section → Footer. */}

      {/* ===== 13. LICENSES & CERTIFICATIONS ===== */}
      <ScrollReveal direction="up">
        <section className="bg-[#f8f5f2] px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-[22px] font-semibold leading-tight text-[#131a1c] sm:text-[26px]">
              Insured, licensed, accredited and legally compliant
            </h2>
            <p className="mb-4 text-[15px] leading-[1.7] text-[#414042] sm:text-[16px]">
              Your health and safety is at the heart of everything we do. Your trust in us is backed
              by our industry memberships, accreditations, licences and professional insurance.
            </p>
            <p className="mb-6 text-[15px] leading-[1.7] text-[#414042] sm:text-[16px]">
              We&apos;re committed to providing the safest and best possible pest control solutions.
              We maintain our professional currency by staying at the forefront of advances in
              technology, regulatory compliance and industry standards.
            </p>

            <ul className="mb-8 list-disc space-y-3 pl-5 text-[15px] text-[#414042] sm:text-[16px]">
              <li className="font-semibold text-[#131a1c]">The Australian Environmental Pest Managers Association</li>
              <li className="font-semibold text-[#131a1c]">HACCP Food Safety Certificate</li>
              <li className="font-semibold text-[#131a1c]">VIC Government Wildlife Licence</li>
            </ul>

            <div className="flex flex-col items-center gap-6 border-t border-[#e5e5e5] pt-8">
              <div className="flex items-center justify-center gap-8">
                <figure className="flex flex-col items-center text-center">
                  <Image
                    src="/images/commercial/cert-wildlife.png"
                    alt="Wildlife Licensed"
                    width={120}
                    height={100}
                    className="h-20 w-auto object-contain sm:h-24"
                  />
                  <figcaption className="mt-2 text-[14px] font-semibold text-[#414042]">
                    Wildlife Licenced
                  </figcaption>
                </figure>
                <figure className="flex flex-col items-center text-center">
                  <Image
                    src="/images/commercial/cert-haccp.png"
                    alt="HACCP Food Safety Certification"
                    width={120}
                    height={100}
                    className="h-20 w-auto object-contain sm:h-24"
                  />
                  <figcaption className="mt-2 text-[14px] font-semibold text-[#414042]">
                    HACCP Food Safety<br />Certification
                  </figcaption>
                </figure>
              </div>
              <figure className="flex flex-col items-center text-center">
                <Image
                  src="/images/commercial/cert-aepma.png"
                  alt="Australian Environmental Pest Managers Association"
                  width={160}
                  height={80}
                  className="h-16 w-auto object-contain sm:h-20"
                />
                <figcaption className="mt-2 text-[14px] font-semibold text-[#414042]">
                  Australian Environmental<br />Pest Managers Association
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      </ScrollReveal>

    </>
  );
}
