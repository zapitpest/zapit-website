# WhatConverts Form-Wiring Implementation Plan

**Purpose:** pre-designed implementation plan so the future ~1.5h WhatConverts follow-up session executes in ~45 min instead. Ready-to-code once WhatConverts phone-tracking allocation lands.

**Current state:** ContactForm.tsx fires `trackFormSubmit()` (GA4 event via dataLayer) but does NOT POST form data anywhere. Leads are being counted in GA4 but not captured/stored anywhere Zap It can action them.

**Why this matters:** without form-data capture, the site is measuring "someone filled out the form" but Zap It has no idea what they said or how to contact them. Not a functional lead-capture flow — must be fixed before real traffic hits the site.

---

## Current ContactForm.tsx state (audit)

**Path:** [src/components/sections/ContactForm.tsx](../src/components/sections/ContactForm.tsx)

Current `handleSubmit`:
```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  trackFormSubmit({
    formType: 'contact',
    email: form.email || undefined,
    phone: form.phone || undefined,
  });
  setSubmitted(true);
};
```

**What works:** GA4 `form_submit_contact` event fires with hashed PII → analytics dashboard sees the conversion.

**What's missing:** the actual `form` data (name, email, phone, message) never leaves the browser. No POST, no email, no CRM record. `setSubmitted(true)` just shows the thank-you UI — Zap It never sees the lead.

---

## Solution — three integration options ranked

### Option A ⭐ RECOMMENDED — Direct WhatConverts Lead API POST

**How it works:** ContactForm's `handleSubmit` sends a POST to `https://app.whatconverts.com/api/v1/leads` with the form fields + auth token. WhatConverts creates a lead record, attributes it to the session (source/medium/campaign), and it appears in their dashboard + BigQuery ingest once the future ingest block ships.

**Pros:**
- Full control over lead data
- Works with our static export (no server-side needed)
- Explicit success/failure handling
- Lead appears in WhatConverts dashboard instantly
- Session attribution automatic (WhatConverts JS runs on every page → sets tracking cookies → API POST joins the session)

**Cons:**
- API token lives in client-side code (public-visible)
- Mitigation: WhatConverts issues "Web Tracking Key" tokens that only accept lead-write, not read — low-risk exposure

**Estimated implementation time:** ~45 min (code + test + verify in WhatConverts dashboard)

### Option B — WhatConverts JavaScript form auto-detection

**How it works:** enable form-tracking in WhatConverts dashboard → WhatConverts' script auto-detects form submissions based on selectors → captures form fields automatically.

**Pros:**
- Zero code change on our side
- Configured entirely in WhatConverts dashboard

**Cons:**
- WhatConverts' auto-detection may not reliably capture React-controlled forms (form fields update via `onChange` state, not DOM directly)
- Less transparent — if it fails, hard to debug
- Overrides our explicit `handleSubmit` control

**Estimated implementation time:** ~15 min setup + potentially ~30 min debugging if auto-detect misfires on React forms

### Option C — WhatConverts embedded form (replace our form)

**How it works:** replace our custom-designed ContactForm with WhatConverts' embedded iframe form.

**Pros:**
- Zero backend work
- Guaranteed WhatConverts capture

**Cons:**
- **Loses the current Zap It brand design** (styled Figma-approved form)
- Loses field customisation (name/email/phone/message layout, validation, confirmation UX)
- iframe-embedded = worse accessibility + not indexable
- Regression from current polish level

**Not recommended.** Only listed for completeness.

---

## Recommended implementation — Option A (direct API POST)

### Step 1 — Add WhatConverts helper module

New file: `src/lib/whatconverts.ts`

```typescript
// WhatConverts Lead API integration
// Docs: https://help.whatconverts.com/api/leads/

const WC_API_BASE = 'https://app.whatconverts.com/api/v1';

// Web Tracking Key — set via env var so it can be rotated without redeploy
// Type: write-only (accepts new leads, no read access to existing data)
const WC_TOKEN = process.env.NEXT_PUBLIC_WHATCONVERTS_TOKEN;
const WC_PROFILE_ID = process.env.NEXT_PUBLIC_WHATCONVERTS_PROFILE_ID; // 171358

export interface WhatConvertsLead {
  lead_type: 'Web Form';
  form_name: string;                    // e.g. 'Contact Form'
  contact_name?: string;
  contact_email?: string;
  contact_phone_number?: string;
  message?: string;
  lead_url?: string;                    // page the form was submitted from
  additional_fields?: Record<string, string>;  // service_line, form_type, etc.
}

export async function submitLeadToWhatConverts(lead: WhatConvertsLead): Promise<boolean> {
  if (!WC_TOKEN || !WC_PROFILE_ID) {
    console.warn('[WhatConverts] Missing credentials — skipping submit');
    return false;
  }

  try {
    const response = await fetch(`${WC_API_BASE}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${WC_TOKEN}`,
      },
      body: JSON.stringify({
        profile_id: WC_PROFILE_ID,
        ...lead,
      }),
    });

    if (!response.ok) {
      console.error('[WhatConverts] API returned', response.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[WhatConverts] Submit failed', err);
    return false;
  }
}
```

### Step 2 — Wire ContactForm.tsx to call it

Change to `handleSubmit`:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Fire GA4 event immediately (independent of WhatConverts success)
  trackFormSubmit({
    formType: 'contact',
    email: form.email || undefined,
    phone: form.phone || undefined,
  });

  // Fire WhatConverts lead POST (best-effort, doesn't block UI)
  submitLeadToWhatConverts({
    lead_type: 'Web Form',
    form_name: 'Contact Form',
    contact_name: form.name || undefined,
    contact_email: form.email || undefined,
    contact_phone_number: form.phone || undefined,
    message: form.message || undefined,
    lead_url: typeof window !== 'undefined' ? window.location.href : undefined,
    additional_fields: {
      form_type: 'contact',
    },
  }).catch(() => {
    // Silent failure — GA4 still counted the event, don't block user UX
  });

  setSubmitted(true);
};
```

**Design decisions:**
- **Fire-and-forget on WhatConverts** — don't block the confirmation UI on the API call. Users see thank-you immediately even if network is slow.
- **GA4 event fires unconditionally** — analytics measurement doesn't depend on WhatConverts availability. Both are independent tracking pipelines.
- **Silent failure** — don't show error UI if WhatConverts is temporarily down. Lead is still captured in GA4 for the record; can be manually recovered from server logs if needed.

### Step 3 — Environment variables

Add to `.env.local.example`:

```bash
NEXT_PUBLIC_WHATCONVERTS_TOKEN=<get from WhatConverts dashboard → Settings → Web Tracking>
NEXT_PUBLIC_WHATCONVERTS_PROFILE_ID=171358
```

Add to Netlify environment variables (Site Settings → Environment):
- `NEXT_PUBLIC_WHATCONVERTS_TOKEN`
- `NEXT_PUBLIC_WHATCONVERTS_PROFILE_ID=171358`

Trigger redeploy after adding.

### Step 4 — Apply same wiring to InquiryForm.tsx + CommercialInquiryForm.tsx

These forms are pre-wired for `trackFormSubmit()` but aren't currently mounted on any page. When they are mounted (either as part of homepage redesign or commercial page), extend the same `submitLeadToWhatConverts` call with `form_name: 'Quote Enquiry'` and `form_name: 'Commercial Enquiry'` respectively.

### Step 5 — Testing checklist

1. **Local test:** submit ContactForm in dev mode with test data → check browser DevTools Network tab shows POST to app.whatconverts.com returning 200 OK
2. **WhatConverts dashboard:** the lead should appear in Zap It Pest Control's Leads view within 30 seconds
3. **GA4 DebugView:** confirm `form_submit_contact` event still fires (unchanged)
4. **Attribution check:** submit from an incognito browser after clicking a Google organic result → WhatConverts should attribute the lead to `google / organic`
5. **Failure case:** deploy with a deliberately-wrong token → confirm form still submits successfully, GA4 event still fires, thank-you UI still shows (silent failure works)
6. **Production smoke test:** submit real form on `zapitpestmelbourne.netlify.app` → lead appears in WhatConverts

---

## Prerequisites (blocking dependencies)

Before implementing:

1. **Adam authorises Melbourne 03 phone number allocation in WhatConverts** — not strictly required for form-only tracking, but bundle in one session for efficiency (phone-tracking + form-wiring together)
2. **Adam provides WhatConverts Web Tracking Token** — dashboard → Settings → Tracking → API Token → generate write-only token → share via secure channel (1Password preferred)
3. **User (Sharjeel) has WhatConverts dashboard access** — confirmed granted this week

---

## Implementation session plan (~45 min)

| Step | Time | Notes |
|---|---|---|
| Add `src/lib/whatconverts.ts` helper | 10 min | Type-safe fetch wrapper |
| Wire ContactForm.tsx handleSubmit | 5 min | Fire-and-forget pattern |
| Add env vars locally + Netlify | 5 min | Trigger redeploy |
| Local test — dev submit + browser inspect | 10 min | Confirm POST + WC dashboard receipt |
| Extend to InquiryForm + CommercialInquiryForm | 5 min | Same pattern, different form_name |
| Production smoke test | 5 min | Live URL submit + WC verify |
| Commit + push + document | 5 min | `feat: wire ContactForm → WhatConverts API + fire-and-forget lead capture` |

**Total: ~45 min once WhatConverts token is in hand.**

---

## After implementation — what to update

- `docs/MVP_STATUS.md` — mark WhatConverts form-wiring ✅
- `docs/HANDOVER_RUNBOOK.md` §4.1 (add a new form) — document the pattern
- Log portal entry — ~1h (0.75h implementation + 0.25h test + commit)

---

## Bottom line

**All design decisions made. Zero unknowns.** When the token lands, the implementation is 45 minutes end-to-end with high confidence of first-try success.
