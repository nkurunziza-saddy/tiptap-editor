"use client"

import { memo } from "react"
import { TextSubscript } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const SubscriptIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextSubscript className={className} size={size} weight={weight} {...props} />
})

SubscriptIcon.displayName = "SubscriptIcon"
