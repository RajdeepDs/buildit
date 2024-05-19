"use client";

import { useParams, useRouter } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
import useIssues from "@/lib/swr/use-issues";

export default function IssueClientPage() {
  const { slug, id } = useParams() as { slug: string; id: string };
  const { mutate } = useIssues();
  const router = useRouter();
  async function deleteIssue() {
    await fetch(`/api/issue/${id}`, {
      method: "DELETE",
    });
    mutate();
    router.push(`/${slug}/my-issues`);
  }

  return (
    <div className="h-full">
      <div className="h-full">
        <nav className="border-b p-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${slug}/my-issues`}>
                  My issues
                </BreadcrumbLink>
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
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <main className="h-full">
          <IssueCard issueId={id} />
        </main>
      </div>
    </div>
  );
}
