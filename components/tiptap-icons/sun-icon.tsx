"use client"

import { memo } from "react"
import { SunIcon as SunIconPhosphor } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const SunIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <SunIconPhosphor className={className} size={size} weight={weight} {...props} />
})

SunIcon.displayName = "SunIcon"
