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
    <div className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white">
      {/* Content: text left, image right */}
      <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:gap-10 lg:items-center">
        <div className="min-w-0">
          <h3 className="mb-4 text-[18px] font-bold leading-[1.3] text-[#131a1c] sm:text-[20px]">{tab.heading}</h3>
          <p className="text-[14px] leading-[1.8] text-[#414042] sm:text-[15px]">{tab.copy}</p>
        </div>
        <div className="relative mx-auto w-full max-w-[260px] shrink-0 overflow-hidden rounded-xl lg:mx-0">
          <Image
            src={tab.img}
            alt={tab.heading}
            width={260}
            height={200}
            className="h-auto w-full object-cover"
            sizes="(min-width: 1024px) 260px, 100vw"
          />
        </div>
      </div>

      {/* Tab buttons at bottom — full-width row */}
      <div className="flex w-full border-t border-[#e5e5e5] bg-[#f8f5f2]">
        {types.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(idx)}
            className={`flex-1 px-2 py-3.5 text-center text-[11px] font-bold leading-tight transition-all sm:text-[12px] md:text-[13px] ${
              active === idx
                ? 'rounded-lg bg-[#1cdc38] text-white'
                : 'text-[#131a1c] hover:bg-[#1cdc38]/10'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
