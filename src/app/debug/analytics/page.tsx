import type { Metadata } from 'next';
import AnalyticsTester from './AnalyticsTester';

// QA tester page for Phase 2. Hidden from search engines (noindex). Gated
// client-side by the same ?debug=tracking flag used by AnalyticsDebugOverlay —
// without the flag the page shows a blank state. Lets us fire every event
// shape manually without having to wait for real forms or click-tracking.

export const metadata: Metadata = {
  title: 'Analytics Tester (debug)',
  robots: { index: false, follow: false },
};

export default function AnalyticsDebugPage() {
  return <AnalyticsTester />;
}
