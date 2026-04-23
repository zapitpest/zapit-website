import { MELBOURNE_SERVICE_REGIONS } from './melbourne-service-areas';

export type SuburbData = {
  name: string;
  slug: string;
  region: string;
};

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const regionSuburbs = MELBOURNE_SERVICE_REGIONS.flatMap((region) =>
  region.suburbs.map((name) => ({
    name,
    slug: `pest-control-${toSlug(name)}`,
    region: region.name,
  })),
);

const CLIENT_REQUESTED_SUBURBS: SuburbData[] = [
  { name: 'Coburg', slug: 'coburg', region: 'North' },
  { name: 'Reservoir', slug: 'reservoir', region: 'North' },
];

const ALL_SUBURBS_MAP = new Map<string, SuburbData>();
for (const s of regionSuburbs) ALL_SUBURBS_MAP.set(s.slug, s);
for (const s of CLIENT_REQUESTED_SUBURBS) ALL_SUBURBS_MAP.set(s.slug, s);

export const ALL_SUBURBS = Array.from(ALL_SUBURBS_MAP.values());
export const SUBURB_SLUGS = ALL_SUBURBS.map((s) => s.slug);

export function getSuburbBySlug(slug: string): SuburbData | undefined {
  return ALL_SUBURBS_MAP.get(slug);
}

export function isSuburbSlug(slug: string): boolean {
  return ALL_SUBURBS_MAP.has(slug);
}
