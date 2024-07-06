"use client";

import { useQuery } from "@tanstack/react-query";

import { getIssuesByTeam } from "@/lib/data/issues/get-issues-by-team";
import MyIssuesCard from "./my-issues-card";

import { useEffect, useState } from "react";
import { TIssues } from "@/types";

import useActiveIssuesStore from "@/lib/store/active-issues-store";

export default function IssuesByTeam({ teamId }: { teamId: string }) {
  const store = useActiveIssuesStore();

  const { data: allIssues, error } = useQuery({
    queryKey: ["active Issues", { teamId: teamId }],
    queryFn: async () => getIssuesByTeam({ teamId: teamId }),
    refetchInterval: 4 * 1000,
  });

  const [filteredIssues, setFilteredIssues] = useState<TIssues>([]);

  const filteredStatus = store.filterByStatus;
  const filteredPriority = store.filterByPriority;

  useEffect(() => {
    const filtered = allIssues?.filter((issue) => {
      if (filteredStatus && filteredStatus !== "") {
        return issue.status === filteredStatus;
      }
      if (filteredPriority && filteredPriority !== "") {
        return issue.priority === filteredPriority;
      }
      return true;
    });

    if (store.search) {
      setFilteredIssues(
        filtered?.filter((issue) =>
          issue.title.toLowerCase().includes(store.search.toLowerCase()),
        ) || [],
      );
    } else {
      setFilteredIssues(filtered || allIssues || []);
    }
  }, [allIssues, filteredStatus, filteredPriority, store.search]);

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
