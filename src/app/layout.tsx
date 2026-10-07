import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  getMessages,
  isValidLocale,
  defaultLocale,
  isRTL,
  type Locale,
} from "@/i18n/messages";
import {
  aboutMessages,
  faqMessages,
  contactMessages,
  quickBookingMessages,
  servicesPageMessages,
  offersPageMessages,
  plansPageMessages,
  serviceFormsMessages,
} from "@/i18n/page-messages";

/**
 * خط Cairo — الخط الأساسي للموقع (للعناوين والنصوص).
 * متغير: var(--font-cairo) — يُستخدم في tailwind.config.ts وفي globals.css.
 * يحمّل الأوزان 400/500/600/700/800 لتغطية جميع الاحتياجات البصرية.
 */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

/**
 * خط Tajawal — خط بديل للنصوص الطويلة (للمقالات والفقرات).
 * متغير: var(--font-tajawal)
 */
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
  preload: false,
});

/**
 * Metadata شاملة لتحسين SEO — عنوان، وصف، كلمات مفتاحية، Open Graph، Twitter.
 */
const defaultMetadata: Metadata = {
  metadataBase: new URL("https://casanostra.com"),
  title: {
    default: "CASANOSTRA | وكالة السياحة الفاخرة في تركيا",
    template: "%s | CASANOSTRA",
  },
  description:
    "CASANOSTRA — وكالة سياحة فاخرة في تركيا تقدم باقات سياحية متكاملة، جولات خاصة، حجوزات فنادق فخمة، وخدمات VIP على مدار الساعة. اكتشف تركيا بأناقة.",
  keywords: [
    "سياحة تركيا",
    "CASANOSTRA",
    "باقات سياحية تركيا",
    "جولات إسطنبول",
    "كابادوكيا",
    "أنطاليا",
    "حجز فنادق تركيا",
    "وكالة سياحة فاخرة",
    "تركيا VIP",
    "رحلات عائلية تركيا",
  ],
  authors: [{ name: "CASANOSTRA Team" }],
  creator: "CASANOSTRA",
  publisher: "CASANOSTRA",
  icons: {
    icon: "/images/brand/logo.jpg",
    apple: "/images/brand/logo.jpg",
  },
  alternates: {
    canonical: "/",
    languages: {
      "ar-TR": "/",
    },
  },
  openGraph: {
    title: "CASANOSTRA | وكالة السياحة الفاخرة في تركيا",
    description:
      "باقات سياحية متكاملة، جولات خاصة، فنادق فخمة، وخدمات VIP في تركيا. اكتشف تركيا بأناقة مع CASANOSTRA.",
    url: "https://casanostra.com",
    siteName: "CASANOSTRA",
    locale: "ar_TR",
    type: "website",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "CASANOSTRA — السياحة الفاخرة في تركيا",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CASANOSTRA | وكالة السياحة الفاخرة في تركيا",
    description:
      "باقات سياحية متكاملة، جولات خاصة، فنادق فخمة، وخدمات VIP في تركيا.",
    images: ["/images/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("casanostra-locale")?.value;
  const locale: Locale = isValidLocale(localeCookie || "")
    ? localeCookie as Locale
    : defaultLocale;
  const localizedMetadata = getMessages(locale).metadata;
  const openGraphLocale = {
    ar: "ar_TR",
    en: "en_US",
    tr: "tr_TR",
    fr: "fr_FR",
    ru: "ru_RU",
  }[locale];

  return {
    ...defaultMetadata,
    title: {
      default: localizedMetadata.title,
      template: "%s | CASANOSTRA",
    },
    description: localizedMetadata.description,
    keywords:
      locale === "ar"
        ? defaultMetadata.keywords
        : ["CASANOSTRA", localizedMetadata.title],
    openGraph: {
      ...defaultMetadata.openGraph,
      title: localizedMetadata.title,
      description: localizedMetadata.description,
      locale: openGraphLocale,
      images: [
        {
          url: "/images/og-cover.jpg",
          width: 1200,
          height: 630,
          alt: localizedMetadata.title,
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: localizedMetadata.title,
      description: localizedMetadata.description,
    },
  };
}

/**
 * Viewport — مطلوب في Next.js 16 كـ export منفصل.
 * يضمن عرضاً متجاوباً صحيحاً على جميع الأجهزة (mobile-first).
 */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F1E3D" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1E3D" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* قراءة اللغة من cookie */
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("casanostra-locale")?.value;
  const locale: Locale = isValidLocale(localeCookie || "")
    ? (localeCookie as Locale)
    : defaultLocale;
  /* الرسائل الأساسية + رسائل الصفحات الداخلية */
  const baseMessages = getMessages(locale);
  const messages = {
    ...baseMessages,
    about: aboutMessages[locale] || aboutMessages.ar,
    faq: faqMessages[locale] || faqMessages.ar,
    contact: contactMessages[locale] || contactMessages.ar,
    quickBooking: quickBookingMessages[locale] || quickBookingMessages.ar,
    servicesPage: servicesPageMessages[locale] || servicesPageMessages.ar,
    offersPage: offersPageMessages[locale] || offersPageMessages.ar,
    plansPage: plansPageMessages[locale] || plansPageMessages.ar,
    serviceForms: serviceFormsMessages[locale] || serviceFormsMessages.ar,
  };
  const rtl = isRTL(locale);

  return (
    <html
      lang={locale}
      dir={rtl ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${cairo.variable} ${tajawal.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        {/*
         * تطبيق الثيم قبل أول رسم لمنع وميض الوضع الفاتح (FOUC).
         * سكربت متزامن كأول عنصر في body (نهج next-themes نفسه): يُنفَّذ أثناء
         * التحليل قبل رسم أي محتوى. يطابق منطق ThemeToggle حرفيًا: المفتاح
         * "theme"، وداكن فقط عند "dark". بدونه، أي تحميل كامل (مثل تبديل
         * اللغة) يرسم فاتحًا ثم ينقلب لداكن بعد hydration.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`,
          }}
        />
          {/* NextIntlClientProvider — يوفّر الرسائل واللغة الحالية */}
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* الهيدر الثابت في الأعلى */}
            <Header />

            {/* المحتوى الرئيسي */}
            <main className="flex-1">{children}</main>

            {/* الفوتر يظهر أسفل الشاشة دائماً */}
            <Footer />

            {/* زر واتساب عائم ثابت في كل الصفحات */}
            <WhatsAppButton />

            {/* نظام إشعارات shadcn/ui */}
            <Toaster />
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
