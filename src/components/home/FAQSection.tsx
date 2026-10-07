"use client";

import { HelpCircle, Phone } from "lucide-react";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";

/**
 * FAQSection — الأسئلة الشائعة (3 كروت بارزة)
 *
 * - 3 كروت بحدود ذهبية دافئة
 * - كل كرت: سؤال bold + إجابة + أيقونة HelpCircle
 * - زر واتساب تحت: "لديك سؤال آخر؟"
 */
export function FAQSection() {
  const t = useTranslations("home");
  const waLink = buildSimpleWhatsAppLink(t("faqWhatsapp"));
  const faqs = [1, 2, 3].map((item) => ({
    question: t(`faqQuestion${item}`),
    answer: t(`faqAnswer${item}`),
  }));

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-3">
            {t("faqTitle")}
          </h2>
          <div className="w-24 h-1 bg-gold rounded-full mx-auto" />
        </div>

        {/* الكروت */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="group bg-card border-2 border-gold/30 rounded-2xl p-6 hover:border-gold hover:shadow-luxury hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10 flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-navy dark:text-white">
                  {faq.question}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground dark:text-navy-foreground/70 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* زر واتساب */}
        <div className="text-center mt-10">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#1ebd5a] hover:scale-105 transition-all"
          >
            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>{t("faqWhatsapp")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
