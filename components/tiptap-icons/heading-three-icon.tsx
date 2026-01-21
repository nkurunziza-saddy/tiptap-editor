"use client"

import { memo } from "react"
import { TextHThreeIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const HeadingThreeIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextHThreeIcon className={className} size={size} weight={weight} {...props} />
})

HeadingThreeIcon.displayName = "HeadingThreeIcon"
