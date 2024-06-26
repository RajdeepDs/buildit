import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";

import { Avatar, Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

import {
  getFooterNavigations,
  getNavigations,
  getTeamsNavigations,
} from "@/configs/sidebar-navigations";
import { toggleSearchAtom } from "@/lib/store/search-issue";
import type { TUser } from "@/types";
import VerticalTabs from "../ui/vertical-tabs";
import AvatarDropdownMenu from "./avatar-dropdown-menu";

type DashboardSidebarProps = {
  slug: string;
  workspace: { name: string } | undefined;
  user: TUser | undefined;
};

export default function DashboardSidebar({
  slug,
  workspace,
  user,
}: DashboardSidebarProps): JSX.Element {
  const pathname = usePathname();

  const Navigations = getNavigations(slug);
  const teamNavigations = getTeamsNavigations(slug);
  const FooterNavigations = getFooterNavigations(slug);

  const [toggleSearch, setToggleSearch] = useAtom(toggleSearchAtom);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between py-3 pl-4 pr-3">
        <div className="flex items-center gap-x-2">
          {user && <Avatar imageSrc={user.image} alt={user.name} size="sm" />}
          <AvatarDropdownMenu user={user} />
        </div>
        <Button
          variant={"icon"}
          size={"icon"}
          color={"minimal"}
          className={cn(toggleSearch && "bg-emphasis hover:bg-emphasis")}
          onClick={() => setToggleSearch(!toggleSearch)}
        >
          <Icons.search
            className={cn(
              "text-subtle h-4 w-4",
              toggleSearch && "text-emphasis",
            )}
          />
        </Button>
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
          <div className="flex items-center gap-x-2 px-2 py-1.5">
            <div className="w-fit items-center rounded-sm">
              <Icons.home className="text-subtle h-4 w-4" />
            </div>
            <span className="text-default font-medium">{workspace?.name}</span>
          </div>
          <div className="ml-6">
            {teamNavigations.map(({ name, href }) => (
              <Link key={name} href={href}>
                <VerticalTabs name={name} href={href} pathname={pathname} />
              </Link>
            ))}
          </div>
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
