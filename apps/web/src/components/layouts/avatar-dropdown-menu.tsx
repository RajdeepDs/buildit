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
import type { TUser } from "@/types";

export default function AvatarDropdownMenu({
  user,
}: {
  user: TUser | undefined;
}) {
  const router = useRouter();
  const onclick = () => {
    logout();
    router.push("/sign-in");
  };

  const { slug } = useParams() as { slug?: string };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-x-1 outline-none">
        <span className="text-emphasis text-sm font-medium">{user?.name}</span>
        <Icons.chevronDown className="text-default ml-2 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-3">
        <DropdownMenuItem asChild>
          <Link href={`/${slug}/settings/`} className="space-x-2">
            <Icons.user className="text-subtle h-4 w-4" />
            <p className="text-default font-medium">Profile</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${slug}/settings/`} className="space-x-2">
            <Icons.settings className="text-subtle h-4 w-4" />
            <p className="text-default font-medium">Workspace settings</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onclick} className="space-x-2">
          <Icons.logOut className="text-subtle h-4 w-4" />
          <p className="text-default font-medium">Log Out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
