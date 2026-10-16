"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ADMIN_LOCALES,
  ADMIN_LOCALE_META,
  adminMessages,
  isValidAdminLocale,
  type AdminLocale,
} from "@/lib/admin-i18n";
import { Globe, Moon, Sun } from "lucide-react";

/* ============================================================================
 *  AdminProvider — سياق لوحة التحكم (لغة الواجهة + الوضع الليلي)
 *
 *  - اللغة تُحفظ في localStorage + كوكي (cn-admin-locale) وتُطبَّق فوراً
 *    على <html lang dir> دون إعادة تحميل.
 *  - الوضع الليلي بنفس آلية الموقع: كلاس dark على <html> + مفتاح
 *    "theme" في localStorage.
 * ============================================================================ */

const LOCALE_STORAGE_KEY = "cn-admin-locale";

interface AdminContextValue {
  locale: AdminLocale;
  dir: "rtl" | "ltr";
  setLocale: (locale: AdminLocale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isDark: boolean;
  toggleTheme: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

function applyDocumentLocale(locale: AdminLocale) {
  const meta = ADMIN_LOCALE_META[locale];
  document.documentElement.lang = locale;
  document.documentElement.dir = meta.dir;
}

/** يقرأ لغة اللوحة المحفوظة (localStorage ثم الكوكي) — مرة واحدة عند التهيئة */
function readInitialLocale(): AdminLocale {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isValidAdminLocale(stored)) return stored;
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${LOCALE_STORAGE_KEY}=`))
      ?.split("=")[1];
    const decoded = decodeURIComponent(cookie ?? "");
    if (isValidAdminLocale(decoded)) return decoded;
  } catch {
    /* التخزين غير متاح */
  }
  return "ar";
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<AdminLocale>(readInitialLocale);
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  /* مزامنة اتجاه الصفحة مع لغة اللوحة (نظام خارجي: DOM) */
  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);



  const setLocale = useCallback((next: AdminLocale) => {
    setLocaleState(next);
    applyDocumentLocale(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
      document.cookie = `${LOCALE_STORAGE_KEY}=${encodeURIComponent(next)}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* التخزين غير متاح — نتجاهل */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* تجاهل */
    }
    setIsDark(dark);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      let text = adminMessages[locale][key] ?? adminMessages.ar[key] ?? key;
      if (params) {
        for (const [name, value] of Object.entries(params)) {
          text = text.split(`{${name}}`).join(String(value));
        }
      }
      return text;
    },
    [locale],
  );

  const value = useMemo<AdminContextValue>(
    () => ({
      locale,
      dir: ADMIN_LOCALE_META[locale].dir,
      setLocale,
      t,
      isDark,
      toggleTheme,
    }),
    [locale, setLocale, t, isDark, toggleTheme],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside <AdminProvider>");
  return ctx;
}

/* ── مبدّل لغة لوحة التحكم — قائمة منسدلة بأعلام اللغات الخمس ── */
export function AdminLanguageSwitcher() {
  const { locale, setLocale, t } = useAdmin();
  const [open, setOpen] = useState(false);

  /* إغلاق القائمة عند النقر خارجها */
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("header.language")}
        title={t("header.language")}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold text-foreground transition-colors hover:border-gold/50 hover:text-gold-700 dark:hover:text-gold-300"
      >
        <Globe className="h-4 w-4 text-gold" />
        <span className="hidden sm:inline">{ADMIN_LOCALE_META[locale].flag}</span>
        <span className="hidden md:inline">{ADMIN_LOCALE_META[locale].label}</span>
        <span className="md:hidden uppercase">{locale}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card py-1 shadow-luxury-lg"
          style={{ insetInlineEnd: 0 }}
        >
          {ADMIN_LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                  code === locale
                    ? "bg-gold/15 font-bold text-gold-700 dark:text-gold-300"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span className="text-base leading-none">{ADMIN_LOCALE_META[code].flag}</span>
                <span>{ADMIN_LOCALE_META[code].label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── زر تبديل الوضع الليلي/النهاري (بنفس آلية الموقع) ── */
export function AdminThemeToggle() {
  const { isDark, toggleTheme, t } = useAdmin();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("header.theme")}
      title={t("header.theme")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:border-gold/50 hover:text-gold-700 dark:hover:text-gold-300"
    >
      {isDark ? <Sun className="h-5 w-5 text-gold" /> : <Moon className="h-5 w-5 text-gold" />}
    </button>
  );
}
