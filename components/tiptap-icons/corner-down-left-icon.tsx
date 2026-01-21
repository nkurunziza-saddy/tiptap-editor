"use client"

import { memo } from "react"
import { ArrowElbowDownLeftIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const CornerDownLeftIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <ArrowElbowDownLeftIcon className={className} size={size} weight={weight} {...props} />
})

CornerDownLeftIcon.displayName = "CornerDownLeftIcon"
