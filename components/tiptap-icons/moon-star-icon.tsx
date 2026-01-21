"use client"

import { memo } from "react"
import { MoonStarsIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const MoonStarIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <MoonStarsIcon className={className} size={size} weight={weight} {...props} />
})

MoonStarIcon.displayName = "MoonStarIcon"
