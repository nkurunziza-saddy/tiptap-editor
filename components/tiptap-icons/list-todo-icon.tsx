"use client"

import { memo } from "react"
import { ListChecksIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const ListTodoIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <ListChecksIcon className={className} size={size} weight={weight} {...props} />
})

ListTodoIcon.displayName = "ListTodoIcon"
