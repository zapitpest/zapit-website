'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  readonly question: string;
  readonly answer: string;
}

export default function TermiteFAQClient({ faqs }: { faqs: readonly FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="border-b border-[#e5e5e5] last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex min-h-[52px] w-full items-center gap-3 bg-transparent py-4 text-left sm:py-5"
              aria-expanded={isOpen}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#1cdc38]">
                {isOpen ? <Minus className="h-4 w-4" strokeWidth={2.5} /> : <Plus className="h-4 w-4" strokeWidth={2.5} />}
              </span>
              <span className="text-[15px] font-semibold leading-[1.2] text-[#131a1c] sm:text-[16px]">
                {faq.question}
              </span>
            </button>
            {isOpen && (
              <div className="mb-5 ml-9 rounded-xl border border-[#e5e5e5] bg-[#f8f5f2] p-4 sm:p-5">
                <p className="text-[14px] leading-[1.65] text-[#414042] sm:text-[15px]">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
