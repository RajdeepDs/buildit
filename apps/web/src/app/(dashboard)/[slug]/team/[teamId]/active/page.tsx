import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import IssuesByTeam from "@/components/issue/issues-by-team";
import SearchIssue from "@/components/issue/search-issues";
import DisplayMenu from "@/components/my-issues/display-menu";
import FilterMenu from "@/components/my-issues/filter-menu";
import { TeamsPageHeader } from "@/components/ui/page-header";
import { getIssuesByTeam } from "@/lib/data/issues/get-issues-by-team";

export default async function ActiveIssues({
  params,
}: {
  params: { teamId: string };
}): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["active Issues", { teamId: params.teamId }],
    queryFn: async () => getIssuesByTeam({ teamId: params.teamId }),
  });

  return (
    <div>
      <TeamsPageHeader team={params.teamId} title="Active Issues" />
      <div className="flex items-center justify-between px-4">
        <SearchIssue />
        <div className="flex space-x-2">
          <FilterMenu />
          <DisplayMenu />
        </div>
      </div>
      <main className="mt-2 h-svh w-full border-t">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <IssuesByTeam teamId={params.teamId} />
        </HydrationBoundary>
      </main>
    </div>
  );
}
