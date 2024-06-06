import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";

import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

import { toggleSearchAtom } from "@/lib/store/search-issue";
import type { TUser } from "@/types";
import { CreateIssueModal } from "../modals/create-issue-modal";
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

  const dashboardTabs = [
    {
      name: "Inbox",
      icon: "inbox",
      href: `/${slug}/inbox`,
    },
    {
      name: "My issues",
      icon: "issues",
      href: `/${slug}/my-issues`,
    },
  ];
  const [toggleSearch, setToggleSearch] = useAtom(toggleSearchAtom);

  return (
    <div className="mt-2 flex flex-col px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-400">
            <p className="text-xl text-white">{workspace?.name.charAt(0)}</p>
          </div>
          <h1 className="font-semibold">{workspace?.name}</h1>
        </div>
        <AvatarDropdownMenu user={user} />
      </div>
      <div className="mb-2 mt-5 flex w-full items-center justify-between gap-x-2">
        <CreateIssueModal>
          <Button variant={"secondary"} className="w-full gap-x-2">
            <Icons.newIssue className="h-[15px] w-[15px] text-gray-700" />
            New issue
          </Button>
        </CreateIssueModal>
        <Button
          variant={"secondary"}
          onClick={() => setToggleSearch(!toggleSearch)}
          className={cn(
            toggleSearch &&
              "border border-gray-300 bg-gray-200 hover:bg-gray-200",
          )}
        >
          <Icons.search className="h-[18px] w-[18px] text-gray-700" />
        </Button>
      </div>
      {dashboardTabs.map(({ name, href, icon }) => {
        const TabIcon = Icons[(icon as keyof typeof Icons) || "chevronDown"];
        return (
          <Link key={name} href={href}>
            <div
              className={cn(
                "mt-1 flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 hover:bg-gray-200",
                pathname === href && "bg-gray-200",
              )}
            >
              <TabIcon className="mr-[8px] h-[18px] w-[18px] text-gray-700" />
              <p className="text-sm font-medium text-gray-800">{name}</p>
            </div>
          </Link>
        );
      })}
      <Icons.info className="absolute bottom-2 mt-2 h-[22px] w-[22px] cursor-pointer text-gray-500" />
    </div>
  );
}
