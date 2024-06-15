"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@sindresorhus/slugify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { updateWorkspace } from "@/lib/actions/workspace/update-workspace";
import { getWorkspace } from "@/lib/data/workspace/get-workspace";

const updateWorkspaceSchema = z.object({
  workspaceName: z.string(),
  workspaceURL: z.string().min(1, { message: "Workspace URL is required" }),
});

export default function WorkspaceForm({ slug }: { slug: string }): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const { data: workspace } = useQuery({
    queryKey: ["workspace", { slug }],
    queryFn: async () => getWorkspace({ workspaceSlug: slug }),
  });

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      workspaceName: workspace?.name || "",
      workspaceURL: workspace?.slug || "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["updateWorkspace", { slug }],
    mutationFn: (values: z.infer<typeof updateWorkspaceSchema>) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            updateWorkspace({
              workspaceName: values.workspaceName,
              workspaceURL: values.workspaceURL,
            }),
          );
        }, 500);
      }),
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (res) => {
      router.replace(`/${res}/settings/general`);
      toast.success("Workspace updated successfully");
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error("Error updating workspace", {
        description: error.message,
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    mutation.mutate(values);
  };
  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="workspaceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workspace Name</FormLabel>
                <FormControl
                  onChange={() =>
                    form.setValue(
                      "workspaceURL",
                      slugify(form.getValues("workspaceName")),
                    )
                  }
                >
                  <Input {...field} placeholder="Enter your workspace name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workspaceURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workspace URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your workspace URL" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
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
