"use client";

import { Link } from "@/i18n/navigation";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * SubscriptionCard — بطاقة الاشتراك السنوي
 *
 * - بعرض الصفحة (max-w-5xl) بحدود متقطعة ذهبية
 * - خلفية شفافة، حواف مدورة كبيرة
 * - عنوان + وصف + زر يربط لـ /plans
 * - hover: glow خفيف + الزر يكبر
 * - دعم الوضع الليلي و RTL
 */
export function SubscriptionCard() {
  const t = useTranslations("home");
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto group relative">
          {/* توهج خلفي عند المرور */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* البطاقة */}
          <div className="relative bg-card/50 dark:bg-navy-800/50 backdrop-blur-sm border-2 border-dashed border-gold rounded-3xl p-8 sm:p-12 text-center transition-all">
            {/* أيقونة علوية */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Sparkles className="w-7 h-7 text-gold" />
            </div>

            {/* العنوان */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-4 leading-tight">
              {t("subscriptionTitle")}
            </h2>

            {/* الوصف */}
            <p className="text-sm sm:text-base text-muted-foreground dark:text-navy-foreground/70 leading-relaxed max-w-2xl mx-auto mb-8">
              {t("subscriptionDescription")}
            </p>

            {/* الزر */}
            <Link
              href="/plans"
              className="group/btn inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl shadow-gold hover:bg-gold-300 hover:scale-105 transition-all"
            >
              <span>{t("subscriptionButton")}</span>
              <ArrowLeft className="w-5 h-5 group-hover/btn:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
