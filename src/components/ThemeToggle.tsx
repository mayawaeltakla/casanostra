"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { isDarkTheme, subscribeToTheme, toggleTheme } from "@/lib/theme";

/**
 * ThemeToggle — زر تبديل الوضع الليلي/النهاري
 *
 * - بسيط بدون مكتبات خارجية (لا next-themes)
 * - يستخدم localStorage لحفظ التفضيل
 * - يضيف/يحذف class "dark" على <html>
 * - أيقونة: 🌙 في الفاتح، ☀️ في الداكن
 * - دائري w-10 h-10 متجاوب
 * - نصوص aria-label/title مترجمة
 */
export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeToTheme, isDarkTheme, () => false);
  const t = useTranslations("theme");

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
