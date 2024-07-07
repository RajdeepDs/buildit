"use client";

import IssuesByTeam from "@/components/issue/issues-by-team";
import { TeamsPageHeader } from "@/components/ui/page-header";
import SubHeader from "@/components/ui/sub-header";
import { getIssuesByTeam } from "@/lib/data/issues/get-issues-by-team";
import useActiveIssuesStore from "@/lib/store/active-issues-store";
import { useQuery } from "@tanstack/react-query";

export default function ActiveIssuesClientPage({
  params,
}: { params: { teamId: string } }): JSX.Element {
  const store = useActiveIssuesStore();
  const { data: allIssues, error } = useQuery({
    queryKey: ["issues", { teamId: params.teamId }],
    queryFn: async () => getIssuesByTeam({ teamId: params.teamId }),
    refetchInterval: 4 * 1000,
  });

  const issues = allIssues?.filter(
    (issue) => issue.status === "todo" || issue.status === "in progress",
  );

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <TeamsPageHeader team={params.teamId} title="Active Issues" />
      <SubHeader store={store} />
      <main className="mt-2 h-svh w-full border-t">
        <IssuesByTeam store={store} issues={issues!} />
      </main>
    </>
  );
}
