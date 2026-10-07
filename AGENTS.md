# CASANOSTRA — Codex Repository Instructions

## 1. Mission

This repository is the CASANOSTRA luxury tourism agency website for Turkey. It is a Next.js App Router application with React, TypeScript, Tailwind CSS v4, shadcn/ui-style components, next-intl, Prisma/SQLite, Playwright, and WhatsApp-based booking flows.

Your default goal is to make the smallest correct change that preserves the existing product, visual language, localization guarantees, SEO behavior, and build/test contract.

## 2. Read the right context for the task

Do **not** reread every project document for every small change. Read only the references that apply:

- `docs/PROJECT_MAP.md` — architecture and file responsibilities.
- `docs/I18N_GUIDE.md` — localization, RTL/LTR, translation sources, and rules.
- `docs/OPERATIONS.md` — commands, verification, environment, build/deploy facts.
- `docs/DECISIONS.md` — important existing decisions and known constraints.
- `.agent/PLANS.md` — required format for multi-step features, refactors, or risky changes.
- `worklog.md` — historical debugging/work notes only; current source code and tests are authoritative.

## 3. Source of truth rules

- Current code + tests are authoritative over `worklog.md`, `tool-results/`, and old generated artifacts.
- Do not treat `.next/`, `test-results/`, `tool-results/`, or `tsconfig.tsbuildinfo` as source files.
- Never read or print secret values from `.env`. Use variable names only unless the task explicitly requires a secret value and the user has provided it for that purpose.
- Keep `.env` out of commits. `.gitignore` already ignores `.env*`.

## 4. Architecture boundaries

### App / routing

- Routes live under `src/app/` using the Next.js App Router.
- The root composition is `src/app/layout.tsx`.
- The dynamic service route is `src/app/services/[slug]/page.tsx`.
- The dynamic blog route is `src/app/blog/[slug]/page.tsx`.
- The API route at `src/app/api/route.ts` is currently a minimal JSON health-style endpoint; do not assume it is the booking backend.

### Business/content data

- `src/lib/site-config.ts` contains site configuration plus the canonical Arabic-oriented service, offer, plan, navigation, and footer data.
- `src/lib/services.ts` defines the 11 service slugs and their dynamic booking-form field definitions. This is the form schema source of truth.
- `src/i18n/messages.ts` contains the base/common translation catalog and locale registry.
- `src/i18n/page-messages.ts` contains page-specific translation catalogs and service card text.
- `src/i18n/service-details.ts` contains non-Arabic long-form service-detail translations.
- `src/lib/blog.ts` contains the current blog post data/content (currently Arabic source content).
- `src/lib/whatsapp.ts` builds WhatsApp booking URLs and has a newer localized builder plus a legacy compatibility builder.

### UI

- Shared site shell: `src/components/layout/Header.tsx`, `Footer.tsx`, `src/components/WhatsAppButton.tsx`, `LanguageSwitcher.tsx`, `ThemeToggle.tsx`.
- Booking form: `src/components/BookingForm.tsx`.
- Home sections: `src/components/home/*`.
- Generic UI primitives: `src/components/ui/*`; preserve their shadcn/Radix conventions.

## 5. Localization is a product requirement

Supported locales are exactly: `ar`, `en`, `tr`, `fr`, `ru`.

- `ar` is the default and the only RTL locale.
- Other locales are LTR.
- Locale is selected through the `casanostra-locale` cookie and read in the root layout.
- Do not add a new locale unless the user explicitly asks for it and the full i18n surface is implemented.
- Avoid new hardcoded user-facing strings in JSX/TSX. Use `next-intl` translations.
- When changing a translation key, keep key sets aligned across all locales and preserve interpolation placeholders exactly.
- A service change can require edits in all of: `src/lib/services.ts`, `src/lib/site-config.ts`, `src/i18n/messages.ts`, and `src/i18n/service-details.ts` / `src/i18n/page-messages.ts` depending on what changed.
- Non-Arabic service detail content must come from `serviceDetailMessages`; do not fall back to Arabic long-form copy for `en`, `tr`, `fr`, or `ru`.
- Keep SEO behavior consistent with localization. Blog/privacy/terms are currently intentionally indexable only in Arabic and excluded from the sitemap.

## 6. Forms and WhatsApp

- Treat `src/lib/services.ts` as the schema for dynamic service forms.
- If adding/changing a form field, verify validation, conditional visibility (`showWhen`), rendering, and WhatsApp serialization together.
- `src/lib/whatsapp.ts` must remain compatible with both the current dynamic builder and the legacy `buildWhatsAppLink` path unless the legacy path is deliberately removed as part of a planned change.
- WhatsApp links must be locale-appropriate; tests explicitly guard against Arabic copy leaking into non-Arabic locales.
- Do not hardcode a WhatsApp phone number into new code; use the existing environment/config mechanism.

## 7. Styling and frontend conventions

- Next.js App Router + React Server Components are the default.
- Use client components only when browser state/events are required.
- Tailwind CSS v4 is used; primary theme variables live in `src/app/globals.css`.
- `tailwind.config.ts` is supplemental, not the primary v4 theme definition.
- Use existing design tokens/classes and existing UI primitives before inventing new patterns.
- Preserve RTL/LTR behavior in both layout and interactive components.
- Prefer `next/image` for local/remote images where supported by the existing configuration.

## 8. SEO/content rules

- Preserve localized `generateMetadata` behavior.
- Do not add indexability to partially localized content without also providing complete localization and updating the sitemap/tests.
- `src/app/sitemap.ts` intentionally contains only routes considered fully indexable.
- Do not introduce claims, prices, policies, or legal wording as facts without source/context supplied by the project owner.

## 9. Database

- Prisma schema: `prisma/schema.prisma`.
- Provider is SQLite.
- `src/lib/db.ts` exposes the Prisma client.
- Database work is currently minimal. Do not introduce database coupling for static content unless the task requires it.

## 10. Validation contract

For meaningful changes, run the narrowest relevant checks first, then the full check when practical:

- `npm run check:i18n`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `npm run test:e2e`

For localization or shared-layout changes, the E2E suite is especially important because it checks all 5 locales, RTL/LTR, localized validation text, Arabic leakage, WhatsApp copy, language switching, and sitemap/indexability behavior.

Do not claim a change is verified unless the relevant command actually passed.

## 11. Change discipline

- Prefer small, reviewable patches.
- Do not rewrite large files just to reformat them.
- Do not remove existing functionality to make a type/lint error disappear.
- Before editing a shared data structure, search all call sites.
- Before changing routing or locale behavior, inspect the corresponding E2E coverage.
- If a task exposes a contradiction between docs and code, update the docs after the code is verified.

## 12. Planning

Use an ExecPlan from `.agent/PLANS.md` for multi-file features, significant refactors, migrations, architecture changes, or changes where the implementation path is not obvious. For small fixes, do not create planning overhead.

## 13. OpenAI / Codex documentation

When the task specifically concerns OpenAI APIs, Codex behavior, OpenAI plugins, or current OpenAI product behavior, consult the official OpenAI developer documentation rather than relying on memory.
