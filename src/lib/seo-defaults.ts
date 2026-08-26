// Shared SEO defaults reused across page-level metadata.
//
// Next.js 16 metadata inheritance quirk: when a child page defines its own
// `openGraph` object, the parent's `openGraph.images` array is NOT merged in
// — it is dropped entirely. Same applies to `twitter.images`. Every page that
// overrides these blocks must therefore include the image array explicitly,
// or social previews render without a hero image.
//
// These constants let per-page metadata spread the default image without
// repeating the object shape every time.

const LOGO_PATH = '/images/logo/zapit-logo-dark.jpeg';

export const OG_DEFAULT_IMAGES = [
  {
    url: LOGO_PATH,
    width: 600,
    height: 295,
    alt: 'Zapit Pest & Termite Control Melbourne',
  },
] as const;

export const TWITTER_DEFAULT_IMAGES = [LOGO_PATH] as const;
