import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";
import { buildPageMetadata, resolveLocale, STATIC_PAGE_META } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return buildPageMetadata({
    locale,
    route: "/contact",
    ...STATIC_PAGE_META.contact[locale],
  });
}

export default function ContactPage() {
  return <ContactContent />;
}
