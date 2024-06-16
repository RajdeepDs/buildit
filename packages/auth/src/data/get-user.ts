import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    return user;
  } catch {
    return null;
  }
};
