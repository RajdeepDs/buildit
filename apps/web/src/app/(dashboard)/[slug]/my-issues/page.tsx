import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";

import { getIssues } from "@/lib/data/issues/get-issues";
import MyIssuesClientPage from "./page-client";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "My issues",
  description: "View and manage your issues.",
};

export default async function MyIssuesPage(): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
  });

  return (
    <div className="h-full w-full py-3">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyIssuesClientPage />
      </HydrationBoundary>
    </div>
  );
}
