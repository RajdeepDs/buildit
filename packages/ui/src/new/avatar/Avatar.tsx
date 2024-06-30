import * as AvatarPrimitive from "@radix-ui/react-avatar";
import Link from "next/link";
import * as React from "react";

import { Icons } from "../../icons";
import { cn } from "../../lib/utils";

type Maybe<T> = T | null | undefined;

export type AvatarProps = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  imageSrc?: Maybe<string>;
  alt?: string;
  href?: string | null;
  fallback?: React.ReactNode;
  asChild?: boolean;
  "data-testid"?: string;
};

const sizesPropsBySize = {
  xs: "w-4 h-4 min-w-4 min-h-4 max-h-4", // 16px
  sm: "w-5 h-5 min-w-5 min-h-5", // 20px
  md: "w-6 h-6 min-w-6 min-h-6", // 24px
  lg: "w-8 h-8 min-w-8 min-h-8", // 32px
  xl: "w-9 h-9 min-w-9 min-h-9", // 36px
  "2xl": "w-12 h-12 min-w-12 min-h-12", // 48px
  "3xl": "w-16 h-16 min-w-16 min-h-16", // 64px
} as const;

export function Avatar(props: AvatarProps) {
  const { imageSrc, size = "md", alt, href } = props;
  let avatar = (
    <AvatarPrimitive.Root
      data-testid={props?.["data-testid"]}
      className={cn(
        "bg-emphasis item-center relative inline-flex aspect-square justify-center rounded-full align-top",
        props.className,
        sizesPropsBySize[size],
      )}
    >
      <>
        <AvatarPrimitive.Image
          src={imageSrc ?? undefined}
          alt={alt}
          className={cn("aspect-square rounded-full", sizesPropsBySize[size])}
        />
        <AvatarPrimitive.Fallback
          delayMs={600}
          asChild={props.asChild}
          className="flex h-full items-center justify-center"
        >
          <>
            {props.fallback ? (
              props.fallback
            ) : (
              <Icons.user size={size} className="text-emphasis" />
            )}
          </>
        </AvatarPrimitive.Fallback>
      </>
    </AvatarPrimitive.Root>
  );

  if (href) {
    avatar = (
      <Link data-testid="avatar-href" href={href}>
        {avatar}
      </Link>
    );
  }

  // TODO: Add tooltip
  return <>{avatar}</>;
}
