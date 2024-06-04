"use client";

import { useQuery } from "@tanstack/react-query";

import { getIssues } from "@/lib/data/issues/get-issues";
import MyIssuesCard from "./my-issues-card";

export default function AllIssues() {
  const { data, error } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => getIssues(),
  });
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {data?.map((issue) => <MyIssuesCard key={issue.id} issue={issue} />)}
    </div>
  );
}
