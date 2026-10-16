import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  authenticate,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/admin-auth";
import { rateLimit, getClientIp, resetRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* حماية التخمين: 5 محاولات فاشلة لكل IP كل 15 دقيقة، ثم حجب مؤقت.
 * المحاولات الناجحة لا تُحتسب (تنظيف السلة عند الدخول الصحيح). */
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  /* ── فحص حد المعدل أولاً (قبل أي عمل مكلف) ── */
  const ip = getClientIp(request);
  const limitResult = rateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!limitResult.ok) {
    return NextResponse.json(
      {
        error: `محاولات كثيرة جداً — حاول مجدداً بعد ${Math.ceil(
          limitResult.retryAfterSeconds / 60,
        )} دقيقة`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limitResult.retryAfterSeconds),
        },
      },
    );
  }

  let email = "";
  let password = "";
  try {
    const body = (await request.json()) as { email?: unknown; password?: unknown };
    email = typeof body.email === "string" ? body.email : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  if (!process.env.DATABASE_URL || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { error: "لوحة التحكم غير مهيّأة بعد (متغيرات البيئة ناقصة)" },
      { status: 503 },
    );
  }

  try {
    const userId = await authenticate(email, password);
    if (!userId) {
      await sleep(600); // إبطاء محاولات التخمين
      return NextResponse.json(
        {
          error: `البريد أو كلمة المرور غير صحيحة (محاولات متبقية: ${limitResult.remaining})`,
        },
        { status: 401 },
      );
    }
    const response = NextResponse.json({ ok: true });
    /* نجح الدخول → تصفير عدّاد المحاولات الفاشلة لهذا الـ IP */
    resetRateLimit(`login:${ip}`);
    response.cookies.set(SESSION_COOKIE, createSessionToken(userId), sessionCookieOptions);
    return response;
  } catch {
    return NextResponse.json({ error: "تعذّر الاتصال بقاعدة البيانات" }, { status: 500 });
  }
}
