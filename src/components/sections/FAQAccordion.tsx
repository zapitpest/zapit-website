'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  readonly question: string;
  readonly answer: string;
}

export default function FAQAccordion({ faqs }: { faqs: readonly FAQ[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={faq.question} className="border border-zapit-border rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="flex items-center justify-between w-full text-left p-5 bg-white hover:bg-zapit-light transition-colors"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-zapit-dark pr-4">{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-zapit-green flex-shrink-0 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <p className="px-5 pb-5 text-zapit-text leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
