"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@sindresorhus/slugify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  FormMessage,
  Input,
  Separator,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import type { MutationResult } from "@/lib/actions/types";
import { updateWorkspace } from "@/lib/actions/workspace/update-workspace";
import { getWorkspace } from "@/lib/data/workspace/get-workspace";
import { UpdateWorkspaceSchema } from "@/schemas/workspace";

export default function WorkspaceForm({ slug }: { slug: string }): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const { data: workspace } = useQuery({
    queryKey: ["workspace", { slug }],
    queryFn: async () => getWorkspace({ workspaceSlug: slug }),
  });

  const form = useForm<z.infer<typeof UpdateWorkspaceSchema>>({
    resolver: zodResolver(UpdateWorkspaceSchema),
    defaultValues: {
      workspaceName: workspace?.name || "",
      workspaceURL: workspace?.slug || "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["updateWorkspace", { slug }],
    mutationFn: async (
      values: z.infer<typeof UpdateWorkspaceSchema>,
    ): Promise<MutationResult> => {
      return updateWorkspace({
        workspaceName: values.workspaceName,
        workspaceURL: values.workspaceURL,
      });
    },
    onSuccess: (result: MutationResult) => {
      if (result.success) {
        router.replace(`/${result.success}/settings/general`);
        toast.success("Workspace updated successfully.");
        setIsSubmitting(false);
      } else {
        toast.error("Error updating workspace", {
          description: result.error,
        });
        setIsSubmitting(false);
      }
    },
    onError: (error) => {
      toast.error("Error updating workspace", {
        description: error.message,
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateWorkspaceSchema>) => {
    setIsSubmitting(true);
    setTimeout(() => {
      mutation.mutate(values);
    }, 500);
  };
  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-sm space-y-4"
        >
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
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <div className="border-subtle flex h-10 w-full items-center rounded-md border px-3 py-2 text-sm has-[:focus-visible]:border-black">
                      <span className="text-subtle cursor-default">
                        buildit.codes/
                      </span>
                      <input
                        className="w-full bg-transparent focus-visible:outline-none"
                        type="text"
                        {...field}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
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
        <Button color={"destructive"} className="w-fit">
          <Icons.trash2 className="mr-2 h-4 w-4" />
          Delete account
        </Button>
      </div>
    </div>
  );
}
