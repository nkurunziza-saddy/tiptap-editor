"use client";

import { useCallback } from "react";

// --- Lib ---
import { parseShortcutKeys } from "@/lib/utils";

// --- Hooks ---
import { useEditor } from "@/hooks/use-editor";

// --- Tiptap UI ---
import type { UseImageUploadConfig } from "./use-image-upload";
import { IMAGE_UPLOAD_SHORTCUT_KEY, useImageUpload } from "./use-image-upload";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/editor/primitives/button";
import { Button } from "@/components/editor/primitives/button";
import { Badge } from "@/components/editor/primitives/badge";

type IconProps = React.SVGProps<SVGSVGElement>;
type IconComponent = ({ className, ...props }: IconProps) => React.ReactElement;

export interface ImageUploadButtonProps
  extends Omit<ButtonProps, "type">, UseImageUploadConfig {
  text?: string;
  showShortcut?: boolean;
  icon?: React.MemoExoticComponent<IconComponent> | React.FC<IconProps>;
}

export function ImageShortcutBadge({
  shortcutKeys = IMAGE_UPLOAD_SHORTCUT_KEY,
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

export function ImageUploadButton({
  editor: providedEditor,
  text,
  hideWhenUnavailable = false,
  onInserted,
  showShortcut = false,
  onClick,
  icon: CustomIcon,
  children,
  ref,
  ...buttonProps
}: ImageUploadButtonProps) {
  const { editor } = useEditor(providedEditor);
  const {
    isVisible,
    canInsert,
    handleImage,
    label,
    isActive,
    shortcutKeys,
    Icon,
  } = useImageUpload({
    editor,
    hideWhenUnavailable,
    onInserted,
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      handleImage();
    },
    [handleImage, onClick],
  );

  if (!isVisible) {
    return null;
  }

  const RenderIcon = CustomIcon ?? Icon;

  return (
    <Button
      type="button"
      data-style="ghost"
      data-active-state={isActive ? "on" : "off"}
      role="button"
      tabIndex={-1}
      disabled={!canInsert}
      data-disabled={!canInsert}
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
          {showShortcut && <ImageShortcutBadge shortcutKeys={shortcutKeys} />}
        </>
      )}
    </Button>
  );
}
