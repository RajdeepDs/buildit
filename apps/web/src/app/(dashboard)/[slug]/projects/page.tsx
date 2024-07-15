import { getProjects } from "@/lib/data/project/get-project";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import ProjectsClientPage from "./page-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "View and manage your projects.",
};

export default async function ProjectPage(): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <div className="h-full w-full py-3">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectsClientPage />
      </HydrationBoundary>
    </div>
  );
}
