"use client";

import { useState, useCallback, useId } from "react";
import {
  User,
  Phone,
  Calendar,
  Users,
  MessageSquare,
  Send,
  CheckCircle2,
  Loader2,
  Plus,
  Minus,
  Trash2,
  Hash,
  Clock,
  Star,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { buildWhatsAppMessage, type PersonData } from "@/lib/whatsapp";
import type { FieldDef, PersonFieldDef } from "@/lib/services";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

/* ============================================================================
 *  BookingForm — نموذج حجز ديناميكي يقبل props: اسم الخدمة + تعريف الحقول
 *
 *  المميزات:
 *    - يبني الحقول ديناميكياً حسب التعريف في services.ts
 *    - أنواع الحقول: text, tel, number, date, datetime-local, select, radio, textarea
 *    - عدّاد الأشخاص: يضاعف حقول بيانات كل شخص مع إمكانية الحذف
 *    - سؤال "هل هناك عودة؟" في السيارات VIP: عند "نعم" يظهر قسم عودة إضافي
 *    - حقول إلزامية بـ validation بسيط
 *    - زر إرسال أخضر كبير "إرسال المعلومات إلى واتساب"
 *    - تصميم أنيق RTL بحقول كبيرة وسهلة للموبايل
 * ============================================================================ */

interface BookingFormProps {
  /** اسم الخدمة — يُضمّن في رسالة واتساب */
  serviceTitle: string;
  serviceSlug: string;
  /** تعريف الحقول من services.ts */
  fields: FieldDef[];
  /** عرض النسخة المختصرة (للقوائم الجانبية) */
  compact?: boolean;
}

/** نوع حالة النموذج — قاموس من اسم الحقل إلى قيمته */
type FormState = Record<string, string | PersonData[]>;

export function BookingForm({
  serviceTitle,
  serviceSlug,
  fields,
  compact = false,
}: BookingFormProps) {
  /* ── حالة النموذج (تُهيّأ مرة واحدة مع قيم افتراضية) ── */
  const [formData, setFormData] = useState<FormState>(() =>
    initializeFormState(fields),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const t = useTranslations("serviceForms");
  const locale = useLocale();
  const displayFields = fields.map((field) => ({
    ...field,
    label: t(`fields.${field.name}`),
    placeholder: undefined,
    personFields: field.personFields?.map((personField) => ({
      ...personField,
      label: t(`fields.${personField.name}`),
      placeholder: undefined,
    })),
  }));
  const optionLabels = fields.reduce<Record<string, string[]>>((labels, field) => {
    if (field.options) {
      const optionKey = field.name === "tourType"
        ? serviceSlug === "daily-tours"
          ? "dailyTours"
          : serviceSlug === "private-tours"
            ? "privateTours"
            : "groupTours"
        : field.name === "interest" && serviceSlug === "medical-tourism"
          ? "medicalInterest"
          : field.name;
      labels[field.name] = t.raw(`options.${optionKey}`) as string[];
    }
    return labels;
  }, {});

  /* ── تحديث قيمة حقل عادي ── */
  const updateField = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  /* ── تحديث بيانات شخص داخل العدّاد ── */
  const updatePersonField = useCallback(
    (
      fieldName: string,
      personIdx: number,
      personFieldName: string,
      value: string,
    ) => {
      setFormData((prev) => {
        const people = (prev[fieldName] as PersonData[]) || [];
        const newPeople = [...people];
        newPeople[personIdx] = {
          ...newPeople[personIdx],
          [personFieldName]: value,
        };
        return { ...prev, [fieldName]: newPeople };
      });
      /* مسح خطأ الحقل */
      const errorKey = `${fieldName}_${personIdx}_${personFieldName}`;
      setErrors((prev) => {
        const next = { ...prev };
        delete next[errorKey];
        return next;
      });
    },
    [],
  );

  /* ── إضافة شخص جديد للعدّاد ── */
  const addPerson = useCallback((fieldName: string) => {
    setFormData((prev) => {
      const people = (prev[fieldName] as PersonData[]) || [];
      return { ...prev, [fieldName]: [...people, {}] };
    });
  }, []);

  /* ── حذف شخص من العدّاد ── */
  const removePerson = useCallback(
    (fieldName: string, personIdx: number) => {
      setFormData((prev) => {
        const people = (prev[fieldName] as PersonData[]) || [];
        if (people.length <= 1) return prev; /* لا نحذف آخر شخص */
        const newPeople = people.filter((_, i) => i !== personIdx);
        return { ...prev, [fieldName]: newPeople };
      });
    },
    [],
  );

  /* ── التحقق من الحقول المطلوبة ── */
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    for (const field of fields) {
      /* تخطّي الحقول الشرطية إذا لم يتحقق الشرط */
      if (field.showWhen) {
        const triggerValue = formData[field.showWhen.field] as string;
        if (triggerValue !== field.showWhen.equals) continue;
      }

      /* عدّاد الأشخاص — التحقق من كل شخص */
      if (field.type === "people-counter") {
        const people = (formData[field.name] as PersonData[]) || [];
        people.forEach((person, idx) => {
          for (const pf of field.personFields || []) {
            if (pf.required && !person[pf.name]?.trim()) {
              const errKey = `${field.name}_${idx}_${pf.name}`;
              newErrors[errKey] = t("requiredPersonField", {
                field: t(`fields.${pf.name}`),
                person: idx + 1,
              });
            }
          }
        });
        continue;
      }

      /* الحقول العادية */
      if (field.required) {
        const value = formData[field.name] as string;
        if (!value || !value.trim()) {
          newErrors[field.name] = t("requiredField", {
            field: t(`fields.${field.name}`),
          });
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ── إرسال النموذج ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    /* محاكاة تأخير بسيط لإظهار حالة التحميل */
    await new Promise((resolve) => setTimeout(resolve, 500));

    /* بناء رابط واتساب بالبيانات الكاملة */
    const displayValues = fields.reduce<Record<string, string>>((values, field) => {
      const value = formData[field.name] as string;
      const optionIndex = field.options?.indexOf(value) ?? -1;
      if (optionIndex >= 0) values[field.name] = optionLabels[field.name][optionIndex];
      return values;
    }, {});
    const link = buildWhatsAppMessage(
      serviceTitle,
      formData,
      displayFields,
      {
        requestTitle: t("whatsapp.requestTitle"),
        service: t("whatsapp.service"),
        requestDetails: t("whatsapp.requestDetails"),
        travelers: t("whatsapp.travelers", { count: "{count}" }),
        person: t("whatsapp.person", { index: "{index}" }),
        intent: t("whatsapp.intent"),
        notProvided: t("whatsapp.notProvided"),
      },
      displayValues,
      locale,
    );

    /* فتح واتساب في تبويب جديد */
    window.open(link, "_blank", "noopener,noreferrer");

    setStatus("sent");
    /* إعادة التعيين بعد 5 ثوانٍ */
    setTimeout(() => {
      setStatus("idle");
      setFormData(initializeFormState(fields));
    }, 5000);
  };

  /* ====================================================================
   *  الرسم
   * ==================================================================== */

  return (
    <div
      id="booking-form"
      className={cn(
        "bg-card rounded-2xl border border-border shadow-luxury overflow-hidden scroll-mt-24",
        compact ? "p-5" : "p-6 lg:p-8",
      )}
    >
      {/* ── رأس النموذج ── */}
      <div className="mb-6 pb-5 border-b border-border">
        <div className="flex items-center gap-2 text-gold text-sm font-medium mb-2">
          <Send className="w-4 h-4" />
          <span>{t("formEyebrow")}</span>
        </div>
        <h3
          className={cn(
            "font-bold text-navy",
            compact ? "text-lg" : "text-2xl",
          )}
        >
          {t("heading", { service: serviceTitle })}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {t("formDescription")}
        </p>
      </div>

      {/* ── رسالة النجاح ── */}
      {status === "sent" && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-green-800 text-sm">
              {t("successTitle")}
            </div>
            <div className="text-xs text-green-700 mt-1">
              {t("successText")}
            </div>
          </div>
        </div>
      )}

      {/* ── النموذج ── */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayFields.map((field) => {
            /* تخطّي الحقول الشرطية إذا لم يتحقق الشرط */
            if (field.showWhen) {
              const triggerValue = formData[field.showWhen.field] as string;
              if (triggerValue !== field.showWhen.equals) return null;
            }

            /* عدّاد الأشخاص — مكوّن خاص يأخذ كامل العرض */
            if (field.type === "people-counter") {
              return (
                <div key={field.name} className="sm:col-span-2">
                  <PeopleCounter
                    field={field}
                    value={(formData[field.name] as PersonData[]) || []}
                    errors={errors}
                    onPersonChange={updatePersonField}
                    onAdd={() => addPerson(field.name)}
                    onRemove={(idx) => removePerson(field.name, idx)}
                  />
                </div>
              );
            }

            /* الحقول العادية */
            const isFullWidth =
              field.type === "textarea" || !field.half;

            return (
              <div
                key={field.name}
                className={isFullWidth ? "sm:col-span-2" : "sm:col-span-1"}
              >
                <FieldInput
                  field={field}
                  optionLabels={optionLabels[field.name]}
                  value={(formData[field.name] as string) || ""}
                  error={errors[field.name]}
                  onChange={(val) => updateField(field.name, val)}
                />
              </div>
            );
          })}
        </div>

        {/* ── زر الإرسال ── */}
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "w-full inline-flex items-center justify-center gap-2 font-bold text-white rounded-xl transition-all",
            "bg-[#25D366] hover:bg-[#1ebd5a] active:scale-[0.98]",
            "disabled:opacity-70 disabled:cursor-not-allowed",
            "shadow-lg shadow-green-500/30",
            compact ? "py-3 text-base" : "py-4 text-lg",
          )}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t("sending")}</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>{t("submit")}</span>
            </>
          )}
        </button>

        {/* ── تنبيه خصوصية ── */}
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          {t("privacy")}
        </p>
      </form>
    </div>
  );
}

/* ============================================================================
 *  PeopleCounter — عدّاد الأشخاص
 *
 *  - يعرض عدّاداً (مع زرّي + و −) وحقول كل شخص في بطاقات منفصلة
 *  - يمكن حذف أي شخص (عدا الأخير)
 * ============================================================================ */

interface PeopleCounterProps {
  field: FieldDef;
  value: PersonData[];
  errors: Record<string, string>;
  onPersonChange: (
    fieldName: string,
    personIdx: number,
    personFieldName: string,
    value: string,
  ) => void;
  onAdd: () => void;
  onRemove: (personIdx: number) => void;
}

function PeopleCounter({
  field,
  value,
  errors,
  onPersonChange,
  onAdd,
  onRemove,
}: PeopleCounterProps) {
  const t = useTranslations("serviceForms");
  const count = value.length;

  return (
    <fieldset className="rounded-xl border-2 border-gold/20 bg-gold/5 p-5">
      {/* ── رأس العدّاد ── */}
      <div className="flex items-center justify-between mb-4">
        <legend className="flex items-center gap-1.5 text-sm font-medium text-navy">
          <Users className="w-4 h-4 text-gold" />
          <span>{field.label}</span>
          {field.required && <span className="text-red-500">*</span>}
        </legend>

        {/* أزرار + و − */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onRemove(0)}
            disabled={count <= 1}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy text-white hover:bg-navy-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label={t("removePerson")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="min-w-[3rem] text-center text-lg font-bold text-navy">
            {count}
          </span>
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-gold text-navy hover:bg-gold-300 transition-colors"
            aria-label={t("addPerson")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── بطاقات الأشخاص ── */}
      <div className="space-y-4">
        {value.map((person, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-lg p-4 relative"
          >
            {/* رأس بطاقة الشخص + زر الحذف */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-navy">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white text-xs">
                  {idx + 1}
                </span>
                <span>{t("person", { index: idx + 1 })}</span>
              </div>
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(idx)}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                  aria-label={t("person", { index: idx + 1 })}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t("remove")}</span>
                </button>
              )}
            </div>

            {/* حقول الشخص */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(field.personFields || []).map((pf) => (
                <PersonFieldInput
                  key={pf.name}
                  fieldDef={pf}
                  value={person[pf.name] || ""}
                  error={errors[`${field.name}_${idx}_${pf.name}`]}
                  onChange={(val) =>
                    onPersonChange(field.name, idx, pf.name, val)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

/* ============================================================================
 *  FieldInput — حقل واحد (نص، هاتف، رقم، تاريخ، select، radio، textarea)
 * ============================================================================ */

interface FieldInputProps {
  field: FieldDef;
  optionLabels?: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

function FieldInput({ field, optionLabels, value, error, onChange }: FieldInputProps) {
  const t = useTranslations("serviceForms");
  const Icon = FIELD_ICONS[field.type] || DEFAULT_FIELD_ICON;
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const fieldLabel = (
    <>
      <Icon className="w-4 h-4 text-gold" />
      <span>{field.label}</span>
      {field.required && <span className="text-red-500">*</span>}
    </>
  );

  return (
    <div>
      {field.type === "radio" ? (
        <fieldset
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          aria-required={field.required || undefined}
        >
          <legend className="flex items-center gap-1.5 text-sm font-medium text-navy mb-1.5">
            {fieldLabel}
          </legend>
          <div className="flex flex-wrap gap-3">
            {field.options?.map((opt, index) => (
              <label
                key={opt}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all focus-within:ring-2 focus-within:ring-gold",
                  value === opt
                    ? "border-gold bg-gold/10 text-navy font-bold"
                    : "border-border text-muted-foreground hover:border-gold/40",
                )}
              >
                <input
                  id={`${fieldId}-${index}`}
                  type="radio"
                  name={field.name}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange(e.target.value)}
                  aria-describedby={error ? errorId : undefined}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "flex items-center justify-center w-4 h-4 rounded-full border-2 transition-all",
                    value === opt
                      ? "border-gold bg-gold"
                      : "border-muted-foreground/40",
                  )}
                >
                  {value === opt && <span className="w-2 h-2 rounded-full bg-navy" />}
                </span>
                <span>{optionLabels?.[index] ?? opt}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <>
          <label htmlFor={fieldId} className="flex items-center gap-1.5 text-sm font-medium text-navy mb-1.5">
            {fieldLabel}
          </label>
          {(field.type === "text" ||
            field.type === "tel" ||
            field.type === "number" ||
            field.type === "date" ||
            field.type === "datetime-local") && (
            <input
              id={fieldId}
              type={field.type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder}
              dir={field.type === "tel" ? "ltr" : undefined}
              aria-required={field.required || undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className={cn(inputClasses(error), field.type === "tel" && "text-left")}
            />
          )}
          {field.type === "select" && (
            <select
              id={fieldId}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              aria-required={field.required || undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className={cn(inputClasses(error), value === "" && "text-muted-foreground")}
            >
              <option value="">{t("choose")}</option>
              {field.options?.map((opt, index) => (
                <option key={opt} value={opt}>
                  {optionLabels?.[index] ?? opt}
                </option>
              ))}
            </select>
          )}
          {field.type === "textarea" && (
            <textarea
              id={fieldId}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              aria-required={field.required || undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className={cn(inputClasses(error), "resize-none")}
            />
          )}
        </>
      )}

      {/* رسالة الخطأ */}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

/* ============================================================================
 *  PersonFieldInput — حقل فرد لكل شخص داخل العدّاد
 * ============================================================================ */

interface PersonFieldInputProps {
  fieldDef: PersonFieldDef;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

function PersonFieldInput({
  fieldDef,
  value,
  error,
  onChange,
}: PersonFieldInputProps) {
  const Icon = FIELD_ICONS[fieldDef.type] || DEFAULT_FIELD_ICON;
  const fieldId = useId();
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <label htmlFor={fieldId} className="flex items-center gap-1 text-xs font-medium text-navy mb-1">
        <Icon className="w-3.5 h-3.5 text-gold" />
        <span>{fieldDef.label}</span>
        {fieldDef.required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={fieldId}
        type={fieldDef.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={fieldDef.placeholder}
        dir={fieldDef.type === "tel" ? "ltr" : undefined}
        aria-required={fieldDef.required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "w-full px-3 py-2 text-sm rounded-lg border bg-background text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
          "placeholder:text-muted-foreground/60",
          error ? "border-red-300 bg-red-50/30" : "border-border",
          fieldDef.type === "tel" && "text-left",
        )}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-0.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

/* ============================================================================
 *  دوال مساعدة
 * ============================================================================ */

/** تهيئة حالة النموذج بقيم افتراضية */
function initializeFormState(fields: FieldDef[]): FormState {
  const state: FormState = {};
  for (const field of fields) {
    if (field.type === "people-counter") {
      /* ابدأ بشخص واحد فارغ */
      state[field.name] = [{}];
    } else {
      state[field.name] = "";
    }
  }
  return state;
}

/** classes موحّدة لحقول الإدخال */
function inputClasses(error?: string): string {
  return cn(
    "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground",
    "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
    "placeholder:text-muted-foreground/60",
    error ? "border-red-300 bg-red-50/30" : "border-border",
  );
}

/** خريطة الأيقونات الثابتة — لربط نوع الحقل بأيقونته */
const FIELD_ICONS: Record<string, LucideIcon> = {
  text: User,
  tel: Phone,
  number: Hash,
  date: Calendar,
  "datetime-local": Clock,
  select: Star,
  radio: CheckCircle2,
  textarea: MessageSquare,
};

/** الأيقونة الافتراضية للحقول غير المعروفة */
const DEFAULT_FIELD_ICON: LucideIcon = FileText;
