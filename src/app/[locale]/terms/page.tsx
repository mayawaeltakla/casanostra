import type { Metadata } from "next";
import { TermsContent } from "./TermsContent";
import { buildPageMetadata, resolveLocale, STATIC_PAGE_META } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return buildPageMetadata({
    locale,
    route: "/terms",
    ...STATIC_PAGE_META.terms[locale],
    index: locale === "ar",
  });
}

export default function TermsPage() {
  return <TermsContent />;
}
