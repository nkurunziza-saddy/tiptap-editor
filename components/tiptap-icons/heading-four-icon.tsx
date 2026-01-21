"use client"

import { memo } from "react"
import { TextHFour } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const HeadingFourIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextHFour className={className} size={size} weight={weight} {...props} />
})

HeadingFourIcon.displayName = "HeadingFourIcon"
