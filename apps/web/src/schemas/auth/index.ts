import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email format"),
});
