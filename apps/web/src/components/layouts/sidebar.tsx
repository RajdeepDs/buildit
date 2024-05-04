"use client";

import { useParams, usePathname } from "next/navigation";

import DashboardSidebar from "./dashboard-sidebar";
import SettingsSidebar from "./settings-sidebar";

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string };

  if (!slug) {
    return <></>;
  }

  return (
    <aside className="w-[240px] border">
      {pathname !== `/${slug}/settings` && <DashboardSidebar slug={slug} />}
      {pathname === `/${slug}/settings` && <SettingsSidebar slug={slug} />}
    </aside>
  );
}
