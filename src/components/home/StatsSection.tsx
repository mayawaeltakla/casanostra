"use client";

import { useTranslations } from "next-intl";

/**
 * StatsSection — النسب
 *
 * - 4 دوائر نسب (95% / 10+ / 500+ / 24/7)
 * - grid 4 أعمدة (ديسكتوب) / عمودين (موبايل)
 * - حدود ذهبية + hover:scale-105
 * - متلاصقة مع SubscriptionCard (mt-6)
 */

interface Stat {
  value: string;
  labelKey: string;
  percent: number;
}

const stats: Stat[] = [
  { value: "95%", labelKey: "statsLabel1", percent: 95 },
  { value: "500+", labelKey: "statsLabel2", percent: 90 },
  { value: "10+", labelKey: "statsLabel3", percent: 85 },
  { value: "1000+", labelKey: "statsLabel4", percent: 100 },
];

export function StatsSection() {
  const t = useTranslations("home");
  return (
    <section className="mt-6">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">

            {/* دوائر النسب */}
            {stats.map((stat) => (
              <div
                key={stat.labelKey}
                className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-card border border-gold/20 hover:border-gold/40 hover:shadow-luxury hover:scale-105 transition-all"
              >
                {/* الدائرة */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* الخلفية */}
                    <circle
                      cx="50" cy="50" r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-muted/30"
                    />
                    {/* التقدّم */}
                    <circle
                      cx="50" cy="50" r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - stat.percent / 100)}`}
                      className="text-gold transition-all duration-700"
                    />
                  </svg>
                  {/* القيمة في الوسط */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-navy dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                </div>
                {/* التسمية */}
                <span className="text-xs sm:text-sm text-muted-foreground dark:text-card-foreground/80 font-medium text-center">
                  {t(stat.labelKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
