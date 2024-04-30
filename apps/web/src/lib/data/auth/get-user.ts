import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

type getUserProps = {
  id: string;
};

export const getUserById = async ({ id }: getUserProps) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user;
  } catch {
    return { error: "User not found" };
  }
};
