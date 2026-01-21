"use client"

import { memo } from "react"
import { TextAlignCenter } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const AlignCenterIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextAlignCenter className={className} size={size} weight={weight} {...props} />
})

AlignCenterIcon.displayName = "AlignCenterIcon"
