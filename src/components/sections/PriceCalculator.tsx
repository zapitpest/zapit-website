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

function getDiscount(count: number): number {
  if (count >= 3) return 0.275;
  if (count >= 2) return 0.225;
  return 0;
}

interface SelectedItem {
  treatment: Treatment;
  id: string;
}

export default function PriceCalculator() {
  const [postcode, setPostcode] = useState('');
  const [selectedName, setSelectedName] = useState(TREATMENT_NAMES[0]);
  const [incGst, setIncGst] = useState(false);
  const [cart, setCart] = useState<SelectedItem[]>([]);

  const propertyOptions = useMemo(() => {
    return TREATMENTS.filter(t => t.name === selectedName);
  }, [selectedName]);

  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>('All');

  const handleAdd = () => {
    const match = TREATMENTS.find(
      t => t.name === selectedName && t.propertyType === (propertyOptions.length > 1 ? selectedPropertyType : propertyOptions[0].propertyType)
    );
    if (!match) return;
    setCart(prev => [...prev, { treatment: match, id: `${Date.now()}-${Math.random()}` }]);
  };

  const handleRemove = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const discount = getDiscount(cart.length);
  const subtotal = cart.reduce((sum, item) => sum + item.treatment.price, 0);
  const discountAmount = subtotal * discount;
  const afterDiscount = subtotal - discountAmount;
  const gst = incGst ? afterDiscount * 0.1 : 0;
  const total = afterDiscount + gst;

  return (
    <section className="py-16 lg:py-20 bg-white" aria-label="Residential price calculator">
      <div className="container mx-auto px-4 max-w-2xl">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#3fa535] mb-2">
          Residential Pricing
        </p>
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#131a1c] mb-8 italic">
          Residential price calculator
        </h2>

        <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 md:p-8 shadow-sm">
          <div className="relative">
            {/* Save 20% badge */}
            <div className="absolute -top-2 right-0 md:-right-2">
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#3fa535] text-white text-center leading-tight">
                <span className="text-[10px] font-medium">Save</span>
                <span className="text-lg font-bold">20%</span>
                <span className="text-[8px] leading-[1]">when booking<br/>multiple</span>
              </div>
            </div>

            {/* Postcode */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#131a1c] mb-1">
                Postcode <span className="text-[#3fa535]">*</span>
              </label>
              <input
                type="text"
                value={postcode}
                onChange={e => setPostcode(e.target.value)}
                placeholder="e.g. 3081"
                className="w-full rounded-full border border-[#e5e5e5] px-4 py-3 text-sm text-[#414042] placeholder:text-gray-400 focus:border-[#3fa535] focus:outline-none focus:ring-1 focus:ring-[#3fa535]"
                maxLength={4}
              />
            </div>

            {/* Treatment type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#131a1c] mb-1">
                Treatment type <span className="text-[#3fa535]">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <select
                    value={selectedName}
                    onChange={e => {
                      setSelectedName(e.target.value);
                      const opts = TREATMENTS.filter(t => t.name === e.target.value);
                      if (opts.length === 1) setSelectedPropertyType(opts[0].propertyType);
                      else setSelectedPropertyType(opts[0].propertyType);
                    }}
                    className="w-full rounded-full border border-[#3fa535] px-4 py-3 text-sm text-[#414042] focus:outline-none focus:ring-1 focus:ring-[#3fa535] appearance-none bg-white"
                  >
                    {TREATMENT_NAMES.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="rounded-lg bg-[#3fa535] px-5 py-3 text-sm font-bold text-white hover:bg-[#0d402e] transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Property type (if multiple options) */}
            {propertyOptions.length > 1 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#131a1c] mb-1">Property type</label>
                <select
                  value={selectedPropertyType}
                  onChange={e => setSelectedPropertyType(e.target.value as PropertyType)}
                  className="w-full rounded-full border border-[#e5e5e5] px-4 py-3 text-sm text-[#414042] focus:border-[#3fa535] focus:outline-none focus:ring-1 focus:ring-[#3fa535] appearance-none bg-white"
                >
                  {propertyOptions.map(opt => (
                    <option key={opt.propertyType} value={opt.propertyType}>{opt.propertyType}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Cart / Estimate */}
          <div className="mt-4 rounded-xl border border-[#e5e5e5] p-4 min-h-[60px]">
            {cart.length === 0 ? (
              <p className="text-center text-sm text-gray-400 italic">
                Add treatments above to see your price estimate
              </p>
            ) : (
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-[#414042]">
                      {item.treatment.name}
                      {item.treatment.propertyType !== 'All' && (
                        <span className="text-gray-400 ml-1">({item.treatment.propertyType})</span>
                      )}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-[#131a1c]">${item.treatment.price.toFixed(2)}</span>
                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 text-xs"
                        aria-label={`Remove ${item.treatment.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                {discount > 0 && (
                  <div className="flex items-center justify-between border-t border-[#e5e5e5] pt-2 text-sm text-[#3fa535]">
                    <span>Discount ({(discount * 100).toFixed(1)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* GST toggle */}
                <div className="flex items-center justify-between border-t border-[#e5e5e5] pt-2">
                  <label className="flex items-center gap-2 text-sm text-[#414042] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={incGst}
                      onChange={e => setIncGst(e.target.checked)}
                      className="accent-[#3fa535]"
                    />
                    Include GST (10%)
                  </label>
                  {incGst && <span className="text-sm text-[#414042]">+${gst.toFixed(2)}</span>}
                </div>

                <div className="flex items-center justify-between border-t border-[#e5e5e5] pt-2 text-base font-bold text-[#131a1c]">
                  <span>Estimated total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href={SITE_CONFIG.phoneTel}
              className="flex items-center justify-center rounded-full border-2 border-[#131a1c] px-4 py-3 text-sm font-bold text-[#131a1c] transition-colors hover:bg-[#131a1c] hover:text-white"
            >
              Enquire
            </a>
            <a
              href={SITE_CONFIG.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full bg-[#3fa535] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0d402e]"
            >
              Book online
            </a>
          </div>

          <p className="mt-3 text-xs text-gray-400">
            <span className="text-[#3fa535]">*</span>required fields. Prices indicative. Final price confirmed before work begins.
          </p>
        </div>
      </div>
    </section>
  );
}
