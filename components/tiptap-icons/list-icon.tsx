"use client"

import { memo } from "react"
import { List } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const ListIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <List className={className} size={size} weight={weight} {...props} />
})

ListIcon.displayName = "ListIcon"
