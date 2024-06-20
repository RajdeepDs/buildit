import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import WorkspaceForm from "@/components/forms/workspace-form";
import SettingsHeader from "@/components/settings/settings-header";
import { getWorkspace } from "@/lib/data/workspace/get-workspace";

export const metadata: Metadata = {
  title: "General",
  description: "Manage settings for your workspace.",
};

export default async function GeneralSettingsPage({
  params,
}: {
  params: { slug: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["workspace"],
    queryFn: () => getWorkspace({ workspaceSlug: params.slug }),
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
