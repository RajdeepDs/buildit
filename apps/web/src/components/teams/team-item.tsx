import { Avatar, Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import type { TTeam } from "@/types";
import Link from "next/link";

type TeamsItemProps = {
  team: Omit<TTeam, "issues">;
};

export default function TeamItem({ team }: TeamsItemProps): JSX.Element {
  return (
    <Link
      href={`team/${team.teamId}/active`}
      className="flex cursor-pointer items-center justify-between border-b px-4 py-1 hover:bg-muted"
    >
      <div className="flex items-center space-x-4">
        <h2 className="font-medium">{team.name}</h2>
        <p className="text-sm text-subtle">{team.teamId}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Avatar imageSrc={team.user?.image} size="md" />
        <Button variant="icon" size={"icon"} color="minimal" className="">
          <Icons.horizontalMore className="h-4 w-4 text-subtle" />
        </Button>
      </div>
    </Link>
  );
}
