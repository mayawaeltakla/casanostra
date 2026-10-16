import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const image = await db.blogImage.findUnique({ where: { id } });
    if (!image) return new Response("Not found", { status: 404 });
    return new Response(new Uint8Array(image.data) as unknown as BodyInit, {
      headers: {
        "Content-Type": image.mime,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
