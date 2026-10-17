import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { getAdminUserId } from "@/lib/admin-auth";
import { validateArticleInput } from "@/lib/blog-admin";
import { translateForSave } from "@/lib/auto-translate";
import { db } from "@/lib/db";

export const runtime = "nodejs";
/** الترجمة تتم بعد الحفظ داخل نفس الطلب — نمنحه وقتاً كافياً على الاستضافات ذات الحد الزمني */
export const maxDuration = 60;

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
    let translateError: string | undefined;
    try {
      const outcome = await translateForSave(result.data.translations, null);
      translated = outcome.translated;
      translateError = outcome.error;
      if (outcome.translated.length > 0) {
        await db.blogArticle.update({
          where: { id: created.id },
          data: { translations: outcome.translations as unknown as Prisma.InputJsonValue },
        });
      }
    } catch (error) {
      /* فشل الترجمة لا يفشل الحفظ — لكن يُعاد السبب للمدير */
      translateError = error instanceof Error ? error.message : "failed";
    }

    return NextResponse.json({ id: created.id, translated, translateError });
  } catch {
    return NextResponse.json({ error: "تعذّر حفظ المقال" }, { status: 500 });
  }
}
