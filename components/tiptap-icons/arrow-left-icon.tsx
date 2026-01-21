"use client"

import { memo } from "react"
import { ArrowLeftIcon as ArrowLeftIconPhosphor } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const ArrowLeftIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <ArrowLeftIconPhosphor className={className} size={size} weight={weight} {...props} />
})

ArrowLeftIcon.displayName = "ArrowLeftIcon"
