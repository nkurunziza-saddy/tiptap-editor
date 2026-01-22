"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva([
  "rounded-2xl shadow-lg",
  "bg-[var(--editor-card-bg-color)]",
  "border border-[var(--editor-card-border-color)]",
  "flex flex-col items-center",
  "outline-none",
  "relative min-w-0 break-words bg-clip-border",
]);

const cardHeaderVariants = cva([
  "p-1.5 flex-none",
  "flex items-center justify-between",
  "w-full",
  "border-b border-[var(--editor-card-border-color)]",
]);

const cardBodyVariants = cva("p-1.5 flex-1 overflow-y-auto");

const cardFooterVariants = cva([
  "p-1.5 flex-none w-full",
  "border-t border-[var(--editor-card-border-color)]",
]);

const cardItemGroupVariants = cva("relative flex align-middle min-w-max", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center gap-1",
      vertical: "flex-col justify-center",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const cardGroupLabelVariants = cva([
  "pt-3 px-2 pb-1",
  "text-xs font-semibold leading-normal capitalize",
  "text-[var(--editor-card-group-label-color)]",
]);

// Types
type CardProps = React.ComponentProps<"div"> & {
  ref?: React.Ref<HTMLDivElement>;
};
type CardItemGroupProps = CardProps &
  VariantProps<typeof cardItemGroupVariants>;

// Components
function Card({ className, ref, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      ref={ref}
      className={cn(cardVariants(), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ref, ...props }: CardProps) {
  return (
    <div
      data-slot="card-header"
      ref={ref}
      className={cn(cardHeaderVariants(), className)}
      {...props}
    />
  );
}

function CardBody({ className, ref, ...props }: CardProps) {
  return (
    <div
      data-slot="card-body"
      ref={ref}
      className={cn(cardBodyVariants(), className)}
      {...props}
    />
  );
}

function CardFooter({ className, ref, ...props }: CardProps) {
  return (
    <div
      data-slot="card-footer"
      ref={ref}
      className={cn(cardFooterVariants(), className)}
      {...props}
    />
  );
}

function CardItemGroup({
  className,
  orientation,
  ref,
  ...props
}: CardItemGroupProps) {
  return (
    <div
      data-slot="card-item-group"
      data-orientation={orientation}
      ref={ref}
      className={cn(cardItemGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

function CardGroupLabel({ className, ref, ...props }: CardProps) {
  return (
    <div
      data-slot="card-group-label"
      ref={ref}
      className={cn(cardGroupLabelVariants(), className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardItemGroup,
  CardGroupLabel,
  cardVariants,
};
