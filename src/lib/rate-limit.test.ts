/**
 * اختبارات محدّد المعدل — تعمل بدون تبعيات:
 *   npm run test:rate-limit
 * (node --experimental-strip-types --test)
 */
import { test, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";
import { rateLimit, __clearRateLimitForTests } from "./rate-limit";
import { rateLimitShared } from "./rate-limit-shared";

const MIN = 60 * 1000;
const TEN_MIN = 10 * MIN;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

beforeEach(() => {
  __clearRateLimitForTests();
  mock.timers.reset();
  mock.timers.enable({ apis: ["Date"], now: 1_700_000_000_000 });
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
});

test("sweep باستدعاء نافذة 10 دقائق لا يحذف سجلات حدّ الساعة", () => {
  assert.equal(rateLimit("email:a", 3, HOUR).ok, true);
  assert.equal(rateLimit("email:a", 3, HOUR).ok, true);
  assert.equal(rateLimit("email:a", 3, HOUR).ok, true);
  assert.equal(rateLimit("email:a", 3, HOUR).ok, false);

  // بعد 30 دقيقة: طلب بنافذة 10 دقائق يُطلق sweep (مرّت أكثر من دقيقة)
  mock.timers.tick(30 * MIN);
  assert.equal(rateLimit("ip:short", 5, TEN_MIN).ok, true);

  // سجلات الساعة (عمرها 30 د) يجب أن تبقى → ما زال محجوباً
  assert.equal(rateLimit("email:a", 3, HOUR).ok, false);
});

test("sweep باستدعاء نافذة 10 دقائق لا يحذف سجلات حدّ اليوم", () => {
  for (let i = 0; i < 2; i++) assert.equal(rateLimit("ip:day", 2, DAY).ok, true);
  assert.equal(rateLimit("ip:day", 2, DAY).ok, false);

  mock.timers.tick(5 * HOUR);
  assert.equal(rateLimit("ip:short", 5, TEN_MIN).ok, true); // يطلق sweep
  assert.equal(rateLimit("ip:day", 2, DAY).ok, false);
});

test("حدود 10 دقائق والساعة واليوم مستقلة ولا تتداخل", () => {
  const hit = () => ({
    short: rateLimit("c:ip", 5, TEN_MIN),
    hour: rateLimit("c:email", 3, HOUR),
    day: rateLimit("c:day", 8, DAY),
  });

  // 3 طلبات: يبلغ حدّ الساعة (3) دون أن يتأثر حدّا 10 دقائق واليوم
  for (let i = 0; i < 3; i++) {
    const r = hit();
    assert.ok(r.short.ok && r.hour.ok && r.day.ok);
  }
  assert.equal(rateLimit("c:email", 3, HOUR).ok, false, "حدّ الساعة بلغ");
  assert.equal(rateLimit("c:ip", 5, TEN_MIN).ok, true, "حدّ 10 د لم يبلغ بعد");

  // بعد 11 دقيقة: نافذة 10 د تتحرّر، والساعة ما زالت محجوبة
  mock.timers.tick(11 * MIN);
  assert.equal(rateLimit("c:ip", 5, TEN_MIN).ok, true, "نافذة 10 د تحرّرت");
  assert.equal(rateLimit("c:email", 3, HOUR).ok, false, "الساعة ما زالت محجوبة");

  // بعد ساعة+: الساعة تتحرّر، واليوم يبقى يعدّ
  mock.timers.tick(HOUR);
  assert.equal(rateLimit("c:email", 3, HOUR).ok, true, "نافذة الساعة تحرّرت");
  for (let i = 0; i < 5; i++) rateLimit("c:day", 8, DAY); // الإجمالي 3+5=8 → يبلغ الحد
  assert.equal(rateLimit("c:day", 8, DAY).ok, false, "حدّ اليوم ما زال يحتسب كل الطلبات");

  // بعد يوم: كله يتحرّر
  mock.timers.tick(DAY);
  assert.equal(rateLimit("c:day", 8, DAY).ok, true);
});

test("retryAfter يعكس نافذة المفتاح نفسه", () => {
  for (let i = 0; i < 3; i++) rateLimit("k:hour", 3, HOUR);
  const r = rateLimit("k:hour", 3, HOUR);
  assert.equal(r.ok, false);
  assert.equal(r.retryAfterSeconds, 3600);
});

test("المخزن المشترك: يحسب عبر Redis ويحجب عند تجاوز الحد", async () => {
  process.env.UPSTASH_REDIS_REST_URL = "https://redis.example.test";
  process.env.UPSTASH_REDIS_REST_TOKEN = "token";
  let counter = 0;
  const calls: Array<{ url: string; body: unknown[][] }> = [];
  const fakeFetch = (async (url: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body));
    calls.push({ url, body });
    counter += 1;
    return new Response(JSON.stringify([{ result: "OK" }, { result: counter }, { result: 540_000 }]), { status: 200 });
  }) as unknown as typeof fetch;

  for (let i = 0; i < 5; i++) {
    const r = await rateLimitShared("t:ip", 5, TEN_MIN, fakeFetch);
    assert.equal(r.ok, true);
    assert.equal(r.backend, "redis");
  }
  const blocked = await rateLimitShared("t:ip", 5, TEN_MIN, fakeFetch);
  assert.equal(blocked.ok, false);
  assert.equal(blocked.retryAfterSeconds, 540);
  assert.equal(calls[0].url, "https://redis.example.test/pipeline");
  assert.deepEqual(calls[0].body[0], ["SET", "rl:t:ip", "0", "PX", String(TEN_MIN), "NX"]);
});

test("المخزن المشترك: يرجع للذاكرة المحلية عند فشل Redis أو غياب الإعداد", async () => {
  const failing = (async () => {
    throw new Error("network down");
  }) as unknown as typeof fetch;

  // بلا إعداد
  assert.equal((await rateLimitShared("m:a", 2, TEN_MIN, failing)).backend, "memory");

  // مع إعداد لكن Redis معطّل
  process.env.UPSTASH_REDIS_REST_URL = "https://redis.example.test";
  process.env.UPSTASH_REDIS_REST_TOKEN = "token";
  const origError = console.error;
  console.error = () => {};
  try {
    const r1 = await rateLimitShared("m:b", 2, TEN_MIN, failing);
    const r2 = await rateLimitShared("m:b", 2, TEN_MIN, failing);
    const r3 = await rateLimitShared("m:b", 2, TEN_MIN, failing);
    assert.deepEqual([r1.ok, r2.ok, r3.ok], [true, true, false]);
    assert.equal(r3.backend, "memory");
  } finally {
    console.error = origError;
  }
});
