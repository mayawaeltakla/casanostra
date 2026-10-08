import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Proxy التوطين (Next.js 16) — يفاوض اللغة من بادئة URL أولاً،
 * ثم من كوكي `casanostra-locale` أو ترويسة accept-language عند غيابها
 * (مثل زيارة `/` مباشرة)، ويعيد التوجيه إلى المسار المُبَدَّأ.
 * يضيف أيضاً ترويسات Link البديلة لمحركات البحث.
 */
export default createMiddleware(routing);

export const config = {
  // طابق كل المسارات عدا:
  // - التي تبدأ بـ /api أو /trpc أو /_next أو /_vercel
  // - التي تحتوي نقطة (ملفات ثابتة: favicon.ico, sitemap.xml, الصور...)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
