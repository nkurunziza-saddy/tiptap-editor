"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "text-[0.625rem] font-bold leading-tight",
    "border rounded-md",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--tt-badge-bg-color)]",
          "border-[var(--tt-badge-border-color)]",
          "text-[var(--tt-badge-text-color)]",
        ],
        ghost: "bg-transparent border-transparent",
        emphasized: [
          "bg-[var(--tt-badge-bg-color-emphasized)]",
          "border-[var(--tt-badge-border-color-emphasized)]",
          "text-[var(--tt-badge-text-color-emphasized)]",
        ],
        subdued: [
          "bg-[var(--tt-badge-bg-color-subdued)]",
          "border-[var(--tt-badge-border-color-subdued)]",
          "text-[var(--tt-badge-text-color-subdued)]",
        ],
      },
      size: {
        default: "h-5 min-w-5 px-1",
        sm: "h-4 min-w-4 px-0.5 text-[0.5rem] rounded-sm",
        lg: "h-6 min-w-6 px-1.5 text-xs rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  trimText?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

function Badge({
  variant,
  size,
  trimText = false,
  className,
  children,
  ref,
  ...props
}: BadgeProps) {
  return (
    <div
      data-slot="badge"
      ref={ref}
      className={cn(
        badgeVariants({ variant, size }),
        trimText && "overflow-hidden text-ellipsis",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
