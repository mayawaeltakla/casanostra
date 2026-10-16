import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./messages";

/**
 * إعداد التوجيه لـ next-intl v4 — توجيه ببادئة لغوية صريحة.
 *
 * كل لغة لها مسارها الخاص (/ar/... /en/... /tr/... /fr/... /ru/...)
 * ليكون الرابط قابلاً للمشاركة والفهرسة، والتنقل بين اللغات تنقل
 * عميل (client navigation) دون إعادة تحميل كاملة للصفحة.
 * كوكي `casanostra-locale` يُزامَن عبر الـ proxy للتوافق مع الإصدارات السابقة.
 */
export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
  localeCookie: {
    name: "casanostra-locale",
    sameSite: "lax",
    path: "/",
  },
});
