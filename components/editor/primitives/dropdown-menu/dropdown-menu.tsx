"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dropdownMenuContentVariants = cva([
  "z-50 outline-none",
  "origin-[var(--radix-dropdown-menu-content-transform-origin)]",
  "max-h-[var(--radix-dropdown-menu-content-available-height)]",

  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",

  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2",
  "data-[side=top]:slide-in-from-bottom-2",
]);

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return (
    <DropdownMenuPrimitive.Root
      data-slot="dropdown-menu"
      modal={false}
      {...props}
    />
  );
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal {...props} />;
}

function DropdownMenuTrigger({
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> & {
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      ref={ref}
      {...props}
    />
  );
}

const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuItem = DropdownMenuPrimitive.Item;
const DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger;

interface DropdownMenuSubContentProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.SubContent
> {
  portal?: boolean | React.ComponentProps<typeof DropdownMenuPortal>;
  ref?: React.Ref<HTMLDivElement>;
}

function DropdownMenuSubContent({
  className,
  portal = true,
  ref,
  ...props
}: DropdownMenuSubContentProps) {
  const content = (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-subcontent"
      ref={ref}
      className={cn(dropdownMenuContentVariants(), className)}
      {...props}
    />
  );

  return portal ? (
    <DropdownMenuPortal {...(typeof portal === "object" ? portal : {})}>
      {content}
    </DropdownMenuPortal>
  ) : (
    content
  );
}

interface DropdownMenuContentProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
> {
  portal?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  portal = false,
  ref,
  ...props
}: DropdownMenuContentProps) {
  const content = (
    <DropdownMenuPrimitive.Content
      data-slot="dropdown-menu-content"
      ref={ref}
      sideOffset={sideOffset}
      onCloseAutoFocus={(e) => e.preventDefault()}
      className={cn(dropdownMenuContentVariants(), className)}
      {...props}
    />
  );

  return portal ? (
    <DropdownMenuPortal {...(typeof portal === "object" ? portal : {})}>
      {content}
    </DropdownMenuPortal>
  ) : (
    content
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  dropdownMenuContentVariants,
};
