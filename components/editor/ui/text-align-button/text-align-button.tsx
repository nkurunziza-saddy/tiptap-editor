"use client";

import { useCallback } from "react";

import { parseShortcutKeys } from "@/lib/utils";

import { useEditor } from "@/hooks/use-editor";

import type { TextAlign, UseTextAlignConfig } from "./use-text-align";
import { TEXT_ALIGN_SHORTCUT_KEYS, useTextAlign } from "./use-text-align";

import type { ButtonProps } from "@/components/editor/primitives/button";
import { Button } from "@/components/editor/primitives/button";
import { Badge } from "@/components/editor/primitives/badge";

type IconProps = React.SVGProps<SVGSVGElement>;
type IconComponent = ({ className, ...props }: IconProps) => React.ReactElement;

export interface TextAlignButtonProps
  extends Omit<ButtonProps, "type">, UseTextAlignConfig {
  text?: string;
  showShortcut?: boolean;
  icon?: React.MemoExoticComponent<IconComponent> | React.FC<IconProps>;
}

export function TextAlignShortcutBadge({
  align,
  shortcutKeys = TEXT_ALIGN_SHORTCUT_KEYS[align],
}: {
  align: TextAlign;
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

export function TextAlignButton({
  editor: providedEditor,
  align,
  text,
  hideWhenUnavailable = false,
  onAligned,
  showShortcut = false,
  onClick,
  icon: CustomIcon,
  children,
  ref,
  ...buttonProps
}: TextAlignButtonProps) {
  const { editor } = useEditor(providedEditor);
  const {
    isVisible,
    handleTextAlign,
    label,
    canAlign,
    isActive,
    Icon,
    shortcutKeys,
  } = useTextAlign({
    editor,
    align,
    hideWhenUnavailable,
    onAligned,
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      handleTextAlign();
    },
    [handleTextAlign, onClick],
  );

  if (!isVisible) {
    return null;
  }

  const RenderIcon = CustomIcon ?? Icon;

  return (
    <Button
      type="button"
      disabled={!canAlign}
      data-style="ghost"
      data-active-state={isActive ? "on" : "off"}
      data-disabled={!canAlign}
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
          <RenderIcon className="size-4 shrink-0" />
          {text && (
            <span className="px-0.5 grow text-left leading-6">{text}</span>
          )}
          {showShortcut && (
            <TextAlignShortcutBadge align={align} shortcutKeys={shortcutKeys} />
          )}
        </>
      )}
    </Button>
  );
}
