"use client";

import { Link } from "@/i18n/navigation";
import { Award, Crown, Gem } from "lucide-react";
import { useTranslations } from "next-intl";
import { buildSimpleWhatsAppLink } from "@/lib/whatsapp";

const planOptions = [
  { key: "bronze", Icon: Award },
  { key: "silver", Icon: Gem },
  { key: "gold", Icon: Crown },
] as const;

export function PlansOverview() {
  const t = useTranslations("plansPage");
  const tNav = useTranslations("nav");

  return (
    <div>
      <section className="relative overflow-hidden bg-navy py-20 text-navy-foreground lg:py-28">
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

      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
            {planOptions.map(({ key, Icon }) => (
              <li
                key={key}
                className="flex min-h-44 flex-col items-center justify-center gap-4 rounded-2xl border border-gold/20 bg-card p-6 text-center shadow-luxury"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h2 className="text-xl font-bold text-navy dark:text-white">
                  {t(key)}
                </h2>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <a
              href={buildSimpleWhatsAppLink(t("whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gold px-7 py-3 font-bold text-navy transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              {t("contactButton")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
