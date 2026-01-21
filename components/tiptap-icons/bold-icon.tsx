"use client"

import { memo } from "react"
import { TextB } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const BoldIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextB className={className} size={size} weight={weight} {...props} />
})

BoldIcon.displayName = "BoldIcon"
