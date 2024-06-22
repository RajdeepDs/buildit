import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

export default async function Slug() {
  const user = await db.query.users.findFirst({
    where: eq(users.id, "47c9fec6-b45c-4aef-a086-ade981e1df24"),
    with: {
      teams: true,
      workspaces: true,
    },
  });
  console.log("user ", JSON.stringify(user));

  return (
    <div>
      <h1>Slug</h1>
    </div>
  );
}
