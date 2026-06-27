# Credential Session Runbook — GA4 + GTM Creation Under Client Ownership

**When this runs:** Adam confirms the 2FA window on Slack and the hours top-up has landed.
**Duration:** ~30–45 minutes (one focused session)
**Account used:** `info@zapitpestmelbourne.com.au` (with explicit written client consent — same model as Stage A GCP setup on 2026-06-26)
**Ownership target:** Zap It (the client) is Owner on every new asset; Apex (`sharjeel@meetapex.ai`) is granted Editor or Publish role only.

---

## Pre-Flight Setup (5 min)

Do all of this BEFORE asking Adam for the 2FA code.

1. Open a **fresh incognito Chrome window** (no other Google account history persists in this session)
2. Open a **plain text notes file** for the timestamped audit log — every action gets a `HH:MM` entry
3. Have these tabs queued up ready to use:
   - [analytics.google.com](https://analytics.google.com)
   - [tagmanager.google.com](https://tagmanager.google.com)
   - [search.google.com/search-console](https://search.google.com/search-console)
4. Have ready in a notes file (do NOT save them inside the GA4/GTM session itself):
   - The Measurement ID slot (will get a `G-XXXXXXXXXX` value to capture)
   - The Container ID slot (will get a `GTM-XXXXXXX` value to capture)
5. Ping Adam on Slack: *"Ready to go on the GA4/GTM session — please share the 2FA code when convenient."*

---

## Step 1 — Sign In (1 min)

1. In the incognito window, go to [accounts.google.com](https://accounts.google.com)
2. Sign in with `info@zapitpestmelbourne.com.au` and the password
3. Enter the 2FA code Adam sends on Slack
4. Confirm the avatar/account shown is `info@zapitpestmelbourne.com.au` (NOT any other Google identity)
5. **Audit log:** `HH:MM — Signed in to info@zapitpestmelbourne.com.au with 2FA. Adam's written consent on file.`

---

## Step 2 — Create GA4 Account + Property (10 min)

1. Go to [analytics.google.com](https://analytics.google.com)
2. If a property picker appears, click **Admin** (gear icon, bottom-left)
3. In Admin, click **"+ Create"** → **Account**
4. **Account name:** `Zap It Pest Control` (clean, brand-aligned)
5. **Account data sharing settings:** leave at recommended defaults → Next
6. **Property name:** `Zap It Production`
7. **Reporting time zone:** `Australia/Melbourne`
8. **Currency:** `AUD` → Next
9. **Business details:**
   - Industry category: pick closest (e.g. "Travel & Local Services" or similar — doesn't affect data)
   - Business size: 1–100 employees → Next
10. **Business objectives:** tick **Generate leads** (matches Zap It's actual goal) → Create
11. Accept GA4 Terms of Service for **Australia**
12. **Set up Web data stream:**
    - Website URL: `https://zapitpestmelbourne.netlify.app` (staging — production URL added at cutover)
    - Stream name: `Zap It Staging`
    - Enhanced measurement: leave ON → **Create stream**
13. **Capture the Measurement ID** (looks like `G-XXXXXXXXXX`) — paste into your local notes file, NOT into the GA4 account
14. **Audit log:** `HH:MM — Created GA4 account "Zap It Pest Control" + property "Zap It Production". Measurement ID: G-XXXXXXXXXX captured to local notes.`

---

## Step 3 — Add Sharjeel as Editor on the GA4 Account (3 min)

1. In Admin → **Account column** → **Account access management**
2. Click the blue **"+"** → **Add users**
3. Email: `sharjeel@meetapex.ai`
4. Notify by email: ON
5. Direct roles: select **Editor** (NOT Administrator — Owner stays as `info@zapitpestmelbourne.com.au`)
6. **Add**
7. Confirm `sharjeel@meetapex.ai` row appears with Editor role
8. **Audit log:** `HH:MM — Added sharjeel@meetapex.ai as Editor on GA4 account "Zap It Pest Control".`

---

## Step 4 — Create GTM Account + Container (5 min)

1. Open new tab → [tagmanager.google.com](https://tagmanager.google.com)
2. If prompted, sign in with same `info@zapitpestmelbourne.com.au` session
3. Click **Create Account**
4. **Account name:** `Zap It Pest Control`
5. **Country:** Australia
6. **Container name:** `Zap It Production`
7. **Target platform:** Web → **Create**
8. Accept GTM Terms of Service
9. **Capture the Container ID** (looks like `GTM-XXXXXXX`) at the top of the workspace — paste into local notes
10. **Audit log:** `HH:MM — Created GTM account "Zap It Pest Control" + container "Zap It Production". Container ID: GTM-XXXXXXX captured to local notes.`

---

## Step 5 — Add Sharjeel with Publish Permission on GTM (3 min)

1. In GTM, click the gear icon → **Admin**
2. **Account column** → **User Management**
3. Click the blue **"+"** → **Add users**
4. Email: `sharjeel@meetapex.ai`
5. **Account permissions** (left side): **Administrator** *(allows Apex to also add other Apex engineers later if needed)*
6. **Container permissions** (right side): **Publish** (allows pushing live container versions)
7. Send invitation
8. Confirm `sharjeel@meetapex.ai` row appears with the correct access
9. **Audit log:** `HH:MM — Added sharjeel@meetapex.ai with Account Administrator + Container Publish on GTM "Zap It Pest Control".`

---

## Step 6 — (Optional) Search Console Add Property + Delegate (5 min)

Only if Search Console doesn't already have the production domain. If it does, skip to Step 7.

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Property dropdown (top-left) → **+ Add property**
3. Select **Domain** property type
4. Enter: `zapitpestmelbourne.com.au`
5. Google will give a TXT verification record — copy it to local notes
6. **DON'T verify yet** — Adam needs to add this TXT record at his registrar first. Send the TXT value to him separately on Slack after the session.
7. **Audit log:** `HH:MM — Added Search Console domain property zapitpestmelbourne.com.au. TXT verification record captured for Adam to add at registrar.`

---

## Step 7 — Sign Out Cleanly (1 min)

1. Sign out of [analytics.google.com](https://analytics.google.com) (top-right avatar → Sign out)
2. Sign out of [tagmanager.google.com](https://tagmanager.google.com)
3. Sign out of [search.google.com/search-console](https://search.google.com/search-console) (if used)
4. Sign out of [accounts.google.com](https://accounts.google.com)
5. **Close the entire incognito window** (clears all session data)
6. **Audit log final entry:** `HH:MM — Session complete. Signed out of all Google properties. Closed incognito window.`

---

## Step 8 — Final Verification + Client Message (5 min)

From your own Apex profile (not the incognito session):

1. Sign into [analytics.google.com](https://analytics.google.com) as `sharjeel@meetapex.ai`
2. Confirm you can see the new GA4 account `Zap It Pest Control` with property `Zap It Production`
3. Sign into [tagmanager.google.com](https://tagmanager.google.com) as `sharjeel@meetapex.ai`
4. Confirm you can see and Publish to container `Zap It Production`
5. **Save the audit log** to 1Password under "Zap It MVP" vault
6. Send Adam a confirmation message on Slack:

> Done. Created GA4 account "Zap It Pest Control" with property "Zap It Production" (Measurement ID captured), GTM account "Zap It Pest Control" with container "Zap It Production" (Container ID captured). Both with you as Owner and me with Editor/Publish for implementation. All scoped to those two actions plus nothing else — signed out cleanly. Friendly reminder to rotate the password whenever it suits. Moving into Phase 2 GTM configuration this week per the blueprint in the repo. Will send the Search Console TXT verification record in the next message for you to add at the registrar.

---

## What NOT To Do During the Session

- ❌ Don't browse around the account beyond GA4 / GTM / Search Console
- ❌ Don't check email, Drive, Calendar, or anything else
- ❌ Don't add anyone else (only `sharjeel@meetapex.ai`)
- ❌ Don't change Owner role on anything (leave `info@` as Owner everywhere)
- ❌ Don't use the existing admin-locked GA4 accounts or GTM container — those stay alone
- ❌ Don't bookmark, save passwords, or stay logged in after the session

---

## Total Session Time Budget

- Pre-flight: 5 min
- GA4 + Editor add: 13 min
- GTM + Publish add: 8 min
- Search Console (optional): 5 min
- Sign out + verification + Adam message: 10 min
- **Total: 30–45 min** depending on whether Search Console is included

---

## After the Session — Phase 2 Begins

With Measurement ID and Container ID in hand, the next work happens entirely from `sharjeel@meetapex.ai` login (no more Adam-credential sessions needed for the MVP):

1. Update Netlify environment variable `NEXT_PUBLIC_GTM_ID` to the new Container ID
2. Verify auto-deploy picks it up
3. Curl-test the live HTML to confirm GTM now loads the new container ID
4. Begin GTM container configuration per `docs/gtm-blueprint.md`:
   - 9 data layer variables
   - SHA-256 PII hashing template
   - 8 conversion event triggers
   - GA4 event tags wired to the captured Measurement ID
   - Meta Pixel base + Lead + Contact tags (Pixel ID will be needed separately from Adam's Meta Business Manager)
5. Run a full QA pass on staging using `?debug=tracking` overlay + GA4 DebugView
6. Mark conversion events in GA4 admin
7. Link GA4 to BigQuery export (Admin → Product Links → BigQuery → link to `zapit-business-intelligence`)
