"use client";

import { Link } from "@/i18n/navigation";
import {
  ChevronLeft,
  Sparkles,
  Phone,
  MapPin,
  Target,
  Handshake,
  ShieldCheck,
  Zap,
  Clock,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { useLocale, useTranslations } from "next-intl";
import { lt } from "@/lib/locale-text";

/* ============================================================================
 *  CASANOSTRA — صفحة من نحن (/about)
 * ============================================================================
 *
 *  البنية:
 *    1. Hero: عنوان "من نحن" + نبذة عن الشركة
 *    2. قسم القيم الـ4 (الاحتراف، الودّية، الأمان، السرعة)
 *    3. زر واتساب: "تحدث معنا الآن"
 *    4. معلومات الموقع وساعات العمل
 * ============================================================================ */

/* ====================================================================
 *  مكوّن مساعد لعرض القيم — يأخذ العنوان والوصف المترجمين
 * ==================================================================== */
interface ValueItem {
  icon: typeof Target;
  titleKey: string;
  descKey: string;
  emoji: string;
}

const valueItems: ValueItem[] = [
  { icon: Target, titleKey: "valueTrust", descKey: "valueTrustDesc", emoji: "🎯" },
  { icon: Handshake, titleKey: "valueFriendliness", descKey: "valueFriendlinessDesc", emoji: "🤝" },
  { icon: ShieldCheck, titleKey: "valueSafety", descKey: "valueSafetyDesc", emoji: "🛡️" },
  { icon: Zap, titleKey: "valueSpeed", descKey: "valueSpeedDesc", emoji: "⚡" },
];

/* مواقع الشركة */
const locations = [
  {
    city: "إسطنبول",
    country: "تركيا",
    address: "بي أوغلو، إسطنبول، تركيا",
    status: "مفتوح",
    isMain: true,
  },
];

export function AboutContent() {
  const locale = useLocale();
  const t = useTranslations("about");
  const tNav = useTranslations("nav");
  const whatsappLink = buildSimpleWhatsAppLink(
    t("ctaTitle"),
  );

  return (
    <>
      {/* ================================================================
       * 1. HERO — عنوان "من نحن" + نبذة عن الشركة
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
            {/* breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-navy-foreground/70 mb-6">
              <Link href="/" className="hover:text-gold transition-colors">
                {tNav("home")}
              </Link>
              <ChevronLeft className="w-3 h-3" />
              <span className="text-gold">{t("title")}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t("title")}
            </h1>

            {/* نبذة عن الشركة */}
            <p className="text-base lg:text-lg text-navy-foreground/80 leading-relaxed mb-5">
              {t("intro")}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
       * 2. قسم القيم الـ4
       * ================================================================ */}
      <section className="py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-gold-readable text-sm font-medium mb-3">
              <span className="w-8 h-px bg-gold" />
              <span>{t("valuesTitle")}</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
              {t("valuesTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("valuesSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueItems.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.titleKey}
                  className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-gold/40 hover:shadow-luxury hover:-translate-y-1 transition-all"
                >
                  <div className="relative inline-flex items-center justify-center w-16 h-16 mb-5">
                    <div className="absolute inset-0 rounded-full bg-gold/10 blur-md group-hover:bg-gold/20 transition-colors" />
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-navy/5 group-hover:bg-gold/10 border border-gold/20 transition-colors">
                      <Icon className="w-8 h-8 text-navy group-hover:text-gold transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                    {t(value.titleKey)}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(value.descKey)}
                  </p>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gold rounded-full group-hover:w-16 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
       * 4. زر واتساب: تحدث معنا الآن
       * ================================================================ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/40 mb-6">
            <Phone className="w-8 h-8 text-gold" />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
            {t("ctaTitle")}
          </h2>

          <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            {t("ctaSubtitle")}
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-luxury-lg hover:bg-[#1ebd5a] transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>{t("ctaButton")}</span>
          </a>
        </div>
      </section>

      {/* ================================================================
       * 5. قسم مواقعنا
       * ================================================================ */}
      <section className="py-20 lg:py-24 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-gold-readable text-sm font-medium mb-3">
              <span className="w-8 h-px bg-gold" />
              <span>{t("locationsTitle")}</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
              {t("locationsHeading")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("locationsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {locations.map((loc) => (
              <div
                key={loc.city}
                className={`relative bg-card border-2 rounded-2xl p-6 transition-all ${
                  loc.isMain
                    ? "border-gold shadow-luxury"
                    : "border-border opacity-80"
                }`}
              >
                {/* أيقونة الموقع */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                    loc.isMain ? "bg-gold/10" : "bg-muted"
                  }`}
                >
                  <MapPin
                    className={`w-7 h-7 ${
                      loc.isMain ? "text-gold-readable" : "text-muted-foreground"
                    }`}
                  />
                </div>

                {/* المدينة + الدولة */}
                <h3 className="text-2xl font-bold text-navy mb-1">
                  {lt(locale, { ar: loc.city, en: "Istanbul", tr: "İstanbul", fr: "Istanbul", ru: "Стамбул" })}
                </h3>
                <div className="text-sm text-muted-foreground mb-4">
                  {lt(locale, { ar: loc.country, en: "Turkey", tr: "Türkiye", fr: "Turquie", ru: "Турция" })}
                </div>

                {/* العنوان */}
                <div className="text-sm text-foreground/80 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>{lt(locale, { ar: loc.address, en: "Beyoğlu, Istanbul, Turkey", tr: "Beyoğlu, İstanbul, Türkiye", fr: "Beyoğlu, Istanbul, Turquie", ru: "Бейоглу, Стамбул, Турция" })}</span>
                </div>

                {loc.isMain && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-l from-gold-600 via-gold-300 to-gold-600" />
                )}
              </div>
            ))}
          </div>

          {/* بطاقة معلومات إضافية */}
          <div className="mt-8 max-w-3xl mx-auto bg-navy text-navy-foreground rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-gold" />
              <h3 className="text-lg font-bold text-gold">{t("workingHoursTitle")}</h3>
            </div>
            <p className="text-sm text-navy-foreground/80 mb-3">
              {lt(locale, { ar: siteConfig.contact.workingHours, en: siteConfig.contact.workingHoursEn, tr: "Cum - Per: 09:00 - 21:00", fr: "Sam - Jeu : 9:00 - 21:00", ru: "Сб - Чт: 9:00 - 21:00" })}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
