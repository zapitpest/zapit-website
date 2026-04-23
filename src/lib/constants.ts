export const SITE_CONFIG = {
  name: 'Zap It Pest & Termite Control Melbourne',
  shortName: 'Zap It Pest Control',
  phone: '03 9126 0555',
  phoneTel: 'tel:0391260555',
  email: 'info@zapitpestmelbourne.com.au',
  emailWork: 'wo@zapitpestmelbourne.com.au',
  url: 'https://zapitpestmelbourne.com.au',
  address: {
    street: '80 Porter Rd',
    locality: 'Heidelberg Heights',
    region: 'VIC',
    postalCode: '3081',
    country: 'AU',
    full: '80 Porter Rd, Heidelberg Heights, VIC 3081',
  },
  social: {
    instagram: 'https://www.instagram.com/zapit_pestcontrol',
    facebook:
      'https://www.facebook.com/people/Zap-It-Pest-Control-Melbourne/100084044233762/',
    tiktok: 'https://www.tiktok.com/@zapitpestcontrol',
  },
  booking: {
    url: 'https://book.squareup.com/appointments/3a4pl9xar87khq/location/LP1Y6JYA2E1S1/services',
    provider: 'Square',
  },
  rating: {
    value: '5',
    count: '224',
    bestRating: '5',
  },
  logo: '/images/zapit-logo.png',
  gtmId: 'GTM-WBZC2BHL',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Residential', href: '/residential' },
  { label: 'Commercial', href: '/commercial-pest-control' },
  {
    label: 'Pest Solutions',
    href: '/pest-solutions',
    children: [
      { label: 'Termite Control', href: '/pest-control-melbourne/termite-control-melbourne' },
      { label: 'Rodent Removal', href: '/pest-control-melbourne/rodent-removal' },
      { label: 'Wasp Removal', href: '/pest-control-melbourne/wasp-removal-melbourne' },
    ],
  },
  { label: 'Blog', href: '/blogs' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Pricing', href: '/pricing' },
] as const;
