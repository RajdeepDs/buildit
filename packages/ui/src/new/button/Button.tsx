import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { Icons } from "../../icons";
import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md p-5 font-medium",
  {
    variants: {
      variant: {
        button: "",
        icon: "",
      },
      color: {
        primary: "bg-inverted text-inverted",
        secondary: "",
        minimal: "",
        destructive: "",
      },
      size: {
        sm: "",
        base: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "button",
      color: "primary",
      size: "base",
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  StartIcon?: (typeof Icons)[keyof typeof Icons];
  disabled?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading = false,
      className,
      variant,
      size,
      color,
      asChild = false,
      StartIcon,
      ...props
    },
    ref,
  ) => {
    const disabled = props.disabled || loading;
    const TabIcon =
      Icons[(StartIcon as unknown as keyof typeof Icons) || "chevronDown"];
    return (
      <div
        className={(cn({ variant, size, color }), className)}
        ref={ref}
        {...props}
      >
        {StartIcon && (
          <TabIcon
            className={cn("text-subtle h-4 w-4", disabled && "text-subtle")}
          />
        )}
        {props.children}
      </div>
    );
  },
);
Button.displayName = "Button";

export { Button };
