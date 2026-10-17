#!/usr/bin/env node
/**
 * ترحيل قاعدة بيانات المعاينة (Preview) على Vercel — خطوة بناء صريحة ومقيَّدة.
 *
 * يُشغَّل `prisma migrate deploy` فقط عند التحقق الإيجابي من الشروط الثلاثة:
 *   1) نحن داخل بناء Vercel            → VERCEL = "1"
 *   2) البيئة هي preview                → VERCEL_ENV = "preview"
 *   3) الفرع هو فرع المعاينة المستهدف   → VERCEL_GIT_COMMIT_REF = TARGET_BRANCH
 *
 * سلوك كل الحالات الأخرى (لا يُطبَّق أي ترحيل أبداً):
 *   - خارج Vercel (محلياً / CI آخر)          → تخطٍّ (exit 0)
 *   - VERCEL_ENV = "production"              → تخطٍّ (exit 0) — الإنتاج لا يُمَس
 *   - VERCEL_ENV = "preview" لفرع آخر        → تخطٍّ (exit 0)
 *   - VERCEL_ENV غائب/غير متوقع             → تخطٍّ (exit 0) + تحذير صارخ
 *     (لا نُفشل البناء هنا لأننا لا نستطيع استبعاد أنه إنتاج)
 *   - VERCEL_ENV = "preview" بلا اسم فرع     → إيقاف بخطأ (exit 1)
 *
 * لا يُستخدم إطلاقاً: prisma db push / db reset / أي SQL مباشر أو أمر مدمّر.
 * لا تُطبَع أي قيمة سرّية (لا DATABASE_URL ولا أي بيانات اعتماد).
 */
import { spawnSync } from "node:child_process";

/** الفرع الوحيد المسموح له بترحيل قاعدة بيانات المعاينة. */
const TARGET_BRANCH = "casanostra-pg-preview-20261017";
/** البيئة الوحيدة المسموح لها بالترحيل. */
const TARGET_ENV = "preview";

const TAG = "[preview-migrate]";
const log = (msg) => console.log(`${TAG} ${msg}`);
const skip = (msg) => {
  log(`SKIP — ${msg}`);
  process.exit(0);
};
const stop = (msg) => {
  console.error(`${TAG} STOP — ${msg}`);
  process.exit(1);
};

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";
const vercelEnv = process.env.VERCEL_ENV ?? "";
const branch = process.env.VERCEL_GIT_COMMIT_REF ?? "";

/* 1) خارج Vercel: لا ترحيل إطلاقاً (تشغيل محلي أو CI آخر). */
if (!isVercel) {
  skip("not running on Vercel — migrations only ever run from Vercel Preview builds");
}

/* 2) الإنتاج محظور دائماً — يُفحَص أولاً حتى لو غاب اسم الفرع. */
if (vercelEnv === "production") {
  skip("VERCEL_ENV=production — this script never migrates production");
}

/* 3) بيئة غير قابلة للتحقق: لا ترحيل. لا نُفشل البناء (قد يكون إنتاجاً بلا VERCEL_ENV). */
if (vercelEnv !== TARGET_ENV) {
  log(
    `WARNING: VERCEL_ENV='${vercelEnv || "<unset>"}' cannot be verified as '${TARGET_ENV}'. ` +
      "No migration was applied. Ensure Vercel system environment variables are exposed to the build.",
  );
  skip(`unverifiable environment (VERCEL_ENV='${vercelEnv || "<unset>"}')`);
}

/* 4) نحن في preview بلا شك: يجب التحقق من الفرع، وإلا نتوقف بخطأ صريح. */
if (!branch) {
  stop(
    "VERCEL_ENV=preview but VERCEL_GIT_COMMIT_REF is unavailable — cannot verify the branch, so no migration was run. " +
      "Enable system environment variables for the project, then redeploy.",
  );
}

/* 5) preview لكن لفرع آخر: لا ترحيل (حماية بقية فروع المعاينة). */
if (branch !== TARGET_BRANCH) {
  skip(`branch '${branch}' is not the target branch '${TARGET_BRANCH}'`);
}

/* 6) التحقق من وجود سلسلة الاتصال (بدون طباعة قيمتها). */
if (!process.env.DATABASE_URL) {
  stop("DATABASE_URL is not set for this Preview environment — refusing to migrate");
}

/* 7) كل الشروط تحققت: طبّق الترحيلات المعلّقة فقط (غير مدمّر). */
log(`verified environment (env=${vercelEnv}, branch=${branch}) — running: prisma migrate deploy`);
const result = spawnSync("npx prisma migrate deploy", {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

if (result.error) {
  stop(`could not start prisma CLI: ${result.error.message}`);
}
if (result.status !== 0) {
  stop(`prisma migrate deploy failed with exit code ${result.status}`);
}

log("migration step completed successfully");
