import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

/* ============================================================================
 *  مصادقة لوحة تحكم المقالات (/admin)
 *  - كلمات المرور: scrypt مع salt عشوائي (بدون مكتبات خارجية).
 *  - الجلسة: كوكي موقّعة HMAC-SHA256 (HttpOnly + SameSite=Lax) صالحة 7 أيام.
 *  - أول مدير: يُنشأ تلقائياً من ADMIN_EMAIL / ADMIN_PASSWORD عند أول دخول
 *    ناجح إذا كان جدول AdminUser فارغاً.
 * ============================================================================ */

export const SESSION_COOKIE = "cn_admin";
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET is not configured (min 16 chars)");
  }
  return secret;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createSessionToken(userId: string): string {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, exp: Date.now() + SESSION_SECONDS * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(token: string | undefined | null): string | null {
  if (!token) return null;
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;
    const expected = Buffer.from(sign(payload));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
      return null;
    }
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      uid?: string;
      exp?: number;
    };
    if (!data.uid || !data.exp || data.exp < Date.now()) return null;
    return data.uid;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_SECONDS,
};

/** معرّف المدير الحالي إن كانت الجلسة صالحة والحساب ما زال موجوداً، وإلا null. */
export async function getAdminUserId(): Promise<string | null> {
  try {
    const store = await cookies();
    const userId = readSessionToken(store.get(SESSION_COOKIE)?.value);
    if (!userId) return null;
    const user = await db.adminUser.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    return user?.id ?? null;
  } catch {
    return null;
  }
}

/** يتحقق من بيانات الدخول ويعيد معرّف المدير، أو null عند الفشل. */
export async function authenticate(
  email: string,
  password: string,
): Promise<string | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !password) return null;

  const user = await db.adminUser.findUnique({ where: { email: normalized } });
  if (user) {
    return verifyPassword(password, user.passwordHash) ? user.id : null;
  }

  /* أول تشغيل: لا يوجد أي مدير بعد → أنشئ الحساب من متغيرات البيئة */
  const count = await db.adminUser.count();
  const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const envPassword = process.env.ADMIN_PASSWORD;
  if (count === 0 && envEmail && envPassword) {
    const emailOk = envEmail === normalized;
    const passwordOk =
      envPassword.length === password.length &&
      timingSafeEqual(Buffer.from(envPassword), Buffer.from(password));
    if (emailOk && passwordOk) {
      const created = await db.adminUser.create({
        data: { email: normalized, passwordHash: hashPassword(password) },
      });
      return created.id;
    }
  }
  return null;
}
