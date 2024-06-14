"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Separator,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { getWorkspace } from "@/lib/data/workspace/get-workspace";

const updateWorkspaceSchema = z.object({
  workspaceName: z.string(),
  workspaceURL: z.string(),
});

export default function WorkspaceForm(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: workspace } = useQuery({
    queryKey: ["workspace"],
    queryFn: async () => getWorkspace({ workspaceSlug: "build-it" }),
  });

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      workspaceName: workspace?.name || "",
      workspaceURL: workspace?.slug || "",
    },
  });

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    console.log(values);
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
                <FormControl>
                  <Input {...field} placeholder="Enter your workspace name" />
                </FormControl>
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
