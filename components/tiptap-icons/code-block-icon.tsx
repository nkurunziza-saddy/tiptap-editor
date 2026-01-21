"use client"

import { memo } from "react"
import { CodeBlockIcon as CodeBlockIconPhosphor } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const CodeBlockIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <CodeBlockIconPhosphor className={className} size={size} weight={weight} {...props} />
})

CodeBlockIcon.displayName = "CodeBlockIcon"
