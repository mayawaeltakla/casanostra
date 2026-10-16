"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";
import { annualPlans } from "./annual-plans";
import type { Locale } from "@/i18n/messages";

export function PlansOverview() {
  const t = useTranslations("plansPage");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  return (
    <div>
      <section className="relative overflow-hidden bg-navy py-20 text-navy-foreground lg:py-28">
        {/* نفس صورة بطاقة الخطط في الصفحة الرئيسية، مع طبقة كحلية للحفاظ على وضوح النص */}
        <Image
          src="/images/home/plans.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover opacity-30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(201, 166, 92, 0.18) 0%, transparent 60%)",
          }}
        />
        <div className="container relative mx-auto px-4 text-center">
          <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-navy-foreground/70">
            <Link href="/" className="transition-colors hover:text-gold">
              {tNav("home")}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-gold">{t("title")}</span>
          </nav>
          <h1 className="mb-5 text-4xl font-bold leading-tight text-white lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-navy-foreground/80 lg:text-lg">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <AnnualPlans locale={locale as Locale} />
    </div>
  );
}

/** القسم الكامل لخطط الحجوزات الفندقية السنوية — لكل اللغات. */
function AnnualPlans({ locale }: { locale: Locale }) {
  const c = annualPlans[locale] ?? annualPlans.ar;
  /* زر المدينة: إسطنبول فقط حالياً، وتُضاف مدن أخرى (لكل مدينة عرضها) لاحقاً في `cities` */
  const [selectedCity, setSelectedCity] = useState(c.cities[0]);
  return (
    <>
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-3 text-center text-3xl font-bold text-navy dark:text-white lg:text-4xl">
            {c.heading}
          </h2>
          <p className="mb-8 text-center text-lg font-medium text-gold-readable">{c.subheading}</p>
          <div className="space-y-4 leading-loose text-foreground/80">
            {c.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h3 className="mb-4 mt-12 text-2xl font-bold text-navy dark:text-white">{c.commonTitle}</h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {c.common.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm"
              >
                <span aria-hidden="true" className="text-green-600">✅</span>
                <span className="text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">{c.cityLabel}:</span>
            {c.cities.map((city) => (
              <button
                key={city}
                type="button"
                aria-pressed={city === selectedCity}
                onClick={() => setSelectedCity(city)}
                className={`min-h-11 rounded-full border px-5 py-1.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                  city === selectedCity
                    ? "border-gold bg-gold text-navy"
                    : "border-gold/40 bg-gold/10 text-navy hover:bg-gold/20 dark:text-white"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <h3 className="mb-4 text-2xl font-bold text-navy dark:text-white">{c.compareTitle}</h3>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-luxury">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-navy text-navy-foreground">
                  {c.compareHeaders.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 text-start font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.compareRows.map((row) => (
                  <tr key={String(row[0])} className="border-t border-border">
                    <th scope="row" className="px-4 py-3 text-start font-medium">
                      {row[0]}
                    </th>
                    {row.slice(1).map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-start">
                        {cell === true ? (
                          <span className="text-green-600" aria-label={c.available}>✔</span>
                        ) : cell === false ? (
                          <span className="text-red-500" aria-label={c.unavailable}>✘</span>
                        ) : (
                          <span className="font-medium">{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t-2 border-gold/40 bg-gold/10 font-bold">
                  {c.priceRow.map((cell, i) => (
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 text-start">{cell}</th>
                    ) : (
                      <td key={i} className="px-4 py-3 text-start" dir="ltr">{cell}</td>
                    )
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
            {c.plans.map((plan) => (
              <li
                key={plan.key}
                className="flex flex-col rounded-2xl border border-gold/20 bg-card p-6 shadow-luxury"
              >
                <h3 className="text-xl font-bold text-navy dark:text-white">
                  <span aria-hidden="true">{plan.icon} </span>
                  {plan.name}
                </h3>
                <p className="mb-4 mt-2 text-2xl font-bold text-gold-readable">
                  <span dir="ltr">{plan.price}</span> {plan.priceSuffix}
                </p>
                {plan.lead && <p className="mb-3 text-sm font-medium text-foreground/80">{plan.lead}</p>}
                <ul className="mb-6 flex-1 space-y-2 text-sm text-foreground/80">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-gold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={buildSimpleWhatsAppLink(plan.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#25D366] px-5 py-3 font-bold text-white transition-colors hover:bg-[#1ebd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  {c.bookButton}
                </a>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-12 max-w-3xl text-center text-lg font-bold leading-loose text-navy dark:text-white">
            {c.slogan}
          </p>
        </div>
      </section>
    </>
  );
}
