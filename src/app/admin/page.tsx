import { redirect } from "next/navigation";
import { getAdminUserId } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import type { ArticleTranslations } from "@/lib/blog-db";
import { AdminHeader } from "./AdminHeader";
import { PostsDashboard, type AdminPostView } from "./PostsDashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!(await getAdminUserId())) redirect("/admin/login");

  const rows = await db.blogArticle.findMany({ orderBy: { publishedAt: "desc" } });
  const posts: AdminPostView[] = rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    published: row.published,
    publishedAt: row.publishedAt.toISOString().slice(0, 10),
    readMinutes: row.readMinutes,
    coverImage: row.coverImage,
    translations: (row.translations ?? {}) as ArticleTranslations,
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <PostsDashboard posts={posts} />
    </div>
  );
}
