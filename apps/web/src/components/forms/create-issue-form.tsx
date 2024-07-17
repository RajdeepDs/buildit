"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { BlockEditor } from "@buildit/editor";
import {
  Button,
  ComboBox,
  ComboBoxContent,
  ComboBoxItem,
  ComboBoxTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@buildit/ui";

import { priorities, statuses } from "@/configs/issue-types";
import { createIssue } from "@/lib/actions/issue/create-issue";
import { CreateIssueSchema } from "@/schemas/issue";
import { TTeam } from "@/types";
import { Icons } from "@buildit/ui/icons";
import { useState } from "react";

export default function CreateIssueForm({
  onOpenChange,
  team,
}: {
  onOpenChange: (isOpen: boolean) => void;
  team: Pick<TTeam, "id">;
}): JSX.Element {
  const [openStatus, setOpenStatus] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);

  const { slug } = useParams() as { slug?: string };

  const form = useForm<z.infer<typeof CreateIssueSchema>>({
    resolver: zodResolver(CreateIssueSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "backlog",
      priority: "no priority",
    },
  });

  const mutation = useMutation({
    mutationKey: ["createIssue", { slug }],
    mutationFn: (values: z.infer<typeof CreateIssueSchema>) =>
      createIssue({
        title: values.title,
        description: JSON.parse(JSON.stringify(values.description)),
        status: values.status,
        priority: values.priority,
        slug: slug,
        teamId: team.id,
      }),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Issue created", {
          description: `${res.success} created successfully.`,
        });
      } else {
        toast.error("Error creating issue");
      }
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Error creating issue");
    },
  });

  const onSubmit = (values: z.infer<typeof CreateIssueSchema>) => {
    if (slug && team) {
      mutation.mutate(values);
    }
  };

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
                  className="border-none px-0 font-semibold text-lg shadow-none placeholder:text-gray-500 focus-visible:ring-0"
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
                <ComboBox open={openStatus} onOpenChange={setOpenStatus}>
                  <ComboBoxTrigger>
                    {
                      statuses.find((status) => status.value === field.value)
                        ?.label
                    }
                  </ComboBoxTrigger>
                  <ComboBoxContent className="w-[200px]">
                    {statuses.map((status) => {
                      const Icon = Icons[status.icon as keyof typeof Icons];
                      return (
                        <ComboBoxItem
                          key={status.value}
                          value={status.value}
                          onSelect={() => {
                            field.onChange(status.value);
                            setOpenStatus(false);
                          }}
                        >
                          <Icon className="mr-2 h-4 w-4 text-soft" />
                          {status.label}
                        </ComboBoxItem>
                      );
                    })}
                  </ComboBoxContent>
                </ComboBox>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <ComboBox open={openPriority} onOpenChange={setOpenPriority}>
                  <ComboBoxTrigger>
                    {
                      priorities.find(
                        (priority) => priority.value === field.value,
                      )?.label
                    }
                  </ComboBoxTrigger>
                  <ComboBoxContent className="w-[200px]">
                    {priorities.map((priority) => {
                      const Icon = Icons[priority.icon as keyof typeof Icons];
                      return (
                        <ComboBoxItem
                          key={priority.value}
                          value={priority.value}
                          onSelect={() => {
                            field.onChange(priority.value);
                            setOpenPriority(false);
                          }}
                        >
                          <Icon className="mr-2 h-4 w-4 text-soft" />
                          {priority.label}
                        </ComboBoxItem>
                      );
                    })}
                  </ComboBoxContent>
                </ComboBox>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
