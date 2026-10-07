# CASANOSTRA baseline — STEP 0.1

## Baseline context

- Baseline time: 2026-10-03T21:26:50+03:00 (Asia/Damascus)
- Intended package manager: npm, using the existing `package-lock.json`.
- No application source, translation, image, video, package manifest, or lockfile was changed during this baseline.

## Git

Git was not available on this host. `git` was absent from `PATH`, `where git` returned no executable, and the standard Windows Git locations checked did not exist. Consequently:

- Git status could not be read.
- The initial working-tree cleanliness could not be verified.
- No branch was created or switched; `fix/phase-0` was not created.
- No commit was created.

## Runtime

- Node.js: `v24.15.0`
- npm: `11.12.1`
- PowerShell execution policy blocked `npm.ps1`; commands below used `npm.cmd` and `npx.cmd`, which invoke the same npm installation.

## Dependency installation

Initial inspection found `node_modules` present but non-reproducible: `npm ls --depth=0` reported several extraneous packages and installed versions newer than the lockfile range. Therefore the allowed command below was run:

```text
npm.cmd ci
```

The command returned successfully with no console output. Post-install inspection, however, found empty package directories under `node_modules`, including `typescript`, `eslint`, `@playwright/test`, and `.bin`. This made the dependency installation operationally incomplete despite the successful process result.

## Commands actually executed

```text
npm.cmd ci
npm.cmd run check:i18n
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run build
npx.cmd playwright test --workers=2
```

Additional read-only measurement/diagnostic commands inspected installed package paths, generated directories, Prisma paths, and `.next/static/chunks/**/*.js` sizes.

## Results

### i18n check

Command: `npm.cmd run check:i18n`

Result: failed (1 runtime resolution error; no catalog validation completed).

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package
'D:\\casanostra-main\\casanostra-main\\node_modules\\typescript\\index.js'
imported from scripts/check-i18n.mjs
```

### TypeScript

Command: `npx.cmd tsc --noEmit`

Result: completed with no emitted diagnostics.

- Errors: 0 observed
- Warnings: 0 observed
- Total diagnostics: 0 observed

This result is limited by the incomplete local dependency tree described above.

### ESLint

Command: `npm.cmd run lint`

Result: failed before ESLint started.

```text
'eslint' is not recognized as an internal or external command,
operable program or batch file.
```

- ESLint errors reported by lint rules: not available
- ESLint warnings reported by lint rules: not available
- Process/setup errors: 1
- Warning categories/rules: not available because the executable was absent.

### Build

Command: `npm.cmd run build`

Result: failed during its first stage, `npm run check:i18n`, with the same missing `typescript/index.js` resolution error. `next build` and `scripts/copy-build-assets.mjs` did not run.

| Build-output route classification | Observed result |
|---|---|
| Static routes | Not available: `next build` did not start. |
| Dynamic routes | Not available: `next build` did not start. |
| Build warnings | No Next.js build warnings; build stopped before Next.js. |

### Playwright

Command: `npx.cmd playwright test --workers=2`

The command was invoked after the failed build. No Playwright reporter output, test summary, trace, or `playwright-report` directory was produced. The result is therefore inconclusive rather than a passing test run.

| Metric | Observed result |
|---|---|
| Projects/browsers | Configured project is Chromium/Desktop Chrome; no execution confirmation was produced. |
| Tests discovered | Not available |
| Passed | Not available |
| Failed | Not available |
| Skipped | Not available |
| Duration | Not available |
| Build repeated by Playwright webServer | Not observed; there was no confirmed Playwright webServer startup or test reporter output. |

The configured Playwright `webServer.command` remains `npm run build && npm run start -- -p 3010`; if it starts successfully in a future baseline, it will repeat the build.

## JavaScript chunk size

Measurement target: existing `.next/static/chunks/**/*.js` files.

- Files: 27
- Raw total: 1,060,189 bytes (1,035.34 KiB)
- Approximate gzip total: 325,902 bytes (318.26 KiB)

The gzip value was calculated locally by compressing each JS file independently with .NET `GZipStream` at optimal compression. These files predate this baseline's failed build, so they are recorded as existing artifacts rather than confirmed output of the current source state.

## Prisma

- `node_modules/@prisma/client/default.js`: absent.
- `node_modules/.prisma/client`: absent.
- Prisma Client was not available after `npm ci`.
- TypeScript emitted no diagnostics, but this cannot establish that a future complete install/build will be unaffected by Prisma generation.

## Generated/runtime output

- `.next`: present; last-write timestamp observed before this baseline build attempt.
- `test-results`: present; last-write timestamp observed before this baseline test attempt.
- `playwright-report`: absent.
- `node_modules`: recreated by `npm ci`, but operationally incomplete as described above.

## Known failures and risks (reported only)

1. `npm ci` returned successfully but left empty package directories and no local executables.
2. `check:i18n` and `build` fail because `scripts/check-i18n.mjs` cannot resolve TypeScript.
3. `lint` cannot start because the local ESLint executable is absent.
4. Playwright results cannot be established from this run because no reporter output or report directory was produced.
5. Git is unavailable, so branch/status requirements could not be verified or performed.
6. Existing `.next` and `test-results` artifacts are stale relative to the failed baseline build/test sequence.

## Scope confirmation

Only this documentation file was added. No application source files were changed, and no repair step beyond STEP 0.1 was started.
