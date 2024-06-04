"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import IssueCard from "@/components/issue/issue-card";
import { deleteIssue } from "@/lib/actions/issue/delete-issue";
import { getIssueByIssueId } from "@/lib/data/issues/get-issues";

export default function IssueClientPage() {
  const { slug, id } = useParams() as { slug: string; id: string };

  const router = useRouter();

  const { data: issue, error } = useQuery({
    queryKey: ["issue", { id }],
    queryFn: async () => getIssueByIssueId({ issueId: id }),
  });

  const mutation = useMutation({
    mutationKey: ["deleteIssue", { id }],
    mutationFn: () => {
      return deleteIssue({ issueId: id });
    },
    onSuccess: () => {
      toast.success("Issue deleted!");
      router.push(`/${slug}/my-issues`);
    },
    onError: () => {
      toast.error("Error deleting issue!");
    },
  });

  if (error) return <div>Error: {error.message}</div>;
  if (issue)
    return (
      <div className="h-full">
        <div className="h-full">
          <nav className="border-b p-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem
                  onClick={() => router.back()}
                  className="cursor-pointer"
                >
                  My Issues
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{id}</BreadcrumbPage>
                </BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Icons.horizontalMore className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="text-red-500 focus:bg-red-50 focus:text-red-500"
                      onClick={() => {
                        mutation.mutate();
                      }}
                    >
                      <Icons.trash className="mr-2 h-4 w-4" />
                      Delete
                      <DropdownMenuShortcut>Del</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>
          <main className="h-full">
            <IssueCard issue={issue} />
          </main>
        </div>
      </div>
    );
}
