import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { isValidLocale, locales } from "@/i18n/messages";
import { getDbPosts } from "@/lib/blog-db";
import { BlogContent } from "./BlogContent";

/** يُعاد توليد الصفحة كل دقيقة لتظهر المقالات المضافة من لوحة /admin. */
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (isValidLocale(raw)) setRequestLocale(raw);
  const locale = await getLocale();
  const tHome = await getTranslations("home");
  return {
    title: tHome("blogMetaTitle"),
    description: tHome("blogMetaDescription"),
    /* المدونة متاحة مترجمة بالكامل (الخمس لغات) → فهرسة كاملة */
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        ...Object.fromEntries(
          (locales as readonly string[]).map((l) => [l, `/${l}/blog`]),
        ),
        "x-default": "/ar/blog",
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dbPosts = await getDbPosts(locale);
  return <BlogContent dbPosts={dbPosts} />;
}
