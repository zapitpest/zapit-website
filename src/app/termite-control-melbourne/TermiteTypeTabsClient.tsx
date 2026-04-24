'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TermiteType {
  readonly id: string;
  readonly label: string;
  readonly heading: string;
  readonly copy: string;
  readonly img: string;
}

export default function TermiteTypeTabsClient({ types }: { types: readonly TermiteType[] }) {
  const [active, setActive] = useState(0);
  const tab = types[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#f8f5f2]">
      {/* Content first: text left, image right (smaller) */}
      <div className="grid grid-cols-1 items-start gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:gap-10 lg:items-center">
        <div className="min-w-0">
          <h3 className="mb-3 text-[18px] font-bold leading-[1.2] text-[#131a1c] sm:text-[20px]">{tab.heading}</h3>
          <p className="text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">{tab.copy}</p>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] shrink-0 overflow-hidden rounded-xl shadow-md lg:mx-0">
          <Image
            src={tab.img}
            alt={tab.heading}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 280px, 100vw"
          />
        </div>
      </div>

      {/* Tab buttons at bottom */}
      <div className="flex w-full flex-wrap justify-center gap-0 border-t border-[#e5e5e5] bg-white px-1 py-1 sm:px-2">
        {types.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(idx)}
            className={`shrink-0 min-w-0 border border-transparent px-2 py-2.5 text-center text-[11px] font-semibold leading-tight transition-colors sm:px-3 sm:text-[12px] md:text-[13px] ${
              active === idx
                ? 'border-[#1cdc38] bg-[#1cdc38] text-[#131a1c]'
                : 'text-[#414042] hover:bg-[#1cdc38]/10'
            }`}
            style={{ flex: '1 1 0', minWidth: 'min(100px, 100%)' }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
