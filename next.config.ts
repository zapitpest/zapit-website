import type { NextConfig } from 'next';
import path from 'path';

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
  // Turbopack: pin tailwindcss resolution to the project's node_modules so
  // @tailwindcss/postcss always resolves from the right context in dev mode.
  turbopack: {
    resolveAlias: {
      tailwindcss: path.resolve(__dirname, 'node_modules/tailwindcss'),
    },
  },
};

export default nextConfig;
