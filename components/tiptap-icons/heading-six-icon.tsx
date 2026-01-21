"use client"

import { memo } from "react"
import { TextHSixIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const HeadingSixIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextHSixIcon className={className} size={size} weight={weight} {...props} />
})

HeadingSixIcon.displayName = "HeadingSixIcon"
