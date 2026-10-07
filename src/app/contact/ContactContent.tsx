"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

/* ============================================================================
 *  CASANOSTRA — صفحة {t("title")} (/contact)
 * ============================================================================
 *
 *  البنية:
 *    1. Hero: عنوان + وصف
 *    2. شبكة 2 أعمدة:
 *       - اليمين: {t("infoTitle")} (هاتف + بريد + عنوان + ساعات عمل)
 *                 + أزرار {t("whatsappBtn")} والهاتف
 *       - اليسار: نموذج تواصل (الاسم/البريد/الهاتف/الرسالة) → يفتح mailto
 *    3. خريطة إسطنبول (Google Maps iframe)
 * ============================================================================ */

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialData: FormData = { name: "", email: "", phone: "", message: "" };

export function ContactContent() {
  const formId = useId();
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const t = useTranslations("contact");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = t("validationNameRequired");
    if (!formData.email.trim()) {
      newErrors.email = t("validationEmailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validationEmailInvalid");
    }
    if (!formData.message.trim()) newErrors.message = t("validationMessageRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 600));

    const subject = t("emailSubject", { name: formData.name });
    const body = t("emailBody", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || t("notProvided"),
      message: formData.message,
    });

    const mailtoLink = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setFormData(initialData);
    }, 5000);
  };

  return (
    <>
      {/* ================================================================
       * 1. HERO
       * ================================================================ */}
      <section className="relative bg-navy text-navy-foreground py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(201, 166, 92, 0.18) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-navy-foreground/70 mb-6">
              <Link href="/" className="hover:text-gold transition-colors">
                {tNav("home")}
              </Link>
              <ChevronLeft className="w-3 h-3" />
              <span className="text-gold">{t("title")}</span>
            </nav>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {t("title")}
            </h1>

            <p className="text-base lg:text-lg text-navy-foreground/80 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
       * 2. {t("infoTitle")} + النموذج
       * ================================================================ */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* ── {t("infoTitle")} (يمين RTL) ── */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                {t("infoTitle")}
              </h2>

              <div className="space-y-4">
                {/* الهاتف */}
                <ContactInfoCard
                  icon={Phone}
                  title={t("phoneWhatsapp")}
                  value={siteConfig.contact.phoneDisplay}
                  href={`tel:${siteConfig.contact.phoneIntl}`}
                  actionLabel={t("callNow")}
                  accent="gold"
                  dir="ltr"
                />

                {/* Email */}
                <ContactInfoCard
                  icon={Mail}
                  title={t("fieldEmail")}
                  value={siteConfig.contact.email}
                  href={`mailto:${siteConfig.contact.email}`}
                  actionLabel={t("sendEmail")}
                  accent="navy"
                  dir="ltr"
                />

                {/* {t("address")} */}
                <ContactInfoCard
                  icon={MapPin}
                  title={t("address")}
                  value={t("addressValue")}
                  accent="gold"
                />

                {/* {t("workingHours")} */}
                <div className="bg-navy text-navy-foreground rounded-2xl p-6 border border-gold/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/20">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <h4 className="text-lg font-bold text-gold">{t("workingHours")}</h4>
                  </div>
                  <p className="text-sm text-navy-foreground/80 mb-2">
                    {t("workingHoursValue")}
                  </p>
                </div>
              </div>

              {/* أزرار {t("whatsappBtn")} + الهاتف */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={buildSimpleWhatsAppLink(
                    t("whatsappMessage"),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#1ebd5a] transition-all hover:scale-105 active:scale-95"
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{t("whatsappBtn")}</span>
                </a>
                <a
                  href={`tel:${siteConfig.contact.phoneIntl}`}
                  className="group inline-flex items-center justify-center gap-2 bg-navy text-white font-bold px-5 py-3 rounded-xl hover:bg-navy-700 transition-all hover:scale-105 active:scale-95"
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{t("callBtn")}</span>
                </a>
              </div>
            </div>

            {/* ── النموذج (يسار RTL) ── */}
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-luxury">
              <div className="mb-6 pb-5 border-b border-border">
                <div className="flex items-center gap-2 text-gold-readable text-sm font-medium mb-2">
                  <Send className="w-4 h-4" />
                  <span>{t("formPrompt", { field: t("fieldMessage") })}</span>
                </div>
                <h2 className="text-2xl font-bold text-navy">{t("formTitle")}</h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {t("formSubtitle")}
                </p>
              </div>

              {status === "sent" && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-green-800 text-sm">
                      {t("successMsg")}
                    </div>
                    <div className="text-xs text-green-700 mt-1">
                      {t("successNote")}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <FieldInput id={`${formId}-name`} icon={User} label={t("fieldName")} required error={errors.name}>
                  <input
                    id={`${formId}-name`}
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder={t("namePlaceholder")}
                    aria-required="true"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                    className={inputClasses(errors.name)}
                  />
                </FieldInput>

                <FieldInput id={`${formId}-email`} icon={Mail} label={t("fieldEmail")} required error={errors.email}>
                  <input
                    id={`${formId}-email`}
                    type="email"
                    dir="ltr"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="example@email.com"
                    aria-required="true"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                    className={cn(inputClasses(errors.email), "text-left")}
                  />
                </FieldInput>

                <FieldInput id={`${formId}-phone`} icon={Phone} label={t("fieldPhone")}>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={cn(inputClasses(), "text-left")}
                  />
                </FieldInput>

                <FieldInput
                  icon={MessageSquare}
                  id={`${formId}-message`}
                  label={t("fieldMessage")}
                  required
                  error={errors.message}
                >
                  <textarea
                    id={`${formId}-message`}
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    placeholder={t("messagePlaceholder")}
                    rows={5}
                    aria-required="true"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                    className={cn(inputClasses(errors.message), "resize-none")}
                  />
                </FieldInput>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 font-bold text-white rounded-xl transition-all bg-navy hover:bg-navy-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed py-4"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t("sentViaEmail")}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t("submitButton")}</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  {t("mailtoNote")}{" "}
                  <span dir="ltr" className="font-medium text-gold-readable">
                    {siteConfig.contact.email}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
       * 3. خريطة إسطنبول (Google Maps iframe)
       * ================================================================ */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-gold-readable text-sm font-medium mb-3">
              <span className="w-8 h-px bg-gold" />
              <span>{t("mapTitle")}</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-navy">
              {t("mapSubtitle")}
            </h2>
          </div>

          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border-4 border-card shadow-luxury-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12037.106472309673!2d28.9747765!3d41.0370013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab76506562163%3A0xa1d44e0d5b7f1c4!2sBeyo%C4%9Flu%2C%20Istanbul!5e0!3m2!1sar!2str!4v1700000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapAccessibleTitle")}
            />
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              <span>{t("addressValue")}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ====================================================================
 *  مكوّنات مساعدة
 * ==================================================================== */

interface FieldInputProps {
  id: string;
  icon: LucideIcon;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FieldInput({
  id,
  icon: Icon,
  label,
  required,
  error,
  children,
}: FieldInputProps) {
  return (
    <div>
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium text-navy mb-1.5">
        <Icon className="w-4 h-4 text-gold" />
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

interface ContactInfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
  actionLabel?: string;
  accent: "gold" | "navy";
  dir?: "ltr" | "rtl";
}

function ContactInfoCard({
  icon: Icon,
  title,
  value,
  href,
  actionLabel,
  accent,
  dir,
}: ContactInfoCardProps) {
  const content = (
    <div className="bg-card border border-border rounded-2xl p-5 hover:border-gold/40 hover:shadow-luxury transition-all h-full">
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0",
            accent === "gold" ? "bg-gold/15" : "bg-navy/10",
          )}
        >
          <Icon
            className={cn(
              "w-6 h-6",
              accent === "gold" ? "text-gold" : "text-navy",
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-navy mb-1">{title}</h4>
          <p
            className="text-sm text-muted-foreground mb-3 break-words"
            dir={dir}
          >
            {value}
          </p>

          {href && actionLabel && (
            <a
              href={href}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                accent === "gold"
                  ? "bg-gold text-navy hover:bg-gold-300"
                  : "bg-navy text-white hover:bg-navy-700",
              )}
            >
              <span>{actionLabel}</span>
              <ChevronLeft className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return content;
}

function inputClasses(error?: string): string {
  return cn(
    "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground",
    "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
    "placeholder:text-muted-foreground/60",
    error ? "border-red-300 bg-red-50/30" : "border-border",
  );
}
