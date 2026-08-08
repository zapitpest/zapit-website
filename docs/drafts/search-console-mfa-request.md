# Draft — Search Console MFA session request email

**Purpose:** send Monday 10 Aug 2026 first thing to schedule the Search Console verification session with Adam. Adam's 1 Aug email said he needs ~30 minutes heads-up for MFA. This asks for a specific window.

**When to send:** Monday morning around 9 am AEST or when Adam is likely online.

**Do NOT send on weekend** — Adam is off. Only send during business hours.

**Also NOT to send today (8 Aug)** — Adam already got the WhatConverts findings email on 7 Aug. One long email a day is the healthy cadence.

---

## Copy-paste ready email below the line

═══════════════════════════════════════════════════

**Subject:** Zap It — proposing a Search Console verification window this week

Hi Adam,

Ready to move on Search Console verification when you have 30 minutes free this week.

**What we'll do together in the session:**

1. You log into the Zap It Google account using the credentials you shared last week. I'll be on the line to walk through each step.
2. Complete the MFA prompt on your device so login succeeds.
3. Navigate to Search Console and add `zapitpestmelbourne.com.au` as a new property (or verify the existing one if already present).
4. Copy the TXT record value Search Console displays and add it to the domain DNS.
5. Wait a few minutes for propagation, then click "Verify" in Search Console.
6. Once verified, link Search Console to the BigQuery project `zapit-business-intelligence` so historical and future data flows into the warehouse.
7. Sign out.

**Total time:** 30 minutes end to end, most of it just waiting for the DNS propagation between steps 4 and 5.

**Proposed windows (pick whichever works, or suggest another):**

- Monday 10 Aug, 10:00 to 10:30 am AEST
- Monday 10 Aug, 2:00 to 2:30 pm AEST
- Tuesday 11 Aug, 10:00 to 10:30 am AEST

**Prep on your side:**

- Have your device with MFA ready during the window
- No other prep needed

Once verified, Page 6 SEO on the dashboard starts populating with impressions, clicks, and ranking positions within about 24 hours. AI-referrer visibility (ChatGPT, Perplexity, Claude, Gemini) also activates.

Standard practice on my side once the session finishes: audit log entry with what was done, immediate sign out, and a rotation reminder for the Zap It Google account password since it will have been used during the session.

Cheers,
Sharjeel
Apex AI

═══════════════════════════════════════════════════

## Notes for Sharjeel

- Confirm the actual domain (`zapitpestmelbourne.com.au`) is correct in Adam's Search Console account when logged in. If already added as a property, we're verifying not adding.
- Have the exact TXT record value from Search Console ready before Adam adds it — this reduces the DNS-propagation waiting window.
- If DNS is managed via a provider Adam hasn't shared access to, we may need to coordinate a second session for the DNS change itself.
- After verification, in Search Console: **Settings → Users and permissions → Add user** to grant sharjeel@meetapex.ai property access for ongoing configuration. Only if Adam explicitly authorises during the session.
- BigQuery linking: Search Console → Settings → Bulk data export → Set up export to BigQuery → project `zapit-business-intelligence`, dataset `zapit_raw_search_console` (already provisioned), region `australia-southeast1`.

## Version history

- **2026-08-08** — Draft created (Task 4). To be sent Monday 10 Aug 2026 morning.
