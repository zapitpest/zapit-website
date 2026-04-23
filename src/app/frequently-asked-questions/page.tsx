import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { SITE_CONFIG, HOMEPAGE_FAQS } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import type { FAQ, BreadcrumbItem } from '@/types';
import FAQAccordion from '@/components/sections/FAQAccordion';

const BREADCRUMBS: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Frequently Asked Questions', href: '/frequently-asked-questions' },
];

const ADDITIONAL_FAQS: FAQ[] = [
  {
    question: 'Do you service all Melbourne suburbs?',
    answer:
      'Yes, Zap It covers all Melbourne suburbs including inner city, north, south east, east, and western suburbs.',
  },
  {
    question: 'Do you offer same-day service?',
    answer:
      "Yes, we offer same-day emergency pest control across Melbourne. Call us and we'll be there within 2 hours.",
  },
  {
    question: 'What qualifications do your technicians have?',
    answer:
      'All our technicians are fully licensed by the Victorian DHHS and hold relevant pest management certifications.',
  },
  {
    question: 'Do you provide warranties?',
    answer:
      "Yes, we offer warranties on our treatments. If pests return within the warranty period, we'll re-treat at no extra cost.",
  },
];

const ALL_FAQS: FAQ[] = [
  ...HOMEPAGE_FAQS.map((f) => ({ question: f.question, answer: f.answer })),
  ...ADDITIONAL_FAQS,
];

export function generateMetadata(): Metadata {
  return {
    title: {
      absolute: 'Frequently Asked Questions - Zap It Pest Control Melbourne',
    },
    description:
      'If you have any question or confusion learn FAQ about Zap It Pest & Termite Control Melbourne before hiring us for any pest control service.',
    openGraph: {
      title: 'Frequently Asked Questions - Zap It Pest Control Melbourne',
      description:
        'If you have any question or confusion learn FAQ about Zap It Pest & Termite Control Melbourne before hiring us for any pest control service.',
      url: `${SITE_CONFIG.url}/frequently-asked-questions`,
    },
    alternates: { canonical: '/frequently-asked-questions' },
  };
}

export default function FrequentlyAskedQuestionsPage() {
  const faqSchema = generateFAQSchema(ALL_FAQS);
  const schemas = [...(faqSchema ? [faqSchema] : []), generateBreadcrumbSchema(BREADCRUMBS)];

  return (
    <>
      <JsonLd data={schemas} />

      <section className="relative bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero/pest-treatment-melbourne.webp')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4 py-14 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              Clear answers about pricing, safety, coverage, and how Zap It works—before you book.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={SITE_CONFIG.phoneTel}
                className="inline-flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg"
              >
                <Phone className="h-5 w-5" />
                {SITE_CONFIG.phone}
              </Link>
              <Link
                href={SITE_CONFIG.booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors border border-white/20"
              >
                Book online
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={ALL_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
