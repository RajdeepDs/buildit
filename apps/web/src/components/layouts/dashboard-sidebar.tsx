import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

import useUser from "@/lib/swr/use-user";
import useWorkspace from "@/lib/swr/use-workspace";

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

  const { workspace, isLoading } = useWorkspace(slug);
  const { user, isLoading: UserLoading } = useUser();

  if (isLoading || UserLoading) return <></>;

  return (
    <div className="mt-2 flex flex-col px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-400">
            <p className="text-xl text-white">{workspace?.name.charAt(0)}</p>
          </div>
          <h1 className="font-semibold">{workspace?.name}</h1>
        </div>
        {user && user.image && (
          <Image
            src={user?.image}
            alt="user"
            width={24}
            height={24}
            priority
            className="cursor-pointer rounded-full ring-2 ring-blue-500 ring-offset-2"
          />
        )}
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
