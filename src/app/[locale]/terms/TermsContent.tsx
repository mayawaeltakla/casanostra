"use client";

import { Link } from "@/i18n/navigation";
import { ChevronLeft, FileText, ShieldCheck, Mail, Phone } from "lucide-react";
import { useLocale } from "next-intl";
import { lt } from "@/lib/locale-text";
import { siteConfig } from "@/lib/site-config";

/* ============================================================================
 *  سياسة الإرجاع والشروط والأحكام — النص الحرفي للعميل
 * ============================================================================ */

export function TermsContent() {
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
              <span className="text-gold">{lt(locale, { ar: "الشروط والأحكام", en: "Terms and Conditions", tr: "Şartlar ve Koşullar", fr: "Conditions générales", ru: "Условия и положения" })}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-sm mb-6">
              <FileText className="w-4 h-4" />
              <span>{lt(locale, { ar: "آخر تحديث: سبتمبر 2025", en: "Last updated: September 2025", tr: "Son güncelleme: Eylül 2025", fr: "Dernière mise à jour : septembre 2025", ru: "Обновлено: сентябрь 2025 г." })}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {lt(locale, { ar: "الشروط والأحكام", en: "Terms and Conditions", tr: "Şartlar ve Koşullar", fr: "Conditions générales", ru: "Условия и положения" })}
            </h1>

            <p className="text-base lg:text-lg text-navy-foreground/80 leading-relaxed">
              {lt(locale, { ar: "لأننا نعمل بشكل احترافي، وصريح، وواضح لنقدم لكم خدمة متميزة وسعر مناسب... ولأننا حريصين على علاقة متميزة ومستمرة مع عملائنا.", en: "We are committed to professional, honest, and clear service at a fair price, and to building lasting relationships with our clients.", tr: "Adil fiyatlarla profesyonel, dürüst ve açık hizmet sunmaya ve müşterilerimizle kalıcı ilişkiler kurmaya bağlıyız.", fr: "Nous nous engageons à offrir un service professionnel, honnête et clair à un prix juste, ainsi qu'à construire des relations durables avec nos clients.", ru: "Мы стремимся предоставлять профессиональные, честные и понятные услуги по справедливой цене и выстраивать долгосрочные отношения с клиентами." })}
            </p>
          </div>
        </div>
      </section>

      {/* المحتوى */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {locale === "ar" ? (
          <div className="bg-card border border-border rounded-2xl p-6 lg:p-10 space-y-6 leading-loose text-sm lg:text-base text-foreground/80">

            {/* تنبيه */}
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
              <p>
                ننصحكم بقراءة شروط الحجز بعناية فهى تحدد حقوقنا والتزاماتنا وذلك ضماناً لكم
                وتجنباً لأى سوء فهم قد يحدث.
              </p>
              <p className="mt-3">
                علما بأن بدخولكم وتصفحكم واستخدامكم لموقعنا أو أي من تطبيقاتنا أو أي من
                خدماتنا المتاحة من خلال الموقع الخاص بنا أو من خلال أي نافذة تقومون من
                خلالها بإجراءات الحجز فإنكم بذلك تقرون بأنكم قد قرأتم ووافقتم على الشروط
                والبنود المبينة أدناه.
              </p>
            </div>

            {/* أولاً: طرق السداد */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <span className="w-1 h-7 bg-gold rounded-full" />
                <span>أولاً: طرق السداد</span>
              </h2>
              <div className="space-y-3">
                <p>
                  لا يتم تأكيد أي حجوزات إلا بعد سداد <strong>60%</strong> من قيمة الحجز
                  والباقي عند الوصول (كاش) Cash.
                </p>
                <p>
                  طرق السداد المتاحة للدفعة الأولى: الدفع نقداً - الدفع أونلاين على موقعنا -
                  السداد بالبطاقات الائتمانية - الإيداعات البنكية - التحويل عن طريق الويسترن
                  يونيون أو ما شابه.
                </p>
                <p>يتم استلام الدفعة الثانية من قيمة البرنامج نقداً عند الوصول.</p>
                <p>
                  في حال لم يتوفر المبلغ نقداً عند الوصول يمكنكم الدفع عن طريق البطاقة
                  الائتمانية.
                </p>
              </div>
            </div>

            {/* ثانياً: اتفاقية الحجز */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <span className="w-1 h-7 bg-gold rounded-full" />
                <span>ثانياً: اتفاقية الحجز</span>
              </h2>
              <p>
                جميع المعلومات المذكورة باتفاقية الحجز التي أرسلت لكم من خلال الاستشاري
                السياحي والتي تتضمن عدد الأفراد وعدد الأطفال وتواريخ ميلاد الأطفال وتواريخ
                الوصول والمغادرة هي مسئولية العميل وأي تكاليف إضافية نتيجة لتغيير أي من
                هذه المعلومات وقت الوصول للفندق يتحملها العميل دون أدنى مسئولية على الشركة.
              </p>
            </div>

            {/* ثالثاً: سياسة التعديل / الإلغاء */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <span className="w-1 h-7 bg-gold rounded-full" />
                <span>ثالثاً: سياسة التعديل / الإلغاء الخاصة بحجز الفنادق والبرامج السياحية</span>
              </h2>
              <ul className="space-y-3 mr-4">
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>تطبق رسوم إلغاء أو تغيير الحجز وفقاً لتاريخ طلب الإلغاء وتزيد تلك الرسوم كلما اقترب موعد الإلغاء.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>فى حال طلب الإلغاء خلال فترة تزيد عن 12 يوماً من تاريخ السفر يسترد مبلغ الحجز كاملاً دون خصم أي رسوم.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>فى حالة طلب الإلغاء خلال أقل من 11 يوماً وتزيد عن 2 يوم (أحد عشر يوم عمل) من تاريخ السفر يتم خصم قيمة 75% من قيمة الحجز.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>فى حالة طلب الإلغاء خلال فترة أقل من 2 يوم من تاريخ السفر يتم خصم مبلغ الدفعة الأولى ولا يحق استرداد أي مبالغ نهائياً.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>يحق للعميل التعديل في الخدمات السياحية التي قد تم حجزها على أن يتحمل العميل كافة الغرامات المقررة وفقاً لنوع الخدمة المراد تعديلها ونتيجة التعديل تعتمد على الإمكانية المتاحة في هذه الفترة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>فى حالة الإلغاء بسبب ظروف مثل الحروب والتظاهرات والشغب والفيضانات وغيرها من الظروف المماثلة يتم مراجعة الموقف وفقاً لهذه الحالات الخاصة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>فى حالة الإلغاء أو التعديل يقوم العميل بكتابة ذلك عن طريق الإيميل والاتصال هاتفياً لكي يثبت حقه في موعد الإلغاء.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold mt-1">•</span>
                  <span>فى حالة إلغاء الحجز أثناء الخدمة بسبب ظروف شخصية للعميل قاهرة أو غير قاهرة لا قدر الله يتم تطبيق سياسة الإلغاء المقررة وفقاً لتاريخ طلب الإلغاء.</span>
                </li>
              </ul>
            </div>

            {/* رابعاً: تذاكر الطيران */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <span className="w-1 h-7 bg-gold rounded-full" />
                <span>رابعاً: معلومات هامة بتذاكر الطيران</span>
              </h2>
              <p>الشركة غير مسئولة عن تحديد الوزن المسموح به من قبل خطوط الطيران.</p>
              <p className="mt-2">
                فى حالة تغيير أو إلغاء تذاكر الطيران سيتم التعامل وفق الشروط والإجراءات
                المتبعة من شركة الطيران لأن كل شركة طيران لها نظام خاص بها معمول به.
              </p>
            </div>

            {/* خامساً: التنظيم الإعلامي وحماية البيانات */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <span className="w-1 h-7 bg-gold rounded-full" />
                <span>خامساً: التنظيم الإعلامي وحماية البيانات</span>
              </h2>

              <p className="font-bold text-navy mt-4">إشعار بشأن تنظيم الرسائل التجارية الإلكترونية وحماية البيانات</p>
              <p className="mt-2">
                بصفتنا وكالة CASANOSTRA السياحية، قمنا بإعداد هذا المستند لتزويدكم بمعلومات
                تتعلق بإرسال الرسائل الإلكترونية التجارية، وكذلك معالجة بياناتكم وتخزينها
                ونقلها، وذلك وفقاً لقانون الاتصالات الإلكترونية رقم 5809، وقانون تنظيم
                التجارة الإلكترونية رقم 6563، وقانون حماية البيانات الشخصية رقم 6698،
                والتشريعات ذات الصلة.
              </p>
              <p className="mt-2">
                وفي هذا الإطار، يمكن استخدام بيانات الاتصال الخاصة بكم، مثل أرقام الهواتف
                وعناوين البريد الإلكتروني التي زودتمونا بها، لأغراض التواصل التسويقي بعد
                الحصول على موافقتكم. ويشمل ذلك أنشطة مثل الاتصال التسويقي، تخطيط وتنفيذ
                العمليات التسويقية، دراسات التحليل التسويقي، الإعلانات عن الخدمات، العروض
                الترويجية، الفعاليات، الإعلانات التجارية وغيرها. وسيتم معالجة الرسائل
                التجارية الإلكترونية استناداً إلى الشروط المنصوص عليها في المادة 6 من قانون
                رقم 6563 بشأن تنظيم التجارة الإلكترونية، وبموافقتكم الصريحة ووفقاً للفقرة
                الأولى من المادة 5 من قانون حماية البيانات الشخصية. ويمكن إرسال هذه الرسائل
                عبر القنوات التي منحتم موافقتكم عليها، بما في ذلك التطبيقات الهاتفية، حسابات
                وسائل التواصل الاجتماعي، الرسائل النصية القصيرة (SMS)، والبريد الإلكتروني.
              </p>
              <p className="mt-2">
                يحق لكم سحب موافقتكم الصريحة في أي وقت. وإذا اخترتم سحب موافقتكم على تلقي
                الرسائل التجارية الإلكترونية، فسيُعتبر ذلك بمثابة إلغاء لموافقتكم الصريحة.
              </p>
              <p className="mt-2">
                ستتم معالجة بياناتكم مباشرة من قبل وكالة CASANOSTRA السياحية أو من قبل معالجي
                البيانات، وقد يتم مشاركتها مع وكالة CASANOSTRA السياحية وشركاء الأعمال
                وموردي وكالة CASANOSTRA السياحية لتحقيق الأغراض المحددة. كما يمكن أن تتم
                معالجة بياناتكم من قبل مزوّدي خدمات وكالة CASANOSTRA السياحية، الذين قد
                تكون خوادمهم موجودة خارج البلاد، لغرض التخزين والأرشفة، وذلك ضمن هذه
                الأغراض وبموافقتكم الصريحة. وقد يتم أيضاً نقل هذه البيانات إلى الخارج عبر
                خوادم موجودة خارج الدولة.
              </p>
              <p className="mt-2">
                لديكم الحق في ممارسة حقوقكم المنصوص عليها في المادة 11 من قانون حماية
                البيانات الشخصية، ويمكنكم تقديم طلباتكم عبر القنوات المحددة في "اللائحة
                الخاصة بإجراءات ومبادئ تقديم الطلبات إلى مسؤول البيانات".
              </p>
            </div>

            {/* معالجة البيانات الشخصية */}
            <div className="border-t border-border pt-6">
              <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
                <span className="w-1 h-7 bg-gold rounded-full" />
                <span>معالجة البيانات الشخصية</span>
              </h2>

              <p>
                تم إعداد هذا الإشعار وفقاً للمادة 10 من القانون رقم 6698 بشأن حماية
                البيانات الشخصية ("قانون حماية البيانات الشخصية") وكذلك وفقاً للائحة
                المبادئ والإجراءات المتعلقة بتنفيذ واجب الإخطار.
              </p>

              <div className="bg-muted/30 rounded-xl p-5 mt-4">
                <p className="font-bold text-navy mb-2">مسؤول المعالجة</p>
                <p className="font-mono text-sm">
                  {siteConfig.legalEntity.name}
                </p>
                <p className="font-mono text-sm mt-1">
                  {siteConfig.legalEntity.address}
                </p>
              </div>

              <p className="mt-4">
                بصفتنا وكالة CASANOSTRA السياحية، قمنا بإعداد هذا الإشعار لإعلامكم بكيفية
                معالجة بياناتكم الشخصية وحفظها ونقلها، وذلك في إطار القانون رقم 6698 بشأن
                حماية البيانات الشخصية ("قانون حماية البيانات الشخصية") والتشريعات ذات الصلة.
              </p>

              {/* الفئات المعنية */}
              <h3 className="font-bold text-navy mt-6 mb-2">الفئات المعنية:</h3>
              <ul className="space-y-1 mr-4 text-sm">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>الموظفون</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>المتقدمون للوظائف</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>المتدربون</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>المتقدمون للتدريب</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>العملاء المحتملون</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>العملاء الأفراد / الممثلون المخولون للعملاء من الشركات</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>الشركاء التجاريون المحتملون الأفراد / الممثلون المخولون للشركاء التجاريين من الشركات</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>الشركاء التجاريون / الممثلون المخولون للشركاء التجاريين</span></li>
              </ul>

              {/* المتدربون */}
              <h3 className="font-bold text-navy mt-6 mb-2">المتدربون / المتقدمون للتدريب</h3>

              <p className="font-semibold mt-3">معلومات الهوية:</p>
              <ul className="space-y-1 mr-4 text-sm">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>الاسم واللقب، تاريخ الميلاد، مكان الميلاد، الجنس، الرقم الوطني التركي، الصورة الشخصية، التوقيع</span></li>
              </ul>
              <p className="mt-2"><span className="font-semibold">أغراض المعالجة:</span> إدارة أنشطة التواصل، إدارة عمليات اختيار وتعيين المتدربين/المتقدمين، متابعة وتنفيذ الإجراءات القانونية، الامتثال للتشريعات، نقل المعلومات إلى الأشخاص/المؤسسات المخولة قانوناً.</p>
              <p className="mt-2"><span className="font-semibold">الأسس القانونية:</span> ضرورة المعالجة لكونها مرتبطة مباشرة بإبرام أو تنفيذ عقد، الالتزام القانوني الملقى على مسؤول المعالجة، المصلحة المشروعة لمسؤول المعالجة، شريطة ألا تمس الحقوق والحريات الأساسية للشخص المعني.</p>
              <p className="mt-2"><span className="font-semibold">طرق الجمع:</span> النماذج الورقية/الإلكترونية، المقابلات، المستندات المقدمة من الشخص المعني.</p>

              <p className="font-semibold mt-4">معلومات الاتصال:</p>
              <p className="mt-1">عنوان البريد الإلكتروني، رقم الهاتف المحمول، العنوان. الأغراض، الأسس القانونية وطرق الجمع مطابقة لما ورد في معلومات الهوية.</p>

              <p className="font-semibold mt-4">المعلومات المالية:</p>
              <p className="mt-1">تفاصيل الحساب البنكي، رقم IBAN، معلومات الرواتب (عند الاقتضاء). الأغراض: تنفيذ العمليات المالية/المحاسبية، الامتثال للتشريعات، متابعة الإجراءات القانونية، نقل المعلومات للسلطات المختصة. الأسس القانونية: الضرورة التعاقدية، الالتزام القانوني، المصلحة المشروعة. طرق الجمع: العقود، كشوف الرواتب، المستندات البنكية المقدمة من الشخص المعني.</p>

              <p className="font-semibold mt-4">المعلومات المتعلقة بالخبرة العملية:</p>
              <p className="mt-1">بيانات التعليم، الشهادات الدراسية، معلومات الدورات التدريبية، الشهادات، الخبرات السابقة في التدريب، المهارات اللغوية، مهارات الحاسوب، الكفاءات/المهارات المهنية.</p>

              <p className="font-semibold mt-4">معلومات أمن المرافق:</p>
              <p className="mt-1">تسجيلات الفيديو (CCTV)، سجلات الدخول والخروج. الأغراض: أمن المرافق، متابعة الإجراءات القانونية، الامتثال للتشريعات.</p>

              <p className="font-semibold mt-4">البيانات الشخصية الحساسة:</p>
              <p className="mt-1">المعلومات الطبية، السجل الجنائي (عند الطلب). الأغراض: اختيار وتعيين المتدربين/المتقدمين، الامتثال للتشريعات، نقل المعلومات للسلطات.</p>

              {/* الشركاء التجاريون */}
              <h3 className="font-bold text-navy mt-6 mb-2">الشركاء التجاريون / الموردون / موظفو أو ممثلو الموردين</h3>
              <p className="mt-2"><span className="font-semibold">معلومات الهوية:</span> الاسم واللقب، تاريخ ومكان الميلاد، الجنس، الرقم الوطني التركي، رقم جواز السفر، الصورة الشخصية، الجنسية، الحالة الاجتماعية، التوقيع.</p>
              <p className="mt-2"><span className="font-semibold">معلومات الاتصال:</span> البريد الإلكتروني، رقم الهاتف المهني، رقم الهاتف المحمول، العنوان السكني/البريدي.</p>
              <p className="mt-2"><span className="font-semibold">المعلومات المالية:</span> تفاصيل الحساب البنكي، رقم IBAN، بيانات الفوترة، بيانات الرواتب، بيانات المعاملات المالية.</p>
              <p className="mt-2"><span className="font-semibold">معلومات الخبرة العملية:</span> البيانات التعليمية، الشهادات الدراسية، الشهادات التدريبية، المؤهلات المهنية، الخبرات العملية، المنصب/الوظيفة.</p>
              <p className="mt-2"><span className="font-semibold">معلومات أمن المرافق:</span> تسجيلات الفيديو (CCTV)، سجلات الدخول والخروج.</p>
              <p className="mt-2"><span className="font-semibold">البيانات الحساسة:</span> السجل الجنائي، المعلومات الطبية (في حال كانت مطلوبة قانوناً).</p>

              {/* الأغراض العامة */}
              <h3 className="font-bold text-navy mt-6 mb-2">الأغراض العامة لمعالجة البيانات الشخصية:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {[
                  "تنفيذ الأنشطة وفقاً للتشريعات",
                  "متابعة وتنفيذ الإجراءات القانونية",
                  "مشاركة المعلومات مع السلطات الرسمية",
                  "إدارة ومتابعة الأنشطة التجارية",
                  "إدارة استمرارية الأعمال",
                  "عمليات بيع السلع/الخدمات",
                  "إدارة العقود",
                  "إدارة علاقات العملاء ورضاهم",
                  "التواصل الداخلي والخارجي",
                  "التدقيق/الاستفسارات/المراجعات الداخلية",
                  "عمليات الإنتاج والتشغيل للسلع/الخدمات",
                  "الأنشطة اللوجستية",
                  "خدمات ما بعد البيع",
                  "التخطيط الاستراتيجي",
                  "المحاسبة والمالية",
                  "العمليات التسويقية",
                  "سياسات الرواتب والأجور",
                  "تنظيم وإدارة الفعاليات",
                  "تخزين وأرشفة البيانات",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* الأسس القانونية */}
              <h3 className="font-bold text-navy mt-6 mb-2">الأسس القانونية:</h3>
              <p>
                تُعالج بياناتكم من قبل وكالة CASANOSTRA السياحية وفقاً للمادة 5 من قانون
                حماية البيانات الشخصية (KVKK): ضرورة التعاقد (إذا كانت مرتبطة بشكل مباشر
                بإنشاء/تنفيذ عقد)، الالتزام القانوني الواقع على مسؤول المعالجة، المصلحة
                المشروعة لمسؤول المعالجة دون المساس بحقوق وحريات الشخص الأساسية.
              </p>

              {/* الجهات المستلمة */}
              <h3 className="font-bold text-navy mt-6 mb-2">الجهات المستلمة لبياناتكم الشخصية داخل تركيا:</h3>
              <p>
                قد تُشارك بياناتكم مع: السلطات العامة المختصة عند الطلب القانوني أو القضائي،
                الموردين، المساهمين، الشركاء التجاريين، العملاء، شركات مجموعة وكالة
                CASANOSTRA السياحية، الأشخاص الطبيعيين أو الاعتباريين في القطاع الخاص، وذلك
                ضمن الحدود القانونية.
              </p>

              {/* نقل البيانات */}
              <h3 className="font-bold text-navy mt-6 mb-2">نقل البيانات إلى الخارج:</h3>
              <p>
                يمكن مشاركة بياناتكم الشخصية مع موردين أجانب لأغراض: التخزين، الأرشفة، أمن
                تكنولوجيا المعلومات، التواصل، استمرارية الأعمال، إدارة الرواتب، إدارة
                العقود، المبيعات/الإنتاج. كما يمكن مشاركتها عبر منصات التواصل الاجتماعي
                العالمية (Instagram, YouTube, Facebook, Twitter, LinkedIn)، أو عبر خدمات
                الرسائل/البريد الإلكتروني التي تكون خوادمها خارج تركيا (مثل WhatsApp,
                Telegram, Microsoft Exchange)، وذلك بموجب موافقتكم الصريحة (المادة 9/1 من
                قانون حماية البيانات الشخصية).
              </p>

              {/* مدة الاحتفاظ */}
              <h3 className="font-bold text-navy mt-6 mb-2">مدة الاحتفاظ بالبيانات:</h3>
              <p>
                إذا تم تحديد مدة قانونية للاحتفاظ بالبيانات، فيجب حفظها على الأقل طوال هذه
                المدة. إذا لم يتم تحديد مدة، فسيتم حفظها لمدة معقولة بما يتناسب مع أغراض
                المعالجة.
              </p>

              {/* حقوقكم */}
              <h3 className="font-bold text-navy mt-6 mb-2">حقوقكم بصفتكم أصحاب البيانات:</h3>
              <p>وفق لقانون حماية البيانات الشخصية (KVKK)، لكم الحق في:</p>
              <ul className="space-y-1 mr-4 text-sm mt-2">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>معرفة ما إذا كانت بياناتكم تتم معالجتها</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>طلب معلومات حول ذلك</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>معرفة الغرض من المعالجة ومدى التزامها به</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>معرفة المستلمين داخل تركيا وخارجها</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>طلب تصحيح البيانات غير المكتملة أو الخاطئة</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>طلب حذف أو إتلاف بياناتكم</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>طلب إخطار الأطراف الثالثة التي نُقلت إليها البيانات</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>الاعتراض على القرارات الآلية التي قد تضر بكم</span></li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span><span>المطالبة بالتعويض عن الأضرار الناجمة عن المعالجة غير القانونية</span></li>
              </ul>

              {/* كيفية ممارسة الحقوق */}
              <h3 className="font-bold text-navy mt-6 mb-2">كيفية ممارسة حقوقكم:</h3>
              <p>
                يمكنكم ممارسة حقوقكم عبر نموذج طلب صاحب البيانات وذلك من خلال:
              </p>
              <div className="bg-muted/30 rounded-xl p-5 mt-3 space-y-2 text-sm">
                <p>البريد الإلكتروني: <a href={`mailto:${siteConfig.contact.privacyEmail}`} className="text-gold font-bold" dir="ltr">{siteConfig.contact.privacyEmail}</a></p>
                <p>الحضور الشخصي مع بطاقة هوية/جواز سفر</p>
                <p>عبر البريد مع توقيعكم إلى: <span className="font-mono">{siteConfig.legalEntity.address}</span></p>
                <p>التوقيع الإلكتروني أو التوقيع المتنقل الآمن عبر البريد: <a href={`mailto:${siteConfig.contact.privacyEmail}`} className="text-gold font-bold" dir="ltr">{siteConfig.contact.privacyEmail}</a></p>
              </div>
              <p className="mt-2">
                يجب أن يتضمن الطلب: الاسم، اللقب، التوقيع (في حال الطلب الخطي)، رقم الهوية
                التركي أو ما يعادله (جواز سفر)، العنوان، البريد الإلكتروني، رقم الهاتف،
                موضوع الطلب، والمستندات المؤيدة. إذا كان الطلب مقدم نيابة عن شخص آخر، يجب
                إرفاق وكالة رسمية.
              </p>

              {/* المهل الزمنية */}
              <h3 className="font-bold text-navy mt-6 mb-2">المهل الزمنية للرد:</h3>
              <p>
                سيتم تقييم طلباتكم والإجابة عليها خلال مدة أقصاها 30 يوماً من تاريخ استلامها
                من قبل وكالة CASANOSTRA السياحية. وسيتم إرسال الرد عبر نفس الوسيلة التي تم
                استخدامها لتقديم الطلب (بريد ورقي أو إلكتروني).
              </p>
            </div>
          </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-10 leading-loose text-sm lg:text-base text-foreground/80">
              {lt(locale, { ar: "", en: "The full Terms and Conditions are currently published in Arabic. A human-reviewed translation is needed. To review the authoritative wording, switch the site language to Arabic.", tr: "Şartlar ve Koşulların tam metni şu anda Arapça yayımlanmıştır. İnsan tarafından gözden geçirilmiş bir çeviri gereklidir. Resmî metni incelemek için site dilini Arapça olarak değiştirin.", fr: "Les Conditions générales complètes sont actuellement publiées en arabe. Une traduction révisée par un traducteur humain est nécessaire. Pour consulter le texte de référence, passez la langue du site en arabe.", ru: "Полный текст условий и положений пока опубликован на арабском языке. Нужен перевод с проверкой специалистом. Чтобы ознакомиться с официальной формулировкой, переключите язык сайта на арабский." })}
            </div>
          )}

          {/* رابط سياسة الخصوصية */}
          <div className="mt-8 flex items-center justify-between pt-8 border-t border-border">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-300 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{lt(locale, { ar: "سياسة الخصوصية", en: "Privacy Policy", tr: "Gizlilik Politikası", fr: "Politique de confidentialité", ru: "Политика конфиденциальности" })}</span>
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
