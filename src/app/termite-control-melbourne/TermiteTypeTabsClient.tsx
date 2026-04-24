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
      {/* Tab buttons */}
      <div className="flex w-full overflow-x-auto border-b border-[#e5e5e5] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {types.map((t, idx) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(idx)}
            className={`shrink-0 border-r border-[#e5e5e5] px-4 py-3 text-center text-[12px] font-semibold leading-tight transition-colors last:border-r-0 sm:px-5 sm:text-[13px] ${
              active === idx
                ? 'bg-[#1cdc38] text-[#131a1c]'
                : 'bg-white text-[#414042] hover:bg-[#1cdc38]/10'
            }`}
            style={{ width: `${100 / types.length}%`, minWidth: '100px' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="grid grid-cols-1 gap-6 p-5 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:items-center">
        <div>
          <h3 className="mb-3 text-[18px] font-bold leading-[1.2] text-[#131a1c] sm:text-[20px]">{tab.heading}</h3>
          <p className="text-[14px] leading-[1.7] text-[#414042] sm:text-[15px]">{tab.copy}</p>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
          <Image src={tab.img} alt={tab.heading} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>
    </div>
  );
}
