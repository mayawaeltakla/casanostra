"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";

/**
 * FeaturedOffers — العروض المميزة (6 بطاقات عمودية)
 *
 * - عنوان القسم: "العروض المميزة" بخط ذهبي تحته
 * - شبكة: 3 أعمدة (ديسكتوب) / 2 (تابلت) / 1 (موبايل)
 * - 6 بطاقات عمودية (portrait) بنفس الحجم
 * - حدود خضراء رفيعة + صورة + عنوان + وصف + خصم + زر واتساب
 * - hover: ارتفاع + ظل
 * - دعم RTL + الوضع الليلي
 */

interface Offer {
  titleKey: string;
  descriptionKey: string;
  messageKey: string;
  discount: string;
  image: string;
  waMessage: string;
}

const offers: Offer[] = [
  {
    titleKey: "featuredOffer1Title",
    descriptionKey: "featuredOffer1Description",
    messageKey: "featuredOffer1Message",
    discount: "25%",
    image:
      "/images/services/reservations-turkey/hero.webp",
    waMessage: "",
  },
  {
    titleKey: "featuredOffer2Title",
    descriptionKey: "featuredOffer2Description",
    messageKey: "featuredOffer2Message",
    discount: "20%",
    image:
      "/images/services/vip-cars/hero.webp",
    waMessage: "",
  },
  {
    titleKey: "featuredOffer3Title",
    descriptionKey: "featuredOffer3Description",
    messageKey: "featuredOffer3Message",
    discount: "25%",
    image:
      "/images/services/hotels/hero.webp",
    waMessage: "",
  },
  {
    titleKey: "featuredOffer4Title",
    descriptionKey: "featuredOffer4Description",
    messageKey: "featuredOffer4Message",
    discount: "15%",
    image:
      "/images/services/flights/hero.webp",
    waMessage: "",
  },
  {
    titleKey: "featuredOffer5Title",
    descriptionKey: "featuredOffer5Description",
    messageKey: "featuredOffer5Message",
    discount: "10%",
    image:
      "/images/services/medical-tourism/hero.webp",
    waMessage: "",
  },
  {
    titleKey: "featuredOffer6Title",
    descriptionKey: "featuredOffer6Description",
    messageKey: "featuredOffer6Message",
    discount: "15%",
    image:
      "/images/services/visa/hero.webp",
    waMessage: "",
  },
];

export function FeaturedOffers() {
  const t = useTranslations("home");
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* عنوان القسم */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-3">
            {t("featuredOffersTitle")}
          </h2>
          <div className="w-24 h-1 bg-gold rounded-full mx-auto" />
        </div>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
              const title = t(offer.titleKey);
              const description = t(offer.descriptionKey);
              const link = buildSimpleWhatsAppLink(t(offer.messageKey));

            return (
              <div
                key={offer.titleKey}
                className="group flex flex-col rounded-2xl overflow-hidden border-2 border-green-600/50 bg-card hover:-translate-y-2 hover:shadow-luxury-lg transition-all"
              >
                {/* الصورة — تغطي نصف البطاقة */}
                <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                  <Image
                    src={offer.image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* شارة الخصم */}
                  <div className="absolute top-3 right-3 bg-gold text-navy font-bold text-sm px-3 py-1 rounded-lg shadow-md">
                    {t("featuredDiscountLabel")} {offer.discount}
                  </div>
                </div>

                {/* المحتوى */}
                <div className="flex flex-col flex-1 p-5">
                  {/* العنوان */}
                  <h3 className="text-lg font-bold text-navy dark:text-white mb-2">
                    {title}
                  </h3>

                  {/* الوصف */}
                  <p className="text-sm text-muted-foreground dark:text-card-foreground/80 leading-relaxed mb-4 flex-1">
                    {description}
                  </p>

                  {/* زر اطلب العرض */}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-lg font-bold text-sm bg-navy text-white hover:bg-navy-700 transition-colors"
                  >
                    <span>{t("featuredOfferButton")}</span>
                    <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
