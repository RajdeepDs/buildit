import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

export default function DashboardSidebar({
  slug,
}: {
  slug: string;
}): JSX.Element {
  const pathname = usePathname();
  const dashboardTabs = [
    {
      name: "Inbox",
      icon: "inbox",
      href: `/${slug}/inbox`,
    },
    {
      name: "My Issues",
      icon: "issues",
      href: `/${slug}/my-issues`,
    },
  ];
  return (
    <div className="mt-2 flex flex-col px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-blue-300" />
          <h1 className="font-semibold">Buildit</h1>
        </div>
        <div className="h-6 w-6 rounded-full bg-gray-300" />
      </div>

      <div className="mt-2 flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 hover:bg-gray-200 ">
        <Icons.search className="mr-[14px] h-[18px] w-[18px] text-gray-400" />
        <p className="text-gray-600 hover:text-black">Search</p>
      </div>
      {dashboardTabs.map(({ name, href, icon }) => {
        const TabIcon = Icons[(icon as keyof typeof Icons) || "chevronDown"];
        return (
          <Link key={name} href={href}>
            <div
              className={cn(
                "mt-1 flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 text-gray-600 hover:bg-gray-200 focus:text-black",
                pathname === href && "bg-gray-200 font-semibold text-black",
              )}
            >
              <TabIcon className="text-grey-deep mr-[14px] h-[18px] w-[18px]" />
              <p>{name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
