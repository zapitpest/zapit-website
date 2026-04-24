import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import type { FAQ, BreadcrumbItem } from '@/types';
import FaqPageAccordion from '@/components/sections/FaqPageAccordion';

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Frequently Asked Questions', href: '/frequently-asked-questions' },
];

const PEST_TYPES_INTRO = {
  question: 'What type of pests do you treat?',
  answer:
    'We treat all types of pests, including ants, termites, rodents, possums, cockroaches, spiders, fleas, bedbugs, silverfish, and more.',
};

const FAQ_ITEMS: FAQ[] = [
  {
    question: 'Do you provide same day services?',
    answer:
      'We offer same-day service across Melbourne whenever scheduling allows, including for many urgent situations. Call us early for the best chance of a same-day visit, and we will always confirm realistic arrival times before we head out.',
  },
  {
    question: 'Will I leave the house if I book a general pest spray?',
    answer:
      'In most cases you can remain at home during a general pest treatment. We use careful application methods, mark treated areas, and let you know any short period to avoid specific rooms while products settle.',
  },
  {
    question: 'Are your pest control treatments safe for whole family and pets?',
    answer:
      'We choose products and application patterns designed for household safety when used as directed, including family members and pets. We explain simple precautions such as keeping pets off treated surfaces until dry so everyone stays comfortable.',
  },
  {
    question: 'How much time is required for pest control?',
    answer:
      'Most residential visits take between 45 minutes and two hours, depending on property size, access, and the pest program. We will give you a clearer time range when you book so you can plan the rest of your day.',
  },
  {
    question: 'What preparation I will do before pest treatment?',
    answer:
      'Light preparation helps: clear food-prep surfaces, move items slightly away from skirting where possible, and note any pest hotspots you have seen. We can email a short checklist with your appointment so nothing feels overwhelming.',
  },
  {
    question: 'Is pest control effective immediately?',
    answer:
      'Many pests begin reacting soon after treatment, while the full effect can build over the following days as the program works. We will describe what to expect for your situation so you are not second-guessing normal timelines.',
  },
  {
    question: 'Do you require some advance payments?',
    answer:
      'Payment expectations are agreed when you book or before larger programs begin, with standard residential jobs often settled on the day. If anything differs for your service, we explain it up front in plain language—no last-minute surprises.',
  },
  {
    question: 'How do I know if I have a pest problem?',
    answer:
      'Common signs include droppings, shed skins, damage to timber or food packaging, night-time noises in roof voids, and unexplained bites or rashes. If something feels off, a professional inspection can confirm whether you need treatment or simple prevention.',
  },
  {
    question: 'How much do pest control services cost?',
    answer:
      'Price reflects property size, pest type, and how much of the home or business needs work. We provide clear quotes before starting so you can compare value against the scope, warranties, and follow-up included in your program.',
  },
  {
    question: 'How many technicians/employees do you send for a job?',
    answer:
      'A typical home visit is handled by one experienced technician, which keeps communication simple and consistent. Larger sites or commercial work may use a team when the job or safety requirements call for extra hands on deck.',
  },
  {
    question: 'How often should I schedule pest control services?',
    answer:
      'Many Melbourne homes benefit from an annual general pest plan, with more frequent visits if you are in a high-activity area or have had past issues. We help you pick an interval that matches risk, budget, and peace of mind.',
  },
  {
    question: 'Will one treatment completely eliminate pests?',
    answer:
      'A well-targeted visit can stop many infestations in their tracks, though stubborn or widespread pests may need follow-up or an integrated program. We design treatments to address causes—not only the insects you see on day one.',
  },
  {
    question: 'General information',
    answer:
      'Zap It Pest & Termite Control is a licensed Melbourne team offering residential and commercial programs with a calm, no-drama approach. We focus on clear communication, responsible product use, and support that continues after the technician leaves your property.',
  },
  {
    question: 'How long after pest control can I go inside?',
    answer:
      'Re-entry depends on the products used and the areas treated, but many interior applications allow you to return once surfaces are dry and ventilated as we direct. We always give you specific wait times on site so you never have to guess.',
  },
  {
    question: 'How long after pest control can I mop?',
    answer:
      'Mopping can wash away perimeter or floor-edge treatments, so we usually ask you to hold off on washing those zones for a period we will specify. Everyday cleaning in the middle of rooms is often fine sooner—ask us for guidance tailored to your service.',
  },
  {
    question: 'Are your pest control services guaranteed?',
    answer:
      'We stand behind our work with service commitments that are explained when you book and reflected in your paperwork. If covered pests return within the agreed window, we work with you on the next step according to that commitment.',
  },
  {
    question: 'Do you offer pest control for commercial properties?',
    answer:
      'Yes—shops, offices, food businesses, warehouses, and other commercial sites can access tailored programs, documentation, and visit patterns that match your hours and compliance needs. Share your site details and we will map a sensible plan.',
  },
  {
    question: 'How long does pest control last?',
    answer:
      'Longevity depends on the pest, product, and environment—exterior weathering and cleaning habits all play a part. For many clients, a structured schedule with occasional touch-ups provides steady protection rather than a single one-off event.',
  },
  {
    question: 'How to control pests in the garden?',
    answer:
      'We look at what is actually feeding or sheltering garden pests, then connect outdoor work with the rest of your property so treatments stay coherent. That might mean targeted product use, advice on plant spacing, or managing moisture and debris.',
  },
  {
    question: 'How can I prevent future pest infestations?',
    answer:
      'Simple habits make a real difference: seal gaps, store food in sealed containers, keep rubbish secure, fix leaks promptly, and trim vegetation away from the building. Pair that with routine professional checks and you are in a strong position to stay ahead.',
  },
];

const FAQ_SCHEMA_DATA: FAQ[] = [PEST_TYPES_INTRO, ...FAQ_ITEMS];

export function generateMetadata(): Metadata {
  return {
    title: {
      absolute: 'Frequently Asked Questions - Zap It Pest Control Melbourne',
    },
    description:
      'Answers to common questions about Zap It Pest & Termite Control Melbourne: safety, same-day service, preparation, costs, and what to expect from treatment.',
    openGraph: {
      title: 'Frequently Asked Questions - Zap It Pest Control Melbourne',
      description:
        'Answers to common questions about Zap It Pest & Termite Control Melbourne: safety, same-day service, preparation, costs, and what to expect from treatment.',
      url: `${SITE_CONFIG.url}/frequently-asked-questions`,
    },
    alternates: { canonical: '/frequently-asked-questions' },
  };
}

/** Local number for display (matches Figma-style hero), e.g. 9126 0555 */
const PHONE_DISPLAY_LOCAL = SITE_CONFIG.phone.replace(/^03\s*/, '');

export default function FrequentlyAskedQuestionsPage() {
  const faqSchema = generateFAQSchema(FAQ_SCHEMA_DATA);
  const schemas = [...(faqSchema ? [faqSchema] : []), generateBreadcrumbSchema(BREADCRUMBS)];

  return (
    <>
      <JsonLd data={schemas} />

      <div className="w-full font-sans">
        {/* Figma-style page header (complements site Header): logo row + contact */}
        <header className="border-b border-[#e8e8e8] bg-white">
          <div className="mx-auto max-w-3xl px-4 py-4 md:px-6">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded border-2 border-[#131a1c] px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-[#131a1c] md:text-base"
                aria-label="Zap It Pest Control, home"
              >
                ZAPIT
              </Link>
              <a
                href={SITE_CONFIG.phoneTel}
                className="shrink-0 text-base font-bold text-[#131a1c] transition-colors hover:text-[#0d402e] md:text-lg"
              >
                {PHONE_DISPLAY_LOCAL}
              </a>
            </div>
            <p className="mt-3 text-sm text-[#414042]/90 md:mt-4 md:text-[15px]">{SITE_CONFIG.tagline}</p>
          </div>
        </header>

        <div className="bg-[#f9f9f9] pb-28 md:pb-32">
          <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10 lg:py-12">
            <h1 className="text-[1.75rem] font-bold leading-tight text-[#131a1c] md:text-3xl lg:text-[2rem]">
              Frequently asked questions
            </h1>

            <div className="mt-5 border-b border-[#e8e8e8] pb-5 md:mt-6">
              <p className="text-[15px] font-medium leading-snug text-[#131a1c] md:text-base">
                {PEST_TYPES_INTRO.question}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-[#414042] md:text-[15px] md:leading-[1.65]">
                {PEST_TYPES_INTRO.answer}
              </p>
            </div>

            <FaqPageAccordion faqs={FAQ_ITEMS} />
          </div>
        </div>
      </div>
    </>
  );
}
