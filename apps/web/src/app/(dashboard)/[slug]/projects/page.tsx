import { PageHeader } from "@/components/ui/page-header";
import ProjectLists from "@/components/projects/project-lists";
import { NewProjectModal } from "@/components/modals/new-project-modal";

export default function ProjectPage() {
  return (
    <div className="h-full">
      <PageHeader title="Projects">
        <NewProjectModal />
      </PageHeader>
      <main className="h-svh w-full border-t">
        <ProjectLists />
      </main>
    </div>
  );
}
