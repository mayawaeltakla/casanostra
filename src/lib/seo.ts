import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { defaultLocale, isValidLocale, locales, type Locale } from "@/i18n/messages";

/* ============================================================================
 *  أدوات SEO مشتركة: canonical ذاتي + hreflang للغات الخمس + Open Graph
 *  (القالب "%s | CASANOSTRA" في layout يضيف اسم الموقع — لا تكرّره في العنوان)
 * ============================================================================ */

export function resolveLocale(raw?: string): Locale {
  return raw && isValidLocale(raw) ? (raw as Locale) : defaultLocale;
}

const OG_LOCALE: Record<Locale, string> = {
  ar: "ar_TR",
  en: "en_US",
  tr: "tr_TR",
  fr: "fr_FR",
  ru: "ru_RU",
};

/** route: "" للرئيسية، أو "/services" ، "/blog/slug" ... */
export function pageAlternates(locale: Locale, route = ""): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `/${locale}${route}`,
    languages: {
      ...Object.fromEntries((locales as readonly string[]).map((l) => [l, `/${l}${route}`])),
      "x-default": `/${defaultLocale}${route}`,
    },
  };
}

export function buildPageMetadata(opts: {
  locale: Locale;
  route?: string;
  title: string;
  description: string;
  /** افتراضياً مفهرسة؛ مرّر false لإخفاء الصفحة */
  index?: boolean;
  image?: string;
}): Metadata {
  const { locale, route = "", description, index = true } = opts;
  /* القالب في layout يضيف "| CASANOSTRA" — نُزيل اللاحقة المكرّرة إن وُجدت */
  const title = opts.title.replace(/\s*[|\-–]\s*CASANOSTRA\s*$/i, "").trim();
  const image = opts.image ?? "/images/og-cover.jpg";
  return {
    title,
    description,
    alternates: pageAlternates(locale, route),
    robots: { index, follow: true },
    openGraph: {
      title: `${title} | CASANOSTRA`,
      description,
      url: `${siteConfig.url}/${locale}${route}`,
      siteName: "CASANOSTRA",
      type: "website",
      locale: OG_LOCALE[locale],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

type L5 = Record<Locale, { title: string; description: string }>;

/** عناوين/أوصاف الصفحات الثابتة بالخمس لغات (كانت إنجليزية ثابتة لكل اللغات) */
export const STATIC_PAGE_META: Record<"contact" | "faq" | "help" | "quickBooking" | "privacy" | "terms", L5> = {
  contact: {
    ar: { title: "اتصل بنا", description: "تواصل مع وكالة CASANOSTRA للسياحة في تركيا: الهاتف، واتساب، البريد الإلكتروني، نموذج التواصل وموقع مكتبنا في إسطنبول." },
    en: { title: "Contact Us", description: "Contact CASANOSTRA tourism agency in Turkey: phone, WhatsApp, email, contact form and our Istanbul office location." },
    tr: { title: "Bize Ulaşın", description: "Türkiye'deki CASANOSTRA turizm acentesiyle iletişime geçin: telefon, WhatsApp, e-posta, iletişim formu ve İstanbul ofis konumu." },
    fr: { title: "Contactez-nous", description: "Contactez l'agence de tourisme CASANOSTRA en Turquie : téléphone, WhatsApp, e-mail, formulaire de contact et adresse de notre bureau à Istanbul." },
    ru: { title: "Контакты", description: "Свяжитесь с туристическим агентством CASANOSTRA в Турции: телефон, WhatsApp, e-mail, форма обратной связи и адрес офиса в Стамбуле." },
  },
  faq: {
    ar: { title: "الأسئلة الشائعة", description: "إجابات عن أكثر الأسئلة شيوعاً حول خدمات CASANOSTRA السياحية في تركيا: الحجز، الدفع، الإلغاء، المجموعات، الاستقبال من المطار، الحج والعمرة والسياحة العلاجية." },
    en: { title: "FAQ", description: "Answers to the most common questions about CASANOSTRA tourism services in Turkey: booking, payment, cancellation, groups, airport pickup, Hajj & Umrah and medical tourism." },
    tr: { title: "Sık Sorulan Sorular", description: "Türkiye'deki CASANOSTRA turizm hizmetleri hakkında en sık sorulan sorular: rezervasyon, ödeme, iptal, gruplar, havalimanı karşılama, Hac-Umre ve sağlık turizmi." },
    fr: { title: "Questions fréquentes", description: "Réponses aux questions les plus fréquentes sur les services touristiques CASANOSTRA en Turquie : réservation, paiement, annulation, groupes, accueil à l'aéroport, Hajj et Omra, tourisme médical." },
    ru: { title: "Частые вопросы", description: "Ответы на частые вопросы об услугах CASANOSTRA в Турции: бронирование, оплата, отмена, группы, встреча в аэропорту, Хадж и Умра, медицинский туризм." },
  },
  help: {
    ar: { title: "مركز المساعدة", description: "مركز مساعدة CASANOSTRA: نموذج التواصل، واتساب، البريد الإلكتروني وساعات العمل." },
    en: { title: "Help Center", description: "CASANOSTRA help center: contact form, WhatsApp, email and working hours." },
    tr: { title: "Yardım Merkezi", description: "CASANOSTRA yardım merkezi: iletişim formu, WhatsApp, e-posta ve çalışma saatleri." },
    fr: { title: "Centre d'aide", description: "Centre d'aide CASANOSTRA : formulaire de contact, WhatsApp, e-mail et horaires d'ouverture." },
    ru: { title: "Центр помощи", description: "Центр помощи CASANOSTRA: форма обратной связи, WhatsApp, e-mail и часы работы." },
  },
  quickBooking: {
    ar: { title: "الحجز السريع", description: "اختر بسرعة من 12 خدمة سياحية متكاملة في تركيا: الإقامات، التأشيرات، السيارات VIP، الفنادق، الطيران، الجولات، الحج والعمرة والسياحة العلاجية." },
    en: { title: "Quick Booking", description: "Quickly choose from 12 integrated tourism services in Turkey: residence, visas, VIP cars, hotels, flights, tours, Hajj & Umrah and medical tourism." },
    tr: { title: "Hızlı Rezervasyon", description: "Türkiye'de 12 entegre turizm hizmeti arasından hızlıca seçin: oturma izni, vize, VIP araçlar, oteller, uçuşlar, turlar, Hac-Umre ve sağlık turizmi." },
    fr: { title: "Réservation rapide", description: "Choisissez rapidement parmi 12 services touristiques en Turquie : séjour, visas, voitures VIP, hôtels, vols, excursions, Hajj et Omra, tourisme médical." },
    ru: { title: "Быстрое бронирование", description: "Быстро выберите одну из 12 туристических услуг в Турции: ВНЖ, визы, VIP-авто, отели, авиабилеты, туры, Хадж и Умра, медицинский туризм." },
  },
  privacy: {
    ar: { title: "سياسة الخصوصية", description: "سياسة خصوصية CASANOSTRA: كيف نجمع بياناتك ونستخدمها ونحميها." },
    en: { title: "Privacy Policy", description: "CASANOSTRA privacy policy: how we collect, use and protect your data." },
    tr: { title: "Gizlilik Politikası", description: "CASANOSTRA gizlilik politikası: verilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz." },
    fr: { title: "Politique de confidentialité", description: "Politique de confidentialité de CASANOSTRA : comment nous collectons, utilisons et protégeons vos données." },
    ru: { title: "Политика конфиденциальности", description: "Политика конфиденциальности CASANOSTRA: как мы собираем, используем и защищаем ваши данные." },
  },
  terms: {
    ar: { title: "الشروط والأحكام", description: "شروط وأحكام CASANOSTRA: الدفع، الحجز، الإلغاء، تذاكر الطيران وحماية البيانات." },
    en: { title: "Terms & Conditions", description: "CASANOSTRA terms and conditions: payment, booking, cancellation, flights and data protection." },
    tr: { title: "Şartlar ve Koşullar", description: "CASANOSTRA şartlar ve koşulları: ödeme, rezervasyon, iptal, uçuşlar ve veri koruması." },
    fr: { title: "Conditions générales", description: "Conditions générales de CASANOSTRA : paiement, réservation, annulation, vols et protection des données." },
    ru: { title: "Условия использования", description: "Условия CASANOSTRA: оплата, бронирование, отмена, авиабилеты и защита данных." },
  },
};
