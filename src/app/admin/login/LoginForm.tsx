"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, Loader2, LogIn, Mail } from "lucide-react";
import {
  AdminLanguageSwitcher,
  AdminThemeToggle,
  useAdmin,
} from "@/components/admin/AdminProvider";

/**
 * LoginForm — نموذج تسجيل دخول لوحة التحكم (للمدير وشركائه فقط).
 * بتصميم الموقع (كحلي/ذهبي)، متجاوب، وبواجهة مترجمة.
 */
export function LoginForm() {
  const router = useRouter();
  const { t } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        /* دخول فوري إلى اللوحة */
        router.replace("/admin");
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        code?: string;
        missing?: string[];
      };
      if (res.status === 503) {
        const names = data.missing?.length ? ` (${data.missing.join(", ")})` : "";
        setError(
          data.code === "no-tables"
            ? data.error || t("login.notSetup")
            : `${t("login.notSetup")}${names}`,
        );
        return;
      }
      setError(data.error || t("login.error"));
    } catch {
      setError(t("login.serverError"));
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <div className="w-full max-w-sm">
      {/* الشعار + العنوان */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/40 bg-navy shadow-gold">
          <img
            src="/images/brand/logo-transparent.webp"
            alt="CASANOSTRA"
            className="h-10 w-10 object-contain"
          />
        </div>
        <h1 className="mb-1 text-2xl font-bold text-navy dark:text-white">
          {t("login.title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("login.subtitle")}</p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-bold text-foreground">
          {t("login.email")}
          <span className="relative block">
            <Mail className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              className={`${inputClass} ltr:pl-10 ltr:pr-3 rtl:pl-3 rtl:pr-10`}
            />
          </span>
        </label>

        <label className="block text-sm font-bold text-foreground">
          {t("login.password")}
          <span className="relative block">
            <KeyRound className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
              className={`${inputClass} ltr:pl-10 ltr:pr-10 rtl:pl-10 rtl:pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "hide" : "show"}
              className="absolute top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-gold ltr:right-2 rtl:left-2"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </span>
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 font-bold text-navy-foreground shadow-luxury transition-all hover:bg-navy-700 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
        >
          {busy ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-gold" />
              <span>{t("login.busy")}</span>
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5 text-gold" />
              <span>{t("login.submit")}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

/** شريط الأدوات أعلى صفحة الدخول (لغة + وضع ليلي) */
export function LoginToolbar() {
  return (
    <div className="absolute top-4 z-10 flex items-center gap-2 ltr:right-4 rtl:left-4">
      <AdminLanguageSwitcher />
      <AdminThemeToggle />
    </div>
  );
}
