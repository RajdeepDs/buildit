import { Avatar, Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import type { TTeam } from "@/types";

export default function Team({ team }: { team: TTeam }): JSX.Element {
  return (
    <div className="hover:bg-muted flex cursor-pointer items-center justify-between border-b px-4 py-1">
      <div className="flex items-center space-x-4">
        <h2 className="font-medium">{team.name}</h2>
        <p className="text-subtle text-sm">{team.teamId}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Avatar imageSrc={team.user?.image} size="md" />
        <Button variant="icon" size={"icon"} color="minimal" className="">
          <Icons.horizontalMore className="text-subtle h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
