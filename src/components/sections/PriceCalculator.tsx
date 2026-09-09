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

// Prices are GST INCLUSIVE and come from the approved residential price sheet
// (SOP-103 v0.3, approved 30 Aug 2026). The Square catalogue is ex GST; GST is
// added on top. Under the Australian Consumer Law single price rule, a price
// shown to a consumer must be the total payable.
//
// Services with no approved price are deliberately absent and must not be added
// back without an owner's approval: silverfish, standalone pantry moth,
// spider-only, wasp-only, double-storey possum, and anything termite.
const TREATMENTS: Treatment[] = [
  { name: 'Localised ant treatment', propertyType: 'All', price: 299, duration: 45 },
  { name: 'Bed bug treatment', propertyType: 'All', price: 495, duration: 60 },
  { name: 'Clothes and carpet moth treatment', propertyType: 'All', price: 423.5, duration: 90 },
  { name: 'Flea treatment', propertyType: 'All', price: 423.5, duration: 45 },
  { name: 'General inspection', propertyType: 'All', price: 154, duration: 30 },
  { name: 'German cockroach treatment', propertyType: 'All', price: 275, duration: 60 },
  { name: 'Mice and rat treatment', propertyType: 'All', price: 352, duration: 40 },
  { name: 'Mice and rat follow up visit', propertyType: 'All', price: 220, duration: 30 },
  { name: 'Mosquito and fly treatment', propertyType: 'All', price: 423.5, duration: 60 },
  { name: 'Possum treatment', propertyType: 'Single-story', price: 495, duration: 30 },
  { name: 'Specialised ant elimination', propertyType: 'All', price: 495, duration: 60 },
  { name: 'Spider and general pest treatment', propertyType: 'Single-story', price: 330, duration: 60 },
  { name: 'Spider and general pest treatment', propertyType: 'Double-story', price: 385, duration: 60 },
  { name: 'Wasp treatment', propertyType: 'All', price: 330, duration: 60 },
];

const TREATMENT_NAMES = [...new Set(TREATMENTS.map((t) => t.name))].sort();

function fmtPrice(n: number): string {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;
}

interface SelectedItem {
  treatment: Treatment;
  id: string;
}

export default function PriceCalculator() {
  const [selectedName, setSelectedName] = useState<string>('');
  // Starts empty. A visitor should never arrive at a total they did not build.
  const [cart, setCart] = useState<SelectedItem[]>([]);
  const [error, setError] = useState<string>('');
  const [nextId, setNextId] = useState<number>(0);

  const propertyOptions = useMemo(() => {
    return TREATMENTS.filter((t) => t.name === selectedName);
  }, [selectedName]);

  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>('All');

  const handleAdd = () => {
    if (!selectedName) {
      setError('Choose a treatment first.');
      return;
    }
    const match = TREATMENTS.find(
      (t) =>
        t.name === selectedName &&
        t.propertyType ===
          (propertyOptions.length > 1 ? selectedPropertyType : propertyOptions[0].propertyType),
    );
    if (!match) return;
    if (cart.some((item) => item.treatment.name === match.name)) {
      setError(`${match.name} is already on your list.`);
      return;
    }
    setError('');
    setCart((prev) => [...prev, { treatment: match, id: `item-${nextId}` }]);
    setNextId((n) => n + 1);
    setSelectedName('');
  };

  const handleRemove = (id: string) => {
    setError('');
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.treatment.price, 0);

  return (
    <section
      className="bg-[#0d402e] pb-10 pt-16 sm:pb-12 sm:pt-20"
      aria-label="Residential price calculator"
    >
      <div className="mx-auto max-w-[400px] px-5 sm:px-6">
        <div className="relative">
          <div className="rounded-[28px] bg-[#f8f5f2] px-6 pb-7 pt-8 shadow-sm sm:px-8 sm:pt-10">
            <h2 className="mb-2 text-[24px] font-bold leading-tight text-[#131a1c]">
              Residential price calculator
            </h2>
            <p className="mb-5 text-[14px] leading-snug text-[#414042]">
              Add the treatments you need to see the total. All prices include GST.
            </p>

            <label
              htmlFor="treatment-select"
              className="mb-2 block text-[15px] font-bold text-[#131a1c]"
            >
              Treatment type
            </label>
            <div className="mb-2 flex items-stretch gap-2">
              <select
                id="treatment-select"
                value={selectedName}
                onChange={(e) => {
                  setError('');
                  setSelectedName(e.target.value);
                  const opts = TREATMENTS.filter((t) => t.name === e.target.value);
                  if (opts[0]) setSelectedPropertyType(opts[0].propertyType);
                }}
                className="min-h-[48px] flex-1 appearance-none rounded-md border border-[#828282] bg-white px-4 py-3 text-[14px] text-[#414042] focus:border-[#1cdc38] focus:outline-none focus:ring-2 focus:ring-[#1cdc38]"
              >
                <option value="">Select a treatment</option>
                {TREATMENT_NAMES.map((name) => (
                  <option key={name} value={name} className="text-[#131a1c]">
                    {name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAdd}
                className="min-h-[48px] shrink-0 rounded-md bg-[#0d402e] px-5 text-[15px] font-bold text-white hover:bg-[#125a41] focus:outline-none focus:ring-2 focus:ring-[#1cdc38]"
              >
                Add
              </button>
            </div>

            {error && (
              <p role="status" className="mb-3 text-[13px] font-medium text-[#b3261e]">
                {error}
              </p>
            )}

            {selectedName && propertyOptions.length > 1 && (
              <div className="mb-5 mt-3">
                <label
                  htmlFor="property-type"
                  className="mb-2 block text-[14px] font-semibold text-[#131a1c]"
                >
                  Property type
                </label>
                <select
                  id="property-type"
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value as PropertyType)}
                  className="min-h-[48px] w-full appearance-none rounded-md border border-[#828282] bg-white px-4 py-3 text-[14px] text-[#414042] focus:border-[#1cdc38] focus:outline-none focus:ring-2 focus:ring-[#1cdc38]"
                >
                  {propertyOptions.map((opt) => (
                    <option key={opt.propertyType} value={opt.propertyType}>
                      {opt.propertyType === 'Single-story' ? 'Single storey' : 'Double storey'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {cart.length === 0 ? (
              <p className="mb-5 mt-4 rounded-md border border-dashed border-[#828282]/60 px-4 py-5 text-center text-[14px] text-[#414042]">
                Nothing added yet. Choose a treatment above to see your total.
              </p>
            ) : (
              <ul className="mb-5 mt-4 space-y-2">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 border-b border-[#828282]/25 pb-2 text-[14px] last:border-0"
                  >
                    <span className="text-[#131a1c]">
                      {item.treatment.name}{' '}
                      <strong className="font-bold">{fmtPrice(item.treatment.price)}</strong>
                      {item.treatment.propertyType !== 'All' && (
                        <span className="ml-1 text-[12px] text-[#414042]/70">
                          ({item.treatment.propertyType === 'Single-story'
                            ? 'single storey'
                            : 'double storey'}
                          )
                        </span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove ${item.treatment.name}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-[22px] font-medium leading-none text-[#414042] hover:bg-[#e5e2dc] hover:text-[#b3261e] focus:outline-none focus:ring-2 focus:ring-[#1cdc38]"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div
              aria-live="polite"
              className="mb-4 flex flex-col items-center justify-center rounded-full bg-[#e5e2dc] px-8 py-3"
            >
              <span className="text-[32px] font-extrabold leading-none text-[#131a1c]">
                {fmtPrice(total)}
              </span>
              <span className="mt-1 text-[14px] font-medium leading-none text-[#414042]">
                Total, GST included
              </span>
            </div>

            <p className="mb-5 text-[12px] leading-snug text-[#414042]">
              This is an estimate for a standard residential property. We confirm the final price
              before any work starts.
            </p>

            <a
              href={SITE_CONFIG.phoneTel}
              className="block w-full rounded-full bg-[#1cdc38] px-6 py-3 text-center text-[16px] font-bold text-[#0d402e] hover:bg-[#17c431] focus:outline-none focus:ring-2 focus:ring-[#0d402e]"
            >
              Call {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
