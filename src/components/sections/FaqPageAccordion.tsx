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
              className="flex w-full items-start justify-between gap-4 pb-1 pt-4 text-left transition-colors hover:bg-black/[0.02] md:pt-5"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              id={`faq-trigger-${index}`}
            >
              {/* Question — slightly bolder (semibold) per Figma feedback */}
              <span className="flex-1 text-[15px] font-semibold leading-snug text-[#414042] sm:text-[16px]">
                {item.question}
              </span>
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center" aria-hidden style={{ color: '#414042' }}>
                {isOpen ? <Minus className="h-7 w-7" strokeWidth={2.5} /> : <Plus className="h-7 w-7" strokeWidth={2.5} />}
              </span>
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              {/* Answer sits close to its question — tight top spacing, normal bottom */}
              <div className="min-h-0 overflow-hidden">
                <p className="pb-4 pr-10 text-[14px] leading-snug text-[#414042] md:pb-5 md:text-[15px]">
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
