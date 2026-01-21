"use client"

import { memo } from "react"
import { TrashIcon as TrashIconPhosphor } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const TrashIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TrashIconPhosphor className={className} size={size} weight={weight} {...props} />
})

TrashIcon.displayName = "TrashIcon"
