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
      // Three-layer detection so the swap can't blackhole us:
      //   1. current href starts with tel: (survives WhatConverts number swap)
      //   2. aria-label starts with "call now" (present on all main CTA anchors)
      //   3. anchor text contains an Australian phone number (matches every
      //      remaining phone anchor without needing per-component changes)
      const anchorText = anchor.textContent ?? '';
      const auPhonePattern = /\b0[2-9](?:\s?\d){8}\b|\b1(?:300|800)\s?\d{3}\s?\d{3}\b/;
      const isPhoneLink =
        href.startsWith('tel:') ||
        ariaLabel.startsWith('call now') ||
        auPhonePattern.test(anchorText);
      if (isPhoneLink) {
        const phoneNumber = href.startsWith('tel:')
          ? href.slice(4)
          : (anchorText.match(auPhonePattern)?.[0] ?? href);
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
