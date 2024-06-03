"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchIssues } from "@/lib/actions/issue/get-issues";
import MyIssuesCard from "./my-issues-card";

export default function AllIssues() {
  const { data, error } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => fetchIssues(),
  });
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {data?.success?.map((issue) => (
        <MyIssuesCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}
