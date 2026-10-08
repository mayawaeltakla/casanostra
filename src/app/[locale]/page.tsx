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
 * 6. BlogSection        — مدونتنا
 * 7. CTABanner          — دعوة ختامية + واتساب
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <SubscriptionCard />
      <StatsSection />
      <FeaturedOffers />
      <FAQSection />
      <PromoVideos />
      <BlogSection />
      <CTABanner />
    </>
  );
}
