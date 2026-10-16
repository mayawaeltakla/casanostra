import { redirect } from "next/navigation";
import { getAdminUserId } from "@/lib/admin-auth";
import { AdminHeader } from "../../AdminHeader";
import { NewPostTitle } from "./NewPostTitle";
import { PostEditor } from "../../PostEditor";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  if (!(await getAdminUserId())) redirect("/admin/login");
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <NewPostTitle />
        <PostEditor />
      </main>
    </div>
  );
}
