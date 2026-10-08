import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { isValidLocale } from "@/i18n/messages";
import { BlogContent } from "./BlogContent";

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
    robots: { index: locale === "ar", follow: true },
    alternates: { canonical: "/blog", languages: {} },
  };
}

export default function BlogPage() {
  return <BlogContent />;
}
