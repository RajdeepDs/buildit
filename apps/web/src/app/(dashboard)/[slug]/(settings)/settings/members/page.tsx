import MembersList from "@/components/settings/members/members-list";
import SettingsHeader from "@/components/settings/settings-header";
import { getWorkspace } from "@/lib/data/workspace/get-workspace";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members",
  description: "Manage members in your workspace.",
};

export default async function MembersPage({
  params,
}: { params: { slug: string } }): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["workspace", { slug: params.slug }],
    queryFn: () => getWorkspace({ workspaceSlug: params.slug }),
  });
  return (
    <>
      <SettingsHeader
        title="Members"
        description="Manage members in your workspace."
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MembersList params={params} />
      </HydrationBoundary>
    </>
  );
}
