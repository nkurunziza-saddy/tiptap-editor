"use client"

import { memo } from "react"
import { Trash } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const TrashIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <Trash className={className} size={size} weight={weight} {...props} />
})

TrashIcon.displayName = "TrashIcon"
