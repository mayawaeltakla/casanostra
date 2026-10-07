import type { MetadataRoute } from "next";
import { servicesList } from "@/lib/site-config";

const sitemapOrigin = "https://casanostra.com";
const indexableRoutes = [
  "/",
  "/services",
  ...servicesList.map((service) => `/services/${service.slug}`),
  "/offers",
  "/quick-booking",
  "/contact",
  "/about",
  "/faq",
  "/help",
  "/plans",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexableRoutes.map((route) => ({
    url: new URL(route, sitemapOrigin).toString(),
    lastModified,
  }));
}
