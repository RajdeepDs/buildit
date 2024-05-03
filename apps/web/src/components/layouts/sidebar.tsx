"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@buildit/ui/utils";

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string };
  const tabs = [
    {
      name: "My Issues",
      href: `/${slug}/my-issues`,
    },
    {
      name: "Settings",
      href: `/${slug}/settings`,
    },
  ];
  return (
    <aside className="w-[240px] border">
      {tabs.map(({ name, href }) => (
        <Link key={name} href={href}>
          <div
            className={cn(
              "mx-2 mt-2 cursor-pointer rounded-md px-2 py-2",
              pathname === href && "bg-gray-200 font-semibold",
            )}
          >
            <p className="">{name}</p>
          </div>
        </Link>
      ))}
    </aside>
  );
}
