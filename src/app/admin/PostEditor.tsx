"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ImageIcon,
  Languages,
  Loader2,
  Save,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { ADMIN_LOCALES, ADMIN_LOCALE_META, type AdminLocale } from "@/lib/admin-i18n";
import type { ArticleTranslations } from "@/lib/blog-db";

/* لغات المحتوى — نفس لغات الموقع الخمس */
const CONTENT_LOCALES: { code: AdminLocale; required?: boolean }[] = [
  { code: "ar", required: true },
  { code: "en" },
  { code: "tr" },
  { code: "fr" },
  { code: "ru" },
];

interface EditorState {
  slug: string;
  published: boolean;
  publishedAt: string;
  readMinutes: number;
  coverImage: string;
  translations: ArticleTranslations;
}

const today = () => new Date().toISOString().slice(0, 10);

/** يصغّر الصورة المرفوعة إلى عرض أقصى 1600px بصيغة WebP قبل الرفع (لتجنّب حدود حجم الطلب). */
async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.82),
  );
  return blob ?? file;
}

/**
 * PostEditor — محرّر مقالات لوحة التحكم.
 *
 * - تصميم الموقع (كحلي/ذهبي) + وضع ليلي/نهاري + واجهة بخمس لغات.
 * - تبويبات لغات المحتوى الخمس (العربية مطلوبة، والبقية تُترجم تلقائياً
 *   من العربية عند الحفظ إن تُركت فارغة).
 * - تجاوب كامل: شبكة عمود واحد على الموبايل.
 */
export function PostEditor({
  postId,
  initial,
}: {
  postId?: string;
  initial?: EditorState;
}) {
  const router = useRouter();
  const { t, locale: uiLocale } = useAdmin();
  const [state, setState] = useState<EditorState>(
    initial ?? {
      slug: "",
      published: true,
      publishedAt: today(),
      readMinutes: 5,
      coverImage: "",
      translations: { ar: { author: "فريق CASANOSTRA" } },
    },
  );
  const [tab, setTab] = useState<AdminLocale>("ar");
  const [busy, setBusy] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const current = state.translations[tab] ?? {};

  function setField(field: "title" | "excerpt" | "category" | "author" | "body", value: string) {
    setState((prev) => ({
      ...prev,
      translations: { ...prev.translations, [tab]: { ...prev.translations[tab], [field]: value } },
    }));
  }

  async function upload(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const blob = await compressImage(file);
      const form = new FormData();
      form.append("file", new File([blob], "cover.webp", { type: blob.type || file.type }));
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error || t("editor.errorUpload"));
      } else {
        setState((prev) => ({ ...prev, coverImage: data.url as string }));
      }
    } catch {
      setError(t("editor.errorUpload"));
    } finally {
      setUploading(false);
    }
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    setTranslating(true);
    try {
      const res = await fetch(postId ? `/api/admin/posts/${postId}` : "/api/admin/posts", {
        method: postId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (res.ok) {
        const data = (await res.json().catch(() => ({}))) as { translated?: string[] };
        const translated = data.translated ?? [];
        setSuccess(
          translated.length > 0
            ? t("editor.translatedOk", { locales: translated.map((l) => ADMIN_LOCALE_META[l as AdminLocale]?.label ?? l).join("، ") })
            : t("editor.translatedNone"),
        );
        /* البقاء في المحرّر لعرض رسالة النجاح ثم العودة للوحة */
        setTimeout(() => {
          router.replace("/admin");
          router.refresh();
        }, 2200);
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || t("editor.errorSave"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(t("editor.errorServer"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setBusy(false);
      setTranslating(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/30";

  const labelClass = "block text-sm font-bold text-foreground";

  return (
    <form onSubmit={save} className="space-y-6">
      {error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
        >
          <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {error}
        </p>
      )}
      {success && (
        <p
          role="status"
          className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {success}
        </p>
      )}

      {/* ── الإعدادات العامة ── */}
      <section className="space-y-5 rounded-2xl border border-border bg-card p-5 shadow-luxury sm:p-6">
        <h2 className="flex items-center gap-2 font-bold text-navy dark:text-white">
          <Sparkles className="h-5 w-5 text-gold" />
          {t("editor.general")}
        </h2>
        <label className={`${labelClass} block`}>
          {t("editor.slug")}
          <input
            value={state.slug}
            onChange={(e) => setState({ ...state, slug: e.target.value })}
            placeholder="antalya-beaches"
            dir="ltr"
            required
            className={`${inputClass} font-mono text-sm`}
          />
          <span className="mt-1 block font-mono text-xs text-muted-foreground" dir="ltr">
            /blog/{state.slug || "your-article-slug"}
          </span>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gold" />
              {t("editor.date")}
            </span>
            <input
              type="date"
              value={state.publishedAt}
              onChange={(e) => setState({ ...state, publishedAt: e.target.value })}
              required
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold" />
              {t("editor.readMinutes")}
            </span>
            <input
              type="number"
              min={1}
              max={120}
              value={state.readMinutes}
              onChange={(e) => setState({ ...state, readMinutes: Number(e.target.value) })}
              required
              className={inputClass}
            />
          </label>
        </div>

        <div>
          <span className={`${labelClass} flex items-center gap-1.5`}>
            <ImageIcon className="h-4 w-4 text-gold" />
            {t("editor.cover")}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => upload(e.target.files?.[0])}
            disabled={uploading}
            className="mt-2 block w-full cursor-pointer text-sm text-muted-foreground file:me-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-navy file:px-4 file:py-2 file:font-bold file:text-navy-foreground hover:file:bg-navy-700"
          />
          {uploading && (
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-gold" />
              {t("editor.uploading")}
            </p>
          )}
          {state.coverImage && (
            <img
              src={state.coverImage}
              alt={t("editor.coverPreview")}
              className="mt-3 h-40 w-full rounded-xl border border-border object-cover sm:w-72"
            />
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            checked={state.published}
            onChange={(e) => setState({ ...state, published: e.target.checked })}
            className="h-5 w-5 cursor-pointer accent-[hsl(40_80%_52%)]"
          />
          {t("editor.publishedLabel")}
        </label>
      </section>

      {/* ── المحتوى حسب اللغة ── */}
      <section className="space-y-5 rounded-2xl border border-border bg-card p-5 shadow-luxury sm:p-6">
        <h2 className="flex items-center gap-2 font-bold text-navy dark:text-white">
          <Languages className="h-5 w-5 text-gold" />
          {t("editor.content")}
        </h2>
        <p className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-foreground">
          {t("editor.contentHint")}
        </p>

        {/* تبويبات اللغات — قابلة للتمرير أفقياً على الشاشات الصغيرة */}
        <div
          role="tablist"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
          style={{ scrollbarWidth: "thin" }}
        >
          {CONTENT_LOCALES.map((item) => {
            const meta = ADMIN_LOCALE_META[item.code];
            const filled = Boolean(state.translations[item.code]?.body);
            const active = tab === item.code;
            return (
              <button
                key={item.code}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(item.code)}
                className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  active
                    ? "bg-navy text-navy-foreground shadow-luxury"
                    : "bg-muted text-muted-foreground hover:bg-gold/15 hover:text-gold-700 dark:hover:text-gold-300"
                }`}
              >
                <span className="text-base leading-none">{meta.flag}</span>
                <span>{item.code === "ar" ? t("editor.tabRequired") : meta.label}</span>
                {filled && (
                  <CheckCircle2
                    className={`h-3.5 w-3.5 ${active ? "text-gold" : "text-green-600"}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {(() => {
          const meta = ADMIN_LOCALE_META[tab];
          return (
            <div className="space-y-4" dir={meta.dir}>
              <label className={labelClass}>
                {t("editor.title")}
                <input
                  value={current.title ?? ""}
                  onChange={(e) => setField("title", e.target.value)}
                  required={tab === "ar"}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                {t("editor.excerpt")}
                <textarea
                  rows={3}
                  value={current.excerpt ?? ""}
                  onChange={(e) => setField("excerpt", e.target.value)}
                  required={tab === "ar"}
                  className={inputClass}
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  {t("editor.category")}
                  <input
                    value={current.category ?? ""}
                    onChange={(e) => setField("category", e.target.value)}
                    required={tab === "ar"}
                    className={inputClass}
                  />
                </label>
                <label className={labelClass}>
                  {t("editor.author")}
                  <input
                    value={current.author ?? ""}
                    onChange={(e) => setField("author", e.target.value)}
                    className={inputClass}
                  />
                </label>
              </div>
              <label className={labelClass}>
                {t("editor.body")}
                <textarea
                  rows={14}
                  value={current.body ?? ""}
                  onChange={(e) => setField("body", e.target.value)}
                  required={tab === "ar"}
                  className={`${inputClass} leading-relaxed`}
                />
              </label>
            </div>
          );
        })()}

        <div className="rounded-xl bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">{t("editor.formatting")}</strong>{" "}
          {t("editor.formattingHint")}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={busy || uploading}
          className="inline-flex items-center gap-2 rounded-xl bg-gold px-8 py-3 font-bold text-gold-foreground shadow-gold transition-all hover:bg-gold-400 hover:scale-105 active:scale-95 disabled:opacity-60"
        >
          {busy ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>{translating ? t("editor.translating") : t("editor.saving")}</span>
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              <span>{t("editor.save")}</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-xl border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
        >
          {t("editor.cancel")}
        </button>
      </div>
    </form>
  );
}
