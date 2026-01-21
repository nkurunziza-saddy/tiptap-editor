"use client"

import { memo } from "react"
import { ListNumbers } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const ListOrderedIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <ListNumbers className={className} size={size} weight={weight} {...props} />
})

ListOrderedIcon.displayName = "ListOrderedIcon"
