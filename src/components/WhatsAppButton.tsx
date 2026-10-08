"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

/**
 * WhatsAppButton — زر واتساب عائم ثابت أسفل الشاشة (يسار في RTL).
 *
 * المميزات:
 * - يظهر على كل الصفحات (مُضمَّن في layout.tsx).
 * - ثابت أثناء التمرير (position: fixed).
 * - يظهر بعد تمرير 200px لتفادي تغطية الهيدر عند القمة.
 * - نافذة دردشة صغيرة منبثقة عند النقر (Quick Chat).
 * - نصوص مترجمة عبر useTranslations.
 * - متجاوب: أصغر حجماً على الموبايل.
 * - تأثير نبض لافت للنظر.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [overlapsFormControl, setOverlapsFormControl] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("whatsapp");
  const locale = useLocale();
  const pathname = usePathname();
  /* RTL: الزر يساراً للعربية، ويميناً لبقية اللغات (LTR) لتفادي تغطية المحتوى. */
  const sideClasses = locale === "ar" ? "left-4 sm:left-6" : "right-4 sm:right-6";

  // إظهار الزر بعد تمرير 200px أو في الصفحة الرئيسية مباشرةً
  // (usePathname من next-intl يعيد المسار دون بادئة اللغة — طبيعي للمقارنة)
  useEffect(() => {
    const cleanPath = pathname.replace(/^\/(ar|en|tr|fr|ru)(?=\/|$)/, "") || pathname;
    const handleScroll = () => {
      setVisible(window.scrollY > 200 || cleanPath === "/");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // فحص أولي غير متزامن لتفادي تحذير setState المتزامن
    const rafId = requestAnimationFrame(handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  useEffect(() => {
    let frameId = 0;
    const updatePosition = () => {
      if (!visible) {
        setOverlapsFormControl(false);
        return;
      }

      const button = buttonRef.current;
      if (!button) return;

      const buttonRect = button.getBoundingClientRect();
      const overlaps = Array.from(
        document.querySelectorAll<HTMLElement>(
          "form input, form select, form textarea, form button[type='submit']",
        ),
      ).some((control) => {
        const rect = control.getBoundingClientRect();
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.top < window.innerHeight &&
          rect.right > buttonRect.left &&
          rect.left < buttonRect.right &&
          rect.bottom > buttonRect.top &&
          rect.top < buttonRect.bottom
        );
      });

      setOverlapsFormControl(overlaps);
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updatePosition);
    };
    const observer = new MutationObserver(scheduleUpdate);

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, true);
    window.addEventListener("resize", scheduleUpdate);
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate, true);
      window.removeEventListener("resize", scheduleUpdate);
      observer.disconnect();
    };
  }, [visible]);

  const handleClick = () => {
    // فتح رابط واتساب مباشرة في تبويب جديد
    window.open(buildSimpleWhatsAppLink(t("defaultMessage")), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* نافذة الدردشة المنبثقة الصغيرة */}
      {chatOpen && (
        <div
          className={cn(
            `fixed bottom-24 ${sideClasses} z-50 w-[320px] max-w-[calc(100vw-2rem)]`,
            "bg-card rounded-2xl shadow-luxury-lg border border-border overflow-hidden animate-scale-in",
          )}
        >
          {/* رأس النافذة */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm">CASANOSTRA</div>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label={t("close")}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* محتوى المحادثة */}
          <div className="p-4 bg-background">
            <div className="bg-muted rounded-2xl rounded-tr-sm p-3 text-sm text-foreground mb-3 max-w-[85%]">
              {t("greeting")}
              <br />
              {t("howCanHelp")}
            </div>
            <div className="bg-muted rounded-2xl rounded-tr-sm p-3 text-sm text-foreground mb-4 max-w-[85%]">
              {t("readyToHelp")}
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>• {t("topic1")}</li>
                <li>• {t("topic2")}</li>
                <li>• {t("topic3")}</li>
                <li>• {t("topic4")}</li>
              </ul>
            </div>

            <button
              onClick={handleClick}
              className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {t("startChat")}
            </button>
          </div>
        </div>
      )}

      {/* الزر العائم */}
      <button
        ref={buttonRef}
        onClick={() => setChatOpen(!chatOpen)}
        className={cn(
          `fixed bottom-6 ${sideClasses} z-50`,
          "flex items-center justify-center",
          "w-14 h-14 sm:w-16 sm:h-16",
          "bg-[#25D366] text-white rounded-full",
          "shadow-[0_8px_24px_-4px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_32px_-4px_rgba(37,211,102,0.7)]",
          "hover:scale-110 active:scale-95",
          "transition-all duration-300",
          visible && !overlapsFormControl
            ? "opacity-100 translate-y-0"
            : overlapsFormControl
              ? "opacity-0 pointer-events-none transition-none"
              : "opacity-0 translate-y-10 pointer-events-none",
        )}
        tabIndex={overlapsFormControl ? -1 : undefined}
        aria-label={t("contactViaWhatsapp")}
      >
        {/* حلقة نبض خلف الزر */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

        {/* أيقونة واتساب أو إغلاق */}
        {chatOpen ? (
          <X className="w-6 h-6 relative z-10" />
        ) : (
          <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" />
        )}

      </button>
    </>
  );
}

/**
 * أيقونة واتساب الرسمية.
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
