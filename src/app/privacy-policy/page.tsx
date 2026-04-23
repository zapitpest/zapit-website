import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE_CONFIG.name} collects, uses, and protects personal information in line with Australian privacy expectations.`,
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: `Privacy Policy | ${SITE_CONFIG.name}`,
    description: 'Privacy policy for Zap It Pest & Termite Control Melbourne.',
    url: '/privacy-policy',
  },
};

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

const sections = [
  {
    id: 'collection',
    title: 'Information collection',
    body: `We may collect information you provide directly (such as your name, phone number, email address, property address, and details about your pest issue) when you request a quote, book a service, contact us, or use our website forms. We may also collect limited technical data (such as browser type, device type, and general location derived from IP) to keep our website secure and improve performance. We only collect what is reasonable for providing pest control services, responding to enquiries, and meeting legal obligations.`,
  },
  {
    id: 'use',
    title: 'Use of information',
    body: `Information is used to provide and schedule services, prepare quotes, communicate about your booking, process payments where applicable, maintain safety at your property, send service-related messages, improve our operations, and comply with regulatory or insurance requirements. Marketing communications, if any, will be sent only in line with applicable law and your preferences.`,
  },
  {
    id: 'protection',
    title: 'Data protection',
    body: `We take reasonable steps to protect personal information from misuse, loss, and unauthorised access or disclosure. This includes access controls, secure service providers where used, and staff training. No online transmission is fully risk-free; if you have concerns, contact us using the details below.`,
  },
  {
    id: 'cookies',
    title: 'Cookies and similar technologies',
    body: `Our website may use cookies or similar tools to support analytics, session functionality, and advertising measurement where enabled. You can adjust browser settings to limit cookies; some features may not work as intended if you block essential cookies.`,
  },
  {
    id: 'third-party',
    title: 'Third-party services',
    body: `We may use third-party tools for website hosting, analytics, email delivery, and online booking (for example ${SITE_CONFIG.booking.provider} for appointments). Those providers may process data on our behalf under their terms and privacy practices. We recommend reviewing their policies when you use their interfaces.`,
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: `Under the Privacy Act 1988 (Cth) and other applicable law, you may request access to or correction of your personal information, or raise a concern about how we handle it. We will respond within a reasonable time. You may also complain to the Office of the Australian Information Commissioner (OAIC) if you are not satisfied with our response.`,
  },
] as const;

export default function PrivacyPolicyPage() {
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description: `Privacy policy for ${SITE_CONFIG.name}.`,
    url: `${SITE_CONFIG.url}/privacy-policy`,
    inLanguage: 'en-AU',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <>
      <JsonLd data={[generateBreadcrumbSchema(breadcrumbItems), webPageJsonLd]} />

      <section className="bg-gradient-to-b from-zapit-dark to-zapit-dark/95 text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <nav className="text-sm text-gray-300 mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbItems.map((item, i) => (
                <li key={item.href} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="h-4 w-4 text-zapit-green flex-shrink-0" aria-hidden />}
                  {i < breadcrumbItems.length - 1 ? (
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{item.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold max-w-3xl">Privacy policy</h1>
          <p className="mt-4 text-gray-200 max-w-2xl text-sm">Last updated: 23 April 2026. Australian audience.</p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-zapit-text leading-relaxed mb-10 not-prose">
            This policy explains how {SITE_CONFIG.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information. By
            using our website or services, you agree to this policy as updated from time to time.
          </p>

          <div className="space-y-10 not-prose">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="border-b border-zapit-border last:border-0 pb-8 last:pb-0">
                <h2 className="text-xl font-bold text-zapit-dark mb-3">{s.title}</h2>
                <p className="text-zapit-text leading-relaxed">{s.body}</p>
              </section>
            ))}

            <section id="contact" className="pt-2">
              <h2 className="text-xl font-bold text-zapit-dark mb-3">Contact</h2>
              <p className="text-zapit-text leading-relaxed mb-4">
                For privacy questions, access or correction requests, or complaints, contact us:
              </p>
              <ul className="text-zapit-text space-y-2">
                <li>
                  <span className="font-semibold text-zapit-dark">Business: </span>
                  {SITE_CONFIG.name}
                </li>
                <li>
                  <span className="font-semibold text-zapit-dark">Email: </span>
                  <a className="text-zapit-green hover:underline" href={`mailto:${SITE_CONFIG.email}`}>
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-zapit-dark">Address: </span>
                  {SITE_CONFIG.address.full}
                </li>
                <li>
                  <span className="font-semibold text-zapit-dark">Phone: </span>
                  <a className="text-zapit-green hover:underline" href={SITE_CONFIG.phoneTel}>
                    {SITE_CONFIG.phone}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
