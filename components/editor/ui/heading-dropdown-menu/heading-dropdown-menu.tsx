"use client";

import { useCallback, useState } from "react";

// --- Icons ---
import { ChevronDownIcon } from "@/components/editor/icons/chevron-down-icon";

// --- Hooks ---
import { useEditor } from "@/hooks/use-editor";

// --- Tiptap UI ---
import { HeadingButton } from "@/components/editor/ui/heading-button";
import type { UseHeadingDropdownMenuConfig } from "@/components/editor/ui/heading-dropdown-menu";
import { useHeadingDropdownMenu } from "@/components/editor/ui/heading-dropdown-menu";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/editor/primitives/button";
import { Button, ButtonGroup } from "@/components/editor/primitives/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/editor/primitives/dropdown-menu";
import { Card, CardBody } from "@/components/editor/primitives/card";

export interface HeadingDropdownMenuProps
  extends Omit<ButtonProps, "type">, UseHeadingDropdownMenuConfig {
  portal?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function HeadingDropdownMenu({
  editor: providedEditor,
  levels = [1, 2, 3, 4, 5, 6],
  hideWhenUnavailable = false,
  portal = false,
  onOpenChange,
  ref,
  ...buttonProps
}: HeadingDropdownMenuProps) {
  const { editor } = useEditor(providedEditor);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isVisible, isActive, canToggle, Icon } = useHeadingDropdownMenu({
    editor,
    levels,
    hideWhenUnavailable,
  });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!editor || !canToggle) return;
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [canToggle, editor, onOpenChange],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <DropdownMenu modal open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          data-active-state={isActive ? "on" : "off"}
          role="button"
          tabIndex={-1}
          disabled={!canToggle}
          data-disabled={!canToggle}
          aria-label="Format text as heading"
          aria-pressed={isActive}
          tooltip="Heading"
          {...buttonProps}
          ref={ref}
        >
          <Icon className="size-4 shrink-0" />
          <ChevronDownIcon className="size-2.5 shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" portal={portal}>
        <Card>
          <CardBody>
            <ButtonGroup>
              {levels.map((level) => (
                <DropdownMenuItem key={`heading-${level}`} asChild>
                  <HeadingButton
                    editor={editor}
                    level={level}
                    text={`Heading ${level}`}
                    showTooltip={false}
                  />
                </DropdownMenuItem>
              ))}
            </ButtonGroup>
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default HeadingDropdownMenu;
