export interface Treatment {
  name: string;
  basePrice: number;
  duration: number;
  requiresPropertyType: boolean;
  propertyPricing?: {
    singleStory: number;
    doubleStory: number;
    other?: number;
  };
}

export const TREATMENTS: Treatment[] = [
  { name: 'Spider & General Pest Treatment', basePrice: 275, duration: 60, requiresPropertyType: true, propertyPricing: { singleStory: 290, doubleStory: 335, other: 275 } },
  { name: 'Clothes & Carpet Moth Treatment', basePrice: 385, duration: 90, requiresPropertyType: false },
  { name: 'German Cockroach Treatment', basePrice: 249.99, duration: 60, requiresPropertyType: false },
  { name: 'Ant Treatment', basePrice: 239, duration: 45, requiresPropertyType: false },
  { name: 'Specialised Ant Elimination', basePrice: 450, duration: 60, requiresPropertyType: false },
  { name: 'Silverfish Treatment', basePrice: 299.99, duration: 40, requiresPropertyType: false },
  { name: 'Mosquitos, Flies Treatment', basePrice: 385, duration: 60, requiresPropertyType: false },
  { name: 'Possum Treatment', basePrice: 450, duration: 30, requiresPropertyType: true, propertyPricing: { singleStory: 450, doubleStory: 630 } },
  { name: 'Bird Control', basePrice: 450, duration: 30, requiresPropertyType: true, propertyPricing: { singleStory: 450, doubleStory: 650 } },
  { name: 'Bird Nest Removal', basePrice: 450, duration: 30, requiresPropertyType: true, propertyPricing: { singleStory: 450, doubleStory: 650 } },
  { name: 'Rodent Removal', basePrice: 380, duration: 30, requiresPropertyType: false },
  { name: 'Bed Bugs', basePrice: 450, duration: 60, requiresPropertyType: false },
  { name: 'Fleas Treatment', basePrice: 385, duration: 45, requiresPropertyType: false },
  { name: 'Termite Inspections', basePrice: 399, duration: 120, requiresPropertyType: false },
  { name: 'Mice & Rat Treatment', basePrice: 200, duration: 40, requiresPropertyType: false },
  { name: 'Cobweb Removal (Extra Service)', basePrice: 125, duration: 30, requiresPropertyType: true, propertyPricing: { singleStory: 125, doubleStory: 250 } },
  { name: 'General Inspection', basePrice: 100, duration: 30, requiresPropertyType: false },
  { name: 'Initial Business Setup', basePrice: 129, duration: 60, requiresPropertyType: false },
  { name: 'Wasp Control', basePrice: 250, duration: 60, requiresPropertyType: false },
];

export const PROPERTY_TYPES = ['Townhouse', 'Single-story', 'Double-story'] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const DISCOUNT_RATES = {
  twoServices: 0.225,
  threeOrMore: 0.275,
} as const;

export function calculatePrice(
  selectedTreatments: string[],
  propertyType: PropertyType | null,
): { totalPrice: number; discount: number; discountedPrice: number; totalDuration: number } {
  let totalPrice = 0;
  let totalDuration = 0;
  let discountRate = 0;

  for (const treatment of selectedTreatments) {
    const t = TREATMENTS.find((tr) => tr.name === treatment);
    if (!t) continue;

    if (t.requiresPropertyType && t.propertyPricing && propertyType) {
      if (propertyType === 'Single-story' || propertyType === 'Townhouse') {
        totalPrice += t.propertyPricing.singleStory;
      } else if (propertyType === 'Double-story') {
        totalPrice += t.propertyPricing.doubleStory;
      }
    } else {
      totalPrice += t.basePrice;
    }
    totalDuration += t.duration;
  }

  if (selectedTreatments.length >= 3) {
    discountRate = DISCOUNT_RATES.threeOrMore;
  } else if (selectedTreatments.length >= 2) {
    discountRate = DISCOUNT_RATES.twoServices;
  }

  const discount = totalPrice * discountRate;
  const discountedPrice = totalPrice - discount;

  return { totalPrice, discount, discountedPrice, totalDuration };
}
