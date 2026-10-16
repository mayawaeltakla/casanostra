import { notFound, redirect } from "next/navigation";
import { getAdminUserId } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import type { ArticleTranslations } from "@/lib/blog-db";
import { AdminHeader } from "../../AdminHeader";
import { EditPostTitle } from "./EditPostTitle";
import { PostEditor } from "../../PostEditor";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await getAdminUserId())) redirect("/admin/login");
  const { id } = await params;
  const post = await db.blogArticle.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <EditPostTitle />
        <PostEditor
          postId={post.id}
          initial={{
            slug: post.slug,
            published: post.published,
            publishedAt: post.publishedAt.toISOString().slice(0, 10),
            readMinutes: post.readMinutes,
            coverImage: post.coverImage,
            translations: (post.translations ?? {}) as ArticleTranslations,
          }}
        />
      </main>
    </div>
  );
}
