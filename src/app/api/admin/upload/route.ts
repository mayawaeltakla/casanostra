import { NextResponse } from "next/server";
import { getAdminUserId } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 4 * 1024 * 1024;

/** نوع الصورة الحقيقي من توقيع الملف (لا نثق بـ file.type القادم من المتصفح) */
function sniffMime(buf: Uint8Array): string | null {
  if (buf.length > 12 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png";
  if (
    buf.length > 12 &&
    String.fromCharCode(...buf.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...buf.subarray(8, 12)) === "WEBP"
  ) return "image/webp";
  return null;
}

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
    const bytes = new Uint8Array(await file.arrayBuffer());
    const mime = sniffMime(bytes);
    if (!mime) {
      return NextResponse.json({ error: "الملف ليس صورة JPG أو PNG أو WebP صالحة" }, { status: 400 });
    }
    const image = await db.blogImage.create({
      data: { mime, data: bytes },
      select: { id: true },
    });
    return NextResponse.json({ url: `/api/blog-images/${image.id}` });
  } catch {
    return NextResponse.json({ error: "تعذّر رفع الصورة" }, { status: 500 });
  }
}
