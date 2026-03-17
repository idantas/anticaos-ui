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
  /** Slot for extra actions rendered to the left of the textarea */
  actions?: React.ReactNode;
  /** Apply glassmorphism style (default: true) */
  glass?: boolean;
}

const glassStyle: React.CSSProperties = {
  background:
    "linear-gradient(10deg, rgba(255,255,255,0.405) 6.7%, rgba(255,255,255,0.72) 97.09%)",
  backdropFilter: "blur(35.5px)",
  WebkitBackdropFilter: "blur(35.5px)",
  boxShadow: "0px 0px 31.1px 0px rgba(0,0,0,0.25)",
  border: "1px solid #e9e9e9",
};

export function PromptBar({
  onSubmit,
  isLoading = false,
  onStop,
  placeholder = "Message…",
  className,
  maxRows = 6,
  disabled = false,
  actions,
  glass = true,
}: PromptBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 20;
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
      className={cn("rounded-[24px] min-h-[76px] pb-[12px] pl-[16px] pr-[12px] pt-[16px] w-full flex items-end gap-[8px] cursor-text", className)}
      style={
        glass
          ? { background: "rgba(245,245,245,0.69)", backdropFilter: isLoading ? "blur(11px)" : undefined }
          : undefined
      }
      onClick={() => textareaRef.current?.focus()}
    >
      {actions && <div className="flex items-end pb-1 shrink-0">{actions}</div>}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 bg-transparent text-[14px] text-[#0a0a0a] placeholder:text-[#9c9c9c] border-0 outline-none focus:ring-0 resize-none leading-[20px] py-0 disabled:opacity-50"
        style={{ maxHeight: `${20 * maxRows}px` }}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="flex items-end pb-0.5 shrink-0">
        {isLoading && onStop ? (
          <button
            type="button"
            onClick={onStop}
            className="flex h-8 w-8 items-center justify-center rounded-[16px] transition-opacity hover:opacity-80"
            style={{ background: "#171717" }}
            aria-label="Stop generation"
          >
            <Xmark className="h-4 w-4 text-white" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-[16px] transition-all",
              canSubmit
                ? "hover:opacity-80"
                : "opacity-30 cursor-not-allowed"
            )}
            style={{ background: "#171717" }}
            aria-label="Send message"
          >
            <ArrowUp className="h-4 w-4 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
