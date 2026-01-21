"use client"

import { memo } from "react"
import { ImageSquare } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const ImagePlusIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <ImageSquare className={className} size={size} weight={weight} {...props} />
})

ImagePlusIcon.displayName = "ImagePlusIcon"
