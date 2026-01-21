"use client"

import { memo } from "react"
import { TextAlignLeftIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const AlignLeftIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextAlignLeftIcon className={className} size={size} weight={weight} {...props} />
})

AlignLeftIcon.displayName = "AlignLeftIcon"
