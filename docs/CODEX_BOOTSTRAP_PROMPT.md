# First Prompt to Give Codex

Paste the following into the first Codex task after opening the repository:

> Read `AGENTS.md` first. Then inspect the repository structure and the files referenced by `docs/PROJECT_MAP.md`. Do not change application code yet.
>
> Build a verified mental model of this project:
> 1. identify all routes and their data/component sources;
> 2. trace the locale flow from `casanostra-locale` through `src/app/layout.tsx`, `src/i18n/*`, shared components, and page components;
> 3. trace one service from `src/lib/services.ts` and `src/lib/site-config.ts` through `/services/[slug]`, `src/i18n/page-messages.ts`, `src/i18n/service-details.ts`, `BookingForm.tsx`, and `src/lib/whatsapp.ts`;
> 4. trace how blog content is sourced and why `/blog`, `/privacy`, and `/terms` currently have special indexability behavior;
> 5. inspect `tests/e2e/i18n.spec.ts` and `scripts/check-i18n.mjs` so you understand the project's quality contract;
> 6. note any contradiction between documentation and the current code.
>
> Then report a concise architecture summary, the main source-of-truth files, the critical invariants, and any discrepancies you found. Do not modify code unless you find that one of the new project guidance files is factually wrong; in that case update only the guidance file and explain the correction.

## After the audit

For future tasks, write normal task prompts. Do not repeat the whole project description. Examples:

```text
Implement the new hotel-booking field described below. Follow AGENTS.md, preserve all five locales, and update the relevant tests. Verify with the narrowest checks first and then the full quality gate.
```

```text
Fix the reported Arabic text leaking into French on /services/hotels. Trace the current i18n data flow first, make the smallest correct fix, and run the i18n validator plus the relevant E2E coverage.
```

```text
Plan and implement a significant refactor of the booking flow. Use `.agent/PLANS.md`, keep the current WhatsApp contract, and do not change SEO/indexability unless explicitly requested.
```
