"use client";

import Link from "next/link";
import {
  Sparkles,
  ChevronLeft,
  Clock,
  Phone,
  ArrowLeft,
  RefreshCw,
  Bell,
} from "lucide-react";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { offersList, servicesList } from "@/lib/site-config";
import { useTranslations } from "next-intl";

/* ============================================================================
 *  CASANOSTRA — صفحة العروض (تستخدم offersList من site-config)
 * ============================================================================ */

export function OffersContent() {
  const t = useTranslations("offersPage");
  const tServices = useTranslations("servicesPage");
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-navy-foreground py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(201, 166, 92, 0.22) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(234, 138, 50, 0.12) 0%, transparent 50%)",
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-navy-foreground/70 mb-6">
              <Link href="/" className="hover:text-gold transition-colors">{t("home")}</Link>
              <ChevronLeft className="w-3 h-3" />
              <span className="text-gold">{t("title")}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{offersList.length} {t("activeBadge")}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {t("title")}
            </h1>

            <p className="text-base lg:text-lg text-navy-foreground/80 leading-relaxed">
              {t("intro")}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl mx-auto">
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gold/10">
                <div className="text-3xl font-bold text-gold mb-1">{offersList.length}</div>
                <div className="text-xs text-navy-foreground/70">{t("activeOffers")}</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gold/10">
                <div className="text-3xl font-bold text-gold mb-1">25%</div>
                <div className="text-xs text-navy-foreground/70">{t("highestDiscount")}</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gold/10">
                <div className="text-3xl font-bold text-gold mb-1">11</div>
                <div className="text-xs text-navy-foreground/70">{t("includedServices")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* العروض */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offersList.map((offer) => {
              const offerKey = `offers.${offer.id}`;
              const title = t(`${offerKey}.title`);
              const target = t(`${offerKey}.target`);
              const relatedService = offer.relatedServiceSlug
                ? servicesList.find((s) => s.slug === offer.relatedServiceSlug)
                : null;
              const link = buildSimpleWhatsAppLink(
                t("whatsappMessage", { title, target })
              );

              return (
                <article
                  key={offer.id}
                  className={`group relative bg-card rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 ${
                    offer.featured
                      ? "border-gold shadow-luxury-lg"
                      : "border-border hover:border-gold/40 hover:shadow-luxury"
                  }`}
                >
                  {/* شارة */}
                  <div className={`absolute top-4 right-0 z-10 px-4 py-1.5 text-xs font-bold rounded-l-lg shadow-md ${
                    offer.badgeColor === "gold" ? "bg-gold text-navy" : "bg-navy text-gold"
                  }`}>
                    {t(`${offerKey}.badge`)}
                  </div>

                  {/* صورة + نسبة الخصم */}
                  <div
                    className="relative h-44 flex items-end p-7"
                    style={{
                      background: offer.featured
                        ? "linear-gradient(135deg, hsl(40 80% 52%) 0%, hsl(36 73% 45%) 100%)"
                        : "linear-gradient(135deg, hsl(28 58% 33%) 0%, hsl(25 52% 28%) 100%)",
                    }}
                  >
                    <div className="relative">
                      <div className="flex items-baseline gap-2">
                        <span className="text-7xl font-bold text-white drop-shadow-lg">
                          {offer.discount}
                        </span>
                        <span className="text-2xl font-bold text-white/80">
                          {t("discount")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* المحتوى */}
                  <div className="p-7">
                    <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-4 ${
                      offer.featured ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground"
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span>{target}</span>
                    </div>

                    <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 min-h-[4rem]">
                      {t(`${offerKey}.description`)}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5 pb-5 border-b border-border">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{t("validUntil", { date: t("endOfMonth") })}</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 ${
                          offer.featured
                            ? "bg-[#25D366] text-white hover:bg-[#1ebd5a] shadow-lg shadow-green-500/30"
                            : "bg-navy text-white hover:bg-navy-700"
                        }`}
                      >
                        <Phone className="w-4 h-4" />
                        <span>{t("requestOffer")}</span>
                        <ArrowLeft className="w-4 h-4" />
                      </a>

                      {relatedService && (
                        <Link
                          href={`/services/${relatedService.slug}`}
                          className="inline-flex items-center justify-center gap-2 border border-border text-navy font-medium px-5 py-3 rounded-xl hover:border-gold/40 transition-colors text-sm"
                        >
                          <span>{tServices(`serviceCards.${relatedService.slug}.title`)}</span>
                          <ChevronLeft className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {offer.featured && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-l from-gold-600 via-gold-300 to-gold-600" />
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ملاحظة ختامية */}
      <section className="relative py-20 overflow-hidden bg-navy">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(201, 166, 92, 0.16) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/40 mb-6">
              <Bell className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {t("followTitle")}
            </h2>
            <p className="text-base lg:text-lg text-white/80 mb-8 leading-relaxed">
              {t("followSubtitle")}
            </p>
            <a
              href={buildSimpleWhatsAppLink(t("followSubtitle"))}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-luxury-lg hover:bg-[#1ebd5a] transition-all hover:scale-105"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>{t("followButton")}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
