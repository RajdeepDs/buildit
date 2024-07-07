import { getIssuesByTeam } from "@/lib/data/issues/get-issues-by-team";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BacklogIssuesClientPage from "./page-client";

export default async function BacklogIssues({
  params,
}: {
  params: { teamId: string };
}): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["issues", { teamId: params.teamId }],
    queryFn: async () => getIssuesByTeam({ teamId: params.teamId }),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BacklogIssuesClientPage params={params} />
      </HydrationBoundary>
    </div>
  );
}
