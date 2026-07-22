// WhatConverts Lead API integration.
//
// Fire-and-forget: existing GA4 event flow is independent of this call
// completing. Silent failure on network/auth error so user thank-you UX
// is never blocked. Env vars gate the call — when unset, this is a no-op
// so the site still functions before the token is provisioned.
//
// Docs: https://help.whatconverts.com/api/leads/

const WC_API_BASE = 'https://app.whatconverts.com/api/v1';
const WC_TOKEN = process.env.NEXT_PUBLIC_WHATCONVERTS_TOKEN;
const WC_PROFILE_ID = process.env.NEXT_PUBLIC_WHATCONVERTS_PROFILE_ID;

export interface WhatConvertsLead {
  lead_type: 'Web Form';
  form_name: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone_number?: string;
  message?: string;
  lead_url?: string;
  additional_fields?: Record<string, string>;
}

export async function submitLeadToWhatConverts(lead: WhatConvertsLead): Promise<boolean> {
  if (!WC_TOKEN || !WC_PROFILE_ID) {
    if (typeof console !== 'undefined') {
      console.info('[WhatConverts] Credentials not configured — skipping submit');
    }
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

    return response.ok;
  } catch {
    return false;
  }
}
