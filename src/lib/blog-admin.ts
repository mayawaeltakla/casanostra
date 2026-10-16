import { blogPosts } from "@/lib/blog";
import { locales, type Locale } from "@/i18n/messages";
import {
  TRANSLATION_FIELDS,
  type ArticleTranslations,
} from "@/lib/blog-db";

/** مدخلات إنشاء/تعديل مقال بعد التحقق والتنظيف. */
export interface ArticleInput {
  slug: string;
  published: boolean;
  publishedAt: Date;
  readMinutes: number;
  coverImage: string;
  translations: ArticleTranslations;
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_LEN: Record<string, number> = {
  title: 200,
  excerpt: 600,
  category: 60,
  author: 80,
  body: 60000,
};

export const STATIC_SLUGS = new Set(blogPosts.map((post) => post.slug));

export function validateArticleInput(
  raw: unknown,
): { ok: true; data: ArticleInput } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "بيانات غير صالحة" };
  const input = raw as Record<string, unknown>;

  const slug = typeof input.slug === "string" ? input.slug.trim().toLowerCase() : "";
  if (!SLUG_RE.test(slug) || slug.length > 80) {
    return { ok: false, error: "الرابط (slug) يجب أن يكون بالإنجليزية وبحروف صغيرة وأرقام وشرطات فقط، مثل: antalya-beaches" };
  }
  if (STATIC_SLUGS.has(slug)) {
    return { ok: false, error: "هذا الرابط مستخدم لمقال آخر، اختر رابطاً مختلفاً" };
  }

  const dateText = typeof input.publishedAt === "string" ? input.publishedAt : "";
  const publishedAt = new Date(`${dateText}T00:00:00.000Z`);
  if (!DATE_RE.test(dateText) || Number.isNaN(publishedAt.getTime())) {
    return { ok: false, error: "تاريخ النشر غير صالح" };
  }

  const readMinutes = Number(input.readMinutes);
  if (!Number.isInteger(readMinutes) || readMinutes < 1 || readMinutes > 120) {
    return { ok: false, error: "مدة القراءة يجب أن تكون رقماً بين 1 و120 دقيقة" };
  }

  const coverImage = typeof input.coverImage === "string" ? input.coverImage.trim() : "";
  const validCover =
    coverImage.startsWith("/api/blog-images/") ||
    coverImage.startsWith("/images/") ||
    /^https:\/\/\S+$/.test(coverImage);
  if (!validCover || coverImage.length > 500) {
    return { ok: false, error: "صورة الغلاف مطلوبة (ارفع صورة)" };
  }

  const translations: ArticleTranslations = {};
  const rawTranslations =
    input.translations && typeof input.translations === "object"
      ? (input.translations as Record<string, unknown>)
      : {};
  for (const locale of locales as readonly Locale[]) {
    const rawLocale = rawTranslations[locale];
    if (!rawLocale || typeof rawLocale !== "object") continue;
    const entry: Record<string, string> = {};
    for (const field of TRANSLATION_FIELDS) {
      const value = (rawLocale as Record<string, unknown>)[field];
      if (typeof value === "string" && value.trim()) {
        if (value.length > MAX_LEN[field]) {
          return { ok: false, error: `الحقل ${field} (${locale}) أطول من المسموح` };
        }
        entry[field] = value.trim();
      }
    }
    if (Object.keys(entry).length > 0) translations[locale] = entry;
  }

  const ar = translations.ar;
  if (!ar?.title || !ar.excerpt || !ar.category || !ar.body) {
    return { ok: false, error: "النسخة العربية كاملة مطلوبة: العنوان والملخص والتصنيف والنص" };
  }

  return {
    ok: true,
    data: {
      slug,
      published: input.published !== false,
      publishedAt,
      readMinutes,
      coverImage,
      translations,
    },
  };
}
