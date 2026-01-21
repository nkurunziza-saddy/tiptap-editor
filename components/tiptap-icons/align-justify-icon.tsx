"use client"

import { memo } from "react"
import { TextAlignJustifyIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const AlignJustifyIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextAlignJustifyIcon className={className} size={size} weight={weight} {...props} />
})

AlignJustifyIcon.displayName = "AlignJustifyIcon"
