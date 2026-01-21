"use client"

import { memo } from "react"
import { CodeBlock } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const CodeBlockIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <CodeBlock className={className} size={size} weight={weight} {...props} />
})

CodeBlockIcon.displayName = "CodeBlockIcon"
