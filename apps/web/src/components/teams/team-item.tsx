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

import { deleteTeam } from "@/lib/actions/team/delete-team";
import type { TTeam } from "@/types";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type TeamsItemProps = {
  team: Omit<TTeam, "issues">;
};

export default function TeamItem({ team }: TeamsItemProps): JSX.Element {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["deleteTeam", { id: team.id }],
    mutationFn: () => {
      return deleteTeam({ teamId: team.id });
    },
    onSuccess: () => {
      toast.success("Team deleted!");
      router.refresh();
    },
    onError: () => {
      toast.error("Error deleting team!");
    },
  });
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          href={`team/${team.teamId}/active`}
          className="flex cursor-pointer items-center justify-between border-b px-5 py-2 hover:bg-muted"
        >
          <div className="flex items-center space-x-4">
            <h2 className="font-medium">{team.name}</h2>
            <p className="text-sm text-subtle">{team.teamId}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar imageSrc={team.user?.image} size="md" />
          </div>
        </Link>
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
