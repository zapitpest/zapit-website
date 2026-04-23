import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { BLOG_LIST_POSTS } from '@/lib/blog-list';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Pest Control Blog & Tips',
  description: `Practical pest control advice for Melbourne homes and businesses from ${SITE_CONFIG.shortName}.`,
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: `Pest Control Blog & Tips | ${SITE_CONFIG.name}`,
    description: `Pest control guides and Melbourne-specific tips from ${SITE_CONFIG.shortName}.`,
    url: '/blogs',
  },
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso + 'T12:00:00'),
  );
}

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Blogs', href: '/blogs' },
];

export default function BlogsPage() {
  const itemListJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: BLOG_LIST_POSTS.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: post.title,
      url: `${SITE_CONFIG.url}/blogs#${post.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[generateBreadcrumbSchema(breadcrumbItems), itemListJsonLd]} />

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
          <h1 className="text-3xl md:text-4xl font-bold max-w-3xl">Pest control tips for Melbourne</h1>
          <p className="mt-4 text-gray-200 max-w-2xl leading-relaxed">
            Clear, practical articles on inspections, treatment timing, and what to expect in local conditions.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-zapit-light min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-5xl">
          <ul className="space-y-8">
            {BLOG_LIST_POSTS.map((post) => (
              <li
                key={post.slug}
                id={post.slug}
                className="bg-white border border-zapit-border rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row"
              >
                <div className="relative w-full sm:w-64 md:w-80 h-48 sm:h-auto sm:min-h-[200px] flex-shrink-0 bg-zapit-dark">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <time dateTime={post.date} className="text-sm text-zapit-green font-semibold">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="text-xl font-bold text-zapit-dark mt-1 mb-2">{post.title}</h2>
                  <p className="text-zapit-text text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
