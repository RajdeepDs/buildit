import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";

import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

import {
  getFooterNavigations,
  getNavigations,
  getSubNavigations,
} from "@/configs/sidebar-navigations";
import { toggleSearchAtom } from "@/lib/store/search-issue";
import type { TUser } from "@/types";
import AvatarDropdownMenu from "./avatar-dropdown-menu";

export default function DashboardSidebar({
  slug,
  workspace,
  user,
}: {
  slug: string;
  workspace: { name: string } | undefined;
  user: TUser | undefined;
}): JSX.Element {
  const pathname = usePathname();

  const Navigations = getNavigations(slug);
  const subNavigations = getSubNavigations(slug);
  const FooterNavigations = getFooterNavigations(slug);

  const [toggleSearch, setToggleSearch] = useAtom(toggleSearchAtom);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between py-3 pl-4 pr-3">
        <div className="flex items-center gap-x-2">
          {user && user.image && (
            <Image
              src={user.image}
              alt={user.name}
              width={20}
              height={20}
              className="ring-emphasis rounded-full ring-2"
            />
          )}
          <AvatarDropdownMenu user={user} />
        </div>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="group"
          onClick={() => setToggleSearch(!toggleSearch)}
        >
          <Icons.search
            className={cn(
              "text-subtle group-hover:text-emphasis hover: h-4 w-4",
              toggleSearch && "text-emphasis",
            )}
          />
        </Button>
      </div>

      <div className="flex-1 px-3">
        {Navigations.map(({ name, href, icon }) => {
          const TabIcon = Icons[(icon as keyof typeof Icons) || "chevronDown"];
          return (
            <Link key={name} href={href}>
              <div
                className={cn(
                  "mt-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-200",
                  pathname === href && "bg-gray-200",
                )}
              >
                <TabIcon
                  className={cn(
                    "text-subtle h-4 w-4",
                    pathname === href && "text-emphasis",
                  )}
                />
                <p
                  className={cn(
                    "text-default text-sm font-medium",
                    pathname === href && "text-emphasis",
                  )}
                >
                  {name}
                </p>
              </div>
            </Link>
          );
        })}
        <div className="my-3">
          <div className="mx-1 flex items-center gap-x-2 p-1">
            <div className="w-fit items-center rounded-sm">
              <Icons.home className="text-subtle h-4 w-4" />
            </div>
            <span className="text-subtle font-medium">{workspace?.name}</span>
          </div>
          <div className="ml-7">
            {subNavigations.map(({ name, href }) => (
              <Link key={name} href={href}>
                <div
                  className={cn(
                    "flex cursor-pointer items-center rounded-md px-2 py-1 hover:bg-gray-200",
                    pathname === href && "bg-gray-200",
                  )}
                >
                  <p
                    className={cn(
                      "text-default text-sm font-medium",
                      pathname === href && "text-emphasis",
                    )}
                  >
                    {name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3">
        {FooterNavigations.map(({ name, href, icon, externalLink }) => {
          const TabIcon = Icons[(icon as keyof typeof Icons) || "chevronDown"];
          return (
            <Link key={name} href={href}>
              <div
                className={cn(
                  "mt-1 flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 hover:bg-gray-200",
                  pathname === href && "bg-gray-200",
                )}
              >
                <TabIcon className={cn("text-subtle h-4 w-4")} />
                <p className={cn("text-default text-sm font-medium")}>{name}</p>
                {externalLink && (
                  <Icons.externalLink className="text-subtle h-4 w-4" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
