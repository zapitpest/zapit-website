# 📙 Separate Project — Square + Lovable + Xero Integration

> **Purpose:** This is a SEPARATE engagement from the MVP. Adam asked for it on 29 July. Do NOT bundle hours into MVP. If Adam mentions this project on the Thursday call, this doc has the context.

**Source:** Adam's 29 July 2026 email with the integration brief.
**Portal:** https://zap-ops-central.lovable.app/auth
**Access:** Adam requested `sharjeel@meetapex.ai` be granted admin access

---

# 🎯 What Adam Wants

## The pain point

Right now Adam's business runs on 3 systems that don't talk to each other:

1. **Square** — residential booking + payments
2. **Lovable/Supabase portal** — commercial customers + site visits + reports
3. **Xero** — invoicing + accounting (source of truth for money)

**Result:** customer, appointment, service, and invoice information is entered MULTIPLE times across these 3 systems. Manual, error-prone, time-consuming.

## The ask

Integrate these 3 systems so data flows automatically and no double-entry.

---

# 🌳 Tree View of the Ask

```
Square + Lovable + Xero Integration
│
├── Commercial workflow (fully specified)
│   ├── Portal uses existing commercial site + visit data
│   ├── Portal generates branded commercial service report PDF
│   ├── Portal prepares invoice with customer + service date + price + GST
│   ├── Portal creates DRAFT invoice directly in Xero
│   ├── One-screen admin flow
│   ├── Store Xero invoice ID back against visit record
│   ├── Prevent duplicate invoices on double-click/refresh
│   └── Show missing-field warnings before invoice creation
│
└── Residential workflow (3 options, Adam wants our recommendation)
    ├── Option A: Square → Xero (direct)
    ├── Option B: Square → Lovable → Xero (Lovable central)
    └── Option C: Hybrid (Square keeps booking + payments; Lovable becomes reporting + Xero invoicing hub)
```

---

# 📙 Adam's Non-Negotiable Requirements

| Requirement | Why it matters |
|---|---|
| Avoid double entry | Core reason for the project |
| Keep Square as residential scheduling | Unless strong reason to replace |
| Keep Lovable as commercial operating system | Custom-built for their commercial workflow |
| Use Xero as accounting source of truth | Contractual with accountant |
| Match customers safely across all 3 systems | Prevents duplicates |
| Handle new + existing Xero contacts | Both flows needed |
| Prevent duplicate customers/reports/invoices | Data integrity |
| GST + Xero account codes correct | Tax/legal compliance |
| Safely refresh expired auth tokens | Reliability |
| Log every integration action + failure | Debuggability |
| Show failed syncs clearly for admin review | Human oversight |
| Include retry controls without duplicates | Reliability |
| Support cancellations, refunds, discounts, changed prices | Real-world edge cases |
| Separate internal tech notes from customer-facing report wording | Professional presentation |
| Store Square IDs + Lovable job IDs + Xero IDs for reconciliation | Traceability |
| Design so it can later feed revenue attribution into BigQuery reporting | Aligns with MVP warehouse |
| Remain CRM-agnostic (no GoHighLevel dependency) | Adam's D4 directive |

---

# 📙 Adam's 5-Part Quote Structure

Adam specified EXACTLY how he wants the quote structured. All 5 parts must be delivered.

## Part 1 — Technical Discovery + Audit

- Hours estimate
- Cost
- Deliverables
- Access required

**Deliverable:** an audit of the existing Lovable portal so we don't quote to rebuild things already built.

## Part 2 — Commercial Lovable → Xero Invoicing

- Hours estimate
- Cost
- What exists in Lovable portal already
- What needs to be built new
- Testing plan
- Launch plan

## Part 3 — Square Integration (quote each of A, B, C separately)

For **each** of Option A, Option B, Option C:

- Feasibility
- Hours
- Cost
- Ongoing costs
- Limitations
- Maintenance overhead
- Risks
- Our recommendation

## Part 4 — Residential Report + PDF Workflow

- Square data import
- Tech (technician) form for on-site data capture
- Branded report generation
- PDF generation
- Storage
- Customer email delivery
- Invoice from same job

## Part 5 — Testing + Handover

- Test environment
- Test invoices only (no real invoices during dev)
- Duplicate-prevention testing
- Failed-sync retry testing
- Security tests
- Documentation
- Training
- Ongoing maintenance

---

# 📙 Adam's 3-Tier Quote Requirement

**Every one of the 5 parts** must be quoted at 3 levels:

## Tier 1 — Minimum Viable

Quickest reliable version that removes the main double-handling pain.

## Tier 2 — Recommended Production

Best balance of usability, reliability, and cost.

## Tier 3 — Complete Long-Term

Full workflow with reporting, invoicing, email, audit logs, revenue-attribution readiness.

For each tier, we must specify:

- Total hours
- Total cost
- Timeframe
- Assumptions
- Exclusions
- Third-party costs
- Access required

Plus a plain answer:

- Is it technically possible?
- Is it good value vs continuing to operate the 3 systems separately?

---

# 📙 What We Committed To

- **2–3 business days** to complete audit + return 3-tier quote
- **No development starts until Adam approves the quote**
- **Deliver by Sunday 2 August 2026**

⚠️ **CURRENT STATUS: We committed to Sunday 2 August 2026 delivery. Today is 11 August. If this is still outstanding, Adam may bring it up on the call.**

---

# 📙 Access Needed Before the Audit Can Start

1. Admin/collaborator access to **zap-ops-central.lovable.app** for `sharjeel@meetapex.ai`
2. Read-only access to **Xero** organisation OR walkthrough of current connection state
3. Confirmation of whether **Square** is currently connected to anything

**Check before the call:** did Adam grant Lovable portal access? If not, this is likely why the audit is still open.

---

# 💬 IF ADAM ASKS ABOUT THIS PROJECT ON THURSDAY

## If he asks "where's the Square/Lovable/Xero quote?"

Honest script:

> "Fair — I owe you that. The audit needs Lovable portal access first, which is why I've held on quoting blind. Let me confirm today's call: can you grant `sharjeel@meetapex.ai` admin access to zap-ops-central.lovable.app? Once I'm in, 2–3 business days for the full 3-tier quote as we agreed."

## If he asks for a rough number on the call

**DO NOT commit specific hours or costs on the call.** Adam explicitly wants a proper 3-tier structured quote. Any off-the-cuff number will lock you in incorrectly.

Say instead:

> "I want to give you accurate numbers, not off-the-cuff guesses. The audit-first approach is what stops us quoting to rebuild something already in the Lovable portal. Let me finish the audit and come back with all 3 tiers as you asked."

## If he pushes for a ballpark

Rough gut-feel ballpark (don't quote these on the call, but useful for you to know):

| Tier | Rough range (all 5 parts combined) |
|---|---|
| Tier 1 Minimum Viable | 40–60 hours |
| Tier 2 Recommended | 80–120 hours |
| Tier 3 Complete Long-Term | 150–220 hours |

These are gut-feel estimates only. The audit will sharpen these significantly.

## If he asks about ongoing costs

- **Xero API:** free (with Xero subscription)
- **Square API:** free (with Square subscription)
- **Supabase/Lovable:** existing subscription
- **Development ongoing maintenance:** ~2–4 hours/month for monitoring + fixes (quotable)

---

# 📙 The Relationship to MVP Engagement

**CRITICAL:** This is a **separate engagement** from the MVP.

- ❌ Do NOT bundle hours
- ❌ Do NOT deduct from MVP 45-hour cap
- ❌ Do NOT do free work on Square/Lovable/Xero while MVP hours are billed

**Architectural touchpoints to preserve** (already built into the MVP warehouse):

- CRM-agnostic schema (`zapit_reserved_crm`)
- Revenue attribution readiness (Adam's D3 directive)
- Ability to feed operational data into BigQuery reporting later

---

# 📙 Recommended Approach (Our POV)

If Adam asks "which residential option do you recommend?":

**Option C — Hybrid** is likely our recommendation. Reasoning:

- Square is genuinely good at booking + payments — replacing it adds risk with little benefit
- Lovable is genuinely good at commercial custom workflows — reusing it for residential reporting adds value
- Xero must remain accounting source of truth

**Option A (Square → Xero direct)** is simplest but leaves Lovable out of the residential workflow — which means reporting stays fragmented.

**Option B (Square → Lovable → Xero)** centralises everything through Lovable but adds sync complexity and single-point-of-failure risk.

**⚠️ Don't commit to Option C on the call.** Say: "My recommendation will be in the quote after audit."

---

# 🚫 What NOT to Do

- **Don't quote hours or dollars on the call** — Adam wants structured 3-tier quotes
- **Don't blur the boundary with MVP** — this is a separate engagement, separate invoice
- **Don't promise the audit outcome** — the whole point of the audit is to find what's already built
- **Don't skip Parts 1–5 or the 3-tier structure** — Adam specified this exactly

---

**Last updated:** 2026-08-11
