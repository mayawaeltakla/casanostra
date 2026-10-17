import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata, resolveLocale } from "@/lib/seo";
import { OffersContent } from "./OffersContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations("offersPage");
  return buildPageMetadata({
    locale,
    route: "/offers",
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  });
}

export default function OffersPage() {
  return <OffersContent />;
}
