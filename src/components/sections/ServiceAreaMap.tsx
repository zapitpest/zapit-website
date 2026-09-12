import { ANCHORS, RADIUS_KM, AREA_SUMMARY } from '@/lib/service-area';

/**
 * A fixed, non-interactive map of the service area.
 *
 * Deliberately NOT a Google Maps embed. The previous version was a live iframe
 * with a decorative CSS circle floating over it, so the circle described no real
 * distance and the visitor could drag the map out from under it. Here the
 * circles are projected from real coordinates, so 8 km on screen is 8 km on the
 * ground, and there is nothing to drag.
 *
 * It also removes a third-party request, its cookies, and a large chunk of the
 * page weight from what is the target of 269 legacy redirects.
 */

// Equirectangular projection, kilometres, origin at the CBD. Good enough at this
// scale and it keeps the component dependency-free.
const ORIGIN = { lat: -37.8136, lon: 144.9631 };
const KM_PER_DEG_LAT = 110.57;
const KM_PER_DEG_LON = 111.32 * Math.cos((ORIGIN.lat * Math.PI) / 180);

const projectX = (lon: number) => (lon - ORIGIN.lon) * KM_PER_DEG_LON;
const projectY = (lat: number) => -(lat - ORIGIN.lat) * KM_PER_DEG_LAT;

/**
 * Orientation labels only. These are landmarks so a visitor can find themselves
 * on the map; they are not the service-area list. The list is the markup below
 * the map on /service-areas/, which is what screen readers and Google read.
 */
const LANDMARKS: ReadonlyArray<{ name: string; lat: number; lon: number; anchor?: 'start' | 'end' }> = [
  { name: 'Epping', lat: -37.64, lon: 145.03 },
  { name: 'Greensborough', lat: -37.704, lon: 145.103 },
  { name: 'Templestowe', lat: -37.757, lon: 145.13 },
  { name: 'Doncaster', lat: -37.789, lon: 145.125 },
  { name: 'Preston', lat: -37.742, lon: 145.005 },
  { name: 'Glenroy', lat: -37.703, lon: 144.918, anchor: 'end' },
  { name: 'Essendon', lat: -37.755, lon: 144.917, anchor: 'end' },
  { name: 'Northcote', lat: -37.77, lon: 145.0, anchor: 'end' },
  { name: 'Ivanhoe', lat: -37.77, lon: 145.043 },
  { name: 'Kew', lat: -37.806, lon: 145.032 },
  { name: 'Richmond', lat: -37.819, lon: 145.0 },
  { name: 'Footscray', lat: -37.799, lon: 144.9, anchor: 'end' },
];

const INK = '#0d402e'; // brand deep green, the panel
const FILL = '#3fa535'; // brand mid green, the covered area
const EDGE = '#00ff38'; // brand signal green, the boundary and the bases
const MUTED = '#a9c7b6';

export function ServiceAreaMap() {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl bg-[#0d402e] p-3 shadow-xl sm:p-5">
        <svg
          viewBox="-15 -21 38.5 30"
          className="block h-auto w-full"
          role="img"
          aria-labelledby="sam-title sam-desc"
        >
          <title id="sam-title">Zap It Pest Control service area map</title>
          <desc id="sam-desc">{AREA_SUMMARY}</desc>

          {/* Grid, every 5 km, so the scale is readable rather than decorative */}
          <g stroke="#ffffff" strokeOpacity={0.07} strokeWidth={0.08}>
            {[-15, -10, -5, 0, 5, 10, 15, 20].map((x) => (
              <line key={`v${x}`} x1={x} y1={-21} x2={x} y2={9} />
            ))}
            {[-20, -15, -10, -5, 0, 5].map((y) => (
              <line key={`h${y}`} x1={-15} y1={y} x2={23.5} y2={y} />
            ))}
          </g>

          {/* The covered area: one 8 km circle per base, drawn to scale */}
          <g>
            {ANCHORS.map((a) => (
              <circle
                key={`f-${a.id}`}
                cx={projectX(a.lon)}
                cy={projectY(a.lat)}
                r={RADIUS_KM}
                fill={FILL}
                fillOpacity={0.16}
              />
            ))}
            {ANCHORS.map((a) => (
              <circle
                key={`s-${a.id}`}
                cx={projectX(a.lon)}
                cy={projectY(a.lat)}
                r={RADIUS_KM}
                fill="none"
                stroke={EDGE}
                strokeOpacity={0.5}
                strokeWidth={0.14}
                strokeDasharray="0.8 0.55"
              />
            ))}
          </g>

          {/* Orientation labels */}
          <g fontFamily="Arial, Helvetica, sans-serif" fontSize={0.95} fill="#dcefe3">
            {LANDMARKS.map((l) => {
              const x = projectX(l.lon);
              const y = projectY(l.lat);
              const end = l.anchor === 'end';
              return (
                <g key={l.name}>
                  <circle cx={x} cy={y} r={0.26} fill={MUTED} />
                  <text
                    x={end ? x - 0.5 : x + 0.5}
                    y={y + 0.34}
                    textAnchor={end ? 'end' : 'start'}
                    stroke={INK}
                    strokeWidth={0.3}
                    paintOrder="stroke fill"
                    strokeLinejoin="round"
                  >
                    {l.name}
                  </text>
                </g>
              );
            })}
          </g>

          {/* The three bases and the city */}
          <g>
            {ANCHORS.map((a) => {
              const x = projectX(a.lon);
              const y = projectY(a.lat);
              const label = a.id === 'city' ? 'MELBOURNE CBD' : a.name.toUpperCase();
              // Offsets chosen so the four labels never collide at this viewBox.
              const off: Record<string, { dx: number; dy: number; at: 'start' | 'middle' | 'end' }> = {
                reservoir: { dx: 0, dy: -1.55, at: 'middle' },
                heidelberg: { dx: 1.25, dy: 0.36, at: 'start' },
                coburg: { dx: -1.25, dy: 0.36, at: 'end' },
                city: { dx: 0, dy: 2.05, at: 'middle' },
              };
              const o = off[a.id];
              return (
                <g key={a.id}>
                  <circle cx={x} cy={y} r={0.46} fill={INK} stroke={EDGE} strokeWidth={0.2} />
                  <path
                    d={`M${x - 0.85} ${y}H${x + 0.85}M${x} ${y - 0.85}V${y + 0.85}`}
                    stroke={EDGE}
                    strokeWidth={0.2}
                    strokeLinecap="round"
                  />
                  <text
                    x={x + o.dx}
                    y={y + o.dy}
                    textAnchor={o.at}
                    fill={EDGE}
                    fontFamily="Arial Black, Arial, sans-serif"
                    fontWeight={900}
                    fontSize={1.05}
                    letterSpacing={0.04}
                    stroke={INK}
                    strokeWidth={0.32}
                    paintOrder="stroke fill"
                    strokeLinejoin="round"
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Scale bar */}
          <g stroke="#c3d5cb" strokeWidth={0.13}>
            <path d="M-13.8 7.6v1M-13.8 8.1h5M-8.8 7.6v1" fill="none" />
          </g>
          <text
            x={-8.2}
            y={8.5}
            fill="#c3d5cb"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize={1}
          >
            5 km
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-[13px] leading-snug text-[#5c6864]">
        Each circle is {RADIUS_KM} km around one of our bases, about a 20 minute drive. We keep our
        work inside it so we get to you quickly.
      </figcaption>
    </figure>
  );
}

export default ServiceAreaMap;
