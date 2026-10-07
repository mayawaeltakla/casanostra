# CASANOSTRA — MASTER FIX & QUALITY PLAN

> **هذه الخطة موجهة لوكيل ذكاء اصطناعي سيعمل مباشرة على مستودع CASANOSTRA.**
>
> الهدف ليس فقط جعل `build` ينجح، بل الوصول إلى موقع إنتاجي مستقر وقابل للاختبار، دون أخطاء TypeScript أو lint أو i18n أو runtime أو routing أو accessibility أو assets أو SEO الأساسية، مع الحفاظ على المحتوى وعدم اختراع معلومات تجارية أو قانونية.
>
> **قاعدة أساسية:** لا تُنفّذ الخطة كاملة دفعة واحدة. نفّذ **STEP واحدة فقط**، طبّق تحققها، اكتب التقرير، ثم توقف حتى يصدر المستخدم موافقة صريحة على الانتقال للـSTEP التالية.
>
> **لا تعدّل هذا الملف أثناء التنفيذ** إلا إذا طلب المستخدم ذلك. هذا الملف هو مواصفة التنفيذ، وليس ملف عمل يومي.

---

## 0. الهدف النهائي

بنهاية الخطة يجب أن يكون CASANOSTRA موقع Next.js إنتاجي يعمل بثبات على اللغات الخمس:

- `ar`
- `en`
- `tr`
- `fr`
- `ru`

ويجب أن يحقق على الأقل:

1. `tsc --noEmit` بلا أخطاء.
2. ESLint بلا أخطاء، والتخلص التدريجي من التحذيرات المستهدفة حتى تصبح بوابة الجودة خضراء.
3. فحص i18n بلا مفاتيح ناقصة أو نصوص غير مترجمة خارج الاستثناءات المعلنة.
4. `next build` ناجح فعليًا.
5. تشغيل نسخة الإنتاج `standalone` ناجح.
6. Playwright كامل ناجح.
7. لا `pageerror` ولا أخطاء Console غير متوقعة أثناء smoke tests.
8. لا طلبات HTML/assets أساسية ترجع `4xx/5xx`.
9. لا روابط داخلية مكسورة أو route ميتة.
10. نماذج الحجز والتواصل والمساعدة تعمل بسلوك واضح ومتحقق.
11. keyboard navigation وaxe بلا أخطاء `serious`/`critical`.
12. RTL/LTR واللغة والـrouting صحيحة على الخادم.
13. canonical / hreflang / sitemap / robots صحيحة.
14. لا صور مكسورة، ولا `<img>` خام في الإنتاج إذا أمكن تحويله بأمان إلى `next/image`.
15. الصور والفيديوهات لا تسبب 404 ولا تحميلًا غير ضروريًا.
16. لا ادعاءات تجارية/قانونية/رقمية غير موثقة.
17. الرؤوس الأمنية لا تكسر الموقع، ويجري تفعيل CSP تدريجيًا بدل القفز إلى سياسة تكسر الموارد.
18. يتم اختبار نسخة الإنتاج نفسها، وليس dev server فقط.

> **ملاحظة صدق:** لا تُكتب عبارة «الموقع بلا أخطاء» في أي تقرير ما لم تُشغّل بوابة الاختبارات المطلوبة فعليًا وتذكر نتائجها.

---

# 1. قواعد تنفيذ إلزامية

## 1.1 — خطوة واحدة في كل مرة

- نفّذ `STEP x.y` واحدة.
- تحقق من نجاحها.
- لا تبدأ `STEP` التالية دون موافقة صريحة.
- إذا تعارضت خطوة مع الواقع الحالي للمستودع، **لا تخمّن**: سجّل الفرق واطلب قرارًا.

## 1.2 — تحقق قبل التعديل

قبل لمس ملف مذكور في الخطة:

1. افتحه.
2. تأكد أن المشكلة ما زالت موجودة.
3. قارن مع `git diff` الحالي.
4. لا تفترض أن رقم السطر المذكور ما زال صحيحًا.

أرقام الأسطر في هذه الخطة إرشادية فقط.

## 1.3 — حماية تعديلات المستخدم الحالية

**مهم جدًا:** المستودع الذي تم تحليله يحتوي تعديلات موجودة مسبقًا في `git status` وملفات assets جديدة.

على الوكيل أن يبدأ دائمًا بـ:

```bash
 git status --short
 git diff --stat
 git diff --name-only
```

ويعتبر أي تعديل سابق **جزءًا من الحالة الحالية**.

### ممنوع

- `git reset --hard`
- `git checkout -- .`
- `git clean -fd`
- حذف تعديلات غير مفهومة
- استبدال الملفات بنسخ من `.kilo/worktrees/...`

إلا بعد قرار صريح من المستخدم.

## 1.4 — لا تعتمد على `.kilo/worktrees`

الأرشيف يحتوي نسخة عمل داخل:

```text
.kilo/worktrees/strengthened-dataset/
```

هذه ليست مصدر الحقيقة الحالي.

**مصدر الحقيقة هو جذر المشروع:**

```text
casanostra-main/casanostra-main/
```

ولا تنسخ ملفات من `.kilo/worktrees` إلى الجذر لمجرد أنها تبدو أحدث.

## 1.5 — لا اختلاق للمعلومات

ممنوع اختراع أو تخمين:

- رقم WhatsApp.
- رقم هاتف.
- البريد الرسمي.
- النطاق الرسمي.
- رقم TÜRSAB أو أي ترخيص.
- الاسم القانوني.
- عنوان الشركة.
- تقييمات العملاء.
- أرقام الإحصائيات.
- أسعار أو خصومات حقيقية.
- تواريخ انتهاء عروض.
- نصوص قانونية.
- ترجمة قانونية غير موثقة.

أي بند يعتمد على هذه البيانات يصبح `BLOCKED — USER DECISION` حتى يقدّمها المستخدم.

## 1.6 — أقل تغيير آمن

- لا تعيد تنسيق ملفات كاملة دون الحاجة.
- لا تعيد تسمية APIs بلا سبب.
- لا تضف مكتبة جديدة إذا كان المطلوب يمكن تنفيذه بالموجود.
- إذا احتجت مكتبة جديدة، اذكر السبب والمكتبة قبل تنفيذ الخطوة.

## 1.7 — لا تخفيف للاختبارات

ممنوع:

- `eslint-disable` كحل سريع.
- `@ts-ignore` أو `@ts-expect-error` لإخفاء عطل فعلي.
- `skip` لاختبار فاشل.
- خفض assertions.
- رفع timeouts لمجرد إخفاء crash أو deadlock.
- حذف اختبار لأنه يكشف عطلًا.

يسمح برفع timeout فقط عندما يوجد دليل أن البطء طبيعي ومحدود، مع توثيق السبب.

## 1.8 — Git

إذا كان المستخدم يريد إدارة Git:

```text
fix/phase-0
fix/phase-1
fix/phase-2
fix/phase-3
fix/phase-4
fix/phase-5
fix/release-qa
```

بعد موافقة المستخدم على كل STEP:

```text
fix(<area>): <summary> [STEP x.y]
```

لا `push` ولا `force push` ولا دمج إلى `main` تلقائيًا.

---

# 2. تقرير إلزامي بعد كل STEP

استخدم هذا القالب بالضبط:

```text
STEP x.y — الحالة: تم / تم جزئياً / متوقف / بانتظار قرار

1) ما وجدته
- الملف:
- السطر/الدليل:
- الحالة قبل التعديل:

2) ما غيّرته
- الملف 1:
- الملف 2:

3) التحقق الذي شغّلته فعلياً
- command:
- result:
- duration إن كانت مفيدة:

4) الاختبارات التي لم أستطع تشغيلها
- السبب:

5) المخاطر أو القرارات المعلقة
- ...

6) git diff --stat
...
```

**لا تقل «نجح» إلا إذا شغّلت الأمر فعليًا.**

---

# 3. خريطة الواقع الحالي التي يجب عدم افتراض عكسها

بحسب نسخة المشروع التي تم تحليلها عند إعداد هذه الخطة:

## 3.1 — Stack

```text
Next.js 16.x
React 19
TypeScript 5.x
next-intl 4.x
Tailwind CSS 4
Prisma 6
Playwright
sharp
```

## 3.2 — السكربتات الحالية المهمة

في `package.json`:

```text
npm run dev
npm run build
npm run start
npm run check
npm run lint
npm run check:i18n
npm run test
npm run test:e2e
```

لاحظ أن:

```json
"build": "npm run check:i18n && next build && node scripts/copy-build-assets.mjs"
```

لذلك يجب استخدام أمر `npm run build` عند قياس build الحقيقي، وليس `next build` وحده فقط.

## 3.3 — lockfiles

المستودع يحتوي:

```text
package-lock.json
bun.lock
```

ويجب حسم lockfile الرسمي مرة واحدة في المرحلة المناسبة بدل تركهما معًا بلا سبب.

## 3.4 — routing/i18n الحالي

يوجد:

```text
src/i18n/routing.ts
src/i18n/request.ts
src/i18n/messages.ts
src/i18n/page-messages.ts
src/i18n/service-details.ts
```

والـ`routing.ts` يعرف:

```text
localePrefix: "as-needed"
```

لكن لا يوجد حاليًا استخدام فعلي كامل لـrouting middleware.

`request.ts` الحالي يقرأ `casanostra-locale` من cookie.

## 3.5 — الصور الحالية

يوجد:

```text
public/images/offers/stays-morocco.jpg
```

لكن هذا **لا يعني** أن كل الصور المطلوبة متوفرة.

كما توجد حاليًا **5 مراجع `<img>` خام** في الكود، منها `HeroSection` و`BlogContent` و`Blog detail` و`FeaturedOffers` و`BlogSection`.

لا تستخدم أرقامًا قديمة مثل «3 صور» دون إعادة الفحص.

## 3.6 — تعديلات موجودة مسبقًا يجب الحفاظ عليها

من الحالة التي تمت معاينتها:

- `tsconfig.json` يستبعد `examples` و`skills`.
- `react-resizable-panels` موجودة في `package.json` بإصدار متوافق حاليًا بحسب النسخة المفحوصة.
- `.gitignore` يتضمن env وNext artifacts و`*.tsbuildinfo` و`.kilo` و`.agent`.

هذه الأمور يجب **التحقق منها قبل تنفيذ خطوات cleanup**، وعدم إعادة إدخال المشكلة الأصلية إذا كانت محلولة.

---

# 4. جدول القرارات التي يجب أخذها من المستخدم

لا تفترض أي إجابة.

| ID | القرار | المطلوب |
|---|---|---|
| D1 | WhatsApp والهاتف | الرقم الحقيقي بصيغة دولية + صيغة العرض |
| D2 | النطاق والبريد | domain رسمي + email عام + email للـKVKK إن وجد |
| D3 | الهوية القانونية | اسم الشركة + رقم الترخيص + العنوان أو قرار إخفاء الشارة |
| D4 | الإحصائيات والشهادات | الإبقاء مع إثبات أو إخفاؤها |
| D5 | صفحة الخطط | الإبقاء / الإخفاء / مراجعة قانونية أولًا |
| D6 | النشر | Vercel / VPS / Caddy / غيره |
| D7 | OG image | ملف حقيقي أو موافقة على إنشائه |
| D8 | routing | locale الافتراضي + `as-needed` أو سياسة أخرى |
| D9 | HTTPS | تأكيد كامل قبل HSTS |
| D10 | backend | أين تحفظ الطلبات وكيف تصل الإشعارات |
| D11 | الصور | صور بديلة حقيقية أو موافقة على مصادر بديلة |
| D12 | WhatsApp color | كحلي على أخضر WhatsApp أو أخضر داكن + أبيض |
| D13 | lockfile | npm (`package-lock.json`) أو bun (`bun.lock`) |
| D14 | online payment | هل يوجد دفع حقيقي في الموقع؟ |
| D15 | عروض | تواريخ نهاية حقيقية أو حذف عبارة انتهاء |
| D16 | لغة رسائل WhatsApp | لغة الزائر أو العربية دائمًا |
| D17 | الحد الأقصى للأشخاص | القيمة المطلوبة بدل افتراض 9 |
| D18 | حد الركاب | القيمة المطلوبة بدل افتراض 50 |

---

# 5. المرحلة 0 — حماية المشروع وإنشاء خط أساس

## STEP 0.1 — Repository Reconciliation

### الهدف

فهم الحالة الحالية قبل أي إصلاح.

### افحص

```bash
pwd
 git status --short
 git diff --stat
 git diff --name-only
 git branch --show-current
 git rev-parse --short HEAD
```

ثم:

```bash
find . -maxdepth 2 -type f | sort
```

مع استبعاد:

```text
.git
node_modules
.next
.kilo
.agent
```

### يجب تسجيل

- branch الحالي.
- الملفات المعدلة مسبقًا.
- الملفات غير المتتبعة.
- وجود `package-lock.json` و`bun.lock`.
- وجود `.env` وعدم طباعة قيم أسرارها في التقرير.

### معيار النجاح

لا يتم فقد أي تعديل سابق، ولا يوجد `reset`، وتصبح لدينا قائمة baseline واضحة.

---

## STEP 0.2 — Baseline كامل

### شغّل

```bash
npm run check
npm run build
npm run test:e2e -- --workers=2
```

ثم، إن كان الخادم يعمل:

```bash
npm run start
```

وسجّل:

- TypeScript errors/warnings.
- lint errors/warnings.
- check:i18n result.
- build route table.
- Playwright pass/fail/skip.
- زمن build والاختبارات.
- حجم `.next/static/chunks/**/*.js` الخام.
- حجم gzip إن أمكن.

### لا تعتبر build ناجحًا إذا

- تحقق `next build` لكن فشل `scripts/copy-build-assets.mjs`.
- أو نجح compile وفشل start.

### أنشئ/حدّث

```text
 docs/baseline.md
```

لكن لا تعدّل source code في هذه الخطوة.

---

## STEP 0.3 — Runtime / HTTP / Console Smoke Gate ⭐ إضافة أساسية

### الهدف

اكتشاف الأخطاء التي لا يلتقطها `tsc` أو `lint`.

### أضف اختبار Playwright مستقل

مثلًا:

```text
 tests/e2e/runtime.spec.ts
```

ويجب أن يختبر:

1. فتح routes أساسية.
2. الاستماع إلى:
   - `pageerror`
   - `console` من النوع `error`
   - `requestfailed`
3. مراقبة responses ذات status `>=400` للموارد الداخلية.
4. فشل الاختبار عند وجود crash غير متوقع.

### لا تسجل أخطاء متوقعة على أنها failures

مثلاً:

- 404 مقصودة لـroute غير موجودة في اختبار 404.
- requests خارجية مقصودة إذا كانت موثقة ومقبولة.

لكن أي failure غير متوقع في assets أو API أو JavaScript يجب أن يفشل الاختبار.

### معيار النجاح

كل route smoke target تفتح بدون:

```text
pageerror
unexpected console.error
unexpected requestfailed
unexpected 4xx/5xx
```

---

## STEP 0.4 — Internal Link Integrity ⭐ إضافة أساسية

### الهدف

منع أي رابط داخلي ميت بعد تغييرات routing/i18n.

### نفّذ

أضف سكربت أو Playwright crawler يجمع الروابط الداخلية من الصفحة.

افحص:

- `href` يبدأ بـ`/`.
- `Link` التي تنتج مسارات داخلية.
- الروابط الديناميكية الأساسية.

اختبر كل route حتى لا يرجع 404.

استثناءات صريحة:

```text
anchor links مثل #faq
mailto:
tel:
https://wa.me/...
external URLs
```

هذه تحتاج validation منفصلة.

### بعد i18n migration

يجب تنفيذ الفحص بكل locale.

### معيار النجاح

صفر internal 404.

---

## STEP 0.5 — Data Integrity Contract ⭐ إضافة أساسية

### الهدف

منع التناقض بين مصادر البيانات.

المصادر الحالية:

```text
src/lib/services.ts
src/lib/site-config.ts
src/lib/blog.ts
src/i18n/messages.ts
src/i18n/page-messages.ts
src/i18n/service-details.ts
```

### أنشئ

```text
scripts/check-data-integrity.mjs
```

### يجب فحص

#### الخدمات

- عدم وجود duplicate slugs.
- عدد الخدمات في كل مصدر متوافق.
- كل خدمة لها slug صالح.
- كل خدمة مستخدمة في route لها definition.
- كل route slug له page generation.
- كل `showWhen.field` موجود.
- كل `showWhen.equals` تطابق قيمة معرفة.
- كل `personFields` لها أنواع صالحة.

#### الصور

- كل path يبدأ بـ`/` ويشير إلى ملف موجود إن كان local.
- لا reference لملف منتهي أو غير موجود.

#### المدونة

- duplicate slug ممنوع.
- تاريخ نشر صالح.
- كل post route قابل للتوليد.

#### الترجمات

- locale موجود ضمن supported locales.
- لا fallback صامت غير مقصود.

### معيار النجاح

```text
DATA INTEGRITY: PASS
```

مع قائمة واضحة عند الفشل.

---

## STEP 0.6 — WhatsApp والهاتف ⚠ D1

### المشكلة الحالية

يوجد placeholder من نوع:

```text
90XXXXXXXXXX
```

وقيم هاتف placeholder في الإعداد.

### المطلوب

**توقف واطلب D1 قبل كتابة أي رقم.**

بعد استلام البيانات:

1. اجعل رقم العرض في `siteConfig.contact`.
2. اجعل WhatsApp في `NEXT_PUBLIC_WHATSAPP_NUMBER`.
3. أنشئ `.env.example` بدون قيمة حقيقية.
4. تحقق أن `.env*` لا يدخل Git إلا `.env.example`.
5. أنشئ:

```text
scripts/check-config.mjs
```

ويفشل إذا:

```regex
X{3,}
```

بقيت في بيانات الاتصال، أو رقم WhatsApp المنظف ليس:

```regex
^\d{8,15}$
```

### الاختبار

تحقق من كل:

```text
WhatsApp button
BookingForm
Contact
Quick Booking
Service pages
```

أنها تستخدم الرقم الصحيح.

---

## STEP 0.7 — النطاق والبريد ⚠ D2

### المطلوب

توحيد المصدر إلى:

```text
siteConfig.url
siteConfig.contact.email
siteConfig.contact.privacyEmail
```

وابحث:

```bash
grep -RIn "casanostra" src
```

لا تترك domain hardcoded في عدة أماكن دون سبب.

### الصفحات القانونية

لا تعيد صياغة النصوص القانونية في هذه الخطوة.

غيّر domain/email فقط بعد موافقة المستخدم.

---

## STEP 0.8 — الادعاءات التجارية غير الموثقة ⚠ D3/D4/D5/D14/D15

### راجع

- Stats.
- Testimonials.
- WhatsApp unread badge.
- online status.
- licensed agency.
- annual plans.
- online payment claims.
- offer expiry.
- reference prices / discounts.

### القاعدة

ما لا يوجد له إثبات أو قرار مستخدم يجب ألا يظهر للزائر كحقيقة.

### WhatsApp

احذف/أوقف أي:

```text
"1 unread"
"online now"
```

إذا لم تكن حالة حقيقية.

### license

العبارة لا تظهر إلا مع:

```text
siteConfig.license.number
```

وبمعلومة حقيقية.

### plans

إذا تقرر الإخفاء:

- من navigation.
- footer.
- home card.
- sitemap.
- route behavior حسب القرار: `notFound()` أو `noindex`.

---

## STEP 0.9 — Caddy security review ⚠ D6

الحالة الحالية في `Caddyfile` تحتوي مسارًا من الشكل:

```text
reverse_proxy localhost:{query.XTransformPort}
```

وهذا يعني أن مدخل المستخدم يتحكم بالمنفذ المحلي الهدف.

### المطلوب

اسأل عن بيئة النشر.

إذا `Caddyfile` غير مستخدم:

- لا تفترض حذفه فورًا إذا كانت هناك وثائق deployment تعتمد عليه؛ افحص references أولًا.

إذا مستخدم:

- أزل routing المبني على query parameter.
- استخدم upstream ثابتًا.

### معيار النجاح

لا توجد proxy destination مشتقة من مدخل المستخدم.

---

## STEP 0.10 — OG Image ⚠ D7

الكود يشير إلى:

```text
/images/og-cover.jpg
```

لكن نسخة المشروع الحالية تحتوي `public/images/offers/stays-morocco.jpg` ولا تضمن وجود `og-cover.jpg`.

### المطلوب

اطلب صورة حقيقية أو موافقة على إنشائها.

الهدف:

```text
1200x630
JPG
```

اختبر:

```text
GET /images/og-cover.jpg → 200
```

وتحقق من:

```text
og:image
twitter:image
```

باستخدام `metadataBase`.

---

## STEP 0.11 — Phase 0 Gate

شغّل:

```bash
npm run check
npm run build
npm run test:e2e -- --workers=2
```

و:

- runtime smoke.
- link integrity.
- data integrity.

لا تنتقل للمرحلة 1 قبل green gate أو تقرير واضح بالموانع.

---

# 6. المرحلة 1 — إصلاح الأعطال الوظيفية

## STEP 1.1 — BookingForm: window.open / submit flow ⚠ D16

### المشكلة

النمط الحالي يتضمن delay مصطنعًا قبل `window.open()`، ما قد يجعل popup blocker يمنع الفتح لأن الاستدعاء لم يعد ضمن user gesture.

### المطلوب

1. نفّذ validation أولًا.
2. ابنِ WhatsApp URL.
3. نفّذ `window.open()` أو آلية navigation المطلوبة **مباشرة من سياق submit** قدر الإمكان.
4. لا تعرض `sent` قبل التأكد أن الإجراء الذي يمكن للتطبيق معرفته قد تم.
5. رسالة WhatsApp تستخدم قرار D16.

### يجب اختبار

- desktop.
- mobile emulation.
- popup blocker behavior قدر الإمكان.
- double click.

### لا تضف backend هنا.

backend في STEP 5.1 فقط.

---

## STEP 1.2 — PeopleCounter

### المشكلة

زر `-` العام يعتمد على index ثابت وقد يحذف أول شخص بدل الأخير.

### المطلوب

حذف:

```text
count - 1
```

بدل:

```text
0
```

### الحد الأعلى

لا تفترض قيمة 9.

استخدم D17.

### الاختبار

1. أضف 3 أشخاص.
2. عبئ بيانات الشخص الأول.
3. اضغط ناقص.
4. يجب أن تبقى بيانات الأول ويُحذف الأخير.
5. لا يمكن تجاوز الحد.

---

## STEP 1.3 — validation layer

### أنشئ

```text
src/lib/validation.ts
```

ويجب أن تكون الدوال قابلة للاختبار بدون React.

### القواعد

#### الهاتف

```regex
^\+?\d{7,15}$
```

بعد تنظيف:

- spaces
- `-`
- parentheses

#### التواريخ المستقبلية

لا تسمح بتاريخ قبل اليوم محليًا.

بالنسبة `datetime-local`:

- التاريخ اليوم + وقت ماضٍ = مرفوض.

#### ترتيب التواريخ

```text
checkOut > checkIn
returnDate >= departureDate
returnDatetime >= departureDatetime
```

#### age

```text
integer 0..120
```

#### passengers

استخدم D18 بدل تخمين.

#### lengths

```text
short text ≤ 100
textarea ≤ 1000
contact/help message ≤ 2000
```

### FieldDef

وسّع التعريف عند الحاجة بـ:

```text
minLength
maxLength
min
max
kind
```

### HTML attributes

استخدم:

```text
min
max
maxLength
inputMode="tel"
autoComplete
```

ولرقم الجواز لا تستخدم autocomplete فضفاضًا إذا كان غير مناسب.

### hydration

لا تحسب تاريخ اليوم أثناء render بطريقة تسبب hydration mismatch.

### form

استخدم `noValidate` عندما تكون الرسائل الخاصة هي مصدر الحقيقة.

### رسائل

كل رسالة جديدة في:

```text
ar/en/tr/fr/ru
```

### Unit test infrastructure ⭐ إضافة أساسية

بما أن المشروع لا يحتوي حاليًا على runner واضح لوحدات `validation.ts`، قبل أول unit test:

1. اختر Vitest أو runner موجود إن وجد.
2. لا تضف dependency إذا كان هناك بديل قائم.
3. أنشئ command واضح مثل:

```text
npm run test:unit
```

4. اختبر boundary cases.

### معيار النجاح

لا يمكن submit عندما يفشل أي rule.

---

## STEP 1.4 — Contact وHelp

### المشكلة

هناك delay قبل `mailto:` ثم تعرض الصفحة success وكأن الرسالة أُرسلت.

### المطلوب

- أزل delay.
- فتح `mailto:` مباشر.
- الرسالة بعد ذلك توضّح:

```text
تم فتح برنامج البريد / إنشاء الرسالة، لكن الإرسال النهائي يتم من برنامج البريد نفسه.
```

- اعرض عنوان البريد كرابط.
- أضف Copy button إن كان مناسبًا.
- الهاتف الاختياري يخضع لنفس validation.
- حد الرسالة `2000` حرف.

### معيار النجاح

لا يوجد ادعاء إرسال ناجح إذا التطبيق لا يستطيع معرفته.

---

## STEP 1.5 — كل النماذج: Form Integrity Matrix ⭐ إضافة

لا تختبر BookingForm فقط.

أنشئ جدولًا يغطي:

```text
BookingForm
ContactContent
HelpContent
QuickBookingContent
أي form آخر يتم اكتشافه
```

لكل form:

- required.
- phone.
- length.
- date.
- submit.
- keyboard submit.
- loading state.
- duplicate submit.
- error state.
- success state.
- localization.
- mobile behavior.

### معيار النجاح

لا يوجد form غير مختبر ضمن التطبيق.

---

## STEP 1.6 — Functional phase gate

```bash
npm run check
npm run build
npm run test:unit
npm run test:e2e -- --workers=2
```

بالإضافة إلى:

- runtime smoke.
- internal link integrity.
- data integrity.

---

# 7. المرحلة 2 — Accessibility + UX

## STEP 2.1 — Form labeling

### BookingForm

لكل field:

```text
useId()
label htmlFor
input id
aria-invalid
aria-describedby
aria-required
error role="alert"
```

### Radio

استخدم:

```text
fieldset
legend
```

### PeopleCounter

- fieldset/legend.
- aria-live للعدد.
- حذف الشخص مع index صحيح.

### Contact/Help

طبق نفس القاعدة بعد قراءة الملفات الفعلية.

---

## STEP 2.2 — Header services dropdown

### المطلوب

لا تعتمد على hover فقط.

سطح المكتب:

- button disclosure.
- `aria-expanded`.
- `aria-controls`.
- Enter/Space.
- Escape.
- restore focus.
- close when focus leaves.
- hover behavior يبقى مساعدًا للفأرة فقط.

### mobile

استخدم `Dialog` أو `Sheet` الموجودين إذا كانا مناسبين.

لا تستعمل custom overflow lock إذا قامت المكتبة بذلك.

### nav

- `aria-label`.
- `aria-current="page"`.

---

## STEP 2.3 — LanguageSwitcher

### المشكلة الحالية

هيكلة `listbox/option` الحالية ليست اختيارًا مثاليًا لقائمة navigation بسيطة.

### المطلوب

- disclosure button.
- list of buttons.
- `aria-current` للغة الحالية.
- `lang={locale}`.
- Escape.
- restore focus.
- logical classes:

```text
end-0
text-start
```

بدل:

```text
right-0
text-right
```

**لا تغيّر routing هنا**؛ routing migration في STEP 4.3.

---

## STEP 2.4 — WhatsApp floating button

### المطلوب

عند الإخفاء:

- لا يبقى reachable via Tab.
- `aria-hidden` أو `inert` حسب الدعم والحاجة.

زر الفتح:

```text
aria-expanded
aria-controls
```

لوحة المحادثة:

```text
role="dialog"
aria-label
Escape
focus return
```

شرط ظهورها يجب أن يتابع pathname الحالي بدل حسابه مرة واحدة.

---

## STEP 2.5 — Contrast audit

### لا تعتمد على القياسات النظرية فقط

ابدأ بسكربت contrast أو تحليل computed styles، ثم تحقق على الصفحات المعروضة.

### القواعد

نص عادي:

```text
>= 4.5:1
```

نص كبير:

```text
>= 3:1
```

non-text UI/focus indicators:

```text
>= 3:1
```

### مهم

لا تستبدل كل `text-gold` دفعة واحدة.

أنشئ جدولًا:

```text
file
line
foreground
background
contrast
decision
```

ثم أصلح فقط الحالات المخالفة.

### WhatsApp

طبّق D12.

### reduced motion

أضف `prefers-reduced-motion` global rule، وتحقق من:

- HeroSection.
- PromoVideos.

عند reduced motion:

- لا auto-play للفيديو إن كان ذلك يزعج المستخدم.
- استخدم poster مناسب.

---

## STEP 2.6 — Theme FOUC

### المشكلة

الثيم الحالي يقرأ localStorage داخل effect، ما يسبب flash.

### المطلوب

انقل نفس قاعدة الاختيار إلى script قبل أول paint، مع:

```text
suppressHydrationWarning
```

وإذا صار CSP فعالًا لاحقًا:

- nonce/hash بدل inline script غير مسموح.

### معيار النجاح

لا يوجد flash ظاهر عند reload في dark mode.

---

## STEP 2.7 — landmarks / headings / skip link

أضف:

```text
skip to main
main#main-content
```

تحقق من:

- H1 واحد منطقي لكل صفحة.
- heading order.
- header/main/footer landmarks.
- لا sr-only ثابتة بلغة خاطئة.

---

## STEP 2.8 — axe tests

أضف:

```text
@axe-core/playwright
```

إن لم تكن موجودة.

اختبر:

```text
/
/services
/service detail
/contact
/faq
/plans إذا بقيت
```

في:

```text
ar
en
```

ابدأ report-only، ثم أصلح.

### معيار النجاح

صفر `serious` و`critical`.

---

## STEP 2.9 — Responsive smoke tests ⭐ إضافة أساسية

اختبر at least:

```text
375x812
390x844
768x1024
1280x800
```

### افحص

- horizontal overflow.
- header.
- mobile menu.
- booking form.
- WhatsApp widget.
- large text.
- tables/cards.
- buttons.
- videos.

### معيار النجاح

لا عنصر يخرج عن viewport بصورة غير مقصودة.

---

## STEP 2.10 — Phase 2 gate

شغّل:

```bash
npm run check
npm run build
npm run test:e2e -- --workers=2
```

بالإضافة إلى:

- axe.
- responsive tests.
- keyboard tests.
- contrast report.

---

# 8. المرحلة 3 — Cleanup / Dependency / Code Quality

## STEP 3.1 — Package manager reconciliation ⚠ D13

### المطلوب

اختيار:

```text
npm + package-lock.json
```

أو:

```text
bun + bun.lock
```

لا تبقِ الاثنين كجزء غير مقصود من المشروع.

لكن قبل الحذف:

1. اسأل D13.
2. راجع CI/deploy docs.
3. اختبر install نظيف.

---

## STEP 3.2 — إزالة template leftovers بأمان

### قبل كل حذف

نفّذ dependency graph أو grep imports.

### المرشحون من التحليل السابق

```text
prisma/
src/lib/db.ts
src/app/api/route.ts
examples/
mini-services/
tests/*.sh
scripts/build-single-file.sh
scripts/remove_zh.py
worklog.md
```

**لكن لا تحذف أيًا منها لمجرد أنها مذكورة هنا.**

تحقق أولًا من:

- imports.
- scripts.
- docs.
- CI.
- runtime references.

### Prisma

إذا ظل غير مستخدم بعد data-layer review:

- نظف `package.json`.
- نظف scripts.
- احذف generated leftovers.
- تأكد أن `DATABASE_URL` لا يبقى ضروريًا بلا سبب.

---

## STEP 3.3 — UI component dependency graph ⭐ تعديل مهم على الخطة القديمة

**لا تحذف 45 component بناء على رقم ثابت.**

سبب ذلك أن UI component قد يُستخدم من component آخر.

### المطلوب

ابنِ graph:

```text
production entry
 → component
 → child component
 → ui primitive
```

ثم احذف فقط العقد التي لا يصل إليها أي production entry.

خصوصًا:

```text
sheet
Dialog
Toaster
toast
use-toast
```

افحص الحاجة المستقبلية بعد STEP 2.2 قبل حذف `sheet`.

### بعد ذلك

شغّل:

```bash
npx knip
```

أو أداة موجودة فعليًا في المشروع.

راجع dependency removal قائمة قائمة.

---

## STEP 3.4 — ESLint gradual enforcement

### المبدأ

لا تحوّل كل القواعد إلى error دفعة واحدة.

ابدأ:

```text
react-hooks/exhaustive-deps
@typescript-eslint/no-unused-vars
@next/next/no-img-element
prefer-const
no-unreachable
no-redeclare
```

### no-literal-string

وسّع إلى properties ذات النص المرئي:

```text
alt
aria-label
title
placeholder
label
```

لكن انقلها مجلدًا مجلدًا.

### ممنوع

إخماد rule بدل إصلاح السبب.

---

## STEP 3.5 — CI ⚠ user decision if desired

إذا وافق المستخدم وكان المستودع على GitHub:

```text
.github/workflows/ci.yml
```

شغّل:

```text
npm ci
npm run check
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

احفظ artifacts عند الفشل.

---

## STEP 3.6 — Phase 3 gate

قارن:

- bundle size.
- dependency count.
- lint warnings.
- build time.
- test count.

ولا تتابع إلى المرحلة 4 مع unexplained regressions.

---

# 9. المرحلة 4 — i18n architecture + routing + SEO + performance

## STEP 4.1 — Local fonts

### المشكلة

`next/font/google` الحالي غير مثالي للـoffline builds وللتغطية الكاملة للسيريلية والتركية.

### المطلوب

- local `woff2`.
- `next/font/local`.
- تغطية العربية.
- Latin Extended للتركية.
- Cyrillic للروسية.
- فقط الأوزان المستخدمة.

### لا تحذف الخطوط الحالية قبل التأكد من أن البديل يغطي:

```text
ğ ş ı İ
Русский кириллица
العربية
```

### criterion

`npm run build` يعمل بدون اتصال خارجي مطلوب للخطوط.

---

## STEP 4.2 — Translation source-of-truth

### المشكلة الحالية

هناك أكثر من نظام:

```text
messages.ts
page-messages.ts
service-details.ts
lt()
locale === ... ? ... : ...
Arabic values in site-config.ts
Arabic values in services.ts
```

### التنفيذ الفرعي، خطوة مستقلة لكل بند

#### 4.2.a Inventory only

أنشئ جدولًا بكل:

- visible text.
- source file.
- key.
- locale coverage.

بدون تعديل.

#### 4.2.b navigation/footer keys

لا تعتمد على النص العربي كـidentifier.

#### 4.2.c homepage

ثم services، offers، plans، blog، about، faq، help، contact، quick-booking.

#### 4.2.d legal pages

لا تغيّر النص القانوني تلقائيًا.

#### 4.2.e remove `lt()` and ternaries

فقط بعد اكتمال النقل.

### قاعدة صارمة

إذا النص غير متوفر بترجمة موثوقة:

```text
[TODO-<lang>]
```

مع تقرير للمستخدم، ولا يجوز نسخ العربية إلى اللغة الأخرى كحل نهائي.

---

## STEP 4.3 — Service content localization ⭐ مشكلة مؤكدة

اختبارات اللغات الحالية أثبتت في النسخة المحللة أن page chrome يترجم، لكن محتوى `servicesList` داخل `src/lib/site-config.ts` يحتوي نصوصًا عربية مباشرة.

### المطلوب

فصل:

```text
service identity
slug
icon
image
price
form schema
```

عن:

```text
localized title
localized description
localized features
```

### النتيجة المطلوبة

صفحة:

```text
/en/services/visa
```

لا تحتوي body عربيًا.

ونفس الشيء:

```text
/tr/...
/fr/...
/ru/...
```

---

## STEP 4.4 — locale-prefixed routing ⚠ D8

### الهدف

جعل routing فعليًا يعتمد على next-intl بدل cookie-only locale.

### التوصية

الإبقاء على:

```text
localePrefix: "as-needed"
```

بحيث الافتراضي يمكن أن يبقى بلا prefix، واللغات الأخرى:

```text
/en
/tr
/fr
/ru
```

### المطلوب

1. نقل صفحات اللغة إلى:

```text
src/app/[locale]/...
```

2. إبقاء routes غير اللغوية المناسبة خارجها.
3. إنشاء:

```text
src/proxy.ts
```

مع middleware next-intl المناسب لنسخة Next الحالية.
4. الحفاظ على cookie name:

```text
casanostra-locale
```

إذا كان ذلك مطلوبًا للتوافق.
5. إعادة كتابة `i18n/request.ts` ليستخدم `requestLocale` بدل قراءة cookie يدويًا.
6. `setRequestLocale(locale)` في الأماكن المطلوبة.
7. تحديث `params` وفق API الخاص بـNext 16.
8. `generateStaticParams` للغات + service slugs + blog slugs.
9. استخدام navigation APIs المولدة من next-intl.
10. لا تترك imports عشوائية من `next/link` للمسارات الداخلية.

### import audit

نفّذ:

```bash
grep -RIn "next/link" src
 grep -RIn "next/navigation" src
```

والاستثناء الرئيسي:

```text
notFound
```

### LanguageSwitcher

بعد migration:

```text
router.replace(pathname, { locale })
```

بدل cookie + full reload.

### Error boundaries

أضف حسب architecture:

```text
[locale]/not-found.tsx
[locale]/error.tsx
[locale]/loading.tsx عند الحاجة
```

### معيار النجاح

- `lang`/`dir` صحيحان من server output.
- switching يحافظ على الصفحة الحالية.
- لا route يتحول إلى 404 بسبب locale prefix.
- static generation يتحسن بدل جعل كل route dynamic بلا سبب.

---

## STEP 4.5 — Error Boundary + 404 matrix ⭐ إضافة أساسية

اختبر:

```text
/non-existent
/en/non-existent
/tr/non-existent
/ar/non-existent
```

وتأكد من:

- localized 404.
- no runtime crash.
- no broken assets.
- correct `lang`/`dir`.

اختبر أيضًا error boundary في بيئة test بإحداث error مصطنع لا يبقى في الإنتاج.

---

## STEP 4.6 — Metadata / SEO

### المشكلة

canonical العام في layout لا يجب أن يعلن كل الصفحات على أنها الصفحة الرئيسية.

### المطلوب

أنشئ helper مثل:

```text
buildMetadata({ locale, path, titleKey, descriptionKey })
```

تنتج:

- title.
- description.
- canonical absolute.
- `alternates.languages`.
- `x-default`.
- Open Graph localized.
- Twitter metadata.

### Sitemap

يجب أن يضم فقط اللغات التي لديها محتوى موثوق ومترجم.

لا تستخدم:

```text
lastModified: new Date()
```

إذا لم يكن ذلك تاريخ المحتوى.

استخدم تواريخ ثابتة مشتقة من المصدر.

### robots

أضف sitemap reference.

### noindex

استخدم حالة translation coverage الفعلية.

لا تفترض أن كل صفحة موجودة = مترجمة بالكامل.

### JSON-LD

أضف فقط schema المدعوم بالبيانات الفعلية:

```text
TravelAgency
FAQPage
BreadcrumbList
Article
```

لا تضف:

```text
aggregateRating
Review
```

من دون بيانات حقيقية.

### XSS داخل JSON-LD

يجب تهريب `<` عند إدراج JSON داخل script.

---

## STEP 4.7 — Image / asset integrity ⭐ إضافة أساسية

### أنشئ/طوّر

```text
scripts/check-assets.mjs
```

### افحص

- كل local image path.
- كل video.
- favicon/logo.
- OG image.
- poster.
- imports من public.
- extension/path mismatch.

### قاعدة

أي reference إلى:

```text
/images/foo.jpg
```

يجب أن يقابله asset موجود، أو يكون request معروفًا خارجيًا ومصرحًا به.

### existing asset mismatch

هناك صور جديدة داخل:

```text
assets_inbox/
```

لا تنقلها تلقائيًا إلى production.

يجب مطابقة كل asset باسم الخدمة والغرض أولًا.

---

## STEP 4.8 — Image migration ⚠ D11

### الوضع الفعلي

يوجد 5 `<img>` raw refs حاليًا.

افحصها كلها قبل التغيير.

### المطلوب

استبدل raw `<img>` بـ`next/image` عندما يكون مناسبًا.

استخدم:

- `sizes`.
- `priority` فقط للصورة الحرجة الأولى.
- lazy loading لباقي الصور.
- alt من الترجمة.

### Unsplash

لا تستبدل أي صورة مكسورة بصورة عشوائية.

لكل missing image:

1. قدم مرشحين.
2. انتظر D11.
3. بعد الموافقة نفّذ.

### remotePatterns

بعد تحويل assets إلى local، احذف فقط remotePatterns غير المستخدمة فعليًا.

لا تحذف pattern مستخدمة.

---

## STEP 4.9 — Hero video behavior

افحص `HeroSection` فعليًا.

إذا كان يعتمد على:

```text
<source media="...">
```

داخل `<video>` فلا تفترض أن media-selection تعمل كما في `<picture>`.

### المطلوب

استراتيجية متوافقة مع المتصفحات:

- desktop/mobile source selection.
- `navigator.connection?.saveData`.
- reduced motion.
- poster.
- `preload="metadata"`.

### لا ترسل الفيديو الثقيل للمستخدم الذي لا يحتاجه.

---

## STEP 4.10 — Client/server component audit

لا تحذف `"use client"` بناء على grep فقط.

### افحص

- hooks.
- browser APIs.
- event handlers.
- localStorage.
- animation libs.

المرشح الذي لا يحتاج client logic يمكن جعله server component.

لكن إذا احتاج child interactive component:

- افصل الجزء التفاعلي إلى client island.

### معيار النجاح

- أقل JS ممكن بدون كسر الوظيفة.
- لا hydration mismatch.

---

## STEP 4.11 — Message payload optimization

لا تمرر كامل messages إلى client إذا كانت الصفحة تحتاج subset.

استخدم `pick` أو architecture مناسبة.

قِس قبل/بعد:

```text
HTML size
JS size
message payload
```

لا تغيّر النصوص، فقط payload.

---

## STEP 4.12 — Security headers ⚠ D9

أضف تدريجيًا:

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY أو CSP frame-ancestors
```

HSTS فقط مع D9.

### CSP

ابدأ:

```text
Content-Security-Policy-Report-Only
```

واجعل السياسة تدريجية:

```text
default-src 'self'
base-uri 'self'
form-action 'self'
frame-ancestors 'none'
```

ثم أضف المصادر المطلوبة فقط.

Inline theme script يحتاج nonce/hash إذا أصبحت CSP enforcing.

### معيار النجاح

لا CSP violations غير مفهومة.

---

## STEP 4.13 — Production standalone verification ⭐ إضافة أساسية

هذه الخطوة يجب تنفيذها بعد اكتمال routing/build architecture.

### شغّل

```bash
npm run build
npm run start
```

ثم اختبر **النسخة التي يشغلها start فعليًا** وليس dev server.

### افحص

- HTML routes.
- JS chunks.
- CSS.
- images.
- videos.
- sitemap.
- robots.
- locale routing.
- metadata.

### معيار النجاح

لا يوجد فرق functional بين dev وproduction غير المقصود.

---

## STEP 4.14 — Phase 4 Gate

### commands

```bash
npm run check
npm run build
npm run test:unit
npm run test:e2e -- --workers=2
```

ثم:

- runtime smoke.
- link integrity.
- asset integrity.
- i18n matrix.
- metadata matrix.
- standalone server smoke.
- accessibility.

### Lighthouse

شغّل على الأقل:

```text
/
service detail
```

للجوال.

سجّل قبل/بعد:

- LCP.
- CLS.
- INP/TBT حسب التقرير المتاح.
- JS transfer.
- image transfer.

---

# 10. المرحلة 5 — Backend / privacy / business functionality

> **لا تبدأ هذه المرحلة قبل موافقة المستخدم لأنها تغيّر product behavior.**

## STEP 5.1 — Real request backend ⚠ D10

### الخيارات

اعرض للمستخدم architecture alternatives قبل التنفيذ، مثل:

1. Route Handler + DB.
2. Server Action + DB.
3. Managed form backend.

لكل خيار:

- cost.
- complexity.
- maintenance.
- spam protection.
- privacy implications.

### بعد القرار

Server-side validation يجب أن تشارك schema مع client إن كان ذلك مناسبًا.

يجب أن يوجد:

- validation.
- rate limiting.
- anti-bot protection.
- reference ID.
- error state.
- success state.
- logging دون أسرار.

### ممنوع

إرسال passport/medical data داخل query string أو URL.

---

## STEP 5.2 — Sensitive data minimization

الحجوزات الحالية قد تجمع:

- passport number.
- age.
- nationality.
- medical information.

### الخطة المقترحة

الاستفسار الأول يجمع أقل قدر ممكن:

```text
name
phone
dates
party size
service choice
```

ثم يتم جمع المستندات والبيانات الحساسة لاحقًا عبر قناة آمنة.

### قانونيًا

لا تضع سياسة retention أو consent قانونية نهائية دون مراجعة مختص KVKK.

---

## STEP 5.3 — Business trust

بعد القرار/التوثيق:

- legal company name.
- license number.
- office address.
- verified reviews.
- real photos.
- true social links.

Schema لا يجوز أن يتجاوز البيانات التي يملكها الموقع فعلًا.

---

## STEP 5.4 — Offers / Plans integrity

### المصدر الواحد

لا تكرر offers في:

```text
FeaturedOffers.tsx
site-config.ts
```

بطريقة تسبب اختلافًا.

أنشئ source of truth واحدًا.

### افحص IDs الحالية

هناك IDs قد تكون بقايا قالب مثل:

```text
stays-morocco
internal-tours-europe
hotels-gulf
daily-tours-arab
```

راجعها ولا تغيّرها بلا سبب، لكن لا تترك IDs مضللة إن كان ذلك يؤثر على analytics أو SEO أو business logic.

### expiry

العرض المنتهي يجب أن يختفي أو يظهر كمنتهي، حسب القرار المنتجِي.

---

## STEP 5.5 — analytics / monitoring ⚠ optional business

إذا وافق المستخدم:

- analytics.
- cookie consent.
- WhatsApp click events.
- form submit events.
- error monitoring.

احترم الخصوصية وموافقة المستخدم.

---

# 11. مصفوفة الاختبارات النهائية

## 11.1 — Locales

```text
ar
 en
 tr
 fr
 ru
```

## 11.2 — Core routes

```text
/
/services
/offers
/plans
/quick-booking
/contact
/about
/faq
/help
/blog
/privacy
/terms
```

## 11.3 — Service routes

```text
/services/reservations-turkey
/services/visa
/services/vip-cars
/services/hotels
/services/flights
/services/daily-tours
/services/private-tours
/services/group-tours
/services/hajj-umrah
/services/medical-tourism
/services/other-services
```

## 11.4 — Blog detail

```text
/blog/best-10-places-istanbul
/blog/turkey-visa-complete-guide
/blog/cappadocia-balloon-city
/blog/golden-tips-before-turkey-trip
```

## 11.5 — Negative routes

```text
/non-existent
/en/non-existent
/tr/non-existent
/fr/non-existent
/ru/non-existent
```

## 11.6 — Viewports

```text
375x812
390x844
768x1024
1280x800
```

## 11.7 — For each critical combination verify

- HTTP status.
- title.
- meta description.
- canonical.
- hreflang.
- lang.
- dir.
- main exists.
- h1.
- no unexpected Arabic in non-Arabic surfaces.
- no 404 assets.
- no runtime errors.
- no unexpected console errors.
- internal links valid.

---

# 12. Runtime smoke test specification

يجب أن تكون لدينا أداة واحدة على الأقل تقول بوضوح إن الموقع لم ينتج أخطاء browser runtime.

## Fail conditions

```text
pageerror
unexpected console.error
unexpected requestfailed
unexpected status >= 400
```

## Ignore only when documented

- browser favicon probe خلال negative test.
- intentional 404 page test.
- intentionally blocked external third-party resource إذا كان behavior مقصودًا ومذكورًا.

أي exception آخر = failure.

---

# 13. Internal link integrity specification

يجب اكتشاف:

```text
href="/foo"
Link href="/foo"
router.push("/foo")
router.replace("/foo")
redirect("/foo")
```

بعد locale migration يجب التأكد أن navigation APIs لا تولد:

```text
/en/en/foo
/tr/tr/foo
```

أو روابط بلا locale عند الحاجة.

---

# 14. Data integrity specification

لا يوجد مصدران متناقضان للحقيقة لنفس field دون justification.

مثال:

```text
service slug
service title
service description
service form schema
service image
```

يجب أن يكون لكل واحدة ownership واضح.

---

# 15. Hydration / SSR consistency gate

يجب إضافة فحوصات أو smoke tests تكشف:

```text
Hydration failed
Text content does not match
Expected server HTML
```

اختبر خصوصًا:

- theme.
- locale.
- date inputs.
- responsive state.
- `window`/`document` usage.
- random IDs.
- client-only measurements.

---

# 16. Accessibility completion gate

Definition:

- zero serious/critical axe violations.
- visible keyboard focus.
- all controls have names.
- menus keyboard operable.
- dialogs trap/return focus.
- form fields linked to labels/errors.
- reduced motion respected.
- contrast thresholds met.
- skip link works.

---

# 17. SEO completion gate

لكل صفحة قابلة للفهرسة:

- unique title.
- unique description.
- canonical self.
- correct alternate languages.
- x-default where applicable.
- correct locale URL.
- correct OG URL/image.

Sitemap:

- no broken URL.
- only intended indexable pages.
- correct localized variants.
- stable lastModified.

Robots:

- not accidentally blocking the whole site.
- includes sitemap.

---

# 18. Performance completion gate

القياس يجب أن يكون بالأرقام، وليس «يبدو أسرع».

سجل:

```text
JS raw size
JS gzip size
HTML size
image bytes
video bytes
LCP
CLS
INP/TBT
```

قبل/بعد لكل إصلاح مؤثر.

---

# 19. Security completion gate

راجع:

- Caddy.
- exposed local ports.
- headers.
- CSP.
- env files.
- secrets in source.
- hardcoded credentials.
- unsafe URL construction.
- sensitive data in URLs.
- unrestricted form submission.
- rate limiting إذا أصبح backend فعليًا.

نفّذ grep مثل:

```bash
grep -RInE "password|secret|token|api[_-]?key" src scripts --exclude-dir=node_modules
```

ويجب مراجعة false positives يدويًا.

---

# 20. Release checklist

لا يعلن الوكيل أن النسخة جاهزة للإنتاج قبل إنهاء التالي:

```text
[ ] repository reconciliation complete
[ ] baseline recorded
[ ] no lost user changes
[ ] config placeholders removed or intentionally hidden
[ ] domain/email unified
[ ] unsupported claims removed/controlled
[ ] Caddy reviewed
[ ] OG image valid
[ ] data integrity PASS
[ ] asset integrity PASS
[ ] runtime smoke PASS
[ ] internal links PASS
[ ] BookingForm PASS
[ ] Contact PASS
[ ] Help PASS
[ ] all forms PASS
[ ] validation unit tests PASS
[ ] keyboard PASS
[ ] axe PASS
[ ] contrast PASS
[ ] responsive PASS
[ ] fonts PASS
[ ] service translations PASS
[ ] locale routing PASS
[ ] 404/error boundaries PASS
[ ] canonical/hreflang PASS
[ ] sitemap/robots PASS
[ ] local images PASS
[ ] video behavior PASS
[ ] server/client audit PASS
[ ] message payload reviewed
[ ] security headers PASS
[ ] standalone production PASS
[ ] full E2E PASS
[ ] Lighthouse measured
[ ] business-sensitive decisions approved
```

---

# 21. Definition of Done — النهائي

يعتبر المشروع «جاهزًا» فقط عندما تتحقق الشروط التالية فعليًا:

### Build & Type safety

```text
TypeScript = PASS
ESLint = PASS
check:i18n = PASS
build = PASS
```

### Runtime

```text
No unexpected pageerror
No unexpected console.error
No unexpected requestfailed
No unexpected 4xx/5xx
```

### Routing

```text
all intended routes = PASS
all locales = PASS
404 = PASS
switch locale = PASS
```

### Forms

```text
validation = PASS
submit = PASS
no fake success state = PASS
double submit behavior = PASS
```

### Accessibility

```text
axe serious/critical = 0
keyboard = PASS
focus = PASS
contrast = PASS
```

### SEO

```text
canonical = PASS
hreflang = PASS
lang/dir = PASS
sitemap = PASS
robots = PASS
JSON-LD = valid where used
```

### Assets

```text
no broken local asset refs
no unexpected raw img tags
no broken video/poster
OG image = 200
```

### Performance

Lighthouse mobile must be measured and recorded. Target:

```text
LCP < 2.5s where realistically achievable
```

ولا تعتبر الرقم وحده نجاحًا إذا صاحب ذلك regression في UX أو functionality.

### Security

```text
no user-controlled local reverse proxy
no secret leak
security headers reviewed
CSP report-only violations explained
```

---

# 22. أهم قاعدة تشغيلية للوكيل

**لا تنفذ الخطوة التالية لأنك «تستطيع».**

التسلسل الصحيح هو:

```text
READ
→ VERIFY CURRENT STATE
→ CHANGE ONLY THIS STEP
→ RUN STEP TESTS
→ RUN REGRESSION TESTS
→ REPORT
→ STOP
→ WAIT FOR USER APPROVAL
```

إذا اكتشفت مشكلة جديدة غير موجودة في الخطة:

1. لا تصلحها تلقائيًا ضمن STEP أخرى.
2. سجّلها كـ`NEW FINDING`.
3. إذا كانت تمنع الخطوة الحالية، أصلحها فقط بالقدر اللازم أو توقف.
4. اقترح إضافة STEP جديدة قبل مواصلة التنفيذ.

إذا وجدت أن بندًا من الخطة الأصلية صار محلولًا بالفعل:

```text
MARK AS ALREADY FIXED
VERIFY IT
DO NOT REIMPLEMENT IT
```

خصوصًا إصلاحات مثل:

- TypeScript `examples/skills` exclusion.
- `react-resizable-panels` compatibility.
- أي إصلاح موجود في `git diff` الحالي.

---

# 23. ملاحظة أخيرة عن «بلا أخطاء»

مصطلح «بلا أخطاء» في هذه الخطة يعني:

> **لا توجد أخطاء معروفة أو متوقعة ضمن نطاق التطبيق القابل للاختبار، ولا failures صامتة في runtime، ولا broken routes/assets/forms، ولا مخالفات جودة حرجة، مع تسجيل أي قيد خارجي أو قرار لم يتم حسمه.**

لا يعني ذلك ضمانًا رياضيًا لكل متصفح وجهاز وشبكة موجودة في العالم.

أي limitation يجب أن يظهر صراحة في التقرير النهائي.
