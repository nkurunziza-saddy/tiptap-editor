"use client"

import { memo } from "react"
import { TextStrikethroughIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const StrikeIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextStrikethroughIcon className={className} size={size} weight={weight} {...props} />
})

StrikeIcon.displayName = "StrikeIcon"
