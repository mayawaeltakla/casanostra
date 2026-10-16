"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { isDarkTheme, subscribeToTheme, toggleTheme } from "@/lib/theme";

/* مزامنة قبل الرسم على العميل فقط (بلا تحذير SSR) */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * ThemeToggle — زر تبديل الوضع الليلي/النهاري
 *
 * - بسيط بدون مكتبات خارجية (لا next-themes)
 * - يستخدم localStorage لحفظ التفضيل
 * - يضيف/يحذف class "dark" على <html>
 * - أيقونة: 🌙 في الفاتح، ☀️ في الداكن
 * - دائري w-10 h-10 متجاوب
 * - نصوص aria-label/title مترجمة
 * - يعيد تطبيق الثيم المحفوظ عند التركيب/تبدل اللغة: التنقل العميل
 *   بين اللغات يعيد React رسم <html> (تتغير lang/dir) فيمسح class "dark"
 *   المضاف imperative — هذه المزامنة (قبل الرسم، بلا وميض) تعيده.
 */
export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeToTheme, isDarkTheme, () => false);
  const t = useTranslations("theme");
  const locale = useLocale();

  useIsomorphicLayoutEffect(() => {
    try {
      document.documentElement.classList.toggle(
        "dark",
        localStorage.getItem("theme") === "dark",
      );
    } catch {
      /* وضع خاص/تخزين محظور — أبقِ الوضع الحالي */
    }
  }, [locale]);

  return (
    <button
      onClick={toggleTheme}
      aria-label={t("toggle")}
      title={dark ? t("darkMode") : t("lightMode")}
      className="w-10 h-10 rounded-full flex items-center justify-center text-xl
                 bg-white dark:bg-slate-800
                 border border-gray-300 dark:border-slate-600
                 shadow-sm hover:scale-110 transition-transform cursor-pointer flex-shrink-0"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
