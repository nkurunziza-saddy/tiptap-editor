"use client"

import { memo } from "react"
import { Code } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const Code2Icon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <Code className={className} size={size} weight={weight} {...props} />
})

Code2Icon.displayName = "Code2Icon"
