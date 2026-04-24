'use client';

import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { Phone } from 'lucide-react';

export default function StickyCallButton() {
  return (
    <Link
      href={SITE_CONFIG.phoneTel}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-zapit-green hover:bg-zapit-green-dark text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
      aria-label={`Call ${SITE_CONFIG.phone}`}
    >
      <Phone className="h-5 w-5" />
      <span>Call now</span>
    </Link>
  );
}
