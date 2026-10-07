import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./messages";

/**
 * إعداد التوجيه لـ next-intl v4.
 *
 * يحدد اللغات المدعومة واللغة الافتراضية.
 * لا نستخدم localePrefix: "always" لتجنّب الحاجة إلى [locale] segment.
 */
export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: "as-needed",
});
