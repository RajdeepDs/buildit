"use client";

import IssuesByTeam from "@/components/issue/issues-by-team";
import { TeamsPageHeader } from "@/components/ui/page-header";
import SubHeader from "@/components/ui/sub-header";
import { getIssuesByTeam } from "@/lib/data/issues/get-issues-by-team";
import useBacklogIssuesStore from "@/lib/store/backlog-issues-store";
import { useQuery } from "@tanstack/react-query";

export default function BacklogIssuesClientPage({
  params,
}: { params: { teamId: string } }): JSX.Element {
  const store = useBacklogIssuesStore();

  const { data: allIssues, error } = useQuery({
    queryKey: ["issues", { teamId: params.teamId }],
    queryFn: async () => getIssuesByTeam({ teamId: params.teamId }),
    refetchInterval: 4 * 1000,
  });

  const issues = allIssues?.filter((issue) => issue.status === "backlog");

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="space-y-3">
      <nav className="flex items-center space-x-2 px-3">
        <TeamsPageHeader team={params.teamId} title="Backlog Issues" />
        <SubHeader store={store} />
      </nav>
      <main className="mt-2 h-svh w-full border-t">
        <IssuesByTeam store={store} issues={issues!} />
      </main>
    </div>
  );
}
