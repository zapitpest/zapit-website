'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import type { FAQ } from '@/types';

type FaqPageAccordionProps = {
  faqs: FAQ[];
  /** Index of panel open on first render (e.g. 0 to match Figma first FAQ open). */
  defaultOpenIndex?: number | null;
};

export default function FaqPageAccordion({ faqs, defaultOpenIndex = null }: FaqPageAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex ?? null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-[#c8c8c8]">
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:bg-black/[0.02] md:py-5"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              id={`faq-trigger-${index}`}
            >
              <span className="flex-1 text-sm font-medium leading-snug text-[#414042] sm:text-[15px]">
                {item.question}
              </span>
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-[#414042]" aria-hidden>
                {isOpen ? <Minus className="h-5 w-5" strokeWidth={2} /> : <Plus className="h-5 w-5" strokeWidth={2} />}
              </span>
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="pb-4 pr-10 text-sm leading-relaxed text-[#414042] md:pb-5 md:leading-[1.6]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
