# CASANOSTRA — Bootstrap Codex from Zero

This file is the operator checklist. The repository is not considered bootstrapped until the discovery audit and baseline are completed.

## 1. Put the guidance files into the repository root

Copy these files/folders next to `package.json`:

- `AGENTS.md`
- `.agent/PLANS.md`
- `docs/PROJECT_MAP.md`
- `docs/I18N_GUIDE.md`
- `docs/OPERATIONS.md`
- `docs/DECISIONS.md`
- `docs/CODEX_BOOTSTRAP_PROMPT.md`

Do not put `AGENTS.md` under `src/`.

## 2. Keep secrets private

Do not upload or paste `.env` contents into prompts or documentation. The repository currently contains an `.env`; Codex must treat it as sensitive and must never print its values.

Create/maintain `.env.example` separately when the relevant fix step asks for it; never copy real secrets into it.

## 3. Before the first Codex task

From the repository root, verify the tree contains at least:

```
package.json
src/
public/
prisma/
tests/
AGENTS.md
.agent/
docs/
```

Do not delete `package-lock.json` or `bun.lock` yet. The fix plan contains a later explicit lockfile decision. For bootstrap, inventory both first.

## 4. First Codex conversation: discovery only

Paste the prompt from `docs/CODEX_BOOTSTRAP_PROMPT.md`.

The first task must NOT edit application code. Its output should be an architecture/discrepancy audit only.

## 5. Second Codex conversation: baseline only

After reviewing the discovery report, ask Codex to:

- record git status/branch/commit
- install using the chosen package manager after the lockfile decision is confirmed
- generate Prisma Client if required by the existing project
- run the repository's real scripts from `package.json`
- record TypeScript, lint, i18n check, build and E2E outcomes
- write `docs/baseline.md`
- make no source-code fixes

## 6. Image ingestion is a separate task

Only after the image set is final:

1. Put the images in the `assets_inbox/` folder.
2. Run the image audit prompt.
3. Review the mapping report.
4. Only then allow Codex to copy/link the images into the project.

The image task must not modify videos, routing, i18n architecture, SEO architecture, or unrelated components.

## 7. Never combine discovery, image ingestion and repair work

Use separate Codex turns/tasks for:

- discovery
- baseline
- final image ingestion
- STEP 0.x fixes from `CASANOSTRA_FIX_PLAN.md`

Each task ends with a report and a stop.
