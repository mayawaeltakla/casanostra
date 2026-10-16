import { locales, type Locale } from "@/i18n/messages";
import type { ArticleFields, ArticleTranslations } from "@/lib/blog-db";

/* ============================================================================
 *  الترجمة التلقائية لمقالات المدوّنة — عربية → إنجليزية/تركية/فرنسية/روسية
 *
 *  تعمل على الخادم فقط (z-ai-web-dev-sdk) وتُستدعى من مسارات
 *  /api/admin/posts بعد حفظ المقال: تترجم الحقول الناقصة لكل لغة
 *  من النص العربي الأصلي ثم تُحدَّث القاعدة.
 *
 *  الترجمة تتم لغةً بعد لغة (لا بالتوازي) مع إعادة محاولة تدريجية
 *  لتجنّب تقييد معدل الطلبات (429).
 * ============================================================================ */

/** اللغات الهدف للترجمة التلقائية (كل ما عدا العربية) */
const TARGET_LOCALES: Locale[] = locales.filter((l) => l !== "ar") as Locale[];

const LANGUAGE_NAMES: Record<Locale, string> = {
  ar: "Arabic",
  en: "English",
  tr: "Turkish",
  fr: "French",
  ru: "Russian",
};

interface TranslatedFields {
  title?: string;
  excerpt?: string;
  category?: string;
  author?: string;
  body?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** عدد محاولات الترجمة لكل لغة قبل الاستسلام */
const MAX_ATTEMPTS = 3;

/** يستخرج كائن JSON من ردّ النموذج (يتعامل مع أسوار الكود ```json) */
function extractJson(text: string): TranslatedFields | null {
  const cleaned = text
    .replace(/^\s*```(?:json)?/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as TranslatedFields;
  } catch {
    return null;
  }
}

function buildPrompt(locale: Locale, ar: ArticleFields): string {
  return `You are a professional tourism-travel translator for a luxury Turkish travel agency (CASANOSTRA).
Translate the following blog article fields from Arabic into ${LANGUAGE_NAMES[locale]}.

Rules:
- Keep the meaning, tone and marketing style of a luxury travel agency.
- "category" is a short label (e.g. "Travel Tips") — translate briefly.
- "author" is a name/team title — translate naturally (e.g. "فريق CASANOSTRA" → "CASANOSTRA Team" for English).
- "body" uses a simple format: paragraphs separated by a blank line, lines starting with "## " are subheadings, lines starting with "- " are list items, and the line right before list items is the list title. PRESERVE this exact format and line breaks in the translation.
- Do not add commentary, notes or markdown code fences.

Return ONLY a valid JSON object with exactly these keys:
{"title": "...", "excerpt": "...", "category": "...", "author": "...", "body": "..."}

Arabic source:
${JSON.stringify(
  {
    title: ar.title,
    excerpt: ar.excerpt,
    category: ar.category,
    author: ar.author,
    body: ar.body,
  },
  null,
  1,
)}`;
}

/** محاولة ترجمة واحدة إلى لغة معينة */
async function translateOnce(
  zai: Awaited<ReturnType<typeof import("z-ai-web-dev-sdk").default.create>>,
  locale: Locale,
  ar: ArticleFields,
): Promise<TranslatedFields | null> {
  const response = await zai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: buildPrompt(locale, ar),
      },
    ],
    thinking: { type: "disabled" },
  });

  const content = response.choices?.[0]?.message?.content ?? "";
  const parsed = extractJson(content);
  if (!parsed) return null;

  /* تنظيف: قبول القيم النصية غير الفارغة فقط */
  const result: TranslatedFields = {};
  for (const key of ["title", "excerpt", "category", "author", "body"] as const) {
    const value = parsed[key];
    if (typeof value === "string" && value.trim()) {
      result[key] = value.trim();
    }
  }
  return result.title && result.body ? result : null;
}

/** يترجم حقول المقال العربية إلى لغة واحدة عبر LLM مع إعادة محاولة تدريجية */
async function translateToLocale(
  locale: Locale,
  ar: ArticleFields,
): Promise<TranslatedFields | null> {
  const { default: ZAI } = await import("z-ai-web-dev-sdk");
  const zai = await ZAI.create();

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await translateOnce(zai, locale, ar);
    } catch {
      if (attempt === MAX_ATTEMPTS) break;
      /* انتظار تدريجي قبل المحاولة التالية (يغلب عليه تفادي 429) */
      await sleep(attempt * 8000);
    }
  }
  return null;
}

/**
 * يترجم المقال العربي إلى اللغات الأربع الأخرى (بالتتابع) ويعيد
 * الترجمات الناجحة فقط. اللغات التي تفشل تُتجاهل — يمكن إعادة المحاولة
 * بحفظ المقال مجدداً.
 */
export async function autoTranslateArticle(
  ar: ArticleFields,
): Promise<ArticleTranslations> {
  const translations: ArticleTranslations = { ar };

  for (const locale of TARGET_LOCALES) {
    try {
      const fields = await translateToLocale(locale, ar);
      if (fields) {
        translations[locale] = fields;
      }
    } catch {
      /* فشل لغة لا يوقف البقية */
    }
    /* فاصل قصير بين اللغات لتفادي تقييد المعدل */
    await sleep(1500);
  }
  return translations;
}

/** أسماء اللغات المترجمة (لعرضها في رسالة النجاح) */
export const TRANSLATED_LOCALE_LABELS: Record<string, string> = {
  en: "English",
  tr: "Türkçe",
  fr: "Français",
  ru: "Русский",
};
