"use client";

import { useCallback } from "react";

// --- Lib ---
import { parseShortcutKeys } from "@/lib/utils";

// --- Hooks ---
import { useEditor } from "@/hooks/use-editor";

// --- Tiptap UI ---
import type { Mark, UseMarkConfig } from "@/components/editor/ui/mark-button";
import {
  MARK_SHORTCUT_KEYS,
  useMark,
} from "@/components/editor/ui/mark-button";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/editor/primitives/button";
import { Button } from "@/components/editor/primitives/button";
import { Badge } from "@/components/editor/primitives/badge";

export interface MarkButtonProps
  extends Omit<ButtonProps, "type">, UseMarkConfig {
  text?: string;
  showShortcut?: boolean;
}

export function MarkShortcutBadge({
  type,
  shortcutKeys = MARK_SHORTCUT_KEYS[type],
}: {
  type: Mark;
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

export function MarkButton({
  editor: providedEditor,
  type,
  text,
  hideWhenUnavailable = false,
  onToggled,
  showShortcut = false,
  onClick,
  children,
  ref,
  ...buttonProps
}: MarkButtonProps) {
  const { editor } = useEditor(providedEditor);
  const {
    isVisible,
    handleMark,
    label,
    canToggle,
    isActive,
    Icon,
    shortcutKeys,
  } = useMark({
    editor,
    type,
    hideWhenUnavailable,
    onToggled,
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      handleMark();
    },
    [handleMark, onClick],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      type="button"
      disabled={!canToggle}
      data-style="ghost"
      data-active-state={isActive ? "on" : "off"}
      data-disabled={!canToggle}
      role="button"
      tabIndex={-1}
      aria-label={label}
      aria-pressed={isActive}
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
            <MarkShortcutBadge type={type} shortcutKeys={shortcutKeys} />
          )}
        </>
      )}
    </Button>
  );
}
