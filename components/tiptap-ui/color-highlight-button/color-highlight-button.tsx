"use client";

import { useCallback, useMemo } from "react";

// --- Lib ---
import { parseShortcutKeys } from "@/lib/tiptap-utils";

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- Tiptap UI ---
import type { UseColorHighlightConfig } from "@/components/tiptap-ui/color-highlight-button";
import {
  COLOR_HIGHLIGHT_SHORTCUT_KEY,
  useColorHighlight,
} from "@/components/tiptap-ui/color-highlight-button";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Badge } from "@/components/tiptap-ui-primitive/badge";

export interface ColorHighlightButtonProps
  extends Omit<ButtonProps, "type">, UseColorHighlightConfig {
  text?: string;
  showShortcut?: boolean;
}

export function ColorHighlightShortcutBadge({
  shortcutKeys = COLOR_HIGHLIGHT_SHORTCUT_KEY,
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

export function ColorHighlightButton({
  editor: providedEditor,
  highlightColor,
  text,
  hideWhenUnavailable = false,
  mode = "mark",
  onApplied,
  showShortcut = false,
  onClick,
  children,
  style,
  ref,
  ...buttonProps
}: ColorHighlightButtonProps) {
  const { editor } = useTiptapEditor(providedEditor);
  const {
    isVisible,
    canColorHighlight,
    isActive,
    handleColorHighlight,
    label,
    shortcutKeys,
  } = useColorHighlight({
    editor,
    highlightColor,
    label: text || `Toggle highlight (${highlightColor})`,
    hideWhenUnavailable,
    mode,
    onApplied,
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      handleColorHighlight();
    },
    [handleColorHighlight, onClick],
  );

  const buttonStyle = useMemo(
    () =>
      ({
        ...style,
        "--highlight-color": highlightColor,
      }) as React.CSSProperties,
    [highlightColor, style],
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
      disabled={!canColorHighlight}
      data-disabled={!canColorHighlight}
      aria-label={label}
      aria-pressed={isActive}
      tooltip={label}
      onClick={handleClick}
      style={buttonStyle}
      {...buttonProps}
      ref={ref}
    >
      {children ?? (
        <>
          <span
            className="size-3.5 rounded-sm shrink-0"
            style={{
              backgroundColor: "var(--highlight-color)",
            }}
          />
          {text && (
            <span className="px-0.5 grow text-left leading-6">{text}</span>
          )}
          {showShortcut && (
            <ColorHighlightShortcutBadge shortcutKeys={shortcutKeys} />
          )}
        </>
      )}
    </Button>
  );
}
