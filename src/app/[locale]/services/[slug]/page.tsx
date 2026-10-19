import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { isValidLocale, locales } from "@/i18n/messages";
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
  Compass,
  GraduationCap,
  Check,
  X,
  Clock,
  Tag,
  ArrowRight,
  ChevronLeft,
  Phone,
  Star,
} from "lucide-react";
import { servicesList, siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/JsonLd";
import { services as serviceFormDefs, getServiceBySlug } from "@/lib/services";
import { serviceDetailMessages, type ServiceDetailContent } from "@/i18n/service-details";
import { BookingForm } from "@/components/BookingForm";
import { CreateOwnTripButton } from "@/components/CreateOwnTripButton";

/** خريطة الأيقونات — لربط اسم الأيقونة (نص) بمكوّن lucide-react فعلي */
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
  Compass,
  GraduationCap,
};

/**
 * توليد جميع الصفحات الـ12 ثابتةً وقت البناء (Static Site Generation).
 * نستخدم slugs من services.ts (مصدر الحقول الديناميكية) لضمان تطابق المسارات.
 */
export function generateStaticParams() {
  return serviceFormDefs.map((service) => ({ slug: service.slug }));
}

/**
 * توليد Metadata خاصة بكل خدمة — تحسين SEO.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (isValidLocale(locale)) setRequestLocale(locale);
  const service = servicesList.find((item) => item.slug === slug);
  const serviceFormDef = getServiceBySlug(slug);
  if (!service || !serviceFormDef) return { title: "Service not found" };

  const t = await getTranslations("servicesPage");
  const serviceKey = `serviceCards.${slug}`;
  const serviceTitle = t(`${serviceKey}.title`);
  const serviceDescription = t(`${serviceKey}.description`);
  const title = t("detailMetadataTitle", { service: serviceTitle });
  const description = t("detailMetadataDescription", { service: serviceTitle });

  return {
    title,
    description,
    keywords: [serviceTitle, "CASANOSTRA", service.slug.replace(/-/g, " ")],
    /* SEO: canonical ذاتي لكل صفحة خدمة + بدائل hreflang للغات الخمس */
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        ...Object.fromEntries(
          (locales as readonly string[]).map((l) => [
            l,
            `/${l}/services/${slug}`,
          ]),
        ),
        "x-default": `/ar/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description: serviceDescription,
      images: [{ url: service.heroImage, width: 1200, height: 630 }],
      type: "website",
    },
  };
}

/**
 * الصفحة الرئيسية لخدمة واحدة (/services/[slug]).
 *
 * تركيب الصفحة:
 * 1. Hero section — صورة كبيرة + أيقونة + عنوان + مدة + سعر
 * 2. الوصف الكامل
 * 3. أقسام اختيارية إضافية إن عُرِّفت في الخدمة (باقة الخدمات + الشركاء)
 * 4. مميزات الخدمة + المشمولات وغير المشمولات
 * 5. معرض الصور
 * 6. العرض الترويجي (إن عُرِّف)
 * 7. نموذج الحجز (لزج على الشاشات الكبيرة)
 * 8. روابط التنقل بين الخدمات
 */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("servicesPage");
  const locale = await getLocale();
  const service = servicesList.find((s) => s.slug === slug);
  /* تعريف الحقول الديناميكية للنموذج (من lib/services.ts) */
  const serviceFormDef = getServiceBySlug(slug);

  // إرجاع 404 إن لم توجد الخدمة أو سكيمة نموذجها (يمنع انحراف المصدرين)
  if (!service || !serviceFormDef) {
    notFound();
  }

  const Icon = iconMap[service.icon] || Compass;
  const serviceKey = `serviceCards.${slug}`;
  const serviceTitle = t(`${serviceKey}.title`);
  const serviceDescription = t(`${serviceKey}.description`);
  const serviceDetail: ServiceDetailContent = locale === "ar"
    ? {
        description: service.longDescription,
        features: service.features,
        included: service.included,
        excluded: service.excluded,
      }
    : serviceDetailMessages[locale as keyof typeof serviceDetailMessages][slug];
  /* العنوان التسويقي: عربي معتمد من العميل، وبقية اللغات ترجمة أولية في service-details */
  const marketingText = locale === "ar" ? service.marketing : serviceDetail?.marketing;
  const marketing = marketingText && service.marketing
    ? { title: marketingText.title, subtitle: marketingText.subtitle, position: service.marketing.position }
    : undefined;
  const marketingBlock = marketing ? (
    <div className="rounded-2xl bg-navy p-8 text-center text-navy-foreground border border-gold/30">
      <h2 className="text-2xl lg:text-3xl font-bold text-gold mb-3 leading-snug">
        {marketing.title}
      </h2>
      <p className="text-navy-foreground/80 leading-relaxed">{marketing.subtitle}</p>
    </div>
  ) : null;

  /* ------------------------------------------------------------------
   * أقسام اختيارية إضافية (باقة الخدمات + الشركاء + العرض الترويجي).
   * تُعرَّف بالعربية في site-config.ts وتُترجَم في i18n/service-details.ts.
   * لا تُعرض إلا إذا عُرِّفت في الخدمة، لذلك لا يتغيّر شكل الخدمات الـ11.
   * ------------------------------------------------------------------ */
  const bundle = locale === "ar" ? service.bundle : serviceDetail?.bundle;
  const universities = locale === "ar" ? service.universities : serviceDetail?.universities;
  const promoText = locale === "ar" ? service.promo : serviceDetail?.promo;
  /* نسبة الخصم مصدرها الوحيد service.promo.discount (مصدر مركزي واحد لكل اللغات) */
  const promo =
    service.promo && promoText
      ? {
          heading: promoText.heading,
          description: promoText.description,
          discount: service.promo.discount,
        }
      : undefined;
  /* النصوص البديلة: المترجَمة إن وُجدت، وإلا اسم الخدمة */
  const heroImageAlt =
    (locale === "ar" ? service.heroImageAlt : serviceDetail?.heroImageAlt) || serviceTitle;
  const galleryImagesAlt =
    (locale === "ar" ? service.galleryImagesAlt : serviceDetail?.galleryImagesAlt) || [];

  /* قسم باقة الخدمات — بطاقات مرقّمة بنفس نمط بطاقات المميزات */
  const bundleBlock = bundle ? (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-6 flex items-center gap-3">
        <span className="w-1 h-8 bg-gold rounded-full" />
        <span>{bundle.heading}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {bundle.items.map((item, idx) => (
          <div
            key={item.title}
            className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-gold/30 hover:shadow-luxury transition-all"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10 flex-shrink-0">
              <span className="font-extrabold text-gold">{String(idx + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <h3 className="font-bold text-navy mb-1 leading-snug">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  /* قسم شركاء الجامعات */
  const universitiesBlock = universities ? (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-5 flex items-center gap-3">
        <span className="w-1 h-8 bg-gold rounded-full" />
        <span>{universities.heading}</span>
      </h2>
      <p className="text-foreground/80 leading-relaxed mb-6">{universities.intro}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {universities.items.map((university) => (
          <div
            key={university.name}
            className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-gold/30 hover:shadow-luxury transition-all"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10 flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-gold" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-navy leading-snug">{university.name}</div>
              {/* الاسم الرسمي بالتركية — latin دائماً في الواجهة العربية */}
              {university.official && university.official !== university.name && (
                <div dir="ltr" className="text-xs text-muted-foreground text-start">
                  {university.official}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  /* قسم العرض الترويجي — يبرز نسبة الخصم القادمة من site-config */
  const promoBlock = promo ? (
    <div className="rounded-2xl bg-navy border border-gold/30 p-6 lg:p-8 text-navy-foreground">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 border-gold/40 bg-gold/10 flex-shrink-0">
          <span className="text-3xl lg:text-4xl font-extrabold text-gold leading-none">
            {promo.discount}
          </span>
          <span className="mt-2 text-xs font-medium text-navy-foreground/70">
            {t("promoDiscountLabel")}
          </span>
        </div>
        <div className="text-center sm:text-start">
          <h2 className="text-xl lg:text-2xl font-bold text-gold mb-2 leading-snug">
            {promo.heading}
          </h2>
          <p className="text-navy-foreground/80 leading-relaxed">{promo.description}</p>
        </div>
      </div>
    </div>
  ) : null;

  const currentIndex = servicesList.findIndex((s) => s.slug === slug);
  const prevService = servicesList[currentIndex - 1];
  const nextService = servicesList[currentIndex + 1];

  /* BreadcrumbList — مسار تنقّل يظهر في نتائج جوجل (الرئيسية ← الخدمات ← الخدمة) */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("home"),
        item: `${siteConfig.url}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("title"),
        item: `${siteConfig.url}/${locale}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: serviceTitle,
        item: `${siteConfig.url}/${locale}/services/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {/* ================================================================
       * 1. HERO SECTION — صورة الخدمة + العنوان + بيانات سريعة
       * ================================================================ */}
      <section className="relative flex min-h-[480px] items-end overflow-hidden sm:min-h-[520px] md:h-[min(70vw,72vh)] md:min-h-[520px] lg:h-[min(53vw,80vh)] lg:min-h-[560px] lg:max-h-[880px] xl:min-h-[640px]">
        <Image
          src={service.heroImage}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: service.heroImagePosition || "center" }}
        />
        {/* overlay متدرّج داكن */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(15, 30, 61, 0.95) 0%, rgba(15, 30, 61, 0.5) 50%, rgba(15, 30, 61, 0.3) 100%)",
          }}
        />

        {/* محتوى الـ Hero */}
        <div className="relative z-10 container mx-auto px-4 pt-16 pb-12 lg:pt-24 lg:pb-16">
          {/* breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">
              {t("home")}
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <Link href="/services" className="hover:text-gold transition-colors">
              {t("title")}
            </Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-gold">{serviceTitle}</span>
          </nav>

          {/* أيقونة + عنوان */}
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gold/20 backdrop-blur-sm border border-gold/40 flex-shrink-0">
              <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-gold" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                {serviceTitle}
              </h1>
              <p className="text-base lg:text-lg text-white/80 leading-relaxed">
                {serviceDescription}
              </p>
            </div>
          </div>

          {/* بيانات سريعة: المدة + السعر */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-gold/30 text-white px-4 py-2 rounded-lg text-sm">
              <Clock className="w-4 h-4 text-gold" />
              <span>{t("durationLabel", { duration: t(`${serviceKey}.duration`) })}</span>
            </div>
            {service.priceFrom && (
              <div className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-4 py-2 rounded-lg text-sm">
                <Tag className="w-4 h-4" />
                <span>{t(`${serviceKey}.price`)}</span>
              </div>
            )}
            <a
              href="#booking-form"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{t("bookNow")}</span>
            </a>
            {/* زر «أنشئ رحلتك الخاصة بنفسك» — يظهر في خدمة الرحلات الخاصة فقط */}
            {slug === "private-tours" && (
              <CreateOwnTripButton label={t("createOwnTrip")} />
            )}
          </div>
        </div>
      </section>

      {/* ================================================================
       * 2. المحتوى الرئيسي + نموذج الحجز
       * ================================================================ */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* العمود الأيمن: المحتوى */}
            <div className="lg:col-span-2 space-y-12">
              {marketing?.position === "top" && marketingBlock}

              {/* الوصف الكامل */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-5 flex items-center gap-3">
                  <span className="w-1 h-8 bg-gold rounded-full" />
                  <span>{t("aboutService")}</span>
                </h2>
                <p className="text-foreground/80 leading-loose text-base lg:text-lg">
                  {serviceDetail.description}
                </p>
              </div>

              {/* باقة الخدمات الشاملة — تظهر فقط إن عُرِّفت في الخدمة */}
              {bundleBlock}

              {/* الجامعات الشريكة — تظهر فقط إن عُرِّفت في الخدمة */}
              {universitiesBlock}

              {/* مميزات الخدمة — تُعرض فقط للخدمات التي تعرّف مميزات */}
              {serviceDetail.features.length > 0 && (
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gold rounded-full" />
                    <span>{t("featuresTitle")}</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {serviceDetail.features.map((feature, idx) => {
                      const FeatureIcon = idx % 4 === 0
                        ? Check
                        : idx % 4 === 1
                          ? Tag
                          : idx % 4 === 2
                            ? Clock
                            : Star;
                      return (
                        <div
                          key={feature.title}
                          className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-gold/30 hover:shadow-luxury transition-all"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10 flex-shrink-0">
                            <FeatureIcon className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                            <h3 className="font-bold text-navy mb-1">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* المشمولات + غير المشمولات — تُعرض فقط إن عُرِّفت في الخدمة */}
              {(serviceDetail.included.length > 0 || serviceDetail.excluded.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceDetail.included.length > 0 && (
                    <div className="bg-card rounded-2xl p-6 border border-border">
                      <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                        <span>{t("included")}</span>
                      </h3>
                      <ul className="space-y-3">
                        {serviceDetail.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {serviceDetail.excluded.length > 0 && (
                    <div className="bg-card rounded-2xl p-6 border border-border">
                      <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <X className="w-5 h-5 text-red-600" />
                        </div>
                        <span>{t("excluded")}</span>
                      </h3>
                      <ul className="space-y-3">
                        {serviceDetail.excluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {/* معرض الصور */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-gold rounded-full" />
                  <span>{t("gallery")}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {service.galleryImages.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-border hover:border-gold/40 transition-all"
                    >
                      <Image
                        src={img}
                        alt={galleryImagesAlt[i] || `${serviceTitle} — ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{
                          objectPosition: service.galleryImagesPosition?.[i] || "center",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* العرض الترويجي — يظهر فقط إن عُرِّف في الخدمة */}
              {promoBlock}

              {marketing?.position === "bottom" && marketingBlock}
            </div>

            {/* العمود الأيسر: نموذج الحجز (لزج) */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <BookingForm
                  key={service.slug}
                  serviceTitle={serviceTitle}
                  serviceSlug={service.slug}
                  fields={serviceFormDef?.fields || []}
                />

                {/* معلومات إضافية أسفل النموذج */}
                <div className="mt-6 p-5 rounded-xl bg-navy text-navy-foreground">
                  <h4 className="font-bold text-gold mb-3">{t("whyBookTitle")}</h4>
                  <ul className="space-y-2 text-sm text-navy-foreground/80">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{t("detailQuickReply")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{t("bestPrices")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{t("ongoingSupport")}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{t("arabicTeam")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ================================================================
       * 3. التنقل بين الخدمات (السابق / التالي)
       * ================================================================ */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* الخدمة السابقة */}
            {prevService ? (
              <Link
                href={`/services/${prevService.slug}`}
                className="group flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-gold/40 hover:shadow-luxury transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gold flex-shrink-0" />
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">{t("previousService")}</div>
                  <div className="font-bold text-navy group-hover:text-gold transition-colors">
                    {t(`serviceCards.${prevService.slug}.title`)}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* الخدمة التالية */}
            {nextService ? (
              <Link
                href={`/services/${nextService.slug}`}
                className="group flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-gold/40 hover:shadow-luxury transition-all sm:justify-end"
              >
                <div className="text-left">
                  <div className="text-xs text-muted-foreground mb-1">{t("nextService")}</div>
                  <div className="font-bold text-navy group-hover:text-gold transition-colors">
                    {t(`serviceCards.${nextService.slug}.title`)}
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-gold flex-shrink-0" />
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* زر العودة لكل الخدمات */}
          <div className="mt-6 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-300 transition-colors"
            >
              <span>{t("viewAllServices")}</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
