# 📗 Future Scope — Adam's Long-Term Vision (Post-MVP)

> **Purpose:** If Adam asks "when do we build X" or "how much will Y cost", this doc has the context. These are all POST-MVP items — not in the 45-hour cap.

**Source:** Adam's 1 August 2026 email approving Pages 4–6 and expanding the vision.

---

# 🎯 Adam's Overall Vision — In His Own Words

> "I don't see this as just an analytics dashboard. My long-term vision is for this to become the central operating system for the business."
>
> "Not simply reporting what happened — analyse, identify opportunities or issues, present recommendations for review and approval."
>
> "Intelligent business platform that continually analyses the website and marketing, recommends improvements, and helps the business improve over time while always keeping a human approval step before changes are made."

**Key phrase to remember:** "central operating system for the business, not just analytics."

---

# 🌳 The 3 Future Vision Areas

```
Post-MVP Vision
├── Page 4 Evolution → Full Revenue Attribution
├── Page 5 Evolution → Hermes AI Recommendations Panel
└── Page 6 Evolution → Comprehensive SEO Platform
```

---

# 📗 VISION AREA 1 — Revenue Attribution (Page 4 evolution)

## What Adam wants to see

The full chain from lead to revenue:

```
Lead → Qualified Lead → Closed Job → Revenue
                                     ├── Average Job Value
                                     ├── Close Rate
                                     └── Lifetime Value
```

Plus growth-over-time comparisons (this month vs last, this quarter vs last).

## What's already built for this

- ✅ `zapit_reserved_crm` schema in BigQuery (contacts, leads, opportunities, outcomes, revenue tables)
- ✅ CRM-agnostic design (works with any CRM Adam picks)
- ✅ Channel-to-lead-to-revenue attribution chain in the warehouse

## What's remaining to make it work

1. Adam connects a CRM (GoHighLevel, HubSpot, or other)
2. We build the sync from CRM → BigQuery
3. We upgrade Page 4 from lead-focused to revenue-focused

## If Adam asks for an estimate

- **Rough range:** 15–25 hours depending on CRM chosen
- **Prerequisites:** CRM chosen + API access granted
- **Timing:** Post-MVP, quotable as separate phase or engagement letter add-on

## Adam's talking point

> "Foundation for this is already in the warehouse. The `zapit_reserved_crm` tables were designed exactly for this chain. Once you connect a CRM, we wire the sync and Page 4 becomes revenue-focused."

---

# 📗 VISION AREA 2 — Hermes AI Recommendations (Page 5 evolution)

## What Adam wants to see

Page 5 evolves from a static "attention flags" table into an **AI recommendations panel**.

Examples of what Hermes would surface:

- "Conversion rate dropped 15% on the Termite Control page — heatmap shows users aren't reaching the CTA"
- "Landing page for Coburg is underperforming vs peer suburbs"
- "Organic traffic to blog articles has fallen this month"
- "Google Ads campaign X is producing lower-quality leads than campaign Y"
- "New opportunity: 3 competitor keywords have opened up in your area"

Every recommendation carries:

| Field | Example |
|---|---|
| **Title** | "Termite Control page conversion drop" |
| **Why detected** | "Heatmap shows 62% scroll depth, users missing CTA button" |
| **Expected impact** | "Potential +12 leads/month" |
| **Confidence score** | "78%" |
| **Recommended action** | "Move CTA above the fold" |
| **Human decision** | Approve / Reject buttons |

## What's already built for this

- ✅ `zapit_reserved_ai.ai_recommendations` table with EXACT fields Adam described (title, rationale, expected_impact, confidence_score, human_approval_status)
- ✅ `zapit_reserved_ai.ai_learning` table (tracks which recommendations produced good vs bad outcomes — Hermes learns over time)
- ✅ `source_agent` column (supports multiple AI agents: Hermes, Claude, coding agents)
- ✅ `human_approval_status NOT NULL` — enforces the human-in-the-loop guarantee at the database level

## What's remaining

1. Build Hermes agent (LLM + prompt engineering + BigQuery access)
2. Wire it to detect anomalies + generate recommendations
3. Upgrade Page 5 from table to interactive panel with approve/reject buttons

## If Adam asks for an estimate

- **Rough range:** 30–50 hours for MVP of Hermes (anomaly detection + one recommendation category)
- **Prerequisites:** Which LLM provider (Anthropic Claude is the default — from Adam's D5 directive)
- **Ongoing cost:** API tokens ~$50–200/month depending on volume
- **Timing:** Post-MVP, quotable as separate engagement

## Adam's talking point

> "The recommendation-and-approval workflow is exactly what the `ai_recommendations` table was designed for. Confidence scoring, human approval enforcement, multi-agent support — all live at the schema level. Building Hermes on top plugs directly in with zero foundation rework."

---

# 📗 VISION AREA 3 — Comprehensive SEO (Page 6 evolution)

## What Adam wants to see

Page 6 evolves from "SEO placeholder" into a full SEO platform:

- Organic traffic trends
- Local SEO performance
- Google Business Profile performance
- **AI search referrals** (ChatGPT, Perplexity, Claude, Gemini, Google AI)
- Keyword rankings
- Pages gaining/losing traffic
- Content opportunities
- **Monthly SEO recommendations from Hermes**

## What's already built for this

- ✅ Search Console setup (activating on Thursday's call)
- ✅ Search Console → BigQuery daily export configured
- ✅ 9-channel classifier UDF **already detects AI search referrals** from all 5 platforms:
  - chat.openai.com → "AI Referral"
  - perplexity.ai → "AI Referral"
  - claude.ai → "AI Referral"
  - gemini.google.com → "AI Referral"
  - copilot.microsoft.com → "AI Referral"

## What's remaining

1. Google Business Profile API integration (would need Adam's GBP admin access)
2. Keyword ranking tool integration (Ahrefs, SEMrush, or Google Search Console keyword data)
3. Content opportunity detection (needs Hermes)
4. Full Page 6 build-out

## If Adam asks for an estimate

- **Basic Page 6** (Search Console + AI referrals only, no Hermes): 6–10 hours
- **Full comprehensive SEO** with Hermes recommendations: bundle with Hermes engagement (30–50 hrs)
- **Third-party costs:** Search Console free, GBP API free, keyword tool $99–199/month

## Adam's talking point

> "AI search referrals are already tracked at the warehouse layer. Once Search Console is verified this Thursday, that data starts flowing. Building out the rest of Page 6 is a natural next phase — the data pipes are there."

---

# 🎯 The Full 8-Item AI Vision (Adam's Exact List)

For reference, this is Adam's exact vision from the 1 August email:

1. Analyse user behaviour through heatmaps + analytics
2. Identify UX friction automatically
3. Analyse SEO + AI search visibility
4. Review conversion funnels
5. Compare marketing channel performance
6. **Learn which recommendations produced the best business outcomes** ← Foundation-ready (`ai_learning` table)
7. Generate a prioritised monthly improvement list
8. **Present recommendations for approval before anything is implemented** ← Foundation-ready (`human_approval_status NOT NULL`)

**Every architectural touchpoint of this vision maps to something we already built.** Zero foundation rework needed for any future phase.

---

# 💬 IF ADAM ASKS "WHEN CAN WE START ON X?"

## Script

> "Great — that's item [X] from your 1 August vision. Foundation is already in place. Timing depends on wrapping the MVP first, then we scope it as a separate engagement with a proper hours estimate and quote. Once MVP training is done, that's the natural moment to plan the next phase."

## Never commit hours or costs on the call without checking

Adam's future ideas are exciting but they're separate engagements. If he asks for a firm quote, say:

> "Let me put together a proper 3-tier quote for that (like we're doing for the Square/Lovable/Xero project) and get it to you within 3 business days. I want to give you accurate numbers, not off-the-cuff guesses."

---

# 🚫 What is NOT in Scope for MVP

Adam has been very clear: these are **NOT** MVP items. Do not accidentally scope-creep on the call.

- ❌ Hermes AI recommendations (Page 5 = static anomaly detection only in MVP)
- ❌ Revenue attribution chain (Page 4 = leads only in MVP; revenue comes when CRM is connected)
- ❌ Full Page 6 SEO (MVP has placeholder + Search Console verification only)
- ❌ CRM integration
- ❌ Comprehensive SEO tools (Ahrefs, SEMrush)
- ❌ Content opportunity engine
- ❌ Monthly Hermes recommendations

**Adam knows these are future scope.** He said in his 1 August email:

> "I know a lot of this sits beyond the MVP, and I'm not expecting it all now. I just want to make sure we're building the foundation with that long-term vision in mind so future phases plug into the same architecture rather than requiring a redesign."

Your job on the call is to reassure him: **the foundation is ready for every one of these future items.**

---

**Last updated:** 2026-08-11
