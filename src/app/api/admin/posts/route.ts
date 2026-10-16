import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { getAdminUserId } from "@/lib/admin-auth";
import { validateArticleInput } from "@/lib/blog-admin";
import { autoTranslateArticle } from "@/lib/auto-translate";
import { db } from "@/lib/db";
import { locales, type Locale } from "@/i18n/messages";
import type { ArticleFields, ArticleTranslations } from "@/lib/blog-db";

export const runtime = "nodejs";

/**
 * يدمج الترجمة التلقائية مع أي إدخال يدوي: القيم اليدوية غير الفارغة
 * تتفوق على المترجمة آلياً، والتلقائية تملأ الفراغات فقط.
 */
function mergeAutoTranslations(
  manual: ArticleTranslations,
  auto: ArticleTranslations,
): { merged: ArticleTranslations; translatedLocales: Locale[] } {
  const merged: ArticleTranslations = { ...manual };
  const translatedLocales: Locale[] = [];

  for (const locale of locales) {
    if (locale === "ar") continue;
    const autoFields = auto[locale] as Partial<ArticleFields> | undefined;
    if (!autoFields) continue;

    const manualFields = (manual[locale] ?? {}) as Partial<ArticleFields>;
    const combined: Partial<ArticleFields> = { ...autoFields };
    for (const [key, value] of Object.entries(manualFields)) {
      if (typeof value === "string" && value.trim()) {
        (combined as Record<string, string>)[key] = value;
      }
    }
    merged[locale] = combined;
    translatedLocales.push(locale);
  }
  return { merged, translatedLocales };
}

export async function POST(request: Request) {
  if (!(await getAdminUserId())) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }
  const result = validateArticleInput(raw);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  try {
    const exists = await db.blogArticle.findUnique({
      where: { slug: result.data.slug },
      select: { id: true },
    });
    if (exists) {
      return NextResponse.json({ error: "هذا الرابط مستخدم لمقال آخر، اختر رابطاً مختلفاً" }, { status: 409 });
    }
    const created = await db.blogArticle.create({
      data: { ...result.data, translations: result.data.translations as unknown as Prisma.InputJsonValue },
      select: { id: true },
    });

    /* ترجمة تلقائية: عربي → إنجليزي/تركي/فرنسي/روسي (تملأ الفراغات فقط) */
    let translated: string[] = [];
    try {
      const ar = result.data.translations.ar;
      if (ar?.title && ar?.excerpt && ar?.category && ar?.body) {
        const auto = await autoTranslateArticle({
          title: ar.title,
          excerpt: ar.excerpt,
          category: ar.category,
          author: ar.author ?? "CASANOSTRA",
          body: ar.body,
        });
        const { merged, translatedLocales } = mergeAutoTranslations(
          result.data.translations,
          auto,
        );
        translated = translatedLocales;
        await db.blogArticle.update({
          where: { id: created.id },
          data: { translations: merged as unknown as Prisma.InputJsonValue },
        });
      }
    } catch {
      /* فشل الترجمة لا يفشل الحفظ — تُعاد المحاولة عند الحفظ التالي */
    }

    return NextResponse.json({ id: created.id, translated });
  } catch {
    return NextResponse.json({ error: "تعذّر حفظ المقال" }, { status: 500 });
  }
}
