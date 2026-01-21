"use client"

import { memo } from "react"
import { Sun } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const SunIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <Sun className={className} size={size} weight={weight} {...props} />
})

SunIcon.displayName = "SunIcon"
