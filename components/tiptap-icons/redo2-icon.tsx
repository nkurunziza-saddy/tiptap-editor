"use client"

import { memo } from "react"
import { ArrowUUpRightIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const Redo2Icon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <ArrowUUpRightIcon className={className} size={size} weight={weight} {...props} />
})

Redo2Icon.displayName = "Redo2Icon"
