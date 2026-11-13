/** عميل نماذج التواصل/المساعدة: يستدعي /api/contact ولا يعتبر الإرسال ناجحاً إلا بتأكيد الخادم. */

export interface ContactPayload {
  kind: "contact" | "help";
  name: string;
  email?: string;
  phone: string;
  message: string;
  locale: string;
  /** حقل الفخ (Honeypot) — يجب أن يبقى فارغاً للبشر */
  website: string;
  /** وقت فتح النموذج (ms) — للحد الأدنى لزمن التعبئة */
  startedAt: number;
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "rate_limited" | "too_fast" | "failed" };

export async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (res.ok && data?.ok === true) return { ok: true };
    if (data?.error === "invalid") return { ok: false, reason: "invalid" };
    if (data?.error === "rate_limited") return { ok: false, reason: "rate_limited" };
    if (data?.error === "too_fast") return { ok: false, reason: "too_fast" };
    return { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
