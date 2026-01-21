"use client"

import { memo } from "react"
import { TextHTwoIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const HeadingTwoIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextHTwoIcon className={className} size={size} weight={weight} {...props} />
})

HeadingTwoIcon.displayName = "HeadingTwoIcon"
