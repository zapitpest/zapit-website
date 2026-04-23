'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TREATMENTS, PROPERTY_TYPES, calculatePrice, type PropertyType } from '@/lib/pricing-data';
import { SITE_CONFIG } from '@/lib/constants';
import { Trash2 } from 'lucide-react';

export default function PriceCalculatorPreview() {
  const [selected, setSelected] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);

  const needsPropertyType = selected.some((s) => {
    const t = TREATMENTS.find((tr) => tr.name === s);
    return t?.requiresPropertyType;
  });

  const { discount, discountedPrice, totalDuration } = calculatePrice(
    selected,
    propertyType,
  );

  const addTreatment = () => {
    if (currentSelection && !selected.includes(currentSelection)) {
      setSelected([...selected, currentSelection]);
      setCurrentSelection('');
    }
  };

  const removeTreatment = (name: string) => {
    setSelected(selected.filter((s) => s !== name));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-zapit-border p-6 md:p-8">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-2xl font-bold text-zapit-dark italic">
          Residential price calculator
        </h3>
        {selected.length >= 2 && (
          <div className="bg-zapit-green text-white text-xs font-bold rounded-full h-16 w-16 flex flex-col items-center justify-center text-center leading-tight">
            <span>Save</span>
            <span className="text-base">{selected.length >= 3 ? '27.5%' : '22.5%'}</span>
            <span className="text-[10px]">when booking multiple</span>
          </div>
        )}
      </div>

      {/* Treatment selector */}
      <div className="mb-4">
        <label htmlFor="treatment" className="block text-sm font-medium text-zapit-dark mb-1">
          Treatment type <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <select
            id="treatment"
            value={currentSelection}
            onChange={(e) => setCurrentSelection(e.target.value)}
            className="flex-1 border border-zapit-green rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zapit-green"
          >
            <option value="">Select Treatment Type</option>
            {TREATMENTS.filter((t) => !selected.includes(t.name)).map((t) => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>
          <button
            onClick={addTreatment}
            disabled={!currentSelection}
            className="bg-zapit-green hover:bg-zapit-green-dark disabled:bg-gray-300 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Property type (when needed) */}
      {needsPropertyType && (
        <div className="mb-4">
          <label htmlFor="propertyType" className="block text-sm font-medium text-zapit-dark mb-1">
            Property type <span className="text-red-500">*</span>
          </label>
          <select
            id="propertyType"
            value={propertyType || ''}
            onChange={(e) => setPropertyType(e.target.value as PropertyType)}
            className="w-full border border-zapit-green rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zapit-green"
          >
            <option value="">Select Property Type</option>
            {PROPERTY_TYPES.map((pt) => (
              <option key={pt} value={pt}>{pt}</option>
            ))}
          </select>
        </div>
      )}

      {/* Selected treatments */}
      {selected.length > 0 ? (
        <div className="border border-zapit-border rounded-xl p-4 mb-6 space-y-2">
          {selected.map((name) => {
            const t = TREATMENTS.find((tr) => tr.name === name);
            return (
              <div key={name} className="flex items-center justify-between">
                <span className="text-sm text-zapit-dark">{name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-zapit-dark">
                    ${t?.basePrice.toFixed(2)}
                  </span>
                  <button onClick={() => removeTreatment(name)} className="text-red-400 hover:text-red-600" aria-label={`Remove ${name}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
          {discount > 0 && (
            <div className="flex items-center justify-between pt-2 border-t border-zapit-border text-zapit-green font-medium text-sm">
              <span>Multi-booking discount</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 border-t border-zapit-border">
            <span className="font-bold text-zapit-dark">Total estimate</span>
            <span className="text-xl font-bold text-zapit-green">${discountedPrice.toFixed(2)}</span>
          </div>
          {totalDuration > 0 && (
            <p className="text-xs text-gray-500">Estimated duration: ~{totalDuration} minutes</p>
          )}
        </div>
      ) : (
        <div className="border border-zapit-border rounded-xl p-8 mb-6 text-center">
          <p className="text-sm text-gray-400 italic">
            Add treatments above to see your price estimate
          </p>
        </div>
      )}

      {/* CTA buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href={`mailto:${SITE_CONFIG.email}?subject=Pest Control Enquiry`}
          className="flex items-center justify-center gap-2 border-2 border-zapit-dark text-zapit-dark font-semibold py-3 rounded-full hover:bg-zapit-dark hover:text-white transition-colors text-sm"
        >
          Enquire
        </Link>
        <Link
          href={SITE_CONFIG.booking.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-semibold py-3 rounded-full transition-colors text-sm"
        >
          Book online
        </Link>
      </div>

      <p className="text-xs text-red-500 mt-3">*required fields</p>
    </div>
  );
}
