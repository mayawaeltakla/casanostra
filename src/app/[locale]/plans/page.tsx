import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PlansOverview } from "./PlansOverview";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("plansPage");
  return { title: t("metadataTitle"), description: t("metadataDescription") };
}

export default function PlansPage() {
  return <PlansOverview />;
}
