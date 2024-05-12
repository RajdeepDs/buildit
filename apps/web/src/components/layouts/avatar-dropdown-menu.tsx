"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@buildit/ui";

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-3">
        <DropdownMenuItem asChild>
          <Link href="/settings/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings/general">Workspace settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/members">Invite and manage members</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onclick}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
