import { redirect } from "next/navigation";
import { getAdminUserId } from "@/lib/admin-auth";
import { LoginForm, LoginToolbar } from "./LoginForm";

export const dynamic = "force-dynamic";

/**
 * صفحة تسجيل دخول لوحة التحكم — تصميم الموقع (كحلي/ذهبي) مع
 * خلفية إسطنبول والوضع الليلي وخمس لغات.
 */
export default async function AdminLoginPage() {
  if (await getAdminUserId()) redirect("/admin");
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4 py-10">
      {/* خلفية: صورة إسطنبول + تدرّج كحلي */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/images/services/daily-tours/hero.webp)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(222 42% 14% / 0.92) 0%, hsl(222 45% 19% / 0.85) 50%, hsl(222 42% 14% / 0.92) 100%)",
        }}
        aria-hidden="true"
      />
      {/* توهج ذهبي خفيف */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(201, 166, 92, 0.18) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <LoginToolbar />

      <div className="relative z-10 w-full max-w-sm">
        {/* البطاقة */}
        <div className="rounded-2xl border border-gold/30 bg-card p-7 shadow-luxury-lg sm:p-8">
          <LoginForm />
        </div>

        {/* شارة سفلية */}
        <p className="mt-5 text-center text-xs text-navy-foreground/60">
          CASANOSTRA © {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
