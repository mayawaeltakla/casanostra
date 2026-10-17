import type { Metadata } from "next";
import { QuickBookingContent } from "./QuickBookingContent";
import { buildPageMetadata, resolveLocale, STATIC_PAGE_META } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return buildPageMetadata({
    locale,
    route: "/quick-booking",
    ...STATIC_PAGE_META.quickBooking[locale],
  });
}

export default function QuickBookingPage() {
  return <QuickBookingContent />;
}
