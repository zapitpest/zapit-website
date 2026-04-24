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
  { name: 'Ant Treatment', propertyType: 'All', price: 239, duration: 45 },
  { name: 'Bed Bugs', propertyType: 'All', price: 450, duration: 60 },
  { name: 'Bird Control', propertyType: 'Single-story', price: 450, duration: 30 },
  { name: 'Bird Control', propertyType: 'Double-story', price: 650, duration: 60 },
  { name: 'Bird Nest Removal', propertyType: 'Single-story', price: 450, duration: 30 },
  { name: 'Bird Nest Removal', propertyType: 'Double-story', price: 650, duration: 60 },
  { name: 'Clothes & Carpet Moth Treatment', propertyType: 'All', price: 385, duration: 90 },
  { name: 'Cobweb Removal (Extra Service)', propertyType: 'Single-story', price: 125, duration: 30 },
  { name: 'Cobweb Removal (Extra Service)', propertyType: 'Double-story', price: 250, duration: 60 },
  { name: 'Fleas Treatment', propertyType: 'All', price: 385, duration: 45 },
  { name: 'General Inspection', propertyType: 'All', price: 100, duration: 30 },
  { name: 'German Cockroach Treatment', propertyType: 'All', price: 249.99, duration: 60 },
  { name: 'Mice & Rat Treatment', propertyType: 'All', price: 200, duration: 40 },
  { name: 'Mosquitos, Flies Treatment', propertyType: 'All', price: 385, duration: 60 },
  { name: 'Possum Treatment', propertyType: 'Single-story', price: 450, duration: 30 },
  { name: 'Possum Treatment', propertyType: 'Double-story', price: 630, duration: 60 },
  { name: 'Rodent Removal', propertyType: 'All', price: 380, duration: 30 },
  { name: 'Silverfish Treatment', propertyType: 'All', price: 299.99, duration: 40 },
  { name: 'Specialised Ant Elimination', propertyType: 'All', price: 450, duration: 60 },
  { name: 'Spider & General Pest Treatment', propertyType: 'Single-story', price: 290, duration: 60 },
  { name: 'Spider & General Pest Treatment', propertyType: 'Double-story', price: 335, duration: 60 },
  { name: 'Spider & General Pest Treatment', propertyType: 'Other', price: 275, duration: 60 },
  { name: 'Termite Inspections', propertyType: 'All', price: 399, duration: 120 },
  { name: 'Wasp Control', propertyType: 'All', price: 250, duration: 60 },
];

const TREATMENT_NAMES = [...new Set(TREATMENTS.map(t => t.name))].sort();

// Flat 20% discount for 2+ treatments on same day (matches Figma)
function getDiscount(count: number): number {
  return count >= 2 ? 0.20 : 0;
}

function fmtPrice(n: number): string {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

interface SelectedItem {
  treatment: Treatment;
  id: string;
}

export default function PriceCalculator() {
  const [postcode, setPostcode] = useState('');
  const [selectedName, setSelectedName] = useState(TREATMENT_NAMES[0]);
  const [cart, setCart] = useState<SelectedItem[]>([]);

  const propertyOptions = useMemo(() => {
    return TREATMENTS.filter(t => t.name === selectedName);
  }, [selectedName]);

  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>('All');

  const handleAdd = () => {
    const match = TREATMENTS.find(
      t =>
        t.name === selectedName &&
        t.propertyType === (propertyOptions.length > 1 ? selectedPropertyType : propertyOptions[0].propertyType),
    );
    if (!match) return;
    setCart(prev => [...prev, { treatment: match, id: `${Date.now()}-${Math.random()}` }]);
  };

  const handleRemove = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const discount = getDiscount(cart.length);
  const subtotal = cart.reduce((sum, item) => sum + item.treatment.price, 0);
  const discountAmount = Math.round(subtotal * discount);
  const total = Math.round(subtotal - discountAmount);

  return (
    <section className="bg-[#f8f5f2] py-10 sm:py-12" aria-label="Residential price calculator">
      <div className="mx-auto max-w-2xl px-5 sm:px-6">
        <h2 className="mb-6 text-center text-[24px] font-bold leading-snug text-[#414042] sm:text-[28px]">
          Residential price calculator
        </h2>

        <div className="relative rounded-2xl border border-[#d9d9d9] bg-white p-5 shadow-sm sm:p-7">
          {/* Save 20% floating badge — top-right, Figma saev20forcalculator.svg */}
          <div className="absolute -top-4 right-3 sm:right-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/icons/saev20forcalculator.svg"
              alt="Save 20% for same day multiple treatments"
              className="h-auto w-[100px] shadow-lg sm:w-[110px]"
            />
          </div>

          {/* Postcode — SHORT field per Figma (half width), side by side on wider screens */}
          <div className="mb-4 pr-24">
            <label className="mb-1.5 block text-sm font-semibold text-[#131a1c]">
              Postcode<span className="ml-0.5 text-[#1cdc38]">*</span>
            </label>
            <input
              type="text"
              value={postcode}
              onChange={e => setPostcode(e.target.value)}
              placeholder=""
              className="w-[160px] rounded-md border border-[#c8c8c8] bg-[#f8f5f2] px-3 py-2 text-sm text-[#414042] placeholder:text-gray-400 focus:border-[#1cdc38] focus:outline-none focus:ring-1 focus:ring-[#1cdc38]"
              maxLength={4}
            />
          </div>

          {/* Treatment type + add button */}
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-semibold text-[#131a1c]">
              Treatment type<span className="ml-0.5 text-[#1cdc38]">*</span>
            </label>
            <div className="flex items-center gap-2">
              <select
                value={selectedName}
                onChange={e => {
                  setSelectedName(e.target.value);
                  const opts = TREATMENTS.filter(t => t.name === e.target.value);
                  setSelectedPropertyType(opts[0].propertyType);
                }}
                className="flex-1 rounded-md border border-[#c8c8c8] bg-[#f8f5f2] px-3 py-2.5 text-sm text-[#414042] appearance-none focus:outline-none focus:border-[#1cdc38] focus:ring-1 focus:ring-[#1cdc38]"
              >
                {TREATMENT_NAMES.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              {/* "+" button per Figma — two crossing lines (not circle) */}
              <button
                type="button"
                onClick={handleAdd}
                aria-label="Add treatment"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#414042] text-[22px] font-bold text-[#414042] leading-none transition-colors hover:bg-[#1cdc38] hover:border-[#1cdc38]"
              >
                +
              </button>
            </div>
          </div>

          {/* Property type (only when multiple options exist) */}
          {propertyOptions.length > 1 && (
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-semibold text-[#131a1c]">Property type</label>
              <select
                value={selectedPropertyType}
                onChange={e => setSelectedPropertyType(e.target.value as PropertyType)}
                className="w-full rounded-full border border-[#c8c8c8] bg-[#f8f5f2] px-4 py-2.5 text-sm text-[#414042] appearance-none focus:border-[#1cdc38] focus:outline-none focus:ring-1 focus:ring-[#1cdc38]"
              >
                {propertyOptions.map(opt => (
                  <option key={opt.propertyType} value={opt.propertyType}>{opt.propertyType}</option>
                ))}
              </select>
            </div>
          )}

          {/* Cart items */}
          {cart.length === 0 ? (
            <div className="my-2 rounded-xl border border-dashed border-[#e5e5e5] px-4 py-3 text-center text-sm italic text-gray-400">
              Add treatments above to see your price estimate
            </div>
          ) : (
            <div className="my-2 space-y-1 py-1">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-2 text-[14px]">
                  <span className="text-[#414042]">
                    {item.treatment.name}
                    {item.treatment.propertyType !== 'All' && (
                      <span className="ml-1 text-xs text-gray-400">({item.treatment.propertyType})</span>
                    )}
                  </span>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="font-semibold text-[#414042]">{fmtPrice(item.treatment.price)}</span>
                    {/* Figma × close — small diagonal cross per Group 352/353/354 */}
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="flex h-5 w-5 items-center justify-center text-[14px] font-bold text-[#414042] hover:text-red-500"
                      aria-label={`Remove ${item.treatment.name}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 20% saving message — Figma: italic, #414042, centered */}
          {discount > 0 && (
            <p className="mb-3 text-center text-[14px] italic text-[#414042]">
              20% saving activated.<br />
              <strong>You&apos;ve saved ${discountAmount}!</strong>
            </p>
          )}

          {/* "$XXX GST inc." total button — Figma: #F8F5F2 bg, 2px solid #828282 border, dark text */}
          {cart.length > 0 ? (
            <div className="mt-4 flex items-center gap-3">
              <a
                href={SITE_CONFIG.phoneTel}
                className="flex flex-1 items-center justify-center rounded-full border-2 border-[#828282] bg-[#f8f5f2] py-3.5 text-[20px] font-bold text-[#414042] shadow-sm transition-colors hover:bg-[#e8e5e2]"
              >
                ${total} GST inc.
              </a>
              <a
                href={SITE_CONFIG.phoneTel}
                className="shrink-0 text-[22px] font-black italic text-[#1cdc38] hover:underline"
              >
                Call now!
              </a>
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-center rounded-full border-2 border-[#e5e5e5] bg-[#f0eded] py-3.5">
              <span className="text-[16px] text-gray-400">Build your quote above</span>
            </div>
          )}

          <p className="mt-2 text-xs text-gray-400">
            <span className="text-[#1cdc38]">*</span>required fields
          </p>
        </div>
      </div>
    </section>
  );
}
