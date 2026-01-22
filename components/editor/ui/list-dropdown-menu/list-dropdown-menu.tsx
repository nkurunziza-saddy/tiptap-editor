"use client";

import { useCallback, useState } from "react";
import type { Editor } from "@tiptap/react";

import { useEditor } from "@/hooks/use-editor";

import { ChevronDownIcon } from "@/components/editor/icons/chevron-down-icon";

import { ListButton, type ListType } from "@/components/editor/ui/list-button";

import { useListDropdownMenu } from "@/components/editor/ui/list-dropdown-menu/use-list-dropdown-menu";

import type { ButtonProps } from "@/components/editor/primitives/button";
import { Button, ButtonGroup } from "@/components/editor/primitives/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/editor/primitives/dropdown-menu";
import { Card, CardBody } from "@/components/editor/primitives/card";

export interface ListDropdownMenuProps extends Omit<ButtonProps, "type"> {
  editor?: Editor;
  types?: ListType[];
  hideWhenUnavailable?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  portal?: boolean;
}

export function ListDropdownMenu({
  editor: providedEditor,
  types = ["bulletList", "orderedList", "taskList"],
  hideWhenUnavailable = false,
  onOpenChange,
  portal = false,
  ref,
  ...props
}: ListDropdownMenuProps) {
  const { editor } = useEditor(providedEditor);
  const [isOpen, setIsOpen] = useState(false);

  const { filteredLists, canToggle, isActive, isVisible, Icon } =
    useListDropdownMenu({
      editor,
      types,
      hideWhenUnavailable,
    });

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOnOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          data-active-state={isActive ? "on" : "off"}
          role="button"
          tabIndex={-1}
          disabled={!canToggle}
          data-disabled={!canToggle}
          aria-label="List options"
          tooltip="List"
          ref={ref}
          {...props}
        >
          <Icon className="size-4 shrink-0" />
          <ChevronDownIcon className="size-2.5 shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" portal={portal}>
        <Card>
          <CardBody>
            <ButtonGroup>
              {filteredLists.map((option) => (
                <DropdownMenuItem key={option.type} asChild>
                  <ListButton
                    editor={editor}
                    type={option.type}
                    text={option.label}
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

export default ListDropdownMenu;
