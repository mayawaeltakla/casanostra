import { getRequestConfig } from "next-intl/server";
import { getMessages, isValidLocale, defaultLocale } from "./messages";
import {
  aboutMessages,
  faqMessages,
  contactMessages,
  quickBookingMessages,
  servicesPageMessages,
  offersPageMessages,
  plansPageMessages,
  serviceFormsMessages,
} from "./page-messages";

/**
 * إعداد next-intl v4 للـ Server Components — توجيه ببادئة لغوية.
 *
 * اللغة مصدرها segment الـ URL ([locale]) عبر `requestLocale`
 * (يضبطها `setRequestLocale` في اللياوت أو الـ proxy)، لا الكوكي.
 * الكوكي يُستخدم فقط كاحتياط أخير لتوافق الإصدارات السابقة.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  let locale = defaultLocale;

  if (isValidLocale(requested || "")) {
    locale = requested as typeof defaultLocale;
  } else {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const localeCookie = cookieStore.get("casanostra-locale")?.value;
      if (isValidLocale(localeCookie || "")) {
        locale = localeCookie as typeof defaultLocale;
      }
    } catch {
      /* fallback للّغة الافتراضية */
    }
  }

  /* الرسائل الأساسية */
  const baseMessages = getMessages(locale);

  /* دمج رسائل الصفحات الداخلية */
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

  return {
    locale,
    messages,
  };
});
