# CASANOSTRA — I18n Guide

## Supported locales

```text
ar  Arabic    RTL  default
 en English   LTR
 tr Turkish   LTR
 fr French   LTR
 ru Russian  LTR
```

Do not add or remove a locale casually. A locale is a cross-cutting feature touching messages, page messages, service details, language picker, direction, metadata, routing, tests, and often sitemap/indexability.

## Locale selection

Locales live in the URL prefix: `/ar/...`, `/en/...`, `/tr/...`, `/fr/...`, `/ru/...` (`localePrefix: "always"` in `src/i18n/routing.ts`).

- `src/proxy.ts` (next-intl middleware) negotiates the locale from the URL prefix first, then from the `casanostra-locale` cookie or `accept-language` (e.g. a bare `/` visit), and redirects to the prefixed path. It also emits alternate `Link` headers for search engines.
- `src/app/[locale]/layout.tsx` is responsible for:

1. validating `params.locale` (`notFound()` when invalid);
2. calling `setRequestLocale(locale)` for static rendering;
3. setting `<html lang="...">`;
4. setting `dir="rtl"` only for Arabic;
5. merging base + page message catalogs into `NextIntlClientProvider`.

- `src/i18n/request.ts` reads the locale from `requestLocale` (set by the layout/proxy), with the legacy cookie as a last-resort fallback.
- `src/app/layout.tsx` is intentionally minimal (pass-through); all locale work happens under `[locale]`.

The language switcher navigates client-side (`router.replace(pathname, { locale })` from `src/i18n/navigation.ts`) to the same path in the new locale — no page reload, no state loss. It keeps the legacy `casanostra-locale` cookie in sync for backward compatibility.

All internal links must use `Link` (and `usePathname`/`useRouter`) from `src/i18n/navigation.ts` so the prefix is applied automatically. Never import them from `next/link` / `next/navigation` for internal navigation (`notFound` stays from `next/navigation`).

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
