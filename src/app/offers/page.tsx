import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { OffersContent } from "./OffersContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("offersPage");
  return { title: t("metadataTitle"), description: t("metadataDescription") };
}

export default function OffersPage() {
  return <OffersContent />;
}
