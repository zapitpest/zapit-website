// Formspree form-lead delivery.
//
// Delivers actual form content (name, email, phone, message) to Adam's
// info@zapitpestmelbourne.com.au via Formspree. Runs client-side because
// the site is a static export — no server route exists.
//
// Independent of the GA4 analytics event (trackFormSubmit) which stays
// as the count-and-attribute channel. This helper is the deliverability
// channel — the actual lead payload a technician can follow up on.
//
// Endpoint is public by design (that is how Formspree client-side POSTs
// work). Spam is guarded by Formspree Formshield ML + reCAPTCHA on the
// form config, not by keeping the URL secret.
//
// Docs: https://help.formspree.io/hc/en-us

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgaewwob';

export interface FormspreeLead {
  form_name: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  form_type?: string;
  service_line?: string;
  source_page?: string;
}

/**
 * Fire-and-forget POST to Formspree. Never blocks the thank-you UI on
 * success — the caller shows thank-you regardless of the return value,
 * so a Formspree outage does not lose the user's session. Analytics
 * (trackFormSubmit) still fires so we retain attribution even if
 * delivery fails.
 */
export async function submitLeadToFormspree(lead: FormspreeLead): Promise<boolean> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `New ${lead.form_name} — ${lead.name || 'Anonymous'}`,
        ...lead,
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
