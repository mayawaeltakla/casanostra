import type { Metadata } from "next";
import { HelpContent } from "./HelpContent";
import { buildPageMetadata, resolveLocale, STATIC_PAGE_META } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return buildPageMetadata({
    locale,
    route: "/help",
    ...STATIC_PAGE_META.help[locale],
  });
}

export default function HelpPage() {
  return <HelpContent />;
}
