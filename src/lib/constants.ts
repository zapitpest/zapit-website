export const SITE_CONFIG = {
  name: 'Zapit Pest & Termite Control Melbourne',
  shortName: 'Zapit Pest Control',
  phone: '9126 0555',
  phoneTel: 'tel:0391260555',
  phoneRaw: '0391260555',
  email: 'info@zapitpestmelbourne.com.au',
  emailWork: 'wo@zapitpestmelbourne.com.au',
  url: 'https://zapitpestmelbourne.com.au',
  address: {
    street: '80 Porter Rd',
    locality: 'Heidelberg Heights',
    region: 'VIC',
    postalCode: '3081',
    country: 'AU',
    full: '80 Porter Rd, Heidelberg Heights VIC 3081, Australia',
  },
  social: {
    instagram: 'https://www.instagram.com/zapit_pestcontrol',
    facebook: 'https://www.facebook.com/people/Zap-It-Pest-Control-Melbourne/100084044233762/',
    tiktok: 'https://www.tiktok.com/@zapitpestcontrol',
  },
  booking: {
    url: 'https://book.squareup.com/appointments/3a4pl9xar87khq/location/LP1Y6JYA2E1S1/services',
    provider: 'Square',
  },
  rating: {
    value: '4.9',
    count: '254',
    bestRating: '5',
  },
  logo: '/images/logo/zapit-logo-dark.jpeg',
  logoWhite: '/images/logo/zapit-logo-white.jpeg',
  tagline: 'Pest protection you can trust',
  // Env-driven so staging/prod can target separate containers. The hardcoded
  // fallback is the prior build's container ID — must be confirmed (or replaced
  // with the new Zap-It-owned container) before launch.
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PFGV87RB',
  operatingHours: 'Mon–Fri 8am–5pm, Sat 8am–12pm',
  stats: {
    residentialCustomers: '5000+',
    commercialClients: '500+',
    yearsExperience: '5+',
    responseTime: 'Same Day',
    availability: 'Mon–Fri 8am–5pm',
  },
} as const;

export type NavChild = { label: string; href: string };

export type NavChildGroup = { title: string; items: NavChild[] };

export type NavLink = {
  label: string;
  href: string;
  children?: NavChild[];
  /** Commercial-style menu: "Properties" and "Industries" sections */
  childGroups?: NavChildGroup[];
};

export const NAV_LINKS: NavLink[] = [
  // Figma nav: Residential / Commercial / About Us / Service Areas / FAQs (+ Contact Us footer).
  // Termites + Pest Solutions removed per client brief item 4 (no extra pages beyond Figma).
  // Commercial dropdown removed too — single page only, no sub-page nav.
  { label: 'Residential', href: '/' },
  { label: 'Commercial', href: '/commercial-pest-control' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'FAQs', href: '/frequently-asked-questions' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const FOOTER_LINKS = [
  // Trimmed to match Figma 6-page structure (brief item 4: no extra pages).
  { label: 'Residential Pest Control', href: '/' },
  { label: 'Commercial Pest Control', href: '/commercial-pest-control' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'FAQs', href: '/frequently-asked-questions' },
  { label: 'Contact Us', href: '/contact-us' },
] as const;

export const HOMEPAGE_FAQS = [
  {
    question: 'How much does pest control cost?',
    answer: 'Pest control in Melbourne typically costs between $150 and $400 depending on the pest type, property size, and infestation severity. General treatments for ants, cockroaches, spiders, or rodents range $150–$475, while bed bug or termite services can go up to $400 for comprehensive inspections and treatments.',
  },
  {
    question: 'Are pest control Melbourne services better than doing it yourself?',
    answer: "If you have to deal with one cockroach or a fly, then it is better to do it yourself, but there's always a whole clan behind one. So it is better to hire an expert from Zapit to get your space pest-free.",
  },
  {
    question: 'Which pest is most damaging to the house?',
    answer: 'Termites can cause significant structural damage because they feed on wood within your building and furniture, often without visible signs until the damage is done. Early detection and professional treatment are the best protection.',
  },
  {
    question: 'How does Zapit pest & termite control service work?',
    answer: 'We start the process by identifying the pest species, finding how it is getting into the space, and treating it with the right solution. It means baiting, spraying, or sealing entry points, all solutions designed to root out the source of the problem.',
  },
  {
    question: 'What areas do pest control Melbourne services cover?',
    answer: 'Zapit Pest control Melbourne cover both residential and commercial properties, including homes, offices, restaurants, and warehouses, providing treatments for ants, spiders, rodents, termites, mosquitoes, and more.',
  },
  {
    question: 'How often should I schedule pest control Melbourne services?',
    answer: 'For most homes, pest control Melbourne services are recommended every 3–6 months, but severe infestations may require more frequent visits to ensure a pest-free environment.',
  },
  {
    question: 'Are pest control Melbourne treatments safe for pets and children?',
    answer: 'Zapit uses approved products and responsible application methods. Our technicians will advise you on any re-entry guidance and precautions specific to your treatment.',
  },
  {
    question: 'How do I know what type of cockroach problem I have?',
    answer: 'If they are large, dark cockroaches and you only see one or two occasionally, they may be outdoor cockroaches coming inside — these are often covered under a general pest treatment. If they are small to medium light-brown cockroaches, especially in the kitchen, laundry, bathroom, microwave, cupboards, or around food, they may require a specific German cockroach treatment, which is different from a general spray.',
  },
] as const;
