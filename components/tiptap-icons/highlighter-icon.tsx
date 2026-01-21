"use client"

import { memo } from "react"
import { Highlighter } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const HighlighterIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <Highlighter className={className} size={size} weight={weight} {...props} />
})

HighlighterIcon.displayName = "HighlighterIcon"
