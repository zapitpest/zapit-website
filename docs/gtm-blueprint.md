# GTM Container Blueprint — Zap It MVP

When Adam grants Publish access on the new Zap-It-owned GTM container, configure
it top-to-bottom from this doc. Every item maps to a row in the BigQuery
Foundation v4 data contract Appendix A.

## Container settings

- **Container name:** `Zap It — Production` (separate container for staging)
- **Target:** Web
- **Default workspace:** rename to `Default`
- **Install:** already in code via `src/components/layout/GTMScript.tsx`,
  reading `NEXT_PUBLIC_GTM_ID` from env. Per environment:
  - Staging Netlify deploy → staging container ID
  - Production Netlify deploy → production container ID

## Built-in variables to enable

Tags → Variables → Configure (built-in):

- Page Path
- Page URL
- Page Hostname
- Referrer
- Click Element
- Click URL
- Click Text
- Form Element
- Form ID

## Data Layer Variables (custom)

Each pulls a typed field that our dataLayer pushes from `dataLayer.ts`.

| Variable name      | Data layer key   | Default      |
|--------------------|------------------|--------------|
| `dlv.service_line` | `service_line`   | `generic`    |
| `dlv.page_type`    | `page_type`      | `other`      |
| `dlv.page_path`    | `page_path`      | _(empty)_    |
| `dlv.form_type`    | `form_type`      | _(empty)_    |
| `dlv.click_target` | `click_target`   | _(empty)_    |
| `dlv.user_email`   | `user_email`     | _(empty)_    |
| `dlv.user_phone`   | `user_phone`     | _(empty)_    |
| `dlv.phone_number` | `phone_number`   | _(empty)_    |
| `dlv.email_address`| `email_address`  | _(empty)_    |

## PII normalization + hashing

Two custom JS variables. They run BEFORE any tag that sends user_email_hash /
user_phone_hash to GA4 or Meta.

### `dlv.user_email_hash`

```js
function() {
  var raw = {{dlv.user_email}};
  if (!raw) return undefined;
  var normalized = String(raw).trim().toLowerCase();
  // SHA-256 via Web Crypto. Async — wrap consumers in a "GA4 Hashed" tag
  // sequence that waits on the digest before send. Reference impl in GTM
  // template gallery: "SHA-256 string" by Simo Ahava.
  return sha256(normalized);
}
```

### `dlv.user_phone_hash`

```js
function() {
  var raw = {{dlv.user_phone}};
  if (!raw) return undefined;
  var digits = String(raw).replace(/\D/g, '');
  // Australian normalization to E.164:
  // - leading 0  → +61<rest>  (domestic)
  // - leading 61 → +61<rest>  (already country-coded, no +)
  // - leading +  → keep as-is
  var e164;
  if (digits.indexOf('61') === 0) e164 = '+' + digits;
  else if (digits.indexOf('0') === 0) e164 = '+61' + digits.substring(1);
  else e164 = '+' + digits;
  return sha256(e164);
}
```

Install the Simo Ahava "SHA-256 String" GTM template (or equivalent) from the
community gallery — provides the `sha256()` helper used above.

## Triggers

| Trigger name                   | Type           | Fires when                                             |
|--------------------------------|----------------|--------------------------------------------------------|
| `trg.form_submit_quote`        | Custom event   | `Event` equals `form_submit_quote`                     |
| `trg.form_submit_booking`      | Custom event   | `Event` equals `form_submit_booking`                   |
| `trg.form_submit_contact`      | Custom event   | `Event` equals `form_submit_contact`                   |
| `trg.form_submit_callback`     | Custom event   | `Event` equals `form_submit_callback`                  |
| `trg.form_submit_emergency`    | Custom event   | `Event` equals `form_submit_emergency`                 |
| `trg.click_phone`              | Custom event   | `Event` equals `click_phone`                           |
| `trg.click_email`              | Custom event   | `Event` equals `click_email`                           |
| `trg.all_pages`                | Page View      | All Pages — for GA4 config + Meta Pixel base           |

## Tags

### GA4 Configuration tag

- **Type:** Google Analytics: GA4 Configuration
- **Measurement ID:** `G-XXXXXXXXXX` (replace with the production GA4 ID)
- **Send page_view:** ON
- **Fields to set:**
  - `service_line` = `{{dlv.service_line}}`
  - `page_type` = `{{dlv.page_type}}`
- **Trigger:** `trg.all_pages`

### 5× GA4 Event tags — form submits

For each of `quote`, `booking`, `contact`, `callback`, `emergency`:

- **Type:** Google Analytics: GA4 Event
- **Configuration tag:** reference to the GA4 Configuration tag above
- **Event name:** `form_submit_<type>` (e.g. `form_submit_quote`)
- **Event parameters:**
  - `service_line` = `{{dlv.service_line}}`
  - `page_type` = `{{dlv.page_type}}`
  - `page_path` = `{{dlv.page_path}}`
  - `form_type` = `{{dlv.form_type}}`
  - `user_email_hash` = `{{dlv.user_email_hash}}`
  - `user_phone_hash` = `{{dlv.user_phone_hash}}`
- **Mark as conversion:** YES (also configure in GA4 admin)
- **Trigger:** matching `trg.form_submit_<type>`

### 2× GA4 Event tags — clicks

- **`tag.ga4.click_phone`** → event name `click_phone`, params include `phone_number`, fires on `trg.click_phone`
- **`tag.ga4.click_email`** → event name `click_email`, params include `email_address` (UNHASHED — destination of the link, not user PII), fires on `trg.click_email`

### Meta Pixel base

- **Type:** Custom HTML
- **HTML:** standard Meta Pixel snippet with `fbq('init', '<PIXEL_ID>')` + `fbq('track', 'PageView')`
- **Trigger:** `trg.all_pages`

### Meta Pixel — Lead events

One Custom HTML tag per form_submit trigger:

```html
<script>
  fbq('track', 'Lead', {
    content_category: {{dlv.service_line}},
    content_name: {{dlv.form_type}},
    em: {{dlv.user_email_hash}},
    ph: {{dlv.user_phone_hash}}
  });
</script>
```

- **Trigger:** all five `trg.form_submit_*` triggers
- **Tag sequencing:** fires after Meta Pixel base on the same page

### Meta Pixel — Contact click

```html
<script>fbq('track', 'Contact', { content_category: {{dlv.service_line}} });</script>
```

- **Trigger:** `trg.click_phone` and `trg.click_email`

## Publish checklist

Before publishing the container live:

- [ ] All variables resolve in Preview mode (load each page, fire each event, check values are non-empty where expected)
- [ ] PII hashes are present on form submit events — verify they look like 64-char hex
- [ ] Raw `user_email` / `user_phone` never appear in any tag's parameters (only hashed)
- [ ] GA4 DebugView shows each event arriving with all parameters
- [ ] Meta Pixel Helper extension shows Lead/Contact events firing on the right triggers
- [ ] Container version named with a date + summary (e.g. `2026-06-XX — MVP launch`)

## Adding a new event later

1. Add the event to `src/lib/analytics/types.ts` (union type + interface)
2. Add a helper to `src/lib/analytics/dataLayer.ts`
3. Add a row to BigQuery Foundation v4 Appendix A (data contract)
4. Add trigger + tag in GTM following the patterns above
5. Bump the GTM container version with a changelog entry
