"use client";

import Link from "next/link";
import { ChevronLeft, ShieldCheck, FileText, Mail, Phone } from "lucide-react";
import { useLocale } from "next-intl";
import { lt } from "@/lib/locale-text";
import { siteConfig } from "@/lib/site-config";

/* ============================================================================
 *  سياسة الخصوصية — النص الحرفي للعميل
 * ============================================================================ */

export function PrivacyContent() {
  const locale = useLocale();
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
              <Link href="/" className="hover:text-gold transition-colors">{lt(locale, { ar: "الرئيسية", en: "Home", tr: "Ana Sayfa", fr: "Accueil", ru: "Главная" })}</Link>
              <ChevronLeft className="w-3 h-3" />
              <span className="text-gold">{lt(locale, { ar: "سياسة الخصوصية", en: "Privacy Policy", tr: "Gizlilik Politikası", fr: "Politique de confidentialité", ru: "Политика конфиденциальности" })}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-sm mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>{lt(locale, { ar: "حماية بياناتك أولويتنا", en: "Your privacy matters", tr: "Gizliliğiniz önceliğimiz", fr: "Votre confidentialité compte", ru: "Ваша конфиденциальность важна" })}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              <span className="text-gold-gradient">{lt(locale, { ar: "سياسة الخصوصية", en: "Privacy Policy", tr: "Gizlilik Politikası", fr: "Politique de confidentialité", ru: "Политика конфиденциальности" })}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* المحتوى الحرفي */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          {locale === "ar" ? (
          <div className="bg-card border border-border rounded-2xl p-6 lg:p-10 space-y-6 leading-loose text-sm lg:text-base text-foreground/80">

            {/* مقدمة */}
            <p>
              انطلاقاً من حرصها على بيانات عملائها وسرية معلوماتهم على الإنترنت، وضعت
              وكالة CASANOSTRA السياحية مجموعة من البنود توضح فيها سياستها في الحفاظ
              على خصوصية زوار هذا الموقع، وكيفية تعاملنا مع بياناتهم الشخصية.
            </p>

            <p>
              نرحب بكافة زوارنا الكرام في موقع وكالة CASANOSTRA السياحية، ونود أن
              نعلمكم أن تصفحكم لهذا الموقع يتضمن موافقتكم الضمنية على شروط استخدام
              موقع وكالة CASANOSTRA السياحية وسياسة الخصوصية الخاصة بنا.
            </p>

            {/* استخدام البيانات */}
            <p>
              تستخدم وكالة CASANOSTRA السياحية المعلومات والبيانات المقدمة من قبل
              الزوار بمحض إرادتهم، وبمعرفتهم الكاملة بالبيانات التي يزودوننا بها، حيث
              أننا لا نجمع البيانات الشخصية لمتصفحي الموقع أبداً دون رغبتهم بذلك أثناء
              تصفحهم موقعنا.
            </p>

            {/* بيانات المخدم */}
            <div className="bg-muted/30 rounded-xl p-5">
              <p className="mb-3">
                علماً أنّه عند زيارة أي موقع إلكتروني بما في ذلك موقع وكالة CASANOSTRA
                السياحية، يقوم المخدم المضيف بتسجيل البيانات التالية على الأقل:
              </p>
              <ul className="space-y-2 mr-4">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>عنوان برتوكول الإنترنت الخاص بجهازك IP: The Internet Protocol.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>تاريخ وموعد دخولك موقعنا، وكذلك نوع المتصفح الذي تستخدمه.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>وأيضاً عنوان أي موقع خارجي تم تحويلك من خلاله إلينا.</span>
                </li>
              </ul>
            </div>

            {/* الروابط الخارجية */}
            <p>
              قد يحتوي موقع وكالة CASANOSTRA السياحية على روابط خارجية لمواقع أخرى،
              نحن غير مسؤولين عن سياسة الخصوصية ومحتوى ومضمون تلك المواقع، لذا نرجو
              من عملائنا الكرام التفضل بالاطلاع على سياسة الخصوصية الخاصة بتلك
              المواقع قبل تصفحها.
            </p>

            {/* الحفاظ على البيانات */}
            <p>
              سنبذل قصارى جهدنا للمحافظة دائماً على خصوصية وسرية كافة البيانات
              والمعلومات الشخصية التي قبلتَ بتزويدنا بها، إلا إذا كان ذلك مطلوباً
              بموجب أي قانون أو تشريعات جديدة، أو عندما نعتقد (بدون سوء نية) أن مثل
              هذا الإجراء سيكون مطلوباً أو مرغوباً فيه للتماشي مع القانون، أو للدفاع
              عنك، أو حماية حقوق الملكية الخاصة وكالة CASANOSTRA السياحية، أو نتيجة
              لتعرض بيانات هذا الموقع لعمليات ولوج غير قانونية، علماً أننا قد نعمل
              باستمرار على تحسين وتطوير إجراءات الأمان لدينا، وفقاً لأحدث التقنيات
              المتاحة في العتاد والبرمجيات.
            </p>

            {/* معلومات التواصل */}
            <p>
              معلومات التواصل التي ترسلها لنا بإرادتك أو نطلبها منك لنساعدك في اختيار
              ما يناسبك من خيارات السياحة أو السفر أو أية خدمات أخرى مثل حجوزات الطيران
              والفنادق وغيرها، نلتزم بخصوصيتها وسرّيتها، فلا نرسلها أو نبيعها لأي طرف
              ثالث إطلاقاً، دون الحصول على موافقتك المكتوبة سلفاً، وستبقى المعلومات ضمن
              أرشيفنا على هيئة بيانات جماعية خاصة، لا تستخدم إلا في عمل وكالة
              CASANOSTRA السياحية الإحصائي والبحثي دون إشهارها أو استخدامها على نحو
              يمكن فيه التعريف بك.
            </p>

            {/* بيانات التقييم */}
            <p>
              البيانات التي يتم تقديمها من قبلك – بما في ذلك بيانات التقييم الشخصي
              ورأيك بالموقع والخدمات التي يقدمها – سيتم استخدامها في الرد على كافة
              استفساراتك، وملاحظاتك، أو طلباتك من قبل فريق موقع وكالة CASANOSTRA
              السياحية أو أي من المواقع التابعة له، كما يمكن أن يتم استخدامها لتحسين
              تجربة المستخدم على الموقع دون الإفصاح عنها لطرف ثالث.
            </p>

            {/* عدم البيع */}
            <p>
              لن نقوم ببيع، أو مقايضة، أو تأجير، أو إفشاء أية معلومات شخصية لمصلحة أي
              طرف آخر خارج هذا الموقع، أو المواقع التابعة له، بما في ذلك: بيانات الاتصال
              و/ أو الأسماء والصور وغيرها، وسيتم الكشف عن المعلومات فقط في حالة صدور
              أمر بذلك من قبل سلطة قضائية أو تنظيمية معتبرة قانوناً.
            </p>

            {/* التعديل */}
            <p>
              يحتفظ موقع وكالة CASANOSTRA السياحية بحق تعديل بنود وشروط سياسة خصوصية
              المعلومات والسرية إن لزم الأمر، ومتى كان ذلك ملائماً، وسيتم بصفة مستمرة
              إخطارك بالتغييرات المحتملة، أو البيانات التي حصلنا عليها، وكيف سنستخدمها،
              والجهة التي سنقوم بتزويدها بهذه البيانات.
            </p>

            {/* التواصل */}
            <div className="bg-muted/30 rounded-xl p-5 border border-gold/10">
              <p className="mb-3">
                عند الحاجة أو الضرورة يسعدنا تواصلكم معنا وإرسال استفساراتكم إلى
                بريدنا الإلكتروني:
              </p>
              <a
                href={`mailto:${siteConfig.contact.privacyEmail}`}
                className="inline-flex items-center gap-2 text-gold font-bold hover:text-gold-300 transition-colors"
                dir="ltr"
              >
                <Mail className="w-5 h-5" />
                <span>{siteConfig.contact.privacyEmail}</span>
              </a>
            </div>

            {/* خاتمة */}
            <p>
              إن مخاوفك ومحاذيرك بشأن سرية وخصوصية بياناتك تعتبر مسألة في غاية الأهمية
              بالنسبة إلينا، نأمل أن نكون قد حافظنا عليها من خلال هذه السياسة الواضحة
              والصريحة.
            </p>
          </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-10 leading-loose text-sm lg:text-base text-foreground/80">
              {lt(locale, { ar: "", en: "The full privacy policy is currently published in Arabic. A human-reviewed translation is needed. To review the authoritative wording, switch the site language to Arabic.", tr: "Gizlilik politikasının tam metni şu anda Arapça yayımlanmıştır. İnsan tarafından gözden geçirilmiş bir çeviri gereklidir. Resmî metni incelemek için site dilini Arapça olarak değiştirin.", fr: "La politique de confidentialité complète est actuellement publiée en arabe. Une traduction révisée par un traducteur humain est nécessaire. Pour consulter le texte de référence, passez la langue du site en arabe.", ru: "Полный текст политики конфиденциальности пока опубликован на арабском языке. Нужен перевод с проверкой специалистом. Чтобы ознакомиться с официальной формулировкой, переключите язык сайта на арабский." })}
            </div>
          )}

          {/* رابط الشروط */}
          <div className="mt-8 flex items-center justify-between pt-8 border-t border-border">
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-300 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>{lt(locale, { ar: "الشروط والأحكام", en: "Terms and Conditions", tr: "Şartlar ve Koşullar", fr: "Conditions générales", ru: "Условия и положения" })}</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div className="text-xs text-muted-foreground">
              {lt(locale, { ar: "آخر تحديث: سبتمبر 2025", en: "Last updated: September 2025", tr: "Son güncelleme: Eylül 2025", fr: "Dernière mise à jour : septembre 2025", ru: "Обновлено: сентябрь 2025 г." })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
