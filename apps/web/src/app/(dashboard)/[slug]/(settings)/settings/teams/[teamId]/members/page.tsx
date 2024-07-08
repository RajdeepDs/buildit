import TeamForm from "@/components/settings/forms/team-form";
import TeamMembersList from "@/components/settings/members/team-members-list";
import SettingsHeader from "@/components/settings/settings-header";
import { getTeamByTeamId } from "@/lib/data/team/get-team-by-teamId";
import { getTeamMembersByTeamId } from "@/lib/data/team/get-team-members-by-teamId";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function TeamsMembersPage({
  params,
}: { params: { teamId: string } }): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["teamMembers", { teamId: params.teamId }],
    queryFn: () => getTeamMembersByTeamId({ teamId: params.teamId }),
  });

  const des = `Manage team members for ${params.teamId}.`;

  return (
    <>
      <SettingsHeader title="Team members" description={des} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TeamMembersList params={params} />
      </HydrationBoundary>
    </>
  );
}
