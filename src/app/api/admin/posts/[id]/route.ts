import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { getAdminUserId } from "@/lib/admin-auth";
import { validateArticleInput } from "@/lib/blog-admin";
import { translateForSave } from "@/lib/auto-translate";
import { db } from "@/lib/db";
import type { ArticleTranslations } from "@/lib/blog-db";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminUserId())) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }
  const { id } = await params;
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }
  const result = validateArticleInput(raw);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  try {
    const clash = await db.blogArticle.findFirst({
      where: { slug: result.data.slug, NOT: { id } },
      select: { id: true },
    });
    if (clash) {
      return NextResponse.json({ error: "هذا الرابط مستخدم لمقال آخر، اختر رابطاً مختلفاً" }, { status: 409 });
    }

    const previous = await db.blogArticle.findUnique({
      where: { id },
      select: { translations: true },
    });
    const previousTranslations = (previous?.translations ?? null) as ArticleTranslations | null;

    await db.blogArticle.update({
      where: { id },
      data: {
        ...result.data,
        /* نحفظ وسم _auto السابق كي لا يضيع إن لم تتم ترجمة جديدة */
        translations: {
          ...result.data.translations,
          ...(previousTranslations?._auto ? { _auto: previousTranslations._auto } : {}),
        } as unknown as Prisma.InputJsonValue,
      },
    });

    /* ترجمة تلقائية: للغات الفارغة، وإعادة ترجمة ما لم يُحرَّر يدوياً إن تغيّر العربي */
    let translated: string[] = [];
    let translateError: string | undefined;
    try {
      const outcome = await translateForSave(result.data.translations, previousTranslations);
      translated = outcome.translated;
      translateError = outcome.error;
      await db.blogArticle.update({
        where: { id },
        data: { translations: outcome.translations as unknown as Prisma.InputJsonValue },
      });
    } catch (error) {
      translateError = error instanceof Error ? error.message : "failed";
    }

    return NextResponse.json({ ok: true, translated, translateError });
  } catch {
    return NextResponse.json({ error: "تعذّر حفظ التعديلات" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminUserId())) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await db.blogArticle.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "تعذّر حذف المقال" }, { status: 500 });
  }
}
