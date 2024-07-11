import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { LinkProps } from "next/link";
import Link from "next/link";
import React, { forwardRef } from "react";

import { Icons } from "../../icons";
import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition cursor-pointer",
  {
    variants: {
      variant: {
        button: "",
        icon: "flex justify-center",
      },
      color: {
        primary:
          "bg-strong text-white hover:bg-surface focus:ring-offset-1 focus:ring-sub disabled:bg-soft focus:ring-2 focus-visible:outline-none",
        secondary:
          "bg-white text-strong border-soft hover:bg-weak focus:ring-soft focus:ring-offset-1 disabled:bg-soft disabled:text-soft disabled:hover:border-soft border focus:ring-2 focus-visible:outline-none",
        minimal:
          "text-emphasis hover:bg-muted focus-visible:ring-offset focus-visible:ring-emphasis disabled:text-muted disabled:hover:bg-muted disabled:text-muted focus-visible:outline-none focus-visible:ring-2",
        destructive:
          "bg-default text-emphasis border-default hover:bg-error focus:bg-error focus:ring-offset border hover:border-red-100 hover:text-red-700 focus:border-red-100 focus:text-red-700 focus:ring-2 focus:ring-red-700 focus-visible:outline-none disabled:border-red-200 disabled:bg-red-100 disabled:text-red-700 disabled:hover:border-red-200",
      },
      size: {
        icon: "h-8 w-8 px-0 py-0",
        sm: "px-3 py-2 leading-4",
        base: "h-9 px-4 py-2.5",
      },
    },
    defaultVariants: {
      variant: "button",
      color: "primary",
      size: "base",
    },
  },
);

type InferredVariantProps = VariantProps<typeof buttonVariants>;
export type ButtonColor = NonNullable<InferredVariantProps["color"]>;

export type ButtonBaseProps = {
  onClick?: () => void;
  CustomStartIcon?: React.ReactNode;
  StartIcon?: keyof typeof Icons;
  EndIcon?: keyof typeof Icons;
  disabled?: boolean;
} & Omit<InferredVariantProps, "color"> & {
    color?: ButtonColor;
  };

export type ButtonProps = ButtonBaseProps &
  (
    | (Omit<JSX.IntrinsicElements["a"], "href" | "onClick" | "ref"> & LinkProps)
    | (Omit<JSX.IntrinsicElements["button"], "onClick" | "ref"> & {
        href?: never;
      })
  );

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(function Button(props: ButtonProps, forwardedRef) {
  const {
    color = "primary",
    size,
    variant = "button",
    type = "button",
    CustomStartIcon,
    StartIcon,
    EndIcon,
    ...passThroughProps
  } = props;
  const disabled = props.disabled;
  const isLink = typeof props.href !== "undefined";
  const elementType = isLink ? "a" : "button";
  const Icon = Icons[StartIcon as keyof typeof Icons];
  const IconEnd = Icons[EndIcon as keyof typeof Icons];

  const element = React.createElement(
    elementType,
    {
      ...passThroughProps,
      ref: forwardedRef,
      disabled,
      type: isLink ? type : undefined,
      className: cn(
        buttonVariants({ color, size, variant, className: props.className }),
      ),
      onClick: disabled
        ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault();
          }
        : props.onClick,
    },
    <>
      {CustomStartIcon ||
        (StartIcon && (
          <>
            <Icon
              className={cn(
                variant === "icon" && "h-4 w-4",
                variant === "button" && "me-2 h-4 w-4 stroke-[1.5px]",
              )}
            />
          </>
        ))}
      {props.children}
      {EndIcon && (
        <>
          <IconEnd
            className={cn(
              variant === "icon" && "h-4 w-4",
              variant === "button" && "ms-2 h-4 w-4 stroke-[1.5px]",
            )}
          />
        </>
      )}
    </>,
  );

  return props.href ? (
    <Link href={props.href} passHref legacyBehavior>
      {element}
    </Link>
  ) : (
    element
  );
});
