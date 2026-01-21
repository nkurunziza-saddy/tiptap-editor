"use client"

import { cn } from "@/lib/utils"


function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
       "bg-transparent border-none   aria-invalid:ring-destructive aria-invalid:border-destructive h-8 border rounded-xl px-2 py-1 text-base transition-colors md:text-sm placeholder:text-muted-foreground w-full min-w-0 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    
        className
      )}
      {...props}
    />
  )
}

function InputGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex flex-wrap items-stretch",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Input, InputGroup }

