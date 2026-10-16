import { Link } from "@/i18n/navigation";
import { Tag, ArrowLeft, Clock, Percent, ChevronLeft } from "lucide-react";
import { offersList } from "@/lib/site-config";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";

/** خريطة ألوان الشارات حسب نوع العرض */
const badgeColorClasses: Record<
  "gold" | "navy" | "red",
  { bg: string; text: string }
> = {
  gold: { bg: "bg-gold", text: "text-navy" },
  navy: { bg: "bg-navy", text: "text-gold" },
  red: { bg: "bg-red-500", text: "text-white" },
};

/**
 * OffersSection — قسم العروض الخاصة في الصفحة الرئيسية.
 *
 * - يعرض أول 3 عروض من offersList (المميزة أولاً).
 * - خلفية أزرق داكن مع توهج ذهبي زخرفي.
 * - الكارت الأوسط (featured) مميّز بحدود ذهبية وskale أكبر.
 * - زر "اطلب العرض" يفتح واتساب برسالة جاهزة.
 * - زر "عرض جميع العروض" يربط بصفحة /offers الكاملة.
 */
export function OffersSection() {
  const t = useTranslations("offersPage");
  // نعرض أول 3 عروض فقط في الصفحة الرئيسية
  const featuredOffers = offersList.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      {/* خلفية زخرفية ذهبية */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(201, 166, 92, 0.12) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(201, 166, 92, 0.08) 0%, transparent 40%)",
        }}
      />

      <div className="container mx-auto px-4 relative">
        {/* رأس القسم */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-gold text-sm font-medium mb-3">
            <span className="w-8 h-px bg-gold" />
            <span>{t("activeBadge")}</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-white/70 leading-relaxed">
            {t("intro")}
          </p>
        </div>

        {/* شبكة العروض */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {featuredOffers.map((offer) => {
            const offerKey = `offers.${offer.id}`;
            const title = t(`${offerKey}.title`);
            const target = t(`${offerKey}.target`);
            const colors = badgeColorClasses[offer.badgeColor];
            const link = buildSimpleWhatsAppLink(t("whatsappMessage", { title, target }));

            return (
              <div
                key={offer.id}
                className={`group relative bg-card rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${
                  offer.featured
                    ? "border-gold shadow-luxury-lg md:scale-105"
                    : "border-border hover:border-gold/40 hover:shadow-luxury"
                }`}
              >
                {/* شريط الشارة في الزاوية */}
                <div
                  className={`absolute top-4 right-0 z-10 ${colors.bg} ${colors.text} px-4 py-1.5 text-xs font-bold rounded-l-lg shadow-md`}
                >
                  {t(`${offerKey}.badge`)}
                </div>

                <div className="p-7">
                  {/* الأيقونة */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-navy/5 group-hover:bg-gold/10 transition-colors mb-5">
                    {offer.discount !== "متغيّر" && offer.discount !== "حزمة" ? (
                      <Percent className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
                    ) : (
                      <Tag className="w-7 h-7 text-navy group-hover:text-gold transition-colors" />
                    )}
                  </div>

                  {/* نسبة الخصم */}
                  <div className="mb-3 flex items-baseline gap-2">
                    <span
                      className={`text-5xl font-bold ${
                        offer.featured ? "text-gold" : "text-navy"
                      }`}
                    >
                      {offer.discount}
                    </span>
                    {offer.discountLabel && (
                      <span className="text-xl font-bold text-muted-foreground">
                        {t("discount")}
                      </span>
                    )}
                  </div>

                  {/* العنوان */}
                  <h3 className="text-xl font-bold text-navy mb-1">
                    {title}
                  </h3>
                  <div className="inline-block text-xs text-gold bg-gold/10 px-2 py-0.5 rounded mb-4">
                    {target}
                  </div>

                  {/* الوصف */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 min-h-[5rem]">
                    {t(`${offerKey}.description`)}
                  </p>

                  {/* تاريخ الانتهاء (اختياري) */}
                  {offer.validUntil && (
                    <div className="mb-4 text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{t("validUntil", { date: t("endOfMonth") })}</span>
                    </div>
                  )}

                  {/* زر اطلب العرض */}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-medium transition-all ${
                      offer.featured
                        ? "bg-gold text-navy hover:bg-gold-300 shadow-gold"
                        : "bg-navy text-white hover:bg-navy-700"
                    }`}
                  >
                    <span>{t("requestOffer")}</span>
                    <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* خط ذهبي علوي للعروض المميزة */}
                {offer.featured && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-l from-gold-600 via-gold-300 to-gold-600" />
                )}
              </div>
            );
          })}
        </div>

        {/* زر "عرض جميع العروض" */}
        <div className="mt-12 text-center">
          <Link
            href="/offers"
            className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-gold/30 text-gold font-medium px-8 py-3.5 rounded-xl hover:bg-white/15 transition-colors"
          >
            <span>{t("allOffers", { count: offersList.length })}</span>
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
