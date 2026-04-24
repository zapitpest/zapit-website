'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import type { FAQ } from '@/types';

type FaqPageAccordionProps = {
  faqs: FAQ[];
};

export default function FaqPageAccordion({ faqs }: FaqPageAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="border-t border-[#e8e8e8]">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-[#e8e8e8]">
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:bg-black/[0.02] md:py-5"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              id={`faq-trigger-${index}`}
            >
              <span className="flex-1 text-[15px] font-medium leading-snug text-[#131a1c] md:text-base">
                {item.question}
              </span>
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-[#131a1c]" aria-hidden>
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
                <p className="pb-4 pr-10 text-[14px] leading-relaxed text-[#414042] md:pb-5 md:text-[15px] md:leading-[1.6]">
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
