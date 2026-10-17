import type { MetadataRoute } from "next";
import { servicesList, siteConfig } from "@/lib/site-config";
import { locales } from "@/i18n/messages";
import { blogPosts } from "@/lib/blog";
import { db } from "@/lib/db";

const sitemapOrigin = siteConfig.url;

/* مسار مفهرس واحد. `lastModified` اختياري: توفّره مقالات المدونة (الثابتة
 * ومن قاعدة البيانات) دون بقية المسارات الثابتة. هذا النوع الموحّد هو ما يجعل
 * دمج `indexableRoutes` مع `blogRoutes` قابلاً للتفكيك بأمان في `sitemap()`. */
type SitemapRoute = {
  route: string;
  priority: number;
  lastModified?: Date;
};

/* المسارات المفهرسة — كل مسار يتكرر بالبادئات الخمس (رابط قابل للمشاركة لكل لغة).
 * المدونة أصبحت مفهرسة بالكامل: صفحة الفهرس + المقالات الثابتة + مقالات
 * لوحة التحكم (من قاعدة البيانات) بجميع اللغات.
 * ترويسات Link البديلة من الـ proxy + hreflang بالـ HTML تُعلم محركات البحث بالبدائل. */
const indexableRoutes: SitemapRoute[] = [
  { route: "/", priority: 1 },
  { route: "/services", priority: 0.9 },
  ...servicesList.map((service) => ({
    route: `/services/${service.slug}`,
    priority: 0.8,
  })),
  { route: "/blog", priority: 0.8 },
  { route: "/offers", priority: 0.8 },
  { route: "/quick-booking", priority: 0.7 },
  { route: "/contact", priority: 0.7 },
  { route: "/about", priority: 0.6 },
  { route: "/faq", priority: 0.6 },
  { route: "/help", priority: 0.6 },
  { route: "/plans", priority: 0.6 },
];

/* إعادة توليد الخريطة كل ساعة — تلتقط المقالات الجديدة المضافة من لوحة التحكم. */
export const revalidate = 3600;

/** أرقام مقالات لوحة التحكم المنشورة + تاريخ آخر تحديث لكل منها. */
async function getDbArticleEntries(): Promise<SitemapRoute[]> {
  try {
    const articles = await db.blogArticle.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    return articles.map((a) => ({
      route: `/blog/${a.slug}`,
      priority: 0.7,
      lastModified: a.updatedAt,
    }));
  } catch {
    /* قاعدة البيانات غير مهيّأة بعد (أول تشغيل) — نكفي بالمسارات الثابتة */
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* المقالات الثابتة (من ملفات TS) + مقالات قاعدة البيانات (لوحة التحكم) */
  const staticBlogRoutes: SitemapRoute[] = blogPosts.map((post) => ({
    route: `/blog/${post.slug}`,
    priority: 0.7,
    lastModified: new Date(post.publishedAt),
  }));
  const dbBlogRoutes = await getDbArticleEntries();
  const blogRoutes: SitemapRoute[] = [...staticBlogRoutes, ...dbBlogRoutes];

  return locales.flatMap((locale) =>
    [...indexableRoutes, ...blogRoutes].map(({ route, priority, lastModified }) => ({
      url: new URL(`/${locale}${route === "/" ? "" : route}`, sitemapOrigin).toString(),
      changeFrequency: "weekly" as const,
      priority,
      ...(lastModified ? { lastModified } : {}),
    })),
  );
}
