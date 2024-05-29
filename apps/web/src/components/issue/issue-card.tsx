"use client";

import React from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import useIssues from "@/lib/swr/use-issues";
import useUser from "@/lib/swr/use-user";
import type { IssueProp, Priority, Status } from "@/types";

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
  issue: IssueProp | undefined;
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

  const { user } = useUser();

  const { mutate } = useIssues();

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateIssue({
      title: values.title,
      description: JSON.parse(JSON.stringify(values.description)),
      status: values.status,
      priority: values.priority,
      issueId: issue?.issueId || "",
    }).then((res) => {
      if (res.error) {
        console.error(res.error);
      }
      if (res.success) {
        console.log(res.success);
        mutate();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full">
        <div className="mx-auto w-3/6">
          <div className="mt-12">
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
                <FormItem className="max-h-[400px] overflow-y-auto">
                  <FormControl>
                    <BlockEditor
                      control={form.control}
                      name="description"
                      content={issue?.description}
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
              {user && (
                <div className="flex items-center gap-2">
                  <Image
                    src={user?.image}
                    width={20}
                    height={20}
                    alt="avatar"
                    className="rounded-full ring-2 ring-offset-1 "
                  />
                  <span className="text-sm">{user?.name}</span>
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
