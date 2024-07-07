"use client";

import { getProjects } from "@/lib/data/project/get-project";
import { useQuery } from "@tanstack/react-query";
import ProjectItem from "./project-item";

export default function ProjectLists() {
  const { data: projects, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => getProjects(),
  });

  if (error) return <div>Error: {error.message}</div>;
  return (
    <ul>
      {projects?.map((project) => (
        <li key={project.id}>
          <ProjectItem project={project} />
        </li>
      ))}
    </ul>
  );
}
