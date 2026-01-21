"use client"

import { memo } from "react"
import { MoonStars } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const MoonStarIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <MoonStars className={className} size={size} weight={weight} {...props} />
})

MoonStarIcon.displayName = "MoonStarIcon"
