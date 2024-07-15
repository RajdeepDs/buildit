"use client";

import { NewProjectModal } from "@/components/modals/new-project-modal";
import ProjectLists from "@/components/projects/project-lists";
import { getProjectbyTeam } from "@/lib/data/project/get-project-by-team";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";
import { useQuery } from "@tanstack/react-query";

export default function ProjectsClientPage({
  params,
}: { params: { teamId: string } }): JSX.Element {
  const { data: projects, error } = useQuery({
    queryKey: ["project", { teamId: params.teamId }],
    queryFn: async () => getProjectbyTeam({ teamId: params.teamId }),
  });

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="space-y-3">
      <nav className="flex items-center justify-between space-x-2 px-3">
        <header className="p-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Icons.home className="h-4 w-4 text-sub" />
                {params.teamId}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <NewProjectModal />
      </nav>
      <main className="h-svh w-full border-t">
        <ProjectLists projects={projects!} />
      </main>
    </div>
  );
}
