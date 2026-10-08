import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { PrivacyContent } from "./PrivacyContent";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Privacy Policy | CASANOSTRA",
    description: "CASANOSTRA privacy policy — how we collect, use, and protect your data.",
    robots: { index: locale === "ar", follow: true },
    alternates: { canonical: "/privacy", languages: {} },
  };
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
