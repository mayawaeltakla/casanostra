import type { Metadata } from "next";
import { QuickBookingContent } from "./QuickBookingContent";

export const metadata: Metadata = {
  title: "Quick Booking | CASANOSTRA",
  description:
    "Quickly choose from 11 integrated tourism services in Turkey — stays, visa, VIP cars, hotels, flights, tours, Hajj & Umrah, medical tourism.",
};

export default function QuickBookingPage() {
  return <QuickBookingContent />;
}
