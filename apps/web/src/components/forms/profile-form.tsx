"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Separator,
  Textarea,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { updateProfile } from "@/lib/actions/settings/update-profile";
import type { MutationResult } from "@/lib/actions/types";
import { getUser } from "@/lib/data/user/get-user";
import { updateProfileSchema } from "@/schemas/settings";

export default function ProfileForm(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getUser(),
  });

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
      });
    }
  }, [user, form]);

  const mutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (
      values: z.infer<typeof updateProfileSchema>,
    ): Promise<MutationResult> => {
      return updateProfile({
        name: values.name,
        username: values.username,
        bio: values.bio,
      });
    },
    onSuccess: (result: MutationResult) => {
      if (result.success) {
        toast.success(result.success);
        setIsSubmitting(false);
      } else {
        toast.error(result.error);
        setIsSubmitting(false);
      }
    },
    onError: () => {
      toast.error("Error updating profile");
      setIsSubmitting(false);
    },
  });

  const onSubmit = (values: z.infer<typeof updateProfileSchema>) => {
    setIsSubmitting(true);
    setTimeout(() => {
      mutation.mutate(values);
    }, 500);
  };

  return (
    <div className="space-y-8">
      {user && user.image && (
        <Image
          src={user.image}
          alt={user.name || "User profile picture"}
          width={80}
          height={80}
          className="mb-4 rounded-full border-2"
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your first name" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter username" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="A few sentence about yourself..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
      <Separator />
      <div className="flex flex-col space-y-4">
        <h1 className="font-semibold">Danger zone</h1>
        <Button variant={"destructive"} className="w-fit">
          <Icons.trash2 className="mr-2 h-4 w-4" />
          Delete account
        </Button>
      </div>
    </div>
  );
}
