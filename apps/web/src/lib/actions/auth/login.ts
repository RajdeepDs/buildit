"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

import { comparePasswords } from "@/lib/utils/hashPassword";

const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const login = async ({
  email,
  password,
}: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.parse({
    email,
    password,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const isPasswordValid = await comparePasswords(
    password,
    existingUser.password!,
  );
  if (!isPasswordValid) {
    return { error: "Invalid password" };
  }

  return { success: "Login successful!" };
};
