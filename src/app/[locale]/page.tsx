import type { Metadata } from "next";
import { getDbPosts } from "@/lib/blog-db";
import { locales, isValidLocale, defaultLocale } from "@/i18n/messages";
import { HeroSection } from "@/components/home/HeroSection";
import { SubscriptionCard } from "@/components/home/SubscriptionCard";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedOffers } from "@/components/home/FeaturedOffers";
import { FAQSection } from "@/components/home/FAQSection";
import { PromoVideos } from "@/components/home/PromoVideos";
import { BlogSection } from "@/components/home/BlogSection";
import { CTABanner } from "@/components/home/CTABanner";

/**
 * الصفحة الرئيسية لموقع CASANOSTRA.
 *
 * الترتيب (من فوق لتحت):
 * 1. HeroSection       — فيديو إسطنبول + بطاقة تواصل
 * 2. SubscriptionCard  — قائمة الخطط
 * 3. FeaturedOffers     — العروض المميزة
 * 4. FAQSection         — الأسئلة الشائعة
 * 5. PromoVideos        — الفيديوهات الترويجية
 * 6. BlogSection        — مدونتنا (يشمل مقالات لوحة التحكم)
 * 7. CTABanner          — دعوة ختامية + واتساب
 */

/** الـ SEO للصفحة الرئيسية لكل لغة: canonical ذاتي + hreflang للغات الخمس. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isValidLocale(raw || "") ? raw : defaultLocale;
  const languageAlternates = Object.fromEntries(
    (locales as readonly string[]).map((l) => [l, `/${l}`]),
  );
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languageAlternates, "x-default": "/ar" },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  /* أحدث المقالات بلغة الزائر (الثابتة + المضافة من لوحة التحكم) */
  const dbPosts = await getDbPosts(locale);

  return (
    <>
      <HeroSection />
      <SubscriptionCard />
      <StatsSection />
      <FeaturedOffers />
      <FAQSection />
      <PromoVideos />
      <BlogSection dbPosts={dbPosts} />
      <CTABanner />
    </>
  );
}
