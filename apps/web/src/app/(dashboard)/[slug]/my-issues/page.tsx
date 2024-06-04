import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import AllIssues from "@/components/issue/all-issues";
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
      <nav className="border-b p-2">
        <h1 className="text-sm">My issues</h1>
      </nav>
      <main>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AllIssues />
        </HydrationBoundary>
      </main>
    </div>
  );
}
