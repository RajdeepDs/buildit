import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { PageHeader } from "@/components/ui/page-header";

export default function ProjectPage() {
  return (
    <div className="h-full">
      <PageHeader title="Projects">
        <Button color="minimal" size={"icon"}>
          <Icons.horizontalMore className="text-subtle active:text-emphasis h-4 w-4" />
        </Button>
      </PageHeader>
      <main className="px-4">{/* List of Projects */}</main>
    </div>
  );
}
