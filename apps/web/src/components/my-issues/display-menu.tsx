import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

export default function DisplayMenu() {
  return (
    <Button color="minimal" size={"icon"}>
      <Icons.sliders className="text-subtle active:text-emphasis h-4 w-4" />
    </Button>
  );
}
