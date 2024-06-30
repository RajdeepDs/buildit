import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

import {
  getFooterNavigations,
  getNavigations,
  getTeamsNavigations,
} from "@/configs/sidebar-navigations";
import type { TTeam, TUser } from "@/types";
import { CreateIssueModal } from "../modals/create-issue-modal";
import VerticalTabs from "../ui/vertical-tabs";
import AvatarDropdownMenu from "./avatar-dropdown-menu";

type DashboardSidebarProps = {
  slug: string;
  user: TUser | undefined;
  teams: TTeam[];
};

export default function DashboardSidebar({
  slug,
  user,
  teams,
}: DashboardSidebarProps): JSX.Element {
  const pathname = usePathname();

  const Navigations = getNavigations(slug);
  const FooterNavigations = getFooterNavigations(slug);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between py-3 pl-4 pr-3">
        <div className="flex items-center gap-x-2">
          {user && <Avatar imageSrc={user.image} alt={user.name!} size="sm" />}
          <AvatarDropdownMenu user={user} />
        </div>
        <CreateIssueModal>
          <Button
            variant={"icon"}
            size={"icon"}
            color={"secondary"}
            StartIcon="squarePen"
          />
        </CreateIssueModal>
      </div>
      <div className="flex-1 px-3">
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
        <div className="my-2">
          <p className="text-subtle p-2 text-sm font-medium">Your teams</p>
          {teams.map((team) => {
            const teamNavigations = getTeamsNavigations(slug, team.teamId);
            return (
              <div className="mb-4" key={team.id}>
                <div className="flex items-center gap-x-2 px-2 py-1.5">
                  <div className="w-fit items-center rounded-sm">
                    <Icons.home className="text-subtle h-4 w-4" />
                  </div>
                  <span className="text-default text-sm font-medium">
                    {team?.name}
                  </span>
                </div>
                <div className="ml-6">
                  {teamNavigations.map(({ name, href }) => (
                    <Link key={name} href={href}>
                      <VerticalTabs
                        name={name}
                        href={href}
                        pathname={pathname}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-3">
        {FooterNavigations.map(({ name, href, icon }) => {
          const TabIcon = Icons[(icon as keyof typeof Icons) || "chevronDown"];
          return (
            <Link key={name} href={href}>
              <div
                className={cn(
                  "mt-0.5 flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 hover:bg-gray-200",
                  pathname === href && "bg-gray-200",
                )}
              >
                <TabIcon className={cn("text-subtle h-4 w-4")} />
                <p className={cn("text-default text-sm font-medium")}>{name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
