import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { priorities, statuses } from "@/configs/issue-types";
import { deleteIssue } from "@/lib/actions/issue/delete-issue";
import { formatDate } from "@/lib/utils/date";
import type { TIssue } from "@/types";

export default function MyIssuesCard({ issue }: { issue: TIssue }) {
  const updatedAt = issue?.updatedAt && formatDate(issue?.updatedAt);
  const createdAt = issue?.createdAt && formatDate(issue?.createdAt);

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
    <DropdownMenu>
      <div className="flex w-full items-center gap-x-2 border-b px-4 py-2 hover:bg-gray-100/50">
        <PriorityIcon className="stroke-darkgray-300 h-4 w-4 stroke-2" />
        <Link
          href={`/${slug}/issue/${issue.issueId}`}
          key={issue.id}
          className="flex w-full cursor-pointer items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <p className="text-subtle text-sm">{issue.issueId}</p>
            <StatusIcon className="stroke-darkgray-500 h-4 w-4" />
            <p className="text-default">{issue.title}</p>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-subtle text-sm">{updatedAt}</span>
            <span className="text-subtle text-sm">{createdAt}</span>
            {issue.reporter && issue.reporter.image && (
              <Avatar
                imageSrc={issue.reporter.image}
                size="sm"
                alt="user avatar"
              />
            )}
          </div>
        </Link>
        <DropdownMenuTrigger className="rounded-md p-1 outline-none hover:bg-gray-200">
          <Icons.horizontalMore className="h-4 w-4 text-gray-500" />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            mutation.mutate();
          }}
          className="text-red-500 focus:bg-red-50 focus:text-red-500"
        >
          <Icons.trash className="mr-2 h-4 w-4" />
          Delete
          <DropdownMenuShortcut>Del</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
