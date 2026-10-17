import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata, resolveLocale } from "@/lib/seo";
import { PlansOverview } from "./PlansOverview";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations("plansPage");
  return buildPageMetadata({
    locale,
    route: "/plans",
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  });
}

export default function PlansPage() {
  return <PlansOverview />;
}
