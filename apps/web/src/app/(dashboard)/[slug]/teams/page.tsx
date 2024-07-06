import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { Button } from "@buildit/ui";

import { PageHeader } from "@/components/ui/page-header";
import { getTeams } from "@/lib/data/team/get-teams";
import TeamList from "@/components/teams/teams-list";

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
          <TeamList />
        </HydrationBoundary>
      </main>
    </div>
  );
}
