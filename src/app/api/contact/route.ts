import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getClientIp } from "@/lib/rate-limit";
import { rateLimitShared } from "@/lib/rate-limit-shared";
import { sendContactEmail, validateContactInput } from "@/lib/contact-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_MS = 2_000; // أسرع من هذا = غالباً روبوت
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

type ErrorCode = "invalid" | "rate_limited" | "too_fast" | "forbidden" | "send_failed";

function fail(code: ErrorCode, status: number, extra: Record<string, unknown> = {}, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, error: code, ...extra }, { status, headers });
}

/** يتحقق أن الطلب قادم من موقعنا (Origin يطابق المضيف) — حماية أساسية من الإساءة عبر مواقع أخرى. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // طلبات غير المتصفح تمر؛ يحدّها المعدل والتحقق
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return !!host && new URL(origin).host === host.split(",")[0].trim();
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return fail("forbidden", 403);

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return fail("invalid", 413);

  // حد المعدل لكل IP: 5 رسائل / 10 دقائق، و20 / يوم
  const ip = getClientIp(request);
  const short = await rateLimitShared(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!short.ok) return fail("rate_limited", 429, { retryAfter: short.retryAfterSeconds }, { "Retry-After": String(short.retryAfterSeconds) });
  const daily = await rateLimitShared(`contact-day:${ip}`, 20, 24 * 60 * 60 * 1000);
  if (!daily.ok) return fail("rate_limited", 429, { retryAfter: daily.retryAfterSeconds }, { "Retry-After": String(daily.retryAfterSeconds) });

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return fail("invalid", 413);
    raw = JSON.parse(text);
  } catch {
    return fail("invalid", 400);
  }
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  // Honeypot: حقل مخفي لا يملؤه إلا الروبوتات. نردّ بنجاح صامت دون إرسال أي بريد.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // حد أدنى لزمن تعبئة النموذج
  const startedAt = Number(body.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_AGE_MS) {
    return fail("too_fast", 400);
  }

  const result = validateContactInput(body);
  if (!result.ok) return fail("invalid", 400, { fields: result.fields });

  // حد إضافي لكل بريد مرسِل (يمنع إغراق صندوق شخص واحد/استهداف نفس العنوان)
  if (result.data.email) {
    // نخزّن بصمة البريد لا البريد نفسه في المخزن المشترك.
    const emailKey = createHash("sha256").update(result.data.email.toLowerCase()).digest("hex").slice(0, 32);
    const perEmail = await rateLimitShared(`contact-email:${emailKey}`, 3, 60 * 60 * 1000);
    if (!perEmail.ok) return fail("rate_limited", 429, { retryAfter: perEmail.retryAfterSeconds }, { "Retry-After": String(perEmail.retryAfterSeconds) });
  }

  const sent = await sendContactEmail(result.data);
  if (!sent.ok) return fail("send_failed", 502);

  return NextResponse.json({ ok: true });
}
