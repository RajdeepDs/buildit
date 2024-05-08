"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  status: z.string(),
  priority: z.string(),
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

export default function CreateIssueForm(): JSX.Element {
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
      status: statuses[0]?.value || "",
      priority: priorities[0]?.value || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        <div className="flex gap-x-1">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Popover open={openStatus} onOpenChange={setOpenStatus}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {selectedStatus ? (
                          <>{selectedStatus.label}</>
                        ) : (
                          "Select status"
                        )}
                        <Icons.caretSortIcon />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Filter status..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          {statuses.map((status) => (
                            <CommandItem
                              key={status.value}
                              value={status.value}
                              onSelect={(value) => {
                                setSelectedStatus(
                                  statuses.find(
                                    (priority) => priority.value === value,
                                  ) || null,
                                );
                                form.setValue("status", value);
                                setOpenStatus(false);
                              }}
                            >
                              {status.label}
                              <Icons.checkIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  status.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <Popover open={openPriority} onOpenChange={setOpenPriority}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {selectedPriority ? (
                          <>{selectedPriority.label}</>
                        ) : (
                          "Select priority"
                        )}
                        <Icons.caretSortIcon />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Filter priority..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          {priorities.map((priority) => (
                            <CommandItem
                              key={priority.value}
                              value={priority.value}
                              onSelect={(value) => {
                                setSelectedPriority(
                                  priorities.find(
                                    (priority) => priority.value === value,
                                  ) || null,
                                );
                                form.setValue("priority", value);
                                setOpenPriority(false);
                              }}
                            >
                              {priority.label}
                              <Icons.checkIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  priority.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
