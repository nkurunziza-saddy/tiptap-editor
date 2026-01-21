"use client"

import { memo } from "react"
import { X } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const CloseIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <X className={className} size={size} weight={weight} {...props} />
})

CloseIcon.displayName = "CloseIcon"
