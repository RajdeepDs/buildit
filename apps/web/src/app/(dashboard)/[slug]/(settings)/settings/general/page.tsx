import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import WorkspaceForm from "@/components/forms/workspace-form";
import SettingsHeader from "@/components/settings/settings-header";
import { getWorkspace } from "@/lib/data/workspace/get-workspace";

export default async function GeneralSettingsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["workspace"],
    queryFn: () => getWorkspace({ workspaceSlug: "build-it" }),
  });
  return (
    <div className="mx-auto my-auto flex w-1/2 flex-col space-y-8 px-12">
      <SettingsHeader
        title="General"
        description="Manage settings for your workspace."
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WorkspaceForm />
      </HydrationBoundary>
    </div>
  );
}
