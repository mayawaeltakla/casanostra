"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  FileEdit,
  FileText,
  Globe2,
  Plus,
  Trash2,
} from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { ADMIN_LOCALES } from "@/lib/admin-i18n";
import type { ArticleTranslations } from "@/lib/blog-db";

/** مقال كما يصل من الخادم إلى الواجهة (تواريخ نصية قابلة للتسلسل) */
export interface AdminPostView {
  id: string;
  slug: string;
  published: boolean;
  publishedAt: string;
  readMinutes: number;
  coverImage: string;
  translations: ArticleTranslations;
}

/**
 * PostsDashboard — قائمة مقالات لوحة التحكم.
 *
 * - بطاقات متجاوبة (موبايل → ديسكتوب) بدل الجدول الثابت.
 * - كل بطاقة: صورة الغلاف، العنوان، التاريخ، مدة القراءة،
 *   شارة النشر، شرائح اللغات المكتملة، تعديل، حذف.
 */
export function PostsDashboard({ posts }: { posts: AdminPostView[] }) {
  const { t } = useAdmin();
  const router = useRouter();

  async function remove(id: string, title: string) {
    if (!window.confirm(t("dash.confirmDelete", { title }))) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else window.alert(t("dash.deleteError"));
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      {/* الرأس */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-navy dark:text-white">
            <FileText className="h-6 w-6 text-gold" />
            {t("dash.title")}
            <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-sm font-bold text-gold-700 dark:text-gold-300">
              {t("dash.count", { count: posts.length })}
            </span>
          </h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 font-bold text-gold-foreground shadow-gold transition-all hover:bg-gold-400 hover:scale-105 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span>{t("dash.add")}</span>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          <FileText className="mx-auto mb-3 h-10 w-10 text-gold/50" />
          <p>{t("dash.empty")}</p>
          <p className="mt-2 text-xs">{t("dash.emptyHint")}</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {posts.map((post) => {
            const translations = post.translations ?? {};
            const title = translations.ar?.title || post.slug;
            const doneLocales = ADMIN_LOCALES.filter(
              (locale) => translations[locale]?.body,
            );
            return (
              <li
                key={post.id}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-gold/40 sm:flex-row sm:items-center"
              >
                {/* صورة الغلاف */}
                <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-28">
                          <img
                    src={post.coverImage}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* المحتوى */}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-foreground">{title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span dir="ltr" className="font-mono">
                      /blog/{post.slug}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-gold" />
                      {post.publishedAt}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-gold" />
                      {post.readMinutes} {t("dash.minutes")}
                    </span>
                  </div>
                  {/* اللغات المكتملة */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Globe2 className="h-3.5 w-3.5 text-muted-foreground" />
                    {doneLocales.map((locale) => (
                      <span
                        key={locale}
                        className="rounded-md bg-navy/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-navy dark:bg-white/10 dark:text-white"
                      >
                        {locale}
                      </span>
                    ))}
                  </div>
                </div>

                {/* الحالة + الأزرار */}
                <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      post.published
                        ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {post.published ? t("dash.published") : t("dash.draft")}
                  </span>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-bold text-foreground transition-colors hover:border-gold/50 hover:text-gold-700 dark:hover:text-gold-300"
                  >
                    <FileEdit className="h-4 w-4" />
                    {t("dash.edit")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(post.id, title)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/40"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t("dash.delete")}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
