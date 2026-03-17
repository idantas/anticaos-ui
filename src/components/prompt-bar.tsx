"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Xmark, MultiplePages, Drag } from "iconoir-react";
import { cn } from "../lib/utils";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface PromptBarProps {
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  /** Chat messages to render when open */
  messages?: ChatMessage[];

  /** Title shown in the header when open */
  title?: string;

  /** Called when user submits a message */
  onSubmit: (message: string) => void | Promise<void>;

  /** Whether a response is loading */
  isLoading?: boolean;

  /** Called when user wants to stop generation */
  onStop?: () => void;

  /** Input placeholder */
  placeholder?: string;

  /** Float (centered bottom) or side (full-height right panel) */
  position?: "float" | "side";
  onPositionChange?: (pos: "float" | "side") => void;

  /** Sidebar width in px (side mode only) */
  sidebarWidth?: number;

  /** Extra slot rendered above the textarea (quick commands, attachments…) */
  quickCommands?: React.ReactNode;

  /** className for the outermost wrapper */
  className?: string;
}

const GLASS: React.CSSProperties = {
  background:
    "linear-gradient(10deg, rgba(255,255,255,0.405) 6.7%, rgba(255,255,255,0.72) 97.09%)",
  backdropFilter: "blur(35.5px)",
  WebkitBackdropFilter: "blur(35.5px)",
  boxShadow: "0px 0px 31.1px 0px rgba(0,0,0,0.25)",
  border: "1px solid #e9e9e9",
};

export function PromptBar({
  open = false,
  onOpenChange,
  messages = [],
  title,
  onSubmit,
  isLoading = false,
  onStop,
  placeholder = "Message…",
  position = "float",
  onPositionChange,
  sidebarWidth = 550,
  quickCommands,
  className,
}: PromptBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isSide = position === "side";

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    adjustHeight();
  };

  const handleSubmit = useCallback(async () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    onOpenChange?.(true);
    await onSubmit(trimmed);
  }, [value, isLoading, onSubmit, onOpenChange]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = value.trim().length > 0 && !isLoading;
  const hasQuickCommands = Boolean(quickCommands);
  const conversationTitle =
    title ??
    (messages[0]?.content
      ? messages[0].content.slice(0, 50) +
        (messages[0].content.length > 50 ? "…" : "")
      : "Assistant");

  // ── Input area ───────────────────────────────────────────────
  const inputArea = (
    <div className="shrink-0 min-h-[76px]">
      <div
        className="rounded-[24px] min-h-[76px] pb-[12px] pl-[16px] pr-[12px] pt-[16px] w-full flex items-end gap-[8px] cursor-text"
        style={{
          background: "rgba(245,245,245,0.69)",
          backdropFilter: isLoading ? "blur(11px)" : undefined,
        }}
        onClick={() => textareaRef.current?.focus()}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[14px] text-[#0a0a0a] placeholder:text-[#9c9c9c] border-0 outline-none focus:ring-0 resize-none leading-[20px] px-[12px] py-0"
          style={{ opacity: isLoading ? 0.5 : 1, maxHeight: "80px" }}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex items-end pb-0.5 shrink-0">
          {isLoading && onStop ? (
            <button
              type="button"
              onClick={onStop}
              className="flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                width: 32,
                height: 32,
                padding: 8,
              }}
              aria-label="Stop"
            >
              <Xmark className="w-4 h-4 text-[#0a0a0a]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-30"
              style={{
                background: "#1a1717",
                borderRadius: "40px",
                width: 32,
                height: 32,
                padding: "6.4px",
              }}
              aria-label="Send"
            >
              <ArrowUp className="w-[11px] h-[11px] text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // ── Chat header ──────────────────────────────────────────────
  const chatHeader = open && (
    <div className="shrink-0">
      <div className="flex items-center gap-[16px] px-[16px] pt-[16px]">
        <p className="flex-1 font-semibold text-[16px] text-[#171717] leading-[1.5] truncate">
          {conversationTitle}
        </p>
        {onPositionChange && (
          <button
            type="button"
            onClick={() =>
              onPositionChange(isSide ? "float" : "side")
            }
            className="hidden sm:flex size-[20px] items-center justify-center text-[#0a0a0a]/40 hover:text-[#0a0a0a]/70 transition-colors"
            aria-label={isSide ? "Float mode" : "Side panel"}
          >
            <MultiplePages className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => onOpenChange?.(false)}
          className="size-[20px] flex items-center justify-center text-[#0a0a0a]/40 hover:text-[#0a0a0a]/70 transition-colors"
          aria-label="Close"
        >
          <Xmark className="w-4 h-4" />
        </button>
      </div>
      <div
        className="h-px bg-[#0a0a0a]/[0.06] shrink-0"
        style={{ margin: "12px 16px 0" }}
      />
    </div>
  );

  // ── Messages panel ───────────────────────────────────────────
  const messagesArea = open && (
    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 min-h-0">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
        >
          {msg.role === "user" ? (
            <div
              className="max-w-[80%] px-4 py-2.5 text-[13px] text-white leading-[1.5]"
              style={{ background: "#171717", borderRadius: "16px" }}
            >
              {msg.content}
            </div>
          ) : (
            <div className="max-w-[90%] min-w-0 overflow-hidden text-[13px] text-[#0a0a0a] leading-[1.6] px-1">
              {msg.content}
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="text-[13px] text-[#9c9c9c] px-1 leading-[1.6] animate-pulse">
            Thinking…
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );

  // ── Side mode ────────────────────────────────────────────────
  if (isSide && open) {
    return (
      <>
        {/* Resize handle */}
        <div
          className="fixed inset-y-0 z-50 w-2 cursor-col-resize group flex items-center justify-center hover:bg-[#0a0a0a]/5 active:bg-[#0a0a0a]/10 transition-colors"
          style={{ right: sidebarWidth }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-10 rounded-md bg-white/80 group-hover:bg-white shadow-sm border border-[#e9e9e9] opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
            <Drag className="w-3.5 h-3.5 text-[#697282]" />
          </div>
        </div>

        {/* Side panel */}
        <div
          className="fixed inset-y-0 right-0 z-50 flex flex-col"
          style={{ width: sidebarWidth }}
        >
          <div
            className="flex flex-col h-full overflow-hidden"
            style={{
              ...GLASS,
              borderRadius: 0,
            }}
          >
            {chatHeader}
            {messagesArea}
            {quickCommands && (
              <div className="shrink-0">{quickCommands}</div>
            )}
            <div className="shrink-0 p-[8px]">{inputArea}</div>
          </div>
        </div>
      </>
    );
  }

  // ── Float mode ───────────────────────────────────────────────
  return (
    <div
      className={cn("fixed left-1/2 -translate-x-1/2 z-30", className)}
      style={{
        width: "600px",
        minWidth: "300px",
        maxWidth: "calc(100vw - 16px)",
        bottom: "max(24px, calc(16px + env(safe-area-inset-bottom)))",
      }}
    >
      <motion.div
        animate={{ height: open ? "min(656px, 88svh)" : hasQuickCommands ? 126 : 92 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-[8px] overflow-hidden"
        style={{ ...GLASS, borderRadius: "20px", padding: "8px" }}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              className="flex flex-col flex-1 min-h-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {chatHeader}
              {messagesArea}
            </motion.div>
          )}
        </AnimatePresence>

        {quickCommands && (
          <div className="shrink-0">{quickCommands}</div>
        )}

        <div className="shrink-0">{inputArea}</div>
      </motion.div>
    </div>
  );
}
