"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, Clock, PenLine } from "lucide-react";
import { getSortedPosts } from "@/lib/blog";
import type { DbPostView } from "@/lib/blog-db";
import { useLocale, useTranslations } from "next-intl";

const previewMessages: Record<string, { index: number; minutes: number }> = {
  "best-10-places-istanbul": { index: 1, minutes: 8 },
  "turkey-visa-complete-guide": { index: 2, minutes: 10 },
  "cappadocia-balloon-city": { index: 3, minutes: 7 },
  "golden-tips-before-turkey-trip": { index: 4, minutes: 6 },
};

/**
 * BlogSection — آخر المقالات (3 كروت)
 *
 * - عنوان "مدونتنا" + زر "جميع المقالات" → /blog
 * - زر "إضافة مقال" → /admin (للمدير وشركائه، يُطلب تسجيل الدخول)
 * - 3 كروت مقالات: الثابتة من lib/blog.ts + المضافة من لوحة التحكم (الأحدث أولاً)
 * - صورة غلاف + تاريخ + عنوان + ملخص + "اقرأ المزيد"
 */
export function BlogSection({ dbPosts = [] }: { dbPosts?: DbPostView[] }) {
  const locale = useLocale();
  const t = useTranslations("home");

  /* المقالات الثابتة موضعية عبر مفاتيح الترجمة */
  const staticPosts = getSortedPosts().map((post) => {
    const message = previewMessages[post.slug];
    const index = message?.index;
    return {
      slug: post.slug,
      coverImage: post.coverImage,
      publishedAt: post.publishedAt,
      readMinutes: message?.minutes ?? (Number.parseInt(post.readTime, 10) || 5),
      title: index ? t(`blogPost${index}Title`) : post.title,
      excerpt: index ? t(`blogPost${index}Excerpt`) : post.excerpt,
      category: index ? t(`blogCategory${index}`) : post.category,
      message,
    };
  });

  /* مقالات لوحة التحكم تُدمج مع الثابتة وتُرتَّب بالأحدث */
  const adminPosts = dbPosts.map((post) => ({
    slug: post.slug,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    readMinutes: post.readMinutes,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    message: undefined as { index: number; minutes: number } | undefined,
  }));

  const posts = [...staticPosts, ...adminPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* العنوان + الأزرار */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-2">
              {t("blogTitle")}
            </h2>
            <div className="w-24 h-1 bg-gold rounded-full" />
          </div>
          <div className="flex items-center gap-3">
            {/* زر إضافة مقال → لوحة تحكم المدير */}
            <a
              href="/admin"
              title={t("blogAddArticle")}
              aria-label={t("blogAddArticle")}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gold/50 text-gold-readable hover:bg-gold hover:text-navy hover:border-gold transition-colors"
            >
              <PenLine className="w-5 h-5" />
            </a>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-gold-readable hover:text-gold-700 dark:hover:text-gold-300 transition-colors whitespace-nowrap"
            >
              <span>{t("blogAll")}</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* كروت المقالات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post) => {
            const message = post.message;
            const title = post.title;
            const excerpt = post.excerpt;
            const category = post.category;

            return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 hover:shadow-luxury hover:-translate-y-1 transition-all"
            >
              {/* صورة الغلاف */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent" />
                {/* التصنيف */}
                <span className="absolute top-3 right-3 bg-gold text-navy text-xs font-bold px-2.5 py-1 rounded-md">
                  {category}
                </span>
              </div>

              {/* المحتوى */}
              <div className="p-5">
                {/* التاريخ + مدة القراءة */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    {new Intl.DateTimeFormat(locale, {
                      day: "numeric",
                      month: "short",
                    }).format(new Date(post.publishedAt))}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    {t("readMinutes", { count: post.readMinutes })}
                  </span>
                </div>

                {/* العنوان */}
                <h3 className="text-base font-bold text-navy dark:text-white mb-2 line-clamp-2 group-hover:text-gold-800 dark:group-hover:text-gold-300 transition-colors">
                  {title}
                </h3>

                {/* الملخص */}
                <p className="text-sm text-muted-foreground dark:text-card-foreground/80 leading-relaxed line-clamp-2 mb-3">
                  {excerpt}
                </p>

                {/* اقرأ المزيد */}
                <div className="flex items-center gap-1 text-sm font-bold text-gold-readable">
                  <span>{t("blogReadMore")}</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
