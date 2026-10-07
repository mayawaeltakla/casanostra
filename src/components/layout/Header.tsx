"use client";

import Link from "next/link";
import Image from "next/image";
import { useId, useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Calendar,
  Compass,
  Building2,
  FileCheck,
  Car,
  Hotel,
  MapPin,
  CarTaxiFront,
  Users,
  MoonStar,
  HeartPulse,
  MoreHorizontal,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  navItems,
  siteConfig,
  servicesList,
} from "@/lib/site-config";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { lt } from "@/lib/locale-text";

/* ====================================================================
 *  خريطة الأيقونات
 * ==================================================================== */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  FileCheck,
  Car,
  Hotel,
  MapPin,
  Plane: Compass,
  CarTaxiFront,
  Users,
  MoonStar,
  HeartPulse,
  MoreHorizontal,
  Compass,
};

/** مفتاح الترجمة لكل عنصر تنقّل (title الحالي عربي فقط، نوافقه مع مفاتيح next-intl) */
const navTitleKey: Record<string, string> = {
  "الرئيسية": "home",
  "الخدمات": "services",
  "العروض": "offers",
  "الخطط السنوية": "plans",
  "الحجز السريع": "quickBooking",
  "المدونة": "blog",
  "من نحن": "about",
  "اتصل بنا": "contact",
};

/* ====================================================================
 *  Header — الهيدر الكامل
 *
 *  الترتيب (RTL):
 *    أقصى اليمين: اللوغو + اسم CASANOSTRA
 *    الوسط: روابط التنقّل + زر اللغة
 *    أقصى اليسار: زر الوضع الليلي + أيقونات السوشال + هامبرغر
 * ==================================================================== */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesMenuId = useId();
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tWhatsapp = useTranslations("whatsapp");
  const tServices = useTranslations("servicesPage");
  const localizedContact = {
    workingHours: lt(locale, {
      ar: siteConfig.contact.workingHours,
      en: "Sat - Thu: 9:00 AM - 9:00 PM",
      tr: "Cum - Per: 09:00 - 21:00",
      fr: "Sam - Jeu : 9:00 - 21:00",
      ru: "Сб - Чт: 9:00 - 21:00",
    }),
  };

  /** ترجمة عنوان عنصر التنقّل العربي إلى اللغة الحالية */
  const getNavTitle = (arabicTitle: string): string => {
    const key = navTitleKey[arabicTitle];
    return key ? tNav(key) : arabicTitle;
  };

  /** ترجمة وصف الخدمة — نعتمد على shortDescription العربي حالياً (يُحسَّن لاحقاً) */
  const getServiceDesc = (desc: string): string => desc;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    const rafId = requestAnimationFrame(handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        mobileOpen ? "transition-none" : "transition-all duration-300",
        scrolled
          ? "bg-background/95 shadow-luxury border-b border-border"
          : "bg-background/80",
        !mobileOpen && (scrolled ? "backdrop-blur-luxury" : "backdrop-blur-sm"),
      )}
    >
      {/* ─────────────────────────────────────────────────────────────
       *  الشريط العلوي الأزرق — هاتف + أوقات العمل
       * ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:block bg-navy text-navy-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <a
                href={`tel:${siteConfig.contact.phoneIntl}`}
                className="hover:text-gold transition-colors"
                dir="ltr"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </span>
            <span className="flex items-center gap-1.5 text-navy-foreground/80">
              <Calendar className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              {localizedContact.workingHours}
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
       *  الهيدر الرئيسي
       * ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24 gap-3 sm:gap-4 relative">

          {/* ═══ أقصى اليمين: اللوغو + اسم CASANOSTRA ═══ */}
          <Link href="/" className="flex items-center group flex-shrink-0 z-10 rounded-lg">
            <Image
              src="/images/brand/logo-transparent.png"
              alt={siteConfig.name}
              width={768}
              height={768}
              sizes="(min-width: 1024px) 92px, (min-width: 640px) 74px, 56px"
              priority
              className="h-14 w-auto sm:h-16 lg:h-[84px] object-contain shrink-0"
            />
          </Link>

          {/* ═══ وسط: روابط التنقّل + زر اللغة ═══ */}
          <div className="hidden lg:flex items-center gap-3 z-10">
            <nav className="flex items-center gap-0 xl:gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const displayTitle = getNavTitle(item.title);

                if (item.dropdown) {
                  return (
                    <div
                      key={item.title}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={(event) => {
                        if (!event.currentTarget.contains(document.activeElement)) {
                          setServicesOpen(false);
                        }
                      }}
                      onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                          setServicesOpen(false);
                        }
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Escape" && servicesOpen) {
                          event.preventDefault();
                          setServicesOpen(false);
                          servicesTriggerRef.current?.focus();
                        }
                      }}
                    >
                      <button
                        ref={servicesTriggerRef}
                        type="button"
                        onClick={() => setServicesOpen((open) => !open)}
                        className={cn(
                          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
                          isActive
                            ? "text-gold-readable"
                            : "text-navy hover:text-gold-readable hover:bg-gold/5",
                        )}
                        aria-expanded={servicesOpen}
                        aria-controls={servicesMenuId}
                      >
                        {displayTitle}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            servicesOpen && "rotate-180",
                          )}
                        />
                      </button>

                      <div
                        id={servicesMenuId}
                        hidden={!servicesOpen}
                        className="absolute top-full start-0 w-[640px] pt-2"
                      >
                          <div className="bg-card border border-border rounded-2xl shadow-luxury-lg overflow-hidden animate-slide-down">
                          <div className="grid grid-cols-2 gap-1 p-3">
                            {item.dropdown.map((service) => {
                              const slug = service.href.split("/").pop() || "";
                              const serviceKey = `serviceCards.${slug}`;
                              const Icon =
                                iconMap[
                                  servicesList.find(
                                    (s) => s.slug === service.href.split("/").pop(),
                                  )?.icon || "Compass"
                                ] || Compass;

                              return (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  onClick={() => setServicesOpen(false)}
                                  className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gold/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                                >
                                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy/5 group-hover:bg-gold/10 transition-colors flex-shrink-0">
                                    <Icon className="w-5 h-5 text-navy group-hover:text-gold transition-colors" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm text-navy group-hover:text-gold-readable transition-colors">
                                      {tServices(`${serviceKey}.title`)}
                                    </div>
                                    {service.description && (
                                      <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                        {tServices(`${serviceKey}.description`)}
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          <Link
                            href="/services"
                            onClick={() => setServicesOpen(false)}
                            className="block bg-navy text-navy-foreground text-center py-3 text-sm font-medium hover:bg-navy-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                          >
                            {tNav("viewAllServices")}
                          </Link>
                          </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setServicesOpen(false)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      item.highlight
                        ? "bg-gold text-navy hover:bg-gold-400 shadow-gold font-bold"
                        : isActive
                          ? "text-gold-readable"
                          : "text-navy hover:text-gold-readable hover:bg-gold/5",
                    )}
                  >
                    {displayTitle}
                  </Link>
                );
              })}
            </nav>

            {/* زر اللغة بجانب روابط التنقّل */}
            <LanguageSwitcher compact />
          </div>

          {/* ═══ أقصى اليسار: زر الوضع الليلي + أيقونات السوشال + هامبرغر ═══ */}
          <div className="flex items-center gap-2 flex-shrink-0 z-10">

            {/* زر اللغة — موبايل فقط (ديسكتوب لديه زر في الوسط) */}
            <div className="lg:hidden">
              <LanguageSwitcher compact />
            </div>

            {/* أيقونات السوشال ميديا + واتساب — ديسكتوب فقط */}
            <div className="hidden lg:flex items-center gap-1.5 mr-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tFooter("instagram")}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 hover:text-gold hover:bg-gold/5 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tFooter("facebook")}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 hover:text-gold hover:bg-gold/5 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tFooter("twitter")}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 hover:text-gold hover:bg-gold/5 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tFooter("youtube")}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-600 hover:text-gold hover:bg-gold/5 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={buildSimpleWhatsAppLink(tWhatsapp("defaultMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tNav("contactViaWhatsapp")}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-[#25D366] hover:text-[#1ebd5a] hover:bg-[#25D366]/5 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>

            {/* زر الوضع الليلي/النهاري — أقصى اليسار */}
            <ThemeToggle />

            {/* زر القائمة — موبايل فقط */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-navy hover:bg-gold/5 rounded-lg transition-colors"
              aria-label={tNav("openMenu")}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
       *  قائمة الموبايل الكاملة
       * ───────────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 isolate bg-background animate-fade-in"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div className="flex items-center justify-between h-20 px-4 border-b border-border">
            <Link href="/" className="inline-flex" onClick={closeMobileMenu}>
              <Image
                src="/images/brand/logo-transparent.png"
                alt={siteConfig.name}
                width={768}
                height={768}
                className="h-14 w-auto sm:h-16 object-contain shrink-0"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-foreground transition-colors hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:bg-gold/15"
              aria-label={tNav("closeMenu")}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="container px-4 py-6 overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const displayTitle = getNavTitle(item.title);
                if (item.dropdown) {
                  return (
                    <div key={item.title} className="border-b border-border/50 last:border-0">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between rounded-lg py-3 text-foreground font-medium transition-colors hover:bg-gold/10 focus-visible:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:bg-gold/15"
                      >
                        {displayTitle}
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 transition-transform",
                            mobileServicesOpen && "rotate-180",
                          )}
                        />
                      </button>
                      {mobileServicesOpen && (
                        <div className="flex flex-col gap-1 pb-3 pr-4 border-r-2 border-gold/30 mr-2">
                          <Link
                            href="/services"
                            onClick={closeMobileMenu}
                            className="rounded-lg py-2 px-3 text-sm font-semibold text-gold-800 dark:text-gold-300 transition-colors hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:bg-gold/15"
                          >
                            {tNav("viewAllServices")}
                          </Link>
                          {item.dropdown.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              onClick={closeMobileMenu}
                              className="rounded-lg py-2 px-3 text-sm text-muted-foreground transition-colors hover:bg-gold/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:bg-gold/15"
                            >
                              {tServices(`serviceCards.${service.href.split("/").pop()}.title`)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "py-3 font-medium border-b border-border/50 last:border-0",
                      item.highlight
                        ? "bg-gold text-navy px-4 rounded-lg font-bold"
                        : "rounded-lg text-foreground transition-colors hover:bg-gold/10 hover:text-gold-readable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold active:bg-gold/15",
                    )}
                  >
                    {displayTitle}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <a
                href={`tel:${siteConfig.contact.phoneIntl}`}
                className="flex items-center gap-3 text-foreground"
                dir="ltr"
              >
                <Phone className="w-5 h-5 text-gold" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </a>
              <a
                href={buildSimpleWhatsAppLink(tWhatsapp("defaultMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-lg font-medium"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>{tNav("contactViaWhatsapp")}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ====================================================================
 *  أيقونة واتساب المخصّصة
 * ==================================================================== */
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
