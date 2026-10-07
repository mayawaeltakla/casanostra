"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { lt } from "@/lib/locale-text";

/* ============================================================================
 *  مركز المساعدة — مكان لكتابة الاسم وإرسال المشكلة عبر الإيميل مع رقم الهاتف
 * ============================================================================ */

interface FormData {
  name: string;
  phone: string;
  message: string;
}

const initialData: FormData = { name: "", phone: "", message: "" };

const messages = {
  ar: {
    home: "الرئيسية", title: "مركز المساعدة", intro: "هل واجهت مشكلة أو لديك استفسار؟ أرسل لنا رسالتك عبر النموذج التالي وسيتم تحويلك إلى بريدك الإلكتروني لإرسالها مباشرةً.",
    sendMessage: "أرسل لنا رسالتك", formTitle: "نموذج المساعدة", formDescription: "املأ النموذج بالاسم ورقم الهاتف والمشكلة، وسيتم فتح برنامج البريد الإلكتروني لديك برسالة جاهزة إلى فريقنا.",
    emailOpened: "تم فتح برنامج البريد الإلكتروني", emailOpenedDescription: "أكمل إرسال الرسالة من برنامج البريد لديك.", name: "الاسم", namePlaceholder: "اكتب اسمك الكامل", phone: "رقم الهاتف", issue: "المشكلة / الاستفسار", issuePlaceholder: "اكتب وصفاً مفصلاً لمشكلتك أو استفسارك...",
    nameRequired: "الاسم مطلوب", issueRequired: "وصف المشكلة مطلوب", opening: "جاري الفتح...", sendEmail: "إرسال عبر البريد الإلكتروني", emailHint: "سيتم فتح برنامج البريد لديك برسالة جاهزة إلى",
    directContact: "أو تواصل معنا مباشرةً", chooseContact: "اختر الطريقة الأنسب لك من بين الخيارات التالية.", whatsapp: "واتساب مباشر", fastest: "تواصل عبر واتساب", email: "البريد الإلكتروني", workingHours: "أوقات العمل", emergency: "للاستفسار عن الخدمة", friday: "الجمعة: مغلق",
    emailSubject: "طلب مساعدة من {name}", greeting: "مرحباً فريق CASANOSTRA،", emailName: "الاسم", emailPhone: "رقم الهاتف", notProvided: "غير محدد", emailIssue: "المشكلة / الاستفسار", closing: "أرجو التواصل معي في أقرب وقت ممكن. شكراً لكم.", whatsappMessage: "مرحباً CASANOSTRA، أحتاج مساعدة من فريق الدعم.",
  },
  en: {
    home: "Home", title: "Help Center", intro: "Need help or have a question? Send us a message using the form and your email app will open with it ready to send.",
    sendMessage: "Send us a message", formTitle: "Help Request", formDescription: "Enter your name, phone number, and issue. Your email app will open with a prepared message for our team.",
    emailOpened: "Your email app is open", emailOpenedDescription: "Send the prepared message from your email app.", name: "Name", namePlaceholder: "Enter your full name", phone: "Phone number", issue: "Issue / question", issuePlaceholder: "Describe your issue or question...",
    nameRequired: "Name is required", issueRequired: "Please describe the issue", opening: "Opening email...", sendEmail: "Send by email", emailHint: "Your email app will open with a message addressed to",
    directContact: "Or contact us directly", chooseContact: "Choose the contact method that works best for you.", whatsapp: "WhatsApp", fastest: "Contact us via WhatsApp", email: "Email", workingHours: "Working hours", emergency: "Ask us about the service", friday: "Friday: Closed",
    emailSubject: "Help request from {name}", greeting: "Hello CASANOSTRA team,", emailName: "Name", emailPhone: "Phone", notProvided: "Not provided", emailIssue: "Issue / question", closing: "Please contact me as soon as possible. Thank you.", whatsappMessage: "Hello CASANOSTRA, I need help from the support team.",
  },
  tr: {
    home: "Ana Sayfa", title: "Yardım Merkezi", intro: "Bir sorun mu yaşıyorsunuz veya sorunuz mu var? Formu gönderin; e-posta uygulamanız gönderilmeye hazır mesajla açılır.",
    sendMessage: "Bize mesaj gönderin", formTitle: "Yardım Talebi", formDescription: "Adınızı, telefon numaranızı ve sorununuzu yazın. Ekibimize gönderilmeye hazır bir e-posta açılır.",
    emailOpened: "E-posta uygulamanız açıldı", emailOpenedDescription: "Hazırlanan mesajı e-posta uygulamanızdan gönderin.", name: "Ad", namePlaceholder: "Adınızı ve soyadınızı yazın", phone: "Telefon numarası", issue: "Sorun / soru", issuePlaceholder: "Sorununuzu veya sorunuzu açıklayın...",
    nameRequired: "Ad gereklidir", issueRequired: "Lütfen sorunu açıklayın", opening: "E-posta açılıyor...", sendEmail: "E-posta ile gönder", emailHint: "E-posta uygulamanız şu alıcıya hazır mesajla açılır:",
    directContact: "Bize doğrudan ulaşın", chooseContact: "Size en uygun iletişim yöntemini seçin.", whatsapp: "WhatsApp", fastest: "WhatsApp üzerinden bize ulaşın", email: "E-posta", workingHours: "Çalışma saatleri", emergency: "Hizmet hakkında bilgi alın", friday: "Cuma: Kapalı",
    emailSubject: "{name} için yardım talebi", greeting: "Merhaba CASANOSTRA ekibi,", emailName: "Ad", emailPhone: "Telefon", notProvided: "Belirtilmedi", emailIssue: "Sorun / soru", closing: "Lütfen en kısa sürede benimle iletişime geçin. Teşekkürler.", whatsappMessage: "Merhaba CASANOSTRA, destek ekibinden yardım almak istiyorum.",
  },
  fr: {
    home: "Accueil", title: "Centre d'aide", intro: "Un problème ou une question ? Envoyez-nous un message via le formulaire ; votre messagerie s'ouvrira avec le message prêt à envoyer.",
    sendMessage: "Envoyez-nous un message", formTitle: "Demande d'aide", formDescription: "Indiquez votre nom, votre téléphone et votre problème. Votre messagerie s'ouvrira avec un message prêt pour notre équipe.",
    emailOpened: "Votre messagerie est ouverte", emailOpenedDescription: "Envoyez le message préparé depuis votre messagerie.", name: "Nom", namePlaceholder: "Saisissez votre nom complet", phone: "Numéro de téléphone", issue: "Problème / question", issuePlaceholder: "Décrivez votre problème ou votre question...",
    nameRequired: "Le nom est obligatoire", issueRequired: "Veuillez décrire le problème", opening: "Ouverture de la messagerie...", sendEmail: "Envoyer par e-mail", emailHint: "Votre messagerie s'ouvrira avec un message destiné à",
    directContact: "Ou contactez-nous directement", chooseContact: "Choisissez le moyen de contact qui vous convient.", whatsapp: "WhatsApp", fastest: "Contactez-nous via WhatsApp", email: "E-mail", workingHours: "Horaires", emergency: "Demandez des informations sur le service", friday: "Vendredi : fermé",
    emailSubject: "Demande d'aide de {name}", greeting: "Bonjour l'équipe CASANOSTRA,", emailName: "Nom", emailPhone: "Téléphone", notProvided: "Non renseigné", emailIssue: "Problème / question", closing: "Merci de me contacter dès que possible. Merci.", whatsappMessage: "Bonjour CASANOSTRA, j'ai besoin de l'aide de l'équipe d'assistance.",
  },
  ru: {
    home: "Главная", title: "Центр помощи", intro: "Столкнулись с проблемой или есть вопрос? Отправьте сообщение через форму, и почтовое приложение откроется с готовым письмом.",
    sendMessage: "Напишите нам", formTitle: "Запрос помощи", formDescription: "Укажите имя, телефон и опишите проблему. Почтовое приложение откроется с письмом для нашей команды.",
    emailOpened: "Почтовое приложение открыто", emailOpenedDescription: "Отправьте подготовленное письмо из почтового приложения.", name: "Имя", namePlaceholder: "Введите полное имя", phone: "Номер телефона", issue: "Проблема / вопрос", issuePlaceholder: "Опишите проблему или задайте вопрос...",
    nameRequired: "Укажите имя", issueRequired: "Опишите проблему", opening: "Открываем почту...", sendEmail: "Отправить по почте", emailHint: "Почтовое приложение откроется с письмом для адреса",
    directContact: "Или свяжитесь с нами напрямую", chooseContact: "Выберите удобный способ связи.", whatsapp: "WhatsApp", fastest: "Свяжитесь с нами через WhatsApp", email: "Электронная почта", workingHours: "Часы работы", emergency: "Уточните информацию об услуге", friday: "Пятница: закрыто",
    emailSubject: "Запрос помощи от {name}", greeting: "Здравствуйте, команда CASANOSTRA!", emailName: "Имя", emailPhone: "Телефон", notProvided: "Не указано", emailIssue: "Проблема / вопрос", closing: "Пожалуйста, свяжитесь со мной как можно скорее. Спасибо.", whatsappMessage: "Здравствуйте, CASANOSTRA! Мне нужна помощь службы поддержки.",
  },
} as const;

export function HelpContent() {
  const formId = useId();
  const locale = useLocale();
  const copy = messages[locale as keyof typeof messages] ?? messages.en;
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = copy.nameRequired;
    if (!formData.message.trim()) newErrors.message = copy.issueRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 600));

    const subject = copy.emailSubject.replace("{name}", formData.name);
    const body = `${copy.greeting}

  ${copy.emailName}: ${formData.name}
  ${copy.emailPhone}: ${formData.phone || copy.notProvided}

  ${copy.emailIssue}:
${formData.message}

  ${copy.closing}`;

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
      {/* Hero */}
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
              <Link href="/" className="hover:text-gold transition-colors">{copy.home}</Link>
              <ChevronLeft className="w-3 h-3" />
              <span className="text-gold">{copy.title}</span>
            </nav>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {copy.title}
            </h1>

            <p className="text-base lg:text-lg text-navy-foreground/80 leading-relaxed">
              {copy.intro}
            </p>
          </div>
        </div>
      </section>

      {/* النموذج + بطاقات التواصل */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">

            {/* النموذج */}
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-luxury">
              <div className="mb-6 pb-5 border-b border-border">
                <div className="flex items-center gap-2 text-gold-readable text-sm font-medium mb-2">
                  <Send className="w-4 h-4" />
                  <span>{copy.sendMessage}</span>
                </div>
                <h2 className="text-2xl font-bold text-navy">{copy.formTitle}</h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {copy.formDescription}
                </p>
              </div>

              {status === "sent" && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-green-800 text-sm">{copy.emailOpened}</div>
                    <div className="text-xs text-green-700 mt-1">
                      {copy.emailOpenedDescription}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* الاسم */}
                <div>
                  <label htmlFor={`${formId}-name`} className="flex items-center gap-1.5 text-sm font-medium text-navy mb-1.5">
                    <User className="w-4 h-4 text-gold" />
                    <span>{copy.name}</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={`${formId}-name`}
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder={copy.namePlaceholder}
                    aria-required="true"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
                      "placeholder:text-muted-foreground/60",
                      errors.name ? "border-red-300 bg-red-50/30" : "border-border",
                    )}
                  />
                  {errors.name && (
                    <p id={`${formId}-name-error`} role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <span>⚠</span><span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* رقم الهاتف */}
                <div>
                  <label htmlFor={`${formId}-phone`} className="flex items-center gap-1.5 text-sm font-medium text-navy mb-1.5">
                    <Phone className="w-4 h-4 text-gold" />
                    <span>{copy.phone}</span>
                  </label>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
                      "placeholder:text-muted-foreground/60 text-left",
                      "border-border",
                    )}
                  />
                </div>

                {/* المشكلة */}
                <div>
                  <label htmlFor={`${formId}-message`} className="flex items-center gap-1.5 text-sm font-medium text-navy mb-1.5">
                    <MessageSquare className="w-4 h-4 text-gold" />
                    <span>{copy.issue}</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    placeholder={copy.issuePlaceholder}
                    rows={5}
                    aria-required="true"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
                      "placeholder:text-muted-foreground/60 resize-none",
                      errors.message ? "border-red-300 bg-red-50/30" : "border-border",
                    )}
                  />
                  {errors.message && (
                    <p id={`${formId}-message-error`} role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <span>⚠</span><span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* زر الإرسال */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 font-bold text-white rounded-xl transition-all bg-navy hover:bg-navy-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed py-4"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{copy.opening}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{copy.sendEmail}</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  {copy.emailHint}{" "}
                  <span dir="ltr" className="font-medium text-gold-readable">{siteConfig.contact.email}</span>
                </p>
              </form>
            </div>

            {/* بطاقات التواصل البديل */}
            <div className="space-y-6">
              <div className="text-center lg:text-right mb-2">
                <h3 className="text-2xl font-bold text-navy mb-2">{copy.directContact}</h3>
                <p className="text-sm text-muted-foreground">
                  {copy.chooseContact}
                </p>
              </div>

              {/* واتساب */}
              <a
                href={buildSimpleWhatsAppLink(copy.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-gold/40 hover:shadow-luxury transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#25D366]/15 flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#25D366]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-navy mb-1">{copy.whatsapp}</h4>
                </div>
                <ChevronLeft className="w-5 h-5 text-gold flex-shrink-0" />
              </a>

              {/* البريد الإلكتروني */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-gold/40 hover:shadow-luxury transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy/10 flex-shrink-0">
                  <Mail className="w-6 h-6 text-navy" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-navy mb-1">{copy.email}</h4>
                  <p className="text-sm text-muted-foreground break-words" dir="ltr">{siteConfig.contact.email}</p>
                </div>
                <ChevronLeft className="w-5 h-5 text-gold flex-shrink-0" />
              </a>

              {/* أوقات العمل */}
              <div className="bg-navy text-navy-foreground rounded-2xl p-6 border border-gold/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/20">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="text-lg font-bold text-gold">{copy.workingHours}</h4>
                </div>
                <p className="text-sm text-navy-foreground/80 mb-2">{lt(locale, { ar: siteConfig.contact.workingHours, en: siteConfig.contact.workingHoursEn, tr: "Cum - Per: 09:00 - 21:00", fr: "Sam - Jeu : 9:00 - 21:00", ru: "Сб - Чт: 9:00 - 21:00" })}</p>
                <div className="pt-3 mt-3 border-t border-navy-700 text-xs text-navy-foreground/60">
                  {copy.friday}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
