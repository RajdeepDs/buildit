import { useRouter } from "next/navigation";
import { mutate } from "swr";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { formatDate } from "@/lib/utils/date";
import type { TIssue } from "@/types";

export default async function MyIssuesCard({
  issue,
  key,
}: {
  issue: TIssue;
  key: TIssue["id"];
}): Promise<JSX.Element> {
  const updatedAt = issue?.updatedAt && formatDate(issue?.updatedAt);
  async function deleteIssue() {
    await fetch(`/api/issue/${issue.issueId}`, {
      method: "DELETE",
    });
  }
  return (
    <div
      key={key}
      className="flex cursor-pointer items-center justify-between border-x-0 border-b-[0.1px] p-2 hover:bg-gray-100/50"
    >
      <div className="flex items-center space-x-2">
        <p className="text-sm text-gray-400">{issue.issueId}</p>
        <p className="">{issue.title}</p>
      </div>
      <div className="flex items-center gap-x-3">
        <span className="text-sm text-gray-400">{updatedAt}</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-md p-1 outline-none hover:bg-gray-200">
            <Icons.horizontalMore className="h-4 w-4 text-gray-500" />
          </DropdownMenuTrigger>
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
      </div>
    </div>
  );
}
