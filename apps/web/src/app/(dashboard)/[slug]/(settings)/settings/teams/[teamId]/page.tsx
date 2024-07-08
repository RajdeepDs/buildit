import TeamForm from "@/components/settings/forms/team-form";
import SettingsHeader from "@/components/settings/settings-header";
import { getTeamByTeamId } from "@/lib/data/team/get-team-by-teamId";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function TeamsGeneralPage({
  params,
}: { params: { teamId: string } }): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["team", { teamId: params.teamId }],
    queryFn: () => getTeamByTeamId({ teamId: params.teamId }),
  });

  return (
    <>
      <SettingsHeader
        title={params.teamId}
        description="Manage team settings."
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TeamForm params={params} />
      </HydrationBoundary>
    </>
  );
}
