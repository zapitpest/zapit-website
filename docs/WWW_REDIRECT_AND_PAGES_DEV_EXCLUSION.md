# www → apex Redirect + pages.dev Exclusion Fix

**Written:** 27 September 2026 · **Owner:** Sharjeel Saleem (Apex AI)
**Response to:** Zaydan's 26 Sep points #5 (www serves whole site) + #6 (branch previews firing production tracking)

═══════════════════════════════════════════════════

## 1 · Problem A — www + apex both serve

**Verified 27 Sep with curl:**
- `https://zapitpestmelbourne.com.au/` → HTTP 200
- `https://www.zapitpestmelbourne.com.au/` → HTTP 200
- No 301 redirect between them

Both hostnames are configured as separate Cloudflare Pages custom domains and both serve the same site independently. Canonical link tags point to the apex, which protects SEO ranking — but every analytics tool (GA4, GTM, Search Console, Clarity, WhatConverts) treats www and non-www as two different hostnames. Traffic counted twice, sessions split, source-medium diluted.

═══════════════════════════════════════════════════

## 2 · Fix — Cloudflare Bulk Redirect

The correct fix is a Cloudflare Bulk Redirect (not a Page Rule — Bulk Redirects work at the network edge before Pages sees the request, so it's faster and doesn't consume Pages requests).

### 2.1 · Steps in Cloudflare dashboard

1. Open Cloudflare dashboard → **Zapitpestcontroluser** account
2. Left sidebar (account-level, NOT zone-level) → **Bulk Redirects**
3. Click **Create Bulk Redirect List** (if none exists)
   - **Name:** `zap-it-www-to-apex`
   - **Description:** `Redirect www.zapitpestmelbourne.com.au → apex (all paths, 301)`
   - **Type:** URL Redirect
4. Click **Add URL redirects manually** → paste this single row:

    | Source URL | Target URL | Status | Preserve query string | Preserve path suffix | Include subdomains | Subpath matching |
    |------------|------------|--------|------------------------|----------------------|--------------------|--------------------|
    | `https://www.zapitpestmelbourne.com.au/` | `https://zapitpestmelbourne.com.au/` | 301 | ✅ | ✅ | ❌ | ✅ |

5. Save the list
6. Left sidebar → **Bulk Redirects** → **Create Bulk Redirect Rule**
    - **Name:** `zap-it-www-consolidation`
    - **List:** select `zap-it-www-to-apex`
    - **Priority:** default
7. Deploy the rule
8. Test with curl (should show 301):

    ```
    curl -sI https://www.zapitpestmelbourne.com.au/ | grep -E "^(HTTP|location)"
    ```

    Expected:
    ```
    HTTP/2 301
    location: https://zapitpestmelbourne.com.au/
    ```

    Test a deep path too:
    ```
    curl -sI https://www.zapitpestmelbourne.com.au/pest-solutions/ | grep -E "^(HTTP|location)"
    ```

    Expected:
    ```
    HTTP/2 301
    location: https://zapitpestmelbourne.com.au/pest-solutions/
    ```

### 2.2 · Sanity checks after publish

- Apex still 200 ✓
- www redirects 301 → apex ✓ on `/`, `/pest-solutions/`, a suburb page, a commercial page
- Trailing slash preserved
- Query strings preserved (e.g. `?utm_source=test` should carry over)
- No infinite redirect loop

### 2.3 · Historical data note

Any analytics data landed before this redirect will still show www vs non-www as separate hostnames — no way to retroactively merge in GA4. Cutoff line documented in the change log.

═══════════════════════════════════════════════════

## 3 · Problem B — pages.dev previews firing production tags

**Verified 27 Sep:** Zaydan spotted a session from `task-multi-service-discount.zapit-website-6q7.pages.dev` in Clarity. The GTM container config confirms: **zero hostname exclusions on any trigger**. Every Cloudflare Pages preview URL — one for every branch — fires the full production analytics stack.

**Impact:**
- Clarity records internal QA sessions as real user behaviour
- GA4 counts Apex QA visits as production users
- Meta Pixel + WhatConverts get preview-hostname noise
- Behavioural aggregates get skewed

═══════════════════════════════════════════════════

## 4 · Fix — GTM container-level exception on all triggers

The clean fix is a single exception variable that every trigger inherits from, so any future tag automatically gets the same protection.

### 4.1 · Steps in GTM (`GTM-PFGV87RB` workspace)

1. Open GTM → workspace → left sidebar → **Variables**
2. Under **User-Defined Variables** → **New**
    - **Name:** `var.env.is_production_hostname`
    - **Type:** Custom JavaScript
    - **Function:**
        ```javascript
        function() {
          var host = document.location.hostname.toLowerCase();
          return host === 'zapitpestmelbourne.com.au' 
              || host === 'www.zapitpestmelbourne.com.au';
        }
        ```
    - Save

3. Left sidebar → **Triggers** → **New**
    - **Name:** `trg.env.non_production_hostname`
    - **Type:** Custom Event
    - **Event name:** `.*` with "Use regex matching" ON
    - **This trigger fires on:** Some Custom Events
    - **Condition:** `var.env.is_production_hostname` **equals** `false`
    - Save

4. For each existing tag (all 10 in PFGV87RB):
    - Open the tag → **Triggering** section
    - Click **Add Exception**
    - Select `trg.env.non_production_hostname`
    - Save the tag

5. Publish workspace as new version:
    - **Version name:** `Container-level exception for non-production hostnames + Ads migration (in progress)`
    - **Version description:** `Every tag now excluded from firing on any hostname other than zapitpestmelbourne.com.au or www.zapitpestmelbourne.com.au. Fixes Zaydan-flagged pages.dev preview leak into Clarity/GA4/Meta/WhatConverts. Once www redirect is live (see WWW_REDIRECT_AND_PAGES_DEV_EXCLUSION.md), the www condition can be dropped.`

### 4.2 · Sanity check after publish

1. Open GTM Preview mode
2. Navigate to `https://<any-branch>.zapit-website-6q7.pages.dev/`
3. In Tag Assistant → confirm **zero tags fire**
4. Then navigate to `https://zapitpestmelbourne.com.au/`
5. In Tag Assistant → confirm **all 10 tags fire as normal**

### 4.3 · Alternative: hostname whitelist per tag

If the custom-event trigger exception approach feels heavy, the simpler-but-more-repetitive fix is a Firing Trigger condition on every tag:

- Add condition: `Page Hostname` **matches RegEx** `^(www\.)?zapitpestmelbourne\.com\.au$`

This works the same way but has to be added to every new tag manually going forward. The custom-event exception approach in §4.1 protects future tags automatically.

═══════════════════════════════════════════════════

## 5 · After both fixes are live

- Verify with curl per §2.3
- Verify with Preview mode per §4.2
- Update `docs/HANDOVER_RUNBOOK.md` and `docs/MVP_STATUS.md` chronology with the change
- Ping Zaydan on WhatsApp: `www redirect + pages.dev exclusion both live and verified. Next: Ads migration.`
