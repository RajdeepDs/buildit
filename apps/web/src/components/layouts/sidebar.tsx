"use client";

import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getTeams } from "@/lib/data/team/get-teams";
import { getUser } from "@/lib/data/user/get-user";
import { getWorkspace } from "@/lib/data/workspace/get-workspace";
import DashboardSidebar from "./dashboard-sidebar";
import SettingsSidebar from "./settings-sidebar";

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string };

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getUser(),
  });

  const { data: workspace } = useQuery({
    queryKey: ["workspace", { slug }],
    queryFn: async () => getWorkspace({ workspaceSlug: slug! }),
  });

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => getTeams(),
  });

  if (!slug) {
    return <></>;
  }

  return (
    <aside className="bg-muted border-muted hidden w-[240px] border-r lg:block">
      {!pathname.startsWith(`/${slug}/settings`) ? (
        <DashboardSidebar slug={slug} user={user!} teams={teams!} />
      ) : (
        <SettingsSidebar slug={slug} workspace={workspace!} user={user!} />
      )}
    </aside>
  );
}
