// The single source of truth for where Zap It works.
//
// Set by the owners on 12 Sep 2026: a circle around each of the three Google
// Business Profile locations, plus the city, sized so no two jobs sit more than
// 15 to 20 minutes apart. That radius is RADIUS_KM.
//
// This file is served publicly. It carries no job counts, prices, revenue or
// customer data — only the suburb names the business is willing to claim.
//
// status
//   'core'  inside the radius. Rendered on /service-areas/.
//   'edge'  8 to 12 km out. NOT rendered. Awaiting owner decision D1 in
//           plans/2026-09-12-service-area-and-suburb-pages.md. Flip to 'core'
//           to publish it, or delete the row to drop it.
//
// hasPage
//   Whether this suburb has its own landing page. DO NOT set this true to
//   create a new page. Every existing suburb page is the same template with
//   the name swapped, which is what Google treats as a doorway page. A new
//   page is only earned once someone has written local detail for it that is
//   actually true: the housing stock, the pest pressure that goes with it, and
//   work we have really done there. PAGE_BACKLOG below is the queue.

export type AnchorId = 'reservoir' | 'heidelberg' | 'coburg' | 'city';
export type SuburbStatus = 'core' | 'edge';

export const RADIUS_KM = 8;

export type Anchor = {
  id: AnchorId;
  name: string;
  /** Shown beneath the group heading on /service-areas/. */
  detail: string;
  lat: number;
  lon: number;
};

export const ANCHORS: readonly Anchor[] = [
  { id: 'heidelberg', name: 'Heidelberg Heights', detail: '80 Porter Rd', lat: -37.742, lon: 145.056 },
  { id: 'reservoir', name: 'Reservoir', detail: '12/220 Holt Parade', lat: -37.72, lon: 145.008 },
  { id: 'coburg', name: 'Coburg', detail: '84 Moore St', lat: -37.744, lon: 144.972 },
  { id: 'city', name: 'Melbourne CBD', detail: 'and the inner suburbs', lat: -37.8136, lon: 144.9631 },
];

export type Suburb = {
  name: string;
  slug: string;
  anchor: AnchorId;
  status: SuburbStatus;
  hasPage: boolean;
  /**
   * Called out by name on the map image, and in the band beneath it. These are
   * the suburbs someone recognises, so they place themselves straight away.
   * Confirmed by Zaydan 12 Sep 2026 (decision D6). This flag and the HIGHLIGHTS
   * list in scripts/seo/render_service_area_map.py must be kept in step — the
   * map is a rendered image and cannot read this file.
   */
  highlight?: true;
};

export const SUBURBS: readonly Suburb[] = [
  { name: 'Abbotsford', slug: 'pest-control-abbotsford', anchor: 'city', status: 'core', hasPage: false },
  { name: 'Armadale', slug: 'pest-control-armadale', anchor: 'city', status: 'core', hasPage: false },
  { name: 'Ascot Vale', slug: 'pest-control-ascot-vale', anchor: 'city', status: 'core', hasPage: false },
  { name: 'Carlton', slug: 'pest-control-carlton', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Carlton North', slug: 'pest-control-carlton-north', anchor: 'city', status: 'core', hasPage: false , highlight: true },
  { name: 'Clifton Hill', slug: 'pest-control-clifton-hill', anchor: 'city', status: 'core', hasPage: false , highlight: true },
  { name: 'Collingwood', slug: 'pest-control-collingwood', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Docklands', slug: 'pest-control-docklands', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'East Melbourne', slug: 'pest-control-east-melbourne', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Fitzroy', slug: 'pest-control-fitzroy', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Fitzroy North', slug: 'pest-control-fitzroy-north', anchor: 'city', status: 'core', hasPage: false },
  { name: 'Footscray', slug: 'pest-control-footscray', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Hawthorn', slug: 'pest-control-hawthorn', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Kensington', slug: 'pest-control-kensington', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Kew', slug: 'pest-control-kew', anchor: 'city', status: 'core', hasPage: true  , highlight: true },
  { name: 'Newport', slug: 'pest-control-newport', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'North Melbourne', slug: 'pest-control-north-melbourne', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Parkville', slug: 'pest-control-parkville', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Prahran', slug: 'pest-control-prahran', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Richmond', slug: 'pest-control-richmond', anchor: 'city', status: 'core', hasPage: true  , highlight: true },
  { name: 'Seddon', slug: 'pest-control-seddon', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'South Yarra', slug: 'pest-control-south-yarra', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Southbank', slug: 'pest-control-southbank', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Spotswood', slug: 'pest-control-spotswood', anchor: 'city', status: 'core', hasPage: false },
  { name: 'St Kilda', slug: 'pest-control-st-kilda', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'West Melbourne', slug: 'pest-control-west-melbourne', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Williamstown', slug: 'pest-control-williamstown', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Windsor', slug: 'pest-control-windsor', anchor: 'city', status: 'core', hasPage: false },
  { name: 'Yarraville', slug: 'pest-control-yarraville', anchor: 'city', status: 'core', hasPage: true  },
  { name: 'Brunswick', slug: 'pest-control-brunswick', anchor: 'coburg', status: 'core', hasPage: true  , highlight: true },
  { name: 'Brunswick East', slug: 'pest-control-brunswick-east', anchor: 'coburg', status: 'core', hasPage: false },
  { name: 'Brunswick West', slug: 'pest-control-brunswick-west', anchor: 'coburg', status: 'core', hasPage: true  },
  { name: 'Coburg', slug: 'coburg', anchor: 'coburg', status: 'core', hasPage: true  },
  { name: 'Coburg North', slug: 'pest-control-coburg-north', anchor: 'coburg', status: 'core', hasPage: false },
  { name: 'Essendon', slug: 'pest-control-essendon', anchor: 'coburg', status: 'core', hasPage: false , highlight: true },
  { name: 'Fawkner', slug: 'pest-control-fawkner', anchor: 'coburg', status: 'core', hasPage: true  },
  { name: 'Glenroy', slug: 'pest-control-glenroy', anchor: 'coburg', status: 'core', hasPage: true  },
  { name: 'Hadfield', slug: 'pest-control-hadfield', anchor: 'coburg', status: 'core', hasPage: false },
  { name: 'Moonee Ponds', slug: 'pest-control-moonee-ponds', anchor: 'coburg', status: 'core', hasPage: false , highlight: true },
  { name: 'Niddrie', slug: 'pest-control-niddrie', anchor: 'coburg', status: 'core', hasPage: false },
  { name: 'Northcote', slug: 'pest-control-northcote', anchor: 'coburg', status: 'core', hasPage: false , highlight: true },
  { name: 'Oak Park', slug: 'pest-control-oak-park', anchor: 'coburg', status: 'core', hasPage: false },
  { name: 'Pascoe Vale', slug: 'pest-control-pascoe-vale', anchor: 'coburg', status: 'core', hasPage: true  , highlight: true },
  { name: 'Pascoe Vale South', slug: 'pest-control-pascoe-vale-south', anchor: 'coburg', status: 'core', hasPage: false },
  { name: 'Thornbury', slug: 'pest-control-thornbury', anchor: 'coburg', status: 'core', hasPage: false , highlight: true },
  { name: 'Alphington', slug: 'pest-control-alphington', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Balwyn', slug: 'pest-control-balwyn', anchor: 'heidelberg', status: 'core', hasPage: true  },
  { name: 'Balwyn North', slug: 'pest-control-balwyn-north', anchor: 'heidelberg', status: 'core', hasPage: false , highlight: true },
  { name: 'Bellfield', slug: 'pest-control-bellfield', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Briar Hill', slug: 'pest-control-briar-hill', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Bulleen', slug: 'pest-control-bulleen', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Bundoora', slug: 'pest-control-bundoora', anchor: 'heidelberg', status: 'core', hasPage: true  , highlight: true },
  { name: 'Doncaster', slug: 'pest-control-doncaster', anchor: 'heidelberg', status: 'core', hasPage: true  , highlight: true },
  { name: 'Eaglemont', slug: 'pest-control-eaglemont', anchor: 'heidelberg', status: 'core', hasPage: false , highlight: true },
  { name: 'Fairfield', slug: 'pest-control-fairfield', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Greensborough', slug: 'pest-control-greensborough', anchor: 'heidelberg', status: 'core', hasPage: false , highlight: true },
  { name: 'Heidelberg', slug: 'pest-control-heidelberg', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Heidelberg Heights', slug: 'pest-control-heidelberg-heights', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Heidelberg West', slug: 'pest-control-heidelberg-west', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Ivanhoe', slug: 'pest-control-ivanhoe', anchor: 'heidelberg', status: 'core', hasPage: false , highlight: true },
  { name: 'Ivanhoe East', slug: 'pest-control-ivanhoe-east', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Kew East', slug: 'pest-control-kew-east', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Lower Plenty', slug: 'pest-control-lower-plenty', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Macleod', slug: 'pest-control-macleod', anchor: 'heidelberg', status: 'core', hasPage: false , highlight: true },
  { name: 'Montmorency', slug: 'pest-control-montmorency', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Rosanna', slug: 'pest-control-rosanna', anchor: 'heidelberg', status: 'core', hasPage: false , highlight: true },
  { name: 'Templestowe', slug: 'pest-control-templestowe', anchor: 'heidelberg', status: 'core', hasPage: true  , highlight: true },
  { name: 'Templestowe Lower', slug: 'pest-control-templestowe-lower', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Viewbank', slug: 'pest-control-viewbank', anchor: 'heidelberg', status: 'core', hasPage: false , highlight: true },
  { name: 'Watsonia', slug: 'pest-control-watsonia', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Watsonia North', slug: 'pest-control-watsonia-north', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Yallambie', slug: 'pest-control-yallambie', anchor: 'heidelberg', status: 'core', hasPage: false },
  { name: 'Campbellfield', slug: 'pest-control-campbellfield', anchor: 'reservoir', status: 'core', hasPage: true  },
  { name: 'Epping', slug: 'pest-control-epping', anchor: 'reservoir', status: 'core', hasPage: true  , highlight: true },
  { name: 'Kingsbury', slug: 'pest-control-kingsbury', anchor: 'reservoir', status: 'core', hasPage: false },
  { name: 'Lalor', slug: 'pest-control-lalor', anchor: 'reservoir', status: 'core', hasPage: false },
  { name: 'Preston', slug: 'pest-control-preston', anchor: 'reservoir', status: 'core', hasPage: true  , highlight: true },
  { name: 'Reservoir', slug: 'reservoir', anchor: 'reservoir', status: 'core', hasPage: true  },
  { name: 'Thomastown', slug: 'pest-control-thomastown', anchor: 'reservoir', status: 'core', hasPage: true  , highlight: true },

  // --- Awaiting decision D1. Nothing below renders while status is 'edge'. ---
  { name: 'Eltham North', slug: 'pest-control-eltham-north', anchor: 'heidelberg', status: 'edge', hasPage: false },
  { name: 'Altona North', slug: 'pest-control-altona-north', anchor: 'city', status: 'edge', hasPage: false },
  { name: 'Blackburn', slug: 'pest-control-blackburn', anchor: 'heidelberg', status: 'edge', hasPage: true  },
  { name: 'Meadow Heights', slug: 'pest-control-meadow-heights', anchor: 'coburg', status: 'edge', hasPage: false },
  { name: 'Doncaster East', slug: 'pest-control-doncaster-east', anchor: 'heidelberg', status: 'edge', hasPage: false },
  { name: 'Eltham', slug: 'pest-control-eltham', anchor: 'heidelberg', status: 'edge', hasPage: false },
  { name: 'Broadmeadows', slug: 'pest-control-broadmeadows', anchor: 'coburg', status: 'edge', hasPage: true  },
  { name: 'Camberwell', slug: 'pest-control-camberwell', anchor: 'city', status: 'edge', hasPage: true  },
  { name: 'Diamond Creek', slug: 'pest-control-diamond-creek', anchor: 'heidelberg', status: 'edge', hasPage: false },
  { name: 'Keilor East', slug: 'pest-control-keilor-east', anchor: 'coburg', status: 'edge', hasPage: false },
  { name: 'Mill Park', slug: 'pest-control-mill-park', anchor: 'reservoir', status: 'edge', hasPage: true  },
  { name: 'South Morang', slug: 'pest-control-south-morang', anchor: 'reservoir', status: 'edge', hasPage: false },
  { name: 'Attwood', slug: 'pest-control-attwood', anchor: 'coburg', status: 'edge', hasPage: false },
  { name: 'Caulfield South', slug: 'pest-control-caulfield-south', anchor: 'city', status: 'edge', hasPage: false },
  { name: 'Gladstone Park', slug: 'pest-control-gladstone-park', anchor: 'coburg', status: 'edge', hasPage: false },
  { name: 'Airport West', slug: 'pest-control-airport-west', anchor: 'coburg', status: 'edge', hasPage: false },
  { name: 'Blackburn North', slug: 'pest-control-blackburn-north', anchor: 'heidelberg', status: 'edge', hasPage: false },
  { name: 'Brighton East', slug: 'pest-control-brighton-east', anchor: 'city', status: 'edge', hasPage: false },
  { name: 'Glen Iris', slug: 'pest-control-glen-iris', anchor: 'city', status: 'edge', hasPage: false },
  { name: 'Mont Albert North', slug: 'pest-control-mont-albert-north', anchor: 'heidelberg', status: 'edge', hasPage: false },
  { name: 'Surrey Hills', slug: 'pest-control-surrey-hills', anchor: 'heidelberg', status: 'edge', hasPage: true  },
  { name: 'Box Hill', slug: 'pest-control-box-hill', anchor: 'heidelberg', status: 'edge', hasPage: true  },
  { name: 'Braybrook', slug: 'pest-control-braybrook', anchor: 'city', status: 'edge', hasPage: false },
  { name: 'Coolaroo', slug: 'pest-control-coolaroo', anchor: 'reservoir', status: 'edge', hasPage: false },
];

/**
 * Suburbs we work in most that still have no page of their own, worst gap first.
 * Write local content for one, then set hasPage: true on that row. Never flip
 * the flag without the content.
 */
export const PAGE_BACKLOG: readonly string[] = [
  'Ivanhoe',
  'Rosanna',
  'Macleod',
  'Heidelberg Heights',
  'Greensborough',
  'Heidelberg',
  'Northcote',
  'Viewbank',
  'Thornbury',
  'Heidelberg West',
  'Alphington',
  'Carlton North',
];

export const CORE_SUBURBS = SUBURBS.filter((s) => s.status === 'core');
export const SUBURBS_WITH_PAGES = SUBURBS.filter((s) => s.status === 'core' && s.hasPage);

/** The named suburbs on the map, grouped the way the map groups them. */
export function highlightsByAnchor(id: AnchorId): Suburb[] {
  return CORE_SUBURBS.filter((s) => s.anchor === id && s.highlight);
}

export function suburbsByAnchor(id: AnchorId): Suburb[] {
  return CORE_SUBURBS.filter((s) => s.anchor === id);
}

/** Used in page copy and as the map's text alternative. Keep these in step. */
export const AREA_SUMMARY =
  "Melbourne's northern, north-eastern and inner suburbs — within about 8 km of our Heidelberg Heights, Reservoir and Coburg bases, and the CBD.";
