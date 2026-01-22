"use client";

import { Fragment, useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { parseShortcutKeys } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/editor/primitives/tooltip";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-0.5",
    "rounded-lg border-none",
    "text-sm font-medium leading-tight",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--editor-button-default-bg-color)]",
          "text-[var(--editor-button-default-text-color)]",
          "hover:bg-[var(--editor-button-hover-bg-color)]",
          "hover:text-[var(--editor-button-hover-text-color)]",
          "data-[active-state=on]:bg-[var(--editor-button-active-bg-color)]",
          "data-[active-state=on]:text-[var(--editor-button-active-text-color)]",
        ],
        ghost: [
          "bg-transparent",
          "text-[var(--editor-button-default-text-color)]",
          "hover:bg-[var(--editor-button-hover-bg-color)]",
          "hover:text-[var(--editor-button-hover-text-color)]",
          "data-[active-state=on]:bg-[var(--editor-button-active-bg-color)]",
          "data-[active-state=on]:text-[var(--editor-button-active-text-color)]",
        ],
        primary: [
          "bg-[var(--editor-brand-color-500)]",
          "text-white",
          "hover:bg-[var(--editor-brand-color-600)]",
        ],
      },
      size: {
        default: "h-8 min-w-8 px-2",
        sm: "h-6 min-w-6 px-1.5 text-xs",
        lg: "h-10 min-w-10 px-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  showTooltip?: boolean;
  tooltip?: React.ReactNode;
  shortcutKeys?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

function ShortcutDisplay({ shortcuts }: { shortcuts: string[] }) {
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

function Button({
  className,
  variant,
  size,
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
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
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

const buttonGroupVariants = cva("relative flex align-middle", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center gap-0.5",
      vertical:
        "flex-col items-start justify-center min-w-max [&>button]:w-full",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

interface ButtonGroupProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  ref?: React.Ref<HTMLDivElement>;
}

function ButtonGroup({
  className,
  orientation,
  children,
  ref,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      data-orientation={orientation}
      role="group"
      className={cn(buttonGroupVariants({ orientation, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
}

export { Button, ButtonGroup, buttonVariants, buttonGroupVariants };
