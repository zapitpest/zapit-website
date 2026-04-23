---
name: code-quality-checker
description: Checks code quality, TypeScript strictness, component patterns, and best practices for the Zapit Next.js project. Use when reviewing code, checking for anti-patterns, validating component structure, or before committing changes.
---

# Code Quality Checker

## Automated Checks

### TypeScript Strictness
- [ ] No `any` types — use proper interfaces
- [ ] No `@ts-ignore` or `@ts-expect-error`
- [ ] All function parameters typed
- [ ] All return types explicit for exported functions
- [ ] Interfaces for all data shapes in `types/`

### No Hardcoded Values
- [ ] No hardcoded phone numbers (search: `9126`, `1800`, `0432`)
- [ ] No hardcoded email addresses (search: `@zapitpestmelbourne`)
- [ ] No hardcoded URLs (search: `zapitpestmelbourne.com.au`)
- [ ] No hardcoded business name text
- [ ] No hardcoded addresses
- [ ] All values from `SITE_CONFIG` in `lib/constants.ts`

### Component Quality
- [ ] One component per file
- [ ] Props interface defined and exported
- [ ] No inline styles — use Tailwind classes
- [ ] No unnecessary `'use client'` directives
- [ ] Server Components by default
- [ ] No `useEffect` for data fetching

### Performance
- [ ] Images use `next/image` (never `<img>`)
- [ ] Fonts use `next/font` (never external CDN)
- [ ] No unnecessary client-side JS
- [ ] Dynamic imports for heavy below-fold components
- [ ] No layout shift (explicit width/height on images)

### Error Handling
- [ ] All async functions have try/catch
- [ ] Error boundaries (error.tsx) in route segments
- [ ] User-friendly fallback UI on errors
- [ ] Console.error for debugging, never console.log in production

### File Organization
- [ ] Route files in `app/` follow Next.js conventions
- [ ] Shared components in `components/`
- [ ] Data queries in `lib/supabase/queries.ts`
- [ ] Types in `types/`
- [ ] Constants in `lib/constants.ts`
- [ ] Schema generators in `lib/schema.ts`
