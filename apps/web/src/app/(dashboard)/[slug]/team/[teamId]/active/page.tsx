import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { getIssuesByTeam } from "@/lib/data/issues/get-issues-by-team";
import ActiveIssuesClientPage from "./page-client";

export default async function ActiveIssuesPage({
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
    <div className="h-full w-full py-3">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ActiveIssuesClientPage params={params} />
      </HydrationBoundary>
    </div>
  );
}
