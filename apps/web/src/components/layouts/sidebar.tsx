"use client";

import { useParams, usePathname } from "next/navigation";

import useUser from "@/lib/swr/use-user";
import useWorkspace from "@/lib/swr/use-workspace";
import DashboardSidebar from "./dashboard-sidebar";
import SettingsSidebar from "./settings-sidebar";

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string };
  const { workspace, isLoading } = useWorkspace(slug!);
  const { user } = useUser();
  if (!slug) {
    return <></>;
  }

  return (
    <aside className="hidden w-[240px] bg-gray-100 lg:block">
      {pathname !== `/${slug}/settings` && (
        <DashboardSidebar slug={slug} workspace={workspace} user={user} />
      )}
      {pathname === `/${slug}/settings` && <SettingsSidebar slug={slug} />}
    </aside>
  );
}
