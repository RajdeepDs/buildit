import { TeamsPageHeader } from "@/components/ui/page-header";

export default function Projects({
  params,
}: {
  params: { teamId: string };
}): JSX.Element {
  return (
    <div>
      <TeamsPageHeader team={params.teamId} title="Projects" />
    </div>
  );
}
