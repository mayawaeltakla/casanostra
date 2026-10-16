import { NextResponse } from "next/server";
import { getAdminUserId } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await getAdminUserId())) {
    return NextResponse.json({ error: "غير مصرّح" }, { status: 401 });
  }
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "لم يتم اختيار ملف" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "الصيغ المسموحة: JPG وPNG وWebP" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "حجم الصورة أكبر من 4 ميغابايت" }, { status: 400 });
    }
    const image = await db.blogImage.create({
      data: { mime: file.type, data: new Uint8Array(await file.arrayBuffer()) },
      select: { id: true },
    });
    return NextResponse.json({ url: `/api/blog-images/${image.id}` });
  } catch {
    return NextResponse.json({ error: "تعذّر رفع الصورة" }, { status: 500 });
  }
}
