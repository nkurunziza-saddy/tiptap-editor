"use client";

import { cn } from "@/lib/tiptap-utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "ghost" | "white" | "gray" | "green" | "default";
  size?: "default" | "small" | "large";
  appearance?: "default" | "subdued" | "emphasized";
  trimText?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const badgeBaseStyles = [
  "text-[0.625rem] font-bold leading-tight",
  "h-5 min-w-5 px-1",
  "flex items-center justify-center",
  "border border-[var(--tt-badge-border-color)]",
  "rounded-md",
  "bg-[var(--tt-badge-bg-color)]",
  "text-[var(--tt-badge-text-color)]",
  "transition-all duration-200",
].join(" ");

const badgeSizeStyles = {
  default: "h-5 min-w-5 px-1 text-[0.625rem] rounded-md",
  small: "h-4 min-w-4 px-0.5 text-[0.5rem] rounded-sm",
  large: "h-6 min-w-6 px-1.5 text-xs rounded-lg",
};

const badgeAppearanceStyles = {
  default: "",
  emphasized:
    "bg-[var(--tt-badge-bg-color-emphasized)] border-[var(--tt-badge-border-color-emphasized)] text-[var(--tt-badge-text-color-emphasized)]",
  subdued:
    "bg-[var(--tt-badge-bg-color-subdued)] border-[var(--tt-badge-border-color-subdued)] text-[var(--tt-badge-text-color-subdued)]",
};

export function Badge({
  variant,
  size = "default",
  appearance = "default",
  trimText = false,
  className,
  children,
  ref,
  ...props
}: BadgeProps) {
  return (
    <div
      ref={ref}
      className={cn(
        badgeBaseStyles,
        badgeSizeStyles[size],
        badgeAppearanceStyles[appearance],
        trimText && "overflow-hidden text-ellipsis",
        className,
      )}
      data-style={variant}
      data-size={size}
      data-appearance={appearance}
      {...props}
    >
      {children}
    </div>
  );
}

export default Badge;
