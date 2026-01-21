"use client"

import { memo } from "react"
import { ListIcon as ListIconPhosphor } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const ListIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <ListIconPhosphor className={className} size={size} weight={weight} {...props} />
})

ListIcon.displayName = "ListIcon"
