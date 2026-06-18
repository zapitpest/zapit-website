'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getServiceLine, getPageType } from '@/lib/analytics/service-line';

// Pushes a context event on every route change so GTM can attach service_line +
// page_type to GA4's automatic page_view. Without this, only conversion events
// would carry the service_line tag — page_views would not — and the "leads by
// service line" Looker dashboard would have nothing to filter by for traffic.
//
// In GTM, set the GA4 Configuration tag's "Fields to set" to read from
// {{dlv.service_line}} and {{dlv.page_type}}. They'll be populated by the time
// the next page_view fires.

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view_context',
      service_line: getServiceLine(pathname),
      page_type: getPageType(pathname),
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
