"use client"

import { memo } from "react"
import { TextHOne } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const HeadingOneIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextHOne className={className} size={size} weight={weight} {...props} />
})

HeadingOneIcon.displayName = "HeadingOneIcon"
