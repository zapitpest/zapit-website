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
      // SEO workbook 301 redirects (7 explicit mappings)
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
