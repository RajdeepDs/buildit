import React from "react";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Sidebar from "@/components/layouts/sidebar";
import { getUser } from "@/lib/data/user/get-user";
import { getWorkspace } from "@/lib/data/workspace/get-workspace";

export const runtime = "edge";

export const metadata: Metadata = {
  title: {
    template: "%s | Buildit",
    default: "Dashboard",
  },
};

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  if (params.slug !== "favicon.ico")
    await queryClient.prefetchQuery({
      queryKey: ["workspace", { slug: params.slug }],
      queryFn: () => getWorkspace({ workspaceSlug: params.slug }),
    });

  return (
    <div className="flex h-dvh">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Sidebar />
      </HydrationBoundary>
      <main className="flex w-full flex-grow flex-col overflow-hidden bg-white">
        {children}
      </main>
    </div>
  );
}
