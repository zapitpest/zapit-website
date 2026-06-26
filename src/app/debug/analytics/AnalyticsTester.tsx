'use client';

import { useState, useSyncExternalStore } from 'react';
import {
  trackFormSubmit,
  trackClickPhone,
  trackClickEmail,
} from '@/lib/analytics';
import type { FormType, ServiceLine } from '@/lib/analytics';

const FORM_TYPES: FormType[] = ['quote', 'booking', 'contact', 'callback', 'emergency'];
const SERVICE_LINES: ServiceLine[] = ['residential', 'commercial', 'termite', 'emergency', 'generic'];

// React-correct way to read URL query param without triggering the
// "setState in effect" cascading-render warning.
const subscribeUrl = () => () => {};
const readDebugFlag = () =>
  new URLSearchParams(window.location.search).get('debug') === 'tracking';
const serverDebugFlag = () => false;

export default function AnalyticsTester() {
  const enabled = useSyncExternalStore(subscribeUrl, readDebugFlag, serverDebugFlag);
  const [serviceLine, setServiceLine] = useState<ServiceLine>('residential');
  const [email, setEmail] = useState('test+qa@example.com');
  const [phone, setPhone] = useState('0391260555');

  if (!enabled) {
    return (
      <main style={pageStyle}>
        <p>Append <code>?debug=tracking</code> to enable.</p>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Analytics tester</h1>
      <p style={{ marginBottom: 24, opacity: 0.8 }}>
        Fires real dataLayer events. Open the bottom-right overlay to watch them land.
        Use against a staging container only — never production.
      </p>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Form submits</h2>
        <div style={{ marginBottom: 12 }}>
          <label>Service line:&nbsp;</label>
          <select value={serviceLine} onChange={(e) => setServiceLine(e.target.value as ServiceLine)}>
            {SERVICE_LINES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email: </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Phone: </label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
        </div>
        <div style={btnRowStyle}>
          {FORM_TYPES.map((ft) => (
            <button
              key={ft}
              type="button"
              onClick={() => trackFormSubmit({ formType: ft, email, phone, serviceLine })}
              style={btnStyle}
            >
              form_submit_{ft}
            </button>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Contact clicks</h2>
        <div style={btnRowStyle}>
          <button type="button" onClick={() => trackClickPhone(phone)} style={btnStyle}>
            click_phone
          </button>
          <button type="button" onClick={() => trackClickEmail(email)} style={btnStyle}>
            click_email
          </button>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Real anchors (also fire via ClickTracker)</h2>
        <p style={{ marginBottom: 8, fontSize: 13, opacity: 0.7 }}>
          These fire through the global ClickTracker — useful to confirm the listener catches them.
        </p>
        <div style={btnRowStyle}>
          <a href={`tel:${phone}`} style={btnStyle as React.CSSProperties}>tel: {phone}</a>
          <a href={`mailto:${email}`} style={btnStyle as React.CSSProperties}>mailto: {email}</a>
        </div>
      </section>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  maxWidth: 720,
  margin: '40px auto',
  padding: '0 20px',
  fontFamily: 'system-ui, sans-serif',
  color: '#131a1c',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: 32,
  padding: 16,
  border: '1px solid #e5e5e5',
  borderRadius: 8,
};

const h2Style: React.CSSProperties = {
  fontSize: 18,
  marginBottom: 12,
  color: '#0d402e',
};

const inputStyle: React.CSSProperties = {
  padding: '6px 10px',
  border: '1px solid #c8c8c8',
  borderRadius: 4,
  fontSize: 14,
  minWidth: 240,
};

const btnRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
};

const btnStyle: React.CSSProperties = {
  padding: '8px 14px',
  background: '#0d402e',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  fontSize: 13,
  cursor: 'pointer',
  textDecoration: 'none',
  fontFamily: 'inherit',
};
