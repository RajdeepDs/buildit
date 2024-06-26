import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import AllIssues from "@/components/issue/all-issues";
import { PageHeader } from "@/components/ui/page-header";
import { getIssues } from "@/lib/data/issues/get-issues";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "My issues",
  description: "View and manage your issues.",
};

export default async function MyIssuesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
  });

  return (
    <div className="h-full">
      <PageHeader title="My issues">
        <Button color="minimal" size={"icon"}>
          <Icons.panelRight className="text-subtle active:text-emphasis h-4 w-4" />
        </Button>
      </PageHeader>
      <main>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AllIssues />
        </HydrationBoundary>
      </main>
    </div>
  );
}
