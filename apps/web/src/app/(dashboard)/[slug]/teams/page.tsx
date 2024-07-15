import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { getTeams } from "@/lib/data/team/get-teams";

import { NewTeamModal } from "@/components/modals/new-team-modal";
import TeamList from "@/components/teams/teams-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

export default async function TeamsPage(): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });
  return (
    <div className="h-full w-full space-y-3 py-3">
      <nav className="flex items-center justify-between space-x-2 px-3">
        <header className="p-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Icons.home className="h-4 w-4 text-sub" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Teams</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <NewTeamModal />
      </nav>
      <main className="h-svh w-full border-t">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TeamList />
        </HydrationBoundary>
      </main>
    </div>
  );
}
