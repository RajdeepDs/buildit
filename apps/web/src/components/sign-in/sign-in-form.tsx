"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import magicLinkSignIn from "@/lib/actions/auth/sign-in";
import { SignInSchema } from "@/schemas/auth";

export default function SignInForm() {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["magicLinkSignIn"],
    mutationFn: (values: z.infer<typeof SignInSchema>) =>
      magicLinkSignIn({ email: values.email }),
  });

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 w-[296px] space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sub">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="onboarding@example.com"
                  {...field}
                  className="bg-white placeholder:text-soft"
                />
              </FormControl>
              <FormDescription className="text-soft text-xs">
                Use email to receive a secure sign-in link
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending && (
            <Icons.loading className="mr-2 animate-spin" />
          )}
          Continue
        </Button>
      </form>
    </Form>
  );
}
