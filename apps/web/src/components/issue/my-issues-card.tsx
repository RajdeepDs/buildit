import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import useIssues from "@/lib/swr/use-issues";
import useUser from "@/lib/swr/use-user";
import { formatDate } from "@/lib/utils/date";
import type { TIssue } from "@/types";

export default function MyIssuesCard({
  issue,
}: {
  issue: TIssue;
}): JSX.Element {
  const { mutate } = useIssues();
  const updatedAt = issue?.updatedAt && formatDate(issue?.updatedAt);
  const createdAt = issue?.createdAt && formatDate(issue?.createdAt);
  async function deleteIssue() {
    await fetch(`/api/issue/${issue.issueId}`, {
      method: "DELETE",
    });
    mutate();
  }
  const { user } = useUser();

  const { slug } = useParams() as { slug?: string };

  return (
    <DropdownMenu>
      <div className="flex w-full items-center gap-x-2 border-x-0 border-b-[0.1px] p-2 hover:bg-gray-100/50">
        <Link
          href={`/${slug}/issue/${issue.issueId}`}
          key={issue.id}
          className="flex w-full cursor-pointer items-center justify-between "
        >
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-400">{issue.issueId}</p>
            <p className="">{issue.title}</p>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-sm text-gray-400">{updatedAt}</span>
            <span className="text-sm text-gray-400">{createdAt}</span>
            {user && user.image && (
              <Image
                src={user.image}
                alt="user profile"
                width={20}
                height={20}
                className="rounded-full"
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
          onClick={async () => {
            await deleteIssue();
          }}
        >
          <Icons.trash className="mr-2 h-4 w-4" />
          Delete
          <DropdownMenuShortcut>Del</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
