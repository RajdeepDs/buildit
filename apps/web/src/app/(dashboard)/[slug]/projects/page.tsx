import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProjectsClientPage from "./page-client";
import { getProjects } from "@/lib/data/project/get-project";
import { Metadata } from "next";

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
    <div className="h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectsClientPage />
      </HydrationBoundary>
    </div>
  );
}
