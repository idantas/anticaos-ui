"use client";

import { useState, useRef, useCallback, type KeyboardEvent } from "react";
import { ArrowUp, Xmark } from "iconoir-react";
import { cn } from "../lib/utils";

export interface PromptBarProps {
  /** Called when the user submits a message */
  onSubmit: (message: string) => void | Promise<void>;
  /** Whether a response is being generated */
  isLoading?: boolean;
  /** Called when the user wants to stop generation */
  onStop?: () => void;
  /** Placeholder text for the textarea */
  placeholder?: string;
  /** Optional className for the container */
  className?: string;
  /** Max rows before the textarea scrolls */
  maxRows?: number;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Slot for extra actions (e.g. attach, settings) rendered to the left of submit */
  actions?: React.ReactNode;
}

export function PromptBar({
  onSubmit,
  isLoading = false,
  onStop,
  placeholder = "Message…",
  className,
  maxRows = 6,
  disabled = false,
  actions,
}: PromptBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 24;
    const maxHeight = lineHeight * maxRows;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, [maxRows]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    adjustHeight();
  };

  const handleSubmit = useCallback(async () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    await onSubmit(trimmed);
  }, [value, isLoading, disabled, onSubmit]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = value.trim().length > 0 && !isLoading && !disabled;

  return (
    <div
      className={cn(
        "flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-ring",
        className
      )}
    >
      {actions && <div className="flex items-end pb-1">{actions}</div>}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className={cn(
          "flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50",
          "overflow-y-auto py-1 leading-6"
        )}
        style={{ maxHeight: `${24 * maxRows}px` }}
      />

      <div className="flex items-end pb-1">
        {isLoading && onStop ? (
          <button
            type="button"
            onClick={onStop}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background transition-opacity hover:opacity-80"
            aria-label="Stop generation"
          >
            <Xmark className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-all",
              canSubmit
                ? "bg-foreground text-background hover:opacity-80"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
