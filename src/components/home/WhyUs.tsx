"use client";

import { ShieldCheck, Zap, Gem, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * WhyUs — قسم "لماذا تختارنا" بأربع ميزات.
 *
 * - شبكة 4 كروت (2x2 على التابلت، 4 أعمدة على الديسكتوب، عمود على الموبايل).
 * - كل كرت: أيقونة + عنوان + وصف.
 * - hover: تدرّج ذهبي خفيف + رفع خفيف + ظل.
 */

export function WhyUs() {
  const t = useTranslations("home");

  const features = [
    {
      icon: ShieldCheck,
      title: t("trust"),
      description: t("trustDesc"),
    },
    {
      icon: Zap,
      title: t("speed"),
      description: t("speedDesc"),
    },
    {
      icon: Gem,
      title: t("professionalism"),
      description: t("professionalismDesc"),
    },
    {
      icon: Headphones,
      title: t("support"),
      description: t("supportDesc"),
    },
  ];
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* عنوان القسم */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-gold text-sm font-medium mb-3">
            <span className="w-8 h-px bg-gold" />
            <span>{t("whyUsEyebrow")}</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
            {t("whyUsTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("whyUsSubtitle")}
          </p>
        </div>

        {/* شبكة الميزات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-card border border-border rounded-2xl p-6 text-center hover:border-gold/40 hover:shadow-luxury hover:-translate-y-1 transition-all duration-300"
              >
                {/* الأيقونة */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-5">
                  {/* توهج خلفي */}
                  <div className="absolute inset-0 rounded-full bg-gold/10 group-hover:bg-gold/20 blur-md transition-colors" />
                  {/* دائرة الأيقونة */}
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-navy/5 group-hover:bg-gold/10 border border-gold/20 transition-colors">
                    <Icon className="w-8 h-8 text-navy group-hover:text-gold transition-colors" />
                  </div>
                </div>

                {/* العنوان */}
                <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>

                {/* الوصف */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* خط ذهبي سفلي يظهر عند المرور */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gold rounded-full group-hover:w-16 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
