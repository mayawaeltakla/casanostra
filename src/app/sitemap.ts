import type { MetadataRoute } from "next";
import { servicesList, siteConfig } from "@/lib/site-config";
import { locales } from "@/i18n/messages";

const sitemapOrigin = siteConfig.url;
/* مسارات مفهرسة فقط — المحتوى الجزئي (blog/privacy/terms) مستبعد عمداً.
 * كل مسار يتكرر بالبادئات الخمس (رابط واحد قابل للمشاركة لكل لغة)،
 * وترويسات Link البديلة من الـ proxy تُعلم محركات البحث بالبدائل. */
const indexableRoutes: { route: string; priority: number }[] = [
  { route: "/", priority: 1 },
  { route: "/services", priority: 0.9 },
  ...servicesList.map((service) => ({
    route: `/services/${service.slug}`,
    priority: 0.8,
  })),
  { route: "/offers", priority: 0.8 },
  { route: "/quick-booking", priority: 0.7 },
  { route: "/contact", priority: 0.7 },
  { route: "/about", priority: 0.6 },
  { route: "/faq", priority: 0.6 },
  { route: "/help", priority: 0.6 },
  { route: "/plans", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  /* بدون lastModified ديناميكي — خريطة ثابتة قابلة للتخزين المؤقت.
   * المحتوى ثابت في ملفات TS ويُعاد بناؤه مع كل deploy. */
  return locales.flatMap((locale) =>
    indexableRoutes.map(({ route, priority }) => ({
      url: new URL(`/${locale}${route === "/" ? "" : route}`, sitemapOrigin).toString(),
      changeFrequency: "weekly" as const,
      priority,
    })),
  );
}
