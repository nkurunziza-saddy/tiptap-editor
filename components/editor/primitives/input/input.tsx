"use client";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva([
  "block w-full h-8",
  "text-sm font-normal leading-relaxed",
  "px-2 py-1.5",
  "rounded-md",
  "bg-transparent",
  "appearance-none outline-none",
  "placeholder:text-[var(--editor-input-placeholder)]",
]);

const inputGroupVariants = cva("relative flex flex-wrap items-stretch");

type InputProps = React.ComponentProps<"input"> & {
  ref?: React.Ref<HTMLInputElement>;
};

type InputGroupProps = React.ComponentProps<"div"> & {
  ref?: React.Ref<HTMLDivElement>;
};

function Input({ className, type, ref, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(inputVariants(), className)}
      ref={ref}
      {...props}
    />
  );
}

function InputGroup({ className, children, ref, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={cn(inputGroupVariants(), className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
}

export { Input, InputGroup, inputVariants, inputGroupVariants };
