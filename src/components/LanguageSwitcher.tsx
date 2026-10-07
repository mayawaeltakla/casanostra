"use client";

import { useState, useRef, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

/**
 * LanguageSwitcher — زر تبديل اللغة الفعّال
 *
 * - يعرض قائمة منسدلة بـ 5 لغات
 * - يقرأ اللغة الحالية من next-intl (المُستمَدة من cookie)
 * - عند النقر على أي لغة: يضبط cookie ويُعيد تحميل الصفحة
 *   فتتم قراءة الـ cookie من جديد في layout.tsx → يتغيّر المحتوى بالكامل
 */

const LANGUAGES = [
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
] as const;

function persistLocaleCookie(locale: string) {
  document.cookie = `casanostra-locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const direction = locale === "ar" ? "rtl" : "ltr";
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = LANGUAGES.findIndex((language) => language.code === locale);
    return index >= 0 ? index : 0;
  });
  const [menuPosition, setMenuPosition] = useState<{ left: number; top: number } | null>(null);
  const listboxId = useId();
  const optionIdPrefix = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // اللغة المختارة حالياً (مستمَدة من locale المُمرَّر عبر next-intl)
  const selected =
    LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !dropdownRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const menu = dropdownRef.current;
      if (!trigger || !menu) return;

      const triggerRect = trigger.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight;
      const edgePadding = 8;
      const preferredLeft =
        direction === "rtl"
          ? triggerRect.right - menuRect.width
          : triggerRect.left;
      const left = Math.min(
        Math.max(preferredLeft, edgePadding),
        Math.max(edgePadding, viewportWidth - menuRect.width - edgePadding),
      );
      const below = triggerRect.bottom + 8;
      const top =
        below + menuRect.height <= viewportHeight - edgePadding
          ? below
          : Math.max(edgePadding, triggerRect.top - menuRect.height - 8);

      setMenuPosition({ left, top });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    window.visualViewport?.addEventListener("resize", updatePosition);
    window.visualViewport?.addEventListener("scroll", updatePosition);
    const animationFrame = window.requestAnimationFrame(updatePosition);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      window.visualViewport?.removeEventListener("resize", updatePosition);
      window.visualViewport?.removeEventListener("scroll", updatePosition);
    };
  }, [direction, isOpen]);

  useEffect(() => {
    if (isOpen && menuPosition) dropdownRef.current?.focus();
  }, [isOpen, menuPosition]);

  const handleSelect = (lang: (typeof LANGUAGES)[number]) => {
    setIsOpen(false);
    // اضبط cookie للغة الجديدة وأعِد تحميل الصفحة
    // فتتغيّر اللغة فعلياً في جميع أنحاء الموقع
    persistLocaleCookie(lang.code);
    // إعطاء المتصفح لحظة لكتابة الـ cookie قبل إعادة التحميل
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  const handleListboxKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let nextIndex = activeIndex;
    switch (event.key) {
      case "ArrowDown":
        nextIndex = (activeIndex + 1) % LANGUAGES.length;
        break;
      case "ArrowUp":
        nextIndex = (activeIndex - 1 + LANGUAGES.length) % LANGUAGES.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = LANGUAGES.length - 1;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        handleSelect(LANGUAGES[activeIndex]);
        return;
      default:
        return;
    }
    event.preventDefault();
    setActiveIndex(nextIndex);
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        ref={triggerRef}
        onClick={() => {
          setMenuPosition(null);
          setIsOpen((open) => !open);
        }}
        className={cn(
          "group flex items-center gap-1.5 rounded-lg border border-border bg-card transition-all hover:border-gold/40 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
          compact ? "px-2 py-1.5" : "px-3 py-2",
        )}
        aria-label={t("switchLanguage")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const selectedIndex = LANGUAGES.findIndex((language) => language.code === locale);
            setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
            setMenuPosition(null);
            setIsOpen(true);
          }
        }}
      >
        <Globe className="w-4 h-4 text-gold" />
        <span className="text-sm font-medium text-navy">
          {selected.flag} {compact ? selected.code.toUpperCase() : selected.name}
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen &&
        createPortal(
        <div
          ref={dropdownRef}
          id={listboxId}
          dir={direction}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${optionIdPrefix}-${LANGUAGES[activeIndex].code}`}
          aria-label={t("chooseLanguage")}
          onKeyDown={handleListboxKeyDown}
          className={cn(
            "fixed z-[100] w-48 max-h-[min(20rem,calc(100dvh-1rem))] overflow-y-auto rounded-xl border border-border bg-card text-card-foreground shadow-luxury-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
            menuPosition ? "visible" : "invisible",
          )}
          style={{
            left: menuPosition?.left ?? 8,
            top: menuPosition?.top ?? 8,
          }}
        >
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-bold text-muted-foreground border-b border-border mb-1">
              {t("chooseLanguage")}
            </div>
            <ul className="space-y-0.5">
              {LANGUAGES.map((lang, index) => (
                <li key={lang.code}>
                  <div
                    id={`${optionIdPrefix}-${lang.code}`}
                    onClick={() => handleSelect(lang)}
                    onMouseMove={() => setActiveIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-start transition-colors cursor-pointer",
                      activeIndex === index && "bg-muted",
                      selected.code === lang.code
                        ? "text-gold-800 dark:text-gold-300 font-bold"
                        : "text-foreground",
                    )}
                    role="option"
                    aria-selected={selected.code === lang.code}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="flex-1">{lang.name}</span>
                    {selected.code === lang.code && (
                      <Check className="w-4 h-4 text-gold-800 dark:text-gold-300 flex-shrink-0" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
