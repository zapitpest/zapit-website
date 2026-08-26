# ⚡ Quick Reference Card — Keep This Open During the Call

> **Purpose:** Single-page cheat sheet. Keep this on your screen during Thursday's call. Everything you need at a glance.

**Call:** Thursday 13 August 2026, 5:00 PM Melbourne (12:00 PM Karachi, 12:30 PM Colombo)
**Meet link:** https://meet.google.com/zuk-gtjc-drq
**Attendees:** Adam (client), Sharjeel (you), Amandi (Apex PM)

---

# 🎯 Your 6 Goals for the Call

| # | What | Adam's time | Priority |
|---|---|---|---|
| 1 | Complete Search Console MFA session LIVE | 30 sec | 🔴 Highest — this is the stated call purpose |
| 2 | Get Pages 2 + 3 approval | 10 min | 🔴 High |
| 3 | Get WhatConverts plan decision | 2 min | 🟡 Medium |
| 4 | Get Cloudflare account access commitment | 2 min | 🔴 High (blocks launch) |
| 5 | Get Feature parity redirect pick | 5 min | 🟡 Medium |
| 6 | Get Meta Pixel share commitment | 2 min | 🟡 Medium |

**Success = 4 of 6 closed. Excellent = all 6.**

---

# 📊 Numbers You Should Know Cold

| Metric | Value |
|---|---|
| **MVP % complete** | 93% |
| **Portal hours logged** | 39.5h |
| **Hours queued for logging** | 1h (waiting on balance top-up) |
| **Effective hours used** | 40.5h |
| **Engagement letter cap** | 45h |
| **Remaining forecast** | ~3h (activation + training) |
| **Final total forecast** | 43–44h — inside cap |
| **Real effort delivered** | ~50–55h (under-billed for trust) |

---

# 🌳 The 6 MVP Phases at a Glance

| Phase | What | Status |
|---|---|---|
| Phase 1 | Website | ✅ Live |
| Phase 2 | Analytics & Tracking | ✅ Built, waiting on small activations |
| Phase 3 | CEO Dashboard (6 pages) | 🟡 95% — Pages 2, 3 await approval |
| Phase 4 | Hosting & DNS | 🟡 30% — prep done, waiting on Adam access |
| Phase 5 | Website Launch | ⏳ Depends on Phase 4 |
| Post-launch | 30-day support included | ⏳ Post-launch |

---

# 🌳 Dashboard Pages at a Glance

| Page | What it shows | Status |
|---|---|---|
| Page 1 | CEO Overview KPIs | ✅ Approved 22 Jul |
| Page 2 | Marketing Performance (by channel) | ⏳ Pending approval |
| Page 3 | Conversion Detail | ⏳ Pending approval |
| Page 4 | Service Lines | ✅ Approved 1 Aug |
| Page 5 | Needs Attention (anomalies) | ✅ Approved 1 Aug |
| Page 6 | SEO Performance | 🟡 Placeholder — activates after Thursday's SC session |

---

# 🔧 Tools Cheat Sheet + Direct Zap It Links

| Tool | Zap It ID | Status | Direct Zap It link |
|---|---|---|---|
| **GA4** | `G-YRVHNE66GH` | ✅ Live | https://analytics.google.com/analytics/web/ |
| **GTM** | `GTM-PFGV87RB` | ✅ Live | https://tagmanager.google.com/#/container/accounts/6363173799 |
| **BigQuery** | `zapit-business-intelligence` | ✅ Live | https://console.cloud.google.com/bigquery?project=zapit-business-intelligence |
| **GCP IAM** | (same project) | ✅ Live | https://console.cloud.google.com/iam-admin/iam?project=zapit-business-intelligence |
| **Search Console** | `zapitpestmelbourne.com.au` | 🟡 Setting up TODAY | https://search.google.com/search-console?resource_id=sc-domain%3Azapitpestmelbourne.com.au |
| **Looker Studio** | 6-page dashboard | ✅ Live | Bookmark URL after Thursday training |
| **Meta Pixel** | `1088414402938841` | ⏳ Access pending | https://business.facebook.com/events_manager2/list/pixel/1088414402938841/overview |
| **Microsoft Clarity** | `xl7ljoavrz` | ✅ Live | https://clarity.microsoft.com/projects/view/xl7ljoavrz/dashboard |
| **WhatConverts** | Profile `171358` | 🟡 Plan decision pending | https://app.whatconverts.com/ |
| **Cloudflare Pages** | (Adam's account) | ⏳ Awaiting access | https://dash.cloudflare.com |
| **Netlify (temp host)** | `zapitpestmelbourne` | ✅ Live, temporary | https://app.netlify.com/sites/zapitpestmelbourne |
| **GitHub repo** | `zapitpest/zapit-website` | ✅ Live | https://github.com/zapitpest/zapit-website |
| **Production site** | `zapitpestmelbourne.com.au` | ✅ Live | https://zapitpestmelbourne.com.au |

---

# ⚠️ WhatConverts — quick refresher (Adam may ask)

- **Issue:** Adam's current plan is Call Tracking tier only — includes calls ✅, does NOT include form tracking ❌
- **Discovered:** after we'd already coded the API integration (script-based tracking now used instead — API code preserved but inactive)
- **Impact:** ZERO leads missed — form leads flow via GA4 → BigQuery → dashboard
- **The ask:** upgrade to Plus plan (~$30 AUD/month extra) OR keep current tier and use GA4 for form attribution
- **Sent Adam:** 7 August email requesting one-word plan decision
- **Status:** ⏳ UNRESOLVED — this is item #2 in Thursday call agenda
- **If Adam asks "which one do you recommend?":** depends on form-lead volume. High volume + Google Ads = Plus pays for itself. Low volume = current tier + GA4 is fine.

**Full script if pushed:** see `01_MVP_EXPLAINED_SIMPLE.md` → "The WhatConverts Issue — Full Story" section

---

# ⚠️ Meta Pixel — quick refresher (Adam may ask)

- **Issue:** Adam sent Business Portfolio invite (4 Aug) ✅ — sharjeel@meetapex.ai accepted → but portfolio shows **0 business assets**
- **Root cause:** Pixel `1088414402938841` is in Adam's PERSONAL Meta account, not in the shared Business Portfolio
- **Meta permission model:** inviting a person to a portfolio ≠ sharing assets. Two separate steps.
- **Impact:** ZERO data lost — pixel is firing correctly, Meta is receiving all events. Only Sharjeel's DASHBOARD access is blocked.
- **The ask:** Adam does ONE of these (both 2 min):
  - **Option A** — move pixel INTO Business Portfolio + add sharjeel@meetapex.ai with View access
  - **Option B** — share pixel directly via Partner Assignment from personal account
- **Sent Adam:** 8 August follow-up email
- **Status:** ⏳ UNRESOLVED — this is item #5 in Thursday call agenda
- **Live opportunity:** if Adam has 2 min on the call, he can do Option A via screen share

**Full script if pushed:** see `01_MVP_EXPLAINED_SIMPLE.md` → "The Meta Pixel Issue — Full Story" section

---

# 🚨 Emergency Answers

## If you don't know something

> "Good question — I want to give you an accurate answer rather than guessing. Let me confirm on my side after the call and reply with the exact detail today."

## If Adam asks for a quote on Square/Lovable/Xero

> "I want to give you accurate numbers, not off-the-cuff guesses. The audit-first approach is what stops us quoting to rebuild something already in the Lovable portal. Let me finish the audit and come back with all 3 tiers as you asked."

## If Adam asks "why the delay?"

> "Fair — I should have flagged the tech issue this morning clearly instead of defaulting to email. That's on me. Going forward for anything above a simple confirmation, calls make more sense."

## If Adam pushes on hours

> "Portal 39.5h logged, 1h queued for top-up, effectively 40.5h used. Cap is 45. About 3 hours of activation remaining. Landing at 43-44h — comfortably inside cap. Real effort has been higher — I under-bill for trust."

---

# 📞 Search Console MFA Live Session — Steps to Run On Call

While you're on the call at 5:00 PM Melbourne:

1. Share screen with Adam
2. Go to `accounts.google.com`
3. Sign in as `info@zapitpestmelbourne.com.au` + password
4. Adam gets MFA prompt on his phone → he taps "Yes it's me"
5. Go to `search.google.com/search-console`
6. Click "Add property" → "Domain" → enter `zapitpestmelbourne.com.au`
7. Copy the TXT verification record
8. Show Adam where to paste it in his DNS provider (Cloudflare/GoDaddy)
9. Once TXT is live (may need 5-15 min), hit "Verify"
10. Set up BigQuery export (Settings → Bulk data export → project `zapit-business-intelligence`, dataset `raw_search_console`, location `australia-southeast1`)
11. Sign out cleanly
12. Remind Adam to rotate his password later

---

# 🎬 Opening Script (First 2 Minutes)

> "Hi Adam, thanks for making time. I know this week's been rough on communication — I'll own that. Plan for today:
>
> First, get Search Console set up together — that's the primary purpose and about 15 minutes.
>
> Then walk you through the 6 dashboard pages so you can approve or redirect on Pages 2 and 3.
>
> Then close out the 4 smaller unblocks — WhatConverts, Cloudflare access, feature parity redirects, Meta Pixel — so we can lock in a launch date next week.
>
> Sound good?"

---

# 🎬 Closing Script (Last 2 Minutes)

> "Great call. Let me recap what we agreed:
>
> [List the specific commitments Adam made]
>
> I'll send a written summary of everything within an hour so nothing gets lost. Anything else on your mind before we wrap?"

---

# 🚫 Things to NOT Say

- ❌ "It's basically done" — say "93% complete with X hours remaining"
- ❌ "Sure, no problem, we'll add that" — say "let me scope that as a separate change order"
- ❌ "It'll take about..." — say "let me put together a proper quote"
- ❌ "The AI will handle it" — say "the warehouse foundation supports it, next phase builds Hermes on top"
- ❌ "It's my mistake" as a broken record — own it once, then move on

---

# 📁 Where to Find More Detail

If Adam drills into any specific area, these docs have the full context:

| Topic | File to reference |
|---|---|
| MVP details | `docs/call-prep/01_MVP_EXPLAINED_SIMPLE.md` |
| Future scope (Hermes, revenue attribution, SEO) | `docs/call-prep/02_FUTURE_SCOPE_LONG_TERM_VISION.md` |
| Square/Lovable/Xero project | `docs/call-prep/03_SEPARATE_PROJECT_SQUARE_LOVABLE_XERO.md` |
| Live MVP status | `docs/MVP_STATUS.md` |
| Every Adam ask cross-reference | `docs/ADAM_REQUEST_TRACKER.md` |
| Engagement letter cap and rules | `docs/ENGAGEMENT_LETTER_REFERENCE.md` |

---

**Last updated:** 2026-08-11
**Print this or keep it open on a second monitor during the call.**
