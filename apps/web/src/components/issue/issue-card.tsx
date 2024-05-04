import useIssue from "@/lib/swr/use-issue";

export default function IssueCard({ issueId }: { issueId: string }) {
  const { issue, isLoading } = useIssue(issueId);
  if (isLoading) return <p>Loading...</p>;
  console.log("Issue", issue);

  return (
    <div>
      <h1>Issue Card</h1>
      <p>Issue ID: {issueId}</p>
    </div>
  );
}
