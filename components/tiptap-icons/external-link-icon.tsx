"use client"

import { memo } from "react"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const ExternalLinkIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <ArrowSquareOutIcon className={className} size={size} weight={weight} {...props} />
})

ExternalLinkIcon.displayName = "ExternalLinkIcon"
