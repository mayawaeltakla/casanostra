"use client";

import { FileEdit } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";

/** عنوان صفحة «تعديل المقال» — مترجم */
export function EditPostTitle() {
  const { t } = useAdmin();
  return (
    <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-navy dark:text-white">
      <FileEdit className="h-6 w-6 text-gold" />
      {t("editor.edit")}
    </h1>
  );
}
