import { Avatar, Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import type { TProject } from "@/types";

type ProjectItemProps = {
  project: Omit<TProject, "issues" | "teams">;
};

export default function ProjectItem({
  project,
}: ProjectItemProps): JSX.Element {
  return (
    <div className="flex cursor-pointer items-center justify-between border-b px-4 py-1 hover:bg-muted">
      <div className="flex items-center space-x-4">
        <Icons.hexagon className="h-4 w-4 text-default" />
        <h2 className="font-medium">{project.name}</h2>
      </div>
      <div className="flex items-center space-x-4">
        <Avatar imageSrc={project.user?.image} size="md" />
        <Button variant="icon" size={"icon"} color="minimal" className="">
          <Icons.horizontalMore className="h-4 w-4 text-subtle" />
        </Button>
      </div>
    </div>
  );
}
