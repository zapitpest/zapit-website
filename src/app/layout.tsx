import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/layout/FloatingCTA';
import GTMScript from '@/components/layout/GTMScript';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from '@/lib/schema';

// Graphik font — brand font supplied by client. Self-hosted via next/font/local.
const graphik = localFont({
  src: [
    { path: '../fonts/graphik/Graphik-Thin.otf', weight: '100', style: 'normal' },
    { path: '../fonts/graphik/Graphik-ThinItalic.otf', weight: '100', style: 'italic' },
    { path: '../fonts/graphik/Graphik-Extralight.otf', weight: '200', style: 'normal' },
    { path: '../fonts/graphik/Graphik-ExtralightItalic.otf', weight: '200', style: 'italic' },
    { path: '../fonts/graphik/Graphik-Light.otf', weight: '300', style: 'normal' },
    { path: '../fonts/graphik/Graphik-LightItalic.otf', weight: '300', style: 'italic' },
    { path: '../fonts/graphik/Graphik-Regular.otf', weight: '400', style: 'normal' },
    { path: '../fonts/graphik/Graphik-RegularItalic.otf', weight: '400', style: 'italic' },
    { path: '../fonts/graphik/Graphik-Medium.otf', weight: '500', style: 'normal' },
    { path: '../fonts/graphik/Graphik-MediumItalic.otf', weight: '500', style: 'italic' },
    { path: '../fonts/graphik/Graphik-Semibold.otf', weight: '600', style: 'normal' },
    { path: '../fonts/graphik/Graphik-SemiboldItalic.otf', weight: '600', style: 'italic' },
    { path: '../fonts/graphik/Graphik-Bold.otf', weight: '700', style: 'normal' },
    { path: '../fonts/graphik/Graphik-BoldItalic.otf', weight: '700', style: 'italic' },
    { path: '../fonts/graphik/Graphik-Black.otf', weight: '800', style: 'normal' },
    { path: '../fonts/graphik/Graphik-BlackItalic.otf', weight: '800', style: 'italic' },
    { path: '../fonts/graphik/Graphik-Super.otf', weight: '900', style: 'normal' },
    { path: '../fonts/graphik/Graphik-SuperItalic.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-graphik',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `Pest Control Melbourne | ${SITE_CONFIG.name}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: `Pest protection you can trust. Zapit protects Melbourne homes and businesses from pests with licensed, approved solutions. Call ${SITE_CONFIG.phone}.`,
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/images/logo/zapit-logo-dark.jpeg',
        width: 600,
        height: 295,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/logo/zapit-logo-dark.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${graphik.variable} h-full antialiased overflow-x-hidden`}>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <GTMScript />
        <JsonLd data={[generateWebSiteSchema(), generateOrganizationSchema(), generateLocalBusinessSchema()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
