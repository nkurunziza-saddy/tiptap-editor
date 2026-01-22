"use client";

import { useCallback } from "react";

import { parseShortcutKeys } from "@/lib/utils";

import { useEditor } from "@/hooks/use-editor";

import type {
  UndoRedoAction,
  UseUndoRedoConfig,
} from "@/components/editor/ui/undo-redo-button";
import {
  UNDO_REDO_SHORTCUT_KEYS,
  useUndoRedo,
} from "@/components/editor/ui/undo-redo-button";

import type { ButtonProps } from "@/components/editor/primitives/button";
import { Button } from "@/components/editor/primitives/button";
import { Badge } from "@/components/editor/primitives/badge";

export interface UndoRedoButtonProps
  extends Omit<ButtonProps, "type">, UseUndoRedoConfig {
  text?: string;
  showShortcut?: boolean;
}

export function HistoryShortcutBadge({
  action,
  shortcutKeys = UNDO_REDO_SHORTCUT_KEYS[action],
}: {
  action: UndoRedoAction;
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

export function UndoRedoButton({
  editor: providedEditor,
  action,
  text,
  hideWhenUnavailable = false,
  onExecuted,
  showShortcut = false,
  onClick,
  children,
  ref,
  ...buttonProps
}: UndoRedoButtonProps) {
  const { editor } = useEditor(providedEditor);
  const { isVisible, handleAction, label, canExecute, Icon, shortcutKeys } =
    useUndoRedo({
      editor,
      action,
      hideWhenUnavailable,
      onExecuted,
    });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      handleAction();
    },
    [handleAction, onClick],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      type="button"
      disabled={!canExecute}
      data-style="ghost"
      data-disabled={!canExecute}
      role="button"
      tabIndex={-1}
      aria-label={label}
      tooltip={label}
      onClick={handleClick}
      {...buttonProps}
      ref={ref}
    >
      {children ?? (
        <>
          <Icon className="size-4 shrink-0" />
          {text && (
            <span className="px-0.5 grow text-left leading-6">{text}</span>
          )}
          {showShortcut && (
            <HistoryShortcutBadge action={action} shortcutKeys={shortcutKeys} />
          )}
        </>
      )}
    </Button>
  );
}
