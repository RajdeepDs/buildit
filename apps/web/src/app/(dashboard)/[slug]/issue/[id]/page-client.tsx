"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
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
import IssuePropertise from "@/components/issue/issue-propertise";
import { deleteIssue } from "@/lib/actions/issue/delete-issue";
import { getIssueByIssueId } from "@/lib/data/issues/get-issues";
import { getProjects } from "@/lib/data/project/get-project";
import { getTeams } from "@/lib/data/team/get-teams";

export default function IssueClientPage() {
  const { slug, id } = useParams() as { slug: string; id: string };

  const router = useRouter();

  const { data: issue, error } = useQuery({
    queryKey: ["issue", { id }],
    queryFn: async () => getIssueByIssueId({ issueId: id }),
  });

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => getProjects(),
  });

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => getTeams(),
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
      <div className="flex h-full">
        <div className="h-full flex-1">
          <nav className="border-b p-2 px-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Icons.home className="h-4 w-4 text-sub" />
                </BreadcrumbItem>
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
        <aside className="w-[270px] border-l px-3">
          <h1 className="p-2 font-medium text-sm text-strong">Propertise</h1>
          <IssuePropertise issue={issue} projects={projects!} teams={teams!} />
        </aside>
      </div>
    );
}
