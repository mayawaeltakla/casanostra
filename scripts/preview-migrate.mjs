#!/usr/bin/env node
/**
 * مرحّل قاعدة البيانات على Vercel — خطوة بناء صريحة ومقيَّدة.
 *
 * (اسم الملف تاريخي: كان مخصّصاً للمعاينة فقط، وهو الآن يغطي المعاينة والإنتاج
 *  معاً، لكن بشروط منفصلة وصارمة لكل بيئة.)
 *
 * يُشغَّل `prisma migrate deploy` فقط عند تحقّق كل ما يلي:
 *   1) نحن داخل بناء Vercel        → VERCEL = "1"
 *   2) (VERCEL_ENV + الفرع) يطابقان إحدى البيئتين المسموحتين:
 *        preview    + casanostra-pg-preview-20261017   → قاعدة بيانات المعاينة
 *        production + main                             → قاعدة بيانات الإنتاج
 *   3) DATABASE_URL موجود، وهو رابط PostgreSQL صالح (postgres / postgresql)
 *      ومضيفه هو db.prisma.io أو نطاق فرعي منه — وإلا نتوقف.
 *      (هذا يحمي من الترحيل على قاعدة بيانات غير متوقعة.)
 *
 * وفي كل الحالات الأخرى لا يُطبَّق أي ترحيل إطلاقاً:
 *   - خارج Vercel (محلياً / CI آخر)                         → تخطٍّ (exit 0)
 *   - VERCEL_ENV غير معروف أو غائب                          → تخطٍّ (exit 0) + تحذير صارخ
 *   - preview لفرع آخر                                      → تخطٍّ (exit 0)
 *   - بيئة معروفة بلا اسم فرع                               → إيقاف (exit 1)
 *   - production على غير main                               → إيقاف (exit 1)
 *   - DATABASE_URL غائب / غير PostgreSQL / مضيف غير متوقع   → إيقاف (exit 1)
 *
 * ملاحظة أمان مقصودة: الإنتاج يتوقف بخطأ صريح إن لم يكن إعداد قاعدة البيانات
 * صحيحاً — فشل بناء واضح أفضل من نشر إنتاج على قاعدة غير مهيّأة. والإنتاج لا
 * يُمَس من أي فرع آخر، ولا تُمَس قاعدة الإنتاج أثناء builds المعاينة.
 *
 * لا يُستخدم إطلاقاً: prisma db push / db reset / أي SQL مدمّر.
 * لا تُطبَع أي قيمة سرّية: لا DATABASE_URL ولا مضيفه ولا أي بيانات اعتماد.
 */
import { spawnSync } from "node:child_process";

/** البيئات المسموح لها بالترحيل: قيمة VERCEL_ENV → الفرع المتوقع لها. */
const MIGRATABLE = [
  { env: "preview", branch: "casanostra-pg-preview-20261017", label: "Preview" },
  { env: "production", branch: "main", label: "Production" },
];

/** المضيف الوحيد المسموح لقاعدة البيانات (Prisma Postgres). */
const ALLOWED_DB_HOST = "db.prisma.io";

const TAG = "[db-migrate]";
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
  skip("not running on Vercel — migrations only ever run from Vercel builds");
}

/* 2) بيئة غير معروفة (custom أو غائبة): لا ترحيل، وبلا إفشال للبناء. */
const target = MIGRATABLE.find((item) => item.env === vercelEnv);
if (!target) {
  log(
    `WARNING: VERCEL_ENV='${vercelEnv || "<unset>"}' is not a migratable environment. ` +
      "No migration was applied. Ensure Vercel system environment variables are exposed to the build.",
  );
  skip(
    `environment '${vercelEnv || "<unset>"}' is not one of: ${MIGRATABLE.map((item) => item.env).join(", ")}`,
  );
}

/* 3) بيئة معروفة ⇒ لا بد من التحقق من الفرع. */
if (!branch) {
  stop(
    `VERCEL_ENV=${target.env} but VERCEL_GIT_COMMIT_REF is unavailable — cannot verify the branch, so no migration was run. ` +
      "Enable system environment variables for the project, then redeploy.",
  );
}

/* 4) فرع غير مطابق:
 *    - المعاينة: تخطٍّ (بقية فروع المعاينة تُبنى بلا أي ترحيل).
 *    - الإنتاج: توقف صريح (إنتاج بلا قاعدة مهيّأة أسوأ من فشل بناء واضح). */
if (branch !== target.branch) {
  if (target.env === "production") {
    stop(
      `VERCEL_ENV=production requires branch '${target.branch}' but this build is from '${branch}' — refusing to migrate production.`,
    );
  }
  skip(`branch '${branch}' is not the target branch '${target.branch}'`);
}

/* 5) التحقق من سلسلة الاتصال — بلا طباعة أي قيمة سرّية. */
const rawUrl = process.env.DATABASE_URL;
if (!rawUrl) {
  stop(`DATABASE_URL is not set in the ${target.label} environment — refusing to migrate.`);
}

let parsedUrl = null;
try {
  parsedUrl = new URL(rawUrl);
} catch {
  stop("DATABASE_URL is not a valid URL — refusing to migrate.");
}
if (!parsedUrl) {
  stop("DATABASE_URL could not be parsed — refusing to migrate.");
}

const scheme = parsedUrl.protocol.replace(/:$/, "");
if (scheme !== "postgres" && scheme !== "postgresql") {
  stop(`DATABASE_URL scheme is '${scheme}', not postgres/postgresql — refusing to migrate.`);
}

const host = parsedUrl.hostname.toLowerCase();
if (host !== ALLOWED_DB_HOST && !host.endsWith(`.${ALLOWED_DB_HOST}`)) {
  stop(
    `DATABASE_URL does not point at '${ALLOWED_DB_HOST}' — refusing to migrate (this guards against the wrong database).`,
  );
}

/* 6) كل الشروط تحققت: طبّق الترحيلات المعلّقة فقط (غير مدمّر). */
log(
  `verified ${target.label} environment (env=${target.env}, branch=${branch}, db host=${ALLOWED_DB_HOST}) — running: prisma migrate deploy`,
);
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
