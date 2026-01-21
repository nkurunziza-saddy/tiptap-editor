"use client"

import { forwardRef, Fragment, useMemo } from "react"

// --- Tiptap UI Primitive ---
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/tiptap-ui-primitive/tooltip"

// --- Lib ---
import { cn, parseShortcutKeys } from "@/lib/tiptap-utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  showTooltip?: boolean
  tooltip?: React.ReactNode
  shortcutKeys?: string
}

export const ShortcutDisplay: React.FC<{ shortcuts: string[] }> = ({
  shortcuts,
}) => {
  if (shortcuts.length === 0) return null

  return (
    <div>
      {shortcuts.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && <kbd>+</kbd>}
          <kbd>{key}</kbd>
        </Fragment>
      ))}
    </div>
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      tooltip,
      showTooltip = true,
      shortcutKeys,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const shortcuts = useMemo<string[]>(
      () => parseShortcutKeys({ shortcutKeys }),
      [shortcutKeys]
    )

    const buttonClasses = cn(
      // Base styles
      "tiptap-button",
      "text-sm font-medium leading-[1.15]",
      "h-8 min-w-8 p-2 gap-1",
      "flex items-center justify-center",
      "border-none rounded-lg",
      "transition-[background,color,opacity] duration-200",
      "outline-none",
      // Colors via CSS variables (defined in editor.css)
      "bg-[var(--tt-button-default-bg-color)]",
      "text-[var(--tt-button-default-text-color)]",
      // Hover state
      "hover:bg-[var(--tt-button-hover-bg-color)]",
      "hover:text-[var(--tt-button-hover-text-color)]",
      // Focus visible
      "focus-visible:outline-none",
      // Data attribute states handled via CSS in editor.css
      // Disabled
      "disabled:bg-[var(--tt-button-disabled-bg-color)]",
      "disabled:text-[var(--tt-button-disabled-text-color)]",
      className
    )

    if (!tooltip || !showTooltip) {
      return (
        <button
          className={buttonClasses}
          ref={ref}
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </button>
      )
    }

    return (
      <Tooltip delay={200}>
        <TooltipTrigger
          className={buttonClasses}
          ref={ref}
          aria-label={ariaLabel}
          {...props}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>
          {tooltip}
          <ShortcutDisplay shortcuts={shortcuts} />
        </TooltipContent>
      </Tooltip>
    )
  }
)

Button.displayName = "Button"

export const ButtonGroup = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, children, orientation = "vertical", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "tiptap-button-group",
        "flex gap-0.5",
        orientation === "vertical" ? "flex-col items-stretch" : "flex-row items-center",
        className
      )}
      data-orientation={orientation}
      role="group"
      {...props}
    >
      {children}
    </div>
  )
})
ButtonGroup.displayName = "ButtonGroup"

export default Button
