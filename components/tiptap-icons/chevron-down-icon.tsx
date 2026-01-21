"use client"

import { memo } from "react"
import { CaretDownIcon } from "@phosphor-icons/react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

export const ChevronDownIcon = memo(({ className, size = 24, weight = "regular", ...props }: IconProps) => {
  return <CaretDownIcon className={className} size={size} weight={weight} {...props} />
})

ChevronDownIcon.displayName = "ChevronDownIcon"
