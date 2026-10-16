/**
 * JsonLd — مكوّن حقن بيانات منظّمة Schema.org بصيغة JSON-LD.
 *
 * يُستخدم في مكونات الخادم فقط. يمرَّر كائن JSON خام ويُرقَّم بأمان
 * (يُستبدل < بـ \u003c لمنع أي حقن نصي داخل الوسم).
 *
 * مثال:
 *   <JsonLd data={{ "@type": "TravelAgency", name: "CASANOSTRA" }} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
