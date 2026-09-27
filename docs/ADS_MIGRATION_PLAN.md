# Google Ads Conversion Migration Plan

**Written:** 27 September 2026 · **Owner:** Sharjeel Saleem (Apex AI)
**Target completion:** within 30-day support window (before 17 October 2026)
**Client priority:** #1 — Zaydan flagged 27 Sep as "before SEO page, please. Nothing has recorded since the 9 September cutover. Ads spend is summer only and summer has started."

═══════════════════════════════════════════════════

## 1 · Problem statement

Between 19 July and 8 September, Google Ads conversion events were being recorded via GTM containers `GTM-W85HKKNT` (installed on the old Wix build) and `GTM-WBZC2BHL` (installed on the mid-2025 rebuild). Both containers held live `awct` (Ads conversion tracking) and `awcc` (Ads call conversion) tags firing against conversion IDs `11416284378` and `16873849542`.

At the 9 September DNS cutover to Cloudflare Pages, the site began serving only `GTM-PFGV87RB` (the Zap It–owned production container). PFGV87RB currently holds 10 tags — GA4 + Meta Pixel + WhatConverts + Clarity — and **zero Google Ads conversion tags and no Conversion Linker**. The two legacy containers with the Ads tags are not embedded on any live page.

**Result: zero Google Ads conversion recording since 9 September 2026.**

═══════════════════════════════════════════════════

## 2 · Legacy tag inventory (verified from JSON exports)

### `GTM-W85HKKNT` v3 — conversion account `AW-11416284378`

| Legacy tag | Conversion label | Legacy trigger | Status of trigger under new site |
|------------|------------------|----------------|----------------------------------|
| Submit Lead Form | `KpgDCJLruf8YENrZ2sMq` | Wix form ID `comp-loqc6pak` | ❌ Dead — Wix form no longer exists |
| Call Now Button Click | `zugZCMr0qYEZENrZ2sMq` | Any `tel:` link click | ✅ Portable — every phone link on new site still uses `tel:` |
| Contact Us Form | `ckkHCIaHqoEZENrZ2sMq` | Wix form ID `comp-lh2xegfp` | ❌ Dead — Wix form no longer exists |
| Google Ads Calls from Website | `-_29CIbaxrgZENrZ2sMq` | Phone number swap `0432040404` | ⚠️ Conflict with WhatConverts number swap (see §4) |

### `GTM-WBZC2BHL` v13 — conversion account `AW-16873849542` (via variable `{{Google Ads Conversion ID}}`, plus one tag with the ID hard-coded)

| Legacy tag | Conversion label | Legacy trigger | Status of trigger under new site |
|------------|------------------|----------------|----------------------------------|
| G-Ads Phone Click - Web | `nT9VCIrihKEaEMaFiu4-` | Any `tel:` link click | ✅ Portable |
| G-Ads Email Link Click | `zr4iCMiXx6AaEMaFiu4-` | `mailto:info@zapitpestmelbourne.com.au` | ✅ Portable |
| G-Ads Price Calculator Form Submit | `vYMqCMWMyKAaEMaFiu4-` | Element visibility on calculator | ⚠️ Trigger needs rebuild against new calculator DOM |
| G-Ads Contact Us / Get In Touch Form Submit | `ueo-CPvHyKAaEMaFiu4-` | Page path = `/thank-you/` | ✅ Portable — new site still redirects to `/thank-you/` after form submit |
| G-Ads 30 Sec Call - 1800 | `JRCbCLuoy6AaEMaFiu4-` | Phone number swap `1800 808 149` | ⚠️ Conflict with WhatConverts number swap (see §4) |
| G-Ads 30 Sec Call - 04 | `CP4FCJz_raEaEMaFiu4-` | Phone number swap `0432040404` | ⚠️ Conflict with WhatConverts + duplicates W85HKKNT tag |
| G-Ads Get Timely - Booking | `9QhhCPOXx6AaEMaFiu4-` | Page URL contains `/booking-conformation` | ❌ Dead — old Get Timely booking flow retired; new site sends outbound to `book.squareup.com` |

Also present in WBZC2BHL but not Ads-related: 4 GA4 event tags + Meta Pixel PageView + Google Tag config — all already re-implemented properly in `GTM-PFGV87RB`.

═══════════════════════════════════════════════════

## 3 · Conversion account clarification pending

Both conversion IDs `11416284378` and `16873849542` need to be reconciled with the client's actual Google Ads account structure. The 27 Sep client reply confirmed access will be granted once the specific account ID is confirmed. Read-and-view access requested for `sharjeel@meetapex.ai` so we can:

1. Confirm the two conversion IDs are live in the same account (or a linked MCC)
2. Verify the conversion labels above match what Google Ads has registered
3. Read the last 30 days of conversion recording so we can quantify volume lost since 9 September
4. Verify the rebuilt tags fire correctly against the same account after publish

═══════════════════════════════════════════════════

## 4 · Call tracking conflict (resolution needed before publish)

Three separate systems currently want to own dynamic phone number insertion on the site:

| System | What it does | Currently live? |
|--------|--------------|-----------------|
| Google Ads call conversions (WBZC2BHL "30 Sec Call" tags) | Swap `1800 808 149` and `0432040404` for Ads-attributed sessions, count calls ≥ 30s as conversions | Legacy (dormant) |
| WhatConverts number swapping | Dynamic insertion of a WhatConverts routing number, records every call regardless of source | ✅ Live in PFGV87RB |
| Static site markup | Hard-coded `03 9126 0555` in `src/lib/constants.ts` | ✅ Live |

**Guaranteed race condition** if we bring the Google Ads call tags back alongside WhatConverts. Whichever DOM-mutation runs last wins per page load — numbers won't reconcile in reports, attribution will drift, and Zaydan will see different numbers in Ads UI vs WhatConverts vs the underlying page markup.

**Recommendation:** kill the two Google Ads call conversion tags entirely and let WhatConverts own call tracking end-to-end. WhatConverts already routes calls into a single attribution pipeline that reconciles against Ads via the shared GCLID. This preserves conversion counting for Ads via the Import Offline Conversions path (WhatConverts → Google Ads) without needing the site to swap numbers twice.

**Alternative** (if the client prefers Google-native call conversions): remove WhatConverts number swapping from PFGV87RB, keep Google Ads call swap, accept that call-level context lives only in Google Ads and not in WhatConverts.

Pending Zaydan's decision. Migration plan below assumes recommendation.

═══════════════════════════════════════════════════

## 5 · Migration blueprint — tags to build in `GTM-PFGV87RB`

### 5.1 · Foundation (build first)

- **Conversion Linker** — `gclidw` tag firing on All Pages trigger. Non-negotiable; without it, none of the Ads conversion tags below can attribute correctly to a click.
- **Variable: `{{Google Ads Conversion ID (Zap It)}}`** — one constant string variable set to whichever conversion account ID the client confirms is current. All new Ads tags reference this variable, not a hard-coded number, so any future account swap is one variable edit.

### 5.2 · Tags to build (7 tags · all reference the new Conversion ID variable)

Assumes the recommendation in §4 is accepted (call tracking left to WhatConverts).

| # | New tag name | Type | Conversion label | Firing trigger | Notes |
|---|--------------|------|------------------|----------------|-------|
| 1 | `tag.gads.conversion_linker` | `gclidw` | — | All Pages | Foundation |
| 2 | `tag.gads.form_submit_contact` | `awct` | `ueo-CPvHyKAaEMaFiu4-` | Existing `trg.form_submit_contact` in PFGV87RB | Fires on contact form submit |
| 3 | `tag.gads.click_phone` | `awct` | `nT9VCIrihKEaEMaFiu4-` | Existing `trg.click_phone` in PFGV87RB | Fires on any `tel:` link |
| 4 | `tag.gads.click_email` | `awct` | `zr4iCMiXx6AaEMaFiu4-` | Existing `trg.click_email` in PFGV87RB | Fires on `mailto:` clicks |
| 5 | `tag.gads.book_intent` | `awct` | New label needed (Get Timely tag is dead) | Existing `trg.book_intent` in PFGV87RB | Fires on outbound to `book.squareup.com` — worth creating in Ads as a new conversion since Get Timely is retired |
| 6 | `tag.gads.price_calculator_submit` | `awct` | `vYMqCMWMyKAaEMaFiu4-` | New trigger: form-submit event on `#price-calculator` (or equivalent DOM anchor from `PriceCalculator.tsx`) | Requires reading the current calculator component for the right event hook |
| 7 | `tag.gads.calls_from_whatconverts` | (not a GTM tag) | Via WhatConverts → Google Ads Import Offline Conversions integration | — | Handled outside GTM — WhatConverts native integration with Google Ads |

### 5.3 · Explicit non-actions

- **Do not port** the Wix-form-ID triggers (`comp-loqc6pak`, `comp-lh2xegfp`) — those forms don't exist anymore
- **Do not port** the Get Timely booking trigger (`/booking-conformation`) — that flow is retired
- **Do not port** the 3 legacy call-swap tags — recommendation is to leave call tracking to WhatConverts

═══════════════════════════════════════════════════

## 6 · Execution sequence

Assumes Ads account access granted and call-tracking recommendation accepted.

1. **Build in a GTM workspace (not the default one)** so live traffic keeps flowing to current tags while we stage
2. Create the `{{Google Ads Conversion ID (Zap It)}}` variable
3. Create the Conversion Linker tag (foundation)
4. Create the 6 Ads conversion tags per §5.2, pointing to existing PFGV87RB triggers where possible
5. Rebuild the price-calculator trigger against the current DOM (requires 15 min of DOM inspection)
6. Preview mode QA — visit the site, trigger each event, confirm each tag fires with correct conversion ID + label in Tag Assistant
7. Compare fired labels against Google Ads UI to confirm each conversion action is recognised
8. Publish the workspace as new PFGV87RB version — "Ads conversion migration from W85HKKNT + WBZC2BHL"
9. Monitor Google Ads for 7 days to confirm conversions are recording on the client's ad account
10. Only after 7 days of confirmed recording: pause (not delete) the legacy containers as a safety net. Delete after the current summer campaign cycle.

═══════════════════════════════════════════════════

## 7 · Estimated effort

| Phase | Time | Blocker |
|-------|------|---------|
| Foundation + variable + Conversion Linker | 15 min | none |
| 6 Ads tags via existing triggers | 45 min | none |
| Price calculator trigger rebuild | 30 min | none — DOM inspection on live site |
| Preview mode QA | 30 min | none |
| Publish + Ads-side verification | 30 min | Ads account read access from Zaydan |
| 7-day monitoring | passive | conversion recording actually landing |

**Active work: ~2.5 hours.** Split across two sittings — build today, publish + monitor after Ads access lands.

═══════════════════════════════════════════════════

## 8 · Open items (need Zaydan input)

1. Confirm which conversion account is current — is `AW-16873849542` the one to keep, `AW-11416284378`, or both?
2. Accept the call-tracking recommendation (kill Google Ads call swap, keep WhatConverts) — or say otherwise
3. Grant Ads account read + view to `sharjeel@meetapex.ai`
4. Confirm the `book_intent` conversion should be created as a new Ads conversion action (since Get Timely is retired and the new booking flow is Square)
