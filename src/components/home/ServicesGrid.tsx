"use client";

import Link from "next/link";
import {
  Building2,
  FileCheck,
  Car,
  Hotel,
  Plane,
  MapPin,
  CarTaxiFront,
  Users,
  MoonStar,
  HeartPulse,
  MoreHorizontal,
  ChevronLeft,
  Compass,
} from "lucide-react";
import { servicesList } from "@/lib/site-config";
import { useTranslations } from "next-intl";

/**
 * خريطة الأيقونات — تربط اسم الأيقونة (نص في site-config) بمكوّن lucide فعلي.
 */
const iconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Building2,
  FileCheck,
  Car,
  Hotel,
  Plane,
  MapPin,
  CarTaxiFront,
  Users,
  MoonStar,
  HeartPulse,
  MoreHorizontal,
  Compass,
};

/**
 * ServicesGrid — شبكة الخدمات الـ11.
 *
 * - شريط علوي بأيقونة + عنوان القسم.
 * - شبكة: 1 عمود (موبايل) / 2 (تابلت) / 3 (ديسكتوب).
 * - كل كرت: أيقونة + اسم + وصف قصير + زر {lt(locale, { ar: "اعرف المزيد", en: "Learn More", tr: "Daha Fazla Bilgi", fr: "En Savoir Plus", ru: "Подробнее" })}.
 * - يربط كل خدمة بصفحتها /services/[slug].
 * - تأثيرات hover أنيقة (رفع + ظل + تغيّر اللون).
 */
export function ServicesGrid() {
  const t = useTranslations("home");
  const tServices = useTranslations("servicesPage");
  const tNav = useTranslations("nav");
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* رأس القسم */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-gold text-sm font-medium mb-3">
            <span className="w-8 h-px bg-gold" />
            <span>{tNav("services")}</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
            {t("servicesTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("servicesSubtitle")}
          </p>
        </div>

        {/* شبكة الخدمات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => {
            const Icon = iconMap[service.icon] || Compass;
            const serviceKey = `serviceCards.${service.slug}`;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:border-gold/40 hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* رقم ترتيبي خفيف في الزاوية */}
                <span className="absolute top-4 left-4 text-5xl font-bold text-navy/5 group-hover:text-gold/10 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* الأيقونة */}
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-navy/5 group-hover:bg-gold/10 transition-colors mb-4">
                  <Icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
                </div>

                {/* المحتوى */}
                <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold-800 dark:group-hover:text-gold-300 transition-colors">
                  {tServices(`${serviceKey}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 min-h-[3.5rem]">
                  {tServices(`${serviceKey}.description`)}
                </p>

                {/* زر {lt(locale, { ar: "اعرف المزيد", en: "Learn More", tr: "Daha Fazla Bilgi", fr: "En Savoir Plus", ru: "Подробнее" })} */}
                <div className="flex items-center gap-1 text-sm font-medium text-gold-readable">
                  <span>{tServices("detailsButton")}</span>
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>

                {/* خط ذهبي علوي يظهر عند المرور */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
              </Link>
            );
          })}
        </div>

        {/* زر {lt(locale, { ar: "عرض جميع الخدمات", en: "View All Services", tr: "Tüm Hizmetleri Gör", fr: "Voir Tous les Services", ru: "Все услуги" })} */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-navy text-white font-medium px-8 py-3.5 rounded-xl hover:bg-navy-700 transition-colors shadow-luxury"
          >
            <span>{tNav("viewAllServices")}</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
