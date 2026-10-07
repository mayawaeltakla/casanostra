# CASANOSTRA — I18n Guide

## Supported locales

```text
ar  Arabic    RTL  default
 en English   LTR
 tr Turkish   LTR
 fr French   LTR
 ru Russian  LTR
```

Do not add or remove a locale casually. A locale is a cross-cutting feature touching messages, page messages, service details, language picker, direction, metadata, tests, and often sitemap/indexability.

## Locale selection

The current implementation uses the `casanostra-locale` cookie.

`src/app/layout.tsx` is responsible for:

1. reading the cookie;
2. validating the locale;
3. falling back to Arabic;
4. setting `<html lang="...">`;
5. setting `dir="rtl"` only for Arabic;
6. merging base + page message catalogs into `NextIntlClientProvider`.

The language switcher updates the cookie and reloads so server-rendered content uses the new locale.

## Translation ownership

| Content | Source |
|---|---|
| Locale registry / language names | `src/i18n/messages.ts` |
| Shared UI strings | `src/i18n/messages.ts` |
| Page UI | `src/i18n/page-messages.ts` |
| Service card titles/descriptions and service page chrome | `servicesPage` in `page-messages.ts` |
| Service long description/features/included/excluded | `src/i18n/service-details.ts` for non-Arabic; Arabic canonical source remains in `site-config.ts` |
| Booking field schema | `src/lib/services.ts` |
| Booking WhatsApp copy | `BookingForm.tsx` + translations passed into `src/lib/whatsapp.ts` |
| Metadata | `messages.ts` + route-specific `generateMetadata` implementations |

## Hard rules

### Never hardcode user-facing strings in TSX

Prefer:

```tsx
const t = useTranslations("namespace");
return <span>{t("key")}</span>;
```

The project has an i18next lint warning and a separate i18n validator. Existing exceptions are possible, but new UI copy should be localized.

### Preserve interpolation placeholders

Examples such as `{count}`, `{service}`, `{duration}`, or `{name}` must stay identical across locales.

### No Arabic leakage into non-Arabic locales

The i18n validator rejects Arabic-script strings in non-Arabic catalogs. The Playwright suite also checks rendered text and WhatsApp copy for Arabic leakage.

### Service detail rule

For `/services/[slug]`:

- `servicesPage.serviceCards.<slug>` supplies localized title/short description/duration/price and related chrome.
- `serviceDetailMessages[locale][slug]` supplies non-Arabic long-form content.
- Arabic uses the canonical Arabic data in `servicesList`.

When adding a new service, keep the same slug across all sources and add all required non-Arabic detail translations before declaring the feature complete.

### Indexability rule

Current partially localized content (`/blog`, `/privacy`, `/terms`) is intentionally `index: true` only for Arabic and excluded from `sitemap.ts`. Do not change this casually. Full localization should come first.

## Verification

Run:

```bash
npm run check:i18n
npx tsc --noEmit
npm run lint
npm run build
npm run test:e2e
```

For a locale change, verify at minimum:

- HTML `lang`
- HTML `dir`
- header/footer
- page title + description
- service detail content
- form validation strings
- WhatsApp generated text
- language switcher current-page behavior
- sitemap/indexability behavior
