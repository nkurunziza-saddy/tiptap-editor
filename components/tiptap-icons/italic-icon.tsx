"use client"

import { memo } from "react"
import { TextItalic } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const ItalicIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <TextItalic className={className} size={size} weight={weight} {...props} />
})

ItalicIcon.displayName = "ItalicIcon"
