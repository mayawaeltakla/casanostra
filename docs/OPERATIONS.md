# CASANOSTRA — Operations & Verification

## Install

The repository contains both `package-lock.json` and `bun.lock`. The `package.json` scripts use npm semantics, so the default reproducible path is npm.

```bash
npm ci
```

If the lockfile/package relationship has intentionally changed, use `npm install` and review the resulting lockfile diff.

## Environment

The project reads at least:

- `DATABASE_URL` — Prisma SQLite datasource.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — optional WhatsApp destination; `src/lib/whatsapp.ts` falls back to the configured site value when absent.

Do not commit `.env` or secret values.

## Development

```bash
npm run dev
```

Default dev port: `3000`.

## Build

```bash
npm run build
```

The build pipeline performs:

1. `npm run check:i18n`
2. `next build`
3. `node scripts/copy-build-assets.mjs`

Next is configured for `output: "standalone"`.

## Production-style start

```bash
npm run start
```

The custom starter is `scripts/start-standalone.mjs`.

## Quality checks

```bash
npm run check:i18n
npx tsc --noEmit
npm run lint
npm run build
```

The all-in-one check is:

```bash
npm run check
```

## E2E

```bash
npm run test:e2e
```

Playwright is configured in `playwright.config.ts` and starts a standalone server on port `3010` after a build.

The primary E2E contract (`tests/e2e/i18n.spec.ts`) covers all five locales and checks:

- language and direction;
- page rendering;
- Arabic leakage in non-Arabic locales;
- localized contact/booking validation;
- language switching;
- WhatsApp UI copy;
- services menu localization;
- sitemap/indexability behavior.

## Database commands

```bash
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:reset
```

Be careful with `db:push` and especially `db:reset`; the current script accepts data loss or resets the database.

## Production/deployment context

`Caddyfile` reverse proxies port `3000`, with a special query-based route for `XTransformPort`.

Do not change the proxy contract unless the deployment task explicitly requires it.

## Common debugging sequence

When the site appears to disappear or the dev server fails:

```bash
npx tsc --noEmit
npm run check:i18n
npm run build
```

Then run the relevant route test or `npm run test:e2e`.

Prefer fixing the first real compiler/build error instead of changing unrelated architecture.
