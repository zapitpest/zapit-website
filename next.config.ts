import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zapitpestmelbourne.com.au',
        pathname: '/wp-content/**',
      },
    ],
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      // SEO workbook 301 redirects
      {
        source: '/pest-control-melbourne/general-pest-control',
        destination: '/residential',
        permanent: true,
      },
      {
        source: '/pest-control-melbourne',
        destination: '/pest-solutions',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/about-us-new',
        destination: '/about-us',
        permanent: true,
      },
      // Client-requested URL changes (23 Apr 2026)
      {
        source: '/pest-control-werribee',
        destination: '/coburg',
        permanent: true,
      },
      {
        source: '/pest-control-ringwood-east',
        destination: '/reservoir',
        permanent: true,
      },
      // Old suburb URL patterns → new clean URLs
      {
        source: '/pest-control-coburg',
        destination: '/coburg',
        permanent: true,
      },
      {
        source: '/pest-control-reservoir',
        destination: '/reservoir',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
