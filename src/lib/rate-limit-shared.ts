/**
 * محدّد معدل مشترك بين نسخ الخادم (Vercel/serverless) عبر Upstash Redis / Vercel KV
 * بواجهة REST (fetch فقط — لا تبعيات جديدة).
 *
 * يُفعَّل عند وجود أحد زوجي المتغيرات (خادمية فقط):
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *   KV_REST_API_URL        + KV_REST_API_TOKEN         (تكامل Vercel KV)
 *
 * الخوارزمية: نافذة ثابتة لكل مفتاح (SET NX PX + INCR) — ذرّية على Redis فتُحتسب
 * الطلبات من كل النسخ معاً.
 *
 * عند عدم الضبط أو عند فشل Redis نرجع إلى المحدّد المحلي (rate-limit.ts)؛ أي أن
 * الحماية تتدهور إلى «لكل نسخة» ولا تُوقف النموذج. يُستخدم لنماذج التواصل فقط —
 * تسجيل دخول الإدارة يبقى على المحدّد المحلي كما هو.
 */
import { rateLimit } from "./rate-limit";

export interface SharedRateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
  /** "redis" = حدّ مشترك فعلي، "memory" = حدّ محلي لكل نسخة */
  backend: "redis" | "memory";
}

function getRedisConfig(env: NodeJS.ProcessEnv = process.env) {
  const url = (env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL || "").trim().replace(/\/+$/, "");
  const token = (env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || "").trim();
  return url && token ? { url, token } : null;
}

export async function rateLimitShared(
  key: string,
  limit: number,
  windowMs: number,
  fetchImpl: typeof fetch = fetch,
): Promise<SharedRateLimitResult> {
  const cfg = getRedisConfig();
  if (cfg) {
    const k = `rl:${key}`;
    try {
      const res = await fetchImpl(`${cfg.url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          ["SET", k, "0", "PX", String(windowMs), "NX"],
          ["INCR", k],
          ["PTTL", k],
        ]),
        signal: AbortSignal.timeout(2_000),
        cache: "no-store",
      });
      const out = (await res.json()) as Array<{ result?: unknown; error?: string }>;
      const count = Number(out?.[1]?.result);
      const pttl = Number(out?.[2]?.result);
      if (!res.ok || !Array.isArray(out) || out.some((r) => r.error) || !Number.isFinite(count)) {
        throw new Error(`redis responded ${res.status}`);
      }
      if (count > limit) {
        const ms = Number.isFinite(pttl) && pttl > 0 ? pttl : windowMs;
        return { ok: false, remaining: 0, retryAfterSeconds: Math.max(1, Math.ceil(ms / 1000)), backend: "redis" };
      }
      return { ok: true, remaining: limit - count, retryAfterSeconds: 0, backend: "redis" };
    } catch (err) {
      console.error("[rate-limit] shared store unavailable, using per-instance memory:", err instanceof Error ? err.message : err);
    }
  }
  return { ...rateLimit(key, limit, windowMs), backend: "memory" };
}
