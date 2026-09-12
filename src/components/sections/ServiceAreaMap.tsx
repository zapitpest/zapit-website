import Image from 'next/image';

import { ANCHORS, AREA_SUMMARY, RADIUS_KM, highlightsByAnchor } from '@/lib/service-area';

/**
 * The service area, as a flat image.
 *
 * Deliberately NOT a Google Maps embed. The previous version was a live iframe
 * with a decorative CSS circle floating over it: the circle was sized to its
 * container rather than to any distance, and it did not move when the map did,
 * so a visitor could drag Melbourne out from under it. It described nothing.
 *
 * The image is rendered once by scripts/seo/render_service_area_map.py in the
 * AIOS workspace and committed here, so the circles are drawn at true scale from
 * real coordinates, there is nothing to pan, and the page makes no third-party
 * request for it. Re-run that script if the area in service-area.ts changes.
 */

const MAP_SRC = '/images/service-area-map.webp';
const MAP_WIDTH = 1600;
const MAP_HEIGHT = 1231;

export function ServiceAreaMap() {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl border border-[#e3e1dc] bg-white shadow-lg">
        <Image
          src={MAP_SRC}
          alt={`Map of the Zap It Pest Control service area. ${AREA_SUMMARY}`}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          sizes="(min-width: 1024px) 768px, 100vw"
          priority
          className="block h-auto w-full"
        />
      </div>

      <figcaption className="mt-4 text-[14px] leading-[1.6] text-[#414042]">
        Each circle covers {RADIUS_KM} km around one of our bases, about a 20 minute drive. We keep
        our work inside it so we get to you quickly.
      </figcaption>

      {/* The names from the map, repeated as text. The map is a flat image, so its
          labels are invisible to a screen reader, to Google, and to anyone on a
          narrow phone where the type gets small. This band is the readable copy of
          the same list, grouped the same way, from the same data. */}
      <div className="mt-6 border-t border-[#e3e1dc] pt-5">
        <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
          Our bases, and what&apos;s around them
        </h3>
        <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {ANCHORS.map((anchor) => {
            const near = highlightsByAnchor(anchor.id);
            if (near.length === 0) return null;
            return (
              <div key={anchor.id} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="shrink-0 text-[14px] font-bold leading-[1.5] text-[#0d402e] sm:w-[136px]">
                  {anchor.id === 'city' ? 'The city' : anchor.name}
                </dt>
                <dd className="m-0 text-[14px] leading-[1.5] text-[#414042]">
                  {near.map((s) => s.name).join(' · ')}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </figure>
  );
}

export default ServiceAreaMap;
