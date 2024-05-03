import { issue } from "@buildit/db/src/schema";

import { getAllIssues } from "@/lib/data/issues/get-issues";

export const runtime = "edge";
export default async function MyIssues() {
  const issues = await getAllIssues();
  console.log(issues);

  return (
    <div className="h-full p-2">
      <h1>My Issues</h1>
      {issues?.map((issue) => (
        <div key={issue.id} className="flex gap-2">
          <h1>{issue.issueId}</h1>
          <h2>{issue.title}</h2>
          <p>{issue.description}</p>
        </div>
      ))}
    </div>
  );
}
