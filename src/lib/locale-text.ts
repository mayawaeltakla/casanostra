/**
 * locale-text.ts — helper للنصوص ثلاثية اللغة (عربي/إنجليزي/تركي)
 *
 * بدلاً من isRTL ? "عربي" : "إنجليزي"، نستخدم:
 * lt(locale, { ar: "عربي", en: "English", tr: "Türkçe" })
 *
 * التركية LTR مثل الإنجليزية، فالاتجاه لا يتأثر.
 */

export type Locale = "ar" | "en" | "tr" | "fr" | "ru";

interface LocaleTexts {
  ar: string;
  en: string;
  tr: string;
  fr: string;
  ru: string;
}

/** إرجاع النص المناسب للّغة الحالية */
export function lt(locale: string, texts: LocaleTexts): string {
  const l = locale as Locale;
  return texts[l] || texts.en;
}

/** هل اللغة الحالية عربية (RTL)؟ */
export function isRtl(locale: string): boolean {
  return locale === "ar";
}
