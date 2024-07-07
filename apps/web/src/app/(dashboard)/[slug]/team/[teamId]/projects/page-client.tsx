"use client";

import ProjectLists from "@/components/projects/project-lists";
import { TeamsPageHeader } from "@/components/ui/page-header";
import { getProjectbyTeam } from "@/lib/data/project/get-project-by-team";
import { useQuery } from "@tanstack/react-query";

export default function ProjectsClientPage({
  params,
}: { params: { teamId: string } }): JSX.Element {
  const { data: projects, error } = useQuery({
    queryKey: ["projects", { teamId: params.teamId }],
    queryFn: async () => getProjectbyTeam({ teamId: params.teamId }),
  });

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <TeamsPageHeader team={params.teamId} title="Projects" />
      <main className="h-svh w-full border-t">
        <ProjectLists projects={projects!} />
      </main>
    </>
  );
}
