"use client";

import { cn } from "@/lib/tiptap-utils";

const inputStyles = {
  base: [
    "block w-full h-8",
    "text-sm font-normal leading-relaxed",
    "px-2 py-1.5",
    "rounded-md",
    "bg-transparent",
    "appearance-none outline-none",
    "placeholder:text-[var(--tiptap-input-placeholder)]",
  ].join(" "),
  clamp: "min-w-48 pr-0 truncate focus:overflow-visible focus:text-clip",
  group: "relative flex flex-wrap items-stretch",
};

interface InputProps extends React.ComponentProps<"input"> {
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({ className, type, ref, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(inputStyles.base, className)}
      ref={ref}
      {...props}
    />
  );
}

interface InputGroupProps extends React.ComponentProps<"div"> {
  ref?: React.Ref<HTMLDivElement>;
}

export function InputGroup({
  className,
  children,
  ref,
  ...props
}: InputGroupProps) {
  return (
    <div className={cn(inputStyles.group, className)} ref={ref} {...props}>
      {children}
    </div>
  );
}
