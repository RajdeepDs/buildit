import { db, eq } from "@buildit/db";
import { workspaces } from "@buildit/db/src/schema";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;

  try {
    const workspaceData = await db.query.workspaces.findFirst({
      where: eq(workspaces.slug, slug),
    });
    return Response.json(workspaceData);
  } catch (e) {
    console.error("Error:", e);
    return new Response("Error", {
      status: 400,
    });
  }
}
