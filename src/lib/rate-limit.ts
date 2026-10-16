/**
 * محدّد المعدل في الذاكرة (Sliding Window) — حماية من هجمات التخمين
 * على تسجيل دخول لوحة التحكم.
 *
 * تصميم بسيط لخادم واحد (يناسب هذا النشر): خريطة IP → أوقات المحاولات.
 * يتجاوز الحد → تُعاد المحاولات المتبقية والوقت حتى إعادة التعيين.
 *
 * ليس بديلاً عن حل موزّع (Redis) لنشر متعدد الخوادم — لكنه كافٍ تماماً
 * لصد هجمات القاموس البطيئة الشائعة.
 */

interface RateLimitResult {
  /** هل الطلب مسموح؟ */
  ok: boolean;
  /** عدد المحاولات المتبقية ضمن النافذة (0 عند الحجب) */
  remaining: number;
  /** ثوانٍ حتى تحرير الحجب */
  retryAfterSeconds: number;
}

const buckets = new Map<string, number[]>();

/** تنظيف دوري للسلال القديمة — يمنع تسرّب الذاكرة مع مرور الوقت. */
function pruneBucket(key: string, windowMs: number, now: number) {
  const times = buckets.get(key);
  if (!times) return;
  const fresh = times.filter((t) => now - t < windowMs);
  if (fresh.length === 0) buckets.delete(key);
  else buckets.set(key, fresh);
}

/** تنظيف شامل خفيف (كل ~دقيقة عند الاستخدام المكثف) — يمنع نمو الخريطة للأبد. */
let lastSweep = 0;
function sweep(windowMs: number, now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const key of buckets.keys()) pruneBucket(key, windowMs, now);
}

export function rateLimit(
  key: string,
  /** الحد الأقصى للمحاولات داخل النافذة */
  limit = 5,
  /** طول النافذة بالمللي ثانية (افتراضي 15 دقيقة) */
  windowMs = 15 * 60 * 1000,
): RateLimitResult {
  const now = Date.now();
  sweep(windowMs, now);
  pruneBucket(key, windowMs, now);

  const times = buckets.get(key) ?? [];
  if (times.length >= limit) {
    const oldest = Math.min(...times);
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  buckets.set(key, [...times, now]);
  return { ok: true, remaining: limit - times.length - 1, retryAfterSeconds: 0 };
}

/** استخراج IP العميل من ترويسات البروكسي (خلف Caddy/CDN) أو الاتصال المباشر.
 *
 * نأخذ آخر عنصر في x-forwarded-for وليس أوله: البروكسي الموثوق (Caddy)
 * يُلحق IP العميل الحقيقي بنهاية القائمة، بينما قد يُحقن العميل قيمة
 * مزيفة في البداية لتجاوز الحد — أخذ الأخير يمنع هذا التلاعب. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return request.headers.get("x-real-ip") || "unknown";
}

/** تصفير سلة مفتاح معيّن — يُستدعى عند النجاح (تسجيل دخول صحيح)
 * حتى لا تُحتسب المحاولات الناجحة ضمن الحد. */
export function resetRateLimit(key: string) {
  buckets.delete(key);
}
