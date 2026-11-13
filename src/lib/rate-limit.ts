/**
 * محدّد المعدل في الذاكرة (Sliding Window) — حماية من هجمات التخمين
 * على تسجيل دخول لوحة التحكم.
 *
 * تصميم بسيط لخادم واحد (يناسب هذا النشر): خريطة IP → أوقات المحاولات.
 * يتجاوز الحد → تُعاد المحاولات المتبقية والوقت حتى إعادة التعيين.
 *
 * ليس بديلاً عن حل موزّع (Redis) لنشر متعدد النسخ (مثل Vercel، حيث لكل
 * نسخة serverless ذاكرتها الخاصة). نماذج التواصل تستعمل `rate-limit-shared.ts`
 * (Upstash/Vercel KV)؛ أما تسجيل دخول الإدارة فيبقى على هذا الملف دون تغيير.
 */

interface RateLimitResult {
  /** هل الطلب مسموح؟ */
  ok: boolean;
  /** عدد المحاولات المتبقية ضمن النافذة (0 عند الحجب) */
  remaining: number;
  /** ثوانٍ حتى تحرير الحجب */
  retryAfterSeconds: number;
}

interface Bucket {
  times: number[];
  /** نافذة هذا المفتاح نفسه — كل مفتاح يُنظَّف بنافذته هو لا بنافذة آخر طلب. */
  windowMs: number;
}

const buckets = new Map<string, Bucket>();

/** تنظيف سلة واحدة بنافذتها الخاصة. */
function pruneBucket(key: string, now: number) {
  const bucket = buckets.get(key);
  if (!bucket) return;
  const fresh = bucket.times.filter((t) => now - t < bucket.windowMs);
  if (fresh.length === 0) buckets.delete(key);
  else buckets.set(key, { times: fresh, windowMs: bucket.windowMs });
}

/** تنظيف شامل خفيف (كل ~دقيقة) — يمنع نمو الخريطة للأبد.
 * لكل سلة نافذتها المخزَّنة، فلا يحذف تنظيفٌ مرّ عبر حدّ 10 دقائق
 * سجلات حدّ الساعة أو اليوم. */
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const key of [...buckets.keys()]) pruneBucket(key, now);
}

export function rateLimit(
  key: string,
  /** الحد الأقصى للمحاولات داخل النافذة */
  limit = 5,
  /** طول النافذة بالمللي ثانية (افتراضي 15 دقيقة) */
  windowMs = 15 * 60 * 1000,
): RateLimitResult {
  const now = Date.now();
  sweep(now);
  // نسجّل نافذة هذا المفتاح قبل التقليم حتى يُقلَّم بنافذته الصحيحة.
  const existing = buckets.get(key);
  if (existing) existing.windowMs = windowMs;
  pruneBucket(key, now);

  const times = buckets.get(key)?.times ?? [];
  if (times.length >= limit) {
    const oldest = Math.min(...times);
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  buckets.set(key, { times: [...times, now], windowMs });
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

/** لاختبارات الوحدة فقط. */
export function __clearRateLimitForTests() {
  buckets.clear();
}
