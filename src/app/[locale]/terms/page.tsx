import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { TermsContent } from "./TermsContent";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Terms & Conditions | CASANOSTRA",
    description: "CASANOSTRA terms & conditions — payment, booking, cancellation, flights, data protection.",
    robots: { index: locale === "ar", follow: true },
    alternates: { canonical: "/terms", languages: {} },
  };
}

export default function TermsPage() {
  return <TermsContent />;
}
