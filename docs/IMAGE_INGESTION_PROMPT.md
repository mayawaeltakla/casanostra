# Image ingestion prompt for Codex

Use this only after the final 11 images are present and owner-approved.

```text
TASK: CASANOSTRA — FINAL IMAGE INGESTION ONLY

Read:
- AGENTS.md
- docs/PROJECT_MAP.md
- docs/OPERATIONS.md
- docs/ASSET_MANIFEST.md
- CASANOSTRA_FIX_PLAN.md (image-related sections only)

This is an image-ingestion task only.
Do not implement any other fix from the repair plan.

Before editing:
1. Inspect the current image architecture and all image call sites.
2. Inspect all 11 final image files and record dimensions/size/format.
3. Map each final image to the real service slug in `src/lib/site-config.ts` / `src/lib/services.ts`.
4. Identify every old external image URL that corresponds to an approved local replacement.
5. Do not change any file until the mapping is internally consistent.

Rules:
- Do not modify `public/videos/**` in any way.
- Do not modify Hero video behavior.
- Do not modify PromoVideos.
- Do not start an i18n migration.
- Do not start SEO refactoring.
- Do not refactor image components unless required only to make the approved local assets work.
- Do not add random replacement images.
- Do not use an image that is not in the approved asset set.
- Do not delete existing assets unless the audit proves they are unused and the task explicitly requires deletion.
- Prefer one source image per service. Featured offers should reuse the related service image when the data model permits it rather than creating duplicate assets.
- Use local asset paths once the mapping is approved.
- Keep alt text/translation work separate unless a local-image change makes an existing missing-alt issue unavoidable.

After editing:
- run the narrowest relevant checks
- run `npx tsc --noEmit`
- run `npm run lint`
- run `npm run build` if image imports/config changed
- verify that approved image paths resolve
- verify no unrelated external image URLs were changed
- verify no video files changed

Report:
1. final image-to-service mapping
2. files changed
3. old URLs removed
4. old URLs retained and why
5. videos confirmed unchanged
6. checks run and exact outcomes
7. git diff --stat

Stop. Do not start another repair step.
```
