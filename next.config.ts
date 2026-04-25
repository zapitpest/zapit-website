import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zapitpestmelbourne.com.au',
        pathname: '/wp-content/**',
      },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
    ],
    formats: ['image/webp'],
  },
  // redirects and headers disabled for static export — use _redirects file for Netlify
  trailingSlash: true,
};

export default nextConfig;
