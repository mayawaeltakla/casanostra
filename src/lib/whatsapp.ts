import { siteConfig } from "./site-config";
import type { FieldDef } from "./services";
import { isFieldVisible } from "./services";

/**
 * ============================================================================
 *  CASANOSTRA — أدوات واتساب
 * ============================================================================
 *
 *  رقم الواتساب يُقرأ من متغيّر البيئة NEXT_PUBLIC_WHATSAPP_NUMBER.
 *  إذا لم يكن موجوداً، نرجع إلى القيمة في site-config.ts كافتراضي.
 *  الرقم يجب أن يحتوي رمز الدولة بدون + أو 00.
 * ============================================================================ */

/** رقم واتساب الشركة — من env var أو fallback */
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.whatsappNumber;

/** نوع بيانات الشخص الواحد داخل عدّاد الأشخاص */
export interface PersonData {
  [key: string]: string;
}

/** نوع بيانات النموذج — قاموس من اسم الحقل إلى قيمته */
export type FormData = Record<string, string | PersonData[]>;

export interface WhatsAppCopy {
  requestTitle: string;
  service: string;
  requestDetails: string;
  travelers: string;
  person: string;
  intent: string;
  notProvided: string;
}

/* ====================================================================
 *  الدالة الرئيسية — buildWhatsAppMessage
 * ====================================================================
 *
 *  تستقبل: اسم الخدمة + بيانات النموذج + تعريف الحقول
 *  ترجع: رابط wa.me منسّق برسالة عربية واضحة تحتوي كل البيانات
 *
 *  الرسالة تُنظَّم كالتالي:
 *
 *    🌟 *CASANOSTRA — طلب جديد* 🌟
 *    ━━━━━━━━━━━━━━━━━
 *    📋 *الخدمة:* [اسم الخدمة]
 *
 *    📝 *تفاصيل الطلب:*
 *    • [حقل1]: [قيمة1]
 *    • [حقل2]: [قيمة2]
 *
 *    👥 *عدد المسافرين (3):*
 *
 *    *الشخص 1:*
 *    • الاسم: ...
 *    • الهاتف: ...
 *
 *    *الشخص 2:*
 *    ...
 *
 *    ━━━━━━━━━━━━━━━━━
 *    أرغب بحجز هذه الخدمة. شكراً لكم.
 * ==================================================================== */

export function buildWhatsAppMessage(
  serviceName: string,
  formData: FormData,
  fields: FieldDef[],
  copy: WhatsAppCopy,
  displayValues: Record<string, string>,
  locale: string,
): string {
  const lines: string[] = [];

  /* ── رأس الرسالة ── */
  lines.push(`🌟 *${copy.requestTitle}* 🌟`);
  lines.push("━━━━━━━━━━━━━━━━━");
  lines.push(`📋 *${copy.service}:* ${serviceName}`);
  lines.push("");

  /* ── التفاصيل (الحقول العادية) ── */
  const regularFields: string[] = [];
  const peopleSections: string[] = [];

  for (const field of fields) {
    /* تخطّي الحقول الشرطية إذا لم يتحقق الشرط (مقارنة canonical — آمنة لكل اللغات) */
    if (!isFieldVisible(field, formData as Record<string, unknown>)) continue;

    const value = formData[field.name];

    /* عدّاد الأشخاص — قسم منفصل */
    if (field.type === "people-counter" && Array.isArray(value)) {
      peopleSections.push(formatPeopleSection(field.label, value, field, copy));
      continue;
    }

    /* الحقول العادية */
    const displayValue = displayValues[field.name] || formatValue(value, field.type, locale);
    if (displayValue) {
      regularFields.push(`• ${field.label}: ${displayValue}`);
    } else if (field.required) {
      regularFields.push(`• ${field.label}: ${copy.notProvided}`);
    }
  }

  /* ── طباعة التفاصيل العادية ── */
  if (regularFields.length > 0) {
    lines.push(`📝 *${copy.requestDetails}:*`);
    lines.push(...regularFields);
    lines.push("");
  }

  /* ─ـ طباعة أقسام الأشخاص ── */
  for (const section of peopleSections) {
    lines.push(section);
    lines.push("");
  }

  /* ── خاتمة الرسالة ── */
  lines.push("━━━━━━━━━━━━━━━━━");
  lines.push(copy.intent);

  /* ── تشفير الرسالة وبناء الرابط ── */
  const message = encodeURIComponent(lines.join("\n"));
  const phone = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  return `https://wa.me/${phone}?text=${message}`;
}

/* ====================================================================
 *  دوال تنسيق مساعدة
 * ==================================================================== */

/** تنسيق قيمة حقل واحد حسب نوعه */
function formatValue(
  value: string | PersonData[] | undefined,
  type: string,
  locale: string,
): string {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return "";
  if (!value.trim()) return "";

  /* تنسيق التاريخ: تحويل 2025-05-10 إلى 10/05/2025 */
  if (type === "date" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Intl.DateTimeFormat(locale).format(new Date(`${value}T12:00:00`));
  }

  /* تنسيق datetime-local: تحويل 2025-05-10T14:00 إلى 10/05/2025 14:00 */
  if (type === "datetime-local" && value.includes("T")) {
    const [datePart, timePart] = value.split("T");
    if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
      const localizedDate = new Intl.DateTimeFormat(locale).format(
        new Date(`${datePart}T12:00:00`),
      );
      return `${localizedDate} ${timePart}`;
    }
  }

  return value.trim();
}

/** تنسيق قسم الأشخاص (عدّاد الأشخاص) */
function formatPeopleSection(
  sectionLabel: string,
  people: PersonData[],
  field: FieldDef,
  copy: WhatsAppCopy,
): string {
  const lines: string[] = [];

  lines.push(`👥 *${copy.travelers.replace("{count}", String(people.length))}:*`);
  lines.push("");

  people.forEach((person, idx) => {
    lines.push(`*${copy.person.replace("{index}", String(idx + 1))}:*`);

    if (field.personFields) {
      for (const pf of field.personFields) {
        const val = person[pf.name]?.trim() || copy.notProvided;
        lines.push(`• ${pf.label}: ${val}`);
      }
    }

    /* سطر فارز بين الأشخاص إلا الأخير */
    if (idx < people.length - 1) lines.push("");
  });

  return lines.join("\n");
}

/* ====================================================================
 *  دوال مساعدة قديمة (محفوظة للتوافق مع المكونات الموجودة)
 * ==================================================================== */

/** نوع بيانات النموذج القديم (للدوال أدناه) */
export interface BookingFormData {
  requestType?: string;
  service?: string;
  offer?: string;
  name?: string;
  phone?: string;
  email?: string;
  adults?: number | string;
  children?: number | string;
  checkIn?: string;
  checkOut?: string;
  nationality?: string;
  city?: string;
  notes?: string;
  [key: string]: string | number | undefined;
}

/** بناء رابط واتساب من بيانات النموذج القديم (محفوظ للتوافق) */
export function buildWhatsAppLink(data: BookingFormData): string {
  const lines: string[] = [];

  lines.push("🌟 *CASANOSTRA — طلب جديد* 🌟");
  lines.push("━━━━━━━━━━━━━━━━━");

  if (data.requestType) {
    lines.push(`📋 *نوع الطلب:* ${data.requestType}`);
  }
  if (data.service) {
    lines.push(`🎯 *الخدمة المطلوبة:* ${data.service}`);
  }
  if (data.offer) {
    lines.push(`🎁 *العرض:* ${data.offer}`);
  }

  lines.push("");
  lines.push("👤 *بيانات العميل:*");
  lines.push(`• الاسم: ${data.name}`);
  if (data.phone) lines.push(`• الهاتف: ${data.phone}`);
  if (data.email) lines.push(`• البريد: ${data.email}`);
  if (data.nationality) lines.push(`• الجنسية: ${data.nationality}`);

  if (
    data.adults !== undefined ||
    data.children !== undefined ||
    data.checkIn ||
    data.checkOut ||
    data.city
  ) {
    lines.push("");
    lines.push("🗓️ *تفاصيل الرحلة:*");
    if (data.city) lines.push(`• المدينة: ${data.city}`);
    if (data.checkIn) lines.push(`• تاريخ الوصول: ${data.checkIn}`);
    if (data.checkOut) lines.push(`• تاريخ المغادرة: ${data.checkOut}`);
    if (data.adults !== undefined && data.adults !== "")
      lines.push(`• عدد البالغين: ${data.adults}`);
    if (data.children !== undefined && data.children !== "")
      lines.push(`• عدد الأطفال: ${data.children}`);
  }

  if (data.notes && data.notes.trim()) {
    lines.push("");
    lines.push("💬 *ملاحظات العميل:*");
    lines.push(data.notes.trim());
  }

  const knownKeys = new Set([
    "requestType", "service", "offer", "name", "phone", "email",
    "nationality", "city", "checkIn", "checkOut", "adults", "children", "notes",
  ]);
  const extraFields = Object.entries(data).filter(
    ([key, value]) => !knownKeys.has(key) && value !== undefined && value !== "",
  );

  if (extraFields.length > 0) {
    lines.push("");
    lines.push("📌 *تفاصيل إضافية:*");
    for (const [key, value] of extraFields) {
      lines.push(`• ${key}: ${value}`);
    }
  }

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━");
  lines.push("أرغب بحجز هذه الخدمة. شكراً لكم.");

  const message = encodeURIComponent(lines.join("\n"));
  const phone = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  return `https://wa.me/${phone}?text=${message}`;
}

/** رابط واتساب بسيط للتواصل العام */
export function buildSimpleWhatsAppLink(message: string): string {
  const phone = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** رابط واتساب خاص بخدمة محددة */
export function buildServiceWhatsAppLink(
  serviceTitle: string,
  extra?: Partial<BookingFormData>,
): string {
  return buildWhatsAppLink({
    requestType: "استفسار عن خدمة",
    service: serviceTitle,
    ...extra,
  });
}

/** رابط واتساب خاص بعرض محدد */
export function buildOfferWhatsAppLink(
  offerTitle: string,
  extra?: Partial<BookingFormData>,
): string {
  return buildWhatsAppLink({
    requestType: "استفسار عن عرض",
    offer: offerTitle,
    ...extra,
  });
}
