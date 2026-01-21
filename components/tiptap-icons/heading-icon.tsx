"use client"

import { memo } from "react"
import { TextHIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const HeadingIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextHIcon className={className} size={size} weight={weight} {...props} />
})

HeadingIcon.displayName = "HeadingIcon"
