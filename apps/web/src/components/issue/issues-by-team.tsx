"use client";

import { useQuery } from "@tanstack/react-query";

import { getIssuesByTeam } from "@/lib/data/issues/get-issues-by-team";
import MyIssuesCard from "./my-issues-card";

export default function IssuesByTeam({ teamId }: { teamId: string }) {
  const { data: allIssues, error } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => getIssuesByTeam({ teamId: teamId }),
  });

  const filteredIssues =
    allIssues?.filter((issue) => issue.status === "todo") || [];

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <ul className="list-none">
        {filteredIssues?.map((issue) => (
          <li key={issue.id}>
            <MyIssuesCard issue={issue} />
          </li>
        ))}
      </ul>
    </div>
  );
}
