"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { getTeams } from "@/lib/data/team/get-teams";
import { getUser } from "@/lib/data/user/get-user";
import { getWorkspace } from "@/lib/data/workspace/get-workspace";
import DashboardSidebar from "./dashboard-sidebar";
import SettingsSidebar from "./settings-sidebar";

export default function Sidebar({ slug }: { slug: string }): JSX.Element {
  const pathname = usePathname();

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

  return (
    <aside className="w-[240px] bg-weak">
      {!pathname.startsWith(`/${slug}/settings`) ? (
        <DashboardSidebar
          slug={slug}
          user={user!}
          teams={teams!}
          workspace={workspace!}
        />
      ) : (
        <SettingsSidebar slug={slug} workspace={workspace!} user={user!} />
      )}
    </aside>
  );
}
