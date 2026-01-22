"use client";

import { cn } from "@/lib/tiptap-utils";

// Card styles
const cardStyles = {
  base: [
    "rounded-2xl shadow-lg",
    "bg-[var(--tiptap-card-bg-color)]",
    "border border-[var(--tiptap-card-border-color)]",
    "flex flex-col items-center",
    "outline-none",
    "relative min-w-0 break-words bg-clip-border",
  ].join(" "),
  header: [
    "p-1.5 flex-none",
    "flex items-center justify-between",
    "w-full",
    "border-b border-[var(--tiptap-card-border-color)]",
  ].join(" "),
  body: "p-1.5 flex-1 overflow-y-auto",
  footer:
    "p-1.5 flex-none w-full border-t border-[var(--tiptap-card-border-color)]",
  itemGroup: {
    base: "relative flex align-middle min-w-max",
    vertical: "flex-col justify-center",
    horizontal: "flex-row items-center gap-1",
  },
  groupLabel:
    "pt-3 px-2 pb-1 text-xs font-semibold capitalize text-[var(--tiptap-card-group-label-color)]",
};

interface CardProps extends React.ComponentProps<"div"> {
  ref?: React.Ref<HTMLDivElement>;
}

export function Card({ className, ref, ...props }: CardProps) {
  return (
    <div ref={ref} className={cn(cardStyles.base, className)} {...props} />
  );
}

export function CardHeader({ className, ref, ...props }: CardProps) {
  return (
    <div ref={ref} className={cn(cardStyles.header, className)} {...props} />
  );
}

export function CardBody({ className, ref, ...props }: CardProps) {
  return (
    <div ref={ref} className={cn(cardStyles.body, className)} {...props} />
  );
}

interface CardItemGroupProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  ref?: React.Ref<HTMLDivElement>;
}

export function CardItemGroup({
  className,
  orientation = "vertical",
  ref,
  ...props
}: CardItemGroupProps) {
  return (
    <div
      ref={ref}
      data-orientation={orientation}
      className={cn(
        cardStyles.itemGroup.base,
        orientation === "horizontal"
          ? cardStyles.itemGroup.horizontal
          : cardStyles.itemGroup.vertical,
        className,
      )}
      {...props}
    />
  );
}

export function CardGroupLabel({ className, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(cardStyles.groupLabel, className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ref, ...props }: CardProps) {
  return (
    <div ref={ref} className={cn(cardStyles.footer, className)} {...props} />
  );
}
