# ⚡ THURSDAY CALL — Live Action Steps

**Call:** 5:00 PM Melbourne · 12:00 PM Karachi · https://meet.google.com/zuk-gtjc-drq

═══════════════════════════════════════════════════

# 🔑 THE FLOW

**YOU sign in as `info@zapitpestmelbourne.com.au` (Owner) → Adam taps MFA on phone → you do EVERYTHING from your screen.**

- You: 1 login, all clicks, 1 sign-out at end
- Adam: 1 MFA tap on phone (2 seconds)
- No screen swap. No credential drama.

═══════════════════════════════════════════════════

# ⏱️ BEFORE CALL (5 min)

## Have these ready

- ✅ **Password** for `info@zapitpestmelbourne.com.au` in your password manager (from Adam's 1 Aug email)
- ✅ **Incognito browser window** open (Chrome: ⌘+Shift+N / Ctrl+Shift+N)
- ✅ **Meet tab** in your normal browser: https://meet.google.com/zuk-gtjc-drq

## Open these tabs INSIDE the incognito window

1. https://accounts.google.com
2. https://search.google.com/search-console
3. https://console.cloud.google.com/iam-admin/iam?project=zapit-business-intelligence
4. https://console.cloud.google.com/bigquery?project=zapit-business-intelligence

## Ping Adam 5 min before

> "Adam — joining shortly. Please have your phone unlocked for the MFA tap."

═══════════════════════════════════════════════════

# 🎬 ON THE CALL — DO THIS EXACT SEQUENCE

## STEP 1 — Join + share incognito screen (30 sec)

- Join Meet in normal browser
- Click **Present now** → **Window** → pick the **incognito Chrome window**

## STEP 2 — Say to Adam (10 sec)

> "Adam, keep your phone ready. I'm about to trigger the Google MFA prompt — you'll see a 'Yes it's me' notification. Just tap approve."

## STEP 3 — Sign in as info@ (1 min)

In the incognito window → accounts.google.com tab:

- Username: `info@zapitpestmelbourne.com.au` → Next
- Password: paste from your password manager → Next

**⚠️ Password manager tip:** if auto-fill doesn't work in incognito, open your password manager in a separate window → copy the password → click into the field → paste. Do NOT type it out loud. Password field is masked as dots so screen share is safe.

## STEP 4 — Adam taps MFA (2 sec)

Adam sees notification on phone → taps **"Yes, it's me"**

**Screen check:** URL becomes `myaccount.google.com` — you're in.

## STEP 5 — Go to Search Console (30 sec)

- Switch to Search Console tab in incognito
- **If a property isn't auto-selected:** click the property dropdown top-left → pick `https://zapitpestmelbourne.com.au/` (the VERIFIED one — NOT the "Not verified" domain one)
- Left sidebar → scroll down → click **Settings** (gear icon)
- On Settings page → click **Bulk data export**

## STEP 6 — Service account email (SKIP — already known, 5 sec)

Service account email is **always** the same across every project:
```
search-console-data-export@system.gserviceaccount.com
```

You do NOT need to click Review instructions. Skip straight to Step 7.

## STEP 7 — Do the IAM grant (2 min)

- Switch to GCP IAM tab in incognito
- Confirm profile picture top-right shows `info@zapitpestmelbourne.com.au` ✅
- Click **+ GRANT ACCESS**
- **New principals:** paste `search-console-data-export@system.gserviceaccount.com`
- **Assign roles:**
  - Add **BigQuery Job User**
  - Click **+ ADD ANOTHER ROLE**
  - Add **BigQuery Data Editor**
- Click **SAVE**

## STEP 8 — Back to Search Console, fill fields (1 min)

Switch back to Search Console Bulk Data Export tab. Fill in:

- **Cloud project ID:** `zapit-business-intelligence`
- **Dataset name:** `raw_search_console`
- **Dataset location:** select **`australia-southeast1`** (Sydney)

⚠️ Location cannot change later. MUST be Sydney.

## STEP 9 — Click Continue (10 sec)

- Click **Continue**
- Confirmation: "Bulk data export set up"

## STEP 10 — Verify in BigQuery (30 sec)

- Switch to BigQuery Console tab in incognito
- Look for `raw_search_console` dataset under `zapit-business-intelligence`
- Should appear (empty for now — data lands in 24-48h)

## STEP 11 — Sign out cleanly (30 sec)

- Top-right profile picture → **Sign out**
- Repeat on every incognito tab
- Close the whole incognito window at end

## STEP 12 — Say to Adam (10 sec)

> "Done. Search Console export is live. First data lands within 48 hours. And I've signed out cleanly on my side — you might want to rotate the info@ password whenever you have a moment, just standard hygiene."

═══════════════════════════════════════════════════

# 🚨 IF SOMETHING FAILS

## ❌ MFA prompt doesn't reach Adam's phone

Ask Adam to open Gmail app manually. Or click "Try another way" → SMS code → Adam reads it aloud → you type it.

## ❌ Password rejected

Stop after 2 tries. Ask Adam to send current password in Meet chat. May have been rotated.

## ❌ "You need permissions" error at IAM

Check profile top-right shows info@ (not sharjeel@meetapex.ai). If sharjeel@ — you're in wrong window. Close incognito, restart.

## ❌ Cloud project ID not accepted

Exact string: `zapit-business-intelligence` — lowercase, single hyphens.

## ❌ Location dropdown missing australia-southeast1

Scroll to "Australia" section → pick **Sydney**.

═══════════════════════════════════════════════════

# ✅ AFTER SEARCH CONSOLE — Continue Call

## Agenda Item 2 — Dashboard Walkthrough (5-10 min)

Open Looker Studio → walk Adam through Pages 2 + 3. Ask verbal approval.

## Agenda Item 3 — 4 Decisions (5 min)

1. **WhatConverts:** keep current tier or upgrade to Plus? *(one word)*
2. **Cloudflare access:** when can you add sharjeel@meetapex.ai to your Cloudflare account? *(date)*
3. **Feature parity redirects:** Option A single catch-all (recommended) or Option B regional? *(A or B)*
4. **Meta Pixel:** move pixel into portfolio OR share via partner assignment? *(pick one)*

## Agenda Item 4 — Q&A (5 min)

Open floor.

## Closing (2 min)

> "Great call. Recap:
> - Search Console + BigQuery export ✅
> - Pages 2, 3: [approved / tweaks]
> - WhatConverts: [answer]
> - Cloudflare: [timeline]
> - Feature parity: [option]
> - Meta Pixel: [action]
>
> I'll send a written recap within the hour. Thanks Adam."

═══════════════════════════════════════════════════

# 📌 KEY FACTS (memorise)

| Field | Value |
|---|---|
| Info@ password | in your password manager |
| Cloud project ID | `zapit-business-intelligence` |
| Dataset name | `raw_search_console` |
| Dataset location | `australia-southeast1` (Sydney) |
| Service account | `search-console-data-export@system.gserviceaccount.com` |
| Roles to grant | BigQuery Job User + BigQuery Data Editor |
| First data arrival | 24-48h |

═══════════════════════════════════════════════════

# 🚫 WHAT NOT TO DO

- ❌ Do NOT skip the incognito window (leftover accounts break everything)
- ❌ Do NOT click "reveal password" eye icon while screen-sharing
- ❌ Do NOT pick US location (cannot change later)
- ❌ Do NOT touch the "zapitpestmelbourne.com.au" Domain property (leave "Not verified")
- ❌ Do NOT delete the "unused verification token" from Cloudflare
- ❌ Do NOT forget to sign out at end

═══════════════════════════════════════════════════

**Last updated:** 2026-08-13 · pre-call
