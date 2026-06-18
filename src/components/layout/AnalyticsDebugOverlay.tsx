'use client';

import { useEffect, useState } from 'react';

// QA accelerator. Append ?debug=tracking to any URL to see the last 20 events
// pushed to window.dataLayer in real time. Never renders in normal navigation —
// zero performance / bundle cost when the flag isn't set.
//
// Use during Phase 2 QA to walk every form/click on staging without GTM
// Preview mode. Visible on mobile too, unlike Preview which is desktop-only.

interface CapturedEvent {
  index: number;
  ts: string;
  payload: Record<string, unknown>;
}

export default function AnalyticsDebugOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [events, setEvents] = useState<CapturedEvent[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') !== 'tracking') return;
    setEnabled(true);

    window.dataLayer = window.dataLayer || [];
    const original = window.dataLayer.push.bind(window.dataLayer);
    let count = 0;

    window.dataLayer.push = function patched(...args: Array<Record<string, unknown>>) {
      args.forEach((payload) => {
        count += 1;
        const captured: CapturedEvent = {
          index: count,
          ts: new Date().toISOString().slice(11, 23),
          payload,
        };
        setEvents((prev) => [captured, ...prev].slice(0, 20));
      });
      return original(...args);
    };

    return () => {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push = original;
      }
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 2147483647,
        width: 'min(420px, 100vw)',
        maxHeight: collapsed ? 36 : '50vh',
        background: 'rgba(13, 64, 46, 0.96)',
        color: '#fff',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 11,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        transition: 'max-height 150ms',
      }}
    >
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        style={{
          width: '100%',
          height: 36,
          background: '#0d402e',
          color: '#1cdc38',
          border: 'none',
          padding: '0 12px',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>analytics debug · {events.length} event{events.length === 1 ? '' : 's'}</span>
        <span>{collapsed ? '▲' : '▼'}</span>
      </button>
      {!collapsed && (
        <div style={{ overflowY: 'auto', maxHeight: 'calc(50vh - 36px)', padding: 8 }}>
          {events.length === 0 ? (
            <p style={{ opacity: 0.7, margin: 0 }}>Waiting for first dataLayer push…</p>
          ) : (
            events.map((e) => (
              <pre
                key={e.index}
                style={{
                  margin: '0 0 6px 0',
                  padding: 6,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                <span style={{ color: '#64FF01' }}>#{e.index} · {e.ts}</span>
                {'\n'}
                {JSON.stringify(e.payload, null, 2)}
              </pre>
            ))
          )}
        </div>
      )}
    </div>
  );
}
