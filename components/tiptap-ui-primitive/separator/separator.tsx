"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const separatorVariants = cva("shrink-0 bg-[var(--tt-separator-color)]", {
  variants: {
    orientation: {
      horizontal: "h-px w-full my-2",
      vertical: "h-6 w-px",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface SeparatorProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

function Separator({
  decorative,
  orientation = "vertical",
  className,
  ref,
  ...props
}: SeparatorProps) {
  const ariaOrientation = orientation === "vertical" ? orientation : undefined;
  const semanticProps = decorative
    ? { role: "none" }
    : { "aria-orientation": ariaOrientation, role: "separator" };

  return (
    <div
      data-slot="separator"
      data-orientation={orientation}
      className={cn(separatorVariants({ orientation }), className)}
      ref={ref}
      {...semanticProps}
      {...props}
    />
  );
}

export { Separator, separatorVariants };
