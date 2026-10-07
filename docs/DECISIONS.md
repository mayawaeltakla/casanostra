# CASANOSTRA — Current Decisions & Constraints

## 1. Five locales only

The supported set is exactly Arabic, English, Turkish, French, and Russian. Chinese (`zh`) was intentionally removed in the project's history.

## 2. Arabic is the default / RTL locale

Arabic is the canonical default locale and the only RTL locale. Other supported locales render LTR.

## 3. Cookie-based locale switching

The language picker writes `casanostra-locale` and reloads the page so server-rendered content re-resolves using the selected locale.

## 4. Static-first content model

Most tourism content is stored in TypeScript data files, not a CMS/database. Prisma exists, but it is not the source of truth for the main public tourism catalog.

## 5. Dynamic service forms are schema-driven

`src/lib/services.ts` defines field metadata; `BookingForm.tsx` renders that metadata. New service form behavior should normally be added through this schema rather than copy-pasting an entirely new form.

## 6. WhatsApp is a primary conversion channel

Booking submissions are converted to WhatsApp URLs. Preserve locale-aware copy and the existing phone-number configuration mechanism.

## 7. Partial localization is deliberate

The current project does not expose every route as fully localized/indexable content. `/blog`, `/privacy`, and `/terms` currently use Arabic-only indexability semantics and are omitted from the sitemap. This is an SEO constraint, not an accidental omission.

## 8. Do not expand scope during routine fixes

There is historical code and tooling that may look unfinished or redundant. Do not clean it up unless the user asks for refactoring/maintenance work.

## 9. Historical worklog is not current truth

`worklog.md` records previous agent activity. It is useful for understanding why some fixes exist, but any statement there must be re-verified against the current tree before acting on it.

## 10. Current quality gate

A meaningful feature is not considered complete until the relevant tests/checks pass. For localization/shared-shell changes, this normally includes `npm run check:i18n`, TypeScript, lint, build, and E2E.
