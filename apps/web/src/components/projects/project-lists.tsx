"use client";

import ProjectItem from "./project-item";
import { TProject } from "@/types";

type ProjectListsProps = {
  projects: Omit<TProject, "issues" | "teams">[];
};

export default function ProjectLists({ projects }: ProjectListsProps) {
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
