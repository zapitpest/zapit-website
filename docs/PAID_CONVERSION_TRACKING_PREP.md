# Paid Conversion Tracking — Prep Notes

Per Adam's 23 July 2026 parallel-work list. This document is the ready-to-execute
plan for Google Ads and Meta Ads conversion tracking. Nothing to ship until
Adam launches paid campaigns and shares the conversion IDs.

## Current state

- Meta Pixel base + Lead + Contact events are already firing (Pixel ID
  `1088414402938841`). Meta Business Manager Analyst access to
  `sharjeel@meetapex.ai` granted 22 July.
- No Google Ads account connected yet. Adam confirmed on 07 July that Google Ads
  is planned and IDs will be shared at ad-campaign launch.
- All conversion events (form submits, phone clicks, book_intent) already flow
  through GTM. Only the ad-platform-specific tags need to be added when campaigns
  launch.

---

## Meta Ads — remaining work when campaigns launch

The Meta Pixel base is live and Lead/Contact events already fire. When Meta Ads
launches paid campaigns, we add:

1. **Custom conversion events** in Meta Events Manager, one per campaign objective
   (usually: Lead, Contact, Purchase equivalent for pest-control quote requests).
2. **Advanced Matching verification** — the base pixel already uses
   `user_email_hash` + `user_phone_hash` from the dataLayer. Verify hashes reach
   Meta by checking Events Manager → Diagnostics.
3. **Conversion API server-side backup** — optional Phase 4 add-on. Sends
   conversions server-side alongside the browser pixel to survive iOS 14+
   tracking restrictions. Reserved dataset `zapit_reserved_meta_ads` already
   provisioned for this.

**Estimated effort when triggered:** ~1 hour.

---

## Google Ads — implementation plan

When Adam launches a Google Ads account and shares the Conversion ID +
Conversion Labels, this is what happens:

### GTM tags to add

| Tag name | Type | Trigger | Notes |
|---|---|---|---|
| `tag.gads.conversion_linker` | Conversion Linker | All Pages | Preserves the `_gcl_aw` click ID so conversions attribute correctly on landing pages that arrive via Google Ads. |
| `tag.gads.form_submit` | Google Ads Conversion | All 5 `form_submit_*` triggers | Send-to = `AW-{CONVERSION_ID}/{FORM_LABEL}`. Include hashed email + phone as Enhanced Conversions params. |
| `tag.gads.phone_click` | Google Ads Conversion | `trg.click_phone` | Send-to = `AW-{CONVERSION_ID}/{PHONE_LABEL}`. |
| `tag.gads.book_intent` | Google Ads Conversion | `trg.book_intent` | Send-to = `AW-{CONVERSION_ID}/{BOOK_LABEL}`. Only fires if Zap It re-introduces online booking. |

### Enhanced Conversions

Google Ads' Enhanced Conversions feature ingests hashed email + phone from the
page and matches them against logged-in Google users, recovering conversions
lost to cookie restrictions.

Our GTM container already generates `dlv.user_email_hash` +
`dlv.user_phone_hash` via SHA-256 Custom JS variables at the browser edge
(verified 30 June). These are the exact fields Enhanced Conversions expects.
Zero extra dev work — just wire the Enhanced Conversions section on each
Google Ads Conversion tag to reference these DLVs.

### DataLayer contract

Every existing conversion event already carries the fields Google Ads needs:

```
{
  event: 'form_submit_contact',                 // or click_phone, book_intent
  form_type: 'contact',                          // dynamic per form
  service_line: 'residential',                   // dynamic per page
  page_type: 'contact_us',
  user_email_hash: '<sha256 hex>',               // enhanced conversion
  user_phone_hash: '<sha256 hex>',               // enhanced conversion
  page_path: '/contact-us'
}
```

Zero changes required to the website code when Google Ads goes live. Only GTM
container work.

### GTM Version publish plan

When Google Ads IDs land, we build the 4 tags in a Preview workspace, verify in
Tag Assistant + GA4 DebugView, then publish as GTM V4 with the label
"Phase 4 — Google Ads conversion tags".

**Estimated effort when triggered:** ~1 to 1.5 hours (including QA on every
conversion label).

---

## What blocks each side

| Side | Item | Blocked by |
|---|---|---|
| Google Ads | All 4 tags | Adam creates Google Ads account + shares Conversion ID and per-conversion Labels |
| Meta Ads | Custom conversion events | Adam launches Meta Ads campaigns and confirms which events map to which objectives |

Nothing to run today. All prep is captured above so the future session is a
30-minute checklist execution instead of a discovery exercise.

---

## Reference

- Existing GTM container: `GTM-PFGV87RB`
- Existing Meta Pixel: `1088414402938841`
- Existing custom dimensions in GA4: Service Line, Page Type, Form Type, Click
  Target, Page Path, Phone Number, Destination URL
- Reserved BQ datasets: `zapit_reserved_google_ads`, `zapit_reserved_meta_ads`

## Version history

- **2026-07-23** — Created per Adam's 23 July directive to progress paid
  conversion tracking prep in parallel with Pages 2-6 build.
