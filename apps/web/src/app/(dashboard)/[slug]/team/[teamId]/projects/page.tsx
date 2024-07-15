import { getProjectbyTeam } from "@/lib/data/project/get-project-by-team";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ProjectsClientPage from "./page-client";

export default async function Projects({
  params,
}: {
  params: { teamId: string };
}): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["project", { teamId: params.teamId }],
    queryFn: async () => getProjectbyTeam({ teamId: params.teamId }),
  });
  return (
    <div className="h-full w-full py-3">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectsClientPage params={params} />
      </HydrationBoundary>
    </div>
  );
}
