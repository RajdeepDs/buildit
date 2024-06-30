import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { Button } from "@buildit/ui";

import AllTeams from "@/components/teams/all-teams";
import { PageHeader } from "@/components/ui/page-header";
import { getTeams } from "@/lib/data/team/get-teams";

export default async function TeamsPage(): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });
  return (
    <div className="flex flex-col">
      <PageHeader title="Teams">
        <Button StartIcon="plus" size={"sm"}>
          New team
        </Button>
      </PageHeader>
      <main className="h-svh w-full border-t">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AllTeams />
        </HydrationBoundary>
      </main>
    </div>
  );
}
