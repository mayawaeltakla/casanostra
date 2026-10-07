# First Codex message — use verbatim

```text
We are bootstrapping the CASANOSTRA repository from zero.

First read AGENTS.md, then read only the relevant project docs it points to.
Also read CASANOSTRA_FIX_PLAN.md, but do not execute it yet.

Your task in this conversation is DISCOVERY ONLY.

Do not modify application code, configuration, dependencies, translations, routing, images, videos, tests, or deployment files.
Do not create a commit.
Do not install or uninstall packages unless absolutely required just to inspect the environment; prefer read-only inspection in this first task.
Do not print secrets from .env.

Build a verified model of the current repository:
1. runtime/framework versions from package.json and lockfiles
2. current routes and page structure
3. current i18n architecture and 5 locales
4. the 11 service slugs and their data/form sources
5. the booking form -> validation -> WhatsApp flow
6. the current image architecture and all external image sources
7. the public video assets and where they are used
8. blog data and localization limitations
9. SEO/metadata/sitemap/robots architecture
10. Playwright architecture and what `npm run build` does before E2E
11. Prisma presence and whether generated artifacts are required
12. Caddy/deployment files
13. ESLint configuration and known disabled rules
14. package-manager/lockfile situation
15. differences you find between current code and CASANOSTRA_FIX_PLAN.md

For every discrepancy with the repair plan, do not repair it. Record:
- plan statement
- current code fact
- file
- impact
- whether the plan should be corrected before execution

Return:
A. architecture map
B. source-of-truth map
C. route map
D. image/video map
E. current risks
F. plan/code discrepancies
G. questions that require owner decisions
H. exact recommended next task

Stop after the report.
```
