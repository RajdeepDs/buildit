import React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded font-medium",
  {
    variants: {
      variant: {
        default: "bg-attention text-attention",
        primary: "bg-primary text-primary",
      },
      size: {
        sm: "px-1 py-0.5 text-xs",
        md: "px-2 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
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
