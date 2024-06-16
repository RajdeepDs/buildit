import { db, eq } from "@buildit/db";
import { twoFactorConfirmations } from "@buildit/db/src/schema";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation =
      await db.query.twoFactorConfirmations.findFirst({
        where: eq(twoFactorConfirmations.userId, Number(userId)),
      });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
