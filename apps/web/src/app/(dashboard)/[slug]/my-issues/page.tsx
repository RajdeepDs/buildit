import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";

import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import AllIssues from "@/components/issue/all-issues";
import { PageHeader } from "@/components/ui/page-header";
import { getIssues } from "@/lib/data/issues/get-issues";
import SubHeader from "@/components/my-issues/sub-header";

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
    <div className="h-full w-full">
      <PageHeader title="My issues">
        <Button color="minimal" size={"icon"}>
          <Icons.horizontalMore className="text-subtle active:text-emphasis h-4 w-4" />
        </Button>
      </PageHeader>
      <SubHeader />
      <main className="mt-2 h-svh w-full border-t">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AllIssues />
        </HydrationBoundary>
      </main>
    </div>
  );
}
