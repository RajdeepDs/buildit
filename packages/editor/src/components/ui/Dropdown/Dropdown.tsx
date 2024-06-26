import React from "react";

import { cn } from "@buildit/ui/utils";

export const DropdownCategoryTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-1 px-1.5 text-[.65rem] font-semibold uppercase text-neutral-500 dark:text-neutral-400">
      {children}
    </div>
  );
};

export const DropdownButton = ({
  children,
  isActive,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  const buttonClass = cn(
    "flex items-center gap-2 p-2 rounded-md text-sm font-medium text-neutral-500 dark:text-neutral-400 text-left bg-white w-full",
    !isActive && !disabled,
    "hover:border hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200",
    isActive &&
      !disabled &&
      "bg-gray-200 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200",
    disabled && "text-neutral-400 cursor-not-allowed dark:text-neutral-600",
    className,
  );

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
