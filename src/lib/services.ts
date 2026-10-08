/**
 * ============================================================================
 *  CASANOSTRA — تعريف الخدمات الـ11 وحقول نماذجها
 * ============================================================================
 *
 *  كل خدمة تحتوي:
 *    - slug: معرّف فريد في الرابط (يستخدم في /services/[slug])
 *    - title: اسم الخدمة بالعربية
 *    - description: وصف مختصر
 *    - icon: اسم أيقونة lucide-react
 *    - fields: تعريف حقول النموذج الديناميكي
 *
 *  أنواع الحقول المدعومة:
 *    text | tel | number | date | datetime-local | select | radio | textarea
 *    people-counter — عدّاد أشخاص يضاعف حقول كل شخص
 *
 *  الحقول الشرطية (showWhen): تظهر فقط عندما يساوي حقل آخر قيمة معيّنة.
 *    مثال: حقول العودة في خدمة السيارات VIP تظهر فقط عند اختيار "نعم".
 * ============================================================================ */

/** نوع الحقل */
export type FieldType =
  | "text"
  | "tel"
  | "number"
  | "date"
  | "datetime-local"
  | "select"
  | "radio"
  | "textarea"
  | "people-counter";

/** تعريف حقل فردي لكل شخص داخل عدّاد الأشخاص */
export interface PersonFieldDef {
  name: string;
  label: string;
  type: "text" | "tel" | "number";
  required?: boolean;
  placeholder?: string;
}

/** تعريف حقل في النموذج */
export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  /**
   * خيارات للحقل من نوع select أو radio.
   * القيم هنا canonical عربية داخلية (مفاتيح تخزين) وليست نصوص عرض.
   * نصوص العرض المترجمة تأتي من `serviceForms.options` في page-messages
   * ويتم الربط بالفهرس (index) حصراً — لا تقارن النصوص حرفياً أبداً.
   */
  options?: string[];
  /**
   * إظهار هذا الحقل فقط عندما يساوي حقل آخر قيمة معيّنة.
   * `equals` يجب أن تكون القيمة canonical المخزنة (العربية في services.ts)
   * وليست التسمية المترجمة المعروضة — استخدم `isFieldVisible` دائماً.
   */
  showWhen?: { field: string; equals: string };
  /** حقول كل شخص (للعدّاد people-counter فقط) */
  personFields?: PersonFieldDef[];
  /** عرض الحقل بنصف العرض على الشاشات الكبيرة (حقلان في صف واحد) */
  half?: boolean;
}

/** تعريف خدمة كاملة */
export interface ServiceDef {
  slug: string;
  title: string;
  description: string;
  icon: string;
  fields: FieldDef[];
}

/* ====================================================================
 *  الرحلات الثابتة — قوائم منسدلة للخدمات 6 و 7 و 8
 * ==================================================================== */

/** 5 رحلات يومية ثابتة في إسطنبول */
export const dailyIstanbulTours: string[] = [
  "جولة السلطان أحمد (المسجد الأزرق + آيا صوفيا + قصر توبكابي)",
  "جولة البوسفور بالقارب (قلعة روملي حصار + القرى)",
  "جولة غراند بازار والأسواق التاريخية",
  "جولة تكسيم وساحة الاستقلال + برج غلطة",
  "جولة الجزر الأميرية بالعبّارة (بويوك أضا)",
];

/** 7 رحلات خاصة ثابتة في تركيا (خارج إسطنبول) */
export const privateTurkeyTours: string[] = [
  "رحلة كابادوكيا والمناطيد (يومين كاملين)",
  "رحلة باموكالي والينابيع الحرارية البيضاء",
  "رحلة طرابزون والهضبة السوداء (أيدر)",
  "رحلة أنطاليا والشواطئ الفيروزية",
  "رحلة بودروم ويخوت بحر إيجة",
  "رحلة بورصة وشلالات أولوداغ",
  "رحلة إسطنبول الكاملة الشاملة (3 أيام)",
];

/** 7 رحلات جماعية ثابتة */
export const groupToursList: string[] = [
  "رحلة عائلية شاملة لإسطنبول (عائلات + أطفال)",
  "رحلة نسائية خاصة (للنساء فقط — مرشدة أنثى)",
  "رحلة رجالية خاصة (للرجال فقط)",
  "رحلة شبابية للمجموعات (18-35 سنة)",
  "رحلة شركات ووفود رسمية (VIP)",
  "رحلة مدرسية للطلاب (مرشد تعليمي)",
  "رحلة شهر العسل الجماعية (أزواج فقط)",
];

/* ====================================================================
 *  الخدمات الـ11 الكاملة
 * ==================================================================== */

export const services: ServiceDef[] = [
  /* ────────────────────────────────────────────────────────────────
   * 1. الإقامات في تركيا
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "reservations-turkey",
    title: "الإقامات في تركيا",
    description: "إقامات فاخرة قصيرة وطويلة الأمد بأفضل المواقع في تركيا.",
    icon: "Building2",
    fields: [
      {
        name: "guests",
        label: "عدد الأشخاص",
        type: "people-counter",
        required: true,
        personFields: [
          { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد" },
          { name: "phone", label: "الهاتف (واتساب مع رمز الدولة)", type: "tel", required: true },
          { name: "age", label: "العمر", type: "number", required: true, placeholder: "30" },
          { name: "passport", label: "رقم جواز السفر", type: "text", required: true, placeholder: "A12345678" },
          { name: "nationality", label: "الجنسية", type: "text", required: true, placeholder: "مثال: سعودي" },
        ],
      },
      { name: "entryDate", label: "تاريخ الدخول لتركيا", type: "date", required: true, half: true },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 2. الفيزا
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "visa",
    title: "الفيزا",
    description: "تأشيرات سياحية سريعة وموثوقة لجميع الجنسيات.",
    icon: "FileCheck",
    fields: [
      {
        name: "applicants",
        label: "عدد الأشخاص",
        type: "people-counter",
        required: true,
        personFields: [
          { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد" },
          { name: "phone", label: "الهاتف (واتساب مع رمز الدولة)", type: "tel", required: true },
          { name: "age", label: "العمر", type: "number", required: true, placeholder: "30" },
          { name: "passport", label: "رقم جواز السفر", type: "text", required: true, placeholder: "A12345678" },
          { name: "nationality", label: "الجنسية", type: "text", required: true, placeholder: "مثال: سعودي" },
        ],
      },
      { name: "residenceCountry", label: "الدولة المقيم بها حالياً", type: "text", required: true, placeholder: "مثال: السعودية", half: true },
      { name: "visaCountry", label: "الدولة المطلوب استخراج فيزا لها", type: "text", required: true, placeholder: "مثال: تركيا", half: true },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 3. السيارات VIP — مع قسم عودة شرطي
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "vip-cars",
    title: "السيارات VIP",
    description: "سيارات فاخرة بسائق خاص لتنقّلات راقية في إسطنبول وتركيا.",
    icon: "Car",
    fields: [
      { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد", half: true },
      { name: "phone", label: "الهاتف (واتساب مع رمز الدولة)", type: "tel", required: true, half: true },
      {
        name: "serviceType",
        label: "نوع الخدمة",
        type: "select",
        required: true,
        options: [
          "توصيلة (نقطة إلى نقطة)",
          "يومي (حتى 8 ساعات)",
          "أسبوعي (7 أيام)",
        ],
        half: true,
      },
      { name: "passengerCount", label: "عدد الأشخاص", type: "number", required: true, placeholder: "2", half: true },
      { name: "pickupLocation", label: "مكان الانطلاق", type: "text", required: true, placeholder: "مثال: مطار إسطنبول الجديد", half: true },
      { name: "dropoffLocation", label: "مكان الوصول", type: "text", required: true, placeholder: "مثال: فندق تكسيم", half: true },
      { name: "departureDatetime", label: "اليوم والساعة", type: "datetime-local", required: true, half: true },
      {
        name: "hasReturn",
        label: "هل هناك عودة؟",
        type: "radio",
        required: true,
        options: ["نعم", "لا"],
        half: true,
      },
      /* ── قسم العودة الشرطي — يظهر فقط عند اختيار "نعم" ── */
      { name: "returnPickupLocation", label: "مكان انطلاق العودة", type: "text", required: false, placeholder: "مثال: فندق تكسيم", half: true, showWhen: { field: "hasReturn", equals: "نعم" } },
      { name: "returnDropoffLocation", label: "مكان وصول العودة", type: "text", required: false, placeholder: "مثال: مطار إسطنبول الجديد", half: true, showWhen: { field: "hasReturn", equals: "نعم" } },
      { name: "returnDatetime", label: "يوم وساعة العودة", type: "datetime-local", required: false, half: true, showWhen: { field: "hasReturn", equals: "نعم" } },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 4. حجز الفنادق
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "hotels",
    title: "حجز الفنادق",
    description: "فنادق 5 نجوم ومنتجعات راقية بأسعار حصرية.",
    icon: "Hotel",
    fields: [
      {
        name: "guests",
        label: "عدد الأشخاص",
        type: "people-counter",
        required: true,
        personFields: [
          { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد" },
          { name: "phone", label: "الهاتف (واتساب مع رمز الدولة)", type: "tel", required: true },
          { name: "nationality", label: "الجنسية", type: "text", required: true, placeholder: "مثال: سعودي" },
        ],
      },
      { name: "hotelLocation", label: "مكان الفندق المطلوب", type: "text", required: true, placeholder: "مثال: إسطنبول - تكسيم", half: true },
      {
        name: "stars",
        label: "عدد النجوم",
        type: "select",
        required: true,
        options: ["3 نجوم", "4 نجوم", "5 نجوم"],
        half: true,
      },
      { name: "checkIn", label: "تاريخ الدخول", type: "date", required: true, half: true },
      { name: "checkOut", label: "تاريخ الخروج", type: "date", required: true, half: true },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 5. حجز الطيران — مع عدّاد مسافرين
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "flights",
    title: "حجز الطيران",
    description: "تذاكر طيران بأفضل الأسعار على جميع الخطوط الجوية.",
    icon: "Plane",
    fields: [
      {
        name: "passengers",
        label: "عدد المسافرين",
        type: "people-counter",
        required: true,
        personFields: [
          { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد" },
          { name: "phone", label: "الهاتف (واتساب)", type: "tel", required: true },
          { name: "nationality", label: "الجنسية", type: "text", required: true, placeholder: "مثال: سعودي" },
        ],
      },
      { name: "fromAirport", label: "من أي مطار", type: "text", required: true, placeholder: "مثال: مطار الملك عبدالعزيز - جدة", half: true },
      { name: "toAirport", label: "الوصول لأي مطار", type: "text", required: true, placeholder: "مثال: مطار إسطنبول الجديد", half: true },
      { name: "departureDate", label: "تاريخ الذهاب", type: "date", required: true, half: true },
      { name: "returnDate", label: "تاريخ الإياب", type: "date", required: false, half: true },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 6. الرحلات اليومية داخل إسطنبول — مع عدّاد + 5 جولات
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "daily-tours",
    title: "الرحلات اليومية داخل إسطنبول",
    description: "جولات يومية شاملة لأهم معالم إسطنبول التاريخية والسياحية.",
    icon: "MapPin",
    fields: [
      {
        name: "participants",
        label: "عدد المشاركين",
        type: "people-counter",
        required: true,
        personFields: [
          { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد" },
          { name: "phone", label: "الهاتف (واتساب)", type: "tel", required: true },
          { name: "nationality", label: "الجنسية", type: "text", required: true, placeholder: "مثال: سعودي" },
        ],
      },
      {
        name: "tourType",
        label: "نوع الرحلة",
        type: "select",
        required: true,
        options: dailyIstanbulTours,
      },
      { name: "tourDate", label: "تاريخ الرحلة", type: "date", required: true, half: true },
      { name: "location", label: "مكان تواجدك بإسطنبول", type: "text", required: true, placeholder: "مثال: فندق تكسيم", half: true },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 7. الرحلات الخاصة في تركيا — مع عدّاد + 7 رحلات
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "private-tours",
    title: "الرحلات الخاصة في تركيا",
    description: "برامج خاصة مصمّمة حسب رغبتك لكامل أنحاء تركيا.",
    icon: "CarTaxiFront",
    fields: [
      {
        name: "participants",
        label: "عدد المشاركين",
        type: "people-counter",
        required: true,
        personFields: [
          { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد" },
          { name: "phone", label: "الهاتف (واتساب)", type: "tel", required: true },
          { name: "nationality", label: "الجنسية", type: "text", required: true, placeholder: "مثال: سعودي" },
        ],
      },
      {
        name: "tourType",
        label: "نوع الرحلة الخاصة",
        type: "select",
        required: true,
        options: privateTurkeyTours,
      },
      { name: "tourDate", label: "تاريخ الرحلة", type: "date", required: true, half: true },
      { name: "location", label: "مكان تواجدك الحالي", type: "text", required: true, placeholder: "مثال: إسطنبول - تكسيم", half: true },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 8. الرحلات الجماعية — مع عدّاد + 7 رحلات
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "group-tours",
    title: "الرحلات الجماعية",
    description: "رحلات منظّمة للمجموعات العائلية والشركات بأسعار مميزة.",
    icon: "Users",
    fields: [
      {
        name: "participants",
        label: "عدد أفراد المجموعة",
        type: "people-counter",
        required: true,
        personFields: [
          { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد" },
          { name: "phone", label: "الهاتف (واتساب)", type: "tel", required: true },
          { name: "nationality", label: "الجنسية", type: "text", required: true, placeholder: "مثال: سعودي" },
        ],
      },
      {
        name: "tourType",
        label: "نوع الرحلة الجماعية",
        type: "select",
        required: true,
        options: groupToursList,
      },
      { name: "tourDate", label: "تاريخ الرحلة", type: "date", required: true, half: true },
      { name: "location", label: "مكان تجمّع المجموعة", type: "text", required: true, placeholder: "مثال: إسطنبول - السلطان أحمد", half: true },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 9. الحج والعمرة — عدّاد مع حقول تفصيلية لكل معتمر
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "hajj-umrah",
    title: "الحج والعمرة",
    description: "باقات متكاملة للحج والعمرة بأعلى معايير الراحة والخدمة.",
    icon: "MoonStar",
    fields: [
      {
        name: "pilgrims",
        label: "عدد المعتمرين/الحجاج",
        type: "people-counter",
        required: true,
        personFields: [
          { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد" },
          { name: "phone", label: "الهاتف (واتساب)", type: "tel", required: true },
          { name: "age", label: "العمر", type: "number", required: true, placeholder: "30" },
          { name: "passport", label: "رقم جواز السفر", type: "text", required: true, placeholder: "A12345678" },
          { name: "nationality", label: "الجنسية", type: "text", required: true, placeholder: "مثال: سعودي" },
          { name: "residenceCountry", label: "الدولة المقيم بها", type: "text", required: true, placeholder: "مثال: السعودية" },
        ],
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 10. السياحة العلاجية — عدّاد + حقول العلاج
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "medical-tourism",
    title: "السياحة العلاجية",
    description: "أفضل المستشفيات والمراكز الطبية التركية المعتمدة دولياً.",
    icon: "HeartPulse",
    fields: [
      {
        name: "patients",
        label: "عدد المرضى",
        type: "people-counter",
        required: true,
        personFields: [
          { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد" },
          { name: "phone", label: "الهاتف (واتساب)", type: "tel", required: true },
          { name: "nationality", label: "الجنسية", type: "text", required: true, placeholder: "مثال: سعودي" },
          { name: "age", label: "العمر", type: "number", required: true, placeholder: "30" },
        ],
      },
      { name: "arrivalDate", label: "تاريخ القدوم لإسطنبول", type: "date", required: true, half: true },
      {
        name: "interest",
        label: "نوع العلاج/الاهتمام",
        type: "select",
        required: true,
        options: [
          "زراعة الشعر",
          "تجميل الأسنان",
          "عمليات تجميلية (أنف، شفاه، تنحيف)",
          "علاج العيون (ليزك)",
          "أمراض القلب والشرايين",
          "جراحة العظام والمفاصل",
          "علاج الأورام",
          "فحوصات شاملة (check-up)",
          "أخرى",
        ],
        half: true,
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * 11. خدمات أخرى — نص حر
   * ──────────────────────────────────────────────────────────────── */
  {
    slug: "other-services",
    title: "خدمات أخرى",
    description: "خدمات إضافية متنوعة لتلبية جميع احتياجاتك في تركيا.",
    icon: "MoreHorizontal",
    fields: [
      { name: "name", label: "الاسم الكامل", type: "text", required: true, placeholder: "مثال: محمد أحمد", half: true },
      { name: "phone", label: "الهاتف (واتساب مع رمز الدولة)", type: "tel", required: true, half: true },
      {
        name: "serviceInterest",
        label: "الخدمة المهتم بها",
        type: "textarea",
        required: true,
        placeholder: "اكتب هنا تفاصيل الخدمة التي تبحث عنها... (مثال: حجز يخت خاص في بودروم لمدة يوم كامل مع 10 أشخاص)",
      },
    ],
  },
];

/* ====================================================================
 *  دوال مساعدة
 * ==================================================================== */

/** البحث عن خدمة بواسطة slug */
export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * هل يجب إظهار حقل شرطي؟ — مقارنة canonical آمنة لكل اللغات.
 * formData يخزن القيم canonical (العربية من `options`) بينما العرض مترجم،
 * لذا نقارن القيمة المخزنة مع `showWhen.equals` مباشرة دون أي ترجمة.
 */
export function isFieldVisible(
  field: FieldDef,
  formData: Record<string, unknown>,
): boolean {
  if (!field.showWhen) return true;
  return formData[field.showWhen.field] === field.showWhen.equals;
}

/** قائمة جميع الـ slugs (للاستخدام في generateStaticParams) */
export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
