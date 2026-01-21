import { cn } from "@/lib/utils"

function ButtonGroup({
  className,
  children,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
    orientation?: "horizontal" | "vertical"
}) {
    return (
      <div
      className={cn(
        "flex gap-0.5 align-middle",
        orientation === "vertical" ? "flex-col items-start min-w-max" : "flex-row items-center",
        className
      )}
      data-orientation={orientation}
      role="group"
      {...props}
    >
      {children}
    </div>   
    )

}

export { ButtonGroup }
