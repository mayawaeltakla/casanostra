/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,

  turbopack: {
    root: process.cwd(),
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  /**
   * سياسة التخزين المؤقت — مصدر الحقيقة الوحيد لترويسات الكاش.
   *
   * - صفحات HTML (/[locale]/*): تُترك لافتراضيات Next.js عمداً — هو يعرف
   *   الثابت من الديناميكي ويدير s-maxage/stale-while-revalidate بنفسه،
   *   وتجاوزها قد يكسر كشف اللغة في الـ proxy. لا Vary مطلوب لأن كل
   *   لغة لها URL مميز ببادئتها.
   * - الأصول المبنية (/_next/static): يتولّى Next.js ترويسة immutable بنفسه —
   *   لا نكرّرها هنا لتجنّب تحذير البناء عند تجاوز ترويسات Next الداخلية.
   * - الصور/الفيديو (/images, /videos): ثابتة عملياً وتتغير فقط مع deploy.
   * - sitemap/robots: قصيرة لحداثة الفهرسة. /api: ديناميكي بلا تخزين.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/logo.svg",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);