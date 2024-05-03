import Issue from "@/components/issue/issue";
import { getAllIssues } from "@/lib/data/issues/get-issues";

export const runtime = "edge";

export default async function MyIssues() {
  const issues = await getAllIssues();
  return (
    <div className="h-full p-2">
      <h1>My Issues</h1>
      {issues?.map((issue) => <Issue issue={issue} key={issue.id} />)}
    </div>
  );
}
