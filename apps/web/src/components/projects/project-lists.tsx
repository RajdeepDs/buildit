"use client";

import { TProject } from "@/types";
import { NewProjectModal } from "../modals/new-project-modal";
import ProjectItem from "./project-item";

type ProjectListsProps = {
  projects: Omit<TProject, "issues" | "teams">[];
};

export default function ProjectLists({ projects }: ProjectListsProps) {
  return (
    <>
      {projects?.length === 0 ? (
        <div className="flex h-1/2 w-full flex-col items-center justify-center space-y-4 rounded-lg">
          <div className="flex flex-col items-center">
            <h1 className="font-cal text-default text-xl">No project found</h1>
            <p className="text-sm text-subtle">
              There aren&apos;t any project at the moment!{" "}
            </p>
          </div>
          <NewProjectModal />
        </div>
      ) : (
        <ul>
          {projects?.map((project) => (
            <li key={project.id}>
              <ProjectItem project={project} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
