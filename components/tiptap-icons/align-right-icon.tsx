"use client"

import { memo } from "react"
import { TextAlignRight } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const AlignRightIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextAlignRight className={className} size={size} weight={weight} {...props} />
})

AlignRightIcon.displayName = "AlignRightIcon"
