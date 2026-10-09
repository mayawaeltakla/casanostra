/**
 * إعدادات الموقع المركزية — كل البيانات الثابتة في مكان واحد
 * لتسهيل التعديل لاحقاً دون الحاجة لتعديل كل ملف على حدة.
 */

export const siteConfig = {
  url: "https://www.casanostra-tr.com",
  name: "CASANOSTRA",
  nameAr: "كازانوسترا",
  tagline: "وكالة السياحة الفاخرة في تركيا",
  description:
    "باقات سياحية متكاملة، جولات خاصة، فنادق فخمة، وخدمات VIP في تركيا. اكتشف تركيا بأناقة مع CASANOSTRA.",

  // رقم واتساب بصيغة دولية دون + أو 00.
  whatsappNumber: "905556444494",

  // روابط التواصل
  contact: {
    phoneDisplay: "+90 555 644 4494",
    phoneIntl: "+905556444494",
    email: "info@casanostra-tr.com",
    privacyEmail: "kvkk@casanostra-tr.com",
    address: "بي أوغلو، إسطنبول، تركيا",
    addressAr: "بي أوغلو، إسطنبول، تركيا",
    workingHours: "السبت - الخميس: 9:00 ص - 9:00 م",
    workingHoursEn: "Sat - Thu: 9:00 AM - 9:00 PM",
  },
  legalEntity: {
    name: "CASA NOSTRA TURIZM OTELCILIK INSAAT ITHALAT IHRACAT SANAYI VE TICARET LIMITED SIRKIT",
    address: "CUMHURIYET MAH. SAKSI SK. ASLI HAN NO 9 IC NO 15 SISLI / ISTANBUL",
  },

  // روابط السوشال ميديا
  social: {
    instagram: "https://www.instagram.com/casanostra.tr?stkn=NnJ1bmF5cjQwdG9h",
    facebook: "https://www.facebook.com/casanostra.tr",
    twitter: "https://x.com/casanostrtr",
    youtube: "https://www.youtube.com/@casanostra-tr",
    tiktok: "https://www.tiktok.com/@casanostra847?_r=1&_t=ZS-9AMhT6XyJV3",
  },
} as const;

/* ====================================================================
 * الخدمات الـ11 — تُعرّف أولاً لأن navItems و footerColumns يعتمدان عليها
 * ==================================================================== */

/**
 * واجهة الخدمة — تحتوي البيانات الكاملة لعرض صفحة خدمة مفصّلة.
 */
export interface Service {
  slug: string;
  title: string;
  shortDescription: string;     // وصف قصير للبطاقات
  icon: string;                // اسم أيقونة lucide-react
  longDescription: string;     // فقرة تعريفية كاملة في رأس صفحة الخدمة
  heroImage: string;           // صورة Unsplash كبيرة للقسم العلوي
  duration: string;            // المدة (مثلاً: "يوم كامل" أو "حسب الطلب")
  priceFrom?: string;           // السعر التقريبي (للعرض فقط)
  features: { title: string; description: string }[];  // مميزات الخدمة
  included: string[];           // المشمولات
  excluded: string[];           // غير المشمولات
  galleryImages: string[];      // صور المعرض (3-4 صور)
}

export const servicesList: Service[] = [
  {
    slug: "reservations-turkey",
    title: "الإقامات في تركيا",
    shortDescription: "إقامات فاخرة قصيرة وطويلة الأمد بأفضل المواقع في تركيا.",
    icon: "Building2",
    longDescription:
      "نوفّر لك إقامات فاخرة في أفخم الفنادق والشقق المخدومة في إسطنبول وأنطاليا وبودروم وطرابزون. سواء أكنت تبحث عن إقامة قصيرة لأسبوع أو إقامة شهرية أو سنوية، لدينا الخيار المثالي بأفضل الأسعار وأرقى المواقع قرب المعالم السياحية والمراكز التجارية. نتعامل مع شبكة واسعة من الفنادق 4 و5 نجوم والشقق الفندقية المخدومة لنضمن لك تجربة إقامة لا تُنسى.",
    heroImage: "/images/services/reservations-turkey/hero.webp",
    duration: "حسب الطلب",
    priceFrom: "ابتداءً من 60$ / ليلة",
    features: [
      { title: "مواقع استراتيجية", description: "إقامات قرب أهم المعالم والأسواق والمطاعم." },
      { title: "خيارات متنوعة", description: "فنادق، شقق مخدومة، فلل، استوديوهات." },
      { title: "أسعار حصرية", description: "اتفاقيات خاصة مع الفنادق بأسعار أقل من الحجز المباشر." },
      { title: "خدمة 24/7", description: "دعم فوري عبر واتساب طوال فترة إقامتك." },
    ],
    included: [
      "حجز فندق 4/5 نجوم أو شقة مخدومة",
      "تنظيف يومي للغرف",
      "إنترنت مجاني عالي السرعة",
      "خدمة استقبال في الاستقبال",
      "تأمين الإقامة طوال فترة البقاء",
    ],
    excluded: [
      "تكاليف الطيران من وإلى تركيا",
      "الوجبات (إلا إذا كانت مشمولة في عرض الفندق)",
      "نقل المطار (يمكن إضافته كخدمة VIP)",
    ],
    galleryImages: [
  "/images/services/reservations-turkey/gallery-1.webp",
  "/images/services/reservations-turkey/gallery-2.webp",
  "/images/services/reservations-turkey/gallery-3.webp",
],
  },
  {
    slug: "visa",
    title: "الفيزا",
    shortDescription: "تأشيرات سياحية سريعة وموثوقة لجميع الجنسيات.",
    icon: "FileCheck",
    longDescription:
      "نوفّر خدمة استخراج التأشيرة السياحية التركية لجميع الجنسيات العربية والأجنبية. خبرتنا الطويلة في التعامل مع القنصليات التركية حول العالم تضمن لك أعلى نسبة موافقة بأسرع وقت ممكن. نتولّى عنك كل الإجراءات: تعبئة الاستمارات، حجز المواعيد، تجهيز الملف، المتابعة حتى استلام التأشيرة. توفّر تركيا حالياً تأشيرة إلكترونية (e-Visa) للعديد من الجنسيات، ونوفّر لك كلا الخيارين حسب جنسيتك.",
    heroImage: "/images/services/visa/hero.webp",
    duration: "3 - 10 أيام عمل",
    priceFrom: "ابتداءً من 50$",
    features: [
      { title: "كل الجنسيات", description: "نتعامل مع جميع الجنسيات العربية والأجنبية." },
      { title: "نسبة موافقة عالية", description: "أكثر من 95% من طلباتنا تُقبل." },
      { title: "خياران", description: "تأشيرة إلكترونية أو ورقية حسب الحالة." },
      { title: "متابعة كاملة", description: "نأخذك خطوة بخطوة من البداية حتى الاستلام." },
    ],
    included: [
      "استشارة مجانية حول التأشيرة المناسبة لك",
      "تعبئة استمارة الطلب إلكترونياً",
      "حجز موعد القنصلية",
      "مراجعة الملف قبل التقديم",
      "متابعة الطلب حتى صدور التأشيرة",
    ],
    excluded: [
      "رسوم التأشيرة الرسمية للقنصلية (تُدفع منفصلة)",
      "تكاليف الترجمة إن لزم",
      "تكاليف الشحن إن كان الاستلام بالبريد",
    ],
    galleryImages: [
  "/images/services/visa/gallery-1.webp",
  "/images/services/visa/gallery-2.webp",
  "/images/services/visa/gallery-3.webp",
],
  },
  {
    slug: "vip-cars",
    title: "السيارات VIP",
    shortDescription: "سيارات فاخرة بسائق خاص لتنقّلات راقية في إسطنبول وتركيا.",
    icon: "Car",
    longDescription:
      "استنزف تجربتك في تركيا مع أسطولنا من السيارات الفاخرة المرسيدس V-Class و BMW و Audi بسائق خاص محترف يتحدث العربية. خدمة VIP متكاملة من المطار إلى الفندق ومن الفندق إلى أي وجهة في تركيا. سائقونا مُدرّبون على الذوق العام والخصوصية والأمان، وسياراتنا مؤمّنة بالكامل ومجهّزة بأحدث وسائل الراحة. مثالية لرجال الأعمال والعائلات الراقية والمسافرين الباحثين عن تجربة استثنائية.",
   heroImage: "/images/services/vip-cars/hero.webp",
    duration: "حسب الطلب (بالساعة أو اليوم)",
    priceFrom: "ابتداءً من 80$ / ساعة",
    features: [
      { title: "سيارات فاخرة", description: "مرسيدس V-Class، BMW Series 7، Audi A8." },
      { title: "سائقون ناطقون بالعربية", description: "سائقون محترفون يتحدثون العربية والإنجليزية." },
      { title: "تأمين شامل", description: "جميع سياراتنا مؤمّنة بالكامل." },
      { title: "مرونة تامة", description: "حجز بالساعة أو اليوم أو الأسبوع." },
    ],
    included: [
      "سيارة فاخرة مع سائق محترف",
      "وقود ومواقف طوال فترة الحجز",
      "مياه ومنعشات داخل السيارة",
      "تأمين شامل على السيارة والركاب",
      "خدمة واي فاي مجانية داخل السيارة",
    ],
    excluded: [
      "وجبات السائق (تُحسب منفصلة في الرحلات الطويلة)",
      "تذاكر المعالم السياحية",
      "بوفيهات أو رسوم دخول خاصة",
    ],
   galleryImages: [
  "/images/services/vip-cars/gallery-1.webp",
  "/images/services/vip-cars/gallery-2.webp",
  "/images/services/vip-cars/gallery-3.webp",
],
  },
  {
    slug: "hotels",
    title: "حجز الفنادق",
    shortDescription: "فنادق 5 نجوم ومنتجعات راقية بأسعار حصرية.",
    icon: "Hotel",
    longDescription:
      "احجز فندقك في تركيا بأسعار حصرية لا تجدها في أي منصة حجز أخرى. نتعامل مباشرة مع أفخم الفنادق والمنتجعات في إسطنبول وأنطاليا وبودروم وطرابزون وقيساري، ونوفّر لك خصومات تصل إلى 40% على السعر الرسمي. سواء كنت تبحث عن فندق بإطلالة على البوسفور أو منتجع شاطئي في أنطاليا أو فندق تاريخي في السلطان أحمد، لدينا الخيار المثالي لك.",
    heroImage: "/images/services/hotels/hero.webp",
    duration: "حسب الفترة المطلوبة",
    priceFrom: "ابتداءً من 70$ / ليلة",
    features: [
      { title: "خصومات حصرية", description: "حتى 40% أقل من منصات الحجز العالمية." },
      { title: "تشكيلة واسعة", description: "أكثر من 500 فندق ومنتجع في تركيا." },
      { title: "موقع ممتاز", description: "فنادق في أفضل المواقع السياحية." },
      { title: "تأكيد فوري", description: "تأكيد الحجز خلال دقائق عبر واتساب." },
    ],
    included: [
      "حجز غرفة في فندق 4/5 نجوم",
      "ضمان أفضل سعر",
      "خدمة الاستقبال عند الوصول",
      "دعم 24/7 خلال فترة الإقامة",
      "إفطار مجاني (في معظم الفنادق)",
    ],
    excluded: [
      "وجبات الغداء والعشاء",
      "خدمات الغسيل والكوي",
      "رسوم المنتجع (resort fee) في بعض الفنادق",
    ],
  galleryImages: [
  "/images/services/hotels/gallery-1.webp",
  "/images/services/hotels/gallery-2.webp",
  "/images/services/hotels/gallery-3.webp",
    ],
  },
  {
    slug: "flights",
    title: "حجز الطيران",
    shortDescription: "تذاكر طيران بأفضل الأسعار على جميع الخطوط الجوية.",
    icon: "Plane",
    longDescription:
      "نوفّر لك تذاكر طيران على جميع الخطوط الجوية التركية والعالمية بأسعار تنافسية. نتعامل مع Turkish Airlines وبغداد للطيران والسعودية والطيران العربي وغيرها، ونوفّر لك خيارات مرنة بين الدرجة الاقتصادية ودرجة رجال الأعمال. خدمتنا تشمل: البحث عن أفضل رحلة، الحجز، إصدار التذكرة، ومتابعة أي تغييرات. كما نوفّر خدمة الحجز الجماعي للعائلات والمجموعات السياحية بأسعار خاصة.",
    heroImage: "/images/services/flights/hero.webp",
    duration: "حسب الرحلة",
    priceFrom: "حسب الوجهة والموسم",
    features: [
      { title: "كل الخطوط الجوية", description: "Turkish Airlines والخطوط العربية والعالمية." },
      { title: "أسعار تنافسية", description: "أفضل من الأسعار على الإنترنت." },
      { title: "خيارات مرنة", description: "اقتصادي، رجال أعمال، درجة أولى." },
      { title: "حجز جماعي", description: "خصومات خاصة للعائلات والمجموعات." },
    ],
    included: [
      "البحث عن أفضل رحلة بالسعر والوقت",
      "إصدار التذكرة الإلكترونية",
      "إرسال التذكرة عبر واتساب والإيميل",
      "متابعة تغييرات الرحلة",
      "استشارة حول متطلبات التأشيرة والعبور",
    ],
    excluded: [
      "رسوم الأمتعة الزائدة (حسب سياسة الخط)",
      "وجبات خاصة على الطائرة",
      "تأمين السفر",
    ],
    galleryImages: [
  "/images/services/flights/gallery-1.webp",
  "/images/services/flights/gallery-2.webp",
  "/images/services/flights/gallery-3.webp",
],
  },
  {
    slug: "daily-tours",
    title: "الرحلات اليومية داخل إسطنبول",
    shortDescription: "جولات يومية شاملة لأهم معالم إسطنبول التاريخية والسياحية.",
    icon: "MapPin",
    longDescription:
      "اكتشف إسطنبول بأكملها مع جولاتنا اليومية المنظّمة التي تغطي أهم المعالم التاريخية والسياحية. جولة السلطان أحمد تغطي المسجد الأزرق وآيا صوفيا وقصر توبكابي، جولة البوسفور بالقارب، جولة غراند بازار، جولة تكسيم والميدان، جولة أرشاكوي وكوروكمس، وجولات السوق المصري والعديد من الوجهات الأخرى. كل جولة بمرشد سياحي يتحدث العربية ووسيلة نقل مريحة ومكيفة.",
    heroImage: "/images/services/daily-tours/hero.webp",
    duration: "6 - 10 ساعات / يوم",
    priceFrom: "ابتداءً من 45$ / شخص",
    features: [
      { title: "مرشد عربي", description: "مرشدون سياحيون ناطقون بالعربية." },
      { title: "تنقّل مريح", description: "حافلات مكيفة وسيارات حديثة." },
      { title: "تشكيلة جولات", description: "أكثر من 15 وجهة مختلفة في إسطنبول." },
      { title: "جولات صباحية ومسائية", description: "اختر الوقت الذي يناسبك." },
    ],
    included: [
      "مواصلات مكيفة ذهاباً وإياباً",
      "مرشد سياحي يتحدث العربية",
      "تذاكر دخول المعالم المذكورة في البرنامج",
      "وجبة غداء (في الجولات الكاملة)",
      "مياه ومنعشات خلال الجولة",
    ],
    excluded: [
      "الإكراميات الشخصية",
      "المشتريات الشخصية من الأسواق",
      "وجبات إضافية خارج البرنامج",
    ],
    galleryImages: [
  "/images/services/daily-tours/gallery-1.webp",
  "/images/services/daily-tours/gallery-2.webp",
  "/images/services/daily-tours/gallery-3.webp",
],
  },
  {
    slug: "private-tours",
    title: "الرحلات الخاصة في تركيا",
    shortDescription: "برامج خاصة مصمّمة حسب رغبتك لكامل أنحاء تركيا.",
    icon: "CarTaxiFront",
    longDescription:
      "صمّم رحلتك الخاصة في تركيا حسب ذوقك وميزانيتك. سواء كنت تريد زيارة كابادوكيا بالمنطاد، أو شواطئ أنطاليا، أو الينابيع الحرارية في باموكالي، أو القلاع البيزنطية في طرابزون، أو الجبال الخضراء في ريزا، نوفّر لك برنامجاً مخصصاً 100% يناسب احتياجاتك. رحلات خاصة بسيارة فاخرة وسائق/مرشد عربي طوال فترة الرحلة، مع إقامة في أفخم الفنادق وأنقى التجارب.",
    heroImage: "/images/services/private-tours/hero.webp",
    duration: "3 - 14 يوم (حسب البرنامج)",
    priceFrom: "ابتداءً من 350$ / يوم",
    features: [
      { title: "تصميم حسب الطلب", description: "برنامج 100% حسب رغبتك." },
      { title: "مرشد خاص", description: "مرشد/سائق عربي طوال الرحلة." },
      { title: "سيارة فاخرة", description: "مرسيدس V-Class أو BMW." },
      { title: "مرونة كاملة", description: "غيّر خطتك في أي وقت أثناء الرحلة." },
    ],
    included: [
      "سيارة فاخرة بسائق/مرشد عربي",
      "بنزين ومواقف طوال فترة الرحلة",
      "حجز الفنادق في كل مدينة",
      "تنسيق وجبات الإفطار في الفنادق",
      "دعم 24/7 خلال الرحلة",
    ],
    excluded: [
      "تذاكر الطيران الدولي",
      "وجبات الغداء والعشاء",
      "تذاكر المعالم السياحية",
      "نشاطات إضافية (بالون، غوص، إلخ)",
    ],
    galleryImages: [
  "/images/services/private-tours/gallery-1.webp",
  "/images/services/private-tours/gallery-2.webp",
  "/images/services/private-tours/gallery-3.webp",
],
  },
  {
    slug: "group-tours",
    title: "الرحلات الجماعية",
    shortDescription: "رحلات منظّمة للمجموعات العائلية والشركات بأسعار مميزة.",
    icon: "Users",
    longDescription:
      "رحلات جماعية منظّمة بالكامل للعائلات الكبيرة ومجموعات الأصدقاء ووفود الشركات. نوفّر باقات متكاملة تشمل الطيران، الإقامة، التنقلات، الجولات، الوجبات، وكل التفاصيل الصغيرة. أسعار خاصة للمجموعات تبدأ من 10 أشخاص، مع برامج قابلة للتخصيص حسب رغبة المجموعة. مثالية لرحلات الشركة، المدرسية، العائلية، وأيام العطل الجماعية.",
    heroImage: "/images/services/group-tours/hero.webp",
    duration: "3 - 10 أيام",
    priceFrom: "ابتداءً من 250$ / شخص",
    features: [
      { title: "خصومات جماعية", description: "أسعار خاصة لأكثر من 10 أشخاص." },
      { title: "برنامج متكامل", description: "طيران + إقامة + جولات + مواصلات." },
      { title: "مرشد جماعي", description: "مرشد عربي خاص بالمجموعة طوال الرحلة." },
      { title: "حافلات فاخرة", description: "حافلات مكيفة تتسع حتى 45 شخصاً." },
    ],
    included: [
      "حافلة فاخرة مكيفة للمجموعة",
      "مرشد سياحي عربي طوال الرحلة",
      "حجز فندق 4/5 نجوم للمجموعة",
      "وجبات الإفطار والغداء",
      "تذاكر دخول المعالم السياحية",
      "تنسيق كامل للبرنامج اليومي",
    ],
    excluded: [
      "تذاكر الطيران الدولي",
      "وجبات العشاء (يمكن إضافتها)",
      "المشتريات الشخصية",
      "الإكراميات",
    ],
    galleryImages: [
  "/images/services/group-tours/gallery-1.webp",
  "/images/services/group-tours/gallery-2.webp",
  "/images/services/group-tours/gallery-3.webp",
],
  },
  {
    slug: "hajj-umrah",
    title: "الحج والعمرة",
    shortDescription: "باقات متكاملة للحج والعمرة بأعلى معايير الراحة والخدمة.",
    icon: "MoonStar",
    longDescription:
      "نوفّر باقات متكاملة للحج والعمرة عبر تركيا، تشمل تأشيرة الدخول للسعودية، تذاكر الطيران من بلدك إلى جدة أو المدينة، الإقامة في فنادق قريبة من الحرم، التنقلات بين المشاعر المقدسة، ووجبات طوال فترة الرحلة. باقاتنا مصمّمة لتوفير أعلى درجات الراحة والسكينة لأداء مناسكك بطمأنينة. فريقنا متخصص في القضايا اللوجستية لأداء الحج والعمرة.",
    heroImage: "/images/services/hajj-umrah/hero.webp",
    duration: "7 - 15 يوم",
    priceFrom: "حسب الباقة والموسم",
    features: [
      { title: "باقات متكاملة", description: "طيران + إقامة + تنقلات + وجبات." },
      { title: "قرب الحرم", description: "فنادق على بعد دقائق من الحرم." },
      { title: "مرشد ديني", description: "مرشد متخصص في المناسك." },
      { title: "راحة تامة", description: "كل التفاصيل مُنظّمة مسبقاً." },
    ],
    included: [
      "تأشيرة العمرة/الحج",
      "تذاكر الطيران من بلدك إلى السعودية",
      "إقامة في فنادق قريبة من الحرم",
      "تنقلات بين مكة والمدينة والمشاعر",
      "وجبات كاملة طوال فترة الرحلة",
      "مرشد ديني متخصص",
    ],
    excluded: [
      "الهدايا والمشتريات الشخصية",
      "الأضاحي (يمكن تنسيقها منفصلة)",
      "الإكراميات",
    ],
    galleryImages: [
  "/images/services/hajj-umrah/gallery-1.webp",
  "/images/services/hajj-umrah/gallery-2.webp",
  "/images/services/hajj-umrah/gallery-3.webp",
],
  },
  {
    slug: "medical-tourism",
    title: "السياحة العلاجية",
    shortDescription: "أفضل المستشفيات والمراكز الطبية التركية المعتمدة دولياً.",
    icon: "HeartPulse",
    longDescription:
      "نوفّر لك خدمة السياحة العلاجية في تركيا بأعلى المعايير العالمية. نتعامل مع أفضل المستشفيات والمراكز الطبية المعتمدة دولياً (JCI) في إسطنبول وأنقرة وأنطاليا. خدماتنا تشمل: زراعة الشعر، تجميل الأسنان، العمليات التجميلية، علاج العيون، القلب، العظام، والأورام. نوفّر لك استشارة طبية أولية، تنسيق كامل مع المستشفى، ترجمة طبية، إقامة فاخرة، ومتابعة بعد العودة لبلدك.",
    heroImage: "/images/services/medical-tourism/hero.webp",
    duration: "3 - 14 يوم (حسب العلاج)",
    priceFrom: "حسب نوع العلاج",
    features: [
      { title: "مستشفيات معتمدة", description: "JCI ومعتمدة دولياً." },
      { title: "أطباء خبراء", description: "أطباء بخبرة تتجاوز 15 عاماً." },
      { title: "ترجمة طبية", description: "مترجمون طبيون عرب طوال فترة العلاج." },
      { title: "متابعة بعد العودة", description: "متابعة طبية عن بعد بعد رجوعك." },
    ],
    included: [
      "استشارة طبية أولية مجانية",
      "تنسيق كامل مع المستشفى والطبيب",
      "ترجمة طبية عربية طوال فترة العلاج",
      "حجز فندق قريب من المستشفى",
      "نقل من وإلى المستشفى",
      "متابعة طبية بعد العودة",
    ],
    excluded: [
      "تكاليف العلاج نفسه (تُحدّد بعد الاستشارة)",
      "الأدوية بعد الخروج من المستشفى",
      "وجبات الفندق",
    ],
    galleryImages: [
  "/images/services/medical-tourism/gallery-1.webp",
  "/images/services/medical-tourism/gallery-2.webp",
  "/images/services/medical-tourism/gallery-3.webp",
],
  },
  {
    slug: "other-services",
    title: "خدمات أخرى",
    shortDescription: "خدمات إضافية متنوعة لتلبية جميع احتياجاتك في تركيا.",
    icon: "MoreHorizontal",
    longDescription:
      "نوفّر مجموعة واسعة من الخدمات الإضافية لتغطية كل ما قد تحتاجه أثناء تواجدك في تركيا. من حجز المطاعم الفاخرة، إلى تنظيم الفعاليات والاحتفالات، تأجير اليخوت الخاصة، حجز تذاكر المباريات الرياضية، خدمات الترجمة والمرافقة، تنظيم رحلات شهر العسل، حجز المنتجعات الصحية والحمامات التركية، وغيرها الكثير. أي خدمة تفكر فيها في تركيا، نحن نوفّرها لك.",
    heroImage:
  "/images/services/other-services/hero.webp",
    duration: "حسب الخدمة",
    priceFrom: "حسب الطلب",
    features: [
      { title: "تنوع شامل", description: "أكثر من 20 خدمة إضافية مختلفة." },
      { title: "تخصيص كامل", description: "نوفّر الخدمة حسب طلبك المحدد." },
      { title: "أسعار عادلة", description: "أسعار تنافسية دون وسطاء." },
      { title: "خدمة VIP", description: "تجربة فاخرة في كل التفاصيل." },
    ],
    included: [
      "استشارة لتحديد الخدمة المطلوبة",
      "تنسيق كامل مع مقدمي الخدمة",
      "حجز وتأكيد الموعد",
      "متابعة حتى انتهاء الخدمة",
      "دعم 24/7",
    ],
    excluded: [
      "تكاليف الخدمة نفسها (تُحدّد حسب الطلب)",
      "المشتريات الشخصية",
      "الإكراميات",
    ],
    galleryImages: [
  "/images/services/other-services/gallery-1.webp",
  "/images/services/other-services/gallery-2.webp",
  "/images/services/other-services/gallery-3.webp",
],
  },
];

/* ====================================================================
 * العروض — تُعرّف بعد servicesList لأن العروض قد تربط بخدمات معيّنة
 * ==================================================================== */

/**
 * واجهة العرض — تحتوي بيانات كاملة لعرض العروض التفصيلية.
 */
export interface Offer {
  id: string;                    // معرّف فريد للعرض
  badge: string;                  // نص الشارة (مثلاً: "عرض خاص" أو "موسمي")
  badgeColor: "gold" | "navy" | "red";  // لون الشارة
  title: string;                  // عنوان العرض
  target: string;                 // الفئة المستهدفة (مثلاً: "للمغاربة")
  discount: string;               // نسبة الخصم (مثلاً: "25%")
  discountLabel?: string;         // تسمية الخصم (مثلاً: "خصم")
  description: string;           // وصف العرض
  longDescription: string;        // وصف تفصيلي في صفحة العروض
  heroImage: string;             // صورة العرض
  validUntil?: string;            // تاريخ انتهاء العرض (اختياري)
  features: string[];            // مميزات العرض (نقاط مختصرة)
  conditions: string[];          // شروط الاستخدام
  relatedServiceSlug?: string;    // slug الخدمة المرتبطة (اختياري)
  featured?: boolean;             // تمييز العرض (يظهر بشكل أكبر)
}

export const offersList: Offer[] = [
  {
    id: "stays-morocco",
    badge: "عرض خاص",
    badgeColor: "gold",
    title: "خصم على الإقامات في تركيا",
    target: "للجنسية المغربية",
    discount: "25%",
    discountLabel: "خصم",
    description:
      "خصم 25% على جميع باقات الإقامات في تركيا للجنسية المغربية. إقامات فاخرة بأفضل المواقع.",
    longDescription:
      "عرض حصري لإخواننا من المغرب: خصم 25% على جميع باقات الإقامات في إسطنبول وأنطاليا وبودروم. يشمل الشقق المخدومة والفنادق الفاخرة بجميع وسائل الراحة.",
    heroImage:
  "/images/offers/stays-morocco.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 25% للجنسية المغربية",
      "يشمل إسطنبول وأنطاليا وبودروم",
      "شقق مخدومة وفنادق فاخرة",
      "دعم عربي 24/7",
    ],
    conditions: [
      "إثبات الجنسية المغربية عند الحجز",
      "الحد الأدنى للإقامة 3 أيام",
      "الخصم لا يُجمع مع عروض أخرى",
    ],
    relatedServiceSlug: "reservations-turkey",
    featured: true,
  },
  {
    id: "internal-tours-europe",
    badge: "عرض خاص",
    badgeColor: "gold",
    title: "خصم على الرحلات الداخلية",
    target: "للمقيمين بأوروبا",
    discount: "25%",
    discountLabel: "خصم",
    description:
      "خصم 25% على جميع الرحلات الداخلية في تركيا للمقيمين في الدول الأوروبية.",
    longDescription:
      "عرض خاص للمقيمين في أوروبا: خصم 25% على جميع الرحلات الداخلية والجولات اليومية في إسطنبول وكابادوكيا وأنطاليا.",
    heroImage:
      "/images/services/daily-tours/hero.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 25% للمقيمين بأوروبا",
      "يشمل جولات إسطنبول وكابادوكيا",
      "مرشد عربي محترف",
      "مواصلات مكيفة",
    ],
    conditions: [
      "إثبات الإقامة الأوروبية",
      "الحجز قبل 48 ساعة",
      "لا يشمل رحلات VIP",
    ],
    relatedServiceSlug: "daily-tours",
    featured: true,
  },
  {
    id: "vip-cars-monthly",
    badge: "عرض شهري",
    badgeColor: "navy",
    title: "خصم على السيارات VIP",
    target: "للجميع",
    discount: "15%",
    discountLabel: "خصم",
    description:
      "خصم 15% على تأجير السيارات الفاخرة مع سائق خاص لمدة أسبوع أو أكثر.",
    longDescription:
      "عرض شهري على السيارات VIP: خصم 15% عند الحجز الأسبوعي أو الشهري. سيارات مرسيدس وBMW بسائق محترف يتحدث العربية.",
    heroImage:
      "/images/services/vip-cars/hero.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 15% للحجز الأسبوعي+",
      "سيارات مرسيدس V-Class",
      "سائق يتحدث العربية",
      "واي فاي مجاني",
    ],
    conditions: [
      "الحد الأدنى 7 أيام",
      "يشمل الوقود والمواقف",
      "لا يُجمع مع عروض أخرى",
    ],
    relatedServiceSlug: "vip-cars",
    featured: false,
  },
  {
    id: "hotels-gulf",
    badge: "عرض خاص",
    badgeColor: "gold",
    title: "خصم على حجز الفنادق",
    target: "للجنسيات الخليجية",
    discount: "20%",
    discountLabel: "خصم",
    description:
      "خصم 20% على حجز الفنادق الفاخرة للجنسيات الخليجية (السعودية، الإمارات، الكويت، قطر، البحرين، عمان).",
    longDescription:
      "عرض حصري لدول الخليج العربي: خصم 20% على حجز جميع الفنادق 4 و5 نجوم في إسطنبول وأنطاليا وبودروم.",
    heroImage:
      "/images/services/hotels/hero.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 20% للجنسيات الخليجية",
      "فنادق 4 و5 نجوم",
      "إسطنبول وأنطاليا وبودروم",
      "إفطار مجاني",
    ],
    conditions: [
      "إثبات الجنسية الخليجية",
      "الحد الأدنى 3 ليالٍ",
      "الخصم لا يشمل المواسم",
    ],
    relatedServiceSlug: "hotels",
    featured: false,
  },
  {
    id: "flights-early",
    badge: "عرض شهري",
    badgeColor: "navy",
    title: "خصم على حجز الطيران",
    target: "للجميع",
    discount: "10%",
    discountLabel: "خصم",
    description:
      "خصم 10% على تذاكر الطيران عند الحجز قبل 30 يوماً من تاريخ السفر.",
    longDescription:
      "عرض شهري على حجز الطيران: خصم 10% عند الحجز المبكر قبل 30 يوماً. تذاكر ذهاب وإياب لجميع الوجهات.",
    heroImage:
      "/images/services/flights/hero.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 10% للحجز المبكر",
      "جميع الخطوط الجوية",
      "ذهاب وإياب",
      "تأكيد فوري",
    ],
    conditions: [
      "الحجز قبل 30 يوماً",
      "لا يُجمع مع عروض أخرى",
      "رسوم الإلغاء حسب سياسة الخط",
    ],
    relatedServiceSlug: "flights",
    featured: false,
  },
  {
    id: "daily-tours-arab",
    badge: "عرض خاص",
    badgeColor: "gold",
    title: "خصم على الرحلات اليومية",
    target: "للجنسيات العربية",
    discount: "15%",
    discountLabel: "خصم",
    description:
      "خصم 15% على الرحلات اليومية داخل إسطنبول لجميع الجنسيات العربية.",
    longDescription:
      "عرض خاص للجنسيات العربية: خصم 15% على جولات إسطنبول اليومية. 5 رحلات ثابتة تغطي أهم المعالم.",
    heroImage:
      "/images/services/daily-tours/hero.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 15% للجنسيات العربية",
      "5 رحلات يومية",
      "مرشد عربي",
      "مواصلات مكيفة",
    ],
    conditions: [
      "إثبات الجنسية العربية",
      "الحجز قبل 24 ساعة",
      "لا يُجمع مع عروض أخرى",
    ],
    relatedServiceSlug: "daily-tours",
    featured: false,
  },
  {
    id: "private-tours-family",
    badge: "عرض عائلي",
    badgeColor: "red",
    title: "خصم على الرحلات الخاصة",
    target: "للعائلات",
    discount: "20%",
    discountLabel: "خصم",
    description:
      "خصم 20% على الرحلات الخاصة في تركيا للعائلات (شخصين أو أكثر). 7 رحلات ثابتة.",
    longDescription:
      "عرض عائلي: خصم 20% على الرحلات الخاصة لأشهر المدن التركية. كابادوكيا، أنطاليا، باموكالي وغيرها.",
    heroImage:
      "/images/services/private-tours/hero.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 20% للعائلات",
      "7 رحلات خاصة",
      "سيارة خاصة مع سائق",
      "مرشد عربي",
    ],
    conditions: [
      "شخصين أو أكثر",
      "الحجز قبل 3 أيام",
      "لا يُجمع مع عروض أخرى",
    ],
    relatedServiceSlug: "private-tours",
    featured: false,
  },
  {
    id: "group-tours-discount",
    badge: "عرض جماعي",
    badgeColor: "red",
    title: "خصم على الرحلات الجماعية",
    target: "للمجموعات +10 أشخاص",
    discount: "25%",
    discountLabel: "خصم",
    description:
      "خصم 25% على الرحلات الجماعية للمجموعات من 10 أشخاص أو أكثر. 7 رحلات ثابتة.",
    longDescription:
      "عرض جماعي: خصم 25% للمجموعات من 10+ أشخاص. يشمل حافلة فاخرة ومرشد عربي خاص.",
    heroImage:
      "/images/services/group-tours/hero.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 25% للمجموعات +10",
      "7 رحلات جماعية",
      "حافلة فاخرة مكيفة",
      "مرشد عربي خاص",
    ],
    conditions: [
      "10 أشخاص كحد أدنى",
      "حجز جماعي في نفس الوقت",
      "لا يُجمع مع عروض أخرى",
    ],
    relatedServiceSlug: "group-tours",
    featured: false,
  },
  {
    id: "hajj-umrah-early",
    badge: "عرض خاص",
    badgeColor: "gold",
    title: "خصم على الحج والعمرة",
    target: "للجميع",
    discount: "15%",
    discountLabel: "خصم",
    description:
      "خصم 15% على باقات الحج والعمرة عند الحجز المبكر. برامج كاملة منظمة بكل التفاصيل.",
    longDescription:
      "عرض خاص: خصم 15% على باقات الحج والعمرة عند الحجز قبل الموسم بـ 60 يوماً.",
    heroImage:
      "/images/services/hajj-umrah/hero.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 15% للحجز المبكر",
      "برامج كاملة",
      "مرشد ديني متخصص",
      "فنادق قريبة من الحرم",
    ],
    conditions: [
      "الحجز قبل 60 يوماً",
      "شامل التأشيرة والطيران",
      "لا يُجمع مع عروض أخرى",
    ],
    relatedServiceSlug: "hajj-umrah",
    featured: false,
  },
  {
    id: "medical-tourism-all",
    badge: "عرض شهري",
    badgeColor: "navy",
    title: "خصم على السياحة العلاجية",
    target: "للجميع",
    discount: "10%",
    discountLabel: "خصم",
    description:
      "خصم 10% على باقات السياحة العلاجية. علاج بأفضل المستشفيات مع متابعة كاملة.",
    longDescription:
      "عرض شهري على السياحة العلاجية: خصم 10% على باقات العلاج في أفضل المستشفيات التركية المعتمدة دولياً.",
    heroImage:
      "/images/services/medical-tourism/hero.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 10% على الباقات",
      "مستشفيات معتمدة JCI",
      "ترجمة طبية عربية",
      "متابعة بعد العودة",
    ],
    conditions: [
      "إرسال التقارير الطبية أولاً",
      "تكاليف العلاج تُحدّد بعد الاستشارة",
      "لا يُجمع مع عروض أخرى",
    ],
    relatedServiceSlug: "medical-tourism",
    featured: false,
  },
  {
    id: "visa-fast",
    badge: "عرض خاص",
    badgeColor: "gold",
    title: "خصم على الفيزا",
    target: "للجنسيات العربية",
    discount: "15%",
    discountLabel: "خصم",
    description:
      "خصم 15% على استخراج التأشيرة التركية لجميع الجنسيات العربية. تأمين سريع وموثوق.",
    longDescription:
      "عرض خاص للجنسيات العربية: خصم 15% على استخراج فيزا تركيا. خدمة سريعة بنسبة موافقة تتجاوز 95%.",
    heroImage:
      "/images/services/visa/hero.webp",
    validUntil: "نهاية الشهر",
    features: [
      "خصم 15% للجنسيات العربية",
      "نسبة موافقة 95%+",
      "تأشيرة إلكترونية أو ورقية",
      "متابعة كاملة",
    ],
    conditions: [
      "إثبات الجنسية العربية",
      "جواز سفر ساري 6 أشهر+",
      "لا يُجمع مع عروض أخرى",
    ],
    relatedServiceSlug: "visa",
    featured: false,
  },
];

/* ====================================================================
 * الخطط السنوية — الخطط الفضية / البرونزية / الذهبية
 * ==================================================================== */

/**
 * واجهة الخطة السنوية — تحتوي بيانات كاملة لعرض كل خطة تفصيلياً.
 */
export interface Plan {
  id: "bronze" | "silver" | "gold";
  name: string;                  // اسم الخطة (مثل: "الخطّة البرونزية")
  tier: string;                  // الترتيب (مثل: "Bronze")
  tagline: string;               // شعار الخطة المختصر
  description: string;           // وصف قصير للبطاقة
  longDescription: string;       // وصف تفصيلي في صفحة الخطط
  price: string;                  // السعر السنوي
  currency: string;              // العملة
  period: string;                // فترة الاشتراك (3/5/10 سنوات)
  popular?: boolean;              // تمييز الخطة (الأكثر طلباً)
  color: {
    primary: string;              // اللون الرئيسي للخطة (HSL)
    accent: string;               // اللون الثانوي
    gradient: string;             // تدرّج الخلفية
    iconBg: string;               // خلفية الأيقونة
  };
  features: {
    title: string;
    description: string;
    included: boolean;            // هل هي مشمولة في هذه الخطة
  }[];
  benefits: string[];             // الميزات الإضافية المشمولة فقط
  limitations: string[];          // القيود أو الحدود
  recommendedFor: string;         // لمن هذه الخطة
  icon: string;                   // اسم الأيقونة (lucide-react)
}

export const plansList: Plan[] = [
  {
    id: "bronze",
    name: "الخطّة البرونزية",
    tier: "Bronze",
    tagline: "بداية مثالية — اشتراك 3 سنوات",
    description:
      "خطة اقتصادية مثالية للأفراد والعائلات الصغيرة — اشتراك 3 سنوات بمزايا حصرية.",
    longDescription:
      "الخطّة البرونزية هي خيارنا الاقتصادي للعملاء الذين يرغبون بتجربة السياحة في تركيا بميزانية معقولة دون التضحية بالجودة. تشمل الخطة خدمات أساسية مختارة بعناية: حجوزات فنادق 4 نجوم، جولات يومية في إسطنبول، نقل من المطارات، ودعم واتساب خلال فترة الإقامة. مثالية للأفراد، الأزواج، والعائلات الصغيرة التي تخطط لرحلة 3-7 أيام. رغم كونها الخطة الأقل سعراً، إلا أنها توفّر تجربة سياحية كاملة وممتعة مع مرشد عربي وخدمة احترافية طوال الرحلة.",
    price: "499",
    currency: "$",
    period: "3 سنوات",
    color: {
      primary: "hsl(25 52% 38%)",     // برونزي داكن
      accent: "hsl(31 65% 50%)",       // برونزي فاتح
      gradient: "linear-gradient(135deg, hsl(28 58% 33%) 0%, hsl(25 52% 28%) 100%)",
      iconBg: "hsl(31 65% 50% / 0.15)",
    },
    features: [
      { title: "إقامة فندق 4 نجوم", description: "غرفة مزدوجة مع إفطار", included: true },
      { title: "جولة يومية في إسطنبول", description: "جولة واحدة مجانية", included: true },
      { title: "نقل من المطار", description: "نقل ذهاب وإياب", included: true },
      { title: "دعم واتساب", description: "خلال ساعات العمل", included: true },
      { title: "مرشد عربي", description: "للجولات اليومية", included: true },
      { title: "خصومات على العروض", description: "حتى 10% خصم", included: true },
      { title: "نقل VIP سيارات فاخرة", description: "مرسيدس V-Class", included: false },
      { title: "جولات خاصة في تركيا", description: "خارج إسطنبول", included: false },
      { title: "فندق 5 نجوم", description: "أفخم الفنادق", included: false },
      { title: "دعم 24/7 طارئ", description: "على مدار الساعة", included: false },
      { title: "مدير حساب خاص", description: "خدمة شخصية", included: false },
      { title: "دعوات لفعاليات حصرية", description: "حفلات وعروض", included: false },
    ],
    benefits: [
      "حجز فندق 4 نجوم مع إفطار لمدة 7 أيام",
      "جولة يومية مجانية في إسطنبول",
      "نقل من/إلى المطار",
      "دعم عبر واتساب خلال ساعات العمل (9 ص - 9 م)",
      "خصم 10% على جميع العروض الموسمية",
      "مرشد سياحي عربي للجولات اليومية",
    ],
    limitations: [
      "الحد الأقصى للإقامة 7 أيام",
      "جولة يومية واحدة فقط مجانية",
      "لا يشمل الرحلات خارج إسطنبول",
      "لا يشمل السيارات VIP",
      "الدعم خلال ساعات العمل فقط",
    ],
    recommendedFor: "الأفراد والأزواج والعائلات الصغيرة الذين يبحثون عن رحلة اقتصادية قصيرة",
    icon: "Award",
  },
  {
    id: "silver",
    name: "الخطّة الفضية",
    tier: "Silver",
    tagline: "الأكثر شعبية — اشتراك 5 سنوات",
    description:
      "خطة متوازنة شاملة — اشتراك 5 سنوات بمزايا إضافية وفنادق فاخرة ودعم ممتاز.",
    longDescription:
      "الخطّة الفضية هي اختيارنا الأكثر شعبية، حيث تجمع بين السعر المعقول والخدمة الفاخرة. مثالية للعائلات المتوسطة والمسافرين الذين يرغبون بتجربة سياحية أكثر شمولية. تشمل الخطة إقامة في فنادق 4-5 نجوم، جولتين يوميتين، نقل VIP من المطار، دعم واتساب موسّع، وخصومات أكبر على العروض الموسمية. الخطة الفضية توفر توازناً مثالياً بين السعر والجودة، وتشمل معظم ما يحتاجه المسافر العادي لرحلة 7-10 أيام في تركيا. مدير حساب مخصص لمساعدتك في تخطيط رحلتك والرد على استفساراتك بشكل أسرع.",
    price: "899",
    currency: "$",
    period: "5 سنوات",
    popular: true,
    color: {
      primary: "hsl(220 45% 50%)",     // فضي/أزرق
      accent: "hsl(217 72% 60%)",       // فضي فاتح
      gradient: "linear-gradient(135deg, hsl(217 65% 48%) 0%, hsl(220 45% 30%) 100%)",
      iconBg: "hsl(217 72% 60% / 0.15)",
    },
    features: [
      { title: "إقامة فندق 4 نجوم", description: "غرفة عائلية مع إفطار", included: true },
      { title: "جولة يومية في إسطنبول", description: "جولتان مجانيتان", included: true },
      { title: "نقل من المطار", description: "نقل VIP بسيارة فاخرة", included: true },
      { title: "دعم واتساب", description: "من 8 ص حتى 11 م", included: true },
      { title: "مرشد عربي", description: "لجميع الجولات", included: true },
      { title: "خصومات على العروض", description: "حتى 15% خصم", included: true },
      { title: "نقل VIP سيارات فاخرة", description: "5 ساعات مجانية", included: true },
      { title: "جولات خاصة في تركيا", description: "جولة واحدة مجانية", included: true },
      { title: "فندق 5 نجوم", description: "ترقية متاحة بخصم", included: false },
      { title: "دعم 24/7 طارئ", description: "على مدار الساعة", included: false },
      { title: "مدير حساب خاص", description: "خدمة شخصية", included: true },
      { title: "دعوات لفعاليات حصرية", description: "حفلات وعروض", included: false },
    ],
    benefits: [
      "حجز فندق 4 نجوم مع إفطار لمدة 10 أيام",
      "جولتان يوميتان مجانيتان في إسطنبول",
      "نقل VIP من/إلى المطار بسيارة فاخرة",
      "5 ساعات نقل VIP مجانية داخل المدينة",
      "جولة خاصة واحدة مجانية خارج إسطنبول",
      "دعم عبر واتساب من 8 ص حتى 11 م",
      "خصم 15% على جميع العروض الموسمية",
      "مدير حساب مخصص لمتابعة رحلتك",
    ],
    limitations: [
      "الحد الأقصى للإقامة 14 يوم",
      "جولتان يوميتان فقط مجانية",
      "5 ساعات نقل VIP مجانية فقط (إضافية بسعر)",
      "لا يشمل فنادق 5 نجوم إلا بترقية مدفوعة",
      "لا يشمل الدعم الطارئ على مدار الساعة",
    ],
    recommendedFor: "العائلات المتوسطة والمسافرين الذين يريدون تجربة شاملة بأسعار معقولة",
    icon: "Crown",
  },
  {
    id: "gold",
    name: "الخطّة الذهبية",
    tier: "Gold",
    tagline: "تجربة فاخرة — اشتراك 10 سنوات",
    description:
      "خطة VIP كاملة بأرقى الخدمات — اشتراك 10 سنوات بمزايا حصرية لا تُقاوَم.",
    longDescription:
      "الخطّة الذهبية هي أرقى ما نقدّمه — تجربة سياحية فاخرة بكل تفاصيلها. مخصصة لكبار الشخصيات، رجال الأعمال، والعائلات الباحثة عن الفخامة المطلقة. تشمل الخطة إقامة في فنادق 5 نجوم فاخرة، نقل VIP بسيارات مرسيدس V-Class طوال الرحلة، جولات خاصة في جميع أنحاء تركيا، مرشد عربي شخصي، دعم 24/7 حتى في الحالات الطارئة، مدير حساب خاص، ودعوات لفعاليات حصرية. كل تفصيلة في رحلتك ستكون مُنظّمة بعناية فائقة لتوفير أعلى درجات الراحة والرفاهية. الخطة الذهبية لا تُقاوَم لمن يبحث عن الأفضل فقط.",
    price: "1999",
    currency: "$",
    period: "10 سنوات",
    color: {
      primary: "hsl(40 80% 52%)",      // ذهبي
      accent: "hsl(45 90% 65%)",        // ذهبي فاتح
      gradient: "linear-gradient(135deg, hsl(40 80% 52%) 0%, hsl(36 73% 45%) 100%)",
      iconBg: "hsl(40 80% 52% / 0.15)",
    },
    features: [
      { title: "إقامة فندق 4 نجوم", description: "غرفة عائلية مع إفطار", included: false },
      { title: "جولة يومية في إسطنبول", description: "جولات غير محدودة", included: true },
      { title: "نقل من المطار", description: "نقل VIP فاخر طوال الرحلة", included: true },
      { title: "دعم واتساب", description: "24/7 على مدار الساعة", included: true },
      { title: "مرشد عربي", description: "مرشد شخصي طوال الرحلة", included: true },
      { title: "خصومات على العروض", description: "حتى 25% خصم", included: true },
      { title: "نقل VIP سيارات فاخرة", description: "مرسيدس V-Class غير محدود", included: true },
      { title: "جولات خاصة في تركيا", description: "غير محدودة", included: true },
      { title: "فندق 5 نجوم", description: "أفخم الفنادق والمنتجعات", included: true },
      { title: "دعم 24/7 طارئ", description: "على مدار الساعة", included: true },
      { title: "مدير حساب خاص", description: "خدمة شخصية VIP", included: true },
      { title: "دعوات لفعاليات حصرية", description: "حفلات وعروض ومباريات", included: true },
    ],
    benefits: [
      "حجز فندق 5 نجوم فاخر مع جميع الوجبات",
      "جولات غير محدودة في إسطنبول وتركيا",
      "نقل VIP طوال الرحلة بمرسيدس V-Class",
      "مرشد سياحي عربي شخصي طوال الرحلة",
      "دعم 24/7 على مدار الساعة حتى الحالات الطارئة",
      "خصم 25% على جميع العروض",
      "مدير حساب شخصي VIP",
      "دعوات لفعاليات حصرية (حفلات، عروض، مباريات)",
      "خدمة كونسيرج لحجوزات المطاعم الفاخرة",
      "تأمين سفر شامل لكامل العائلة",
    ],
    limitations: [
      "لا توجد قيود على المدة (حتى 30 يوم)",
      "لا توجد قيود على عدد الجولات",
      "الجولات خارج تركيا تخضع لرسوم إضافية",
      "الفعاليات الحصرية حسب الإتاحة",
    ],
    recommendedFor: "كبار الشخصيات، رجال الأعمال، والعائلات الباحثة عن الفخامة المطلقة",
    icon: "Gem",
  },
];

/**
 * أسئلة شائعة حول الخطط السنوية.
 */
export const plansFAQ: { question: string; answer: string }[] = [
  {
    question: "ما الفرق بين الخطط الثلاث (البرونزية، الفضية، الذهبية)؟",
    answer:
      "الخطط تختلف في مستوى الخدمة والمميزات. الخطّة البرونزية اقتصادية (499$) وتشمل فنادق 4 نجوم وجولة يومية واحدة. الخطّة الفضية (899$) هي الأكثر شعبية وتشمل جولتين ونقل VIP وخصومات أكبر. الخطّة الذهبية (1999$) هي VIP كاملة مع فنادق 5 نجوم ومرشد شخصي ودعم 24/7 وجولات غير محدودة.",
  },
  {
    question: "هل يمكنني الترقية من خطة لأخرى بعد الاشتراك؟",
    answer:
      "نعم، يمكنك الترقية في أي وقت خلال فترة اشتراكك. ستدفع فقط فرق السعر بين الخطة الحالية والخطة الجديدة، مع ضمان جميع المميزات الجديدة فوراً. تواصل معنا عبر واتساب لبدء الترقية.",
  },
  {
    question: "هل الأسعار سنوية أم لكل رحلة؟",
    answer:
      "الأسعار المعروضة هي اشتراك سنوي يمنحك مزايا خاصة طوال السنة. كل خطة تشمل رحلة سياحية واحدة كاملة، بالإضافة إلى خصومات على الرحلات الإضافية خلال نفس السنة. كلما ارتفعت الخطة، زادت الخصومات على الرحلات الإضافية.",
  },
  {
    question: "هل يمكن إضافة أفراد إضافيين للخطة العائلية؟",
    answer:
      "نعم، يمكنك إضافة أفراد إضافيين لأي خطة. الخطّة البرونزية تشمل شخصين، الفضية تشمل 4 أشخاص، والذهبية تشمل 6 أشخاص. يمكن إضافة أفراد إضافيين مقابل رسوم مخفّضة لكل فرد.",
  },
  {
    question: "ماذا يحدث إذا ألغيت اشتراكي؟",
    answer:
      "يمكنك الإلغاء خلال أول 14 يوم من الاشتراك واسترداد كامل المبلغ. بعد هذه الفترة، تُحسب رسوم الإلغاء حسب المدة المتبقية من الاشتراك. اطّلع على صفحة الشروط والأحكام للتفاصيل الكاملة.",
  },
  {
    question: "هل تشمل الخطط تذاكر الطيران الدولي؟",
    answer:
      "الخطط لا تشمل تذاكر الطيران الدولي بشكل افتراضي، لكن نوفّرها كخدمة إضافية بأسعار مخفّضة لعملاء الخطط. الخطّة الذهبية تشمل خصم 15% على تذاكر الطيران الدولي، الفضية 10%، والبرونزية 5%.",
  },
];

/* ====================================================================
 * التنقل — يتم تعريفه بعد servicesList لأن navItems.dropdown يعتمد عليها
 * ==================================================================== */

export interface NavItem {
  title: string;
  href: string;
  dropdown?: { title: string; href: string; description?: string }[];
  highlight?: boolean;
}

/**
 * عناصر التنقل الرئيسية في الهيدر (بالترتيب الذي يظهر به من اليمين لليسار في RTL).
 * "الخدمات" تحتوي على قائمة منسدلة (Dropdown) بالخدمات الـ11.
 */
export const navItems: NavItem[] = [
  { title: "الرئيسية", href: "/" },
  {
    title: "الخدمات",
    href: "/services",
    dropdown: servicesList.map((s) => ({
      title: s.title,
      href: `/services/${s.slug}`,
      description: s.shortDescription,
    })),
  },
  { title: "العروض", href: "/offers" },
  { title: "الخطط السنوية", href: "/plans" },
  { title: "الحجز السريع", href: "/quick-booking", highlight: true },
  { title: "المدونة", href: "/blog" },
  { title: "من نحن", href: "/about" },
  { title: "اتصل بنا", href: "/contact" },
];

/* ====================================================================
 * الفوتر — يُعرّف بعد servicesList لأنه يستخدمها أيضاً
 * ==================================================================== */

export interface FooterColumn {
  title: string;
  links: { title: string; href: string }[];
}

/**
 * روابط الفوتر منظمة في 4 أعمدة.
 */
export const footerColumns: FooterColumn[] = [
  {
    title: "روابط سريعة",
    links: [
      { title: "الرئيسية", href: "/" },
      { title: "الخدمات", href: "/services" },
      { title: "العروض", href: "/offers" },
      { title: "الخطط السنوية", href: "/plans" },
      { title: "الحجز السريع", href: "/quick-booking" },
      { title: "المدونة", href: "/blog" },
      { title: "من نحن", href: "/about" },
      { title: "اتصل بنا", href: "/contact" },
    ],
  },
  {
    title: "الدعم والسياسات",
    links: [
      { title: "الأسئلة الشائعة", href: "/faq" },
      { title: "مركز المساعدة", href: "/help" },
      { title: "سياسة الخصوصية", href: "/privacy" },
      { title: "الشروط والأحكام", href: "/terms" },
    ],
  },
  {
    title: "خدماتنا",
    links: servicesList.slice(0, 6).map((s) => ({
      title: s.title,
      href: `/services/${s.slug}`,
    })),
  },
];
