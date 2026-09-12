import { ANCHORS, AREA_SUMMARY, RADIUS_KM, highlightsByAnchor } from '@/lib/service-area';

/**
 * The service area, as a flat image.
 *
 * Deliberately NOT a Google Maps embed. The previous version was a live iframe
 * with a decorative CSS circle floating over it: the circle was sized to its
 * container rather than to any distance, and it did not move when the map did,
 * so a visitor could drag Melbourne out from under it. It described nothing.
 *
 * Two framings, rendered by scripts/seo/render_service_area_map.py in the AIOS
 * workspace and committed here. Desktop keeps the surrounding city, which lets
 * someone outside the area see that they are outside it. On a phone that context
 * is unreadable at a third of the width, so the phone version crops in to the
 * circles. Same map, closer in — not a CSS scale of the wide one.
 *
 * Re-run that script if the area or the highlighted suburbs change.
 */

const SRC = '/images/service-area-map.webp';
const SRC_MOBILE = '/images/service-area-map-mobile.webp';

type Props = {
  /**
   * Repeat the map's suburb names as text underneath. On by default: the map is
   * an image, so its labels are invisible to screen readers and to Google.
   * The homepage turns it off — it sits in a dark band there and already has its
   * own service-area copy.
   */
  showNearby?: boolean;
  className?: string;
};

export function ServiceAreaMap({ showNearby = true, className }: Props) {
  return (
    <figure className={`m-0 ${className ?? ''}`}>
      <div className="overflow-hidden rounded-2xl border border-[#e3e1dc] bg-white shadow-lg">
        <picture>
          <source
            media="(max-width: 639px)"
            srcSet={SRC_MOBILE}
            width={1100}
            height={1079}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SRC}
            width={1600}
            height={1231}
            alt={`Map of the Zap It Pest Control service area. ${AREA_SUMMARY}`}
            className="block h-auto w-full"
            decoding="async"
          />
        </picture>
      </div>

      <figcaption className="mt-4 text-[14px] leading-[1.6] text-[#414042]">
        Each circle covers {RADIUS_KM} km around one of our bases, about a 20 minute drive. We keep
        our work inside it so we get to you quickly.
      </figcaption>

      {showNearby && (
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
      )}
    </figure>
  );
}

export default ServiceAreaMap;
