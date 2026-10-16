import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | CASANOSTRA",
  description:
    "Contact CASANOSTRA tourism agency in Turkey. Phone, WhatsApp, email, contact form, and Istanbul office location.",
};

export default function ContactPage() {
  return <ContactContent />;
}
