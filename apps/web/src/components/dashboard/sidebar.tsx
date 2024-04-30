"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import WorkspaceSwitcher from "../ui/workspace-switcher";

export default function Sidebar(): JSX.Element {
  const { slug } = useParams() as { slug?: string };
  const tabs = [{ name: "My Issues", href: `/${slug}` }];

  return (
    <div className="">
      <WorkspaceSwitcher workspaceName="BuildIt" workspaceSlug="build-it" />
      {tabs.map(({ name, href }) => (
        <Link key={href} href={href || ""}>
          <h1 className="">{name}</h1>
        </Link>
      ))}
    </div>
  );
}
