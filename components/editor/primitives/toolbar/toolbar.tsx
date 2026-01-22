"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Separator } from "@/components/editor/primitives/separator";
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { useComposedRef } from "@/hooks/use-composed-ref";
import { cn } from "@/lib/utils";

const toolbarVariants = cva("flex items-center gap-1", {
  variants: {
    variant: {
      fixed: [
        "sticky top-0 z-10",
        "w-full min-h-11",
        "bg-[var(--editor-toolbar-bg-color)]",
        "border-b border-[var(--editor-toolbar-border-color)]",
        "px-2",
        "overflow-x-auto overscroll-x-contain",
        "scrollbar-none",
        // Mobile styles
        "max-[480px]:absolute max-[480px]:top-auto",
        "max-[480px]:h-[calc(2.75rem+env(safe-area-inset-bottom,0px))]",
        "max-[480px]:border-t max-[480px]:border-b-0",
        "max-[480px]:pb-[env(safe-area-inset-bottom,0px)]",
        "max-[480px]:flex-nowrap max-[480px]:justify-start",
      ],
      floating: [
        "p-0.5",
        "rounded-xl",
        "border border-[var(--editor-toolbar-border-color)]",
        "bg-[var(--editor-toolbar-bg-color)]",
        "shadow-lg",
        "outline-none overflow-hidden",
        // Plain variant
        "data-[plain=true]:p-0 data-[plain=true]:rounded-none",
        "data-[plain=true]:border-none data-[plain=true]:shadow-none data-[plain=true]:bg-transparent",
        // Mobile
        "max-[480px]:w-full max-[480px]:rounded-none",
        "max-[480px]:border-none max-[480px]:shadow-none",
      ],
    },
  },
  defaultVariants: {
    variant: "fixed",
  },
});

const toolbarGroupVariants = cva("flex items-center gap-0.5 empty:hidden");

interface ToolbarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toolbarVariants> {
  ref?: React.Ref<HTMLDivElement>;
}

interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

interface ToolbarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

function useToolbarNavigation(
  toolbarRef: React.RefObject<HTMLDivElement | null>,
) {
  const [items, setItems] = useState<HTMLElement[]>([]);

  const collectItems = useCallback(() => {
    if (!toolbarRef.current) return [];
    return Array.from(
      toolbarRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [role="button"]:not([disabled]), [tabindex="0"]:not([disabled])',
      ),
    );
  }, [toolbarRef]);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;

    const updateItems = () => setItems(collectItems());

    updateItems();
    const observer = new MutationObserver(updateItems);
    observer.observe(toolbar, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [collectItems, toolbarRef]);

  const { selectedIndex } = useMenuNavigation<HTMLElement>({
    containerRef: toolbarRef,
    items,
    orientation: "horizontal",
    onSelect: (el) => el.click(),
    autoSelectFirstItem: false,
  });

  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (toolbar.contains(target))
        target.setAttribute("data-focus-visible", "true");
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (toolbar.contains(target))
        target.removeAttribute("data-focus-visible");
    };

    toolbar.addEventListener("focus", handleFocus, true);
    toolbar.addEventListener("blur", handleBlur, true);

    return () => {
      toolbar.removeEventListener("focus", handleFocus, true);
      toolbar.removeEventListener("blur", handleBlur, true);
    };
  }, [toolbarRef]);

  useEffect(() => {
    if (selectedIndex !== undefined && items[selectedIndex]) {
      items[selectedIndex].focus();
    }
  }, [selectedIndex, items]);
}

function Toolbar({
  children,
  className,
  variant,
  ref,
  ...props
}: ToolbarProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const composedRef = useComposedRef(toolbarRef, ref);
  useToolbarNavigation(toolbarRef);

  return (
    <div
      data-slot="toolbar"
      data-variant={variant}
      ref={composedRef}
      role="toolbar"
      aria-label="toolbar"
      className={cn(toolbarVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

function ToolbarGroup({
  children,
  className,
  ref,
  ...props
}: ToolbarGroupProps) {
  return (
    <div
      data-slot="toolbar-group"
      ref={ref}
      role="group"
      className={cn(toolbarGroupVariants(), className)}
      {...props}
    >
      {children}
    </div>
  );
}

function ToolbarSeparator({ ref, ...props }: ToolbarSeparatorProps) {
  return <Separator ref={ref} orientation="vertical" decorative {...props} />;
}

export {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  toolbarVariants,
  toolbarGroupVariants,
};
