# CASANOSTRA — Project Map

## Product

CASANOSTRA is a multilingual luxury tourism agency website focused on Turkey. The UI supports Arabic, English, Turkish, French, and Russian. The main conversion path is service-specific booking forms that produce WhatsApp links.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4 + `tailwindcss-animate`
- next-intl 4
- Radix/shadcn-style UI primitives
- Framer Motion
- Prisma 6 + SQLite
- Playwright
- ESLint 9 + Next.js rules + i18next literal-string warning rule

## Root-level map

```text
src/
  app/                 Root pass-through layout; all routes under [locale]/; API + sitemap stay at root
  proxy.ts             Locale negotiation/redirect middleware (next-intl)
  components/          Shared site components, homepage sections, UI primitives
  hooks/               Small reusable React hooks
  i18n/                Locale registry, base messages, page messages, service details, request/routing/navigation
  lib/                 Business/content data, services, blog, WhatsApp, DB client, utilities

prisma/
  schema.prisma        SQLite schema

public/
  logo.svg
  robots.txt
  videos/              Hero/promo video assets

scripts/
  check-i18n.mjs                Translation consistency validator
  report-untranslated-copy.mjs  Untranslated-copy reporting helper
  copy-build-assets.mjs         Standalone-build asset copy step
  start-standalone.mjs          Standalone server launcher
  build-single-file.sh          Historical/source-bundle helper
  remove_zh.py                  Historical locale-removal helper

tests/e2e/
  i18n.spec.ts         Main multilingual end-to-end contract

.agent/
  PLANS.md             Complex-change planning contract

docs/
  PROJECT_MAP.md       This map
  I18N_GUIDE.md        Localization rules and data ownership
  OPERATIONS.md        Commands/build/runtime/testing
  DECISIONS.md         Important current constraints
  CODEX_BOOTSTRAP_PROMPT.md  First audit prompt for Codex
```

## Route map

| Route | Responsibility |
|---|---|
| `/` | Homepage made from `src/components/home/*` |
| `/services` | Service catalog |
| `/services/[slug]` | Service detail + localized details + booking form |
| `/offers` | Offers |
| `/plans` | Annual plans |
| `/quick-booking` | General quick booking flow |
| `/contact` | Contact form |
| `/about` | About/strategy/company content |
| `/faq` | FAQ |
| `/help` | Help |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog post detail |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |
| `/api` | Minimal JSON GET endpoint |
| `/sitemap.xml` | Next.js sitemap with only indexable routes |

## Service model: three related sources

### 1. `src/lib/services.ts`

Defines the service form schema:

- 11 slugs
- title/description/icon metadata
- fields
- field types
- conditional fields
- per-person fields
- service-specific dropdown values

This is the form-schema source of truth.

### 2. `src/lib/site-config.ts`

Defines site/business presentation data, including:

- siteConfig
- `servicesList`
- `offersList`
- `plansList`
- `plansFAQ`
- `navItems`
- footer columns

The service entries here also contain Arabic-oriented long-form canonical content and image data. Do not delete this data merely because other locales exist.

### 3. `src/i18n/service-details.ts`

Defines translated long-form service detail copy for non-Arabic locales. The dynamic service page combines the localized service card data from `servicesPage` with this detailed translation layer.

## Current service slugs

```text
reservations-turkey
visa
vip-cars
hotels
flights
daily-tours
private-tours
group-tours
hajj-umrah
medical-tourism
other-services
```

## Current blog slugs

```text
best-10-places-istanbul
turkey-visa-complete-guide
cappadocia-balloon-city
golden-tips-before-turkey-trip
```

## Translation model

### `src/i18n/messages.ts`

Global/shared strings and the locale registry. Includes:

- supported locales
- default locale
- direction helper
- language metadata
- metadata strings
- common/nav/footer/WhatsApp/theme and other shared strings

### `src/i18n/page-messages.ts`

Page-level messages for pages such as About, FAQ, Contact, Quick Booking, Services, Offers, and service forms.

### `src/i18n/request.ts`

Builds the server-side request messages from the cookie-selected locale.

### `src/i18n/routing.ts`

Defines next-intl routing configuration (`as-needed` locale prefix).

### `src/app/[locale]/layout.tsx`

Validates `params.locale`, calls `setRequestLocale`, sets `<html lang>` and `dir`, and merges the message catalogs for the client provider. The root `src/app/layout.tsx` is a minimal pass-through. Locale comes from the URL prefix; `src/proxy.ts` redirects unprefixed visits.

## Important shared components

- `Header.tsx` — main navigation, services menu, locale-aware labels.
- `Footer.tsx` — footer, business info, social links, localized copy.
- `LanguageSwitcher.tsx` — writes `casanostra-locale` and reloads the page.
- `ThemeToggle.tsx` — dark/light mode control.
- `WhatsAppButton.tsx` — floating WhatsApp UI.
- `BookingForm.tsx` — dynamic form driven by `FieldDef[]`.

## Blog

`src/lib/blog.ts` currently stores four full blog posts as in-code data. The source content is primarily Arabic. Do not assume the blog is fully localized just because the shell is localized. The current SEO/test behavior intentionally limits indexability for this content outside Arabic.

## What not to treat as product source

- `worklog.md` — useful historical context, not current truth.
- `tool-results/*` — historical tool output.
- `.next/*` — generated build output.
- `test-results/*` — generated test artifacts.
