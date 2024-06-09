import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

export default function SettingsSidebar({
  slug,
}: {
  slug: string;
}): JSX.Element {
  const pathname = usePathname();
  const settingsTabs = [
    {
      name: "Profile",
      href: `/${slug}/settings/profile`,
    },
    {
      name: "Account",
      href: `/${slug}/settings/account`,
    },
    {
      name: "Notifications",
      href: `/${slug}/settings/notifications`,
    },
    {
      name: "Security",
      href: `/${slug}/settings/security`,
    },
    {
      name: "Billing",
      href: `/${slug}/settings/billing`,
    },
  ];
  return (
    <>
      <div className="mx-2 mt-2 px-2">
        <Link href={`/${slug}`} className="flex w-fit items-center font-bold">
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>
      {settingsTabs.map(({ name, href }) => (
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
    </>
  );
}
