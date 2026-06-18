import type { ServiceLine, PageType } from './types';

// Pure functions — safe to call from server components or pre-render.
// usePathname() based hooks live in client components and call these.

export function getServiceLine(pathname: string): ServiceLine {
  if (pathname.startsWith('/commercial')) return 'commercial';
  if (pathname.includes('termite')) return 'termite';
  if (pathname.includes('emergency') || pathname.includes('urgent')) return 'emergency';
  if (pathname === '/' || pathname.startsWith('/residential')) return 'residential';
  return 'generic';
}

export function getPageType(pathname: string): PageType {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/contact')) return 'contact';
  if (
    pathname.startsWith('/commercial') ||
    pathname.includes('termite') ||
    pathname.includes('pest') ||
    pathname.startsWith('/pest-solutions')
  ) {
    return 'service';
  }
  if (
    pathname.startsWith('/service-areas') ||
    pathname.startsWith('/coburg') ||
    pathname.startsWith('/reservoir')
  ) {
    return 'location';
  }
  if (
    pathname.startsWith('/about') ||
    pathname.startsWith('/frequently-asked-questions') ||
    pathname.startsWith('/privacy')
  ) {
    return 'info';
  }
  return 'other';
}
