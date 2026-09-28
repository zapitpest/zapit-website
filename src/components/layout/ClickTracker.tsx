'use client';

import { useEffect } from 'react';
import { trackClickPhone, trackClickEmail, trackBookIntent } from '@/lib/analytics/dataLayer';

// Mounted once in RootLayout. Listens for clicks anywhere in the document and
// fires click_phone / click_email / book_intent events whenever a tel:/mailto:
// or Square booking anchor is activated. Cross-cutting approach keeps
// individual anchor components clean — adding a new phone/booking link
// anywhere in the app gets tracked automatically.
//
// Capture phase so tracking runs before any downstream handler (e.g. the
// WhatConverts number-swap script) can call stopPropagation on the anchor
// and prevent the click from ever reaching the document in bubbling phase.

export default function ClickTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      const ariaLabel = anchor.getAttribute('aria-label')?.toLowerCase() ?? '';
      // WhatConverts number-swap can rewrite the tel: href to a routing
      // number, or in some configurations remove the tel: prefix entirely.
      // Match on either the current href or the aria-label the app sets on
      // every phone anchor ("Call now …"), so the swap can't blackhole us.
      const isPhoneLink = href.startsWith('tel:') || ariaLabel.startsWith('call now');
      if (isPhoneLink) {
        const phoneNumber = href.startsWith('tel:') ? href.slice(4) : href;
        trackClickPhone(phoneNumber);
      } else if (href.startsWith('mailto:')) {
        const address = href.slice(7).split('?')[0];
        trackClickEmail(address);
      } else if (href.includes('book.squareup.com')) {
        trackBookIntent(href);
      }
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return null;
}
