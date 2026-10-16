import { NextResponse } from "next/server";
import { getAdminUserId } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** يُستخدم لإظهار زر «إضافة مقال» في صفحة المدوّنة للمدير فقط. */
export async function GET() {
  const userId = await getAdminUserId();
  return NextResponse.json({ admin: Boolean(userId) }, {
    status: userId ? 200 : 401,
    headers: { "Cache-Control": "no-store" },
  });
}
