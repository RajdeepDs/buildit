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
    router.push("/auth/signin");
  };

  const { slug } = useParams() as { slug?: string };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-x-1 outline-none">
        <span className="text-emphasis">{user?.name}</span>
        <Icons.chevronDown className="stroke-textColor-subtle h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-3">
        <DropdownMenuItem asChild>
          <Link href={`/${slug}/settings/`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${slug}/settings/`}>Workspace settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/${slug}/settings/`}>Invite and manage members</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onclick}
          className="text-red-500 focus:bg-red-100 focus:text-red-500"
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
