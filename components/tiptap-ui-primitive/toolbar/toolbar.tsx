"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Separator } from "@/components/tiptap-ui-primitive/separator";
import { cn } from "@/lib/tiptap-utils";
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { useComposedRef } from "@/hooks/use-composed-ref";

type BaseProps = React.HTMLAttributes<HTMLDivElement>;

interface ToolbarProps extends BaseProps {
  variant?: "floating" | "fixed";
  ref?: React.Ref<HTMLDivElement>;
}

const toolbarStyles = {
  base: "flex items-center gap-1",
  group: "flex items-center gap-0.5 empty:hidden",
  fixed: [
    "sticky top-0 z-10",
    "w-full min-h-11",
    "bg-[var(--tt-toolbar-bg-color)]",
    "border-b border-[var(--tt-toolbar-border-color)]",
    "px-2",
    "overflow-x-auto overscroll-x-contain",
    "scrollbar-none",
    // Mobile styles
    "max-[480px]:absolute max-[480px]:top-auto",
    "max-[480px]:h-[calc(2.75rem+env(safe-area-inset-bottom,0px))]",
    "max-[480px]:border-t max-[480px]:border-b-0",
    "max-[480px]:pb-[env(safe-area-inset-bottom,0px)]",
    "max-[480px]:flex-nowrap max-[480px]:justify-start",
  ].join(" "),
  floating: [
    "p-0.5",
    "rounded-2xl",
    "border border-[var(--tt-toolbar-border-color)]",
    "bg-[var(--tt-toolbar-bg-color)]",
    "shadow-lg",
    "outline-none overflow-hidden",
    // Plain variant
    "data-[plain=true]:p-0 data-[plain=true]:rounded-none",
    "data-[plain=true]:border-none data-[plain=true]:shadow-none data-[plain=true]:bg-transparent",
    // Mobile
    "max-[480px]:w-full max-[480px]:rounded-none",
    "max-[480px]:border-none max-[480px]:shadow-none",
  ].join(" "),
};

const useToolbarNavigation = (
  toolbarRef: React.RefObject<HTMLDivElement | null>,
) => {
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
};

export function Toolbar({
  children,
  className,
  variant = "fixed",
  ref,
  ...props
}: ToolbarProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const composedRef = useComposedRef(toolbarRef, ref);
  useToolbarNavigation(toolbarRef);

  return (
    <div
      ref={composedRef}
      role="toolbar"
      aria-label="toolbar"
      data-variant={variant}
      className={cn(
        toolbarStyles.base,
        variant === "fixed" ? toolbarStyles.fixed : toolbarStyles.floating,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface ToolbarGroupProps extends BaseProps {
  ref?: React.Ref<HTMLDivElement>;
}

export function ToolbarGroup({
  children,
  className,
  ref,
  ...props
}: ToolbarGroupProps) {
  return (
    <div
      ref={ref}
      role="group"
      className={cn(toolbarStyles.group, className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface ToolbarSeparatorProps extends BaseProps {
  ref?: React.Ref<HTMLDivElement>;
}

export function ToolbarSeparator({ ref, ...props }: ToolbarSeparatorProps) {
  return <Separator ref={ref} orientation="vertical" decorative {...props} />;
}
