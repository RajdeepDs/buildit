"use client";

import MyIssuesCard from "@/components/issue/my-issues-card";
import useIssues from "@/lib/swr/use-issues";

export default function MyIssuesClientPage() {
  const { issues, isLoading, error } = useIssues();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full">
      <nav className="border-b p-2">
        <h1 className="text-sm">My issues</h1>
      </nav>
      <main>
        {issues?.map((issue) => <MyIssuesCard key={issue.id} issue={issue} />)}
        {issues?.length === 0 && <p>No issue found. Create a new Issue</p>}
      </main>
    </div>
  );
}
