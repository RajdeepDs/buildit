"use client";
import { NewProjectModal } from "@/components/modals/new-project-modal";
import ProjectLists from "@/components/projects/project-lists";
import { PageHeader } from "@/components/ui/page-header";
import { getProjects } from "@/lib/data/project/get-project";
import { useQuery } from "@tanstack/react-query";

export default function ProjectsClientPage(): JSX.Element {
  const { data: projects, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => getProjects(),
  });

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <PageHeader title="Projects">
        <NewProjectModal />
      </PageHeader>
      <main className="h-svh w-full border-t">
        <ProjectLists projects={projects!} />
      </main>
    </>
  );
}
