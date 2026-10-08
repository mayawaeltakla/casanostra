"use client";

import { Link } from "@/i18n/navigation";
import {
  ChevronLeft,
  Sparkles,
  ArrowLeft,
  Phone,
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
} from "lucide-react";
import { servicesList } from "@/lib/site-config";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";

/* ============================================================================
 *  CASANOSTRA — صفحة {t("title")} (/quick-booking)
 * ============================================================================
 *
 *  شبكة أيقونات الخدمات الـ11 — كل أيقونة تنقل لصفحة الخدمة الخاصة بها.
 *  نفس تصميم شبكة الخدمات في الصفحة الرئيسية لكن بصورة أكبر وتركيز أعلى على
 *  اختيار الخدمة بسرعة.
 * ============================================================================ */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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

export function QuickBookingContent() {
  const t = useTranslations("quickBooking");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("servicesPage");
  return (
    <>
      {/* ================================================================
       * 1. HERO
       * ================================================================ */}
      <section className="relative bg-navy text-navy-foreground py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(201, 166, 92, 0.18) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-navy-foreground/70 mb-6">
              <Link href="/" className="hover:text-gold transition-colors">
                {tNav("home")}
              </Link>
              <ChevronLeft className="w-3 h-3" />
              <span className="text-gold">{t("title")}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{servicesList.length} {t("badge")}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {t("title")}
            </h1>

            <p className="text-base lg:text-lg text-navy-foreground/80 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
       * 2. شبكة الخدمات الـ11
       * ================================================================ */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-medium mb-3">
              <span className="w-8 h-px bg-gold" />
              <span>{t("chooseService")}</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
              {t("sectionTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("sectionSubtitle")}
            </p>
          </div>

          {/* الشبكة — 3 أعمدة ديسكتوب / 2 تابلت / 1 موبايل */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, index) => {
              const Icon = iconMap[service.icon] || Compass;
              const serviceKey = `serviceCards.${service.slug}`;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative bg-card border border-border rounded-2xl p-6 hover:border-gold/40 hover:shadow-luxury hover:-translate-y-1 transition-all duration-300"
                >
                  {/* رقم ترتيبي خفيف */}
                  <span className="absolute top-4 left-4 text-5xl font-bold text-navy/5 group-hover:text-gold/10 transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* الأيقونة */}
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-navy/5 group-hover:bg-gold/10 transition-colors mb-4">
                    <Icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
                  </div>

                  {/* العنوان */}
                  <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                    {tServices(`${serviceKey}.title`)}
                  </h3>

                  {/* الوصف */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 min-h-[3.5rem]">
                    {tServices(`${serviceKey}.description`)}
                  </p>

                  {/* زر {t("bookNow")} */}
                  <div className="flex items-center gap-1 text-sm font-medium text-gold">
                    <span>{t("bookNow")}</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>

                  {/* خط ذهبي علوي يظهر عند المرور */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                </Link>
              );
            })}
          </div>

          {/* CTA ختامي */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/40 mb-6">
              <Phone className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-2xl font-bold text-navy mb-3">
              {t("ctaTitle")}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed">
              {t("ctaSubtitle")}
            </p>
            <a
              href={buildSimpleWhatsAppLink(
                t("whatsappMessage"),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-luxury-lg hover:bg-[#1ebd5a] transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{t("ctaButton")}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
