import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Send,
  ChevronLeft,
} from "lucide-react";
import { footerColumns } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { useLocale, useTranslations } from "next-intl";
import { lt } from "@/lib/locale-text";

/**
 * Footer — فوتر كامل بخلفية أزرق داكن فاخرة.
 *
 * المخطط (4 أعمدة):
 * 1. شعار + نبذة + ساعات العمل
 * 2-4. روابط سريعة (تُولّد من site-config)
 *
 * صف سفلي:
 * - روابط سوشال ميديا
 * - معلومات التواصل
 * - حقوق النشر
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tWhatsapp = useTranslations("whatsapp");
  const tServices = useTranslations("servicesPage");
  const localizedContact = {
    description: lt(locale, {
      ar: siteConfig.description,
      en: "Luxury travel packages, premium villas, guided tours, and VIP services across Turkey.",
      tr: "Türkiye'de lüks seyahat paketleri, premium villalar, rehberli turlar ve VIP hizmetler.",
      fr: "Séjours de luxe, villas premium, excursions guidées et services VIP en Turquie.",
      ru: "Роскошные туристические пакеты, премиальные виллы, экскурсии с гидом и VIP-услуги по всей Турции.",
    }),
    workingHours: lt(locale, {
      ar: siteConfig.contact.workingHours,
      en: "Sat - Thu: 9:00 AM - 9:00 PM",
      tr: "Cum - Per: 09:00 - 21:00",
      fr: "Sam - Jeu : 9:00 - 21:00",
      ru: "Сб - Чт: 9:00 - 21:00",
    }),
    address: lt(locale, {
      ar: siteConfig.contact.addressAr,
      en: "Beyoğlu, Istanbul, Turkey",
      tr: "Beyoğlu, İstanbul, Türkiye",
      fr: "Beyoğlu, Istanbul, Turquie",
      ru: "Бейоглу, Стамбул, Турция",
    }),
  };

  /** خريطة عناوين أعمدة الفوتر لمفاتيح الترجمة */
  const columnTitleKey: Record<string, string> = {
    "روابط سريعة": "quickLinks",
    "الدعم والسياسات": "supportPolicies",
    "خدماتنا": "ourServices",
  };

  /** خريطة عناوين روابط الفوتر لمفاتيح الترجمة */
  const linkTitleKey: Record<string, string> = {
    "الرئيسية": "home",
    "الخدمات": "services",
    "العروض": "offers",
    "الخطط السنوية": "plans",
    "الحجز السريع": "quickBooking",
    "المدونة": "blog",
    "من نحن": "about",
    "اتصل بنا": "contact",
    "الأسئلة الشائعة": "faq",
    "مركز المساعدة": "help",
    "سياسة الخصوصية": "privacy",
    "الشروط والأحكام": "terms",
  };

  /** ترجمة عنوان عمود الفوتر */
  const getColumnTitle = (originalTitle: string): string => {
    const key = columnTitleKey[originalTitle];
    return key ? t(key) : originalTitle;
  };

  /** ترجمة عنوان رابط في الفوتر */
  const getLinkTitle = (originalTitle: string, href: string): string => {
    const serviceSlug = href.startsWith("/services/") ? href.split("/").pop() : undefined;
    if (serviceSlug) return tServices(`serviceCards.${serviceSlug}.title`);
    const key = linkTitleKey[originalTitle];
    return key ? t(key) : originalTitle;
  };

  return (
    <footer className="bg-navy text-navy-foreground mt-auto">
      {/* زخرفة علوية ذهبية */}
      <div className="h-1 bg-linear-to-l from-gold-600 via-gold-300 to-gold-600" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* العمود الأول — اللوغو + نبذة */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-5 rounded-lg">
              <Image
                src="/images/brand/logo-transparent.webp"
                alt={siteConfig.name}
                width={768}
                height={768}
                className="h-20 w-auto sm:h-24 lg:h-[88px] object-contain shrink-0"
              />
            </Link>

            <p className="text-sm text-white/80 leading-relaxed mb-6">
              {localizedContact.description}
            </p>

            {/* ساعات العمل */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-navy-800/60 border border-gold/10">
              <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-semibold text-gold mb-1">{t("workingHours")}</div>
                <div className="text-white/90">{localizedContact.workingHours}</div>
                <div className="text-white/75 mt-1">{tCommon("fridayClosed")}</div>
              </div>
            </div>
          </div>

          {/* الأعمدة 2-4 — روابط منظّمة */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-base font-bold text-gold mb-5 relative pb-2">
                {getColumnTitle(column.title)}
                <span className="absolute bottom-0 start-0 w-12 h-0.5 bg-gold/50" />
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-white/80 hover:text-gold focus-visible:text-gold transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-gold/50 group-hover:text-gold group-hover:-translate-x-1 transition-all" />
                      <span>{getLinkTitle(link.title, link.href)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* قسم التواصل المباشر */}
        <div className="mt-12 pt-8 border-t border-navy-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* الهاتف */}
            <a
              href={`tel:${siteConfig.contact.phoneIntl}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-navy-800/50 hover:bg-navy-800 hover:border-gold/30 border border-transparent transition-all group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="text-xs text-white/75">{t("callUs")}</div>
                <div className="text-sm font-medium text-white" dir="ltr">
                  {siteConfig.contact.phoneDisplay}
                </div>
              </div>
            </a>

            {/* البريد الإلكتروني */}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-navy-800/50 hover:bg-navy-800 hover:border-gold/30 border border-transparent transition-all group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="text-xs text-white/75">{t("emailUs")}</div>
                <div className="text-sm font-medium text-white" dir="ltr">
                  {siteConfig.contact.email}
                </div>
              </div>
            </a>

            {/* العنوان */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-navy-800/50 border border-transparent">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/10">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="text-xs text-white/75">{t("address")}</div>
                <div className="text-sm font-medium text-white">
                  {localizedContact.address}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── صف المبدّلين: تبديل اللغة + الوضع الليلي/النهاري ── */}
        <div className="mt-10 pt-6 border-t border-navy-700/50 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80">{t("languageAndMode")}</span>
            <LanguageSwitcher compact />
            <ThemeToggle />
          </div>
          <div className="text-xs text-white/70">
            {t("languageModeHint")}
          </div>
        </div>

        {/* صف السوشال ميديا + حقوق النشر */}
        <div className="mt-8 pt-8 border-t border-navy-700/50 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* حقوق النشر */}
          <div className="text-sm text-white/80 text-center lg:text-right">
            © {currentYear} <span className="text-gold font-semibold">CASANOSTRA</span> —
            {t("rights")}.
          </div>

          {/* روابط سوشال ميديا */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/80 ml-2">{t("followUs")}</span>
            <SocialLink href={siteConfig.social.instagram} label={t("instagram")}>
              <Instagram className="w-4 h-4" />
            </SocialLink>
            <SocialLink href={siteConfig.social.facebook} label={t("facebook")}>
              <Facebook className="w-4 h-4" />
            </SocialLink>
            <SocialLink href={siteConfig.social.twitter} label={t("twitter")}>
              <XLogo className="w-4 h-4" />
            </SocialLink>
            <SocialLink href={siteConfig.social.tiktok} label={t("tiktok")}>
              <TikTokIcon className="w-4 h-4" />
            </SocialLink>
            <SocialLink href={siteConfig.social.youtube} label={t("youtube")}>
              <Youtube className="w-4 h-4" />
            </SocialLink>
            <a
              href={buildSimpleWhatsAppLink(tWhatsapp("defaultMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("contact")}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#25D366] text-white hover:scale-110 transition-transform"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* صف روابط قانونية صغيرة */}
        <div className="mt-6 pt-6 border-t border-navy-700/30 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/75">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              {t("privacy")}
            </Link>
            <span className="text-white/50">|</span>
            <Link href="/terms" className="hover:text-gold transition-colors">
              {t("terms")}
            </Link>
            <span className="text-white/50">|</span>
            <Link href="/faq" className="hover:text-gold transition-colors">
              {t("faq")}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Send className="w-3 h-3 text-gold/50" />
            <span>{t("madeInIstanbul")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * رابط سوشال ميديا بحجم موحّد وتأثير مرور ذهبي.
 */
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-800 text-white/90 hover:bg-gold hover:text-navy transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {children}
    </a>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18.9 2h3.2l-7 8L23.4 22h-6.4l-5-6.5-5.7 6.5H2.9l7.5-8.6L.7 2h6.5l4.5 6.1L18.9 2Zm-1.1 18.4h1.8L7.1 3.5H5.2l12.6 16.9Z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16.4 3c.5 1.6 1.7 2.8 3.3 3.4v2.7a6.7 6.7 0 0 1-3.3-1V13a5.7 5.7 0 1 1-5.7-5.7c.2 0 .4 0 .6.1v2.9c-.2-.1-.4-.1-.6-.1a2.8 2.8 0 0 0 0 5.6 2.8 2.8 0 0 0 0-5.6c.2 0 .4 0 .6.1V5.7A8.4 8.4 0 0 0 16.4 3Z" />
    </svg>
  );
}

/**
 * أيقونة واتساب (مكرّرة هنا لاستقلالية الفوتر — لا تعتمد على Header).
 */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
