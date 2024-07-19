import {
  Avatar,
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { deleteProject } from "@/lib/actions/project/delete-project";
import type { TProject } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProjectItemProps = {
  project: Omit<TProject, "issues" | "teams">;
};

export default function ProjectItem({
  project,
}: ProjectItemProps): JSX.Element {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["deleteProject", { id: project.id }],
    mutationFn: () => {
      return deleteProject({ projectId: project.id });
    },
    onSuccess: () => {
      toast.success("Project deleted!");
      router.refresh();
    },
    onError: () => {
      toast.error("Error deleting project!");
    },
  });
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex cursor-pointer items-center justify-between border-b px-5 py-2 hover:bg-muted">
          <div className="flex items-center space-x-4">
            <Icons.hexagon className="h-4 w-4 text-sub" />
            <h2 className="font-medium text-strong">{project.name}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar imageSrc={project.user?.image} size="md" />
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() => {
              mutation.mutate();
            }}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            Delete
            <ContextMenuShortcut>Delete</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
