"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

import { hashPassword } from "@/lib/utils/hashPassword";

const CreateAccountSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: "Only letters, numbers, and underscores are allowed.",
    }),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const createAccount = async ({
  username,
  email,
  password,
}: z.infer<typeof CreateAccountSchema>) => {
  const validateFields = CreateAccountSchema.parse({
    username,
    email,
    password,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  const hashedPassword = await hashPassword(password);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { error: "Email already exists" };
  }

  try {
    await db.insert(users).values({
      name: username,
      email,
      password: hashedPassword,
    });

    return { success: "Account created successfully!" };
  } catch {
    return { error: "Error creating account!" };
  }
};
