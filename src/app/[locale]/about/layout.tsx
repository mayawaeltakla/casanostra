import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { aboutMessages } from "@/i18n/page-messages";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isValidLocale(raw || "")
    ? (raw as Locale)
    : defaultLocale;
  setRequestLocale(locale);

  const localized = aboutMessages[locale] || aboutMessages.ar;
  const openGraphLocale = {
    ar: "ar_TR",
    en: "en_US",
    tr: "tr_TR",
    fr: "fr_FR",
    ru: "ru_RU",
  }[locale];

  return {
    title: `${localized.title} | CASANOSTRA`,
    description: localized.intro ?? "CASANOSTRA — About us",
    keywords:
      locale === "ar"
        ? ["من نحن CASANOSTRA", "وكالة سياحة تركيا", "قيم الشركة", "مواقع CASANOSTRA"]
        : locale === "en"
          ? ["About CASANOSTRA", "Turkey tourism agency", "Our values", "CASANOSTRA locations"]
          : locale === "tr"
            ? ["CASANOSTRA hakkında", "Türkiye turizm acentesi", "Değerlerimiz", "CASANOSTRA lokasyonları"]
            : locale === "fr"
              ? ["À propos de CASANOSTRA", "Agence de tourisme en Turquie", "Nos valeurs", "Emplacements CASANOSTRA"]
              : ["О CASANOSTRA", "Туристическое агентство в Турции", "Наши ценности", "Локации CASANOSTRA"],
    openGraph: {
      title: `${localized.title} | CASANOSTRA`,
      description: localized.intro ?? "CASANOSTRA — About us",
      type: "website",
      locale: openGraphLocale,
    },
  };
}

/**
 * Layout لصفحة من نحن — يوفّر metadata ويُمرّر الأبناء.
 */
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
