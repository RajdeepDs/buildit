"use client";

import IssuesByTeam from "@/components/issue/issues-by-team";
import { TeamsPageHeader } from "@/components/ui/page-header";
import SubHeader from "@/components/ui/sub-header";
import useActiveIssuesStore from "@/lib/store/active-issues-store";

export default function ActiveIssuesClientPage({
  params,
}: { params: { teamId: string } }) {
  const store = useActiveIssuesStore();
  return (
    <>
      <TeamsPageHeader team={params.teamId} title="Active Issues" />
      <SubHeader store={store} />
      <main className="mt-2 h-svh w-full border-t">
        <IssuesByTeam teamId={params.teamId} />
      </main>
    </>
  );
}
