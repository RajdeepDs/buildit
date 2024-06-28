import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

export default function FilterMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} color="minimal">
          <Icons.filter className="text-subtle active:text-emphasis h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Icons.status className="text-subtle mr-2 h-4 w-4 stroke-2" />
          Status
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icons.signalHigh className="text-subtle mr-2 h-4 w-4 stroke-2" />
          Priority
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icons.hexagon className="text-subtle mr-2 h-4 w-4 stroke-2" />
          Project
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icons.tag className="text-subtle mr-2 h-4 w-4 stroke-2" />
          Labels
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
