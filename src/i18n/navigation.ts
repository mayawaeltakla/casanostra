import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * واجهات التنقل الواعية باللغة — بديل `next/link` و `next/navigation`.
 * كل الروابط الداخلية يجب أن تستخدم `Link` من هنا ليُضاف prefix اللغة تلقائياً
 * ويتم التنقل عميلاً دون إعادة تحميل الصفحة.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
