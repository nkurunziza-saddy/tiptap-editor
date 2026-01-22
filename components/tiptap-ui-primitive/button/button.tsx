"use client";

import { Fragment, useMemo } from "react";

// --- Tiptap UI Primitive ---
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/tiptap-ui-primitive/tooltip";

// --- Lib ---
import { cn, parseShortcutKeys } from "@/lib/tiptap-utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  showTooltip?: boolean;
  tooltip?: React.ReactNode;
  shortcutKeys?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

// Base button styles converted from button.scss
const buttonBaseStyles = [
  // Layout & sizing
  "h-8 min-w-8 px-2",
  "flex items-center justify-center gap-0.5",
  "rounded-xl",
  // Typography
  "text-sm font-medium leading-tight",
  // Transitions
  "transition-all duration-200 ease-out",
  // Focus states
  "focus-visible:outline-none",
  // Default colors (light mode - using CSS vars for theming)
  "bg-[var(--tt-button-default-bg-color)]",
  "text-[var(--tt-button-default-text-color)]",
  // Hover states
  "hover:bg-[var(--tt-button-hover-bg-color)]",
  "hover:text-[var(--tt-button-hover-text-color)]",
  // Active state (data-active-state="on")
  "data-[active-state=on]:bg-[var(--tt-button-active-bg-color)]",
  "data-[active-state=on]:text-[var(--tt-button-active-text-color)]",
  // Disabled state
  "disabled:bg-[var(--tt-button-disabled-bg-color)]",
  "disabled:text-[var(--tt-button-disabled-text-color)]",
  "disabled:cursor-not-allowed",
  // Highlighted state (keyboard navigation)
  "data-[highlighted=true]:bg-[var(--tt-button-hover-bg-color)]",
  "data-[highlighted=true]:text-[var(--tt-button-hover-text-color)]",
  // Ghost style variant (data-style="ghost")
  "data-[style=ghost]:bg-transparent",
  "data-[style=ghost]:hover:bg-[var(--tt-button-hover-bg-color)]",
  "data-[style=ghost]:data-[active-state=on]:bg-[var(--tt-button-active-bg-color)]",
].join(" ");

// Icon styles
const iconStyles = "size-4 shrink-0 text-[var(--tt-button-default-icon-color)]";
const iconSubStyles =
  "size-4 shrink-0 text-[var(--tt-button-default-icon-sub-color)]";
const dropdownArrowStyles =
  "size-3 shrink-0 text-[var(--tt-button-default-dropdown-arrows-color)]";
const dropdownSmallStyles =
  "size-2.5 shrink-0 text-[var(--tt-button-default-dropdown-arrows-color)]";

// Button group styles
const buttonGroupStyles = {
  base: "relative flex align-middle",
  vertical:
    "flex-col items-start justify-center min-w-max [&>.tiptap-button]:w-full",
  horizontal: "flex-row items-center gap-0.5",
};

export function ShortcutDisplay({ shortcuts }: { shortcuts: string[] }) {
  if (shortcuts.length === 0) return null;

  return (
    <div className="flex items-center gap-0.5">
      {shortcuts.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && <kbd className="text-xs opacity-60">+</kbd>}
          <kbd className="text-xs font-medium">{key}</kbd>
        </Fragment>
      ))}
    </div>
  );
}

export function Button({
  className,
  children,
  tooltip,
  showTooltip = true,
  shortcutKeys,
  "aria-label": ariaLabel,
  ref,
  ...props
}: ButtonProps) {
  const shortcuts = useMemo<string[]>(
    () => parseShortcutKeys({ shortcutKeys }),
    [shortcutKeys],
  );

  const buttonElement = (
    <button
      className={cn(buttonBaseStyles, className)}
      ref={ref}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );

  if (!tooltip || !showTooltip) {
    return buttonElement;
  }

  return (
    <Tooltip delay={200}>
      <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
      <TooltipContent>
        {tooltip}
        <ShortcutDisplay shortcuts={shortcuts} />
      </TooltipContent>
    </Tooltip>
  );
}

// Export icon class names for use in components
export const buttonIconClass = iconStyles;
export const buttonIconSubClass = iconSubStyles;
export const buttonDropdownArrowClass = dropdownArrowStyles;
export const buttonDropdownSmallClass = dropdownSmallStyles;

export interface ButtonGroupProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  ref?: React.Ref<HTMLDivElement>;
}

export function ButtonGroup({
  className,
  children,
  orientation = "vertical",
  ref,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      ref={ref}
      className={cn(
        buttonGroupStyles.base,
        orientation === "vertical"
          ? buttonGroupStyles.vertical
          : buttonGroupStyles.horizontal,
        className,
      )}
      data-orientation={orientation}
      role="group"
      {...props}
    >
      {children}
    </div>
  );
}

export default Button;
