import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import {
  ChevronLeft,
  Calendar,
  Clock,
  ArrowLeft,
  Phone,
  User,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  blogPosts,
  getPostBySlug,
  getSortedPosts,
  type BlogBlock,
} from "@/lib/blog";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";

/* ============================================================================
 *  CASANOSTRA — صفحة مقال مدوّنة فردي (/blog/[slug])
 * ============================================================================
 *
 *  بنية الصفحة:
 *    1. Hero: صورة الغلاف بحجم كبير + overlay داكن + breadcrumb + العنوان +
 *       الملخص + بيانات الكاتب والتاريخ ومدة القراءة
 *    2. محتوى المقال: رسم ديناميكي للكتل (headings/paragraphs/lists)
 *    3. بطاقة CTA: "احجز رحلتك الآن عبر واتساب" برسالة جاهزة
 *    4. رابط العودة إلى قائمة المقالات
 *    5. مقالات ذات صلة: 2 مقالات أخرى في شبكة بطاقات صغيرة
 * ============================================================================ */

/* ====================================================================
 *  Static Site Generation + Metadata
 * ==================================================================== */

/** توليد كل صفحات المقالات ثابتةً وقت البناء (SSG) */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/** توليد metadata خاصة بكل مقال — تحسين SEO */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const locale = await getLocale();

  if (!post) {
    return { title: "المقال غير موجود", robots: { index: false, follow: false } };
  }

  const index = blogPosts.findIndex((item) => item.slug === slug) + 1;
  const t = await getTranslations("home");
  const title = t(`blogPost${index}Title`);
  const description = t(`blogPost${index}Excerpt`);

  return {
    title,
    description,
    keywords: [
      title,
      "CASANOSTRA",
    ],
    openGraph: {
      title: `${title} | CASANOSTRA`,
      description,
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [locale === "ar" ? post.author : "CASANOSTRA"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.coverImage],
    },
    robots: { index: locale === "ar", follow: true },
    alternates: { canonical: `/blog/${slug}`, languages: {} },
  };
}

/* ====================================================================
 *  الصفحة الرئيسية
 * ==================================================================== */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const locale = await getLocale();
  const tHome = await getTranslations("home");
  const tNav = await getTranslations("nav");

  /* إرجاع 404 إن لم يوجد المقال */
  if (!post) {
    notFound();
  }

  const postIndex = blogPosts.findIndex((item) => item.slug === slug) + 1;
  const localizedPost = {
    title: tHome(`blogPost${postIndex}Title`),
    excerpt: tHome(`blogPost${postIndex}Excerpt`),
    category: tHome(`blogCategory${postIndex}`),
    author: locale === "ar" ? post.author : "CASANOSTRA",
    readTime: tHome("readMinutes", { count: Number(post.readTime.match(/\d+/)?.[0] || 1) }),
  };

  /* مقالات ذات صلة — أول مقالين آخرين غير الحالي */
  const relatedPosts = getSortedPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const localizedRelatedPosts = relatedPosts.map((related) => {
    const index = blogPosts.findIndex((item) => item.slug === related.slug) + 1;
    return {
      ...related,
      title: tHome(`blogPost${index}Title`),
      excerpt: tHome(`blogPost${index}Excerpt`),
      category: tHome(`blogCategory${index}`),
    };
  });

  /* رابط واتساب لحجز رحلة (بعد قراءة المقال) */
  const whatsappLink = buildSimpleWhatsAppLink(tHome("ctaWhatsappMessage"));

  return (
    <>
      <article>
        {/* ================================================================
         * 1. HERO — صورة الغلاف + العنوان + البيانات
         * ================================================================ */}
        <header className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
          <Image
            src={post.coverImage}
            alt={localizedPost.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* overlay متدرّج داكن */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(15, 30, 61, 0.95) 0%, rgba(15, 30, 61, 0.5) 50%, rgba(15, 30, 61, 0.3) 100%)",
            }}
          />

          {/* المحتوى فوق الصورة */}
          <div className="relative z-10 container mx-auto px-4 pb-12 lg:pb-16">
            {/* breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">
                {tNav("home")}
              </Link>
              <ChevronLeft className="w-3 h-3" />
              <Link href="/blog" className="hover:text-gold transition-colors">
                {tNav("blog")}
              </Link>
              <ChevronLeft className="w-3 h-3" />
              <span className="text-gold truncate">{localizedPost.category}</span>
            </nav>

            {/* تصنيف المقال — شارة علوية */}
            <div className="inline-flex items-center gap-1.5 bg-gold/15 backdrop-blur-sm border border-gold/40 text-gold px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{localizedPost.category}</span>
            </div>

            {/* العنوان الرئيسي */}
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight max-w-4xl">
              {localizedPost.title}
            </h1>

            {/* الملخص */}
            <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-3xl mb-6">
              {localizedPost.excerpt}
            </p>

            {/* بيانات: الكاتب + التاريخ + مدة القراءة */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                  <User className="w-4 h-4 text-gold" />
                </div>
                <span className="font-medium text-white">{localizedPost.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold" />
                <span>{localizedPost.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================
         * 2. محتوى المقال
         * ================================================================ */}
        <section className="py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* رسم المحتوى ديناميكياً */}
              <div className="space-y-6">
                {locale === "ar" ? (
                  post.content.map((block, idx) => <ContentBlock key={idx} block={block} />)
                ) : (
                  <p className="rounded-xl border border-gold/20 bg-gold/5 p-5 text-sm text-muted-foreground leading-relaxed">
                    {locale === "en" ? "The full article is currently available in Arabic. A translated version is being prepared; contact our team for help with this topic." :
                      locale === "tr" ? "Makalenin tamamı şu anda Arapça olarak mevcuttur. Çeviri hazırlanıyor; bu konuda yardım için ekibimizle iletişime geçin." :
                        locale === "fr" ? "L'article complet est actuellement disponible en arabe. Une traduction est en préparation ; contactez notre équipe pour toute question sur ce sujet." :
                          "Полная версия статьи пока доступна на арабском языке. Перевод готовится; обратитесь к нашей команде за помощью по этой теме."}
                  </p>
                )}
              </div>

              {/* ── بطاقة CTA "احجز رحلتك الآن" ── */}
              <div className="mt-12 p-6 lg:p-8 rounded-2xl bg-luxury-gradient text-navy-foreground text-center relative overflow-hidden">
                {/* توهج ذهبي خلفي */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(201, 166, 92, 0.2) 0%, transparent 60%)",
                  }}
                />

                <div className="relative">
                  {/* أيقونة */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/20 backdrop-blur-sm mb-4">
                    <Phone className="w-7 h-7 text-gold" />
                  </div>

                  {/* العنوان */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {locale === "ar" ? "جاهز لرحلتك إلى تركيا؟" : locale === "en" ? "Ready for your trip to Turkey?" : locale === "tr" ? "Türkiye seyahatinize hazır mısınız?" : locale === "fr" ? "Prêt pour votre voyage en Turquie ?" : "Готовы к поездке в Турцию?"}
                  </h3>

                  {/* الوصف */}
                  <p className="text-sm text-white/80 mb-6 leading-relaxed max-w-xl mx-auto">
                    {locale === "ar" ? "بناءً على هذا المقال، نقدّم لك باقات سياحية متكاملة لجميع الوجهات المذكورة. تواصل معنا الآن واحصل على عرض خاص!" : locale === "en" ? "We offer complete travel packages for the destinations in this article. Contact us for a tailored offer." : locale === "tr" ? "Bu makaledeki destinasyonlar için kapsamlı seyahat paketleri sunuyoruz. Size özel teklif için bize ulaşın." : locale === "fr" ? "Nous proposons des séjours complets vers les destinations de cet article. Contactez-nous pour une offre personnalisée." : "Мы предлагаем комплексные турпакеты по направлениям из этой статьи. Свяжитесь с нами, чтобы получить индивидуальное предложение."}
                  </p>

                  {/* زر واتساب */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-luxury-lg hover:bg-[#1ebd5a] transition-all hover:scale-105 active:scale-95"
                  >
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{locale === "ar" ? "احجز رحلتك الآن" : locale === "en" ? "Book Your Trip" : locale === "tr" ? "Seyahatinizi Rezerve Edin" : locale === "fr" ? "Réservez votre voyage" : "Забронировать поездку"}</span>
                  </a>
                </div>
              </div>

              {/* ── رابط العودة لقائمة المقالات ── */}
              <div className="mt-10 pt-10 border-t border-border">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-gold-readable hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{locale === "ar" ? "العودة إلى جميع المقالات" : locale === "en" ? "Back to all articles" : locale === "tr" ? "Tüm makalelere dön" : locale === "fr" ? "Retour à tous les articles" : "Вернуться ко всем статьям"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
         * 3. مقالات ذات صلة
         * ================================================================ */}
        {locale === "ar" && <section className="py-16 lg:py-20 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            {/* عنوان القسم */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-gold-readable text-sm font-medium mb-3">
                <span className="w-8 h-px bg-gold" />
                <span>{locale === "ar" ? "مقالات ذات صلة" : locale === "en" ? "Related Articles" : locale === "tr" ? "İlgili Makaleler" : locale === "fr" ? "Articles similaires" : "Похожие статьи"}</span>
                <span className="w-8 h-px bg-gold" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy">
                {locale === "ar" ? "اقرأ أيضاً" : locale === "en" ? "Read Also" : locale === "tr" ? "Bunları da okuyun" : locale === "fr" ? "À lire aussi" : "Читайте также"}
              </h2>
            </div>

            {/* شبكة المقالات ذات الصلة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {localizedRelatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 hover:shadow-luxury hover:-translate-y-1 transition-all duration-300"
                >
                  {/* صورة الغلاف */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={related.coverImage}
                      alt={related.title}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy/95 via-navy/20 to-transparent" />
                    <span className="absolute top-3 right-3 bg-gold text-navy text-xs font-bold px-2.5 py-1 rounded-md">
                      {related.category}
                    </span>
                  </div>

                  {/* جسم البطاقة */}
                  <div className="p-5">
                    <h3 className="font-bold text-navy mb-2 group-hover:text-gold-800 dark:group-hover:text-gold-300 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {related.excerpt}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-readable">
                      <span>{locale === "ar" ? "اقرأ المقال" : locale === "en" ? "Read Article" : locale === "tr" ? "Makaleyi Oku" : locale === "fr" ? "Lire l'article" : "Читать статью"}</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>}
      </article>
    </>
  );
}

/* ====================================================================
 *  مكوّن مساعد — رسم كتلة محتوى واحدة ديناميكياً
 * ==================================================================== */

function ContentBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    /* عنوان فرعي — بخط ذهبي جانبي */
    case "heading":
      return (
        <h2 className="text-2xl lg:text-3xl font-bold text-navy mt-10 mb-4 flex items-start gap-3">
          <span className="w-1 h-8 bg-gold rounded-full flex-shrink-0 mt-1.5" />
          <span>{block.content}</span>
        </h2>
      );

    /* فقرة نص عادية — بـ leading-loose لراحة القراءة */
    case "paragraph":
      return (
        <p className="text-base lg:text-lg text-foreground/80 leading-loose">
          {block.content}
        </p>
      );

    /* قائمة — في صندوق رمادي مع علامات ✓ ذهبية */
    case "list":
      return (
        <div className="bg-muted/30 rounded-xl p-5 my-4">
          {block.content && (
            <p className="text-sm font-bold text-navy mb-3">{block.content}</p>
          )}
          <ul className="space-y-2.5">
            {block.items?.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm lg:text-base text-foreground/80"
              >
                <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    /* الافتراضي — لا شيء */
    default:
      return null;
  }
}
