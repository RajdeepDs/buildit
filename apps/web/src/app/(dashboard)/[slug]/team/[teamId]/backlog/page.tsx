import { TeamsPageHeader } from "@/components/ui/page-header";

export default function BacklogIssues({
  params,
}: {
  params: { teamId: string };
}): JSX.Element {
  return (
    <div>
      <TeamsPageHeader team={params.teamId} title="Backlog Issues" />
    </div>
  );
}
