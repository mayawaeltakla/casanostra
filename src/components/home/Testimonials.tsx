"use client";

import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Testimonials — آراء العملاء (4 كروت)
 *
 * - 4 كروت آراء (grid 4/2/1)
 * - كل كرت: أفاتار دائرية + اسم + بلد + 5 نجوم ذهبية + نص تقييم
 * - دعم الوضع الليلي و RTL
 */
const testimonialBackgrounds = ["bg-gold", "bg-navy", "bg-gold-700", "bg-navy-700"];

export function Testimonials() {
  const t = useTranslations("home");
  const testimonials = [1, 2, 3, 4].map((index) => {
    const name = t(`testimonial${index}Name`);
    return {
      name,
      country: t(`testimonial${index}Country`),
      avatar: Array.from(name)[0],
      avatarBg: testimonialBackgrounds[index - 1],
      text: t(`testimonial${index}Text`),
      rating: 5,
    };
  });

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-3">
            {t("testimonialsTitle")}
          </h2>
          <div className="w-24 h-1 bg-gold rounded-full mx-auto" />
        </div>

        {/* الكروت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-2xl p-6 hover:border-gold/40 hover:shadow-luxury hover:-translate-y-1 transition-all"
            >
              {/* النجوم */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold" fill="currentColor" />
                ))}
              </div>

              {/* النص */}
              <p className="text-sm text-muted-foreground dark:text-navy-foreground/70 leading-relaxed mb-5">
                "{t.text}"
              </p>

              {/* الشخص */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${t.avatarBg} text-white font-bold text-lg flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-navy dark:text-white">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
