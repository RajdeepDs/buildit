"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { logout } from "@/lib/actions/logout";
import type { TWorkspace } from "@/types";

export default function AvatarDropdownMenu({
  workspace,
}: {
  workspace: TWorkspace;
}) {
  const router = useRouter();
  const onclick = () => {
    logout();
    router.push("/login");
  };

  const { slug } = useParams() as { slug?: string };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-x-1 outline-none">
        <span className="font-medium text-strong">{workspace?.name}</span>
        <Icons.chevronDown className="ml-2 h-4 w-4 text-soft" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 ml-3 w-[180px]">
        <DropdownMenuItem asChild>
          <Link href={`/${slug}/settings/`} className="space-x-2">
            <Icons.user className="h-4 w-4 text-subtle" />
            <p className="font-medium text-default">My Profile</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${slug}/settings/general`} className="space-x-2">
            <Icons.home className="h-4 w-4 text-subtle" />
            <p className="font-medium text-default">My Workspace</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${slug}/settings/`} className="space-x-2">
            <Icons.settings className="h-4 w-4 text-subtle" />
            <p className="font-medium text-default">My settings</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/"} className="space-x-2">
            <Icons.home className="h-4 w-4 text-subtle" />
            <p className="font-medium text-default">Homepage</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/"} className="space-x-2">
            <Icons.penLine className="h-4 w-4 text-subtle" />
            <p className="font-medium text-default">Blogs</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/"} className="space-x-2">
            <Icons.bookOpenText className="h-4 w-4 text-subtle" />
            <p className="font-medium text-default">Changelogs</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onclick} className="space-x-2">
          <Icons.logOut className="h-4 w-4 text-subtle" />
          <p className="font-medium text-default">Sign out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
