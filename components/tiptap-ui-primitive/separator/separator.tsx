"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/tiptap-utils"

export type Orientation = "horizontal" | "vertical"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation
  decorative?: boolean
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ decorative, orientation = "vertical", className, ...divProps }, ref) => {
    const ariaOrientation = orientation === "vertical" ? orientation : undefined
    const semanticProps = decorative
      ? { role: "none" }
      : { "aria-orientation": ariaOrientation, role: "separator" }

    return (
      <div
        className={cn(
          "tiptap-separator shrink-0 bg-[var(--tt-gray-light-a-200)] dark:bg-[var(--tt-gray-dark-a-200)]",
          orientation === "horizontal" ? "h-[1px] w-full my-2" : "h-6 w-[1px]",
          className
        )}
        data-orientation={orientation}
        {...semanticProps}
        {...divProps}
        ref={ref}
      />
    )
  }
)

Separator.displayName = "Separator"
