import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import AllIssues from "@/components/issue/all-issues";
import FilterMenu from "@/components/my-issues/filter-menu";
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
    <div className="h-full w-full">
      <PageHeader title="My issues">
        <Button color="minimal" size={"icon"}>
          <Icons.horizontalMore className="text-subtle active:text-emphasis h-4 w-4" />
        </Button>
      </PageHeader>
      <div className="flex items-center justify-between px-4">
        {/* ToDo: Create an input ui component */}
        <div className="border-muted flex items-center space-x-2 rounded-md border px-2 py-1">
          <Icons.search className="text-subtle h-4 w-4" />
          <input
            className="flex items-center outline-none placeholder:text-sm"
            placeholder="Search..."
          />
        </div>
        <div className="flex space-x-2">
          <FilterMenu />
          {/* ToDo: Add a dropdown menu in Slider button */}
          <Button color="minimal" size={"icon"}>
            <Icons.sliders className="text-subtle active:text-emphasis h-4 w-4" />
          </Button>
        </div>
      </div>
      <main className="h-svh w-full px-4 py-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AllIssues />
        </HydrationBoundary>
      </main>
    </div>
  );
}
