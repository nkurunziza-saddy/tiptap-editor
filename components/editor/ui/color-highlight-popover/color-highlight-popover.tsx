"use client";

import { useMemo, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";

// --- Hooks ---
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";
import { useEditor } from "@/hooks/use-editor";

// --- Icons ---
import { BanIcon } from "@/components/editor/icons/ban-icon";
import { HighlighterIcon } from "@/components/editor/icons/highlighter-icon";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/editor/primitives/button";
import { Button, ButtonGroup } from "@/components/editor/primitives/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/editor/primitives/popover";
import { Separator } from "@/components/editor/primitives/separator";
import {
  Card,
  CardBody,
  CardItemGroup,
} from "@/components/editor/primitives/card";

// --- Tiptap UI ---
import type {
  HighlightColor,
  UseColorHighlightConfig,
} from "@/components/editor/ui/color-highlight-button";
import {
  ColorHighlightButton,
  pickHighlightColorsByValue,
  useColorHighlight,
} from "@/components/editor/ui/color-highlight-button";

export interface ColorHighlightPopoverContentProps {
  editor?: Editor | null;
  colors?: HighlightColor[];
}

export interface ColorHighlightPopoverProps
  extends
    Omit<ButtonProps, "type">,
    Pick<
      UseColorHighlightConfig,
      "editor" | "hideWhenUnavailable" | "onApplied"
    > {
  colors?: HighlightColor[];
}

export function ColorHighlightPopoverButton({
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  return (
    <Button
      type="button"
      className={className}
      data-style="ghost"
      data-appearance="default"
      role="button"
      tabIndex={-1}
      aria-label="Highlight text"
      tooltip="Highlight"
      ref={ref}
      {...props}
    >
      {children ?? <HighlighterIcon className="size-4 shrink-0" />}
    </Button>
  );
}

export function ColorHighlightPopoverContent({
  editor,
  colors = pickHighlightColorsByValue([
    "var(--editor-color-highlight-green)",
    "var(--editor-color-highlight-blue)",
    "var(--editor-color-highlight-red)",
    "var(--editor-color-highlight-purple)",
    "var(--editor-color-highlight-yellow)",
  ]),
}: ColorHighlightPopoverContentProps) {
  const { handleRemoveHighlight } = useColorHighlight({ editor });
  const isMobile = useIsBreakpoint();
  const containerRef = useRef<HTMLDivElement>(null);

  const menuItems = useMemo(
    () => [...colors, { label: "Remove highlight", value: "none" }],
    [colors],
  );

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      if (!containerRef.current) return false;
      const highlightedElement = containerRef.current.querySelector(
        '[data-highlighted="true"]',
      ) as HTMLElement;
      if (highlightedElement) highlightedElement.click();
      if (item.value === "none") handleRemoveHighlight();
      return true;
    },
    autoSelectFirstItem: false,
  });

  return (
    <Card
      ref={containerRef}
      tabIndex={0}
      style={isMobile ? { boxShadow: "none", border: 0 } : {}}
    >
      <CardBody style={isMobile ? { padding: 0 } : {}}>
        <CardItemGroup orientation="horizontal">
          <ButtonGroup orientation="horizontal">
            {colors.map((color, index) => (
              <ColorHighlightButton
                key={color.value}
                editor={editor}
                highlightColor={color.value}
                tooltip={color.label}
                aria-label={`${color.label} highlight color`}
                tabIndex={index === selectedIndex ? 0 : -1}
                data-highlighted={selectedIndex === index}
              />
            ))}
          </ButtonGroup>
          <Separator />
          <ButtonGroup orientation="horizontal">
            <Button
              onClick={handleRemoveHighlight}
              aria-label="Remove highlight"
              tooltip="Remove highlight"
              tabIndex={selectedIndex === colors.length ? 0 : -1}
              type="button"
              role="menuitem"
              data-style="ghost"
              data-highlighted={selectedIndex === colors.length}
            >
              <BanIcon className="size-4 shrink-0" />
            </Button>
          </ButtonGroup>
        </CardItemGroup>
      </CardBody>
    </Card>
  );
}

export function ColorHighlightPopover({
  editor: providedEditor,
  colors = pickHighlightColorsByValue([
    "var(--editor-color-highlight-green)",
    "var(--editor-color-highlight-blue)",
    "var(--editor-color-highlight-red)",
    "var(--editor-color-highlight-purple)",
    "var(--editor-color-highlight-yellow)",
  ]),
  hideWhenUnavailable = false,
  onApplied,
  ...props
}: ColorHighlightPopoverProps) {
  const { editor } = useEditor(providedEditor);
  const [isOpen, setIsOpen] = useState(false);
  const { isVisible, canColorHighlight, isActive, label, Icon } =
    useColorHighlight({
      editor,
      hideWhenUnavailable,
      onApplied,
    });

  if (!isVisible) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ColorHighlightPopoverButton
          disabled={!canColorHighlight}
          data-active-state={isActive ? "on" : "off"}
          data-disabled={!canColorHighlight}
          aria-pressed={isActive}
          aria-label={label}
          tooltip={label}
          {...props}
        >
          <Icon className="size-4 shrink-0" />
        </ColorHighlightPopoverButton>
      </PopoverTrigger>
      <PopoverContent aria-label="Highlight colors">
        <ColorHighlightPopoverContent editor={editor} colors={colors} />
      </PopoverContent>
    </Popover>
  );
}

export default ColorHighlightPopover;
