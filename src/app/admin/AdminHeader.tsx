"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut, Newspaper } from "lucide-react";
import {
  AdminLanguageSwitcher,
  AdminThemeToggle,
  useAdmin,
} from "@/components/admin/AdminProvider";

/**
 * AdminHeader — شريط لوحة التحكم العائم.
 *
 * - شعار CASANOSTRA + عنوان اللوحة.
 * - مبدّل لغة (5 لغات) + زر الوضع الليلي/النهاري + رابط المدوّنة + خروج.
 * - تجاوب كامل: أيقونات فقط على الشاشات الصغيرة.
 */
export function AdminHeader() {
  const router = useRouter();
  const { t } = useAdmin();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        {/* الشعار + العنوان */}
        <Link href="/admin" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy text-gold shadow-luxury">
            <Newspaper className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-bold leading-tight text-navy transition-colors group-hover:text-gold-700 dark:text-white dark:group-hover:text-gold-300 sm:text-lg">
              CASANOSTRA
            </span>
            <span className="block truncate text-xs text-muted-foreground sm:text-sm">
              {t("header.panel")}
            </span>
          </span>
        </Link>

        {/* الأدوات */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <AdminLanguageSwitcher />
          <AdminThemeToggle />
          <a
            href="/ar/blog"
            target="_blank"
            rel="noopener noreferrer"
            title={t("header.viewBlog")}
            className="hidden h-10 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-gold/50 hover:text-gold-700 dark:hover:text-gold-300 sm:inline-flex"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden md:inline">{t("header.viewBlog")}</span>
          </a>
          <button
            type="button"
            onClick={logout}
            title={t("header.logout")}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-red-200 bg-card px-3 text-sm font-medium text-red-600 transition-colors hover:border-red-400 hover:bg-red-50 dark:text-red-400 dark:border-red-900/60 dark:hover:bg-red-950/40"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">{t("header.logout")}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
