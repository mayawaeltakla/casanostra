import type { Metadata } from "next";
import { PrivacyContent } from "./PrivacyContent";
import { buildPageMetadata, resolveLocale, STATIC_PAGE_META } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return buildPageMetadata({
    locale,
    route: "/privacy",
    ...STATIC_PAGE_META.privacy[locale],
    index: locale === "ar",
  });
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
