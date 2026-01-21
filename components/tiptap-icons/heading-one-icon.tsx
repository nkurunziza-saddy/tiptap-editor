"use client"

import { memo } from "react"
import { TextHOneIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const HeadingOneIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextHOneIcon className={className} size={size} weight={weight} {...props} />
})

HeadingOneIcon.displayName = "HeadingOneIcon"
