"use client"

import { memo } from "react"
import { TextHFive } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const HeadingFiveIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextHFive className={className} size={size} weight={weight} {...props} />
})

HeadingFiveIcon.displayName = "HeadingFiveIcon"
