"use client"

import { memo } from "react"
import { Quotes } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const BlockquoteIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <Quotes className={className} size={size} weight={weight} {...props} />
})

BlockquoteIcon.displayName = "BlockquoteIcon"
