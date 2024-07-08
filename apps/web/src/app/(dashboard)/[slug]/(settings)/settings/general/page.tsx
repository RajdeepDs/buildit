import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";

import WorkspaceForm from "@/components/forms/workspace-form";
import SettingsHeader from "@/components/settings/settings-header";
import { getWorkspaceMembers } from "@/lib/data/workspace/get-workspace-member";

export const metadata: Metadata = {
  title: "General",
  description: "Manage settings for your workspace.",
};

export default async function GeneralSettingsPage({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["workspaceMembers", { slug: params.slug }],
    queryFn: () => getWorkspaceMembers({ workspaceSlug: params.slug }),
  });
  return (
    <>
      <SettingsHeader
        title="General"
        description="Manage settings for your workspace."
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WorkspaceForm slug={params.slug} />
      </HydrationBoundary>
    </>
  );
}
