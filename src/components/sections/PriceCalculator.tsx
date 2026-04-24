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
    <section className="bg-white py-10 sm:py-12" aria-label="Residential price calculator">
      <div className="mx-auto max-w-2xl px-5 sm:px-6">
        <h2 className="mb-6 text-[20px] font-bold italic leading-snug text-[#131a1c] sm:text-[22px]">
          Residential price calculator
        </h2>

        <div className="relative rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-sm sm:p-7">
          {/* Save 20% floating badge — top-right, matches Figma dark circle */}
          <div className="absolute -top-3 right-4 sm:right-6">
            <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full bg-[#0d402e] text-center text-white shadow-lg">
              <span className="text-[9px] font-medium leading-none">Save</span>
              <span className="text-[22px] font-black leading-tight">20%</span>
              <span className="px-1 text-[7.5px] leading-[1.15]">
                For same day<br />multiple treatments
              </span>
            </div>
          </div>

          {/* Postcode */}
          <div className="mb-4 pr-16">
            <label className="mb-1.5 block text-sm font-semibold text-[#131a1c]">
              Postcode<span className="ml-0.5 text-[#3fa535]">*</span>
            </label>
            <input
              type="text"
              value={postcode}
              onChange={e => setPostcode(e.target.value)}
              placeholder="e.g. 3081"
              className="w-full rounded-full border border-[#e5e5e5] px-4 py-2.5 text-sm text-[#414042] placeholder:text-gray-400 focus:border-[#3fa535] focus:outline-none focus:ring-1 focus:ring-[#3fa535]"
              maxLength={4}
            />
          </div>

          {/* Treatment type + add button */}
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-semibold text-[#131a1c]">
              Treatment type<span className="ml-0.5 text-[#3fa535]">*</span>
            </label>
            <div className="flex items-center gap-2">
              <select
                value={selectedName}
                onChange={e => {
                  setSelectedName(e.target.value);
                  const opts = TREATMENTS.filter(t => t.name === e.target.value);
                  setSelectedPropertyType(opts[0].propertyType);
                }}
                className="flex-1 rounded-full border border-[#3fa535] bg-white px-4 py-2.5 text-sm text-[#414042] appearance-none focus:outline-none focus:ring-1 focus:ring-[#3fa535]"
              >
                {TREATMENT_NAMES.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              {/* "+" circle button — matches Figma */}
              <button
                type="button"
                onClick={handleAdd}
                aria-label="Add treatment"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#3fa535] text-xl font-bold text-[#3fa535] transition-colors hover:bg-[#3fa535] hover:text-white"
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
                className="w-full rounded-full border border-[#e5e5e5] bg-white px-4 py-2.5 text-sm text-[#414042] appearance-none focus:border-[#3fa535] focus:outline-none focus:ring-1 focus:ring-[#3fa535]"
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
            <div className="my-2 space-y-2 rounded-xl border border-[#e5e5e5] px-4 py-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-[#414042]">
                    {item.treatment.name}
                    {item.treatment.propertyType !== 'All' && (
                      <span className="ml-1 text-xs text-gray-400">({item.treatment.propertyType})</span>
                    )}
                  </span>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="font-semibold text-[#131a1c]">{fmtPrice(item.treatment.price)}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 hover:bg-red-100 hover:text-red-500"
                      aria-label={`Remove ${item.treatment.name}`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 20% saving message — matches Figma "20% saving activated. You've save $184!" */}
          {discount > 0 && (
            <p className="mb-3 text-sm font-medium text-[#3fa535]">
              20% saving activated. You&apos;ve save <strong>${discountAmount}</strong>!
            </p>
          )}

          {/* "$XXX GST inc." total button — matches Figma large dark pill */}
          <a
            href={SITE_CONFIG.phoneTel}
            className={`mt-3 flex w-full items-center justify-center rounded-full py-4 text-[17px] font-bold text-white shadow-md transition-colors ${
              cart.length > 0
                ? 'bg-[#131a1c] hover:bg-[#0d402e]'
                : 'pointer-events-none bg-[#9ca3af]'
            }`}
          >
            {cart.length > 0 ? `$${total} GST inc.` : 'Build your quote above'}
          </a>

          <p className="mt-2 text-xs text-gray-400">
            <span className="text-[#3fa535]">*</span>required fields
          </p>

          {/* "Call now!" italic green text link — matches Figma */}
          <a
            href={SITE_CONFIG.phoneTel}
            className="mt-1 block text-center text-[16px] font-bold italic text-[#3fa535] hover:underline"
          >
            Call now!
          </a>
        </div>
      </div>
    </section>
  );
}
