"use client";

import { useCallback } from "react";

// --- Tiptap UI ---
import type { UseBlockquoteConfig } from "@/components/editor/ui/blockquote-button";
import {
  BLOCKQUOTE_SHORTCUT_KEY,
  useBlockquote,
} from "@/components/editor/ui/blockquote-button";

// --- Hooks ---
import { useEditor } from "@/hooks/use-editor";

// --- Lib ---
import { parseShortcutKeys } from "@/lib/utils";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/editor/primitives/button";
import { Button } from "@/components/editor/primitives/button";
import { Badge } from "@/components/editor/primitives/badge";

export interface BlockquoteButtonProps
  extends Omit<ButtonProps, "type">, UseBlockquoteConfig {
  text?: string;
  showShortcut?: boolean;
}

export function BlockquoteShortcutBadge({
  shortcutKeys = BLOCKQUOTE_SHORTCUT_KEY,
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

export function BlockquoteButton({
  editor: providedEditor,
  text,
  hideWhenUnavailable = false,
  onToggled,
  showShortcut = false,
  onClick,
  children,
  ref,
  ...buttonProps
}: BlockquoteButtonProps) {
  const { editor } = useEditor(providedEditor);
  const {
    isVisible,
    canToggle,
    isActive,
    handleToggle,
    label,
    shortcutKeys,
    Icon,
  } = useBlockquote({
    editor,
    hideWhenUnavailable,
    onToggled,
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      handleToggle();
    },
    [handleToggle, onClick],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      type="button"
      data-style="ghost"
      data-active-state={isActive ? "on" : "off"}
      role="button"
      tabIndex={-1}
      disabled={!canToggle}
      data-disabled={!canToggle}
      aria-label={label}
      aria-pressed={isActive}
      tooltip="Blockquote"
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
            <BlockquoteShortcutBadge shortcutKeys={shortcutKeys} />
          )}
        </>
      )}
    </Button>
  );
}
