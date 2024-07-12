"use client";

import IssuesList from "@/components/issue/issues-list";
import { PageHeader } from "@/components/ui/page-header";
import SubHeader from "@/components/ui/sub-header";
import useMyIssuesStore from "@/lib/store/my-issues-store";
import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

export default function MyIssuesClientPage(): JSX.Element {
  const store = useMyIssuesStore();
  return (
    <>
      <PageHeader title="My issues">
        <Button color="minimal" size={"icon"}>
          <Icons.horizontalMore className="h-4 w-4 text-subtle active:text-emphasis" />
        </Button>
      </PageHeader>
      <SubHeader store={store} />
      <main className="mt-2 h-svh w-full border-t">
        <IssuesList store={store} />
      </main>
    </>
  );
}
