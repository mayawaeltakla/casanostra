import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import { AdminProvider } from "@/components/admin/AdminProvider";

/**
 * تخطيط لوحة تحكم المقالات (/admin) — يتجاوب مع تصميم الموقع:
 * نفس ألوان CASANOSTRA (كحلي/ذهبي) ووضع ليلي/نهاري ونفس خط Cairo،
 * مع دعم خمس لغات (اتجاه RTL/LTR) وتجاوب مع جميع الشاشات.
 * غير مفهرس في محركات البحث.
 */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "لوحة تحكم CASANOSTRA",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F1E3D" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1E3D" },
  ],
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={cairo.variable}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {/*
         * تطبيق الوضع الليلي قبل أول رسم (نفس آلية الموقع):
         * الكلاس dark من مفتاح "theme" في localStorage.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`,
          }}
        />
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
