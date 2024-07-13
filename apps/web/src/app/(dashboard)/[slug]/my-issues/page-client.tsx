"use client";

import IssuesList from "@/components/issue/issues-list";
import SubHeader from "@/components/ui/sub-header";
import useMyIssuesStore from "@/lib/store/my-issues-store";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

export default function MyIssuesClientPage(): JSX.Element {
  const store = useMyIssuesStore();
  return (
    <div className="space-y-3">
      <header className="px-3">
        <Breadcrumb className="p-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Icons.home className="h-4 w-4 text-sub" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>My issues</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <SubHeader store={store} />
      <main className="h-svh w-full border-t">
        <IssuesList store={store} />
      </main>
    </div>
  );
}
