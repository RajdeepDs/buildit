"use client";

import React from "react";
import Image from "next/image";
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
import { updateIssue } from "@/lib/actions/issue/update-issue";
import type { Priority, Status, TIssue } from "@/types";

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
export default function IssueCard({
  issue,
}: {
  issue: TIssue | undefined;
}): JSX.Element {
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
      title: issue?.title || "",
      description: issue?.description || "",
      status: issue?.status || "backlog",
      priority: issue?.priority || "no priority",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  const mutation = useMutation({
    mutationKey: ["updateIssue", { id: issue?.issueId }],
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return updateIssue({
        title: values.title,
        description: JSON.parse(JSON.stringify(values.description)),
        status: values.status,
        priority: values.priority,
        issueId: issue?.issueId || "",
      });
    },
    onSuccess: () => {
      toast.success("Issue updated successfully.");
    },
    onError: () => {
      toast.error("Error updating issue.");
    },
  });

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
                      className="border-none px-0 text-lg font-semibold shadow-none focus-visible:ring-0"
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
                <FormItem className="max-h-[720px] overflow-y-auto">
                  <FormControl>
                    <BlockEditor
                      control={form.control}
                      name="description"
                      content={issue?.description as string}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-[250px] border-l p-2">
          <h1 className="text-sm font-medium">Propertise</h1>
          <div className="mt-5 space-y-4">
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
            <div className="w-full cursor-pointer rounded-md p-2 px-2 hover:bg-gray-100">
              {issue?.reporter && (
                <div className="flex items-center gap-2">
                  {issue?.reporter.image && (
                    <Image
                      src={issue?.reporter?.image}
                      width={20}
                      height={20}
                      alt="avatar"
                      className="rounded-full ring-2 ring-offset-1 "
                    />
                  )}
                  <span className="text-sm">{issue?.reporter?.name}</span>
                </div>
              )}
            </div>
          </div>
          <Button type="submit" className="mt-5 w-full">
            Update Issue
          </Button>
        </div>
      </form>
    </Form>
  );
}
