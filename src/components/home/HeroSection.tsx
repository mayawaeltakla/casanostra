"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Sparkles, ArrowLeft, MessageCircle, User, Phone, Heart, CheckCircle2, XCircle } from "lucide-react";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";

/**
 * HeroSection — القسم الأول في الصفحة الرئيسية.
 *
 * - خلفية: فيديو البوسفور مع صورة محلية تظهر أثناء التحميل.
 * - overlay داكن شفاف لتحسين قراءة النص.
 * - عنوان رئيسي + عنوان فرعي.
 * - زر CTA أساسي (احجز الآن) + زر CTA ثانوي (واتساب).
 *
 * تصميم Mobile-First: النص يأخذ كامل الشاشة على الموبايل،
 * وعلى الديسكتوب يأخذ العرض الأقصى ويترك هامشاً جانبياً.
 */
export function HeroSection() {
  const t = useTranslations("home");
  const tWhatsapp = useTranslations("whatsapp");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // قرار واحد فقط عند التحميل: ملف واحد حسب حجم الشاشة الفعلي
    // لا قائمة مصادر ولا تحميل استباقي كامل، أي تنزيل واحد بلا ازدواج
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const chosen = isDesktop ? "/videos/hero-1080.mp4" : "/videos/hero-720.mp4";
    if (!video.src || !video.src.endsWith(chosen)) {
      video.src = chosen;
      video.load(); // يجلب الميتاداتا فقط أولاً، ثم التشغيل يبث الملف تدفقاً واحداً
    }
    video.play().catch(() => {});

    // جاهزية أول إطار تُطلق الفاد إن
    const revealVideo = () => setVideoReady(true);
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) revealVideo();
    video.addEventListener("loadeddata", revealVideo);
    video.addEventListener("playing", revealVideo);

    return () => {
      video.removeEventListener("loadeddata", revealVideo);
      video.removeEventListener("playing", revealVideo);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* بوستر متجاوب يبقى ظاهراً حتى يبدأ الفيديو */}
      <picture className="absolute inset-0">
        <source
          srcSet="/videos/poster-hero-mobile.webp"
          media="(max-width: 767px)"
        />
        <img
          src="/videos/poster-hero.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      </picture>
      <video
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* طبقة overlay داكنة متدرّجة لتحسين التباين */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 30, 61, 0.85) 0%, rgba(15, 30, 61, 0.65) 50%, rgba(15, 30, 61, 0.85) 100%)",
        }}
      />
      {/* توهج ذهبي خفيف من الأعلى */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(201, 166, 92, 0.18) 0%, transparent 60%)",
        }}
      />

      {/* المحتوى */}
      <div className="relative z-10 container mx-auto px-4 py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* النص الرئيسي */}
          <div className="max-w-4xl flex-1">
          {/* شارة علوية */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-gold/40 text-gold px-4 py-1.5 rounded-full text-sm mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>{t("heroBadge")}</span>
          </div>

          {/* العنوان الرئيسي */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-white animate-fade-in">
            {t("heroTitle")}
          </h1>

          {/* العنوان الفرعي */}
          <p className="text-base sm:text-lg lg:text-xl text-white/85 mb-10 leading-relaxed max-w-3xl animate-fade-in">
            {t("heroSubtitle")}
          </p>

          {/* أزرار CTA */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            {/* زر أساسي: احجز الآن → صفحة الخدمات */}
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl shadow-gold hover:bg-gold-300 transition-all hover:scale-105 active:scale-95"
            >
              <span>{t("heroBookNow")}</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>

            {/* زر ثانوي: واتساب */}
            <a
              href={buildSimpleWhatsAppLink(tWhatsapp("defaultMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#1ebd5a] transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t("heroWhatsApp")}</span>
            </a>
          </div>

          </div>

          {/* ── بطاقة جانبية: الاسم / الهاتف / الاهتمام ── */}
          <HeroContactCard />
        </div>
      </div>

      {/* مؤشر التمرير في الأسفل */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60 animate-fade-in">
        <span className="text-xs">{t("heroBookNow")}</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gold rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
 *  HeroContactCard — بطاقة جانبية على صورة المسجد
 *
 *  تحتوي 3 حقول: الاسم، رقم الهاتف، الاهتمام
 *  - إذا كانت كل الحقول مكتملة → يظهر نص "شكراً لتواصلكم" + زر واتساب
 *  - إذا كانت ناقصة → يظهر نص "البيانات غير مكتملة"
 * ==================================================================== */

function HeroContactCard() {
  const fieldId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const t = useTranslations("home");

  const isComplete = Boolean(name.trim() && phone.trim() && interest.trim());

  const whatsappLink = buildSimpleWhatsAppLink(
    t("heroContactMessage", { name, phone, interest }),
  );

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      <div className="bg-white/10 backdrop-blur-md border border-gold/30 rounded-2xl p-5 shadow-luxury-lg">
        {/* عنوان البطاقة */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-gold" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {t("heroContactTitle")}
          </h3>
        </div>

        {/* حقل الاسم */}
        <div className="mb-3">
          <label htmlFor={`${fieldId}-name`} className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
            <User className="w-3 h-3 text-gold" />
            <span>{t("heroContactName")}</span>
          </label>
          <input
            id={`${fieldId}-name`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("heroContactNamePlaceholder")}
            className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all"
          />
        </div>

        {/* حقل الهاتف */}
        <div className="mb-3">
          <label htmlFor={`${fieldId}-phone`} className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
            <Phone className="w-3 h-3 text-gold" />
            <span>{t("heroContactPhone")}</span>
          </label>
          <input
            id={`${fieldId}-phone`}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            dir="ltr"
            className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all text-left"
          />
        </div>

        {/* حقل الاهتمام */}
        <div className="mb-4">
          <label htmlFor={`${fieldId}-interest`} className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
            <Heart className="w-3 h-3 text-gold" />
            <span>{t("heroContactInterest")}</span>
          </label>
          <input
            id={`${fieldId}-interest`}
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder={t("heroContactInterestPlaceholder")}
            className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all"
          />
        </div>

        {/* رسالة الحالة */}
        {isComplete ? (
          <div className="mb-3 p-2.5 rounded-lg bg-green-500/20 border border-green-400/30 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-xs text-green-300 font-medium">
              {t("heroContactComplete")}
            </span>
          </div>
        ) : (
          <div className="mb-3 p-2.5 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="text-xs text-amber-300 font-medium">
              {t("heroContactIncomplete")}
            </span>
          </div>
        )}

        {/* زر واتساب */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${
            isComplete
              ? "bg-[#25D366] text-white hover:bg-[#1ebd5a] shadow-lg shadow-green-500/30"
              : "bg-white/10 text-white/50 cursor-not-allowed"
          }`}
          onClick={(e) => {
            if (!isComplete) e.preventDefault();
          }}
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t("heroContactSend")}</span>
        </a>
      </div>
    </div>
  );
}
