---
name: security-checker
description: Checks security vulnerabilities in the Zapit website code. Validates env vars, input sanitization, Supabase RLS, and common web security issues. Use when reviewing security, checking for vulnerabilities, or before deployment.
---

# Security Checker

## Critical Checks

### Environment Variables
- [ ] `SUPABASE_SERVICE_ROLE_KEY` NEVER in client code or `NEXT_PUBLIC_` prefix
- [ ] Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` exposed
- [ ] `.env.local` in `.gitignore`
- [ ] No secrets in committed code (search: `key`, `secret`, `password`, `token`)

### Supabase Security
- [ ] RLS enabled on ALL tables
- [ ] Public read: `USING (is_published = true)` — users can only read published content
- [ ] No public write policies — all writes via server-side service key
- [ ] Anon key used in client, service key ONLY in server functions

### Input Sanitization
- [ ] Contact form inputs sanitized before processing
- [ ] Search input escaped before Supabase queries
- [ ] No raw HTML rendering from user input
- [ ] No SQL injection vectors (Supabase client handles parameterization)

### Headers & CSP
- [ ] Security headers in `next.config.ts`:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] No `dangerouslySetInnerHTML` except for JSON-LD schema blocks

### API Routes
- [ ] Rate limiting on contact form API route
- [ ] CORS configured correctly
- [ ] No sensitive data in API responses
- [ ] Validate request body shape before processing

### Common Vulnerabilities
- [ ] No `eval()` or `Function()` constructor
- [ ] No `innerHTML` except JSON-LD
- [ ] No hardcoded credentials
- [ ] Dependencies up to date (no known CVEs)
- [ ] No prototype pollution vectors
