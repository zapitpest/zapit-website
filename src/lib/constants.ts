export const SITE_CONFIG = {
  name: 'Zap It Pest & Termite Control Melbourne',
  shortName: 'Zap It Pest Control',
  phone: '03 9126 0555',
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
  logo: '/images/logo/zapit-logo-main.png',
  gtmId: 'GTM-WBZC2BHL',
  operatingHours: 'Open 24 hours, 7 days a week',
  stats: {
    emergenciesSolved: '5000+',
    yearsExperience: '15+',
    firstVisitSuccess: '99%',
    responseTime: '< 2 Hours',
    availability: '24/7',
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
  { label: 'Residential', href: '/residential' },
  {
    label: 'Commercial',
    href: '/commercial-pest-control',
    childGroups: [
      {
        title: 'Properties',
        items: [{ label: 'Properties', href: '/commercial-pest-control' }],
      },
      {
        title: 'Industries',
        items: [
          { label: 'Warehousing and Storage', href: '/commercial-pest-control#warehousing' },
          { label: 'Restaurants', href: '/commercial-pest-control#restaurants' },
          { label: 'Supermarkets', href: '/commercial-pest-control#supermarkets' },
          { label: 'Function Venues', href: '/commercial-pest-control#venues' },
          { label: 'Brewhouses and Distilleries', href: '/commercial-pest-control#brewhouses' },
          { label: 'Recreational Facilities', href: '/commercial-pest-control#recreational' },
          { label: 'Government Buildings', href: '/commercial-pest-control#government' },
        ],
      },
    ],
  },
  { label: 'Termites', href: '/termite-control-melbourne' },
  {
    label: 'Pest Solutions',
    href: '/pest-solutions',
    children: [
      { label: 'Ants', href: '/ant-pest-control-melbourne' },
      { label: 'Rodents', href: '/rodent-control-melbourne' },
      { label: 'Termites', href: '/termite-control-melbourne' },
      { label: 'Bees', href: '/bee-removal-melbourne' },
      { label: 'Spiders', href: '/spider-control-melbourne' },
      { label: 'Fleas', href: '/flea-control-melbourne' },
      { label: 'Birds', href: '/birds-control-melbourne' },
      { label: 'Silverfish', href: '/silverfish-control-melbourne' },
      { label: 'Mosquito', href: '/mosquito-control-melbourne' },
      { label: 'Wood Borers', href: '/treatment-for-wood-borers-in-melbourne' },
      { label: 'Cockroaches', href: '/cockroach-control-melbourne' },
      { label: 'Bed Bugs', href: '/bed-bug-control-melbourne' },
      { label: 'Wasps', href: '/wasp-removal-melbourne' },
      { label: 'Possums', href: '/possum-removal-melbourne' },
      { label: 'Flies', href: '/fly-control-melbourne' },
      { label: 'Clothes Moth', href: '/clothes-moths-treatment-melbourne' },
    ],
  },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'FAQs', href: '/frequently-asked-questions' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const FOOTER_LINKS = [
  { label: 'Residential Pest Control', href: '/residential' },
  { label: 'Termite Control', href: '/termite-control-melbourne' },
  { label: 'Rodent Control', href: '/rodent-control-melbourne' },
  { label: 'Wasp Removal', href: '/wasp-removal-melbourne' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Sitemap', href: '/sitemap' },
] as const;

export const HOMEPAGE_FAQS = [
  {
    question: 'How much does pest control cost?',
    answer: 'Pest control in Melbourne typically costs between $150 and $400 depending on the pest type, property size, and infestation severity. General treatments for ants, cockroaches, spiders, or rodents range $150–$475, while bed bug or termite services can go up to $400 for comprehensive inspections and treatments.',
  },
  {
    question: 'Are pest control Melbourne services better than doing it yourself?',
    answer: "If you have to deal with one cockroach or a fly, then it is better to do it yourself, but there's always a whole clan behind one. So it is better to hire an expert from Zap It to get your space pest-free.",
  },
  {
    question: 'Which pest is most damaging to the house?',
    answer: 'Termite is the most dangerous pest for houses because they quietly eat up all the wood of your building structure and furniture without making you realising it.',
  },
  {
    question: 'How does Zap It pest & termite control service work?',
    answer: 'We start the process by identifying the pest species, finding how it is getting into the space, and treating it with the right solution. It means baiting, spraying, or sealing entry points, all solutions designed to root out the source of the problem.',
  },
  {
    question: 'What areas do pest control Melbourne services cover?',
    answer: 'Zap It Pest control Melbourne cover both residential and commercial properties, including homes, offices, restaurants, and warehouses, providing treatments for ants, spiders, rodents, termites, mosquitoes, and more.',
  },
  {
    question: 'How often should I schedule pest control Melbourne services?',
    answer: 'For most homes, pest control Melbourne services are recommended every 3–6 months, but severe infestations may require more frequent visits to ensure a pest-free environment.',
  },
  {
    question: 'Are pest control Melbourne treatments safe for pets and children?',
    answer: 'Yes. Zap It Pest & Termite Control Melbourne services use pet-safe and child-friendly products, ensuring effective pest elimination without compromising the safety of your family or pets.',
  },
] as const;
