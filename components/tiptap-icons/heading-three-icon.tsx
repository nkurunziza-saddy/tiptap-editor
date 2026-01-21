"use client"

import { memo } from "react"
import { TextHThree } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const HeadingThreeIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextHThree className={className} size={size} weight={weight} {...props} />
})

HeadingThreeIcon.displayName = "HeadingThreeIcon"
