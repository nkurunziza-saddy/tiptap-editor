"use client";

import { useCallback } from "react";

import { useEditor } from "@/hooks/use-editor";

import { parseShortcutKeys } from "@/lib/utils";

import type { UseCodeBlockConfig } from "@/components/editor/ui/code-block-button";
import {
  CODE_BLOCK_SHORTCUT_KEY,
  useCodeBlock,
} from "@/components/editor/ui/code-block-button";

import type { ButtonProps } from "@/components/editor/primitives/button";
import { Button } from "@/components/editor/primitives/button";
import { Badge } from "@/components/editor/primitives/badge";

export interface CodeBlockButtonProps
  extends Omit<ButtonProps, "type">, UseCodeBlockConfig {
  text?: string;
  showShortcut?: boolean;
}

export function CodeBlockShortcutBadge({
  shortcutKeys = CODE_BLOCK_SHORTCUT_KEY,
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

export function CodeBlockButton({
  editor: providedEditor,
  text,
  hideWhenUnavailable = false,
  onToggled,
  showShortcut = false,
  onClick,
  children,
  ref,
  ...buttonProps
}: CodeBlockButtonProps) {
  const { editor } = useEditor(providedEditor);
  const {
    isVisible,
    canToggle,
    isActive,
    handleToggle,
    label,
    shortcutKeys,
    Icon,
  } = useCodeBlock({
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
      disabled={!canToggle}
      data-disabled={!canToggle}
      tabIndex={-1}
      aria-label={label}
      aria-pressed={isActive}
      tooltip="Code Block"
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
            <CodeBlockShortcutBadge shortcutKeys={shortcutKeys} />
          )}
        </>
      )}
    </Button>
  );
}
