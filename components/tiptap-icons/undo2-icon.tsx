"use client"

import { memo } from "react"
import { ArrowUUpLeft } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const Undo2Icon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <ArrowUUpLeft className={className} size={size} weight={weight} {...props} />
})

Undo2Icon.displayName = "Undo2Icon"
