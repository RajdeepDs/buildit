"use client";

import { getTeamMembersByTeamId } from "@/lib/data/team/get-team-members-by-teamId";
import { Avatar } from "@buildit/ui";
import { useQuery } from "@tanstack/react-query";

export default function TeamMembersList({
  params,
}: { params: { teamId: string } }): JSX.Element {
  const { data: members, error } = useQuery({
    queryKey: ["teamMembers", { teamId: params.teamId }],
    queryFn: () => getTeamMembersByTeamId({ teamId: params.teamId }),
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <p className="text-sm mb-4 font-medium text-subtle">1 member</p>
      <div className="flex items-center justify-between bg-muted rounded-md px-4 py-2">
        <div className="flex space-x-4 items-center">
          <Avatar imageSrc={members?.image} size="md" alt="avatar" />
          <div className="flex flex-col items-start">
            <h3 className="font-medium text-sm text-default">
              {members?.name}
            </h3>
            <p className="text-sm text-subtle">{members?.email}</p>
          </div>
        </div>
        <p className="text-sm font-medium text-subtle">Admin</p>
      </div>
    </>
  );
}
