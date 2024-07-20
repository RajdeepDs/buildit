import { Icons } from "@buildit/ui/icons";
import { cn } from "@buildit/ui/utils";

type VerticalTabsProps = {
  name: string;
  href?: string;
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
        "mt-0.5 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-soft",
        pathname === href && "bg-soft",
        !icon && "py-1",
      )}
    >
      {icon && (
        <Icon
          className={cn("h-4 w-4 text-sub", pathname === href && "text-strong")}
        />
      )}
      <p
        className={cn(
          "font-medium text-sm text-sub",
          pathname === href && "text-strong",
        )}
      >
        {name}
      </p>
    </div>
  );
}
