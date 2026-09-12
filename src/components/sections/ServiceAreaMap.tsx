import Image from 'next/image';

import { ANCHORS, AREA_SUMMARY, RADIUS_KM } from '@/lib/service-area';

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
        <span className="mt-2 block text-[13px] text-[#6b7280]">
          Bases: {ANCHORS.filter((a) => a.id !== 'city').map((a) => a.name).join(', ')}, plus the
          CBD and the inner suburbs.
        </span>
      </figcaption>
    </figure>
  );
}

export default ServiceAreaMap;
