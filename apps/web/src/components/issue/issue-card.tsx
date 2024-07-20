"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { BlockEditor } from "@buildit/editor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@buildit/ui";

import { updateIssue } from "@/lib/actions/issue/update-issue";
import type { TIssue } from "@/types";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.any(),
});

export default function IssueCard({
  issue,
}: {
  issue: TIssue | undefined;
}): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["updateIssue", { id: issue?.issueId }],
    mutationFn: (values: z.infer<typeof formSchema>) =>
      updateIssue({
        issueId: issue?.issueId || "",
        title: values.title,
        description: JSON.parse(JSON.stringify(values.description)),
      }),
    onSuccess: () => {
      toast.success("Issue updated successfully.");
    },
    onError: () => {
      toast.error("Error updating issue.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submit", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full">
        <div className="mx-auto w-3/6">
          <div className="mt-12 h-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none px-0 font-semibold text-lg shadow-none focus-visible:ring-0"
                      onBlur={() => {
                        form.trigger("title");
                        if (form.formState.isValid) {
                          onSubmit(form.getValues());
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={() => (
                <FormItem className="max-h-[720px] overflow-y-auto">
                  <FormControl>
                    <BlockEditor
                      control={form.control}
                      name="description"
                      content={issue?.description as string}
                      onBlur={() => {
                        form.trigger("description");
                        if (form.formState.isValid) {
                          onSubmit(form.getValues());
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
