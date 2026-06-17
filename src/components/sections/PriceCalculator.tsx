'use client';

import { useState, useMemo } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

type PropertyType = 'All' | 'Single-story' | 'Double-story' | 'Other';

interface Treatment {
  name: string;
  propertyType: PropertyType;
  price: number;
  duration: number;
}

const TREATMENTS: Treatment[] = [
  { name: 'Ant treatment', propertyType: 'All', price: 239, duration: 45 },
  { name: 'Bed Bugs', propertyType: 'All', price: 450, duration: 60 },
  { name: 'Clothes & Carpet Moth treatment', propertyType: 'All', price: 385, duration: 90 },
  { name: 'Fleas treatment', propertyType: 'All', price: 385, duration: 45 },
  { name: 'General Inspection', propertyType: 'All', price: 100, duration: 30 },
  { name: 'German Cockroach treatment', propertyType: 'All', price: 250, duration: 60 },
  { name: 'Mice & Rat treatment', propertyType: 'All', price: 200, duration: 40 },
  { name: 'Mosquitos & Flies treatment', propertyType: 'All', price: 385, duration: 60 },
  { name: 'Possum treatment', propertyType: 'Single-story', price: 450, duration: 30 },
  { name: 'Possum treatment', propertyType: 'Double-story', price: 630, duration: 60 },
  { name: 'Silverfish treatment', propertyType: 'All', price: 299, duration: 40 },
  { name: 'Specialised Ant Elimination', propertyType: 'All', price: 450, duration: 60 },
  { name: 'Spider & General Pest treatment', propertyType: 'Single-story', price: 290, duration: 60 },
  { name: 'Spider & General Pest treatment', propertyType: 'Double-story', price: 335, duration: 60 },
  { name: 'Termite Inspections', propertyType: 'All', price: 349, duration: 120 },
  { name: 'Wasp Control', propertyType: 'All', price: 250, duration: 60 },
];

const TREATMENT_NAMES = [...new Set(TREATMENTS.map((t) => t.name))].sort();

// Same-day multi-treatment discount = 10% (per client refactor brief #7).
function getDiscount(count: number): number {
  return count >= 2 ? 0.1 : 0;
}

function fmtPrice(n: number): string {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

interface SelectedItem {
  treatment: Treatment;
  id: string;
}

// Default cart per Figma: Ant + Clothes & Carpet Moth + Silverfish pre-selected.
function buildDefaultCart(): SelectedItem[] {
  const defaults = ['Ant treatment', 'Clothes & Carpet Moth treatment', 'Silverfish treatment'];
  return defaults
    .map((name, i) => {
      const t = TREATMENTS.find((x) => x.name === name);
      return t ? { treatment: t, id: `default-${i}` } : null;
    })
    .filter((x): x is SelectedItem => x !== null);
}

export default function PriceCalculator() {
  const [selectedName, setSelectedName] = useState<string>(''); // empty = "Select treatment"
  const [cart, setCart] = useState<SelectedItem[]>(buildDefaultCart);

  const propertyOptions = useMemo(() => {
    return TREATMENTS.filter((t) => t.name === selectedName);
  }, [selectedName]);

  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>('All');

  const handleAdd = () => {
    if (!selectedName) return;
    const match = TREATMENTS.find(
      (t) =>
        t.name === selectedName &&
        t.propertyType ===
          (propertyOptions.length > 1 ? selectedPropertyType : propertyOptions[0].propertyType),
    );
    if (!match) return;
    setCart((prev) => [...prev, { treatment: match, id: `${Date.now()}-${Math.random()}` }]);
  };

  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const discount = getDiscount(cart.length);
  const subtotal = cart.reduce((sum, item) => sum + item.treatment.price, 0);
  const discountAmount = Math.round(subtotal * discount);
  const total = Math.round(subtotal - discountAmount);

  return (
    <section className="bg-[#0d402e] pb-10 pt-16 sm:pb-12 sm:pt-20" aria-label="Residential price calculator">
      <div className="mx-auto max-w-[400px] px-5 sm:px-6">
        {/* Save 10% pill — compact Figma shape. Main "Save 10%" text in #828282 per client spec;
            subtitle stays dark. */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-full bg-[#1cdc38] px-7 py-2 shadow-md">
              <p className="text-center text-[24px] font-extrabold leading-none" style={{ color: '#414042' }}>
                Save 10%
              </p>
              <p className="mt-0.5 text-center text-[11px] font-medium leading-tight text-[#131a1c]/85">
                For same day multiple<br />treatments
              </p>
            </div>
          </div>

          {/* Calculator card */}
          <div className="rounded-[28px] bg-[#f8f5f2] px-6 pb-7 pt-16 shadow-sm sm:px-8 sm:pt-20">
            <h2 className="mb-5 text-[24px] font-bold leading-tight text-[#131a1c]">
              Residential price calculator
            </h2>

            {/* Treatment type label + dropdown + add button */}
            <label htmlFor="treatment-select" className="mb-2 block text-[15px] font-bold text-[#131a1c]">
              Treatment type<span className="text-[#1cdc38]">*</span>
            </label>
            <div className="mb-5 flex items-center gap-2">
              <div className="relative flex-1">
                <select
                  id="treatment-select"
                  value={selectedName}
                  onChange={(e) => {
                    setSelectedName(e.target.value);
                    const opts = TREATMENTS.filter((t) => t.name === e.target.value);
                    if (opts[0]) setSelectedPropertyType(opts[0].propertyType);
                  }}
                  className="w-full appearance-none rounded-md border border-[#828282] bg-white px-4 py-3 text-[14px] italic text-[#414042] focus:border-[#1cdc38] focus:outline-none focus:ring-1 focus:ring-[#1cdc38]"
                >
                  <option value="" disabled>
                    Select treatment
                  </option>
                  {TREATMENT_NAMES.map((name) => (
                    <option key={name} value={name} className="not-italic text-[#131a1c]">
                      {name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAdd}
                  aria-label="Add treatment"
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-[34px] font-normal leading-none text-[#131a1c] hover:text-[#1cdc38]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Property type dropdown (only when current treatment has multiple variants) */}
            {selectedName && propertyOptions.length > 1 && (
              <div className="mb-5">
                <label className="mb-2 block text-[14px] font-semibold text-[#131a1c]">Property type</label>
                <select
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value as PropertyType)}
                  className="w-full appearance-none rounded-md border border-[#828282] bg-white px-4 py-3 text-[14px] text-[#414042] focus:border-[#1cdc38] focus:outline-none focus:ring-1 focus:ring-[#1cdc38]"
                >
                  {propertyOptions.map((opt) => (
                    <option key={opt.propertyType} value={opt.propertyType}>
                      {opt.propertyType}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Selected items list */}
            {cart.length > 0 && (
              <ul className="mb-5 space-y-1.5">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 text-[14px]">
                    <span className="text-[#131a1c]">
                      {item.treatment.name}{' '}
                      <strong className="font-bold">{fmtPrice(item.treatment.price)}</strong>
                      {item.treatment.propertyType !== 'All' && (
                        <span className="ml-1 text-[12px] text-[#414042]/60">
                          ({item.treatment.propertyType})
                        </span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove ${item.treatment.name}`}
                      className="flex h-7 w-7 shrink-0 items-center justify-center text-[22px] font-medium leading-none text-[#131a1c] hover:text-red-500"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Total pill — "$831" big, "GST inc." stacked below per Figma */}
            {cart.length > 0 && (
              <div className="mb-3 flex flex-col items-center justify-center rounded-full bg-[#e5e2dc] px-8 py-3">
                <span className="text-[32px] font-extrabold leading-none text-[#131a1c]">
                  ${total}
                </span>
                <span className="mt-1 text-[14px] font-medium leading-none text-[#414042]">GST inc.</span>
              </div>
            )}

            {/* Savings pill (only shows when discount active) — width matches the total pill above */}
            {discount > 0 && (
              <div className="mb-4 w-full rounded-full bg-[#1cdc38] px-6 py-2 text-center">
                <p className="text-[14px] italic leading-tight text-[#131a1c]">10% saving activated.</p>
                <p className="text-[14px] font-bold italic leading-tight text-[#131a1c]">
                  You&apos;ve save ${discountAmount}!
                </p>
              </div>
            )}

            {/* Call now! italic green */}
            <a
              href={SITE_CONFIG.phoneTel}
              className="ml-auto block w-fit text-[28px] font-extrabold italic leading-none text-[#1cdc38] hover:underline"
            >
              Call now!
            </a>

            <p className="mt-4 text-[11px] text-[#414042]/60">
              <span className="text-[#1cdc38]">*</span>required fields
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
