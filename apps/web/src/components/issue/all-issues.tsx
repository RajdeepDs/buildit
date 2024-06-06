"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { getIssues } from "@/lib/data/issues/get-issues";
import {
  searchQueryAtom,
  searchResultsAtom,
  toggleSearchAtom,
} from "@/lib/store/search-issue";
import MyIssuesCard from "./my-issues-card";

export default function AllIssues() {
  const { data, error } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => getIssues(),
  });
  const [toggleSearch] = useAtom(toggleSearchAtom);
  const [issues, setIssues] = useAtom(searchResultsAtom);
  const [searchQuery] = useAtom(searchQueryAtom);
  setIssues(data || []);

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {toggleSearch ? (
        <div>
          {issues
            .filter((issue) => issue.title.toLowerCase().includes(searchQuery))
            .map((issue) => (
              <MyIssuesCard key={issue.id} issue={issue} />
            ))}
        </div>
      ) : (
        data?.map((issue) => <MyIssuesCard key={issue.id} issue={issue} />)
      )}
    </div>
  );
}
