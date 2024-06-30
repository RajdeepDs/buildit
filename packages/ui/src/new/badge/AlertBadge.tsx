import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import React from "react";

import { Icons } from "../../icons";
import { cn } from "../../lib/utils";

export const alertBadgeVariants = cva(
  "inline-flex h-7 w-7 items-center justify-center rounded-full p-2 text-sm font-medium",
  {
    variants: {
      variant: {
        default: "text-emphasis bg-emphasis",
        blue: "text-info bg-info",
        green: "text-success bg-success",
        orange: "text-attention bg-attention",
        red: "text-error bg-error",
      },
      size: {
        sm: "h-5 w-5",
        md: "h-7 w-7",
        lg: "h-9 w-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const alertBadgeDotVariants = cva("inline-flex stroke-[4px]", {
  variants: {
    variant: {
      default: "text-emphasis",
      blue: "text-info",
      green: "text-success",
      orange: "text-attention",
      red: "text-error",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export interface AlertBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof alertBadgeVariants> {
  isDot?: boolean;
  number?: number;
}

function AlertBadge({
  className,
  variant,
  size,
  isDot,
  number,
  ...props
}: AlertBadgeProps) {
  return (
    <>
      {isDot ? (
        <Icons.dot
          className={cn(alertBadgeDotVariants({ variant }), className)}
        />
      ) : (
        <div
          className={cn(alertBadgeVariants({ variant, size }), className)}
          {...props}
        >
          {number}
        </div>
      )}
    </>
  );
}

export { AlertBadge };
