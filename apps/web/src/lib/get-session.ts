import { auth } from "@buildit/auth";

export const getSession = async () => {
  const session = await auth();
  return session?.user;
};
