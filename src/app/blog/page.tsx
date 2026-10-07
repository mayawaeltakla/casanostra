import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { BlogContent } from "./BlogContent";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Blog | CASANOSTRA",
    description:
      "CASANOSTRA travel blog — tips, guides, and articles about tourism in Turkey. Discover the best places, visa procedures, Cappadocia, and travel tips.",
    robots: { index: locale === "ar", follow: true },
    alternates: { canonical: "/blog", languages: {} },
  };
}

export default function BlogPage() {
  return <BlogContent />;
}
