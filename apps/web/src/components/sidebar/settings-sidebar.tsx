import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

import {
  getSettingsSidebar,
  getSettingsTeamsNavigations,
} from "@/configs/settings-sidebar-navigations";
import { getTeams } from "@/lib/data/team/get-teams";
import type { TUser, TWorkspace } from "@/types";
import type { TSettingsSidebar } from "@/types/config";
import { useQuery } from "@tanstack/react-query";

export default function SettingsSidebar({
  slug,
  user,
}: {
  slug: string;
  workspace: TWorkspace;
  user: TUser;
}): JSX.Element {
  const pathname = usePathname();

  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => getTeams(),
  });

  const settingsSidebar: TSettingsSidebar = getSettingsSidebar(slug);

  const settingsTeamSidebar = getSettingsTeamsNavigations(slug, teams || []);

  return (
    <div className="flex flex-col">
      <Link
        href={`/${slug}/my-issues`}
        className="my-6 flex cursor-pointer items-center gap-2 px-4"
      >
        <Icons.back className="h-4 w-4 text-default" />
        <span className="font-medium text-default">Back</span>
      </Link>
      <div className="space-y-4 px-2">
        {settingsSidebar.map((section, index) => {
          const TabIcon =
            Icons[section.icon as keyof typeof Icons] || Icons.chevronLeft;
          return (
            <div key={index} className="space-y-1">
              {section.title === "User" ? (
                <div className="flex items-center gap-2 px-2">
                  {user && user.image && (
                    <>
                      <Image
                        src={user.image}
                        alt={user.name!}
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                      <span className="font-medium text-sm text-subtle">
                        {user.name}
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 px-2">
                  <TabIcon className="h-4 w-4 text-subtle" />
                  <span className="font-medium text-sm text-subtle">
                    {section.title}
                  </span>
                </div>
              )}
              <ul className="flex flex-col gap-[1px] pr-4 pl-8">
                {section.items.map((item, index) => {
                  const ItemIcon =
                    Icons[item.icon as keyof typeof Icons] || Icons.chevronLeft;
                  return (
                    <li key={index}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={`flex items-center rounded-md px-2 py-1 hover:bg-emphasis ${
                            pathname === item.href && "bg-emphasis"
                          }`}
                        >
                          {item.icon && (
                            <ItemIcon className="h-4 w-4 text-subtle" />
                          )}
                          <span className="font-medium text-sm">
                            {item.title}
                          </span>
                        </Link>
                      ) : (
                        <div
                          className={cn(
                            `flex items-center gap-1 rounded-md px-2 py-1 ${
                              item.button === true &&
                              "cursor-pointer hover:bg-emphasis"
                            }`,
                          )}
                        >
                          {item.icon && (
                            <ItemIcon className="h-4 w-4 text-subtle" />
                          )}
                          <span className="font-medium text-sm">
                            {item.title}
                          </span>
                        </div>
                      )}
                      {item.subItems && (
                        <ul className="flex flex-col gap-[1px] pl-8">
                          {item.subItems.map((subItem, index) => (
                            <li key={index}>
                              <Link
                                href={subItem.href}
                                className={`flex items-center rounded-md px-2 py-1 hover:bg-emphasis ${
                                  pathname === subItem.href && "bg-emphasis"
                                }`}
                              >
                                <span className="font-medium text-sm text-subtle">
                                  {subItem.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="my-4 px-2">
        {settingsTeamSidebar.map((section, index) => {
          const TabIcon = Icons[section.icon as keyof typeof Icons];
          return (
            <div key={index} className="space-y-1">
              <div className="mb-2 flex items-center gap-2 px-2">
                <TabIcon className="h-4 w-4 text-subtle" />
                <span className="font-medium text-sm text-subtle">
                  {section.title}
                </span>
              </div>
              <ul className="flex flex-col gap-[1px] pr-4 pl-8">
                {section.items.map((item, index) => {
                  const ItemIcon =
                    Icons[item.icon as keyof typeof Icons] || Icons.chevronLeft;
                  return (
                    <li key={index}>
                      {!item.button && (
                        <>
                          <div className="mb-1 flex items-center">
                            <ItemIcon className="mr-2 h-4 w-4 text-subtle" />
                            <span className="font-medium text-sm">
                              {item.title}
                            </span>
                          </div>
                          {"subItems" in item && item.subItems && (
                            <ul className="flex flex-col gap-[1px] pl-4">
                              {item.subItems.map((subItem, subItemIndex) => (
                                <li key={subItemIndex}>
                                  <Link
                                    href={subItem.href}
                                    className={`flex items-center rounded-md px-2 py-1 hover:bg-emphasis ${
                                      pathname === subItem.href && "bg-emphasis"
                                    }`}
                                  >
                                    <span className="font-medium text-sm text-subtle">
                                      {subItem.title}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
