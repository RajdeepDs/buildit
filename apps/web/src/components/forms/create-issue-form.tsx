"use client";

import React from "react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  Textarea,
} from "@buildit/ui";

import { createIssue } from "@/lib/actions/issue/create-issue";
import useIssues from "@/lib/swr/use-issues";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  status: z.enum(["backlog", "todo", "in progress", "done", "canceled"], {
    message: "Invalid status",
  }),
  priority: z.enum(["urgent", "high", "medium", "low", "no priority"], {
    message: "Invalid priority",
  }),
});

type Status = {
  value: string;
  label: string;
};

type Priority = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

const priorities: Priority[] = [
  {
    value: "no priority",
    label: "No Priority",
  },
  {
    value: "urgent",
    label: "Urgent",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
];

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
  const [selectedPriority, setSelectedPriority] = React.useState<Status | null>(
    priorities[0] || null,
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "backlog",
      priority: "no priority",
    },
  });

  const { mutate } = useIssues();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (slug) {
      createIssue({
        title: values.title,
        description: values.description,
        status: values.status,
        priority: values.priority,
        slug,
      }).then((res) => {
        if (res.error) {
          console.error(res.error);
        }
        if (res.success) {
          console.log(res.success);
          mutate();
        }
        onOpenChange(false);
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Issue title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Issue description" {...field} />
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
