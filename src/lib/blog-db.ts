import { db } from "@/lib/db";
import { parseArticleBody } from "@/lib/blog-body";
import type { BlogBlock } from "@/lib/blog";
import { locales, type Locale } from "@/i18n/messages";

/* ============================================================================
 *  مقالات المدوّنة المخزّنة في قاعدة البيانات (تُنشأ من لوحة /admin)
 *  إن لم تكن القاعدة مهيّأة أو فشل الاتصال، تُعاد قوائم فارغة ويستمر الموقع
 *  بعرض المقالات الثابتة فقط.
 * ============================================================================ */

export const TRANSLATION_FIELDS = ["title", "excerpt", "category", "author", "body"] as const;
export type TranslationField = (typeof TRANSLATION_FIELDS)[number];
export type ArticleFields = Record<TranslationField, string>;
export type ArticleTranslations = Partial<Record<Locale, Partial<ArticleFields>>> & {
  /** وسم داخلي: لغات مُترجمة آلياً → بصمة النص العربي وقت الترجمة (لإعادة الترجمة عند تعديل العربي) */
  _auto?: Partial<Record<Locale, string>>;
};

/** مقال جاهز للعرض بلغة واحدة (قابل للتمرير من Server إلى Client Component). */
export interface DbPostView {
  slug: string;
  coverImage: string;
  publishedAt: string; // YYYY-MM-DD
  readMinutes: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  blocks: BlogBlock[];
  /** هل توجد ترجمة فعلية بهذه اللغة (وإلا فالنص عربي احتياطي) */
  translated: boolean;
}

function pickField(
  translations: ArticleTranslations,
  locale: Locale,
  field: TranslationField,
): string {
  return (
    translations[locale]?.[field]?.trim() ||
    translations.ar?.[field]?.trim() ||
    ""
  );
}

function toView(
  row: {
    slug: string;
    coverImage: string;
    publishedAt: Date;
    readMinutes: number;
    translations: unknown;
  },
  locale: Locale,
): DbPostView {
  const translations = (row.translations ?? {}) as ArticleTranslations;
  return {
    slug: row.slug,
    coverImage: row.coverImage,
    publishedAt: row.publishedAt.toISOString().slice(0, 10),
    readMinutes: row.readMinutes,
    title: pickField(translations, locale, "title"),
    excerpt: pickField(translations, locale, "excerpt"),
    category: pickField(translations, locale, "category"),
    author: pickField(translations, locale, "author") || "CASANOSTRA",
    blocks: parseArticleBody(pickField(translations, locale, "body")),
    translated: locale === "ar" || Boolean(translations[locale]?.title?.trim() && translations[locale]?.body?.trim()),
  };
}

export async function getDbPosts(locale: string): Promise<DbPostView[]> {
  if (!process.env.DATABASE_URL) return [];
  const safeLocale = (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : "ar";
  try {
    const rows = await db.blogArticle.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    return rows.map((row) => toView(row, safeLocale));
  } catch {
    return [];
  }
}

export async function getDbPostBySlug(
  slug: string,
  locale: string,
): Promise<DbPostView | null> {
  if (!process.env.DATABASE_URL) return null;
  const safeLocale = (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : "ar";
  try {
    const row = await db.blogArticle.findFirst({ where: { slug, published: true } });
    return row ? toView(row, safeLocale) : null;
  } catch {
    return null;
  }
}
