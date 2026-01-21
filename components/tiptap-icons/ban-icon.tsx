"use client"

import { memo } from "react"
import { ProhibitIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const BanIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <ProhibitIcon className={className} size={size} weight={weight} {...props} />
})

BanIcon.displayName = "BanIcon"
