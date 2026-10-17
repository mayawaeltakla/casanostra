import type { Metadata } from "next";
import { FaqContent } from "./FaqContent";
import { buildPageMetadata, resolveLocale, STATIC_PAGE_META } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return buildPageMetadata({
    locale,
    route: "/faq",
    ...STATIC_PAGE_META.faq[locale],
  });
}

export default function FAQPage() {
  return <FaqContent />;
}
