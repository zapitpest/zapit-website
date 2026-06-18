'use client';

import { useEffect } from 'react';
import { trackClickPhone, trackClickEmail } from '@/lib/analytics/dataLayer';

// Mounted once in RootLayout. Listens for clicks anywhere in the document and
// fires click_phone / click_email events whenever a tel:/mailto: anchor is
// activated. Cross-cutting approach keeps individual anchor components clean —
// adding a new phone link anywhere in the app gets tracked automatically.

export default function ClickTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (href.startsWith('tel:')) {
        trackClickPhone(href.slice(4));
      } else if (href.startsWith('mailto:')) {
        const address = href.slice(7).split('?')[0];
        trackClickEmail(address);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return null;
}
