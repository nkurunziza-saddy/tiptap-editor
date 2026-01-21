"use client"

import { memo } from "react"
import { LinkIcon as LinkIconPhosphor } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const LinkIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <LinkIconPhosphor className={className} size={size} weight={weight} {...props} />
})

LinkIcon.displayName = "LinkIcon"
