import { getRequestConfig } from "next-intl/server";
import { getMessages, isValidLocale, defaultLocale } from "./messages";
import {
  aboutMessages,
  faqMessages,
  contactMessages,
  quickBookingMessages,
  servicesPageMessages,
  offersPageMessages,
  serviceFormsMessages,
} from "./page-messages";

/**
 * إعداد next-intl v4 للـ Server Components.
 *
 * يقرأ اللغة من cookie ويوفّر الرسائل الأساسية + رسائل الصفحات الداخلية.
 */
export default getRequestConfig(async () => {
  let locale = defaultLocale;

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
    serviceForms: serviceFormsMessages[locale] || serviceFormsMessages.ar,
  };

  return {
    locale,
    messages,
  };
});
