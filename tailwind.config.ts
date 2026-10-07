import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Tailwind config لوكالة CASANOSTRA السياحية.
 *
 * في Tailwind v4، الألوان والخطوط تُعرّف في `@theme` داخل globals.css
 * (وهو ما يُولّد utility classes الفعلية). هذا الملف يبقى فقط لإضافة:
 * - darkMode class
 * - محتوى الملفات (content)
 * - الإضافات (plugins)
 * - ظلال وحركات مخصّصة (ظلال وحركات لا تتعارض مع v4)
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ظلال ناعمة تناسب الواجهة الفاخرة
      boxShadow: {
        luxury: "0 10px 40px -12px rgba(15, 30, 61, 0.18)",
        "luxury-lg": "0 25px 60px -15px rgba(15, 30, 61, 0.25)",
        gold: "0 8px 24px -8px rgba(201, 166, 92, 0.45)",
      },
      // حركات ناعمة لانتقالات سلسة
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
