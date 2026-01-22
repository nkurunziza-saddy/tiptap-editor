"use client";

import { cn } from "@/lib/tiptap-utils";

export type Orientation = "horizontal" | "vertical";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation;
  decorative?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const separatorStyles = {
  base: "shrink-0 bg-[var(--tt-separator-color)]",
  horizontal: "h-px w-full my-2",
  vertical: "h-6 w-px",
};

export function Separator({
  decorative,
  orientation = "vertical",
  className,
  ref,
  ...divProps
}: SeparatorProps) {
  const ariaOrientation = orientation === "vertical" ? orientation : undefined;
  const semanticProps = decorative
    ? { role: "none" }
    : { "aria-orientation": ariaOrientation, role: "separator" };

  return (
    <div
      className={cn(
        separatorStyles.base,
        orientation === "horizontal"
          ? separatorStyles.horizontal
          : separatorStyles.vertical,
        className,
      )}
      data-orientation={orientation}
      {...semanticProps}
      {...divProps}
      ref={ref}
    />
  );
}
