import type { Metadata } from "next";
import { FaqContent } from "./FaqContent";

export const metadata: Metadata = {
  title: "FAQ | CASANOSTRA",
  description:
    "Answers to the most common questions about CASANOSTRA tourism services in Turkey: booking, payment, cancellation, groups, airport pickup, Hajj & Umrah, medical tourism.",
};

export default function FAQPage() {
  return <FaqContent />;
}
