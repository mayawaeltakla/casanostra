import type { Metadata } from "next";
import { HelpContent } from "./HelpContent";

export const metadata: Metadata = {
  title: "Help Center | CASANOSTRA",
  description: "CASANOSTRA help center — contact form, WhatsApp, email, and working hours.",
};

export default function HelpPage() {
  return <HelpContent />;
}
