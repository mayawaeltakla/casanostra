"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ChevronLeft,
  Calendar,
  Clock,
  ArrowLeft,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { getSortedPosts } from "@/lib/blog";
import { useTranslations, useLocale } from "next-intl";
import { lt } from "@/lib/locale-text";

/* ============================================================================
 *  CASANOSTRA — صفحة قائمة المدونة (/blog)
 * ============================================================================
 *
 *  تعرض جميع المقالات (4 مقالات) في شبكة بطاقات أنيقة.
 *  كل بطاقة تحتوي:
 *    - صورة الغلاف من Unsplash
 *    - تصنيف المقال (شارة ذهبية)
 *    - مدة القراءة (شارة سفلية)
 *    - عنوان المقال
 *    - ملخص قصير (line-clamp-3)
 *    - الكاتب بأفاتار دائري
 *    - تاريخ النشر
 *    - زر "{lt(locale, { ar: "اقرأ المقال كاملاً", en: "Read Full Article", tr: "Tüm Makaleyi Oku", fr: "Lire l'Article Complet", ru: "Читать статью полностью" })}"
 * ============================================================================ */

export function BlogContent() {
  const locale = useLocale();
  const posts = locale === "ar" ? getSortedPosts() : [];
  const tHome = useTranslations("home");
  const tNav = useTranslations("nav");
  const localizedPosts = posts.map((post, index) => {
    const number = index + 1;
    const readMinutes = Number(post.readTime.match(/\d+/)?.[0] || 1);
    return {
      ...post,
      title: tHome(`blogPost${number}Title`),
      excerpt: tHome(`blogPost${number}Excerpt`),
      category: tHome(`blogCategory${number}`),
      author: lt(locale, { ar: "فريق CASANOSTRA", en: "CASANOSTRA Team", tr: "CASANOSTRA Ekibi", fr: "Équipe CASANOSTRA", ru: "Команда CASANOSTRA" }),
      readTime: tHome("readMinutes", { count: readMinutes }),
    };
  });

  return (
    <>
      {/* ================================================================
       * 1. HERO — عنوان الصفحة + وصف
       * ================================================================ */}
      <section className="relative bg-navy text-navy-foreground py-20 lg:py-28 overflow-hidden">
        {/* توهج ذهبي خلفي */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(201, 166, 92, 0.18) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-navy-foreground/70 mb-6">
              <Link href="/" className="hover:text-gold transition-colors">
                {tNav("home")}
              </Link>
              <ChevronLeft className="w-3 h-3" />
              <span className="text-gold">{tNav("blog")}</span>
            </nav>

            {/* شارة علوية */}
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-sm mb-6">
              <Newspaper className="w-4 h-4" />
              <span>{lt(locale, { ar: `${posts.length} مقالات منشورة`, en: `${posts.length} articles published`, tr: `${posts.length} makale yayınlandı`, fr: `${posts.length} articles publiés`, ru: `Опубликовано статей: ${posts.length}` })}</span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {lt(locale, { ar: "مدوّنة CASANOSTRA", en: "CASANOSTRA Blog", tr: "CASANOSTRA Blog", fr: "Blog CASANOSTRA", ru: "Блог CASANOSTRA" })}
            </h1>

            {/* الوصف */}
            <p className="text-base lg:text-lg text-navy-foreground/80 leading-relaxed">
              {lt(locale, {
                ar: "نصائح وأدلة ومقالات عن السياحة في تركيا من فريق خبراء CASANOSTRA. اكتشف أفضل الأماكن، إجراءات الفيزا، الأطعمة، والثقافة التركية قبل سفرك.",
                en: "Travel advice and guides from CASANOSTRA experts. Explore destinations, visa procedures, Turkish food, and local culture before your trip.",
                tr: "CASANOSTRA uzmanlarından Türkiye seyahat önerileri ve rehberleri. Gezinizden önce destinasyonları, vize işlemlerini, Türk mutfağını ve yerel kültürü keşfedin.",
                fr: "Conseils et guides de voyage de l'équipe CASANOSTRA. Découvrez les destinations, les visas, la cuisine et la culture turques avant votre séjour.",
                ru: "Советы и путеводители от экспертов CASANOSTRA. Узнайте о направлениях, визах, турецкой кухне и местной культуре до поездки.",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
       * 2. شبكة المقالات
       * ================================================================ */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* عنوان القسم */}
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-gold-readable text-sm font-medium mb-3">
              <span className="w-8 h-px bg-gold" />
              <span>{lt(locale, { ar: "أحدث المقالات", en: "Latest Articles", tr: "Son Makaleler", fr: "Articles Récents", ru: "Последние статьи" })}</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
              {lt(locale, { ar: "مقالات قد تهمّك", en: "Articles You May Like", tr: "İlginizi Çekebilecek Makaleler", fr: "Articles qui pourraient vous intéresser", ru: "Статьи, которые могут вас заинтересовать" })}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lt(locale, { ar: "تصفّح مقالاتنا عن السياحة في تركيا — من وجهات سياحية إلى نصائح سفر ودلائل عملية.", en: "Browse our Turkey travel articles, from destination guides to practical travel tips.", tr: "Destinasyon rehberlerinden pratik seyahat ipuçlarına kadar Türkiye yazılarımıza göz atın.", fr: "Parcourez nos articles sur la Turquie, des guides de destinations aux conseils pratiques.", ru: "Читайте наши статьи о Турции: путеводители по направлениям и практические советы." })}
            </p>
          </div>

          {locale === "ar" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {localizedPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 hover:shadow-luxury hover:-translate-y-1 transition-all duration-300"
              >
                {/* صورة الغلاف */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative h-56 overflow-hidden"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* overlay داكن متدرّج */}
                  <div className="absolute inset-0 bg-linear-to-t from-navy/95 via-navy/20 to-transparent" />
                  {/* تصنيف المقال — شارة ذهبية */}
                  <span className="absolute top-4 right-4 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                    {post.category}
                  </span>
                  {/* مدة القراءة */}
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 text-xs text-white/90 bg-navy/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    <Clock className="w-3 h-3 text-gold" />
                    <span>{post.readTime}</span>
                  </span>
                </Link>

                {/* جسم البطاقة */}
                <div className="p-6">
                  {/* العنوان */}
                  <h2 className="text-xl font-bold text-navy mb-3 group-hover:text-gold-800 dark:group-hover:text-gold-300 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* الملخص */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* الكاتب + التاريخ */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-gold-readable font-bold">
                        C
                      </div>
                      <span className="font-medium text-foreground/80">
                        {post.author}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* زر اقرأ المزيد */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold-readable hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
                  >
                    <span>{lt(locale, { ar: "اقرأ المقال كاملاً", en: "Read Full Article", tr: "Tüm Makaleyi Oku", fr: "Lire l'Article Complet", ru: "Читать статью полностью" })}</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* خط ذهبي علوي يظهر عند المرور */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
              </article>
            ))}
          </div>
          ) : (
            <p className="max-w-2xl mx-auto text-center text-muted-foreground">
              {lt(locale, {
                ar: "",
                en: "Full articles are currently available in Arabic only. Translations are being prepared.",
                tr: "Makalelerin tam metni şu anda yalnızca Arapça olarak mevcuttur. Çeviriler hazırlanıyor.",
                fr: "Les articles complets sont actuellement disponibles uniquement en arabe. Les traductions sont en préparation.",
                ru: "Полные статьи пока доступны только на арабском языке. Переводы готовятся.",
              })}
            </p>
          )}
        </div>
      </section>

      {/* ================================================================
       * 3. CTA ختامي
       * ================================================================ */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 text-gold-readable text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" />
            <span>{lt(locale, { ar: "جاهز لرحلتك؟", en: "Ready for your trip?", tr: "Seyahatinize hazır mısınız?", fr: "Prêt pour votre voyage ?", ru: "Готовы к поездке?" })}</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-4">
            {lt(locale, { ar: "هل أعجبتك وجهاتنا؟", en: "Did you like our destinations?", tr: "Did you like our destinations?", fr: "Nos destinations vous plaisent ?", ru: "Понравились наши направления?" })}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {lt(locale, { ar: "تواصل معنا الآن ودعنا نخطّط رحلتك المثالية إلى تركيا. فريقنا جاهز للرد على استفساراتك خلال دقائق عبر واتساب.", en: "Contact us and let us plan your ideal trip to Turkey. Our team is ready to answer your questions on WhatsApp.", tr: "Bizimle iletişime geçin, Türkiye'deki ideal seyahatinizi planlayalım. Ekibimiz WhatsApp üzerinden sorularınızı yanıtlamaya hazır.", fr: "Contactez-nous pour organiser votre voyage idéal en Turquie. Notre équipe répond à vos questions sur WhatsApp.", ru: "Свяжитесь с нами, и мы спланируем вашу поездку в Турцию. Наша команда ответит на ваши вопросы в WhatsApp." })}
          </p>
          <Link
            href="/quick-booking"
            className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl shadow-gold hover:bg-gold-300 hover:scale-105 transition-all"
          >
            <span>{lt(locale, { ar: "احجز رحلتك الآن", en: "Book Your Trip Now", tr: "Gezinizi Şimdi Rezerve Et", fr: "Réserver Votre Voyage", ru: "Забронировать поездку" })}</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
