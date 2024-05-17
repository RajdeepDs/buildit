import { db, eq } from "@buildit/db";
import { issue } from "@buildit/db/src/schema";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const issueData = await db.query.issue.findFirst({
      where: eq(issue.issueId, id),
    });

    return Response.json(issueData);
  } catch (e) {
    console.error("Error:", e);
    return new Response("Error", {
      status: 400,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    await db.delete(issue).where(eq(issue.issueId, id));

    return new Response("Deleted", {
      status: 200,
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response("Error", {
      status: 400,
    });
  }
}
