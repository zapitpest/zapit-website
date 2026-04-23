import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyCallButton from '@/components/layout/StickyCallButton';
import GTMScript from '@/components/layout/GTMScript';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from '@/lib/schema';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `Pest Control Melbourne | ${SITE_CONFIG.name}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: `Zap It delivers fast, licensed pest & termite control across Melbourne, safe for pets & people, protecting homes & businesses from pests. Call ${SITE_CONFIG.phone}.`,
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
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
    <html lang="en-AU" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <GTMScript />
        <JsonLd data={[generateWebSiteSchema(), generateOrganizationSchema(), generateLocalBusinessSchema()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCallButton />
      </body>
    </html>
  );
}
