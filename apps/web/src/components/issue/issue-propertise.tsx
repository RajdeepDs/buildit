import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Avatar,
  ComboBox,
  ComboBoxContent,
  ComboBoxItem,
  ComboBoxTrigger,
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { priorities, statuses } from "@/configs/issue-types";
import { updateIssuePropertise } from "@/lib/actions/issue/update-issue-propertise";
import { TIssue, TProject, TTeam } from "@/types";

const formSchema = z.object({
  status: z.enum(["backlog", "todo", "in progress", "done", "canceled"], {
    message: "Invalid status",
  }),
  priority: z.enum(["urgent", "high", "medium", "low", "no priority"], {
    message: "Invalid priority",
  }),
  assignee: z.string().optional(),
  project: z.string().optional(),
});

export default function IssuePropertise({
  issue,
  projects,
  teams,
}: {
  issue: TIssue | undefined;
  projects: TProject[];
  teams: TTeam[];
}): JSX.Element {
  const [openStatus, setOpenStatus] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [openAssignee, setOpenAssignee] = useState(false);
  const [openProject, setOpenProject] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: issue?.status || "backlog",
      priority: issue?.priority || "no priority",
      assignee: issue?.assigneeId || "",
      project: issue?.projectId || "",
    },
  });

  const team = teams.find((team) => team.id === issue?.teamId);

  const assignee = team?.user;

  const mutation = useMutation({
    mutationKey: ["updateIssue", { id: issue?.issueId }],
    mutationFn: (values: z.infer<typeof formSchema>) =>
      updateIssuePropertise({
        issueId: issue?.id || "",
        status: values.status,
        priority: values.priority,
        assigneeId: values.assignee,
        projectId: values.project,
      }),
    onSuccess: () => {
      toast.success("Issue updated successfully.");
    },
    onError: () => {
      toast.error("Error updating issue.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    const subscription = form.watch((_value, { name, type }) => {
      if (type === "change") {
        form.handleSubmit(onSubmit)();
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 px-3">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <ComboBox open={openStatus} onOpenChange={setOpenStatus}>
                <ComboBoxTrigger className="w-40 rounded-md border-none px-4 py-1.5 text-start hover:bg-weak">
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
                <ComboBoxTrigger className="w-40 rounded-md border-none px-4 py-1.5 text-start hover:bg-weak">
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
        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem>
              <ComboBox open={openAssignee} onOpenChange={setOpenAssignee}>
                <ComboBoxTrigger className="w-40 rounded-md border-none px-4 py-1.5 text-start hover:bg-weak">
                  {field.value ? (
                    issue?.assignee ? (
                      <div className="flex items-center space-x-2">
                        <Avatar
                          imageSrc={issue.assignee.image}
                          alt="avatar"
                          size="xs"
                        />
                        <p className="text-sm">{issue.assignee.name}</p>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Avatar
                          imageSrc={assignee?.image}
                          alt="avatar"
                          size="xs"
                        />
                        <p className="text-sm">{assignee?.name}</p>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Icons.userCircle2 className="h-4 w-4 text-soft" />
                      <p>No assignee</p>
                    </div>
                  )}
                </ComboBoxTrigger>
                <ComboBoxContent className="w-[200px]">
                  <ComboBoxItem
                    key="unassigned"
                    value="unassigned"
                    onSelect={() => {
                      field.onChange("");
                      setOpenAssignee(false);
                    }}
                  >
                    <Icons.userCircle2 className="mr-2 h-4 w-4 text-soft" />
                    No assignee
                  </ComboBoxItem>
                  {assignee && (
                    <ComboBoxItem
                      key={assignee.id}
                      value={assignee.id}
                      onSelect={() => {
                        field.onChange(assignee?.id);
                        setOpenAssignee(false);
                      }}
                    >
                      <Avatar
                        imageSrc={assignee.image}
                        alt="avatar"
                        size="xs"
                        className="mr-2"
                      />
                      {assignee.name}
                    </ComboBoxItem>
                  )}
                </ComboBoxContent>
              </ComboBox>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel className="mt-2 text-sub">Project</FormLabel>
              <ComboBox open={openProject} onOpenChange={setOpenProject}>
                <ComboBoxTrigger className="w-40 rounded-md border-none px-4 py-1.5 text-start hover:bg-weak">
                  {field.value ? (
                    issue?.project ? (
                      <div className="flex items-center">
                        <Icons.hexagon className="mr-2 h-4 w-4 text-soft" />
                        <p className="">{issue.project.name}</p>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Icons.hexagon className="mr-2 h-4 w-4 text-soft" />
                        <p className="">
                          {
                            projects.find(
                              (project) => project.id === field.value,
                            )?.name
                          }
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Icons.hexagon className="h-4 w-4 text-soft" />
                      <p>No Project</p>
                    </div>
                  )}
                </ComboBoxTrigger>
                <ComboBoxContent className="w-[200px]">
                  <ComboBoxItem
                    key="no project"
                    value="no project"
                    onSelect={() => {
                      field.onChange("");
                      setOpenProject(false);
                    }}
                  >
                    <Icons.hexagon className="mr-2 h-4 w-4 text-soft" />
                    No Project
                  </ComboBoxItem>
                  {projects?.map((project) => (
                    <ComboBoxItem
                      key={project.id}
                      value={project.id}
                      onSelect={() => {
                        field.onChange(project.id);
                        setOpenProject(false);
                      }}
                    >
                      <Icons.hexagon className="mr-2 h-4 w-4 text-soft" />
                      {project.name}
                    </ComboBoxItem>
                  ))}
                </ComboBoxContent>
              </ComboBox>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
