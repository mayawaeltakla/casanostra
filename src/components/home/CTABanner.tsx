"use client";

import { MessageCircle, Phone, Clock } from "lucide-react";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site-config";
import { useTranslations } from "next-intl";

/**
 * CTABanner — قسم الدعوة للتواصل قبل الفوتر.
 *
 * - خلفية ذهبية متدرّجة أو متدرّج أزرق داكن.
 * - عنوان كبير + وصف قصير.
 * - زر واتساب كبير + زر اتصال.
 * - معلومات سريعة (ساعات العمل + رقم الهاتف).
 */
export function CTABanner() {
  const t = useTranslations("home");
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-navy">
      {/* خلفية متدرّجة */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, hsl(222 42% 14%) 0%, hsl(222 45% 19%) 50%, hsl(222 42% 14%) 100%)",
        }}
      />

      {/* توهج ذهبي خفيف */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(201, 166, 92, 0.18) 0%, transparent 60%)",
        }}
      />

      {/* زخرفة نقاط ذهبية */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(40 80% 52%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* العنوان */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {t("ctaTitle")}
          </h2>

          {/* الوصف */}
          <p className="text-base sm:text-lg text-white/80 mb-10 leading-relaxed">
            {t("ctaSubtitle")}
          </p>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            {/* زر واتساب كبير */}
            <a
              href={buildSimpleWhatsAppLink(
                t("ctaWhatsappMessage")
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-lg px-10 py-5 rounded-xl shadow-luxury-lg hover:bg-[#1ebd5a] transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>{t("ctaButton")}</span>
            </a>

            {/* زر اتصال */}
            <a
              href={`tel:${siteConfig.contact.phoneIntl}`}
              className="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-gold/40 text-gold font-bold text-lg px-10 py-5 rounded-xl hover:bg-white/15 transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span dir="ltr">{siteConfig.contact.phoneDisplay}</span>
            </a>
          </div>

          {/* معلومات سريعة */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <span>{t("workingHoursValue")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
