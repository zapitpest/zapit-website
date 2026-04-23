export type ServicePageEntry = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  features: readonly string[];
};

export const SERVICE_PAGES = {
  'ant-pest-control-melbourne': {
    slug: 'ant-pest-control-melbourne',
    title: 'Ant Pest Control Melbourne',
    h1: 'Ant Pest Control Melbourne',
    metaTitle: 'Ant Pest Control Melbourne',
    metaDescription:
      'Professional ant control in Melbourne. Targeted treatments for trails, nests, and entry points. Licensed technicians, pet-safe options, and fast response times.',
    content:
      'Ants may be small, but Melbourne homes and businesses often face large-scale infestations once a scent trail is established. We identify the species, locate nesting areas, and apply targeted treatments that break the colony cycle—not just the workers you see on your benchtop. Whether you are dealing with black house ants, coastal brown ants, or persistent pavement ants, our team maps activity and uses integrated pest management to deliver lasting relief.',
    features: [
      'Species identification and nest targeting',
      'Perimeter and garden barrier treatments',
      'Kitchen, pantry, and moisture hotspot inspection',
      'Pet- and family-conscious product selection',
      'Follow-up advice to prevent reinfestation',
    ],
  },
  'bed-bug-control-melbourne': {
    slug: 'bed-bug-control-melbourne',
    title: 'Bed Bug Control Melbourne',
    h1: 'Bed Bug Control Melbourne',
    metaTitle: 'Bed Bug Control Melbourne',
    metaDescription:
      'Discreet bed bug treatments for Melbourne properties. Thorough inspection, encasement advice, and professional elimination plans for homes and units.',
    content:
      'Bed bugs spread quickly in apartments, share houses, and short-stay accommodation. We conduct a methodical inspection of beds, skirting, furniture, and harbourage areas, then tailor a treatment plan to the severity and layout of your home. Our goal is complete elimination with clear preparation steps so you can sleep soundly again without endless DIY sprays that only scatter the problem.',
    features: [
      'Room-by-room inspection with clear documentation',
      'Targeted treatment to mattresses, bed frames, and furniture',
      'Laundering and encasement guidance where appropriate',
      'Multi-unit and tenancy-sensitive coordination',
      'Post-treatment monitoring recommendations',
    ],
  },
  'bee-removal-melbourne': {
    slug: 'bee-removal-melbourne',
    title: 'Bee Removal Melbourne',
    h1: 'Bee Removal Melbourne',
    metaTitle: 'Bee Removal Melbourne',
    metaDescription:
      'Safe bee and swarm management across Melbourne. Assessment of hive location, access, and the best next step to protect your family and the colony where possible.',
    content:
      'Bees are vital pollinators, but a swarm in a wall cavity, chimney, or eave can create a sting risk, especially for allergic residents. We assess the situation, identify whether relocation or controlled removal is appropriate, and work with care around children, pets, and public areas. If you notice intense flight activity or a growing cluster, call us before the colony becomes more established in the structure.',
    features: [
      'Swarm and established colony assessments',
      'Height and access risk evaluation',
      'Options discussed for relocation where suitable',
      'Aftercare advice to reduce future attraction',
      'Rapid response for high-traffic public areas',
    ],
  },
  'birds-control-melbourne': {
    slug: 'birds-control-melbourne',
    title: 'Birds Control Melbourne',
    h1: 'Birds Control Melbourne',
    metaTitle: 'Birds Control Melbourne',
    metaDescription:
      'Humane bird proofing and control for Melbourne roofs, solar panels, and ledges. Netting, spikes, and long-term pressure washing plans for guano build-up.',
    content:
      'Pigeons, mynas, and other birds can block gutters, damage paint, and create slip hazards with droppings. We combine proofing, habitat modification, and cleaning recommendations to make your property less attractive without unnecessary harm. Commercial facades, warehouses, and residential rooflines are all in scope, including solar panel edges where birds love to nest.',
    features: [
      'Ledge, solar panel, and roof-line proofing options',
      'Gutter and drainage assessments',
      'Guano clean-up and hygiene guidance',
      'Compliant, humane control strategies',
      'Ongoing maintenance plans for high-pressure sites',
    ],
  },
  'clothes-moths-treatment-melbourne': {
    slug: 'clothes-moths-treatment-melbourne',
    title: 'Clothes Moths Treatment Melbourne',
    h1: 'Clothes Moths Treatment Melbourne',
    metaTitle: 'Clothes Moths Treatment Melbourne',
    metaDescription:
      'Clothes moth treatment for wardrobes, woollens, and natural fibres. Melbourne-wide inspections and targeted control for webbing and case-making species.',
    content:
      'Clothes moths target wool, silk, and stored natural fibres, often in quiet wardrobes and under heavy furniture. We trace damage patterns, check stored goods, and treat harbourage without soaking your whole wardrobe in ineffective supermarket sprays. Humidity and storage habits are part of the plan so moths do not return the next season.',
    features: [
      'Wardrobe, carpet edge, and stored-item inspection',
      'Species-appropriate treatment for larvae and adults',
      'Guidance on vacuuming, freezing, and dry cleaning',
      'Humidity and storage recommendations',
      'Discreet service for high-value garments',
    ],
  },
  'cockroach-control-melbourne': {
    slug: 'cockroach-control-melbourne',
    title: 'Cockroach Control Melbourne',
    h1: 'Cockroach Control Melbourne',
    metaTitle: 'Cockroach Control Melbourne',
    metaDescription:
      'Fast cockroach control for Melbourne homes and food businesses. German, American, and Australian cockroach programs with kitchen and void treatments.',
    content:
      'Cockroaches carry allergens, contaminate food, and multiply quickly in warm, humid voids. We combine gel baits, crack-and-crevice work, and non-chemical tools where food prep areas demand extra care. Whether you are in a period home with subfloor access or a modern apartment with a compact kitchen, we focus on the harbourage you cannot see as well as the ones you can.',
    features: [
      'Kitchen, bathroom, and subfloor void targeting',
      'Gel, dust, and bait rotation strategies for resistance',
      'Food-safe plans for commercial kitchens',
      'Identification of German vs large species',
      'Exclusion and moisture tips to support long-term control',
    ],
  },
  'flea-control-melbourne': {
    slug: 'flea-control-melbourne',
    title: 'Flea Control Melbourne',
    h1: 'Flea Control Melbourne',
    metaTitle: 'Flea Control Melbourne',
    metaDescription:
      'Flea control for homes with dogs and cats. Treatments that address larvae in carpets, pet bedding, and cracks—aligned with your vet’s parasite plan.',
    content:
      'Adult fleas on your pet are only part of the problem; eggs and larvae develop in carpet, rugs, and cracks. We time treatments with on-animal care from your vet when needed, and focus on the environment so the cycle breaks. End-of-lease and moving-house flea issues are also common—call us before the next warm spell makes numbers explode.',
    features: [
      'Indoor and targeted outdoor larval control',
      'Carpet, rug, and pet-area focus',
      'Alignment with your vet’s flea management advice',
      'Tenant and landlord friendly documentation',
      'Rapid relief plans for high-bite situations',
    ],
  },
  'fly-control-melbourne': {
    slug: 'fly-control-melbourne',
    title: 'Fly Control Melbourne',
    h1: 'Fly Control Melbourne',
    metaTitle: 'Fly Control Melbourne',
    metaDescription:
      'Fly management for Melbourne homes, restaurants, and bins areas. Source reduction, light traps, and professional treatments to cut breeding sites.',
    content:
      'Flies move from waste to food preparation surfaces in seconds, which is why control starts with breeding sites, not just a quick spray. We look at bins, drains, decaying organics, and entry points, then add targeted treatments and proofing. Seasonal surges in summer are common; we can help you get ahead of the population curve.',
    features: [
      'Breeding source inspection indoors and out',
      'Commercial kitchen and back-of-house programs',
      'Light trap and exclusion guidance',
      'Drain and organic matter hot spot review',
      'Ongoing plans for high-traffic venues',
    ],
  },
  'mosquito-control-melbourne': {
    slug: 'mosquito-control-melbourne',
    title: 'Mosquito Control Melbourne',
    h1: 'Mosquito Control Melbourne',
    metaTitle: 'Mosquito Control Melbourne',
    metaDescription:
      'Mosquito reduction for backyards, villas, and outdoor venues. Breeding source treatment and barrier strategies for comfortable outdoor living in Melbourne.',
    content:
      'Mosquitoes need still water to breed—from saucers, blocked gutters, and ponded areas to hidden pockets in hard rubbish piles. We treat or remove larval sources where appropriate and advise on personal protection and screening. Events and high-use outdoor spaces may need a seasonal program rather than a one-off visit.',
    features: [
      'Larval source inspection: gutters, plants, and vessels',
      'Shrubbery and rest-area treatments where required',
      'Event and venue buffer planning',
      'Clear advice for infants and sensitive occupants',
      'Neighbouring property considerations on shared water',
    ],
  },
  'possum-removal-melbourne': {
    slug: 'possum-removal-melbourne',
    title: 'Possum Removal Melbourne',
    h1: 'Possum Removal Melbourne',
    metaTitle: 'Possum Removal Melbourne',
    metaDescription:
      'Licensed possum management for Melbourne roof voids. Legal relocation pathways, one-way doors, and proofing to stop the noise from returning every night.',
    content:
      'Possums are protected native wildlife, so control must be humane and legally compliant. We assess roof entry points, install one-way devices where appropriate, and seal access after exit. The scratching you hear at night is often a single opportunist—get the access closed before wire damage, insulation mess, and odour get worse.',
    features: [
      'Roof and eave access mapping',
      'Compliant one-way and trapping pathways',
      'Proofing materials suited to your roof type',
      'Cleanup and hygiene guidance after occupancy',
      'Tree branch and bridge-point advice to reduce re-entry',
    ],
  },
  'rodent-control-melbourne': {
    slug: 'rodent-control-melbourne',
    title: 'Rodent Control Melbourne',
    h1: 'Rodent Control Melbourne',
    metaTitle: 'Rodent Control Melbourne',
    metaDescription:
      'Rat and mouse control for Melbourne properties. Baiting, trapping, and entry sealing with clear safety steps for children, pets, and food areas.',
    content:
      'Rodents spread disease, damage wiring, and open food packaging overnight. We start with a thorough inspection to follow rub marks, droppings, and access routes, then combine mechanical control, secured baiting where allowed, and proofing. Urban terraces, food businesses, and warehouses all need a tailored program—not a single throw of unlabelled product.',
    features: [
      'Rodent run mapping and access sealing',
      'Secured, tamper-resistant baiting programs',
      'Trapping in sensitive or zero-baiting zones',
      'Food storage and waste discipline guidance',
      'Follow-up until activity clears',
    ],
  },
  'silverfish-control-melbourne': {
    slug: 'silverfish-control-melbourne',
    title: 'Silverfish Control Melbourne',
    h1: 'Silverfish Control Melbourne',
    metaTitle: 'Silverfish Control Melbourne',
    metaDescription:
      'Silverfish control for bathrooms, laundries, and stored paper. Melbourne homes and storage areas treated with moisture and humidity management in mind.',
    content:
      'Silverfish thrive in humid, undisturbed areas and damage books, glues, and natural fabrics. We treat harbourage in bathrooms, subfloors, and roof voids and connect treatment with dehumidifying and storage habits. Libraries, archive rooms, and rental storerooms benefit from a structured inspection before damage spreads page by page.',
    features: [
      'Moisture and humidity hotspot review',
      'Bathroom, skirting, and built-in wardrobe targeting',
      'Paper and book storage advice',
      'Apartment block common-area considerations',
      'Low-odour options for sensitive indoor spaces',
    ],
  },
  'spider-control-melbourne': {
    slug: 'spider-control-melbourne',
    title: 'Spider Control Melbourne',
    h1: 'Spider Control Melbourne',
    metaTitle: 'Spider Control Melbourne',
    metaDescription:
      'Spider treatments for homes and sheds across Melbourne. Web clearing, void dusting, and external perimeter work to cut down activity before it moves indoors.',
    content:
      'Most spiders are beneficial predators, but redbacks near play equipment and webbing on alfresco areas are not what you want. We treat harbourage, entry points, and voids, and can focus on outbuildings, pool fencing, and letterboxes. Seasonal external treatments are popular before warm weather lifts hunting activity.',
    features: [
      'External perimeter and eave treatments',
      'Shed, garage, and pool-area programs',
      'Web removal and void dusting as needed',
      'Child and pet play area awareness',
      'Identification of venomous species and risk areas',
    ],
  },
  'termite-control-melbourne': {
    slug: 'termite-control-melbourne',
    title: 'Termite Control Melbourne',
    h1: 'Termite Control Melbourne',
    metaTitle: 'Termite Control Melbourne',
    metaDescription:
      'Termite inspection and treatment in Melbourne. Timber pest assessments, management systems, and colony control options for subfloor, slab, and high-rise risk.',
    content:
      'Termites are the highest-risk timber pest in Melbourne, often hidden until damage is significant. We provide visual and where appropriate, termite management options including monitoring, soil treatments, and targeted colony intervention depending on the construction and regulations in play. Annual inspections are the backbone of early detection, especially in established suburbs with mature trees and moisture pockets.',
    features: [
      'AS-compliant timber pest inspection reporting',
      'Management programs tailored to the building type',
      'Colony and interception strategies where suitable',
      'Pre-purchase and vendor report support',
      'Work alongside builders and body corporates on complex sites',
    ],
  },
  'treatment-for-wood-borers-in-melbourne': {
    slug: 'treatment-for-wood-borers-in-melbourne',
    title: 'Treatment for Wood Borers Melbourne',
    h1: 'Treatment for Wood Borers Melbourne',
    metaTitle: 'Treatment for Wood Borers Melbourne',
    metaDescription:
      'Wood borer treatments for floorboards, furniture, and timbers. Identification of powderpost and furniture beetle activity with targeted Melbourne service.',
    content:
      'Wood borers leave fine frass, pinholes, and over time, structural weakness in susceptible timber. We confirm whether activity is current or old, and treat or recommend replacement accordingly. Antiques, hardwood floors, and stored timber stocks each need a different response than a one-size spray.',
    features: [
      'Exit hole and frass pattern assessment',
      'Localised treatment to active zones',
      'Furniture- and floorboard-sensitive programs',
      'Builder and restorer handover notes when needed',
      'Moisture control advice to protect timber long term',
    ],
  },
  'wasp-removal-melbourne': {
    slug: 'wasp-removal-melbourne',
    title: 'Wasp Removal Melbourne',
    h1: 'Wasp Removal Melbourne',
    metaTitle: 'Wasp Removal Melbourne',
    metaDescription:
      'Wasp nest removal and treatment for paper wasps and other species. Protective equipment, safe access, and aftercare to reduce re-nesting in Melbourne.',
    content:
      'Disturbed wasp nests can lead to multiple stings in seconds, especially in eaves, sheds, and playground equipment. We access nests with appropriate PPE, treat or remove as the situation allows, and advise on repainting, sealing, and early-season checks next year. Do not throw water or knock a nest down—escalation risk is high without equipment.',
    features: [
      'Ground, aerial, and void nest access plans',
      'Full PPE and ladder safety for residential sites',
      'Aftercare to cover treated areas where needed',
      'Site-specific advice for schools and cafes',
      'Early-season return checks on problem locations',
    ],
  },
} as const satisfies Record<string, ServicePageEntry>;

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES) as (keyof typeof SERVICE_PAGES)[];

export function isServiceSlug(slug: string): slug is keyof typeof SERVICE_PAGES {
  return slug in SERVICE_PAGES;
}

export function getServicePage(slug: string) {
  if (!isServiceSlug(slug)) return undefined;
  return SERVICE_PAGES[slug];
}
