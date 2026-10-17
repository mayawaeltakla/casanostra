"use client";

import { Sparkles } from "lucide-react";

/**
 * «أنشئ رحلتك بنفسك» — ينزل إلى نموذج الحجز ويختار تلقائياً خيار
 * «أريد تصميم رحلتي بنفسي» (يستمع له BookingForm).
 */
export function CreateOwnTripButton({ label }: { label: string }) {
  return (
    <a
      href="#booking-form"
      onClick={() => window.dispatchEvent(new Event("casanostra:create-own-trip"))}
      className="group inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-gold-foreground shadow-gold transition-all hover:scale-105 hover:bg-gold-300 active:scale-95 sm:text-base"
    >
      <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
      <span>{label}</span>
    </a>
  );
}
