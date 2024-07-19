import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { priorities, statuses } from "@/configs/issue-types";
import { deleteIssue } from "@/lib/actions/issue/delete-issue";
import { formatDate } from "@/lib/utils/date";

import {
  Avatar,
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import type { TIssue } from "@/types";

type IssueItemProps = Pick<
  TIssue,
  | "title"
  | "issueId"
  | "priority"
  | "status"
  | "assignee"
  | "assigneeId"
  | "updatedAt"
  | "createdAt"
>;

export default function IssueItem({ issue }: { issue: IssueItemProps }) {
  const updatedAt = issue.updatedAt && formatDate(issue.updatedAt);
  const createdAt = issue.createdAt && formatDate(issue.createdAt);

  const router = useRouter();

  const { slug } = useParams() as { slug?: string };

  const mutation = useMutation({
    mutationKey: ["deleteIssue", { id: issue.issueId }],
    mutationFn: () => {
      return deleteIssue({ issueId: issue.issueId });
    },
    onSuccess: () => {
      toast.success("Issue deleted!");
      router.push(`/${slug}/my-issues`);
    },
    onError: () => {
      toast.error("Error deleting issue!");
    },
  });

  const priorityIconName = priorities.find(
    (priority) => priority.value === issue.priority,
  )?.icon;

  const statusIconName = statuses.find(
    (status) => status.value === issue.status,
  )?.icon;

  const PriorityIcon = Icons[priorityIconName as keyof typeof Icons];
  const StatusIcon = Icons[statusIconName as keyof typeof Icons];

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          href={`/${slug}/issue/${issue.issueId}`}
          className="flex items-center justify-between border-b px-5 py-2 hover:bg-gray-100/50"
        >
          <div className="flex items-center space-x-4">
            <PriorityIcon className="h-4 w-4 text-sub" />
            <p className="text-sm text-sub">{issue.issueId}</p>
            <StatusIcon className="h-4 w-4 text-sub" />
            <p className="text-sm text-surface">{issue.title}</p>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-soft text-xs">{updatedAt}</span>
            <span className="text-soft text-xs">{createdAt}</span>
            {issue.assigneeId ? (
              <Avatar imageSrc={issue.assignee?.image} size="sm" />
            ) : (
              <Icons.userCircle2 className="h-5 w-5 text-soft" />
            )}
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() => {
              mutation.mutate();
            }}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            Delete
            <ContextMenuShortcut>Delete</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
