import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import type { FAQ, BreadcrumbItem } from '@/types';
import FaqPageAccordion from '@/components/sections/FaqPageAccordion';
import PageInfoFooterBlock from '@/components/layout/PageInfoFooterBlock';

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Frequently Asked Questions', href: '/frequently-asked-questions' },
];

const FAQ_ITEMS: FAQ[] = [
  {
    question: 'What type of pests do you treat?',
    answer:
      'We treat all types of pests, including, ants, termites, rodents, possum cockroaches, spiders, fleas, bedbugs, silverfish, and more.',
  },
  {
    question: 'Do you provide same day services?',
    answer:
      'We offer same-day service across Melbourne whenever scheduling allows, including for many urgent situations. Call us early for the best chance of a same-day visit.',
  },
  {
    question: 'Will I leave the house if I book a general pest spray?',
    answer:
      'In most cases you can remain at home during a general pest treatment. We use careful application methods, mark treated areas, and let you know any short period to avoid specific rooms while products settle.',
  },
  {
    question: 'Are your pest control treatments safe for whole family and pets?',
    answer:
      'We choose products and application patterns designed for household safety when used as directed, including family members and pets. We explain simple precautions such as keeping pets off treated surfaces until dry.',
  },
  {
    question: 'How much time is required for pest control?',
    answer:
      'Most residential visits take between 45 minutes and two hours, depending on property size, access, and the pest program.',
  },
  {
    question: 'What preparation I will do before pest treatment?',
    answer:
      'Light preparation helps: clear food-prep surfaces, move items slightly away from skirting where possible, and note any pest hotspots you have seen.',
  },
  {
    question: 'Is pest control effective immediately?',
    answer:
      'Many pests begin reacting soon after treatment, while the full effect can build over the following days as the program works.',
  },
  {
    question: 'Do you require some advance payments?',
    answer:
      'Payment expectations are agreed when you book or before larger programs begin, with standard residential jobs often settled on the day.',
  },
  {
    question: 'How do I know if I have a pest problem?',
    answer:
      'Common signs include droppings, shed skins, damage to timber or food packaging, night-time noises in roof voids, and unexplained bites or rashes.',
  },
  {
    question: 'How many pest control technicians do you send for a job?',
    answer:
      'Most residential and standard commercial visits are completed by one fully licensed technician. For larger properties we may schedule additional technicians.',
  },
  {
    question: 'How much do pest control services cost?',
    answer:
      'Price reflects property size, pest type, and how much of the home or business needs work. We provide clear quotes before starting.',
  },
  {
    question: 'How often should I schedule pest control services?',
    answer:
      'Many Melbourne homes benefit from an annual general pest plan, with more frequent visits if you are in a high-activity area.',
  },
  {
    question: 'Will one treatment completely eliminate pests?',
    answer:
      'A well-targeted visit can stop many infestations in their tracks, though stubborn or widespread pests may need follow-up or an integrated program.',
  },
  {
    question: 'General information',
    answer:
      'Zap It Pest & Termite Control is a licensed Melbourne team offering residential and commercial programs with a calm, no-drama approach.',
  },
  {
    question: 'How long after pest control can I go inside?',
    answer:
      'Re-entry depends on the products used and the areas treated, but many interior applications allow you to return once surfaces are dry and ventilated as we direct.',
  },
  {
    question: 'How long after pest control can I mop?',
    answer:
      'Mopping can wash away perimeter or floor-edge treatments, so we usually ask you to hold off on washing those zones for a period we will specify.',
  },
  {
    question: 'Are your pest control services guaranteed?',
    answer:
      'We stand behind our work with service commitments that are explained when you book and reflected in your paperwork.',
  },
  {
    question: 'Do you offer pest control for commercial properties?',
    answer:
      'Yes — shops, offices, food businesses, warehouses, and other commercial sites can access tailored programs and documentation that match your hours and compliance needs.',
  },
  {
    question: 'How long does pest control last?',
    answer:
      'Longevity depends on the pest, product, and environment. For many clients, a structured schedule with occasional touch-ups provides steady protection.',
  },
  {
    question: 'How to control pests in the garden?',
    answer:
      'We look at what is actually feeding or sheltering garden pests, then connect outdoor work with the rest of your property so treatments stay coherent.',
  },
  {
    question: 'How can I prevent future pest infestations?',
    answer:
      'Simple habits make a real difference: seal gaps, store food in sealed containers, keep rubbish secure, fix leaks promptly, and trim vegetation away from the building.',
  },
];

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'Frequently Asked Questions - Zap It Pest Control Melbourne' },
    description:
      'Answers to common questions about Zap It Pest & Termite Control Melbourne: safety, same-day service, preparation, costs, and what to expect from treatment.',
    openGraph: {
      title: 'Frequently Asked Questions - Zap It Pest Control Melbourne',
      description:
        'Answers to common questions about Zap It Pest & Termite Control Melbourne.',
      url: `${SITE_CONFIG.url}/frequently-asked-questions`,
    },
    alternates: { canonical: '/frequently-asked-questions' },
  };
}

export default function FrequentlyAskedQuestionsPage() {
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const schemas = [...(faqSchema ? [faqSchema] : []), generateBreadcrumbSchema(BREADCRUMBS)];

  return (
    <>
      <JsonLd data={schemas} />

      <div className="w-full bg-[#f8f5f2] font-sans">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 md:py-10">
          <h1 className="text-[22px] font-bold leading-tight text-[#414042] sm:text-[26px]">Frequently asked questions</h1>
          <div className="mt-6 border-t border-[#d9d9d9] md:mt-8">
            <FaqPageAccordion faqs={FAQ_ITEMS} defaultOpenIndex={0} />
          </div>
        </div>
      </div>

      <PageInfoFooterBlock />
    </>
  );
}
