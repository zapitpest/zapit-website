---
name: subagent-orchestrator
description: Orchestrates parallel subagent workflows for quality assurance during Zapit website development. Use when running quality checks, deploying, reviewing code, or verifying SEO implementation.
---

# Subagent Orchestrator

## When to Run Subagents

### After Building a New Template
Run these 3 subagents in parallel:
1. **SEO Audit Agent** — verify meta tags, schema, internal links
2. **Code Quality Agent** — check TypeScript, no hardcoded strings, component patterns
3. **Security Agent** — verify env vars, no exposed secrets, input sanitization

### Before Committing
Run these 2 in parallel:
1. **Lint + Type Check** — `npm run lint && npx tsc --noEmit`
2. **Build Test** — `npm run build` (catches SSR errors)

### Before Deployment
Run all 4 in parallel:
1. **Full SEO Audit** — every page type has correct meta + schema
2. **Security Scan** — no exposed keys, RLS enabled, headers set
3. **Performance Check** — Lighthouse scores, image sizes, bundle analysis
4. **Link Validation** — all internal links resolve, all redirects work

## Subagent Prompts

### SEO Audit Subagent
```
Read .cursor/skills/seo-audit/SKILL.md then audit all page templates in app/.
Check: meta tags uniqueness, schema correctness, internal links, redirects, 
image alt text, XML sitemap completeness. Report issues as:
- CRITICAL: blocks indexing or causes errors
- WARNING: hurts rankings
- INFO: improvement opportunity
```

### Code Quality Subagent
```
Read .cursor/skills/code-quality-checker/SKILL.md then scan all .ts/.tsx files.
Check: no hardcoded strings (phone/email/address/business name), TypeScript 
strictness, component patterns, performance anti-patterns. Search for: 
"9126", "1800", "0432", "@zapitpestmelbourne", "zapitpestmelbourne.com.au",
"any" type usage, useEffect data fetching, <img> tags.
```

### Security Subagent
```
Read .cursor/skills/security-checker/SKILL.md then audit the codebase.
Check: env vars not exposed, Supabase RLS policies, no eval/innerHTML abuse,
security headers configured, contact form sanitized, no secrets in git.
Search for: "SUPABASE_SERVICE_ROLE", "secret", "password", "key =", eval(, innerHTML.
```
