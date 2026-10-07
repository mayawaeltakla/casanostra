import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
  Sparkles,
  Phone,
  ArrowLeft,
  Clock,
  Zap,
} from "lucide-react";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";

/* ============================================================================
 *  CASANOSTRA — صفحة الخدمات (/services)
 * ============================================================================
 *
 *  1. مقدمة عن الشركة + عنصر تحفيزي ذهبي
 *  2. شبكة الخدمات الـ11 بأيقونات
 *  3. قسم تحفيزي ختامي + زر واتساب
 * ============================================================================ */

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("servicesPage");
  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

/* خريطة الأيقونات */
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
};

/* Stable service slugs and icon identifiers. */
const services = [
  { slug: "reservations-turkey", icon: "Building2" },
  { slug: "visa", icon: "FileCheck" },
  { slug: "vip-cars", icon: "Car", badges: ["transfer", "daily", "weekly"] },
  { slug: "hotels", icon: "Hotel" },
  { slug: "flights", icon: "Plane" },
  { slug: "daily-tours", icon: "MapPin" },
  { slug: "private-tours", icon: "CarTaxiFront" },
  { slug: "group-tours", icon: "Users" },
  { slug: "hajj-umrah", icon: "MoonStar" },
  { slug: "medical-tourism", icon: "HeartPulse" },
  { slug: "other-services", icon: "MoreHorizontal" },
];

export default async function ServicesPage() {
  const t = await getTranslations("servicesPage");
  const waLink = buildSimpleWhatsAppLink(t("whatsappMessage"));

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
       * 1. مقدمة الصفحة + عنصر تحفيزي
       * ═══════════════════════════════════════════════════════════════ */}
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
                {t("home")}
              </Link>
              <span className="text-gold">/</span>
              <span className="text-gold">{t("title")}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t("heroTitle")}
            </h1>

            <p className="text-base lg:text-lg text-navy-foreground/80 leading-relaxed mb-8">
              {t("intro")}
            </p>

            {/* عنصر تحفيزي ذهبي */}
            <div className="inline-flex items-center gap-3 bg-gold/15 backdrop-blur-sm border border-gold/40 rounded-2xl px-6 py-4">
              <Zap className="w-6 h-6 text-gold flex-shrink-0" />
              <div className="text-right">
                <div className="text-sm font-bold text-gold">
                  {t("highlightTitle")}
                </div>
                <div className="text-xs text-navy-foreground/60 mt-1">
                  {t("highlightSubtitle")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * 2. شبكة الخدمات الـ11
       * ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon] || Building2;
              const messageKey = `serviceCards.${service.slug}`;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative bg-card border border-border rounded-2xl p-6 hover:border-gold/40 hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* رقم ترتيبي خفيف */}
                  <span className="absolute top-4 left-4 text-5xl font-bold text-navy/5 group-hover:text-gold/10 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* الأيقونة */}
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-navy/5 dark:bg-gold/5 group-hover:bg-gold/10 transition-colors mb-4">
                    <Icon className="w-7 h-7 text-navy dark:text-gold group-hover:text-gold transition-colors" />
                  </div>

                  {/* العنوان */}
                  <h3 className="text-lg font-bold text-navy dark:text-white mb-2 group-hover:text-gold-800 dark:group-hover:text-gold-300 transition-colors">
                    {t(`${messageKey}.title`)}
                  </h3>

                  {/* الوصف */}
                  <p className="text-sm text-muted-foreground dark:text-navy-foreground/70 leading-relaxed mb-4 min-h-[3rem]">
                    {t(`${messageKey}.description`)}
                  </p>

                  {/* بادجات (للسيارات VIP) */}
                  {service.badges && service.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.badges?.map((badge) => (
                        <span
                          key={badge}
                          className="text-xs bg-gold/10 text-gold-readable px-2 py-0.5 rounded-full font-medium"
                        >
                          {t(`${messageKey}.${badge}`)}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* زر تفاصيل */}
                  <div className="flex items-center gap-1 text-sm font-bold text-gold-readable">
                    <span>{t("detailsButton")}</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>

                  {/* خط ذهبي علوي يظهر عند المرور */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * 3. قسم تحفيزي ختامي
       * ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border-2 border-gold/30 mb-6">
              <Phone className="w-8 h-8 text-gold" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-4">
              {t("ctaTitle")}
            </h2>

            <p className="text-muted-foreground dark:text-navy-foreground/70 mb-8 leading-relaxed max-w-xl mx-auto">
              {t("ctaSubtitle")}
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-lg px-10 py-4 rounded-xl shadow-luxury-lg hover:bg-[#1ebd5a] transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{t("ctaButton")}</span>
            </a>

            {/* معلومات إضافية */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-4 h-4 text-gold" />
              <span>{t("quickReply")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
