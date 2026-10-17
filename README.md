<div dir="rtl" align="center">

# 🏛️ CASANOSTRA — موقع شركة سياحة وسفر في تركيا

موقع ويب متكامل متعدد اللغات (العربية، الإنجليزية، التركية، الفرنسية، الروسية) لشركة سياحة في إسطنبول، مع لوحة تحكم للمقالات وترجمة آلية ونظام حجوزات عبر واتساب.

</div>

---

<div align="center">

**CASANOSTRA — Multilingual travel agency website for Turkey**

A production-ready, 5-locale (AR/EN/TR/FR/RU) tourism website with an admin panel, AI auto-translation, and WhatsApp-based booking.

</div>

---

## ✨ المميزات | Features

<div dir="rtl">

### الموقع
- **5 لغات كاملة** مع تبديل RTL/LTR تلقائي (العربية، الإنجليزية، التركية، الفرنسية، الروسية)
- **11 صفحة خدمة** — تأشيرات، جولات يومية، جولات خاصة وجماعية، VIP، سياحة علاجية، حج وعمرة، وغيرها
- **مدونة** تجمع المقالات الثابتة مع المقالات المُنشأة من لوحة التحكم
- **حجز فوري عبر واتساب** — نماذج الحجز تبني رسالة جاهزة وتفتح واتساب
- **وضع ليلي/نهاري** مع حفظ التفضيل
- **تصميم متجاوب** بالكامل (موبايل ← ديسكتوب)

### لوحة التحكم `/admin`
- تسجيل دخول محمي (تشفير كلمة المرور + تحديد معدل المحاولات ضد هجمات التخمين)
- **ترجمة آلية**: اكتب المقال بالعربية → يُترجم تلقائياً إلى EN/TR/FR/RU بالتوازي. المزوّد: `ANTHROPIC_API_KEY` (الأفضل) أو `OPENAI_API_KEY` أو مترجم مجاني احتياطي بلا مفتاح. أي ترجمة تعدّلها يدوياً تبقى محفوظة، وإذا عدّلت النص العربي لاحقاً تُعاد ترجمة اللغات التي لم تحرّرها يدوياً. وإن فشلت الترجمة تظهر رسالة بالسبب بدل الصمت.
- رفع صور الغلاف (تُخزَّن في قاعدة البيانات)
- واجهة لوحة التحكم نفسها بخمس لغات + وضع ليلي/نهاري

### SEO
- بيانات منظّمة JSON-LD (`TravelAgency` + `WebSite` + `BlogPosting` + `BreadcrumbList`)
- `hreflang` في HTML وفي ترويسات HTTP لكل اللغات + `x-default`
- خرائط موقع تلقائية تشمل المدونة ومقالات قاعدة البيانات (125+ رابط)
- Canonical صحيح لكل صفحة، بطاقات Open Graph و Twitter

</div>

<div align="center">

| | |
|---|---|
| **🌐 Locales** | ar · en · tr · fr · ru (RTL support) |
| **🔧 Stack** | Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui |
| **🗄️ Database** | Prisma ORM + SQLite |
| **🤖 AI** | z-ai-web-dev-sdk (auto-translation AR → 4 languages) |
| **📦 Runtime** | Bun (recommended) / npm / pnpm |

</div>

---

## 🚀 التشغيل | Getting Started

<div dir="rtl">

### المتطلبات
- [Bun](https://bun.sh) v1+ (أو Node.js 20+ / npm)

### خطوات التثبيت

```bash
# 1) استنساخ المشروع وتثبيت الاعتماديات
bun install

# 2) إنشاء ملف البيئة من النموذج
cp .env.example .env

# 3) عدّل قيم .env (انظر الجدول أدناه)

# 4) إنشاء قاعدة البيانات
bun run db:push

# 5) التشغيل
bun run dev
```

ثم افتح `http://localhost:3000`

### متغيرات البيئة

| المتغير | الوصف |
|---|---|
| `DATABASE_URL` | مسار قاعدة SQLite (نسبي إلى `prisma/`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | رقم واتساب الحجوزات بصيغة دولية بدون `+` |
| `ADMIN_EMAIL` | بريد مسؤول لوحة التحكم (يُنشأ تلقائياً عند أول دخول) |
| `ADMIN_PASSWORD` | كلمة مرور المسؤول |
| `ADMIN_SESSION_SECRET` | مفتاح تشفير الجلسة — أنشئه بـ `openssl rand -hex 32` |

> ⚠️ **مهم**: عند أول تسجيل دخول إلى `/admin` يُنشأ حساب المسؤول من متغيرات البيئة تلقائياً.

### البناء للإنتاج

```bash
bun run build
bun start
```

</div>

<div dir="ltr">

```bash
bun install
cp .env.example .env   # then edit values
bun run db:push        # create SQLite database
bun run dev            # http://localhost:3000
```

</div>

---

## 📁 بنية المشروع | Structure

```
├── prisma/schema.prisma        # AdminUser, Post, BlogImage
├── db/                         # قاعدة SQLite (تُنشأ عبر db:push)
├── public/images/services/     # صور الخدمات والمعرض
├── src/
│   ├── app/
│   │   ├── [locale]/           # الموقع: 5 لغات
│   │   │   ├── services/[slug] # 11 خدمة
│   │   │   └── blog/           # المدونة
│   │   ├── admin/              # لوحة التحكم
│   │   ├── api/                # admin (login/posts/upload) + blog-images
│   │   └── sitemap.ts          # خريطة موقع ديناميكية
│   ├── lib/
│   │   ├── site-config.ts      # إعدادات وبيانات الخدمات
│   │   ├── auto-translate.ts   # الترجمة الآلية LLM
│   │   ├── rate-limit.ts       # تحديد معدل محاولات الدخول
│   │   └── admin-i18n.ts       # ترجمات واجهة لوحة التحكم
│   └── i18n/                   # رسائل الموقع (5 لغات)
```

---

## 🔒 الأمان | Security

<div dir="rtl">

- كلمات المرور مشفّرة بـ scrypt (بطيئة عمداً = حماية من التخمين)
- تحديد معدل: 5 محاولات دخول فاشلة لكل IP كل 15 دقيقة
- صور الرفع تُخزَّن داخل قاعدة البيانات (لا ملفات مؤقتة)
- `.env` مستثنى من Git — لا ترتكبه أبداً

</div>

<div align="center">

---

**Made with ❤️ for CASANOSTRA — Istanbul, Turkey**

</div>
