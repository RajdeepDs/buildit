"use client";

import React from "react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { BlockEditor } from "@buildit/editor";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@buildit/ui";

import { priorities, statuses } from "@/configs/issue-types";
import { createIssue } from "@/lib/actions/issue/create-issue";
import type { Priority, Status } from "@/types";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.any(),
  status: z.enum(["backlog", "todo", "in progress", "done", "canceled"], {
    message: "Invalid status",
  }),
  priority: z.enum(["urgent", "high", "medium", "low", "no priority"], {
    message: "Invalid priority",
  }),
});

export default function CreateIssueForm({
  onOpenChange,
}: {
  onOpenChange: (isOpen: boolean) => void;
}): JSX.Element {
  const { slug } = useParams() as { slug?: string };
  const [openStatus, setOpenStatus] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    statuses[0] || null,
  );
  const [openPriority, setOpenPriority] = React.useState(false);
  const [selectedPriority, setSelectedPriority] =
    React.useState<Priority | null>(priorities[0] || null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "backlog",
      priority: "no priority",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (slug) {
      mutation.mutate(values);
    }
  }

  const mutation = useMutation({
    mutationKey: ["createIssue", { slug }],
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return createIssue({
        title: values.title,
        description: JSON.parse(JSON.stringify(values.description)),
        status: values.status,
        priority: values.priority,
        slug: slug || "",
      });
    },
    onSuccess: (res) => {
      toast.success("Issue created.", {
        description: `${res.success} created successfully.`,
      });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Error creating issue.");
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  className="border-none px-0 text-lg font-semibold shadow-none placeholder:text-gray-500 focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="max-h-[400px] overflow-y-auto">
              <FormControl>
                <BlockEditor control={form.control} name="description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem
                        key={status.value}
                        value={status.value}
                        onClick={() => {
                          setSelectedStatus(status);
                          setOpenStatus(false);
                        }}
                      >
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem
                        key={priority.value}
                        value={priority.value}
                        onClick={() => {
                          setSelectedPriority(priority);
                          setOpenPriority(false);
                        }}
                      >
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
