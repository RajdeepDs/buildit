import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import AllIssues from "@/components/issue/all-issues";
import NavIssue from "@/components/issue/nav-issue";
import { getIssues } from "@/lib/data/issues/get-issues";

export const runtime = "edge";

export default async function MyIssuesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
  });

  return (
    <div className="h-full">
      <NavIssue />
      <main>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AllIssues />
        </HydrationBoundary>
      </main>
    </div>
  );
}
