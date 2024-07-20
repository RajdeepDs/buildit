import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import {
  getNavigations,
  getTeamsNavigations,
} from "@/configs/sidebar-navigations";

import { CreateIssueModal } from "../modals/create-issue-modal";
import VerticalTabs from "../ui/vertical-tabs";
import AvatarDropdownMenu from "./avatar-dropdown-menu";

import type { TTeam, TUser, TWorkspace } from "@/types";

type DashboardSidebarProps = {
  slug: string;
  user: Pick<TUser, "name" | "image">;
  teams: Pick<TTeam, "id" | "name" | "teamId">[];
  workspace: Pick<TWorkspace, "name">;
};

export default function DashboardSidebar({
  slug,
  user,
  teams,
  workspace,
}: DashboardSidebarProps): JSX.Element {
  const pathname = usePathname();

  const Navigations = getNavigations(slug);

  return (
    <div className="flex h-full flex-col space-y-3 p-3">
      <div className="flex items-center gap-x-2 p-2">
        {user && <Avatar imageSrc={user.image} alt={user.name!} size="sm" />}
        <AvatarDropdownMenu workspace={workspace} />
      </div>
      <div className="flex items-center justify-between ">
        <CreateIssueModal>
          <Button StartIcon="plus" size={"sm"}>
            New issue
          </Button>
        </CreateIssueModal>
        <Button size={"icon"} color="secondary" className="hidden bg-white">
          <Icons.search className="h-4 w-4 text-soft" />
        </Button>
      </div>
      <div className="flex-1 space-y-4">
        <p className="p-2 font-medium text-sm text-sub">Home</p>
        {Navigations.map(({ name, href, icon }) => {
          return (
            <Link key={name} href={href}>
              <VerticalTabs
                name={name}
                href={href}
                pathname={pathname}
                icon={icon}
              />
            </Link>
          );
        })}
        <div>
          <p className="p-2 font-medium text-sm text-sub">Your teams</p>
          {teams.map((team) => {
            const teamNavigations = getTeamsNavigations(slug, team.teamId);
            return (
              <div className="mb-4" key={team.id}>
                <div className="flex items-center gap-x-2 px-2 py-1.5">
                  <div className="w-fit items-center rounded-sm">
                    <Icons.home className="h-4 w-4 text-sub" />
                  </div>
                  <span className="font-medium text-sm text-sub">
                    {team?.name}
                  </span>
                </div>
                <div className="ml-6">
                  {teamNavigations.map(({ name, href, icon }) => (
                    <Link key={name} href={href}>
                      <VerticalTabs
                        name={name}
                        href={href}
                        pathname={pathname}
                        icon={icon}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
