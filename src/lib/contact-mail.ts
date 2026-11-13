/**
 * إرسال رسائل نماذج التواصل/المساعدة عبر Resend (من الخادم فقط).
 *
 * ⚠️ لا تستورد هذا الملف من أي مكوّن عميل ("use client"): يقرأ RESEND_API_KEY
 * من متغيرات البيئة الخادمية، ولا يجب أن يصل إلى حزمة المتصفح أبداً.
 */

export type ContactKind = "contact" | "help";

export interface ValidContactInput {
  kind: ContactKind;
  name: string;
  email: string; // فارغ في نموذج المساعدة
  phone: string;
  message: string;
  locale: string;
}

export type ValidationResult =
  | { ok: true; data: ValidContactInput }
  | { ok: false; fields: string[] };

export const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  messageMin: 5,
  message: 5000,
} as const;

const LOCALES = ["ar", "en", "tr", "fr", "ru"];
const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/;
const PHONE_RE = /^[0-9+()\-.\s]*$/;

/** يحوّل أي قيمة إلى نص، ويزيل أحرف التحكم (ما عدا السطر الجديد في الرسالة). */
function clean(value: unknown, multiline = false): string {
  if (typeof value !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const stripped = value.replace(multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ");
  return stripped.trim();
}

export function validateContactInput(raw: unknown): ValidationResult {
  const body = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const kind: ContactKind = body.kind === "help" ? "help" : "contact";
  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const message = clean(body.message, true);
  const locale = typeof body.locale === "string" && LOCALES.includes(body.locale) ? body.locale : "en";

  const fields: string[] = [];
  if (kind !== body.kind && body.kind !== undefined) fields.push("kind");
  if (!name || name.length > LIMITS.name) fields.push("name");
  if (kind === "contact") {
    if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) fields.push("email");
  }
  if (phone && (phone.length > LIMITS.phone || !PHONE_RE.test(phone))) fields.push("phone");
  if (message.length < LIMITS.messageMin || message.length > LIMITS.message) fields.push("message");

  if (fields.length > 0) return { ok: false, fields };
  return { ok: true, data: { kind, name, email: kind === "contact" ? email : "", phone, message, locale } };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface MailConfig {
  apiKey: string;
  from: string;
  to: string[];
}

/** يقرأ الإعدادات من البيئة؛ يُرجع null إن كانت ناقصة أو غير صالحة. */
export function getMailConfig(env: NodeJS.ProcessEnv = process.env): MailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();
  const to = (env.CONTACT_TO_EMAIL?.trim() || "info@casanostra-tr.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!apiKey || !from || to.length === 0) return null;
  // يقبل "name@domain.com" أو "Name <name@domain.com>"
  const fromOk = /^[^<>\r\n]*<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$|^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(from);
  if (!fromOk || to.some((a) => !EMAIL_RE.test(a))) return null;
  return { apiKey, from, to };
}

export function buildMessage(input: ValidContactInput) {
  const isContact = input.kind === "contact";
  const subjectName = input.name.replace(/[\r\n]+/g, " ").slice(0, 80);
  const subject = isContact
    ? `[CASANOSTRA] Contact form — ${subjectName}`
    : `[CASANOSTRA] Help request — ${subjectName}`;

  const rows: Array<[string, string]> = [["Name", input.name]];
  if (isContact) rows.push(["Email", input.email]);
  rows.push(["Phone", input.phone || "—"]);
  rows.push(["Site language", input.locale]);

  const label = isContact ? "Message" : "Issue / question";
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", `${label}:`, input.message].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#111">
<h2 style="margin:0 0 12px">${isContact ? "New contact form message" : "New help request"}</h2>
<table style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:2px 12px 2px 0;color:#555">${escapeHtml(k)}</td><td style="padding:2px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("")}</table>
<h3 style="margin:16px 0 6px">${label}</h3>
<div style="white-space:pre-wrap;border-left:3px solid #c9a65c;padding-left:12px">${escapeHtml(input.message)}</div>
</div>`;

  return { subject, text, html };
}

export type SendResult = { ok: true; id: string } | { ok: false; reason: "not_configured" | "provider_error" | "network" };

/** يرسل عبر Resend REST API. ينجح فقط إذا أكّد Resend القبول وأعاد معرّف الرسالة. */
export async function sendContactEmail(input: ValidContactInput, fetchImpl: typeof fetch = fetch): Promise<SendResult> {
  const cfg = getMailConfig();
  if (!cfg) {
    console.error("[contact] Email is not configured: set RESEND_API_KEY, CONTACT_FROM_EMAIL (verified domain) and CONTACT_TO_EMAIL.");
    return { ok: false, reason: "not_configured" };
  }
  const { subject, text, html } = buildMessage(input);
  const payload: Record<string, unknown> = { from: cfg.from, to: cfg.to, subject, text, html };
  if (input.kind === "contact") payload.reply_to = input.email;

  try {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    const json = (await res.json().catch(() => null)) as { id?: string; message?: string; name?: string } | null;
    if (!res.ok || !json?.id) {
      // نسجّل سبب المزوّد في سجلات الخادم فقط — لا يُعاد للزائر.
      console.error(`[contact] Resend rejected the email: HTTP ${res.status} ${json?.name ?? ""} ${json?.message ?? ""}`);
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true, id: json.id };
  } catch (err) {
    console.error("[contact] Resend request failed:", err instanceof Error ? err.message : err);
    return { ok: false, reason: "network" };
  }
}
