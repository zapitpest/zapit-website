# Demo Process — Presenting the Looker Mockup to Adam

**Goal:** get explicit sign-off (or precise change requests) on `LOOKER_DASHBOARD_MOCKUP_v1.md` before we invest ~4-5h building the actual Looker Studio report.

**Why pre-approval matters:** Adam explicitly asked for this gate on 07 Jul (Message 3). Building without his sign-off risks 4-5h of rework if the polish direction differs from his mental model.

---

## Assets we send Adam

Three files, three roles:

| File | Format | Best for | How Adam reads it |
|---|---|---|---|
| [`LOOKER_MOCKUP_DEMO.html`](LOOKER_MOCKUP_DEMO.html) | Self-contained HTML | **The visual demo** — the closest thing to what the live dashboard will look like | Open in any browser (Chrome/Safari/Edge). No login, no dependencies |
| [`LOOKER_DASHBOARD_MOCKUP_v1.md`](LOOKER_DASHBOARD_MOCKUP_v1.md) | Markdown | **The specification** — full detail, design system, data source mapping, deep-audit findings | GitHub renders it, or read as plain text |
| [`LOOKER_MOCKUP_AUDIT.md`](LOOKER_MOCKUP_AUDIT.md) | Markdown | **Coverage proof** — row-by-row proof that all 13 of his requested sections are covered | GitHub / plain text — only if he asks "is it complete?" |

Send all three. The HTML is the star.

---

## How to send (recommended sequence)

### Step 1 — Preview the HTML yourself first
1. Open `docs/LOOKER_MOCKUP_DEMO.html` locally in Chrome (double-click the file, or `open docs/LOOKER_MOCKUP_DEMO.html` in Terminal).
2. Scroll through top to bottom. Confirm every section renders as expected. Check dark mode by toggling your OS theme (dashboard adapts automatically).
3. If anything looks off on your side, fix before sending.

### Step 2 — Choose delivery channel (in order of preference)

**Option A (BEST) — Slack DM with all three attachments.**
Simplest for Adam. He clicks the HTML → opens in browser → sees the polished mockup instantly. Markdown files stay attached for reference.

**Option B — Email with attachments.**
Same three files. If Adam's mail client blocks .html attachments, zip them first (`docs.zip`).

**Option C (last resort) — Screenshot the HTML to PNG + share.**
Only if attachments are blocked. Static screenshots lose the dark mode and responsive scroll experience — Option A/B are stronger.

### Step 3 — The message to Adam

Paste this verbatim (edit to your voice), attach the three files:

> Hi Adam — quick pre-build check-in on the executive dashboard.
>
> I've put together the mockup based on your Message 3 direction. Attached three things:
>
> 1. **`LOOKER_MOCKUP_DEMO.html`** — open this in any browser. It's a visual mockup of the final dashboard, with placeholder numbers so you can see the layout, section flow, colour palette, and typography the way you'll experience it once real data lands. Every one of the 13 sections you asked for is in there (visitors, sources, device split, service page perf, form submits, phone conversions, conversion rates, top landing pages, Search Console block, Commercial vs Residential, Termite vs General, monthly trends, leads by source).
>
> 2. **`LOOKER_DASHBOARD_MOCKUP_v1.md`** — full written spec: what each section shows, which data source it pulls from, the design system (typography, palette, card style), and an honest deep-audit section covering what's still weak and what's non-blocking.
>
> 3. **`LOOKER_MOCKUP_AUDIT.md`** — if you want the row-by-row proof that every requirement is covered, it's here. Skip unless you want to double-check.
>
> **What I need from you:** does the direction match your vision? Any section you'd add, remove, reorder, or restyle before I start the build?
>
> Once you sign off, build is around 4-5 hours: ~1h to set up the three data sources in Looker Studio pointing at the BigQuery staging views, ~2h to build the sections top-down, ~1h for polish + branding pass, then a screenshare walk-through with you and ownership handover.
>
> No rush from my side — the BigQuery data lands overnight so I've got a natural pause anyway.

### Step 4 — What replies to expect (and how to handle each)

| Adam's likely reply | What to do |
|---|---|
| "Looks great, go ahead" | Confirm sign-off in writing. Wait for BQ data → run SQL → build. Mark this milestone in MVP_STATUS. |
| "Looks great BUT change X" | Update the mockup, redeploy `LOOKER_MOCKUP_DEMO.html` with the change, send v2, ask for re-sign-off. Rework each round should be <30 min. |
| Silence for >48h | Ping once in Slack referencing the mockup. Do not build until confirmed — that's the whole point of the gate. |
| "Add a new section not in the original 13" | Flag as scope. Small additions (1-2 charts) absorb in buffer if easy. Larger additions (new data source, custom modelling) go to change-order per engagement letter §Scope. See `MANUAL_WORK_AND_OVERTIME_LOG.md` for the running defensible record. |

---

## During the build (post sign-off)

1. **Snapshot v1 of the HTML mockup with a git tag** so we can prove exactly what was signed off. Suggested: `mockup-v1-signoff` tag on the commit that lands sign-off.
2. Build in Looker Studio matching the HTML pixel-for-pixel where feasible. Where Looker Studio can't match exactly (e.g. rounded card corners, specific font weights) — pick the closest native option and note in build log.
3. Keep Adam updated with a screenshot after each chapter (A, B, C, D, E) — 5 quick check-ins, ~30 seconds each. Prevents big surprises at the walk-through.

---

## Walk-through (post-build)

**Format:** 20-25 min screenshare (Slack Huddle or Google Meet).

**Agenda:**
1. (1 min) Recap what we built and how it maps to his 13 sections.
2. (10 min) Live walk through every section top-to-bottom. Ask "does this answer the question you'd ask?" for each chapter.
3. (5 min) Filter demo — change date range, add a service-line filter. Show how he'll use it day-to-day.
4. (3 min) Ownership handover — Adam becomes Owner, Apex becomes Editor.
5. (2 min) Post-launch expectations — refresh cadence, what "empty" sections look like early, what fills in over time.

**Success criteria:** Adam signs off verbally + in writing. We update `MVP_STATUS.md` row 3.4 to ✅.

---

## Fallback plans

**If Adam wants a Figma design instead of HTML:** he hasn't asked, but if he does — the HTML gives us all the specs (colours, spacing, hierarchy) so a Figma frame can be built in ~1h. Add to overtime log.

**If Adam wants to see it in Looker Studio first (not HTML):** we can build a stripped-down 3-section preview in Looker Studio with real data once BQ lands (~30 min), share view-only link, then finish the rest post-approval. Slower overall but some clients prefer it. Only offer if he asks.

**If Adam is silent >5 business days:** convert the HTML mockup to PDF, resend with a shorter message. No further follow-up beyond that — that's his court.
