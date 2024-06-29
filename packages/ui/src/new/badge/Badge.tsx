import React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded font-medium",
  {
    variants: {
      variant: {
        gray: "bg-emphasis text-emphasis",
        blue: "bg-info text-info",
        green: "bg-success text-success",
        orange: "bg-attention text-attention",
        red: "bg-error text-error",
      },
      size: {
        sm: "h-fit px-1 py-0.5 text-xs",
        md: "h-fit px-2 py-1 text-sm",
        lg: "h-fit px-3 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "gray",
      size: "sm",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  isDot?: boolean;
}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <>
      <div
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    </>
  );
}

export { Badge };
