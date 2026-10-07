"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronDown,
  HelpCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { useTranslations, useLocale } from "next-intl";

/* ============================================================================
 *  CASANOSTRA — صفحة الأسئلة الشائعة (/faq) — Client Component
 * ============================================================================ */

export function FaqContent() {
  const t = useTranslations("faq");
  const tNav = useTranslations("nav");

  // الأسئلة الـ10 من ملف الترجمة
  const faqs = t.raw("questions") as { q: string; a: string }[];

  const whatsappLink = buildSimpleWhatsAppLink(t("whatsappMessage"));

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
              <HelpCircle className="w-4 h-4" />
              <span>{faqs.length}</span>
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
       * 2. Accordion الأسئلة
       * ================================================================ */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                number={idx + 1}
                question={faq.q}
                answer={faq.a}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
       * 3. زر واتساب: {t("ctaTitle")} اسألنا مباشرة
       * ================================================================ */}
      <section className="py-20 lg:py-24 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8 lg:p-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/40 mb-6">
              <Sparkles className="w-8 h-8 text-gold" />
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-4">
              {t("ctaTitle")}
            </h2>

            <p className="text-muted-foreground mb-8 leading-relaxed">
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
        </div>
      </section>
    </>
  );
}

/* ====================================================================
 *  مكوّن مساعد — عنصر accordion
 * ==================================================================== */

function FAQItem({
  number,
  question,
  answer,
}: {
  number: number;
  question: string;
  answer: string;
}) {
  return (
    <details className="group bg-card border border-border rounded-xl overflow-hidden hover:border-gold/30 transition-colors">
      <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
        {/* رقم السؤال */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 text-gold font-bold flex-shrink-0">
          {number}
        </div>

        {/* نص السؤال */}
        <span className="flex-1 font-bold text-navy text-base lg:text-lg">
          {question}
        </span>

        {/* أيقونة السهم — تدور عند الفتح */}
        <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
      </summary>

      {/* الإجابة */}
      <div className="px-5 pb-5 pt-0 pr-20">
        <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </details>
  );
}
