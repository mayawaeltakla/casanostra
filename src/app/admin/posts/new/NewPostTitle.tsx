"use client";

import { FilePlus2 } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";

/** عنوان صفحة «مقال جديد» — مترجم */
export function NewPostTitle() {
  const { t } = useAdmin();
  return (
    <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-navy dark:text-white">
      <FilePlus2 className="h-6 w-6 text-gold" />
      {t("editor.new")}
    </h1>
  );
}
