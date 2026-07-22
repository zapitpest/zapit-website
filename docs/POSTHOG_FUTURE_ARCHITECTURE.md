# PostHog — Future Architecture Note

**Status:** Architectural decision recorded. Not part of MVP. Ready to implement when Adam wants to instrument the Commercial Portal, CRM, technician portal, or future AI apps.

**Decision date:** 2026-07-20 (in response to Adam's long-term stack question)

**Owner:** Sharjeel · Apex AI

---

## Why PostHog (recap of the decision)

Adam proposed a 4-tool analytics stack:

- **GA4** for marketing analytics (website)
- **BigQuery** as the central data warehouse and system of record
- **Microsoft Clarity** for website UX (heatmaps + session recordings)
- **PostHog** for product analytics on internal apps (Commercial Portal + CRM + technician portal + future AI apps)

We endorsed the split. Each tool solves a different problem, none of them overlap, and they all send events to BigQuery — so the source-of-truth architecture stays intact.

**Why PostHog specifically over Mixpanel / Amplitude:**

- Open source with self-host option — matches Adam's stated open-standards + no-lock-in preferences
- Native BigQuery export — events land in BigQuery as raw + typed rows
- Free tier: 1M events/month (self-hosted is free forever)
- Feature flags + experimentation bundled — useful for iterating on Commercial Portal features
- Single-vendor consolidation for product analytics + session replay + feature flags on internal apps

---

## Ingest path (when it's time to implement)

Same reserved-dataset pattern as every other future source. Zero architectural surprises.

### 1. Provision the reserved dataset

Create `zapit_reserved_posthog` alongside the existing 8 reserved datasets in project `zapit-business-intelligence`, region `australia-southeast1`. Add the table shell to `sql/003_reserved_schemas.sql`:

```sql
CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_posthog.events` (
  event_id            STRING NOT NULL,
  event_timestamp     TIMESTAMP NOT NULL,
  event_name          STRING NOT NULL,
  distinct_id         STRING NOT NULL,       -- PostHog's primary user identifier
  session_id          STRING,
  app_name            STRING,                -- 'commercial_portal' | 'crm' | 'technician_portal' | 'ai_app_<name>'
  properties          JSON,                  -- all event props as JSON — no schema fork per event type
  person_email_hash   STRING,                -- SHA-256 of email (bridges to GA4 user_email_hash)
  person_phone_hash   STRING,                -- SHA-256 of E.164 phone (bridges to GA4 user_phone_hash)
  ingested_at         TIMESTAMP              -- set to CURRENT_TIMESTAMP() at insert
)
OPTIONS (description = 'Reserved — PostHog product-analytics events for internal apps. Populated when PostHog block ships.');

CREATE TABLE IF NOT EXISTS `zapit-business-intelligence.zapit_reserved_posthog.persons` (
  distinct_id         STRING NOT NULL,
  first_seen_at       TIMESTAMP,
  last_seen_at        TIMESTAMP,
  email_hash          STRING,
  phone_hash          STRING,
  properties          JSON,                  -- name, role, tenure, etc.
  ingested_at         TIMESTAMP
)
OPTIONS (description = 'Reserved — PostHog user profile records with identity fields for cross-source joins.');
```

### 2. Configure PostHog → BigQuery export

Two options:

**Option A — PostHog Cloud (managed):**
- Sign up for PostHog Cloud (free tier: 1M events/month)
- Settings → Apps → BigQuery Export → connect via GCP service account with `roles/bigquery.dataEditor` on `zapit_reserved_posthog` only
- Configure destination: `zapit-business-intelligence.zapit_reserved_posthog.events`
- Events export in near-real-time (batched every ~15 minutes)

**Option B — PostHog self-hosted (Kubernetes / Docker):**
- Deploy PostHog on GCP Compute Engine or GKE (in same GCP project or a separate one — either works)
- Configure the same BigQuery export destination
- Free forever, full control, higher operational overhead

**Recommendation:** start with Cloud (A) for MVP-of-internal-apps to keep operational surface small. Migrate to self-hosted (B) only if data volume exceeds the free tier or compliance requirements need it.

### 3. Instrument the app(s)

Install PostHog SDK for each app framework:

- **Commercial Portal / CRM / internal dashboards** (assumed React or Next.js) → `posthog-js` npm package
- **Technician portal** (if mobile) → `posthog-react-native` or `posthog-ios` / `posthog-android`
- **Future AI apps** → whichever SDK matches the runtime (Python: `posthog-python`; Node: `posthog-node`)

Initialise with the project API key + configure user identification:

```javascript
import posthog from 'posthog-js';

posthog.init('<PROJECT_API_KEY>', {
  api_host: 'https://app.posthog.com',   // or self-hosted URL
});

// On login, identify the user with hashed email for cross-source joins
posthog.identify(userId, {
  email_hash: sha256(email.toLowerCase().trim()),
  phone_hash: sha256(toE164(phone)),
});
```

### 4. Define key events (per app)

Before instrumenting, define the 5-15 key events per app that matter for product decisions. Typical categories:

- **Activation events** — first meaningful action (created first job, submitted first proposal, etc.)
- **Engagement events** — repeated use (viewed dashboard, ran report, edited record)
- **Conversion events** — moved forward in the workflow (submitted proposal → won opportunity)
- **Drop-off events** — abandoned an action (started form → didn't finish)
- **Feature adoption events** — used a new capability (opened AI insights panel, enabled a feature flag)

**Recommendation:** budget a 1-week iteration period per app to define + refine the event taxonomy before treating the data as authoritative.

---

## Identity stitching — how PostHog joins other sources

Same pattern used across the warehouse. PostHog's `distinct_id` doesn't directly bridge to GA4's `user_pseudo_id` because they're different identifier spaces (PostHog = authenticated app user; GA4 = anonymous website session). The bridge is the hashed contact fields:

```
Marketing website (GA4)   → user_email_hash + user_phone_hash
WhatConverts calls        → caller_phone_hash → email_hash (from CRM link)
GHL contacts              → email_hash + phone_hash
PostHog persons           → email_hash + phone_hash
Zoom Phone calls          → caller_phone_hash
                              │
                              ▼
                    stg_customer_master view
              (deduplicated identity graph on
               email_hash + phone_hash + name-similarity)
```

Once GHL + PostHog + WhatConverts all ship, a `stg_customer_master` view joins these into a unified customer identity graph. Then downstream views (customer lifecycle, churn risk, engagement scoring) can reason across the whole journey — anonymous website visit → phone enquiry → CRM contact → portal user → repeat customer.

---

## Downstream — what PostHog unlocks in the dashboard

Adding PostHog data to the Looker Studio report doesn't require redesigning any existing page. It adds new pages/tabs that read from a new `stg_product_analytics` view sitting on top of `zapit_reserved_posthog.events` + `.persons`.

Likely new pages when PostHog is live:

- **Page 7 — Product Analytics (Commercial Portal)** — activation funnel, engagement over time, feature adoption
- **Page 8 — Product Analytics (CRM)** — usage by role, drop-off in workflows
- **Page 9 — Product Analytics (Technician Portal)** — job-completion funnel, mobile vs desktop
- **Page 10 — Product Analytics (AI Apps)** — recommendation acceptance rate, human-approval throughput

Each page is a 30-60 min addition to the existing report — no rebuild.

---

## Effort estimate

**Prerequisite:** Adam has at least one internal app live worth measuring. Currently: none yet.

**When ready:**
1. Provision `zapit_reserved_posthog` dataset + tables — 15 minutes
2. Set up PostHog Cloud account + BigQuery export destination — 30 minutes
3. Install PostHog SDK in the first target app + wire authentication + identification — 1-2 hours per app
4. Define 5-15 key events per app + implement instrumentation — 2-4 hours per app plus iteration
5. Add `stg_product_analytics` view to Looker Studio + first Product Analytics page — 1-2 hours

**Rough total when instrumenting the first internal app: ~1-2 days of focused work plus a week of event-taxonomy iteration.** Subsequent apps are faster because the pattern is established.

---

## Related documents

- `docs/ADAM_15_SOURCES_ALIGNMENT.md` — full 16-source alignment map (PostHog added as #16)
- `sql/003_reserved_schemas.sql` — reserved table shells (PostHog tables to be added when instrumentation ships)
- `docs/LOOKER_DASHBOARD_MOCKUP_v2_BUILD_SPEC.md` — dashboard architecture that PostHog pages will extend
- `docs/HOSTING_PORTABILITY.md` — cross-reference for our no-lock-in principle (PostHog self-host aligns with it)

---

## Sign-off provenance

- Adam raised PostHog question: 2026-07-20 email
- Apex response endorsing PostHog for future product-analytics layer: 2026-07-20
- No implementation commitment in MVP scope
- Architectural pathway documented in this note for future execution
