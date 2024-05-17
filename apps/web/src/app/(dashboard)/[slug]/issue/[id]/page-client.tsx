"use client";

import { useParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@buildit/ui";

import IssueCard from "@/components/issue/issue-card";

export default function IssueClientPage() {
  const { slug, id } = useParams() as { slug: string; id: string };

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
