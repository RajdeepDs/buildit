import { auth } from "@buildit/auth";
import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

export const runtime = "edge";

export const GET = async () => {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized! You must sign in before accessing.", {
      status: 401,
    });
  }
  const userId = session?.user.id || "";
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return Response.json(user);
};
