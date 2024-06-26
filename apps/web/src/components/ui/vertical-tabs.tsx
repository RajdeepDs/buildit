import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

type VerticalTabsProps = {
  name: string;
  href: string;
  pathname: string;
  icon?: string;
};

export default function VerticalTabs({
  name,
  href,
  pathname,
  icon,
}: VerticalTabsProps) {
  const Icon = Icons[(icon as keyof typeof Icons) || "chevronDown"];
  return (
    <div
      className={cn(
        "hover:bg-emphasis mt-0.5 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5",
        pathname === href && "bg-emphasis",
        !icon && "py-1",
      )}
    >
      {icon && (
        <Icon
          className={cn(
            "text-subtle h-4 w-4",
            pathname === href && "text-emphasis",
          )}
        />
      )}
      <p
        className={cn(
          "text-default text-sm font-medium",
          pathname === href && "text-emphasis",
        )}
      >
        {name}
      </p>
    </div>
  );
}
